import { ReactNode, useState, useEffect, useRef, ClipboardEvent } from 'react';
import { NavProps, Screen, Event } from '../types';
import { EVENTS } from '../data';

// ─── Icons (inline SVG, functional) ─────────────────────────────────────────

export const IconHome = ({ active }: { active?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
      stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" fill={active ? '#EFF6FF' : 'none'} />
    <path d="M9 21V12h6v9" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" />
  </svg>
);

export const IconSearch = ({ active, size = 24 }: { active?: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" />
    <path d="M16.5 16.5L21 21" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

export const IconTicket = ({ active }: { active?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 5H5a2 2 0 00-2 2v2a2 2 0 010 4v2a2 2 0 002 2h10" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" />
    <path d="M15 5h4a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2h-4" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" />
    <path d="M15 5v14" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" strokeDasharray="2 2" />
  </svg>
);

export const IconUser = ({ active }: { active?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" />
    <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

export const IconBack = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 19l-7-7 7-7" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 5l7 7-7 7" stroke="#9CA3AF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCheck = ({ size = 20, color = '#16A34A' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12l5 5L19 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="#111" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

export const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="1.75" />
    <path d="M8 2v4M16 2v4M3 10h18" stroke="#6B7280" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

export const IconLocation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" stroke="#6B7280" strokeWidth="1.75" />
    <circle cx="12" cy="8" r="2" stroke="#6B7280" strokeWidth="1.75" />
  </svg>
);

export const IconQR = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <rect x="4" y="4" width="48" height="48" rx="4" stroke="#D1D5DB" strokeWidth="2" fill="none" />
    <rect x="14" y="14" width="28" height="28" rx="2" fill="#D1D5DB" />
    <rect x="68" y="4" width="48" height="48" rx="4" stroke="#D1D5DB" strokeWidth="2" fill="none" />
    <rect x="78" y="14" width="28" height="28" rx="2" fill="#D1D5DB" />
    <rect x="4" y="68" width="48" height="48" rx="4" stroke="#D1D5DB" strokeWidth="2" fill="none" />
    <rect x="14" y="78" width="28" height="28" rx="2" fill="#D1D5DB" />
    <rect x="68" y="68" width="8" height="8" fill="#D1D5DB" />
    <rect x="84" y="68" width="8" height="8" fill="#D1D5DB" />
    <rect x="100" y="68" width="16" height="8" fill="#D1D5DB" />
    <rect x="68" y="84" width="16" height="8" fill="#D1D5DB" />
    <rect x="92" y="84" width="8" height="8" fill="#D1D5DB" />
    <rect x="68" y="100" width="8" height="16" fill="#D1D5DB" />
    <rect x="84" y="100" width="16" height="8" fill="#D1D5DB" />
    <rect x="108" y="92" width="8" height="24" fill="#D1D5DB" />
  </svg>
);

// ─── Bottom Navigation ────────────────────────────────────────────────────────

const IconDocument = ({ active }: { active?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
      stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" fill={active ? '#EFF6FF' : 'none'} />
    <path d="M14 2v6h6M9 13h6M9 17h4" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const IconHelp = ({ active }: { active?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" fill={active ? '#EFF6FF' : 'none'} />
    <path d="M9.5 9a2.5 2.5 0 015 .5c0 1.5-2.5 2-2.5 3.5" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="12" cy="17" r="0.75" fill={active ? '#2563EB' : '#6B7280'} />
  </svg>
);

const IconStore = ({ active }: { active?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 9l1-5h16l1 5" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" strokeLinecap="round" />
    <path d="M3 9c0 1.1.9 2 2 2s2-.9 2-2 .9 2 2 2 2-.9 2-2 .9 2 2 2 2-.9 2-2 .9 2 2 2 2-.9 2-2"
      stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" />
    <path d="M5 11v8a1 1 0 001 1h12a1 1 0 001-1v-8" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" />
    <rect x="9" y="14" width="6" height="6" rx="1" stroke={active ? '#2563EB' : '#6B7280'} strokeWidth="1.75" />
  </svg>
);

export function BottomNav({ state, navToTab }: NavProps) {
  const tabs: { screen: Screen; label: string; icon: (active: boolean) => ReactNode }[] = [
    { screen: 'home',  label: 'Inicio',  icon: (a) => <IconHome active={a} /> },
    { screen: 'legal', label: 'Legal',   icon: (a) => <IconDocument active={a} /> },
    { screen: 'help',  label: 'Ayuda',   icon: (a) => <IconHelp active={a} /> },
    { screen: 'sell',  label: 'Vende',   icon: (a) => <IconStore active={a} /> },
  ];

  const activeTab = tabs.find(t => t.screen === state.screen)?.screen;

  return (
    <nav className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 flex z-50">
      {tabs.map(tab => {
        const active = activeTab === tab.screen;
        return (
          <button
            key={tab.screen}
            onClick={() => navToTab(tab.screen)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px]"
          >
            {tab.icon(active)}
            <span className={`text-[10px] font-medium leading-none ${active ? 'text-blue-600' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// ─── Search box (inline, live results — no separate screen) ────────────────────

const SUGGESTED_EVENTS = EVENTS.slice(0, 5);

function matchEvents(query: string): Event[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return EVENTS.filter(e =>
    e.name.toLowerCase().includes(q) ||
    e.category.toLowerCase().includes(q) ||
    e.dates.some(d => d.venue.toLowerCase().includes(q) || d.city.toLowerCase().includes(q))
  ).slice(0, 6);
}

interface SearchBoxProps {
  onSelect: (event: Event) => void;
  variant: 'header' | 'bar';
  placeholder?: string;
}

export function SearchBox({ onSelect, variant, placeholder = 'Buscar eventos, artistas, recintos...' }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showingSuggestions = query.trim() === '';
  const list = showingSuggestions ? SUGGESTED_EVENTS : matchEvents(query);

  const pick = (event: Event) => {
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
    onSelect(event);
  };

  const isHeader = variant === 'header';

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`flex items-center gap-2.5 rounded-xl border bg-white transition-colors ${
          open ? 'border-blue-400 ring-2 ring-blue-100' : isHeader ? 'border-gray-300 hover:border-gray-400' : 'border-gray-200'
        } ${isHeader ? 'h-11 px-4' : 'h-11 px-4'}`}
      >
        <IconSearch size={18} />
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={e => {
            if (e.key === 'Enter' && list.length > 0) pick(list[0]);
            if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
          }}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none shrink-0"
          >×</button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-4 pt-3 pb-1.5">
            {showingSuggestions ? 'Sugerencias' : `${list.length} ${list.length === 1 ? 'resultado' : 'resultados'}`}
          </p>
          <div className="max-h-80 overflow-y-auto pb-1">
            {list.length === 0 ? (
              <p className="px-4 py-4 text-sm text-gray-400">No encontramos resultados para "{query}"</p>
            ) : (
              list.map(event => (
                <button
                  key={event.id}
                  onClick={() => pick(event)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-[8px] text-gray-400">img</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{event.name}</p>
                    <p className="text-xs text-gray-500 truncate">{event.category} · {event.dates[0].city}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Event top nav (desktop only) — event landing page: logo → home + section links ──

export function EventTopNav({ onHome, links }: { onHome: () => void; links: { id: string; label: string }[] }) {
  return (
    <header className="hidden md:block sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="md:max-w-[1280px] md:mx-auto px-8 h-16 flex items-center justify-between">
        <button onClick={onHome} className="font-bold text-lg tracking-tight text-gray-900 shrink-0">
          vibra
        </button>
        {links.length > 0 && (
          <nav className="flex items-center gap-1">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors uppercase tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

// ─── Floating home button (desktop only) — purchase flow screens with a hero image ──
// Pairs with the existing floating back button (opposite corner). No section links here —
// those only belong on the event landing page (EventTopNav above).

export function FloatingHomeButton({ onHome }: { onHome: () => void }) {
  return (
    <button
      onClick={onHome}
      className="hidden md:flex absolute top-0 right-4 z-10 items-center h-9 px-4 rounded-full bg-black/30 backdrop-blur-sm text-white font-bold text-sm tracking-tight hover:bg-black/40 transition-colors"
      style={{ marginTop: 'max(44px, env(safe-area-inset-top))' }}
    >
      vibra
    </button>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

interface HeaderProps {
  type: 'main' | 'back' | 'close';
  title?: string;
  onBack?: () => void;
  onClose?: () => void;
  onLogoClick?: () => void;
  onSelectSearchResult?: (event: Event) => void;
  onLogin?: () => void;
  onAccount?: () => void;
  onCart?: () => void;
  onTabNav?: (screen: Screen) => void;
  isLoggedIn?: boolean;
  cartCount?: number;
  activeScreen?: Screen;
}

const NAV_TABS: { screen: Screen; label: string }[] = [
  { screen: 'home',  label: 'Inicio' },
  { screen: 'legal', label: 'Legal' },
  { screen: 'help',  label: 'Ayuda' },
  { screen: 'sell',  label: 'Vende' },
];

export function Header({ type, title, onBack, onClose, onLogoClick, onSelectSearchResult, onLogin, onAccount, onCart, onTabNav, isLoggedIn, cartCount = 0, activeScreen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div
        className="flex items-center px-4 md:px-6 gap-3 md:max-w-[1280px] md:mx-auto"
        style={{ paddingTop: 'max(44px, env(safe-area-inset-top))', paddingBottom: '12px' }}
      >
        {type === 'main' && (
          <>
            {/* Logo */}
            <span className="font-bold text-lg tracking-tight text-gray-900 shrink-0">vibra</span>

            {/* Desktop nav links */}
            {onTabNav && (
              <nav className="hidden md:flex items-center gap-1 ml-6">
                {NAV_TABS.map(tab => (
                  <button
                    key={tab.screen}
                    onClick={() => onTabNav(tab.screen)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === tab.screen
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Search box — desktop only, inline with live suggestions (no separate screen) */}
            <div className="flex-1 min-w-0 flex justify-center px-4 md:px-6">
              {onSelectSearchResult && (
                <div className="hidden md:block w-full max-w-md">
                  <SearchBox variant="header" onSelect={onSelectSearchResult} />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isLoggedIn ? (
                <button
                  onClick={() => onAccount?.()}
                  className="flex items-center gap-1.5 border border-blue-200 bg-blue-50 rounded-xl px-3 h-8 text-xs font-semibold text-blue-700 active:bg-blue-100 hover:bg-blue-100"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="#2563EB" strokeWidth="2"/>
                    <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Mi cuenta
                </button>
              ) : (
                <button
                  onClick={() => onLogin?.()}
                  className="border border-gray-300 rounded-xl px-3 h-8 text-xs font-semibold text-gray-700 bg-white active:bg-gray-50 hover:bg-gray-50"
                >
                  Iniciar sesión
                </button>
              )}
              {/* Cart icon */}
              <button
                onClick={() => onCart?.()}
                className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-100"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#374151" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 6h18" stroke="#374151" strokeWidth="1.75" strokeLinecap="round"/>
                  <path d="M16 10a4 4 0 01-8 0" stroke="#374151" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </>
        )}
        {(type === 'back' || type === 'close') && (
          <>
            <button
              onClick={type === 'back' ? onBack : onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 -ml-2"
            >
              {type === 'back' ? <IconBack /> : <IconClose />}
            </button>
            <span className="font-semibold text-base text-gray-900 flex-1 truncate">{title}</span>
            {onLogoClick && (
              <button
                onClick={onLogoClick}
                className="hidden md:block font-bold text-base tracking-tight text-gray-900 shrink-0 ml-3"
              >
                vibra
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
}

// ─── Footer (desktop only) ─────────────────────────────────────────────────────

interface FooterProps {
  navToTab: (screen: Screen) => void;
}

const FOOTER_COLUMNS: { title: string; links: { label: string; screen?: Screen }[] }[] = [
  {
    title: 'Conócenos',
    links: [
      { label: 'Sobre vibra' },
      { label: 'Preguntas frecuentes', screen: 'help' },
      { label: 'Términos y condiciones', screen: 'legal' },
      { label: 'Política de privacidad', screen: 'legal' },
      { label: 'Política de venta', screen: 'legal' },
    ],
  },
  {
    title: 'Trabajemos juntos',
    links: [
      { label: '¿Tienes un evento?', screen: 'sell' },
      { label: 'Venta para empresas', screen: 'sell' },
      { label: 'Trabaja con nosotros' },
    ],
  },
];

function SocialIcon({ icon }: { icon: 'facebook' | 'instagram' | 'x' }) {
  return (
    <div className="w-9 h-9 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center shrink-0">
      {icon === 'facebook' && (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M15 8.5h2.5V5H15c-2.2 0-4 1.8-4 4v2H8.5v3.5H11V21h3.5v-6.5h2.5l.7-3.5h-3.2v-2c0-.5.4-1 1-1z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      )}
      {icon === 'instagram' && (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.4" />
          <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.4" />
          <circle cx="17.3" cy="6.7" r="1" fill="white" />
        </svg>
      )}
      {icon === 'x' && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M4 4l16 16M20 4L4 20" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

export function Footer({ navToTab }: FooterProps) {
  return (
    <footer className="hidden md:block bg-gray-800">
      <div className="md:max-w-[1280px] md:mx-auto px-8 py-10 grid grid-cols-[auto_1fr_1fr_1fr] gap-10 items-start">
        <span className="font-bold text-2xl tracking-tight text-white shrink-0">vibra</span>

        {FOOTER_COLUMNS.map(col => (
          <div key={col.title} className="min-w-[160px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">{col.title}</p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map(link => (
                <li key={link.label} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-gray-500 mt-2 shrink-0" />
                  <button
                    onClick={() => link.screen && navToTab(link.screen)}
                    className="text-sm text-gray-300 hover:text-white text-left transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="min-w-[160px]">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Conversemos</p>
          <div className="flex items-center gap-2 mb-4">
            <SocialIcon icon="facebook" />
            <SocialIcon icon="instagram" />
            <SocialIcon icon="x" />
          </div>
          <button
            onClick={() => navToTab('help')}
            className="bg-white text-gray-900 text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Centro de ayuda
          </button>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="md:max-w-[1280px] md:mx-auto px-8 py-4">
          <span className="text-xs text-gray-400">vibra · Wireframe v0.1 · © 2025</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Button ──────────────────────────────────────────────────────────────────

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function Button({
  children, onClick, variant = 'primary', size = 'md',
  disabled, fullWidth, className = '',
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus:outline-none';
  const variants = {
    primary: disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white active:bg-blue-700',
    secondary: 'border border-gray-300 text-gray-700 bg-white active:bg-gray-50',
    ghost: 'text-blue-600 bg-transparent active:bg-blue-50',
    danger: 'text-red-600 bg-transparent active:bg-red-50',
  };
  const sizes = { sm: 'text-sm px-3 py-2', md: 'text-sm px-4 py-3', lg: 'text-base px-5 py-3.5' };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

// ─── Input ───────────────────────────────────────────────────────────────────

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  /** Optional native paste handler — used to block pasting on "confirm" fields (e.g. confirm email)
   *  so the user has to retype it, which is what actually catches typos. */
  onPaste?: (e: ClipboardEvent<HTMLInputElement>) => void;
  success?: string;
}

export function Input({ label, placeholder, value, onChange, type = 'text', error, onPaste, success }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onPaste={onPaste}
        className={`w-full border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-400' : success ? 'border-green-400' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {!error && success && <p className="text-xs text-green-600">{success}</p>}
    </div>
  );
}

// ─── Badge ───────────────────────────────────────────────────────────────────

export function AvailBadge({ avail }: { avail: 'available' | 'few' | 'sold-out' }) {
  const map = {
    available: { label: 'Disponible', cls: 'bg-green-50 text-green-700' },
    few: { label: 'Pocas disponibles', cls: 'bg-amber-50 text-amber-700' },
    'sold-out': { label: 'Agotado', cls: 'bg-red-50 text-red-500' },
  };
  const { label, cls } = map[avail];
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cls}`}>{label}</span>;
}

export function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-500">{label}</span>
  );
}

// ─── Quantity Selector ────────────────────────────────────────────────────────

interface QtySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
}

export function QtySelector({ value, min = 1, max = 10, onChange }: QtySelectorProps) {
  return (
    <div className="flex items-center gap-0 border border-gray-300 rounded-xl overflow-hidden w-fit">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-10 h-10 flex items-center justify-center text-xl font-light text-gray-700 active:bg-gray-100 disabled:text-gray-300"
        disabled={value <= min}
      >−</button>
      <span className="w-12 text-center text-base font-semibold text-gray-900">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-10 h-10 flex items-center justify-center text-xl font-light text-gray-700 active:bg-gray-100 disabled:text-gray-300"
        disabled={value >= max}
      >+</button>
    </div>
  );
}

// ─── Sticky Bottom CTA bar ────────────────────────────────────────────────────

export function StickyBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 z-30">
      {children}
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────

export function Divider() {
  return <div className="h-px bg-gray-100 my-1" />;
}

// ─── Section header ───────────────────────────────────────────────────────────

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{children}</p>;
}

// ─── Info row ────────────────────────────────────────────────────────────────

export function InfoRow({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-gray-200 rounded animate-pulse ${className}`} />;
}

// ─── Empty state ──────────────────────────────────────────────────────────────

export function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-2">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
        <IconTicket />
      </div>
      <p className="font-semibold text-gray-700">{title}</p>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </div>
  );
}
