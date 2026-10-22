"use client";

import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "../content";
import { whenIdle } from "../lib/when-idle";
import { measureTimeline, readDim, readMorph } from "./scroll-timeline";
// Imported statically: the raw-WebGL2 scene is small and touches no browser globals at module
// scope, so shipping it in the island chunk saves a network round trip.
import { createSignalScene } from "./signal-scene";

/** Any of these means a person is here: start the field right away. */
const WAKE_EVENTS = [
  "pointermove",
  "pointerdown",
  "keydown",
  "wheel",
  "touchstart",
  "scroll",
] as const;
/** Otherwise the field starts this long after the load event. */
const BOOT_FALLBACK_MS = 5000;

/**
 * Fixed, client-only WebGL layer. SSR (and visitors without WebGL) get the CSS poster: the same
 * black, haze and glow, minus the particles. WebGL boots on the first interaction or after load.
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

    // Boot on the first sign of a user, or a few seconds after load, whichever comes first.
    // Shader compilation and the first frames then never compete with the initial load, which
    // matters most on devices without a GPU; the CSS poster holds the look until then.
    let cancelIdle = () => {
      /* nothing scheduled yet */
    };
    let fallbackTimer = 0;
    let started = false;
    const start = () => {
      if (started) {
        return;
      }
      started = true;
      window.clearTimeout(fallbackTimer);
      for (const type of WAKE_EVENTS) {
        window.removeEventListener(type, start);
      }
      cancelIdle = whenIdle(() => {
        boot().catch(() => {
          // Shader link failed: the CSS poster under the canvas is the intended fallback.
        });
      }, 400);
    };
    const armFallback = () => {
      fallbackTimer = window.setTimeout(start, BOOT_FALLBACK_MS);
    };
    for (const type of WAKE_EVENTS) {
      window.addEventListener(type, start, { once: true, passive: true });
    }
    if (document.readyState === "complete") {
      armFallback();
    } else {
      window.addEventListener("load", armFallback, { once: true });
    }

    return () => {
      disposed = true;
      window.removeEventListener("load", armFallback);
      window.clearTimeout(fallbackTimer);
      for (const type of WAKE_EVENTS) {
        window.removeEventListener(type, start);
      }
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
