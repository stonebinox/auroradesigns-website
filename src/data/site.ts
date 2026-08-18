export interface SiteData {
  brand: string;
  legalName: string;
  email: string;
  phone: {
    display: string;
    href: string;
  };
  location: string;
  countries: string[];
  social: { label: string; href: string }[];
}

export const site: SiteData = {
  brand: 'Aurora Designs',
  legalName: 'Aurora Designs LLP',
  email: 'contact@auroradesignshq.com',
  phone: {
    display: '+91 63600 58954',
    href: 'tel:+916360058954',
  },
  location: 'Bangalore, India — remote, worldwide',
  countries: [
    'USA',
    'Australia',
    'Canada',
    'Estonia',
    'Poland',
    'UK',
    'Jordan',
    'India',
  ],
  social: [],
};
