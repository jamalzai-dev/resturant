import { useId, useState, type ReactNode } from 'react';
import { BUSINESS, phoneHref, directionsUrl } from '../config/business';
import { useLanguage } from '../i18n/LanguageContext';
import { Dialog } from './Dialog';
import { Phone, MapPin } from 'lucide-react';

/** A real contact link when configured; an honest, working demo interaction otherwise. */
export function ContactLink({
  kind = 'phone',
  className,
  children,
  'aria-label': label,
}: {
  kind?: 'phone' | 'directions';
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const url = kind === 'phone' ? phoneHref : directionsUrl;
  if (url)
    return (
      <a
        className={className}
        href={url}
        aria-label={label}
        {...(kind === 'directions' ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    );
  return (
    <>
      <button className={className} aria-label={label} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && (
        <Dialog titleId={titleId} className="contact-demo-dialog" onClose={() => setOpen(false)}>
          <span className="contact-demo-icon">
            {kind === 'phone' ? <Phone size={28} /> : <MapPin size={28} />}
          </span>
          <span className="eyebrow">{BUSINESS.demo ? t.demoLabel : t.nav.contact}</span>
          <h2 id={titleId}>
            {BUSINESS.demo ? (kind === 'phone' ? t.demoTitle : t.demoMapTitle) : t.contactPending}
          </h2>
          <p>{BUSINESS.demo ? (kind === 'phone' ? t.demoPhoneBody : t.demoMapBody) : t.confirmHours}</p>
          <button className="button primary" onClick={() => setOpen(false)}>
            {t.demoClose}
          </button>
        </Dialog>
      )}
    </>
  );
}
