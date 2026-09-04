"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { flagBodies, flagsByLocale } from "@/lib/flags";
import type { Locale } from "@/lib/i18n/types";

/** How long the strip stays up once it has arrived. */
const HOLD_MS = 1700;

export type Burst = { locale: Locale; id: number };

/**
 * A short flourish under the language switcher: the flags of the countries that
 * speak the chosen language drift in, hold, and leave.
 *
 * It is driven by a `burst` token rather than by watching the locale, because
 * the locale also changes once on load when the browser language is detected —
 * and a flourish that fires at nobody's request is just noise. A new `id` means
 * somebody pressed a button.
 *
 * Purely decorative, and marked as such: the language change is already carried
 * by the switcher's `aria-pressed` and by `documentElement.lang`, so announcing
 * two dozen country names on top of that would make the page worse to listen to
 * in exchange for nothing.
 */
export function LocaleFlags({ burst }: { burst: Burst | null }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!burst || !root) return;

    const flags = Array.from(root.querySelectorAll<HTMLElement>("[data-flag]"));
    if (flags.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let leaving = 0;

    if (reduced) {
      // No drift, but not nothing: they still appear and go, which is the whole
      // point of the flourish.
      animate(flags, { opacity: [0, 1], duration: 240, ease: "out(2)" });
      leaving = window.setTimeout(
        () => animate(flags, { opacity: 0, duration: 420, ease: "out(2)" }),
        HOLD_MS,
      );
    } else {
      animate(flags, {
        opacity: [0, 1],
        translateX: [18, 0],
        translateY: [6, 0],
        scale: [0.6, 1],
        duration: 620,
        // Right to left, following the switcher the reader just pressed.
        delay: stagger(52, { from: "last" }),
        ease: "out(3)",
      });

      leaving = window.setTimeout(() => {
        animate(flags, {
          opacity: 0,
          translateX: -14,
          scale: 0.8,
          duration: 520,
          delay: stagger(34),
          ease: "in(2)",
        });
      }, HOLD_MS);
    }

    return () => window.clearTimeout(leaving);
  }, [burst]);

  if (!burst) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      // Never in the way: this floats under the switcher and cannot be clicked,
      // hovered or tabbed to.
      className="pointer-events-none absolute right-0 top-full mt-2 flex select-none items-center gap-1.5"
    >
      {flagsByLocale[burst.locale].map((code) => (
        <span
          // Keyed by the burst as well as the country, so pressing the same
          // language twice replays the flourish instead of leaving it faded out.
          key={`${burst.id}-${code}`}
          data-flag
          className="block h-[11px] w-[16px] overflow-hidden rounded-[2px] opacity-0 ring-1 ring-[var(--border)]"
        >
          <svg
            viewBox="0 0 513 342"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            dangerouslySetInnerHTML={{ __html: flagBodies[code] }}
          />
        </span>
      ))}
    </div>
  );
}
