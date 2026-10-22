import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "../content";
import type { SignalScene } from "./signal-scene";

/** requestIdleCallback with a timeout; Safari has no rIC, so fall back to a short timer. */
function whenIdle(callback: () => void): () => void {
  if ("requestIdleCallback" in window) {
    const id = requestIdleCallback(callback, { timeout: 600 });
    return () => cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 60);
  return () => clearTimeout(id);
}

function pickParticleCount(): number {
  const narrow = window.matchMedia("(max-width: 767px)").matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  if (narrow || cores <= 4 || memory <= 4) {
    return 18_000;
  }
  return 52_000;
}

/** Scroll window, in px, over which the field morphs into the next section's shape. */
interface Boundary {
  end: number;
  start: number;
}

/**
 * Maps scroll position to a continuous shape index: 0 = index, 1 = Furin, 2 = Tofu, 3 = contact.
 * Each shape holds while its section fills the viewport; it morphs only while the next
 * section's top travels from 90% to 30% of the viewport height.
 */
function readMorph(boundaries: Boundary[]): number {
  const y = window.scrollY;
  let morph = 0;
  for (const { end, start } of boundaries) {
    const t = Math.min(1, Math.max(0, (y - start) / (end - start)));
    morph += t * t * (3 - 2 * t);
  }
  return morph;
}

/**
 * Fixed, client-only WebGL layer. SSR (and visitors without WebGL) get the CSS poster: the same
 * black, haze and glow, minus the particles. three.js is fetched only after hydration, on idle.
 */
export function SignalCanvas() {
  "use no memo";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let disposed = false;
    const cleanups: Array<() => void> = [];

    const boot = async () => {
      const { createSignalScene } = await import("./signal-scene");
      if (disposed) {
        return;
      }
      const active: SignalScene = createSignalScene(canvas, {
        animate: !reducedMotion,
        onContextLost: () => setReady(false),
        onFirstFrame: () => setReady(true),
        particleCount: pickParticleCount(),
      });
      cleanups.push(() => active.dispose());

      let boundaries: Boundary[] = [];
      const measure = () => {
        const vh = window.innerHeight;
        const maxScroll = document.documentElement.scrollHeight - vh;
        boundaries = SECTIONS.slice(1).map(({ id }) => {
          const el = document.getElementById(id);
          const top = el
            ? el.getBoundingClientRect().top + window.scrollY
            : maxScroll;
          const end = Math.min(maxScroll, Math.max(1, top - vh * 0.3));
          return { end, start: Math.min(end - 1, Math.max(0, top - vh * 0.9)) };
        });
      };

      let scrollRaf = 0;
      const onScroll = () => {
        cancelAnimationFrame(scrollRaf);
        scrollRaf = requestAnimationFrame(() =>
          active.setMorph(readMorph(boundaries))
        );
      };
      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
          return;
        }
        active.setPointer(
          (event.clientX / window.innerWidth) * 2 - 1,
          1 - (event.clientY / window.innerHeight) * 2
        );
      };
      const onPointerLeave = () => active.clearPointer();
      const resizeObserver = new ResizeObserver(() => {
        measure();
        active.resize();
        onScroll();
      });
      resizeObserver.observe(document.body);
      const visibility = new IntersectionObserver(([entry]) => {
        active.setActive(entry?.isIntersecting ?? true);
      });
      visibility.observe(canvas);

      measure();
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      cleanups.push(() => {
        cancelAnimationFrame(scrollRaf);
        resizeObserver.disconnect();
        visibility.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("pointermove", onPointerMove);
        document.documentElement.removeEventListener(
          "pointerleave",
          onPointerLeave
        );
      });
    };

    // Let hydration and the first paint finish before downloading three.js and touching WebGL.
    const cancelIdle = whenIdle(() => {
      boot().catch(() => {
        // WebGL unavailable or the chunk failed to load: the CSS poster is the intended fallback.
      });
    });

    return () => {
      disposed = true;
      cancelIdle();
      for (const cleanup of cleanups.reverse()) {
        cleanup();
      }
    };
  }, []);

  return (
    <div aria-hidden="true" className="signal-layer">
      <div className="signal-poster" />
      <canvas
        className="signal-canvas"
        data-ready={ready ? "" : undefined}
        ref={canvasRef}
      />
      <div className="signal-vignette" />
      <div className="signal-grain" />
    </div>
  );
}
