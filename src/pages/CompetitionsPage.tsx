import { useState } from 'react';
import { Globe, Search, Trophy, Users, ShieldCheck } from 'lucide-react';
import { competitions } from '../data/siteData';
import { CompetitionCard } from '../components/CompetitionCard';

const filterOptions = [
  { id: 'sve', label: 'Svi programi i izdanja' },
  { id: 'otvoreno', label: 'Otvoreno / U pripremi' },
  { id: 'Liga', label: 'Lige' },
  { id: 'Turnir', label: 'Turniri' },
  { id: 'Mladi', label: 'Djeca i mladi' },
  { id: 'Arhiva', label: 'Povijesna arhiva' },
];

const programPillars = [
  {
    step: 'Gradske i rekreativne lige',
    title: 'Organizacija ligaških natjecanja u Hrvatskoj',
    detail: 'Cjelovita priprema propozicija, delegiranja, suđenja i digitalnog praćenja statistike u suradnji s lokalnim sredinama.',
    icon: <Globe size={20} aria-hidden="true" />,
  },
  {
    step: 'Kupovi i vikend turniri',
    title: 'Dvoranski i vanjski malonogometni turniri',
    detail: 'Natjecanja po skupinama i eliminacijskom sustavu za seniorske, kvartovske i korporativne ekipe iz cijele Hrvatske.',
    icon: <Trophy size={20} aria-hidden="true" />,
  },
  {
    step: 'Razvoj mladih sportaša',
    title: 'Uključivanje djece i mladih u sport',
    detail: 'Turniri i sportski susreti za škole nogometa s fokusom na igru, zdravlje i učenje fair playa bez pritiska rezultata.',
    icon: <Users size={20} aria-hidden="true" />,
  },
  {
    step: 'Međuregionalno povezivanje',
    title: 'Suradnja sportskih udruga i klubova',
    detail: 'Povezivanje pobjednika različitih liga kroz revijalne i kup susrete po uzoru na ranije županijske oglede prvaka.',
    icon: <ShieldCheck size={20} aria-hidden="true" />,
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
          <p className="eyebrow eyebrow--gold">Sportski projekti i natjecanja</p>
          <h1 id="page-main-heading" tabIndex={-1} className="page-banner__title">
            Lige, turniri i arhiva natjecanja
          </h1>
          <p className="page-banner__lead">
            Pregled održanih sezona, povijesne arhive te programa udruge usmjerenih na razvoj i
            organizaciju malonogometnih liga i turnira diljem Hrvatske.
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
                placeholder="Pretraži ligu, turnir ili arhivu..."
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
              <h2 style={{ fontSize: '1.5rem' }}>Nema rezultata za odabrani kriterij</h2>
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
                Prikaži sve programe
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

      <section className="section section--subtle">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Nacionalni smjer razvoja</p>
              <h2 className="section-title">Područja organizacije natjecanja</h2>
              <p className="section-subtitle">
                Model udruge prilagođen je suradnji s klubovima, gradovima, općinama i sportskim
                centrima u cijeloj Hrvatskoj.
              </p>
            </div>
          </div>

          <div className="info-grid">
            {programPillars.map((item) => (
              <div key={item.title} className="info-card">
                <div className="info-card__icon">{item.icon}</div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--pitch-700)' }}>
                  {item.step}
                </span>
                <h3 style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>{item.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
