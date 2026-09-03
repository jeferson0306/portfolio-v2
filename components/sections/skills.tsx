"use client";

import { useMemo, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { skillGroups } from "@/lib/content";
import { TechIcon } from "@/components/ui/tech-icon";
import { useI18n } from "@/lib/i18n/provider";

export function Skills() {
  const { t } = useI18n();
  const gridRef = useRef<HTMLUListElement>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // One flat list so the grid can be addressed by index for the ripple.
  const cells = useMemo(
    () => skillGroups.flatMap((group) => group.items.map((item) => ({ group: group.id, item }))),
    [],
  );

  /**
   * Sends a wave outward from the hovered cell. anime.js measures the distance
   * in grid coordinates rather than in list order, which is why the ripple
   * spreads in a circle instead of running left to right.
   */
  const ripple = (index: number) => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The column count comes from the resolved grid, so it follows the
    // breakpoints without duplicating them in JavaScript.
    const columns = window
      .getComputedStyle(grid)
      .gridTemplateColumns.split(" ")
      .filter(Boolean).length;
    if (!columns) return;

    const rows = Math.ceil(cells.length / columns);

    animate(grid.querySelectorAll("[data-skill-cell]"), {
      scale: [
        { to: 1.07, duration: 220 },
        { to: 1, duration: 420 },
      ],
      borderColor: [
        { to: "rgba(255,255,255,0.28)", duration: 220 },
        { to: "rgba(255,255,255,0.08)", duration: 420 },
      ],
      ease: "out(3)",
      delay: stagger(38, { grid: [columns, rows], from: index }),
    });
  };

  return (
    <section
      id="stack"
      className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 lg:px-12 lg:py-48"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
              {t.skills.eyebrow}
            </p>
          </Reveal>
          <SplitHeading
            text={t.skills.title}
            className="text-display mt-5 text-4xl font-semibold sm:text-5xl lg:text-6xl"
          />
        </div>

        {/* Names the family of whatever the pointer is over. */}
        <p
          aria-live="polite"
          className="min-h-6 font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-secondary)] transition-opacity duration-300 lg:text-right"
          style={{ opacity: activeGroup ? 1 : 0.35 }}
        >
          {activeGroup ? t.skills.groups[activeGroup] : t.skills.eyebrow}
        </p>
      </div>

      <ul
        ref={gridRef}
        onPointerLeave={() => {
          setActiveGroup(null);
          setHovered(null);
        }}
        className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-20 lg:grid-cols-5"
      >
        {cells.map((cell, index) => (
          <li key={cell.item}>
            <div
              data-skill-cell
              data-cursor
              onPointerEnter={() => {
                setActiveGroup(cell.group);
                setHovered(cell.item);
                ripple(index);
              }}
              className="relative flex h-28 items-center justify-center rounded-xl border border-[var(--border)] bg-white/[0.02] px-3 text-center will-change-transform lg:h-36"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {/* Family index: without it the fifteen cells read as one
                  undifferentiated block until the pointer lands on one. */}
              <span
                aria-hidden
                className={`absolute left-3 top-3 font-mono text-[10px] tracking-widest transition-colors duration-300 ${
                  activeGroup === cell.group ? "text-[var(--text-secondary)]" : "text-white/20"
                }`}
              >
                {String(skillGroups.findIndex((group) => group.id === cell.group) + 1).padStart(
                  2,
                  "0",
                )}
              </span>
              <span
                className={`flex flex-col items-center gap-3 transition-colors duration-300 ${
                  activeGroup === null || activeGroup === cell.group
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                <TechIcon name={cell.item} active={hovered === cell.item} />
                <span className="text-xs font-medium tracking-tight lg:text-sm">{cell.item}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
