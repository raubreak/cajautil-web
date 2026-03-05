import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Script from 'next/script';

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
    { nombre: "Calculadora %", ruta: "/calculadora-porcentajes" },
    { nombre: "Contador Palabras", ruta: "/contador-de-palabras" },
    { nombre: "Sueldo Neto", ruta: "/calculadora-sueldo-neto" },
    { nombre: "Contraseñas", ruta: "/generador-contrasenas" },
    { nombre: "Mayúsculas", ruta: "/mayusculas-minusculas" },
    { nombre: "Generador QR", ruta: "/generador-qr" },
    { nombre: "Lector QR", ruta: "/lector-qr" },
    { nombre: "Calculadora Días", ruta: "/calculadora-dias" },
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
              <span className="text-xs text-slate-300">+3 más</span>
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
                  <li><Link href="/calculadora-porcentajes" className="text-sm hover:text-white transition-colors">Calculadora de Porcentajes</Link></li>
                  <li><Link href="/calculadora-sueldo-neto" className="text-sm hover:text-white transition-colors">Calculadora de Sueldo Neto</Link></li>
                  <li><Link href="/calculadora-dias" className="text-sm hover:text-white transition-colors">Calculadora de Días</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Generadores</h3>
                <ul className="space-y-2">
                  <li><Link href="/generador-contrasenas" className="text-sm hover:text-white transition-colors">Generador de Contraseñas</Link></li>
                  <li><Link href="/generador-qr" className="text-sm hover:text-white transition-colors">Generador de QR</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Texto</h3>
                <ul className="space-y-2">
                  <li><Link href="/contador-de-palabras" className="text-sm hover:text-white transition-colors">Contador de Palabras</Link></li>
                  <li><Link href="/mayusculas-minusculas" className="text-sm hover:text-white transition-colors">Mayúsculas / Minúsculas</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Escáner</h3>
                <ul className="space-y-2">
                  <li><Link href="/lector-qr" className="text-sm hover:text-white transition-colors">Lector de Códigos QR</Link></li>
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
