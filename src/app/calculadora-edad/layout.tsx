import type { Metadata } from 'next';

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de Edad | Años, Meses y Días Vividos',
  description: 'Calcula tu edad por calendario en años, meses y días. Estima cuánto falta para tu próximo cumpleaños y el tiempo transcurrido desde que naciste.',
  keywords: [
    "calculadora de edad",
    "cuantos dias he vivido",
    "calculadora edad exacta",
    "cuanto falta para mi cumpleaños",
    "edad en meses y dias",
    "calculadora cronologica",
    "edad exacta online"
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-edad`,
  },
  openGraph: {
    title: 'Calculadora de Edad Online Gratis',
    description: 'Consulta tu edad por calendario y una estimación del tiempo transcurrido desde tu nacimiento.',
    url: `${SITE_URL}/calculadora-edad`,
    images: ['https://cajautil.com/og-image.png'],
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Edad",
  url: `${SITE_URL}/calculadora-edad`,
  description: "Herramienta online para calcular la edad por calendario y estimar el tiempo restante para el próximo aniversario.",
  applicationCategory: "UtilitiesApplication",
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
      <ToolEditorialSection slug="calculadora-edad" />
    </>
  );
}
