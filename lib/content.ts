/**
 * Locale-independent content: names, dates, links and technology labels.
 * Everything that needs translating lives in `lib/i18n/*` and is keyed by `id`.
 */

export type YearMonth = { year: number; month: number };

export type Experience = {
  id: string;
  company: string;
  role: string;
  start: YearMonth;
  /** `null` means the role is current. */
  end: YearMonth | null;
};

export const experiences: Experience[] = [
  {
    id: "aubay",
    company: "Aubay / BMW Group",
    role: "Senior Fullstack Engineer",
    start: { year: 2025, month: 7 },
    end: null,
  },
  {
    id: "banco-do-brasil",
    company: "Banco do Brasil",
    role: "Senior Software Engineer",
    start: { year: 2024, month: 6 },
    end: { year: 2025, month: 7 },
  },
  {
    id: "sicredi",
    company: "Sicredi",
    role: "Software Engineer",
    start: { year: 2023, month: 12 },
    end: { year: 2024, month: 6 },
  },
  {
    id: "stefanini",
    company: "Stefanini Brasil",
    role: "Software Engineer",
    start: { year: 2021, month: 10 },
    end: { year: 2023, month: 12 },
  },
  {
    id: "mirante",
    company: "Mirante Tecnologia",
    role: "Software Engineer",
    start: { year: 2021, month: 6 },
    end: { year: 2021, month: 10 },
  },
  {
    id: "solutis",
    company: "Solutis Tecnologias / TJBA",
    role: "Software Engineer",
    start: { year: 2020, month: 11 },
    end: { year: 2021, month: 6 },
  },
  {
    id: "conquer",
    company: "Escola Conquer",
    role: "Junior Software Engineer",
    start: { year: 2020, month: 5 },
    end: { year: 2020, month: 11 },
  },
];

export const brands = [
  "BMW Group",
  "Lufthansa Group",
  "Banco do Brasil",
  "C&A",
  "Shell",
  "Sicredi",
  "Sicoob",
  "Escola Conquer",
] as const;

export type SkillGroup = { id: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { id: "backend", items: ["Java", "Kotlin", "Python", "Spring Boot", "Quarkus"] },
  { id: "cloud", items: ["AWS", "Kubernetes", "Terraform", "Docker"] },
  { id: "frontend", items: ["Angular", "React", "TypeScript"] },
  { id: "ai", items: ["LLMs", "AI Agents", "RAG"] },
];

export type Project = {
  id: string;
  name: string;
  stack: string[];
  href: string;
};

export const projects: Project[] = [
  {
    id: "travel-platform",
    name: "Travel Platform",
    stack: ["Java", "Quarkus", "Kafka", "MongoDB"],
    href: "https://github.com/jeferson0306/travel-platform",
  },
  {
    id: "product-recommendation-service",
    name: "Product Recommendation Service",
    stack: ["Spring Boot", "WebFlux", "Resilience4j"],
    href: "https://github.com/jeferson0306/product-recommendation-service",
  },
  {
    id: "api-data-validator",
    name: "Data Validator API",
    stack: ["Go", "Redis", "REST"],
    href: "https://github.com/jeferson0306/api-data-validator",
  },
  {
    id: "jay-crew",
    name: "Jay Crew",
    stack: ["TypeScript", "CLI", "npm"],
    href: "https://github.com/jeferson0306/jay-crew",
  },
  {
    id: "portfolio-v2",
    name: "Portfolio v2",
    stack: ["Next.js", "GSAP", "Three.js", "Tailwind"],
    href: "https://github.com/jeferson0306/portfolio-v2",
  },
];

export type Phone = {
  country: "br" | "pt";
  /** Display form, spaced the way each country writes it. */
  label: string;
  /** E.164, no spaces — what `tel:` needs to dial correctly from abroad. */
  href: string;
};

/**
 * Phone numbers are supplied by the environment, never committed. The
 * repository is public, so a number written here would be readable on GitHub
 * regardless of how the page hides it — the build injects them instead, and the
 * page only reveals them once a visitor asks, which keeps them away from the
 * scrapers that harvest rendered HTML.
 *
 * Set NEXT_PUBLIC_PHONE_PT / NEXT_PUBLIC_PHONE_BR as "display|e164".
 * Unset, the phone block simply does not render.
 */
function phoneFromEnv(country: Phone["country"], value: string | undefined): Phone | null {
  if (!value) return null;
  const [label, e164] = value.split("|");
  if (!label || !e164) return null;
  return { country, label, href: `tel:${e164}` };
}

export const phones: Phone[] = [
  phoneFromEnv("pt", process.env.NEXT_PUBLIC_PHONE_PT),
  phoneFromEnv("br", process.env.NEXT_PUBLIC_PHONE_BR),
].filter((phone): phone is Phone => phone !== null);

export const contact = {
  email: "jeferson0306@gmail.com",
  linkedin: "https://www.linkedin.com/in/developerjefersonsiqueira/",
  github: "https://github.com/jeferson0306",
} as const;

export type Stat = { id: string; value: number; prefix?: string; suffix?: string };

/** Headline numbers, all traceable to the roles listed above. */
export const stats: Stat[] = [
  { id: "years", value: 5, suffix: "+" },
  { id: "repos", value: 80, suffix: "+" },
  { id: "performance", value: 40, prefix: "+", suffix: "%" },
  { id: "sla", value: 95, suffix: "%" },
];

/** Anchors the side rail steps through, in document order. */
export const sectionIds = [
  "top",
  "manifesto",
  "trajectory",
  "architecture",
  "stack",
  "work",
  "playground",
  "notes",
  "services",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];

