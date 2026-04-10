// ── Translation strings — all user-visible copy in EN and ES ──────────────────
//
// Structure mirrors the page sections so each component can import only the
// slice it needs. `T` is the canonical shape; both language entries must
// conform to it, enforced by `Record<Lang, T>`.

export type Lang = "en" | "es";

interface NavLink { label: string; href: string; }

export interface T {
  nav: {
    links: NavLink[];
    signin: string;
    cta: string;
    ctaMobile: string;
    ariaMenu: string;
    ariaClose: string;
    ariaNav: string;
    ariaDrawer: string;
  };
  hero: {
    badge: string;
    h1: string;
    h1Accent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    socialBold: string;
    socialRest: string;
    pills: [string, string, string];
  };
  features: {
    label: string;
    heading: string;
    body: string;
    items: [
      { title: string; description: string; detail: string },
      { title: string; description: string; detail: string },
      { title: string; description: string; detail: string },
    ];
  };
  benefits: {
    label: string;
    heading: string;
    headingAccent: string;
    body: string;
    points: [string, string, string, string];
    cta: string;
    metrics: [
      { value: string; label: string; color: string },
      { value: string; label: string; color: string },
      { value: string; label: string; color: string },
    ];
  };
  socialProof: {
    logosLabel: string;
    statsLabel: string;
    testimonialsHeading: string;
    stats: [
      { value: string; label: string },
      { value: string; label: string },
      { value: string; label: string },
    ];
    testimonials: [
      { quote: string; name: string; role: string; avatar: string; color: string },
      { quote: string; name: string; role: string; avatar: string; color: string },
      { quote: string; name: string; role: string; avatar: string; color: string },
    ];
  };
  finalCta: {
    heading: string;
    headingAccent: string;
    body: string;
    placeholder: string;
    button: string;
    formLabel: string;
    emailLabel: string;
    reassurance: string;
  };
  footer: {
    tagline: string;
    sections: Record<string, string[]>;
    copyright: string;
    socialLabel: string;
  };
}

