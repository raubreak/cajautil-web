import type { Metadata } from 'next';

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de Hipoteca | Cuota y Amortización',
  description: 'Calcula la cuota de tu hipoteca, intereses, coste total y primeras cuotas de amortización. Compara capital, plazo y TIN con límites claros.',
  keywords: [
    "calculadora hipoteca",
    "calcular cuota hipoteca",
    "amortizacion hipoteca",
    "intereses hipoteca",
    "simulador credito hipotecario",
    "cuota mensual hipoteca"
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-hipotecas`,
  },
  openGraph: {
    title: 'Calculadora de Hipoteca | Cuota y Amortización',
    description: 'Estima cuota, intereses, coste total y primeras cuotas de amortización con capital, plazo y TIN editables.',
    url: `${SITE_URL}/calculadora-hipotecas`,
    images: ['https://cajautil.com/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://cajautil.com/og-image.png'],
    title: 'Calculadora de Hipoteca | Cuota y Amortización',
    description: 'Estima cuota, intereses, coste total y primeras cuotas de amortización con capital, plazo y TIN editables.',
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Hipotecas",
  url: `${SITE_URL}/calculadora-hipotecas`,
  description: "Simulador financiero para estimar cuota mensual, intereses, coste total y primeras cuotas de una hipoteca con amortización francesa.",
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
      <ToolEditorialSection slug="calculadora-hipotecas" compact />
    </>
  );
}
