import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad | CajaUtil.com',
  description: 'Conoce nuestra política de privacidad, el uso de datos en CajaUtil.com y cómo protegemos tu información y privacidad.',
  alternates: {
    canonical: 'https://cajautil.com/politica-de-privacidad',
  },
};

export default function PoliticaPrivacidad() {
  return (
    <main className="min-h-[100dvh] bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-100 prose prose-slate max-w-none">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">Política de Privacidad</h1>
        
        <p className="text-sm text-slate-500 mb-8">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Introducción</h2>
        <p>
          Bienvenido a <strong>CajaUtil.com</strong>. Nuestra prioridad fundamental es garantizar la privacidad de nuestros visitantes. 
          Este documento detalla los tipos de información que CajaUtil.com recoge y registra, así como la manera en que la utilizamos.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Herramientas 100% Locales</h2>
        <p>
          La gran mayoría de nuestras herramientas (como la calculadora de sueldo neto, el generador de contraseñas, contador de palabras y generador de códigos QR) 
          funcionan <strong>exclusivamente en tu navegador (lado del cliente o "client-side")</strong>. 
          Esto significa que los textos, contraseñas, contraseñas, contraseñas, o imágenes que subes <strong>no se envían, no se almacenan ni se procesan en nuestros servidores</strong>.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Google AdSense y la Cookie de DoubleClick DART</h2>
        <p>
          Google es uno de los proveedores asociados en nuestro sitio. Google utiliza cookies, conocidas como cookies de DART, 
          para publicar anuncios para los visitantes de nuestro sitio web en función de su visita a CajaUtil.com y otros sitios web en Internet.
        </p>
        <p>
          Sin embargo, los usuarios pueden optar por rechazar el uso de las cookies de DART 
          visitando la Política de privacidad de la red de contenido y de anuncios de Google en la siguiente URL: 
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> https://policies.google.com/technologies/ads</a>.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Nuestros socios publicitarios</h2>
        <p>
          Algunos anunciantes en nuestro sitio pueden utilizar cookies y web beacons. Nuestros socios publicitarios se enumeran a continuación. 
          Cada uno de ellos tiene su propia Política de Privacidad para sus políticas sobre los datos de los usuarios.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Google:</strong> <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
        </ul>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Enlaces de terceros</h2>
        <p>
          A veces, a nuestra discreción, podemos incluir u ofrecer productos o servicios de terceros en nuestro sitio web. 
          Estos sitios de terceros tienen políticas de privacidad separadas e independientes. 
          De todos modos, buscamos proteger la integridad de nuestro sitio y agradecemos cualquier retroalimentación sobre esos sitios.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">6. Conformidad con el Reglamento General de Protección de Datos (RGPD)</h2>
        <p>
          Si te encuentras en el Espacio Económico Europeo (EEE), tienes ciertos derechos sobre la protección de tus datos. 
          Nuestro objetivo en CajaUtil.com es facilitarte tomar medidas razonables para concederte el control, modificación o la capacidad de borrar tus Datos Personales.
        </p>
        <p>
          En este sitio web <strong>no recogemos datos de carácter personal</strong> (nombres, correos, etc.), dado que no contamos con formularios de registro, comentarios ni boletines de suscripción gestionados directamente por nosotros.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">7. Consentimiento</h2>
        <p>
          Al utilizar nuestro sitio web, usted acepta por la presente nuestra Política de Privacidad y sus términos y condiciones.
        </p>
        
        <div className="mt-12 pt-6 border-t border-slate-200 text-center">
            <p className="text-slate-500 font-medium text-sm mb-4">¿Tienes alguna pregunta sobre nuestra política?</p>
            <Link href="/contacto" className="text-blue-600 hover:underline font-bold">Contacta con nosotros</Link>
        </div>
      </div>
    </main>
  );
}
