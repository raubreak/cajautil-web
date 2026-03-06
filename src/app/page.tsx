import Link from 'next/link';
import { Percent, Type, Calculator, KeyRound, ArrowDownAZ, QrCode, ArrowRight, ScanLine, CalendarDays, UserPlus, ShieldCheck, Landmark, MessageCircle, Activity, Home as HomeIcon, Image as ImageIcon, Sparkles } from 'lucide-react';
import type { Metadata } from "next";

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Herramientas Online Gratis — Calculadoras, Generadores y Utilidades Web",
  description: "Colección de herramientas gratuitas para tu día a día: calculadora de porcentajes e IVA, generador de QR, contador de palabras, calculadora de sueldo neto y más. Sin registro, directas en tu navegador.",
  keywords: [
    "herramientas online gratis",
    "calculadora online",
    "utilidades web",
    "calculadora porcentajes",
    "generador contraseñas seguras",
    "generador QR online",
    "contador de palabras online",
    "calculadora sueldo neto España",
    "conversor mayúsculas minúsculas",
    "conversor mayúsculas minúsculas",
    "lector QR online",
    "calculadora días entre fechas",
    "validador iban madrid",
    "generador de nombres y apellidos",
    "calculadora iva",
    "calcular hipoteca",
    "enlace whatsapp",
    "calculadora imc",
    "letras raras instagram",
    "compresor webp"
  ],
  alternates: {
    canonical: SITE_URL,
  },
};

// JSON-LD para la ItemList (lista de herramientas)
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Herramientas Online Gratis",
  description: "Colección de herramientas web gratuitas: calculadoras, generadores y conversores.",
  numberOfItems: 16,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Generador de Letras Raras", url: `${SITE_URL}/generador-letras-raras` },
    { "@type": "ListItem", position: 2, name: "Compresor de Imágenes a WebP", url: `${SITE_URL}/compresor-webp` },
    { "@type": "ListItem", position: 3, name: "Calculadora de Hipotecas", url: `${SITE_URL}/calculadora-hipotecas` },
    { "@type": "ListItem", position: 4, name: "Generador Link WhatsApp", url: `${SITE_URL}/generador-enlace-whatsapp` },
    { "@type": "ListItem", position: 5, name: "Calculadora de IMC", url: `${SITE_URL}/calculadora-imc` },
    { "@type": "ListItem", position: 6, name: "Calculadora de Porcentajes", url: `${SITE_URL}/calculadora-porcentajes` },
    { "@type": "ListItem", position: 7, name: "Calculadora de IVA", url: `${SITE_URL}/calculadora-iva` },
    { "@type": "ListItem", position: 8, name: "Contador de Palabras y Caracteres", url: `${SITE_URL}/contador-de-palabras` },
    { "@type": "ListItem", position: 9, name: "Calculadora de Sueldo Neto", url: `${SITE_URL}/calculadora-sueldo-neto` },
    { "@type": "ListItem", position: 10, name: "Validador de IBAN", url: `${SITE_URL}/validador-iban` },
    { "@type": "ListItem", position: 11, name: "Generador de Contraseñas Seguras", url: `${SITE_URL}/generador-contrasenas` },
    { "@type": "ListItem", position: 12, name: "Generador de Nombres", url: `${SITE_URL}/generador-nombres` },
    { "@type": "ListItem", position: 13, name: "Conversor Mayúsculas Minúsculas", url: `${SITE_URL}/mayusculas-minusculas` },
    { "@type": "ListItem", position: 14, name: "Generador de Códigos QR", url: `${SITE_URL}/generador-qr` },
    { "@type": "ListItem", position: 15, name: "Lector de Códigos QR", url: `${SITE_URL}/lector-qr` },
    { "@type": "ListItem", position: 16, name: "Calculadora de Días entre Fechas", url: `${SITE_URL}/calculadora-dias` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Las herramientas de CajaUtil.com son realmente gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, todas las herramientas son 100% gratuitas, sin registro, sin límites de uso y sin necesidad de instalar nada. Funcionan directamente en tu navegador.",
      },
    },
    {
      "@type": "Question",
      name: "¿Es seguro usar el generador de contraseñas online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutamente. Las contraseñas se generan localmente en tu navegador y nunca se envían por internet. Tu contraseña no sale de tu dispositivo.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo usar estas herramientas desde el móvil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, todas las herramientas están optimizadas para funcionar perfectamente en móvil, tablet y ordenador.",
      },
    },
    {
      "@type": "Question",
      name: "¿Necesito crear una cuenta para usar las herramientas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, no necesitas crear ninguna cuenta ni registrarte. Todas las herramientas están disponibles al instante sin ningún tipo de registro.",
      },
    },
  ],
};

