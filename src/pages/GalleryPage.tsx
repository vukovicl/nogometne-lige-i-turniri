import { useEffect, useState } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryItems } from '../data/siteData';
import { assetUrl } from '../utils/assetUrl';
import { ModalDialog } from '../components/ModalDialog';

const galleryCategories = ['Sve', 'Turniri', 'Lige', 'Mladi', 'Nagrade'] as const;

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('Sve');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems =
    activeCategory === 'Sve'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const activePhoto = lightboxIndex !== null ? visibleItems[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, visibleItems.length]);

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="eyebrow eyebrow--gold">Atmosfera s terena i tribina</p>
          <h1 id="page-main-heading" tabIndex={-1} className="page-banner__title">
            Foto galerija događanja
          </h1>
          <p className="page-banner__lead">
            Zabilježeni trenuci s naših dvoranskih kupova, večernjih liga pod reflektorima,
            dječjih turnira i svečanih dodjela nagrada u Križevcima.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="Filtriraj fotografije">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className="filter-pill"
                aria-pressed={activeCategory === cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {visibleItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className="gallery-card"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Otvori fotografiju: ${item.title}`}
              >
                <img
                  src={assetUrl(item.image)}
                  alt={item.caption}
                  width={800}
                  height={500}
                  loading="lazy"
                />
                <div className="gallery-card__overlay">
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#fde047',
                      textTransform: 'uppercase',
                    }}
                  >
                    <Camera size={13} aria-hidden="true" />
                    <span>
                      {item.event} • {item.date}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.3rem', marginTop: '0.2rem' }}>{item.title}</h2>
                </div>
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: '2.25rem',
              padding: '1.15rem 1.35rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
            }}
          >
            <strong>Savjet za naknadni unos vaših fotografija:</strong> Nove fotografije turnira
            jednostavno spremite u mapu <code>public/images/</code> i dodajte opis u polje{' '}
            <code>galleryItems</code> unutar datoteke <code>src/data/siteData.ts</code>.
          </div>
        </div>
      </section>

      <ModalDialog
        open={Boolean(activePhoto)}
        onClose={() => setLightboxIndex(null)}
        title={activePhoto?.title || 'Fotografija'}
        subtitle={activePhoto ? `${activePhoto.event} • ${activePhoto.date}` : undefined}
        maxWidth="xl"
      >
        {activePhoto && lightboxIndex !== null && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#050e14',
              }}
            >
              <img
                src={assetUrl(activePhoto.image)}
                alt={activePhoto.caption}
                width={1280}
                height={720}
                style={{ inlineSize: '100%', blockSize: 'auto' }}
              />
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>{activePhoto.caption}</p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + visibleItems.length) % visibleItems.length
                  )
                }
              >
                <ChevronLeft size={17} aria-hidden="true" />
                <span>Prethodna</span>
              </button>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {lightboxIndex + 1} / {visibleItems.length}
              </span>
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % visibleItems.length)}
              >
                <span>Sljedeća</span>
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </ModalDialog>
    </>
  );
}
