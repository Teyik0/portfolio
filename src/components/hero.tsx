import type { CSSProperties } from "react";
import { PROFILE } from "../content";
import { ArrowDown, ArrowUpRight } from "./icons";
import { Magnetic } from "./magnetic";
import { ScrambleText } from "./scramble-text";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** Splits a word into masked letters that rise in sequence on page load. */
function Letters({ offset, word }: { offset: number; word: string }) {
  return (
    <span aria-hidden="true" className="hero-name__line">
      {[...word].map((char, i) => (
        <span
          className="hero-name__char"
          // biome-ignore lint/suspicious/noArrayIndexKey: letters of a static word.
          key={i}
          style={{ "--c": offset + i } as CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const [first, last] = PROFILE.name.split(" ") as [string, string];

  return (
    <section aria-labelledby="hero-title" className="hero" id="index">
      <div className="shell hero__grid">
        <div className="hero__meta">
          <span className="label intro" style={order(1)}>
            <span className="text-amber">00</span> / Index
          </span>
          <span className="label intro hidden md:inline" style={order(2)}>
            {PROFILE.handle} — personal site
          </span>
          <span className="label intro status" style={order(3)}>
            <span aria-hidden="true" className="status__dot" />
            Building Furin
          </span>
        </div>

        <div className="hero__body">
          <h1 className="hero-name" id="hero-title">
            <span className="sr-only">{PROFILE.name}</span>
            <Letters offset={0} word={first} />
            <Letters offset={first.length} word={last} />
          </h1>

          <div className="hero__intro">
            <p className="hero__role intro" style={order(6)}>
              <ScrambleText
                className="text-amber"
                delay={720}
                text="TypeScript Expert"
                trigger="load"
              />
              <span aria-hidden="true" className="hero__role-sep">
                ·
              </span>
              <ScrambleText
                className="text-indigo"
                delay={900}
                text="AI Engineer"
                trigger="load"
              />
            </p>
            <p className="hero__bio intro" style={order(7)}>
              I design type-safe frameworks and developer tools in TypeScript,
              and engineer AI-powered software with the same rigor: strict types
              from schema to UI, fast runtimes, interfaces that stay out of the
              way.
            </p>
            <div className="hero__links intro" style={order(8)}>
              <Magnetic>
                <a
                  className="link-pill"
                  href={PROFILE.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ScrambleText text="GitHub" />
                  <ArrowUpRight className="link-pill__icon size-3.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  className="link-pill"
                  href={PROFILE.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ScrambleText text="LinkedIn" />
                  <ArrowUpRight className="link-pill__icon size-3.5" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="hero__foot intro" style={order(10)}>
          <a className="scroll-cue" href="#furin">
            <ArrowDown className="size-3.5" />
            <ScrambleText text="Scroll" />
          </a>
          <span className="label hidden sm:inline">
            Two projects, one framework
          </span>
          <span className="label pointer-hint">Move through the field</span>
        </div>
      </div>
    </section>
  );
}
