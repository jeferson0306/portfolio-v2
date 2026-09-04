"use client";

import { FLAG_STRIP_HEIGHT, flagStrips } from "@/lib/flags";
import { useI18n } from "@/lib/i18n/provider";

/** Rendered height of the strip, in px. The tile scales from this. */
const BAND_HEIGHT = 16;

/**
 * A faint, continuous band of flags drifting across the header: the countries
 * that speak whichever language is selected. Switch language and the band
 * changes with it.
 *
 * It is one element with a repeating background image, not a row of <svg>. A
 * band this wide would need well over a hundred of them, and they would exist
 * only to be fifteen percent visible. Repeating one tile also means the loop
 * can be a `transform` of exactly one tile width — seamless, and something the
 * compositor animates without layout or paint.
 *
 * Decorative throughout: `aria-hidden`, and no pointer events. The language is
 * already announced by the switcher's `aria-pressed` and by
 * `documentElement.lang`.
 */
export function LocaleFlagBand() {
  const { locale } = useI18n();
  const strip = flagStrips[locale];

  // The tile is authored at FLAG_STRIP_HEIGHT tall; scale its width to match
  // the height we actually paint, or the loop shifts by the wrong distance.
  const scale = BAND_HEIGHT / FLAG_STRIP_HEIGHT;
  const tile = Math.round(strip.width * scale);

  return (
    // Hidden below `md`: with the nav links collapsed, the header is just the
    // name and the controls, and the gap left between them is too narrow for a
    // band to read as anything but a smudge.
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
    >
      <div
        // Remounting on a language change restarts the fade, so the new set
        // arrives rather than cutting in.
        key={locale}
        data-flag-band
        className="absolute left-0 top-1/2 -translate-y-1/2"
        style={{
          height: BAND_HEIGHT,
          // One tile wider than the header, so the element still covers the
          // full width at the far end of the shift.
          width: `calc(100% + ${tile}px)`,
          backgroundImage: `url("${strip.uri}")`,
          backgroundSize: `${tile}px ${BAND_HEIGHT}px`,
          ["--flag-tile" as string]: `${tile}px`,
        }}
      />
    </div>
  );
}
