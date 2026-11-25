/**
 * CENTRALNA DATOTEKA S PODACIMA STRANICE
 * ======================================
 * Udruga "Nogometne lige i turniri" (Football Leagues and Tournaments)
 * Svi podaci o udruzi, voditeljima, natjecanjima, tablicama, priznanjima,
 * arhivi i vijestima nalaze se na ovom mjestu radi lakšeg budućeg uređivanja.
 */

export type CompetitionStatus = 'prijave-u-tijeku' | 'aktivno' | 'u-najavi' | 'zavrseno';
export type CompetitionCategory = 'Turnir' | 'Liga' | 'Mladi' | 'Arhiva';

export interface Competition {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: CompetitionCategory;
  status: CompetitionStatus;
  statusLabel: string;
  season: string;
  dates: string;
  registrationDeadline?: string;
  location: string;
  surface: string;
  format: string;
  matchDuration: string;
  maxTeams?: number;
  registeredTeams?: number;
  entryFee: string;
  prizePool: string;
  prizes: { place: string; reward: string }[];
  image: string;
  featured?: boolean;
  description: string;
  highlights: string[];
  rulesSummary: string[];
}

export interface StandingRow {
  pos: number;
  team: string;
  placeOrigin?: string;
  sofascoreUrl?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: ('P' | 'N' | 'I')[];
  formLinks?: (string | undefined)[];
  zone?: 'champion' | 'playoff' | 'eliminated';
}

export interface LeagueTableGroup {
  id: string;
  competitionSlug: string;
  label: string;
  updatedAt: string;
  roundInfo: string;
  zoneLegend?: string;
  rows: StandingRow[];
}

export interface SeasonAward {
  title: string;
  winner: string;
  teamOrNote?: string;
}

export interface MatchEvent {
  minute: string;
  player: string;
  team: 'home' | 'away';
  type: 'goal' | 'yellow' | 'mvp';
}

export interface MatchItem {
  id: string;
  competitionId: string;
  competitionName: string;
  round: string;
  date: string;
  time?: string;
  venue: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  outcomeBadge?: string;
  status: 'odigrano' | 'arhiva';
  summary?: string;
  sofascoreMatchUrl?: string;
  events?: MatchEvent[];
}

export interface StorySection {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Novosti' | 'Izvještaj' | 'Arhiva' | 'Udruga';
  date: string;
  readTime: string;
  image: string;
  author: string;
  featured?: boolean;
  content: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Lige' | 'Turniri' | 'Mladi' | 'Nagrade';
  event: string;
  date: string;
  image: string;
  caption: string;
}

export interface AssociationDocument {
  id: string;
  title: string;
  category: 'Udruga' | 'Propozicije' | 'Obrasci';
  updated: string;
  fileSize: string;
  summary: string;
  previewText: string[];
}

