import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Shield,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import {
  associationInfo,
  competitions,
  leagueTables,
  matches,
  newsArticles,
} from '../data/siteData';
import { assetUrl } from '../utils/assetUrl';
import { CompetitionCard } from '../components/CompetitionCard';
import { StandingsTable } from '../components/StandingsTable';

export function HomePage() {
  const featuredCompetitions = competitions.slice(0, 3);
  const upcomingMatches = matches.filter((m) => m.status === 'najava').slice(0, 3);
  const recentResults = matches.filter((m) => m.status === 'odigrano').slice(0, 2);
  const primaryTable = leagueTables[0];
  const latestNews = newsArticles.slice(0, 3);

  return (
    <>
      {/* HERO SEKCIJA */}
      <section className="hero">
        <div className="hero__bg">
          <img
            src={assetUrl('images/hero-night-tournament.jpg')}
            alt="Večernja malonogometna utakmica pod reflektorima u Križevcima"
            width={1600}
            height={900}
            fetchPriority="high"
          />
        </div>

        <div className="container hero__grid">
          <div>
            <div className="hero__badge">
              <Sparkles size={15} aria-hidden="true" />
              <span>{associationInfo.region}</span>
            </div>

            <h1 id="page-main-heading" tabIndex={-1} className="hero__title">
              Nogometne lige i turniri <span>Križevci</span>
            </h1>

            <p className="hero__lead">{associationInfo.heroLead}</p>

            <div className="hero__actions">
              <Link
                to="/prijava-i-kontakt?natjecanje=zimski-kup"
                viewTransition
                className="btn btn--accent btn--lg"
              >
                <Trophy size={20} aria-hidden="true" />
                <span>Prijavi ekipu na Zimski Kup</span>
              </Link>
              <Link
                to="/natjecanja"
                viewTransition
                className="btn btn--outline-light btn--lg"
              >
                <span>Istraži sva natjecanja</span>
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

          {/* Desni Matchday & Prijave info panel */}
          <aside className="hero-spotlight" aria-label="Aktualno na terenima u Križevcima">
            <div className="hero-spotlight__top">
              <div>
                <p className="eyebrow eyebrow--light" style={{ marginBottom: '0.2rem' }}>
                  Idući sportski vikend
                </p>
                <h2 style={{ fontSize: '1.45rem', textTransform: 'uppercase' }}>
                  Najava kola i prijave
                </h2>
              </div>
              <span className="status-chip status-chip--prijave-u-tijeku">Aktualno</span>
            </div>

            {upcomingMatches.slice(0, 2).map((match) => (
              <div key={match.id} className="hero-spotlight__match">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: '#9bd5be',
                  }}
                >
                  <span>{match.competitionName}</span>
                  <span>
                    {match.date} • {match.time}
                  </span>
                </div>
                <div className="hero-spotlight__teams">
                  <span>{match.homeTeam}</span>
                  <span className="hero-spotlight__vs">VS</span>
                  <span style={{ textAlign: 'end' }}>{match.awayTeam}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-on-dark-muted)' }}>
                  <MapPin
                    size={13}
                    aria-hidden="true"
                    style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px' }}
                  />
                  {match.venue}
                </div>
              </div>
            ))}

            <div
              style={{
                padding: '0.95rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(234, 179, 8, 0.12)',
                border: '1px solid rgba(234, 179, 8, 0.35)',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#fde047',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                }}
              >
                <Clock size={16} aria-hidden="true" />
                <span>Zimski Kup Križevci – ostalo još 8 slobodnih mjesta!</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#e2e8f0', marginTop: '0.25rem' }}>
                Prijave traju do 08.12.2026. Nagradni fond iznosi 6.500 € uz TV/stream završnice.
              </p>
            </div>

            <Link
              to="/raspored-i-tablice"
              viewTransition
              className="btn btn--primary btn--full"
            >
              <Calendar size={18} aria-hidden="true" />
              <span>Cijeli raspored, rezultati i tablice</span>
            </Link>
          </aside>
        </div>
      </section>

      {/* ISTAKNUTA NATJECANJA */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Kalendar događanja u Križevcima</p>
              <h2 className="section-title">Aktivne lige i nadolazeći turniri</h2>
              <p className="section-subtitle">
                Od dvoranskog zimskog spektakla i ljetne lige pod reflektorima do turnira za
                veterane i najmlađe uzraste Prigorja.
              </p>
            </div>
            <Link to="/natjecanja" viewTransition className="btn btn--outline">
              <span>Sva natjecanja ({competitions.length})</span>
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

      {/* BRZI PREGLED TABLICE I REZULTATA */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Statistika i rezultati uživo</p>
              <h2 className="section-title">Stanje na ljestvici i semafor kola</h2>
              <p className="section-subtitle">
                Pratite aktualni poredak vodećih ekipa i najnovije rezultate odigranih susreta.
              </p>
            </div>
            <Link to="/raspored-i-tablice" viewTransition className="btn btn--primary">
              <span>Sve tablice i lista strijelaca</span>
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
                  padding: '1.35rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.35rem',
                    textTransform: 'uppercase',
                    marginBottom: '0.9rem',
                  }}
                >
                  Posljednji odigrani susreti
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {recentResults.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        padding: '0.9rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-light)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          marginBottom: '0.4rem',
                        }}
                      >
                        <strong style={{ color: 'var(--pitch-700)' }}>{m.competitionName}</strong>
                        <span>
                          {m.round} • {m.date}
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr auto 1fr',
                          alignItems: 'center',
                          gap: '0.6rem',
                          fontWeight: 700,
                        }}
                      >
                        <span>{m.homeTeam}</span>
                        <span className="match-card__score">
                          {m.homeScore} : {m.awayScore}
                        </span>
                        <span style={{ textAlign: 'end' }}>{m.awayTeam}</span>
                      </div>
                      {m.summary && (
                        <p
                          style={{
                            fontSize: '0.84rem',
                            color: 'var(--text-secondary)',
                            marginTop: '0.5rem',
                          }}
                        >
                          {m.summary}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                  <Link
                    to="/raspored-i-tablice"
                    viewTransition
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontWeight: 700,
                      color: 'var(--pitch-700)',
                    }}
                  >
                    <span>Otvori detaljne zapisnike sa strijelcima</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div
                style={{
                  background: 'linear-gradient(135deg, #072219 0%, #0d3a2c 100%)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.4rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <span className="eyebrow eyebrow--gold" style={{ marginBottom: '0.2rem' }}>
                    Udruga NLT Križevci
                  </span>
                  <h3 style={{ fontSize: '1.45rem', textTransform: 'uppercase' }}>
                    Želite uključiti svoju tvrtku, kvart ili klub?
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#cde2d9', marginTop: '0.25rem' }}>
                    Upoznajte našu udrugu, preuzmite pravilnike ili nam se javite za suradnju.
                  </p>
                </div>
                <Link to="/o-udruzi" viewTransition className="btn btn--accent btn--sm">
                  Više o udruzi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VRIJEDNOSTI UDRUGE (DARK SEKCIJA) */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--gold">Standard organizacije</p>
              <h2 className="section-title">Što donosi Udruga "Nogometne lige i turniri"?</h2>
              <p className="section-subtitle">
                Naš je cilj svakom rekreativcu, djetetu i gledatelju u Križevcima pružiti osjećaj
                velikog sportskog natjecanja.
              </p>
            </div>
          </div>

          <div className="info-grid">
            {associationInfo.values.map((val, index) => {
              const icons = [
                <CheckCircle2 key="i0" size={22} aria-hidden="true" />,
                <Users key="i1" size={22} aria-hidden="true" />,
                <Award key="i2" size={22} aria-hidden="true" />,
                <Shield key="i3" size={22} aria-hidden="true" />,
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

      {/* NAJNOVIJE VIJESTI */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Novosti iz udruge</p>
              <h2 className="section-title">Vijesti, izvještaji i najave</h2>
            </div>
            <Link to="/vijesti" viewTransition className="btn btn--outline">
              <span>Sve obavijesti</span>
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
                      <span>Pročitaj članak</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Partneri i pokrovitelji */}
          <div
            style={{
              marginTop: '3.5rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border-light)',
            }}
          >
            <p
              className="eyebrow"
              style={{ display: 'block', textAlign: 'center', marginBottom: '1.25rem' }}
            >
              Prijatelji sporta, pokrovitelji i partneri u Križevcima
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 11rem), 1fr))',
                gap: '0.85rem',
              }}
            >
              {associationInfo.partners.map((partner) => (
                <div
                  key={partner.name}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{partner.name}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {partner.tier}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
