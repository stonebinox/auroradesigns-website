// TODO: Real copy in task ao1.3 (Build How we work section)
export interface Step {
  index: string;
  label: string;
  description: string;
}

export interface HowWeWorkData {
  steps: Step[];
}

export const howWeWork: HowWeWorkData = {
  steps: [
    {
      index: '01',
      label: 'Embed',
      description: 'Placeholder description for embed step.',
    },
    {
      index: '02',
      label: 'Discovery',
      description: 'Placeholder description for discovery step.',
    },
    {
      index: '03',
      label: 'Production',
      description: 'Placeholder description for production step.',
    },
    {
      index: '04',
      label: 'Adoption',
      description: 'Placeholder description for adoption step.',
    },
  ],
};
