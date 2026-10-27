import { Link, NavLink, useLocation } from 'react-router-dom';
import { PAGE_PATHS } from '../routing/routes';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Globe2, MapPin, Menu, Phone, ShoppingBag, X } from 'lucide-react';
import { BUSINESS, NAVIGATION } from '../config/business';
import { useLanguage } from '../i18n/LanguageContext';
import { Brand } from './Brand';
import { useOrder } from './OrderContext';
import { ContactLink } from './ContactLink';

export function Header() {
  const { t, language, toggle, number } = useLanguage();
  const { count, open } = useOrder();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setMobileOpen(false), [pathname]);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || document.querySelector('dialog[open]')) return;
      setMobileOpen(false);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia('(min-width: 951px)');
    const closeOnDesktop = () => {
      if (desktop.matches) {
        if (!document.querySelector('dialog[open]')) {
          requestAnimationFrame(() =>
            document.querySelector<HTMLAnchorElement>('.desktop-nav a[aria-current]')?.focus(),
          );
        }
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', dismiss);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      window.removeEventListener('keydown', dismiss);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [mobileOpen]);
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById('main');
          main?.focus();
          main?.scrollIntoView();
        }}
      >
        {t.skip}
      </a>
      <div className="topbar">
        <div className="container">
          <span>
            {BUSINESS.demo ? (
              <>
                <b>{t.demoLabel}</b> · {t.welcome}
              </>
            ) : (
              BUSINESS.name[language]
            )}
          </span>
          <Link to="/about#contact">
            <MapPin size={12} />
            {BUSINESS.demo ? t.topLocation : BUSINESS.locality[language]}
            <ArrowUpRight className="directional" size={12} />
          </Link>
        </div>
      </div>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label={t.openNav}>
            {NAVIGATION.map((key) => (
              <NavLink key={key} to={PAGE_PATHS[key]} end>
                {t.nav[key]}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <button className="language-button" onClick={toggle} aria-label={t.languageSwitch}>
              <Globe2 size={16} />
              <span lang={language === 'en' ? 'ps' : 'en'}>{language === 'en' ? 'پښتو' : 'English'}</span>
            </button>
            <button className="order-button" onClick={open} aria-label={`${t.order} (${number(count)})`}>
              <ShoppingBag size={17} />
              <span>{t.order}</span>
              <b>{number(count)}</b>
            </button>
            <button
              ref={toggleRef}
              className="icon-button mobile-toggle"
              aria-label={mobileOpen ? t.closeNav : t.openNav}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label={t.openNav}>
            {NAVIGATION.map((key, index) => (
              <NavLink key={key} to={PAGE_PATHS[key]} end onClick={() => setMobileOpen(false)}>
                <span className="nav-number" aria-hidden="true">
                  0{index + 1}
                </span>
                {t.nav[key]}
                <ArrowUpRight className="directional" size={18} />
              </NavLink>
            ))}
            <ContactLink className="mobile-phone">
              <Phone size={17} />
              <bdi>{BUSINESS.phone ?? t.demoPhone}</bdi>
            </ContactLink>
          </nav>
        )}
      </header>
    </>
  );
}
