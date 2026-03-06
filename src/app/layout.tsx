import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Script from 'next/script';
import SearchModal from '@/components/SearchModal';

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://cajautil.com";
const SITE_NAME = "CajaUtil.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Herramientas Online Gratis | Calculadoras y Utilidades Web - CajaUtil.com",
    template: "%s | CajaUtil.com"
  },
  description: "Herramientas online gratuitas: calculadora de porcentajes, sueldo neto, generador de contraseñas, códigos QR, contador de palabras y más. Sin registro, rápidas y seguras.",
  keywords: [
    "herramientas online gratis",
    "calculadora online",
    "calculadora de porcentajes",
    "contador de palabras",
    "generador de contraseñas",
    "generador QR",
    "calcular sueldo neto",
    "convertir mayúsculas minúsculas",
    "calculadora de días",
    "herramientas web gratuitas",
    "utilidades online"
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Herramientas Online Gratis | Calculadoras y Utilidades Web",
    description: "Tu navaja suiza digital. Calculadoras, generadores y conversores gratuitos directamente en tu navegador. Sin registro ni instalación.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CajaUtil.com - Herramientas Online Gratis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Herramientas Online Gratis | CajaUtil.com",
    description: "Calculadoras, generadores y conversores 100% gratuitos en tu navegador.",
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Sustituir con tu ID real cuando des de alta Google Search Console
    // google: "tu-codigo-verificacion-google",
  },
  category: "technology",
};

