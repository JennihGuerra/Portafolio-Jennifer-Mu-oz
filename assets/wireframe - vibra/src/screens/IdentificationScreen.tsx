import { useState } from 'react';
import { NavProps } from '../types';
import { Button, Input } from '../components/ui';

export default function IdentificationScreen({ state, navigate, goBack, navToTab, updateState }: NavProps) {
  const isPurchaseFlow = !!state.event;

  const [tab, setTab] = useState<'login' | 'quick'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickEmailConfirm, setQuickEmailConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showRegister, setShowRegister] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});

  const handleLogin = () => {
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'Ingresa tu correo';
    if (!password) errs.password = 'Ingresa tu contraseña';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (isPurchaseFlow) {
      navigate('summary', { email, isLoggedIn: true });
    } else {
      updateState({ email, isLoggedIn: true });
      goBack();
    }
  };

  const handleRegister = () => {
    const errs: Record<string, string> = {};
    if (!regName.trim()) errs.name = 'Ingresa tu nombre';
    if (!regEmail.trim()) errs.email = 'Ingresa tu correo';
    else if (!/\S+@\S+\.\S+/.test(regEmail)) errs.email = 'Correo inválido';
    if (!regPassword.trim()) errs.password = 'Ingresa una contraseña';
    else if (regPassword.length < 6) errs.password = 'Mínimo 6 caracteres';
    if (Object.keys(errs).length) { setRegErrors(errs); return; }
    if (isPurchaseFlow) {
      navigate('summary', { email: regEmail, isLoggedIn: true });
    } else {
      updateState({ email: regEmail, isLoggedIn: true });
      goBack();
    }
  };

  const handleQuick = () => {
    const errs: Record<string, string> = {};
    if (!quickEmail) errs.quickEmail = 'Ingresa tu correo';
    else if (!/\S+@\S+\.\S+/.test(quickEmail)) errs.quickEmail = 'Correo inválido';
    if (!quickEmailConfirm) errs.quickEmailConfirm = 'Confirma tu correo';
    else if (!errs.quickEmail && quickEmailConfirm.trim().toLowerCase() !== quickEmail.trim().toLowerCase()) {
      errs.quickEmailConfirm = 'Los correos no coinciden';
    }
    if (Object.keys(errs).length) { setErrors(errs); return; }
    navigate('summary', { email: quickEmail, isLoggedIn: false });
  };

  // Shared form content rendered in both mobile and desktop panels
  const FormContent = () => (
    <>
      {isPurchaseFlow && !showRegister && (
        <>
          <div className="flex border border-gray-200 rounded-xl overflow-hidden">
            {(['login', 'quick'] as const).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setErrors({}); }}
                className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                  tab === t ? 'bg-blue-600 text-white' : 'bg-white text-gray-500'
                }`}
              >
                {t === 'login' ? 'Iniciar sesión' : 'Compra rápida'}
              </button>
            ))}
          </div>

          {tab === 'login' ? (
            <LoginForm
              email={email} setEmail={setEmail}
              password={password} setPassword={setPassword}
              errors={errors} onSubmit={handleLogin}
              onRegister={() => setShowRegister(true)}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-700 leading-relaxed">
                  Usaremos este correo para enviarte la confirmación y el acceso a tus entradas. No necesitas crear una cuenta.
                </p>
              </div>
              <Input
                label="Correo electrónico"
                placeholder="tu@correo.com"
                type="email"
                value={quickEmail}
                onChange={setQuickEmail}
                error={errors.quickEmail}
              />
              <Input
                label="Confirmar correo electrónico"
                placeholder="tu@correo.com"
                type="email"
                value={quickEmailConfirm}
                onChange={setQuickEmailConfirm}
                onPaste={e => e.preventDefault()}
                error={errors.quickEmailConfirm}
                success={
                  !errors.quickEmailConfirm && quickEmailConfirm && quickEmail &&
                  quickEmailConfirm.trim().toLowerCase() === quickEmail.trim().toLowerCase()
                    ? 'Los correos coinciden'
                    : undefined
                }
              />
              <p className="text-xs text-gray-400 -mt-2">
                Tus entradas y el acceso QR llegan a este correo, así que no se puede pegar: vuelve a escribirlo para confirmar que está bien.
              </p>
              <Button fullWidth size="lg" onClick={handleQuick}>
                Continuar con este correo
              </Button>
              <p className="text-xs text-gray-400 text-center">
                ¿Tienes cuenta?{' '}
                <button onClick={() => setTab('login')} className="text-blue-600 font-medium">
                  Inicia sesión
                </button>
              </p>
            </div>
          )}
        </>
      )}

      {!isPurchaseFlow && !showRegister && (
        <LoginForm
          email={email} setEmail={setEmail}
          password={password} setPassword={setPassword}
          errors={errors} onSubmit={handleLogin}
          onRegister={() => setShowRegister(true)}
        />
      )}

      {showRegister && (
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Crear cuenta</h2>
            <p className="text-sm text-gray-500 mt-1">Es gratis y solo toma un minuto</p>
          </div>
          <Input label="Nombre completo" placeholder="Tu nombre" value={regName}
            onChange={setRegName} error={regErrors.name} />
          <Input label="Correo electrónico" placeholder="tu@correo.com" type="email"
            value={regEmail} onChange={setRegEmail} error={regErrors.email} />
          <Input label="Contraseña" placeholder="Mínimo 6 caracteres" type="password"
            value={regPassword} onChange={setRegPassword} error={regErrors.password} />
          <Button fullWidth size="lg" onClick={handleRegister}>
            Crear cuenta
          </Button>
          <p className="text-xs text-gray-400 text-center">
            ¿Ya tienes cuenta?{' '}
            <button onClick={() => setShowRegister(false)} className="text-blue-600 font-medium">
              Inicia sesión
            </button>
          </p>
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ── MOBILE layout ─────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col flex-1">
        <header className="flex items-center px-4 border-b border-gray-200" style={{ paddingTop: 'max(44px, env(safe-area-inset-top))', paddingBottom: '12px' }}>
          <button onClick={goBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 -ml-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-semibold text-base ml-1">
            {showRegister ? 'Crear cuenta' : 'Iniciar sesión'}
          </span>
        </header>
        <div className="flex-1 px-5 py-6 flex flex-col gap-5">
          <FormContent />
        </div>
      </div>

      {/* ── DESKTOP layout: image left + form right ────────────────────── */}
      <div className="hidden md:flex flex-1 min-h-screen">

        {/* Left: image panel */}
        <div className="w-1/2 relative bg-gray-900 flex flex-col justify-between overflow-hidden">
          {/* Image placeholder */}
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="opacity-20">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
              <circle cx="8.5" cy="8.5" r="1.5" stroke="#6B7280" strokeWidth="1.5"/>
              <path d="M21 15l-5-5L5 21" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

          {/* Back button */}
          <div className="relative z-10 p-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Volver
            </button>
          </div>

          {/* Bottom branding */}
          <div className="relative z-10 p-10 flex flex-col gap-4">
            <button
              onClick={() => navToTab('home')}
              className="self-start text-3xl font-bold text-white tracking-tight hover:text-white/80 transition-colors"
            >
              vibra
            </button>
            <p className="text-white/65 text-base leading-relaxed max-w-sm">
              Tu plataforma de entradas para los mejores eventos de Chile. Compra seguro, disfruta más.
            </p>
            <div className="flex gap-2 mt-1 flex-wrap">
              {['Pago seguro', 'QR digital', 'Sin filas', 'Soporte 24/7'].map(tag => (
                <span key={tag} className="text-xs text-white/60 border border-white/20 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form panel */}
        <div className="w-1/2 flex flex-col justify-center px-16 py-12 overflow-y-auto bg-white">
          <div className="max-w-sm w-full mx-auto flex flex-col gap-5">
            <FormContent />
          </div>
        </div>

      </div>
    </div>
  );
}

function LoginForm({ email, setEmail, password, setPassword, errors, onSubmit, onRegister }: {
  email: string; setEmail: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  errors: Record<string, string>;
  onSubmit: () => void;
  onRegister: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Bienvenido</h2>
        <p className="text-sm text-gray-500 mt-1">Ingresa con tu cuenta Vibra</p>
      </div>
      <Input label="Correo electrónico" placeholder="tu@correo.com" type="email"
        value={email} onChange={setEmail} error={errors.email} />
      <Input label="Contraseña" placeholder="••••••••" type="password"
        value={password} onChange={setPassword} error={errors.password} />
      <button className="text-sm text-blue-600 text-left font-medium -mt-1">
        ¿Olvidaste tu contraseña?
      </button>
      <Button fullWidth size="lg" onClick={onSubmit}>
        Iniciar sesión
      </Button>
      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">¿No tienes cuenta?</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <Button fullWidth size="lg" variant="secondary" onClick={onRegister}>
        Registrarse
      </Button>
    </div>
  );
}
