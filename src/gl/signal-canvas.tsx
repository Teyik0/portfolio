import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "../content";
import { measureTimeline, readDim, readMorph } from "./scroll-timeline";

/** requestIdleCallback with a timeout; Safari has no rIC, so fall back to a short timer. */
function whenIdle(callback: () => void): () => void {
  if ("requestIdleCallback" in window) {
    const id = requestIdleCallback(callback, { timeout: 600 });
    return () => cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 60);
  return () => clearTimeout(id);
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    const cleanups: Array<() => void> = [];

    const boot = async () => {
      const { createSignalScene } = await import("./signal-scene");
      if (disposed) {
        return;
      }
      const scene = createSignalScene(canvas, {
        animate: !reducedMotion,
        onContextLost: () => setReady(false),
        onFirstFrame: () => setReady(true),
      });
      cleanups.push(() => scene.dispose());

      const sectionIds = SECTIONS.map(({ id }) => id);
      let timeline = measureTimeline(sectionIds);

      let scrollRaf = 0;
      const onScroll = () => {
        cancelAnimationFrame(scrollRaf);
        scrollRaf = requestAnimationFrame(() => {
          scene.setMorph(readMorph(timeline));
          scene.setDim(readDim(timeline));
        });
      };
      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
          return;
        }
        scene.setPointer(
          (event.clientX / window.innerWidth) * 2 - 1,
          1 - (event.clientY / window.innerHeight) * 2
        );
      };
      const onPointerLeave = () => scene.clearPointer();
      const resizeObserver = new ResizeObserver(() => {
        timeline = measureTimeline(sectionIds);
        scene.resize();
        onScroll();
      });
      resizeObserver.observe(document.body);
      const visibility = new IntersectionObserver(([entry]) => {
        scene.setActive(entry?.isIntersecting ?? true);
      });
      visibility.observe(canvas);

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
        document.documentElement.removeEventListener("pointerleave", onPointerLeave);
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
      <canvas className="signal-canvas" data-ready={ready ? "" : undefined} ref={canvasRef} />
      <div className="signal-vignette" />
      <div className="signal-grain" />
    </div>
  );
}
