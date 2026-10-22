"use client";

import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "../content";
import { measureTimeline, readDim, readMorph } from "./scroll-timeline";
// Imported statically: the raw-WebGL2 scene is small and touches no browser globals at module
// scope, so shipping it in the island chunk saves a network round trip.
import { createSignalScene } from "./signal-scene";

/** requestIdleCallback with a timeout; Safari has no rIC, so fall back to a short timer. */
function whenIdle(callback: () => void): () => void {
  if ("requestIdleCallback" in window) {
    const id = requestIdleCallback(callback, { timeout: 400 });
    return () => cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 60);
  return () => clearTimeout(id);
}

/**
 * Fixed, client-only WebGL layer. SSR (and visitors without WebGL) get the CSS poster: the same
 * black, haze and glow, minus the particles. WebGL boots only once the page has loaded and idled.
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
      const scene = await createSignalScene(canvas, {
        animate: !reducedMotion,
        onContextLost: () => setReady(false),
        onFirstFrame: () => setReady(true),
      });
      if (!scene) {
        return;
      }
      if (disposed) {
        scene.dispose();
        return;
      }
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
      // Elements marked data-signal-tune (the contact stations) lock the waveform while
      // hovered or focused. Delegated, so the components stay free of scene wiring.
      const onTune = (event: Event) => {
        const target = event.target instanceof Element ? event.target : null;
        const tuned = event.type === "pointerover" || event.type === "focusin";
        scene.setTune(tuned && target?.closest("[data-signal-tune]") ? 1 : 0);
      };
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
      for (const type of ["pointerover", "focusin", "focusout"]) {
        document.addEventListener(type, onTune);
      }
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      cleanups.push(() => {
        cancelAnimationFrame(scrollRaf);
        resizeObserver.disconnect();
        visibility.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("pointermove", onPointerMove);
        for (const type of ["pointerover", "focusin", "focusout"]) {
          document.removeEventListener(type, onTune);
        }
        document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      });
    };

    // Let the page finish loading and go idle before touching WebGL, so compiling shaders and
    // the first frames never compete with hydration or the critical requests.
    let cancelIdle = () => {
      /* nothing scheduled yet */
    };
    const start = () => {
      cancelIdle = whenIdle(() => {
        boot().catch(() => {
          // Shader link failed: the CSS poster under the canvas is the intended fallback.
        });
      });
    };
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      disposed = true;
      window.removeEventListener("load", start);
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
