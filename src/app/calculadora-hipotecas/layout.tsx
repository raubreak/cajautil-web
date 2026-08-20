import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de Hipotecas Online Gratis',
  description: 'Calcula la cuota mensual de una hipoteca, los intereses y el coste total. Compara importe, plazo y tipo antes de pedir ofertas al banco.',
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
    title: 'Simulador de Hipotecas Online',
    description: 'Averigua cuánto pagarás al mes y el total de intereses de tu hipoteca.',
    url: `${SITE_URL}/calculadora-hipotecas`,
    images: ['https://cajautil.com/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://cajautil.com/og-image.png'],
    title: 'Simulador de Hipotecas Online',
    description: 'Averigua cuánto pagarás al mes y el total de intereses de tu hipoteca.',
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Hipotecas",
  url: `${SITE_URL}/calculadora-hipotecas`,
  description: "Simulador financiero para estimar la cuota mensual y los intereses de una hipoteca con el sistema de amortización francés.",
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
