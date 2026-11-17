export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  answer: string;
  audience: string;
  deliverables: string[];
  proof: string[];
  proofNote: string;
  related: string[];
  faqs: Faq[];
}

export interface SiteData {
  brand: string;
  legalName: string;
  url: string;
  email: string;
  phone: {
    display: string;
    href: string;
  };
  location: string;
  citationLocation: string;
  countries: string[];
  social: { label: string; href: string }[];
  entity: string;
  category: string;
  founders: { name: string; jobTitle: string; summary?: string; sameAs: string[] }[];
  sameAs: string[];
  knowsAbout: string[];
  services: Service[];
  faqs: Faq[];
  keyPages: { label: string; path: string; description: string }[];
}

const entity =
  'Aurora Designs is a software architecture and engineering consultancy based in Bangalore, India. It embeds forward-deployed engineers with client teams to build AI-native systems: AI agents, MCP integrations and the backend architecture around them.';

const countries = [
  'USA',
  'Australia',
  'Canada',
  'Estonia',
  'Poland',
  'UK',
  'Jordan',
  'India',
];

const email = 'contact@auroradesignshq.com';

const countryList = `${countries.slice(0, -1).join(', ')} and ${countries[countries.length - 1]}`;

const services: Service[] = [
    {
      id: 'forward-deployed-engineering',
      name: 'Forward-deployed engineering',
      description:
        'Engineers who join the client team and work in its repos, tools and delivery rhythm.',
      answer:
        'Aurora Designs provides forward-deployed engineers: senior engineers who join your team and work in your repos, tools and delivery rhythm. They plan, build and ship with your people, not through a vendor thread, and leave a knowledge repo your team keeps.',
      audience:
        'Teams with a hard technical problem, a deadline and no spare senior capacity.',
      deliverables: [
        'Engineers in your standups, your repos and your review process',
        'A knowledge repo of the system, its decisions and its gotchas',
        'Production code, reviewed by several AI models and approved by a person',
      ],
      proof: [
        'web-data-infrastructure-knowledge-base',
        'recruitment-talent-workflow-rebuild',
      ],
      proofNote: 'The web-data infrastructure and recruitment case studies.',
      related: ['engineering-knowledge-bases', 'systems-architecture'],
      faqs: [
        {
          q: 'How is this different from outsourcing?',
          a: 'We work inside your team and your codebase, not on a separate track. Your engineers see every change, and the knowledge stays with them.',
        },
        {
          q: 'Do you work in our time zone?',
          a: 'We are based in Bangalore and work remotely with clients in the USA, Australia, Canada, Europe, the Middle East and India.',
        },
      ],
    },
    {
      id: 'ai-agents-mcp',
      name: 'AI agents and MCP integrations',
      description:
        'AI agents and Model Context Protocol servers that connect AI to business systems.',
      answer:
        'Aurora Designs builds AI agents and Model Context Protocol (MCP) servers that connect AI to the systems a business already runs on. Your team can then run operations in plain chat: look up a client, take an action, or read a trend, with the same permissions as your existing tools.',
      audience:
        'Businesses whose people spend their day moving between dashboards, spreadsheets and chat apps.',
      deliverables: [
        'An MCP server that exposes your business actions to an AI assistant, with previews and confirmation before writes',
        'Integrations with the tools you already use, such as payments, messaging and booking',
        'An audit trail of what the AI did and for whom',
      ],
      proof: ['maison-de-medusa'],
      proofNote:
        'Maison de Medusa. One admin, working with an AI assistant, manages 90+ members, four instructors and a six-person cafe team.',
      related: ['ai-workflow-rebuilds', 'forward-deployed-engineering'],
      faqs: [
        {
          q: 'What is MCP?',
          a: 'The Model Context Protocol is an open standard for connecting AI assistants to tools and data. One server can work with several AI clients.',
        },
        {
          q: 'Can the AI make mistakes in our systems?',
          a: 'Writes go through previews and explicit confirmation, and backend permissions stay the final check.',
        },
      ],
    },
    {
      id: 'systems-architecture',
      name: 'Backend and systems architecture',
      description:
        'Architecture for systems that must fit existing industry standards and live production code.',
      answer:
        'Aurora Designs designs backend and system architecture for software that has to fit existing industry standards and live production code. We design inside the frameworks your industry already runs on, rather than around them.',
      audience:
        'Teams building on top of legacy systems, industry standards or a live user base.',
      deliverables: [
        'An architecture that integrates with the standards and systems you cannot replace',
        'Written decisions with the reasons and the options rejected',
        'A design reviewed by several AI models and challenged before any code exists',
      ],
      proof: ['hotel-booking-architecture'],
      proofNote:
        'The hotel-booking architecture case study (architecture stage, in active development).',
      related: ['forward-deployed-engineering', 'ai-agents-mcp'],
      faqs: [
        {
          q: 'Do you only design, or also build?',
          a: 'Both. Architecture work can continue into implementation with the same engineers.',
        },
        {
          q: 'Can you work with our legacy systems?',
          a: 'Yes. Most of our work builds on existing production code, not greenfield.',
        },
      ],
    },
    {
      id: 'ai-workflow-rebuilds',
      name: 'AI workflow rebuilds',
      description:
        'Turning human-run processes into self-serve, AI-driven workflows.',
      answer:
        'Aurora Designs rebuilds human-run business processes as self-serve, AI-driven workflows. We work on top of your live production code and users, so the service keeps running while it changes.',
      audience:
        'Companies where a manual, people-heavy process limits growth.',
      deliverables: [
        'A self-serve workflow that replaces the manual steps',
        'Integration across the systems the process touches',
        'A knowledge repo your team can use to extend it',
      ],
      proof: ['recruitment-talent-workflow-rebuild'],
      proofNote:
        'The recruitment case study: a human-mediated talent service rebuilt into a self-serve, AI-driven recruiter workflow during an acquisition-scale migration.',
      related: ['ai-agents-mcp', 'forward-deployed-engineering'],
      faqs: [
        {
          q: 'Do we need to rebuild from scratch?',
          a: 'No. We build on your existing codebase and live users.',
        },
        {
          q: 'Which AI models do you use?',
          a: 'The one that fits the job. Our past work has used Claude, Gemini and others.',
        },
      ],
    },
    {
      id: 'engineering-knowledge-bases',
      name: 'Engineering knowledge bases',
      description:
        'A knowledge repo that engineers and AI tools read first, and that stays with the client after the engagement.',
      answer:
        'Aurora Designs builds engineering knowledge bases: one repo that holds how your systems work and why, read first by every engineer and every AI tool. It works with Claude, Codex or Copilot, and it stays with your team.',
      audience:
        "Teams where critical knowledge lives in a few senior engineers' heads, and new hires take months to onboard.",
      deliverables: [
        'Interviews with your engineers to capture the reasoning behind your systems',
        'A model-agnostic knowledge repo your AI tools read before they work',
        'A habit: engineers and AI tools write back what they learn',
      ],
      proof: ['web-data-infrastructure-knowledge-base'],
      proofNote:
        'The web-data infrastructure case study. The team adopted the knowledge base and contributes to it.',
      related: ['forward-deployed-engineering', 'ai-workflow-rebuilds'],
      faqs: [
        {
          q: 'Is this just documentation?',
          a: 'No. It is written for AI tools as much as people, and it changes how they work in your repos.',
        },
        {
          q: 'Which AI tools does it work with?',
          a: 'Claude, Codex and Copilot. It is plain files in a repo, so it is not tied to one vendor.',
        },
      ],
    },
];

