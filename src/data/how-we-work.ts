export interface HowWeWorkStep {
  index: string;
  title: string;
  description: string;
}

export const howWeWork = {
  title: 'How we work: AI-assisted engineering with human sign-off',
  heading: "We use a lot of AI. We don't let it grade its own homework.",
  answer:
    'Aurora Designs uses several AI models to plan, write and review software, and checks each one against the others. One AI plans, one writes the code, and others review it blind and attack the plan before any code exists. Everything the team learns goes into a knowledge repo that stays with the client. A person approves every push.',
  steps: [
    {
      index: '01',
      title: 'The knowledge repo comes first',
      description:
        "Every engagement starts with a knowledge repo: the systems, decisions and gotchas, written down in one place. Every engineer and every AI tool reads it before starting work and writes back what it learns. It belongs to you, and it stays when we leave. Not in Dave's head.",
    },
    {
      index: '02',
      title: 'Several models, separate jobs',
      description:
        'One AI plans. One writes the code. A second reviews the plan and the code independently. A third plays skeptic and attacks the plan before any code exists. Every objection gets an answer: accepted and fixed, or rejected with a reason.',
    },
    {
      index: '03',
      title: 'The reviewers work blind',
      description:
        'Reviewers never see our theory of the problem. They get the task and form their own view. When two AIs agree too fast, we treat that as a warning, not proof. The code and the tests that judge it are never written by the same agent.',
    },
    {
      index: '04',
      title: 'Zero assumptions',
      description:
        'We treat every claim as unverified until we read the code or run it. That includes what the AI says, what the docs say and what we assumed yesterday.',
    },
    {
      index: '05',
      title: 'Simplicity first',
      description: 'The smallest change that solves the real problem. Less code, on purpose.',
    },
    {
      index: '06',
      title: 'Circuit breaker',
      description:
        'When our conclusion changes twice, we stop guessing and bring in a human. A person reviews and approves every push to your codebase.',
    },
  ],
  closing:
    'You get senior engineers and well-supervised robots, and a codebase your team can run after we leave.',
  cta: { label: 'Start an engagement', href: '/#contact' },
  homeLink: { label: 'How we work in full', href: '/how-we-work/' },
  breadcrumb: 'How we work',
} satisfies {
  title: string;
  heading: string;
  answer: string;
  steps: HowWeWorkStep[];
  closing: string;
  cta: { label: string; href: string };
  homeLink: { label: string; href: string };
  breadcrumb: string;
};
