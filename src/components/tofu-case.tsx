import { TOFU } from "../content";
import { ASSET_BASE } from "../site";
import { LinkRow, SectionRule, SellingPoints, StackTags } from "./case-study";
import { ArrowUp } from "./icons";
import { ShowcaseVideo } from "./showcase-video";

export function TofuCase() {
  return (
    <section aria-labelledby="tofu-title" className="case case--tofu" id="tofu">
      <div className="shell">
        <SectionRule
          index="02"
          meta={["Desktop torrent client", "macOS · Windows · Linux"]}
          name="Tofu"
        />

        <div className="case__grid case__grid--flip">
          <h2 className="case-title reveal" id="tofu-title">
            <img
              alt=""
              className="case-title__logo case-title__logo--tofu"
              height={192}
              loading="lazy"
              src={`${ASSET_BASE}/media/tofu-icon.webp`}
              width={192}
            />
            <span className="case-title__word">Tofu</span>
          </h2>
          <div className="case__copy">
            <p className="case-pitch reveal">{TOFU.pitch}</p>
            <a className="built-on reveal" href="#furin">
              <img
                alt=""
                height={247}
                loading="lazy"
                src={`${ASSET_BASE}/media/furin-logo.webp`}
                width={148}
              />
              <span>
                Built on <strong>Furin</strong>: the framework above, dogfooded in a desktop app.
              </span>
              <ArrowUp className="built-on__icon size-3.5 shrink-0" />
            </a>
          </div>

          <div className="case__media case__media--stacked reveal">
            <ShowcaseVideo
              label="Tofu showcase: search, plugins, AniList tracking and live transfer stats in motion"
              path={`${ASSET_BASE}/videos/tofu-showcase`}
              title="tofu — showcase"
            />
            <figure className="window window--inset">
              <figcaption className="window__bar window__bar--compact">
                <span aria-hidden="true" className="window__dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="window__title">AniList plugin</span>
                <span />
              </figcaption>
              <img
                alt="Tofu's AniList view: a grid of tracked anime with search, genre, year and season filters."
                height={720}
                loading="lazy"
                src={`${ASSET_BASE}/media/tofu-demo.webp`}
                width={1280}
              />
            </figure>
          </div>
        </div>

        <SellingPoints points={TOFU.points} />

        <div className="case__footer reveal">
          <StackTags items={TOFU.stack} label="Tofu stack" />
          <LinkRow links={TOFU.links} project="Tofu" />
        </div>
      </div>
    </section>
  );
}
