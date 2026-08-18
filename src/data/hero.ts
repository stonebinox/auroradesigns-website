// TODO: Real copy in task ao1.2 (Build Hero section)
export interface HeroData {
  headline: string;
  subheadline: string;
  cta: {
    label: string;
    href: string;
  };
}

export const hero: HeroData = {
  headline: 'Headline placeholder',
  subheadline: 'Subheadline placeholder',
  cta: {
    label: 'Start an engagement',
    href: '/#contact',
  },
};
