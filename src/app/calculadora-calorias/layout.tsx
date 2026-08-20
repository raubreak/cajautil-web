import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de Calorías y TDEE Online Gratis | Metabolismo Basal',
  description: 'Estima el gasto calórico diario (TDEE) y el metabolismo basal (BMR) de una persona adulta con la fórmula Mifflin-St Jeor.',
  keywords: [
    "calculadora calorias",
    "calcular calorias diarias",
    "calculadora tdee",
    "metabolismo basal",
    "calcular metabolismo basal",
    "bmr calculator",
    "cuantas calorias necesito"
  ],
  alternates: { canonical: `${SITE_URL}/calculadora-calorias` },
  openGraph: {
    title: 'Calculadora de Calorías y Metabolismo Basal Online',
    description: 'Descubre cuántas calorías necesitas al día según tu edad, peso, altura y nivel de actividad.',
    url: `${SITE_URL}/calculadora-calorias`,
    images: ['https://cajautil.com/og-image.png'],
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Calorías y TDEE",
  url: `${SITE_URL}/calculadora-calorias`,
  description: "Herramienta online para calcular el gasto energético total diario (TDEE) y el metabolismo basal (BMR) usando la fórmula Mifflin-St Jeor.",
  applicationCategory: "HealthApplication",
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
