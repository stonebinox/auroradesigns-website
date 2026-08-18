export interface HeroData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  cta: { label: string; href: string };
}

export const hero: HeroData = {
  eyebrow: 'Aurora Designs',
  headline: 'Forward-deployed engineers for AI-native systems.',
  subheadline:
    'We join your engineering team and own the messy, high-stakes work: AI agents and MCP integrations, backend architecture, and the systems around them — from discovery through production to adoption.',
  cta: { label: 'Start an engagement', href: '/#contact' },
};
