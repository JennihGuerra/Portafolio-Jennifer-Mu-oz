import { useState } from 'react';
import { NavProps } from '../types';
import { Header } from '../components/ui';

export default function SellScreen({ goBack }: NavProps) {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Requerido';
    if (!form.email.trim()) errs.email = 'Requerido';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Correo inválido';
    if (!form.message.trim()) errs.message = 'Requerido';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSent(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header type="back" title="Vende con nosotros" onBack={goBack} />

      {/* Hero */}
      <div className="relative w-full border-b border-gray-200" style={{ minHeight: '220px' }}>
        {/* Image placeholder */}
        <div className="absolute inset-0 bg-gray-200 flex flex-col items-center justify-center gap-1">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#9CA3AF" strokeWidth="1.5"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="#9CA3AF" strokeWidth="1.5"/>
            <path d="M21 15l-5-5L5 21" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[10px] text-gray-400">[imagen productores]</span>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800/70 via-gray-800/20 to-transparent" />
        {/* Text on top */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 pb-6 flex flex-col gap-2">
          <div className="md:max-w-2xl md:mx-auto md:w-full">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Productores</p>
            <h1 className="text-xl md:text-2xl font-bold text-white leading-snug">
              Lleva tu evento a miles de personas.
            </h1>
            <p className="text-xs md:text-sm text-white/75 leading-relaxed mt-1 md:max-w-md">
              En Vibra conectamos productores y organizadores con sus audiencias. Cuéntanos sobre tu evento y te contactamos para avanzar juntos.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 md:px-8 py-6 md:max-w-2xl md:mx-auto md:w-full">
        {sent ? (
          <div className="flex flex-col items-center text-center gap-4 py-12">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L19 7" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">¡Mensaje enviado!</p>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Nos pondremos en contacto contigo a la brevedad para conocer más sobre tu evento.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Tus datos</p>

            <Field label="Nombre completo" required error={errors.name}>
              <input
                value={form.name} onChange={e => set('name')(e.target.value)}
                placeholder="Tu nombre"
                className={input(!!errors.name)}
              />
            </Field>

            <Field label="Empresa o productora" error={errors.company}>
              <input
                value={form.company} onChange={e => set('company')(e.target.value)}
                placeholder="Nombre de tu empresa (opcional)"
                className={input(false)}
              />
            </Field>

            <Field label="Correo electrónico" required error={errors.email}>
              <input
                type="email"
                value={form.email} onChange={e => set('email')(e.target.value)}
                placeholder="tu@correo.com"
                className={input(!!errors.email)}
              />
            </Field>

            <Field label="Teléfono" error={errors.phone}>
              <input
                type="tel"
                value={form.phone} onChange={e => set('phone')(e.target.value)}
                placeholder="+56 9 1234 5678 (opcional)"
                className={input(false)}
              />
            </Field>

            <Field label="Cuéntanos sobre tu evento" required error={errors.message}>
              <textarea
                value={form.message} onChange={e => set('message')(e.target.value)}
                placeholder="¿Qué tipo de evento es? ¿Dónde y cuándo? ¿Cuántas entradas estimas vender?"
                rows={5}
                className={`${input(!!errors.message)} resize-none`}
              />
            </Field>

            <p className="text-xs text-gray-400">
              Tu información es confidencial y solo será usada para ponernos en contacto contigo.
            </p>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl text-sm active:bg-blue-700 mt-1"
            >
              Enviar solicitud
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label}{required && <span className="text-blue-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function input(hasError: boolean) {
  return `w-full border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
    hasError ? 'border-red-400' : 'border-gray-300'
  }`;
}
