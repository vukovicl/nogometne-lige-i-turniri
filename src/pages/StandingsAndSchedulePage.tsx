import { useId, useState, type CSSProperties } from 'react';
import { Award, Calendar, Eye, MapPin, Star, Trophy } from 'lucide-react';
import {
  knockoutPreview,
  leagueTables,
  matches,
  topScorers,
  type MatchItem,
} from '../data/siteData';
import { AccessibleTabs } from '../components/AccessibleTabs';
import { StandingsTable } from '../components/StandingsTable';
import { ModalDialog } from '../components/ModalDialog';

export function StandingsAndSchedulePage() {
  const [activeTableId, setActiveTableId] = useState(leagueTables[0].id);
  const [matchStatusFilter, setMatchStatusFilter] = useState<'sve' | 'najava' | 'odigrano'>('sve');
  const [selectedMatch, setSelectedMatch] = useState<MatchItem | null>(null);
  const scorersCaptionId = useId();

  const visibleMatches = matches.filter((m) =>
    matchStatusFilter === 'sve' ? true : m.status === matchStatusFilter
  );

  const tableTabs = leagueTables.map((table) => ({
    id: table.id,
    label: table.label,
    badge: `${table.rows.length} ekipa`,
    content: <StandingsTable table={table} />,
  }));

  const scorersMobileLabels = {
    '--label-1': '"Poredak"',
    '--label-3': '"Ekipa"',
    '--label-4': '"Natjecanje"',
    '--label-5': '"Utakmica"',
    '--label-6': '"MVP kola"',
    '--label-7': '"Pogodaka"',
  } as CSSProperties;

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="eyebrow eyebrow--gold">Službeni centar natjecanja</p>
          <h1 id="page-main-heading" tabIndex={-1} className="page-banner__title">
            Raspored, rezultati i tablice
          </h1>
          <p className="page-banner__lead">
            Pratite aktualne ljestvice križevačkih liga, najave idućih kola, službene zapisnike
            odigranih utakmica i poredak najboljih strijelaca.
          </p>
        </div>
      </section>

      {/* LIGAŠKE LJESTVICE */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Poredak momčadi</p>
              <h2 className="section-title">Tablice aktivnih liga</h2>
              <p className="section-subtitle">
                Odaberite natjecanje za prikaz broja bodova, gol-razlike i forme u zadnjih 5 kola.
              </p>
            </div>
          </div>

          <AccessibleTabs
            ariaLabel="Odabir ligaške ljestvice"
            tabs={tableTabs}
            activeId={activeTableId}
            onChange={setActiveTableId}
          />
        </div>
      </section>

      {/* RASPORED I REZULTATI UTAKMICA */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Semafor i delegiranje</p>
              <h2 className="section-title">Raspored utakmica i rezultati</h2>
              <p className="section-subtitle">
                Kliknite na gumb "Detalji / Zapisnik" za pregled strijelaca po minutama, opomena i
                igrača utakmice.
              </p>
            </div>

            <div className="filter-bar" style={{ marginBottom: 0 }} role="group" aria-label="Filtriraj utakmice">
              <button
                type="button"
                className="filter-pill"
                aria-pressed={matchStatusFilter === 'sve'}
                onClick={() => setMatchStatusFilter('sve')}
              >
                Sve utakmice
              </button>
              <button
                type="button"
                className="filter-pill"
                aria-pressed={matchStatusFilter === 'najava'}
                onClick={() => setMatchStatusFilter('najava')}
              >
                Nadolazeći raspored
              </button>
              <button
                type="button"
                className="filter-pill"
                aria-pressed={matchStatusFilter === 'odigrano'}
                onClick={() => setMatchStatusFilter('odigrano')}
              >
                Odigrani rezultati
              </button>
            </div>
          </div>

          <div className="match-list">
            {visibleMatches.map((match) => (
              <article key={match.id} className="match-card">
                <div className="match-card__info">
                  <span className="match-card__comp">{match.competitionName}</span>
                  <strong>{match.round}</strong>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} aria-hidden="true" />
                    {match.date} u {match.time} h
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} aria-hidden="true" />
                    {match.venue}
                  </span>
                </div>

                <div className="match-card__teams">
                  <div className="match-card__team match-card__team--home">{match.homeTeam}</div>
                  {match.status === 'odigrano' ? (
                    <div className="match-card__score">
                      {match.homeScore} : {match.awayScore}
                    </div>
                  ) : (
                    <div className="match-card__score match-card__score--upcoming">
                      {match.time}
                    </div>
                  )}
                  <div className="match-card__team">{match.awayTeam}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() => setSelectedMatch(match)}
                  >
                    <Eye size={16} aria-hidden="true" />
                    <span>{match.status === 'odigrano' ? 'Zapisnik' : 'Najava'}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LISTA STRIJELACA & PROJEKCIJA ZAVRŠNICE */}
      <section className="section">
        <div className="container">
          <div className="cards-grid--2 cards-grid" style={{ alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Trophy size={24} aria-hidden="true" style={{ color: 'var(--gold-600)' }} />
                <h2 className="section-title" style={{ fontSize: '2rem' }}>
                  Lista najboljih strijelaca
                </h2>
              </div>

              <div
                tabIndex={0}
                role="region"
                aria-labelledby={scorersCaptionId}
                className="table-wrapper"
              >
                <table className="standings-table" style={scorersMobileLabels}>
                  <caption id={scorersCaptionId}>
                    Vodeći strijelci i dobitnici titule igrača utakmice (MVP)
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Igrač</th>
                      <th scope="col">Ekipa</th>
                      <th scope="col">Liga</th>
                      <th scope="col">Utak.</th>
                      <th scope="col">MVP</th>
                      <th scope="col">Golovi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topScorers.map((scorer) => (
                      <tr
                        key={scorer.name}
                        className={scorer.rank <= 3 ? 'standings-row--playoff' : undefined}
                      >
                        <td>
                          <span className="pos-badge">{scorer.rank}.</span>
                        </td>
                        <th scope="row">{scorer.name}</th>
                        <td>{scorer.team}</td>
                        <td>{scorer.competition}</td>
                        <td>{scorer.matches}</td>
                        <td>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontWeight: 700,
                              color: 'var(--gold-600)',
                            }}
                          >
                            <Star size={14} aria-hidden="true" />
                            {scorer.mvpCount}
                          </span>
                        </td>
                        <td className="points-cell">{scorer.goals}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Award size={24} aria-hidden="true" style={{ color: 'var(--pitch-700)' }} />
                <h2 className="section-title" style={{ fontSize: '2rem' }}>
                  Vrh poretka – Top 4 ekipe
                </h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.15rem' }}>
                Četiri najuspješnije momčadi nakon svih 11 odigranih kola Malonogometne lige
                "Dobrosusjedski odnosi" u Križevcima:
              </p>

              <div className="bracket-grid">
                {knockoutPreview.map((bm) => (
                  <div key={bm.id} className="bracket-card">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span className="bracket-card__stage">{bm.label}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {bm.time}
                      </span>
                    </div>
                    <div className="bracket-card__slot">{bm.teamA}</div>
                    <div className="bracket-card__slot">{bm.teamB}</div>
                    {bm.note && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {bm.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL ZAPISNIKA UTAKMICE */}
      <ModalDialog
        open={Boolean(selectedMatch)}
        onClose={() => setSelectedMatch(null)}
        title={
          selectedMatch
            ? `${selectedMatch.homeTeam} – ${selectedMatch.awayTeam}`
            : 'Detalji susreta'
        }
        subtitle={
          selectedMatch
            ? `${selectedMatch.competitionName} • ${selectedMatch.round}`
            : undefined
        }
      >
        {selectedMatch && (
          <div style={{ display: 'grid', gap: '1.1rem' }}>
            <div
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: '#0b1b24',
                color: '#ffffff',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.82rem', color: '#9bd5be', marginBottom: '0.4rem' }}>
                {selectedMatch.date} u {selectedMatch.time} h • {selectedMatch.venue}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  fontWeight: 800,
                }}
              >
                {selectedMatch.status === 'odigrano'
                  ? `${selectedMatch.homeScore} : ${selectedMatch.awayScore}`
                  : 'Najava susreta'}
              </div>
              {selectedMatch.referee && (
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.35rem' }}>
                  Službene osobe / suci: {selectedMatch.referee}
                </div>
              )}
            </div>

            {selectedMatch.summary && (
              <p style={{ color: 'var(--text-secondary)' }}>{selectedMatch.summary}</p>
            )}

            {selectedMatch.sofascoreMatchUrl && (
              <div>
                <a
                  href={selectedMatch.sofascoreMatchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary btn--sm"
                >
                  Otvori službeni izvještaj utakmice na Sofascoreu
                </a>
              </div>
            )}

            {selectedMatch.events && selectedMatch.events.length > 0 && (
              <div>
                <h2
                  style={{
                    fontSize: '1.25rem',
                    textTransform: 'uppercase',
                    marginBottom: '0.65rem',
                  }}
                >
                  Kronologija zapisnika
                </h2>
                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'grid',
                    gap: '0.45rem',
                  }}
                >
                  {selectedMatch.events.map((ev, idx) => (
                    <li
                      key={`${ev.minute}-${idx}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-subtle)',
                        fontSize: '0.9rem',
                      }}
                    >
                      <span>
                        <strong style={{ marginRight: '0.5rem' }}>{ev.minute}</strong>
                        {ev.type === 'goal' && '⚽ Pogodak: '}
                        {ev.type === 'yellow' && '🟨 Žuti karton: '}
                        {ev.type === 'mvp' && '⭐ priznanje: '}
                        <strong>{ev.player}</strong>
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {ev.team === 'home' ? selectedMatch.homeTeam : selectedMatch.awayTeam}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </ModalDialog>
    </>
  );
}
