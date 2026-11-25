import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function resolveBasePath(): string {
  if (process.env.VITE_BASE_PATH) {
    return process.env.VITE_BASE_PATH
  }
  const hasCustomDomain = existsSync(resolve(process.cwd(), 'public/CNAME'))
  if (process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY && !hasCustomDomain) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1]
    if (repoName && !repoName.endsWith('.github.io')) {
      return `/${repoName}/`
    }
  }
  return '/'
}

function githubPagesMultiRoutePlugin(): Plugin {
  const preRenderedRoutes = [
    'o-udruzi',
    'natjecanja',
    'natjecanja/malonogometna-liga-dobrosusjedski-odnosi',
    'natjecanja/organizacija-rekreativnih-liga-hrvatska',
    'natjecanja/malonogometni-kupovi-i-turniri',
    'natjecanja/turniri-za-djecu-i-mlade',
    'natjecanja/arhiva-dobrosusjedski-odnosi-2015-2016',
    'raspored-i-tablice',
    'vijesti',
    'vijesti/allplan-croatia-fermoy-prvak-dobrosusjedskih-odnosa-2026',
    'vijesti/dobrosusjedski-odnosi-ponovno-na-krizevackom-rasporedu',
    'vijesti/iz-arhive-srpanj-2016-sedamnaest-momcadi-u-dvije-jakosne-skupine',
    'vijesti/iz-arhive-rujan-2015-trojica-igraca-na-popisu-za-europsko-prvenstvo',
    'vijesti/vizija-udruge-nogometne-lige-i-turniri-diljem-hrvatske',
    'galerija',
    'prijava-i-kontakt',
  ]

  return {
    name: 'github-pages-multi-route',
    closeBundle() {
      const distDir = resolve(process.cwd(), 'dist')
      const indexHtmlPath = resolve(distDir, 'index.html')
      if (!existsSync(indexHtmlPath)) return

      const html = readFileSync(indexHtmlPath, 'utf-8')
      writeFileSync(resolve(distDir, '404.html'), html, 'utf-8')
      writeFileSync(resolve(distDir, '.nojekyll'), '', 'utf-8')

      for (const route of preRenderedRoutes) {
        const routeDir = resolve(distDir, route)
        mkdirSync(routeDir, { recursive: true })
        writeFileSync(resolve(routeDir, 'index.html'), html, 'utf-8')
      }
    },
  }
}

export default defineConfig({
  base: resolveBasePath(),
  plugins: [react(), githubPagesMultiRoutePlugin()],
})
