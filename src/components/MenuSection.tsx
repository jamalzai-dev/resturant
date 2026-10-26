import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  Check,
  Minus,
  Phone,
  Plus,
  UtensilsCrossed,
  Search,
  X,
  IceCreamBowl,
  GlassWater,
} from 'lucide-react';
import { CATEGORIES, MENU, type Category, type MenuItem, type PizzaSize } from '../data/menu';
import { SECTIONS } from '../config/sections';
import { ContactLink } from './ContactLink';
import { lineKey } from '../lib/order';
import { interpolate, useLanguage } from '../i18n/LanguageContext';
import { Photo } from './Photo';
import { useOrder } from './OrderContext';

export function AddButton({
  item,
  size,
  compact = false,
}: {
  item: MenuItem;
  size?: PizzaSize;
  compact?: boolean;
}) {
  const { t, language, number } = useLanguage();
  const { lines, add, update } = useOrder();
  const quantity = lines.find((line) => lineKey(line) === lineKey({ id: item.id, size }))?.quantity ?? 0;
  if (item.price === null)
    return (
      <ContactLink className="ask-price">
        <span>{t.askPrice}</span>
        <ArrowUpRight size={16} />
      </ContactLink>
    );
  if (quantity && !compact)
    return (
      <div className="quantity-control" aria-label={`${t.quantity}: ${item.name[language]}`}>
        <button
          onClick={() => update(lineKey({ id: item.id, size }), quantity - 1)}
          aria-label={`${t.decrease}: ${item.name[language]}`}
        >
          <Minus size={15} />
        </button>
        <span aria-live="polite">{number(quantity)}</span>
        <button
          onClick={() => add(item.id, size)}
          disabled={quantity >= 99}
          aria-label={`${t.increase}: ${item.name[language]}`}
        >
          <Plus size={15} />
        </button>
      </div>
    );
  return (
    <button
      className={compact ? 'round-add' : 'add-button'}
      disabled={quantity >= 99}
      onClick={() => add(item.id, size)}
      aria-label={`${t.add}: ${item.name[language]}${size ? ` (${t.sizes[size]})` : ''}`}
    >
      {!compact && <span>{t.add}</span>}
      {compact && quantity ? <Check size={18} /> : <Plus size={compact ? 20 : 16} />}
    </button>
  );
}

export function MenuCard({ item }: { item: MenuItem }) {
  const { t, language, money } = useLanguage();
  const [size, setSize] = useState<PizzaSize>('small');
  const price = item.sizes ? item.sizes[size] : item.price;
  return (
    <article className={`menu-card ${!item.image ? 'menu-card-no-photo' : ''}`} data-dish={item.id}>
      {item.image ? (
        <div className="menu-photo-wrap">
          <Photo image={item.image} />
          {item.tag && <span className="dish-tag">{t.tags[item.tag]}</span>}
        </div>
      ) : (
        <span className="dish-line-icon">
          {item.category === 'dessert' ? (
            <IceCreamBowl size={25} strokeWidth={1} />
          ) : item.category === 'juice' ? (
            <GlassWater size={25} strokeWidth={1} />
          ) : (
            <UtensilsCrossed size={25} strokeWidth={1} />
          )}
        </span>
      )}
      <div className="menu-card-body">
        <h3>{item.name[language]}</h3>
        <p>{item.description[language]}</p>
        {item.sizes && (
          <fieldset className="size-selector">
            <legend className="sr-only">{t.chooseSize}</legend>
            {(Object.keys(item.sizes) as PizzaSize[]).map((value) => (
              <label key={value} className={size === value ? 'selected' : ''}>
                <input
                  type="radio"
                  name={`size-${item.id}`}
                  value={value}
                  checked={size === value}
                  onChange={() => setSize(value)}
                />
                <span>{t.sizes[value]}</span>
              </label>
            ))}
          </fieldset>
        )}
        <div className="menu-card-bottom">
          {price !== null && (
            <span key={price} className="dish-price price-change">
              {money(price)}
            </span>
          )}
          <AddButton item={item} size={item.sizes ? size : undefined} />
        </div>
      </div>
    </article>
  );
}

export function MenuLink({
  category,
  className,
  children,
}: {
  category: Category;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#menu"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('restaurant:menu', { detail: category }))}
    >
      {children}
    </a>
  );
}

export function MenuSection() {
  const { t, number } = useLanguage();
  const filtersRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<Category>(SECTIONS.defaultCategory);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(SECTIONS.menuPageSize);
  function select(value: Category) {
    setCategory(value);
    setQuery('');
    setLimit(SECTIONS.menuPageSize);
  }
  useEffect(() => {
    const handler = (event: Event) => {
      const value = (event as CustomEvent<Category>).detail;
      if (CATEGORIES.includes(value)) select(value);
    };
    window.addEventListener('restaurant:menu', handler);
    return () => window.removeEventListener('restaurant:menu', handler);
  }, []);
  useEffect(() => {
    const list = filtersRef.current;
    const active = list?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!list || !active) return;
    const offset = active.getBoundingClientRect().left - list.getBoundingClientRect().left;
    list.scrollBy({
      left: offset - (list.clientWidth - active.clientWidth) / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }, [category, query]);
  const term = query.trim().toLocaleLowerCase();
  const filtered = MENU.filter((item) =>
    term
      ? [item.name.en, item.name.ps, item.description.en, item.description.ps].some((text) =>
          text.toLocaleLowerCase().includes(term),
        )
      : category === 'all' || item.category === category,
  );
  const visible = filtered.slice(0, limit);
  return (
    <section id="menu" className="menu-section section-space">
      <div className="container">
        <div className="section-heading centered">
          <span className="eyebrow">{t.menuEyebrow}</span>
          <h2>{t.menuTitle}</h2>
          <p>{t.menuBody}</p>
        </div>
        <div className="menu-search">
          <Search size={18} />
          <input
            aria-label={t.searchMenu}
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setLimit(SECTIONS.menuPageSize);
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label={t.clearSearch}>
              <X size={17} />
            </button>
          )}
        </div>
        <div ref={filtersRef} className="filter-list menu-filters" role="group" aria-label={t.nav.menu}>
          {CATEGORIES.map((value) => (
            <button
              key={value}
              aria-pressed={!term && category === value}
              className={!term && category === value ? 'active' : ''}
              onClick={() => select(value)}
            >
              {t.categories[value]}
            </button>
          ))}
        </div>
        <p className="menu-result-count" role="status">
          {interpolate(t.menuResults, { shown: number(visible.length), total: number(filtered.length) })}
        </p>
        <div className={`menu-grid ${category === 'all' || term ? 'menu-list' : ''}`} key={category}>
          {visible.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
        {!filtered.length && (
          <div className="menu-empty">
            <Search size={28} />
            <h3>{t.noResults}</h3>
            <p>{t.noResultsBody}</p>
          </div>
        )}
        {visible.length < filtered.length && (
          <button
            className="button secondary menu-more"
            onClick={() => setLimit((current) => current + SECTIONS.menuPageSize)}
          >
            {t.showMore}
            <Plus size={17} />
          </button>
        )}
        <div className="menu-footnote">
          <Phone size={14} />
          <p>
            {t.menuPriceNote}
            {MENU.some((item) => item.image?.preview) && <span>{t.photoNote}</span>}
          </p>
        </div>
      </div>
    </section>
  );
}
