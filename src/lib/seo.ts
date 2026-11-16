import { site } from '../data/site';

export type JsonLdNode = Record<string, unknown>;

export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  founder: (name: string) => `${site.url}/#founder-${slugify(name)}`,
  service: (id: string) => `${site.url}/#service-${id}`,
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function absoluteUrl(path: string): string {
  return new URL(path, `${site.url}/`).href;
}

export function organizationNode(): JsonLdNode {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ids.organization,
    name: site.brand,
    legalName: site.legalName,
    url: `${site.url}/`,
    logo: absoluteUrl('/apple-touch-icon.png'),
    email: site.email,
    telephone: site.phone.href.replace('tel:', ''),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressCountry: 'IN',
    },
    description: site.entity,
    knowsAbout: site.knowsAbout,
    sameAs: site.sameAs,
    areaServed: site.countries,
    founder: site.founders.map((f) => ({ '@id': ids.founder(f.name) })),
  };
}

export function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    name: site.brand,
    url: `${site.url}/`,
    inLanguage: 'en',
    publisher: { '@id': ids.organization },
  };
}

export function founderNodes(): JsonLdNode[] {
  return site.founders.map((f) => ({
    '@type': 'Person',
    '@id': ids.founder(f.name),
    name: f.name,
    jobTitle: f.jobTitle,
    worksFor: { '@id': ids.organization },
    ...(f.sameAs.length > 0 ? { sameAs: f.sameAs } : {}),
  }));
}

export function serviceNodes(): JsonLdNode[] {
  return site.services.map((s) => ({
    '@type': 'Service',
    '@id': ids.service(s.id),
    name: s.name,
    description: s.description,
    serviceType: s.name,
    provider: { '@id': ids.organization },
  }));
}

export interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbNode(pageUrl: string, crumbs: Crumb[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function webPageNode(pageUrl: string, name: string, description: string): JsonLdNode {
  return {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.organization },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
  };
}

export function articleNode(
  pageUrl: string,
  headline: string,
  description: string,
  image: string,
): JsonLdNode {
  return {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline,
    description,
    url: pageUrl,
    image,
    inLanguage: 'en',
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
    author: { '@id': ids.organization },
    publisher: { '@id': ids.organization },
  };
}

export interface GraphInput {
  pageUrl: string;
  name: string;
  description: string;
  crumbs: Crumb[];
  extra?: JsonLdNode[];
}

export function buildGraph({ pageUrl, name, description, crumbs, extra = [] }: GraphInput): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      websiteNode(),
      ...founderNodes(),
      ...serviceNodes(),
      webPageNode(pageUrl, name, description),
      breadcrumbNode(pageUrl, crumbs),
      ...extra,
    ],
  };
}

export function serializeJsonLd(data: JsonLdNode): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
