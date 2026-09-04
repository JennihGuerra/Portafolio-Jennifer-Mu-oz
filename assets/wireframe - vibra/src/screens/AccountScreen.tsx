import { useState } from 'react';
import { NavProps } from '../types';
import { PAST_TICKETS } from '../data';
import { Header, IconChevronRight, IconCheck } from '../components/ui';

export default function AccountScreen({ state, navigate, goBack, navToTab, updateState }: NavProps) {
  const { screen } = state;

  if (screen === 'my-tickets') {
    return <MyTicketsList navigate={navigate} goBack={goBack} state={state} navToTab={navToTab} updateState={() => {}} />;
  }

  return <AccountMenu navigate={navigate} navToTab={navToTab} state={state} goBack={goBack} updateState={() => {}} />;
}

// ── Account Menu ─────────────────────────────────────────────────────────────

function AccountMenu({ navigate, state, navToTab }: NavProps) {
  const menuItems = [
    { label: 'Mis entradas', sub: '2 entradas próximas', screen: 'my-tickets' as const, badge: 2 },
    { label: 'Mis compras', sub: 'Historial de órdenes', screen: null },
    { label: 'Datos personales', sub: 'Nombre, correo, contraseña', screen: null },
    { label: 'Notificaciones', sub: 'Preferencias de aviso', screen: null },
    { label: 'Ayuda', sub: 'Preguntas frecuentes, contacto', screen: 'help' as const },
  ];

  return (
    <div className="flex flex-col min-h-screen md:bg-gray-50">
      <Header type="main" isLoggedIn={state.isLoggedIn} onAccount={() => {}} onCart={() => navigate('cart')} cartCount={state.cart?.length ?? 0} onTabNav={navToTab} activeScreen={state.screen} />

      {/* Profile header */}
      <div className="px-4 py-6 border-b border-gray-100 md:max-w-2xl md:mx-auto md:w-full md:border-x md:border-gray-200 md:mt-8 md:rounded-t-2xl md:bg-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-500">U</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">usuario@correo.com</p>
            <p className="text-sm text-gray-500">Cuenta activa</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-4 md:max-w-2xl md:mx-auto md:w-full md:border-x md:border-b md:border-gray-200 md:mb-8 md:rounded-b-2xl md:bg-white">
        <div className="flex flex-col divide-y divide-gray-100">
          {menuItems.map(item => (
            <button
              key={item.label}
              onClick={() => item.screen ? navigate(item.screen) : undefined}
              className="flex items-center justify-between py-4 active:bg-gray-50 -mx-4 px-4"
            >
              <div className="text-left">
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
                <IconChevronRight />
              </div>
            </button>
          ))}
        </div>

        {/* Danger zone */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full text-left py-3 text-sm font-medium text-red-500">
            Cerrar sesión
          </button>
        </div>

        {/* Legal links */}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {['Términos y condiciones', 'Política de privacidad', 'Política de venta'].map(l => (
            <button key={l} className="text-xs text-gray-400 underline">{l}</button>
          ))}
        </div>
      </div>

      {/* Not logged in state */}
      {state.email === '' && (
        <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center px-6 text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#9CA3AF" strokeWidth="1.75" />
              <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="#9CA3AF" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Tu cuenta</p>
            <p className="text-sm text-gray-500 mt-1">Inicia sesión para ver tus entradas y compras</p>
          </div>
          <button
            onClick={() => navigate('identification')}
            className="w-full max-w-xs bg-blue-600 text-white font-semibold py-3.5 rounded-xl"
          >
            Iniciar sesión
          </button>
          <button className="text-sm text-gray-500">
            ¿No tienes cuenta? <span className="text-blue-600 font-medium">Crear cuenta</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ── My Tickets List ───────────────────────────────────────────────────────────

function MyTicketsList({ navigate, goBack }: NavProps) {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingTickets = [
    {
      id: 'u1',
      eventName: 'Festival Primavera Sound',
      date: 'Sáb 15 Nov 2025',
      time: '14:00',
      city: 'Santiago',
      venue: "Parque O'Higgins",
      sector: 'CANCHA GENERAL',
      status: 'valid' as const,
      orderId: 'VB-2025-00503',
    },
    {
      id: 'u2',
      eventName: 'Banda Sonora — Gira Nacional',
      date: 'Sáb 8 Nov 2025',
      time: '21:00',
      city: 'Santiago',
      venue: 'Teatro Caupolicán',
      sector: 'PLATEA BAJA · Zona A · Fila C · Asiento 7',
      status: 'valid' as const,
      orderId: 'VB-2025-00498',
    },
  ];

  const displayTickets = tab === 'upcoming' ? upcomingTickets : PAST_TICKETS.map(t => ({ ...t, status: 'used' as const }));

  return (
    <div className="flex flex-col min-h-screen md:bg-gray-50">
      <Header type="back" title="Mis entradas" onBack={goBack} />

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white md:max-w-[1000px] md:mx-auto md:w-full">
        {(['upcoming', 'past'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              tab === t
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
          >
            {t === 'upcoming' ? 'Próximas' : 'Pasadas'}
          </button>
        ))}
      </div>

      <div className="flex-1 px-4 md:px-8 py-4 flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4 md:max-w-[1000px] md:mx-auto md:w-full">
        {displayTickets.length === 0 ? (
          <div className="py-16 text-center md:col-span-2">
            <p className="text-gray-400 text-sm">No hay entradas en esta sección</p>
          </div>
        ) : (
          displayTickets.map(ticket => (
            <button
              key={ticket.id}
              onClick={() => navigate('my-ticket')}
              className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-start gap-3 text-left active:bg-gray-50 hover:shadow-md hover:border-gray-300 transition-all"
            >
              {/* Color bar */}
              <div className={`w-1 self-stretch rounded-full shrink-0 ${
                'status' in ticket && ticket.status === 'valid' ? 'bg-green-400' : 'bg-gray-300'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 leading-tight">{ticket.eventName}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {'date' in ticket && typeof ticket.date === 'string' ? ticket.date : ''} · {('time' in ticket ? ticket.time : '')}
                </p>
                <p className="text-xs text-gray-400">
                  {'venue' in ticket ? ticket.venue : ''} · {'city' in ticket ? ticket.city : ''}
                </p>
                <p className="text-xs text-blue-600 font-medium mt-1">
                  {'sector' in ticket ? ticket.sector : ''}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                {'status' in ticket && ticket.status === 'valid' ? (
                  <span className="text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">Válida</span>
                ) : (
                  <span className="text-[10px] bg-gray-100 text-gray-500 font-semibold px-2 py-0.5 rounded-full">Usada</span>
                )}
                <span className="text-xs text-gray-400">Ver →</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
