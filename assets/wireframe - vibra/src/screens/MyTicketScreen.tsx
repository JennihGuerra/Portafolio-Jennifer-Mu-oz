import { useState } from 'react';
import { NavProps } from '../types';
import { PAST_TICKETS } from '../data';
import { Header, IconQR } from '../components/ui';

// ── Modal base ────────────────────────────────────────────────────────────────

function CenterModal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}>
      <div className="w-full max-w-[360px] bg-white rounded-2xl overflow-hidden shadow-xl"
        onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function BottomModal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}>
      <div className="w-full max-w-[430px] bg-white rounded-t-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

// ── Download modal ────────────────────────────────────────────────────────────

function DownloadModal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);

  const handleDownload = () => {
    setDone(true);
    setTimeout(onClose, 1800);
  };

  return (
    <CenterModal onClose={onClose}>
      <div className="flex flex-col items-center gap-4 px-6 py-8">
        {done ? (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L19 7" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-base">¡Entrada descargada!</p>
              <p className="text-sm text-gray-500 mt-1">Se guardó en tu galería como imagen PNG.</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v13M7 11l5 5 5-5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 20h16" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-base">Descargar entrada</p>
              <p className="text-sm text-gray-500 mt-1">Se guardará en tu galería de fotos como imagen PNG con el código QR.</p>
            </div>
            <button
              onClick={handleDownload}
              className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl text-sm active:bg-blue-700"
            >
              Descargar ahora
            </button>
            <button onClick={onClose} className="text-sm text-gray-400 pb-1">Cancelar</button>
          </>
        )}
      </div>
    </CenterModal>
  );
}

// ── Share modal ───────────────────────────────────────────────────────────────

const WALLET_OPTIONS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="3" fill="#1C1C1E" stroke="#1C1C1E" strokeWidth="1"/>
        <path d="M2 10h20" stroke="#555" strokeWidth="1"/>
        <rect x="14" y="13" width="5" height="3" rx="1" fill="#FFD60A"/>
      </svg>
    ),
    label: 'Apple Wallet',
    sub: 'Agregar a tu iPhone',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#4285F4"/>
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="white"/>
        <path d="M12 9v6M9 12h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Google Wallet',
    sub: 'Agregar a tu Android',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#00B2FF"/>
        <path d="M7 12h10M12 7v10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <rect x="4" y="9" width="16" height="6" rx="2" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
    label: 'Samsung Pay',
    sub: 'Agregar a tu Galaxy',
  },
];

const SHARE_OPTIONS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#25D366"/>
        <path d="M17 8.5C16.3 7.7 15.2 7 13.5 7c-2.8 0-5 2.3-5 5.1 0 1 .3 2 .7 2.8L7 19l4.2-1.1c.8.4 1.7.7 2.6.7 2.8 0 5-2.3 5-5.1 0-1.4-.5-2.7-1.8-4z" fill="white"/>
      </svg>
    ),
    label: 'WhatsApp',
    sub: 'Enviar por mensaje',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#1877F2"/>
        <path d="M16 8h-2a1 1 0 00-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 014-4h2v3z" fill="white"/>
      </svg>
    ),
    label: 'Facebook',
    sub: 'Compartir en tu perfil',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#000"/>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2 2.25h6.284l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" fill="white"/>
      </svg>
    ),
    label: 'X / Twitter',
    sub: 'Publicar en tu cuenta',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#E5E7EB"/>
        <path d="M4 6l8 6 8-6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#374151" strokeWidth="1.5"/>
      </svg>
    ),
    label: 'Correo electrónico',
    sub: 'Enviar a tu email',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#E5E7EB"/>
        <circle cx="18" cy="5" r="2" stroke="#374151" strokeWidth="1.5"/>
        <circle cx="6" cy="12" r="2" stroke="#374151" strokeWidth="1.5"/>
        <circle cx="18" cy="19" r="2" stroke="#374151" strokeWidth="1.5"/>
        <path d="M8 11l8-5M8 13l8 5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Más opciones',
    sub: 'Otras aplicaciones',
  },
];

