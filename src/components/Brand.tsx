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
    <a className="brand" href="#home" aria-label={BUSINESS.name[language]}>
      {content}
    </a>
  ) : (
    <span className="brand">{content}</span>
  );
}
