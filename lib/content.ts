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

export const phones: Phone[] = [
  { country: "pt", label: "+351 961 796 687", href: "tel:+351961796687" },
  { country: "br", label: "+55 61 99194-6758", href: "tel:+5561991946758" },
];

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
