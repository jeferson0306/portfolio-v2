import type { Dictionary } from "./types";

export const en: Dictionary = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  present: "Present",
  nav: {
    work: "Work",
    services: "Services",
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
      "api-data-validator":
        "A Go API that validates and normalises Brazilian data — email, CPF, name, phone, RG, postcode and card — behind a single endpoint, cached in Redis.",
      "jay-crew":
        "A CLI published on npm: it scans any project, detects the stack and generates a structured briefing for AI assistants. No API key required.",
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
    playground: "Try it",
    notes: "Notes",
    services: "Services",
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
      validators: "Validators behind one endpoint",
      cache: "Cache layer",
      checksum: "Checksum algorithm",
      frameworks: "Frameworks detected",
      versions: "Versions published",
      apiKeys: "API keys required",
      languages: "Languages supported",
      clip: "Hero clip weight",
      servers: "Servers required",
    },
    summaries: {
      "travel-platform":
        "A booking platform built as nine independently deployable microservices, using the practices of a production team: domain-driven design, event-driven communication, infrastructure as code and a CI/CD pipeline with real quality gates.",
      "product-recommendation-service":
        "A reactive service that aggregates two slow external APIs (up to 1800ms and 800ms) and returns personalised recommendations under high concurrency, without exhausting the thread pool.",
      "api-data-validator":
        "A Go service that validates the data any Brazilian form asks for. It accepts loose formats, sanitises the input and returns structured JSON — one endpoint, one parameter at a time.",
      "jay-crew":
        "A CLI that scans a project and produces a context file any AI assistant can act on: project tree, detected stack, dependencies and the agent definitions relevant to the task.",
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
      "api-data-validator": [
        "CPF validated by its check digits, not merely by character count.",
        "Card numbers validated with Luhn, with the brand identified.",
        "CPF results cached in Redis — the check is deterministic, so it is cacheable.",
        "Names normalised: accents stripped, invalid characters filtered, spaces collapsed.",
      ],
      "jay-crew": [
        "Automatic stack detection across 200+ frameworks, including monorepos and multi-service layouts.",
        "Makes no external calls and asks for no API key — it is the framing; the model is yours.",
        "Published on npm under MIT, five versions shipped.",
        "The output is a single Markdown file, readable by a human before it is handed to a machine.",
      ],
      "portfolio-v2": [
        "The hero clip is rendered locally with Node and ffmpeg from the same GLSL shader as the WebGL background.",
        "A keyframe every 5 frames in the encode — that is what makes scroll-scrubbing seek instantly.",
        "PT/EN/ES, with TypeScript failing the build when a translation is missing.",
        "Every animation has a prefers-reduced-motion counterpart; headings read without JavaScript.",
      ],
    },
  },
  services: {
    eyebrow: "How I can help",
    title: "From the first line to something that holds in production.",
    lead: "I take on a two-week diagnosis as readily as building a whole platform. What does not change is the standard: it ships with tests, with observability, and with someone able to maintain it without me.",
    names: {
      platform: "Platform & microservices",
      cloud: "Cloud & DevOps",
      interface: "Interactive interfaces",
    },
    summaries: {
      platform:
        "Designing and building services that deploy on their own, talk through events, and fail in isolation rather than in a cascade.",
      cloud:
        "Taking what runs on your machine to reproducible infrastructure, behind a pipeline that stops what should not pass.",
      interface:
        "Front-ends that load fast and move well, with accessibility handled rather than promised.",
    },
    deliverables: {
      platform: [
        "Documented domain boundaries and API contracts",
        "Event-driven communication with real fault tolerance",
        "Tests, metrics and logs good enough to debug at three in the morning",
      ],
      cloud: [
        "Infrastructure as code, from nothing to a complete environment",
        "CI/CD with quality gates that actually fail",
        "Legacy migration without stopping the business",
      ],
      interface: [
        "Interface built from the design, not approximated from it",
        "Performance measured — Lighthouse, Core Web Vitals",
        "Internationalisation and accessibility from day one",
      ],
    },
    shape: "Typical shape",
    shapes: {
      platform: "A 6 to 16 week project, or a monthly retainer",
      cloud: "A 2 week diagnosis, or a 4 to 12 week migration",
      interface: "A 3 to 10 week project",
    },
  },
  availability: {
    open: "Available for new work",
    localTime: "Local time in Lisbon",
    replyWithin: "Usually replies within 24 hours",
    outsideHours: "Outside working hours — read in the morning",
  },
  contact: {
    formTitle: "Send a message",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    sending: "Sending…",
    sent: "Received. I will reply shortly.",
    failed: "That did not send. Try the email address below.",
    fallback: "Write by email",
    whatsapp: "Talk on WhatsApp",
    revealPhone: "Show number",
    mailSubject: "Enquiry from your portfolio",
    mailBody:
      "Hi Jeferson,\n\nI came across your portfolio and would like to talk about a project.\n\nWhat I need:\n\nRough timeline:\n\nThanks,\n",
    whatsappText: "Hi Jeferson! I came from your portfolio and would like to talk about a project.",
  },
  playground: {
    eyebrow: "Try it",
    title: "The validation API, running right here.",
    lead: "The same rules as the Go service: CPF check digits, Luhn for cards, area code and mobile rules for phone numbers. Type a value and read the response.",
    fields: {
      cpf: "CPF",
      email: "Email",
      name: "Name",
      phone: "Phone",
      cep: "Postcode",
      card: "Card",
      rg: "RG",
    },
    request: "Request",
    response: "Response",
    run: "Validate",
    modeLocal: "Running in your browser",
    modeLive: "Calling the service",
    waking: "Waking the service…",
    fellBack: "The service did not answer — this was computed in your browser.",
    valid: "Valid",
    invalid: "Invalid",
    note: "Nothing you type leaves your browser.",
  },
  cv: {
    print: "Print or save as PDF",
    summary: "Summary",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    clients: "Brands and institutions",
    download: "View CV",
  },
  notes: {
    eyebrow: "Notes",
    title: "What building this taught me.",
    lead: "Short notes on real decisions, each linked to the code where you can check it for yourself.",
    read: "Read",
    collapse: "Close",
    source: "View the source",
    entries: {
      "slow-upstream": {
        title: "The slow upstream that could not be allowed to block a thread",
        dek: "Two external APIs at 1800ms and 800ms, a thousand concurrent requests, and a thread pool that did not go far enough.",
        body: [
          "The service aggregates two external APIs. The profile one takes up to 1800ms to answer, the catalogue one up to 800ms. None of that is the service's fault — it is what sits on the other side of the network, and it will not change because I need it to.",
          "Under a thread-per-request model, a thousand concurrent requests are a thousand threads parked on I/O. The pool exhausts and the service stops answering while sitting almost idle: it is not short of CPU, it is short of threads. WebFlux on Netty attacks that at the root — non-blocking I/O across a handful of event-loop threads.",
          "Then there is what you can simply decline to wait for. A user typically has three preferred categories; fetched in sequence that is 3 × 800ms = 2400ms. With Flux.flatMap the three go in parallel and the total becomes the slowest single request rather than the sum.",
          "The cache cannot have one TTL. Profiles change roughly once a week and are expensive to fetch: 30 minutes. Catalogue prices and stock change by the minute: 2 minutes. A TTL is a claim about how fresh the data has to be, not a round number picked for comfort.",
          "Resilience comes in layers, and the order matters: a WebClient timeout (5s for profiles, 2s for products), retry with exponential backoff, and a circuit breaker that opens at a 50% failure rate across a sliding window of 10 requests. When a category still fails after the retries, the service returns the rest rather than throwing away the whole request.",
        ],
        takeaway:
          "Partial results are worth more than a complete error. The user does not notice the category that was missing; they notice that the page opened.",
      },
      "chaos-finding": {
        title: "The chaos run found the wrong bug — which was the point",
        dek: "I injected latency to watch the circuit breaker open. What surfaced was a failure no unit test could have caught.",
        body: [
          "Until that point, nothing had brought all eight services up together. Each had its own local loop and its own integration tests against Testcontainers, but the gateway had never spoken to real instances of the other seven on one network.",
          "I picked k6 over Gatling, running in Docker: JavaScript test scripts fit a polyglot repository better, and the official image means nothing has to be installed on the machine. Two scripts, not one — public search is cheap read traffic to ramp hard, while the write path runs the full saga and has registration's bcrypt as its bottleneck. Conflating them would have made the numbers unreadable.",
          'For the chaos scenario, a 3000ms latency toxic on flight-service, chosen because it is a plain idempotent GET behind the gateway and therefore easy to read before and after. Latency rather than a connection reset, because "the backend is alive but degraded" is exactly the case the circuit breaker exists for. The 3000ms deliberately exceeds the 2000ms idempotent timeout.',
          "The breaker behaved. What I was not looking for turned up alongside it: the gateway's per-IP rate limiter treats a thousand real users behind one NAT exactly as it would treat a single abusive client. No unit or integration test could have found that — they do not generate concurrent traffic from distinct clients.",
          "I did not fix it there. Changing the rate limiter's key, to the JWT sub claim for instance, is a design decision with its own trade-offs and does not belong inside a testing milestone. It was recorded as a known limitation, with the measured number next to it.",
        ],
        takeaway:
          "A load test is worth less for the number it produces than for the question about the system nobody had thought to ask.",
      },
      "hero-video": {
        title: "A background video with no generation service",
        dek: "The AI service's subscription had lapsed. The volumetric field already existed in GLSL — it only had to be rendered outside the browser.",
        body: [
          "This site's hero needed a clip driven by the scroll. The generation service was inactive and paying was not an option. But the page's own WebGL background already draws a volumetric field; the same field only had to run in Node and hand its frames to ffmpeg.",
          "The first result looked like marble rather than smoke: high-frequency noise everywhere and a 12 MB file. The mistake was one line. GLSL's fract always returns a positive value; JavaScript's % keeps the sign of the dividend. The noise gradients came out at double amplitude and skewed.",
          "With that fixed, the same encode fell to 4 MB — the encoder had been spending bits describing random noise. Lowering the frequency and amplitude of the domain warp took it to 1.3 MB, and the field started reading as slow smoke instead of polished stone.",
          "The detail that makes scrubbing work is not the bitrate, it is the keyframe interval. Seeking to an arbitrary instant forces the decoder to start from the previous keyframe; with a keyframe every five frames the jump is immediate. An all-intra encode solves it too, and costs the same 12 MB.",
          "The grain was deliberately left out of the encode. Adding it in ffmpeg hands the encoder random noise to describe and costs megabytes; the same texture comes from a CSS overlay for nothing.",
        ],
        takeaway:
          "Before paying for a service, it is worth asking whether the result already exists on the machine. Here it did — it only had to be exported.",
      },
    },
  },
  language: "Language",
  theme: "Toggle theme",
};
