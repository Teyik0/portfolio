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

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
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
