import type { Metadata } from "next";

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Calculadora de Porcentajes Online Gratis",
  description: "Calcula cuánto es un porcentaje de una cantidad, qué porcentaje representa un valor y la variación porcentual entre dos cifras. Gratis y sin registro.",
  keywords: [
    "calculadora de porcentajes",
    "calcular porcentaje",
    "porcentaje de una cantidad",
    "variacion porcentual",
    "calculadora porcentajes online gratis",
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-porcentajes`,
  },
  openGraph: {
    title: "Calculadora de Porcentajes Online Gratis",
    description: "Calcula porcentajes, proporciones e incrementos al instante. 100% gratis.",
    url: `${SITE_URL}/calculadora-porcentajes`,
    type: "website",
    images: ["https://cajautil.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://cajautil.com/og-image.png"],
    title: "Calculadora de Porcentajes Online Gratis",
    description: "Calcula porcentajes, proporciones e incrementos al instante. 100% gratis.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Porcentajes Online",
  url: `${SITE_URL}/calculadora-porcentajes`,
  description: "Calculadora gratuita para obtener porcentajes, proporciones y variaciones entre cantidades.",
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
      <ToolEditorialSection slug="calculadora-porcentajes" compact />
    </>
  );
}
