"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/provider";
import type { Burst } from "./locale-flags";

// ~15 kB of flag markup, fetched after hydration and long before anyone gets
// round to pressing a language.
const LocaleFlags = dynamic(() => import("./locale-flags").then((m) => m.LocaleFlags), {
  ssr: false,
});

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [burst, setBurst] = useState<Burst | null>(null);

  const choose = (option: Locale) => {
    setLocale(option);
    // A monotonic id rather than a boolean: pressing the same language twice
    // should replay the flourish, and two presses in a row must not collapse
    // into one unchanged prop.
    setBurst((previous) => ({ locale: option, id: (previous?.id ?? 0) + 1 }));
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface-raised)] p-1 backdrop-blur"
        role="group"
        aria-label={t.language}
      >
        {locales.map((option: Locale) => {
          const active = option === locale;
          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              aria-pressed={active}
              aria-label={localeNames[option]}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest transition-colors duration-300 ${
                active
                  ? // The pill is painted in the primary text colour, so its own
                    // label has to be the page ground — `text-black` was black
                    // on near-black in the light theme, i.e. invisible.
                    "bg-[var(--text-primary)] text-[var(--bg-body)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <LocaleFlags burst={burst} />
    </div>
  );
}
