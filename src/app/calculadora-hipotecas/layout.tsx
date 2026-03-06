import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de Hipotecas y Préstamos Gratis | CajaUtil.com',
  description: 'Calcula la cuota mensual de tu hipoteca o préstamo personal. Simulador online con cuadro de amortización de intereses. Fácil y sin registro.',
  keywords: [
    "calculadora hipoteca",
    "simulador prestamos",
    "calcular cuota hipoteca",
    "amortizacion prestamo",
    "calcular intereses dolares",
    "simulador credito hipotecario",
    "cuota mensual de prestamo"
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-hipotecas`,
  },
  openGraph: {
    title: 'Simulador de Hipotecas y Préstamos | CajaUtil.com',
    description: 'Averigua al instante cuánto pagarás al mes de cuota y el total de intereses de tu préstamo.',
    url: `${SITE_URL}/calculadora-hipotecas`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Hipotecas y Préstamos",
  url: `${SITE_URL}/calculadora-hipotecas`,
  description: "Simulador financiero para calcular las cuotas mensuales y el cuadro de amortización de un préstamo o hipoteca basándose en el sistema francés.",
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
