import { useId, useState, type CSSProperties } from 'react';
import { Award, Calendar, Eye, History, MapPin, Trophy } from 'lucide-react';
import {
  leagueTables,
  matches,
  season2026Awards,
  type MatchItem,
} from '../data/siteData';
import { StandingsTable } from '../components/StandingsTable';
import { ModalDialog } from '../components/ModalDialog';

export function StandingsAndSchedulePage() {
  const [matchStatusFilter, setMatchStatusFilter] = useState<'sve' | 'odigrano' | 'arhiva'>('sve');
  const [selectedMatch, setSelectedMatch] = useState<MatchItem | null>(null);
  const awardsCaptionId = useId();

  const visibleMatches = matches.filter((m) =>
    matchStatusFilter === 'sve' ? true : m.status === matchStatusFilter
  );

  const awardsMobileLabels = {
    '--label-1': '"Priznanje"',
    '--label-3': '"Momčad / Napomena"',
  } as CSSProperties;

  const archiveMilestones = [
    {
      period: 'Sezona 2015.',
      title: '24 momčadi i trojica igrača na EP-u u Vrsaru',
      text: 'U lokalnom izboru za selekciju u Ivanić-Gradu sudjelovalo je 336 igrača, a Aleksandar Korenika, Stjepan Korenika i Antonio Picig uvršteni su na popis reprezentacije za EP.',
    },
    {
      period: '19. ožujka 2016.',
      title: 'Županijski mininogometni kup prvaka',
      text: 'Caffe bar Bonus kao pobjednik lige odmjerio je snage s koprivničkim prvakom Petgrad/OPG Radiček (0:2, Galinec i Jagić).',
    },
    {
      period: 'Ljeto 2016.',
      title: '17 momčadi u dvije jakosne skupine',
      text: 'Devet ekipa u prvoj i osam u drugoj ligi igralo je jednokružno na terenima u Križevcima i kod Osnovne škole Kalnik.',
    },
    {
      period: 'Lipanj 2021.',
      title: 'FC Croatia Fermoy – 14 pobjeda u Irskoj',
      text: 'Klub čiji je suutemeljitelj Alen Miholić osvojio je Leisure League u Corku u konkurenciji 8 klubova s maksimalna 42 boda.',
    },
  ];

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="eyebrow eyebrow--gold">Rezultati, poredak i sportska arhiva</p>
          <h1 id="page-main-heading" tabIndex={-1} className="page-banner__title">
            Rezultati, tablica i priznanja
          </h1>
          <p className="page-banner__lead">
            Službeni poredak momčadi, dobitnici pojedinačnih i fair play priznanja te dokumentirani
            susreti iz sezona 2026., 2016. i 2015.
          </p>
        </div>
      </section>

      {/* TABLICA LIGE */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Sezona 2026. • Sofascore evidencija</p>
              <h2 className="section-title">Tablica lige Dobrosusjedski odnosi</h2>
              <p className="section-subtitle">
                Poredak svih 12 ekipa nakon 11 odigranih kola uz izravne poveznice na profile
                momčadi i pojedinačne susrete na platformi Sofascore.
              </p>
            </div>
          </div>

          <StandingsTable table={leagueTables[0]} />
        </div>
      </section>

      {/* SLUŽBENA PRIZNANJA 2026. & ARHIVSKI NAGLASCI */}
      <section className="section section--subtle">
        <div className="container">
          <div className="cards-grid--2 cards-grid" style={{ alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Trophy size={24} aria-hidden="true" style={{ color: 'var(--gold-600)' }} />
                <h2 className="section-title" style={{ fontSize: '2rem' }}>
                  Priznanja u sezoni 2026.
                </h2>
              </div>

              <div
                tabIndex={0}
                role="region"
                aria-labelledby={awardsCaptionId}
                className="table-wrapper"
              >
                <table className="standings-table" style={awardsMobileLabels}>
                  <caption id={awardsCaptionId}>
                    Službeni dobitnici ekipnih i pojedinačnih priznanja (rujan 2026.)
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Priznanje</th>
                      <th scope="col">Dobitnik</th>
                      <th scope="col">Momčad / Napomena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {season2026Awards.map((aw, index) => (
                      <tr
                        key={aw.title}
                        className={index === 0 ? 'standings-row--champion' : undefined}
                      >
                        <td style={{ textAlign: 'start', fontWeight: 700 }}>{aw.title}</td>
                        <th scope="row">{aw.winner}</th>
                        <td style={{ textAlign: 'start', color: 'var(--text-secondary)' }}>
                          {aw.teamOrNote || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <History size={24} aria-hidden="true" style={{ color: 'var(--pitch-700)' }} />
                <h2 className="section-title" style={{ fontSize: '2rem' }}>
                  Zabilježeno u arhivi (2015. – 2021.)
                </h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.15rem' }}>
                Provjereni rezultatski i povijesni trenuci povezani s poviješću lige i njezinih
                organizatora:
              </p>

              <div className="bracket-grid">
                {archiveMilestones.map((item) => (
                  <div key={item.period} className="bracket-card" style={{ background: 'var(--bg-surface)' }}>
                    <span className="bracket-card__stage">{item.period}</span>
                    <strong style={{ fontSize: '1rem' }}>{item.title}</strong>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOKUMENTIRANI SUSRETI 2026. I ARHIVA */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Pregled izdvojenih utakmica</p>
              <h2 className="section-title">Susreti sezone 2026. i povijesne arhive</h2>
              <p className="section-subtitle">
                Kliknite na pojedini susret za prikaz konteksta kola, strijelaca ili izravnu
                poveznicu na Sofascore zapisnik.
              </p>
            </div>

            <div className="filter-bar" style={{ marginBottom: 0 }} role="group" aria-label="Filtriraj utakmice">
              <button
                type="button"
                className="filter-pill"
                aria-pressed={matchStatusFilter === 'sve'}
                onClick={() => setMatchStatusFilter('sve')}
              >
                Svi susreti
              </button>
              <button
                type="button"
                className="filter-pill"
                aria-pressed={matchStatusFilter === 'odigrano'}
                onClick={() => setMatchStatusFilter('odigrano')}
              >
                Sezona 2026.
              </button>
              <button
                type="button"
                className="filter-pill"
                aria-pressed={matchStatusFilter === 'arhiva'}
                onClick={() => setMatchStatusFilter('arhiva')}
              >
                Arhiva 2015. – 2016.
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
                    {match.date}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} aria-hidden="true" />
                    {match.venue}
                  </span>
                </div>

                <div className="match-card__teams">
                  <div className="match-card__team match-card__team--home">{match.homeTeam}</div>
                  {typeof match.homeScore === 'number' && typeof match.awayScore === 'number' ? (
                    <div className="match-card__score">
                      {match.homeScore} : {match.awayScore}
                    </div>
                  ) : (
                    <div className="match-card__score match-card__score--upcoming">
                      {match.outcomeBadge || 'Sofascore'}
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
                    <span>Detalji</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL DETALJA UTAKMICE */}
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
                {selectedMatch.date} • {selectedMatch.venue}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.1rem',
                  fontWeight: 800,
                }}
              >
                {typeof selectedMatch.homeScore === 'number' &&
                typeof selectedMatch.awayScore === 'number'
                  ? `${selectedMatch.homeScore} : ${selectedMatch.awayScore}`
                  : selectedMatch.outcomeBadge || 'Zabilježeni susret'}
              </div>
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
                  <Award size={16} aria-hidden="true" />
                  <span>Otvori susret na Sofascoreu</span>
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
                  Zabilježeni strijelci
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
                        ⚽ <strong>{ev.player}</strong>
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
