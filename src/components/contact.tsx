import { PROFILE } from "../content";
import { ASSET_BASE } from "../site";
import { SectionRule } from "./case-study";
import { ArrowUp, ArrowUpRight } from "./icons";
import { Magnetic } from "./magnetic";
import { ScrambleText } from "./scramble-text";

const CHANNELS = [
  { band: "CH 01", handle: "github.com/Teyik0", href: PROFILE.github, label: "GitHub" },
  {
    band: "CH 02",
    handle: "in/théo-samarasinghe",
    href: PROFILE.linkedin,
    label: "LinkedIn",
  },
] as const;

/**
 * A radio tuner: two open channels on one dial. Hovering or focusing a station glides the
 * needle onto it (pure CSS via :has) and, through `data-signal-tune`, locks the particle
 * waveform from noise into a clean sine.
 */
export function Contact() {
  return (
    <section aria-labelledby="contact-title" className="contact" id="contact">
      <div className="shell">
        <SectionRule index="03" meta={["Two open channels"]} name="Contact" />

        <div className="contact__head">
          <h2 className="contact__title reveal" id="contact-title">
            Tune in<span className="text-signal">.</span>
          </h2>
          <div className="operator reveal">
            <img
              alt={`Illustrated portrait of ${PROFILE.name}`}
              className="operator__avatar"
              height={200}
              loading="lazy"
              sizes="64px"
              src={`${ASSET_BASE}/media/avatar-160.webp`}
              srcSet={`${ASSET_BASE}/media/avatar-160.webp 160w, ${ASSET_BASE}/media/avatar-480.webp 480w`}
              width={160}
            />
            <p className="operator__note">
              Type-safe tooling, frameworks, or the systems around models: if you are building in
              that space, pick a channel.
            </p>
          </div>
        </div>

        <div className="tuner reveal">
          <div aria-hidden="true" className="tuner__readout">
            <span className="tuner__state tuner__state--idle">Scanning</span>
            <span className="tuner__state tuner__state--ch1">Locked · CH 01 · GitHub</span>
            <span className="tuner__state tuner__state--ch2">Locked · CH 02 · LinkedIn</span>
          </div>
          <div aria-hidden="true" className="tuner__dial">
            <span className="tuner__needle" />
          </div>
          <ul className="tuner__stations">
            {CHANNELS.map(({ band, handle, href, label }) => (
              <li key={href}>
                <a
                  className="station"
                  data-signal-tune=""
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="station__band">{band}</span>
                  <span className="station__label">
                    <ScrambleText text={label} />
                  </span>
                  <span className="station__handle">{handle}</span>
                  <Magnetic className="station__arrow" strength={0.35}>
                    <ArrowUpRight className="size-5" />
                  </Magnetic>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <footer className="footer">
          <span className="label">
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <span className="label hidden md:inline">Built with Furin, WebGL2 and Bun</span>
          <a className="label footer__top" href="#index">
            <ScrambleText text="Back to top" />
            <ArrowUp className="size-3" />
          </a>
        </footer>
      </div>
    </section>
  );
}
