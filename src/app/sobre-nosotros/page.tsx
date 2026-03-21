import { ShieldCheck, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Conoce nuestra misión, valores y al equipo multidisciplinar detrás de CajaUtil, tu navaja suiza digital de confianza.",
  alternates: {
    canonical: 'https://cajautil.com/sobre-nosotros',
  },
  openGraph: {
    title: 'Sobre nosotros | CajaUtil.com',
    description: "Conoce nuestra misión, valores y al equipo multidisciplinar detrás de CajaUtil, tu navaja suiza digital de confianza.",
    url: 'https://cajautil.com/sobre-nosotros',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre nosotros | CajaUtil.com',
    description: "Conoce nuestra misión, valores y al equipo multidisciplinar detrás de CajaUtil, tu navaja suiza digital de confianza.",
  },
};

const AboutUsPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Nuestra <span className="text-blue-600">Misión</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Simplificamos tu vida digital ofreciendo herramientas rapidas, gratuitas y claras de usar.
          </p>
        </header>

        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">¿Qué es CajaUtil.com?</h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>
              CajaUtil nació de una necesidad simple: encontrar herramientas web útiles (calculadoras, conversores, generadores) 
              que no requirieran registro, no estuvieran plagadas de publicidad intrusiva y, sobre todo, que respetaran la privacidad del usuario.
            </p>
            <p>
              Gran parte de nuestras herramientas se ejecutan <strong>localmente en tu navegador</strong>. Cuando el procesamiento puede hacerse en el dispositivo,
              evitamos enviar tus datos a servidores externos. En los casos en los que usamos servicios de terceros para analítica o publicidad,
              lo informamos de forma transparente en nuestras políticas.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 font-bold">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Privacidad por diseño</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Tus datos son tuyos. No almacenamos la información que procesas a través de nuestras utilidades.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 font-bold">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Velocidad y Simplicidad</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Sin registros, sin esperas. Entrar, usar y listo. La mejor experiencia para tareas rápidas.
            </p>
          </div>
        </div>

        <section className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Nuestro Compromiso Editorial</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Revisamos de forma periodica las formulas, textos de ayuda y paginas informativas para mantenerlas claras y utiles.
            Cuando una herramienta ofrece estimaciones orientativas, lo indicamos expresamente para evitar interpretaciones equivocadas.
          </p>
        </section>
      </div>
    </main>
  );
};

export default AboutUsPage;
