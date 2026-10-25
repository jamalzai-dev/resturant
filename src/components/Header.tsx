import { useEffect, useState } from 'react';
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
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
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
          <a href="#contact">
            <MapPin size={12} />
            {BUSINESS.demo ? t.topLocation : BUSINESS.locality[language]}
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label={t.openNav}>
            {NAVIGATION.map((key) => (
              <a key={key} href={`#${key}`}>
                {t.nav[key]}
              </a>
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
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label={t.openNav}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setMobileOpen(false);
                document.querySelector<HTMLButtonElement>('.mobile-toggle')?.focus();
              }
            }}
          >
            {NAVIGATION.map((key, index) => (
              <a key={key} href={`#${key}`} onClick={() => setMobileOpen(false)}>
                <span className="nav-number" aria-hidden="true">
                  0{index + 1}
                </span>
                {t.nav[key]}
                <ArrowUpRight size={18} />
              </a>
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
