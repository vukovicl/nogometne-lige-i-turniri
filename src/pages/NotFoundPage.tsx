import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="section">
      <div
        className="container"
        style={{ textAlign: 'center', maxWidth: '38rem', paddingBlock: '3.5rem' }}
      >
        <p className="eyebrow" style={{ justifyContent: 'center' }}>
          Greška 404 • Lopta izvan granica igrališta
        </p>
        <h1 id="page-main-heading" tabIndex={-1} className="section-title">
          Tražena stranica nije pronađena
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
          Moguće je da je poveznica zastarjela ili je upisana pogrešna adresa. Vratite se na
          početnu stranicu ili pregledajte aktualna natjecanja u Križevcima.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '1.75rem',
          }}
        >
          <Link to="/" viewTransition className="btn btn--primary">
            <ArrowLeft size={17} aria-hidden="true" />
            <span>Početna stranica</span>
          </Link>
          <Link to="/natjecanja" viewTransition className="btn btn--outline">
            <Trophy size={17} aria-hidden="true" />
            <span>Lige i turniri</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
