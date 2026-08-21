import type { Metadata } from 'next';

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de Calorías, REE y TDEE Online',
  description: 'Estima el gasto energético en reposo de una persona adulta con Mifflin-St Jeor y el TDEE mediante factores de actividad transparentes.',
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
    title: 'Calculadora de Calorías, REE y TDEE Online',
    description: 'Estima el gasto energético en reposo y el gasto diario según edad, peso, altura y un factor orientativo de actividad.',
    url: `${SITE_URL}/calculadora-calorias`,
    images: ['https://cajautil.com/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Calorías, REE y TDEE',
    description: 'Estima REE con Mifflin-St Jeor y TDEE mediante un factor orientativo de actividad.',
    images: ['https://cajautil.com/og-image.png'],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Calorías y TDEE",
  url: `${SITE_URL}/calculadora-calorias`,
  description: "Herramienta online para estimar el gasto energético en reposo (REE) con Mifflin-St Jeor y el gasto diario (TDEE) mediante un factor de actividad.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
      <ToolEditorialSection slug="calculadora-calorias" compact />
    </>
  );
}
