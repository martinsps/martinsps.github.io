/**
 * UI / site copy dictionary for the two supported languages.
 *
 * `es` is the source of truth for the shape; `en` must match it (enforced by the
 * `Dictionary` type below). Content-driven text (publications, news, team bios…)
 * lives in `src/content`, not here.
 */

export const defaultLang = 'es';
export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;

const es = {
  meta: {
    siteName: 'Proyecto NOVA',
  },
  nav: {
    home: 'Inicio',
    research: 'Investigación',
    team: 'Equipo',
    skip: 'Saltar al contenido',
  },
  a11y: {
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    switchLang: 'Cambiar idioma',
  },
  hero: {
    eyebrow: 'PreMind · Universidad Villanueva',
    title: 'NOVA',
    tagline: 'Navigating Outcomes Via Analytics',
    subtitle:
      'Llevamos la salud mental de precisión a los servicios psicológicos reales: la intervención adecuada, en el momento adecuado, por el profesional adecuado, para cada persona.',
    ctaContact: 'Participar',
    ctaResearch: 'Ver investigación',
  },
  summary: {
    heading: '¿Qué es el Proyecto NOVA?',
    lead: 'NOVA es un proyecto de I+D del laboratorio PreMind (Precision Mind Lab) de la Universidad Villanueva que busca implantar la Salud Mental de Precisión en los servicios psicológicos reales.',
    body: 'La salud mental de precisión amplía la práctica basada en la evidencia combinando la medición sistemática con la analítica predictiva. Su objetivo es ofrecer la intervención adecuada, en el momento adecuado y por el profesional adecuado para cada persona, usando datos para informar esas decisiones en lugar de basarse únicamente en promedios poblacionales o en la intuición clínica.',
    challengesHeading: 'Tres retos clínicos que abordamos',
    challenges: [
      'Resultados terapéuticos por debajo de lo óptimo.',
      'Altas tasas de abandono del tratamiento.',
      'Uso limitado de los datos en la toma de decisiones clínicas.',
    ],
  },
  pillars: {
    heading: 'Dos pilares',
    items: [
      {
        title: 'Cuidado basado en la medición',
        body: 'Evaluación sistemática y periódica de los datos del paciente a lo largo de todo el tratamiento.',
      },
      {
        title: 'Decisiones basadas en datos',
        body: 'Algoritmos y modelos estadísticos que transforman las mediciones en recomendaciones clínicas accionables.',
      },
    ],
  },
  phases: {
    heading: 'Cómo trabajamos',
    lead: 'El proyecto se desarrolla en cuatro fases secuenciales:',
    items: [
      { title: 'Aceptabilidad clínica', body: 'Evaluación de la aceptabilidad y viabilidad por parte de los profesionales.' },
      { title: 'Ensayos pragmáticos', body: 'Ensayos clínicos pragmáticos en condiciones de práctica real.' },
      { title: 'Desarrollo de algoritmos', body: 'Construcción de modelos predictivos a partir de los datos clínicos.' },
      { title: 'Formación y transferencia', body: 'Formación de profesionales y traslación a la práctica y a las políticas.' },
    ],
  },
  contact: {
    heading: 'Contacto y participación',
    lead: '¿Eres profesional, servicio de salud mental o investigador/a y quieres colaborar con NOVA? Escríbenos.',
    name: 'Nombre',
    email: 'Correo electrónico',
    affiliation: 'Afiliación (opcional)',
    message: 'Mensaje',
    consent: 'He leído y acepto la política de privacidad.',
    submit: 'Enviar mensaje',
    sending: 'Enviando…',
    success: '¡Gracias! Hemos recibido tu mensaje y te responderemos lo antes posible.',
    error: 'No se ha podido enviar el mensaje. Inténtalo de nuevo más tarde.',
    required: 'Por favor, completa los campos obligatorios.',
  },
  research: {
    title: 'Investigación',
    intro: 'Publicaciones, comunicaciones, noticias y tesis del Proyecto NOVA y del laboratorio PreMind.',
    tabs: {
      publications: 'Publicaciones',
      communications: 'Comunicaciones',
      news: 'Noticias',
      theses: 'Tesis',
    },
    empty: 'Contenido próximamente.',
    readMore: 'Leer más',
    viewSource: 'Ver publicación',
    doiLabel: 'DOI',
    allNews: 'Todas las noticias',
    backToResearch: '← Volver a Investigación',
    publicationTypes: {
      article: 'Artículo',
      communication: 'Comunicación',
      chapter: 'Capítulo de libro',
      preprint: 'Preprint',
    },
    thesisKinds: {
      phd: 'Tesis doctoral',
      master: 'Trabajo Fin de Máster',
      tfg: 'Trabajo Fin de Grado',
    },
    supervisedBy: 'Dirección',
  },
  team: {
    title: 'Equipo',
    intro: 'El equipo investigador del Proyecto NOVA, vinculado al laboratorio PreMind de la Universidad Villanueva.',
    categories: {
      pi: 'Investigador principal',
      core: 'Equipo investigador',
      training: 'Investigadores en formación',
      advisor: 'Comité asesor',
      collaborator: 'Colaboradores',
    },
    premindCta: 'Conoce el laboratorio PreMind',
    links: {
      personal: 'Web personal',
      orcid: 'ORCID',
      scholar: 'Google Scholar',
      linkedin: 'LinkedIn',
      premind: 'Ficha en PreMind',
    },
  },
  news: {
    published: 'Publicado el',
    backToList: '← Todas las noticias',
  },
  footer: {
    fundedBy: 'Proyecto financiado por',
    funder: 'Ministerio de Ciencia, Innovación y Universidades',
    projectRefLabel: 'Referencia',
    institutional: 'Enlaces',
    premind: 'PreMind – Universidad Villanueva',
    villanueva: 'Universidad Villanueva',
    pabloRoca: 'Pablo Roca (Investigador Principal)',
    rights: 'Todos los derechos reservados.',
    privacy: 'Política de privacidad',
  },
  seo: {
    home: {
      title: 'NOVA · Salud Mental de Precisión',
      description:
        'Proyecto NOVA (PreMind, Universidad Villanueva): implantamos la salud mental de precisión en los servicios psicológicos reales mediante medición sistemática y analítica de datos.',
    },
    research: {
      title: 'Investigación',
      description:
        'Publicaciones científicas, comunicaciones, noticias y tesis del Proyecto NOVA y del laboratorio PreMind (Universidad Villanueva).',
    },
    team: {
      title: 'Equipo',
      description:
        'Equipo investigador del Proyecto NOVA, vinculado al laboratorio PreMind de la Universidad Villanueva.',
    },
    notFound: {
      title: 'Página no encontrada',
      description: 'La página que buscas no existe.',
    },
  },
  notFound: {
    heading: 'Página no encontrada',
    body: 'Lo sentimos, la página que buscas no existe o se ha movido.',
    cta: 'Volver al inicio',
  },
};

