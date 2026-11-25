import { useId, type CSSProperties } from 'react';
import { ExternalLink } from 'lucide-react';
import type { LeagueTableGroup } from '../data/siteData';

interface StandingsTableProps {
  table: LeagueTableGroup;
  compact?: boolean;
}

export function StandingsTable({ table, compact = false }: StandingsTableProps) {
  const captionId = useId();
  const rows = compact ? table.rows.slice(0, 6) : table.rows;

  const mobileLabelsStyle = {
    '--label-1': '"Pozicija"',
    '--label-3': '"P (Odigrano)"',
    '--label-4': '"W (Pobjede)"',
    '--label-5': '"D (Remiji)"',
    '--label-6': '"L (Porazi)"',
    '--label-7': '"DIFF (Razlika)"',
    '--label-8': '"GLS (Golovi)"',
    '--label-9': compact ? '"Pts (Bodovi)"' : '"Posljednjih 5"',
    '--label-10': '"Pts (Bodovi)"',
  } as CSSProperties;

  return (
    <div>
      <div
        tabIndex={0}
        role="region"
        aria-labelledby={captionId}
        className="table-wrapper"
      >
        <table className="standings-table" style={mobileLabelsStyle}>
          <caption id={captionId}>
            <div className="standings-caption">
              <span>
                {table.label} — {table.roundInfo}
              </span>
              <span className="standings-caption__meta">Ažurirano: {table.updatedAt}</span>
            </div>
          </caption>
          <thead>
            <tr>
              <th scope="col" title="Pozicija">
                #
              </th>
              <th scope="col">Ekipa</th>
              <th scope="col" title="Utakmica odigrano">
                P
              </th>
              <th scope="col" title="Pobjede">
                W
              </th>
              <th scope="col" title="Remiji (neriješeno)">
                D
              </th>
              <th scope="col" title="Porazi">
                L
              </th>
              <th scope="col" title="Gol-razlika">
                DIFF
              </th>
              <th scope="col" title="Postignuti i primljeni golovi">
                GLS
              </th>
              {!compact && <th scope="col">Posljednjih 5</th>}
              <th scope="col" title="Bodovi">
                Pts
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const diff = row.goalsFor - row.goalsAgainst;
              const diffLabel = diff > 0 ? `+${diff}` : `${diff}`;
              const rowClass =
                row.zone === 'champion'
                  ? 'standings-row--champion'
                  : row.zone === 'playoff'
                    ? 'standings-row--playoff'
                    : undefined;

              return (
                <tr key={row.team} className={rowClass}>
                  <td>
                    <span className="pos-badge">{row.pos}</span>
                  </td>
                  <th scope="row">
                    {row.sofascoreUrl ? (
                      <a
                        href={row.sofascoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="team-link"
                        title={`Otvori profil ekipe ${row.team} na Sofascore`}
                      >
                        <span>{row.team}</span>
                        <ExternalLink size={13} aria-hidden="true" className="team-link__icon" />
                      </a>
                    ) : (
                      <span>{row.team}</span>
                    )}
                    {row.placeOrigin && <span className="team-origin">{row.placeOrigin}</span>}
                  </th>
                  <td>{row.played}</td>
                  <td>{row.won}</td>
                  <td>{row.drawn}</td>
                  <td>{row.lost}</td>
                  <td
                    className={
                      diff > 0
                        ? 'diff-cell diff-cell--pos'
                        : diff < 0
                          ? 'diff-cell diff-cell--neg'
                          : 'diff-cell'
                    }
                  >
                    {diffLabel}
                  </td>
                  <td>
                    {row.goalsFor}:{row.goalsAgainst}
                  </td>
                  {!compact && (
                    <td>
                      <div
                        className="form-pills"
                        aria-label={`Posljednjih 5 utakmica: ${row.form.join(', ')}`}
                      >
                        {row.form.map((res, idx) => {
                          const matchUrl = row.formLinks?.[idx];
                          const resText =
                            res === 'P' ? 'Pobjeda' : res === 'N' ? 'Neriješeno' : 'Poraz';

                          if (matchUrl) {
                            return (
                              <a
                                key={`${row.team}-f-${idx}`}
                                href={matchUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={`form-pill form-pill--${res} form-pill--link`}
                                title={`${resText} – pogledaj detalje utakmice na Sofascore`}
                                aria-label={`${resText} (otvori utakmicu na Sofascore)`}
                              >
                                {res}
                              </a>
                            );
                          }

                          return (
                            <span
                              key={`${row.team}-f-${idx}`}
                              className={`form-pill form-pill--${res}`}
                              title={resText}
                            >
                              {res}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  )}
                  <td className="points-cell">{row.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pravila i legenda */}
      <div className="table-legend" aria-label="Pravila i legenda tablice">
        <div className="table-legend__items">
          <span>
            <strong>P</strong> Utakmica odigrano
          </span>
          <span>
            <strong>W</strong> Pobjede
          </span>
          <span>
            <strong>D</strong> Remiji
          </span>
          <span>
            <strong>L</strong> Porazi
          </span>
          <span>
            <strong>DIFF</strong> Razlika
          </span>
          <span>
            <strong>GLS</strong> Golovi
          </span>
          <span>
            <strong>Pts</strong> Bodovi
          </span>
        </div>
        {table.zoneLegend && <p className="table-legend__note">{table.zoneLegend}</p>}
      </div>
    </div>
  );
}
