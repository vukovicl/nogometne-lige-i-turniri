import { useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Check,
  Clock,
  Copy,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  Trophy,
} from 'lucide-react';
import { associationInfo, competitions, faqs } from '../data/siteData';
import { AccessibleTabs } from '../components/AccessibleTabs';
import { ModalDialog } from '../components/ModalDialog';
import { useAccessibleFormValidation } from '../utils/accessibleForms';

interface RegistrationSummary {
  refCode: string;
  competitionTitle: string;
  entryFee: string;
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
  const paramComp = searchParams.get('natjecanje');
  const initialComp =
    paramComp && competitions.some((c) => c.id === paramComp) ? paramComp : competitions[0].id;
  const initialTab = searchParams.get('tab') === 'upit' ? 'upit' : 'prijava';

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectedCompId, setSelectedCompId] = useState<string>(initialComp);
  const [submission, setSubmission] = useState<RegistrationSummary | null>(null);
  const [contactSent, setContactSent] = useState(false);
  const [copiedIban, setCopiedIban] = useState(false);

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
      entryFee: comp.entryFee,
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
    setContactSent(true);
    form.reset();
  };

  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(associationInfo.iban);
      setCopiedIban(true);
      setTimeout(() => setCopiedIban(false), 2500);
    } catch {
      // Clipboard možda nije dostupan u nekim okruženjima
    }
  };

  const buildMailtoHref = (s: RegistrationSummary) => {
    const subject = encodeURIComponent(`Prijava ekipe: ${s.teamName} (${s.competitionTitle})`);
    const body = encodeURIComponent(
      [
        `Poštovani,`,
        ``,
        `Šaljemo online prijavu ekipe putem web stranice Udruge:`,
        `- Evidencijski broj: ${s.refCode}`,
        `- Natjecanje: ${s.competitionTitle}`,
        `- Naziv ekipe: ${s.teamName}`,
        `- Mjesto / kvart: ${s.cityOrigin}`,
        `- Voditelj ekipe: ${s.captainName}`,
        `- Kontakt mobitel: ${s.phone}`,
        `- E-mail: ${s.email}`,
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
      label: 'Online prijava ekipe',
      badge: 'Brza prijava',
      content: (
        <form ref={regFormRef} onSubmit={handleRegistrationSubmit} className="form-grid">
          <div className="field field--full">
            <label htmlFor="reg-competition">Odaberite ligu ili turnir *</label>
            <span id="reg-comp-hint" className="field__hint">
              Odaberite natjecanje za koje prijavljujete svoju momčad.
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
              {competitions
                .filter((c) => c.status !== 'zavrseno')
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.statusLabel} – {c.entryFee})
                  </option>
                ))}
            </select>
            <div id="reg-competition-error" className="field__error">
              <span role="img" aria-label="Greška">
                ❌
              </span>{' '}
              Molimo odaberite željeno natjecanje s popisa.
            </div>
          </div>

          <div className="field">
            <label htmlFor="reg-team">Naziv ekipe *</label>
            <span id="reg-team-hint" className="field__hint">
              Npr. MNK Gornji Grad ili naziv sponzora/kvarta (min. 2 znaka).
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
              Unesite službeni naziv ekipe (najmanje 2 znaka).
            </div>
          </div>

          <div className="field">
            <label htmlFor="reg-city">Mjesto / Kvart / Općina *</label>
            <span id="reg-city-hint" className="field__hint">
              Npr. Križevci, Sv. Ivan Žabno, Kalnik, Koprivnica...
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
              Unesite mjesto ili kvart iz kojeg ekipa dolazi.
            </div>
          </div>

          <div className="field">
            <label htmlFor="reg-captain">Ime i prezime voditelja ekipe *</label>
            <span id="reg-captain-hint" className="field__hint">
              Osoba za kontakt i službenu WhatsApp grupu kapetana.
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
              Unesite ime i prezime voditelja ili kapetana ekipe.
            </div>
          </div>

          <div className="field">
            <label htmlFor="reg-phone">Broj mobitela voditelja *</label>
            <span id="reg-phone-hint" className="field__hint">
              Format: +385 98 123 4567 ili 098 123 4567
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
            <label htmlFor="reg-email">E-mail adresa *</label>
            <span id="reg-email-hint" className="field__hint">
              Format: ime.prezime@primjer.hr (za potvrdu i upute)
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
              Unesite valjanu e-mail adresu u formatu korisnik@domena.hr.
            </div>
          </div>

          <div className="field">
            <label htmlFor="reg-players">Okvirni broj igrača u rosteru</label>
            <span id="reg-players-hint" className="field__hint">
              Točan popis igrača možete predati do prve utakmice.
            </span>
            <select id="reg-players" name="playersCount" defaultValue="10" aria-describedby="reg-players-hint">
              <option value="6 – 8 igrača">6 – 8 igrača</option>
              <option value="9 – 10 igrača">9 – 10 igrača</option>
              <option value="11 – 12 igrača">11 – 12 igrača</option>
              <option value="13 – 15 igrača (liga)">13 – 15 igrača (liga)</option>
            </select>
          </div>

          <div className="field field--full">
            <label htmlFor="reg-notes">Boja dresova ili napomena za termine (neobavezno)</label>
            <span id="reg-notes-hint" className="field__hint">
              Navedite primarnu boju dresova ili zamolbu oko satnice u skupini.
            </span>
            <textarea
              id="reg-notes"
              name="notes"
              aria-describedby="reg-notes-hint"
              placeholder="Npr. Crno-zeleni dresovi; molimo kasniji termin petkom zbog putovanja..."
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
                Potvrđujem da je ekipa upoznata s općim propozicijama Udruge "Nogometne lige i
                turniri" Križevci te da igrači nastupaju na vlastitu odgovornost. *
              </label>
            </div>
            <div id="reg-rules-error" className="field__error">
              <span role="img" aria-label="Greška">
                ❌
              </span>{' '}
              Za slanje prijave potrebno je prihvatiti propozicije natjecanja.
            </div>
          </div>

          <div className="field--full" style={{ marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn--primary btn--lg">
              <Trophy size={19} aria-hidden="true" />
              <span>Generiraj prijavu i upute za kotizaciju</span>
            </button>
          </div>
        </form>
      ),
    },
    {
      id: 'upit',
      label: 'Opći upit, sponzorstva i članstvo',
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
              ✅ Hvala na poruci! Vaš upit je pripremljen – možete nas kontaktirati i izravno na{' '}
              {associationInfo.email} ili {associationInfo.phone}.
            </div>
          )}

          <form ref={contactFormRef} onSubmit={handleContactSubmit} className="form-grid">
            <div className="field">
              <label htmlFor="cnt-name">Vaše ime i prezime / Tvrtka *</label>
              <span id="cnt-name-hint" className="field__hint">
                Unesite ime kontakt osobe ili naziv organizacije.
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
                Unesite svoje ime i prezime (najmanje 2 znaka).
              </div>
            </div>

            <div className="field">
              <label htmlFor="cnt-email">E-mail adresa za odgovor *</label>
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
                Unesite ispravnu e-mail adresu za povratni odgovor.
              </div>
            </div>

            <div className="field field--full">
              <label htmlFor="cnt-topic">Tema upita</label>
              <select id="cnt-topic" name="topic" defaultValue="Sponzorstvo i donacije">
                <option value="Sponzorstvo i donacije">Sponzorstvo i partnerstvo s udrugom</option>
                <option value="Učlanjenje / Volontiranje / Suđenje">
                  Učlanjenje u udrugu, suđenje ili volontiranje
                </option>
                <option value="Upit škola nogometa (Mladi)">
                  Upit škola nogometa (Kup mladih nada)
                </option>
                <option value="Ostalo">Opći upit / Prijedlog</option>
              </select>
            </div>

            <div className="field field--full">
              <label htmlFor="cnt-msg">Vaša poruka *</label>
              <span id="cnt-msg-hint" className="field__hint">
                Napišite detalje svog prijedloga ili pitanja (najmanje 10 znakova).
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
                <span>Pošalji upit udruzi</span>
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
          <p className="eyebrow eyebrow--gold">Prijave ekipa i informacije</p>
          <h1 id="page-main-heading" tabIndex={-1} className="page-banner__title">
            Online prijava i kontakt
          </h1>
          <p className="page-banner__lead">
            Prijavite svoju ekipu na željenu ligu ili turnir u nekoliko klikova ili nam se obratite
            za sponzorstva, učlanjenje i suradnju na području Križevaca.
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

            {/* Desni kontakt panel */}
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
                  Izravni kontakt
                </span>
                <h2 style={{ fontSize: '1.6rem', textTransform: 'uppercase' }}>
                  {associationInfo.fullName}
                </h2>

                <div style={{ display: 'grid', gap: '0.85rem', fontSize: '0.92rem' }}>
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
                    <Phone size={18} aria-hidden="true" style={{ color: '#6ee7b7', flexShrink: 0 }} />
                    <div>
                      <strong>Voditelj natjecanja / Tajništvo:</strong>
                      <div style={{ color: 'var(--text-on-dark-muted)' }}>
                        {associationInfo.phone} • {associationInfo.secondaryPhone}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Mail size={18} aria-hidden="true" style={{ color: '#6ee7b7', flexShrink: 0 }} />
                    <div>
                      <strong>E-mail adrese:</strong>
                      <div style={{ color: 'var(--text-on-dark-muted)' }}>
                        {associationInfo.email}
                        <br />
                        {associationInfo.registrationEmail}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Clock size={18} aria-hidden="true" style={{ color: '#6ee7b7', flexShrink: 0 }} />
                    <div>
                      <strong>Dostupnost za upite:</strong>
                      <div style={{ color: 'var(--text-on-dark-muted)' }}>
                        {associationInfo.workingHours}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', color: '#fde047', fontWeight: 700 }}>
                    PODACI ZA UPLATU KOTIZACIJE
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      marginTop: '0.25rem',
                      fontSize: '0.95rem',
                      wordBreak: 'break-all',
                    }}
                  >
                    {associationInfo.iban}
                  </div>
                  <button
                    type="button"
                    className="btn btn--outline-light btn--sm"
                    style={{ marginTop: '0.65rem' }}
                    onClick={copyIban}
                  >
                    {copiedIban ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                    <span>{copiedIban ? 'IBAN kopiran!' : 'Kopiraj IBAN udruge'}</span>
                  </button>
                </div>
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
              <p className="eyebrow">Pitanja kapetana i sudionika</p>
              <h2 className="section-title">Često postavljana pitanja (FAQ)</h2>
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

      {/* MODAL POTVRDE PRIJAVE */}
      <ModalDialog
        open={Boolean(submission)}
        onClose={() => setSubmission(null)}
        title="Prijavnica ekipe uspješno je pripremljena!"
        subtitle={submission ? `Evidencijski kôd: ${submission.refCode}` : undefined}
      >
        {submission && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              Sačuvali smo sažetak prijave za ekipu <strong>{submission.teamName}</strong> (
              {submission.cityOrigin}). Za potvrdu mjesta u ždrijebu pošaljite pripremljenu
              prijavnicu jednim klikom na službeni e-mail udruge i izvršite uplatu kotizacije:
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
                <strong>Natjecanje:</strong> {submission.competitionTitle}
              </div>
              <div>
                <strong>Voditelj ekipe:</strong> {submission.captainName} ({submission.phone})
              </div>
              <div>
                <strong>Primatelj uplate:</strong> {associationInfo.fullName}
              </div>
              <div>
                <strong>IBAN:</strong> {associationInfo.iban}
              </div>
              <div>
                <strong>Iznos kotizacije:</strong> {submission.entryFee}
              </div>
              <div>
                <strong>Opis plaćanja:</strong> Kotizacija – {submission.teamName} ({submission.refCode})
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a href={buildMailtoHref(submission)} className="btn btn--primary">
                <Mail size={17} aria-hidden="true" />
                <span>Pošalji prijavnicu e-mailom</span>
              </a>
              <button type="button" className="btn btn--outline" onClick={copyIban}>
                <Copy size={17} aria-hidden="true" />
                <span>{copiedIban ? 'IBAN je kopiran!' : 'Kopiraj IBAN'}</span>
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
