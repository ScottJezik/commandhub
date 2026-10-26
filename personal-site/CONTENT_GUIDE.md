# Adding content

The site now uses Astro content collections. Articles and projects are Markdown files, so adding a new piece does not require editing the page layout.

## Add an article

Create a new file in `src/content/articles/`, for example `src/content/articles/my-new-essay.md`:

```md
---
title: "A clear title"
description: "A one- or two-sentence summary for the homepage and search engines."
date: 2026-10-25
category: "Geopolitics"
tags: [technology, power]
featured: true
---

Write the article here in Markdown.
```

Supported categories are `Interdisciplinary`, `Geopolitics`, `STEM`, and `Technology & Society`. The article automatically appears on the homepage and gets its own URL at `/articles/my-new-essay/`.

## Add a project

Create a Markdown file in `src/content/projects/` with this shape:

```md
---
title: "Project name"
description: "What you made and why it matters."
status: "In progress"
tags: [engineering, research]
featured: true
---

Add the longer project description here.
```

It will appear in the work section and get its own page at `/projects/project-name/`.

## Preview and publish

From this folder, run `pnpm install` once, then `pnpm dev` to preview changes locally. Run `pnpm build` to create the production site in `dist/`. Upload the contents of `dist/` to your host, or connect the repository to a host such as Cloudflare Pages, Netlify, or GitHub Pages.

## Add your real CV

Replace the starter entries in `src/pages/index.astro`, then place your PDF in `public/` and link to it from the CV section.

## Searchability

The site is structured with real headings and text, article pages, a `Person` schema block, canonical URLs, `robots.txt`, and a sitemap. It can be indexed once published on a public domain. Before publishing, replace `scottjezik.com` in `astro.config.mjs`, `public/robots.txt`, and `public/sitemap.xml` with the domain you actually use, then submit the domain to Google Search Console and Bing Webmaster Tools.
