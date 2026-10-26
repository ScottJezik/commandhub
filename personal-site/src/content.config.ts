import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Interdisciplinary', 'Geopolitics', 'STEM', 'Technology & Society']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
})

export const collections = { articles, projects }