// JSON-LD para el sitio web completo
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Herramientas online gratuitas: calculadoras, generadores y conversores.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const herramientasNav = [
    { nombre: "Colores", ruta: "/extractor-colores" },
    { nombre: "Temporizador", ruta: "/temporizador" },
    { nombre: "Descuentos", ruta: "/calculadora-descuentos" },
    { nombre: "Ruleta", ruta: "/ruleta-aleatoria" },
    { nombre: "Binario/Morse", ruta: "/traductor-binario" },
    { nombre: "Símbolos", ruta: "/simbolos-copiar" },
    { nombre: "Texto Invisible", ruta: "/texto-invisible" },
    { nombre: "CPS Test", ruta: "/cps-test" },
    { nombre: "Edad Exacta", ruta: "/calculadora-edad" },
    { nombre: "WebP", ruta: "/compresor-webp" },
    { nombre: "Regla de 3", ruta: "/calculadora-regla-de-tres" },
    { nombre: "Hipotecas", ruta: "/calculadora-hipotecas" },
    { nombre: "Link WhatsApp", ruta: "/generador-enlace-whatsapp" },
    { nombre: "IMC", ruta: "/calculadora-imc" },
    { nombre: "Calculadora %", ruta: "/calculadora-porcentajes" },
    { nombre: "Sueldo Neto", ruta: "/calculadora-sueldo-neto" },
    { nombre: "Calculadora IVA", ruta: "/calculadora-iva" },
    { nombre: "Validador IBAN", ruta: "/validador-iban" },
    { nombre: "Contraseñas", ruta: "/generador-contrasenas" },
    { nombre: "Generador Nombres", ruta: "/generador-nombres" },
    { nombre: "Contador Palabras", ruta: "/contador-de-palabras" },
    { nombre: "Letras Raras", ruta: "/generador-letras-raras" },
    { nombre: "Mayúsculas", ruta: "/mayusculas-minusculas" },
    { nombre: "Generador QR", ruta: "/generador-qr" },
    { nombre: "Lector QR", ruta: "/lector-qr" },
    { nombre: "Calculadora Días", ruta: "/calculadora-dias" },
    { nombre: "Lorem Ipsum", ruta: "/generador-lorem-ipsum" },
    { nombre: "Unidades", ruta: "/conversor-unidades" },
    { nombre: "Calorías", ruta: "/calculadora-calorias" },
    { nombre: "Hashtags", ruta: "/generador-hashtags" },
  ];

  return (
    <html lang="es">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8447027631025094"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3Q52JTD2XN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3Q52JTD2XN');
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <nav className="w-full bg-white border-b border-slate-200 px-6 py-4 shadow-sm z-50 relative" aria-label="Navegación principal">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-black tracking-tighter text-slate-800 hover:opacity-80 transition-opacity" aria-label="Ir a la página de inicio">
              Caja<span className="text-blue-600">Util</span><span className="text-slate-400 text-sm font-medium">.com</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {herramientasNav.slice(0, 5).map((item) => (
                <Link 
                  key={item.ruta} 
                  href={item.ruta} 
                  className="text-xs font-semibold text-slate-500 hover:text-blue-600 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
                >
                  {item.nombre}
                </Link>
              ))}
              <SearchModal />
            </div>
            <div className="md:hidden">
              <SearchModal />
            </div>
          </div>
        </nav>

        <div className="flex-grow flex flex-col z-10 relative">
          {children}
        </div>

        <footer className="bg-slate-900 text-slate-400 py-16 mt-auto">
          <div className="max-w-6xl mx-auto px-6">
            {/* Footer Links Grid — Internal Linking para SEO */}
            <nav className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10" aria-label="Herramientas disponibles">
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Calculadoras</h3>
                <ul className="space-y-2">
                  <li><Link href="/calculadora-descuentos" className="text-sm hover:text-white transition-colors">Calculadora de Descuentos</Link></li>
                  <li><Link href="/calculadora-regla-de-tres" className="text-sm hover:text-white transition-colors">Calculadora Regla de 3</Link></li>
                  <li><Link href="/calculadora-porcentajes" className="text-sm hover:text-white transition-colors">Calculadora de Porcentajes</Link></li>
                  <li><Link href="/calculadora-iva" className="text-sm hover:text-white transition-colors">Calculadora de IVA</Link></li>
                  <li><Link href="/calculadora-hipotecas" className="text-sm hover:text-white transition-colors">Calculadora de Hipotecas</Link></li>
                  <li><Link href="/calculadora-imc" className="text-sm hover:text-white transition-colors">Calculadora de IMC</Link></li>
                  <li><Link href="/calculadora-sueldo-neto" className="text-sm hover:text-white transition-colors">Calculadora de Sueldo Neto</Link></li>
                  <li><Link href="/calculadora-edad" className="text-sm hover:text-white transition-colors">Calculadora de Edad</Link></li>
                  <li><Link href="/calculadora-calorias" className="text-sm hover:text-white transition-colors">Calculadora de Calorías</Link></li>
                  <li><Link href="/conversor-unidades" className="text-sm hover:text-white transition-colors">Conversor de Unidades</Link></li>
                  <li><Link href="/calculadora-dias" className="text-sm hover:text-white transition-colors">Calculadora de Días</Link></li>
                  <li><Link href="/validador-iban" className="text-sm hover:text-white transition-colors">Validador de IBAN</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Generadores</h3>
                <ul className="space-y-2">
                  <li><Link href="/temporizador" className="text-sm hover:text-white transition-colors">Temporizador & Alarma</Link></li>
                  <li><Link href="/ruleta-aleatoria" className="text-sm hover:text-white transition-colors">Ruleta Aleatoria</Link></li>
                  <li><Link href="/cps-test" className="text-sm hover:text-white transition-colors">CPS Test (Clicks)</Link></li>
                  <li><Link href="/generador-letras-raras" className="text-sm hover:text-white transition-colors">Letras Raras para Insta</Link></li>
                  <li><Link href="/simbolos-copiar" className="text-sm hover:text-white transition-colors">Símbolos para Copiar</Link></li>
                  <li><Link href="/texto-invisible" className="text-sm hover:text-white transition-colors">Texto Invisible</Link></li>
                  <li><Link href="/generador-enlace-whatsapp" className="text-sm hover:text-white transition-colors">Link de WhatsApp</Link></li>
                  <li><Link href="/generador-nombres" className="text-sm hover:text-white transition-colors">Generador de Nombres</Link></li>
                  <li><Link href="/generador-contrasenas" className="text-sm hover:text-white transition-colors">Generador de Contraseñas</Link></li>
                  <li><Link href="/generador-hashtags" className="text-sm hover:text-white transition-colors">Generador de Hashtags</Link></li>
                  <li><Link href="/generador-qr" className="text-sm hover:text-white transition-colors">Generador de QR</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Texto</h3>
                <ul className="space-y-2">
                  <li><Link href="/contador-de-palabras" className="text-sm hover:text-white transition-colors">Contador de Palabras</Link></li>
                  <li><Link href="/traductor-binario" className="text-sm hover:text-white transition-colors">Traductor Binario/Morse</Link></li>
                  <li><Link href="/generador-lorem-ipsum" className="text-sm hover:text-white transition-colors">Generador Lorem Ipsum</Link></li>
                  <li><Link href="/mayusculas-minusculas" className="text-sm hover:text-white transition-colors">Mayúsculas / Minúsculas</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Imágenes & Escáner</h3>
                <ul className="space-y-2">
                  <li><Link href="/extractor-colores" className="text-sm hover:text-white transition-colors">Extractor de Colores</Link></li>
                  <li><Link href="/compresor-webp" className="text-sm hover:text-white transition-colors">Convertir a WebP</Link></li>
                  <li><Link href="/lector-qr" className="text-sm hover:text-white transition-colors">Lector de Códigos QR</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/politica-de-privacidad" className="text-sm hover:text-white transition-colors">Política de Privacidad</Link></li>
                  <li><Link href="/politica-de-cookies" className="text-sm hover:text-white transition-colors">Política de Cookies</Link></li>
                  <li><Link href="/contacto" className="text-sm hover:text-white transition-colors">Contacto</Link></li>
                </ul>
              </div>
            </nav>
            
            <div className="border-t border-slate-800 pt-8 text-center text-sm">
              <p>© {new Date().getFullYear()} CajaUtil.com — Herramientas online 100% gratuitas.</p>
              <p className="mt-2 text-slate-500">Todas las herramientas funcionan en tu navegador. Tu privacidad, primero.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
