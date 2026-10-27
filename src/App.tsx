import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { OrderProvider } from './components/OrderContext';
import { SiteLayout } from './components/layout/SiteLayout';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { LEGACY_PATHS } from './routing/routes';
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
  return <HashRouter><LanguageProvider><OrderProvider><Routes><Route element={<SiteLayout />}>
    <Route index element={<HomePage />} /><Route path="menu" element={<MenuPage />} />
    <Route path="gallery" element={<GalleryPage />} /><Route path="about" element={<AboutPage />} />
    {Object.entries(LEGACY_PATHS).filter(([key])=>!['menu','gallery','about'].includes(key)).map(([key,path])=><Route key={key} path={key} element={<Navigate to={path} replace />} />)}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route></Routes></OrderProvider></LanguageProvider></HashRouter>;
}
