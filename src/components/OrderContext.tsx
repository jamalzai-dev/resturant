import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import { MENU, type PizzaSize } from '../data/menu';
import { addLine, changeQuantity, orderSubtotal, sanitizeOrder, type OrderLine } from '../lib/order';
import { DELIVERY_MODES, type ServiceMode } from '../config/delivery';
import { interpolate, useLanguage } from '../i18n/LanguageContext';
import { STORAGE_KEYS } from '../config/business';

function readSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.order) ?? '{}');
  } catch {
    return {};
  }
}
const OrderContext = createContext<{
  lines: OrderLine[];
  mode: ServiceMode;
  setMode: (mode: ServiceMode) => void;
  add: (id: string, size?: PizzaSize) => void;
  update: (key: string, quantity: number) => void;
  subtotal: number;
  count: number;
  open: () => void;
  close: () => void;
  isOpen: boolean;
} | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<OrderLine[]>(() => sanitizeOrder(readSaved()?.lines));
  const [mode, setMode] = useState<ServiceMode>(() => {
    const saved = readSaved()?.mode;
    return DELIVERY_MODES.some((mode) => mode.id === saved) ? saved : DELIVERY_MODES[0].id;
  });
  const [isOpen, setOpen] = useState(false);
  const [toast, setToast] = useState<{ id: string; time: number } | null>(null);
  const { language, t } = useLanguage();
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.order, JSON.stringify({ lines, mode }));
    } catch {
      /* Storage is optional. */
    }
  }, [lines, mode]);
  useEffect(() => {
    if (toast) {
      const id = window.setTimeout(() => setToast(null), 2600);
      return () => window.clearTimeout(id);
    }
  }, [toast]);
  const add = (id: string, size?: PizzaSize) => {
    if (MENU.find((item) => item.id === id)?.price == null) return;
    setLines((current) => addLine(current, id, size));
    setToast({ id, time: Date.now() });
  };
  return (
    <OrderContext.Provider
      value={{
        lines,
        mode,
        setMode,
        add,
        update: (key, qty) => setLines((current) => changeQuantity(current, key, qty)),
        subtotal: orderSubtotal(lines),
        count: lines.reduce((sum, line) => sum + line.quantity, 0),
        isOpen,
        open: () => setOpen(true),
        close: () => setOpen(false),
      }}
    >
      {children}
      <div className={`toast ${toast ? 'visible' : ''}`} role="status" aria-live="polite">
        {toast && (
          <>
            <Check size={18} />
            <span>
              {interpolate(t.toastAdd, { name: MENU.find((item) => item.id === toast.id)!.name[language] })}
            </span>
          </>
        )}
      </div>
    </OrderContext.Provider>
  );
}
export function useOrder() {
  const value = useContext(OrderContext);
  if (!value) throw new Error('OrderProvider is required');
  return value;
}
