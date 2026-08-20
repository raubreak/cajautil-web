import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
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
        
        <p className="text-sm text-slate-500 mb-8">Última actualización: 20/08/2026</p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Introducción</h2>
        <p>
          Bienvenido a <strong>CajaUtil.com</strong>. Nuestra prioridad fundamental es garantizar la privacidad de nuestros visitantes. 
          Este documento detalla los tipos de información que CajaUtil.com recoge y registra, así como la manera en que la utilizamos.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Herramientas con procesamiento local</h2>
        <p>
          La gran mayoría de nuestras herramientas (como la calculadora de sueldo neto, el generador de contraseñas, contador de palabras y generador de códigos QR) 
          funcionan <strong>exclusivamente en tu navegador (lado del cliente o client-side)</strong>. 
          Esto significa que los textos, contraseñas o imágenes que introduces en estas utilidades <strong>no se envían, no se almacenan ni se procesan en nuestros servidores</strong> cuando la funcionalidad puede ejecutarse localmente.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Analítica, publicidad y consentimiento</h2>
        <p>
          CajaUtil.com puede utilizar <strong>Google Analytics</strong> para medir el uso del sitio después del consentimiento.
          Esta tecnología puede recoger identificadores online, datos técnicos del dispositivo, información básica de navegación y eventos de uso.
        </p>
        <p>
          Puedes <strong>aceptar o rechazar las tecnologías no esenciales</strong> mediante el aviso de consentimiento de CajaUtil.
          La publicidad de terceros está desactivada mientras no podamos garantizar formatos no intrusivos.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Servicios de analítica de terceros</h2>
        <p>
          Si aceptas la analítica, Google Analytics puede tratar datos técnicos y de navegación conforme a su propia política de privacidad.
          No cargamos redes publicitarias de terceros mientras esos formatos permanezcan desactivados.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Google Analytics:</strong> <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
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
          No solicitamos cuentas de usuario ni formularios de registro propios para acceder a las herramientas. Aun asi, determinados terceros integrados en la web
          pueden tratar datos tecnicos o identificadores online conforme a sus propias politicas y a tu estado de consentimiento.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">7. Consentimiento</h2>
        <p>
          El uso de tecnologías no esenciales depende de la elección realizada en el aviso de consentimiento. Rechazarlas no impide utilizar las herramientas de CajaUtil.
        </p>
        
        <div className="mt-12 pt-6 border-t border-slate-200 text-center">
            <p className="text-slate-500 font-medium text-sm mb-4">¿Tienes alguna pregunta sobre nuestra política?</p>
            <Link href="/contacto" className="text-blue-600 hover:underline font-bold">Contacta con nosotros</Link>
        </div>
      </div>
    </main>
  );
}
