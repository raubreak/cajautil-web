import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de Descuentos Online | Precio Final Rebajado',
  description: 'Calcula cuánto te ahorras y el precio final de cualquier producto con descuento. Ideal para rebajas, Black Friday y compras diarias. Rápida y precisa.',
  keywords: [
    "calculadora de descuentos",
    "calcular rebajas online",
    "precio final con descuento",
    "calculadora black friday",
    "ahorro en rebajas",
    "porcentaje de descuento",
    "calcular cuanto ahorro"
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-descuentos`,
  },
  openGraph: {
    title: 'Calculadora de Descuentos Online gratis',
    description: 'Descubre el precio final de tus compras tras aplicar el porcentaje de rebaja de forma instantánea.',
    url: `${SITE_URL}/calculadora-descuentos`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Descuentos",
  url: `${SITE_URL}/calculadora-descuentos`,
  description: "Herramienta financiera para calcular reducciones de precio basadas en porcentajes de descuento, mostrando el ahorro total y el importe final.",
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
