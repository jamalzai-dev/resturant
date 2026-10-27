import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { BUSINESS, NAVIGATION } from '../../config/business';
import { PAGE_PATHS } from '../../routing/routes';
import { useLanguage } from '../../i18n/LanguageContext';
import { Brand } from '../Brand';
import { ContactLink } from '../ContactLink';
export function SiteFooter() {
  const { t, language } = useLanguage();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p>{t.footerMessage}</p>
          </div>
          <div className="footer-nav">
            <span className="eyebrow">{t.footerExplore}</span>
            <nav aria-label={t.footerExplore}>
              {NAVIGATION.filter((item) => item !== 'home').map((key) => (
                <Link key={key} to={PAGE_PATHS[key]}>
                  {t.nav[key]}
                  <ArrowUpRight size={14} className="directional" />
                </Link>
              ))}
            </nav>
          </div>
          <div className="footer-address">
            <span className="eyebrow">{t.footerVisit}</span>
            <address>{BUSINESS.address[language]}</address>
            <ContactLink className="footer-phone">
              <bdi>{BUSINESS.phone ?? t.demoPhone}</bdi>
              <ArrowUpRight size={15} className="directional" />
            </ContactLink>
          </div>
        </div>
        {BUSINESS.demo && <p className="footer-demo-note">{t.demoNotice}</p>}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {t.footerRights}
          </span>
          <span>
            <Sparkles size={14} />
            {t.footerBottom}
          </span>
          <Link to="/" aria-label={t.nav.home}>
            <ArrowRight size={19} style={{ transform: 'rotate(-90deg)' }} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

