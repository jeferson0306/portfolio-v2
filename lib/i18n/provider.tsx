"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries } from ".";
import { defaultLocale, locales, type Dictionary, type Locale } from "./types";

const STORAGE_KEY = "portfolio.locale";

type I18nValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Reads the stored preference first, then falls back to the browser language. */
function detectLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) — ignore.
  }
  const navigatorLocale = window.navigator.language?.slice(0, 2).toLowerCase();
  return isLocale(navigatorLocale) ? navigatorLocale : defaultLocale;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // The first render must match the server-rendered HTML, so detection is
  // deferred to an effect rather than done during render.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Persisting the choice is a convenience, never a requirement.
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ locale, t: dictionaries[locale], setLocale }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}
