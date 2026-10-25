import { BUSINESS } from './business.ts';
import { en } from '../i18n/en.ts';
import { ps } from '../i18n/ps.ts';

/** Also used by Vite so built HTML follows the same business settings as React. */
export function getMetadata(language: 'en' | 'ps' = 'en') {
  const t = language === 'en' ? en : ps;
  const fill = (value: string) => value.replaceAll('{restaurant}', BUSINESS.name[language]);
  return {
    title: fill(BUSINESS.demo ? t.pageTitle : t.pageTitleLive),
    description: fill(BUSINESS.demo ? t.pageDescription : t.pageDescriptionLive),
  };
}
