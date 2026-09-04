"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { experiences } from "@/lib/content";
import { formatPeriod } from "@/lib/format";
import { useI18n } from "@/lib/i18n/provider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Timeline() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const current = experiences[active];

  // Pin the left panel and hand it over to whichever entry is being read.
  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: "[data-timeline-list]",
          start: "top 22%",
          end: "bottom 65%",
          // The right-hand column supplies the height; the panel just rides
          // along, so it must not add scroll distance of its own.
          pin: panelRef.current,
          pinSpacing: false,
        });

        gsap.utils.toArray<HTMLElement>("[data-timeline-item]").forEach((item, index) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setActive(index),
          });
        });

        gsap.fromTo(
          "[data-timeline-rail]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: "[data-timeline-list]",
              start: "top 65%",
              end: "bottom 75%",
              scrub: 0.4,
            },
          },
        );
      });

      // Entries dim until they reach the reading band. Runs at every width.
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-timeline-item]").forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0.28, x: 14 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 45%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      return () => media.revert();
    },
    { scope: rootRef, dependencies: [t], revertOnUpdate: true },
  );

  // Crossfade the pinned panel whenever the active entry changes.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-timeline-panel-content]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    },
    { scope: panelRef, dependencies: [active], revertOnUpdate: true },
  );

  return (
    <section
      id="trajectory"
      ref={rootRef}
      className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 lg:px-12 lg:py-48"
    >
      <SectionIntro />

      <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        {/* Pinned panel: the entry currently being read, stated large. */}
        <div ref={panelRef} className="hidden lg:block">
          <div data-timeline-panel-content className="lg:pt-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
              {String(active + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
            </p>
            <p className="text-display mt-6 font-mono text-7xl font-medium tabular-nums text-[var(--text-muted)] xl:text-8xl">
              {current.start.year}
            </p>
            <h3 className="text-display mt-8 text-3xl font-semibold xl:text-4xl">
              {current.company}
            </h3>
            <p className="mt-3 text-sm font-medium text-[var(--text-secondary)]">{current.role}</p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
              {formatPeriod(current, t)}
            </p>
          </div>
        </div>

        <div data-timeline-list className="relative">
          <div
            aria-hidden
            className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-[var(--rule)] sm:block lg:left-0"
          >
            <div data-timeline-rail className="h-full w-full origin-top bg-[var(--rule-strong)]" />
          </div>

          <ol className="space-y-16 sm:space-y-20">
            {experiences.map((experience, index) => (
              <li key={experience.id} data-timeline-item className="relative sm:pl-14 lg:pl-10">
                <span
                  aria-hidden
                  className={`absolute left-0 top-2 hidden h-[13px] w-[13px] rounded-full transition-colors duration-500 sm:block lg:-left-[6px] ${
                    index === active ? "bg-[var(--text-primary)]" : "bg-[var(--text-muted)]"
                  }`}
                />

                {/* Repeated on small screens, where the pinned panel is hidden. */}
                <div className="lg:hidden">
                  <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                    {formatPeriod(experience, t)}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                    {experience.company}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                    {experience.role}
                  </p>
                </div>

                <p className="mt-4 max-w-xl leading-relaxed text-[var(--text-secondary)] lg:mt-0 lg:text-lg">
                  {t.timeline.roles[experience.id]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SectionIntro() {
  const { t } = useI18n();
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
          {t.timeline.eyebrow}
        </p>
      </Reveal>
      <SplitHeading
        text={t.timeline.title}
        className="text-display mt-5 text-4xl font-semibold sm:text-5xl lg:text-6xl"
      />
      <SplitHeading
        as="p"
        text={t.timeline.lead}
        delay={0.15}
        className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
      />
    </div>
  );
}
