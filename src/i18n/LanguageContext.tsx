import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { en, type Translation } from './en';
import { ps } from './ps';
import { formatNumber } from './format';
import { BUSINESS, STORAGE_KEYS } from '../config/business';
export type Language = 'en' | 'ps';
const LanguageContext = createContext<{
  language: Language;
  t: Translation;
  toggle: () => void;
  money: (value: number) => string;
  number: (value: number) => string;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.language) === 'ps' ? 'ps' : 'en';
    } catch {
      return 'en';
    }
  });
  const base = language === 'en' ? en : ps;
  const values: Record<string, string> = {
    restaurant: BUSINESS.name[language],
    shortName: BUSINESS.shortName[language],
  };
  const replaceBrand = (text: string) =>
    text.replace(/\{(restaurant|shortName)\}/g, (_, key: string) => values[key]);
  const t = Object.fromEntries(
    Object.entries(base).map(([key, value]) => [
      key,
      typeof value === 'string'
        ? replaceBrand(value)
        : Object.fromEntries(Object.entries(value).map(([k, v]) => [k, replaceBrand(v)])),
    ]),
  ) as Translation;
  if (!BUSINESS.demo) {
    t.pageTitle = t.pageTitleLive;
    t.pageDescription = t.pageDescriptionLive;
    t.mapNote = t.mapNoteLive;
    t.footerBottom = t.footerBottomLive;
    t.menuPriceNote = t.menuPriceNoteLive;
    t.deliveryBody = t.deliveryBodyLive;
  }
  const number = (value: number) => formatNumber(value, language);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ps' ? 'rtl' : 'ltr';
    document.title = t.pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.pageDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.pageTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.pageDescription);
    try {
      localStorage.setItem(STORAGE_KEYS.language, language);
    } catch {
      /* Private browsing may disable storage. */
    }
  }, [language, t.pageTitle, t.pageDescription]);
  return (
    <LanguageContext.Provider
      value={{
        language,
        t,
        toggle: () => setLanguage((v) => (v === 'en' ? 'ps' : 'en')),
        number,
        money: (value) => `${number(value)} ${t.currency}`,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('LanguageProvider is required');
  return context;
}

export function interpolate(text: string, values: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
}