function ShareModal({ onClose }: { onClose: () => void }) {
  const [shared, setShared] = useState<string | null>(null);

  const handleShare = (label: string) => {
    setShared(label);
    setTimeout(onClose, 1600);
  };

  return (
    <CenterModal onClose={onClose}>
      <div className="px-5 pt-5 pb-2">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-gray-900 text-base">Compartir entrada</p>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {shared ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L19 7" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="font-semibold text-gray-900 pb-4">Listo — {shared}</p>
          </div>
        ) : (
          <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
            {/* Wallet section */}
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Billetera electrónica</p>
            <div className="flex flex-col divide-y divide-gray-100 mb-4 border border-gray-100 rounded-xl overflow-hidden">
              {WALLET_OPTIONS.map(opt => (
                <button key={opt.label} onClick={() => handleShare(opt.label)}
                  className="flex items-center gap-3 px-3 py-3 active:bg-gray-50 w-full text-left bg-white">
                  <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50">
                    {opt.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-400">{opt.sub}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Share section */}
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Compartir</p>
            <div className="flex flex-col divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
              {SHARE_OPTIONS.map(opt => (
                <button key={opt.label} onClick={() => handleShare(opt.label)}
                  className="flex items-center gap-3 px-3 py-3 active:bg-gray-50 w-full text-left bg-white">
                  <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg overflow-hidden">
                    {opt.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-400">{opt.sub}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="h-4" />
          </div>
        )}
      </div>
    </CenterModal>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function MyTicketScreen({ state, goBack }: NavProps) {
  const { event, date, sector, seats, qty, ticketTypeName, attendees } = state;

  const [showDownload, setShowDownload] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const isPurchaseFlow = !!event;
  const ticket = !isPurchaseFlow ? PAST_TICKETS[0] : null;

  const displayEvent   = isPurchaseFlow ? event?.name : ticket?.eventName;
  const displayDate    = isPurchaseFlow ? `${date?.date} · ${date?.time}` : `${ticket?.date} · ${ticket?.time}`;
  const displayVenue   = isPurchaseFlow ? `${date?.venue} · ${date?.city}` : `${ticket?.venue} · ${ticket?.city}`;
  const displaySector  = isPurchaseFlow ? (sector?.name ?? ticketTypeName) : ticket?.sector;
  const displaySeats   = isPurchaseFlow && seats.length > 0
    ? seats.map(s => `Fila ${s.row} · Asiento ${s.num}`).join(', ')
    : null;
  const displayAttendee = isPurchaseFlow && attendees.length > 0 ? attendees[0].name : null;
  const orderId = isPurchaseFlow ? 'VB-2025-00503' : ticket?.orderId;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header type="back" title="Mi entrada" onBack={goBack} />

      <div className="px-4 py-5 flex flex-col gap-4 pb-24 md:max-w-lg md:mx-auto md:w-full md:py-8">
        {/* Ticket card */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
          <div className="px-5 pt-5 pb-4 border-b border-dashed border-gray-200">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">vibra</p>
                <h2 className="font-bold text-lg text-gray-900 leading-tight">{displayEvent}</h2>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                Válida
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#9CA3AF" strokeWidth="2"/>
                  <path d="M8 2v4M16 2v4M3 10h18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-sm text-gray-700">{displayDate}</span>
              </div>
              <div className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                  <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" stroke="#9CA3AF" strokeWidth="2"/>
                </svg>
                <span className="text-sm text-gray-700">{displayVenue}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-3 flex-wrap">
              {displaySector && (
                <div className="bg-gray-100 rounded-lg px-3 py-1.5">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Sector</p>
                  <p className="text-sm font-semibold text-gray-900">{displaySector}</p>
                </div>
              )}
              {displaySeats && (
                <div className="bg-gray-100 rounded-lg px-3 py-1.5">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Asientos</p>
                  <p className="text-sm font-semibold text-gray-900">{displaySeats}</p>
                </div>
              )}
              {displayAttendee && (
                <div className="bg-gray-100 rounded-lg px-3 py-1.5">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Titular</p>
                  <p className="text-sm font-semibold text-gray-900">{displayAttendee}</p>
                </div>
              )}
            </div>
          </div>

          {/* QR */}
          <div className="px-5 py-6 flex flex-col items-center gap-4">
            <p className="text-xs text-gray-400 text-center">
              Presenta este código en el acceso al evento
            </p>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 inline-flex">
              <IconQR />
            </div>
            <p className="text-[10px] text-gray-300 font-mono tracking-widest">{orderId}</p>
          </div>
        </div>

        {/* Info note */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            Este QR es personal e intransferible. Guarda esta pantalla o descarga tu entrada para acceder sin conexión.
            La entrada caduca una vez que es escaneada.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowShare(true)}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 text-sm font-semibold text-gray-700 active:bg-gray-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="18" cy="5" r="2.5" stroke="#374151" strokeWidth="1.75"/>
              <circle cx="6" cy="12" r="2.5" stroke="#374151" strokeWidth="1.75"/>
              <circle cx="18" cy="19" r="2.5" stroke="#374151" strokeWidth="1.75"/>
              <path d="M8.5 10.5l7-4M8.5 13.5l7 4" stroke="#374151" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
            Compartir
          </button>
          <button
            onClick={() => setShowDownload(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 rounded-xl py-3 text-sm font-semibold text-white active:bg-blue-700"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v13M7 11l5 5 5-5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 20h16" stroke="white" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
            Descargar
          </button>
        </div>

        {/* Order info */}
        <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <span className="text-xs text-gray-400">Número de orden</span>
          <span className="text-xs font-mono text-gray-600">{orderId}</span>
        </div>
      </div>

      {showDownload && <DownloadModal onClose={() => setShowDownload(false)} />}
      {showShare    && <ShareModal    onClose={() => setShowShare(false)} />}
    </div>
  );
}
