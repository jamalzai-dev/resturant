import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Heart,
  MapPin,
  Phone,
  ShoppingBag,
  Sparkles,
  Sun,
  Truck,
  UsersRound,
} from 'lucide-react';
import { BUSINESS, NAVIGATION } from '../config/business';
import { deliveryStatus } from '../config/delivery';
import { SITE_IMAGES } from '../config/siteImages';
import { MENU } from '../data/menu';
import { interpolate, useLanguage } from '../i18n/LanguageContext';
import { Photo } from './Photo';
import { AddButton } from './MenuSection';
import { Dialog } from './Dialog';
import { Brand } from './Brand';
import { ContactLink } from './ContactLink';
import { MenuLink } from './MenuSection';
import { useOrder } from './OrderContext';
import { SECTIONS } from '../config/sections';
import type { PizzaSize } from '../data/menu';

export function Hero() {
  const { t, money } = useLanguage();
  const deliverySummary = interpolate(t.deliverySmall, {
    nearby: money(deliveryStatus(0, 'nearby').minimum),
    city: money(deliveryStatus(0, 'city').minimum),
  });
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="tiny-star">✳</span>
            {t.heroEyebrow}
          </span>
          <h1 id="hero-title">
            {t.heroTitle1}
            <br />
            {t.heroTitle2}
            <br />
            <em>{t.heroTitle3}</em>
          </h1>
          <p className="hero-description">{t.heroBody}</p>
          <div className="hero-buttons">
            <a className="button primary" href="#menu">
              {t.explore}
              <ArrowUpRight className="directional" size={18} />
            </a>
            <ContactLink className="button text-button">
              <Phone size={16} />
              {t.callToOrder}
            </ContactLink>
          </div>
          <a className="hero-foot" href="#signature">
            <span>
              <ArrowDown size={17} />
            </span>
            {t.heroNote}
          </a>
        </div>
        <div className="hero-visual">
          <Photo
            image={SITE_IMAGES.hero}
            priority
            className="hero-photo"
            sizes="(max-width: 760px) 100vw, 52vw"
          />
          <div className="hero-image-caption">
            <span>{SITE_IMAGES.hero.preview ? t.heroImageNote : t.heroImageNoteReal}</span>
          </div>
        </div>
      </section>
      <CategoryPreviews />
      <div className="hospitality-strip">
        <div className="container">
          <div>
            <UsersRound />
            <span>
              <strong>{t.dineIn}</strong>
              <small>{t.dineInSmall}</small>
            </span>
          </div>
          <div>
            <Truck />
            <span>
              <strong>{t.deliveryStrip}</strong>
              <small>{deliverySummary}</small>
            </span>
          </div>
          <div>
            <Phone />
            <span>
              <strong>{t.phoneStrip}</strong>
              <small>{t.phoneSmall}</small>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export function Signature() {
  const { t, language, money } = useLanguage();
  const dishes = SECTIONS.featuredIds.map((id) => MENU.find((item) => item.id === id)!);
  return (
    <section id="signature" className="signature-section container section-space">
      <div className="section-heading heading-split">
        <div>
          <span className="eyebrow">{t.signatureEyebrow}</span>
          <h2>{t.signatureTitle}</h2>
        </div>
        <a className="text-link" href="#menu">
          {t.fullMenu}
          <ArrowUpRight className="directional" size={18} />
        </a>
      </div>
      <p className="section-intro">{t.signatureBody}</p>
      <div className="signature-grid">
        {dishes.map((dish, index) => (
          <article className="signature-card" key={dish.id}>
            <div className="signature-photo">
              <Photo image={dish.image} sizes="(max-width: 760px) 100vw, 40vw" />
              <span className="signature-number" aria-hidden="true">
                0{index + 1}
              </span>
              <span className="signature-label">{t.tags[dish.tag!]}</span>
            </div>
            <div className="signature-details">
              <div>
                <h3>{dish.name[language]}</h3>
                <p>
                  {dish.sizes && `${t.from} `}
                  {money(dish.price!)}
                </p>
              </div>
              <AddButton item={dish} size={dish.sizes ? 'small' : undefined} compact />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PizzaShowcase() {
  const { t, language, money } = useLanguage();
  const [id, setId] = useState(SECTIONS.pizzaIds[0]);
  const [size, setSize] = useState<PizzaSize>('medium');
  const item = MENU.find((item) => item.id === id)!;
  return (
    <section className="pizza-showcase section-space container" aria-labelledby="pizza-showcase-title">
      <div className="pizza-showcase-image">
        <Photo key={id} image={item.image} sizes="(max-width: 760px) 100vw, 50vw" />
        <span className="pizza-photo-label">{t.photoNote}</span>
      </div>
      <div className="pizza-showcase-copy">
        <span className="eyebrow">{t.pizzaEyebrow}</span>
        <h2 id="pizza-showcase-title">{t.pizzaTitle}</h2>
        <p>{t.pizzaBody}</p>
        <div className="pizza-picks" role="group" aria-label={t.categories.pizza}>
          {SECTIONS.pizzaIds.map((value) => (
            <button
              key={value}
              aria-pressed={id === value}
              className={id === value ? 'active' : ''}
              onClick={() => setId(value)}
            >
              {MENU.find((dish) => dish.id === value)!.name[language]}
            </button>
          ))}
        </div>
        <fieldset className="size-selector">
          <legend className="sr-only">{t.chooseSize}</legend>
          {(['small', 'medium', 'large'] as PizzaSize[]).map((value) => (
            <label key={value} className={size === value ? 'selected' : ''}>
              <input
                type="radio"
                name="showcase-size"
                checked={value === size}
                onChange={() => setSize(value)}
              />
              <span>{t.sizes[value]}</span>
            </label>
          ))}
        </fieldset>
        <div className="pizza-showcase-action">
          <strong key={id + size} className="price-change">
            {money(item.sizes![size])}
          </strong>
          <AddButton item={item} size={size} />
        </div>
        <MenuLink category="pizza" className="text-link">
          {t.viewPizzas}
          <ArrowUpRight className="directional" size={17} />
        </MenuLink>
      </div>
    </section>
  );
}

export function FamilyPlatter() {
  const { t, language, money } = useLanguage();
  const [open, setOpen] = useState(false);
  const platters = MENU.filter((item) => item.category === 'platter');
  const [selected, setSelected] = useState(platters[0].id);
  const platter = platters.find((item) => item.id === selected)!;
  return (
    <section className="platter-section">
      <div className="container platter-grid">
        <div className="platter-visual">
          <Photo key={platter.id} image={platter.image} sizes="(max-width: 760px) 100vw, 55vw" />
          <div className="platter-image-label">
            <UsersRound size={18} />
            <span>{t.platterEyebrow}</span>
          </div>
        </div>
        <div className="platter-copy">
          <span className="eyebrow">{t.platterEyebrow}</span>
          <h2>
            {t.platterTitle1}
            <br />
            <em>{t.platterTitle2}</em>
          </h2>
          <p>{t.platterBody}</p>
          <div className="platter-options" role="group" aria-label={t.categories.platter}>
            {platters.map((item) => (
              <button
                key={item.id}
                className={item.id === selected ? 'selected' : ''}
                aria-pressed={item.id === selected}
                onClick={() => setSelected(item.id)}
              >
                <span>{item.name[language]}</span>
                <strong>{item.price !== null ? money(item.price) : t.askPrice}</strong>
              </button>
            ))}
          </div>
          <div className="platter-actions">
            <AddButton item={platter} />
            <button className="text-link" onClick={() => setOpen(true)}>
              {t.inspectPlatter}
              <ArrowUpRight className="directional" size={17} />
            </button>
          </div>
          {BUSINESS.demo && <small>{t.platterNote}</small>}
        </div>
      </div>
      {open && (
        <Dialog titleId="platter-title" className="platter-dialog" onClose={() => setOpen(false)}>
          <Photo image={platter.image} sizes="600px" priority />
          <div className="platter-dialog-content">
            <span className="eyebrow">{platter.name[language]}</span>
            <h2 id="platter-title">{t.platterModalTitle}</h2>
            <p>{BUSINESS.demo ? t.platterModalBody : t.platterConfirmedBody}</p>
            <ul>
              {(platter.contents ?? []).map((content) => (
                <li key={content.en}>
                  <Check size={16} />
                  {content[language]}
                </li>
              ))}
            </ul>
            <AddButton item={platter} />
          </div>
        </Dialog>
      )}
    </section>
  );
}

export function JuiceBar() {
  const { t, language, money } = useLanguage();
  return (
    <section className="juice-section section-space container">
      <div className="juice-intro">
        <span className="eyebrow">
          <Sun size={17} />
          {t.juiceEyebrow}
        </span>
        <h2>{t.juiceTitle}</h2>
        <p>{t.juiceBody}</p>
        <span className="juice-note">
          {interpolate(t.juiceNote, {
            juicePrice: money(
              Math.min(
                ...MENU.filter((item) => item.category === 'juice' && item.price !== null).map(
                  (item) => item.price!,
                ),
              ),
            ),
            dessertPrice: money(
              Math.min(
                ...MENU.filter((item) => item.category === 'dessert' && item.price !== null).map(
                  (item) => item.price!,
                ),
              ),
            ),
          })}
        </span>
      </div>
      <div className="juice-grid">
        {SECTIONS.juiceIds.map((id) => {
          const item = MENU.find((item) => item.id === id)!;
          return (
            <article className={`juice-card ${id}`} key={id}>
              <Photo image={item.image} sizes="(max-width: 600px) 70vw, 25vw" />
              <h3>{item.name[language]}</h3>
              {item.price === null ? (
                <ContactLink className="text-link">
                  {t.askPrice}
                  <ArrowUpRight className="directional" size={16} />
                </ContactLink>
              ) : (
                <div className="juice-action">
                  <span>{money(item.price)}</span>
                  <AddButton item={item} compact />
                </div>
              )}
            </article>
          );
        })}
      </div>
      <div className="dessert-feature">
        <Photo image={SITE_IMAGES.desserts.iceCream} sizes="(max-width: 760px) 100vw, 40vw" />
        <div>
          <span className="eyebrow">{t.categories.dessert}</span>
          <h3>{t.dessertTitle}</h3>
          <p>{t.dessertBody}</p>
          <MenuLink category="dessert" className="text-link">
            {t.viewDesserts}
            <ArrowUpRight className="directional" size={17} />
          </MenuLink>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="about-section section-space">
      <div className="container about-grid">
        <div className="about-image">
          <Photo image={SITE_IMAGES.about} sizes="(max-width: 950px) 100vw, 55vw" />
          <span className="about-caption">
            {SITE_IMAGES.about.preview ? t.interiorCaption : t.interiorRealCaption}
          </span>
          <div className="about-decoration" aria-hidden="true">
            <Heart size={27} strokeWidth={1} />
          </div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">{t.aboutEyebrow}</span>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutBody}</p>
          <p>{t.aboutBody2}</p>
          <div className="about-foot">
            <UsersRound size={18} />
            {t.aboutFoot}
          </div>
          <a className="text-link" href="#contact">
            {t.aboutLink}
            <ArrowUpRight className="directional" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { open } = useOrder();
  const { t, language, money } = useLanguage();
  const deliveryDescription = interpolate(t.deliveryBody, {
    nearby: money(deliveryStatus(0, 'nearby').minimum),
    city: money(deliveryStatus(0, 'city').minimum),
  });
  return (
    <section id="contact" className="contact-section section-space container">
      <div className="section-heading centered">
        <span className="eyebrow">{t.contactEyebrow}</span>
        <h2>{t.contactTitle}</h2>
      </div>
      <div className="contact-promo">
        <div>
          <span className="eyebrow">{t.heroEyebrow}</span>
          <h3>{t.aboutBody}</h3>
          <div className="hero-buttons">
            <a className="button primary" href="#menu">
              {t.explore}
              <ArrowUpRight size={18} />
            </a>
            <button className="button secondary" onClick={open}>
              {t.order}
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
        <Photo image={SITE_IMAGES.menu['special-zinger']} sizes="(max-width:760px) 90vw, 40vw" />
      </div>
      <div className="contact-grid">
        <div className="location-card">
          <span className="location-icon">
            <MapPin size={27} strokeWidth={1.4} />
          </span>
          <span className="eyebrow">{t.location}</span>
          <h3>{BUSINESS.locality[language]}</h3>
          <address>{BUSINESS.address[language]}</address>
          <ContactLink kind="directions" className="button light">
            {t.directions}
            <ArrowUpRight className="directional" size={18} />
          </ContactLink>
          <p className="map-note">{t.mapNote}</p>
          <span className="location-ornament" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="contact-details">
          <div className="contact-phone">
            <Phone size={21} strokeWidth={1.5} />
            <div>
              <span className="eyebrow">{t.callUs}</span>
              <ContactLink className="contact-phone-link" aria-label={t.phoneLabel}>
                <bdi>{BUSINESS.phone ?? t.demoPhone}</bdi>
              </ContactLink>
            </div>
            <ArrowUpRight size={24} className="directional" />
          </div>
          <div className="contact-hours">
            <Clock3 size={20} strokeWidth={1.5} />
            <div>
              <h3>{t.hours}</h3>
              {BUSINESS.hours ? (
                <p>{BUSINESS.hours[language]}</p>
              ) : (
                <ContactLink className="text-link">
                  {BUSINESS.demo ? t.demoHours : t.confirmHours}
                  <ArrowUpRight className="directional" size={14} />
                </ContactLink>
              )}
            </div>
          </div>
          <div className="service-list">
            {[
              { icon: UsersRound, title: t.walkIn, body: t.walkInBody },
              { icon: Truck, title: t.deliveryTitle, body: deliveryDescription },
              { icon: ShoppingBag, title: t.pickupTitle, body: t.pickupBody },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon size={20} strokeWidth={1.4} />
                <span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
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
                <a key={key} href={`#${key}`}>
                  {t.nav[key]}
                  <ArrowUpRight size={14} className="directional" />
                </a>
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
          <a href="#home" aria-label={t.nav.home}>
            <ArrowRight size={19} style={{ transform: 'rotate(-90deg)' }} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export function CategoryPreviews() {
  const { t } = useLanguage();
  return (
    <div className="category-previews container">
      {SECTIONS.categoryPreviews.map(({ category, id }) => {
        const dish = MENU.find((item) => item.id === id)!;
        return (
          <MenuLink key={category} category={category} className="category-preview">
            <Photo image={dish.image} sizes="(max-width:760px) 42vw, 20vw" />
            <span>
              <strong>{t.categories[category]}</strong>
              <ArrowUpRight className="directional" size={20} />
            </span>
          </MenuLink>
        );
      })}
    </div>
  );
}

export function AfghanEditorial() {
  const { t, language, money } = useLanguage();
  return (
    <section className="afghan-editorial container section-space">
      <div className="section-heading heading-split">
        <div>
          <span className="eyebrow">{t.categories.rice}</span>
          <h2>{t.editorialTitle}</h2>
        </div>
        <MenuLink category="rice" className="text-link">
          {t.fullMenu}
          <ArrowUpRight size={18} />
        </MenuLink>
      </div>
      <div className="editorial-grid">
        {SECTIONS.editorialIds.map((id) => {
          const dish = MENU.find((item) => item.id === id)!;
          return (
            <article className="editorial-card" key={id}>
              <Photo image={dish.image} sizes="(max-width:760px) 90vw, 45vw" />
              <div>
                <span>
                  <h3>{dish.name[language]}</h3>
                  <p>{money(dish.price!)}</p>
                </span>
                <AddButton item={dish} compact />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
