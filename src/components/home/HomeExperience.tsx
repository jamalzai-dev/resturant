import { Link } from 'react-router-dom';
import { ArrowUpRight, GlassWater, Heart, UtensilsCrossed, UsersRound } from 'lucide-react';
import { SITE_IMAGES } from '../../config/siteImages';
import { SECTIONS } from '../../config/sections';
import { MENU } from '../../data/menu';
import { useLanguage } from '../../i18n/LanguageContext';
import { menuHref } from '../../routing/routes';
import { Photo } from '../Photo';
import { ReservationInquiry } from '../ReservationInquiry';

export function HomeHero() {
  const { t } = useLanguage();
  return (
    <section className="home-hero container" aria-labelledby="hero-title">
      <div className="home-hero-copy">
        <span className="eyebrow">{t.heroEyebrow}</span>
        <h1 id="hero-title">{t.venueHeadline}</h1>
        <p>{t.venueDescription}</p>
        <div className="hero-buttons">
          <Link to="/menu" className="button primary">
            {t.exploreMenu}
            <ArrowUpRight className="directional" size={18} />
          </Link>
          <ReservationInquiry />
        </div>
      </div>
      <figure className="home-hero-media">
        <Photo image={SITE_IMAGES.menu['special-pizza']} priority sizes="(max-width: 1280px) 94vw, 1240px" />
        <figcaption>{t.photoNote}</figcaption>
      </figure>
    </section>
  );
}

export function SignatureHighlights() {
  const { t, language, money } = useLanguage();
  return (
    <section id="signature" className="container section-space">
      <div className="section-heading heading-split">
        <div>
          <span className="eyebrow">{t.signatureEyebrow}</span>
          <h2>{t.signatureTitle}</h2>
        </div>
        <Link to="/menu?section=foods&filter=popular" className="text-link">
          {t.fullMenu}
          <ArrowUpRight className="directional" size={18} />
        </Link>
      </div>
      <div className="signature-grid">
        {SECTIONS.featuredIds.map((id) => {
          const dish = MENU.find((item) => item.id === id)!;
          return (
            <article className="signature-card" key={id}>
              <Link to={menuHref(dish.category)} className="signature-photo" aria-label={dish.name[language]}>
                <Photo image={dish.image} sizes="(max-width:760px) 94vw, 31vw" />
              </Link>
              <div className="highlight-copy">
                <h3>
                  <Link to={menuHref(dish.category)}>{dish.name[language]}</Link>
                </h3>
                <p>{dish.description[language]}</p>
                <div>
                  <strong>
                    {dish.sizes && `${t.from} `}
                    {money(dish.price!)}
                  </strong>
                  <Link
                    to={menuHref(dish.category)}
                    className="round-add"
                    aria-label={`${t.viewMenu}: ${dish.name[language]}`}
                  >
                    <ArrowUpRight className="directional" size={20} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function CategoryShowcase() {
  const { t } = useLanguage();
  const categories = [
    { key: 'foods', image: SITE_IMAGES.menu['kabuli-palaw'] },
    { key: 'drinks', image: null },
    { key: 'juices', image: SITE_IMAGES.menu.mango },
    { key: 'ice-cream', image: SITE_IMAGES.menu.pistachio },
  ] as const;
  return (
    <section className="container category-showcase section-space">
      <div className="section-heading centered">
        <h2>{t.exploreCategories}</h2>
        <p>{t.categoryIntro}</p>
      </div>
      <div className="category-previews">
        {categories.map(({ key, image }) => (
          <Link to={`/menu?section=${key}`} className="category-preview" key={key}>
            {image ? (
              <Photo image={image} sizes="(max-width:760px) 45vw, 23vw" />
            ) : (
              <div className="category-placeholder" aria-hidden="true">
                <GlassWater size={64} strokeWidth={1} />
              </div>
            )}
            <span>
              {t.menuSections[key]}
              <ArrowUpRight className="directional" size={18} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function RestaurantExperience() {
  const { t } = useLanguage();
  return (
    <section className="container section-space experience-grid">
      <div className="experience-copy">
        <span className="eyebrow">{t.experienceEyebrow}</span>
        <h2>{t.experienceTitle}</h2>
        <p>{t.experienceBody}</p>
        <ul className="experience-themes">
          <li>
            <UsersRound size={18} />
            {t.experienceThemes.share}
          </li>
          <li>
            <UtensilsCrossed size={18} />
            {t.experienceThemes.variety}
          </li>
          <li>
            <Heart size={18} />
            {t.experienceThemes.welcome}
          </li>
        </ul>
        <Link to="/about" className="text-link">
          {t.discoverStory}
          <ArrowUpRight className="directional" size={18} />
        </Link>
      </div>
      <figure className="experience-image">
        <Photo image={SITE_IMAGES.venue['dining-window']} sizes="(max-width:760px) 94vw, 47vw" />
        <figcaption>{t.venueStockNote}</figcaption>
      </figure>
    </section>
  );
}

export function GalleryPreview() {
  const { t } = useLanguage();
  return (
    <section className="container section-space gallery-preview">
      <div className="section-heading heading-split">
        <div>
          <span className="eyebrow">{t.nav.gallery}</span>
          <h2>{t.previewTitle}</h2>
        </div>
        <Link to="/gallery" className="text-link">
          {t.viewGallery}
          <ArrowUpRight className="directional" size={18} />
        </Link>
      </div>
      <div className="gallery-preview-grid">
        {['interior-architecture', 'kitchen', 'exterior-evening'].map((id) => (
          <Link to="/gallery" key={id} aria-label={t.viewGallery}>
            <Photo
              image={SITE_IMAGES.venue[id as keyof typeof SITE_IMAGES.venue]}
              sizes="(max-width:760px) 94vw, 31vw"
            />
          </Link>
        ))}
      </div>
      <p className="gallery-note">{t.galleryNote}</p>
    </section>
  );
}

export function HomeCTASection() {
  const { t } = useLanguage();
  return (
    <section className="container section-space">
      <div className="home-cta">
        <Photo image={SITE_IMAGES.menu['afghani-kebab']} sizes="(max-width:760px) 94vw, 400px" />
        <div>
          <span className="eyebrow">{t.signatureEyebrow}</span>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaBody}</p>
          <div className="hero-buttons">
            <Link to="/menu" className="button primary">
              {t.exploreMenu}
              <ArrowUpRight className="directional" size={18} />
            </Link>
            <Link to="/about#contact" className="text-link">
              {t.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
