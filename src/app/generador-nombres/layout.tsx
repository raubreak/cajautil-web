import type { Metadata } from 'next';

import { LOW_VALUE_TOOL_ROBOTS } from '@/lib/adsenseReadiness';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Generador de Nombres Aleatorios y Apellidos | CajaUtil.com',
  description: 'Genera nombres de hombre, mujer o apellidos aleatorios para personajes, bebés, juegos de rol o pruebas. Escoge la cantidad y el idioma al instante.',
  keywords: [
    "generador de nombres",
    "nombres aleatorios",
    "generador apellidos",
    "nombres de bebe",
    "nombres para juegos",
    "nombres azarosos",
    "crear nombre aleatorio"
  ],
  alternates: {
    canonical: `${SITE_URL}/generador-nombres`,
  },
  openGraph: {
    title: 'Generador de Nombres y Apellidos Online',
    description: 'Encuentra y genera nombres masculinos, femeninos y apellidos realistas al azar en un clic.',
    url: `${SITE_URL}/generador-nombres`,
  },
  robots: LOW_VALUE_TOOL_ROBOTS,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generador de Nombres Aleatorios",
  url: `${SITE_URL}/generador-nombres`,
  description: "Herramienta online para generar identidades ficticias, nombres propios y apellidos al azar para usar en aplicaciones o encontrar ideas de nombres reales.",
  applicationCategory: "UtilityApplication",
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
