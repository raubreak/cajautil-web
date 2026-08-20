import type { Metadata } from 'next';

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de Interés Compuesto | Simulador Online',
  description: 'Compara escenarios de interés compuesto con capital inicial, aportaciones mensuales, tasa anual y plazo. Simulación gratuita y orientativa.',
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
    title: 'Calculadora de Interés Compuesto con Aportaciones',
    description: 'Compara cómo cambian el capital final, las aportaciones y los intereses en distintos escenarios a largo plazo.',
    url: `${SITE_URL}/calculadora-interes-compuesto`,
    images: ['https://cajautil.com/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Interés Compuesto con Aportaciones',
    description: 'Compara capital, aportaciones y rendimiento en escenarios positivos o negativos.',
    images: ['https://cajautil.com/og-image.png'],
  },
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
      <ToolEditorialSection slug="calculadora-interes-compuesto" />
    </>
  );
}
