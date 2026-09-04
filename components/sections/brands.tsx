"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { brands } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

// ~84 kB of physics engine, loaded only when this section is actually reached.
const BrandPhysics = dynamic(
  () => import("@/components/motion/brand-physics").then((m) => m.BrandPhysics),
  { ssr: false },
);

/**
 * The brands fall in and pile up, and can be pushed around.
 *
 * Every other section is something to look at. This one is something to touch —
 * which is why it reads as different from its neighbours in a way no change of
 * shader achieved. The difference is interaction, not appearance.
 *
 * Under reduced motion nothing falls: the same names are laid out as a plain
 * list, which is also what a reader with JavaScript disabled gets.
 */
export function Brands() {
  const { t } = useI18n();
  const arenaRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  // Cosmetics only. `live` mounts the simulation, which then owns the brands'
  // positions directly; this says the frame loop is confirmed alive, and is
  // used for nothing that would move an element if it never arrives.
  const [running, setRunning] = useState(false);

  // Stable identity: the physics effect depends on it, and a new function each
  // render would tear the simulation down and rebuild it.
  const handleRunning = useCallback(() => setRunning(true), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const arena = arenaRef.current;
    if (!arena) return;

    // Starting before the section is on screen would mean the pile has already
    // settled by the time anyone sees it, and the fall is the point.
    //
    // But the observer alone is not enough: it never fires for a section that
    // is *already* in view at mount — someone following a link straight to it,
    // or a short viewport where it is visible from the start — and the section
    // would sit there as a plain list forever. So the first check is immediate.
    const inView = () => {
      const box = arena.getBoundingClientRect();
      return box.top < window.innerHeight * 0.85 && box.bottom > 0;
    };

    if (inView()) {
      setLive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(arena);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-backdrop="field"
      className="relative z-10 border-y border-[var(--border)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
            {t.brands.eyebrow}
          </p>
        </Reveal>
        <SplitHeading
          text={t.brands.title}
          className="text-display mt-5 max-w-2xl text-3xl font-semibold sm:text-4xl"
        />

        <div
          ref={arenaRef}
          className={`relative mt-14 w-full overflow-hidden ${
            live ? "h-[420px] lg:h-[460px]" : ""
          } ${running ? "cursor-grab active:cursor-grabbing" : ""}`}
        >
          {/* Always an ordinary wrapped list. The simulation lifts these out of
              flow itself, in the same synchronous pass as the first placement,
              and puts them back if the frame loop never runs. */}
          <ul className="flex flex-wrap items-start gap-3 pt-2">
            {brands.map((brand) => (
              <li
                key={brand}
                data-brand-pill
                className="select-none whitespace-nowrap rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-6 py-3 text-lg font-medium tracking-tight text-[var(--text-secondary)] backdrop-blur-sm sm:text-xl lg:text-2xl"
              >
                {brand}
              </li>
            ))}
          </ul>

          {live ? <BrandPhysics containerRef={arenaRef} onRunning={handleRunning} /> : null}
        </div>

        {running ? (
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {t.brands.nudge}
          </p>
        ) : null}
      </div>
    </section>
  );
}
