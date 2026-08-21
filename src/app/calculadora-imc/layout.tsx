import type { Metadata } from 'next';

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de IMC Gratis | Índice de Masa Corporal Online',
  description: 'Calcula el IMC de una persona adulta a partir de peso y altura. Resultado orientativo, privado y basado en los rangos de referencia de la OMS.',
  keywords: [
    "calculadora imc",
    "calcular indice de masa corporal",
    "imc hombre",
    "imc mujer",
    "rango imc adultos",
    "calculadora salud masa",
    "mi imc online gratis"
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-imc`,
  },
  openGraph: {
    title: 'Calculadora de IMC para Adultos | Resultado Orientativo',
    description: 'Estima el IMC con peso y altura, consulta su rango de referencia y conoce las limitaciones de este indicador.',
    url: `${SITE_URL}/calculadora-imc`,
    images: ['https://cajautil.com/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de IMC para Adultos',
    description: 'Estima el IMC con valores decimales y consulta su rango de referencia sin tratarlo como diagnóstico.',
    images: ['https://cajautil.com/og-image.png'],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de IMC (Índice de Masa Corporal)",
  url: `${SITE_URL}/calculadora-imc`,
  description: "Calculadora orientativa del Índice de Masa Corporal para adultos a partir de estatura y peso, basada en los rangos de referencia de la Organización Mundial de la Salud.",
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
      <ToolEditorialSection slug="calculadora-imc" compact />
    </>
  );
}
