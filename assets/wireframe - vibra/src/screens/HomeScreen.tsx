import { useState, useEffect, useRef } from 'react';
import { NavProps } from '../types';
import { EVENTS, CATEGORIES, fmt } from '../data';
import { Header, CategoryBadge, SearchBox } from '../components/ui';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'Nuevo',
    title: 'Festival Primavera Sound',
    subtitle: '15 Nov · Santiago · Parque O\'Higgins',
    cta: 'Ver entradas',
    eventId: '1',
  },
  {
    id: 2,
    tag: 'Últimas entradas',
    title: 'Banda Sonora — Gira Nacional',
    subtitle: '8 Nov · Teatro Caupolicán · Santiago',
    cta: 'Comprar ahora',
    eventId: '2',
  },
  {
    id: 3,
    tag: 'Destacado',
    title: 'Electro Night Vol. 8',
    subtitle: '25 Oct · Club Chocolate · Santiago',
    cta: 'Ver evento',
    eventId: '5',
  },
];

function HeroCarousel({ onNavigate }: { onNavigate: (eventId: string) => void }) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % HERO_SLIDES.length);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent(idx);
    startTimer();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) {
      goTo(dx < 0
        ? (current + 1) % HERO_SLIDES.length
        : (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
      );
    }
    setIsDragging(false);
  };

  const slide = HERO_SLIDES[current];

  return (
    <div
      className="relative w-full overflow-hidden bg-gray-900"
      style={{ aspectRatio: '16/9', maxHeight: 'clamp(220px, 40vw, 460px)' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-500 bg-gray-200"
          style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}
        >
          {/* Wireframe image placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1 opacity-40">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#9CA3AF" strokeWidth="1.5"/>
                <circle cx="8.5" cy="8.5" r="1.5" stroke="#9CA3AF" strokeWidth="1.5"/>
                <path d="M21 15l-5-5L5 21" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[10px] text-gray-400 font-medium">[imagen hero]</span>
            </div>
          </div>
          {/* Bottom gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-600/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 flex flex-col gap-1.5">
        <span className="self-start text-[10px] font-bold uppercase tracking-widest bg-gray-800/30 text-white px-2 py-0.5 rounded border border-white/20">
          {slide.tag}
        </span>
        <h2 className="text-white font-bold text-base leading-tight">{slide.title}</h2>
        <p className="text-white/80 text-xs leading-tight">{slide.subtitle}</p>
        <button
          onClick={() => onNavigate(slide.eventId)}
          className="self-start mt-1 bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg active:bg-gray-100 border border-gray-200"
        >
          {slide.cta} →
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute top-3 right-3 flex gap-1.5">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all ${
              i === current ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const EVENTS_PER_PAGE = 6;

export default function HomeScreen({ navigate, state, goBack, navToTab }: NavProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [page, setPage] = useState(0);

  const filtered = activeCategory === 'Todos'
    ? EVENTS
    : EVENTS.filter(e => e.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / EVENTS_PER_PAGE);
  const paginated = filtered.slice(page * EVENTS_PER_PAGE, (page + 1) * EVENTS_PER_PAGE);

  const goToPage = (p: number) => {
    setPage(p);
    document.getElementById('events-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const featured = EVENTS.slice(0, 3);

  const handleHeroNav = (eventId: string) => {
    const event = EVENTS.find(e => e.id === eventId);
    if (event) navigate('event', { event });
  };

  return (
    <div className="flex flex-col">
      <Header
        type="main"
        onSelectSearchResult={(event) => navigate('event', { event })}
        onLogin={() => navigate('identification')}
        onAccount={() => navigate('account')}
        onCart={() => navigate('cart')}
        onTabNav={navToTab}
        isLoggedIn={state.isLoggedIn}
        cartCount={state.cart?.length ?? 0}
        activeScreen={state.screen}
      />

      {/* Hero carousel */}
      <HeroCarousel onNavigate={handleHeroNav} />

      {/* ── Desktop content wrapper ── */}
      <div className="md:max-w-[1280px] md:mx-auto md:px-8 w-full">

        {/* Search bar — mobile only (desktop search box lives in Header), inline with live suggestions */}
        <div className="px-4 pt-4 pb-2 md:hidden">
          <SearchBox variant="bar" onSelect={(event) => navigate('event', { event })} />
        </div>

        {/* Category chips */}
        <div className="px-4 md:px-0 py-2 md:pt-5 md:pb-3 overflow-x-auto flex gap-2 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(0); }}
              className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured */}
        {activeCategory === 'Todos' && (
          <section className="mt-4 md:mt-6">
            <div className="px-4 md:px-0 mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Destacados</p>
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="md:hidden px-4 flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {featured.map(event => (
                <button
                  key={event.id}
                  onClick={() => navigate('event', { event })}
                  className="shrink-0 w-64 bg-white border border-gray-200 rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-all"
                >
                  <div className="w-full h-36 bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-400">[imagen]</span>
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <CategoryBadge label={event.category} />
                    <p className="font-semibold text-gray-900 text-sm leading-tight mt-0.5">{event.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="#9CA3AF" strokeWidth="2"/>
                        <path d="M8 2v4M16 2v4M3 10h18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="text-xs text-gray-500">
                        {event.dates.length > 1 ? `${event.dates.length} fechas` : event.dates[0].date}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{event.dates[0].city}</span>
                    </div>
                    <p className="text-xs text-blue-600 font-semibold mt-1">Desde {fmt(event.priceFrom)}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Desktop: 3-col editorial cards with text overlay */}
            <div className="hidden md:grid md:grid-cols-3 gap-5">
              {featured.map(event => (
                <button
                  key={event.id}
                  onClick={() => navigate('event', { event })}
                  className="relative overflow-hidden rounded-2xl text-left group cursor-pointer"
                  style={{ aspectRatio: '4/3' }}
                >
                  {/* Image placeholder */}
                  <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="opacity-25">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="#6B7280" strokeWidth="1.5"/>
                      <path d="M21 15l-5-5L5 21" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />

                  {/* Scale on hover */}
                  <div className="absolute inset-0 bg-gray-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 scale-105" />

                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
                    <span className="self-start text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-2 py-0.5 rounded border border-white/20">
                      {event.category}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-tight">{event.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="2" strokeOpacity=".7"/>
                          <path d="M8 2v4M16 2v4M3 10h18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity=".7"/>
                        </svg>
                        <span className="text-xs text-white/80">
                          {event.dates.length > 1 ? `${event.dates.length} fechas` : event.dates[0].date}
                        </span>
                      </div>
                      <span className="text-white/40">·</span>
                      <div className="flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" stroke="white" strokeWidth="2" strokeOpacity=".7"/>
                        </svg>
                        <span className="text-xs text-white/80">{event.dates[0].city}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-white">Desde {fmt(event.priceFrom)}</span>
                      <span className="text-xs font-semibold text-white/80 bg-white/15 border border-white/20 px-3 py-1 rounded-lg group-hover:bg-white/25 transition-colors">
                        Ver entradas →
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Events list */}
        <section id="events-list" className="mt-5 md:mt-8 px-4 md:px-0 pb-6 md:pb-10">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {activeCategory === 'Todos' ? 'Próximos eventos' : activeCategory}
            </p>
            {filtered.length > 0 && (
              <span className="text-xs text-gray-400">
                {page * EVENTS_PER_PAGE + 1}–{Math.min((page + 1) * EVENTS_PER_PAGE, filtered.length)} de {filtered.length}
              </span>
            )}
          </div>

          {/* Mobile: stacked list. Desktop: 3-col grid */}
          <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm md:col-span-3">Sin eventos en esta categoría.</div>
            ) : (
              paginated.map(event => (
                <button
                  key={event.id}
                  onClick={() => navigate('event', { event })}
                  className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden text-left active:bg-gray-50 hover:shadow-md transition-all
                    flex md:flex-col"
                >
                  {/* Thumbnail */}
                  <div className="w-24 md:w-full shrink-0 md:h-44 bg-gray-200 flex items-center justify-center">
                    <span className="text-[10px] md:text-xs text-gray-400">[img]</span>
                  </div>
                  <div className="flex-1 p-3 flex flex-col gap-1 min-w-0">
                    <CategoryBadge label={event.category} />
                    <p className="font-semibold text-gray-900 text-sm leading-tight mt-0.5 truncate">{event.name}</p>
                    <div className="flex items-center gap-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="#9CA3AF" strokeWidth="2"/>
                        <path d="M8 2v4M16 2v4M3 10h18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="text-xs text-gray-500">
                        {event.dates.length > 1 ? `${event.dates.length} fechas` : `${event.dates[0].date} · ${event.dates[0].time}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" stroke="#9CA3AF" strokeWidth="2"/>
                      </svg>
                      <span className="text-xs text-gray-500 truncate">
                        {event.dates.length > 1
                          ? `${event.dates[0].city} y más ciudades`
                          : `${event.dates[0].city} · ${event.dates[0].venue}`}
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 font-semibold mt-0.5">Desde {fmt(event.priceFrom)}</p>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-5 md:mt-8">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white disabled:opacity-30 active:bg-gray-50 hover:bg-gray-50"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 19l-7-7 7-7" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold border transition-colors ${
                    i === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-200 active:bg-gray-50 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages - 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white disabled:opacity-30 active:bg-gray-50 hover:bg-gray-50"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
