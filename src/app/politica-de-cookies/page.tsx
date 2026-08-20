import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Cookies | CajaUtil.com',
  description: 'Conoce cómo CajaUtil.com y sus anunciantes y terceros utilizan las cookies para ofrecer, proteger y mejorar el servicio y sus anuncios.',
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
          Sin embargo, <strong>CajaUtil.com usa tecnologías de terceros con fines publicitarios y de analítica web</strong>,
          concretamente Google Analytics para medición y Monetag para publicidad.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Tipos de Cookies que utilizamos</h2>
        <p>
          Actualmente trabajamos con Google Analytics y Monetag, sujetos a sus propias políticas de tratamiento de datos.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Cookies de medicion y analitica:</strong> Google Analytics puede utilizar almacenamiento para medir visitas, paginas vistas y eventos de uso.</li>
          <li><strong>Cookies publicitarias:</strong> Monetag puede utilizar cookies, identificadores y datos técnicos para servir anuncios, medir su rendimiento y limitar el fraude, según tu consentimiento.</li>
          <li><strong>Almacenamiento tecnico:</strong> la plataforma de consentimiento o los servicios integrados pueden almacenar la eleccion realizada para respetarla en visitas posteriores.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Gestion del consentimiento</h2>
        <p>
          CajaUtil muestra un aviso de consentimiento para aceptar o rechazar las tecnologías no esenciales.
          El tag publicitario de Monetag solo se carga después de aceptar.
        </p>
        <p>
          Tu elección se guarda localmente en el navegador para respetarla en visitas posteriores. Puedes eliminarla borrando los datos del sitio.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. ¿Cómo rechazar y eliminar las Cookies?</h2>
        <p>
          Tienes derecho a decidir si deseas aceptar o rechazar las cookies no esenciales. Puedes consultar más información sobre el tratamiento publicitario en:
          <br />
          <a href="https://monetag.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"><strong>Política de privacidad de Monetag</strong></a>
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
