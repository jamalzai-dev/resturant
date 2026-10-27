import { describe, expect, it } from 'vitest';
import { MENU } from '../data/menu';
import { FOOD_COLLECTIONS, menuScope, scopedMenu } from './menuTaxonomy';
describe('menu taxonomy', () => {
  it('partitions the complete original catalog without losing or duplicating dishes', () => {
    const sections = ['foods','juices','ice-cream'].map(section => scopedMenu(menuScope(new URLSearchParams({section}))));
    expect(sections.map(items => items.length)).toEqual([40,12,9]);
    expect(sections.flat().map(item => item.id).sort()).toEqual(MENU.map(item => item.id).sort());
  });
  it('uses explicit valid editorial selections and preserves legacy category links', () => {
    for (const ids of Object.values(FOOD_COLLECTIONS)) for (const id of ids) expect(MENU.some(item => item.id === id)).toBe(true);
    expect(scopedMenu(menuScope(new URLSearchParams('category=pizza')))).toHaveLength(11);
    expect(menuScope(new URLSearchParams('category=dessert')).section).toBe('ice-cream');
    expect(menuScope(new URLSearchParams('section=invalid&filter=invalid'))).toEqual({section:'foods',filter:'all',category:'all'});
  });
  it('searches both languages inside the selected scope only', () => {
    const juices = menuScope(new URLSearchParams('section=juices'));
    expect(scopedMenu(juices,'مالټه').map(item => item.id)).toEqual(['orange']);
    expect(scopedMenu(juices,'pizza')).toEqual([]);
    expect(scopedMenu(juices,'')).toHaveLength(12);
  });
});
