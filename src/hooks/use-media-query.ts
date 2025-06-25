'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook for tracking whether a media query matches.
 * @param query The media query string (e.g., "(min-width: 768px)").
 * @returns True if the media query matches, false otherwise.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure window is defined (for SSR compatibility, though less critical for this specific hook in client components)
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };

    // Add event listener
    // Using addEventListener and removeEventListener for modern browsers
    media.addEventListener('change', listener);

    // Cleanup function to remove the event listener
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};
