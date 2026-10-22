"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "!<>-_/[]{}=+*^?#01ABCDEFXYZ";

interface ScrambleTextProps {
  className?: string;
  /** Delay in ms before decoding when `trigger` is "load". */
  delay?: number;
  text: string;
  /** "hover": decode when the closest link/button is hovered or focused. "load": once, on mount. */
  trigger?: "hover" | "load";
}

/**
 * Text that decodes left to right through random glyphs. The real text is always in the DOM
 * for assistive tech (and in the SSG HTML); only the aria-hidden copy is animated.
 */
export function ScrambleText({ className, delay, text, trigger }: ScrambleTextProps) {
  "use no memo";
  const ref = useRef<HTMLSpanElement>(null);
  const mode = trigger ?? "hover";

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const duration = 320 + text.length * 26;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const revealed = Math.floor(progress * text.length);
        let out = "";
        for (let i = 0; i < text.length; i += 1) {
          const char = text[i] as string;
          out +=
            i < revealed || char === " " || char === "·"
              ? char
              : (GLYPHS[Math.floor(Math.random() * GLYPHS.length)] as string);
        }
        el.textContent = out;
        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    if (mode === "load") {
      const timer = window.setTimeout(run, delay ?? 0);
      return () => {
        window.clearTimeout(timer);
        cancelAnimationFrame(raf);
        el.textContent = text;
      };
    }
    const host = el.closest<HTMLElement>("a, button") ?? el;
    host.addEventListener("pointerenter", run);
    host.addEventListener("focus", run);
    return () => {
      host.removeEventListener("pointerenter", run);
      host.removeEventListener("focus", run);
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [delay, mode, text]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" ref={ref}>
        {text}
      </span>
    </span>
  );
}
