import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero, CategoryPreviews, FamilyPlatter, JuiceBar, Contact, Footer } from './components/HomeSections';
import { MenuSection } from './components/MenuSection';
import { Gallery } from './components/Gallery';
import { OrderProvider } from './components/OrderContext';
import { OrderDrawer, StickyOrder } from './components/OrderDrawer';
import { LanguageProvider } from './i18n/LanguageContext';
import { BUSINESS } from './config/business';

export default function App() {
  useEffect(() => {
    document.querySelector<HTMLLinkElement>('link[rel="icon"]')!.href = BUSINESS.favicon;
    if (BUSINESS.demo) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: BUSINESS.name.en,
      alternateName: BUSINESS.name.ps,
      telephone: BUSINESS.internationalPhone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.address.en,
        addressLocality: BUSINESS.locality.en,
        addressCountry: BUSINESS.countryCode,
      },
      servesCuisine: BUSINESS.cuisines,
      acceptsReservations: BUSINESS.reservations.enabled,
    });
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-arrival');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document
      .querySelectorAll('.section-heading, .juice-intro, .about-copy, .platter-copy')
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return (
    <LanguageProvider>
      <OrderProvider>
        <div id="home">
          <Header />
          <main id="main">
            <Hero />
            <CategoryPreviews />
            <MenuSection />
            <FamilyPlatter />
            <JuiceBar />
            <Gallery />
            <Contact />
          </main>
          <Footer />
        </div>
        <OrderDrawer />
        <StickyOrder />
      </OrderProvider>
    </LanguageProvider>
  );
}
