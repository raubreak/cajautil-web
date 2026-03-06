import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Generador de Lorem Ipsum Online | Texto de Prueba Gratis',
  description: 'Genera texto Lorem Ipsum para tus diseños web y maquetaciones. Elige párrafos, palabras o listas. Copia y pega al instante sin registro. Ideal para developers y diseñadores.',
  keywords: [
    "lorem ipsum",
    "generador lorem ipsum",
    "texto de prueba",
    "lorem ipsum español",
    "generador texto relleno",
    "dummy text generator",
    "texto de ejemplo web"
  ],
  alternates: { canonical: `${SITE_URL}/generador-lorem-ipsum` },
  openGraph: {
    title: 'Generador de Lorem Ipsum — Texto de Prueba para Diseño',
    description: 'Genera texto de relleno personalizable para tus proyectos de diseño o desarrollo.',
    url: `${SITE_URL}/generador-lorem-ipsum`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generador de Lorem Ipsum",
  url: `${SITE_URL}/generador-lorem-ipsum`,
  description: "Herramienta online para generar texto de relleno Lorem Ipsum configurable por párrafos, palabras o listas.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
