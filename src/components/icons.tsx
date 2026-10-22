interface IconProps {
  className?: string;
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 16 16">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 16 16">
      <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ArrowUp({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 16 16">
      <path d="M8 13.5v-11M3.5 7 8 2.5 12.5 7" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function CopyIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 16 16">
      <rect height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" width="9" x="5" y="5" />
      <path
        d="M11 3.5V3A1.5 1.5 0 0 0 9.5 1.5h-6A1.5 1.5 0 0 0 2 3v6.5A1.5 1.5 0 0 0 3.5 11H4"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 16 16">
      <path d="m3 8.5 3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** The four-dot mark from the previous site, kept as the brand glyph. */
export function BrandMark({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
      <circle cx="10" cy="3" fill="currentColor" r="2.2" />
      <circle cx="3" cy="10" fill="currentColor" r="2.2" />
      <circle cx="17" cy="10" fill="currentColor" r="2.2" />
      <circle cx="10" cy="17" fill="currentColor" r="2.2" />
    </svg>
  );
}
