import { NavProps, CartItem } from '../types';
import { fmt } from '../data';
import { Header, Button, StickyBar, Divider } from '../components/ui';

export default function CartScreen({ state, navigate, goBack, navToTab, updateState }: NavProps) {
  const cart = state.cart ?? [];

  const grandTotal = cart.reduce((a, item) => a + item.total, 0);

  const removeItem = (id: string) => {
    updateState({ cart: state.cart.filter(item => item.id !== id) });
  };

  const handlePay = () => {
    navigate('payment');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
      <Header
        type="back"
        title="Mi carrito"
        onBack={goBack}
        onLogoClick={() => navToTab('home')}
      />

      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6h18" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 10a4 4 0 01-8 0" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Tu carrito está vacío</p>
            <p className="text-sm text-gray-500 mt-1">Agrega entradas desde el resumen de compra</p>
          </div>
          <button
            onClick={() => navigate('home')}
            className="text-sm text-blue-600 font-semibold"
          >
            Ver eventos →
          </button>
        </div>
      ) : (
        <>
          {/* ── MOBILE: single column, sticky bottom summary ─────────────── */}
          <div className="md:hidden flex-1 overflow-y-auto">
            <div className="px-4 py-4 flex flex-col gap-3 pb-40">
              {cart.map(item => (
                <CartItemCard key={item.id} item={item} onRemove={() => removeItem(item.id)} />
              ))}
              <div className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-3 mt-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Resumen</p>
                <Divider />
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate pr-2 flex-1">{item.eventName}</span>
                    <span className="text-gray-900 font-medium shrink-0">{fmt(item.total)}</span>
                  </div>
                ))}
                <Divider />
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">{fmt(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <StickyBar>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-500">{cart.length} {cart.length === 1 ? 'entrada' : 'entradas'}</span>
                  <span className="font-bold text-gray-900">{fmt(grandTotal)}</span>
                </div>
                <Button fullWidth size="lg" onClick={handlePay}>
                  Continuar al pago →
                </Button>
                <button
                  onClick={() => updateState({ cart: [] })}
                  className="w-full text-center text-xs text-gray-400 py-1"
                >
                  Vaciar carrito
                </button>
              </div>
            </StickyBar>
          </div>

          {/* ── DESKTOP: entradas left, resumen sticky right ─────────────── */}
          <div className="hidden md:flex md:gap-8 md:max-w-[1280px] md:mx-auto md:px-8 md:py-8 md:w-full">
            <div className="md:flex-1 md:min-w-0 flex flex-col gap-3">
              {cart.map(item => (
                <CartItemCard key={item.id} item={item} onRemove={() => removeItem(item.id)} />
              ))}
              <button
                onClick={() => navigate('home')}
                className="self-start text-sm text-blue-600 font-semibold mt-1 hover:text-blue-700"
              >
                + Seguir comprando
              </button>
            </div>
            <div className="md:w-80 lg:w-96 md:shrink-0">
              <div className="sticky top-20 border border-gray-200 rounded-2xl p-5 bg-white flex flex-col gap-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Resumen</p>
                <Divider />
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate pr-2 flex-1">{item.eventName}</span>
                    <span className="text-gray-900 font-medium shrink-0">{fmt(item.total)}</span>
                  </div>
                ))}
                <Divider />
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">{fmt(grandTotal)}</span>
                </div>
                <Button fullWidth size="lg" onClick={handlePay} className="mt-1">
                  Continuar al pago →
                </Button>
                <button
                  onClick={() => updateState({ cart: [] })}
                  className="w-full text-center text-xs text-gray-400 py-1 hover:text-gray-600"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CartItemCard({ item, onRemove }: { item: CartItem; onRemove: () => void }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      {/* Image placeholder */}
      <div className="h-24 bg-gray-200 flex items-center justify-center relative">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-30">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
          <circle cx="8.5" cy="8.5" r="1.5" stroke="#6B7280" strokeWidth="1.5"/>
          <path d="M21 15l-5-5L5 21" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center shadow-sm"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="p-3 flex flex-col gap-1.5">
        <p className="font-semibold text-gray-900 text-sm leading-tight">{item.eventName}</p>
        <div className="flex items-center gap-1.5">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#9CA3AF" strokeWidth="2"/>
            <path d="M8 2v4M16 2v4M3 10h18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-xs text-gray-500">{item.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" stroke="#9CA3AF" strokeWidth="2"/>
          </svg>
          <span className="text-xs text-gray-500">{item.venue}</span>
        </div>
        <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-100">
          <span className="text-xs text-blue-600 font-medium">{item.ticketTypeName} × {item.qty}</span>
          <span className="text-sm font-bold text-gray-900">{fmt(item.total)}</span>
        </div>
      </div>
    </div>
  );
}
