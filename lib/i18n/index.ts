import type { Dictionary, Locale } from "./types";
import { pt } from "./pt";
import { en } from "./en";
import { es } from "./es";

export const dictionaries: Record<Locale, Dictionary> = { pt, en, es };

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export { locales, defaultLocale } from "./types";
export type { Dictionary, Locale } from "./types";
