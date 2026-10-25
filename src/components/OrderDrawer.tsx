import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Download,
  Info,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';
import { BUSINESS } from '../config/business';
import { DELIVERY_MODES, deliveryStatus } from '../config/delivery';
import { MENU } from '../data/menu';
import { interpolate, useLanguage } from '../i18n/LanguageContext';
import { lineKey, orderTicket, unitPrice } from '../lib/order';
import { Brand } from './Brand';
import { Dialog } from './Dialog';
import { useOrder } from './OrderContext';
import { Photo } from './Photo';
import { ContactLink } from './ContactLink';

export function OrderDrawer() {
  const { t, language, number, money } = useLanguage();
  const { lines, mode, setMode, subtotal, count, update, isOpen, close } = useOrder();
  const [view, setView] = useState<'cart' | 'ticket'>('cart');
  const [copyFallback, setCopyFallback] = useState(false);
  const [feedback, setFeedback] = useState<'copied' | 'copyFailed' | 'downloaded' | null>(null);
  const status = deliveryStatus(subtotal, mode);
  const ticket = orderTicket(lines, mode, language, t);
  useEffect(() => {
    if (!isOpen) {
      setView('cart');
      setFeedback(null);
      setCopyFallback(false);
    }
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) document.getElementById('order-dialog-title')?.focus({ preventScroll: true });
  }, [view, isOpen]);
  useEffect(() => {
    if (feedback) {
      const timeout = window.setTimeout(() => setFeedback(null), 4000);
      return () => window.clearTimeout(timeout);
    }
  }, [feedback]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(ticket);
      setFeedback('copied');
    } catch {
      setCopyFallback(true);
      setFeedback('copyFailed');
    }
  }
  function download() {
    const url = URL.createObjectURL(new Blob(['\uFEFF', ticket], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${BUSINESS.id}-order-${language}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback('downloaded');
  }
  if (!isOpen) return null;
  return (
    <Dialog
      titleId="order-dialog-title"
      className={view === 'cart' ? 'order-drawer' : 'ticket-dialog'}
      onClose={close}
    >
      {view === 'cart' ? (
        <>
          <div className="drawer-heading">
            <span className="eyebrow">{t.drawerEyebrow}</span>
            <h2 id="order-dialog-title" tabIndex={-1}>
              {t.drawerTitle}
            </h2>
            <p>{interpolate(t.itemCount, { count: number(count) })}</p>
          </div>
          {lines.length === 0 ? (
            <div className="empty-order">
              <div className="empty-order-icon">
                <ShoppingBag size={36} strokeWidth={1} />
              </div>
              <h3>{t.emptyTitle}</h3>
              <p>{t.emptyBody}</p>
              <a className="button primary" href="#menu" onClick={close}>
                {t.backMenu}
                <ArrowRight className="directional" size={17} />
              </a>
            </div>
          ) : (
            <>
              <div className="order-lines">
                {lines.map((line) => {
                  const item = MENU.find((item) => item.id === line.id)!;
                  return (
                    <article className="order-line" key={lineKey(line)}>
                      <Photo image={item.image} sizes="80px" />
                      <div className="order-line-main">
                        <h3>{item.name[language]}</h3>
                        <p>
                          {line.size && `${t.sizes[line.size]} · `}
                          {money(unitPrice(line)!)}
                        </p>
                        <div className="quantity-control">
                          <button
                            onClick={() => update(lineKey(line), line.quantity - 1)}
                            aria-label={`${t.decrease}: ${item.name[language]}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{number(line.quantity)}</span>
                          <button
                            disabled={line.quantity >= 99}
                            onClick={() => update(lineKey(line), line.quantity + 1)}
                            aria-label={`${t.increase}: ${item.name[language]}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="order-line-end">
                        <strong>{money(unitPrice(line)! * line.quantity)}</strong>
                        <button
                          className="remove-button"
                          onClick={() => update(lineKey(line), 0)}
                          aria-label={`${t.remove}: ${item.name[language]}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              <fieldset className="delivery-options">
                <legend>{t.serviceMode}</legend>
                {DELIVERY_MODES.map((option) => (
                  <label
                    className={`delivery-option ${mode === option.id ? 'selected' : ''}`}
                    key={option.id}
                  >
                    <input
                      type="radio"
                      name="service-mode"
                      value={option.id}
                      checked={mode === option.id}
                      onChange={() => setMode(option.id)}
                    />
                    <span>
                      <strong>{t.modes[option.id]}</strong>
                      <small>
                        {interpolate(t.modeDescriptions[option.id], { minimum: money(option.minimum) })}
                      </small>
                    </span>
                    {option.id === 'pickup' ? <ShoppingBag size={18} /> : <Truck size={19} />}
                  </label>
                ))}
              </fieldset>
              <div className={`delivery-feedback ${status.eligible ? 'eligible' : ''}`} aria-live="polite">
                <p>
                  {status.eligible ? <Check size={17} /> : <Truck size={17} />}
                  <span>
                    {mode === 'pickup'
                      ? t.pickupEligible
                      : status.eligible
                        ? t.eligible
                        : interpolate(t.remaining, { amount: money(status.remaining) })}
                  </span>
                </p>
                {mode !== 'pickup' && (
                  <div
                    className="delivery-progress"
                    role="progressbar"
                    aria-label={t.progress}
                    aria-valuenow={Math.round(status.progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span style={{ width: `${status.progress}%` }} />
                  </div>
                )}
              </div>
              <div className="drawer-summary">
                <div className="summary-total">
                  <span>{t.subtotal}</span>
                  <strong data-testid="subtotal">{money(subtotal)}</strong>
                </div>
                <button
                  className="button primary full-width"
                  disabled={!status.eligible}
                  onClick={() => setView('ticket')}
                >
                  {t.ticket}
                  <ArrowRight className="directional" size={18} />
                </button>
                {!status.eligible && <p className="minimum-helper">{t.minimumHelper}</p>}
                <p className="call-notice">
                  <Info size={15} />
                  <span>{BUSINESS.demo ? t.demoTicketDisclaimer : t.callNotice}</span>
                </p>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="ticket-content">
          <Brand linked={false} />
          <span className="eyebrow">{t.ticketEyebrow}</span>
          <h2 id="order-dialog-title" tabIndex={-1}>
            {t.ticketTitle}
          </h2>
          <div className="ticket-service">
            <span>{t.ticketService}</span>
            <strong>{t.modes[mode]}</strong>
          </div>
          <div className="ticket-lines">
            {lines.map((line) => {
              const item = MENU.find((item) => item.id === line.id)!;
              return (
                <div className="ticket-line" key={lineKey(line)}>
                  <span>
                    <strong>
                      {number(line.quantity)} × {item.name[language]}
                    </strong>
                    <small>
                      {line.size ? `${t.sizes[line.size]} · ` : ''}
                      {money(unitPrice(line)!)}
                    </small>
                  </span>
                  <b>{money(unitPrice(line)! * line.quantity)}</b>
                </div>
              );
            })}
          </div>
          {mode !== 'pickup' && (
            <div className="ticket-delivery">
              <span>{t.freeDelivery}</span>
              <span>{money(0)}</span>
            </div>
          )}
          <div className="summary-total">
            <span>{t.total}</span>
            <strong>{money(subtotal)}</strong>
          </div>
          <p className="ticket-disclaimer">
            <Info size={17} />
            {BUSINESS.demo ? t.demoTicketDisclaimer : t.ticketDisclaimer}
          </p>
          <ContactLink className="button primary full-width call-now">
            <Phone size={19} />
            <span>
              {BUSINESS.demo ? t.demoCall : t.callNow}
              {BUSINESS.phone && <small dir="ltr">{BUSINESS.phone}</small>}
            </span>
            <ArrowUpRightIcon />
          </ContactLink>
          <div className="ticket-actions">
            <button className="button secondary" onClick={copy}>
              <Copy size={16} />
              {t.copy}
            </button>
            <button className="button secondary" onClick={download}>
              <Download size={16} />
              {t.download}
            </button>
          </div>
          <p role="status" className="ticket-feedback">
            {feedback && t[feedback]}
          </p>
          {copyFallback && (
            <textarea
              className="ticket-copy-text"
              readOnly
              value={ticket}
              aria-label={t.ticketText}
              onFocus={(event) => event.target.select()}
            />
          )}
          <button
            className="text-link edit-order"
            onClick={() => {
              setView('cart');
              setFeedback(null);
            }}
          >
            <ArrowLeft size={16} className="directional" />
            {t.editOrder}
          </button>
        </div>
      )}
    </Dialog>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight className="directional" size={20} />;
}

export function StickyOrder() {
  const { count, subtotal, open, isOpen } = useOrder();
  const { t, money, number } = useLanguage();
  if (!count || isOpen) return null;
  return (
    <button className="sticky-order" onClick={open}>
      <span>
        <ShoppingBag size={18} />
        <b>{number(count)}</b>
        {t.viewOrder}
      </span>
      <strong>
        {money(subtotal)}
        <ArrowRight className="directional" size={18} />
      </strong>
    </button>
  );
}
