import type { Metadata } from "next";

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Calculadora de Porcentajes Online Gratis — Calcula IVA, Descuentos y Más",
  description: "Calcula porcentajes al instante: IVA, descuentos, propinas, incrementos y variaciones porcentuales. Herramienta gratuita, rápida y sin registro. Ideal para compras, finanzas y matemáticas.",
  keywords: [
    "calculadora de porcentajes",
    "calcular porcentaje",
    "calculadora de IVA",
    "calcular descuento",
    "porcentaje de una cantidad",
    "calcular IVA online",
    "calculadora porcentajes online gratis",
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-porcentajes`,
  },
  openGraph: {
    title: "Calculadora de Porcentajes Online Gratis",
    description: "Calcula porcentajes, IVA, descuentos e incrementos al instante. 100% gratis.",
    url: `${SITE_URL}/calculadora-porcentajes`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Porcentajes Online",
  url: `${SITE_URL}/calculadora-porcentajes`,
  description: "Calculadora de porcentajes gratuita para calcular IVA, descuentos e incrementos.",
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
