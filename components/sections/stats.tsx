"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { animate, utils } from "animejs";
import { SplitHeading } from "@/components/motion/split-heading";
import { stats } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

export function Stats() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Reduced motion means no counting, not no number. Returning early here
      // left every figure reading "0" — an animation that fails open must fail
      // to the truth, not to its starting frame.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.utils.toArray<HTMLElement>("[data-stat]").forEach((element) => {
          const output = element.querySelector<HTMLElement>("[data-stat-value]");
          if (output) output.textContent = element.dataset.statTarget ?? "0";
          gsap.set(element, { opacity: 1 });
        });
        return;
      }

      // ScrollTrigger decides *when*; anime.js drives the count itself, because
      // its `modifier` keeps the rendered value an integer at every frame.
      gsap.utils.toArray<HTMLElement>("[data-stat]").forEach((element, index) => {
        const output = element.querySelector<HTMLElement>("[data-stat-value]");
        const target = Number(element.dataset.statTarget ?? 0);
        if (!output) return;

        ScrollTrigger.create({
          trigger: element,
          start: "top 85%",
          once: true,
          onEnter: () => {
            const counter = { value: 0 };
            animate(counter, {
              value: target,
              duration: 1600,
              delay: index * 90,
              ease: "out(4)",
              modifier: utils.round(0),
              onUpdate: () => {
                output.textContent = String(Math.round(counter.value));
              },
            });
            animate(element, { opacity: [0, 1], y: [24, 0], duration: 900, ease: "out(3)" });
          },
        });
      });
    },
    { scope: rootRef, dependencies: [t], revertOnUpdate: true },
  );

  return (
    <section ref={rootRef} data-backdrop="paper" className="relative z-10">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
          {t.stats.eyebrow}
        </p>
        <SplitHeading
          text={t.stats.title}
          className="text-display mt-5 max-w-2xl text-3xl font-semibold sm:text-4xl lg:text-5xl"
        />

        <dl className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              data-stat
              data-stat-target={stat.value}
              className="border-t border-[var(--border)] pt-6"
            >
              <dt className="sr-only">{t.stats.labels[stat.id]}</dt>
              <dd>
                <p className="text-display font-mono text-5xl font-medium tabular-nums sm:text-6xl">
                  {stat.prefix}
                  <span data-stat-value>0</span>
                  {stat.suffix}
                </p>
                <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-[var(--text-secondary)]">
                  {t.stats.labels[stat.id]}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
