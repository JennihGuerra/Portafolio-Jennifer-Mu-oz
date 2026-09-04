import { useState } from 'react';
import { NavProps } from '../types';
import { Header } from '../components/ui';

const FAQS = [
  {
    q: '¿Cómo recibo mis entradas?',
    a: 'Una vez confirmado el pago, recibirás un correo con el enlace para acceder a tus entradas. También puedes verlas en "Mis entradas" dentro de tu cuenta.',
  },
  {
    q: '¿Puedo devolver o cambiar mi entrada?',
    a: 'Las entradas no son reembolsables salvo cancelación del evento. Ante reprogramación tendrás la opción de conservar la entrada o solicitar reembolso.',
  },
  {
    q: '¿Qué pasa si el evento se cancela?',
    a: 'En caso de cancelación definitiva del evento, Vibra gestionará automáticamente el reembolso al medio de pago original en un plazo de 10 días hábiles.',
  },
  {
    q: '¿Cómo funciona la Compra rápida?',
    a: 'La Compra rápida te permite comprar sin crear una cuenta. Solo necesitas tu correo. Recibirás tus entradas por ese correo y podrás acceder a ellas con un enlace sin contraseña.',
  },
  {
    q: '¿Hay un límite de entradas por persona?',
    a: 'El límite varía según el evento. Generalmente el máximo es de 8 entradas por transacción. Algunos eventos especiales pueden tener límites menores.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencia bancaria y billeteras digitales como Mercado Pago, MACH y Tenpo.',
  },
];

export default function HelpScreen({ goBack }: NavProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const filtered = FAQS.filter(
    faq => !searchQuery || faq.q.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header type="back" title="Ayuda" onBack={goBack} />

      <div className="flex-1 px-4 py-5 flex flex-col gap-6 md:max-w-2xl md:mx-auto md:w-full md:py-8">
        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 h-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#9CA3AF" strokeWidth="2"/>
            <path d="M16.5 16.5L21 21" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar en preguntas frecuentes..."
            className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* FAQ section */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Preguntas frecuentes</p>
          <div className="flex flex-col divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-400">
                No encontramos resultados para "{searchQuery}"
              </div>
            ) : (
              filtered.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-3 p-4 text-left bg-white active:bg-gray-50"
                  >
                    <span className="font-medium text-sm text-gray-900 flex-1">{faq.q}</span>
                    <span className={`text-gray-400 text-lg leading-none transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed bg-gray-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Contacto</p>
          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <p className="font-semibold text-green-700">¡Mensaje enviado!</p>
              <p className="text-sm text-green-600 mt-1">Te responderemos en menos de 24 horas hábiles.</p>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Nombre</label>
                <input
                  value={contactForm.name}
                  onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Tu nombre"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Correo electrónico</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="tu@correo.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Mensaje</label>
                <textarea
                  value={contactForm.message}
                  onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <button
                onClick={() => {
                  if (contactForm.name && contactForm.email && contactForm.message) setSent(true);
                }}
                className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl text-sm active:bg-blue-700"
              >
                Enviar mensaje
              </button>
            </div>
          )}
        </div>

        {/* Legal */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Legal</p>
          <div className="flex flex-col divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
            {['Términos y condiciones', 'Política de venta', 'Política de privacidad'].map(l => (
              <button key={l} className="flex items-center justify-between p-4 bg-white text-left active:bg-gray-50">
                <span className="text-sm text-gray-700">{l}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="#9CA3AF" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Version footer */}
        <div className="text-center text-xs text-gray-300 pb-4">
          vibra · Wireframe v0.1 · 2025
        </div>
      </div>
    </div>
  );
}
