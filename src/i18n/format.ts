import type { Language } from './LanguageContext';

// Explicit digit substitution also supports browsers with a reduced ICU locale set.
export function formatNumber(value: number, language: Language) {
  const formatted = new Intl.NumberFormat('en-US').format(value);
  return language === 'ps'
    ? formatted.replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]).replaceAll(',', '٬')
    : formatted;
}
