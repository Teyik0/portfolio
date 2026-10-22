/**
 * Maps page scroll to the signal field's state. Plain DOM math, no React and no WebGL,
 * so the component that wires it stays a thin mount.
 */

/** Document offsets of each section, measured once per layout change. */
export interface ScrollTimeline {
  /** Scroll window, in px, over which the field morphs into the next section's shape. */
  boundaries: { end: number; start: number }[];
  /** Top of every section, in document coordinates. */
  tops: number[];
}

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

export function measureTimeline(sectionIds: readonly string[]): ScrollTimeline {
  const vh = window.innerHeight;
  const maxScroll = document.documentElement.scrollHeight - vh;
  const tops = sectionIds.map((id) => {
    const el = document.getElementById(id);
    return el ? el.getBoundingClientRect().top + window.scrollY : maxScroll;
  });
  const boundaries = tops.slice(1).map((top) => {
    const end = Math.min(maxScroll, Math.max(1, top - vh * 0.3));
    return { end, start: Math.min(end - 1, Math.max(0, top - vh * 0.9)) };
  });
  return { boundaries, tops };
}

/**
 * Continuous shape index: 0 = index, 1 = Furin, 2 = Tofu, 3 = contact. Each shape holds while
 * its section fills the viewport and morphs only while the next section's top travels from 90%
 * to 30% of the viewport height.
 */
export function readMorph({ boundaries }: ScrollTimeline): number {
  let morph = 0;
  for (const { end, start } of boundaries) {
    const t = clamp01((window.scrollY - start) / (end - start));
    morph += t * t * (3 - 2 * t);
  }
  return morph;
}

/**
 * 0..1 while a section's text-dense body (selling points, links) scrolls through the area its
 * shape occupies: from once its title stage has passed until the next morph begins.
 */
export function readDim({ tops }: ScrollTimeline): number {
  const y = window.scrollY;
  const vh = window.innerHeight;
  let dim = 0;
  for (let i = 1; i < tops.length; i += 1) {
    const top = tops[i] as number;
    const next = tops[i + 1] ?? Number.POSITIVE_INFINITY;
    const enter = clamp01((y - (top + vh * 0.35)) / (vh * 0.3));
    const leave = clamp01((next - vh * 0.95 - y) / (vh * 0.12));
    dim = Math.max(dim, enter * leave);
  }
  return dim;
}
