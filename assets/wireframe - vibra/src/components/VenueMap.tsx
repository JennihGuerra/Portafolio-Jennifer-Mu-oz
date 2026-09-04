import { useState } from 'react';
import { SectorInfo } from '../types';

// ─── Gray shades per zone index (wireframe, no color) ───────────────────────
const ZONE_SHADE = [
  { fill: '#D1D5DB', stroke: '#9CA3AF', labelFill: '#374151' }, // sector 0
  { fill: '#9CA3AF', stroke: '#6B7280', labelFill: '#FFFFFF' }, // sector 1
  { fill: '#E5E7EB', stroke: '#C4C4C4', labelFill: '#374151' }, // sector 2
  { fill: '#B8C2D0', stroke: '#8898AA', labelFill: '#1F2937' }, // sector 3
];

// ─── Block layout: each block maps to sectors[si].subzones[zi] ──────────────
// si = sector index,  zi = subzone index within that sector
type Block = {
  shape: 'rect' | 'path';
  x?: number; y?: number; w?: number; h?: number; rx?: number;
  d?: string;
  si: number; zi: number;
  lx: number; ly: number;
  rows?: number; // decorative seat-row count
};

const BLOCKS: Block[] = [
  // ── Sector 0: inner floor center (up to 3 subzones, vertical stack) ──────
  { shape:'rect', x:139,y:52, w:42,h:28,rx:3,  si:0,zi:0, lx:160,ly:68, rows:3 },
  { shape:'rect', x:139,y:83, w:42,h:28,rx:3,  si:0,zi:1, lx:160,ly:99, rows:3 },
  { shape:'rect', x:139,y:114,w:42,h:28,rx:3,  si:0,zi:2, lx:160,ly:130, rows:3 },

  // ── Sector 1: inner flanking — left A, right A, left B, right B ──────────
  { shape:'rect', x:90,y:60, w:44,h:34,rx:3,   si:1,zi:0, lx:112,ly:78, rows:4 },
  { shape:'rect', x:186,y:60,w:44,h:34,rx:3,   si:1,zi:1, lx:208,ly:78, rows:4 },
  { shape:'rect', x:90,y:98, w:44,h:34,rx:3,   si:1,zi:2, lx:112,ly:116, rows:4 },
  { shape:'rect', x:186,y:98,w:44,h:34,rx:3,   si:1,zi:3, lx:208,ly:116, rows:4 },

  // ── Sector 2: lower pit (up to 2 subzones) ───────────────────────────────
  { shape:'rect', x:128,y:145,w:64,h:28,rx:3,  si:2,zi:0, lx:160,ly:161, rows:2 },
  { shape:'rect', x:128,y:176,w:64,h:24,rx:3,  si:2,zi:1, lx:160,ly:190, rows:2 },

  // ── Sector 3: outer arc — left side (3 blocks) ───────────────────────────
  {
    shape:'path',
    d:'M 12 94 L 82 90 L 82 128 L 12 132 Q 6 114 6 113 Z',
    si:3,zi:0, lx:46,ly:113,
  },
  {
    shape:'path',
    d:'M 12 136 L 82 132 L 82 168 L 12 172 Q 6 155 6 154 Z',
    si:3,zi:1, lx:46,ly:153,
  },
  {
    shape:'path',
    d:'M 14 176 L 82 172 L 82 205 L 20 210 Q 8 196 14 176 Z',
    si:3,zi:2, lx:48,ly:193,
  },

  // ── Sector 3: outer arc — right side (zi 3-5) ─────────────────────────────
  {
    shape:'path',
    d:'M 238 90 L 308 94 Q 314 113 314 114 L 238 128 Z',
    si:3,zi:3, lx:274,ly:113,
  },
  {
    shape:'path',
    d:'M 238 132 L 314 136 Q 314 155 314 156 L 238 168 Z',
    si:3,zi:4, lx:274,ly:153,
  },
  {
    shape:'path',
    d:'M 238 172 L 300 176 Q 312 196 300 210 L 238 205 Z',
    si:3,zi:5, lx:272,ly:193,
  },

  // ── Sector 3: bottom arc — left, center, right (zi 6-8) ──────────────────
  {
    shape:'path',
    d:'M 22 214 L 108 208 L 108 238 Q 60 258 18 238 Z',
    si:3,zi:6, lx:66,ly:228,
  },
  {
    shape:'path',
    d:'M 116 208 L 204 208 L 204 238 Q 160 258 116 238 Z',
    si:3,zi:7, lx:160,ly:230,
  },
  {
    shape:'path',
    d:'M 212 208 L 298 214 Q 302 238 260 258 L 212 238 Z',
    si:3,zi:8, lx:255,ly:228,
  },

  // ── Upper corners near stage ──────────────────────────────────────────────
  { shape:'rect', x:50,y:52, w:36,h:32,rx:3,  si:3,zi:9,  lx:68,ly:69 },
  { shape:'rect', x:234,y:52,w:36,h:32,rx:3,  si:3,zi:10, lx:252,ly:69 },
];

