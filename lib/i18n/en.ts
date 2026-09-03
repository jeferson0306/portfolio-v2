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
    countries: { br: "Brazil", pt: "Portugal" },
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
  rail: {
    top: "Start",
    manifesto: "Manifesto",
    trajectory: "Trajectory",
    architecture: "Architecture",
    stack: "Stack",
    work: "Work",
    contact: "Contact",
  },
  manifesto: {
    eyebrow: "How I work",
    text: "Systems that survive contact with reality. That can be debugged from a single log line, scale under load, recover from a dependency outage — and be understood by someone who did not write them.",
    roles: ["Senior Fullstack Engineer", "Cloud-Native Architect", "Interactive UI Specialist"],
  },
  architecture: {
    eyebrow: "Architecture",
    title: "The path of a request.",
    lead: "The shape that recurs at Banco do Brasil, at Sicredi and in travel-platform: a gateway in front, independent services behind it, events joining them, and observability cutting across everything.",
    nodes: {
      client: "Client",
      gateway: "API Gateway",
      identity: "Identity",
      catalog: "Catalogue",
      booking: "Booking",
      broker: "Kafka",
      store: "Persistence",
      observability: "Observability",
    },
    caption: "Every service deploys independently. Failure stays isolated instead of cascading.",
  },
  caseStudy: {
    open: "Open case study",
    close: "Close",
    demo: "View live demo",
    highlightsLabel: "Engineering decisions",
    metrics: {
      services: "Independent microservices",
      adrs: "ADRs written",
      milestones: "Milestones shipped",
      concurrency: "Concurrent requests",
      latency: "Aggregation latency",
      breaker: "Circuit breaker threshold",
      languages: "Languages supported",
      clip: "Hero clip weight",
      servers: "Servers required",
    },
    summaries: {
      "travel-platform":
        "A booking platform built as nine independently deployable microservices, using the practices of a production team: domain-driven design, event-driven communication, infrastructure as code and a CI/CD pipeline with real quality gates.",
      "product-recommendation-service":
        "A reactive service that aggregates two slow external APIs (up to 1800ms and 800ms) and returns personalised recommendations under high concurrency, without exhausting the thread pool.",
      "portfolio-v2":
        "This site. A serverless static export with scroll-linked animation and a background clip generated locally — no paid services, no licensed footage.",
    },
    highlights: {
      "travel-platform": [
        "19 ADRs written against what was actually built and measured, not against what was planned.",
        "A Toxiproxy chaos experiment against the circuit breaker — the failure was provoked on purpose and documented.",
        "A resource-constrained Kubernetes deployment surfaced three genuine Kubernetes-specific bugs.",
        "An LLM hallucinated until its context window was fixed; the fix is recorded in an ADR.",
      ],
      "product-recommendation-service": [
        "Spring WebFlux on Netty: non-blocking I/O across a few event-loop threads instead of thread-per-request.",
        "Caffeine caches with per-source TTLs — 30 minutes for profiles, 2 minutes for the catalogue — matched to how fresh each one has to be.",
        "Categories fetched in parallel with Flux.flatMap: total time becomes the slowest request, not the sum.",
        "Layered timeout, exponential-backoff retry and circuit breaker; a failing category returns partial results rather than failing the whole request.",
      ],
      "portfolio-v2": [
        "The hero clip is rendered locally with Node and ffmpeg from the same GLSL shader as the WebGL background.",
        "A keyframe every 5 frames in the encode — that is what makes scroll-scrubbing seek instantly.",
        "PT/EN/ES, with TypeScript failing the build when a translation is missing.",
        "Every animation has a prefers-reduced-motion counterpart; headings read without JavaScript.",
      ],
    },
  },
  language: "Language",
};
