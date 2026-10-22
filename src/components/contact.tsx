import { PROFILE } from "../content";
import { SectionRule } from "./case-study";
import { ArrowUp, ArrowUpRight } from "./icons";
import { Magnetic } from "./magnetic";
import { ScrambleText } from "./scramble-text";

const CHANNELS = [
  { handle: "@Teyik0", href: PROFILE.github, label: "GitHub" },
  { handle: "in/théo-samarasinghe", href: PROFILE.linkedin, label: "LinkedIn" },
] as const;

export function Contact() {
  return (
    <section aria-labelledby="contact-title" className="contact" id="contact">
      <div className="shell">
        <SectionRule index="03" meta={["Open channel"]} name="Contact" />

        <div className="contact__grid">
          <h2 className="contact__title reveal" id="contact-title">
            Send a signal<span className="text-signal">.</span>
          </h2>
          <div className="contact__aside reveal">
            <img
              alt={`Illustrated portrait of ${PROFILE.name}`}
              className="contact__avatar"
              height={263}
              loading="lazy"
              src="/public/media/avatar.webp"
              width={240}
            />
            <p>
              Type-safe tooling, frameworks, or the systems around models: if
              you are building in that space, I would like to hear about it.
            </p>
          </div>
        </div>

        <ul className="channels">
          {CHANNELS.map(({ handle, href, label }) => (
            <li className="reveal" key={href}>
              <a
                className="channel"
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="channel__label">
                  <ScrambleText text={label} />
                </span>
                <span className="channel__handle">{handle}</span>
                <Magnetic className="channel__arrow" strength={0.35}>
                  <ArrowUpRight className="size-5" />
                </Magnetic>
              </a>
            </li>
          ))}
        </ul>

        <footer className="footer">
          <span className="label" suppressHydrationWarning>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <span className="label hidden md:inline">
            Built with Furin, three.js and Bun
          </span>
          <a className="label footer__top" href="#index">
            <ScrambleText text="Back to top" />
            <ArrowUp className="size-3" />
          </a>
        </footer>
      </div>
    </section>
  );
}
