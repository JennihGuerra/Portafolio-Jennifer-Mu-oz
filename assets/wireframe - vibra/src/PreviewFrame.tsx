import { useEffect, useMemo, useRef, useState } from 'react';

// ─── Device preview harness ───────────────────────────────────────────────
// This is NOT part of the vibra product UI — it's a viewer control for
// people looking at this wireframe (e.g. embedded in a Figma project or
// shared as a link), so they can switch between the mobile and desktop
// layouts without needing real browser DevTools.
//
// How it works: the actual app always renders inside an <iframe> that
// points back at this same page with `?embed=1`. main.tsx checks for that
// flag and, when present, skips this harness entirely and mounts <App/>
// directly — so the iframe's *own* viewport is what Tailwind's `md:`
// breakpoint reacts to. Resizing the iframe (narrow = phone, full = desktop)
// is what actually flips the app between its mobile and desktop layouts,
// exactly like a real device — no CSS overrides or breakpoint hacks needed.
//
// In mobile mode the phone mockup is scaled (CSS transform) to always fit
// entirely inside the available screen space — no outer scrolling needed to
// see the whole device. The iframe itself keeps its real 402×874 pixel size
// (that's what the app measures for its own breakpoint + its own internal
// scrolling), the *visual* scale is purely a transform on top of that.

const MOBILE_WIDTH = 402;
const MOBILE_HEIGHT = 874;
const CHROME_PADDING = 10; // bezel thickness around the screen, each side
const FRAME_OUTER_WIDTH = MOBILE_WIDTH + CHROME_PADDING * 2;
const FRAME_OUTER_HEIGHT = MOBILE_HEIGHT + CHROME_PADDING * 2;
const TOOLBAR_HEIGHT = 48;
const STORAGE_KEY = 'vibra-wireframe-preview-mode';

type Mode = 'desktop' | 'mobile';

function readStoredMode(): Mode {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'mobile' ? 'mobile' : 'desktop';
  } catch {
    return 'desktop';
  }
}

/** Tracks an element's content-box size (via ResizeObserver) so the phone
 *  mockup can be scaled to whatever room is actually available. */
function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}

export default function PreviewFrame() {
  const [mode, setMode] = useState<Mode>(readStoredMode);
  const [previewRef, previewSize] = useElementSize<HTMLDivElement>();

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, mode); } catch { /* ignore */ }
  }, [mode]);

  // Same document, flagged so main.tsx mounts <App/> directly with no harness.
  const frameSrc = useMemo(() => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('embed', '1');
      return url.toString();
    } catch {
      return window.location.pathname + '?embed=1';
    }
  }, []);

  // Fit the whole phone mockup inside the available space — never upscale
  // past its real size, only shrink as needed so nothing gets clipped or
  // forces the outer page to scroll.
  const scale = previewSize.width > 0 && previewSize.height > 0
    ? Math.min(previewSize.width / FRAME_OUTER_WIDTH, previewSize.height / FRAME_OUTER_HEIGHT, 1)
    : 1;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#E5E7EB' }}>

      {/* ── Toolbar — always visible, above everything, both modes ────────── */}
      <div
        style={{ height: TOOLBAR_HEIGHT }}
        className="shrink-0 bg-gray-900 flex items-center gap-3 px-4 select-none"
      >
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider hidden sm:inline">
          Vista previa del wireframe
        </span>
        <div className="flex items-center bg-gray-800 rounded-lg p-0.5 ml-auto">
          <button
            onClick={() => setMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              mode === 'desktop' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
              <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            Escritorio
          </button>
          <button
            onClick={() => setMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              mode === 'mobile' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
              <path d="M11 19h2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            Móvil
          </button>
        </div>
      </div>

      {/* ── Preview area ────────────────────────────────────────────────── */}
      <div
        ref={previewRef}
        className="flex-1 overflow-hidden flex items-center justify-center"
        style={{ padding: mode === 'mobile' ? 16 : 0 }}
      >
        {mode === 'desktop' ? (
          <iframe
            key="desktop"
            src={frameSrc}
            title="Vista previa — escritorio"
            className="w-full h-full border-0"
          />
        ) : (
          // Outer box reserves exactly the scaled footprint so the layout
          // never leaves gaps or overflow around the shrunk phone; the inner
          // box stays at real size and is visually scaled with a transform.
          <div style={{ width: FRAME_OUTER_WIDTH * scale, height: FRAME_OUTER_HEIGHT * scale }}>
            <div
              className="relative"
              style={{
                width: FRAME_OUTER_WIDTH,
                height: FRAME_OUTER_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            >
              {/* Phone chrome */}
              <div className="rounded-[48px] bg-gray-900 shadow-xl" style={{ padding: CHROME_PADDING }}>
                <div className="relative rounded-[38px] overflow-hidden bg-white" style={{ width: MOBILE_WIDTH, height: MOBILE_HEIGHT }}>
                  <iframe
                    key="mobile"
                    src={frameSrc}
                    title="Vista previa — móvil"
                    className="w-full h-full border-0"
                  />
                  {/* Notch */}
                  <div
                    className="absolute top-2 left-1/2 -translate-x-1/2 bg-gray-900 rounded-full pointer-events-none"
                    style={{ width: 90, height: 22 }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