export const associationInfo = {
  name: 'Nogometne lige i turniri',
  englishName: 'Football Leagues and Tournaments',
  fullName: 'Nogometne lige i turniri',
  shortName: 'NLT',
  city: 'Gračina',
  scopeRegion: 'Republika Hrvatska • Organizacija liga i turnira',
  foundingAssemblyDate: '23. ožujka 2026.',
  registryDate: '20. travnja 2026.',
  tagline: 'Organizacija nogometnih i malonogometnih liga, turnira i sportske rekreacije u Hrvatskoj',
  heroLead:
    'Promičemo nogomet, mali nogomet i sportsku rekreaciju kroz suvremenu organizaciju liga i turnira, povezivanje sportskih sredina, uključivanje mladih i čuvanje vrijedne sportske arhive – s vizijom razvoja natjecanja diljem Hrvatske.',
  address: 'Gračina 80, Gračina, Koprivničko-križevačka županija',
  email: 'nogometneligeiturniri@gmail.com',
  registrationEmail: 'nogometneligeiturniri@gmail.com',
  phone: '', // Dodajte broj telefona po želji
  iban: '', // Dodajte IBAN udruge po otvaranju ili potrebi
  oib: '27201167728',
  registryNo: '06001657',
  workingHours: 'Upiti i prijave putem službene e-pošte i online obrasca',
  socials: {
    sofascore: 'https://www.sofascore.com/hr/minifootball',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  registryFacts: [
    { label: 'Puni naziv', value: 'Nogometne lige i turniri' },
    { label: 'Naziv na engleskom', value: 'Football Leagues and Tournaments' },
    { label: 'Sjedište', value: 'Gračina 80, Gračina, Koprivničko-križevačka županija' },
    { label: 'Osnivačka skupština', value: '23. ožujka 2026.' },
    { label: 'Upis u Registar udruga RH', value: '20. travnja 2026.' },
    { label: 'Registarski broj', value: '06001657' },
    { label: 'OIB', value: '27201167728' },
    { label: 'E-pošta', value: 'nogometneligeiturniri@gmail.com' },
  ],
  registeredActivities: [
    'Promicanje sporta, s posebnim naglaskom na nogomet i mali nogomet',
    'Poticanje redovite sportske rekreacije građana svih generacija',
    'Organizacija malonogometnih i nogometnih liga, kupova i turnira diljem Hrvatske',
    'Razvoj amaterskog sporta i povezivanje sportskih organizacija i klubova',
    'Uključivanje djece i mladih u sport te sustavno promicanje fair playa',
  ],
  stats: [
    { value: '2026.', label: 'Registrirana udruga', detail: 'Upis u Registar udruga RH 20. travnja 2026.' },
    { value: '12', label: 'Ekipa u sezoni 2026.', detail: 'Povratnička sezona lige Dobrosusjedski odnosi' },
    { value: '24', label: 'Momčadi u arhivi 2015.', detail: '336 igrača u lokalnom izboru za selekciju' },
    { value: 'HR', label: 'Otvoreno za cijelu Hrvatsku', detail: 'Povezivanje liga, turnira i sportskih sredina' },
  ],
  values: [
    {
      title: 'Organizacija natjecanja diljem Hrvatske',
      description:
        'Gradimo model organizacije nogometnih i malonogometnih liga te turnira koji je prenosiv i otvoren sportskim sredinama, gradovima i rekreativcima u cijeloj Hrvatskoj.',
    },
    {
      title: 'Digitalna evidencija i javna arhiva',
      description:
        'Od unosa i uređivanja podataka o utakmicama na Sofascoreu do čuvanja povijesnih kola, strijelaca i fair-play dobitnika kako trud ekipa ne bi pao u zaborav.',
    },
    {
      title: 'Povezivanje sportskih organizacija',
      description:
        'Povezujemo amaterske momčadi, lokalne udruge, škole nogometa i rekreativne lige kroz zajedničke standarde natjecanja, kup susrete i razmjenu iskustava.',
    },
    {
      title: 'Mladi i kultura fair playa',
      description:
        'Posebno potičemo uključivanje mladih u sport te nagrađujemo korektnost na terenu – jer sportski odnos i poštovanje suparnika vrijede jednako kao i bodovi.',
    },
  ],
  boardMembers: [
    {
      role: 'Voditelj udruge i organizator natjecanja',
      name: 'Alen Miholić',
      bio: 'Dugogodišnji organizator malonogometnih natjecanja i pokretač dokumentiranih izdanja lige „Dobrosusjedski odnosi” još sredinom prošlog desetljeća. U lipnju 2021. bio je i među utemeljiteljima kluba FC Croatia Fermoy u Irskoj, koji je osvojio Leisure League u Corku sa svih 14 pobjeda i maksimalna 42 boda.',
      contact: 'nogometneligeiturniri@gmail.com',
    },
    {
      role: 'Voditelj udruge i koordinator natjecanja',
      name: 'Matija Vuković',
      bio: 'Voditelj udruge „Nogometne lige i turniri” uključen u organizacijsko oživljavanje ligaških natjecanja 2026. godine, koordinaciju momčadi, praćenje rezultata i razvoj novih turnirskih i ligaških projekata na nacionalnoj razini.',
      contact: 'nogometneligeiturniri@gmail.com',
    },
  ],
  storySections: [
    {
      id: 'udruga-gracina',
      eyebrow: 'O udruzi (2026.)',
      title: 'Udruga iz Gračine posvećena nogometu i malom nogometu diljem Hrvatske',
      paragraphs: [
        'Nogometne lige i turniri (eng. Football Leagues and Tournaments) sportska je udruga sa sjedištem u Gračini 80, na križevačkom području. Osnivačka skupština održana je 23. ožujka 2026., a udruga je 20. travnja 2026. upisana u Registar udruga Republike Hrvatske pod registarskim brojem 06001657. Njezin je temeljni cilj promicati sport – posebno nogomet i mali nogomet – te poticati sportsku rekreaciju na razini cijele Hrvatske.',
        'Među upisanim djelatnostima udruge su organizacija natjecanja i turnira, razvoj amaterskog sporta, povezivanje sportskih organizacija, uključivanje mladih u sport i promicanje fair playa. Iako je prvo veliko natjecanje pod okriljem novoosnovane udruge održano u Križevcima, udruga djeluje kao otvorena platforma za organizaciju i podršku turnirima te ligama u svim krajevima Hrvatske.',
        'Uz ime udruge danas se veže malonogometna liga Dobrosusjedski odnosi Križevci, za koju je u sezoni 2026. udruga unosila i uređivala podatke o utakmicama, rasporedima i rezultatima na platformi Sofascore. Pritom povijest samog natjecanja treba razlikovati od povijesti današnje udruge: utakmice, strijelci i poredak Dobrosusjedskih odnosa bilježeni su još sredinom prošlog desetljeća, najmanje od dokumentirane sezone 2015. godine.',
      ],
    },
    {
      id: 'sezona-2015',
      eyebrow: 'Dokumentirana sezona 2015.',
      title: 'Liga koja je u proljeće 2015. okupila 24 momčadi',
      paragraphs: [
        'U proljeće 2015. godine mininogometna liga Dobrosusjedski odnosi okupljala je čak 24 momčadi, uz redovito vođenje rezultata, strijelaca, sudaca i ligaškog poretka, dok je glavni organizator natjecanja bio Alen Miholić. Među momčadima iz tadašnjih zapisa nalaze se Kalnički sir, Templars, Majurec, Kockice, Gračina, Ruševac 2015 i Šumarija Križevačko pivo.',
        'Vrijedan presjek te sezone daje sedmo kolo, odigrano od 8. do 10. svibnja 2015. godine: Majurec je svladao Templarse rezultatom 3:1, dok je Ruševac 2015 nadigrao Šumariju Križevačko pivo sa 6:2. Za Ruševac su po dva pogotka postigli Matija Ištvanović i Matija Kuća, a po jednom su se u strijelce upisali Luka i Dejan Ištvanović. Takvi zapisi uz same rezultate trajno čuvaju imena ljudi i ekipa koji su gradili natjecanje.',
      ],
    },
    {
      id: 'reprezentacija-2015',
      eyebrow: 'Vrsar i Ivanić-Grad 2015.',
      title: 'Od ligaških igrališta do popisa hrvatske mininogometne reprezentacije',
      paragraphs: [
        'Sezona 2015. bila je i polazište za lokalni izbor igrača koji su dobili priliku boriti se za mjesto u hrvatskoj mininogometnoj reprezentaciji. U lokalnom izboru kandidata sudjelovalo je 336 igrača, a glasovali su voditelji svih 24 momčadi i organizatori natjecanja kako bi desetorica s najviše glasova otišla na reprezentativnu selekciju u Ivanić-Gradu.',
        'U rujnu iste godine, na konačnom popisu hrvatske reprezentacije za Europsko prvenstvo u Vrsaru (održano od 21. do 27. rujna 2015.), našla su se trojica igrača s križevačkog područja: Aleksandar Korenika, Stjepan Korenika i Antonio Picig – izniman trenutak u kojem su se imena s lokalnih terena našla na europskoj smotri.',
      ],
    },
    {
      id: 'kup-i-2016',
      eyebrow: 'Županijski kup i ljeto 2016.',
      title: 'Caffe bar Bonus u Županijskom kupu te sezona 2016. s dvije jakosne lige',
      paragraphs: [
        'Pobjednik Dobrosusjedskih odnosa dobio je priliku odmjeriti snage i s predstavnikom koprivničkog mininogometa: 19. ožujka 2016. u susretu za Županijski mininogometni kup sastali su se Petgrad/OPG Radiček (prvak šeste sezone koprivničke KC lige) i Caffe bar Bonus (pobjednik lige Dobrosusjedski odnosi). Koprivnički sastav slavio je u tom kup-ogledu rezultatom 2:0 pogocima Galinca i Jagića.',
        'Već u ljeto 2016. Dobrosusjedski odnosi okupili su 17 momčadi podijeljenih u dvije jakosne skupine – devet u prvoj i osam u drugoj ligi – uz jednokružni sustav bez naknadnog doigravanja. Igralo se na igralištima kod Srednje škole „Ivan Seljanec” i Gimnazije Ivana Zakmardija Dijankovečkoga u Križevcima te kod Osnovne škole Kalnik.',
        'U trećem kolu, odigranom 2. srpnja 2016. kod SŠ „Ivan Seljanec”, susret između ekipa Križevci.info Raven i Gornji Cubinec završio je 3:3, a Matija Španić preuzeo je vrh ljestvice strijelaca prve lige. U drugoj su ligi Križevački štatuti svladali Caffe bar King 4:0, Muharić prijevoz bio je bolji od Gračina Boysa 5:2, a Sveti Benedikt pobijedio je Elektromaterijal F. T. P. Tomac rezultatom 3:1.',
      ],
    },
    {
      id: 'povratak-2026-i-fermoy',
      eyebrow: 'Sezona 2026. i irska poveznica',
      title: 'Povratak nakon deset godina stanke i priča iza imena Croatia Fermoy',
      paragraphs: [
        'Nakon desetogodišnje stanke, liga Dobrosusjedski odnosi vratila se u svibnju 2026. godine (sezona na Sofascoreu vođena je od 8. svibnja do završnog kola 25. rujna 2026.) pod pokroviteljstvom Grada Križevaca te uz podršku sponzora i partnera. Dvanaest momčadi odigralo je 11 uzbudljivih kola, a uoči posljednje večeri čak su četiri ekipe još bile u konkurenciji za naslov prvaka. Konačni pobjednik postao je Allplan Croatia Fermoy, ispred MNK Buldožera i MNK Sv. Vid Vrbovca.',
        'Ime prvaka povratničke sezone nosi i zanimljivu međunarodnu nogometnu poveznicu: u lipnju 2021. Alen Miholić bio je među utemeljiteljima kluba FC Croatia Fermoy u Irskoj. Taj je klub u Corku osvojio rekreacijsku Leisure League u konkurenciji osam klubova, ostvarivši svih 14 pobjeda i maksimalna 42 boda – zaseban sportski uspjeh iz irskog natjecanja na koji simbolično podsjeća ime križevačkog prvaka iz 2026., ekipe Allplan Croatia Fermoy.',
        'Upravo kontinuitet – poput ekipe Templars koja se pojavljuje u zapisima iz svibnja 2015., a 2026. osvaja priznanje za fair play zajedno s ekipom Izvan forme – pokazuje zašto vrijedi sustavno čuvati arhivu tablica, pojedinih kola, sastava, strijelaca i fotografija svih naših budućih natjecanja u Hrvatskoj.',
      ],
    },
  ] as StorySection[],
  timeline: [
    {
      year: 'Proljeće – Rujan 2015.',
      title: 'Dokumentirana sezona s 24 momčadi i trojica igrača na EP-u u Vrsaru',
      text: 'U ligi nastupa 24 ekipa uz lokalni izbor među 336 igrača za reprezentativnu selekciju u Ivanić-Gradu, a Aleksandar Korenika, Stjepan Korenika i Antonio Picig ulaze na popis za EP u Vrsaru.',
    },
    {
      year: 'Ožujak – Srpanj 2016.',
      title: 'Županijski kup i sezona sa 17 ekipa u dvije jakosne skupine',
      text: 'Caffe bar Bonus predstavlja ligu u Županijskom mininogometnom kupu, a ljetna sezona igra se u dvije lige (9 + 8 momčadi) u Križevcima i na Kalniku.',
    },
    {
      year: 'Lipanj 2021.',
      title: 'Irska nogometna priča: FC Croatia Fermoy u Corku',
      text: 'Alen Miholić sudjeluje u osnivanju kluba FC Croatia Fermoy u Irskoj, koji osvaja Leisure League u Corku s maksimalnim učinkom od 14 pobjeda i 42 boda.',
    },
    {
      year: '23.03. i 20.04.2026.',
      title: 'Osnivanje i upis Udruge „Nogometne lige i turniri” u Registar udruga RH',
      text: 'Sa sjedištem u Gračini 80 osniva se udruga (Football Leagues and Tournaments) usmjerena na organizaciju nogometnih i malonogometnih natjecanja, razvoj amaterskog sporta i uključivanje mladih.',
    },
    {
      year: 'Svibanj – 25.09.2026.',
      title: 'Povratnička sezona lige „Dobrosusjedski odnosi” i naslov Allplan Croatia Fermoya',
      text: 'Dvanaest momčadi odigrava 11 kola uz digitalnu evidenciju udruge na Sofascoreu; naslov osvaja Allplan Croatia Fermoy ispred MNK Buldožera i MNK Sv. Vid Vrbovca.',
    },
  ],
  venues: [
    {
      name: 'Partnerski tereni i dvorane diljem Hrvatske',
      type: 'Nacionalna mreža u razvoju',
      address: 'Otvoreno za gradove, općine, klubove i rekreativne centre u RH',
      features: 'Suradnja s lokalnim samoupravama i sportskim centrima na organizaciji turnira, kupova i rekreativnih liga.',
    },
    {
      name: 'Igrališta Gimnazije I. Z. Dijankovečkoga i SŠ „Ivan Seljanec”',
      type: 'Dosadašnje lokacije lige u Križevcima',
      address: 'Križevci',
      features: 'Vanjska školska igrališta na kojima su igrane dokumentirane sezone 2015., 2016. i povratnička sezona 2026. pod reflektorima.',
    },
    {
      name: 'Igralište kod Osnovne škole Kalnik',
      type: 'Povijesna lokacija iz arhive lige (2016.)',
      address: 'Kalnik',
      features: 'Jedna od lokacija ljetne sezone 2016. u kojoj se natjecalo 17 momčadi podijeljenih u dvije jakosne skupine.',
    },
  ],
  partners: [
    { name: 'Sportski klubovi i udruge u RH', tier: 'Povezivanje sportskih organizacija' },
    { name: 'Gradovi i lokalne zajednice', tier: 'Institucionalni pokrovitelji natjecanja' },
    { name: 'Sofascore Minifootball', tier: 'Digitalni prikaz rasporeda i rezultata' },
    { name: 'Grad Križevci', tier: 'Pokrovitelj sezone Dobrosusjedski odnosi 2026.' },
    { name: 'Sponzori ekipa i obrtnici', tier: 'Podrška amaterskom sportu' },
    { name: 'Škole nogometa i pedagozi', tier: 'Programi za djecu i mlade' },
  ],
};

export const season2026Awards: SeasonAward[] = [
  { title: 'Prvak lige', winner: 'Allplan Croatia Fermoy', teamOrNote: '1. mjesto nakon 11 kola' },
  { title: 'Drugo mjesto', winner: 'MNK Buldožeri', teamOrNote: 'Doprvak sezone 2026.' },
  { title: 'Treće mjesto', winner: 'MNK Sv. Vid Vrbovec', teamOrNote: '3. mjesto sezone 2026.' },
  { title: 'Najbolji igrač', winner: 'Ivan Slavi', teamOrNote: 'MNK Buldožeri' },
  { title: 'Najbolji vratar', winner: 'Jakov Car', teamOrNote: 'Allplan Croatia Fermoy' },
  { title: 'Najbolji strijelac', winner: 'Martin Horvat', teamOrNote: 'Tehnodiv Servis' },
  { title: 'Fair play priznanje', winner: 'Templars i Izvan forme', teamOrNote: 'Nagrada za korektnost i sportski duh' },
];

export const competitions: Competition[] = [
  {
    id: 'dobrosusjedski-odnosi-2026',
    slug: 'malonogometna-liga-dobrosusjedski-odnosi',
    title: 'Malonogometna liga „Dobrosusjedski odnosi” Križevci (2026.)',
    shortTitle: 'Dobrosusjedski odnosi 2026.',
    subtitle: 'Povratnička sezona nakon deset godina stanke s 12 momčadi i dramatičnom završnicom',
    category: 'Liga',
    status: 'zavrseno',
    statusLabel: 'Završeno • Prvak: Allplan Croatia Fermoy',
    season: 'Sezona 2026.',
    dates: '08. svibnja – 25. rujna 2026. (11 kola)',
    location: 'Križevci (pod pokroviteljstvom Grada Križevaca)',
    surface: 'Vanjsko igralište pod reflektorima',
    format: '12 momčadi • jednokružni ligaški sustav (11 kola)',
    matchDuration: 'Večernji termini • vođenje rezultata na Sofascoreu',
    maxTeams: 12,
    registeredTeams: 12,
    entryFee: 'Sezonska kotizacija',
    prizePool: 'Pehari, medalje te pojedinačna i fair play priznanja',
    prizes: [
      { place: 'Prvak lige', reward: 'Allplan Croatia Fermoy' },
      { place: 'Drugo mjesto', reward: 'MNK Buldožeri' },
      { place: 'Treće mjesto', reward: 'MNK Sv. Vid Vrbovec' },
      { place: 'Pojedinačna priznanja', reward: 'Ivan Slavi (igrač), Jakov Car (vratar), Martin Horvat (strijelac)' },
      { place: 'Fair play', reward: 'Templars i Izvan forme' },
    ],
    image: 'images/summer-league-turf.jpg',
    featured: true,
    description:
      'Povratnička sezona kultne križevačke malonogometne lige okupila je u proljeće i ljeto 2026. godine 12 ekipa. Udruga Nogometne lige i turniri pod svojim je imenom unosila i uređivala podatke o susretima na Sofascoreu, a uoči posljednjeg 11. kola održanog 25. rujna čak su četiri momčadi bile u igri za naslov prvaka.',
    highlights: [
      'Četiri ekipe u izravnoj utrci za naslov prvaka sve do posljednjeg kola 25. rujna 2026.',
      'Najbolji igrač Ivan Slavi (MNK Buldožeri), najbolji vratar Jakov Car (Allplan Croatia Fermoy), najbolji strijelac Martin Horvat (Tehnodiv Servis)',
      'Fair play priznanje pripalo ekipama Templars i Izvan forme',
      'Javno dostupni rasporedi, rezultati i profili momčadi na Sofascoreu',
    ],
    rulesSummary: [
      'Jednokružni ligaški sustav kroz 11 kola u konkurenciji 12 prijavljenih momčadi.',
      'Pobjeda donosi 3 boda, neriješen ishod 1 bod, a poraz 0 bodova.',
      'Natjecanje je održano uz podršku sponzora, partnera i pokroviteljstvo Grada Križevaca.',
    ],
  },
  {
    id: 'nacionalne-rekreativne-lige',
    slug: 'organizacija-rekreativnih-liga-hrvatska',
    title: 'Partnerske i rekreativne malonogometne lige u Hrvatskoj',
    shortTitle: 'Rekreativne lige u RH',
    subtitle: 'Pokretanje i organizacijska podrška malonogometnim ligama u gradovima i općinama diljem Hrvatske',
    category: 'Liga',
    status: 'prijave-u-tijeku',
    statusLabel: 'Otvoreno za prijave i suradnju',
    season: 'Sezona 2026./2027.',
    dates: 'Cjelogodišnji program suradnje i prijava',
    location: 'Republika Hrvatska (gradovi i sportske sredine partneri)',
    surface: 'Vanjski tereni s umjetnom/prirodnom travom i sportske dvorane',
    format: 'Prilagodljiv ligaški sustav (jednokružno / dvokružno / skupine)',
    matchDuration: 'Sukladno propozicijama pojedine lige',
    entryFee: 'Prema propozicijama natjecanja',
    prizePool: 'Pehari, medalje, službena statistika i završni kup prvaka',
    prizes: [
      { place: 'Ekipne nagrade', reward: 'Pehari i medalje za najbolje tri momčadi svake lige' },
      { place: 'Pojedinačne nagrade', reward: 'Najbolji igrač, najbolji strijelac, najbolji vratar i Fair play ekipa' },
    ],
    image: 'images/hero-night-tournament.jpg',
    featured: true,
    description:
      'Sukladno ciljevima udruge – razvoju amaterskog sporta i povezivanju sportskih organizacija – nudimo cjelovitu organizacijsku, pravilničku i digitalnu podršku za pokretanje ili unaprjeđenje rekreativnih malonogometnih liga u novim sredinama diljem Hrvatske.',
    highlights: [
      'Izrada propozicija, kalendara natjecanja i delegiranja utakmica',
      'Digitalno vođenje rezultata, tablica i arhive strijelaca po uzoru na dokazani model',
      'Povezivanje pobjednika lokalnih liga kroz međuregionalne i kup susrete',
    ],
    rulesSummary: [
      'Mogućnost prijave pojedinačnih momčadi ili lokalnih koordinatora koji žele pokrenuti ligu u svom mjestu.',
      'Naglasak na fair playu, sigurnosti sudionika i potpunoj transparentnosti rezultata.',
    ],
  },
  {
    id: 'otvoreni-malonogometni-turniri',
    slug: 'malonogometni-kupovi-i-turniri',
    title: 'Otvoreni malonogometni turniri i kup natjecanja',
    shortTitle: 'Turniri i kupovi',
    subtitle: 'Dvoranski i vanjski turniri za seniorske, kvartovske i korporativne ekipe',
    category: 'Turnir',
    status: 'u-najavi',
    statusLabel: 'Novi termini u pripremi',
    season: '2026./2027.',
    dates: 'Najava termina u rubrici Novosti',
    location: 'Sportske dvorane i vanjski tereni u Hrvatskoj',
    surface: 'Parket / umjetna trava / podloga s mantinelom',
    format: '5+1 ili 3v3 (skupine + eliminacijska završnica)',
    matchDuration: '2 × 15 min (ili prema formatu turnira)',
    entryFee: 'Objavljuje se uz raspis svakog turnira',
    prizePool: 'Nagradni fond, pehari i pojedinačna priznanja',
    prizes: [
      { place: '1. – 3. mjesto', reward: 'Pehari, medalje i nagradni fond turnira' },
      { place: 'Najbolji pojedinci', reward: 'Najbolji igrač, strijelac, vratar i Fair play trofej' },
    ],
    image: 'images/winter-futsal-cup.jpg',
    featured: true,
    description:
      'Višednevni i vikend malonogometni turniri osmišljeni za okupljanje amaterskih i rekreativnih ekipa iz različitih županija, uz zajamčen minimalni broj utakmica u skupini i atraktivnu nokaut završnicu.',
    highlights: [
      'Jasne propozicije, točna satnica i licencirano suđenje',
      'Praćenje rezultata i objava fotografija te izvještaja na stranici udruge',
      'Otvoreno za prijavu ekipa iz cijele Hrvatske',
    ],
    rulesSummary: [
      'Svaki turnir ima poseban raspis s navedenim rokom prijava, brojem igrača i pravilima igre.',
      'Igrač unutar iste kategorije turnira može nastupati za jednu momčad.',
    ],
  },
  {
    id: 'programi-i-turniri-za-mlade',
    slug: 'turniri-za-djecu-i-mlade',
    title: 'Turniri i sportski susreti za djecu i mlade',
    shortTitle: 'Turniri za mlade',
    subtitle: 'Uključivanje djece i mladih u nogomet kroz druženje, igru i učenje fair playa',
    category: 'Mladi',
    status: 'u-najavi',
    statusLabel: 'Program udruge u pripremi',
    season: '2027.',
    dates: 'Proljetni i ljetni termini',
    location: 'Partnerski tereni i škole nogometa u Hrvatskoj',
    surface: 'Prirodna i umjetna trava',
    format: 'Uzrasne kategorije U-9, U-11, U-13 i U-15',
    matchDuration: 'Prilagođeno dobnim skupinama uz leteće izmjene',
    entryFee: 'Pristupačni uvjeti za škole nogometa i mlade ekipe',
    prizePool: 'Pehari za najbolje i medalje uspomene za sudionike',
    prizes: [
      { place: 'Najuspješnije ekipe', reward: 'Pehari, medalje i priznanja za sportsko ponašanje' },
      { place: 'Sudionici', reward: 'Poticanje jednakih prilika za igru i timskog duha' },
    ],
    image: 'images/youth-cup-kids.jpg',
    description:
      'Uključivanje mladih u sport jedna je od temeljnih statutarnih djelatnosti udruge Nogometne lige i turniri. Cilj nam je u suradnji sa školama nogometa, klubovima i obrazovnim ustanovama organizirati razvojne turnire bez rezultatskog pritiska.',
    highlights: [
      'Naglasak na ravnomjernoj minutaži, zdravlju i fair playu od najranije dobi',
      'Povezivanje škola nogometa iz različitih regija Hrvatske',
      'Sigurno i poticajno okruženje za mlade sportaše i roditelje',
    ],
    rulesSummary: [
      'Obvezna suglasnost roditelja/skrbnika i valjana evidencija godišta igrača.',
      'Pravila prilagođena uzrastu uz maksimalno poticanje pozitivnog navijanja uz teren.',
    ],
  },
  {
    id: 'arhiva-dobrosusjedski-2015-2016',
    slug: 'arhiva-dobrosusjedski-odnosi-2015-2016',
    title: 'Povijesna arhiva lige „Dobrosusjedski odnosi” (2015. – 2016.)',
    shortTitle: 'Arhiva 2015. – 2016.',
    subtitle: 'Dokumentirane sezone s 24 i 17 momčadi, reprezentativci u Vrsaru i Županijski kup',
    category: 'Arhiva',
    status: 'zavrseno',
    statusLabel: 'Povijesna arhiva natjecanja',
    season: 'Dokumentirane sezone 2015. i 2016.',
    dates: 'Proljeće 2015. • Ožujak 2016. • Ljeto 2016.',
    location: 'Križevci (SŠ Ivan Seljanec, Gimnazija), Kalnik i Koprivnica',
    surface: 'Vanjska školska i sportska igrališta',
    format: '2015.: 24 momčadi | 2016.: 17 momčadi u dvije jakosne skupine (9 + 8)',
    matchDuration: 'Jednokružni ligaški sustav u sezoni 2016.',
    entryFee: 'Arhivsko izdanje',
    prizePool: 'Povijesni zapisi, kup prvaka i reprezentativna selekcija',
    prizes: [
      { place: 'Sezona 2015. – Reprezentacija', reward: 'Aleksandar Korenika, Stjepan Korenika i Antonio Picig na popisu za EP u Vrsaru' },
      { place: 'Županijski kup (19.03.2016.)', reward: 'Caffe bar Bonus kao pobjednik lige u susretu protiv Petgrad/OPG Radiček (0:2)' },
      { place: 'Sezona 2016. (1. i 2. liga)', reward: '17 ekipa na terenima u Križevcima i kod OŠ Kalnik' },
    ],
    image: 'images/veterans-fairplay.jpg',
    description:
      'Prije osnivanja današnje udruge 2026. godine, malonogometna liga Dobrosusjedski odnosi dokumentirana je najmanje od 2015. godine pod organizacijskim vodstvom Alena Miholića. Ova rubrika čuva provjerene povijesne podatke o momčadima, kolima i igračima.',
    highlights: [
      'Proljeće 2015.: 24 momčadi i 336 igrača u lokalnom izboru za selekciju u Ivanić-Gradu',
      '7. kolo (8.–10.05.2015.): Majurec – Templars 3:1; Ruševac 2015 – Šumarija Križevačko pivo 6:2',
      '3. kolo (02.07.2016.): Križevci.info Raven – Gornji Cubinec 3:3; Križevački štatuti – CB King 4:0; Muharić prijevoz – Gračina Boys 5:2; Sv. Benedikt – Elektromaterijal F.T.P. Tomac 3:1',
    ],
    rulesSummary: [
      'Godina 2015. navodi se kao dokumentirana sezona natjecanja, a ne nužno kao godina prvog izdanja lige.',
      'U sezoni 2016. igralo se jednokružno u dvije jakosne skupine (9 + 8 ekipa) bez naknadnog doigravanja.',
    ],
  },
];

export const leagueTables: LeagueTableGroup[] = [
  {
    id: 'dobrosusjedski-odnosi-tablica',
    competitionSlug: 'malonogometna-liga-dobrosusjedski-odnosi',
    label: 'Dobrosusjedski odnosi Križevci 2026.',
    updatedAt: 'Završno stanje • 25. rujna 2026.',
    roundInfo: '11 odigranih kola (12 momčadi)',
    zoneLegend:
      'Službeni poredak prve tri momčadi: 1. Allplan Croatia Fermoy, 2. MNK Buldožeri, 3. MNK Sv. Vid Vrbovec. Podaci o utakmicama i poretku vođeni su u sezoni 2026. na platformi Sofascore (kliknite na naziv momčadi ili oznaku forme P/N/I za prikaz detalja susreta).',
    rows: [
      {
        pos: 1,
        team: 'Allplan Croatia Fermoy',
        placeOrigin: 'Prvak lige 2026.',
        sofascoreUrl: 'https://www.sofascore.com/hr/minifootball/team/allplan-croatia-fermoy/1222524',
        played: 11,
        won: 8,
        drawn: 2,
        lost: 1,
        goalsFor: 30,
        goalsAgainst: 8,
        points: 26,
        form: ['P', 'P', 'P', 'P', 'N'],
        formLinks: [
          undefined,
          'https://www.sofascore.com/minifootball/match/allplan-croatia-fermoy-caffe-bar-lampas-and-zlatarna-krizevci/kXNjszaOj#id:16137148',
          'https://www.sofascore.com/minifootball/match/allplan-croatia-fermoy-mnk-buldozeri/jXNjszaOj#id:16137163',
          'https://www.sofascore.com/minifootball/match/allplan-croatia-fermoy-bez-sponzora/iXNjszaOj#id:16137224',
          'https://www.sofascore.com/minifootball/match/allplan-croatia-fermoy-tehnodiv-servis/KXNjszaOj#id:16137276',
        ],
        zone: 'champion',
      },
      {
        pos: 2,
        team: 'Buldožeri',
        placeOrigin: '2. mjesto • MNK Buldožeri',
        sofascoreUrl: 'https://www.sofascore.com/hr/minifootball/team/mnk-buldozeri/1222359',
        played: 11,
        won: 8,
        drawn: 2,
        lost: 1,
        goalsFor: 39,
        goalsAgainst: 7,
        points: 26,
        form: ['P', 'P', 'I', 'P', 'P'],
        formLinks: [
          undefined,
          'https://www.sofascore.com/minifootball/match/izvan-forme-mnk-buldozeri/jXNjsAaOj#id:16137150',
          'https://www.sofascore.com/minifootball/match/allplan-croatia-fermoy-mnk-buldozeri/jXNjszaOj#id:16137163',
          'https://www.sofascore.com/minifootball/match/tehnodiv-servis-mnk-buldozeri/jXNjsKXNj#id:16137228',
          'https://www.sofascore.com/minifootball/match/mnk-fodrovec-mnk-buldozeri/jXNjsNXNj#id:16137282',
        ],
        zone: 'playoff',
      },
      {
        pos: 3,
        team: 'Sveti Vid Vrbovec',
        placeOrigin: '3. mjesto • MNK Sv. Vid Vrbovec',
        sofascoreUrl: 'https://www.sofascore.com/hr/minifootball/team/mnk-sveti-vid-vrbovec/1222389',
        played: 11,
        won: 8,
        drawn: 1,
        lost: 2,
        goalsFor: 30,
        goalsAgainst: 10,
        points: 25,
        form: ['I', 'P', 'P', 'P', 'P'],
        formLinks: [
          undefined,
          'https://www.sofascore.com/minifootball/match/mnk-sveti-vid-vrbovec-tehnodiv-servis/KXNjsOXNj#id:16137153',
          'https://www.sofascore.com/minifootball/match/mnk-sveti-vid-vrbovec-mnk-fodrovec/NXNjsOXNj#id:16137167',
          'https://www.sofascore.com/minifootball/match/mnk-sveti-vid-vrbovec-templars/fXNjsOXNj#id:16137239',
          'https://www.sofascore.com/minifootball/match/mnk-sveti-vid-vrbovec-ocni-centar-visus/JXNjsOXNj#id:16137293',
        ],
        zone: 'playoff',
      },
      {
        pos: 4,
        team: 'MNK Fodrovec',
        sofascoreUrl: 'https://www.sofascore.com/hr/minifootball/team/mnk-fodrovec/1222388',
        played: 11,
        won: 7,
        drawn: 2,
        lost: 2,
        goalsFor: 31,
        goalsAgainst: 12,
        points: 23,
        form: ['P', 'P', 'I', 'P', 'I'],
        formLinks: [
          undefined,
          'https://www.sofascore.com/minifootball/match/mnk-fodrovec-caffe-bar-faraon/hXNjsNXNj#id:16137156',
          'https://www.sofascore.com/minifootball/match/mnk-sveti-vid-vrbovec-mnk-fodrovec/NXNjsOXNj#id:16137167',
          'https://www.sofascore.com/minifootball/match/izvan-forme-mnk-fodrovec/NXNjsAaOj#id:16137232',
          'https://www.sofascore.com/minifootball/match/mnk-fodrovec-mnk-buldozeri/jXNjsNXNj#id:16137282',
        ],
        zone: 'playoff',
      },
      {
        pos: 5,
        team: 'Caffe Bar Faraon',
        sofascoreUrl: 'https://www.sofascore.com/hr/minifootball/team/caffe-bar-faraon/1222357',
        played: 11,
        won: 7,
        drawn: 1,
        lost: 3,
        goalsFor: 21,
        goalsAgainst: 12,
        points: 22,
        form: ['P', 'I', 'P', 'P', 'P'],
        formLinks: [
          undefined,
          'https://www.sofascore.com/minifootball/match/mnk-fodrovec-caffe-bar-faraon/hXNjsNXNj#id:16137156',
          'https://www.sofascore.com/minifootball/match/caffe-bar-faraon-templars/fXNjshXNj#id:16137171',
          'https://www.sofascore.com/minifootball/match/ocni-centar-visus-caffe-bar-faraon/hXNjsJXNj#id:16137235',
          'https://www.sofascore.com/minifootball/match/caffe-bar-lampas-and-zlatarna-krizevci-caffe-bar-faraon/hXNjskXNj#id:16137288',
        ],
      },
      {
        pos: 6,
        team: 'Tehnodiv Servis',
        placeOrigin: 'Najbolji strijelac lige: Martin Horvat',
        sofascoreUrl: 'https://www.sofascore.com/hr/minifootball/team/tehnodiv-servis/1222385',
        played: 11,
        won: 5,
        drawn: 3,
        lost: 3,
        goalsFor: 32,
        goalsAgainst: 18,
        points: 18,
        form: ['I', 'I', 'P', 'I', 'N'],
        formLinks: [
          undefined,
          'https://www.sofascore.com/minifootball/match/mnk-sveti-vid-vrbovec-tehnodiv-servis/KXNjsOXNj#id:16137153',
          'https://www.sofascore.com/minifootball/match/izvan-forme-tehnodiv-servis/KXNjsAaOj#id:16137165',
          'https://www.sofascore.com/minifootball/match/tehnodiv-servis-mnk-buldozeri/jXNjsKXNj#id:16137228',
          'https://www.sofascore.com/minifootball/match/allplan-croatia-fermoy-tehnodiv-servis/KXNjszaOj#id:16137276',
        ],
      },
      {
        pos: 7,
        team: 'Vargić-Agencija',
        sofascoreUrl: 'https://www.sofascore.com/hr/minifootball/team/vargic-agencija/1222361',
        played: 11,
        won: 5,
        drawn: 1,
        lost: 5,
        goalsFor: 22,
        goalsAgainst: 22,
        points: 16,
        form: ['I', 'N', 'P', 'P', 'P'],
        formLinks: [
          undefined,
          'https://www.sofascore.com/minifootball/match/vargic-agencija-templars/fXNjslXNj#id:16137154',
          'https://www.sofascore.com/minifootball/match/ocni-centar-visus-vargic-agencija/lXNjsJXNj#id:16137166',
          'https://www.sofascore.com/minifootball/match/vargic-agencija-caffe-bar-lampas-and-zlatarna-krizevci/kXNjslXNj#id:16137229',
          'https://www.sofascore.com/minifootball/match/vargic-agencija-bez-sponzora/iXNjslXNj#id:16137278',
        ],
      },
      {
        pos: 8,
        team: 'Caffe Bar Lampaš & Zlatarna Križevci',
        sofascoreUrl: 'https://www.sofascore.com/hr/minifootball/team/caffe-bar-lampas-and-zlatarna-krizevci/1222360',
        played: 11,
        won: 4,
        drawn: 3,
        lost: 4,
        goalsFor: 18,
        goalsAgainst: 14,
        points: 15,
        form: ['P', 'I', 'P', 'I', 'I'],
        formLinks: [
          undefined,
          'https://www.sofascore.com/minifootball/match/allplan-croatia-fermoy-caffe-bar-lampas-and-zlatarna-krizevci/kXNjszaOj#id:16137148',
          'https://www.sofascore.com/minifootball/match/caffe-bar-lampas-and-zlatarna-krizevci-bez-sponzora/iXNjskXNj#id:16137164',
          'https://www.sofascore.com/minifootball/match/vargic-agencija-caffe-bar-lampas-and-zlatarna-krizevci/kXNjslXNj#id:16137229',
          'https://www.sofascore.com/minifootball/match/caffe-bar-lampas-and-zlatarna-krizevci-caffe-bar-faraon/hXNjskXNj#id:16137288',
        ],
      },
      {
        pos: 9,
        team: 'Templars',
        placeOrigin: 'Dobitnik priznanja Fair play 2026.',
        sofascoreUrl: 'https://www.sofascore.com/hr/minifootball/team/templars/1222355',
        played: 11,
        won: 2,
        drawn: 2,
        lost: 7,
        goalsFor: 17,
        goalsAgainst: 36,
        points: 8,
        form: ['P', 'N', 'I', 'I', 'P'],
        formLinks: [
          undefined,
          'https://www.sofascore.com/minifootball/match/vargic-agencija-templars/fXNjslXNj#id:16137154',
          'https://www.sofascore.com/minifootball/match/caffe-bar-faraon-templars/fXNjshXNj#id:16137171',
          'https://www.sofascore.com/minifootball/match/mnk-sveti-vid-vrbovec-templars/fXNjsOXNj#id:16137239',
          'https://www.sofascore.com/minifootball/match/izvan-forme-templars/fXNjsAaOj#id:16137291',
        ],
      },
      {
        pos: 10,
        team: 'Očni Centar Visus',
        sofascoreUrl: 'https://www.sofascore.com/hr/minifootball/team/ocni-centar-visus/1222384',
        played: 11,
        won: 2,
        drawn: 1,
        lost: 8,
        goalsFor: 13,
        goalsAgainst: 28,
        points: 7,
        form: ['I', 'P', 'I', 'I', 'I'],
        formLinks: [
          undefined,
          'https://www.sofascore.com/minifootball/match/ocni-centar-visus-bez-sponzora/iXNjsJXNj#id:16949051',
          'https://www.sofascore.com/minifootball/match/ocni-centar-visus-vargic-agencija/lXNjsJXNj#id:16137166',
          'https://www.sofascore.com/minifootball/match/ocni-centar-visus-caffe-bar-faraon/hXNjsJXNj#id:16137235',
          'https://www.sofascore.com/minifootball/match/mnk-sveti-vid-vrbovec-ocni-centar-visus/JXNjsOXNj#id:16137293',
        ],
      },
      {
        pos: 11,
        team: 'Bez Sponzora',
        sofascoreUrl: 'https://www.sofascore.com/hr/minifootball/team/bez-sponzora/1222358',
        played: 11,
        won: 1,
        drawn: 0,
        lost: 10,
        goalsFor: 8,
        goalsAgainst: 29,
        points: 3,
        form: ['I', 'I', 'I', 'I', 'I'],
        formLinks: [
          undefined,
          'https://www.sofascore.com/minifootball/match/ocni-centar-visus-bez-sponzora/iXNjsJXNj#id:16949051',
          'https://www.sofascore.com/minifootball/match/caffe-bar-lampas-and-zlatarna-krizevci-bez-sponzora/iXNjskXNj#id:16137164',
          'https://www.sofascore.com/minifootball/match/allplan-croatia-fermoy-bez-sponzora/iXNjszaOj#id:16137224',
          'https://www.sofascore.com/minifootball/match/vargic-agencija-bez-sponzora/iXNjslXNj#id:16137278',
        ],
      },
      {
        pos: 12,
        team: 'Izvan Forme',
        placeOrigin: 'Dobitnik priznanja Fair play 2026.',
        sofascoreUrl: 'https://www.sofascore.com/hr/minifootball/team/izvan-forme/1222525',
        played: 11,
        won: 0,
        drawn: 0,
        lost: 11,
        goalsFor: 9,
        goalsAgainst: 74,
        points: 0,
        form: ['I', 'I', 'I', 'I', 'I'],
      },
    ],
  },
];

export const matches: MatchItem[] = [
  {
    id: 'm-2026-fin',
    competitionId: 'dobrosusjedski-odnosi-2026',
    competitionName: 'Dobrosusjedski odnosi 2026.',
    round: '11. kolo (posljednja večer sezone)',
    date: '25. rujna 2026.',
    venue: 'Križevci',
    homeTeam: 'Allplan Croatia Fermoy',
    awayTeam: 'Tehnodiv Servis',
    outcomeBadge: 'Remi',
    status: 'odigrano',
    sofascoreMatchUrl:
      'https://www.sofascore.com/minifootball/match/allplan-croatia-fermoy-tehnodiv-servis/KXNjszaOj#id:16137276',
    summary:
      'Susret završne večeri uoči koje su četiri momčadi bile u konkurenciji za naslov. Remijem u posljednjem kolu Allplan Croatia Fermoy potvrdio je prvo mjesto s 26 bodova.',
  },
  {
    id: 'm-2026-derbi',
    competitionId: 'dobrosusjedski-odnosi-2026',
    competitionName: 'Dobrosusjedski odnosi 2026.',
    round: 'Izravni derbi vrha ljestvice',
    date: 'Sezona 2026.',
    venue: 'Križevci',
    homeTeam: 'Allplan Croatia Fermoy',
    awayTeam: 'MNK Buldožeri',
    outcomeBadge: 'Pobjeda domaćih',
    status: 'odigrano',
    sofascoreMatchUrl:
      'https://www.sofascore.com/minifootball/match/allplan-croatia-fermoy-mnk-buldozeri/jXNjszaOj#id:16137163',
    summary:
      'Međusobni dvoboj dviju momčadi koje su sezonu završile na vrhu s po 26 bodova. Pobjeda Allplan Croatia Fermoya donijela je prevagu u konačnom poretku.',
  },
  {
    id: 'm-2016-3k-1',
    competitionId: 'arhiva-dobrosusjedski-2015-2016',
    competitionName: 'Dobrosusjedski odnosi 2016. (1. liga)',
    round: '3. kolo',
    date: '02. srpnja 2016.',
    venue: 'Igralište SŠ „Ivan Seljanec” Križevci',
    homeTeam: 'Križevci.info Raven',
    awayTeam: 'Gornji Cubinec',
    homeScore: 3,
    awayScore: 3,
    status: 'arhiva',
    summary:
      'Podjela bodova u susretu sa šest pogodaka nakon kojeg je Matija Španić držao vrh ljestvice strijelaca prve lige.',
  },
  {
    id: 'm-2016-3k-2',
    competitionId: 'arhiva-dobrosusjedski-2015-2016',
    competitionName: 'Dobrosusjedski odnosi 2016. (2. liga)',
    round: '3. kolo',
    date: '02. srpnja 2016.',
    venue: 'Igralište SŠ „Ivan Seljanec” Križevci',
    homeTeam: 'Muharić prijevoz',
    awayTeam: 'Gračina Boys',
    homeScore: 5,
    awayScore: 2,
    status: 'arhiva',
    summary:
      'Efikasan susret druge jakosne skupine sa sedam pogodaka; istoga dana Križevački štatuti pobijedili su Caffe bar King 4:0, a Sveti Benedikt svladao je Elektromaterijal F. T. P. Tomac 3:1.',
  },
  {
    id: 'm-2016-kup',
    competitionId: 'arhiva-dobrosusjedski-2015-2016',
    competitionName: 'Županijski mininogometni kup',
    round: 'Susret prvaka liga',
    date: '19. ožujka 2016.',
    venue: 'Koprivnica',
    homeTeam: 'Petgrad/OPG Radiček',
    awayTeam: 'Caffe bar Bonus',
    homeScore: 2,
    awayScore: 0,
    status: 'arhiva',
    summary:
      'Ogled prvaka šeste sezone koprivničke KC lige i pobjednika križevačke lige Dobrosusjedski odnosi.',
    events: [
      { minute: '1. pol.', player: 'Galinec', team: 'home', type: 'goal' },
      { minute: '2. pol.', player: 'Jagić', team: 'home', type: 'goal' },
    ],
  },
  {
    id: 'm-2015-7k-1',
    competitionId: 'arhiva-dobrosusjedski-2015-2016',
    competitionName: 'Dobrosusjedski odnosi 2015.',
    round: '7. kolo',
    date: '08. – 10. svibnja 2015.',
    venue: 'Križevci',
    homeTeam: 'Ruševac 2015',
    awayTeam: 'Šumarija Križevačko pivo',
    homeScore: 6,
    awayScore: 2,
    status: 'arhiva',
    summary:
      'Uvjerljiva pobjeda Ruševca 2015 u sezoni s 24 momčadi; u istom kolu Majurec je svladao Templarse rezultatom 3:1.',
    events: [
      { minute: '2×', player: 'Matija Ištvanović (2 pogotka)', team: 'home', type: 'goal' },
      { minute: '2×', player: 'Matija Kuća (2 pogotka)', team: 'home', type: 'goal' },
      { minute: '1×', player: 'Luka Ištvanović', team: 'home', type: 'goal' },
      { minute: '1×', player: 'Dejan Ištvanović', team: 'home', type: 'goal' },
    ],
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: 'n1',
    slug: 'allplan-croatia-fermoy-prvak-dobrosusjedskih-odnosa-2026',
    title: 'Allplan Croatia Fermoy prvak Dobrosusjedskih odnosa',
    excerpt:
      'Povratnička sezona okupila je 12 momčadi, a nakon 11 kola drugo mjesto pripalo je MNK Buldožerima i treće MNK Sv. Vid Vrbovcu. Dodijeljena su i priznanja najboljim pojedincima te fair play ekipama.',
    category: 'Izvještaj',
    date: '26. rujna 2026.',
    readTime: '3 min čitanja',
    image: 'images/trophy-ceremony.jpg',
    author: 'Udruga Nogometne lige i turniri',
    featured: true,
    content: [
      'Allplan Croatia Fermoy osvojio je naslov prvaka Malonogometne lige Dobrosusjedski odnosi Križevci za 2026. godinu. Povratnička sezona okupila je 12 momčadi, a nakon 11 kola drugo mjesto pripalo je MNK Buldožerima i treće MNK Sv. Vid Vrbovcu. Uoči posljednjeg kola, odigranog 25. rujna, čak su četiri ekipe još bile u borbi za prvo mjesto.',
      'Za najboljeg igrača sezone izabran je Ivan Slavi iz MNK Buldožera, najboljim vratarom proglašen je Jakov Car iz prvoplasirane momčadi Allplan Croatia Fermoy, dok je titulu najboljeg strijelca ponio Martin Horvat iz Tehnodiv Servisa.',
      'Priznanja za fair play zaslužili su Templars i Izvan forme, a sezona je uspješno održana pod pokroviteljstvom Grada Križevaca uz podršku sponzora i partnera.',
    ],
  },
  {
    id: 'n2',
    slug: 'dobrosusjedski-odnosi-ponovno-na-krizevackom-rasporedu',
    title: 'Dobrosusjedski odnosi ponovno na križevačkom rasporedu',
    excerpt:
      'Malonogometna liga Dobrosusjedski odnosi vratila se u svibnju 2026. nakon višegodišnje stanke, uz javno dostupne rasporede i rezultate na Sofascoreu pod okriljem udruge.',
    category: 'Novosti',
    date: 'Svibanj 2026.',
    readTime: '2 min čitanja',
    image: 'images/summer-league-turf.jpg',
    author: 'Udruga Nogometne lige i turniri',
    content: [
      'Malonogometna liga Dobrosusjedski odnosi vratila se u svibnju 2026. godine nakon desetogodišnje stanke. Sezona je započela prvim svibanjskim susretima, a već je drugo kolo donijelo šest uzbudljivih utakmica uz praćenje rasporeda i rezultata na platformi Sofascore.',
      'Povratak natjecanja uslijedio je u istom proljeću u kojem je registrirana i sportska udruga Nogometne lige i turniri sa sjedištem u Gračini (upisana u Registar udruga RH 20. travnja 2026.).',
      'Na Sofascoreu je upravo udruga vodila unos i uređivanje podataka o pojedinim susretima, čime je njezino ime izravno povezano s javno dostupnom digitalnom arhivom povratničke sezone.',
    ],
  },
  {
    id: 'n3',
    slug: 'iz-arhive-srpanj-2016-sedamnaest-momcadi-u-dvije-jakosne-skupine',
    title: 'Iz arhive, srpanj 2016. — Sedamnaest momčadi u dvije jakosne skupine',
    excerpt:
      'U ljeto 2016. Dobrosusjedski odnosi igrali su se u dvije jakosne skupine na igralištima dviju križevačkih srednjih škola i Osnovne škole Kalnik.',
    category: 'Arhiva',
    date: 'Iz arhive • Srpanj 2016.',
    readTime: '3 min čitanja',
    image: 'images/hero-night-tournament.jpg',
    author: 'Arhiva natjecanja',
    content: [
      'U ljeto 2016. godine Dobrosusjedski odnosi okupili su 17 momčadi podijeljenih u dvije jakosne skupine – s devet ekipa u prvoj i osam u drugoj ligi. Na rasporedu su bila igrališta kod Srednje škole „Ivan Seljanec” i Gimnazije Ivana Zakmardija Dijankovečkoga u Križevcima te igralište kod Osnovne škole Kalnik. Za razliku od kup-turnira s eliminacijskim utakmicama, tada se igrao jednokružni ligaški sustav bez naknadnog doigravanja.',
      'U trećem kolu, odigranom 2. srpnja na igralištu Srednje škole „Ivan Seljanec”, Križevci.info Raven i Gornji Cubinec podijelili su bodove rezultatom 3:3, a Matija Španić preuzeo je vrh liste strijelaca prve lige.',
      'Istoga dana u drugoj su ligi Križevački štatuti pobjedom 4:0 protiv Caffe bara King sačuvali praznu mrežu, Muharić prijevoz u susretu sa sedam pogodaka svladao je Gračina Boyse 5:2, dok je Sveti Benedikt bio bolji od Elektromaterijala F. T. P. Tomac rezultatom 3:1.',
    ],
  },
  {
    id: 'n4',
    slug: 'iz-arhive-rujan-2015-trojica-igraca-na-popisu-za-europsko-prvenstvo',
    title: 'Iz arhive, rujan 2015. — Trojica Križevčana na popisu za Europsko prvenstvo',
    excerpt:
      'Aleksandar Korenika, Stjepan Korenika i Antonio Picig našli su se u rujnu 2015. na popisu hrvatske mininogometne reprezentacije za Europsko prvenstvo u Vrsaru.',
    category: 'Arhiva',
    date: 'Iz arhive • Rujan 2015.',
    readTime: '3 min čitanja',
    image: 'images/veterans-fairplay.jpg',
    author: 'Arhiva natjecanja',
    content: [
      'Aleksandar Korenika, Stjepan Korenika i Antonio Picig našli su se na popisu hrvatske mininogometne reprezentacije za Europsko prvenstvo održano od 21. do 27. rujna 2015. u Vrsaru. Bio je to iznimno vrijedan doseg za lokalnu mininogometnu sredinu koja je u proljeće iste godine provela izbor kandidata za reprezentativnu selekciju.',
      'Razmjer tadašnjeg ligaškog natjecanja vidio se i po brojkama: u lokalnom izboru sudjelovali su voditelji svih 24 momčadi i organizatori lige, a za deset mjesta na selekciji u Ivanić-Gradu konkuriralo je ukupno 336 igrača.',
      'Podaci o reprezentativnom popisu i sačuvani izvještaji s ligaških kola zajedno daju sliku sezone u kojoj je domaći amaterski mali nogomet bio snažno prepoznat i na nacionalnoj razini.',
    ],
  },
  {
    id: 'n5',
    slug: 'vizija-udruge-nogometne-lige-i-turniri-diljem-hrvatske',
    title: 'Nogometne lige i turniri: Otvorena platforma za organizaciju natjecanja diljem Hrvatske',
    excerpt:
      'Upisom u Registar udruga RH u travnju 2026. postavljeni su temelji za razvoj i povezivanje rekreativnih liga, turnira i sportskih programa za mlade u cijeloj Hrvatskoj.',
    category: 'Udruga',
    date: 'Travanj 2026.',
    readTime: '2 min čitanja',
    image: 'images/winter-futsal-cup.jpg',
    author: 'Vodstvo udruge',
    content: [
      'Nakon osnivačke skupštine održane 23. ožujka 2026. te službenog upisa u Registar udruga Republike Hrvatske 20. travnja 2026., udruga Nogometne lige i turniri (Football Leagues and Tournaments) započela je s radom s jasnim ciljem unaprjeđenja organizacije amaterskog nogometa i malog nogometa.',
      'Iako je sjedište udruge u Gračini, djelovanje udruge nije ograničeno na jedno područje: kroz organizaciju natjecanja i turnira, digitalno praćenje statistike, uključivanje mladih u sport i povezivanje sportskih organizacija otvaramo prostor za suradnju s gradovima, klubovima i rekreativcima u svim krajevima Hrvatske.',
    ],
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Večernji susreti pod reflektorima',
    category: 'Lige',
    event: 'Malonogometna liga Dobrosusjedski odnosi',
    date: 'Sezona 2026.',
    image: 'images/hero-night-tournament.jpg',
    caption: 'Večernje malonogometne utakmice uz veliku posjećenost i natjecateljski naboj.',
  },
  {
    id: 'g2',
    title: 'Dvoranski malonogometni turniri',
    category: 'Turniri',
    event: 'Turnirska natjecanja udruge',
    date: '2026.',
    image: 'images/winter-futsal-cup.jpg',
    caption: 'Dinamični susreti malog nogometa u dvoranskim uvjetima.',
  },
  {
    id: 'g3',
    title: 'Neizvjesna ligaška završnica kroz 11 kola',
    category: 'Lige',
    event: 'Dobrosusjedski odnosi 2026.',
    date: 'Svibanj – Rujan 2026.',
    image: 'images/summer-league-turf.jpg',
    caption: 'Dvanaest momčadi u borbi za bodove od svibnja do rujna 2026. godine.',
  },
  {
    id: 'g4',
    title: 'Uključivanje djece i mladih u sport',
    category: 'Mladi',
    event: 'Razvojni programi i turniri za mlade',
    date: 'Program udruge',
    image: 'images/youth-cup-kids.jpg',
    caption: 'Poticanje sportskog duha, kretanja i prijateljstva kod najmlađih uzrasta.',
  },
  {
    id: 'g5',
    title: 'Kultura fair playa kroz generacije',
    category: 'Lige',
    event: 'Fair play tradicija od 2015. do danas',
    date: '2015. – 2026.',
    image: 'images/veterans-fairplay.jpg',
    caption: 'Poštovanje suparnika i sudaca kao temelj svakog natjecanja u organizaciji udruge.',
  },
  {
    id: 'g6',
    title: 'Pehari i pojedinačna priznanja za najbolje',
    category: 'Nagrade',
    event: 'Proglašenje pobjednika sezone 2026.',
    date: 'Rujan 2026.',
    image: 'images/trophy-ceremony.jpg',
    caption: 'Priznanja za prvake, najboljeg igrača, vratara, strijelca i fair play momčadi.',
  },
];

export const documents: AssociationDocument[] = [
  {
    id: 'doc-statut',
    title: 'Izvadak iz podataka i djelatnosti Udruge „Nogometne lige i turniri”',
    category: 'Udruga',
    updated: '20. travnja 2026.',
    fileSize: 'Službeni podaci • Registar udruga RH',
    summary: 'Osnovni registracijski podaci (OIB 27201167728, reg. br. 06001657) i popis upisanih sportskih djelatnosti.',
    previewText: [
      'Puni naziv: Nogometne lige i turniri (eng. Football Leagues and Tournaments)',
      'Sjedište: Gračina 80, Gračina, Koprivničko-križevačka županija | Osnivačka skupština: 23. ožujka 2026. | Upis u registar: 20. travnja 2026.',
      'Upisane djelatnosti: promicanje sporta (posebno nogometa i malog nogometa), poticanje sportske rekreacije, organizacija natjecanja i turnira, razvoj amaterskog sporta, povezivanje sportskih organizacija, uključivanje mladih u sport i promicanje fair playa.',
    ],
  },
  {
    id: 'doc-propozicije',
    title: 'Okvirne propozicije malonogometnih liga i turnira',
    category: 'Propozicije',
    updated: '2026.',
    fileSize: 'Predložak propozicija',
    summary: 'Opća pravila natjecanja, bodovanja, kriterija poretka, opreme momčadi i fair play kodeksa.',
    previewText: [
      '1. Sustav natjecanja definira se posebnim raspisom prije početka svake lige ili turnira (jednokružni/dvokružni ligaški sustav ili skupine s eliminacijskom fazom).',
      '2. Bodovanje u ligi: pobjeda donosi 3 boda, remi 1 bod, poraz 0 bodova.',
      '3. Sve rezultate, sastave i disciplinske mjere bilježi službena osoba natjecanja u zapisnik utakmice.',
    ],
  },
  {
    id: 'doc-prijavnica',
    title: 'Obrazac za prijavu momčadi i popis igrača',
    category: 'Obrasci',
    updated: '2026.',
    fileSize: 'Predložak obrasca',
    summary: 'Standardizirani obrazac za registraciju ekipe, kontakt voditelja i popis prijavljenih igrača.',
    previewText: [
      'Naziv ekipe: ___________________________ | Grad / mjesto: ___________________________',
      'Voditelj ekipe (ime, prezime, telefon i e-pošta): ____________________________________',
      'Popis prijavljenih igrača s datumom rođenja i brojem dresa te potpisom prihvaćanja propozicija natjecanja.',
    ],
  },
  {
    id: 'doc-suglasnost',
    title: 'Suglasnost roditelja/skrbnika za nastup maloljetnih sportaša',
    category: 'Obrasci',
    updated: '2026.',
    fileSize: 'Predložak obrasca',
    summary: 'Pisana suglasnost zakonskog zastupnika za sudjelovanje djece i maloljetnih igrača na turnirima i ligama.',
    previewText: [
      'Suglasnost roditelja/zakonskog zastupnika za sudjelovanje maloljetnog igrača na sportskom natjecanju u organizaciji udruge Nogometne lige i turniri.',
    ],
  },
];

export const faqs = [
  {
    question: 'Djeluje li udruga samo na križevačkom području ili u cijeloj Hrvatskoj?',
    answer:
      'Iako je sjedište udruge u Gračini te se uz nju veže tradicija lige Dobrosusjedski odnosi u Križevcima, udruga Nogometne lige i turniri (Football Leagues and Tournaments) osnovana je za djelovanje i širenje sportskih projekata, liga i turnira po cijeloj Hrvatskoj.',
  },
  {
    question: 'Koja je razlika između povijesti lige Dobrosusjedski odnosi i današnje udruge?',
    answer:
      'Malonogometna liga Dobrosusjedski odnosi dokumentirana je najmanje od sezone 2015. godine, dok je današnja udruga Nogometne lige i turniri održala osnivačku skupštinu 23. ožujka 2026. te je upisana u Registar udruga RH 20. travnja 2026. pod registarskim brojem 06001657.',
  },
  {
    question: 'Tko su voditelji udruge i kako možemo stupiti u kontakt za suradnju?',
    answer:
      'Voditelji i koordinatori natjecanja su Alen Miholić i Matija Vuković. Za prijavu ekipe, prijedlog organizacije turnira/lige u vašem gradu ili sponzorstvo možete se javiti putem online obrasca na stranici ili izravno na nogometneligeiturniri@gmail.com.',
  },
  {
    question: 'Gdje su dostupni rezultati i statistika odigrane sezone 2026.?',
    answer:
      'Kompletna tablica, dobitnici pojedinačnih priznanja i poveznice nalaze se u našoj rubrici „Raspored i tablice”, a detaljni podaci o utakmicama sezone 2026. javno su dostupni i na platformi Sofascore.',
  },
  {
    question: 'Imate li stare zapisnike, fotografije ili rezultate iz ranijih sezona lige?',
    answer:
      'Sustavno gradimo i nadopunjujemo povijesnu arhivu natjecanja! Ako posjedujete službene zapisnike, tablice ili fotografije s dopuštenjem za objavu iz ranijih sezona, slobodno nam ih pošaljite na e-poštu udruge.',
  },
];
