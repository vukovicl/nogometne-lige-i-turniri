import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Building2,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Mail,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  associationInfo,
  documents,
  season2026Awards,
  type AssociationDocument,
} from '../data/siteData';
import { assetUrl } from '../utils/assetUrl';
import { ModalDialog } from '../components/ModalDialog';

export function AboutPage() {
  const [selectedDoc, setSelectedDoc] = useState<AssociationDocument | null>(null);

  const handleDownloadSample = (doc: AssociationDocument) => {
    const content = [
      `UDRUGA: ${associationInfo.name.toUpperCase()} (${associationInfo.englishName})`,
      `Sjedište: ${associationInfo.address}`,
      `OIB: ${associationInfo.oib} | Registarski broj: ${associationInfo.registryNo}`,
      `E-pošta: ${associationInfo.email}`,
      '============================================================',
      '',
      doc.title.toUpperCase(),
      `Kategorija: ${doc.category} | Ažurirano: ${doc.updated}`,
      '',
      doc.summary,
      '',
      ...doc.previewText,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="eyebrow eyebrow--gold">O udruzi i povijesti natjecanja</p>
          <h1 id="page-main-heading" tabIndex={-1} className="page-banner__title">
            Nogometne lige i turniri i priča o Dobrosusjedskim odnosima
          </h1>
          <p className="page-banner__lead">
            Upoznajte sportsku udrugu registriranu 2026. godine za razvoj amaterskog nogometa i
            malog nogometa u Hrvatskoj te cjelovitu dokumentiranu povijest lige Dobrosusjedski
            odnosi od 2015. godine do danas.
          </p>
        </div>
      </section>

      {/* UVOD, UPISANE DJELATNOSTI I OSOBNA ISKAZNICA UDRUGE */}
      <section className="section">
        <div className="container">
          <div className="cards-grid--2 cards-grid" style={{ alignItems: 'start' }}>
            <div style={{ display: 'grid', gap: '1.15rem' }}>
              <p className="eyebrow" style={{ marginBottom: 0 }}>
                Misija i djelatnosti udruge
              </p>
              <h2 className="section-title">
                Platforma za organizaciju nogometnih liga i turnira diljem Hrvatske
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                <strong>Nogometne lige i turniri</strong> (eng.{' '}
                <em>{associationInfo.englishName}</em>) sportska je udruga sa sjedištem u Gračini
                80, osnovana 23. ožujka 2026. te upisana u Registar udruga Republike Hrvatske 20.
                travnja 2026. godine, s vizijom razvoja, digitalizacije i povezivanja amaterskih i
                rekreativnih natjecanja na području cijele Hrvatske.
              </p>

              <div
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.2rem',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  Upisane djelatnosti udruge
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'grid',
                    gap: '0.55rem',
                  }}
                >
                  {associationInfo.registeredActivities.map((act) => (
                    <li
                      key={act}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}
                    >
                      <CheckCircle2
                        size={18}
                        aria-hidden="true"
                        style={{ color: 'var(--pitch-700)', flexShrink: 0, marginTop: '0.2rem' }}
                      />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Službena tablica podataka o udruzi */}
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span className="eyebrow">Registar udruga Republike Hrvatske</span>
              <h2 style={{ fontSize: '1.6rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Podaci o udruzi i kontakt
              </h2>
              <dl style={{ margin: 0, display: 'grid', gap: '0.65rem' }}>
                {associationInfo.registryFacts.map((fact) => (
                  <div
                    key={fact.label}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(8.5rem, 1fr) 1.4fr',
                      gap: '0.75rem',
                      paddingBlockEnd: '0.6rem',
                      borderBlockEnd: '1px solid var(--border-light)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{fact.label}</dt>
                    <dd style={{ margin: 0, fontWeight: 700, wordBreak: 'break-word' }}>
                      {fact.label === 'E-pošta' ? (
                        <a
                          href={`mailto:${fact.value}`}
                          style={{ color: 'var(--pitch-700)', textDecoration: 'underline' }}
                        >
                          {fact.value}
                        </a>
                      ) : (
                        fact.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* VODITELJI UDRUGE: ALEN MIHOLIĆ I MATIJA VUKOVIĆ */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Vodstvo i organizacija</p>
              <h2 className="section-title">Voditelji udruge</h2>
              <p className="section-subtitle">
                Iskustvo dugogodišnje organizacije malonogometnih natjecanja spojeno sa suvremenim
                vođenjem liga i turnira.
              </p>
            </div>
          </div>

          <div className="cards-grid--2 cards-grid">
            {associationInfo.boardMembers.map((member) => (
              <article
                key={member.name}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'grid',
                  gap: '0.6rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--pitch-700)',
                    }}
                  >
                    {member.role}
                  </span>
                  <a
                    href={`mailto:${member.contact}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.84rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <Mail size={14} aria-hidden="true" />
                    <span>{member.contact}</span>
                  </a>
                </div>
                <h3 style={{ fontSize: '1.6rem', textTransform: 'uppercase' }}>{member.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CJELOVITA PRIČA O UDRUZI I DOBROSUSJEDSKIM ODNOSIMA */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Povijesni pregled i arhiva</p>
              <h2 className="section-title">Priča o udruzi i ligi Dobrosusjedski odnosi</h2>
              <p className="section-subtitle">
                Razlikujemo povijest same malonogometne lige (dokumentirane na križevačkom području
                najmanje od 2015. godine) od povijesti današnje udruge registrirane u travnju 2026.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {associationInfo.storySections.map((sec) => (
              <article
                key={sec.id}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(1.35rem, 3vw, 2rem)',
                  display: 'grid',
                  gap: '0.85rem',
                }}
              >
                <span className="eyebrow" style={{ marginBottom: 0 }}>
                  {sec.eyebrow}
                </span>
                <h3 style={{ fontSize: '1.65rem', textTransform: 'uppercase' }}>{sec.title}</h3>
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx} style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    {p}
                  </p>
                ))}
              </article>
            ))}
          </div>

          {/* Priznanja u sezoni 2026. + Kronologija */}
          <div
            className="cards-grid--2 cards-grid"
            style={{ marginTop: '2.5rem', alignItems: 'start' }}
          >
            <div
              style={{
                background: 'var(--bg-dark)',
                color: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '1.6rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Award size={22} aria-hidden="true" style={{ color: 'var(--gold-500)' }} />
                <h3 style={{ fontSize: '1.55rem', textTransform: 'uppercase' }}>
                  Priznanja u sezoni 2026.
                </h3>
              </div>
              <p style={{ color: 'var(--text-on-dark-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Dobitnici ekipnih i pojedinačnih nagrada Malonogometne lige Dobrosusjedski odnosi
                Križevci 2026.:
              </p>
              <div style={{ display: 'grid', gap: '0.6rem' }}>
                {season2026Awards.map((aw) => (
                  <div
                    key={aw.title}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      padding: '0.7rem 0.9rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <span style={{ color: '#9bd5be', fontWeight: 600 }}>{aw.title}</span>
                    <strong style={{ textAlign: 'end' }}>
                      {aw.winner}
                      {aw.teamOrNote && aw.title.startsWith('Najbolji')
                        ? `, ${aw.teamOrNote}`
                        : ''}
                    </strong>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.25rem', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <img
                  src={assetUrl('images/trophy-ceremony.jpg')}
                  alt="Pehari i medalje za dobitnike priznanja"
                  width={800}
                  height={450}
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <p className="eyebrow">Vremenska crta</p>
              <h3 className="section-title" style={{ fontSize: '1.85rem', marginBottom: '1.25rem' }}>
                Ključne točke iz arhive i rada udruge
              </h3>
              <div className="timeline">
                {associationInfo.timeline.map((item) => (
                  <div key={item.year} className="timeline__item">
                    <span className="eyebrow" style={{ marginBottom: '0.2rem' }}>
                      {item.year}
                    </span>
                    <h4 style={{ fontSize: '1.25rem', textTransform: 'uppercase' }}>{item.title}</h4>
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.92rem',
                        marginTop: '0.35rem',
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TERENI I NACIONALNO ŠIRENJE */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Gdje se igra</p>
              <h2 className="section-title">Dosadašnje lokacije i širenje po Hrvatskoj</h2>
            </div>
          </div>

          <div className="info-grid">
            {associationInfo.venues.map((venue) => (
              <div key={venue.name} className="info-card">
                <div className="info-card__icon">
                  <MapPin size={22} aria-hidden="true" />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pitch-700)' }}>
                  {venue.type}
                </span>
                <h3 style={{ fontSize: '1.35rem', textTransform: 'uppercase' }}>{venue.name}</h3>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Područje: {venue.address}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{venue.features}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOKUMENTI I OBRASCI */}
      <section id="dokumenti" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Transparentnost i obrasci</p>
              <h2 className="section-title">Dokumenti udruge i predlošci za ekipe</h2>
            </div>
          </div>

          <div className="cards-grid--2 cards-grid">
            {documents.map((doc) => (
              <article
                key={doc.id}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="status-chip status-chip--aktivno">{doc.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {doc.updated} • {doc.fileSize}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <FileText
                    size={24}
                    aria-hidden="true"
                    style={{ color: 'var(--pitch-700)', flexShrink: 0, marginTop: '0.15rem' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>{doc.title}</h3>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        marginTop: '0.3rem',
                      }}
                    >
                      {doc.summary}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.6rem',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <Eye size={16} aria-hidden="true" />
                    <span>Brzi pregled</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={() => handleDownloadSample(doc)}
                  >
                    <Download size={16} aria-hidden="true" />
                    <span>Preuzmi zapis</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div
            style={{
              marginTop: '2.5rem',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem 1.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', maxWidth: '44rem' }}>
              <div className="info-card__icon" style={{ flexShrink: 0 }}>
                <Users size={22} aria-hidden="true" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', textTransform: 'uppercase' }}>
                  Povežimo sportske organizacije, lige i turnire u Hrvatskoj
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginTop: '0.25rem' }}>
                  Bilo da želite pokrenuti rekreativnu ligu u svome gradu, uključiti školu nogometa
                  ili dopuniti našu sportsku arhivu zapisnicima i fotografijama, javite nam se.
                </p>
              </div>
            </div>
            <Link to="/prijava-i-kontakt?tab=upit" viewTransition className="btn btn--primary">
              <Building2 size={18} aria-hidden="true" />
              <span>Kontaktiraj udrugu</span>
            </Link>
          </div>
        </div>
      </section>

      <ModalDialog
        open={Boolean(selectedDoc)}
        onClose={() => setSelectedDoc(null)}
        title={selectedDoc?.title || 'Pregled dokumenta'}
        subtitle={selectedDoc ? `${selectedDoc.category} • ${selectedDoc.updated}` : undefined}
      >
        {selectedDoc && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{selectedDoc.summary}</p>
            <div
              style={{
                padding: '1.15rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                display: 'grid',
                gap: '0.75rem',
                fontSize: '0.92rem',
              }}
            >
              {selectedDoc.previewText.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.84rem',
                  color: 'var(--text-muted)',
                }}
              >
                <ShieldCheck size={16} aria-hidden="true" />
                Udruga {associationInfo.name}
              </span>
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => handleDownloadSample(selectedDoc)}
              >
                <Download size={16} aria-hidden="true" />
                <span>Preuzmi (.txt)</span>
              </button>
            </div>
          </div>
        )}
      </ModalDialog>
    </>
  );
}
