import type { Metadata } from "next";

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Contador de Palabras y Caracteres Online Gratis",
  description: "Cuenta palabras y caracteres con segmentación Unicode y estima el tiempo de lectura. Para ensayos, artículos, redes sociales y SEO, sin enviar el texto.",
  keywords: [
    "contador de palabras",
    "contar palabras online",
    "contador de caracteres",
    "contar letras",
    "contador de texto",
    "tiempo de lectura",
    "contador de palabras online gratis",
  ],
  alternates: {
    canonical: `${SITE_URL}/contador-de-palabras`,
  },
  openGraph: {
    title: "Contador de Palabras y Caracteres Online",
    description: "Cuenta palabras, caracteres y tiempo de lectura al instante. 100% gratis.",
    url: `${SITE_URL}/contador-de-palabras`,
    type: "website",
    images: ["https://cajautil.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contador de Palabras y Caracteres Online",
    description: "Cuenta palabras y caracteres con segmentación Unicode y estima el tiempo de lectura sin enviar el texto.",
    images: ["https://cajautil.com/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Contador de Palabras Online",
  url: `${SITE_URL}/contador-de-palabras`,
  description: "Herramienta gratuita para contar palabras y caracteres con segmentación Unicode y estimar el tiempo de lectura.",
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
      <ToolEditorialSection slug="contador-de-palabras" compact />
    </>
  );
}
