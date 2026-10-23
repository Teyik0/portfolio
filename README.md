# Teyik0 — portfolio

Personal site of Théo Samarasinghe (Teyik0), TypeScript expert and AI engineer.
Live at **https://teyik0.github.io/portfolio/**.

One statically generated page built with [Furin](https://teyik0.github.io/furin/) (React on
Elysia and Bun), with a raw WebGL2 "signal field" behind it: tens of thousands of curl-noise
particles that morph into a vortex, a wind chime, a peer swarm and a waveform as you scroll.

## Stack

- **Furin** `0.8.0-alpha` on **Elysia** `2.0.0-beta.32` and **Bun** 1.4: SSG, React Server
  Components, static export.
- **React 19**, **Tailwind CSS v4** via `bun-plugin-tailwind`.
- **WebGL2** with hand-written GLSL (no 3D library), booted on the first interaction or 5 s after
  load, so it never competes with the initial render.
- **Lenis** smooth scrolling, fetched on idle (disabled under `prefers-reduced-motion`).
- Self-hosted **Tektur** (display) and **Fira Code** (OFL, see `public/fonts/LICENSE.md`).

## Rendering

The route is SSG. Its loader renders the whole page (`src/components/portfolio.tsx`) to a
Furin composite server component at build time, so the static sections ship as HTML with no
JavaScript. Only the `"use client"` islands hydrate: the WebGL canvas, the nav pill, page
effects (smooth scroll and reveals), text scramble, magnetic links, the copy button and the
video player.

## Commands

| Command | What it does |
|---|---|
| `bun install` | Install dependencies |
| `bun run dev` | Dev server with HMR at http://localhost:3000 |
| `bun check` | Type-check |
| `bun run fix` | Lint and format with Ultracite (Biome) |
| `bun run build` | Production Bun server bundle in `.furin/build/bun` (`bun run start` runs it) |
| `bun run build:static` | Static export for GitHub Pages in `dist/`, under `/portfolio` |
| `bun run start:static` | Preview that export at http://localhost:3000/portfolio/ |

## Layout

```text
src/
├── server.ts            Elysia app with the furin() plugin (dev and Bun builds)
├── site.ts              Base path, asset prefix and canonical URL (build-time only)
├── content.ts           Copy, links and project data
├── pages/
│   ├── root.tsx         HTML document (SSG)
│   ├── index.tsx        The route: loader renders the server tree, head() holds SEO/OG
│   └── globals.css      Design tokens, layout and motion
├── components/          Server sections and the small "use client" islands
└── gl/
    ├── signal-canvas.tsx  Client island: idle boot, scroll/pointer wiring, pausing
    ├── signal-scene.ts    WebGL2 scene (plain TS, SSR-safe)
    ├── scroll-timeline.ts Scroll position to shape morph and reading dim
    └── shaders.ts         Particle and haze GLSL
public/                  Fonts, images, showcase videos, favicons, OG image
```

## Deployment

Every push to `main` runs `.github/workflows/pages.yaml`: it installs with Bun, runs
`bun run build:static` and deploys `dist/` with `actions/deploy-pages`. It can also be started
by hand from the Actions tab. `.github/workflows/ci.yaml` runs lint, type-check and a build on
pushes and pull requests.

One-time setup by the repository owner: **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

The export uses the base path `/portfolio` (`src/site.ts`, read by `furin.config.ts`). Canonical
and Open Graph URLs default to `https://teyik0.github.io/portfolio`; `SITE_URL` overrides them at
build time.
