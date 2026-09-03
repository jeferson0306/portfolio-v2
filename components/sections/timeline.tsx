"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { experiences } from "@/lib/content";
import { formatPeriod } from "@/lib/format";
import { useI18n } from "@/lib/i18n/provider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Timeline() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // The rail fills in step with the scroll position across the whole list.
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

      // Each entry dims until it reaches the reading band, then holds focus.
      gsap.utils.toArray<HTMLElement>("[data-timeline-item]").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.22, x: 18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              end: "bottom 45%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          item.querySelector("[data-timeline-dot]"),
          { scale: 0.6, backgroundColor: "#3f3f46", boxShadow: "0 0 0 0 rgba(255,255,255,0)" },
          {
            scale: 1,
            backgroundColor: "#ffffff",
            boxShadow: "0 0 0 6px rgba(255,255,255,0.08)",
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              end: "bottom 45%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: rootRef, dependencies: [t], revertOnUpdate: true },
  );

  return (
    <section
      id="trajectory"
      ref={rootRef}
      className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 lg:px-12 lg:py-48"
    >
      <SectionHeading
        eyebrow={t.timeline.eyebrow}
        title={t.timeline.title}
        lead={t.timeline.lead}
      />

      <div data-timeline-list className="relative mt-24 lg:mt-32">
        {/* Rail: a static track with a scroll-driven fill on top of it. */}
        <div
          aria-hidden
          className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-white/10 sm:block"
        >
          <div data-timeline-rail className="h-full w-full origin-top bg-white/70" />
        </div>

        <ol className="space-y-16 sm:space-y-20">
          {experiences.map((experience) => (
            <li key={experience.id} data-timeline-item className="relative sm:pl-16">
              <span
                data-timeline-dot
                aria-hidden
                className="absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full bg-zinc-700 sm:block"
              />

              <div className="grid gap-3 lg:grid-cols-[220px_1fr] lg:gap-10">
                <p className="pt-1 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  {formatPeriod(experience, t)}
                </p>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {experience.company}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                    {experience.role}
                  </p>
                  <p className="mt-4 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
                    {t.timeline.roles[experience.id]}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
