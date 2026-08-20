import type { Metadata } from "next";

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Calculadora Sueldo Neto | Bruto a Neto y Neto a Bruto",
  description: "Convierte sueldo bruto a neto o neto a bruto, anual o mensual. Ajusta IRPF, cotización y 12 o 14 pagas con un desglose transparente.",
  keywords: [
    "calcular sueldo neto",
    "calculadora sueldo neto",
    "sueldo bruto a neto",
    "calcular nómina",
    "calculadora IRPF",
    "sueldo neto España",
    "calcular retenciones IRPF",
    "salario neto mensual",
    "sueldo neto a bruto",
    "bruto mensual a neto",
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-sueldo-neto`,
  },
  openGraph: {
    title: "Calculadora de Sueldo Neto | Bruto y Neto",
    description: "Convierte sueldo bruto a neto o neto a bruto, anual o por paga, con IRPF y cotización ajustables.",
    url: `${SITE_URL}/calculadora-sueldo-neto`,
    type: "website",
    images: ["https://cajautil.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://cajautil.com/og-image.png"],
    title: "Calculadora de Sueldo Neto | Bruto y Neto",
    description: "Convierte sueldo bruto a neto o neto a bruto, anual o por paga, con IRPF y cotización ajustables.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Sueldo Neto España",
  url: `${SITE_URL}/calculadora-sueldo-neto`,
  description: "Calculadora gratuita para convertir sueldo bruto a neto o neto a bruto, anual o por paga, con IRPF y cotización ajustables.",
  applicationCategory: "FinanceApplication",
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
      <ToolEditorialSection slug="calculadora-sueldo-neto" compact />
    </>
  );
}
