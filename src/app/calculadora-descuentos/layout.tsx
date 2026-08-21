import type { Metadata } from 'next';

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de Descuentos y Rebajas | Precio Final',
  description: 'Calcula el precio final, el ahorro y dos descuentos sucesivos sin sumarlos por error. Útil para rebajas, cupones y Black Friday.',
  keywords: [
    "calculadora de descuentos",
    "calcular rebajas online",
    "precio final con descuento",
    "calculadora black friday",
    "ahorro en rebajas",
    "porcentaje de descuento",
    "calcular cuanto ahorro",
    "descuentos sucesivos"
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-descuentos`,
  },
  openGraph: {
    title: 'Calculadora de Descuentos y Rebajas Online',
    description: 'Calcula el precio final, el ahorro y el efecto acumulado de dos descuentos sucesivos.',
    url: `${SITE_URL}/calculadora-descuentos`,
    images: ['https://cajautil.com/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://cajautil.com/og-image.png'],
    title: 'Calculadora de Descuentos y Rebajas Online',
    description: 'Calcula el precio final, el ahorro y el efecto acumulado de dos descuentos sucesivos.',
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Descuentos",
  url: `${SITE_URL}/calculadora-descuentos`,
  description: "Herramienta para calcular el precio final, el ahorro y el efecto acumulado de uno o dos descuentos sucesivos.",
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
      <ToolEditorialSection slug="calculadora-descuentos" compact />
    </>
  );
}
