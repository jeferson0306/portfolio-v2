import type { Dictionary } from "./types";

export const pt: Dictionary = {
  months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  present: "Presente",
  nav: {
    work: "Trabalho",
    trajectory: "Trajetória",
    stack: "Stack",
    contact: "Contacto",
  },
  hero: {
    eyebrow: "Jeferson Siqueira",
    title: "Experiências Digitais que Transformam Marcas.",
    subtitle: "Senior Full Stack Engineer & Interactive UI Specialist.",
    cta: "Ver trajetória",
    scroll: "Deslize para explorar",
  },
  timeline: {
    eyebrow: "Trajetória",
    title: "Cinco anos a construir sistemas críticos.",
    lead: "De plataformas educacionais a arquiteturas de mobilidade elétrica — cada etapa somou uma camada de escala, rigor e velocidade.",
    roles: {
      aubay:
        "Atuação em arquiteturas cloud-native, microsserviços em Java/Kotlin/Quarkus, AWS e ecossistemas de mobilidade elétrica.",
      "banco-do-brasil":
        "Integração de microsserviços financeiros internacionais e operações regulatórias (Pershing & NICE Actimize).",
      sicredi:
        "Automações com Python, redução de SLA de incidentes em 28% e desenvolvimento para cooperativa de crédito.",
      stefanini:
        "Modernização cloud, automação de segurança CI/CD e eliminação de vulnerabilidades em mais de 80 repositórios.",
      mirante:
        "Otimização de performance de banco de dados (+40%) e modernização de sistemas legados para Java 17 / Spring Boot.",
      solutis: "Sistemas críticos e gestão de serviços corporativos com 95% de SLA.",
      conquer:
        "Desenvolvimento de plataformas educacionais escaláveis usando Spring Boot e WebFlux.",
    },
  },
  brands: {
    eyebrow: "Prova social",
    title: "Marcas e instituições servidas.",
  },
  skills: {
    eyebrow: "Stack",
    title: "As ferramentas por trás do resultado.",
    groups: {
      backend: "Backend",
      cloud: "Cloud & DevOps",
      frontend: "Frontend",
      ai: "Inteligência Artificial",
    },
  },
  projects: {
    eyebrow: "Projetos",
    title: "Código aberto em destaque.",
    descriptions: {
      "travel-platform":
        "Plataforma de reservas de viagens em microsserviços independentes: Quarkus, MongoDB, Kafka, arquitetura orientada a eventos, observabilidade completa, IaC e CI/CD com quality gates reais.",
      "product-recommendation-service":
        "Serviço reativo de recomendação de produtos com Spring Boot, WebFlux e Resilience4j — tolerância a falhas e latência baixa sob carga.",
      "api-data-validator":
        "API em Go que valida e normaliza dados brasileiros — email, CPF, nome, telefone, RG, CEP e cartão — num único endpoint, com cache em Redis.",
      "jay-crew":
        "Ferramenta CLI publicada no npm: analisa qualquer projeto, deteta a stack e gera um briefing estruturado para assistentes de IA. Sem chave de API.",
      "portfolio-v2":
        "Este site. Next.js com exportação estática, animações atreladas ao scroll com GSAP e fundo tridimensional em WebGL.",
    },
    view: "Ver repositório",
  },
  footer: {
    eyebrow: "Contacto",
    title: "Vamos construir algo memorável.",
    lead: "Disponível para projetos de engenharia de plataforma, arquitetura cloud e interfaces de alto impacto.",
    email: "Email",
    phone: "Telefone",
    countries: { br: "Brasil", pt: "Portugal" },
    rights: "Todos os direitos reservados.",
    builtWith: "Construído com Next.js, GSAP e Three.js.",
  },
  stats: {
    eyebrow: "Em números",
    title: "Impacto medido, não estimado.",
    labels: {
      years: "Anos a construir software de produção",
      repos: "Repositórios livres de vulnerabilidades",
      performance: "Ganho de performance em base de dados",
      sla: "SLA sustentado em sistemas críticos",
    },
  },
  rail: {
    top: "Início",
    manifesto: "Manifesto",
    trajectory: "Trajetória",
    architecture: "Arquitetura",
    stack: "Stack",
    work: "Trabalho",
    contact: "Contacto",
  },
  manifesto: {
    eyebrow: "Como trabalho",
    text: "Sistemas que sobrevivem ao contacto com a realidade. Que se depuram a partir de uma linha de log, escalam sob carga, recuperam da queda de uma dependência — e que alguém que não os escreveu consegue entender.",
    roles: ["Senior Fullstack Engineer", "Cloud-Native Architect", "Interactive UI Specialist"],
  },
  architecture: {
    eyebrow: "Arquitetura",
    title: "O caminho de um pedido.",
    lead: "A forma que se repete no Banco do Brasil, na Sicredi e no travel-platform: um gateway à frente, serviços independentes atrás, eventos a ligá-los e observabilidade a atravessar tudo.",
    nodes: {
      client: "Cliente",
      gateway: "API Gateway",
      identity: "Identidade",
      catalog: "Catálogo",
      booking: "Reservas",
      broker: "Kafka",
      store: "Persistência",
      observability: "Observabilidade",
    },
    caption: "Cada serviço é implantável de forma independente. Falha isolada, não em cascata.",
  },
  caseStudy: {
    open: "Abrir case study",
    close: "Fechar",
    demo: "Ver demo ao vivo",
    highlightsLabel: "Decisões de engenharia",
    metrics: {
      services: "Microsserviços independentes",
      adrs: "ADRs escritos",
      milestones: "Milestones entregues",
      concurrency: "Pedidos simultâneos",
      latency: "Latência de agregação",
      breaker: "Limiar do circuit breaker",
      validators: "Validadores num só endpoint",
      cache: "Camada de cache",
      checksum: "Algoritmo de verificação",
      frameworks: "Frameworks detetados",
      versions: "Versões publicadas",
      apiKeys: "Chaves de API necessárias",
      languages: "Idiomas suportados",
      clip: "Vídeo do hero",
      servers: "Servidores necessários",
    },
    summaries: {
      "travel-platform":
        "Plataforma de reservas construída como nove microsserviços implantáveis de forma independente, com as práticas de uma equipa de produção: domain-driven design, comunicação orientada a eventos, infraestrutura como código e um pipeline de CI/CD com quality gates a sério.",
      "product-recommendation-service":
        "Serviço reativo que agrega dois APIs externos lentos (até 1800ms e 800ms) e devolve recomendações personalizadas sob alta concorrência, sem esgotar o pool de threads.",
      "api-data-validator":
        "Serviço em Go que valida os dados que qualquer formulário brasileiro pede. Aceita formatos flexíveis, sanitiza a entrada e devolve JSON estruturado — um endpoint, um parâmetro de cada vez.",
      "jay-crew":
        "CLI que varre um projeto e produz um ficheiro de contexto que qualquer assistente de IA consegue executar: árvore do projeto, stack detetada, dependências e as definições dos agentes relevantes para a tarefa.",
      "portfolio-v2":
        "Este site. Exportação estática sem servidor, com animações atreladas ao scroll e um vídeo de fundo gerado localmente — sem serviços pagos nem footage licenciada.",
    },
    highlights: {
      "travel-platform": [
        "19 ADRs escritos contra o que foi realmente construído e medido, não contra o que era planeado.",
        "Experiência de caos com Toxiproxy contra o circuit breaker — a falha foi provocada de propósito e documentada.",
        "Deploy em Kubernetes com recursos limitados expôs três bugs genuínos específicos do Kubernetes.",
        "Um LLM alucinou até a janela de contexto ser corrigida; a correção ficou registada em ADR.",
      ],
      "product-recommendation-service": [
        "Spring WebFlux com Netty: I/O não bloqueante em poucas threads de event loop, em vez de thread-por-pedido.",
        "Cache Caffeine com TTLs diferentes por fonte — 30 min para perfis, 2 min para catálogo — conforme a frescura que cada uma exige.",
        "Categorias procuradas em paralelo com Flux.flatMap: o tempo total passa a ser o do pedido mais lento, não a soma.",
        "Timeout, retry com backoff exponencial e circuit breaker em camadas; se uma categoria falha, devolve resultados parciais em vez de falhar tudo.",
      ],
      "api-data-validator": [
        "Validação de CPF com dígitos verificadores, não apenas contagem de caracteres.",
        "Cartão de crédito validado por Luhn, com identificação da bandeira.",
        "Resultados de CPF guardados em Redis — a verificação é determinística, logo cacheável.",
        "Nomes normalizados: acentos removidos, caracteres inválidos filtrados, espaços colapsados.",
      ],
      "jay-crew": [
        "Deteção automática de stack sobre mais de 200 frameworks, incluindo monorepos e multi-serviço.",
        "Não faz chamadas externas nem pede chave de API — é o enquadramento, o modelo é o teu.",
        "Publicado no npm sob licença MIT, com cinco versões lançadas.",
        "A saída é um único ficheiro Markdown, legível por humanos antes de ser dado à máquina.",
      ],
      "portfolio-v2": [
        "Vídeo do hero renderizado localmente com Node e ffmpeg a partir do mesmo shader GLSL do fundo WebGL.",
        "Keyframe a cada 5 frames no encode — é isso que torna o scrubbing pelo scroll instantâneo.",
        "PT/EN/ES com o TypeScript a falhar o build se faltar uma tradução.",
        "Todas as animações têm paridade com prefers-reduced-motion; os títulos leem-se sem JavaScript.",
      ],
    },
  },
  language: "Idioma",
  theme: "Alternar tema",
};
