"use client";

import { useEffect } from "react";
import { whenIdle } from "../lib/when-idle";

/**
 * Page-wide behaviour with no markup of its own:
 * - Lenis smooth scrolling, fetched on idle so it never weighs on the first load (skipped under
 *   prefers-reduced-motion, so native scroll is untouched);
 * - one IntersectionObserver that reveals every `.reveal` block as it enters the viewport.
 */
export function PageEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.shown = "";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    for (const el of reveals) {
      observer.observe(el);
    }

    let disposed = false;
    let destroyLenis = () => {
      /* not started */
    };
    const cancelIdle = reducedMotion
      ? destroyLenis
      : whenIdle(async () => {
          const { default: Lenis } = await import("lenis");
          if (disposed) {
            return;
          }
          const lenis = new Lenis({
            anchors: true,
            autoRaf: true,
            lerp: 0.09,
            wheelMultiplier: 0.95,
          });
          destroyLenis = () => lenis.destroy();
        }, 2000);

    return () => {
      disposed = true;
      observer.disconnect();
      cancelIdle();
      destroyLenis();
    };
  }, []);

  return null;
}
