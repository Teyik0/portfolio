// Read by head(), the loader and the server tree only, so it never reaches a browser chunk. It is
// not marked furin/server-only because client-reference discovery walks the server tree.

/** GitHub Pages project path (github.com/Teyik0/portfolio). furin.config.ts exports with it. */
export const PAGES_BASE_PATH = "/portfolio";

/**
 * URL prefix of files in public/. The Bun server mounts them under /public; the static export
 * copies them to the root of the base path. `build:static` sets STATIC_EXPORT=1.
 */
export const ASSET_BASE = process.env.STATIC_EXPORT === "1" ? PAGES_BASE_PATH : "/public";

/** Canonical origin for canonical, Open Graph and JSON-LD URLs (always the published layout). */
export const SITE_URL = process.env.SITE_URL ?? `https://teyik0.github.io${PAGES_BASE_PATH}`;
