import { useState } from 'react';
import { NavProps } from '../types';
import { Header } from '../components/ui';

const SECTIONS = [
  {
    title: 'Términos y condiciones',
    content: `[Placeholder] Estos términos y condiciones regulan el uso de la plataforma Vibra y la compra de entradas a través de ella. Al utilizar nuestros servicios, el usuario acepta las condiciones aquí descritas en su totalidad.\n\nVibra actúa como intermediario entre productores de eventos y compradores. La responsabilidad sobre la realización del evento recae exclusivamente en el productor.\n\nLas entradas adquiridas no son reembolsables salvo cancelación definitiva del evento por parte del organizador. En caso de reprogramación, el usuario podrá conservar su entrada o solicitar reembolso dentro de los plazos indicados.`,
  },
  {
    title: 'Política de venta',
    content: `[Placeholder] La compra de entradas a través de Vibra implica el pago del valor de la entrada más un cargo de servicio que varía según el evento. Dicho cargo es informado antes de confirmar la compra.\n\nLos precios están expresados en pesos chilenos (CLP) e incluyen IVA cuando corresponda. Vibra se reserva el derecho de modificar precios sin previo aviso mientras no exista una compra confirmada.\n\nCada entrada está asociada a un código QR único e intransferible. La duplicación o reventa no autorizada anula la entrada.`,
  },
  {
    title: 'Política de privacidad',
    content: `[Placeholder] Vibra recopila datos personales necesarios para la gestión de compras: nombre, correo electrónico, RUT y datos de pago. Esta información es tratada con confidencialidad y no es compartida con terceros salvo requerimiento legal o necesidad operativa directamente relacionada con el evento.\n\nEl usuario puede solicitar la eliminación de sus datos en cualquier momento escribiendo a privacidad@vibra.cl. Vibra cumple con la Ley 19.628 sobre Protección de la Vida Privada.`,
  },
];

export default function LegalScreen({ goBack }: NavProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header type="back" title="Términos legales" onBack={goBack} />

      <div className="flex-1 px-4 py-5 flex flex-col gap-3 md:max-w-2xl md:mx-auto md:w-full md:py-8">
        <p className="text-xs text-gray-400">
          Última actualización: noviembre 2025
        </p>

        <div className="flex flex-col divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
          {SECTIONS.map((s, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left bg-white active:bg-gray-50"
              >
                <span className="font-semibold text-sm text-gray-900">{s.title}</span>
                <span className={`text-gray-400 text-xl leading-none shrink-0 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div className="px-4 pb-5 bg-gray-50">
                  {s.content.split('\n\n').map((p, j) => (
                    <p key={j} className="text-sm text-gray-600 leading-relaxed mb-3 last:mb-0">{p}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            ¿Tienes preguntas sobre nuestras políticas? Escríbenos a{' '}
            <span className="text-blue-600 font-medium">legal@vibra.cl</span>
          </p>
        </div>
      </div>
    </div>
  );
}
