import { MENU, type PizzaSize } from '../data/menu';
import { BUSINESS } from '../config/business';
import type { ServiceMode } from '../config/delivery';
import type { Translation } from '../i18n/en';
import type { Language } from '../i18n/LanguageContext';
import { formatNumber } from '../i18n/format';

export type OrderLine = { id: string; size?: PizzaSize; quantity: number };
export const lineKey = (line: Pick<OrderLine, 'id' | 'size'>) => `${line.id}:${line.size ?? ''}`;
export const unitPrice = (line: OrderLine) => {
  const item = MENU.find((item) => item.id === line.id);
  if (!item || item.price === null) return null;
  if (item.sizes) return line.size ? (item.sizes[line.size] ?? null) : null;
  return line.size ? null : item.price;
};
export function sanitizeOrder(value: unknown): OrderLine[] {
  if (!Array.isArray(value)) return [];
  const result: OrderLine[] = [];
  for (const line of value) {
    if (
      !line ||
      typeof line !== 'object' ||
      typeof line.id !== 'string' ||
      !Number.isInteger(line.quantity) ||
      line.quantity < 1 ||
      unitPrice(line) === null
    )
      continue;
    const existing = result.find((item) => lineKey(item) === lineKey(line));
    if (existing) existing.quantity = Math.min(99, existing.quantity + line.quantity);
    else
      result.push({
        id: line.id,
        ...(line.size ? { size: line.size } : {}),
        quantity: Math.min(99, line.quantity),
      });
  }
  return result;
}
export const orderSubtotal = (lines: OrderLine[]) =>
  sanitizeOrder(lines).reduce((sum, line) => sum + unitPrice(line)! * line.quantity, 0);
export function addLine(lines: OrderLine[], id: string, size?: PizzaSize) {
  return sanitizeOrder([...lines, { id, size, quantity: 1 }]);
}
export function changeQuantity(lines: OrderLine[], key: string, quantity: number) {
  return sanitizeOrder(lines.map((line) => (lineKey(line) === key ? { ...line, quantity } : line)));
}
export function orderTicket(lines: OrderLine[], mode: ServiceMode, language: Language, t: Translation) {
  const format = (n: number) => formatNumber(n, language);
  const money = (n: number) => `${format(n)} ${t.currency}`;
  return [
    BUSINESS.name[language],
    t.ticketTitle,
    '────────────────────────',
    ...sanitizeOrder(lines).map((line) => {
      const item = MENU.find((item) => item.id === line.id)!;
      return `${format(line.quantity)} × ${item.name[language]}${line.size ? ` (${t.sizes[line.size]})` : ''} · ${money(unitPrice(line)!)} = ${money(unitPrice(line)! * line.quantity)}`;
    }),
    '────────────────────────',
    `${t.ticketService}: ${t.modes[mode]}`,
    `${t.total}: ${money(orderSubtotal(lines))}`,
    BUSINESS.demo ? t.demoLabel : (BUSINESS.phone ?? t.contactPending),
    BUSINESS.address[language],
    '',
    BUSINESS.demo ? t.demoTicketDisclaimer : t.ticketDisclaimer,
  ].join('\n');
}
