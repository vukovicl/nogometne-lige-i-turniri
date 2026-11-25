# Udruga „Nogometne lige i turniri” (Football Leagues and Tournaments)

Moderna, responzivna i pristupačna multi-page web stranica za sportsku udrugu **Nogometne lige i turniri** (*Football Leagues and Tournaments*), izrađena u **React 19 + TypeScript + Vite** tehnologiji i spremna za objavu na **GitHub Pages**, **Netlify**, **Vercel** ili **Cloudflare Pages**.

## Osnovni podaci uključeni na stranici

- **Puni naziv:** Nogometne lige i turniri (*Football Leagues and Tournaments*)
- **Sjedište:** Gračina 80, Gračina, Koprivničko-križevačka županija
- **Osnivačka skupština / Upis u Registar udruga RH:** 23. ožujka 2026. / 20. travnja 2026. (Reg. br. `06001657`, OIB `27201167728`)
- **Voditelji udruge:** Alen Miholić i Matija Vuković
- **E-pošta:** `nogometneligeiturniri@gmail.com`
- **Područje djelovanja:** Republika Hrvatska (organizacija liga i turnira, razvoj amaterskog sporta, povezivanje sportskih organizacija, uključivanje mladih i promicanje fair playa) uz očuvanu povijesnu arhivu i rezultate održanih sezona lige *Dobrosusjedski odnosi* (2015., 2016., 2026.).

## Gdje uređivati podatke i fotografije?

- **Svi podaci, tablice, nagrade, priča o udruzi i novosti:** [`src/data/siteData.ts`](./src/data/siteData.ts)
- **Fotografije:** `public/images/`

## Lokalno pokretanje i build

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Objava na GitHub Pages

1. Pošaljite repozitorij na GitHub (`main` grana).
2. Na GitHubu otvorite **Settings → Pages → Build and deployment → Source** i odaberite **GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` automatski će izgraditi i objaviti sve rute stranice.
