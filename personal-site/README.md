# Scott Jezik personal site

Scott's personal site is a content-first Astro site: the homepage is a living CV, project archive, writing index, and speaker page in one place. It treats engineering, social science, technology, and geopolitics as connected areas under one thesis: technology shapes society, and society shapes what technology becomes.

## Local preview

From this folder, install dependencies once and start the Astro preview:

`pnpm install`

`pnpm dev`

Then open the local URL Astro prints, usually `http://localhost:4321/`.

## Where to edit

- `src/content/articles/` contains Markdown articles.
- `src/content/projects/` contains Markdown project pages.
- `src/pages/index.astro` controls the homepage sections and CV content.
- `src/layouts/BaseLayout.astro` controls shared metadata, navigation, and footer.
- `src/styles.css` contains the visual system and responsive layout.

## Before publishing

1. Replace the starter Markdown articles and projects with your real work.
2. Add a résumé PDF and link it from the CV section.
3. Confirm the preferred domain and update canonical, Open Graph, robots, and sitemap URLs.
4. Add final social links and a professional headshot if desired.
