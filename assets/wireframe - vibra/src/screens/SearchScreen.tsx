import { useState, useRef, useEffect } from 'react';
import { NavProps } from '../types';
import { EVENTS, fmt } from '../data';
import { Header, CategoryBadge, Button } from '../components/ui';
import { IconSearch } from '../components/ui';

export default function SearchScreen({ navigate, goBack }: NavProps) {
  const [query, setQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const allCities = Array.from(new Set(EVENTS.flatMap(e => e.dates.map(d => d.city))));

  const results = EVENTS.filter(e => {
    const q = query.toLowerCase();
    const matchesQuery = !q ||
      e.name.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.dates.some(d => d.venue.toLowerCase().includes(q) || d.city.toLowerCase().includes(q));
    const matchesCity = !cityFilter || e.dates.some(d => d.city === cityFilter);
    return matchesQuery && matchesCity;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Search header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center gap-3">
        <div className="flex items-center gap-3 md:max-w-[1280px] md:mx-auto md:w-full">
          <button onClick={goBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 -ml-2 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3 h-10 md:max-w-md">
            <IconSearch size={18} />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar eventos, artistas, recintos..."
              className="flex-1 bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
            )}
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="px-4 md:px-8 py-3 border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto no-scrollbar md:max-w-[1280px] md:mx-auto md:w-full">
          <button
            onClick={() => setCityFilter('')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${
              !cityFilter ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            Todas las ciudades
          </button>
          {allCities.map(city => (
            <button
              key={city}
              onClick={() => setCityFilter(city === cityFilter ? '' : city)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${
                cityFilter === city ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 px-4 md:px-8 py-4">
        <div className="md:max-w-[1280px] md:mx-auto md:w-full">
          {query === '' && cityFilter === '' ? (
            <div className="py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Todos los eventos</p>
              <EventList events={EVENTS} onSelect={(event) => navigate('event', { event })} />
            </div>
          ) : results.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-semibold text-gray-600">Sin resultados</p>
              <p className="text-sm text-gray-400 mt-1">Intenta con otro término o filtro</p>
            </div>
          ) : (
            <div className="py-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
              </p>
              <EventList events={results} onSelect={(event) => navigate('event', { event })} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EventList({ events, onSelect }: { events: typeof EVENTS; onSelect: (e: typeof EVENTS[0]) => void }) {
  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
      {events.map(event => (
        <button
          key={event.id}
          onClick={() => onSelect(event)}
          className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden flex text-left active:bg-gray-50 hover:shadow-md hover:border-gray-300 transition-all"
        >
          <div className="w-24 md:w-28 shrink-0 bg-gray-200 flex items-center justify-center min-h-[80px]">
            <span className="text-[10px] text-gray-400">[img]</span>
          </div>
          <div className="flex-1 p-3 flex flex-col gap-1 min-w-0">
            <CategoryBadge label={event.category} />
            <p className="font-semibold text-sm text-gray-900 leading-tight mt-0.5">{event.name}</p>
            <p className="text-xs text-gray-500">
              {event.dates.length > 1 ? `${event.dates.length} fechas · ` : `${event.dates[0].date} · `}
              {event.dates[0].city}
            </p>
            <p className="text-xs text-blue-600 font-semibold">Desde {fmt(event.priceFrom)}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
