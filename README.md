# Teyik0 — portfolio

Personal site of Théo Samarasinghe (Teyik0), TypeScript expert and AI engineer.

One statically generated page built with [Furin](https://teyik0.github.io/furin/) (React on
Elysia and Bun), with a three.js "signal field" behind it: tens of thousands of curl-noise
particles that morph into a vortex, a wind chime, a peer swarm and a waveform as you scroll.

## Stack

- **Furin** `0.8.0-alpha` on **Elysia** `2.0.0-beta.32` and **Bun** 1.4: file-based routing, SSG.
- **React 19**, **Tailwind CSS v4** via `bun-plugin-tailwind`.
- **three.js** with custom GLSL shaders, loaded client-side after hydration.
- **Lenis** smooth scrolling (disabled under `prefers-reduced-motion`).
- Self-hosted **Tektur** (display) and **Fira Code** (OFL, see `public/fonts/LICENSE.md`).

## Commands

| Command | What it does |
|---|---|
| `bun install` | Install dependencies |
| `bun run dev` | Dev server with HMR at http://localhost:3000 |
| `bun run tscheck` | Type-check |
| `bun run lint` / `bun run fix` | Check / fix with Ultracite (Biome) |
| `bun run build` | Production Bun server bundle in `.furin/build/bun` |
| `bun run start` | Run that bundle |
| `bun run build:vercel` | Vercel Build Output in `.vercel/output` |

## Layout

```text
src/
├── server.ts            Elysia app with the furin() plugin
├── content.ts           Copy, links and project data
├── pages/
│   ├── root.tsx         HTML document (SSG)
│   ├── index.tsx        The page: SEO/Open Graph head + sections
│   └── globals.css      Design tokens, layout and motion
├── components/          Header, hero, case studies, contact, interaction primitives
└── gl/
    ├── signal-canvas.tsx  Client-only mount: lazy import, scroll/pointer wiring, pausing
    ├── signal-scene.ts    three.js scene (dynamically imported)
    └── shaders.ts         Particle and haze GLSL
public/                  Fonts, images, showcase videos, favicons
```

## Deployment

Vercel runs `bun run build:vercel` (see `vercel.json`), which emits the Build Output API v3:
the page is prerendered at build time and served from the CDN.

Set `SITE_URL` (for example `https://example.com`) to control the canonical and Open Graph
URLs. Without it, the build uses Vercel's `VERCEL_PROJECT_PRODUCTION_URL`.
