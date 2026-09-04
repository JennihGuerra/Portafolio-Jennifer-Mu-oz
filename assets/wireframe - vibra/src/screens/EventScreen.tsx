import { useState } from 'react';
import { NavProps, EventDate, SectorInfo } from '../types';
import { fmt } from '../data';
import { AvailBadge, StickyBar, Button, EventTopNav } from '../components/ui';
import VenueMap from '../components/VenueMap';

// ── Back header inline (no safe-area issue since it's not sticky-top on this screen) ──

function BackHeader({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute top-0 left-0 z-20 p-4" style={{ paddingTop: 'max(44px, env(safe-area-inset-top))' }}>
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

// ── Main EventScreen ──────────────────────────────────────────────────────────

export default function EventScreen({ state, navigate, goBack, navToTab, updateState }: NavProps) {
  const { screen, event } = state;
  if (!event) return null;

  // Dates screen handled separately below
  if (screen === 'dates') {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="flex items-center px-4 border-b border-gray-200 bg-white sticky top-0 z-40"
          style={{ paddingTop: 'max(44px, env(safe-area-inset-top))', paddingBottom: '12px' }}>
          <button onClick={goBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 -ml-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-semibold text-base ml-1">Selecciona fecha</span>
        </header>
        <div className="px-4 py-5">
          <p className="font-semibold text-gray-900 mb-1">{event.name}</p>
          <p className="text-sm text-gray-500 mb-5">Elige una fecha y ubicación</p>
          <div className="flex flex-col gap-3">
            {event.dates.map(d => (
              <button key={d.id} onClick={() => {
                const selScreen = event.mode === 'general' ? 'sel-general' : event.mode === 'sector' ? 'sel-sector' : event.mode === 'numbered' ? 'sel-numbered' : 'sel-nominative';
                navigate(selScreen, { date: d });
              }}
                className="w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl text-left active:bg-blue-50 active:border-blue-300">
                <div className="flex flex-col flex-1 gap-0.5">
                  <p className="font-semibold text-gray-900">{d.city}</p>
                  <p className="text-sm text-gray-600">{d.date} · {d.time}</p>
                  <p className="text-sm text-gray-400">{d.venue}</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="#9CA3AF" strokeWidth="1.75" strokeLinecap="round" /></svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Landing page state ──────────────────────────────────────────────────────
  const allCities = Array.from(new Set(event.dates.map(d => d.city)));
  const [selectedCity, setSelectedCity] = useState(allCities[0]);
  const [selectedDate, setSelectedDate] = useState<EventDate>(
    event.dates.find(d => d.city === allCities[0]) ?? event.dates[0]
  );

  const datesForCity = event.dates.filter(d => d.city === selectedCity);
  const hasMultipleCities = allCities.length > 1;
  const hasMultipleDates = datesForCity.length > 1;

  // Date is "confirmed" automatically when there's only one option; otherwise requires explicit tap
  const [dateConfirmed, setDateConfirmed] = useState(!hasMultipleDates);
  const hasSectors = (event.sectors ?? []).length > 0;
  // Show extended content once a date is confirmed; sector selection happens within the visible map
  const showDetails = dateConfirmed;
  const sectors = event.sectors ?? [];
  const prices = event.generalPrices ?? [];

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    const first = event.dates.find(d => d.city === city);
    if (first) setSelectedDate(first);
    // Reset confirmation when city changes (new dates available)
    const newDates = event.dates.filter(d => d.city === city);
    setDateConfirmed(newDates.length === 1);
  };

  const handleContinue = () => {
    const selScreen = event.mode === 'general' ? 'sel-general' : event.mode === 'sector' ? 'sel-sector' : event.mode === 'numbered' ? 'sel-numbered' : 'sel-nominative';
    navigate(selScreen, { date: selectedDate });
  };

  // ── Reusable selector panel (used in both mobile position and desktop right column) ──
  const SelectorPanel = () => (
    <div className="flex flex-col gap-4">
      {hasMultipleCities && (
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Ciudad / Región</label>
          <select
            value={selectedCity}
            onChange={e => handleCityChange(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%236B7280' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
          >
            {allCities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      )}
      {hasMultipleDates && (
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Fecha</label>
          <div className="flex flex-col gap-2">
            {datesForCity.map(d => (
              <button
                key={d.id}
                onClick={() => { setSelectedDate(d); setDateConfirmed(true); }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-colors ${
                  selectedDate.id === d.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{d.date} · {d.time}</span>
                {selectedDate.id === d.id && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L19 7" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {!hasMultipleDates && (
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="2"/>
            <path d="M8 2v4M16 2v4M3 10h18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-sm text-gray-700">{selectedDate.date} · {selectedDate.time} · {selectedDate.venue}</span>
        </div>
      )}
    </div>
  );

  // Section links for the desktop top nav — only include what this event's mode actually renders
  const topNavLinks = [
    ...(sectors.length > 0 ? [{ id: 'section-mapa', label: 'Tickets' }] : []),
    { id: 'section-precios', label: 'Precios' },
    { id: 'section-info', label: 'Info evento' },
  ];

  return (
    <div className="flex flex-col pb-24 md:pb-0">

      <EventTopNav onHome={() => navToTab('home')} links={topNavLinks} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="relative w-full" style={{ minHeight: 'clamp(280px, 40vw, 480px)' }}>
        <BackHeader onBack={goBack} />
        <div className="w-full bg-gray-300 flex items-center justify-center absolute inset-0">
          <div className="flex flex-col items-center gap-1 opacity-40">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
              <circle cx="8.5" cy="8.5" r="1.5" stroke="#6B7280" strokeWidth="1.5"/>
              <path d="M21 15l-5-5L5 21" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-xs text-gray-500">[imagen hero evento]</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 md:px-8 md:pb-8 md:max-w-[1280px] md:mx-auto flex flex-col gap-2">
          <span className="self-start text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-2 py-0.5 rounded border border-white/20">
            {event.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">{event.name}</h1>
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {event.dates.slice(0, 3).map(d => (
              <span key={d.id} className="text-[11px] bg-white/15 text-white px-2 py-0.5 rounded-full border border-white/20">
                {d.date} · {d.city}
              </span>
            ))}
            {event.dates.length > 3 && (
              <span className="text-[11px] bg-white/15 text-white px-2 py-0.5 rounded-full border border-white/20">
                +{event.dates.length - 3} fechas
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" stroke="white" strokeWidth="2" fill="white" fillOpacity=".2"/>
            </svg>
            <span className="text-xs text-white/80">{selectedDate.venue} · {selectedDate.city}</span>
          </div>
        </div>
      </div>

      {/* ── CONTENT: mobile stack / desktop two-column ────────────────── */}
      <div className="md:max-w-[1280px] md:mx-auto md:px-8 md:py-8 md:flex md:gap-8 w-full">

        {/* ── LEFT COLUMN: detail info ──────────────────────────────────── */}
        <div className="md:flex-1 md:min-w-0">

          {/* Mobile selectors (hidden on desktop — shown in right column) */}
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-5">
            <SelectorPanel />
          </div>

          {/* Mobile: not-selected prompt */}
          {!showDetails && (
            <div className="md:hidden mx-4 mt-5 mb-1 flex flex-col items-center gap-3 py-8 border border-dashed border-gray-200 rounded-2xl bg-gray-50">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="#D1D5DB" strokeWidth="1.5"/>
                <path d="M12 11v5M12 8h.01" stroke="#D1D5DB" strokeWidth="1.75" strokeLinecap="round"/>
              </svg>
              <p className="text-sm text-gray-400 text-center px-6 leading-relaxed">
                Selecciona una fecha para ver más información del evento.
              </p>
            </div>
          )}

          {/* Venue map */}
          {showDetails && sectors.length > 0 && (
            <div id="section-mapa" className="scroll-mt-20 bg-white border-b border-gray-100 md:border md:border-gray-200 md:rounded-2xl md:mb-5 py-5 flex flex-col gap-4">
              <div className="px-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Mapa del recinto</p>
                <span className="text-xs text-gray-400">{selectedDate.venue}</span>
              </div>
              <div className="mx-4 rounded-xl bg-white border border-gray-200 overflow-hidden py-4 select-none pointer-events-none">
                <VenueMap mode="subzone" sectors={sectors} onSelectSubzone={() => {}} />
              </div>
            </div>
          )}

          {/* Price table */}
          {showDetails && (
            <div id="section-precios" className="scroll-mt-20 bg-white border-b border-gray-100 md:border md:border-gray-200 md:rounded-2xl md:mb-5 px-4 py-5 flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tabla de valores</p>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center bg-gray-100 border-b border-gray-300 px-3 py-2.5 gap-2">
                  <div className="w-3 shrink-0" />
                  <span className="flex-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sectores</span>
                  <span className="w-20 text-right text-[10px] font-bold text-gray-500 uppercase tracking-widest">Precio</span>
                  <span className="w-16 text-right text-[10px] font-bold text-gray-500 uppercase tracking-widest">Cargo</span>
                  <span className="w-20 text-right text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total</span>
                </div>
                {/* Sector rows only stand in for the price table when there's no separate
                    generalPrices list — nominative events carry both (sectors purely to
                    illustrate the venue map) so their generalPrices are the source of truth here. */}
                {prices.length === 0 && sectors.map((s) => {
                  const cargo = Math.round(s.price * 0.165);
                  const total = s.price + cargo;
                  const isSoldOut = s.avail === 'sold-out';
                  return (
                    <div key={s.id} className={`flex items-center px-3 py-3 border-b border-gray-100 last:border-0 gap-2 ${isSoldOut ? 'opacity-50' : ''}`}>
                      <div className="w-3 h-3 shrink-0 rounded-sm border border-gray-400 bg-gray-300" />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold uppercase tracking-wide leading-tight ${isSoldOut ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{s.name}</p>
                        {isSoldOut && <p className="text-[10px] text-red-400 font-medium">Agotado</p>}
                      </div>
                      <span className="w-20 text-right text-xs font-semibold text-gray-700 tabular-nums">{fmt(s.price)}</span>
                      <span className="w-16 text-right text-xs text-gray-500 tabular-nums">{fmt(cargo)}</span>
                      <span className="w-20 text-right text-xs font-bold text-gray-900 tabular-nums">{fmt(total)}</span>
                    </div>
                  );
                })}
                {prices.map((p, i) => {
                  const cargo = Math.round(p.price * 0.165);
                  const total = p.price + cargo;
                  return (
                    <div key={i} className="flex items-center px-3 py-3 border-b border-gray-100 last:border-0 gap-2">
                      <div className="w-3 h-3 shrink-0 rounded-sm border border-gray-400 bg-gray-300" />
                      <span className="flex-1 text-xs font-bold uppercase tracking-wide text-gray-800">{p.name}</span>
                      <span className="w-20 text-right text-xs font-semibold text-gray-700 tabular-nums">{fmt(p.price)}</span>
                      <span className="w-16 text-right text-xs text-gray-500 tabular-nums">{fmt(cargo)}</span>
                      <span className="w-20 text-right text-xs font-bold text-gray-900 tabular-nums">{fmt(total)}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-gray-400">* Cargo de servicio aproximado del 16,5%. El valor exacto se informa al momento de la compra.</p>
            </div>
          )}

          {/* Conditions */}
          {showDetails && (
            <div className="bg-white border-b border-gray-100 md:border md:border-gray-200 md:rounded-2xl md:mb-5 px-4 py-5 flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Condiciones del evento</p>
              <div className="flex flex-col gap-2">
                {[
                  { icon: '🎟', text: 'Entrada no reembolsable salvo cancelación del evento.' },
                  { icon: '🪪', text: 'Se solicitará cédula de identidad en el acceso.' },
                  { icon: '🔞', text: 'Evento para mayores de 14 años. Menores deben asistir con adulto responsable.' },
                  { icon: '🚫', text: 'Prohibido el ingreso de alimentos y bebidas desde el exterior.' },
                  { icon: '📸', text: 'Está permitido el uso de celular. Cámaras profesionales requieren acreditación.' },
                  { icon: '♿', text: 'Recinto cuenta con accesos para personas con movilidad reducida.' },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <span className="text-base shrink-0 mt-0.5">{c.icon}</span>
                    <p className="text-xs text-gray-600 leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How to get there */}
          {showDetails && (
            <div className="bg-white border-b border-gray-100 md:border md:border-gray-200 md:rounded-2xl md:mb-5 px-4 py-5 flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Cómo llegar</p>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="h-36 bg-gray-200 flex flex-col items-center justify-center gap-1.5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" stroke="#9CA3AF" strokeWidth="1.5" fill="#E5E7EB"/>
                    <circle cx="12" cy="8" r="2" stroke="#9CA3AF" strokeWidth="1.5"/>
                  </svg>
                  <span className="text-xs text-gray-400">[mapa estático]</span>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white active:bg-gray-50 hover:bg-gray-50 border-t border-gray-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" stroke="#2563EB" strokeWidth="2"/>
                    <circle cx="12" cy="8" r="2" stroke="#2563EB" strokeWidth="2"/>
                  </svg>
                  <span className="text-sm font-semibold text-blue-600">Abrir en Maps · {selectedDate.venue}</span>
                </button>
              </div>
              <p className="text-xs text-gray-400">{selectedDate.venue} · {selectedDate.city}</p>
            </div>
          )}

          {/* Video */}
          {showDetails && (
            <div className="bg-white border-b border-gray-100 md:border md:border-gray-200 md:rounded-2xl md:mb-5 px-4 py-5 flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Video del artista</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-200 relative flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
                <div className="flex flex-col items-center gap-2 opacity-50">
                  <div className="w-14 h-14 rounded-full bg-gray-400 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5l11 7-11 7V5z" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500">[video promocional]</span>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          {showDetails && (
            <div id="section-info" className="scroll-mt-20 bg-white md:border md:border-gray-200 md:rounded-2xl px-4 py-5 flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Acerca del evento</p>
              <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {['No reembolsable', 'QR digital', event.category].map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: purchase panel (desktop only) ───────────────── */}
        <div className="hidden md:block md:w-80 lg:w-96 md:shrink-0">
          <div className="sticky top-20 flex flex-col gap-4">
            {/* Event summary */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-white">
              <p className="font-bold text-gray-900 text-lg leading-tight mb-1">{event.name}</p>
              <p className="text-sm text-gray-500 mb-4">{selectedDate.venue} · {selectedDate.city}</p>

              <SelectorPanel />

              {!showDetails && (
                <div className="mt-4 flex flex-col items-center gap-2 py-6 border border-dashed border-gray-200 rounded-xl bg-gray-50">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="#D1D5DB" strokeWidth="1.5"/>
                    <path d="M12 11v5M12 8h.01" stroke="#D1D5DB" strokeWidth="1.75" strokeLinecap="round"/>
                  </svg>
                  <p className="text-xs text-gray-400 text-center leading-relaxed px-2">
                    Selecciona una fecha para continuar
                  </p>
                </div>
              )}

              {showDetails && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">
                    {prices.length > 0
                      ? `Desde ${fmt(Math.min(...prices.map(p => p.price)))}`
                      : sectors.length > 0
                        ? `Desde ${fmt(Math.min(...sectors.filter(s => s.avail !== 'sold-out').map(s => s.price)))}`
                        : ''}
                  </p>
                  <button
                    onClick={handleContinue}
                    className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
                  >
                    Comprar entradas →
                  </button>
                </div>
              )}
            </div>

            {/* Quick info */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-white flex flex-col gap-2.5">
              <div className="flex items-start gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#9CA3AF" strokeWidth="2"/>
                  <path d="M8 2v4M16 2v4M3 10h18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-xs text-gray-600">{selectedDate.date} · {selectedDate.time}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                  <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" stroke="#9CA3AF" strokeWidth="2"/>
                </svg>
                <span className="text-xs text-gray-600">{selectedDate.venue} · {selectedDate.city}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                  <path d="M20 12V22H4V12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 7H2v5h20V7z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V7M12 7H7.5a2.5 2.5 0 110-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 100-5C13 2 12 7 12 7z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs text-gray-600">Entrada QR digital. No reembolsable.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY CTA — mobile only ──────────────────────────────────────── */}
      <div className="md:hidden">
        <StickyBar>
          <Button fullWidth size="lg" onClick={handleContinue}>
            Comprar entradas →
          </Button>
        </StickyBar>
      </div>
    </div>
  );
}
