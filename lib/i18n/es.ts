import type { Dictionary } from "./types";

export const es: Dictionary = {
  months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  present: "Presente",
  nav: {
    work: "Trabajo",
    services: "Servicios",
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
      "api-data-validator":
        "API en Go que valida y normaliza datos brasileños — email, CPF, nombre, teléfono, RG, código postal y tarjeta — en un solo endpoint, con caché en Redis.",
      "jay-crew":
        "CLI publicada en npm: analiza cualquier proyecto, detecta el stack y genera un briefing estructurado para asistentes de IA. Sin clave de API.",
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
    playground: "Pruébalo",
    notes: "Notas",
    services: "Servicios",
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
      validators: "Validadores en un solo endpoint",
      cache: "Capa de caché",
      checksum: "Algoritmo de verificación",
      frameworks: "Frameworks detectados",
      versions: "Versiones publicadas",
      apiKeys: "Claves de API necesarias",
      languages: "Idiomas soportados",
      clip: "Peso del vídeo del hero",
      servers: "Servidores necesarios",
    },
    summaries: {
      "travel-platform":
        "Plataforma de reservas construida como nueve microservicios desplegables de forma independiente, con las prácticas de un equipo de producción: domain-driven design, comunicación orientada a eventos, infraestructura como código y un pipeline de CI/CD con quality gates de verdad.",
      "product-recommendation-service":
        "Servicio reactivo que agrega dos APIs externas lentas (hasta 1800ms y 800ms) y devuelve recomendaciones personalizadas bajo alta concurrencia, sin agotar el pool de hilos.",
      "api-data-validator":
        "Servicio en Go que valida los datos que pide cualquier formulario brasileño. Acepta formatos flexibles, sanea la entrada y devuelve JSON estructurado — un endpoint, un parámetro cada vez.",
      "jay-crew":
        "CLI que recorre un proyecto y produce un archivo de contexto que cualquier asistente de IA puede ejecutar: árbol del proyecto, stack detectado, dependencias y las definiciones de los agentes relevantes.",
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
      "api-data-validator": [
        "CPF validado por sus dígitos verificadores, no solo por el número de caracteres.",
        "Tarjetas validadas con Luhn, identificando la marca.",
        "Resultados de CPF cacheados en Redis — la verificación es determinista, luego cacheable.",
        "Nombres normalizados: acentos eliminados, caracteres inválidos filtrados, espacios colapsados.",
      ],
      "jay-crew": [
        "Detección automática de stack sobre más de 200 frameworks, incluidos monorepos y multi-servicio.",
        "No hace llamadas externas ni pide clave de API — es el marco; el modelo lo pones tú.",
        "Publicado en npm bajo licencia MIT, con cinco versiones lanzadas.",
        "La salida es un único archivo Markdown, legible por una persona antes de dárselo a una máquina.",
      ],
      "portfolio-v2": [
        "El vídeo del hero se renderiza localmente con Node y ffmpeg a partir del mismo shader GLSL del fondo WebGL.",
        "Un keyframe cada 5 fotogramas en el encode — eso es lo que hace instantáneo el scrubbing por scroll.",
        "PT/EN/ES, con TypeScript fallando el build si falta una traducción.",
        "Todas las animaciones tienen equivalente con prefers-reduced-motion; los títulos se leen sin JavaScript.",
      ],
    },
  },
  services: {
    eyebrow: "Cómo puedo ayudar",
    title: "Del arranque a algo que aguanta producción.",
    lead: "Asumo tanto un diagnóstico de dos semanas como la construcción de una plataforma entera. Lo que no cambia es el criterio: sale con tests, con observabilidad y con alguien capaz de mantenerlo sin mí.",
    names: {
      platform: "Plataforma y microservicios",
      cloud: "Cloud y DevOps",
      interface: "Interfaces interactivas",
    },
    summaries: {
      platform:
        "Diseño y construcción de servicios que se despliegan solos, se comunican por eventos y fallan de forma aislada, no en cascada.",
      cloud:
        "Llevar lo que corre en tu máquina a una infraestructura reproducible, tras un pipeline que frena lo que no debe pasar.",
      interface:
        "Front-ends que cargan rápido y se mueven bien, con la accesibilidad resuelta en vez de prometida.",
    },
    deliverables: {
      platform: [
        "Fronteras de dominio y contratos de API documentados",
        "Comunicación por eventos con tolerancia a fallos real",
        "Tests, métricas y logs que sirven para depurar a las tres de la mañana",
      ],
      cloud: [
        "Infraestructura como código, de cero a un entorno completo",
        "CI/CD con quality gates que reprueban de verdad",
        "Migración de sistemas heredados sin parar el negocio",
      ],
      interface: [
        "Interfaz construida a partir del diseño, no aproximada",
        "Rendimiento medido — Lighthouse, Core Web Vitals",
        "Internacionalización y accesibilidad desde el primer día",
      ],
    },
    shape: "Formato habitual",
    shapes: {
      platform: "Proyecto de 6 a 16 semanas, o retainer mensual",
      cloud: "Diagnóstico de 2 semanas, o migración de 4 a 12 semanas",
      interface: "Proyecto de 3 a 10 semanas",
    },
  },
  availability: {
    open: "Disponible para nuevos proyectos",
    localTime: "Hora local en Lisboa",
    replyWithin: "Respuesta habitual en 24 horas",
    outsideHours: "Fuera de horario — se lee por la mañana",
  },
  contact: {
    formTitle: "Envía un mensaje",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    send: "Enviar",
    sending: "Enviando…",
    sent: "Recibido. Respondo en breve.",
    failed: "No se pudo enviar. Prueba por el email de abajo.",
    fallback: "Escribir por email",
    whatsapp: "Hablar por WhatsApp",
    revealPhone: "Ver número",
    mailSubject: "Contacto desde tu portfolio",
    mailBody:
      "Hola Jeferson,\n\nLlegué a tu portfolio y me gustaría hablar sobre un proyecto.\n\nLo que necesito:\n\nPlazo aproximado:\n\nGracias,\n",
    whatsappText: "¡Hola Jeferson! Vengo de tu portfolio y me gustaría hablar sobre un proyecto.",
  },
  playground: {
    eyebrow: "Pruébalo",
    title: "La API de validación, corriendo aquí mismo.",
    lead: "Las mismas reglas que el servicio en Go: dígitos verificadores del CPF, Luhn para tarjetas, prefijo y reglas de móvil para teléfonos. Escribe un valor y lee la respuesta.",
    fields: {
      cpf: "CPF",
      email: "Email",
      name: "Nombre",
      phone: "Teléfono",
      cep: "Código postal",
      card: "Tarjeta",
      rg: "RG",
    },
    request: "Petición",
    response: "Respuesta",
    run: "Validar",
    modeLocal: "Corriendo en tu navegador",
    modeLive: "Llamando al servicio",
    waking: "Despertando el servicio…",
    fellBack: "El servicio no respondió — esto se calculó en tu navegador.",
    valid: "Válido",
    invalid: "Inválido",
    note: "Nada de lo que escribes sale de tu navegador.",
  },
  cv: {
    print: "Imprimir o guardar en PDF",
    summary: "Resumen",
    experience: "Experiencia",
    skills: "Competencias",
    projects: "Proyectos",
    clients: "Marcas e instituciones",
    download: "Ver CV",
  },
  notes: {
    eyebrow: "Notas",
    title: "Lo que aprendí construyendo esto.",
    lead: "Notas breves sobre decisiones reales, cada una con el enlace al código donde se puede comprobar.",
    read: "Leer",
    collapse: "Cerrar",
    source: "Ver la fuente",
    entries: {
      "slow-upstream": {
        title: "El upstream lento que no podía bloquear un hilo",
        dek: "Dos APIs externas a 1800ms y 800ms, mil peticiones simultáneas y un pool de hilos que no daba abasto.",
        body: [
          "El servicio agrega dos APIs externas. La de perfiles tarda hasta 1800ms en responder, la de catálogo hasta 800ms. Nada de eso es culpa del servicio — es lo que hay al otro lado de la red, y no va a cambiar porque yo lo necesite.",
          "Con un modelo de hilo por petición, mil peticiones simultáneas son mil hilos parados esperando I/O. El pool se agota y el servicio deja de responder estando casi ocioso: no le falta CPU, le faltan hilos. WebFlux sobre Netty ataca eso de raíz — I/O no bloqueante sobre un puñado de hilos de event loop.",
          "Luego está lo que sencillamente se puede no esperar. Un usuario suele tener tres categorías preferidas; en secuencia son 3 × 800ms = 2400ms. Con Flux.flatMap las tres van en paralelo y el total pasa a ser la petición más lenta, no la suma.",
          "La caché no puede tener un único TTL. Los perfiles cambian más o menos una vez por semana y son caros de obtener: 30 minutos. Los precios y el stock del catálogo cambian por minutos: 2 minutos. Un TTL es una afirmación sobre la frescura que exigen los datos, no un número redondo elegido por comodidad.",
          "La resiliencia viene por capas, y el orden importa: timeout en el WebClient (5s para perfiles, 2s para productos), retry con backoff exponencial y un circuit breaker que abre al 50% de fallos en una ventana deslizante de 10 peticiones. Cuando una categoría falla incluso tras los reintentos, el servicio devuelve las demás en lugar de tirar la petición entera.",
        ],
        takeaway:
          "Los resultados parciales valen más que un error completo. El usuario no nota la categoría que faltó; nota que la página abrió.",
      },
      "chaos-finding": {
        title: "La prueba de caos encontró el bug equivocado — y ahí estuvo el valor",
        dek: "Inyecté latencia para ver abrir el circuit breaker. Lo que apareció fue un fallo que ninguna prueba unitaria podía haber detectado.",
        body: [
          "Hasta ese momento, nada había levantado los ocho servicios a la vez. Cada uno tenía su ciclo local y sus pruebas de integración con Testcontainers, pero el gateway nunca había hablado con instancias reales de los otros siete en una misma red.",
          "Elegí k6 en lugar de Gatling, corriendo en Docker: los scripts en JavaScript encajan mejor en un repositorio políglota, y la imagen oficial evita instalar nada en la máquina. Dos scripts, no uno — la búsqueda pública es tráfico de lectura barato de exigir, y el camino de escritura recorre la saga completa, con el bcrypt del registro como cuello de botella. Mezclarlos habría hecho ilegibles los números.",
          "Para el caos, una toxina de latencia de 3000ms sobre flight-service, elegido por ser un GET idempotente tras el gateway y por tanto fácil de leer antes y después. Latencia, y no corte de conexión, porque «el backend está vivo pero degradado» es justamente el caso para el que existe el circuit breaker. Los 3000ms superan a propósito el timeout de 2000ms.",
          "El breaker se comportó. Lo que no buscaba apareció al lado: el rate limiter por IP del gateway trata a mil usuarios reales tras un mismo NAT igual que trataría a un único cliente abusivo. Ninguna prueba unitaria o de integración podía haberlo encontrado — no generan tráfico concurrente de clientes distintos.",
          "No lo arreglé allí. Cambiar la clave del rate limiter, por ejemplo al campo sub del JWT, es una decisión de diseño con sus propias contrapartidas y no pertenece a un milestone de pruebas. Quedó registrada como limitación conocida, con el número medido al lado.",
        ],
        takeaway:
          "Una prueba de carga vale menos por el número que produce que por la pregunta que nadie había pensado en hacerle al sistema.",
      },
      "hero-video": {
        title: "Un vídeo de fondo sin servicio de generación",
        dek: "El servicio de IA tenía la suscripción caducada. El campo volumétrico ya existía en GLSL — solo había que renderizarlo fuera del navegador.",
        body: [
          "El hero de este sitio necesitaba un vídeo gobernado por el scroll. El servicio de generación estaba inactivo y pagar no era una opción. Pero el propio fondo WebGL de la página ya dibuja un campo volumétrico; bastaba con correr ese mismo campo en Node y entregar los fotogramas a ffmpeg.",
          "El primer resultado parecía mármol, no humo: ruido de alta frecuencia por todas partes y 12 MB de archivo. El error estaba en una línea. El fract de GLSL siempre devuelve un valor positivo; el operador % de JavaScript conserva el signo del dividendo. Los gradientes del ruido salían con el doble de amplitud y sesgados.",
          "Corregido eso, el mismo encode bajó a 4 MB — el codificador estaba gastando bits en describir ruido aleatorio. Reducir la frecuencia y la amplitud del domain warp lo llevó a 1,3 MB, y el campo pasó a leerse como humo lento en vez de piedra pulida.",
          "El detalle que hace funcionar el scrubbing no es el bitrate, es el intervalo de keyframes. Saltar a un instante arbitrario obliga al decodificador a empezar en el keyframe anterior; con un keyframe cada cinco fotogramas el salto es inmediato. Un encode todo en intra también lo resuelve, y cuesta los mismos 12 MB.",
          "El grano quedó fuera del encode a propósito. Añadirlo en ffmpeg le da al codificador ruido aleatorio que describir y cuesta megabytes; la misma textura sale de una superposición en CSS por cero bytes.",
        ],
        takeaway:
          "Antes de contratar un servicio, conviene preguntarse si el resultado no existe ya en la máquina. Aquí existía — solo faltaba exportarlo.",
      },
    },
  },
  language: "Idioma",
  theme: "Cambiar tema",
};
