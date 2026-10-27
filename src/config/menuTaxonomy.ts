import { CATEGORIES, MENU, type Category, type MenuItem } from '../data/menu';
import { SECTIONS } from './sections';

export const MENU_SECTIONS = ['foods', 'drinks', 'juices', 'ice-cream'] as const;
export type MenuSectionId = (typeof MENU_SECTIONS)[number];
export const FOOD_FILTERS = ['all', 'popular', 'special', 'fast', 'traditional'] as const;
export type FoodFilter = (typeof FOOD_FILTERS)[number];
// Editorial collections, not claims about sales or customer ratings.
export const FOOD_COLLECTIONS: Record<Exclude<FoodFilter, 'all'>, readonly string[]> = {
  popular: SECTIONS.featuredIds,
  special: [
    'special-pizza',
    'crown-pizza',
    'special-zinger',
    'platter-2',
    'platter-4',
    'platter-6',
    'platter-8',
  ],
  fast: MENU.filter((item) => ['pizza', 'rolls', 'burgers', 'crispy'].includes(item.category)).map(
    (item) => item.id,
  ),
  traditional: MENU.filter((item) => ['rice', 'kebab', 'platter'].includes(item.category)).map(
    (item) => item.id,
  ),
};

export function menuScope(params: URLSearchParams) {
  const legacy = params.get('category');
  const category = legacy && CATEGORIES.includes(legacy as Category) ? (legacy as Category) : 'all';
  const requested = params.get('section');
  const section: MenuSectionId =
    category === 'juice'
      ? 'juices'
      : category === 'dessert'
        ? 'ice-cream'
        : MENU_SECTIONS.includes(requested as MenuSectionId)
          ? (requested as MenuSectionId)
          : 'foods';
  const requestedFilter = params.get('filter');
  const filter: FoodFilter = FOOD_FILTERS.includes(requestedFilter as FoodFilter)
    ? (requestedFilter as FoodFilter)
    : 'all';
  return { section, filter, category: section === 'foods' ? category : ('all' as Category) };
}

export function matchesSearch(item: Pick<MenuItem, 'name' | 'description'>, query: string) {
  const term = query.trim().toLocaleLowerCase();
  return [item.name.en, item.name.ps, item.description.en, item.description.ps].some((text) =>
    text.toLocaleLowerCase().includes(term),
  );
}

export function scopedMenu(scope: ReturnType<typeof menuScope>, query = '') {
  return MENU.filter((item) => {
    const sectionMatches =
      scope.section === 'juices'
        ? item.category === 'juice'
        : scope.section === 'ice-cream'
          ? item.category === 'dessert'
          : scope.section === 'foods' && !['juice', 'dessert'].includes(item.category);
    const foodMatches =
      scope.section !== 'foods' ||
      ((scope.category === 'all' || item.category === scope.category) &&
        (scope.filter === 'all' || FOOD_COLLECTIONS[scope.filter].includes(item.id)));
    return sectionMatches && foodMatches && matchesSearch(item, query);
  });
}