export const translations: Record<Lang, T> = {
  // ── English ───────────────────────────────────────────────────────────────
  en: {
    nav: {
      links: [
        { label: "Features",     href: "#caracteristicas" },
        { label: "Benefits",     href: "#beneficios" },
        { label: "Testimonials", href: "#testimonios" },
      ],
      signin:    "Sign in",
      cta:       "Get early access",
      ctaMobile: "Request early access",
      ariaMenu:  "Open menu",
      ariaClose: "Close menu",
      ariaNav:   "Main navigation",
      ariaDrawer: "Navigation menu",
    },
    hero: {
      badge:        "Early access available",
      h1:           "From chaos to flow,\u00A0",
      h1Accent:     "in one place.",
      subtitle:     "FlowPilot brings your team's ideas, tasks, and decisions into one shared space. Less noise. More progress.",
      ctaPrimary:   "Request early access",
      ctaSecondary: "See how it works",
      socialBold:   "+2,400 teams",
      socialRest:   " already on the waitlist",
      pills:        ["Ideas", "Tasks", "Decisions"],
    },
    features: {
      label:   "Features",
      heading: "Three pieces. One flow.",
      body:    "Most teams waste time switching between apps. FlowPilot connects thinking with execution — no interruptions.",
      items: [
        {
          title:       "Capture ideas on the fly",
          description: "A shared space where nothing gets lost. The team contributes in real time, without endless threads or unnecessary meetings.",
          detail:      "Voice notes, text, links — all in one place.",
        },
        {
          title:       "Turn ideas into tasks",
          description: "From conversation to action in one click. Assign, prioritize, and track without switching tools or losing context.",
          detail:      "Due dates, owners, priorities — zero friction.",
        },
        {
          title:       "Make decisions with context",
          description: "FlowPilot records the why behind every decision. Always know what was decided, who decided it, and how you got there.",
          detail:      "Full history. Never again \"why did we do it this way?\"",
        },
      ],
    },
    benefits: {
      label:         "Why FlowPilot",
      heading:       "Work with clarity.\u00A0",
      headingAccent: "Move with confidence.",
      body:          "This isn't just another tool. It's where your team's thinking becomes action — without the friction of coordinating across five different apps.",
      points: [
        "Everyone knows what's happening — no asking around.",
        "Good ideas stop getting buried in chat.",
        "Decisions have a history — and an owner.",
        "The team moves forward even when not in the same room.",
      ],
      cta: "I want to try it",
      metrics: [
        { value: "3x",   label: "faster team decisions",    color: "text-teal-600 dark:text-teal-400"   },
        { value: "80%",  label: "fewer emails per meeting", color: "text-orange-600 dark:text-orange-400" },
        { value: "100%", label: "context on every task",    color: "text-violet-600 dark:text-violet-400" },
      ],
    },
    socialProof: {
      logosLabel:          "Teams that trusted FlowPilot during beta",
      statsLabel:          "Testimonials",
      testimonialsHeading: "What teams are saying",
      stats: [
        { value: "2,400+", label: "teams on waitlist" },
        { value: "18",     label: "countries" },
        { value: "4.9/5",  label: "satisfaction" },
      ],
      testimonials: [
        {
          quote:  "Finally a place where ideas don't get lost in Slack. Alignment meetings dropped from 5 to 2 per week — and decisions arrive before the moment passes.",
          name:   "Ana Reyes",
          role:   "Product Lead · Vertex Labs",
          avatar: "A",
          color:  "bg-blue-500",
        },
        {
          quote:  "What I love most is the decision history. Someone always used to ask 'why did we do this?' Now the answer is one click away. That alone paid for the subscription.",
          name:   "Marco Salas",
          role:   "CTO · Synapse",
          avatar: "M",
          color:  "bg-violet-500",
        },
        {
          quote:  "Migrating to FlowPilot was the best thing we did in Q1. The design and engineering teams finally speak the same language — and the roadmap no longer lives in five different Notions.",
          name:   "Carla Ibáñez",
          role:   "Design Director · Polar Studio",
          avatar: "C",
          color:  "bg-teal-500",
        },
      ],
    },
    finalCta: {
      heading:       "Your team deserves\u00A0",
      headingAccent: "to work better.",
      body:          "Join the early access. No cost, no credit card required. Just a team ready to leave the chaos behind.",
      placeholder:   "you@company.com",
      button:        "Request access",
      formLabel:     "Early access signup form",
      emailLabel:    "Email address",
      reassurance:   "No spam. No commitments. Cancel anytime.",
    },
    footer: {
      tagline: "From chaos to flow, in one place.",
      sections: {
        Product: ["Features", "Pricing", "Roadmap", "Changelog"],
        Company: ["About us", "Blog", "Careers", "Press"],
        Support: ["Documentation", "Guides", "Contact", "Service status"],
      },
      copyright:   "© 2025 FlowPilot. All rights reserved.",
      socialLabel: "FlowPilot on",
    },
  },

  // ── Spanish ───────────────────────────────────────────────────────────────
  es: {
    nav: {
      links: [
        { label: "Características", href: "#caracteristicas" },
        { label: "Beneficios",      href: "#beneficios" },
        { label: "Testimonios",     href: "#testimonios" },
      ],
      signin:    "Iniciar sesión",
      cta:       "Solicitar acceso",
      ctaMobile: "Solicitar acceso anticipado",
      ariaMenu:  "Abrir menú",
      ariaClose: "Cerrar menú",
      ariaNav:   "Navegación principal",
      ariaDrawer: "Menú de navegación",
    },
    hero: {
      badge:        "Acceso anticipado disponible",
      h1:           "Del caos al flujo,\u00A0",
      h1Accent:     "en un solo lugar.",
      subtitle:     "FlowPilot reúne las ideas, tareas y decisiones de tu equipo en un espacio compartido. Menos ruido. Más avance.",
      ctaPrimary:   "Solicitar acceso anticipado",
      ctaSecondary: "Ver cómo funciona",
      socialBold:   "+2,400 equipos",
      socialRest:   " ya están en la lista de espera",
      pills:        ["Ideas", "Tareas", "Decisiones"],
    },
    features: {
      label:   "Características",
      heading: "Tres piezas. Un solo flujo.",
      body:    "La mayoría de los equipos pierden tiempo saltando entre apps. FlowPilot conecta el pensamiento con la ejecución, sin interrupciones.",
      items: [
        {
          title:       "Captura ideas al vuelo",
          description: "Un espacio compartido donde nada se pierde. El equipo aporta en tiempo real, sin threads interminables ni juntas innecesarias.",
          detail:      "Notas de voz, texto, enlaces — todo en el mismo lugar.",
        },
        {
          title:       "Convierte ideas en tareas",
          description: "De la conversación a la acción en un clic. Asigna, prioriza y da seguimiento sin cambiar de herramienta ni perder el hilo.",
          detail:      "Fechas, responsables, prioridades — sin fricciones.",
        },
        {
          title:       "Toma decisiones con contexto",
          description: "FlowPilot registra el porqué de cada decisión. Siempre sabes qué se decidió, quién lo decidió y por qué se llegó ahí.",
          detail:      "Histórico completo. Nunca más '¿por qué lo hicimos así?'",
        },
      ],
    },
    benefits: {
      label:         "Por qué FlowPilot",
      heading:       "Trabaja con claridad.\u00A0",
      headingAccent: "Avanza con confianza.",
      body:          "No es otra herramienta más. Es el lugar donde el pensamiento del equipo se convierte en acción — sin la fricción de coordinar entre cinco apps distintas.",
      points: [
        "Todos saben qué está pasando, sin preguntar.",
        "Las ideas buenas dejan de perderse en chats.",
        "Las decisiones tienen historial — y responsable.",
        "El equipo avanza aunque no esté en la misma sala.",
      ],
      cta: "Quiero probarlo",
      metrics: [
        { value: "3x",   label: "más rápidas las decisiones de equipo", color: "text-teal-600 dark:text-teal-400"   },
        { value: "80%",  label: "menos emails por reunión",             color: "text-orange-600 dark:text-orange-400" },
        { value: "100%", label: "de contexto en cada tarea",            color: "text-violet-600 dark:text-violet-400" },
      ],
    },
    socialProof: {
      logosLabel:          "Equipos que ya confiaron en FlowPilot durante la beta",
      statsLabel:          "Testimonios",
      testimonialsHeading: "Lo que dicen los equipos",
      stats: [
        { value: "2,400+", label: "equipos en lista" },
        { value: "18",     label: "países" },
        { value: "4.9/5",  label: "satisfacción" },
      ],
      testimonials: [
        {
          quote:  "Por fin un lugar donde las ideas no se pierden en Slack. Las reuniones de alineación bajaron de 5 a 2 por semana — y las decisiones llegan antes de que el momento pase.",
          name:   "Ana Reyes",
          role:   "Product Lead · Vertex Labs",
          avatar: "A",
          color:  "bg-blue-500",
        },
        {
          quote:  "Lo que más me gusta es el historial de decisiones. Antes siempre alguien preguntaba '¿por qué hicimos esto?' Ahora la respuesta está a un clic. Eso solo ya pagó la suscripción.",
          name:   "Marco Salas",
          role:   "CTO · Synapse",
          avatar: "M",
          color:  "bg-violet-500",
        },
        {
          quote:  "Migrar a FlowPilot fue lo mejor que hicimos en Q1. El equipo de diseño y el de ingeniería por fin hablan el mismo idioma — y el roadmap ya no vive en cinco Notion distintos.",
          name:   "Carla Ibáñez",
          role:   "Design Director · Polar Studio",
          avatar: "C",
          color:  "bg-teal-500",
        },
      ],
    },
    finalCta: {
      heading:       "Tu equipo merece\u00A0",
      headingAccent: "trabajar mejor.",
      body:          "Forma parte del acceso anticipado. Sin costo, sin tarjeta de crédito. Solo un equipo listo para dejar el caos atrás.",
      placeholder:   "tu@empresa.com",
      button:        "Solicitar acceso",
      formLabel:     "Formulario de acceso anticipado",
      emailLabel:    "Correo electrónico",
      reassurance:   "Sin spam. Sin compromisos. Cancelable en cualquier momento.",
    },
    footer: {
      tagline: "Del caos al flujo, en un solo lugar.",
      sections: {
        Producto: ["Características", "Precios", "Roadmap", "Changelog"],
        Empresa:  ["Sobre nosotros", "Blog", "Carreras", "Prensa"],
        Soporte:  ["Documentación", "Guías", "Contacto", "Estado del servicio"],
      },
      copyright:   "© 2025 FlowPilot. Todos los derechos reservados.",
      socialLabel: "FlowPilot en",
    },
  },
};
