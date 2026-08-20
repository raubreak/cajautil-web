import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Cookies | CajaUtil',
  description: 'Conoce cómo CajaUtil utiliza almacenamiento local y Google Analytics, y cómo aceptar, rechazar o cambiar tu elección.',
  alternates: {
    canonical: 'https://cajautil.com/politica-de-cookies',
  },
};

export default function PoliticaCookies() {
  return (
    <main className="min-h-[100dvh] bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-100 prose prose-slate max-w-none">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">Política de Cookies</h1>
        
        <p className="text-sm text-slate-500 mb-8">Última actualización: 20/08/2026</p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. ¿Qué son las cookies?</h2>
        <p>
          Una cookie es un pequeño archivo de texto, normalmente letras o números, 
          que un sitio web almacena en el ordenador, dispositivo móvil u otro equipo electrónico de los usuarios e 
          inspecciona para recoger información sobre la navegación del usuario en el sitio.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. ¿Cómo se usan las cookies en CajaUtil.com?</h2>
        <p>
          Las herramientas operativas (calculadoras, generadores) propias de nuestro código 
          <strong> NO utilizan cookies propias para rastrear el comportamiento del usuario ni para registrar datos personales o analíticos </strong>. 
          Determinadas preferencias tecnicas pueden ser gestionadas por el navegador o por las plataformas de terceros que intervienen en la gestion del consentimiento.
        </p>
        
        <p>
          CajaUtil.com puede usar <strong>Google Analytics con fines de analítica web</strong>, pero solo lo carga después de que aceptes.
          La publicidad de terceros permanece desactivada mientras no podamos garantizar formatos no intrusivos.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Tipos de Cookies que utilizamos</h2>
        <p>
          Actualmente solo se carga Google Analytics cuando existe consentimiento.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Cookies de medicion y analitica:</strong> Google Analytics puede utilizar almacenamiento para medir visitas, paginas vistas y eventos de uso.</li>
          <li><strong>Almacenamiento tecnico:</strong> la plataforma de consentimiento o los servicios integrados pueden almacenar la eleccion realizada para respetarla en visitas posteriores.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Gestion del consentimiento</h2>
        <p>
          CajaUtil muestra un aviso de consentimiento para aceptar o rechazar las tecnologías no esenciales.
          Rechazar la analítica no limita el uso de ninguna herramienta.
        </p>
        <p>
          Tu elección se guarda localmente en el navegador para respetarla en visitas posteriores. Puedes cambiarla en cualquier momento mediante el botón «Gestionar cookies».
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. ¿Cómo rechazar y eliminar las Cookies?</h2>
        <p>
          Tienes derecho a aceptar o rechazar las cookies no esenciales y a cambiar tu decisión posteriormente. Google explica su tratamiento de datos en su{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"><strong>política de privacidad</strong></a>.
        </p>
        <p className="mt-4">
          Casi cualquier navegador te ofrece opciones avanzadas para borrar y gestionar cookies. Consulta siempre la documentacion oficial del navegador que utilices.
        </p>

        <div className="mt-12 pt-6 border-t border-slate-200 text-center">
            <p className="text-slate-500 font-medium text-sm mb-4">Revisa nuestra política de privacidad completa</p>
            <Link href="/politica-de-privacidad" className="text-blue-600 hover:underline font-bold">Ver Política de Privacidad</Link>
        </div>
      </div>
    </main>
  );
}
