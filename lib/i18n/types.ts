export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export type Dictionary = {
  /** Short month labels, index 0 = January. */
  months: string[];
  present: string;
  nav: {
    work: string;
    trajectory: string;
    stack: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    scroll: string;
  };
  timeline: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Keyed by `Experience.id`. */
    roles: Record<string, string>;
  };
  brands: {
    eyebrow: string;
    title: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    /** Keyed by `SkillGroup.id`. */
    groups: Record<string, string>;
  };
  projects: {
    eyebrow: string;
    title: string;
    /** Keyed by `Project.id`. */
    descriptions: Record<string, string>;
    view: string;
  };
  footer: {
    eyebrow: string;
    title: string;
    lead: string;
    email: string;
    phone: string;
    rights: string;
    builtWith: string;
  };
  stats: {
    eyebrow: string;
    title: string;
    /** Keyed by `Stat.id`. */
    labels: Record<string, string>;
  };
  language: string;
};
