import Link from 'next/link';
import { Percent, Type, Calculator, KeyRound, ArrowDownAZ, QrCode, ArrowRight, ScanLine, CalendarDays } from 'lucide-react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Herramientas Útiles Online Gratis | Utilidades Web",
  description: "Colección de herramientas gratuitas en tu navegador: calculadora de porcentajes, generador de QR, contador de texto y sueldo neto."
};

export default function Home() {
  const herramientas = [
    {
      titulo: 'Calculadora de Porcentajes',
      descripcion: 'Calcula rápidamente el IVA, descuentos o variaciones porcentuales.',
      ruta: '/calculadora-porcentajes',
      Icono: Percent,
      color: 'from-blue-500 to-indigo-500',
      shadow: 'shadow-blue-500/20'
    },
    {
      titulo: 'Contador de Palabras',
      descripcion: 'Analiza tu texto: palabras, caracteres y tiempo de lectura estimado.',
      ruta: '/contador-de-palabras',
      Icono: Type,
      color: 'from-emerald-400 to-teal-500',
      shadow: 'shadow-emerald-500/20'
    },
    {
      titulo: 'Calculadora de Sueldo Neto',
      descripcion: 'Estima tu sueldo mensual limpio quitando IRPF y retenciones.',
      ruta: '/calculadora-sueldo-neto',
      Icono: Calculator,
      color: 'from-amber-400 to-orange-500',
      shadow: 'shadow-orange-500/20'
    },
    {
      titulo: 'Generador de Contraseñas',
      descripcion: 'Crea contraseñas seguras y aleatorias imposibles de hackear.',
      ruta: '/generador-contrasenas',
      Icono: KeyRound,
      color: 'from-rose-400 to-pink-500',
      shadow: 'shadow-pink-500/20'
    },
    {
      titulo: 'Mayúsculas / Minúsculas',
      descripcion: 'Convierte textos entre diferentes formatos con un solo clic.',
      ruta: '/mayusculas-minusculas',
      Icono: ArrowDownAZ,
      color: 'from-purple-400 to-fuchsia-500',
      shadow: 'shadow-purple-500/20'
    },
    {
      titulo: 'Generador Códigos QR',
      descripcion: 'Convierte cualquier URL o texto en un código QR escaneable.',
      ruta: '/generador-qr',
      Icono: QrCode,
      color: 'from-cyan-400 to-sky-500',
      shadow: 'shadow-cyan-500/20'
    },
    {
      titulo: 'Lector de Fotos QR',
      descripcion: 'Extrae texto y URLs subiendo una imagen de un código QR. 100% privado.',
      ruta: '/lector-qr',
      Icono: ScanLine,
      color: 'from-indigo-400 to-violet-500',
      shadow: 'shadow-indigo-500/20'
    },
    {
      titulo: 'Calculadora de Días',
      descripcion: 'Calcula días, semanas, meses y años entre dos fechas.',
      ruta: '/calculadora-dias',
      Icono: CalendarDays,
      color: 'from-pink-400 to-purple-500',
      shadow: 'shadow-pink-500/20'
    }
  ];

  return (
    <main className="min-h-[100dvh] bg-slate-50/50 text-slate-800 p-6 sm:p-12">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight">
            Utilidades <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Web</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Tu navaja suiza digital. Herramientas rápidas, gratuitas y directas en tu navegador.
          </p>
        </header>

        {/* Grid Minimalista sin Emojis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {herramientas.map((herramienta, index) => {
            const IconComponent = herramienta.Icono;
            return (
              <Link 
                key={index} 
                href={herramienta.ruta}
                className="group relative bg-white rounded-3xl p-6 sm:p-8 hover:-translate-y-2 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col"
              >
                {/* Reflejo Glossy sutil */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
                
                <div className="relative z-20 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-tr ${herramienta.color} text-white shadow-lg ${herramienta.shadow}`}>
                    <IconComponent size={28} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors">
                    {herramienta.titulo}
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed flex-grow">
                    {herramienta.descripcion}
                  </p>
                  
                  <div className="mt-8 flex items-center text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                    <span>Abrir herramienta</span>
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Espacio Publicitario Principal (AdSense) */}
        <div className="mt-20 w-full bg-slate-200/50 border border-slate-300/50 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-slate-400 min-h-[150px]">
          <span className="text-xs uppercase tracking-widest font-bold mb-2 opacity-50">Anuncio</span>
          <p className="font-medium">Espacio reservado para AdSense Banner Multiformato</p>
        </div>

      </div>
    </main>
  );
}
