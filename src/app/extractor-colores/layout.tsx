import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Extractor de Colores de Imagen | Paleta de Colores Online',
  description: 'Sube una foto y extrae automáticamente sus colores principales en formato HEX y RGB. Herramienta gratuita para diseñadores y desarrolladores.',
  keywords: [
    "extractor de colores",
    "sacar colores de imagen",
    "paleta de colores desde foto",
    "color picker online",
    "identificador de colores",
    "códigos hex imagen",
    "herramientas diseño"
  ],
  alternates: {
    canonical: `${SITE_URL}/extractor-colores`,
  },
  openGraph: {
    title: 'Extractor de Colores de Imagen Online Gratis',
    description: 'Genera una paleta de colores profesional a partir de cualquier imagen de forma instantánea y privada.',
    url: `${SITE_URL}/extractor-colores`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Extractor de Colores",
  url: `${SITE_URL}/extractor-colores`,
  description: "Herramienta online para extraer paletas de colores de imágenes utilizando el API de Canvas en el navegador.",
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
