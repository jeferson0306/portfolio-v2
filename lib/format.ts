import type { Experience, YearMonth } from "./content";
import type { Dictionary } from "./i18n";

function formatYearMonth(value: YearMonth, months: string[]): string {
  return `${months[value.month - 1]} ${value.year}`;
}

/** "Jul 2025 — Presente" / "Jul 2025 — Jul 2025", localised. */
export function formatPeriod(experience: Experience, t: Dictionary): string {
  const start = formatYearMonth(experience.start, t.months);
  const end = experience.end ? formatYearMonth(experience.end, t.months) : t.present;
  return `${start} — ${end}`;
}
