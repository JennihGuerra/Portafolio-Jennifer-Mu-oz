import { useState } from 'react';
import { NavProps, SectorInfo, Attendee } from '../types';
import { fmt } from '../data';
import {
  Header, Button, QtySelector, AvailBadge, StickyBar, IconCheck,
  IconChevronRight, Input, Divider, FloatingHomeButton,
} from '../components/ui';
import VenueMap from '../components/VenueMap';

// ── Shared event summary bar ─────────────────────────────────────────────────

function EventSummary({ state }: { state: NavProps['state'] }) {
  const { event, date } = state;
  if (!event || !date) return null;
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mx-4 mb-4 mt-4">
      <p className="font-semibold text-sm text-gray-900 leading-tight">{event.name}</p>
      <p className="text-xs text-gray-500 mt-0.5">{date.date} · {date.time} · {date.city}</p>
      <p className="text-xs text-gray-400">{date.venue}</p>
    </div>
  );
}

// ── Event image hero (wireframe placeholder) ──────────────────────────────────

function EventHero({ state }: { state: NavProps['state'] }) {
  const { event, date } = state;
  if (!event) return null;
  return (
    <div className="relative w-full bg-gray-200" style={{ minHeight: 160 }}>
      {/* Image placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 opacity-40">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
          <circle cx="8.5" cy="8.5" r="1.5" stroke="#6B7280" strokeWidth="1.5"/>
          <path d="M21 15l-5-5L5 21" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="text-xs text-gray-500">[imagen evento]</span>
      </div>
      {/* Gradient + text overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
        <p className="text-white font-bold text-base leading-tight">{event.name}</p>
        {date && (
          <p className="text-white/70 text-xs mt-0.5">{date.date} · {date.venue} · {date.city}</p>
        )}
      </div>
    </div>
  );
}

// ── General selection ─────────────────────────────────────────────────────────

function GeneralSelection({ state, navigate, goBack, navToTab, updateState }: NavProps) {
  const { event, date } = state;
  if (!event) return null;

  const prices = event.generalPrices ?? [{ name: 'General', price: event.priceFrom }];
  const [selectedType, setSelectedType] = useState(0);
  const [qty, setQty] = useState(1);

  const price = prices[selectedType].price;
  const total = price * qty;

  const handleContinue = () => navigate('identification', {
    qty,
    ticketTypeName: prices[selectedType].name,
    ticketTypePrice: prices[selectedType].price,
  });

  // ── Left column: ticket type + quantity (shared mobile/desktop) ────────────
  const TypesAndQty = () => (
    <div className="flex flex-col gap-4">
      {prices.length > 1 && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Tipo de entrada</p>
          <div className="flex flex-col gap-2">
            {prices.map((p, i) => (
              <button
                key={i}
                onClick={() => setSelectedType(i)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                  selectedType === i
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedType === i ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {selectedType === i && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                  <span className="font-medium text-sm text-gray-900">{p.name}</span>
                </div>
                <span className="font-semibold text-sm text-gray-900">{fmt(p.price)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Cantidad</p>
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
          <div>
            <p className="font-medium text-sm text-gray-900">{prices[selectedType].name}</p>
            <p className="text-xs text-gray-500">{fmt(price)} c/u</p>
          </div>
          <QtySelector value={qty} onChange={setQty} max={8} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen md:max-w-[1280px] md:mx-auto">
      <div className="relative">
        <EventHero state={state} />
        <button onClick={goBack}
          className="absolute top-0 left-4 z-10 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center"
          style={{ marginTop: 'max(44px, env(safe-area-inset-top))' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <FloatingHomeButton onHome={() => navToTab('home')} />
      </div>

      {/* Mobile: single column stack */}
      <div className="md:hidden flex flex-col gap-4 px-4 pb-4">
        <TypesAndQty />
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">{qty} {qty === 1 ? 'entrada' : 'entradas'}</span>
          <span className="font-bold text-base text-gray-900">{fmt(total)}</span>
        </div>
      </div>
      <div className="md:hidden flex-1" />
      <div className="md:hidden">
        <StickyBar>
          <Button fullWidth size="lg" onClick={handleContinue}>Continuar</Button>
        </StickyBar>
      </div>

      {/* Desktop: types/qty left, "tu selección" summary right (sticky) */}
      <div className="hidden md:flex md:gap-8 md:px-8 md:py-8">
        <div className="md:flex-1 md:min-w-0">
          <TypesAndQty />
        </div>
        <div className="md:w-80 lg:w-96 md:shrink-0">
          <div className="sticky top-20 border border-gray-200 rounded-2xl p-5 bg-white flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tu selección</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{prices[selectedType].name} × {qty}</span>
                <span className="text-gray-900 font-medium">{fmt(total)}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-xl text-gray-900">{fmt(total)}</span>
            </div>
            <Button fullWidth size="lg" onClick={handleContinue}>Continuar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sector selection ──────────────────────────────────────────────────────────

function SectorSelection({ state, navigate, goBack, navToTab }: NavProps) {
  const { event } = state;
  if (!event || !event.sectors) return null;

  const [selected, setSelected] = useState<SectorInfo | null>(null);
  const [qty, setQty] = useState(1);

  const handleContinue = () => navigate('identification', {
    sector: selected,
    qty,
    ticketTypeName: selected!.name,
    ticketTypePrice: selected!.price,
  });

  // ── Selection summary — reused in mobile stack + desktop sticky sidebar ────
  const SelectionSummary = () => (
    <>
      {selected ? (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Sector seleccionado</p>
            <p className="font-semibold text-gray-900 mt-0.5">{selected.name}</p>
            <p className="text-xs text-gray-500">{fmt(selected.price)} por entrada</p>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl">
            <span className="text-sm text-gray-700">Cantidad de entradas</span>
            <QtySelector value={qty} onChange={setQty} max={8} />
          </div>
          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">{qty} × {selected.name}</span>
            <span className="font-bold text-base text-gray-900">{fmt(selected.price * qty)}</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 py-6 border border-dashed border-gray-200 rounded-xl bg-gray-50 text-center px-3">
          <p className="text-xs text-gray-400 leading-relaxed">Toca un sector en el mapa para ver precio y elegir cantidad.</p>
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col min-h-screen pb-28 md:pb-0 md:max-w-[1280px] md:mx-auto">
      <div className="relative">
        <EventHero state={state} />
        <button onClick={goBack}
          className="absolute top-0 left-4 z-10 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center"
          style={{ marginTop: 'max(44px, env(safe-area-inset-top))' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <FloatingHomeButton onHome={() => navToTab('home')} />
      </div>

      {/* ── MOBILE: sequential stack (map → selection → price table → sticky CTA) ── */}
      <div className="md:hidden flex flex-col">
        <div className="bg-white border-b border-gray-100 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 mb-3">
            Mapa del recinto — toca tu sector
          </p>
          <VenueMap mode="zone" sectors={event.sectors!} activeSector={selected}
            onSelect={s => { setSelected(s); setQty(1); }} />
        </div>
        {selected && <div className="px-4 py-4 flex flex-col gap-3"><SelectionSummary /></div>}
        <SectorPriceTable sectors={event.sectors!} activeSector={selected} onSelect={s => { setSelected(s); setQty(1); }} />
        <StickyBar>
          <Button fullWidth size="lg" disabled={!selected} onClick={handleContinue}>
            {selected ? 'Continuar →' : 'Toca un sector en el mapa'}
          </Button>
        </StickyBar>
      </div>

      {/* ── DESKTOP: map protagonist (~70-75%) + sticky summary (~25-30%) ────── */}
      <div className="hidden md:flex md:gap-8 md:px-8 md:py-8">
        <div className="md:w-[72%] md:min-w-0 flex flex-col gap-5">
          <div className="bg-white border border-gray-200 rounded-2xl py-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 mb-2">
              Mapa del recinto — selecciona tu sector
            </p>
            <VenueMap mode="zone" sectors={event.sectors!} activeSector={selected} large
              onSelect={s => { setSelected(s); setQty(1); }} />
          </div>
          <SectorPriceTable sectors={event.sectors!} activeSector={selected} onSelect={s => { setSelected(s); setQty(1); }} />
        </div>
        <div className="md:w-[28%] md:shrink-0">
          <div className="sticky top-20 border border-gray-200 rounded-2xl p-5 bg-white flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tu selección</p>
            <SelectionSummary />
            <Button fullWidth size="lg" disabled={!selected} onClick={handleContinue} className="mt-1">
              {selected ? 'Continuar →' : 'Toca un sector en el mapa'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Numbered: sector → subzone selection ──────────────────────────────────────

// ── Price/availability table for sectors ─────────────────────────────────────

function SectorPriceTable({ sectors, activeSector, onSelect, bare }: {
  sectors: SectorInfo[];
  activeSector: SectorInfo | null;
  onSelect: (s: SectorInfo) => void;
  /** When true, skip the outer label/border wrapper — the parent supplies its own (desktop sidebar). */
  bare?: boolean;
}) {
  const table = (
    <div className={bare ? '' : 'border border-gray-200 rounded-xl overflow-hidden'}>
      {/* Header */}
      <div className="flex items-center bg-gray-100 border-b border-gray-200 px-3 py-2 gap-2">
        <div className="w-3 shrink-0" />
        <span className="flex-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sector</span>
        <span className="w-20 text-right text-[10px] font-bold text-gray-500 uppercase tracking-widest">Precio</span>
        <span className="w-20 text-right text-[10px] font-bold text-gray-500 uppercase tracking-widest">Disponib.</span>
      </div>
      {sectors.map(s => {
        const isSoldOut = s.avail === 'sold-out';
        const isFew = s.avail === 'few';
        const isActive = activeSector?.id === s.id;
        return (
          <button
            key={s.id}
            onClick={() => !isSoldOut && onSelect(s)}
            disabled={isSoldOut}
            className={`w-full flex items-center px-3 py-3 border-b border-gray-100 last:border-0 gap-2 text-left transition-colors ${
              isActive ? 'bg-blue-50' : isSoldOut ? 'opacity-50' : 'active:bg-gray-50'
            }`}
          >
            <div className={`w-3 h-3 shrink-0 rounded-sm border ${
              isActive ? 'border-blue-500 bg-blue-200' : 'border-gray-400 bg-gray-300'
            }`} />
            <span className={`flex-1 text-xs font-bold uppercase tracking-wide ${
              isSoldOut ? 'text-gray-400 line-through' : isActive ? 'text-blue-700' : 'text-gray-800'
            }`}>{s.name}</span>
            <span className="w-20 text-right text-xs font-semibold text-gray-700 tabular-nums">
              {fmt(s.price)}
            </span>
            <span className={`w-20 text-right text-xs font-semibold tabular-nums ${
              isSoldOut ? 'text-red-400' : isFew ? 'text-amber-600' : 'text-green-600'
            }`}>
              {isSoldOut ? 'Agotado' : isFew ? 'Últimas' : 'Disponible'}
            </span>
          </button>
        );
      })}
    </div>
  );

  if (bare) return table;

  return (
    <div className="px-4 py-4 flex flex-col gap-2">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Zonas y precios</p>
      {table}
    </div>
  );
}

// ── Numbered: stadium map → subzone map → seat map ───────────────────────────

function NumberedSelection({ state, navigate, goBack, navToTab }: NavProps) {
  const { event } = state;
  if (!event || !event.sectors) return null;

  const [selectedSector, setSelectedSector] = useState<SectorInfo | null>(state.sector ?? null);

  const handleSelectSubzone = (sector: SectorInfo, subzone: string) => {
    setSelectedSector(sector);
    navigate('seat-map', { sector, subzone });
  };

  return (
    <div className="flex flex-col min-h-screen pb-6 md:pb-0 md:max-w-[1280px] md:mx-auto">
      <div className="relative">
        <EventHero state={state} />
        <button onClick={selectedSector ? () => setSelectedSector(null) : goBack}
          className="absolute top-0 left-4 z-10 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center"
          style={{ marginTop: 'max(44px, env(safe-area-inset-top))' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <FloatingHomeButton onHome={() => navToTab('home')} />
      </div>

      {/* ── MOBILE: map then table, stacked ─────────────────────────────────── */}
      <div className="md:hidden flex flex-col">
        <div className="bg-white border-b border-gray-100 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 mb-3">
            Mapa del recinto — toca una subzona
          </p>
          <VenueMap mode="subzone" sectors={event.sectors!} onSelectSubzone={handleSelectSubzone} />
        </div>
        <SectorPriceTable sectors={event.sectors!} activeSector={selectedSector} onSelect={s => setSelectedSector(s)} />
      </div>

      {/* ── DESKTOP: map protagonist (~72%) + zones/prices sidebar (~28%) ────── */}
      <div className="hidden md:flex md:gap-8 md:px-8 md:py-8">
        <div className="md:w-[72%] md:min-w-0">
          <div className="bg-white border border-gray-200 rounded-2xl py-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 mb-2">
              Mapa del recinto — selecciona una subzona
            </p>
            <VenueMap mode="subzone" sectors={event.sectors!} onSelectSubzone={handleSelectSubzone} large />
          </div>
        </div>
        <div className="md:w-[28%] md:shrink-0">
          <div className="sticky top-20 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-1">Zonas y precios</p>
            <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
              <SectorPriceTable sectors={event.sectors!} activeSector={selectedSector} onSelect={s => setSelectedSector(s)} bare />
            </div>
            <p className="text-xs text-gray-400 px-1 leading-relaxed">
              Cada sector puede tener varias subzonas — selecciónalas directamente en el mapa para ver los asientos disponibles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Nominative: qty + attendees ───────────────────────────────────────────────

function NominativeSelection({ state, navigate, goBack, navToTab, updateState }: NavProps) {
  const { event, screen } = state;
  if (!event) return null;

  const prices = event.generalPrices ?? [{ name: 'General', price: event.priceFrom }];
  const [selectedType, setSelectedType] = useState(0);
  const [qty, setQty] = useState(1);

  // Attendees screen
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>(
    Array.from({ length: qty }, (_, i) => ({
      idx: i,
      name: '',
      rut: '',
      email: '',
      complete: false,
    }))
  );
  const [formData, setFormData] = useState({ name: '', rut: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (screen === 'attendees') {
    const completed = attendees.filter(a => a.complete).length;
    const allComplete = completed === attendees.length;

    const openForm = (idx: number) => {
      const a = attendees[idx];
      setFormData({ name: a.name, rut: a.rut, email: a.email });
      setErrors({});
      setEditingIdx(idx);
    };

    const saveAttendee = () => {
      const errs: Record<string, string> = {};
      if (!formData.name.trim()) errs.name = 'Nombre requerido';
      if (!formData.rut.trim()) errs.rut = 'RUT requerido';
      if (!formData.email.trim()) errs.email = 'Correo requerido';
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setAttendees(prev =>
        prev.map(a => a.idx === editingIdx
          ? { ...a, ...formData, complete: true }
          : a
        )
      );
      setEditingIdx(null);
    };

    const continueToIdentification = () => navigate('identification', {
      qty,
      attendees,
      ticketTypeName: prices[selectedType].name,
      ticketTypePrice: prices[selectedType].price,
    });

    // ── Attendee list — shared by mobile accordion and desktop split view ────
    const AttendeeList = ({ onPick }: { onPick: (idx: number) => void }) => (
      <div className="flex flex-col gap-2">
        {attendees.map(a => (
          <button
            key={a.idx}
            onClick={() => onPick(a.idx)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors ${
              editingIdx === a.idx ? 'border-blue-500 bg-blue-50' :
              a.complete ? 'border-green-300 bg-green-50' :
              'border-gray-200 bg-white hover:border-gray-300 active:bg-gray-50'
            }`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              a.complete ? 'bg-green-500' : 'bg-gray-200'
            }`}>
              {a.complete
                ? <IconCheck size={14} color="white" />
                : <span className="text-xs text-gray-500 font-semibold">{a.idx + 1}</span>
              }
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900">
                {a.complete ? a.name : `Asistente ${a.idx + 1}`}
              </p>
              <p className="text-xs text-gray-500">
                {a.complete ? a.email : 'Agregar datos →'}
              </p>
            </div>
          </button>
        ))}
      </div>
    );

    const AttendeeForm = ({ onCancel }: { onCancel: () => void }) => (
      <div className="p-4 border border-blue-200 rounded-xl bg-white flex flex-col gap-3">
        <Input label="Nombre completo" placeholder="Juan García" value={formData.name}
          onChange={v => setFormData(p => ({ ...p, name: v }))} error={errors.name} />
        <Input label="RUT" placeholder="12.345.678-9" value={formData.rut}
          onChange={v => setFormData(p => ({ ...p, rut: v }))} error={errors.rut} />
        <Input label="Correo electrónico" placeholder="juan@email.com" type="email" value={formData.email}
          onChange={v => setFormData(p => ({ ...p, email: v }))} error={errors.email} />
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onCancel} size="sm">Cancelar</Button>
          <Button onClick={saveAttendee} size="sm" fullWidth>Guardar</Button>
        </div>
      </div>
    );

    return (
      <div className="flex flex-col min-h-screen md:max-w-[1280px] md:mx-auto">
        <div className="relative">
          <EventHero state={state} />
          <button onClick={goBack}
            className="absolute top-0 left-4 z-10 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center"
            style={{ marginTop: 'max(44px, env(safe-area-inset-top))' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <FloatingHomeButton onHome={() => navToTab('home')} />
          <div className="absolute bottom-3 left-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Datos de asistentes</span>
          </div>
        </div>

        {/* ── MOBILE: progressive disclosure accordion (unchanged) ─────────── */}
        <div className="md:hidden px-4 py-4 flex flex-col gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">Asistentes completados</span>
            <span className="font-semibold text-sm text-gray-900">{completed} de {attendees.length}</span>
          </div>
          <div className="flex flex-col gap-2">
            {attendees.map(a => (
              <div key={a.idx}>
                <button
                  onClick={() => openForm(a.idx)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                    editingIdx === a.idx ? 'border-blue-500 bg-blue-50' :
                    a.complete ? 'border-green-300 bg-green-50' :
                    'border-gray-200 bg-white active:bg-gray-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    a.complete ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    {a.complete
                      ? <IconCheck size={14} color="white" />
                      : <span className="text-xs text-gray-500 font-semibold">{a.idx + 1}</span>
                    }
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {a.complete ? a.name : `Asistente ${a.idx + 1}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {a.complete ? a.email : 'Agregar datos →'}
                    </p>
                  </div>
                </button>
                {editingIdx === a.idx && (
                  <div className="mt-2">
                    <AttendeeForm onCancel={() => setEditingIdx(null)} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="md:hidden flex-1" />
        <div className="md:hidden">
          <StickyBar>
            <Button fullWidth size="lg" disabled={!allComplete} onClick={continueToIdentification}>
              {allComplete ? 'Continuar' : `Completa los ${attendees.length - completed} asistentes restantes`}
            </Button>
          </StickyBar>
        </div>

        {/* ── DESKTOP: asistentes list left, form panel right (progressive disclosure kept) ── */}
        <div className="hidden md:flex md:gap-8 md:px-8 md:py-8">
          <div className="md:w-[38%] md:shrink-0 flex flex-col gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Asistentes completados</span>
              <span className="font-semibold text-sm text-gray-900">{completed} de {attendees.length}</span>
            </div>
            <AttendeeList onPick={openForm} />
          </div>
          <div className="md:flex-1 md:min-w-0">
            <div className="sticky top-20 flex flex-col gap-4">
              {editingIdx !== null ? (
                <AttendeeForm onCancel={() => setEditingIdx(null)} />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-16 border border-dashed border-gray-200 rounded-xl bg-gray-50 text-center px-6">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Selecciona un asistente de la lista para completar sus datos.
                  </p>
                </div>
              )}
              <Button fullWidth size="lg" disabled={!allComplete} onClick={continueToIdentification}>
                {allComplete ? 'Continuar' : `Completa los ${attendees.length - completed} asistentes restantes`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // sel-nominative: quantity selection
  const goToAttendees = () => navigate('attendees', {
    qty,
    attendees: Array.from({ length: qty }, (_, i) => ({ idx: i, name: '', rut: '', email: '', complete: false })),
    ticketTypeName: prices[selectedType].name,
    ticketTypePrice: prices[selectedType].price,
  });

  const TypesAndQty = () => (
    <div className="flex flex-col gap-4">
      {prices.length > 1 && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Tipo de entrada</p>
          <div className="flex flex-col gap-2">
            {prices.map((p, i) => (
              <button key={i} onClick={() => setSelectedType(i)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                  selectedType === i ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedType === i ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {selectedType === i && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                  <span className="font-medium text-sm text-gray-900">{p.name}</span>
                </div>
                <span className="font-semibold text-sm">{fmt(p.price)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 bg-white border border-gray-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm text-gray-900">Cantidad</p>
            <p className="text-xs text-gray-500 mt-0.5">Deberás ingresar datos de cada asistente</p>
          </div>
          <QtySelector value={qty} onChange={v => {
            setQty(v);
            setAttendees(Array.from({ length: v }, (_, i) => ({
              idx: i, name: '', rut: '', email: '', complete: false,
            })));
          }} max={6} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen md:max-w-[1280px] md:mx-auto">
      <div className="relative">
        <EventHero state={state} />
        <button onClick={goBack}
          className="absolute top-0 left-4 z-10 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center"
          style={{ marginTop: 'max(44px, env(safe-area-inset-top))' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <FloatingHomeButton onHome={() => navToTab('home')} />
      </div>

      {/* Mobile: single column stack */}
      <div className="md:hidden flex flex-col gap-4 px-4 pb-4">
        <TypesAndQty />
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">{qty} {qty === 1 ? 'entrada' : 'entradas'} · {prices[selectedType].name}</span>
          <span className="font-bold text-base text-gray-900">{fmt(prices[selectedType].price * qty)}</span>
        </div>
      </div>
      <div className="md:hidden flex-1" />
      <div className="md:hidden">
        <StickyBar>
          <Button fullWidth size="lg" onClick={goToAttendees}>
            Continuar · Agregar datos de asistentes
          </Button>
        </StickyBar>
      </div>

      {/* Desktop: types/qty left, summary right (sticky) */}
      <div className="hidden md:flex md:gap-8 md:px-8 md:py-8">
        <div className="md:flex-1 md:min-w-0">
          <TypesAndQty />
        </div>
        <div className="md:w-80 lg:w-96 md:shrink-0">
          <div className="sticky top-20 border border-gray-200 rounded-2xl p-5 bg-white flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tu selección</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{prices[selectedType].name} × {qty}</span>
              <span className="text-gray-900 font-medium">{fmt(prices[selectedType].price * qty)}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-xl text-gray-900">{fmt(prices[selectedType].price * qty)}</span>
            </div>
            <Button fullWidth size="lg" onClick={goToAttendees}>
              Continuar · Agregar datos de asistentes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function SelectionScreen(props: NavProps) {
  const { screen } = props.state;
  if (screen === 'sel-general') return <GeneralSelection {...props} />;
  if (screen === 'sel-sector') return <SectorSelection {...props} />;
  if (screen === 'sel-numbered') return <NumberedSelection {...props} />;
  if (screen === 'sel-nominative' || screen === 'attendees') return <NominativeSelection {...props} />;
  return null;
}
