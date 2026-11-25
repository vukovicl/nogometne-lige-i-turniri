import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
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
  type AssociationDocument,
} from '../data/siteData';
import { assetUrl } from '../utils/assetUrl';
import { ModalDialog } from '../components/ModalDialog';

export function AboutPage() {
  const [selectedDoc, setSelectedDoc] = useState<AssociationDocument | null>(null);

  const handleDownloadSample = (doc: AssociationDocument) => {
    const content = [
      associationInfo.fullName.toUpperCase(),
      `Sjedište: ${associationInfo.address}`,
      `OIB: ${associationInfo.oib} | IBAN: ${associationInfo.iban}`,
      '============================================================',
      '',
      doc.title.toUpperCase(),
      `Kategorija: ${doc.category} | Ažurirano: ${doc.updated}`,
      '',
      doc.summary,
      '',
      ...doc.previewText,
      '',
      '------------------------------------------------------------',
      'Napomena: Ovo je ogledni predložak dokumenta generiran na web stranici.',
      'Prave PDF dokumente možete postaviti u mapu public/docs/ i povezati u src/data/siteData.ts.',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.id}-predlozak.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="eyebrow eyebrow--gold">O nama • Križevci i Prigorje</p>
          <h1 id="page-main-heading" tabIndex={-1} className="page-banner__title">
            {associationInfo.fullName}
          </h1>
          <p className="page-banner__lead">
            Neprofitna sportska udruga posvećena organizaciji malonogometnih liga, dvoranskih
            turnira, veteranskih susreta i sportskih manifestacija za djecu i mlade na području
            Križevaca i okolice.
          </p>
        </div>
      </section>

      {/* MISIJA I OSOBNA ISKAZNICA UDRUGE */}
      <section className="section">
        <div className="container">
          <div className="cards-grid--2 cards-grid" style={{ alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: '1.1rem' }}>
              <p className="eyebrow" style={{ marginBottom: 0 }}>
                Naša priča i poslanje
              </p>
              <h2 className="section-title">
                Više od nogometa – mjesto susreta cijele križevačke sportske zajednice
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Udruga <strong>"{associationInfo.name}"</strong> nastala je iz želje da bogata
                malonogometna tradicija Križevaca i Prigorja dobije moderan, cjelogodišnji i
                profesionalno vođen organizacijski okvir. Od ljetnih večeri pod reflektorima do
                punih tribina školsko-sportske dvorane zimi, svako naše natjecanje spaja sportski
                natjecateljski duh i prijateljsko druženje.
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                Posebnu pažnju posvećujemo uključivanju svih dobnih skupina: od najmlađih polaznika
                škola nogometa koji osvajaju svoje prve medalje, preko seniorskih i kvartovskih
                momčadi, pa sve do rekreativaca i veterana 35+.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
                  gap: '0.85rem',
                  marginTop: '0.5rem',
                }}
              >
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--pitch-50)',
                    border: '1px solid var(--border-strong)',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pitch-700)' }}>
                    SLUŽBENI PODACI UDRUGE
                  </div>
                  <div style={{ fontWeight: 700, marginTop: '0.25rem' }}>
                    OIB: {associationInfo.oib}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Registar udruga RH: {associationInfo.registryNo}
                  </div>
                </div>

                <div
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pitch-700)' }}>
                    ŽIRO RAČUN (IBAN)
                  </div>
                  <div style={{ fontWeight: 700, marginTop: '0.25rem', wordBreak: 'break-all' }}>
                    {associationInfo.iban}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Za kotizacije, članarine i donacije
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <img
                  src={assetUrl('images/trophy-ceremony.jpg')}
                  alt="Pehari i medalje na završnici turnira Udruge Nogometne lige i turniri Križevci"
                  width={960}
                  height={540}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RAZVOJNI PUT (TIMELINE) & TIJELA UDRUGE */}
      <section className="section section--subtle">
        <div className="container">
          <div className="cards-grid--2 cards-grid" style={{ alignItems: 'start' }}>
            <div>
              <p className="eyebrow">Kronologija rada</p>
              <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
                Kako smo rasli kroz sezone
              </h2>
              <div className="timeline">
                {associationInfo.timeline.map((item) => (
                  <div key={item.year} className="timeline__item">
                    <span className="eyebrow" style={{ marginBottom: '0.2rem' }}>
                      {item.year}
                    </span>
                    <h3 style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>{item.title}</h3>
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

            <div>
              <p className="eyebrow">Uprava i organizacijski odbor</p>
              <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
                Ljudi iza natjecanja
              </h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {associationInfo.boardMembers.map((member) => (
                  <div
                    key={member.role}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.2rem 1.35rem',
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
                    <h3 style={{ fontSize: '1.35rem', marginTop: '0.2rem' }}>{member.name}</h3>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        marginTop: '0.35rem',
                      }}
                    >
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPORTSKA INFRASTRUKTURA / TERENI */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Lokacije odigravanja</p>
              <h2 className="section-title">Dvorane i tereni u Križevcima i Prigorju</h2>
              <p className="section-subtitle">
                Sva natjecanja održavaju se na provjerenim sportskim terenima s osiguranom
                infrastrukturom za igrače i gledatelje.
              </p>
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
                  Adresa: {venue.address}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{venue.features}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLUŽBENI DOKUMENTI, PRAVILNICI I TRANSPARENTNOST */}
      <section id="dokumenti" className="section section--subtle">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Javna objava i obrasci</p>
              <h2 className="section-title">Dokumenti, statut i propozicije</h2>
              <p className="section-subtitle">
                Preuzmite obrasce za prijavu igrača, suglasnosti za maloljetne sudionike te opće
                pravilnike naših liga i turnira.
              </p>
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
                    <span>Preuzmi predložak</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Učlanjenje / Volontiranje poziv */}
          <div
            style={{
              marginTop: '2.5rem',
              background: 'var(--bg-surface)',
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
                  Postanite član, sudac, zapisničar ili volonter udruge
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginTop: '0.25rem' }}>
                  Otvoreni smo za sve entuzijaste s područja Križevaca koji žele sudjelovati u
                  organizaciji turnira, vođenju statistike, fotografiranju ili radu s mladima.
                </p>
              </div>
            </div>
            <Link to="/prijava-i-kontakt?tab=upit" viewTransition className="btn btn--primary">
              <Building2 size={18} aria-hidden="true" />
              <span>Javite nam se</span>
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
                Službeni izvadak Udruge NLT Križevci
              </span>
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => handleDownloadSample(selectedDoc)}
              >
                <Download size={16} aria-hidden="true" />
                <span>Preuzmi datoteku (.txt)</span>
              </button>
            </div>
          </div>
        )}
      </ModalDialog>
    </>
  );
}
