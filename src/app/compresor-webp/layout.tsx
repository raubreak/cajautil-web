import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Compresor y Convertidor de Imágenes a WebP Online Gratís',
  description: 'Comprime tus fotos y conviértelas de JPG/PNG a WebP sin perder calidad en segundos. 100% privado en tu ordenador.',
  keywords: [
    "convertir a webp",
    "comprimir imagen online",
    "reducir peso foto sin perder calidad",
    "jpg a webp",
    "png a webp online",
    "compresor de imagenes gratis",
    "optimizar imagenes web"
  ],
  alternates: {
    canonical: `${SITE_URL}/compresor-webp`,
  },
  openGraph: {
    title: 'Compresor de Imágenes a WebP | Optimiza tu Web',
    description: 'Reduce el peso de tus imágenes en un 80% convirtiéndolas a formato WebP de nueva generación. Privado, rápido y cliente-local.',
    url: `${SITE_URL}/compresor-webp`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Compresor y Convertidor WebP",
  url: `${SITE_URL}/compresor-webp`,
  description: "Potente herramienta en javascript local (Canvas API) para reducir drásticamente el peso de las imágenes (MB a KB) convirtiendo un archivo JPEG o PNG a formato comprimido WebP de Google sin envíos a servidores externos.",
  applicationCategory: "MultimediaApplication",
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