/**
 * Nodes of the request-flow diagram, positioned in the SVG's 900x420 viewBox.
 * The edges are drawn in array order, which is also the order the scroll
 * timeline reveals them.
 */
export type DiagramNode = { id: string; x: number; y: number };

export const diagramNodes: DiagramNode[] = [
  { id: "client", x: 60, y: 210 },
  { id: "gateway", x: 235, y: 210 },
  { id: "identity", x: 435, y: 80 },
  { id: "catalog", x: 435, y: 210 },
  { id: "booking", x: 435, y: 340 },
  { id: "broker", x: 645, y: 210 },
  { id: "store", x: 830, y: 130 },
  { id: "observability", x: 830, y: 300 },
];

export const diagramEdges: [string, string][] = [
  ["client", "gateway"],
  ["gateway", "identity"],
  ["gateway", "catalog"],
  ["gateway", "booking"],
  ["identity", "broker"],
  ["catalog", "broker"],
  ["booking", "broker"],
  ["broker", "store"],
  ["broker", "observability"],
];

/** Headline numbers per project, shown when a case study is opened. */
export type CaseStudyMetric = { id: string; value: string };

export const caseStudyMetrics: Record<string, CaseStudyMetric[]> = {
  "travel-platform": [
    { id: "services", value: "9" },
    { id: "adrs", value: "19" },
    { id: "milestones", value: "20" },
  ],
  "product-recommendation-service": [
    { id: "concurrency", value: "1000+" },
    { id: "latency", value: "2400 → 800ms" },
    { id: "breaker", value: "50% / 10" },
  ],
  "api-data-validator": [
    { id: "validators", value: "7" },
    { id: "cache", value: "Redis" },
    { id: "checksum", value: "Luhn" },
  ],
  "jay-crew": [
    { id: "frameworks", value: "200+" },
    { id: "versions", value: "5" },
    { id: "apiKeys", value: "0" },
  ],
  "portfolio-v2": [
    { id: "languages", value: "3" },
    { id: "clip", value: "1.3 MB" },
    { id: "servers", value: "0" },
  ],
};

/** Optional public deployment, linked from the case study panel. */
export const caseStudyDemos: Record<string, string> = {
  "travel-platform": "https://aerostay-jeferson0306s-projects.vercel.app",
  "jay-crew": "https://www.npmjs.com/package/jay-crew",
};

/** Engagement shapes, from a two-week fix to a long build. */
export type Service = { id: string; stack: string[] };

export const services: Service[] = [
  { id: "platform", stack: ["Java", "Kotlin", "Quarkus", "Spring Boot", "Kafka"] },
  { id: "cloud", stack: ["AWS", "Kubernetes", "Terraform", "Docker"] },
  { id: "interface", stack: ["React", "Next.js", "Angular", "TypeScript"] },
];

/** Where the working day is, so a visitor knows when a reply is likely. */
export const availability = {
  timeZone: "Europe/Lisbon",
  /** Local hours a message is likely to be seen within. */
  workingHours: { from: 9, to: 19 },
} as const;

/** WhatsApp deep link — the fastest route for freelance enquiries, and the one
 *  most clients reach for first. Kept out of source for the same reason as the
 *  phone numbers; set NEXT_PUBLIC_WHATSAPP to the bare digits. */
export const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP
  ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`
  : "";

/**
 * Web3Forms access key. Public by design — it ends up in the client bundle
 * either way — but it is supplied through the environment so it is not sitting
 * in the source tree, and the form degrades to a mailto link without it.
 */
export const contactFormKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

/**
 * Fields the console can check, mirroring the query parameters of the Go
 * service at github.com/jeferson0306/api-data-validator.
 */
export type ValidatorField = { id: string; param: string; sample: string };

export const validatorFields: ValidatorField[] = [
  { id: "cpf", param: "cpf", sample: "529.982.247-25" },
  { id: "email", param: "email", sample: "jeferson@example.com" },
  { id: "name", param: "name", sample: "Jeferson Siqueira" },
  { id: "phone", param: "telephone", sample: "(11) 98765-4321" },
  { id: "cep", param: "cep", sample: "70040-010" },
  { id: "card", param: "plastic", sample: "4111 1111 1111 1111" },
  { id: "rg", param: "rg", sample: "12.345.678-9" },
];

/**
 * When set, the console calls the deployed service instead of running the
 * rules in the browser. Unset, it stays honest about running locally.
 */
export const validatorApi = process.env.NEXT_PUBLIC_VALIDATOR_API ?? "";

/**
 * Technical notes. The prose lives in the dictionaries, keyed by `id`; what is
 * here is the part that does not get translated.
 */
export type Note = {
  id: string;
  /** ISO date the work described actually happened. */
  date: string;
  tags: string[];
  /** Where the reader can check the claim for themselves. */
  source: string;
};

export const notes: Note[] = [
  {
    id: "slow-upstream",
    date: "2026-06-25",
    tags: ["WebFlux", "Resilience4j", "Caffeine"],
    source: "https://github.com/jeferson0306/product-recommendation-service",
  },
  {
    id: "chaos-finding",
    date: "2026-07-23",
    tags: ["k6", "Toxiproxy", "Kubernetes"],
    source:
      "https://github.com/jeferson0306/travel-platform/blob/main/docs/adr/0015-load-and-chaos-testing.md",
  },
  {
    id: "hero-video",
    date: "2026-09-03",
    tags: ["ffmpeg", "GLSL", "GSAP"],
    source:
      "https://github.com/jeferson0306/portfolio-v2/blob/main/scripts/generate-hero-video.mjs",
  },
];
