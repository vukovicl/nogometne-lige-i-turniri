import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Menu,
  Phone,
  Mail,
  Trophy,
  ShieldCheck,
  ArrowUpRight,
  X,
} from 'lucide-react';
import { associationInfo } from '../data/siteData';
import { assetUrl } from '../utils/assetUrl';

const navItems = [
  { to: '/', label: 'Početna', end: true },
  { to: '/o-udruzi', label: 'O udruzi' },
  { to: '/natjecanja', label: 'Lige i turniri' },
  { to: '/raspored-i-tablice', label: 'Raspored i tablice' },
  { to: '/vijesti', label: 'Vijesti' },
  { to: '/galerija', label: 'Galerija' },
  { to: '/prijava-i-kontakt', label: 'Prijava i kontakt' },
];

const routeTitles: Record<string, string> = {
  '/': 'Nogometne lige i turniri Križevci | NLT Križevci',
  '/o-udruzi': 'O udruzi i dokumenti | NLT Križevci',
  '/natjecanja': 'Lige i turniri | NLT Križevci',
  '/raspored-i-tablice': 'Raspored, rezultati i tablice | NLT Križevci',
  '/vijesti': 'Vijesti i obavijesti | NLT Križevci',
  '/galerija': 'Foto galerija događanja | NLT Križevci',
  '/prijava-i-kontakt': 'Online prijava ekipe i kontakt | NLT Križevci',
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

  // Pomak na vrh, ažuriranje naslova dokumenta i fokusiranje glavnog naslova nakon promjene rute
  useEffect(() => {
    if (mobileDialogRef.current?.open) {
      mobileDialogRef.current.close();
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const matchedTitle =
      routeTitles[location.pathname] || `${associationInfo.name} | ${associationInfo.city}`;
    document.title = matchedTitle;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Pristupačno usmjeravanje fokusa nakon SPA/ViewTransition navigacije
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
              Prijave u tijeku: Zimski Kup Križevci
            </span>
            <span className="topbar__meta">
              <MapPin size={14} aria-hidden="true" />
              {associationInfo.city} i Prigorje
            </span>
          </div>
          <div className="topbar__right">
            <a href={`tel:${associationInfo.phone.replace(/\s+/g, '')}`} className="topbar__link">
              <Phone size={14} aria-hidden="true" />
              <span>{associationInfo.phone}</span>
            </a>
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
          <Link to="/" viewTransition className="brand" aria-label={`${associationInfo.fullName} – Početna`}>
            <img
              src={assetUrl('favicon.svg')}
              alt=""
              width={44}
              height={44}
              className="brand__crest"
            />
            <span className="brand__text">
              <span className="brand__kicker">Udruga • {associationInfo.city}</span>
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
              <span>Prijavi ekipu</span>
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

      {/* Mobilna navigacijska ladica (<dialog> modal u top-layeru) */}
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
                <span className="brand__kicker">Udruga Križevci</span>
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
              <span>Online prijava ekipe</span>
            </Link>
            <p className="mobile-drawer__contact">
              {associationInfo.address} • {associationInfo.phone}
            </p>
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
              <p className="eyebrow eyebrow--gold">Spremni za idući izlazak na teren?</p>
              <h2 className="site-footer__cta-title">
                Prijavite svoju ekipu ili postanite partner sportskih događanja u Križevcima
              </h2>
            </div>
            <div className="site-footer__cta-buttons">
              <Link to="/prijava-i-kontakt" viewTransition className="btn btn--accent">
                Prijava ekipe
              </Link>
              <Link to="/raspored-i-tablice" viewTransition className="btn btn--outline-light">
                <Calendar size={18} aria-hidden="true" />
                <span>Raspored i tablice</span>
              </Link>
            </div>
          </div>

          <div className="site-footer__grid">
            <div className="site-footer__col site-footer__col--brand">
              <div className="brand brand--light">
                <img src={assetUrl('favicon.svg')} alt="" width={44} height={44} />
                <div className="brand__text">
                  <span className="brand__kicker">Sportska udruga građana</span>
                  <span className="brand__name">{associationInfo.name}</span>
                </div>
              </div>
              <p className="site-footer__desc">{associationInfo.heroLead}</p>
              <div className="footer-credential-box">
                <ShieldCheck size={18} aria-hidden="true" />
                <div>
                  <strong>Podaci udruge za uplate kotizacija:</strong>
                  <span>IBAN: {associationInfo.iban}</span>
                  <span>OIB: {associationInfo.oib} • Sjedište: {associationInfo.city}</span>
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
              <h3 className="site-footer__heading">Naša natjecanja</h3>
              <ul className="site-footer__links">
                <li>
                  <Link to="/natjecanja/malonogometna-liga-dobrosusjedski-odnosi" viewTransition>
                    Liga "Dobrosusjedski odnosi"
                  </Link>
                </li>
                <li>
                  <Link to="/natjecanja/zimski-malonogometni-turnir-krizevci" viewTransition>
                    Zimski Kup Križevci
                  </Link>
                </li>
                <li>
                  <Link to="/natjecanja/rekreativna-i-veteranska-liga-krizevci" viewTransition>
                    Veteranska liga 35+
                  </Link>
                </li>
                <li>
                  <Link to="/natjecanja/kup-mladih-nada-prigorja" viewTransition>
                    Kup mladih nada (U-9 – U-13)
                  </Link>
                </li>
                <li>
                  <Link to="/o-udruzi#dokumenti" viewTransition>
                    Pravilnici i obrasci
                  </Link>
                </li>
              </ul>
            </div>

            <div className="site-footer__col">
              <h3 className="site-footer__heading">Kontakt i lokacija</h3>
              <ul className="site-footer__contact-list">
                <li>
                  <MapPin size={16} aria-hidden="true" />
                  <span>{associationInfo.address}</span>
                </li>
                <li>
                  <Phone size={16} aria-hidden="true" />
                  <a href={`tel:${associationInfo.phone.replace(/\s+/g, '')}`}>{associationInfo.phone}</a>
                </li>
                <li>
                  <Mail size={16} aria-hidden="true" />
                  <a href={`mailto:${associationInfo.email}`}>{associationInfo.email}</a>
                </li>
              </ul>
              <div className="site-footer__socials">
                <a href={associationInfo.socials.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
                <a href={associationInfo.socials.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
                <a href={associationInfo.socials.youtube} target="_blank" rel="noreferrer">
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="site-footer__bottom">
            <p>
              © {CURRENT_YEAR} {associationInfo.fullName}. Sva prava pridržana.
            </p>
            <p className="site-footer__note">
              Izrađeno za sportsku zajednicu Križevaca i Prigorja.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
