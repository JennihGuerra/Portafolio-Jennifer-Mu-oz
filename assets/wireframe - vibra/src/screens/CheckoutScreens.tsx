import { useState } from 'react';
import { NavProps, CartItem } from '../types';
import { fmt } from '../data';
import { Button, StickyBar, Divider, IconCheck } from '../components/ui';

// ── Summary ───────────────────────────────────────────────────────────────────

function SummaryScreen({ state, navigate, goBack, navToTab, updateState }: NavProps) {
  const { event, date, sector, subzone, seats, qty, ticketTypeName, ticketTypePrice, attendees, email } = state;
  if (!event || !date) return null;

  const isSeated = seats.length > 0;
  const isNominative = attendees.length > 0;
  const subtotal = isSeated
    ? seats.reduce((a, s) => a + s.price, 0)
    : (ticketTypePrice ?? event.priceFrom) * qty;
  const serviceCharge = Math.round(subtotal * 0.1);
  const total = subtotal + serviceCharge;

  // ── Shared blocks (reused in mobile stack + desktop two-column layout) ────
  const EventCard = () => (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="h-32 bg-gray-200 flex items-center justify-center">
        <span className="text-xs text-gray-400">[imagen]</span>
      </div>
      <div className="p-4">
        <p className="font-bold text-gray-900 text-base">{event.name}</p>
        <div className="mt-2 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#9CA3AF" strokeWidth="2"/>
              <path d="M8 2v4M16 2v4M3 10h18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-sm text-gray-600">{date.date} · {date.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" stroke="#9CA3AF" strokeWidth="2"/>
            </svg>
            <span className="text-sm text-gray-600">{date.venue} · {date.city}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const TicketDetail = () => (
    <div className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Entradas</p>
        <button onClick={goBack} className="text-xs text-blue-600 font-medium">Editar</button>
      </div>
      <Divider />
      {isSeated ? (
        seats.map(s => (
          <div key={s.id} className="flex justify-between text-sm">
            <span className="text-gray-700">{sector?.name} · Fila {s.row} · Asiento {s.num}</span>
            <span className="text-gray-900 font-medium">{fmt(s.price)}</span>
          </div>
        ))
      ) : (
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">{ticketTypeName} × {qty}</span>
          <span className="text-gray-900 font-medium">{fmt((ticketTypePrice ?? event.priceFrom) * qty)}</span>
        </div>
      )}
      {sector && !isSeated && (
        <div className="text-xs text-gray-400">Sector: {sector.name}{subzone ? ` · ${subzone}` : ''}</div>
      )}
      {isNominative && (
        <>
          <Divider />
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Asistentes</p>
          {attendees.map(a => (
            <div key={a.idx} className="text-sm text-gray-700">{a.name} · {a.rut}</div>
          ))}
        </>
      )}
    </div>
  );

  const BuyerCard = () => (
    <div className="border border-gray-200 rounded-xl p-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Confirmación a</p>
      <p className="text-sm text-gray-700">{email || 'usuario@correo.com'}</p>
    </div>
  );

  const PriceBreakdown = () => (
    <>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="text-gray-900">{fmt(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Cargo de servicio</span>
        <span className="text-gray-900">{fmt(serviceCharge)}</span>
      </div>
      <Divider />
      <div className="flex justify-between">
        <span className="font-bold text-gray-900">Total</span>
        <span className="font-bold text-xl text-gray-900">{fmt(total)}</span>
      </div>
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
      <header className="flex items-center px-4 md:px-8 border-b border-gray-200 sticky top-0 bg-white z-10" style={{ paddingTop: 'max(44px, env(safe-area-inset-top))', paddingBottom: '12px' }}>
        <div className="flex items-center gap-2 md:max-w-[1280px] md:mx-auto md:w-full">
          <button onClick={goBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 -ml-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-semibold text-base ml-1 flex-1 truncate">Resumen de compra</span>
          <button
            onClick={() => navToTab('home')}
            className="hidden md:block font-bold text-base tracking-tight text-gray-900 shrink-0 ml-3"
          >
            vibra
          </button>
        </div>
      </header>

      {/* ── MOBILE: single column, sticky bottom CTA ────────────────────────── */}
      <div className="md:hidden flex-1 overflow-y-auto">
        <div className="px-4 py-5 flex flex-col gap-5 pb-32">
          <EventCard />
          <TicketDetail />
          <div className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Precio</p>
            <Divider />
            <PriceBreakdown />
          </div>
          <BuyerCard />
        </div>
      </div>
      <div className="md:hidden">
        <StickyBar>
          <div className="flex flex-col gap-2">
            <Button fullWidth size="lg" onClick={() => navigate('payment')}>
              Continuar al pago →
            </Button>
            <CartButton state={state} updateState={updateState} onAdded={() => navigate('home')} />
          </div>
        </StickyBar>
      </div>

      {/* ── DESKTOP: content left (~65%), resumen sticky right (~35%) ───────── */}
      <div className="hidden md:flex md:gap-8 md:max-w-[1280px] md:mx-auto md:px-8 md:py-8 md:w-full">
        <div className="md:w-[65%] md:min-w-0 flex flex-col gap-5">
          <EventCard />
          <TicketDetail />
          <BuyerCard />
        </div>
        <div className="md:w-[35%] md:shrink-0">
          <div className="sticky top-24 border border-gray-200 rounded-2xl p-5 bg-white flex flex-col gap-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Precio</p>
            <Divider />
            <PriceBreakdown />
            <Button fullWidth size="lg" onClick={() => navigate('payment')} className="mt-1">
              Continuar al pago →
            </Button>
            <CartButton state={state} updateState={updateState} onAdded={() => navigate('home')} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Add to cart button with confirmation ──────────────────────────────────────

function CartButton({
  state,
  updateState,
  onAdded,
}: {
  state: NavProps['state'];
  updateState: NavProps['updateState'];
  onAdded: () => void;
}) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const { event, date, sector, subzone, seats, qty, ticketTypeName, ticketTypePrice } = state;
    if (!event || !date) return;

    const subtotal = seats.length > 0
      ? seats.reduce((a, s) => a + s.price, 0)
      : (ticketTypePrice ?? event.priceFrom) * qty;
    const serviceCharge = Math.round(subtotal * 0.1);

    const newItem: CartItem = {
      id: `cart-${Date.now()}`,
      eventName: event.name,
      date: `${date.date} · ${date.time}`,
      venue: `${date.venue} · ${date.city}`,
      ticketTypeName: ticketTypeName + (subzone ? ` · ${subzone}` : ''),
      qty: seats.length > 0 ? seats.length : qty,
      unitPrice: seats.length > 0 ? (sector?.price ?? event.priceFrom) : (ticketTypePrice ?? event.priceFrom),
      total: subtotal + serviceCharge,
    };

    updateState({ cart: [...(state.cart ?? []), newItem] });
    setAdded(true);
    setTimeout(() => { onAdded(); }, 1200);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={added}
      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-colors ${
        added
          ? 'border-green-300 bg-green-50 text-green-700'
          : 'border-gray-300 bg-white text-gray-700 active:bg-gray-50'
      }`}
    >
      {added ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L19 7" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          ¡Agregado al carrito!
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#374151" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6h18" stroke="#374151" strokeWidth="1.75" strokeLinecap="round"/>
            <path d="M12 11v6M9 14h6" stroke="#374151" strokeWidth="1.75" strokeLinecap="round"/>
          </svg>
          Agregar al carrito
        </>
      )}
    </button>
  );
}

// ── Payment ───────────────────────────────────────────────────────────────────

function PaymentScreen({ state, navigate, goBack, navToTab }: NavProps) {
  const { event, date, qty, ticketTypeName, ticketTypePrice, seats, cart } = state;
  const isCartMode = !event && (cart?.length ?? 0) > 0;
  if (!event && !isCartMode) return null;

  const [payMethod, setPayMethod] = useState<string>('');
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = isCartMode
    ? (cart ?? []).reduce((a, item) => a + item.total, 0)
    : seats.length > 0
      ? seats.reduce((a, s) => a + s.price, 0)
      : (ticketTypePrice ?? event!.priceFrom) * qty;
  const total = isCartMode ? subtotal : Math.round(subtotal * 1.1);

  const methods = [
    { id: 'card', label: 'Tarjeta de crédito / débito' },
    { id: 'transfer', label: 'Transferencia bancaria' },
    { id: 'wallet', label: 'Billetera digital (Mercado Pago, etc.)' },
  ];

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => navigate('confirmation'), 1500);
  };

  // ── Shared blocks ───────────────────────────────────────────────────────────
  const MiniSummary = () => isCartMode ? (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col gap-1">
      <p className="font-semibold text-sm text-gray-900">Mi carrito</p>
      <p className="text-xs text-gray-500">{cart.length} {cart.length === 1 ? 'entrada' : 'entradas'}</p>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-gray-500">Total</span>
        <span className="font-bold text-gray-900">{fmt(total)}</span>
      </div>
    </div>
  ) : (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex justify-between items-center">
      <div>
        <p className="font-semibold text-sm text-gray-900">{event!.name}</p>
        <p className="text-xs text-gray-500">{date!.date} · {date!.city}</p>
        <p className="text-xs text-gray-500">
          {seats.length > 0 ? `${seats.length} asientos` : `${qty} entradas`} · {ticketTypeName}
        </p>
      </div>
      <span className="font-bold text-gray-900">{fmt(total)}</span>
    </div>
  );

  const PaymentMethods = () => (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Medio de pago</p>
      <div className="flex flex-col gap-2">
        {methods.map(m => (
          <button
            key={m.id}
            onClick={() => setPayMethod(m.id)}
            className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-colors ${
              payMethod === m.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
              payMethod === m.id ? 'border-blue-600' : 'border-gray-300'
            }`}>
              {payMethod === m.id && <div className="w-2 h-2 rounded-full bg-blue-600" />}
            </div>
            <span className="text-sm font-medium text-gray-800">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const PaymentDetails = () => (
    <>
      {payMethod === 'card' && (
        <div className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Datos de la tarjeta</p>
          <Divider />
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Número de tarjeta</label>
            <input
              value={cardNum}
              onChange={e => setCardNum(e.target.value.replace(/\D/g, '').slice(0, 16))}
              placeholder="0000 0000 0000 0000"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Vencimiento</label>
              <input
                value={expiry}
                onChange={e => setExpiry(e.target.value.slice(0, 5))}
                placeholder="MM/AA"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">CVV</label>
              <input
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="•••"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Nombre en tarjeta</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="NOMBRE APELLIDO"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            🔒 Pago seguro. Tus datos no se almacenan en nuestros servidores.
          </p>
        </div>
      )}

      {payMethod === 'transfer' && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600">
            Se generará una orden de pago. Tendrás 30 minutos para completar la transferencia antes de que se liberen los asientos.
          </p>
        </div>
      )}

      {payMethod === 'wallet' && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 mb-3">Serás redirigido a tu billetera digital para completar el pago</p>
          <div className="flex gap-3 justify-center">
            {['Mercado Pago', 'MACH', 'Tenpo'].map(w => (
              <div key={w} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600">{w}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
      <header className="flex items-center px-4 md:px-8 border-b border-gray-200 sticky top-0 bg-white z-10" style={{ paddingTop: 'max(44px, env(safe-area-inset-top))', paddingBottom: '12px' }}>
        <div className="flex items-center gap-2 md:max-w-[1280px] md:mx-auto md:w-full">
          <button onClick={goBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 -ml-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-semibold text-base ml-1 flex-1 truncate">Pago</span>
          <button
            onClick={() => navToTab('home')}
            className="hidden md:block font-bold text-base tracking-tight text-gray-900 shrink-0 ml-3"
          >
            vibra
          </button>
        </div>
      </header>

      {/* ── MOBILE: single column, sticky bottom CTA ────────────────────────── */}
      <div className="md:hidden flex-1 overflow-y-auto">
        <div className="px-4 py-5 flex flex-col gap-5 pb-32">
          <MiniSummary />
          <PaymentMethods />
          <PaymentDetails />
        </div>
      </div>
      <div className="md:hidden">
        <StickyBar>
          <Button fullWidth size="lg" disabled={!payMethod || loading} onClick={handlePay}>
            {loading ? 'Procesando...' : `Pagar ${fmt(total)}`}
          </Button>
          <p className="text-xs text-gray-400 text-center mt-2">
            Al pagar aceptas los Términos y Condiciones de Vibra
          </p>
        </StickyBar>
      </div>

      {/* ── DESKTOP: medio de pago left (~65%), resumen sticky right (~35%) ──── */}
      <div className="hidden md:flex md:gap-8 md:max-w-[1280px] md:mx-auto md:px-8 md:py-8 md:w-full">
        <div className="md:w-[65%] md:min-w-0 flex flex-col gap-5">
          <PaymentMethods />
          <PaymentDetails />
        </div>
        <div className="md:w-[35%] md:shrink-0">
          <div className="sticky top-24 border border-gray-200 rounded-2xl p-5 bg-white flex flex-col gap-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Tu compra</p>
            <MiniSummary />
            <Button fullWidth size="lg" disabled={!payMethod || loading} onClick={handlePay}>
              {loading ? 'Procesando...' : `Pagar ${fmt(total)}`}
            </Button>
            <p className="text-xs text-gray-400 text-center">
              Al pagar aceptas los Términos y Condiciones de Vibra
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Confirmation ──────────────────────────────────────────────────────────────

function ConfirmationScreen({ state, navigate, navToTab }: NavProps) {
  const { event, date, qty, seats, ticketTypeName, email } = state;
  const orderId = `VB-2025-${String(Math.floor(10000 + Math.random() * 90000)).slice(0, 5)}`;

  return (
    <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
    <div className="flex flex-col flex-1 px-4 py-8 md:max-w-2xl md:mx-auto md:w-full">
      {/* Success icon */}
      <div className="flex flex-col items-center text-center mb-8 mt-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <IconCheck size={36} color="#16A34A" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">¡Compra confirmada!</h1>
        <p className="text-sm text-gray-500 mt-1">
          Enviamos tu confirmación a <strong>{email || 'tu correo'}</strong>
        </p>
      </div>

      {/* Order summary */}
      <div className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Orden</p>
          <p className="text-xs font-mono text-gray-500">#{orderId}</p>
        </div>
        <Divider />
        {event && (
          <>
            <div>
              <p className="font-semibold text-gray-900">{event.name}</p>
              {date && <p className="text-sm text-gray-500 mt-0.5">{date.date} · {date.time} · {date.city}</p>}
              {date && <p className="text-xs text-gray-400">{date.venue}</p>}
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {seats.length > 0 ? `${seats.length} asientos` : `${qty} entradas`} · {ticketTypeName}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <Button fullWidth size="lg" onClick={() => navigate('my-ticket')}>
          Ver mis entradas
        </Button>
        <Button fullWidth size="md" variant="secondary" onClick={() => navToTab('home')}>
          Volver al inicio
        </Button>
      </div>
    </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function CheckoutScreens(props: NavProps) {
  if (props.state.screen === 'summary') return <SummaryScreen {...props} />;
  if (props.state.screen === 'payment') return <PaymentScreen {...props} />;
  if (props.state.screen === 'confirmation') return <ConfirmationScreen {...props} />;
  return null;
}
