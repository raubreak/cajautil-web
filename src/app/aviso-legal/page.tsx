
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aviso Legal | CajaUtil.com',
  description: 'Información legal, términos de uso y responsabilidad de CajaUtil.com.',
  alternates: {
    canonical: 'https://cajautil.com/aviso-legal',
  },
};

export default function AvisoLegal() {
  return (
    <main className="min-h-[100dvh] bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-100 prose prose-slate max-w-none">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">Aviso Legal</h1>
        
        <p className="text-sm text-slate-500 mb-8">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Datos Identificativos</h2>
        <p>
          En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, 
          de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos:
        </p>
        <p>
          El sitio web <strong>CajaUtil.com</strong> es un proyecto digital independiente. 
          Para cualquier consulta o contacto, puede dirigirse a: <a href="mailto:hola@cajautil.com" className="text-blue-600 hover:underline">hola@cajautil.com</a>.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Usuarios y Uso del Portal</h2>
        <p>
          El acceso y/o uso de este portal de CajaUtil.com atribuye la condición de USUARIO, que acepta, de pleno derecho, 
          las Condiciones Generales de Uso aquí reflejadas.
        </p>
        <p>
          CajaUtil.com proporciona el acceso a multitud de herramientas e informaciones (en adelante, "los contenidos") 
          en Internet pertenecientes a CajaUtil.com. El USUARIO asume la responsabilidad del uso del portal.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Exclusión de Garantías y Responsabilidad</h2>
        <p>
          CajaUtil.com no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, 
          a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas 
          maliciosos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
        </p>
        <p>
          Los resultados proporcionados por las herramientas (calculadoras, generadores, etc.) son <strong>meramente informativos y orientativos</strong>. 
          CajaUtil.com no garantiza la exactitud absoluta de los cálculos ni se responsabiliza de las decisiones tomadas en base a los mismos.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Propiedad Intelectual e Industrial</h2>
        <p>
          CajaUtil.com por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, 
          así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, 
          combinaciones de colores, estructura y diseño, selección de materiales usados, etc.).
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Enlaces</h2>
        <p>
          En el caso de que en CajaUtil.com se dispusiesen enlaces o hipervínculos hacía otros sitios de Internet, 
          CajaUtil.com no ejercerá ningún tipo de control sobre dichos sitios y contenidos. 
          En ningún caso CajaUtil.com asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">6. Legislación Aplicable y Jurisdicción</h2>
        <p>
          La relación entre CajaUtil.com y el USUARIO se regirá por la normativa española vigente y cualquier controversia 
          se someterá a los Juzgados y tribunales competentes según la legislación aplicable.
        </p>

        <div className="mt-12 pt-6 border-t border-slate-200 text-center flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/politica-de-privacidad" className="text-slate-500 hover:text-blue-600 text-sm">Política de Privacidad</Link>
            <Link href="/politica-de-cookies" className="text-slate-500 hover:text-blue-600 text-sm">Política de Cookies</Link>
            <Link href="/contacto" className="text-slate-500 hover:text-blue-600 text-sm">Contacto</Link>
        </div>
      </div>
    </main>
  );
}
