# Udruga "Nogometne lige i turniri" – Križevci (Web stranica)

Moderna, responzivna i pristupačna multi-page web stranica za sportsku udrugu **"Nogometne lige i turniri"** s područja Križevaca i Prigorja, izrađena u **React 19 + TypeScript + Vite** tehnologiji i u potpunosti pripremljena za besplatnu objavu na **GitHub Pages**, **Netlify**, **Vercel** ili **Cloudflare Pages**.

## Što sve stranica sadrži?

1. **Početna (`/`)** – Atraktivni hero prikaz s ključnim brojkama udruge, najavom idućih utakmica i roka za prijave, istaknutim natjecanjima, brzim pregledom ljestvice i rezultata, vrijednostima udruge, najnovijim vijestima i partnerima.
2. **O udruzi (`/o-udruzi`)** – Priča i misija udruge, službeni podaci (OIB, IBAN, Registar udruga), vremenska crta razvoja, uprava/vodstvo udruge, pregled dvorana i terena u Križevcima te sekcija **Dokumenti, statut i propozicije** s brzim pregledom i preuzimanjem predložaka.
3. **Lige i turniri (`/natjecanja` i `/natjecanja/:slug`)** – Filtriranje po vrsti i statusu prijava, pretraživanje, cjelogodišnji kalendar te posebne podstranice za svako natjecanje (nagradni fond, sustav igre, popunjenost ekipa, izvadak iz pravila i povezane utakmice).
4. **Raspored i tablice (`/raspored-i-tablice`)** – Interaktivne tablice aktivnih liga s formom ekipa, raspored nadolazećih kola, odigrani rezultati s modalnim **zapisnicima utakmica** (strijelci, kartoni, igrač utakmice), lista najboljih strijelaca i projekcija Final Four završnice.
5. **Vijesti (`/vijesti` i `/vijesti/:slug`)** – Filtriranje obavijesti po kategorijama i čitanje pojedinačnih članaka/izvještaja.
6. **Foto galerija (`/galerija`)** – Kategorizirana galerija s lightbox preglednikom i tipkovničkom navigacijom.
7. **Online prijava i kontakt (`/prijava-i-kontakt`)** – Pristupačni obrazac za online prijavu ekipe (s automatskim generiranjem evidencijskog broja, uputa za uplatu kotizacije na IBAN i slanjem e-mail prijavnice), opći kontakt obrazac za sponzore/članove te česta pitanja (FAQ).

---

## Kako naknadno unijeti prave podatke i slike?

Svi tekstovi i podaci izdvojeni su na **jedno centralno mjesto** kako ne biste morali tražiti tekstove po komponentama:

- **Podaci udruge, natjecanja, tablice, utakmice, strijelci, vijesti, dokumenti i FAQ:**
  Uredite datoteku [`src/data/siteData.ts`](./src/data/siteData.ts).
- **Fotografije:**
  Spremite svoje fotografije u mapu `public/images/` (možete prepisati postojeće nazive slika ili dodati nove i upisati njihov naziv u `src/data/siteData.ts`).
- **Službeni PDF dokumenti (Statut, Pravilnik, Prijavnica):**
  Možete ih staviti u `public/docs/` i povezati u sekciji dokumenata.

---

## Lokalno pokretanje na računalu

```bash
# Instalacija paketa (ako već nisu instalirani)
npm install

# Pokretanje razvojnog servera
npm run dev

# Provjera koda i izrada produkcijske verzije (u mapu dist/)
npm run lint
npm run build
npm run preview
```

---

## Objava na GitHub Pages (automatski u 3 koraka)

Projekt već sadrži gotov GitHub Actions workflow (`.github/workflows/deploy.yml`), automatsko prepoznavanje naziva repozitorija u `vite.config.ts` te generiranje statičkih `index.html` ruta i `.nojekyll` datoteke:

1. Kreirajte novi repozitorij na GitHubu i pošaljite kod:
   ```bash
   git init
   git add .
   git commit -m "Inicijalna verzija stranice Nogometne lige i turniri Krizevci"
   git branch -M main
   git remote add origin https://github.com/<vase-korisnicko-ime>/<ime-repozitorija>.git
   git push -u origin main
   ```
2. Na GitHubu otvorite svoj repozitorij → **Settings** → **Pages**.
3. Pod **Build and deployment → Source** odaberite **GitHub Actions**.
   Stranica će se automatski izgraditi i objaviti unutar ~1 minute pri svakom novom `git push` slanju!

*(Ako kasnije povežete vlastitu domenu poput `www.nlt-krizevci.hr`, samo dodajte datoteku `public/CNAME` s nazivom domene i bazna putanja automatski prelazi na `/`.)*