export default function Home() {
  const herramientas = [
    {
      titulo: 'Letras para Instagram',
      descripcion: 'Transforma palabras en fuentes góticas o estéticas para tu biografía y TikTok.',
      ruta: '/generador-letras-raras',
      Icono: Sparkles,
      color: 'from-purple-500 to-fuchsia-600',
      shadow: 'shadow-purple-500/20'
    },
    {
      titulo: 'Compresor WebP',
      descripcion: 'Reduce fotos un 80% convirtiendo de JPG/PNG a WebP sin usar servidores.',
      ruta: '/compresor-webp',
      Icono: ImageIcon,
      color: 'from-sky-400 to-indigo-500',
      shadow: 'shadow-indigo-500/20'
    },
    {
      titulo: 'Calculadora de Hipotecas',
      descripcion: 'Calcula online la cuota mensual de tu préstamo con el cuadro de amortización completo.',
      ruta: '/calculadora-hipotecas',
      Icono: HomeIcon,
      color: 'from-sky-500 to-blue-600',
      shadow: 'shadow-sky-500/20'
    },
    {
      titulo: 'Generador WhatsApp',
      descripcion: 'Crea un link directo a tu chat con mensaje predefinido para Instagram o TikTok.',
      ruta: '/generador-enlace-whatsapp',
      Icono: MessageCircle,
      color: 'from-green-400 to-emerald-500',
      shadow: 'shadow-green-500/20'
    },
    {
      titulo: 'Calculadora de IMC',
      descripcion: 'Descubre tu Índice de Masa Corporal de manera anónima y compara con la OMS.',
      ruta: '/calculadora-imc',
      Icono: Activity,
      color: 'from-rose-500 to-pink-600',
      shadow: 'shadow-rose-500/20'
    },
    {
      titulo: 'Calculadora de Porcentajes',
      descripcion: 'Calcula rápidamente el IVA, descuentos, propinas o variaciones porcentuales de cualquier cantidad.',
      ruta: '/calculadora-porcentajes',
      Icono: Percent,
      color: 'from-blue-500 to-indigo-500',
      shadow: 'shadow-blue-500/20'
    },
    {
      titulo: 'Calculadora de IVA',
      descripcion: 'Calcula sumas, restas y base imponible del IVA con desglose de cuotas en un click.',
      ruta: '/calculadora-iva',
      Icono: Landmark,
      color: 'from-amber-400 to-yellow-500',
      shadow: 'shadow-yellow-500/20'
    },
    {
      titulo: 'Contador de Palabras',
      descripcion: 'Analiza tu texto al instante: número de palabras, caracteres, espacios y tiempo de lectura estimado.',
      ruta: '/contador-de-palabras',
      Icono: Type,
      color: 'from-emerald-400 to-teal-500',
      shadow: 'shadow-emerald-500/20'
    },
    {
      titulo: 'Calculadora de Sueldo Neto',
      descripcion: 'Estima tu sueldo mensual neto a partir del bruto anual, con IRPF y Seguridad Social en España 2026.',
      ruta: '/calculadora-sueldo-neto',
      Icono: Calculator,
      color: 'from-amber-400 to-orange-500',
      shadow: 'shadow-orange-500/20'
    },
    {
      titulo: 'Validador de IBAN',
      descripcion: 'Validador algorítmico MOD 97 para cuentas bancarias europeas. Privado y 100% offline.',
      ruta: '/validador-iban',
      Icono: ShieldCheck,
      color: 'from-indigo-400 to-indigo-600',
      shadow: 'shadow-indigo-500/20'
    },
    {
      titulo: 'Generador de Contraseñas',
      descripcion: 'Crea contraseñas seguras y aleatorias con la longitud y complejidad que elijas. 100% offline.',
      ruta: '/generador-contrasenas',
      Icono: KeyRound,
      color: 'from-rose-400 to-pink-500',
      shadow: 'shadow-pink-500/20'
    },
    {
      titulo: 'Generador de Nombres',
      descripcion: 'Crea identidades, nombres masculinos, femeninos y apellidos al azar para personajes o pruebas.',
      ruta: '/generador-nombres',
      Icono: UserPlus,
      color: 'from-teal-400 to-emerald-500',
      shadow: 'shadow-teal-500/20'
    },
    {
      titulo: 'Convertidor Mayúsculas / Minúsculas',
      descripcion: 'Convierte textos a MAYÚSCULAS, minúsculas, capitalizado o formato oración con un solo clic.',
      ruta: '/mayusculas-minusculas',
      Icono: ArrowDownAZ,
      color: 'from-purple-400 to-fuchsia-500',
      shadow: 'shadow-purple-500/20'
    },
    {
      titulo: 'Generador de Códigos QR',
      descripcion: 'Convierte cualquier URL o texto en un código QR personalizable. Descarga en PNG de alta resolución.',
      ruta: '/generador-qr',
      Icono: QrCode,
      color: 'from-cyan-400 to-sky-500',
      shadow: 'shadow-cyan-500/20'
    },
    {
      titulo: 'Lector de Códigos QR',
      descripcion: 'Sube una foto de un QR y extrae su contenido al instante. 100% privado, sin enviar nada al servidor.',
      ruta: '/lector-qr',
      Icono: ScanLine,
      color: 'from-indigo-400 to-violet-500',
      shadow: 'shadow-indigo-500/20'
    },
    {
      titulo: 'Calculadora de Días entre Fechas',
      descripcion: 'Calcula la diferencia exacta en días, semanas, meses y años entre dos fechas.',
      ruta: '/calculadora-dias',
      Icono: CalendarDays,
      color: 'from-pink-400 to-purple-500',
      shadow: 'shadow-pink-500/20'
    }
  ];

  return (
    <main className="min-h-[100dvh] bg-slate-50/50 text-slate-800 p-6 sm:p-12">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-6xl mx-auto">
        
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight">
            Herramientas Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Gratis</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Tu navaja suiza digital. Calculadoras, generadores y conversores rápidos, gratuitos y directos en tu navegador. Sin registro.
          </p>
        </header>

        {/* Grid de Herramientas */}
        <section aria-label="Lista de herramientas disponibles">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {herramientas.map((herramienta, index) => {
              const IconComponent = herramienta.Icono;
              return (
                <Link 
                  key={index} 
                  href={herramienta.ruta}
                  className="group relative bg-white rounded-3xl p-6 sm:p-8 hover:-translate-y-2 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col"
                  title={herramienta.titulo}
                >
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
                      <span>Usar herramienta gratis</span>
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Sección SEO — Contenido para posicionamiento */}
        <section className="mt-20 max-w-4xl mx-auto" aria-label="Información sobre nuestras herramientas">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-6 text-center">
            ¿Por qué usar nuestras herramientas online?
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              En <strong>CajaUtil.com</strong> reunimos las <strong>herramientas online más útiles</strong> para tu día a día, 
              desde <Link href="/calculadora-porcentajes" className="text-blue-600 font-semibold hover:underline">calculadoras de porcentajes</Link> para 
              saber cuánto IVA tiene un producto, hasta un <Link href="/generador-contrasenas" className="text-blue-600 font-semibold hover:underline">generador de contraseñas seguras</Link> que 
              funciona sin conexión a internet.
            </p>
            <p>
              Si necesitas <Link href="/calculadora-sueldo-neto" className="text-blue-600 font-semibold hover:underline">calcular tu sueldo neto</Link> a 
              partir del bruto anual con las retenciones de IRPF y Seguridad Social en España, nuestra calculadora te da una estimación fiable al instante. 
              ¿Escribes contenido? Usa nuestro <Link href="/contador-de-palabras" className="text-blue-600 font-semibold hover:underline">contador de palabras y caracteres</Link> para 
              controlar la extensión de tus textos.
            </p>
            <p>
              Todas las herramientas son <strong>100% gratuitas</strong>, funcionan <strong>directamente en tu navegador</strong> sin enviar datos a ningún servidor, 
              y están optimizadas para móvil, tablet y ordenador. No necesitas crear cuenta, instalar nada ni dar tu email.
            </p>
          </div>
        </section>

        {/* Sección FAQ — Rich Snippets */}
        <section className="mt-16 max-w-4xl mx-auto mb-12" aria-label="Preguntas frecuentes">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-8 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {[
              {
                pregunta: "¿Las herramientas de CajaUtil.com son realmente gratis?",
                respuesta: "Sí, todas las herramientas son 100% gratuitas, sin registro, sin límites de uso y sin necesidad de instalar nada. Funcionan directamente en tu navegador."
              },
              {
                pregunta: "¿Es seguro usar el generador de contraseñas online?",
                respuesta: "Absolutamente. Las contraseñas se generan localmente en tu navegador y nunca se envían por internet. Tu contraseña no sale de tu dispositivo."
              },
              {
                pregunta: "¿Puedo usar estas herramientas desde el móvil?",
                respuesta: "Sí, todas las herramientas están optimizadas para funcionar perfectamente en móvil, tablet y ordenador."
              },
              {
                pregunta: "¿Necesito crear una cuenta para usar las herramientas?",
                respuesta: "No, no necesitas crear ninguna cuenta ni registrarte. Todas las herramientas están disponibles al instante sin ningún tipo de registro."
              },
            ].map((faq, index) => (
              <details key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
                <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer font-bold text-slate-800 hover:text-blue-600 transition-colors">
                  <h3 className="text-base font-bold pr-4">{faq.pregunta}</h3>
                  <span className="text-blue-500 text-xl shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 leading-relaxed">
                  <p>{faq.respuesta}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
