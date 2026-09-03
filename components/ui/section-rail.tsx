"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { sectionIds } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Fixed index of the page. It answers "where am I and how much is left" — the
 * question a long scroll-driven page otherwise leaves open — and doubles as
 * navigation.
 *
 * Desktop only: on a phone it would compete with the content for the same
 * narrow gutter.
 */
export function SectionRail() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(sectionIds[0]);

  useGSAP(
    () => {
      const triggers = sectionIds.map((id) =>
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => self.isActive && setActive(id),
        }),
      );

      return () => triggers.forEach((trigger) => trigger.kill());
    },
    { dependencies: [] },
  );

  return (
    <div
      ref={rootRef}
      aria-label={t.rail[sectionIds[0]]}
      // Only shown once the viewport is wider than the 1400px content column
      // plus its gutters — below that the rail would sit on top of the text.
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 min-[1600px]:flex"
    >
      {sectionIds.map((id, index) => {
        const isActive = id === active;
        return (
          <a
            key={id}
            href={`#${id}`}
            data-cursor
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <span
              aria-hidden
              className={`h-px transition-all duration-500 ${
                isActive
                  ? "w-8 bg-white"
                  : "w-3 bg-white/25 group-hover:w-6 group-hover:bg-white/60"
              }`}
            />
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
                isActive
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-muted)] opacity-0 group-hover:opacity-100"
              }`}
            >
              {String(index + 1).padStart(2, "0")} {t.rail[id]}
            </span>
          </a>
        );
      })}
    </div>
  );
}
