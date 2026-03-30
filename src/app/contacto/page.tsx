import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contacto | CajaUtil.com',
  description: 'Contacta con el equipo de CajaUtil.com para sugerencias, reportar errores o proponer nuevas herramientas. Respondemos en 24-48 horas.',
  alternates: {
    canonical: 'https://cajautil.com/contacto',
  },
  openGraph: {
    title: 'Contacto | CajaUtil.com',
    description: 'Contacta con el equipo de CajaUtil.com para sugerencias, reportar errores o proponer nuevas herramientas.',
    url: 'https://cajautil.com/contacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | CajaUtil.com',
    description: 'Contacta con el equipo de CajaUtil.com para sugerencias, reportar errores o proponer nuevas herramientas.',
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto - CajaUtil.com",
  description: "Pagina de contacto de CajaUtil.com",
  mainEntity: {
    "@type": "Organization",
    name: "CajaUtil.com",
    url: "https://cajautil.com",
    email: "hola@cajautil.com",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hola@cajautil.com",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
  },
};

export default function Contacto() {
  return (
    <main className="min-h-[100dvh] bg-slate-50 py-10 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">Contactanos</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Has encontrado un error en alguna herramienta? Tienes una sugerencia o quieres proponernos una nueva calculadora?
            Nos encantaria escucharte.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Informacion de contacto */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Correo electronico</h2>
              <a href="mailto:hola@cajautil.com" className="text-xl font-black text-blue-600 hover:underline block mb-2">
                hola@cajautil.com
              </a>
              <p className="text-sm text-slate-500">
                Intentamos responder a todos los mensajes en un plazo de 24-48 horas laborables.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Que tipo de consultas atendemos</h2>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">-</span>
                  <span><strong>Errores</strong> en alguna herramienta o calculo incorrecto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">-</span>
                  <span><strong>Sugerencias</strong> de mejora para herramientas existentes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">-</span>
                  <span><strong>Propuestas</strong> de nuevas calculadoras o utilidades</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">-</span>
                  <span><strong>Consultas</strong> sobre privacidad, cookies o datos personales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">-</span>
                  <span><strong>Colaboraciones</strong> profesionales y propuestas editoriales</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-2">Sobre CajaUtil.com</h2>
              <p className="text-sm text-slate-600 mb-4">
                CajaUtil.com es un proyecto independiente creado con el objetivo de ofrecer herramientas web gratuitas,
                rapidas y con procesamiento local cuando es posible.
                Mantenemos los servidores y el desarrollo gracias a la publicidad y explicamos ese uso en nuestras paginas legales.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/sobre-nosotros" className="text-sm font-semibold text-blue-600 hover:underline">
                  Sobre nosotros
                </Link>
                <Link href="/politica-de-privacidad" className="text-sm font-semibold text-blue-600 hover:underline">
                  Privacidad
                </Link>
                <Link href="/aviso-legal" className="text-sm font-semibold text-blue-600 hover:underline">
                  Aviso legal
                </Link>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Envianos un mensaje</h2>
              <form action={`mailto:hola@cajautil.com`} method="POST" encType="text/plain" className="space-y-5">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    placeholder="Ej: Maria Garcia"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Tu correo electronico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="tu@correo.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label htmlFor="asunto" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Asunto
                  </label>
                  <select
                    id="asunto"
                    name="asunto"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white"
                  >
                    <option value="">Selecciona un motivo</option>
                    <option value="error">Reportar un error</option>
                    <option value="sugerencia">Sugerencia de mejora</option>
                    <option value="nueva-herramienta">Proponer nueva herramienta</option>
                    <option value="privacidad">Consulta sobre privacidad</option>
                    <option value="otro">Otro motivo</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Tu mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={5}
                    placeholder="Describe tu consulta con el mayor detalle posible..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md shadow-blue-500/20"
                >
                  Enviar mensaje
                </button>

                <p className="text-xs text-slate-400 text-center">
                  Al enviar este formulario, aceptas nuestra{' '}
                  <Link href="/politica-de-privacidad" className="text-blue-500 hover:underline">
                    politica de privacidad
                  </Link>. No almacenamos tus datos en ningun servidor.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
