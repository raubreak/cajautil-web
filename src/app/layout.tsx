import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Script from 'next/script';
import Header from "@/components/Header";
import CookieConsent from "@/components/CookieConsent";
import ToolEditorialRouterSection from "@/components/ToolEditorialRouterSection";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://cajautil.com";
const SITE_NAME = "CajaUtil.com";
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;

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
    google: GOOGLE_SITE_VERIFICATION,
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
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="monetag" content="bda98a4f7815b78b4105e11fafe02a7c" />
        <script
          src="https://quge5.com/88/tag.min.js"
          data-zone="229851"
          async
          data-cfasync="false"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Google Consent Mode v2 - must load BEFORE gtag/AdSense */}
        <Script id="consent-mode-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500,
            });
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8447027631025094"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3Q52JTD2XN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3Q52JTD2XN', {
              anonymize_ip: true,
              allow_google_signals: false
            });
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <Header />

        <div className="flex-grow flex flex-col z-10 relative">
          {children}
        </div>

        <ToolEditorialRouterSection />

        <CookieConsent />

        <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-auto relative z-10" aria-label="Pie de página">
          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <div className="col-span-2">
                <Link href="/" className="text-2xl font-black tracking-tighter text-white mb-4 block">
                  Caja<span className="text-blue-500">Util</span><span className="text-slate-500 text-sm font-medium">.com</span>
                </Link>
                <p className="text-sm max-w-xs leading-relaxed">
                  Utilidades web rapidas y seguras. Priorizamos el procesamiento local cuando es posible, sin registro ni instalacion.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Reloj / Juegos</h3>
                <ul className="space-y-2">
                  <li><Link href="/temporizador" className="text-sm hover:text-white transition-colors">Temporizador / Alarma</Link></li>
                  <li><Link href="/cronometro" className="text-sm hover:text-white transition-colors">Cronómetro Online</Link></li>
                  <li><Link href="/ruleta-aleatoria" className="text-sm hover:text-white transition-colors">Ruleta Aleatoria</Link></li>
                  <li><Link href="/cps-test" className="text-sm hover:text-white transition-colors">CPS Test (Clicks)</Link></li>
                  <li><Link href="/generador-letras-raras" className="text-sm hover:text-white transition-colors">Letras Raras para Insta</Link></li>
                  <li><Link href="/simbolos-copiar" className="text-sm hover:text-white transition-colors">Símbolos para Copiar</Link></li>
                  <li><Link href="/texto-invisible" className="text-sm hover:text-white transition-colors">Texto Invisible</Link></li>
                  <li><Link href="/generador-enlace-whatsapp" className="text-sm hover:text-white transition-colors">Link de WhatsApp</Link></li>
                  <li><Link href="/generador-nombres" className="text-sm hover:text-white transition-colors">Generador de Nombres</Link></li>
                  <li><Link href="/generador-contrasenas" className="text-sm hover:text-white transition-colors">Generador de Contraseñas</Link></li>
                  <li><Link href="/generador-hashtags" className="text-sm hover:text-white transition-colors">Generador de Hashtags</Link></li>
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
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Negocios</h3>
                <ul className="space-y-2">
                  <li><Link href="/generador-firmas-email" className="text-sm hover:text-white transition-colors">Firmas de Email</Link></li>
                  <li><Link href="/generador-qr" className="text-sm hover:text-white transition-colors">Generador QR</Link></li>
                  <li><Link href="/lector-qr" className="text-sm hover:text-white transition-colors">Lector QR</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Finanzas</h3>
                <ul className="space-y-2">
                  <li><Link href="/calculadora-sueldo-neto" className="text-sm hover:text-white transition-colors">Sueldo Neto</Link></li>
                  <li><Link href="/calculadora-iva" className="text-sm hover:text-white transition-colors">Calculadora IVA</Link></li>
                  <li><Link href="/calculadora-prestamos" className="text-sm hover:text-white transition-colors">Simulador Préstamos</Link></li>
                  <li><Link href="/validador-iban" className="text-sm hover:text-white transition-colors">Validador IBAN</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Imágenes & Escáner</h3>
                <ul className="space-y-2">
                  <li><Link href="/extractor-colores" className="text-sm hover:text-white transition-colors">Extractor de Colores</Link></li>
                  <li><Link href="/compresor-webp" className="text-sm hover:text-white transition-colors">Convertir a WebP</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Legal e Info</h3>
                <ul className="space-y-2">
                  <li><Link href="/articulos" className="text-sm hover:text-white transition-colors">Guias y articulos</Link></li>
                  <li><Link href="/sobre-nosotros" className="text-sm hover:text-white transition-colors">Sobre nosotros</Link></li>
                  <li><Link href="/aviso-legal" className="text-sm hover:text-white transition-colors">Aviso Legal</Link></li>
                   <li><Link href="/politica-de-privacidad" className="text-sm hover:text-white transition-colors">Política de Privacidad</Link></li>
                   <li><Link href="/politica-de-cookies" className="text-sm hover:text-white transition-colors">Política de Cookies</Link></li>
                   <li><Link href="/contacto" className="text-sm hover:text-white transition-colors">Contacto</Link></li>
                 </ul>
               </div>
             </div>
            
            <div className="border-t border-slate-800 pt-8 text-center text-sm">
              <p>© {new Date().getFullYear()} CajaUtil.com — Herramientas online 100% gratuitas.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
