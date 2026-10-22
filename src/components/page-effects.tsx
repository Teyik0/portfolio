import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Page-wide behaviour with no markup of its own:
 * - Lenis smooth scrolling (skipped under prefers-reduced-motion, so native scroll is untouched);
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

    const lenis = reducedMotion
      ? null
      : new Lenis({
          anchors: true,
          autoRaf: true,
          lerp: 0.09,
          wheelMultiplier: 0.95,
        });

    return () => {
      observer.disconnect();
      lenis?.destroy();
    };
  }, []);

  return null;
}
