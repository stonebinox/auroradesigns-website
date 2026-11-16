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
  founders: { name: string; jobTitle: string; sameAs: string[] }[];
  sameAs: string[];
  knowsAbout: string[];
  services: { id: string; name: string; description: string }[];
  faqs: { q: string; a: string }[];
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
      sameAs: ['https://linkedin.com/in/anoop-1507'],
    },
    { name: 'Anusha Rao', jobTitle: 'Co-founder', sameAs: [] },
  ],
  sameAs: ['https://www.instagram.com/auroradesignsai/'],
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
  services: [
    {
      id: 'forward-deployed-engineering',
      name: 'Forward-deployed engineering',
      description:
        'Engineers who join the client team and work in its repos, tools and delivery rhythm.',
    },
    {
      id: 'ai-agents-mcp',
      name: 'AI agents and MCP integrations',
      description:
        'AI agents and Model Context Protocol servers that connect AI to business systems.',
    },
    {
      id: 'systems-architecture',
      name: 'Backend and systems architecture',
      description:
        'Architecture for systems that must fit existing industry standards and live production code.',
    },
    {
      id: 'ai-workflow-rebuilds',
      name: 'AI workflow rebuilds',
      description:
        'Turning human-run processes into self-serve, AI-driven workflows.',
    },
    {
      id: 'engineering-knowledge-bases',
      name: 'Engineering knowledge bases',
      description:
        'A knowledge repo that engineers and AI tools read first, and that stays with the client after the engagement.',
    },
  ],
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
      path: '/#how-we-work',
      description: 'The working method: knowledge repo, AI planning and review, human approval.',
    },
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
      label: 'About',
      path: '/#about',
      description: 'Who founded Aurora Designs and what the team does.',
    },
    {
      label: 'Contact',
      path: '/#contact',
      description: 'How to start an engagement.',
    },
  ],
};
