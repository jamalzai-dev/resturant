/** Change featured selections and menu defaults without editing components. */
export const SECTIONS = {
  categoryPreviews: [
    { category: 'pizza', id: 'special-pizza' },
    { category: 'rice', id: 'kabuli-palaw' },
    { category: 'crispy', id: 'special-zinger' },
    { category: 'juice', id: 'strawberry' },
  ] as const,
  editorialIds: ['kabuli-palaw', 'rosh', 'afghani-kebab', 'chicken-biryani'],
  featuredIds: ['special-pizza', 'kabuli-palaw', 'special-zinger'],
  pizzaIds: ['special-pizza', 'cheese-pizza', 'crown-pizza'],
  juiceIds: ['strawberry', 'mango', 'banana'],
  defaultCategory: 'pizza' as const,
  menuPageSize: 9,
};
