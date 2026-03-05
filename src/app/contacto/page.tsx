import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | CajaUtil.com',
  description: 'Aporte sugerencias, reporte de errores o escríbalos en CajaUtil.com',
  alternates: {
    canonical: 'https://cajautil.com/contacto',
  },
};

export default function Contacto() {
  return (
    <main className="min-h-[100dvh] bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-100 prose prose-slate max-w-none text-center">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">Contáctanos</h1>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          ¿Has encontrado un error en alguna de nuestras herramientas? ¿Tienes alguna sugerencia para mejorar CajaUtil.com o quieres proponernos una nueva calculadora? 
          ¡Nos encantaría escucharte!
        </p>
        
        <div className="bg-blue-50 border border-blue-100 p-8 rounded-xl max-w-lg mx-auto">
          <p className="text-slate-700 font-medium mb-2">Puedes escribirnos directamente a nuestro correo electrónico:</p>
          <a href="mailto:hola@cajautil.com" className="text-2xl font-black text-blue-600 hover:underline">
            hola@cajautil.com
          </a>
          <p className="text-sm text-slate-500 mt-4">
            Intentamos responder a todos los mensajes en un plazo de 24-48 horas laborables.
          </p>
        </div>

        <div className="mt-12 text-left bg-slate-50 p-6 rounded-xl border border-slate-200">
           <h2 className="text-lg font-bold text-slate-800 mb-2 mt-0">Sobre CajaUtil.com</h2>
           <p className="text-sm text-slate-600 mb-0">
             CajaUtil.com es un proyecto independiente creado con el objetivo de ofrecer herramientas web gratuitas, 
             rápidas y que respeten la privacidad del usuario procesando la información de forma segura en el navegador. 
             Mantenemos los servidores y el desarrollo gracias a los bloques de publicidad.
           </p>
        </div>
      </div>
    </main>
  );
}
