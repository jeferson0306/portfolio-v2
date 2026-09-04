"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { useI18n } from "@/lib/i18n/provider";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, useGSAP);

/**
 * A single statement that lights up word by word as the section is scrolled
 * through, with the section pinned so the reading pace is the scroll's.
 *
 * This is the one place on the page where scrolling *is* the animation's
 * playhead for text rather than for a video or a layout — it deliberately
 * breaks the "heading, then a block that fades up" rhythm of the sections
 * around it.
 */
export function Manifesto() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const paragraph = rootRef.current?.querySelector<HTMLElement>("[data-manifesto-text]");
      const role = rootRef.current?.querySelector<HTMLElement>("[data-manifesto-role]");
      if (!paragraph) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(paragraph, { color: "var(--text-primary)" });
        if (role) role.textContent = t.manifesto.roles[0];
        return;
      }

      gsap.fromTo(
        "[data-manifesto-rule]",
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "+=140%", scrub: 0.5 },
        },
      );

      const split = SplitText.create(paragraph, {
        type: "words",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(self.words, { color: "#3f3f46" });

          return gsap.to(self.words, {
            color: "#fafafa",
            ease: "none",
            stagger: 1,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "+=140%",
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
            },
          });
        },
      });

      // The role line cycles on its own clock: it is a detail you notice while
      // reading, not something the scroll drives.
      let cycle: gsap.core.Timeline | undefined;
      if (role) {
        cycle = gsap.timeline({ repeat: -1 });
        t.manifesto.roles.forEach((value) => {
          cycle!.to(role, {
            duration: 1,
            scrambleText: { text: value, chars: "upperCase", speed: 0.4, revealDelay: 0.3 },
          });
          cycle!.to({}, { duration: 2.4 });
        });
      }

      return () => {
        split.revert();
        cycle?.kill();
      };
    },
    { scope: rootRef, dependencies: [t], revertOnUpdate: true },
  );

  return (
    <section
      id="manifesto"
      ref={rootRef}
      data-backdrop="none"
      className="relative z-10 flex h-screen items-center overflow-hidden"
    >
      {/* The only thing in an otherwise empty section: one line, drawn as you
          arrive. After a page of atmosphere, restraint is the contrast. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-6 top-0 h-full w-px lg:left-12"
        preserveAspectRatio="none"
        viewBox="0 0 1 100"
      >
        <line
          data-manifesto-rule
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100"
          stroke="var(--border-strong)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
          {t.manifesto.eyebrow}
        </p>

        <p
          data-manifesto-text
          className="text-display mt-10 max-w-5xl text-[clamp(1.6rem,3.6vw,3.4rem)] font-medium leading-[1.25]"
        >
          {t.manifesto.text}
        </p>

        <p
          data-manifesto-role
          aria-label={t.manifesto.roles.join(", ")}
          className="mt-14 font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-secondary)] sm:text-sm"
        >
          {t.manifesto.roles[0]}
        </p>
      </div>
    </section>
  );
}
