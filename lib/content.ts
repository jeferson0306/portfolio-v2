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
];

export const contact = {
  email: "jeferson0306@gmail.com",
  linkedin: "https://www.linkedin.com/in/jeferson0306",
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
