import type { Metadata } from "next";

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Lector de Códigos QR Online — Escanea QR desde Foto",
  description: "Sube una foto de un código QR y extrae su contenido (URL o texto) al instante. 100% privado y seguro: la imagen se procesa en tu navegador y no se envía a ningún servidor.",
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
    title: "Lector de Códigos QR Online — Privado y Seguro",
    description: "Sube una foto de un QR y lee su contenido al instante. 100% privado.",
    url: `${SITE_URL}/lector-qr`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lector de Códigos QR Online",
  url: `${SITE_URL}/lector-qr`,
  description: "Escanea y lee códigos QR desde fotos. Privado y seguro.",
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
