import type { Localized } from '../config/business';
/** Unverified examples are kept outside the orderable MENU catalog. No invented prices. */
export const DEMO_DRINKS: { id: string; name: Localized; description: Localized }[] = [
  { id: 'demo-soft-drink', name: { en: 'Soft Drinks', ps: 'ګازي څښاک' }, description: { en: 'A chilled soft drink. Ask about available flavours.', ps: 'یخ ګازي څښاک. د شته خوندونو پوښتنه وکړئ.' } },
  { id: 'demo-traditional', name: { en: 'Traditional Beverages', ps: 'دودیز څښاک' }, description: { en: 'Traditional tea or a refreshing yoghurt drink.', ps: 'دودیز چای یا تازه مستې لرونکی څښاک.' } },
  { id: 'demo-mocktail', name: { en: 'Mocktails', ps: 'بې الکوله ګډ څښاک' }, description: { en: 'A fruit and herb blend, served without alcohol.', ps: 'د مېوو او بوټو ګډ څښاک، له الکولو پرته.' } },
  { id: 'demo-bottled', name: { en: 'Bottled Drinks', ps: 'بوتلي څښاک' }, description: { en: 'Bottled water and other sealed refreshments.', ps: 'بوتلي اوبه او نور مهر شوي څښاک.' } },
];
