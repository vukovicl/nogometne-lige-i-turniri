import { useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import { competitions } from '../data/siteData';
import { CompetitionCard } from '../components/CompetitionCard';

const filterOptions = [
  { id: 'sve', label: 'Sva natjecanja' },
  { id: 'otvoreno', label: 'Otvorene prijave / U najavi' },
  { id: 'Turnir', label: 'Turniri' },
  { id: 'Liga', label: 'Lige' },
  { id: 'Veterani', label: 'Veterani 35+' },
  { id: 'Mladi', label: 'Djeca i mladi' },
];

const seasonalCalendar = [
  {
    season: 'Zima (Prosinac – Siječanj)',
    event: 'Zimski malonogometni turnir "Križevci Kup"',
    venue: 'Školsko-sportska dvorana Križevci',
    audience: 'Seniori i otvorena kategorija (32 ekipe)',
  },
  {
    season: 'Proljeće (Travanj)',
    event: 'Kup mladih nada Prigorja (U-9, U-11, U-13)',
    venue: 'ŠRC Križevci – vanjski tereni',
    audience: 'Škole nogometa i mlađi uzrasti',
  },
  {
    season: 'Ljeto (Svibanj – Rujan)',
    event: 'Malonogometna liga "Dobrosusjedski odnosi" & Noćni 3v3 turnir',
    venue: 'Vanjsko igralište Gimnazije u Križevcima (pod reflektorima)',
    audience: '12 seniorskih ekipa (11 kola + Sofascore praćenje)',
  },
  {
    season: 'Jesen (Rujan – Studeni)',
    event: 'Rekreativna i veteranska liga Križevci 35+',
    venue: 'Sportski park / GŠSD Križevci',
    audience: 'Veterani 35+, radni kolektivi i rekreativci',
  },
];

export function CompetitionsPage() {
  const [activeFilter, setActiveFilter] = useState('sve');
  const [query, setQuery] = useState('');

  const filteredCompetitions = competitions.filter((comp) => {
    const matchesFilter =
      activeFilter === 'sve'
        ? true
        : activeFilter === 'otvoreno'
          ? comp.status === 'prijave-u-tijeku' || comp.status === 'u-najavi'
          : comp.category === activeFilter;

    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      comp.title.toLowerCase().includes(q) ||
      comp.subtitle.toLowerCase().includes(q) ||
      comp.location.toLowerCase().includes(q);

    return matchesFilter && matchesQuery;
  });

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="eyebrow eyebrow--gold">Organizirana sportska događanja</p>
          <h1 id="page-main-heading" tabIndex={-1} className="page-banner__title">
            Nogometne lige i turniri
          </h1>
          <p className="page-banner__lead">
            Pregled svih aktualnih liga, dvoranskih kupova, noćnih turnira i natjecanja za mlađe
            uzraste u organizaciji naše udruge na području Križevaca.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.75rem',
            }}
          >
            <div className="filter-bar" style={{ marginBottom: 0 }} role="group" aria-label="Filtriraj natjecanja">
              {filterOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="filter-pill"
                  aria-pressed={activeFilter === opt.id}
                  onClick={() => setActiveFilter(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', minWidth: 'min(100%, 18rem)' }}>
              <Search
                size={17}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  insetInlineStart: '0.85rem',
                  insetBlockStart: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pretraži turnir ili ligu..."
                aria-label="Pretraži natjecanja"
                style={{
                  inlineSize: '100%',
                  padding: '0.58rem 0.9rem 0.58rem 2.45rem',
                  borderRadius: '999px',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--bg-surface)',
                }}
              />
            </div>
          </div>

          {filteredCompetitions.length === 0 ? (
            <div
              style={{
                padding: '2.5rem',
                textAlign: 'center',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
              }}
            >
              <h2 style={{ fontSize: '1.5rem' }}>Nema natjecanja za odabrani kriterij</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                Pokušajte poništiti filter ili upisati drugi pojam pretrage.
              </p>
              <button
                type="button"
                className="btn btn--outline btn--sm"
                style={{ marginTop: '1rem' }}
                onClick={() => {
                  setActiveFilter('sve');
                  setQuery('');
                }}
              >
                Prikaži sva natjecanja
              </button>
            </div>
          ) : (
            <div className="cards-grid">
              {filteredCompetitions.map((comp) => (
                <CompetitionCard key={comp.id} competition={comp} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GODIŠNJI KALENDAR */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Cjelogodišnji ciklus</p>
              <h2 className="section-title">Okvirni godišnji kalendar događanja</h2>
              <p className="section-subtitle">
                Planirajte nastup svoje ekipe unaprijed kroz sva četiri godišnja doba u Križevcima.
              </p>
            </div>
          </div>

          <div className="info-grid">
            {seasonalCalendar.map((item) => (
              <div key={item.season} className="info-card">
                <div className="info-card__icon">
                  <Calendar size={20} aria-hidden="true" />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--pitch-700)' }}>
                  {item.season}
                </span>
                <h3 style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>{item.event}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <strong>Lokacija:</strong> {item.venue}
                </p>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>{item.audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
