export interface HowWeWorkStep {
  index: string;
  label: string;
  title: string;
  description: string;
}

export const howWeWork = {
  heading: 'Engineering that stays close to the work.',
  steps: [
    { index: '01', label: 'embed', title: 'Join the team, not a vendor thread.', description: 'We work in your repos, your tools, and your delivery rhythm, next to the people who own the outcome. You get engineers who make decisions and ship — not a status deck.' },
    { index: '02', label: 'discovery', title: 'Map the real constraints.', description: 'We trace the architecture, the data boundaries, and the delivery risks before writing code. You get a shared technical direction, a prioritized plan, and clear ownership.' },
    { index: '03', label: 'production', title: 'Build the path to production.', description: 'We design, implement, test, and deploy the systems that remove the constraint — including the unglamorous reliability work. You get working software with production safeguards and documented decisions.' },
    { index: '04', label: 'adoption', title: 'Leave capability behind.', description: 'We pair with your team, set the operating practices, and close the gaps that block confident ownership. You get a team that runs, extends, and improves the system after we leave.' },
  ],
} satisfies { heading: string; steps: HowWeWorkStep[] };
