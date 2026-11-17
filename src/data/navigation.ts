export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'How we work', href: '/how-we-work/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/#contact' },
];
