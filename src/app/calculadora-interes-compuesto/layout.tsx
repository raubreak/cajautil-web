import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de Interés Compuesto Online | Simulador de Inversiones',
  description: 'Descubre cómo crecerá tu dinero con nuestra calculadora de interés compuesto. Añade aportaciones mensuales y visualiza tus ganancias a largo plazo.',
  keywords: [
    "calculadora interes compuesto",
    "simulador inversiones",
    "interes compuesto mensual",
    "calculadora financiera",
    "rendimiento anual",
    "independencia financiera",
    "efecto bola de nieve dinero"
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-interes-compuesto`,
  },
  openGraph: {
    title: 'Calculadora de Interés Compuesto Mágica',
    description: 'Averigua cómo una pequeña aportación mensual puede convertirte en millonario a largo plazo.',
    url: `${SITE_URL}/calculadora-interes-compuesto`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Interés Compuesto",
  url: `${SITE_URL}/calculadora-interes-compuesto`,
  description: "Herramienta online para simular escenarios de inversión a largo plazo usando el poder matemático del interés compuesto y aportaciones mensuales periódicas.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
