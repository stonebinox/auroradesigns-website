import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string().min(1),
    client: z.string().min(1),
    industry: z.string().min(1),
    year: z.number().int(),
    role: z.string().min(1),
    stack: z.array(z.string().min(1)).min(1),
    tags: z.array(z.string().min(1)).min(1),
    summary: z.string().min(1),
    url: z.url().optional(),
    metrics: z
      .array(
        z.object({
          label: z.string().min(1),
          value: z.string().min(1),
        })
      )
      .optional(),
    featured: z.boolean().default(false),
    order: z.number().int(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    name: z.string().min(1),
    tagline: z.string().min(1),
    status: z.enum(['live', 'building', 'private']),
    url: z.url().optional(),
    stack: z.array(z.string().min(1)).min(1),
    summary: z.string().min(1),
    order: z.number().int(),
  }),
});

export const collections = { work, products };
