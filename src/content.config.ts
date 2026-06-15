import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Reusable bilingual text field. `es` is required; `en` falls back to `es`. */
const localized = z.object({ es: z.string(), en: z.string().optional() });

/** Research team & advisory board — one YAML file per person. */
const team = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml,json}', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: localized,
      category: z.enum(['pi', 'core', 'training', 'advisor', 'collaborator']),
      photo: image().optional(),
      bio: localized.optional(),
      order: z.number().default(99),
      links: z
        .object({
          premind: z.url().optional(),
          personal: z.url().optional(),
          orcid: z.url().optional(),
          scholar: z.url().optional(),
          linkedin: z.url().optional(),
        })
        .optional(),
    }),
});

/** Scientific publications and conference communications — one YAML file per entry. */
const publications = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml,json}', base: './src/content/publications' }),
  schema: z.object({
    type: z.enum(['article', 'communication', 'chapter', 'preprint']).default('article'),
    title: z.string(),
    authors: z.array(z.string()).default([]),
    venue: z.string().optional(),
    year: z.number(),
    date: z.coerce.date().optional(),
    doi: z.string().optional(),
    url: z.url().optional(),
    summary: localized.optional(),
    featured: z.boolean().default(false),
  }),
});

/** Theses linked to the project — one YAML file per entry. */
const theses = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml,json}', base: './src/content/theses' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    kind: z.enum(['phd', 'master', 'tfg']).default('phd'),
    year: z.number(),
    supervisors: z.array(z.string()).default([]),
    university: z.string().optional(),
    url: z.url().optional(),
    abstract: localized.optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Project news — Markdown, organized in per-language subfolders:
 *   src/content/news/es/<slug>.md  and  src/content/news/en/<slug>.md
 * The language and slug are derived from the file path (no need to repeat them
 * in the frontmatter).
 */
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    /** Optional cover image in /public, e.g. "/news/launch.jpg". */
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { team, publications, theses, news };
