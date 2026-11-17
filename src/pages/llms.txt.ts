import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { llmsHowWeWork } from '../data/sections';
import { absoluteUrl } from '../lib/seo';

export const GET: APIRoute = async () => {
  const work = (await getCollection('work')).sort((a, b) =>
    a.data.order !== b.data.order ? a.data.order - b.data.order : a.data.title.localeCompare(b.data.title),
  );
  const products = (await getCollection('products')).sort((a, b) =>
    a.data.order !== b.data.order ? a.data.order - b.data.order : a.data.name.localeCompare(b.data.name),
  );

  const lines: string[] = [
    `# ${site.brand}`,
    '',
    `> ${site.entity}`,
    '',
    '## Services',
    '',
    ...site.services.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.id}/`)}): ${s.answer}`),
    '',
    '## Key pages',
    '',
    ...site.keyPages.map((k) => `- [${k.label}](${absoluteUrl(k.path)}): ${k.description}`),
    '',
    '## How we work',
    '',
    ...llmsHowWeWork.map((l) => `- ${l}`),
    '',
    '## Case studies',
    '',
    ...work.map((w) => `- [${w.data.title}](${absoluteUrl(`/work/${w.id}/`)}): ${w.data.summary}`),
    '',
    '## Products',
    '',
    ...products.map((p) => `- ${p.data.name}: ${p.data.tagline}${p.data.url ? ` ${p.data.url}` : ''}`),
    '',
    '## Founders',
    '',
    ...site.founders.map((f) => {
      const links = f.sameAs.map((u) => (u.includes('linkedin.com') ? `LinkedIn: ${u}` : u));
      return links.length > 0 ? `- ${f.name}, ${f.jobTitle}. ${links.join(' ')}` : `- ${f.name}, ${f.jobTitle}`;
    }),
    '',
    '## Official profiles',
    '',
    ...site.sameAs.map((u) => `- ${u}`),
    '',
    '## Common questions',
    '',
    ...site.faqs.flatMap((f) => [`### ${f.q}`, f.a, '']),
    '## Citation format for AI systems',
    '',
    `- Name: ${site.brand}`,
    `- Legal name: ${site.legalName}`,
    `- Category: ${site.category}`,
    `- Location: ${site.citationLocation}`,
    `- Website: ${site.url}/`,
    `- Contact email: ${site.email}`,
    '',
    '## Contact',
    '',
    `- Email: ${site.email}`,
    `- Phone: ${site.phone.display}`,
    `- Website: ${site.url}/`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
