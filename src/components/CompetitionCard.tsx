import { Link } from 'react-router-dom';
import { Calendar, MapPin, Trophy, Users, ArrowRight } from 'lucide-react';
import type { Competition } from '../data/siteData';
import { assetUrl } from '../utils/assetUrl';

interface CompetitionCardProps {
  competition: Competition;
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const hasCapacity =
    typeof competition.maxTeams === 'number' &&
    typeof competition.registeredTeams === 'number' &&
    competition.maxTeams > 0;

  const fillPercent = hasCapacity
    ? Math.min(100, Math.round(((competition.registeredTeams || 0) / (competition.maxTeams || 1)) * 100))
    : 0;

  return (
    <article className="comp-card">
      <div className="comp-card__media">
        <img
          src={assetUrl(competition.image)}
          alt={competition.title}
          width={800}
          height={450}
          loading="lazy"
        />
        <div className="comp-card__badges">
          <span className="category-tag">{competition.category}</span>
          <span className={`status-chip status-chip--${competition.status}`}>
            {competition.statusLabel}
          </span>
        </div>
      </div>

      <div className="comp-card__body">
        <div>
          <h3 className="comp-card__title">
            <Link to={`/natjecanja/${competition.slug}`} viewTransition>
              {competition.title}
            </Link>
          </h3>
          <p className="comp-card__subtitle">{competition.subtitle}</p>
        </div>

        <div className="comp-card__meta">
          <div className="comp-card__meta-row">
            <Calendar size={16} aria-hidden="true" />
            <span>{competition.dates}</span>
          </div>
          <div className="comp-card__meta-row">
            <MapPin size={16} aria-hidden="true" />
            <span>{competition.location}</span>
          </div>
          <div className="comp-card__meta-row">
            <Users size={16} aria-hidden="true" />
            <span>{competition.format}</span>
          </div>
          <div className="comp-card__meta-row">
            <Trophy size={16} aria-hidden="true" />
            <span>{competition.prizePool}</span>
          </div>
        </div>

        {hasCapacity && (
          <div className="capacity-bar">
            <div className="capacity-bar__label">
              <span>Broj momčadi</span>
              <span>
                {competition.registeredTeams} / {competition.maxTeams} ekipa ({fillPercent}%)
              </span>
            </div>
            <div className="capacity-bar__track" aria-hidden="true">
              <div className="capacity-bar__fill" style={{ width: `${fillPercent}%` }} />
            </div>
          </div>
        )}

        <div className="comp-card__footer">
          <Link
            to={`/natjecanja/${competition.slug}`}
            viewTransition
            className="btn btn--outline btn--sm"
          >
            <span>Detalji i pregled</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          {(competition.status === 'prijave-u-tijeku' || competition.status === 'u-najavi') && (
            <Link
              to={`/prijava-i-kontakt?natjecanje=${encodeURIComponent(competition.id)}`}
              viewTransition
              className="btn btn--primary btn--sm"
            >
              Prijava / Upit
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
