import { type CSSProperties, useEffect, useRef, useState } from "react";
import { PROFILE, SECTIONS, type SectionId } from "../content";
import { BrandMark } from "./icons";
import { ScrambleText } from "./scramble-text";

/** Glass pill navigation with a sliding purple-to-blue indicator on the section in view. */
export function SiteHeader() {
  "use no memo";
  const [active, setActive] = useState<SectionId>("index");
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!(list && indicator)) {
      return;
    }
    const place = () => {
      const link = list.querySelector<HTMLElement>(`[data-section="${active}"]`);
      if (!link) {
        return;
      }
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.dataset.placed = "";
    };
    place();
    const resizeObserver = new ResizeObserver(place);
    resizeObserver.observe(list);
    return () => resizeObserver.disconnect();
  }, [active]);

  return (
    <header className="site-header intro" style={{ "--i": 0 } as CSSProperties}>
      <div className="shell site-header__row">
        <a aria-label={`${PROFILE.handle}, back to top`} className="brand" href="#index">
          <BrandMark className="brand__mark size-[18px] text-ink" />
          <span className="brand__name">{PROFILE.handle}</span>
        </a>

        <nav aria-label="Sections" className="nav-pill">
          <span aria-hidden="true" className="nav-pill__indicator" ref={indicatorRef} />
          <ul className="nav-pill__list" ref={listRef}>
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a
                  aria-current={active === id ? "location" : undefined}
                  className="nav-pill__link"
                  data-section={id}
                  href={`#${id}`}
                >
                  <ScrambleText text={label} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="header-cta" href={PROFILE.github} rel="noopener noreferrer" target="_blank">
          <ScrambleText text="GitHub" />
          <span aria-hidden="true" className="header-cta__dot" />
        </a>
      </div>
    </header>
  );
}
