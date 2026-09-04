import type { Dictionary } from "./types";

export const pt: Dictionary = {
  months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  present: "Presente",
  nav: {
    work: "Trabalho",
    services: "Serviços",
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
    playground: "Experimenta",
    notes: "Notas",
    services: "Serviços",
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
  services: {
    eyebrow: "Como posso ajudar",
    title: "Do arranque ao que aguenta produção.",
    lead: "Trabalho tanto num diagnóstico de duas semanas como na construção de uma plataforma inteira. O que não muda é o critério: sai com testes, observabilidade e alguém a conseguir mantê-lo sem mim.",
    names: {
      platform: "Plataforma & microsserviços",
      cloud: "Cloud & DevOps",
      interface: "Interfaces interactivas",
    },
    summaries: {
      platform:
        "Desenho e construção de serviços que se implantam sozinhos, comunicam por eventos e falham em isolado — não em cascata.",
      cloud:
        "Levar o que corre na tua máquina para uma infraestrutura reproduzível, com pipeline que barra o que não deve passar.",
      interface:
        "Front-ends que carregam depressa e se mexem bem, com a acessibilidade tratada em vez de prometida.",
    },
    deliverables: {
      platform: [
        "Fronteiras de domínio e contratos de API documentados",
        "Comunicação por eventos com tolerância a falhas",
        "Testes, métricas e logs que servem para depurar às três da manhã",
      ],
      cloud: [
        "Infraestrutura como código, do zero ao ambiente completo",
        "CI/CD com quality gates que reprovam a sério",
        "Migração de sistemas legados sem parar o negócio",
      ],
      interface: [
        "Interface construída a partir do design, não aproximada",
        "Performance medida — Lighthouse, Core Web Vitals",
        "Internacionalização e acessibilidade desde o primeiro dia",
      ],
    },
    shape: "Formato típico",
    shapes: {
      platform: "Projecto de 6 a 16 semanas, ou retainer mensal",
      cloud: "Diagnóstico de 2 semanas, ou migração de 4 a 12 semanas",
      interface: "Projecto de 3 a 10 semanas",
    },
  },
  availability: {
    open: "Disponível para novos projetos",
    localTime: "Hora local em Lisboa",
    replyWithin: "Resposta habitual em 24 horas",
    outsideHours: "Fora do horário — a mensagem fica lida de manhã",
  },
  contact: {
    formTitle: "Manda uma mensagem",
    name: "Nome",
    email: "Email",
    message: "Mensagem",
    send: "Enviar",
    sending: "A enviar…",
    sent: "Recebido. Respondo em breve.",
    failed: "Não consegui enviar. Tenta pelo email abaixo.",
    fallback: "Escrever por email",
    whatsapp: "Falar por WhatsApp",
    revealPhone: "Ver número",
    mailSubject: "Contacto via portfólio",
    mailBody:
      "Olá Jeferson,\n\nCheguei ao seu portfólio e gostaria de falar sobre um projeto.\n\nO que preciso:\n\nPrazo aproximado:\n\nObrigado,\n",
    whatsappText: "Olá Jeferson! Vim pelo seu portfólio e gostaria de falar sobre um projeto.",
  },
  playground: {
    eyebrow: "Experimenta",
    title: "A API de validação, a correr agora.",
    lead: "As mesmas regras do serviço em Go: dígitos verificadores do CPF, Luhn para cartões, DDD e regras de móvel para telefones. Escreve um valor e vê a resposta.",
    fields: {
      cpf: "CPF",
      email: "Email",
      name: "Nome",
      phone: "Telefone",
      cep: "CEP",
      card: "Cartão",
    },
    request: "Pedido",
    response: "Resposta",
    run: "Validar",
    modeLocal: "A correr no teu browser",
    modeLive: "A chamar o serviço",
    valid: "Válido",
    invalid: "Inválido",
    note: "Nada do que escreves sai do teu browser.",
  },
  cv: {
    print: "Imprimir ou guardar em PDF",
    summary: "Resumo",
    experience: "Experiência",
    skills: "Competências",
    projects: "Projetos",
    clients: "Marcas e instituições",
    download: "Ver CV",
  },
  notes: {
    eyebrow: "Notas",
    title: "O que aprendi a construir isto.",
    lead: "Notas curtas sobre decisões reais, cada uma com o link para o código onde pode ser verificada.",
    read: "Ler",
    collapse: "Fechar",
    source: "Ver a fonte",
    entries: {
      "slow-upstream": {
        title: "O upstream lento que não podia bloquear uma thread",
        dek: "Dois APIs externos a 1800ms e 800ms, mil pedidos em simultâneo, e um pool de threads que não chegava.",
        body: [
          "O serviço agrega dois APIs externos. O de perfis demora até 1800ms a responder, o de catálogo até 800ms. Nada disto é culpa do serviço — é o que está do outro lado da rede, e não vai mudar porque eu preciso.",
          "Com um modelo de thread por pedido, mil pedidos simultâneos são mil threads paradas à espera de I/O. O pool esgota-se e o serviço deixa de responder estando praticamente ocioso: não falta CPU, faltam threads. WebFlux sobre Netty ataca isso na raiz — I/O não bloqueante sobre um punhado de threads de event loop.",
          "Depois há o que se pode simplesmente não esperar. Um utilizador tem tipicamente três categorias preferidas; em sequência são 3 × 800ms = 2400ms. Com Flux.flatMap as três seguem em paralelo e o tempo total passa a ser o do pedido mais lento, não a soma.",
          "O cache não pode ter um TTL único. Perfis mudam cerca de uma vez por semana e são caros de ir buscar: 30 minutos. Preços e stock do catálogo mudam ao minuto: 2 minutos. Um TTL é uma afirmação sobre a frescura que os dados exigem, não um número redondo escolhido por conforto.",
          "A resiliência vem em camadas, e a ordem importa: timeout no WebClient (5s para perfis, 2s para produtos), retry com backoff exponencial, e um circuit breaker que abre a 50% de falhas numa janela deslizante de 10 pedidos. Quando uma categoria falha mesmo depois das tentativas, o serviço devolve as restantes em vez de deitar fora o pedido inteiro.",
        ],
        takeaway:
          "Resultados parciais valem mais do que um erro completo. O utilizador não repara na categoria que faltou; repara que a página abriu.",
      },
      "chaos-finding": {
        title: "O teste de caos encontrou o bug errado — e ainda bem",
        dek: "Injectei latência para ver o circuit breaker abrir. O que apareceu foi uma falha que nenhum teste unitário podia ter apanhado.",
        body: [
          "Até esse ponto, nada tinha posto os oito serviços de pé ao mesmo tempo. Cada um tinha o seu ciclo local e os seus testes de integração com Testcontainers, mas o gateway nunca tinha falado com instâncias reais dos outros sete na mesma rede.",
          "Escolhi k6 em vez de Gatling, a correr em Docker: scripts em JavaScript assentam melhor num repositório poliglota, e a imagem oficial dispensa instalar o que quer que seja na máquina. Dois scripts, não um — a pesquisa pública é leitura barata de esticar, e o caminho de escrita passa pela saga completa, com o bcrypt do registo como gargalo. Juntar os dois tornaria os números ilegíveis.",
          "Para o caos, uma toxina de latência de 3000ms sobre o flight-service, escolhido por ser um GET idempotente atrás do gateway — fácil de interpretar antes e depois. Latência, e não corte de ligação, porque «o backend está vivo mas degradado» é precisamente o caso para o qual o circuit breaker existe. Os 3000ms ultrapassam de propósito o timeout de 2000ms.",
          "O breaker comportou-se como devia. O que não estava à espera apareceu ao lado: o rate limiter por IP do gateway trata mil utilizadores reais atrás do mesmo NAT exactamente como trataria um único cliente abusivo. Nenhum teste unitário ou de integração podia ter encontrado isto — não geram tráfego concorrente de vários clientes distintos.",
          "Não corrigi ali. Mudar a chave do rate limiter, por exemplo para o campo sub do JWT, é uma decisão de desenho com trocas próprias e não pertence a um milestone de testes. Ficou registada como limitação conhecida, com o número medido ao lado.",
        ],
        takeaway:
          "Um teste de carga vale menos pelo número que produz e mais pela pergunta que ninguém tinha pensado em fazer ao sistema.",
      },
      "hero-video": {
        title: "Um vídeo de fundo sem serviço de geração",
        dek: "O serviço de IA tinha a subscrição expirada. O campo volumétrico já existia em GLSL — faltava rendê-lo fora do browser.",
        body: [
          "O hero deste site precisava de um vídeo controlado pelo scroll. O serviço de geração estava inactivo e pagar não era opção. Mas o fundo WebGL da própria página já desenha um campo volumétrico; bastava correr o mesmo campo em Node e entregar os frames ao ffmpeg.",
          "O primeiro resultado parecia mármore, não fumo: ruído de alta frequência por todo o lado e 12 MB de ficheiro. O erro estava numa linha. O fract do GLSL devolve sempre um valor positivo; o operador % do JavaScript mantém o sinal do dividendo. Os gradientes do ruído saíam com o dobro da amplitude e enviesados.",
          "Corrigido isso, o mesmo encode caiu para 4 MB — o codificador estava a gastar bits a descrever ruído aleatório. Baixar a frequência e a amplitude do domain warp levou-o a 1,3 MB, e o campo passou a ler-se como fumo lento em vez de pedra polida.",
          "O detalhe que faz o scrubbing funcionar não é o bitrate, é o intervalo de keyframes. Saltar para um instante arbitrário obriga o descodificador a começar no keyframe anterior; com um keyframe a cada cinco frames, o salto é imediato. Um encode todo em intra também resolve, e custa os mesmos 12 MB.",
          "O grão ficou fora do encode de propósito. Adicioná-lo no ffmpeg dá ao codificador ruído aleatório para descrever e custa megabytes; a mesma textura sai de uma sobreposição em CSS por zero bytes.",
        ],
        takeaway:
          "Antes de contratar um serviço, vale perguntar se o resultado já não existe na máquina. Aqui existia — faltava exportá-lo.",
      },
    },
  },
  language: "Idioma",
  theme: "Alternar tema",
};
