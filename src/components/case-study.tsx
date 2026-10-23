import type { CSSProperties } from "react";
import type { ProjectLink, SellingPoint } from "../content";
import { ArrowUpRight } from "./icons";
import { Magnetic } from "./magnetic";
import { ScrambleText } from "./scramble-text";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function SectionRule({
  index,
  meta,
  name,
}: {
  index: string;
  meta: string[];
  name: string;
}) {
  return (
    <div className="section-rule reveal">
      <span className="label label--strong">
        <span className="text-amber">{index}</span> / {name}
      </span>
      {meta.map((item) => (
        <span className="label section-rule__meta" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

export function SellingPoints({ points }: { points: readonly SellingPoint[] }) {
  return (
    <ol className="points">
      {points.map((point, i) => (
        <li className="point reveal" key={point.title} style={delay(i * 90)}>
          <span className="point__index">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="point__title">{point.title}</h3>
          <p className="point__body">{point.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function StackTags({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul aria-label={label} className="tags">
      {items.map((item) => (
        <li className="tag" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function LinkRow({ links, project }: { links: readonly ProjectLink[]; project: string }) {
  return (
    <ul aria-label={`${project} links`} className="link-row">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Magnetic>
            <a className="link-pill" href={href} rel="noopener noreferrer" target="_blank">
              <ScrambleText text={label} />
              <ArrowUpRight className="link-pill__icon size-3.5" />
            </a>
          </Magnetic>
        </li>
      ))}
    </ul>
  );
}
