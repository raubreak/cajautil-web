import type { Metadata } from "next";

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Calculadora de Sueldo Neto España | Bruto a Neto",
  description: "Calcula tu sueldo neto mensual desde el salario bruto anual. Ajusta IRPF, cotización y 12 o 14 pagas para una estimación transparente.",
  keywords: [
    "calcular sueldo neto",
    "calculadora sueldo neto",
    "sueldo bruto a neto",
    "calcular nómina",
    "calculadora IRPF",
    "sueldo neto España",
    "calcular retenciones IRPF",
    "salario neto mensual",
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-sueldo-neto`,
  },
  openGraph: {
    title: "Calculadora de Sueldo Neto | España",
    description: "Calcula cuánto cobrarás de neto al mes desde tu bruto anual con IRPF y cotización ajustables.",
    url: `${SITE_URL}/calculadora-sueldo-neto`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Sueldo Neto | España",
    description: "Calcula cuánto cobrarás de neto al mes desde tu bruto anual con IRPF y cotización ajustables.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Sueldo Neto España",
  url: `${SITE_URL}/calculadora-sueldo-neto`,
  description: "Calculadora gratuita de sueldo neto mensual con IRPF, cotización y número de pagas ajustables.",
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
