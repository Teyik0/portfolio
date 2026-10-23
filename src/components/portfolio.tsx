import { SignalCanvas } from "../gl/signal-canvas";
import { Contact } from "./contact";
import { FurinCase } from "./furin-case";
import { Hero } from "./hero";
import { PageEffects } from "./page-effects";
import { SiteHeader } from "./site-header";
import { TofuCase } from "./tofu-case";

/**
 * The whole page as a server component tree. The route loader renders it to Flight at build
 * time, so this markup and its static sections ship no JavaScript; only the "use client"
 * islands it references (canvas, header, effects, scramble, magnetic, copy, video) hydrate.
 */
export function Portfolio() {
  return (
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
  );
}
