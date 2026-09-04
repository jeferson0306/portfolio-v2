"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { Flag } from "@/components/ui/flag";
import { phones } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

/**
 * Numbers stay out of the rendered HTML until a visitor asks for them, which
 * is what defeats the harvesters that scrape pages for `tel:` links.
 *
 * This is a speed bump, not a wall: a scraper that runs JavaScript will still
 * find them. The real protection is that the numbers are not in the source of
 * a public repository — see `lib/content.ts`.
 */
export function PhoneReveal() {
  const { t } = useI18n();
  const [revealed, setRevealed] = useState(false);

  if (phones.length === 0) return null;

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        data-cursor
        className="mt-3 inline-flex items-center gap-3 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
      >
        <Phone className="h-4 w-4 text-[var(--text-muted)]" />
        {t.contact.revealPhone}
      </button>
    );
  }

  return (
    <ul className="mt-3 space-y-2">
      {phones.map((phone) => (
        <li key={phone.country}>
          <a
            href={phone.href}
            data-cursor
            className="inline-flex items-center gap-3 text-lg tracking-tight transition-opacity hover:opacity-70 sm:text-xl"
          >
            <Flag country={phone.country} />
            {phone.label}
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {t.footer.countries[phone.country]}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
