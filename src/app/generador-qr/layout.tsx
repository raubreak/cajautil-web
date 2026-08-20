import type { Metadata } from "next";

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Generador de Códigos QR Online Gratis — Personaliza y Descarga",
  description: "Crea códigos QR personalizados para URLs, textos o datos de contacto. Cambia colores y descarga en PNG de alta resolución. Gratis y sin registro.",
  keywords: [
    "generador de QR",
    "crear código QR",
    "generar QR online",
    "generador QR gratis",
    "QR personalizado",
    "código QR para URL",
    "QR para tarjeta de visita",
    "hacer código QR",
  ],
  alternates: {
    canonical: `${SITE_URL}/generador-qr`,
  },
  openGraph: {
    title: "Generador de Códigos QR Gratis y Personalizable",
    description: "Crea y descarga códigos QR en alta resolución. Personaliza colores y contenido.",
    url: `${SITE_URL}/generador-qr`,
    type: "website",
    images: ["https://cajautil.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generador de Códigos QR Gratis y Personalizable",
    description: "Crea y descarga códigos QR para enlaces y textos compatibles.",
    images: ["https://cajautil.com/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generador de Códigos QR Online",
  url: `${SITE_URL}/generador-qr`,
  description: "Genera códigos QR personalizados para URLs, textos y más. Descarga en PNG.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
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
      <ToolEditorialSection slug="generador-qr" compact />
    </>
  );
}
