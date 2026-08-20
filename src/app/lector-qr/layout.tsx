import type { Metadata } from "next";

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Leer QR desde una Imagen o Foto | Lector QR Online",
  description: "Sube una imagen o foto de un código QR y extrae su URL o texto en el navegador. Compatible con JPG, PNG y WebP de hasta 10 MB.",
  keywords: [
    "lector de QR",
    "escanear QR online",
    "leer código QR",
    "lector QR desde foto",
    "escanear QR con foto",
    "extraer texto de QR",
    "escáner QR online",
    "decodificar código QR",
  ],
  alternates: {
    canonical: `${SITE_URL}/lector-qr`,
  },
  openGraph: {
    title: "Leer QR desde una Imagen o Foto | CajaUtil",
    description: "Sube una foto o captura con un QR y extrae su contenido directamente en el navegador.",
    url: `${SITE_URL}/lector-qr`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leer QR desde una Imagen o Foto | CajaUtil",
    description: "Sube una foto o captura con un QR y extrae su contenido directamente en el navegador.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lector de Códigos QR Online",
  url: `${SITE_URL}/lector-qr`,
  description: "Lee códigos QR desde imágenes, fotos y capturas compatibles procesadas en el navegador.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  browserRequirements: "Requires JavaScript. Requires HTML5.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
