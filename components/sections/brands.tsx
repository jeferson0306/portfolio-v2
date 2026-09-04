"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitHeading } from "@/components/motion/split-heading";
import { brands } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

export function Brands() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Two identical tracks scrolling one full width apart give a seamless loop.
      const loop = gsap.to("[data-marquee-track]", {
        xPercent: -100,
        repeat: -1,
        ease: "none",
        duration: 26,
      });

      // Scroll velocity bends the marquee: faster while the page moves, and it
      // reverses when the user scrolls up. This is the detail that makes the
      // strip feel physically connected to the scroll rather than decorative.
      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(-6, 6, self.getVelocity() / 220);
          gsap.to(loop, {
            timeScale: self.direction === -1 ? -1 - Math.abs(boost) : 1 + Math.abs(boost),
            duration: 0.4,
            overwrite: true,
          });
        },
      });

      return () => {
        trigger.kill();
        loop.kill();
      };
    },
    { scope: rootRef },
  );

  const track = (
    <ul data-marquee-track className="flex shrink-0 items-center">
      {brands.map((brand) => (
        <li key={brand} className="flex items-center gap-12 whitespace-nowrap px-12">
          <span className="text-2xl font-medium tracking-tight text-[var(--text-muted)] transition-colors duration-500 hover:text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            {brand}
          </span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--border-strong)]" />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      ref={rootRef}
      className="relative z-10 border-y border-[var(--border)] bg-[var(--bg-surface)]/40 py-24 lg:py-32"
    >
      <div className="mx-auto mb-16 max-w-[1400px] px-6 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
          {t.brands.eyebrow}
        </p>
        <SplitHeading
          text={t.brands.title}
          className="text-display mt-5 max-w-2xl text-3xl font-semibold sm:text-4xl"
        />
      </div>

      <div
        className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
        aria-label={t.brands.title}
      >
        {track}
        <div aria-hidden className="flex shrink-0">
          {track}
        </div>
      </div>
    </section>
  );
}
