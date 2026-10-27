import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { MENU_SECTIONS, type MenuSectionId } from '../config/menuTaxonomy';

export function MenuTabs({
  selected,
  onSelect,
}: {
  selected: MenuSectionId;
  onSelect: (section: MenuSectionId) => void;
}) {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const list = ref.current;
    const active = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !active) return;
    const reveal = () => {
      const offset = active.getBoundingClientRect().left - list.getBoundingClientRect().left;
      list.scrollBy({ left: offset - (list.clientWidth - active.clientWidth) / 2, behavior: 'instant' });
    };
    const frame = requestAnimationFrame(reveal);
    const observer = new ResizeObserver(reveal);
    observer.observe(list);
    observer.observe(active);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [selected, language]);
  return (
    <div className="filter-list menu-tabs" ref={ref} role="tablist" aria-label={t.menuSectionLabel}>
      {MENU_SECTIONS.map((section, index) => (
        <button
          key={section}
          role="tab"
          id={`tab-${section}`}
          aria-controls="menu-panel"
          aria-selected={selected === section}
          tabIndex={selected === section ? 0 : -1}
          className={selected === section ? 'active' : ''}
          onClick={() => onSelect(section)}
          onKeyDown={(event) => {
            let next: number;
            if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = MENU_SECTIONS.length - 1;
            else if (event.key === 'ArrowRight')
              next = (index + (language === 'ps' ? -1 : 1) + MENU_SECTIONS.length) % MENU_SECTIONS.length;
            else if (event.key === 'ArrowLeft')
              next = (index + (language === 'ps' ? 1 : -1) + MENU_SECTIONS.length) % MENU_SECTIONS.length;
            else return;
            event.preventDefault();
            onSelect(MENU_SECTIONS[next]);
            ref.current?.querySelectorAll<HTMLButtonElement>('button')[next].focus();
          }}
        >
          {t.menuSections[section]}
        </button>
      ))}
    </div>
  );
}
