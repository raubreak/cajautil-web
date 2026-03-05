import type { Metadata } from 'next';

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
        
        <p className="text-sm text-slate-500 mb-8">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

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
          En algunos casos puntuales, usamos la API local del navegador (LocalStorage) pura y exclusivamente para tus preferencias visuales, si aplicase en futuras actualizaciones.
        </p>
        
        <p>
          Sin embargo, <strong>CajaUtil.com usa cookies de terceros con fines publicitarios y de analítica web</strong>, más en concreto, para publicar anuncios personalizados a través de Google AdSense.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Tipos de Cookies que utilizamos (Third Party)</h2>
        <p>
          Las cookies utilizadas en esta herramienta están sujetas a la estricta infraestructura de Google.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Cookies Publicitarias (Google AdSense y Google Analytics):</strong> <br />
            Google, como proveedor externo, utiliza cookies para publicar anuncios relevantes. 
            El uso de la cookie publicitaria de DART de Google le permite de a sí mismo ya sus socios 
            proporcionar anuncios a los usuarios de este sitio, según cómo interactúan en otros sitios web de Internet, 
            identificando de este modo los intereses o las preferencias.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. ¿Cómo rechazar y eliminar las Cookies?</h2>
        <p>
          Usted tiene el derecho a decidir si desea aceptar o rechazar las cookies no esenciales.
          En el primer acceso a la web, usted tiene la opción de aceptarlas mediante nuestro Aviso de Consentimiento.
        </p>
        <p>
          Si desea inhabilitar y limpiar por completo las cookies que guarda Google y el historial sobre lo que él considera que son sus intereses puede dirigirse a: <br />
          <a href="https://adssettings.google.es/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"><strong>Controlar la Configuración de Anuncios de Google (Ad Settings)</strong></a>
        </p>
        <p className="mt-4">
          Casi cualquier navegador le aportará las pautas y opciones avanzadas para borrar y gestionar el uso de cookies. Siga siempre las instrucciones oficiales del menú de "Privacidad o Seguridad" de este mismo.
        </p>

        <div className="mt-12 pt-6 border-t border-slate-200 text-center">
            <p className="text-slate-500 font-medium text-sm mb-4">Revisa nuestra política de privacidad completa</p>
            <a href="/politica-de-privacidad" className="text-blue-600 hover:underline font-bold">Ver Política de Privacidad</a>
        </div>
      </div>
    </main>
  );
}
