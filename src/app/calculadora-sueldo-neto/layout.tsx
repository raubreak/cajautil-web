import type { Metadata } from "next";

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Calculadora de Sueldo Neto 2026 España — De Bruto a Neto",
  description: "Calcula tu sueldo neto mensual a partir del salario bruto anual en España 2026. Incluye estimaciones de IRPF, Seguridad Social y retenciones. 12 o 14 pagas. Gratis y al instante.",
  keywords: [
    "calcular sueldo neto",
    "calculadora sueldo neto",
    "sueldo bruto a neto",
    "calcular nómina",
    "calculadora IRPF",
    "sueldo neto España 2026",
    "calcular retenciones IRPF",
    "salario neto mensual",
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-sueldo-neto`,
  },
  openGraph: {
    title: "Calculadora de Sueldo Neto 2026 — España",
    description: "Calcula cuánto cobrarás de neto al mes a partir de tu bruto anual. IRPF y SS incluidos.",
    url: `${SITE_URL}/calculadora-sueldo-neto`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Sueldo Neto España 2026",
  url: `${SITE_URL}/calculadora-sueldo-neto`,
  description: "Calculadora gratuita de sueldo neto mensual con retenciones IRPF y Seguridad Social en España.",
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
    </>
  );
}
