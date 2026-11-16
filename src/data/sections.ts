export const sections = {
  about: {
    label: 'about',
    heading: 'About Aurora Designs',
    foundedByPrefix: 'Founded by',
    servicesLabel: 'What we do',
  },
  work: {
    heading: 'Work that reaches production.',
    empty: 'Case studies are being prepared.',
  },
  products: {
    heading: 'Products we build and run.',
    empty: 'Products are on the way.',
  },
  contact: {
    heading: 'Bring us into the hard part.',
    body: "Tell us what's blocked. We'll help your team move it into production.",
  },
} as const;

export const notFound = {
  title: 'Page not found',
  label: 'not found',
  heading: 'This page does not exist.',
  body: 'The link is wrong or the page has moved.',
  cta: 'Back to the home page',
} as const;

export const llmsHowWeWork = [
  'A knowledge repo is read first and written back to.',
  'One AI plans, one writes the code, and others review it blind and attack the plan.',
  'Zero assumptions: every claim is checked against running code.',
  'Simplicity first.',
  'A person approves every push.',
] as const;
