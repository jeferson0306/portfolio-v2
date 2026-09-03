import type { Dictionary } from "./types";

export const es: Dictionary = {
  months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  present: "Presente",
  nav: {
    work: "Trabajo",
    trajectory: "Trayectoria",
    stack: "Stack",
    contact: "Contacto",
  },
  hero: {
    eyebrow: "Jeferson Siqueira",
    title: "Experiencias Digitales que Transforman Marcas.",
    subtitle: "Senior Full Stack Engineer & Interactive UI Specialist.",
    cta: "Ver trayectoria",
    scroll: "Desliza para explorar",
  },
  timeline: {
    eyebrow: "Trayectoria",
    title: "Cinco años construyendo sistemas críticos.",
    lead: "De plataformas educativas a arquitecturas de movilidad eléctrica — cada etapa sumó una capa de escala, rigor y velocidad.",
    roles: {
      aubay:
        "Arquitecturas cloud-native, microservicios en Java/Kotlin/Quarkus, AWS y ecosistemas de movilidad eléctrica.",
      "banco-do-brasil":
        "Integración de microservicios financieros internacionales y operaciones regulatorias (Pershing & NICE Actimize).",
      sicredi:
        "Automatización con Python, reducción del SLA de incidentes en un 28% y desarrollo para cooperativa de crédito.",
      stefanini:
        "Modernización cloud, automatización de seguridad CI/CD y eliminación de vulnerabilidades en más de 80 repositorios.",
      mirante:
        "Optimización del rendimiento de bases de datos (+40%) y modernización de sistemas legados a Java 17 / Spring Boot.",
      solutis: "Sistemas críticos y gestión de servicios corporativos con un 95% de SLA.",
      conquer: "Desarrollo de plataformas educativas escalables usando Spring Boot y WebFlux.",
    },
  },
  brands: {
    eyebrow: "Prueba social",
    title: "Marcas e instituciones atendidas.",
  },
  skills: {
    eyebrow: "Stack",
    title: "Las herramientas detrás del resultado.",
    groups: {
      backend: "Backend",
      cloud: "Cloud & DevOps",
      frontend: "Frontend",
      ai: "Inteligencia Artificial",
    },
  },
  projects: {
    eyebrow: "Proyectos",
    title: "Código abierto destacado.",
    descriptions: {
      "travel-platform":
        "Plataforma de reservas de viajes en microservicios desplegables de forma independiente: Quarkus, MongoDB, Kafka, arquitectura orientada a eventos, observabilidad completa, IaC y CI/CD con quality gates reales.",
      "product-recommendation-service":
        "Servicio reactivo de recomendación de productos con Spring Boot, WebFlux y Resilience4j — tolerancia a fallos y baja latencia bajo carga.",
      "portfolio-v2":
        "Este sitio. Next.js con exportación estática, animaciones ligadas al scroll con GSAP y fondo tridimensional en WebGL.",
    },
    view: "Ver repositorio",
  },
  footer: {
    eyebrow: "Contacto",
    title: "Construyamos algo memorable.",
    lead: "Disponible para proyectos de ingeniería de plataforma, arquitectura cloud e interfaces de alto impacto.",
    email: "Email",
    phone: "Teléfono",
    countries: { br: "Brasil", pt: "Portugal" },
    rights: "Todos los derechos reservados.",
    builtWith: "Construido con Next.js, GSAP y Three.js.",
  },
  stats: {
    eyebrow: "En números",
    title: "Impacto medido, no estimado.",
    labels: {
      years: "Años construyendo software de producción",
      repos: "Repositorios libres de vulnerabilidades",
      performance: "Mejora de rendimiento en base de datos",
      sla: "SLA sostenido en sistemas críticos",
    },
  },
  rail: {
    top: "Inicio",
    manifesto: "Manifiesto",
    trajectory: "Trayectoria",
    architecture: "Arquitectura",
    stack: "Stack",
    work: "Trabajo",
    contact: "Contacto",
  },
  manifesto: {
    eyebrow: "Cómo trabajo",
    text: "Sistemas que sobreviven al contacto con la realidad. Que se depuran desde una línea de log, escalan bajo carga, se recuperan de la caída de una dependencia — y que alguien que no los escribió puede entender.",
    roles: ["Senior Fullstack Engineer", "Cloud-Native Architect", "Interactive UI Specialist"],
  },
  architecture: {
    eyebrow: "Arquitectura",
    title: "El camino de una petición.",
    lead: "La forma que se repite en Banco do Brasil, en Sicredi y en travel-platform: un gateway delante, servicios independientes detrás, eventos uniéndolos y observabilidad atravesándolo todo.",
    nodes: {
      client: "Cliente",
      gateway: "API Gateway",
      identity: "Identidad",
      catalog: "Catálogo",
      booking: "Reservas",
      broker: "Kafka",
      store: "Persistencia",
      observability: "Observabilidad",
    },
    caption:
      "Cada servicio se despliega de forma independiente. El fallo queda aislado, no en cascada.",
  },
  caseStudy: {
    open: "Abrir case study",
    close: "Cerrar",
    demo: "Ver demo en vivo",
    highlightsLabel: "Decisiones de ingeniería",
    metrics: {
      services: "Microservicios independientes",
      adrs: "ADRs escritos",
      milestones: "Milestones entregados",
      concurrency: "Peticiones simultáneas",
      latency: "Latencia de agregación",
      breaker: "Umbral del circuit breaker",
      languages: "Idiomas soportados",
      clip: "Peso del vídeo del hero",
      servers: "Servidores necesarios",
    },
    summaries: {
      "travel-platform":
        "Plataforma de reservas construida como nueve microservicios desplegables de forma independiente, con las prácticas de un equipo de producción: domain-driven design, comunicación orientada a eventos, infraestructura como código y un pipeline de CI/CD con quality gates de verdad.",
      "product-recommendation-service":
        "Servicio reactivo que agrega dos APIs externas lentas (hasta 1800ms y 800ms) y devuelve recomendaciones personalizadas bajo alta concurrencia, sin agotar el pool de hilos.",
      "portfolio-v2":
        "Este sitio. Exportación estática sin servidor, con animaciones ligadas al scroll y un vídeo de fondo generado localmente — sin servicios de pago ni material licenciado.",
    },
    highlights: {
      "travel-platform": [
        "19 ADRs escritos contra lo que realmente se construyó y midió, no contra lo planeado.",
        "Experimento de caos con Toxiproxy contra el circuit breaker — el fallo se provocó a propósito y quedó documentado.",
        "Un despliegue en Kubernetes con recursos limitados sacó a la luz tres bugs genuinos específicos de Kubernetes.",
        "Un LLM alucinó hasta corregir su ventana de contexto; la corrección quedó registrada en un ADR.",
      ],
      "product-recommendation-service": [
        "Spring WebFlux sobre Netty: I/O no bloqueante en unos pocos hilos de event loop en vez de hilo-por-petición.",
        "Cachés Caffeine con TTL por fuente — 30 minutos para perfiles, 2 minutos para el catálogo — según la frescura que exige cada una.",
        "Categorías obtenidas en paralelo con Flux.flatMap: el tiempo total pasa a ser el de la petición más lenta, no la suma.",
        "Timeout, retry con backoff exponencial y circuit breaker por capas; si una categoría falla, devuelve resultados parciales en lugar de fallar todo.",
      ],
      "portfolio-v2": [
        "El vídeo del hero se renderiza localmente con Node y ffmpeg a partir del mismo shader GLSL del fondo WebGL.",
        "Un keyframe cada 5 fotogramas en el encode — eso es lo que hace instantáneo el scrubbing por scroll.",
        "PT/EN/ES, con TypeScript fallando el build si falta una traducción.",
        "Todas las animaciones tienen equivalente con prefers-reduced-motion; los títulos se leen sin JavaScript.",
      ],
    },
  },
  language: "Idioma",
};
