import { Link } from 'react-router-dom';
import { BUSINESS } from '../config/business';
import { useLanguage } from '../i18n/LanguageContext';

export function Brand({ linked = true }: { linked?: boolean }) {
  const { language, t } = useLanguage();
  const content = (
    <>
      {BUSINESS.logo && (
        <img
          className="original-logo"
          src={BUSINESS.logo}
          alt={BUSINESS.name[language]}
          width="1254"
          height="1254"
        />
      )}
      <span className="wordmark" aria-hidden={BUSINESS.logo ? true : undefined}>
        <span>
          {BUSINESS.shortName[language]}
          <i aria-hidden="true">.</i>
        </span>
        <small>{t.restaurant}</small>
      </span>
    </>
  );
  return linked ? (
    <Link className="brand" to="/" aria-label={BUSINESS.name[language]}>
      {content}
    </Link>
  ) : (
    <span className="brand">{content}</span>
  );
}
