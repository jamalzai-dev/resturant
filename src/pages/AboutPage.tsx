import { About, Contact } from '../components/HomeSections';
import { useLanguage } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, UsersRound, UtensilsCrossed } from 'lucide-react';
import { BUSINESS } from '../config/business';
import { SITE_IMAGES } from '../config/siteImages';
import { Photo } from '../components/Photo';
import { HomeCTASection } from '../components/home/HomeExperience';
export function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <section className="about-hero container">
        <Photo image={SITE_IMAGES.venue['dining-tables']} priority sizes="(max-width:1280px) 94vw, 1240px" />
        <div className="about-hero-copy">
          <span className="eyebrow">{t.nav.about}</span>
          <h1>{t.aboutHeroTitle}</h1>
          <p>{t.aboutHeroBody}</p>
          <Link to="/menu" className="button primary">
            {t.exploreMenu}
            <ArrowUpRight className="directional" size={18} />
          </Link>
        </div>
        {SITE_IMAGES.venue['dining-tables'].preview && (
          <span className="about-hero-note">{t.venueStockNote}</span>
        )}
      </section>
      {BUSINESS.demo && <p className="container about-demo-note">{t.aboutDemo}</p>}
      <About />
      <section className="container section-space values-section">
        <div className="section-heading centered">
          <span className="eyebrow">{t.experienceEyebrow}</span>
          <h2>{t.valuesTitle}</h2>
        </div>
        <div className="values-grid">
          {[
            { Icon: UtensilsCrossed, title: t.values.food, body: t.values.foodBody },
            { Icon: Heart, title: t.values.care, body: t.values.careBody },
            { Icon: UsersRound, title: t.values.together, body: t.values.togetherBody },
          ].map(({ Icon, title, body }) => (
            <article key={title}>
              <Icon size={24} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container section-space atmosphere-section">
        <div className="section-heading heading-split">
          <div>
            <span className="eyebrow">{t.nav.gallery}</span>
            <h2>{t.atmosphereTitle}</h2>
          </div>
          <Link to="/gallery" className="text-link">
            {t.viewGallery}
            <ArrowUpRight className="directional" size={18} />
          </Link>
        </div>
        <Photo image={SITE_IMAGES.venue['interior-architecture']} sizes="(max-width:1280px) 94vw, 1240px" />
        <p className="gallery-note">{t.galleryNote}</p>
      </section>
      <Contact />
      <HomeCTASection />
    </>
  );
}
