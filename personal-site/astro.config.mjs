import { defineConfig } from 'astro/config'

const isGithubPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  site: isGithubPages ? 'https://scottjezik.github.io/commandhub' : 'https://scottjezik.com',
  base: isGithubPages ? '/commandhub' : '/',
})
