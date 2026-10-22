import { defineRoute } from "@teyik0/furin";
import type { HeadOptions } from "@teyik0/furin/client";
import { CompositeComponent, createCompositeComponent } from "@teyik0/furin/rsc";
import { Portfolio } from "../components/portfolio";
import { PROFILE } from "../content";
import { ASSET_BASE, SITE_URL } from "../site";

export const route = defineRoute("/")
  .config({ mode: "ssg" })
  // SSG: the loader runs once at build time and renders the page to Flight. The static tree
  // ships as markup only; the client loads just the "use client" islands it references.
  .loader(async () => ({
    content: await createCompositeComponent(() => <Portfolio />),
  }))
  // head() and everything only it reads are stripped from the browser bundle, so the
  // build-time values (base path, site URL) stay server-side.
  .head((): HeadOptions => {
    const title = `${PROFILE.name} · ${PROFILE.role}`;
    const fonts = [
      `${ASSET_BASE}/fonts/tektur-latin.woff2`,
      `${ASSET_BASE}/fonts/fira-code-latin.woff2`,
    ];
    return {
      links: [
        { href: `${SITE_URL}/`, rel: "canonical" },
        { href: `${ASSET_BASE}/favicon.svg`, rel: "icon", type: "image/svg+xml" },
        { href: `${ASSET_BASE}/apple-touch-icon.png`, rel: "apple-touch-icon" },
        ...fonts.map((href) => ({
          as: "font",
          crossOrigin: "anonymous",
          href,
          rel: "preload",
          type: "font/woff2",
        })),
      ],
      meta: [
        { title },
        { content: PROFILE.description, name: "description" },
        { content: PROFILE.name, name: "author" },
        { content: "#000000", name: "theme-color" },
        { content: "dark", name: "color-scheme" },
        { content: "website", property: "og:type" },
        { content: PROFILE.handle, property: "og:site_name" },
        { content: title, property: "og:title" },
        { content: PROFILE.description, property: "og:description" },
        { content: `${SITE_URL}/`, property: "og:url" },
        { content: `${SITE_URL}/og.jpg`, property: "og:image" },
        { content: "1200", property: "og:image:width" },
        { content: "630", property: "og:image:height" },
        { content: `${PROFILE.name}, ${PROFILE.role}`, property: "og:image:alt" },
        { content: "summary_large_image", name: "twitter:card" },
        { content: title, name: "twitter:title" },
        { content: PROFILE.description, name: "twitter:description" },
        { content: `${SITE_URL}/og.jpg`, name: "twitter:image" },
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@type": "Person",
            alternateName: PROFILE.handle,
            image: `${SITE_URL}/media/avatar-960.webp`,
            jobTitle: PROFILE.role,
            name: PROFILE.name,
            sameAs: [PROFILE.github, PROFILE.linkedin],
            url: `${SITE_URL}/`,
          },
        },
      ],
      styles: [
        {
          children: `@font-face{font-family:"Tektur";font-style:normal;font-display:swap;font-weight:400 900;font-stretch:75% 100%;src:url("${fonts[0]}") format("woff2")}
@font-face{font-family:"Fira Code";font-style:normal;font-display:swap;font-weight:300 700;src:url("${fonts[1]}") format("woff2")}`,
        },
      ],
    };
  })
  .page(({ content }) => <CompositeComponent src={content} />);
