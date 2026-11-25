import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Automatsko određivanje bazne putanje:
 * - Ako postoji `VITE_BASE_PATH`, koristi ga.
 * - Na GitHub Actions (ako ne postoji `public/CNAME` i repozitorij nije `<user>.github.io`),
 *   automatski postavlja `/<ime-repozitorija>/` za GitHub Pages.
 * - Lokalno, na Netlifyju, Vercelu, Cloudflare Pagesu ili vlastitoj domeni koristi `/`.
 */
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

/**
 * Generira statičke `index.html` datoteke za sve podstranice te `404.html` i `.nojekyll`
 * kako bi svaka ruta na GitHub Pagesu vraćala HTTP 200 OK čak i kod izravnog otvaranja linka.
 */
function githubPagesMultiRoutePlugin(): Plugin {
  const preRenderedRoutes = [
    'o-udruzi',
    'natjecanja',
    'natjecanja/malonogometna-liga-dobrosusjedski-odnosi',
    'natjecanja/zimski-malonogometni-turnir-krizevci',
    'natjecanja/rekreativna-i-veteranska-liga-krizevci',
    'natjecanja/kup-mladih-nada-prigorja',
    'natjecanja/ljetni-nocni-turnir-srce-prigorja',
    'raspored-i-tablice',
    'vijesti',
    'vijesti/allplan-croatia-fermoy-osvojio-malonogometnu-ligu-dobrosusjedski-odnosi',
    'vijesti/otvorene-prijave-za-zimski-malonogometni-turnir-krizevci-kup',
    'vijesti/najava-proljetnog-kupa-mladih-nada-prigorja-2027',
    'vijesti/objavljen-azurirani-pravilnik-i-upute-za-registraciju-igraca',
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
