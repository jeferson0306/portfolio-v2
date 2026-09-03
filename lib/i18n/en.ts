import type { Dictionary } from "./types";

export const en: Dictionary = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  present: "Present",
  nav: {
    work: "Work",
    trajectory: "Trajectory",
    stack: "Stack",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Jeferson Siqueira",
    title: "Digital Experiences that Transform Brands.",
    subtitle: "Senior Full Stack Engineer & Interactive UI Specialist.",
    cta: "See trajectory",
    scroll: "Scroll to explore",
  },
  timeline: {
    eyebrow: "Trajectory",
    title: "Five years building critical systems.",
    lead: "From education platforms to electric mobility architectures — every step added a layer of scale, rigour and speed.",
    roles: {
      aubay:
        "Cloud-native architectures, microservices in Java/Kotlin/Quarkus, AWS and electric mobility ecosystems.",
      "banco-do-brasil":
        "Integration of international financial microservices and regulatory operations (Pershing & NICE Actimize).",
      sicredi:
        "Python automation, a 28% reduction in incident SLA and development for a credit cooperative.",
      stefanini:
        "Cloud modernisation, CI/CD security automation and vulnerability elimination across 80+ repositories.",
      mirante:
        "Database performance tuning (+40%) and modernisation of legacy systems to Java 17 / Spring Boot.",
      solutis: "Mission-critical systems and corporate service management at 95% SLA.",
      conquer: "Development of scalable education platforms using Spring Boot and WebFlux.",
    },
  },
  brands: {
    eyebrow: "Social proof",
    title: "Brands and institutions served.",
  },
  skills: {
    eyebrow: "Stack",
    title: "The tools behind the outcome.",
    groups: {
      backend: "Backend",
      cloud: "Cloud & DevOps",
      frontend: "Frontend",
      ai: "Artificial Intelligence",
    },
  },
  projects: {
    eyebrow: "Projects",
    title: "Featured open source.",
    descriptions: {
      "travel-platform":
        "Travel booking platform built as independently deployable microservices: Quarkus, MongoDB, Kafka, event-driven architecture, full observability, IaC and CI/CD with real quality gates.",
      "product-recommendation-service":
        "Reactive product recommendation service with Spring Boot, WebFlux and Resilience4j — fault tolerance and low latency under load.",
      "portfolio-v2":
        "This site. Next.js with static export, scroll-driven GSAP animations and a WebGL three-dimensional background.",
    },
    view: "View repository",
  },
  footer: {
    eyebrow: "Contact",
    title: "Let's build something memorable.",
    lead: "Available for platform engineering, cloud architecture and high-impact interface work.",
    email: "Email",
    phone: "Phone",
    rights: "All rights reserved.",
    builtWith: "Built with Next.js, GSAP and Three.js.",
  },
  stats: {
    eyebrow: "By the numbers",
    title: "Impact measured, not estimated.",
    labels: {
      years: "Years building production software",
      repos: "Repositories cleared of vulnerabilities",
      performance: "Database performance gain",
      sla: "SLA sustained on critical systems",
    },
  },
  language: "Language",
};
