import Image from 'next/image';
import { ShieldCheck, Zap, BookOpen, Scale, Mail } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

import { AUTHOR_PROFILE } from '@/lib/authorProfile';

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Conoce la misión, valores y metodología editorial de CajaUtil.com. Herramientas web gratuitas creadas con rigor, transparencia y privacidad.",
  alternates: {
    canonical: 'https://cajautil.com/sobre-nosotros',
  },
  openGraph: {
    title: 'Sobre nosotros | CajaUtil.com',
    description: "Conoce la misión, valores y metodología editorial de CajaUtil.com. Herramientas web gratuitas con rigor, transparencia y privacidad.",
    url: 'https://cajautil.com/sobre-nosotros',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre nosotros | CajaUtil.com',
    description: "Conoce la misión, valores y metodología editorial de CajaUtil.com. Herramientas web gratuitas con rigor, transparencia y privacidad.",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre nosotros - CajaUtil.com",
  description: "Información sobre el equipo, la misión y la metodología editorial de CajaUtil.com",
  mainEntity: {
    "@type": "Organization",
    name: "CajaUtil.com",
    url: "https://cajautil.com",
    logo: "https://cajautil.com/og-image.png",
    description: "CajaUtil.com ofrece herramientas web gratuitas: calculadoras financieras, generadores, conversores y utilidades digitales con procesamiento local.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hola@cajautil.com",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
  },
};

const AboutUsPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Nuestra <span className="text-blue-600">Misión</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Simplificamos tu vida digital ofreciendo herramientas rápidas, gratuitas y seguras, con procesamiento local siempre que es posible.
          </p>
        </header>

        {/* Seccion principal - Que es CajaUtil */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Qué es CajaUtil.com</h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>
              CajaUtil nació de una necesidad simple: encontrar herramientas web útiles (calculadoras, conversores, generadores)
              que no requirieran registro, no estuvieran plagadas de publicidad intrusiva y, sobre todo, que respetaran la privacidad del usuario.
            </p>
            <p>
              Hoy ofrecemos <strong>más de 30 utilidades gratuitas</strong> que cubren áreas como finanzas personales
              (calculadora de sueldo neto, IVA, hipotecas, préstamos), productividad (contador de palabras, generador QR),
              seguridad (generador de contraseñas) y entretenimiento (CPS test, ruleta aleatoria). Cada herramienta está
              diseñada para ser rápida, precisa y fácil de entender.
            </p>
            <p>
              Gran parte de nuestras herramientas se ejecutan <strong>localmente en tu navegador</strong>. Cuando el procesamiento
              puede hacerse en el dispositivo, evitamos enviar tus datos a servidores externos. En los casos en los que usamos
              servicios de terceros para analítica o publicidad, lo informamos de forma transparente en
              nuestra <Link href="/politica-de-privacidad" className="text-blue-600 font-semibold hover:underline">política de privacidad</Link> y
              nuestra <Link href="/politica-de-cookies" className="text-blue-600 font-semibold hover:underline">política de cookies</Link>.
            </p>
          </div>
        </section>

        {/* Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 font-bold">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Privacidad por diseño</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Tus datos son tuyos. Las herramientas procesan la información en tu navegador siempre que es posible.
              No almacenamos la información que introduces en nuestras utilidades, ni creamos perfiles de usuario propios.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 font-bold">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Velocidad y simplicidad</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Sin registros, sin esperas, sin instalaciones. Entras, usas la herramienta y listo.
              Cada página se carga en menos de 2 segundos y está optimizada para móvil, tablet y escritorio.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 font-bold">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Contenido útil y claro</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Cada herramienta incluye información complementaria sobre cómo usarla, qué fórmulas aplica y para qué
              sirve. No publicamos contenido de relleno: todo está pensado para que entiendas y aproveches la utilidad.
            </p>
          </div>
        </div>

        {/* Metodologia editorial */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Metodología editorial</h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>
              Revisamos de forma periódica las fórmulas, textos de ayuda y páginas informativas para mantenerlas claras
              y útiles. Cuando una herramienta ofrece estimaciones orientativas (por ejemplo, la calculadora de sueldo neto
              o el simulador de hipotecas), lo indicamos expresamente para evitar interpretaciones equivocadas.
            </p>
            <p>
              Nuestro proceso editorial incluye:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Verificación de fórmulas:</strong> los cálculos financieros, matemáticos y de salud se contrastan con fuentes oficiales (BOE, AEAT, OMS).</li>
              <li><strong>Revisión periódica:</strong> actualizamos parámetros cuando cambian las normativas (por ejemplo, tramos IRPF, tipos de IVA).</li>
              <li><strong>Transparencia:</strong> indicamos claramente cuando un resultado es orientativo y no sustituye el asesoramiento profesional.</li>
              <li><strong>Accesibilidad:</strong> usamos lenguaje sencillo y estructuramos los contenidos con encabezados, listas y ejemplos para facilitar la comprensión.</li>
            </ul>
          </div>
        </section>

        {/* Equipo */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">El equipo detrás de CajaUtil</h2>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-blue-50/50">
              <Image
                src={AUTHOR_PROFILE.avatarUrl}
                alt={`Foto de perfil de ${AUTHOR_PROFILE.fullName}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{AUTHOR_PROFILE.name} - Fundador y desarrollador principal</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-3">
                Ingeniero de software con más de 10 años de experiencia en desarrollo web y automatización.
                Creó CajaUtil con la visión de reunir en un solo lugar las herramientas online que él mismo necesitaba
                en su día a día, pero que no encontraba sin publicidad invasiva o registros innecesarios.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm">
                Raúl supervisa personalmente el desarrollo de cada herramienta, revisa las fórmulas de cálculo
                y se asegura de que la experiencia de usuario sea óptima en todos los dispositivos.
                Es el responsable editorial de todo el contenido publicado en CajaUtil.com.
              </p>
            </div>
          </div>
        </section>

        {/* Financiacion */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Cómo nos financiamos</h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>
              CajaUtil.com es un proyecto independiente. Mantenemos los servidores, el desarrollo y las actualizaciones
              gracias a la <strong>publicidad no intrusiva</strong> gestionada por Google AdSense. Este modelo nos permite
              ofrecer todas las herramientas de forma completamente gratuita y sin necesidad de cobrar suscripciones ni
              pedir datos personales a los usuarios.
            </p>
            <p>
               No vendemos datos de usuario, no tenemos programas de afiliados ocultos y cualquier relación comercial
              con terceros se limita a la publicidad contextual gestionada por Google. Puedes consultar los detalles en
               nuestra <Link href="/politica-de-privacidad" className="text-blue-600 font-semibold hover:underline">política de privacidad</Link>.
            </p>
          </div>
        </section>

        {/* Contacto CTA */}
        <section className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-12 border border-blue-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Contacta con nosotros</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            ¿Tienes una sugerencia, has encontrado un error o quieres proponernos una nueva herramienta?
            Nos encanta recibir comentarios de nuestros usuarios.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md shadow-blue-500/20"
            >
              <Mail size={20} />
              Escríbenos
            </Link>
            <Link
              href="/aviso-legal"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl border border-slate-200 transition-colors"
            >
              <Scale size={20} />
              Aviso legal
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUsPage;
