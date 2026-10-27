import { Link } from 'react-router-dom';
import { useId, useState } from 'react';
import { CalendarDays, Phone, ArrowUpRight } from 'lucide-react';
import { BUSINESS } from '../config/business';
import { useLanguage } from '../i18n/LanguageContext';
import { Dialog } from './Dialog';

/** An inquiry only: no request is sent and no reservation is stored. */
export function ReservationInquiry() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const phone = BUSINESS.reservations.phone ?? BUSINESS.internationalPhone;
  const canCall = !BUSINESS.demo && !!phone;
  if (!BUSINESS.reservations.enabled) return null;
  return (
    <>
      <button className="button reservation-button" onClick={() => setOpen(true)}>
        {t.bookTable}
        <CalendarDays size={18} />
      </button>
      {open && (
        <Dialog titleId={titleId} className="reservation-dialog" onClose={() => setOpen(false)}>
          <span className="reservation-icon">
            <CalendarDays size={30} />
          </span>
          <span className="eyebrow">{t.bookTable}</span>
          <h2 id={titleId}>{t.reservationTitle}</h2>
          <p>{t.reservationBody}</p>
          <div className="reservation-hint">{t.reservationHint}</div>
          {canCall ? (
            <a href={`tel:${phone}`} className="button primary">
              <Phone size={18} />
              {t.callReserve}
            </a>
          ) : (
            <p className="reservation-notice">{BUSINESS.demo ? t.reservationDemo : t.reservationPending}</p>
          )}
          <Link className="text-link" to="/menu" onClick={() => setOpen(false)}>
            {t.viewMenu}
            <ArrowUpRight size={17} />
          </Link>
        </Dialog>
      )}
    </>
  );
}
