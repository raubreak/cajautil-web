import Link from 'next/link';

export default function Home() {
  const herramientas = [
    {
      titulo: 'Calculadora de Porcentajes',
      descripcion: 'Calcula rápidadmente el IVA, descuentos o variaciones porcentuales.',
      ruta: '/calculadora-porcentajes',
      icono: '💯',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      titulo: 'Contador de Palabras',
      descripcion: 'Analiza tu texto: palabras, caracteres y tiempo de lectura estimado.',
      ruta: '#', // TODO: Crear página
      icono: '📝',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      titulo: 'Calculadora de Sueldo Neto',
      descripcion: 'Estima tu sueldo mensual limpio quitando IRPF y retenciones.',
      ruta: '#', // TODO: Formulario
      icono: '💶',
      color: 'from-amber-400 to-orange-500'
    },
    {
      titulo: 'Password Generator',
      descripcion: 'Crea contraseñas seguras y aleatorias imposibles de hackear.',
      ruta: '#',
      icono: '🔐',
      color: 'from-rose-400 to-pink-500'
    },
    {
      titulo: 'Mayúsculas / Minúsculas',
      descripcion: 'Convierte textos entre diferentes formatos con un solo clic.',
      ruta: '#',
      icono: '🔠',
      color: 'from-purple-400 to-fuchsia-500'
    },
    {
      titulo: 'Generador Códigos QR',
      descripcion: 'Convierte cualquier URL o texto en un código QR escaneable.',
      ruta: '#',
      icono: '📱',
      color: 'from-cyan-400 to-sky-500'
    }
  ];

  return (
    <main className="min-h-[100dvh] bg-slate-50 text-slate-800 p-6 sm:p-12">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight">
            Utilidades <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Web</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Tu navaja suiza digital. Herramientas rápidas, gratuitas y directas en tu navegador.
          </p>
        </header>

        {/* Grid Glossy Moderno */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {herramientas.map((herramienta, index) => (
            <Link 
              key={index} 
              href={herramienta.ruta}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden"
            >
              {/* Reflejo Glossy (Elemento decorativo) */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none rounded-t-3xl"></div>
              
              <div className="relative z-20">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm bg-gradient-to-tr ${herramienta.color} text-white`}>
                  {herramienta.icono}
                </div>
                <h2 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors">
                  {herramienta.titulo}
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {herramienta.descripcion}
                </p>
                
                <div className="mt-8 flex items-center text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  Usar herramienta 
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}
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