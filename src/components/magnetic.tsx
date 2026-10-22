import { type ReactNode, useEffect, useRef } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the pointer offset the element follows. */
  strength?: number;
}

/** Pulls its content toward the cursor on fine pointers; inert on touch and reduced motion. */
export function Magnetic({ children, className, strength }: MagneticProps) {
  "use no memo";
  const ref = useRef<HTMLSpanElement>(null);
  const pull = strength ?? 0.3;

  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;
    if (!(el && fine)) {
      return;
    }
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * pull;
      const y = (event.clientY - (rect.top + rect.height / 2)) * pull;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [pull]);

  return (
    <span className={`magnetic ${className ?? ""}`} ref={ref}>
      {children}
    </span>
  );
}
