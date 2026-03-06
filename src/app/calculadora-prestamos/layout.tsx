import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Simulador de Préstamos Personales Online Gratis | CajaUtil',
  description: 'Calcula las cuotas mensuales de tu préstamo personal. Simulador de intereses, amortización y coste total del crédito en segundos.',
  keywords: [
    "simulador prestamo personal",
    "calculadora de prestamos",
    "calcular cuota prestamo",
    "tabla amortizacion frances",
    "interes prestamo bancario",
    "simulador credito personal online"
  ],
  alternates: { canonical: `${SITE_URL}/calculadora-prestamos` },
  openGraph: {
    title: 'Simulador de Préstamos Personales Online — CajaUtil',
    description: 'Calcula cuánto pagarás por tu préstamo personal incluyendo intereses y tabla de amortización.',
    url: `${SITE_URL}/calculadora-prestamos`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Simulador de Préstamos Personales",
  url: `${SITE_URL}/calculadora-prestamos`,
  description: "Calculadora online para simular préstamos personales, calcular la cuota mensual y ver la tabla de amortización detallada.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
