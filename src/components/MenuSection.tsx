import { Link, useSearchParams } from 'react-router-dom';
import { menuHref } from '../routing/routes';
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
import { MENU, type Category, type MenuItem, type PizzaSize } from '../data/menu';
import { BUSINESS } from '../config/business';
import { DEMO_DRINKS } from '../data/drinks';
import { FOOD_FILTERS, matchesSearch, menuScope, scopedMenu, type FoodFilter, type MenuSectionId } from '../config/menuTaxonomy';
import { MenuTabs } from './MenuTabs';
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
        <ArrowUpRight className="directional" size={16} />
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

export function MenuCard({ item, compact = false }: { item: MenuItem; compact?: boolean }) {
  const { t, language, money } = useLanguage();
  const [size, setSize] = useState<PizzaSize>('small');
  const price = item.sizes ? item.sizes[size] : item.price;
  return (
    <article className={`menu-card ${!item.image ? 'menu-card-no-photo' : ''}`} data-dish={item.id}>
      {item.image ? (
        <div className="menu-photo-wrap">
          <Photo
            image={item.image}
            sizes={
              compact
                ? '(max-width:480px) 64px, 88px'
                : '(max-width:600px) 100vw, (max-width:950px) 46vw, (max-width:1240px) 30vw, 397px'
            }
          />
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
    <Link to={menuHref(category)} className={className}>
      {children}
    </Link>
  );
}

export function MenuSection() {
  const { t, number, language } = useLanguage();
  const [params, setParams] = useSearchParams();
  const scope = menuScope(params);
  const { section, filter, category } = scope;
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(SECTIONS.menuPageSize);
  const scopeKey = `${section}-${filter}-${category}`;
  const [previousScope, setPreviousScope] = useState(scopeKey);
  // Reset during rendering so a delayed effect cannot erase freshly typed input.
  if (previousScope !== scopeKey) { setPreviousScope(scopeKey); setQuery(''); setLimit(SECTIONS.menuPageSize); }
  const filtersRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const list = filtersRef.current;
    const active = list?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!list || !active) return;
    const reveal = () => list.scrollBy({left: active.getBoundingClientRect().left - list.getBoundingClientRect().left - (list.clientWidth - active.clientWidth) / 2, behavior:'instant'});
    const frame = requestAnimationFrame(reveal);
    const observer = new ResizeObserver(reveal); observer.observe(list); observer.observe(active);
    return () => {cancelAnimationFrame(frame); observer.disconnect();};
  }, [section, filter, language]);
  function selectSection(value: MenuSectionId) { setParams({section:value}); }
  function selectFilter(value: FoodFilter) { setParams({section:'foods', ...(value === 'all' ? {} : {filter:value})}); }
  const filtered = scopedMenu(scope, query);
  const drinks = BUSINESS.demo ? DEMO_DRINKS.filter(item => matchesSearch(item, query)) : [];
  const total = section === 'drinks' ? drinks.length : filtered.length;
  const visible = filtered.slice(0, limit);
  const compact = !!query.trim();
  return <section id="menu" className="menu-section section-space">
    <div className="container">
      <div className="section-heading centered"><span className="eyebrow">{t.menuEyebrow}</span><h1>{t.menuTitle}</h1><p>{t.menuBody}</p></div>
      <MenuTabs selected={section} onSelect={selectSection}/>
      <div role="tabpanel" id="menu-panel" aria-labelledby={`tab-${section}`} tabIndex={0}>
        <div className="menu-search"><Search size={18}/><input aria-label={t.searchMenu} placeholder={`${t.searchPlaceholder} · ${t.menuSections[section]}`} value={query} onChange={event => {setQuery(event.target.value); setLimit(SECTIONS.menuPageSize);}}/>{query && <button onClick={() => setQuery('')} aria-label={t.clearSearch}><X size={17}/></button>}</div>
        {section === 'foods' && <>
          <div ref={filtersRef} className="filter-list menu-filters" role="group" aria-label={t.foodFilterLabel}>
            {FOOD_FILTERS.map(value => <button key={value} aria-pressed={filter === value} className={filter === value ? 'active' : ''} onClick={() => selectFilter(value)}>{t.foodFilters[value]}</button>)}
          </div>
          {category !== 'all' && <div className="legacy-category"><span>{t.categories[category]}</span><button onClick={() => selectFilter('all')} className="text-link">{t.clearCategory}<X size={16}/></button></div>}
          {(filter === 'popular' || filter === 'special') && <p className="collection-note">{t.curatedNote}</p>}
        </>}
        {section === 'drinks' && <p className="demo-menu-note">{BUSINESS.demo ? t.drinksNote : t.drinksEmpty}</p>}
        <p className="menu-result-count" role="status">{interpolate(t.menuResults,{shown:number(section === 'drinks' ? drinks.length : visible.length),total:number(total)})}</p>
        <div className={`menu-grid ${compact ? 'menu-list' : ''}`} key={`${section}-${filter}-${category}`}>
          {section === 'drinks' ? drinks.map(item => <article className="menu-card demo-drink-card" key={item.id} data-demo-drink={item.id}>
            <div className="dish-line-icon" aria-hidden="true"><GlassWater size={48} strokeWidth={1}/></div><div className="menu-card-body"><span className="eyebrow">{t.demoExample}</span><h3>{item.name[language]}</h3><p>{item.description[language]}</p><div className="menu-card-bottom"><ContactLink className="ask-price">{t.askPrice}<ArrowUpRight className="directional" size={16}/></ContactLink></div></div>
          </article>) : visible.map(item => <MenuCard key={item.id} item={item} compact={compact}/>)}
        </div>
        {!total && (section !== 'drinks' || BUSINESS.demo) && <div className="menu-empty"><Search size={28}/><h3>{t.noResults}</h3><p>{t.noResultsBody}</p></div>}
        {section !== 'drinks' && visible.length < filtered.length && <button className="button secondary menu-more" onClick={() => setLimit(current => current + SECTIONS.menuPageSize)}>{t.showMore}<Plus size={17}/></button>}
      </div>
      <div className="menu-footnote"><Phone size={14}/><p>{t.menuPriceNote}{MENU.some(item => item.image?.preview) && <span>{t.photoNote}</span>}</p></div>
    </div>
  </section>;
}
