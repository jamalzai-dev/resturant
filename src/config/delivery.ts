export const DELIVERY_MODES = [
  { id: 'nearby', minimum: 500, fee: 0 },
  { id: 'city', minimum: 1000, fee: 0 },
  { id: 'pickup', minimum: 0, fee: 0 },
] as const;
export type ServiceMode = (typeof DELIVERY_MODES)[number]['id'];

export function deliveryStatus(subtotal: number, mode: ServiceMode) {
  const rule = DELIVERY_MODES.find((item) => item.id === mode)!;
  return {
    ...rule,
    remaining: Math.max(0, rule.minimum - subtotal),
    eligible: mode === 'pickup' || subtotal >= rule.minimum,
    progress: rule.minimum === 0 ? 100 : Math.min(100, Math.max(0, (subtotal / rule.minimum) * 100)),
  };
}
