import { describe, expect, it } from 'vitest';
import {
  addLine,
  changeQuantity,
  lineKey,
  orderSubtotal,
  orderTicket,
  sanitizeOrder,
  unitPrice,
} from './order';
import { deliveryStatus } from '../config/delivery';
import { en } from '../i18n/en';
import { ps } from '../i18n/ps';
import { MENU } from '../data/menu';

describe('phone order calculations', () => {
  it('keeps the complete demo menu and all pizza sizes orderable', () => {
    expect(MENU).toHaveLength(53);
    expect(new Set(MENU.map((item) => item.id)).size).toBe(53);
    expect(MENU.filter((item) => item.sizes)).toHaveLength(11);
    for (const item of MENU) {
      if (item.sizes)
        for (const size of ['small', 'medium', 'large'] as const)
          expect(orderSubtotal(addLine([], item.id, size))).toBe(item.sizes[size]);
      else expect(orderSubtotal(addLine([], item.id))).toBe(item.price);
    }
    expect(MENU.filter((item) => item.category === 'platter').map((item) => item.price)).toEqual([
      400, 700, 1300, 1500,
    ]);
    expect(MENU.filter((item) => item.category === 'juice')).toHaveLength(12);
    expect(MENU.filter((item) => item.category === 'dessert')).toHaveLength(9);
  });
  it('rejects items whose price is cleared during customization', () => {
    const item = MENU.find((item) => item.id === 'mango')!;
    const price = item.price;
    try {
      item.price = null;
      expect(addLine([], item.id)).toEqual([]);
    } finally {
      item.price = price;
    }
  });
  it('keeps pizza sizes separate and merges identical selections', () => {
    const lines = addLine(
      addLine(addLine([], 'special-pizza', 'small'), 'special-pizza', 'large'),
      'special-pizza',
      'small',
    );
    expect(lines).toEqual([
      { id: 'special-pizza', size: 'small', quantity: 2 },
      { id: 'special-pizza', size: 'large', quantity: 1 },
    ]);
    expect(orderSubtotal(lines)).toBe(860);
  });
  it('recalculates quantities and removes zero-quantity items', () => {
    const lines = addLine(addLine([], 'zinger'), 'shawarma');
    expect(orderSubtotal(lines)).toBe(190);
    const updated = changeQuantity(lines, lineKey(lines[0]), 3);
    expect(orderSubtotal(updated)).toBe(430);
    expect(orderSubtotal(changeQuantity(updated, lineKey(lines[0]), 0))).toBe(70);
  });
  it('rejects unpriced items and corrupt or outdated stored selections', () => {
    expect(
      sanitizeOrder([
        { id: 'special-pizza', quantity: 1 },
        { id: 'special-pizza', size: 'huge', quantity: 2 },
        { id: 'zinger', size: 'large', quantity: 1 },
        { id: 'kabuli-palaw', quantity: -1 },
        { id: 'missing', quantity: 3 },
        { id: 'afghani-kebab', quantity: 1.5 },
        null,
      ]),
    ).toEqual([]);
    expect(sanitizeOrder('corrupt')).toEqual([]);
    expect(unitPrice({ id: 'strawberry', quantity: 1 })).toBe(150);
    expect(orderSubtotal(addLine([], 'banana'))).toBe(120);
    expect(addLine([], 'family-platter')).toEqual([]);
  });
  it('caps restored quantities at 99', () =>
    expect(
      sanitizeOrder([
        { id: 'kabuli-palaw', quantity: 99 },
        { id: 'kabuli-palaw', quantity: 99 },
      ])[0].quantity,
    ).toBe(99));
});
describe('delivery minimums', () => {
  it.each([
    ['nearby', 499, false, 1],
    ['nearby', 500, true, 0],
    ['city', 999, false, 1],
    ['city', 1000, true, 0],
    ['pickup', 0, true, 0],
    ['pickup', 70, true, 0],
  ] as const)('%s at %i AFN', (mode, amount, eligible, remaining) => {
    expect(deliveryStatus(amount, mode)).toMatchObject({ eligible, remaining });
  });
  it('caps progress at 100%', () => expect(deliveryStatus(2000, 'nearby').progress).toBe(100));
});
describe('bilingual tickets', () => {
  it('includes quantities, size, unit price, total and explicit call instructions', () => {
    const ticket = orderTicket([{ id: 'special-pizza', size: 'medium', quantity: 2 }], 'nearby', 'en', en);
    expect(ticket).toContain('2 × Special Pizza (Medium) · 300 AFN = 600 AFN');
    expect(ticket).toContain('Order total: 600 AFN');
    expect(ticket).toContain('Demo ticket only');
    expect(ticket).toContain('Pizza Max');
  });
  it('uses Pashto throughout the ticket', () => {
    const ticket = orderTicket([{ id: 'kabuli-palaw', quantity: 1 }], 'pickup', 'ps', ps);
    expect(ticket).toContain('کابلي پلو');
    expect(ticket).toContain('افغانۍ');
    expect(ticket).toContain(ps.modes.pickup);
    expect(ticket).not.toContain('AFN');
  });
  it('keeps every translation key aligned', () => {
    const keys = (obj: Record<string, unknown>, prefix = ''): string[] =>
      Object.entries(obj).flatMap(([key, value]) =>
        typeof value === 'object'
          ? keys(value as Record<string, unknown>, `${prefix}${key}.`)
          : [`${prefix}${key}`],
      );
    expect(keys(ps).sort()).toEqual(keys(en).sort());
  });
});
