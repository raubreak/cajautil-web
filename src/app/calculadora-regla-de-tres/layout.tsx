import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora Regla de 3 | Directa e Inversa Paso a Paso',
  description: 'Aprende a calcular la Regla de Tres Directa o Inversa fácilmente. Simplemente introduce 3 valores y obtén el resultado y la fórmula explicada online.',
  keywords: [
    "calculadora regla de 3",
    "como calcular regla de tres",
    "regla de tres directa online",
    "regla de tres inversa calculadora",
    "matematicas online",
    "resolver proporciones"
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-regla-de-tres`,
  },
  openGraph: {
    title: 'Calculadora de Regla de 3 (Directa e Inversa)',
    description: 'Resuelve problemas de proporcionalidad matemática de la escuela, universidad o trabajo diario muy fácil y paso a paso.',
    url: `${SITE_URL}/calculadora-regla-de-tres`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Regla de Tres",
  url: `${SITE_URL}/calculadora-regla-de-tres`,
  description: "Una de las herramientas de matemáticas básicas más útil. Permite, a partir de 3 incógnitas conocidas, aislar y calcular la Variable X mediante proporcionalidad Directa o fraccional Inversa.",
  applicationCategory: "EducationalApplication",
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
