/**
 * CENTRALNA DATOTEKA S PODACIMA STRANICE
 * ======================================
 * Ovdje se nalaze svi tekstovi, natjecanja, tablice, rasporedi, vijesti,
 * galerija, dokumenti i kontakt podaci Udruge "Nogometne lige i turniri" Križevci.
 *
 * Kada dobijete dodatne podatke i fotografije, dovoljno je urediti ovu datoteku
 * i zamijeniti slike u mapi `public/images/`.
 */

export type CompetitionStatus = 'prijave-u-tijeku' | 'aktivno' | 'u-najavi' | 'zavrseno';
export type CompetitionCategory = 'Turnir' | 'Liga' | 'Mladi' | 'Veterani';

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
  maxTeams: number;
  registeredTeams: number;
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
  time: string;
  venue: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'odigrano' | 'najava';
  referee?: string;
  summary?: string;
  sofascoreMatchUrl?: string;
  events?: MatchEvent[];
}

export interface TopScorer {
  rank: number;
  name: string;
  team: string;
  competition: string;
  goals: number;
  matches: number;
  mvpCount: number;
}

export interface BracketMatch {
  id: string;
  stage: 'Četvrtfinale' | 'Polufinale' | 'Utakmica za 3. mjesto' | 'Finale';
  label: string;
  time: string;
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  note?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Prijave' | 'Izvještaj' | 'Obavijest' | 'Mladi';
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
  category: 'Turniri' | 'Lige' | 'Mladi' | 'Nagrade';
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
  fullName: 'Udruga "Nogometne lige i turniri" Križevci',
  shortName: 'NLT Križevci',
  city: 'Križevci',
  region: 'Koprivničko-križevačka županija • Prigorje',
  foundedYear: '2021.',
  tagline: 'Središte malog nogometa, rekreativnih liga i turnira križevačkog kraja',
  heroLead:
    'Organiziramo kultnu malonogometnu ligu "Dobrosusjedski odnosi", dvoranske kupove i turnire u Križevcima – uz službeno praćenje statistike, rezultata i poretka ekipa.',
  address: 'Ulica kralja Tomislava 18, 48260 Križevci (primjer adrese)',
  email: 'info@nlt-krizevci.hr',
  registrationEmail: 'prijave@nlt-krizevci.hr',
  phone: '+385 98 000 0000',
  secondaryPhone: '+385 91 000 0000',
  iban: 'HR1223600001100000000',
  oib: '12345678901',
  registryNo: '06001234',
  workingHours: 'Pon – Pet: 17:00 – 21:00 | Vikendom za vrijeme natjecanja',
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
  },
  stats: [
    { value: '12', label: 'Ekipa u ligi Dobrosusjedski odnosi', detail: '270 postignutih golova u 11 kola' },
    { value: '52+', label: 'Aktivnih ekipa godišnje', detail: 'Križevci, Vrbovec, Fodrovec i Prigorje' },
    { value: '680+', label: 'Registriranih igrača', detail: 'Seniori, rekreativci, veterani i djeca' },
    { value: '180+', label: 'Utakmica po sezoni', detail: 'Praćenje rezultata i statistike na Sofascoreu' },
  ],
  values: [
    {
      title: 'Vrhunska organizacija i Sofascore statistika',
      description:
        'Jasno definirani rasporedi, licencirani suci te službena objava rezultata, forme ekipa i tablica uz praćenje na platformi Sofascore Minifootball.',
    },
    {
      title: 'Dobrosusjedski duh i zajedništvo',
      description:
        'Oživjeli smo omiljenu križevačku ligu "Dobrosusjedski odnosi" koja petkom navečer pod reflektorima okuplja ekipe i navijače iz cijelog kraja.',
    },
    {
      title: 'Ulaganje u mlade generacije',
      description:
        'Kroz turnire za najmlađe uzraste potičemo djecu na kretanje, timski duh i ljubav prema sportu bez rezultatskog pritiska.',
    },
    {
      title: 'Potpuna transparentnost rada',
      description:
        'Svi pravilnici, disciplinske odluke, propozicije natjecanja i izvještaji udruge javno su dostupni svim članovima i sudionicima.',
    },
  ],
  boardMembers: [
    {
      role: 'Predsjednik udruge',
      name: 'Ime i prezime (urediti u siteData.ts)',
      bio: 'Organizacija natjecanja, koordinacija lige "Dobrosusjedski odnosi" i razvoj sportskih projekata u Križevcima.',
      contact: 'predsjednik@nlt-krizevci.hr',
    },
    {
      role: 'Dopredsjednik i voditelj liga',
      name: 'Ime i prezime (urediti u siteData.ts)',
      bio: 'Zadužen za sustav natjecanja, ždrijeb, delegiranje utakmica i komunikaciju s voditeljima ekipa.',
      contact: 'voditelj@nlt-krizevci.hr',
    },
    {
      role: 'Tajnik udruge',
      name: 'Ime i prezime (urediti u siteData.ts)',
      bio: 'Administracija članstva, registracije igrača, projektne prijave i suradnja s Gradom Križevcima.',
      contact: 'tajnik@nlt-krizevci.hr',
    },
    {
      role: 'Povjerenik za suđenje i zapisnike',
      name: 'Ime i prezime (urediti u siteData.ts)',
      bio: 'Brine o primjeni pravila malog nogometa, fer igri i unosu službenih rezultata.',
      contact: 'disciplina@nlt-krizevci.hr',
    },
  ],
  timeline: [
    {
      year: 'Tradicija',
      title: 'Korijeni lige "Dobrosusjedski odnosi" u Križevcima',
      text: 'Kultna križevačka rekreativna liga godinama je gradila prepoznatljivi identitet večernjeg malog nogometa i kvartovskog druženja.',
    },
    {
      year: 'Osnivanje',
      title: 'Registracija Udruge "Nogometne lige i turniri"',
      text: 'Okupljanjem organizacijskog tima udruga postavlja čvrst temelj za cjelogodišnja natjecanja, turnire i rad sa sportskom zajednicom.',
    },
    {
      year: 'Svibanj 2026.',
      title: 'Veliki povratak lige "Dobrosusjedski odnosi" nakon 10 godina',
      text: 'Pod reflektorima vanjskog igrališta Gimnazije u Križevcima ponovno je pokrenuta liga s 12 momčadi, 11 uzbudljivih kola i praćenjem na Sofascoreu.',
    },
    {
      year: 'Zima 2026./2027.',
      title: 'Širenje kalendara na dvoranske kupove i mlade uzraste',
      text: 'Uz uspješno zaključenu ligu (prvak Allplan Croatia Fermoy), udruga nastavlja s organizacijom dvoranskih turnira i kupova za mlade.',
    },
  ],
  venues: [
    {
      name: 'Vanjsko igralište Gimnazije I. Z. Dijankovečkog Križevci',
      type: 'Dom lige "Dobrosusjedski odnosi" • Reflektori',
      address: 'Ulica Milislava Demerca, Križevci',
      features: 'Kultno vanjsko igralište pod reflektorima za večernje utakmice petkom uz odličnu atmosferu uz teren.',
    },
    {
      name: 'Školsko-sportska dvorana Križevci (GŠSD)',
      type: 'Dvoranski futsal (parket)',
      address: 'Potočka ulica, Križevci',
      features: 'Grijana dvorana, tribine za 800+ gledatelja, svlačionice, semafor i ugostiteljski punkt.',
    },
    {
      name: 'ŠRC Križevci & Prigorski sportski tereni',
      type: 'Prirodna i umjetna trava',
      address: 'Križevci i okolica (Fodrovec, Sv. Ivan Žabno, Sv. Petar Orehovec, Kalnik)',
      features: 'Tereni za kupove mladih uzrasta i gostujuće jednodnevne turnire.',
    },
  ],
  partners: [
    { name: 'Grad Križevci', tier: 'Pokrovitelj' },
    { name: 'Zajednica športskih udruga Križevci', tier: 'Sportski partner' },
    { name: 'Sofascore Minifootball', tier: 'Digitalno praćenje rezultata' },
    { name: 'Lokalni ugostitelji i obrtnici Križevaca', tier: 'Partneri ekipa i lige' },
    { name: 'Koprivničko-križevačka županija', tier: 'Institucionalna podrška' },
    { name: 'Lokalni mediji Prigorja', tier: 'Medijsko praćenje' },
  ],
};