export const site: SiteData = {
  brand: 'Aurora Designs',
  legalName: 'Aurora Designs LLP',
  url: 'https://www.auroradesignshq.com',
  email,
  phone: {
    display: '+91 63600 58954',
    href: 'tel:+916360058954',
  },
  location: 'Bangalore, India — remote, worldwide',
  citationLocation: 'Bangalore, India (remote, worldwide)',
  countries,
  social: [],
  entity,
  category: 'Software architecture and engineering consultancy',
  founders: [
    {
      name: 'Anoop Santhanam',
      jobTitle: 'Co-founder',
      summary: 'Leads engineering.',
      sameAs: ['https://linkedin.com/in/anoop-1507'],
    },
    { name: 'Anusha Rao', jobTitle: 'Co-founder', sameAs: [] },
  ],
  sameAs: [
    'https://www.instagram.com/auroradesignsai/',
    'https://linkedin.com/company/aurora-designs-llp/',
  ],
  knowsAbout: [
    'AI agents',
    'Model Context Protocol (MCP)',
    'AI-native software',
    'Software architecture',
    'Backend engineering',
    'Forward-deployed engineering',
    'Multi-model AI orchestration',
    'Engineering knowledge bases',
  ],
  services,
  faqs: [
    { q: 'What does Aurora Designs do?', a: entity },
    {
      q: 'What is a forward-deployed engineer?',
      a: "An engineer who works inside the client's team, in its repos and delivery rhythm, rather than through a vendor thread.",
    },
    {
      q: 'How does Aurora Designs use AI?',
      a: 'One AI plans, one writes the code, and others review it blind and attack the plan. A person approves every push.',
    },
    {
      q: 'Where does Aurora Designs work?',
      a: `Aurora Designs is based in Bangalore, India, and works remotely. It has clients in the ${countryList}.`,
    },
    {
      q: 'What stays after an engagement ends?',
      a: 'The knowledge repo, the documented decisions, and a team that can run the system.',
    },
    {
      q: 'Who founded Aurora Designs?',
      a: 'Anoop Santhanam and Anusha Rao, co-founders of Aurora Designs LLP.',
    },
    {
      q: 'Does AI write code that goes straight to production?',
      a: "No. Several models check each other's work, and a person reviews and approves every push.",
    },
    {
      q: 'Which AI models do you use?',
      a: 'The one that fits the job. Past work has used Claude, Codex, Gemini and Copilot.',
    },
    {
      q: 'How do I start an engagement?',
      a: `Email ${email}.`,
    },
  ],
  keyPages: [
    {
      label: 'Home',
      path: '/',
      description: 'Overview of Aurora Designs, its services and how to get in touch.',
    },
    {
      label: 'How we work',
      path: '/how-we-work/',
      description: 'The working method: knowledge repo, AI planning and review, human approval.',
    },
    ...services.map((s) => ({
      label: s.name,
      path: `/services/${s.id}/`,
      description: s.description,
    })),
    {
      label: 'Selected work',
      path: '/#work',
      description: 'Case studies of systems built and shipped to production.',
    },
    {
      label: 'Products',
      path: '/#products',
      description: 'Products Aurora Designs builds and runs.',
    },
    {
      label: 'FAQ',
      path: '/faq/',
      description: 'Answers to questions buyers ask before they hire Aurora Designs.',
    },
    {
      label: 'About',
      path: '/about/',
      description: 'Who founded Aurora Designs and what the team does.',
    },
    {
      label: 'Contact',
      path: '/#contact',
      description: 'How to start an engagement.',
    },
  ],
};