type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    siteName: 'NOVA Project',
  },
  nav: {
    home: 'Home',
    research: 'Research',
    team: 'Team',
    skip: 'Skip to content',
  },
  a11y: {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLang: 'Change language',
  },
  hero: {
    eyebrow: 'PreMind · Villanueva University',
    title: 'NOVA',
    tagline: 'Navigating Outcomes Via Analytics',
    subtitle:
      'Bringing precision mental health to real-world psychological services: the right intervention, at the right time, by the right clinician, for each individual.',
    ctaContact: 'Get involved',
    ctaResearch: 'View research',
  },
  summary: {
    heading: 'What is the NOVA project?',
    lead: 'NOVA is an R&D project of the PreMind lab (Precision Mind Lab) at Villanueva University that aims to implement Precision Mental Health in real-world psychological services.',
    body: 'Precision mental health extends evidence-based practice by combining systematic measurement with predictive analytics. It seeks to deliver the right intervention, at the right time, by the right clinician, for a given individual, using data to inform these choices rather than relying solely on population averages or clinical intuition.',
    challengesHeading: 'Three clinical challenges we address',
    challenges: [
      'Suboptimal treatment outcomes.',
      'High treatment dropout rates.',
      'Limited use of data in clinical decision-making.',
    ],
  },
  pillars: {
    heading: 'Two pillars',
    items: [
      {
        title: 'Measurement-based care',
        body: 'Systematic, regular assessment of patient data throughout the course of treatment.',
      },
      {
        title: 'Data-driven decision-making',
        body: 'Algorithms and statistical models that turn measurements into clinically actionable recommendations.',
      },
    ],
  },
  phases: {
    heading: 'How we work',
    lead: 'The project unfolds across four sequential phases:',
    items: [
      { title: 'Clinician acceptability', body: 'Assessing acceptability and feasibility among practitioners.' },
      { title: 'Pragmatic trials', body: 'Pragmatic clinical trials under real-world care conditions.' },
      { title: 'Algorithm development', body: 'Building predictive models from clinical data.' },
      { title: 'Training & translation', body: 'Training clinicians and translating findings into practice and policy.' },
    ],
  },
  contact: {
    heading: 'Contact & participation',
    lead: 'Are you a clinician, a mental health service or a researcher who wants to collaborate with NOVA? Get in touch.',
    name: 'Name',
    email: 'Email',
    affiliation: 'Affiliation (optional)',
    message: 'Message',
    consent: 'I have read and accept the privacy policy.',
    submit: 'Send message',
    sending: 'Sending…',
    success: 'Thank you! We have received your message and will get back to you soon.',
    error: 'Your message could not be sent. Please try again later.',
    required: 'Please fill in the required fields.',
  },
  research: {
    title: 'Research',
    intro: 'Publications, communications, news and theses from the NOVA project and the PreMind lab.',
    tabs: {
      publications: 'Publications',
      communications: 'Communications',
      news: 'News',
      theses: 'Theses',
    },
    empty: 'Coming soon.',
    readMore: 'Read more',
    viewSource: 'View publication',
    doiLabel: 'DOI',
    allNews: 'All news',
    backToResearch: '← Back to Research',
    publicationTypes: {
      article: 'Article',
      communication: 'Communication',
      chapter: 'Book chapter',
      preprint: 'Preprint',
    },
    thesisKinds: {
      phd: 'PhD thesis',
      master: "Master's thesis",
      tfg: 'Undergraduate thesis',
    },
    supervisedBy: 'Supervision',
  },
  team: {
    title: 'Team',
    intro: 'The NOVA project research team, affiliated with the PreMind lab at Villanueva University.',
    categories: {
      pi: 'Principal investigator',
      core: 'Research team',
      training: 'Early-career researchers',
      advisor: 'Advisory board',
      collaborator: 'Collaborators',
    },
    premindCta: 'Discover the PreMind lab',
    links: {
      personal: 'Website',
      orcid: 'ORCID',
      scholar: 'Google Scholar',
      linkedin: 'LinkedIn',
      premind: 'PreMind profile',
    },
  },
  news: {
    published: 'Published on',
    backToList: '← All news',
  },
  footer: {
    fundedBy: 'Project funded by',
    funder: 'Spanish Ministry of Science, Innovation and Universities',
    projectRefLabel: 'Reference',
    institutional: 'Links',
    premind: 'PreMind – Villanueva University',
    villanueva: 'Villanueva University',
    pabloRoca: 'Pablo Roca (Principal Investigator)',
    rights: 'All rights reserved.',
    privacy: 'Privacy policy',
  },
  seo: {
    home: {
      title: 'NOVA · Precision Mental Health',
      description:
        'NOVA project (PreMind, Villanueva University): implementing precision mental health in real-world psychological services through systematic measurement and data analytics.',
    },
    research: {
      title: 'Research',
      description:
        'Scientific publications, communications, news and theses from the NOVA project and the PreMind lab (Villanueva University).',
    },
    team: {
      title: 'Team',
      description:
        'Research team of the NOVA project, affiliated with the PreMind lab at Villanueva University.',
    },
    notFound: {
      title: 'Page not found',
      description: 'The page you are looking for does not exist.',
    },
  },
  notFound: {
    heading: 'Page not found',
    body: 'Sorry, the page you are looking for does not exist or has moved.',
    cta: 'Back to home',
  },
};

export const ui = { es, en } satisfies Record<Lang, Dictionary>;
