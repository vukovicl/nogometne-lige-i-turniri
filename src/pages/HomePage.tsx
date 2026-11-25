import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Globe,
  Shield,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import {
  associationInfo,
  competitions,
  leagueTables,
  newsArticles,
  season2026Awards,
} from '../data/siteData';
import { assetUrl } from '../utils/assetUrl';
import { CompetitionCard } from '../components/CompetitionCard';
import { StandingsTable } from '../components/StandingsTable';

export function HomePage() {
  const featuredCompetitions = competitions.slice(0, 3);
  const primaryTable = leagueTables[0];
  const latestNews = newsArticles.slice(0, 4);

  return (
    <>
      {/* HERO SEKCIJA */}
      <section className="hero">
        <div className="hero__bg">
          <img
            src={assetUrl('images/hero-night-tournament.jpg')}
            alt="Večernja malonogometna utakmica pod reflektorima"
            width={1600}
            height={900}
            fetchPriority="high"
          />
        </div>

        <div className="container hero__grid">
          <div>
            <div className="hero__badge">
              <Sparkles size={15} aria-hidden="true" />
              <span>{associationInfo.englishName} • Hrvatska</span>
            </div>

            <h1 id="page-main-heading" tabIndex={-1} className="hero__title">
              Nogometne <span>lige i turniri</span>
            </h1>

            <p className="hero__lead">{associationInfo.heroLead}</p>

            <div className="hero__actions">
              <Link
                to="/prijava-i-kontakt"
                viewTransition
                className="btn btn--accent btn--lg"
              >
                <Trophy size={20} aria-hidden="true" />
                <span>Prijavi ekipu ili pokreni suradnju</span>
              </Link>
              <Link
                to="/o-udruzi"
                viewTransition
                className="btn btn--outline-light btn--lg"
              >
                <span>O udruzi i naša priča</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <div className="hero__stats">
              {associationInfo.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="hero-stat__value">{stat.value}</div>
                  <div className="hero-stat__label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Desni info panel: Ostvarena sezona 2026. i širenje projekata */}
          <aside className="hero-spotlight" aria-label="Istaknuto iz rada udruge">
            <div className="hero-spotlight__top">
              <div>
                <p className="eyebrow eyebrow--light" style={{ marginBottom: '0.2rem' }}>
                  Sezona 2026. • 12 ekipa / 11 kola
                </p>
                <h2 style={{ fontSize: '1.45rem', textTransform: 'uppercase' }}>
                  Dobrosusjedski odnosi
                </h2>
              </div>
              <span className="status-chip status-chip--prijave-u-tijeku">Laureati 2026.</span>
            </div>

            <div style={{ display: 'grid', gap: '0.55rem', marginBottom: '1rem' }}>
              {season2026Awards.slice(0, 6).map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.55rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    fontSize: '0.86rem',
                  }}
                >
                  <span style={{ color: '#9bd5be', fontWeight: 600 }}>{item.title}</span>
                  <strong style={{ textAlign: 'end' }}>
                    {item.winner}
                    {item.teamOrNote && item.title.startsWith('Najbolji')
                      ? ` (${item.teamOrNote})`
                      : ''}
                  </strong>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(18, 163, 107, 0.14)',
                border: '1px solid rgba(110, 231, 183, 0.3)',
                marginBottom: '1rem',
                fontSize: '0.83rem',
                color: '#d9f2e6',
              }}
            >
              <Globe
                size={15}
                aria-hidden="true"
                style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }}
              />
              Otvoreni smo za organizaciju liga, kupova i turnira u suradnji s gradovima i klubovima
              diljem Hrvatske.
            </div>

            <Link
              to="/raspored-i-tablice"
              viewTransition
              className="btn btn--primary btn--full"
            >
              <span>Pogledaj cijelu tablicu i priznanja</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      {/* NATJECANJA I PROGRAMI UDRUGE */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Naši projekti i programi</p>
              <h2 className="section-title">Lige, turniri i razvoj amaterskog nogometa</h2>
              <p className="section-subtitle">
                Od uspješno održane povratničke lige u 2026. godini i sačuvane povijesne arhive do
                razvoja partnerskih rekreativnih liga i turnira diljem Hrvatske.
              </p>
            </div>
            <Link to="/natjecanja" viewTransition className="btn btn--outline">
              <span>Svi programi i arhiva ({competitions.length})</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="cards-grid">
            {featuredCompetitions.map((comp) => (
              <CompetitionCard key={comp.id} competition={comp} />
            ))}
          </div>
        </div>
      </section>

      {/* TABLICA I PRIČA O UDRUZI */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Rezultati i poredak</p>
              <h2 className="section-title">Tablica lige Dobrosusjedski odnosi 2026.</h2>
              <p className="section-subtitle">
                Pregled vodećih momčadi povratničke sezone za koju je udruga vodila podatke na
                Sofascoreu.
              </p>
            </div>
            <Link to="/raspored-i-tablice" viewTransition className="btn btn--primary">
              <span>Svih 12 momčadi i arhiva susreta</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="cards-grid--2 cards-grid" style={{ alignItems: 'start' }}>
            <div>
              <StandingsTable table={primaryTable} compact />
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  display: 'grid',
                  gap: '0.85rem',
                }}
              >
                <span className="eyebrow" style={{ marginBottom: 0 }}>
                  O udruzi i povijesti natjecanja
                </span>
                <h3 style={{ fontSize: '1.55rem', textTransform: 'uppercase' }}>
                  Od dokumentirane 2015. godine do nacionalne vizije udruge iz 2026.
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Udruga <strong>Nogometne lige i turniri</strong> registrirana je u travnju 2026.
                  sa sjedištem u Gračini i voditeljima <strong>Alenom Miholićem</strong> i{' '}
                  <strong>Matijom Vukovićem</strong>. Uz nove projekte diljem Hrvatske, čuvamo i
                  vrijednu priču o ligi Dobrosusjedski odnosi – od 24 momčadi i trojice
                  reprezentativaca na Europskom prvenstvu u Vrsaru 2015. te dvije lige iz 2016., pa
                  sve do irske priče s klubom FC Croatia Fermoy i povratničke sezone 2026.
                </p>
                <div>
                  <Link
                    to="/o-udruzi"
                    viewTransition
                    className="btn btn--outline btn--sm"
                  >
                    <BookOpen size={16} aria-hidden="true" />
                    <span>Pročitaj cijelu priču o udruzi i ligi</span>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  background: 'linear-gradient(135deg, #072219 0%, #0d3a2c 100%)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.45rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <span className="eyebrow eyebrow--gold" style={{ marginBottom: '0.2rem' }}>
                    Suradnja diljem Hrvatske
                  </span>
                  <h3 style={{ fontSize: '1.45rem', textTransform: 'uppercase' }}>
                    Želite pokrenuti ligu ili turnir u svom gradu ili općini?
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#cde2d9', marginTop: '0.25rem' }}>
                    Povezujemo sportske organizacije, rekreativce i mlade kroz provjereni sustav
                    natjecanja.
                  </p>
                </div>
                <Link to="/prijava-i-kontakt?tab=upit" viewTransition className="btn btn--accent btn--sm">
                  Dogovori suradnju
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VRIJEDNOSTI I DJELATNOSTI UDRUGE */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--gold">Misija i djelatnosti</p>
              <h2 className="section-title">Na čemu temeljimo rad udruge?</h2>
              <p className="section-subtitle">
                Razvoj amaterskog nogometa, digitalna transparentnost, povezivanje sportskih
                organizacija i uključivanje mladih u sport.
              </p>
            </div>
          </div>

          <div className="info-grid">
            {associationInfo.values.map((val, index) => {
              const icons = [
                <Globe key="i0" size={22} aria-hidden="true" />,
                <CheckCircle2 key="i1" size={22} aria-hidden="true" />,
                <Users key="i2" size={22} aria-hidden="true" />,
                <Award key="i3" size={22} aria-hidden="true" />,
                <Shield key="i4" size={22} aria-hidden="true" />,
              ];
              return (
                <div key={val.title} className="info-card">
                  <div className="info-card__icon">{icons[index % icons.length]}</div>
                  <h3 style={{ fontSize: '1.35rem', textTransform: 'uppercase' }}>{val.title}</h3>
                  <p style={{ color: 'var(--text-on-dark-muted)', fontSize: '0.94rem' }}>
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RUBRIKA NOVOSTI (4 ČLANKA) */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Aktualnosti i povijesni zapisi</p>
              <h2 className="section-title">Novosti i priče iz arhive</h2>
            </div>
            <Link to="/vijesti" viewTransition className="btn btn--outline">
              <span>Sve objave ({newsArticles.length})</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="cards-grid">
            {latestNews.map((article) => (
              <article key={article.id} className="comp-card">
                <div className="comp-card__media">
                  <img
                    src={assetUrl(article.image)}
                    alt={article.title}
                    width={800}
                    height={450}
                    loading="lazy"
                  />
                  <div className="comp-card__badges">
                    <span className="category-tag">{article.category}</span>
                  </div>
                </div>
                <div className="comp-card__body">
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {article.date} • {article.readTime}
                  </p>
                  <h3 className="comp-card__title" style={{ fontSize: '1.4rem' }}>
                    <Link to={`/vijesti/${article.slug}`} viewTransition>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="comp-card__subtitle">{article.excerpt}</p>
                  <div className="comp-card__footer">
                    <Link
                      to={`/vijesti/${article.slug}`}
                      viewTransition
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontWeight: 700,
                        color: 'var(--pitch-700)',
                      }}
                    >
                      <span>Pročitaj više</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
