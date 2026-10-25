export type Localized = { en: string; ps: string };

export const BUSINESS = {
  id: 'pizza-max-demo',
  demo: true,
  name: { en: 'Pizza Max', ps: 'پیزا مکس' },
  shortName: { en: 'Pizza Max', ps: 'پیزا مکس' },
  phone: null as string | null,
  internationalPhone: null as string | null,
  address: { en: 'Your restaurant address', ps: 'ستاسو د رسټورانټ پته' },
  locality: { en: 'Your city', ps: 'ستاسو ښار' },
  countryCode: 'AF',
  logo: '/brand/pizza-max-icon.svg' as string | null,
  favicon: '/brand/pizza-max-icon.svg',
  hours: null as Localized | null,
  map: {
    directionsUrl: null as string | null,
  },
  cuisines: ['Pizza', 'Afghan', 'Grill'],
};

export const phoneHref =
  !BUSINESS.demo && BUSINESS.internationalPhone ? `tel:${BUSINESS.internationalPhone}` : null;
export const directionsUrl = !BUSINESS.demo ? BUSINESS.map.directionsUrl : null;
export const STORAGE_KEYS = { order: `${BUSINESS.id}:order:v1`, language: `${BUSINESS.id}:language` };

export const NAVIGATION = ['home', 'menu', 'gallery', 'about', 'contact'] as const;
