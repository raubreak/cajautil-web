import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de IMC Gratis | Índice de Masa Corporal Online',
  description: 'Calcula tu IMC (Índice de Masa Corporal) y descubre tu peso ideal al instante. Utilidad de salud rápida, privada y adaptada para adulto y niño.',
  keywords: [
    "calculadora imc",
    "calcular indice de masa corporal",
    "imc hombre",
    "imc mujer",
    "peso ideal calcular",
    "calculadora salud masa",
    "mi imc online gratis"
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-imc`,
  },
  openGraph: {
    title: 'Evalúa tu Índice de Masa Corporal | Calculadora IMC Saludable',
    description: 'Comprueba en qué rango de peso de la OMS te encuentras introduciendo tu altura y peso. Descubre tu IMC al instante.',
    url: `${SITE_URL}/calculadora-imc`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de IMC (Índice de Masa Corporal)",
  url: `${SITE_URL}/calculadora-imc`,
  description: "Calculadora rápida de parámetros de la Organización Mundial de la Salud para conocer el Índice de Masa Corporal en base a Estatura y Peso de un adulto y calcular estado de delgadez, normalidad o sobrepeso.",
  applicationCategory: "HealthApplication",
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
