import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pagina no encontrada | CajaUtil.com',
  description: 'La pagina que buscas no existe o ha sido movida. Vuelve al inicio y encuentra las herramientas online gratuitas de CajaUtil.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-[70dvh] bg-slate-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="text-8xl font-black text-slate-200 mb-6 select-none" aria-hidden="true">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Pagina no encontrada
        </h1>

        <p className="text-slate-500 text-lg mb-10 leading-relaxed">
          La pagina que buscas no existe, ha sido movida o la direccion es incorrecta. 
          Pero no te preocupes, puedes volver al inicio y encontrar todas nuestras herramientas gratuitas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md shadow-blue-500/20"
          >
            <Home className="w-5 h-5" />
            Ir al inicio
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl border border-slate-200 transition-colors"
          >
            <Search className="w-5 h-5" />
            Contactar
          </Link>
        </div>

        <div className="mt-16">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Herramientas populares
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { nombre: 'Calculadora IVA', ruta: '/calculadora-iva' },
              { nombre: 'Sueldo Neto', ruta: '/calculadora-sueldo-neto' },
              { nombre: 'Generador QR', ruta: '/generador-qr' },
              { nombre: 'Contador Palabras', ruta: '/contador-de-palabras' },
              { nombre: 'Calculadora %', ruta: '/calculadora-porcentajes' },
              { nombre: 'Generador Contrasenas', ruta: '/generador-contrasenas' },
            ].map((tool) => (
              <Link
                key={tool.ruta}
                href={tool.ruta}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                {tool.nombre}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
