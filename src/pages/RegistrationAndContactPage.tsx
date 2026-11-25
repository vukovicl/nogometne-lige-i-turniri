import { useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Check,
  Copy,
  Globe,
  HelpCircle,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react';
import { associationInfo, competitions, faqs } from '../data/siteData';
import { AccessibleTabs } from '../components/AccessibleTabs';
import { ModalDialog } from '../components/ModalDialog';
import { useAccessibleFormValidation } from '../utils/accessibleForms';

interface RegistrationSummary {
  refCode: string;
  competitionTitle: string;
  teamName: string;
  cityOrigin: string;
  captainName: string;
  phone: string;
  email: string;
  playersCount: string;
  notes: string;
}

export function RegistrationAndContactPage() {
  const [searchParams] = useSearchParams();
  return <RegistrationAndContactContent key={searchParams.toString()} searchParams={searchParams} />;
}

function RegistrationAndContactContent({ searchParams }: { searchParams: URLSearchParams }) {
  const openCompetitions = competitions.filter((c) => c.status !== 'zavrseno');
  const paramComp = searchParams.get('natjecanje');
  const initialComp =
    paramComp && openCompetitions.some((c) => c.id === paramComp)
      ? paramComp
      : openCompetitions[0]?.id || competitions[0].id;
  const initialTab = searchParams.get('tab') === 'upit' ? 'upit' : 'prijava';

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectedCompId, setSelectedCompId] = useState<string>(initialComp);
  const [submission, setSubmission] = useState<RegistrationSummary | null>(null);
  const [contactSent, setContactSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const regFormRef = useRef<HTMLFormElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);

  useAccessibleFormValidation(regFormRef);
  useAccessibleFormValidation(contactFormRef);

  const handleRegistrationSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(':invalid');
      firstInvalid?.focus();
      return;
    }

    const data = new FormData(form);
    const comp =
      competitions.find((c) => c.id === String(data.get('competitionId'))) || competitions[0];
    const randomNum = Math.floor(1000 + Math.random() * 9000);

    setSubmission({
      refCode: `NLT-${new Date().getFullYear()}-${randomNum}`,
      competitionTitle: comp.title,
      teamName: String(data.get('teamName') || ''),
      cityOrigin: String(data.get('cityOrigin') || ''),
      captainName: String(data.get('captainName') || ''),
      phone: String(data.get('phone') || ''),
      email: String(data.get('email') || ''),
      playersCount: String(data.get('playersCount') || '10'),
      notes: String(data.get('notes') || ''),
    });
    form.reset();
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(':invalid');
      firstInvalid?.focus();
      return;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent(
      `Upit sa stranice (${String(data.get('topic') || 'Suradnja')}) – ${String(data.get('senderName') || '')}`
    );
    const body = encodeURIComponent(
      [
        `Ime / organizacija: ${String(data.get('senderName') || '')}`,
        `E-pošta: ${String(data.get('senderEmail') || '')}`,
        `Tema: ${String(data.get('topic') || '')}`,
        ``,
        `Poruka:`,
        String(data.get('message') || ''),
      ].join('\n')
    );

    setContactSent(true);
    window.location.href = `mailto:${associationInfo.email}?subject=${subject}&body=${body}`;
    form.reset();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(associationInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Clipboard API fallback
    }
  };

  const buildMailtoHref = (s: RegistrationSummary) => {
    const subject = encodeURIComponent(`Prijava / iskaz interesa: ${s.teamName} (${s.competitionTitle})`);
    const body = encodeURIComponent(
      [
        `Poštovani,`,
        ``,
        `Šaljemo prijavu putem web stranice udruge Nogometne lige i turniri:`,
        `- Evidencijski kôd: ${s.refCode}`,
        `- Program / natjecanje: ${s.competitionTitle}`,
        `- Naziv ekipe / organizacije: ${s.teamName}`,
        `- Grad / mjesto: ${s.cityOrigin}`,
        `- Kontakt osoba (voditelj): ${s.captainName}`,
        `- Telefon: ${s.phone}`,
        `- E-pošta: ${s.email}`,
        `- Okvirni broj igrača: ${s.playersCount}`,
        s.notes ? `- Napomena: ${s.notes}` : '',
      ]
        .filter(Boolean)
        .join('\n')
    );
    return `mailto:${associationInfo.registrationEmail}?subject=${subject}&body=${body}`;
  };

  const formTabs = [
    {
      id: 'prijava',
      label: 'Prijava ekipe na natjecanje',
      badge: 'Ekipe u RH',
      content: (
        <form ref={regFormRef} onSubmit={handleRegistrationSubmit} className="form-grid">
          <div className="field field--full">
            <label htmlFor="reg-competition">Odaberite natjecanje ili program *</label>
            <span id="reg-comp-hint" className="field__hint">
              Odaberite program ili turnir za koji iskazujete interes odnosno prijavljujete momčad.
            </span>
            <select
              id="reg-competition"
              name="competitionId"
              value={selectedCompId}
              onChange={(e) => setSelectedCompId(e.target.value)}
              required
              aria-describedby="reg-comp-hint"
              data-error="reg-competition-error"
            >
              {openCompetitions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.statusLabel})
                </option>
              ))}
            </select>
            <div id="reg-competition-error" className="field__error">
              <span role="img" aria-label="Greška">
                ❌
              </span>{' '}
              Molimo odaberite željeni program ili natjecanje.
            </div>
          </div>

          <div className="field">
            <label htmlFor="reg-team">Naziv ekipe ili kluba *</label>
            <span id="reg-team-hint" className="field__hint">
              Unesite puni naziv momčadi, udruge ili škole nogometa (min. 2 znaka).
            </span>
            <input
              type="text"
              id="reg-team"
              name="teamName"
              required
              minLength={2}
              autoComplete="organization"
              aria-describedby="reg-team-hint"
              data-error="reg-team-error"
            />
            <div id="reg-team-error" className="field__error">
              <span role="img" aria-label="Greška">
                ❌
              </span>{' '}
              Unesite naziv ekipe (najmanje 2 znaka).
            </div>
          </div>

          <div className="field">
            <label htmlFor="reg-city">Grad / Općina / Županija *</label>
            <span id="reg-city-hint" className="field__hint">
              Prihvaćamo prijave i inicijative iz svih krajeva Hrvatske.
            </span>
            <input
              type="text"
              id="reg-city"
              name="cityOrigin"
              required
              minLength={2}
              autoComplete="address-level2"
              aria-describedby="reg-city-hint"
              data-error="reg-city-error"
            />
            <div id="reg-city-error" className="field__error">
              <span role="img" aria-label="Greška">
                ❌
              </span>{' '}
              Unesite grad ili mjesto iz kojeg ekipa dolazi.
            </div>
          </div>

          <div className="field">
            <label htmlFor="reg-captain">Ime i prezime voditelja ekipe *</label>
            <span id="reg-captain-hint" className="field__hint">
              Kontakt osoba za komunikaciju s organizatorima.
            </span>
            <input
              type="text"
              id="reg-captain"
              name="captainName"
              required
              minLength={3}
              autoComplete="name"
              aria-describedby="reg-captain-hint"
              data-error="reg-captain-error"
            />
            <div id="reg-captain-error" className="field__error">
              <span role="img" aria-label="Greška">
                ❌
              </span>{' '}
              Unesite ime i prezime voditelja ekipe.
            </div>
          </div>

          <div className="field">
            <label htmlFor="reg-phone">Kontakt telefon / mobitel *</label>
            <span id="reg-phone-hint" className="field__hint">
              Format: +385 98 123 4567 ili 091 123 4567
            </span>
            <input
              type="tel"
              id="reg-phone"
              name="phone"
              required
              pattern="[0-9+\s\-()]{8,20}"
              autoComplete="tel"
              aria-describedby="reg-phone-hint"
              data-error="reg-phone-error"
            />
            <div id="reg-phone-error" className="field__error">
              <span role="img" aria-label="Greška">
                ❌
              </span>{' '}
              Unesite ispravan telefonski broj (najmanje 8 znamenki).
            </div>
          </div>

          <div className="field">
            <label htmlFor="reg-email">E-pošta *</label>
            <span id="reg-email-hint" className="field__hint">
              Format: ime.prezime@domena.hr
            </span>
            <input
              type="email"
              id="reg-email"
              name="email"
              required
              autoComplete="email"
              aria-describedby="reg-email-hint"
              data-error="reg-email-error"
            />
            <div id="reg-email-error" className="field__error">
              <span role="img" aria-label="Greška">
                ❌
              </span>{' '}
              Unesite valjanu adresu e-pošte.
            </div>
          </div>

          <div className="field">
            <label htmlFor="reg-players">Okvirni broj igrača</label>
            <span id="reg-players-hint" className="field__hint">
              Konačan popis igrača dostavlja se prije početka natjecanja.
            </span>
            <select id="reg-players" name="playersCount" defaultValue="9 – 12 igrača" aria-describedby="reg-players-hint">
              <option value="6 – 8 igrača">6 – 8 igrača</option>
              <option value="9 – 12 igrača">9 – 12 igrača</option>
              <option value="13 – 15 igrača">13 – 15 igrača</option>
              <option value="Više kategorija (škola nogometa)">Više kategorija (škola nogometa)</option>
            </select>
          </div>

          <div className="field field--full">
            <label htmlFor="reg-notes">Napomena ili prijedlog (neobavezno)</label>
            <span id="reg-notes-hint" className="field__hint">
              Boja dresova, željeni termin ili dodatne informacije o momčadi.
            </span>
            <textarea
              id="reg-notes"
              name="notes"
              aria-describedby="reg-notes-hint"
              placeholder="Upišite dodatne informacije po želji..."
            />
          </div>

          <div className="checkbox-field field--full">
            <div className="checkbox-row">
              <input
                type="checkbox"
                id="reg-rules"
                name="acceptRules"
                required
                data-error="reg-rules-error"
              />
              <label htmlFor="reg-rules">
                Potvrđujem prihvaćanje načela fair playa i općih pravila natjecanja u organizaciji
                udruge Nogometne lige i turniri. *
              </label>
            </div>
            <div id="reg-rules-error" className="field__error">
              <span role="img" aria-label="Greška">
                ❌
              </span>{' '}
              Potrebno je označiti potvrdu prije slanja prijave.
            </div>
          </div>

          <div className="field--full" style={{ marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn--primary btn--lg">
              <Trophy size={19} aria-hidden="true" />
              <span>Pripremi prijavnicu ekipe</span>
            </button>
          </div>
        </form>
      ),
    },
    {
      id: 'upit',
      label: 'Pokretanje lige, partnerstvo i kontakt',
      badge: 'Suradnja u RH',
      content: (
        <div>
          {contactSent && (
            <div
              role="status"
              style={{
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--pitch-100)',
                color: 'var(--pitch-900)',
                fontWeight: 600,
                marginBottom: '1.25rem',
                border: '1px solid #86efac',
              }}
            >
              ✅ Vaša poruka je pripremljena za slanje na {associationInfo.email}!
            </div>
          )}

          <form ref={contactFormRef} onSubmit={handleContactSubmit} className="form-grid">
            <div className="field">
              <label htmlFor="cnt-name">Vaše ime i prezime / Organizacija *</label>
              <span id="cnt-name-hint" className="field__hint">
                Ime kontakt osobe, kluba, grada/općine ili tvrtke.
              </span>
              <input
                type="text"
                id="cnt-name"
                name="senderName"
                required
                minLength={2}
                autoComplete="name"
                aria-describedby="cnt-name-hint"
                data-error="cnt-name-error"
              />
              <div id="cnt-name-error" className="field__error">
                <span role="img" aria-label="Greška">
                  ❌
                </span>{' '}
                Unesite svoje ime i prezime ili naziv organizacije.
              </div>
            </div>

            <div className="field">
              <label htmlFor="cnt-email">Adresa e-pošte za odgovor *</label>
              <span id="cnt-email-hint" className="field__hint">
                Format: ime@domena.hr
              </span>
              <input
                type="email"
                id="cnt-email"
                name="senderEmail"
                required
                autoComplete="email"
                aria-describedby="cnt-email-hint"
                data-error="cnt-email-error"
              />
              <div id="cnt-email-error" className="field__error">
                <span role="img" aria-label="Greška">
                  ❌
                </span>{' '}
                Unesite ispravnu adresu e-pošte.
              </div>
            </div>

            <div className="field field--full">
              <label htmlFor="cnt-topic">Područje suradnje</label>
              <select id="cnt-topic" name="topic" defaultValue="Pokretanje lige ili turnira u našem gradu">
                <option value="Pokretanje lige ili turnira u našem gradu">
                  Pokretanje lige ili turnira u našem gradu / općini
                </option>
                <option value="Povezivanje sportskih udruga i klubova">
                  Povezivanje sportskih organizacija i kup prvaka
                </option>
                <option value="Sponzorstvo i donacije">Sponzorstvo i partnerstvo</option>
                <option value="Dopuna arhive natjecanja">
                  Dostava starih rezultata, zapisnika ili fotografija za arhivu
                </option>
                <option value="Ostalo">Opći upit udruzi</option>
              </select>
            </div>

            <div className="field field--full">
              <label htmlFor="cnt-msg">Poruka *</label>
              <span id="cnt-msg-hint" className="field__hint">
                Opišite svoj prijedlog suradnje ili upit (najmanje 10 znakova).
              </span>
              <textarea
                id="cnt-msg"
                name="message"
                required
                minLength={10}
                aria-describedby="cnt-msg-hint"
                data-error="cnt-msg-error"
              />
              <div id="cnt-msg-error" className="field__error">
                <span role="img" aria-label="Greška">
                  ❌
                </span>{' '}
                Poruka mora sadržavati najmanje 10 znakova.
              </div>
            </div>

            <div className="field--full">
              <button type="submit" className="btn btn--primary">
                <Send size={17} aria-hidden="true" />
                <span>Pošalji upit na e-poštu udruge</span>
              </button>
            </div>
          </form>
        </div>
      ),
    },
  ];

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="eyebrow eyebrow--gold">Prijave, suradnja i kontakt</p>
          <h1 id="page-main-heading" tabIndex={-1} className="page-banner__title">
            Prijava ekipe i kontakt s udrugom
          </h1>
          <p className="page-banner__lead">
            Prijavite momčad na nadolazeća natjecanja ili nam se javite radi organizacije lige i
            turnira u vašoj sredini bilo gdje u Hrvatskoj.
          </p>
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
            className="contact-layout-grid"
          >
            <div>
              <AccessibleTabs
                ariaLabel="Vrsta obrasca"
                tabs={formTabs}
                activeId={activeTab}
                onChange={setActiveTab}
              />
            </div>

            <aside style={{ display: 'grid', gap: '1.25rem' }}>
              <div
                style={{
                  background: 'var(--bg-dark)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.6rem',
                  display: 'grid',
                  gap: '1rem',
                }}
              >
                <span className="eyebrow eyebrow--gold" style={{ marginBottom: 0 }}>
                  Službeni podaci
                </span>
                <h2 style={{ fontSize: '1.6rem', textTransform: 'uppercase' }}>
                  {associationInfo.name}
                </h2>
                <p style={{ fontSize: '0.86rem', color: '#9bd5be', marginTop: '-0.55rem' }}>
                  {associationInfo.englishName}
                </p>

                <div style={{ display: 'grid', gap: '0.85rem', fontSize: '0.92rem' }}>
                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Users size={18} aria-hidden="true" style={{ color: '#6ee7b7', flexShrink: 0 }} />
                    <div>
                      <strong>Voditelji udruge:</strong>
                      <div style={{ color: 'var(--text-on-dark-muted)' }}>
                        Alen Miholić i Matija Vuković
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <MapPin size={18} aria-hidden="true" style={{ color: '#6ee7b7', flexShrink: 0 }} />
                    <div>
                      <strong>Sjedište udruge:</strong>
                      <div style={{ color: 'var(--text-on-dark-muted)' }}>
                        {associationInfo.address}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Globe size={18} aria-hidden="true" style={{ color: '#6ee7b7', flexShrink: 0 }} />
                    <div>
                      <strong>Područje djelovanja:</strong>
                      <div style={{ color: 'var(--text-on-dark-muted)' }}>
                        Cijela Hrvatska – povezivanje i organizacija liga i turnira
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <ShieldCheck size={18} aria-hidden="true" style={{ color: '#6ee7b7', flexShrink: 0 }} />
                    <div>
                      <strong>Registracijski podaci:</strong>
                      <div style={{ color: 'var(--text-on-dark-muted)' }}>
                        OIB: {associationInfo.oib}
                        <br />
                        Registar udruga RH: {associationInfo.registryNo} (20.04.2026.)
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Mail size={18} aria-hidden="true" style={{ color: '#6ee7b7', flexShrink: 0 }} />
                    <div>
                      <strong>Službena e-pošta:</strong>
                      <div style={{ color: 'var(--text-on-dark-muted)', wordBreak: 'break-all' }}>
                        {associationInfo.email}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn--outline-light btn--sm"
                  onClick={copyEmail}
                >
                  {copiedEmail ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  <span>{copiedEmail ? 'E-pošta je kopirana!' : 'Kopiraj adresu e-pošte'}</span>
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ČESTA PITANJA (FAQ) */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Pitanja i odgovori</p>
              <h2 className="section-title">Često postavljana pitanja</h2>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq) => (
              <article key={faq.question} className="faq-item">
                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                  <HelpCircle
                    size={20}
                    aria-hidden="true"
                    style={{ color: 'var(--pitch-700)', flexShrink: 0, marginTop: '0.2rem' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', textTransform: 'uppercase' }}>
                      {faq.question}
                    </h3>
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.94rem',
                        marginTop: '0.35rem',
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ModalDialog
        open={Boolean(submission)}
        onClose={() => setSubmission(null)}
        title="Prijavnica ekipe je pripremljena!"
        subtitle={submission ? `Evidencijski kôd: ${submission.refCode}` : undefined}
      >
        {submission && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              Pripremili smo sažetak prijave za momčad <strong>{submission.teamName}</strong> (
              {submission.cityOrigin}). Klikom na gumb ispod otvara se vaša aplikacija za e-poštu s
              ispunjenim podacima za slanje na <strong>{associationInfo.email}</strong>:
            </p>

            <div
              style={{
                padding: '1.1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-strong)',
                display: 'grid',
                gap: '0.45rem',
                fontSize: '0.9rem',
              }}
            >
              <div>
                <strong>Natjecanje / program:</strong> {submission.competitionTitle}
              </div>
              <div>
                <strong>Voditelj ekipe:</strong> {submission.captainName} ({submission.phone})
              </div>
              <div>
                <strong>Grad / mjesto:</strong> {submission.cityOrigin}
              </div>
              <div>
                <strong>Primatelj prijave:</strong> {associationInfo.email}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a href={buildMailtoHref(submission)} className="btn btn--primary">
                <Mail size={17} aria-hidden="true" />
                <span>Pošalji prijavu e-poštom</span>
              </a>
              <button type="button" className="btn btn--outline" onClick={copyEmail}>
                <Copy size={17} aria-hidden="true" />
                <span>{copiedEmail ? 'E-pošta kopirana!' : 'Kopiraj e-poštu udruge'}</span>
              </button>
            </div>
          </div>
        )}
      </ModalDialog>

      <style>{`
        @media (max-width: 58em) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