export const competitions: Competition[] = [
  {
    id: 'dobrosusjedski-odnosi',
    slug: 'malonogometna-liga-dobrosusjedski-odnosi',
    title: 'Malonogometna liga "Dobrosusjedski odnosi" Križevci',
    shortTitle: 'Liga Dobrosusjedski odnosi',
    subtitle: 'Kultna križevačka malonogometna liga pod reflektorima u organizaciji naše udruge',
    category: 'Liga',
    status: 'zavrseno',
    statusLabel: '11/11 kola • Prvak: Allplan Croatia Fermoy',
    season: 'Sezona 2026.',
    dates: 'Svibanj – Rujan 2026. (11 kola)',
    location: 'Vanjsko igralište Gimnazije u Križevcima',
    surface: 'Vanjska podloga pod reflektorima',
    format: '12 seniorskih ekipa • jednokružni ligaški sustav (11 kola)',
    matchDuration: 'Večernji termini petkom pod reflektorima',
    maxTeams: 12,
    registeredTeams: 12,
    entryFee: 'Sezonska ekipna kotizacija',
    prizePool: 'Pehari, medalje, nagradni fond i pojedinačna priznanja',
    prizes: [
      { place: '1. mjesto – Allplan Croatia Fermoy', reward: '26 bodova (8-2-1, 30:8) – Prvak lige zbog boljeg međusobnog omjera' },
      { place: '2. mjesto – Buldožeri', reward: '26 bodova (8-2-1, 39:7) – Najefikasniji napad i obrana lige (+32)' },
      { place: '3. mjesto – Sveti Vid Vrbovec', reward: '25 bodova (8-1-2, 30:10) – Brončani pehar i medalje' },
      { place: '4. mjesto – MNK Fodrovec', reward: '23 boda (7-2-2, 31:12) + nagrade za najboljeg strijelca, vratara, igrača i Fair-play' },
    ],
    image: 'images/summer-league-turf.jpg',
    featured: true,
    description:
      'Nakon deset godina stanke, Udruga "Nogometne lige i turniri" ponovno je oživjela legendarno križevačko natjecanje "Dobrosusjedski odnosi". Kroz 11 napetih kola na vanjskom igralištu Gimnazije u Križevcima nastupilo je 12 odličnih ekipa, postignuto je ukupno 270 pogodaka, a svi rezultati i statistike službeno su praćeni i na platformi Sofascore.',
    highlights: [
      'Dramatična utrka za naslov do zadnjeg kola: Allplan Croatia Fermoy i Buldožeri izjednačeni na 26 bodova',
      'Službena statistika, forma ekipa i profili svih 12 momčadi na platformi Sofascore Minifootball',
      'Ukupno 66 odigranih utakmica i čak 270 postignutih pogodaka (prosjek preko 4 gola po susretu)',
      'Velika posjećenost petkom navečer pod reflektorima u srcu Križevaca',
    ],
    rulesSummary: [
      'Jednokružni bod-sustav kroz 11 kola (svatko sa svakim): pobjeda 3 boda, remi 1 bod, poraz 0 bodova.',
      'U slučaju istog broja bodova o poretku odlučuje međusobni susret (Allplan Croatia Fermoy svladao je Buldožere u izravnom dvoboju).',
      'Sve utakmice vode licencirani suci uz službeni zapisnik i objavu rezultata.',
    ],
  },
  {
    id: 'zimski-kup',
    slug: 'zimski-malonogometni-turnir-krizevci',
    title: 'Zimski malonogometni turnir "Križevci Kup"',
    shortTitle: 'Zimski Kup Križevci',
    subtitle: 'Dvoranski malonogometni spektakl prosinca i siječnja u Prigorju',
    category: 'Turnir',
    status: 'prijave-u-tijeku',
    statusLabel: 'Prijave otvorene',
    season: 'Zima 2026./2027.',
    dates: '12. prosinca 2026. – 06. siječnja 2027.',
    registrationDeadline: '08. prosinca 2026. u 20:00 h',
    location: 'Školsko-sportska dvorana Križevci',
    surface: 'Dvoranski parket (futsal lopta br. 4)',
    format: '5 + 1 (maks. 12 prijavljenih igrača po ekipi)',
    matchDuration: '2 × 15 minuta (završnica 2 × 20 min)',
    maxTeams: 32,
    registeredTeams: 24,
    entryFee: '150 € po ekipi',
    prizePool: '6.500 € + pehari i pojedinačne nagrade',
    prizes: [
      { place: '1. mjesto', reward: '3.500 € + prijelazni i trajni pehar + zlatne medalje' },
      { place: '2. mjesto', reward: '1.700 € + pehar + srebrne medalje' },
      { place: '3. mjesto', reward: '900 € + pehar + brončane medalje' },
      { place: '4. mjesto & Fair-play', reward: '400 € + nagrade za najboljeg igrača, strijelca i vratara' },
    ],
    image: 'images/winter-futsal-cup.jpg',
    featured: true,
    description:
      'Zimski dvoranski turnir okuplja malonogometne ekipe iz Križevaca, Vrbovca, Koprivnice, Bjelovara i cijele regije. Natjecanje započinje razigravanjem po skupinama (svakoj ekipi zajamčene najmanje 3 utakmice), nakon čega slijedi nokaut završnica pred punim tribinama.',
    highlights: [
      'Zajamčene minimalno 3 utakmice u skupini za svaku prijavljenu ekipu',
      'Licencirani futsal suci i elektronički zapisnik sa statistikom strijelaca',
      'Bogata tombola za gledatelje i revijalne utakmice uoči velikog finala',
      'Mogućnost prilagodbe termina u grupnoj fazi za gostujuće ekipe',
    ],
    rulesSummary: [
      'Igra se po prilagođenim FIFA futsal pravilima (akumulirani 6. prekršaj = udarac s 10 m).',
      'Svaka ekipa može prijaviti do 12 igrača do početka svoje prve utakmice u nokaut fazi.',
      'Igrač može nastupati isključivo za jednu ekipu unutar iste kategorije turnira.',
      'U slučaju neriješenog rezultata u nokaut fazi izvode se šesterci (3 serije).',
    ],
  },
  {
    id: 'veteranska-liga',
    slug: 'rekreativna-i-veteranska-liga-krizevci',
    title: 'Rekreativna i veteranska liga Križevci 35+',
    shortTitle: 'Veteranska Liga 35+',
    subtitle: 'Liga majstora nogometa, poduzeća i rekreativaca s naglaskom na fair-play',
    category: 'Veterani',
    status: 'aktivno',
    statusLabel: 'U tijeku • 7. kolo',
    season: 'Jesen / Zima 2026.',
    dates: 'Rujan – Studeni 2026.',
    location: 'Sportski park Križevci / GŠSD Križevci',
    surface: 'Umjetna trava / Dvorana (ovisno o vremenu)',
    format: '5 + 1 (igrači 35+ godina uz do 1 mlađeg vratara)',
    matchDuration: '2 × 18 minuta',
    maxTeams: 10,
    registeredTeams: 8,
    entryFee: '180 € po ekipi',
    prizePool: 'Pehari, sponzorski paketi i završna večera za sve ekipe',
    prizes: [
      { place: '1. – 3. mjesto', reward: 'Pehari, medalje i poklon bonovi lokalnih partnera' },
      { place: 'Trofej Fair-Play', reward: 'Posebno priznanje i ekipno druženje za najkorektniju momčad' },
    ],
    image: 'images/veterans-fairplay.jpg',
    featured: true,
    description:
      'Namijenjena bivšim igračima, rekreativcima i radnim kolektivima koji žele redovitu tjednu rekreaciju u uređenom i prijateljskom okruženju bez grubih startova.',
    highlights: [
      'Stroža pravila protiv uklizavanja radi prevencije ozljeda',
      'Termini prilagođeni zaposlenima i obiteljskim obvezama',
      'Zajednička završna svečanost dodjele priznanja za sve sudionike',
    ],
    rulesSummary: [
      'Pravo nastupa u polju imaju igrači koji u tekućoj kalendarskoj godini navršavaju 35 godina.',
      'Klizeći start u duelu s protivničkim igračem kažnjava se neizravnim udarcem i opomenom.',
    ],
  },
  {
    id: 'kup-mladih-nada',
    slug: 'kup-mladih-nada-prigorja',
    title: 'Kup mladih nada Prigorja (U-9, U-11, U-13)',
    shortTitle: 'Kup Mladih Nada',
    subtitle: 'Proljetni festival dječjeg nogometa, osmijeha i sportskog prijateljstva',
    category: 'Mladi',
    status: 'u-najavi',
    statusLabel: 'Prijave od ožujka 2027.',
    season: 'Proljeće 2027.',
    dates: '17. – 18. travnja 2027.',
    registrationDeadline: '10. travnja 2027.',
    location: 'ŠRC Križevci – Glavni i pomoćni tereni',
    surface: 'Prirodna i umjetna trava',
    format: 'U-9 (6+1), U-11 (7+1), U-13 (7+1)',
    matchDuration: '1 × 20 minuta',
    maxTeams: 36,
    registeredTeams: 8,
    entryFee: '60 € po ekipi (uključen topli obrok i sok za svako dijete)',
    prizePool: 'Pehari za najbolje + uspomena medalje za SVE mlade sudionike',
    prizes: [
      { place: '1. – 4. mjesto po kategoriji', reward: 'Pehari i medalje + pojedinačne plakete ("Dream Team" turnira)' },
      { place: 'Svi sudionici', reward: 'Zahvalnica i medalja sudjelovanja za svako prijavljeno dijete' },
    ],
    image: 'images/youth-cup-kids.jpg',
    description:
      'Dvodnevni turnir škola nogometa s područja sjeverozapadne i središnje Hrvatske. Glavni cilj turnira je razvoj ljubavi prema sportu, druženje vršnjaka i promocija zdravih navika u obiteljskoj atmosferi.',
    highlights: [
      'Osiguran ručak, voće i osvježenje za sve mlade igrače i trenere',
      'Liječnička služba i službeni fotografi prisutni tijekom oba dana turnira',
      'Poligon vještina i natjecanje u preciznosti udarca između utakmica',
    ],
    rulesSummary: [
      'Obvezna sportska iskaznica ili valjani dokument s datumom rođenja te suglasnost roditelja.',
      'Leteće izmjene bez ograničenja kako bi sva djeca dobila jednaku minutažu.',
    ],
  },
  {
    id: 'nocni-turnir-3v3',
    slug: 'ljetni-nocni-turnir-srce-prigorja',
    title: 'Ljetni noćni turnir "Srce Prigorja" 3 na 3 (Mantinela)',
    shortTitle: 'Noćni 3v3 Turnir',
    subtitle: 'Atraktivni vikend uličnog nogometa na male golove uz glazbu pod zvijezdama',
    category: 'Turnir',
    status: 'u-najavi',
    statusLabel: 'U najavi • Kolovoz 2027.',
    season: 'Ljeto 2027.',
    dates: 'Kolovoz 2027.',
    location: 'Križevci – Vanjsko igralište uz mantinelu',
    surface: 'Vanjska podloga s mantinelom',
    format: '3 na 3 bez vratara (maks. 5 igrača)',
    matchDuration: '2 × 8 minuta čistog tempa',
    maxTeams: 24,
    registeredTeams: 0,
    entryFee: '70 € po ekipi',
    prizePool: '1.800 € + natjecanje u izvođenju penala',
    prizes: [
      { place: '1. mjesto', reward: '1.000 € + pehar' },
      { place: '2. mjesto', reward: '500 € + pehar' },
      { place: '3. mjesto', reward: '300 € + pehar' },
    ],
    image: 'images/hero-night-tournament.jpg',
    description:
      'Brz, dinamičan i publici izuzetno atraktivan format 3v3 u kavezu/mantineli uz paralelno pojedinačno natjecanje u raspucavanju penala.',
    highlights: [
      'Neprekidna igra uz mantinelu s mnoštvom driblinga i pogodaka',
      'Pojedinačni turnir u penalima s fondom nagrada za publiku i igrače',
      'Večernji ljetni ugođaj uz glazbeni i ugostiteljski program',
    ],
    rulesSummary: [
      'Pogodak se priznaje isključivo s protivničke polovice terena.',
      'Nema zaleđa ni auta na bočnim stranicama s mantinelom.',
    ],
  },
];

