import type { Metadata } from "next";

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Convertir Texto a Mayúsculas o Minúsculas Online — Gratis",
  description: "Transforma texto a MAYÚSCULAS, minúsculas, capitalizado o formato oración con un clic. Gratis, sin registro y directamente en tu navegador.",
  keywords: [
    "convertir mayúsculas a minúsculas",
    "pasar a mayúsculas",
    "texto a mayúsculas online",
    "cambiar mayúsculas a minúsculas",
    "capitalizar texto",
    "convertir texto online",
    "conversor minúsculas",
  ],
  alternates: {
    canonical: `${SITE_URL}/mayusculas-minusculas`,
  },
  openGraph: {
    title: "Convertir Texto a Mayúsculas o Minúsculas Online",
    description: "Cambia el formato de cualquier texto al instante. Gratis.",
    url: `${SITE_URL}/mayusculas-minusculas`,
    type: "website",
    images: ["https://cajautil.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertir Texto a Mayúsculas o Minúsculas Online",
    description: "Cambia mayúsculas, minúsculas, palabras capitalizadas o formato oración sin enviar el texto al servidor.",
    images: ["https://cajautil.com/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Convertidor de Mayúsculas y Minúsculas",
  url: `${SITE_URL}/mayusculas-minusculas`,
  description: "Herramienta para cambiar textos entre mayúsculas, minúsculas, capitalizado y formato oración.",
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
      <ToolEditorialSection slug="mayusculas-minusculas" compact />
    </>
  );
}
