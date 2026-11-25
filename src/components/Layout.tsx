import { useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Menu,
  Mail,
  Trophy,
  ShieldCheck,
  ArrowUpRight,
  X,
  Globe,
} from 'lucide-react';
import { associationInfo } from '../data/siteData';
import { assetUrl } from '../utils/assetUrl';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Početna', end: true },
  { to: '/o-udruzi', label: 'O udruzi i priča' },
  { to: '/natjecanja', label: 'Lige i turniri' },
  { to: '/raspored-i-tablice', label: 'Rezultati i tablica' },
  { to: '/vijesti', label: 'Novosti' },
  { to: '/galerija', label: 'Galerija' },
  { to: '/prijava-i-kontakt', label: 'Prijava i kontakt' },
];

const routeTitles: Record<string, string> = {
  '/': 'Nogometne lige i turniri | Football Leagues and Tournaments',
  '/o-udruzi': 'O udruzi i priča o Dobrosusjedskim odnosima | Nogometne lige i turniri',
  '/natjecanja': 'Lige, turniri i programi | Nogometne lige i turniri',
  '/raspored-i-tablice': 'Rezultati, tablica i priznanja | Nogometne lige i turniri',
  '/vijesti': 'Novosti i arhiva | Nogometne lige i turniri',
  '/galerija': 'Foto galerija | Nogometne lige i turniri',
  '/prijava-i-kontakt': 'Prijava, suradnja i kontakt | Nogometne lige i turniri',
};

