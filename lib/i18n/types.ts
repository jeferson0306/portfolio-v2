export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export type Dictionary = {
  /** Short month labels, index 0 = January. */
  months: string[];
  present: string;
  nav: {
    work: string;
    services: string;
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
    /** Keyed by `Phone.country`. */
    countries: Record<string, string>;
    rights: string;
    builtWith: string;
  };
  stats: {
    eyebrow: string;
    title: string;
    /** Keyed by `Stat.id`. */
    labels: Record<string, string>;
  };
  /** Side-rail labels, keyed by `SectionId`. */
  rail: Record<string, string>;
  manifesto: {
    eyebrow: string;
    text: string;
    /** Cycled through by the scramble effect. */
    roles: string[];
  };
  architecture: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Keyed by `DiagramNode.id`. */
    nodes: Record<string, string>;
    caption: string;
  };
  caseStudy: {
    open: string;
    close: string;
    demo: string;
    highlightsLabel: string;
    /** Keyed by `CaseStudyMetric.id`. */
    metrics: Record<string, string>;
    /** Keyed by `Project.id`. */
    summaries: Record<string, string>;
    /** Keyed by `Project.id`. */
    highlights: Record<string, string[]>;
  };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Keyed by `Service.id`. */
    names: Record<string, string>;
    /** Keyed by `Service.id`. */
    summaries: Record<string, string>;
    /** Keyed by `Service.id`. */
    deliverables: Record<string, string[]>;
    shape: string;
    /** Keyed by `Service.id`. */
    shapes: Record<string, string>;
  };
  availability: {
    open: string;
    localTime: string;
    replyWithin: string;
    outsideHours: string;
  };
  contact: {
    formTitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    sent: string;
    failed: string;
    fallback: string;
    whatsapp: string;
    revealPhone: string;
    /** Subject line pre-filled on the mailto link. */
    mailSubject: string;
    /** Body pre-filled on the mailto link, so nobody starts from a blank page. */
    mailBody: string;
    /** Message pre-filled on the WhatsApp deep link. */
    whatsappText: string;
  };
  playground: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Keyed by `ValidatorField.id`. */
    fields: Record<string, string>;
    request: string;
    response: string;
    run: string;
    modeLocal: string;
    modeLive: string;
    waking: string;
    fellBack: string;
    valid: string;
    invalid: string;
    note: string;
  };
  cv: {
    print: string;
    summary: string;
    experience: string;
    skills: string;
    projects: string;
    clients: string;
    download: string;
  };
  notes: {
    eyebrow: string;
    title: string;
    lead: string;
    read: string;
    collapse: string;
    source: string;
    /** Keyed by \`Note.id\`. */
    entries: Record<string, { title: string; dek: string; body: string[]; takeaway: string }>;
  };
  language: string;
  theme: string;
};
