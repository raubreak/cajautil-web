import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Convertir a WebP Online: Compresor de Imágenes Gratis',
  description: 'Comprime y convierte fotos JPG o PNG a WebP sin subirlas al servidor. Reduce el peso con procesamiento local, rápido y privado.',
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
    description: 'Reduce el peso de imágenes JPG o PNG convirtiéndolas a WebP en tu navegador. El ahorro depende de la imagen y la calidad elegida.',
    url: `${SITE_URL}/compresor-webp`,
    images: ['https://cajautil.com/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://cajautil.com/og-image.png'],
    title: 'Compresor de Imágenes a WebP | Optimiza tu Web',
    description: 'Reduce el peso de imágenes JPG o PNG convirtiéndolas a WebP en tu navegador. El ahorro depende de la imagen y la calidad elegida.',
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