const CURRENT_YEAR = new Date().getFullYear();

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  const isFirstRender = useRef(true);
  const location = useLocation();

  useEffect(() => {
    const dialog = mobileDialogRef.current;
    if (!dialog) return;
    if (mobileMenuOpen && !dialog.open) {
      dialog.showModal();
    } else if (!mobileMenuOpen && dialog.open) {
      dialog.close();
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const dialog = mobileDialogRef.current;
    if (!dialog) return;
    const onClose = () => setMobileMenuOpen(false);
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  useEffect(() => {
    if (mobileDialogRef.current?.open) {
      mobileDialogRef.current.close();
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const matchedTitle =
      routeTitles[location.pathname] ||
      `${associationInfo.name} | ${associationInfo.englishName}`;
    document.title = matchedTitle;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const mainHeading = document.getElementById('page-main-heading');
    if (mainHeading) {
      mainHeading.focus({ preventScroll: true });
    }
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <a href="#glavni-sadrzaj" className="skip-link">
        Preskoči na glavni sadržaj
      </a>

      {/* Gornja informativna traka */}
      <div className="topbar">
        <div className="container topbar__inner">
          <div className="topbar__left">
            <span className="topbar__pill">
              <span className="pulse-dot" aria-hidden="true" />
              {associationInfo.englishName}
            </span>
            <span className="topbar__meta">
              <Globe size={14} aria-hidden="true" />
              Organizacija liga i turnira u Hrvatskoj
            </span>
          </div>
          <div className="topbar__right">
            <a href={`mailto:${associationInfo.email}`} className="topbar__link">
              <Mail size={14} aria-hidden="true" />
              <span>{associationInfo.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Zaglavlje i glavna navigacija */}
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" viewTransition className="brand" aria-label={`${associationInfo.name} – Početna`}>
            <img
              src={assetUrl('favicon.svg')}
              alt=""
              width={44}
              height={44}
              className="brand__crest"
            />
            <span className="brand__text">
              <span className="brand__kicker">Sportska udruga • Hrvatska</span>
              <span className="brand__name">{associationInfo.name}</span>
            </span>
          </Link>

          <nav className="primary-nav" aria-label="Glavna navigacija">
            <ul className="primary-nav__list">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    viewTransition
                    className="primary-nav__link"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <Link to="/prijava-i-kontakt" viewTransition className="btn btn--accent btn--sm header-cta">
              <Trophy size={16} aria-hidden="true" />
              <span>Prijava i suradnja</span>
            </Link>

            <button
              type="button"
              className="mobile-menu-trigger"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={22} aria-hidden="true" />
              <span>Izbornik</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobilna navigacijska ladica */}
      <dialog
        ref={mobileDialogRef}
        id="mobile-nav-drawer"
        {...({ closedby: 'any' } as Record<string, string>)}
        aria-label="Mobilna navigacija"
        className="mobile-drawer"
        onClick={(e) => {
          if (e.target === mobileDialogRef.current) setMobileMenuOpen(false);
        }}
      >
        <div className="mobile-drawer__sheet">
          <div className="mobile-drawer__head">
            <div className="brand">
              <img src={assetUrl('favicon.svg')} alt="" width={38} height={38} />
              <div className="brand__text">
                <span className="brand__kicker">Sportska udruga</span>
                <span className="brand__name">{associationInfo.shortName}</span>
              </div>
            </div>
            <button
              type="button"
              className="nlt-dialog__close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Zatvori izbornik"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobilna glavna navigacija" className="mobile-drawer__nav">
            <ul>
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    viewTransition
                    className="mobile-drawer__link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-drawer__footer">
            <Link
              to="/prijava-i-kontakt"
              viewTransition
              className="btn btn--accent btn--full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Trophy size={18} aria-hidden="true" />
              <span>Prijava ekipe ili suradnje</span>
            </Link>
            <p className="mobile-drawer__contact">{associationInfo.email}</p>
          </div>
        </div>
      </dialog>

      <main id="glavni-sadrzaj" className="site-main">
        <Outlet />
      </main>

      {/* Podnožje stranice */}
      <footer className="site-footer">
        <div className="container">
          <div className="site-footer__cta-band">
            <div>
              <p className="eyebrow eyebrow--gold">Povezujemo amaterski nogomet u Hrvatskoj</p>
              <h2 className="site-footer__cta-title">
                Prijavite momčad, predložite pokretanje lige u svojoj sredini ili postanite partner udruge
              </h2>
            </div>
            <div className="site-footer__cta-buttons">
              <Link to="/prijava-i-kontakt" viewTransition className="btn btn--accent">
                Javite nam se
              </Link>
              <Link to="/raspored-i-tablice" viewTransition className="btn btn--outline-light">
                <Calendar size={18} aria-hidden="true" />
                <span>Rezultati i tablica</span>
              </Link>
            </div>
          </div>

          <div className="site-footer__grid">
            <div className="site-footer__col site-footer__col--brand">
              <div className="brand brand--light">
                <img src={assetUrl('favicon.svg')} alt="" width={44} height={44} />
                <div className="brand__text">
                  <span className="brand__kicker">{associationInfo.englishName}</span>
                  <span className="brand__name">{associationInfo.name}</span>
                </div>
              </div>
              <p className="site-footer__desc">{associationInfo.heroLead}</p>
              <div className="footer-credential-box">
                <ShieldCheck size={18} aria-hidden="true" />
                <div>
                  <strong>Službeni podaci udruge:</strong>
                  <span>OIB: {associationInfo.oib} • Reg. broj: {associationInfo.registryNo}</span>
                  <span>Sjedište: {associationInfo.address}</span>
                </div>
              </div>
            </div>

            <div className="site-footer__col">
              <h3 className="site-footer__heading">Navigacija</h3>
              <ul className="site-footer__links">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} viewTransition>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="site-footer__col">
              <h3 className="site-footer__heading">Natjecanja i arhiva</h3>
              <ul className="site-footer__links">
                <li>
                  <Link to="/natjecanja/malonogometna-liga-dobrosusjedski-odnosi" viewTransition>
                    Dobrosusjedski odnosi 2026.
                  </Link>
                </li>
                <li>
                  <Link to="/natjecanja/organizacija-rekreativnih-liga-hrvatska" viewTransition>
                    Rekreativne lige u RH
                  </Link>
                </li>
                <li>
                  <Link to="/natjecanja/malonogometni-kupovi-i-turniri" viewTransition>
                    Otvoreni turniri i kupovi
                  </Link>
                </li>
                <li>
                  <Link to="/natjecanja/turniri-za-djecu-i-mlade" viewTransition>
                    Programi i turniri za mlade
                  </Link>
                </li>
                <li>
                  <Link to="/natjecanja/arhiva-dobrosusjedski-odnosi-2015-2016" viewTransition>
                    Arhiva sezona 2015. – 2016.
                  </Link>
                </li>
              </ul>
            </div>

            <div className="site-footer__col">
              <h3 className="site-footer__heading">Sjedište i kontakt</h3>
              <ul className="site-footer__contact-list">
                <li>
                  <MapPin size={16} aria-hidden="true" />
                  <span>{associationInfo.address}</span>
                </li>
                <li>
                  <Mail size={16} aria-hidden="true" />
                  <a href={`mailto:${associationInfo.email}`}>{associationInfo.email}</a>
                </li>
              </ul>
              <p style={{ fontSize: '0.82rem', marginTop: '0.85rem' }}>
                Voditelji udruge: Alen Miholić i Matija Vuković
              </p>
              <div className="site-footer__socials">
                <a href={associationInfo.socials.sofascore} target="_blank" rel="noreferrer">
                  Sofascore
                </a>
                <a href={associationInfo.socials.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
                <a href={associationInfo.socials.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="site-footer__bottom">
            <p>
              © {CURRENT_YEAR} Udruga {associationInfo.name} ({associationInfo.englishName}). Sva
              prava pridržana.
            </p>
            <p className="site-footer__note">
              Promicanje nogometa, malog nogometa i sportske rekreacije u Republici Hrvatskoj.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
