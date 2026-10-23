export const PROFILE = {
  description:
    "Théo Samarasinghe (Teyik0) builds type-safe frameworks and developer tools in TypeScript, and engineers AI-powered software. Creator of Furin and Tofu.",
  github: "https://github.com/Teyik0",
  handle: "Teyik0",
  linkedin: "https://www.linkedin.com/in/th%C3%A9o-samarasinghe/",
  name: "Théo Samarasinghe",
  role: "TypeScript Expert · AI Engineer",
} as const;

export const SECTIONS = [
  { id: "index", label: "Index" },
  { id: "furin", label: "Furin" },
  { id: "tofu", label: "Tofu" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export interface SellingPoint {
  body: string;
  title: string;
}

export interface ProjectLink {
  href: string;
  label: string;
}

export const FURIN = {
  command: "bun create furin@latest my-app",
  links: [
    { href: "https://teyik0.github.io/furin/", label: "Docs" },
    { href: "https://github.com/Teyik0/furin", label: "GitHub" },
    { href: "https://www.npmjs.com/package/@teyik0/furin", label: "npm" },
  ] satisfies ProjectLink[],
  pitch:
    "React meta-framework powered by Elysia and Bun: file-based routing, SSR, SSG, ISR, and full TypeScript inference.",
  points: [
    {
      body: "Elysia owns HTTP, the file tree owns pages, Bun owns dev and builds. No second app server, no Vite proxy beside your API.",
      title: "One process, one origin",
    },
    {
      body: "Each page picks SSR, SSG or ISR in config(). Mix them freely, then ship a Bun server, a single executable, static files or Vercel.",
      title: "Rendering, declared per route",
    },
    {
      body: "TypeBox schemas validate params and search at runtime and carry inferred types through loaders, head(), pages and links.",
      title: "Types from one schema",
    },
  ] satisfies SellingPoint[],
  stack: ["TypeScript", "Bun", "Elysia", "React 19", "TypeBox"],
} as const;

export const TOFU = {
  links: [
    { href: "https://github.com/Teyik0/Tofu", label: "GitHub" },
    { href: "https://github.com/Teyik0/Tofu/releases", label: "Releases" },
  ] satisfies ProjectLink[],
  pitch:
    "A desktop torrent client with a clean interface, real transfer stats, and built-in anime tracking.",
  points: [
    {
      body: "Cmd+K searches every download thread and enabled source at once, so you can review a release before it lands in the right folder.",
      title: "Search everywhere",
    },
    {
      body: "Nyaa, Tsundere-Raws and C411 sources, with optional AniList tracking that picks up what you are watching.",
      title: "Plugins that follow releases",
    },
    {
      body: "Live transfer stats, a downloads library that survives restarts, and storage checks that repair a download instead of starting over.",
      title: "A library you can trust",
    },
  ] satisfies SellingPoint[],
  stack: ["Bun", "React", "Furin", "Electrobun", "WebTorrent"],
} as const;
