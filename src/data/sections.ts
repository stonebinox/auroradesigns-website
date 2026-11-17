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
  'The knowledge repo comes first: every engineer and AI tool reads it and writes back what it learns.',
  'Several models, separate jobs: one AI plans, one writes the code, others review it and attack the plan.',
  'The reviewers work blind: they get the task, not our theory of the problem.',
  'Zero assumptions: every claim is unverified until the code is read or run.',
  'Simplicity first: the smallest change that solves the real problem.',
  'Circuit breaker: a person reviews and approves every push to the client codebase.',
] as const;
