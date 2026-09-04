import { useState, useEffect } from 'react';
import { NavProps, Seat } from '../types';
import { generateSeats, fmt } from '../data';
import { Header, Button, StickyBar, FloatingHomeButton } from '../components/ui';

export default function SeatMapScreen({ state, navigate, goBack, navToTab, updateState }: NavProps) {
  const { event, date, sector, subzone } = state;
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  useEffect(() => {
    if (sector && subzone) {
      setSeats(generateSeats(`${sector.id}-${subzone}`, sector.price));
    }
    setSelectedSeats([]);
  }, [sector, subzone]);

  if (!event || !sector || !subzone) return null;

  const toggle = (seat: Seat) => {
    if (seat.status === 'occupied') return;
    setSelectedSeats(prev => {
      const exists = prev.find(s => s.id === seat.id);
      if (exists) return prev.filter(s => s.id !== seat.id);
      if (prev.length >= 8) return prev;
      return [...prev, seat];
    });
  };

  const getSeatStatus = (seat: Seat): Seat['status'] => {
    if (selectedSeats.find(s => s.id === seat.id)) return 'selected';
    return seat.status;
  };

  const rows = Array.from(new Set(seats.map(s => s.row)));
  const total = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const count = selectedSeats.length;

  const handleContinue = () => navigate('identification', {
    seats: selectedSeats.map(s => ({ ...s, status: 'selected' as const })),
    qty: count,
    ticketTypeName: `${sector.name} · ${subzone}`,
    ticketTypePrice: sector.price,
  });

  const Legend = () => (
    <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100 md:border md:border-gray-200 md:rounded-xl md:bg-white">
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-300" />
        <span className="text-xs text-gray-500">Disponible</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 rounded-full bg-gray-300" />
        <span className="text-xs text-gray-500">Ocupado</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 rounded-full bg-blue-600" />
        <span className="text-xs text-gray-500">Seleccionado</span>
      </div>
    </div>
  );

  const SeatGrid = ({ seatSize }: { seatSize: number }) => (
    <>
      {/* Stage */}
      <div className="w-full bg-gray-200 border border-gray-300 rounded-lg py-2 text-center text-xs font-semibold text-gray-500 tracking-widest mb-6">
        ESCENARIO
      </div>

      {/* Seat grid */}
      <div className="flex flex-col gap-2 items-center">
        {rows.map(row => {
          const rowSeats = seats.filter(s => s.row === row);
          return (
            <div key={row} className="flex items-center gap-1">
              <span className="w-5 text-xs text-gray-400 font-medium text-right shrink-0">{row}</span>
              <div className="flex gap-1 flex-wrap justify-center">
                {rowSeats.map(seat => {
                  const status = getSeatStatus(seat);
                  return (
                    <button
                      key={seat.id}
                      onClick={() => toggle(seat)}
                      disabled={seat.status === 'occupied'}
                      title={`Fila ${seat.row} — Asiento ${seat.num}`}
                      style={{ width: seatSize, height: seatSize }}
                      className={`
                        rounded-full flex items-center justify-center text-[10px] font-medium
                        transition-all border
                        ${status === 'available' ? 'bg-white border-gray-300 text-gray-500 hover:border-blue-400 active:border-blue-400' : ''}
                        ${status === 'occupied' ? 'bg-gray-200 border-gray-200 text-gray-300 cursor-not-allowed' : ''}
                        ${status === 'selected' ? 'bg-blue-600 border-blue-600 text-white scale-110' : ''}
                      `}
                    >
                      {status !== 'occupied' ? seat.num : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  // ── "Tu compra" summary — updates immediately, no scroll needed on desktop ──
  const PurchaseSummary = () => (
    <>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tu compra</p>
        <p className="text-sm text-gray-600">{sector.name} · {subzone}</p>
      </div>
      {count > 0 ? (
        <div className="flex flex-col gap-1.5">
          {selectedSeats.map(s => (
            <div key={s.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">Fila {s.row} · Asiento {s.num}</span>
              <span className="text-gray-900 font-medium">{fmt(s.price)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 leading-relaxed">
          Selecciona uno o más asientos en el mapa. Tu selección aparecerá aquí al instante.
        </p>
      )}
      <div className="border-t border-gray-100 pt-3 flex justify-between">
        <span className="font-bold text-gray-900">Total</span>
        <span className="font-bold text-xl text-gray-900">{fmt(total)}</span>
      </div>
      <Button fullWidth size="lg" disabled={count === 0} onClick={handleContinue}>
        {count === 0 ? 'Selecciona al menos un asiento' : `Continuar con ${count} ${count === 1 ? 'asiento' : 'asientos'}`}
      </Button>
    </>
  );

  return (
    <div className="flex flex-col min-h-screen md:max-w-[1280px] md:mx-auto">
      {/* Hero with back button */}
      <div className="relative w-full bg-gray-200" style={{ minHeight: 130 }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 opacity-40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="#6B7280" strokeWidth="1.5"/>
            <path d="M21 15l-5-5L5 21" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-xs text-gray-500">[imagen evento]</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <button onClick={goBack}
          className="absolute top-0 left-4 z-10 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center"
          style={{ marginTop: 'max(44px, env(safe-area-inset-top))' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <FloatingHomeButton onHome={() => navToTab('home')} />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 md:px-8">
          <p className="text-white font-bold text-sm leading-tight">{event.name}</p>
          <p className="text-white/70 text-xs mt-0.5">{sector.name} · {subzone}</p>
        </div>
      </div>

      {/* Context bar */}
      <div className="px-4 md:px-8 py-3 border-b border-gray-100 md:border-0 flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-500">{sector.name}</span>
        <span className="text-gray-300">·</span>
        <span className="text-xs text-blue-600 font-medium">{subzone}</span>
        <span className="text-gray-300">·</span>
        <span className="text-xs text-gray-500">{fmt(sector.price)} c/u</span>
      </div>

      {/* ── MOBILE: sequential (legend → stage/seats → detail → sticky CTA) ─── */}
      <div className="md:hidden flex flex-col flex-1">
        <Legend />
        <div className="flex-1 overflow-auto">
          <div className="px-4 py-5">
            <SeatGrid seatSize={28} />
            {selectedSeats.length > 0 && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                  {count} {count === 1 ? 'asiento seleccionado' : 'asientos seleccionados'}
                </p>
                <div className="flex flex-col gap-1">
                  {selectedSeats.map(s => (
                    <div key={s.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        {sector.name} · Fila {s.row} · Asiento {s.num}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{fmt(s.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-blue-200 mt-2 pt-2 flex justify-between">
                  <span className="text-sm font-semibold text-gray-700">Total</span>
                  <span className="text-sm font-bold text-gray-900">{fmt(total)}</span>
                </div>
              </div>
            )}
            <div className="h-4" />
          </div>
        </div>
        <StickyBar>
          {count > 0 ? (
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm text-gray-600">{count} {count === 1 ? 'asiento' : 'asientos'}</span>
              <span className="font-bold text-gray-900">{fmt(total)}</span>
            </div>
          ) : null}
          <Button fullWidth size="lg" disabled={count === 0} onClick={handleContinue}>
            {count === 0 ? 'Selecciona al menos un asiento' : `Continuar con ${count} ${count === 1 ? 'asiento' : 'asientos'}`}
          </Button>
        </StickyBar>
      </div>

      {/* ── DESKTOP: seat map protagonist + live "tu compra" sidebar (sticky) ── */}
      <div className="hidden md:flex md:gap-8 md:px-8 md:py-6">
        <div className="md:w-[70%] md:min-w-0 flex flex-col gap-4">
          <Legend />
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <SeatGrid seatSize={32} />
          </div>
        </div>
        <div className="md:w-[30%] md:shrink-0">
          <div className="sticky top-20 border border-gray-200 rounded-2xl p-5 bg-white flex flex-col gap-4">
            <PurchaseSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
