import { FURIN } from "../content";
import { ASSET_BASE } from "../site";
import { LinkRow, SectionRule, SellingPoints, StackTags } from "./case-study";
import { CopyCommand } from "./copy-command";
import { ShowcaseVideo } from "./showcase-video";

export function FurinCase() {
  return (
    <section aria-labelledby="furin-title" className="case case--furin" id="furin">
      <div className="shell">
        <SectionRule
          index="01"
          meta={["風鈴 · wind chime", "React meta-framework", "Open source · Alpha"]}
          name="Furin"
        />

        <div className="case__grid">
          <h2 className="case-title reveal" id="furin-title">
            <span className="case-title__word">Furin</span>
            <img
              alt=""
              className="case-title__logo case-title__logo--furin"
              height={247}
              src={`${ASSET_BASE}/media/furin-logo.webp`}
              width={148}
            />
          </h2>
          <div className="case__copy">
            <p className="case-pitch reveal">{FURIN.pitch}</p>
            <div className="case-start reveal">
              <span className="label">Start a project</span>
              <CopyCommand command={FURIN.command} />
            </div>
          </div>

          <div className="case__media reveal">
            <ShowcaseVideo
              label="Furin showcase: file-based routes, rendering modes and type inference in motion"
              path={`${ASSET_BASE}/videos/furin-showcase`}
              title="furin — showcase"
            />
          </div>
        </div>

        <SellingPoints points={FURIN.points} />

        <div className="case__footer reveal">
          <StackTags items={FURIN.stack} label="Furin stack" />
          <LinkRow links={FURIN.links} project="Furin" />
        </div>
      </div>
    </section>
  );
}
