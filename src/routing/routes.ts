import { CATEGORIES, type Category } from '../data/menu';
export const PAGE_PATHS = { home: '/', menu: '/menu', gallery: '/gallery', about: '/about' } as const;
export function menuHref(category: Category = 'all') {
  if (category === 'juice') return '/menu?section=juices';
  if (category === 'dessert') return '/menu?section=ice-cream';
  return '/menu?section=foods' + (category === 'all' ? '' : '&category=' + category);
}
export function legacyCategory(params: URLSearchParams): Category {
  const value = params.get('category');
  if (value && CATEGORIES.includes(value as Category)) return value as Category;
  if (params.get('section') === 'juices') return 'juice';
  if (params.get('section') === 'ice-cream') return 'dessert';
  return 'all';
}
export const LEGACY_PATHS: Record<string, string> = {
  home: '/',
  main: '/#main',
  menu: '/menu',
  signature: '/menu#signature',
  gallery: '/gallery',
  contact: '/about#contact',
  about: '/about',
};
