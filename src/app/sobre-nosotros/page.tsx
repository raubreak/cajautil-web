import { ShieldCheck, Zap, BookOpen, Scale, Mail } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Conoce la mision, valores y metodologia editorial de CajaUtil.com. Herramientas web gratuitas creadas con rigor, transparencia y privacidad.",
  alternates: {
    canonical: 'https://cajautil.com/sobre-nosotros',
  },
  openGraph: {
    title: 'Sobre nosotros | CajaUtil.com',
    description: "Conoce la mision, valores y metodologia editorial de CajaUtil.com. Herramientas web gratuitas con rigor, transparencia y privacidad.",
    url: 'https://cajautil.com/sobre-nosotros',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre nosotros | CajaUtil.com',
    description: "Conoce la mision, valores y metodologia editorial de CajaUtil.com. Herramientas web gratuitas con rigor, transparencia y privacidad.",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre nosotros - CajaUtil.com",
  description: "Informacion sobre el equipo, la mision y la metodologia editorial de CajaUtil.com",
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
            Nuestra <span className="text-blue-600">Mision</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Simplificamos tu vida digital ofreciendo herramientas rapidas, gratuitas y seguras, con procesamiento local siempre que es posible.
          </p>
        </header>

        {/* Seccion principal - Que es CajaUtil */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Que es CajaUtil.com</h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>
              CajaUtil nacio de una necesidad simple: encontrar herramientas web utiles (calculadoras, conversores, generadores)
              que no requirieran registro, no estuvieran plagadas de publicidad intrusiva y, sobre todo, que respetaran la privacidad del usuario.
            </p>
            <p>
              Hoy ofrecemos <strong>mas de 30 utilidades gratuitas</strong> que cubren areas como finanzas personales
              (calculadora de sueldo neto, IVA, hipotecas, prestamos), productividad (contador de palabras, generador QR),
              seguridad (generador de contrasenas) y entretenimiento (CPS test, ruleta aleatoria). Cada herramienta esta
              disenada para ser rapida, precisa y facil de entender.
            </p>
            <p>
              Gran parte de nuestras herramientas se ejecutan <strong>localmente en tu navegador</strong>. Cuando el procesamiento
              puede hacerse en el dispositivo, evitamos enviar tus datos a servidores externos. En los casos en los que usamos
              servicios de terceros para analitica o publicidad, lo informamos de forma transparente en
              nuestra <Link href="/politica-de-privacidad" className="text-blue-600 font-semibold hover:underline">politica de privacidad</Link> y
              nuestra <Link href="/politica-de-cookies" className="text-blue-600 font-semibold hover:underline">politica de cookies</Link>.
            </p>
          </div>
        </section>

        {/* Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 font-bold">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Privacidad por diseno</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Tus datos son tuyos. Las herramientas procesan la informacion en tu navegador siempre que es posible.
              No almacenamos la informacion que introduces en nuestras utilidades, ni creamos perfiles de usuario propios.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 font-bold">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Velocidad y simplicidad</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Sin registros, sin esperas, sin instalaciones. Entras, usas la herramienta y listo.
              Cada pagina se carga en menos de 2 segundos y esta optimizada para movil, tablet y escritorio.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 font-bold">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Contenido util y claro</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Cada herramienta incluye informacion complementaria sobre como usarla, que formulas aplica y para que
              sirve. No publicamos contenido de relleno: todo esta pensado para que entiendas y aproveches la utilidad.
            </p>
          </div>
        </div>

        {/* Metodologia editorial */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Metodologia editorial</h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>
              Revisamos de forma periodica las formulas, textos de ayuda y paginas informativas para mantenerlas claras
              y utiles. Cuando una herramienta ofrece estimaciones orientativas (por ejemplo, la calculadora de sueldo neto
              o el simulador de hipotecas), lo indicamos expresamente para evitar interpretaciones equivocadas.
            </p>
            <p>
              Nuestro proceso editorial incluye:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Verificacion de formulas:</strong> los calculos financieros, matematicos y de salud se contrastan con fuentes oficiales (BOE, AEAT, OMS).</li>
              <li><strong>Revision periodica:</strong> actualizamos parametros cuando cambian las normativas (por ejemplo, tramos IRPF, tipos de IVA).</li>
              <li><strong>Transparencia:</strong> indicamos claramente cuando un resultado es orientativo y no sustituye el asesoramiento profesional.</li>
              <li><strong>Accesibilidad:</strong> usamos lenguaje sencillo y estructuramos los contenidos con encabezados, listas y ejemplos para facilitar la comprension.</li>
            </ul>
          </div>
        </section>

        {/* Equipo */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">El equipo detras de CajaUtil</h2>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-blue-50/50">
              <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black">
                RB
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Raul B. - Fundador y desarrollador principal</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-3">
                Ingeniero de software con mas de 10 anos de experiencia en desarrollo web y automatizacion.
                Creo CajaUtil con la vision de reunir en un solo lugar las herramientas online que el mismo necesitaba
                en su dia a dia, pero que no encontraba sin publicidad invasiva o registros innecesarios.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm">
                Raul supervisa personalmente el desarrollo de cada herramienta, revisa las formulas de calculo
                y se asegura de que la experiencia de usuario sea optima en todos los dispositivos.
                Es el responsable editorial de todo el contenido publicado en CajaUtil.com.
              </p>
            </div>
          </div>
        </section>

        {/* Financiacion */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Como nos financiamos</h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>
              CajaUtil.com es un proyecto independiente. Mantenemos los servidores, el desarrollo y las actualizaciones
              gracias a la <strong>publicidad no intrusiva</strong> gestionada por Google AdSense. Este modelo nos permite
              ofrecer todas las herramientas de forma completamente gratuita y sin necesidad de cobrar suscripciones ni
              pedir datos personales a los usuarios.
            </p>
            <p>
              No vendemos datos de usuario, no tenemos programas de afiliados ocultos y cualquier relacion comercial
              con terceros se limita a la publicidad contextual gestionada por Google. Puedes consultar los detalles en
              nuestra <Link href="/politica-de-privacidad" className="text-blue-600 font-semibold hover:underline">politica de privacidad</Link>.
            </p>
          </div>
        </section>

        {/* Contacto CTA */}
        <section className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-12 border border-blue-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Contacta con nosotros</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Tienes una sugerencia, has encontrado un error o quieres proponernos una nueva herramienta?
            Nos encanta recibir comentarios de nuestros usuarios.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md shadow-blue-500/20"
            >
              <Mail size={20} />
              Escribenos
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
