"use client";

import { localeNames, locales, type Locale } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/provider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-white/[0.03] p-1 backdrop-blur"
      role="group"
      aria-label={t.language}
    >
      {locales.map((option: Locale) => {
        const active = option === locale;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            aria-pressed={active}
            aria-label={localeNames[option]}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest transition-colors duration-300 ${
              active
                ? "bg-white text-black"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