export const leagueTables: LeagueTableGroup[] = [
  {
    id: 'dobrosusjedski-odnosi-tablica',
    competitionSlug: 'malonogometna-liga-dobrosusjedski-odnosi',
    label: 'Liga "Dobrosusjedski odnosi"',
    updatedAt: 'Konačni poredak • Sofascore',
    roundInfo: 'Ukupno — nakon 11. kola',
    zoneLegend:
      'Prvak lige je Allplan Croatia Fermoy zbog pobjede u međusobnom ogledu s ekipom Buldožeri (obje momčadi po 26 bodova). Klikom na ime ekipe ili oznaku forme (P/N/I) otvarate službene podatke na Sofascoreu.',
    rows: [
      {
        pos: 1,
        team: 'Allplan Croatia Fermoy',
        placeOrigin: 'Križevci • Prvak lige',
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
        placeOrigin: 'MNK Buldožeri',
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
        placeOrigin: 'Vrbovec',
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
        placeOrigin: 'Fodrovec',
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
        placeOrigin: 'Križevci / Prigorje',
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
        placeOrigin: 'Križevci / Prigorje',
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
        placeOrigin: 'Križevci / Prigorje',
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
        placeOrigin: 'Križevci',
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
        placeOrigin: 'Križevci / Prigorje',
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
        placeOrigin: 'Križevci / Prigorje',
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
        placeOrigin: 'Križevci / Prigorje',
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
        placeOrigin: 'Križevci / Prigorje',
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
  {
    id: 'veterani-2026',
    competitionSlug: 'rekreativna-i-veteranska-liga-krizevci',
    label: 'Veteranska liga 35+ (Ogledni podaci)',
    updatedAt: '22. studenoga 2026.',
    roundInfo: 'Nakon 7. od 9 kola',
    zoneLegend:
      'Ogledna ljestvica veteranske lige – zamijenite stvarnim podacima u src/data/siteData.ts.',
    rows: [
      { pos: 1, team: 'Veterani Radnik KŽ', placeOrigin: 'Križevci', played: 7, won: 6, drawn: 1, lost: 0, goalsFor: 26, goalsAgainst: 8, points: 19, form: ['P', 'P', 'N', 'P', 'P'], zone: 'champion' },
      { pos: 2, team: 'Stari Pajdaši Prigorje', placeOrigin: 'Križevci', played: 7, won: 5, drawn: 1, lost: 1, goalsFor: 21, goalsAgainst: 11, points: 16, form: ['P', 'I', 'P', 'P', 'P'], zone: 'playoff' },
      { pos: 3, team: 'Metal-KŽ Kolektiv', placeOrigin: 'Križevci', played: 7, won: 4, drawn: 1, lost: 2, goalsFor: 18, goalsAgainst: 14, points: 13, form: ['N', 'P', 'P', 'I', 'P'] },
      { pos: 4, team: 'Orehovec Legende 35+', placeOrigin: 'Sv. Petar Orehovec', played: 7, won: 3, drawn: 2, lost: 2, goalsFor: 16, goalsAgainst: 15, points: 11, form: ['P', 'N', 'I', 'P', 'N'] },
      { pos: 5, team: 'Žabno Veterani', placeOrigin: 'Sv. Ivan Žabno', played: 7, won: 2, drawn: 2, lost: 3, goalsFor: 14, goalsAgainst: 16, points: 8, form: ['I', 'N', 'P', 'I', 'N'] },
      { pos: 6, team: 'Cubinec Rekreativa', placeOrigin: 'Cubinec', played: 7, won: 2, drawn: 0, lost: 5, goalsFor: 12, goalsAgainst: 20, points: 6, form: ['I', 'P', 'I', 'I', 'I'] },
      { pos: 7, team: 'Kalnički Sokolovi 35+', placeOrigin: 'Kalnik', played: 7, won: 1, drawn: 1, lost: 5, goalsFor: 10, goalsAgainst: 21, points: 4, form: ['I', 'I', 'N', 'P', 'I'] },
      { pos: 8, team: 'Prijatelji Sporta KŽ', placeOrigin: 'Križevci', played: 7, won: 1, drawn: 0, lost: 6, goalsFor: 8, goalsAgainst: 20, points: 3, form: ['I', 'I', 'I', 'I', 'P'] },
    ],
  },
];

export const matches: MatchItem[] = [
  {
    id: 'm1',
    competitionId: 'zimski-kup',
    competitionName: 'Zimski Kup Križevci',
    round: '1. kolo – Otvaranje turnira',
    date: 'Subota, 12.12.2026.',
    time: '18:00',
    venue: 'GŠSD Križevci',
    homeTeam: 'Allplan Croatia Fermoy (Nositelj A1)',
    awayTeam: 'Izvučeni par A2 (Ždrijeb 10.12.)',
    status: 'najava',
    summary: 'Svečano otvaranje Zimskog malonogometnog turnira u Križevcima predvode osvajači lige "Dobrosusjedski odnosi".',
  },
  {
    id: 'm2',
    competitionId: 'veteranska-liga',
    competitionName: 'Veteranska liga 35+',
    round: '8. kolo',
    date: 'Nedjelja, 29.11.2026.',
    time: '17:30',
    venue: 'GŠSD Križevci',
    homeTeam: 'Veterani Radnik KŽ',
    awayTeam: 'Metal-KŽ Kolektiv',
    status: 'najava',
    referee: 'I. Šaško',
    summary: 'Dvoboj vrha ljestvice u dvoranskom terminu veteranske lige.',
  },
  {
    id: 'm3',
    competitionId: 'dobrosusjedski-odnosi',
    competitionName: 'Liga "Dobrosusjedski odnosi"',
    round: 'Derbi za naslov prvaka',
    date: 'Sezona 2026.',
    time: '21:00',
    venue: 'Vanjsko igralište Gimnazije Križevci',
    homeTeam: 'Allplan Croatia Fermoy',
    awayTeam: 'Buldožeri',
    homeScore: 2,
    awayScore: 1,
    status: 'odigrano',
    sofascoreMatchUrl:
      'https://www.sofascore.com/minifootball/match/allplan-croatia-fermoy-mnk-buldozeri/jXNjszaOj#id:16137163',
    summary:
      'Ključni izravni derbi vrha tablice u kojem je Allplan Croatia Fermoy upisao pobjedu vrijednu naslova prvaka (obje ekipe završile su ligu s po 26 bodova).',
  },
  {
    id: 'm4',
    competitionId: 'dobrosusjedski-odnosi',
    competitionName: 'Liga "Dobrosusjedski odnosi"',
    round: '11. kolo – Završnica lige',
    date: 'Sezona 2026.',
    time: '20:30',
    venue: 'Vanjsko igralište Gimnazije Križevci',
    homeTeam: 'Allplan Croatia Fermoy',
    awayTeam: 'Tehnodiv Servis',
    homeScore: 2,
    awayScore: 2,
    status: 'odigrano',
    sofascoreMatchUrl:
      'https://www.sofascore.com/minifootball/match/allplan-croatia-fermoy-tehnodiv-servis/KXNjszaOj#id:16137276',
    summary:
      'Čvrst i neizvjestan susret posljednjeg kola u kojem je bod potvrdio prvo mjesto Allplan Croatia Fermoya na konačnoj ljestvici.',
  },
  {
    id: 'm5',
    competitionId: 'dobrosusjedski-odnosi',
    competitionName: 'Liga "Dobrosusjedski odnosi"',
    round: '11. kolo – Derbi za postolje',
    date: 'Sezona 2026.',
    time: '21:15',
    venue: 'Vanjsko igralište Gimnazije Križevci',
    homeTeam: 'MNK Fodrovec',
    awayTeam: 'Buldožeri',
    homeScore: 1,
    awayScore: 3,
    status: 'odigrano',
    sofascoreMatchUrl:
      'https://www.sofascore.com/minifootball/match/mnk-fodrovec-mnk-buldozeri/jXNjsNXNj#id:16137282',
    summary:
      'Pobjeda Buldožera protiv četvrtoplasiranog MNK Fodrovca za potvrdu drugog mjesta i gol-razliku +32 (39:7).',
  },
  {
    id: 'm6',
    competitionId: 'dobrosusjedski-odnosi',
    competitionName: 'Liga "Dobrosusjedski odnosi"',
    round: '11. kolo',
    date: 'Sezona 2026.',
    time: '19:45',
    venue: 'Vanjsko igralište Gimnazije Križevci',
    homeTeam: 'Caffe Bar Lampaš & Zlatarna Križevci',
    awayTeam: 'Caffe Bar Faraon',
    homeScore: 1,
    awayScore: 2,
    status: 'odigrano',
    sofascoreMatchUrl:
      'https://www.sofascore.com/minifootball/match/caffe-bar-lampas-and-zlatarna-krizevci-caffe-bar-faraon/hXNjskXNj#id:16137288',
    summary:
      'Treća uzastopna pobjeda Caffe Bara Faraon za plasman u gornji dom ljestvice (5. mjesto s 22 boda).',
  },
];

export const topScorers: TopScorer[] = [
  { rank: 1, name: 'Igrač 1 (urediti u siteData.ts)', team: 'Buldožeri', competition: 'Dobrosusjedski odnosi', goals: 14, matches: 11, mvpCount: 4 },
  { rank: 2, name: 'Igrač 2 (urediti u siteData.ts)', team: 'Allplan Croatia Fermoy', competition: 'Dobrosusjedski odnosi', goals: 12, matches: 11, mvpCount: 4 },
  { rank: 3, name: 'Igrač 3 (urediti u siteData.ts)', team: 'MNK Fodrovec', competition: 'Dobrosusjedski odnosi', goals: 11, matches: 11, mvpCount: 3 },
  { rank: 4, name: 'Igrač 4 (urediti u siteData.ts)', team: 'Sveti Vid Vrbovec', competition: 'Dobrosusjedski odnosi', goals: 10, matches: 11, mvpCount: 3 },
  { rank: 5, name: 'Igrač 5 (urediti u siteData.ts)', team: 'Tehnodiv Servis', competition: 'Dobrosusjedski odnosi', goals: 9, matches: 11, mvpCount: 2 },
  { rank: 6, name: 'Igrač 6 (urediti u siteData.ts)', team: 'Caffe Bar Faraon', competition: 'Dobrosusjedski odnosi', goals: 8, matches: 11, mvpCount: 2 },
];

export const knockoutPreview: BracketMatch[] = [
  { id: 'p1', stage: 'Finale', label: '1. mjesto – Prvak lige', time: '26 bodova (30:8)', teamA: 'Allplan Croatia Fermoy', teamB: 'Omjer: 8 pobjeda, 2 remija, 1 poraz', note: 'Bolji u međusobnom susretu s Buldožerima' },
  { id: 'p2', stage: 'Finale', label: '2. mjesto – Doprvak', time: '26 bodova (39:7)', teamA: 'Buldožeri', teamB: 'Omjer: 8 pobjeda, 2 remija, 1 poraz', note: 'Najbolja gol-razlika lige (+32)' },
  { id: 'p3', stage: 'Utakmica za 3. mjesto', label: '3. mjesto', time: '25 bodova (30:10)', teamA: 'Sveti Vid Vrbovec', teamB: 'Omjer: 8 pobjeda, 1 remi, 2 poraza', note: 'Niz od 4 uzastopne pobjede u završnici' },
  { id: 'p4', stage: 'Polufinale', label: '4. mjesto', time: '23 boda (31:12)', teamA: 'MNK Fodrovec', teamB: 'Omjer: 7 pobjeda, 2 remija, 2 poraza', note: 'Gol-razlika +19' },
];

export const newsArticles: NewsArticle[] = [
  {
    id: 'n1',
    slug: 'allplan-croatia-fermoy-osvojio-malonogometnu-ligu-dobrosusjedski-odnosi',
    title: 'Allplan Croatia Fermoy prvak povratničke lige "Dobrosusjedski odnosi" u Križevcima!',
    excerpt:
      'U napetoj sezoni s 12 momčadi i 11 odigranih kola pod reflektorima Gimnazije, Allplan Croatia Fermoy osvojio je naslov ispred Buldožera i Svetog Vida Vrbovec.',
    category: 'Izvještaj',
    date: 'Rujan 2026.',
    readTime: '3 min čitanja',
    image: 'images/trophy-ceremony.jpg',
    author: 'Udruga Nogometne lige i turniri',
    featured: true,
    content: [
      'Nakon deset godina stanke, Malonogometna liga "Dobrosusjedski odnosi" u organizaciji Udruge "Nogometne lige i turniri" ponovno je oživjela petkom navečer na vanjskom igralištu Gimnazije u Križevcima i nadmašila sva očekivanja.',
      'Kroz 11 kola 12 momčadi postiglo je ukupno 270 pogodaka. Naslov prvaka osvojila je ekipa Allplan Croatia Fermoy s 26 osvojenih bodova (gol-razlika 30:8), koliko su skupili i drugoplasirani Buldožeri (39:7), a o prvom mjestu presudila je pobjeda Allplan Croatia Fermoya u izravnom međusobnom dvoboju.',
      'Treće mjesto s 25 bodova zauzeo je Sveti Vid Vrbovec uz niz od četiri pobjede u završnici, dok je četvrti bio MNK Fodrovec s 23 boda, ispred Caffe Bara Faraon (22) i Tehnodiv Servisa (18). Cjelokupna tablica i poveznice na Sofascore profile svih ekipa dostupne su u rubrici Raspored i tablice.',
    ],
  },
  {
    id: 'n2',
    slug: 'otvorene-prijave-za-zimski-malonogometni-turnir-krizevci-kup',
    title: 'Otvorene prijave za Zimski malonogometni turnir "Križevci Kup" – nagradni fond 6.500 €!',
    excerpt:
      'Osigurajte mjesto za svoju ekipu na središnjem dvoranskom događaju ove zime u Križevcima. Broj ekipa ograničen je na 32, a javni ždrijeb skupina održat će se 10. prosinca.',
    category: 'Prijave',
    date: '24. studenoga 2026.',
    readTime: '3 min čitanja',
    image: 'images/winter-futsal-cup.jpg',
    author: 'Organizacijski odbor NLT',
    content: [
      'Udruga "Nogometne lige i turniri" Križevci službeno otvara prijave za novo izdanje Zimskog malonogometnog turnira "Križevci Kup", koji će se od 12. prosinca 2026. do 6. siječnja 2027. održavati u Školsko-sportskoj dvorani u Križevcima.',
      'Ukupni nagradni fond iznosi 6.500 € uz prijelazni i trajne pehare te nagrade za najboljeg igrača, najboljeg strijelca, najboljeg vratara i Fair-play momčad turnira. Svakoj prijavljenoj ekipi zajamčeno je odigravanje najmanje triju utakmica u grupnoj fazi natjecanja.',
      'Prijave se zaprimaju putem online obrasca na našoj web stranici zaključno s 8. prosinca u 20:00 sati, odnosno do popunjenja kvote od 32 ekipe.',
    ],
  },
  {
    id: 'n3',
    slug: 'najava-proljetnog-kupa-mladih-nada-prigorja-2027',
    title: 'U travnju stiže Kup mladih nada Prigorja za kategorije U-9, U-11 i U-13',
    excerpt:
      'U suradnji sa školama nogometa regije pripremamo dvodnevni proljetni festival dječjeg nogometa u Križevcima s medaljama za svako prijavljeno dijete.',
    category: 'Mladi',
    date: '15. studenoga 2026.',
    readTime: '2 min čitanja',
    image: 'images/youth-cup-kids.jpg',
    author: 'Sekcija za mlade NLT',
    content: [
      'Poseban ponos naše udruge su projekti posvećeni najmlađim sportašima. Za vikend 17. i 18. travnja 2027. godine u Križevcima pripremamo Kup mladih nada Prigorja u tri uzrasne kategorije: U-9, U-11 i U-13.',
      'Osim samog natjecateljskog dijela, na terenima će biti postavljena fan-zona s poligonom nogometnih vještina, edukativnim kutkom o fair-playu i zajedničkim ručkom za sve ekipe.',
      'Škole nogometa i klubovi već sada mogu iskazati preliminarni interes putem kontakt obrasca kako bismo im na vrijeme poslali službeni poziv i propozicije.',
    ],
  },
  {
    id: 'n4',
    slug: 'objavljen-azurirani-pravilnik-i-upute-za-registraciju-igraca',
    title: 'Objavljen objedinjeni Pravilnik o natjecanjima i obrasci za novu sezonu',
    excerpt:
      'U rubrici Dokumenti preuzmite propozicije, obrasce za prijavu momčadi te suglasnosti za nastup maloljetnih igrača s navršenih 16 godina u seniorskim turnirima.',
    category: 'Obavijest',
    date: '08. studenoga 2026.',
    readTime: '2 min čitanja',
    image: 'images/summer-league-turf.jpg',
    author: 'Tajništvo udruge',
    content: [
      'Radi lakše pripreme voditelja ekipa za nadolazeća dvoranska i vanjska natjecanja, Izvršni odbor Udruge "Nogometne lige i turniri" objavio je pročišćeni tekst općih propozicija i disciplinskog pravilnika.',
      'Najvažnija novost odnosi se na pojednostavljenu digitalnu prijavu popisa igrača do 24 sata prije prve utakmice te jasnije definirana pravila akumuliranih opomena u ligaškim natjecanjima.',
      'Svi dokumenti dostupni su na podstranici O udruzi i u podnožju stranice.',
    ],
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Večernji nogomet pod reflektorima u Križevcima',
    category: 'Lige',
    event: 'Liga "Dobrosusjedski odnosi"',
    date: 'Ljeto 2026.',
    image: 'images/hero-night-tournament.jpg',
    caption: 'Atmosfera uz teren na večernjim kolima lige "Dobrosusjedski odnosi" u Križevcima.',
  },
  {
    id: 'g2',
    title: 'Dvoranski spektakl i pune tribine GŠSD-a',
    category: 'Turniri',
    event: 'Zimski Kup Križevci',
    date: 'Zima',
    image: 'images/winter-futsal-cup.jpg',
    caption: 'Napeti dvoboji završnice dvoranskog malonogometnog kupa.',
  },
  {
    id: 'g3',
    title: 'Susreti kola u ljetnom terminu',
    category: 'Lige',
    event: 'Liga "Dobrosusjedski odnosi"',
    date: 'Srpanj 2026.',
    image: 'images/summer-league-turf.jpg',
    caption: 'Dinamični dvoboji seniorskih ekipa u borbi za vrh ljestvice.',
  },
  {
    id: 'g4',
    title: 'Osmijesi i sportski pozdrav najmlađih',
    category: 'Mladi',
    event: 'Kup mladih nada Prigorja',
    date: 'Proljeće',
    image: 'images/youth-cup-kids.jpg',
    caption: 'Druženje i natjecanje mladih nogometaša uz podršku roditelja i trenera.',
  },
  {
    id: 'g5',
    title: 'Fair-play stisak ruke prije početnog udarca',
    category: 'Lige',
    event: 'Rekreativna i veteranska liga',
    date: 'Jesen 2026.',
    image: 'images/veterans-fairplay.jpg',
    caption: 'Kapetani i suci uoči susreta u duhu dobrosusjedskih odnosa i fair-playa.',
  },
  {
    id: 'g6',
    title: 'Pehari i medalje za najbolje momčadi i pojedince',
    category: 'Nagrade',
    event: 'Završnica lige "Dobrosusjedski odnosi"',
    date: 'Rujan 2026.',
    image: 'images/trophy-ceremony.jpg',
    caption: 'Svečana dodjela pehara i pojedinačnih priznanja po završetku 11. kola.',
  },
];

export const documents: AssociationDocument[] = [
  {
    id: 'doc-statut',
    title: 'Statut Udruge "Nogometne lige i turniri" Križevci',
    category: 'Udruga',
    updated: 'Siječanj 2026.',
    fileSize: 'PDF predložak • 240 KB',
    summary: 'Temeljni akt udruge kojim se uređuju ciljevi, djelatnosti u području sporta, članstvo i tijela upravljanja.',
    previewText: [
      'Članak 1. – Udruga "Nogometne lige i turniri" (skraćeno: NLT Križevci) neprofitna je sportska udruga građana sa sjedištem u Križevcima.',
      'Članak 2. – Ciljevi Udruge su promicanje, razvitak i unapređenje rekreativnog nogometa i malog nogometa (futsala), organizacija sportskih liga poput lige "Dobrosusjedski odnosi", turnira i manifestacija za djecu, mlade i odrasle.',
      'Napomena za administratora: Ovdje možete postaviti poveznicu na skenirani PDF vašeg ovjerenog Statuta u mapi public/docs/.',
    ],
  },
  {
    id: 'doc-propozicije',
    title: 'Opće propozicije malonogometnih liga i turnira',
    category: 'Propozicije',
    updated: 'Studeni 2026.',
    fileSize: 'PDF predložak • 310 KB',
    summary: 'Pravila igre, trajanje utakmica, kriteriji poretka (bodovi, međusobni omjer, gol-razlika), zamjene i disciplinske mjere.',
    previewText: [
      '1. Sustav i pravila: Utakmice se igraju po pravilima malog nogometa uz službene suce i zapisnik.',
      '2. Kriterij poretka u skupini/ligi: 1) broj osvojenih bodova, 2) međusobni omjer u izravnom susretu, 3) ukupna gol-razlika (DIFF), 4) veći broj postignutih pogodaka (GLS), 5) fair-play bodovi.',
      '3. Oprema: Sve ekipe dužne su nastupiti u jednoobraznim dresovima/majicama s vidljivim brojevima i sportskoj obući prilagođenoj podlozi.',
    ],
  },
  {
    id: 'doc-prijavnica',
    title: 'Službeni obrazac popisa igrača (Prijavnica ekipe)',
    category: 'Obrasci',
    updated: 'Studeni 2026.',
    fileSize: 'DOCX / PDF • 145 KB',
    summary: 'Tablica za upis igrača s brojevima dresova, datumom rođenja i potpisom voditelja ekipe.',
    previewText: [
      'Naziv ekipe: ___________________________ | Mjesto: ___________________________',
      'Voditelj ekipe (ime, prezime i mobitel): _______________________________________',
      'Popis igrača (1 – 12): Redni broj, Ime i prezime, Datum rođenja, Broj dresa, Vlastoručni potpis o nastupu na vlastitu odgovornost.',
    ],
  },
  {
    id: 'doc-suglasnost',
    title: 'Suglasnost roditelja/skrbnika za maloljetne sudionike',
    category: 'Obrasci',
    updated: 'Listopad 2026.',
    fileSize: 'PDF • 110 KB',
    summary: 'Obvezna pisana suglasnost za nastup na Kupu mladih nada te za igrače od 16 do 18 godina na seniorskim turnirima.',
    previewText: [
      'Ja, dolje potpisani roditelj/zakonski zastupnik, dajem suglasnost da moje dijete sudjeluje na sportskom natjecanju u organizaciji Udruge "Nogometne lige i turniri" Križevci te potvrđujem da je dijete zdravstveno sposobno za sportske napore.',
    ],
  },
];

export const faqs = [
  {
    question: 'Gdje se prate službeni rezultati i statistika lige "Dobrosusjedski odnosi"?',
    answer:
      'Pored prikaza na našoj službenoj web stranici, rezultati, tablica i pojedinačni susreti Malonogometne lige "Dobrosusjedski odnosi" dostupni su i na platformi Sofascore Minifootball – klikom na naziv bilo koje od 12 ekipa u tablici otvarate njihov profil.',
  },
  {
    question: 'Kako možemo prijaviti ekipu na nadolazeću ligu ili turnir?',
    answer:
      'Ekipu najbrže prijavljujete putem online obrasca na stranici "Prijava i kontakt". Nakon slanja obrasca automatski dobivate podatke za uplatu kotizacije (IBAN i opis plaćanja), a naše vodstvo potvrđuje vašu prijavu povratnim pozivom ili e-mailom.',
  },
  {
    question: 'Što odlučuje o poretku ako dvije ekipe imaju jednak broj bodova?',
    answer:
      'Sukladno propozicijama lige, prvi dodatni kriterij kod istog broja bodova je rezultat međusobnog susreta (primjerice, Allplan Croatia Fermoy osvojio je 1. mjesto s 26 bodova ispred Buldožera zahvaljujući pobjedi u izravnom ogledu), a zatim ukupna gol-razlika i broj postignutih golova.',
  },
  {
    question: 'Možemo li popis igrača dostaviti neposredno prije prve utakmice?',
    answer:
      'Da! Za rezervaciju mjesta u ždrijebu dovoljno je prijaviti naziv ekipe, kontakt voditelja i uplatiti kotizaciju, dok konačan popis igrača predajete za zapisničkim stolom najkasnije 30 minuta prije vaše prve utakmice.',
  },
  {
    question: 'Kako tvrtke, obrti ili kafići mogu postati sponzori ekipa ili udruge?',
    answer:
      'Brojni lokalni poduzetnici i ugostitelji već nose nazive ekipa ili podupiru nagradni fond lige. Nudimo transparentne sponzorske pakete s isticanjem logotipa uz teren u Križevcima, na web stranici i društvenim mrežama.',
  },
];
