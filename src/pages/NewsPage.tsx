import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { newsArticles } from '../data/siteData';
import { assetUrl } from '../utils/assetUrl';

const categories = ['Sve', 'Prijave', 'Izvještaj', 'Mladi', 'Obavijest'] as const;

export function NewsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>('Sve');

  // Prikaz pojedinačnog članka (/vijesti/:slug)
  if (slug) {
    const article = newsArticles.find((a) => a.slug === slug);

    if (!article) {
      return (
        <section className="section">
          <div className="container" style={{ textAlign: 'center', paddingBlock: '3rem' }}>
            <h1 id="page-main-heading" tabIndex={-1} className="section-title">
              Članak nije pronađen
            </h1>
            <Link to="/vijesti" viewTransition className="btn btn--primary" style={{ marginTop: '1.25rem' }}>
              Povratak na sve vijesti
            </Link>
          </div>
        </section>
      );
    }

    const otherArticles = newsArticles.filter((a) => a.id !== article.id).slice(0, 2);

    return (
      <>
        <section className="page-banner">
          <div className="container" style={{ maxWidth: '54rem' }}>
            <Link
              to="/vijesti"
              viewTransition
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#a7f3d0',
                fontWeight: 600,
                fontSize: '0.9rem',
                marginBottom: '1rem',
              }}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Sve vijesti i obavijesti</span>
            </Link>
            <div style={{ marginBottom: '0.65rem' }}>
              <span className="status-chip status-chip--aktivno">{article.category}</span>
            </div>
            <h1 id="page-main-heading" tabIndex={-1} className="page-banner__title">
              {article.title}
            </h1>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.15rem',
                color: '#cbd5e1',
                fontSize: '0.9rem',
                marginTop: '0.85rem',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={15} aria-hidden="true" />
                {article.date}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={15} aria-hidden="true" />
                {article.readTime}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <User size={15} aria-hidden="true" />
                {article.author}
              </span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: '54rem' }}>
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                marginBottom: '2rem',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <img
                src={assetUrl(article.image)}
                alt={article.title}
                width={1200}
                height={675}
                fetchPriority="high"
              />
            </div>

            <article
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                display: 'grid',
                gap: '1.15rem',
                fontSize: '1.05rem',
              }}
            >
              <p style={{ fontWeight: 700, fontSize: '1.12rem', color: 'var(--text-primary)' }}>
                {article.excerpt}
              </p>
              {article.content.map((paragraph, index) => (
                <p key={index} style={{ color: 'var(--text-secondary)' }}>
                  {paragraph}
                </p>
              ))}

              <div
                style={{
                  marginTop: '1rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Link to="/vijesti" viewTransition className="btn btn--outline btn--sm">
                  <ArrowLeft size={16} aria-hidden="true" />
                  <span>Natrag na vijesti</span>
                </Link>
                <Link to="/prijava-i-kontakt" viewTransition className="btn btn--primary btn--sm">
                  Prijavi ekipu ili pošalji upit
                </Link>
              </div>
            </article>

            {otherArticles.length > 0 && (
              <div style={{ marginTop: '3rem' }}>
                <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '1.25rem' }}>
                  Ostale obavijesti udruge
                </h2>
                <div className="cards-grid">
                  {otherArticles.map((other) => (
                    <article key={other.id} className="comp-card">
                      <div className="comp-card__body">
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {other.date} • {other.category}
                        </span>
                        <h3 className="comp-card__title" style={{ fontSize: '1.35rem' }}>
                          <Link to={`/vijesti/${other.slug}`} viewTransition>
                            {other.title}
                          </Link>
                        </h3>
                        <p className="comp-card__subtitle">{other.excerpt}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </>
    );
  }

  // Popis svih vijesti (/vijesti)
  const filteredArticles =
    selectedCategory === 'Sve'
      ? newsArticles
      : newsArticles.filter((a) => a.category === selectedCategory);

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="eyebrow eyebrow--gold">Službeno glasilo udruge</p>
          <h1 id="page-main-heading" tabIndex={-1} className="page-banner__title">
            Vijesti, izvještaji i obavijesti
          </h1>
          <p className="page-banner__lead">
            Pratite pozive za prijavu ekipa, izvještaje s odigranih kola u Križevcima, odluke
            povjerenika natjecanja i najave novih sportskih događanja.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="Filtriraj vijesti po kategoriji">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className="filter-pill"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="cards-grid">
            {filteredArticles.map((article) => (
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
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {article.date} • {article.author}
                  </div>
                  <h2 className="comp-card__title" style={{ fontSize: '1.45rem' }}>
                    <Link to={`/vijesti/${article.slug}`} viewTransition>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="comp-card__subtitle">{article.excerpt}</p>
                  <div className="comp-card__footer">
                    <Link
                      to={`/vijesti/${article.slug}`}
                      viewTransition
                      className="btn btn--outline btn--sm"
                    >
                      <span>Cijela objava</span>
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
