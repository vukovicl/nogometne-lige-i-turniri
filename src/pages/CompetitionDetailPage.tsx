import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  MapPin,
  ShieldAlert,
  Trophy,
  Users,
} from 'lucide-react';
import { competitions, leagueTables, matches } from '../data/siteData';
import { assetUrl } from '../utils/assetUrl';
import { StandingsTable } from '../components/StandingsTable';

export function CompetitionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const competition = competitions.find((c) => c.slug === slug);

  if (!competition) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center', paddingBlock: '3rem' }}>
          <h1 id="page-main-heading" tabIndex={-1} className="section-title">
            Natjecanje nije pronađeno
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Tražena liga ili turnir ne postoji ili je poveznica promijenjena.
          </p>
          <Link to="/natjecanja" viewTransition className="btn btn--primary" style={{ marginTop: '1.5rem' }}>
            Povratak na sva natjecanja
          </Link>
        </div>
      </section>
    );
  }

  const relatedTable = leagueTables.find((t) => t.competitionSlug === competition.slug);
  const relatedMatches = matches.filter((m) => m.competitionId === competition.id);
  const hasCapacity =
    typeof competition.maxTeams === 'number' &&
    typeof competition.registeredTeams === 'number' &&
    competition.maxTeams > 0;
  const fillPercent = hasCapacity
    ? Math.min(100, Math.round(((competition.registeredTeams || 0) / (competition.maxTeams || 1)) * 100))
    : 0;

  return (
    <>
      <section className="hero" style={{ paddingBlock: '2.75rem 3.5rem' }}>
        <div className="hero__bg">
          <img
            src={assetUrl(competition.image)}
            alt={competition.title}
            width={1600}
            height={900}
            fetchPriority="high"
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link
            to="/natjecanja"
            viewTransition
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#a7f3d0',
              fontWeight: 600,
              fontSize: '0.9rem',
              marginBottom: '1.25rem',
            }}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Svi programi i natjecanja</span>
          </Link>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.85rem' }}>
            <span className="category-tag">{competition.category}</span>
            <span className={`status-chip status-chip--${competition.status}`}>
              {competition.statusLabel}
            </span>
          </div>

          <h1
            id="page-main-heading"
            tabIndex={-1}
            className="page-banner__title"
            style={{ maxWidth: '48rem' }}
          >
            {competition.title}
          </h1>
          <p className="page-banner__lead">{competition.subtitle}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginTop: '1.75rem' }}>
            {competition.status !== 'zavrseno' && (
              <Link
                to={`/prijava-i-kontakt?natjecanje=${encodeURIComponent(competition.id)}`}
                viewTransition
                className="btn btn--accent"
              >
                <Trophy size={18} aria-hidden="true" />
                <span>Prijavi ekipu ili pošalji upit</span>
              </Link>
            )}
            <Link to="/raspored-i-tablice" viewTransition className="btn btn--outline-light">
              Rezultati i tablica
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.55fr) minmax(0, 1fr)',
              gap: '2rem',
              alignItems: 'start',
            }}
            className="detail-layout-grid"
          >
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.6rem',
                }}
              >
                <h2 style={{ fontSize: '1.65rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Opis i značajke
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem' }}>
                  {competition.description}
                </p>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    textTransform: 'uppercase',
                    marginTop: '1.5rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  Ključne točke
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.6rem' }}>
                  {competition.highlights.map((item) => (
                    <li
                      key={item}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}
                    >
                      <CheckCircle2
                        size={18}
                        aria-hidden="true"
                        style={{ color: 'var(--pitch-700)', flexShrink: 0, marginTop: '0.2rem' }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.6rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                  <Award size={22} aria-hidden="true" style={{ color: 'var(--gold-600)' }} />
                  <h2 style={{ fontSize: '1.6rem', textTransform: 'uppercase' }}>
                    Poredak, nagrade i priznanja
                  </h2>
                </div>
                <div style={{ display: 'grid', gap: '0.7rem' }}>
                  {competition.prizes.map((p) => (
                    <div
                      key={p.place}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-light)',
                      }}
                    >
                      <strong style={{ color: 'var(--pitch-900)' }}>{p.place}</strong>
                      <span style={{ fontWeight: 600 }}>{p.reward}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.6rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                  <ShieldAlert size={22} aria-hidden="true" style={{ color: 'var(--pitch-700)' }} />
                  <h2 style={{ fontSize: '1.6rem', textTransform: 'uppercase' }}>
                    Pravila i ustroj natjecanja
                  </h2>
                </div>
                <ul style={{ margin: 0, paddingInlineStart: '1.25rem', display: 'grid', gap: '0.55rem' }}>
                  {competition.rulesSummary.map((rule) => (
                    <li key={rule} style={{ color: 'var(--text-secondary)' }}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {relatedTable && (
                <div>
                  <h2 style={{ fontSize: '1.75rem', textTransform: 'uppercase', marginBottom: '0.9rem' }}>
                    Službena tablica natjecanja
                  </h2>
                  <StandingsTable table={relatedTable} />
                </div>
              )}
            </div>

            <aside style={{ display: 'grid', gap: '1.25rem' }}>
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'grid',
                  gap: '0.95rem',
                }}
              >
                <h2 style={{ fontSize: '1.45rem', textTransform: 'uppercase' }}>
                  Sažetak informacija
                </h2>

                {hasCapacity && (
                  <div className="capacity-bar">
                    <div className="capacity-bar__label">
                      <span>Sudionici</span>
                      <span>
                        {competition.registeredTeams} / {competition.maxTeams} momčadi
                      </span>
                    </div>
                    <div className="capacity-bar__track" aria-hidden="true">
                      <div className="capacity-bar__fill" style={{ width: `${fillPercent}%` }} />
                    </div>
                  </div>
                )}

                <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.92rem' }}>
                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Calendar size={18} aria-hidden="true" style={{ color: 'var(--pitch-700)', flexShrink: 0 }} />
                    <div>
                      <strong>Razdoblje / Termin:</strong>
                      <div style={{ color: 'var(--text-secondary)' }}>{competition.dates}</div>
                    </div>
                  </div>

                  {competition.registrationDeadline && (
                    <div style={{ display: 'flex', gap: '0.65rem' }}>
                      <Clock size={18} aria-hidden="true" style={{ color: 'var(--gold-600)', flexShrink: 0 }} />
                      <div>
                        <strong>Rok za prijavu:</strong>
                        <div style={{ color: 'var(--text-secondary)' }}>
                          {competition.registrationDeadline}
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <MapPin size={18} aria-hidden="true" style={{ color: 'var(--pitch-700)', flexShrink: 0 }} />
                    <div>
                      <strong>Područje i podloga:</strong>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        {competition.location} ({competition.surface})
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Users size={18} aria-hidden="true" style={{ color: 'var(--pitch-700)', flexShrink: 0 }} />
                    <div>
                      <strong>Format:</strong>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        {competition.format} • {competition.matchDuration}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Coins size={18} aria-hidden="true" style={{ color: 'var(--pitch-700)', flexShrink: 0 }} />
                    <div>
                      <strong>Uvjeti sudjelovanja:</strong>
                      <div style={{ color: 'var(--text-secondary)' }}>{competition.entryFee}</div>
                    </div>
                  </div>
                </div>

                {competition.status !== 'zavrseno' && (
                  <Link
                    to={`/prijava-i-kontakt?natjecanje=${encodeURIComponent(competition.id)}`}
                    viewTransition
                    className="btn btn--primary btn--full"
                  >
                    Ispuni prijavu ili pošalji upit
                  </Link>
                )}
              </div>

              {relatedMatches.length > 0 && (
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.4rem',
                    display: 'grid',
                    gap: '0.75rem',
                  }}
                >
                  <h3 style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>
                    Zabilježeni susreti
                  </h3>
                  {relatedMatches.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-subtle)',
                        fontSize: '0.88rem',
                      }}
                    >
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        {m.round} • {m.date}
                      </div>
                      <div style={{ fontWeight: 700, marginTop: '0.2rem' }}>
                        {m.homeTeam}{' '}
                        {typeof m.homeScore === 'number' && typeof m.awayScore === 'number'
                          ? `${m.homeScore}:${m.awayScore}`
                          : '–'}{' '}
                        {m.awayTeam}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 58em) {
          .detail-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