// ─── VenueMap props ──────────────────────────────────────────────────────────

type VenueMapProps =
  | {
      mode: 'zone';               // EventScreen: click = sector tap
      sectors: SectorInfo[];
      activeSector: SectorInfo | null;
      onSelect: (s: SectorInfo) => void;
      /** Desktop: map becomes the protagonist of the screen and grows taller. */
      large?: boolean;
    }
  | {
      mode: 'subzone';            // SelectionScreen: click = subzone → seat-map
      sectors: SectorInfo[];
      onSelectSubzone: (sector: SectorInfo, subzone: string) => void;
      large?: boolean;
    };

export default function VenueMap(props: VenueMapProps) {
  const { sectors, large } = props;
  const [hovered, setHovered] = useState<{ sector: SectorInfo; subzone: string } | null>(null);

  return (
    <div className="flex flex-col gap-3 px-4">
      {/* Hover / focus info line — functional, not decorative (desktop + keyboard) */}
      <div className={`hidden md:flex items-center justify-between rounded-xl border px-4 py-2.5 transition-colors ${
        hovered ? 'border-blue-200 bg-blue-50' : 'border-gray-100 bg-gray-50'
      }`} style={{ minHeight: 44 }}>
        {hovered ? (
          <>
            <span className="text-sm font-semibold text-gray-900">
              {hovered.sector.name} <span className="text-gray-400 font-normal">· {hovered.subzone}</span>
            </span>
            <span className="text-sm font-medium text-blue-700">
              {hovered.sector.avail === 'sold-out' ? 'Agotado' : `Desde $${(hovered.sector.price / 1000).toFixed(0)}K`}
            </span>
          </>
        ) : (
          <span className="text-sm text-gray-400">Pasa el cursor o navega con teclado sobre el mapa para ver el detalle</span>
        )}
      </div>

      <svg viewBox="0 0 320 270" className="w-full" style={{ maxHeight: large ? 620 : 310 }}>

        {/* Outer stadium boundary */}
        <path
          d="M 58 8 L 262 8 Q 318 8 318 65 L 318 210 Q 318 264 160 264 Q 2 264 2 210 L 2 65 Q 2 8 58 8 Z"
          fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="1.5"
        />

        {/* Seat-row texture on outer ring */}
        {[80,96,112,128,144,160,176,192].map(y => (
          <line key={y} x1="8" y1={y} x2="312" y2={y}
            stroke="#EFEFEF" strokeWidth="0.6" />
        ))}

        {/* All subzone blocks */}
        {BLOCKS.map((blk, i) => {
          const sector = sectors[blk.si];
          const subzones = sector?.subzones ?? (sector ? ['Zona única'] : null);
          const subzone = subzones?.[blk.zi];

          // Block not used for this event → invisible
          if (!sector || !subzone) return null;

          const isSoldOut = sector.avail === 'sold-out';
          const shade = ZONE_SHADE[blk.si % ZONE_SHADE.length];

          // For zone mode: check if this sector is the active one
          const isActive = props.mode === 'zone'
            ? props.activeSector?.id === sector.id
            : false;
          const isHovered = hovered?.sector.id === sector.id && hovered.subzone === subzone;

          const fill   = isActive ? '#DBEAFE' : isHovered && !isSoldOut ? '#EFF6FF' : isSoldOut ? '#F3F4F6' : shade.fill;
          const stroke = isActive ? '#2563EB' : isHovered && !isSoldOut ? '#60A5FA' : isSoldOut ? '#E5E7EB' : shade.stroke;
          const sw     = isActive ? 2 : isHovered && !isSoldOut ? 1.75 : 1.2;
          const textFill = isActive ? '#1D4ED8' : isSoldOut ? '#9CA3AF' : shade.labelFill;

          const handleClick = () => {
            if (isSoldOut) return;
            if (props.mode === 'zone') {
              props.onSelect(sector);
            } else {
              props.onSelectSubzone(sector, subzone);
            }
          };

          const handleHover = () => setHovered({ sector, subzone });
          const handleUnhover = () => setHovered(prev => (prev?.sector.id === sector.id && prev.subzone === subzone ? null : prev));

          return (
            <g key={i} onClick={handleClick}
              onMouseEnter={handleHover} onMouseLeave={handleUnhover}
              onFocus={handleHover} onBlur={handleUnhover}
              onKeyDown={e => { if (!isSoldOut && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); handleClick(); } }}
              tabIndex={isSoldOut ? -1 : 0}
              role="button"
              aria-label={`${sector.name} · ${subzone}${isSoldOut ? ' · Agotado' : ` · Desde $${(sector.price / 1000).toFixed(0)}K`}`}
              style={{ cursor: isSoldOut ? 'default' : 'pointer', opacity: isSoldOut ? 0.4 : 1, outline: 'none' }}>

              {blk.shape === 'rect' ? (
                <rect x={blk.x} y={blk.y} width={blk.w} height={blk.h} rx={blk.rx ?? 3}
                  fill={fill} stroke={stroke} strokeWidth={sw} />
              ) : (
                <path d={blk.d} fill={fill} stroke={stroke} strokeWidth={sw} />
              )}

              {/* Decorative seat rows inside rect blocks */}
              {blk.shape === 'rect' && blk.rows && Array.from({ length: blk.rows }).map((_, ri) => {
                const rowY = blk.y! + 7 + ri * ((blk.h! - 10) / blk.rows!);
                return (
                  <line key={ri}
                    x1={blk.x! + 4} y1={rowY}
                    x2={blk.x! + blk.w! - 4} y2={rowY}
                    stroke={isSoldOut ? '#D1D5DB' : isActive ? '#93C5FD' : '#B0B8C4'}
                    strokeWidth="0.8" strokeDasharray="3,2"
                  />
                );
              })}

              {/* Zone label */}
              <text x={blk.lx} y={blk.ly - 2}
                textAnchor="middle" fontSize="6.5" fontWeight="700"
                fill={textFill} style={{ userSelect: 'none', pointerEvents: 'none' }}>
                {subzone}
              </text>
              {props.mode === 'zone' && (
                <text x={blk.lx} y={blk.ly + 8}
                  textAnchor="middle" fontSize="5.5"
                  fill={isActive ? '#2563EB' : isSoldOut ? '#9CA3AF' : shade.labelFill + 'CC'}
                  style={{ userSelect: 'none', pointerEvents: 'none' }}>
                  {isSoldOut ? 'Agotado' : `$${(sector.price / 1000).toFixed(0)}K`}
                </text>
              )}
            </g>
          );
        })}

        {/* Stage */}
        <path d="M 128 14 L 192 14 Q 200 14 202 42 L 118 42 Q 120 14 128 14 Z"
          fill="#374151" stroke="#1F2937" strokeWidth="1" />
        <text x="160" y="32" textAnchor="middle" fontSize="7" fontWeight="800"
          fill="white" letterSpacing="1" style={{ userSelect: 'none' }}>
          ESCENARIO
        </text>

      </svg>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
        {sectors.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm border"
              style={{ background: ZONE_SHADE[i % ZONE_SHADE.length].fill, borderColor: ZONE_SHADE[i % ZONE_SHADE.length].stroke }} />
            <span className="text-[10px] text-gray-500 font-medium">{s.name}</span>
            {s.avail === 'sold-out' && <span className="text-[10px] text-red-400">(Agotado)</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
