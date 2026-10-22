import { defineRoute } from "@teyik0/furin";
import { Contact } from "../components/contact";
import { FurinCase } from "../components/furin-case";
import { Hero } from "../components/hero";
import { PageEffects } from "../components/page-effects";
import { SiteHeader } from "../components/site-header";
import { TofuCase } from "../components/tofu-case";
import { PROFILE } from "../content";
import { SignalCanvas } from "../gl/signal-canvas";

interface HeadLink {
  href: string;
  rel: string;
  [attribute: string]: string;
}

const TRAILING_SLASH = /\/$/;

const FONT_PRELOADS: HeadLink[] = [
  "/public/fonts/tektur-latin.woff2",
  "/public/fonts/fira-code-latin.woff2",
].map((href) => ({
  as: "font",
  crossOrigin: "anonymous",
  href,
  rel: "preload",
  type: "font/woff2",
}));

const TITLE = `${PROFILE.name} · ${PROFILE.role}`;

const FONT_FACES = `@font-face{font-family:"Tektur";font-style:normal;font-display:swap;font-weight:400 900;font-stretch:75% 100%;src:url("/public/fonts/tektur-latin.woff2") format("woff2")}
@font-face{font-family:"Fira Code";font-style:normal;font-display:swap;font-weight:300 700;src:url("/public/fonts/fira-code-latin.woff2") format("woff2")}`;

export const route = defineRoute("/")
  .config({ mode: "ssg" })
  // SSG: runs once at build time. Vercel exposes the production domain to builds,
  // which gives Open Graph crawlers the absolute URLs they require.
  .loader(() => {
    const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    const fallback = vercelHost ? `https://${vercelHost}` : "http://localhost:3000";
    return {
      siteUrl: (process.env.SITE_URL ?? fallback).replace(TRAILING_SLASH, ""),
    };
  })
  .head(({ siteUrl }) => ({
    links: [
      { href: `${siteUrl}/`, rel: "canonical" },
      { href: "/public/favicon.svg", rel: "icon", type: "image/svg+xml" },
      { href: "/public/apple-touch-icon.png", rel: "apple-touch-icon" },
      ...FONT_PRELOADS,
    ],
    meta: [
      { title: TITLE },
      { content: PROFILE.description, name: "description" },
      { content: PROFILE.name, name: "author" },
      { content: "#000000", name: "theme-color" },
      { content: "dark", name: "color-scheme" },
      { content: "website", property: "og:type" },
      { content: PROFILE.handle, property: "og:site_name" },
      { content: TITLE, property: "og:title" },
      { content: PROFILE.description, property: "og:description" },
      { content: `${siteUrl}/`, property: "og:url" },
      { content: `${siteUrl}/public/og.jpg`, property: "og:image" },
      { content: "1200", property: "og:image:width" },
      { content: "630", property: "og:image:height" },
      { content: `${PROFILE.name}, ${PROFILE.role}`, property: "og:image:alt" },
      { content: "summary_large_image", name: "twitter:card" },
      { content: TITLE, name: "twitter:title" },
      { content: PROFILE.description, name: "twitter:description" },
      { content: `${siteUrl}/public/og.jpg`, name: "twitter:image" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Person",
          alternateName: PROFILE.handle,
          image: `${siteUrl}/public/media/avatar-960.webp`,
          jobTitle: PROFILE.role,
          name: PROFILE.name,
          sameAs: [PROFILE.github, PROFILE.linkedin],
          url: `${siteUrl}/`,
        },
      },
    ],
    styles: [{ children: FONT_FACES }],
  }))
  .page(() => (
    <>
      <PageEffects />
      <SignalCanvas />
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">
        <Hero />
        <FurinCase />
        <TofuCase />
        <Contact />
      </main>
    </>
  ));
