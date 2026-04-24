import type { Metadata } from 'next';

import { LOW_VALUE_TOOL_ROBOTS } from '@/lib/adsenseReadiness';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Traductor Binario y Morse Online | Conversor de Códigos Gratis',
  description: 'Convierte texto a binario, morse, hexadecimal y viceversa de forma instantánea. Herramienta gratuita para traducción de códigos y lenguaje informático.',
  keywords: [
    "traductor binario",
    "conversor texto a binario",
    "traductor codigo morse",
    "letras a binario",
    "decimal a binario online",
    "traductor de codigos",
    "binario a texto"
  ],
  robots: LOW_VALUE_TOOL_ROBOTS,
  alternates: {
    canonical: `${SITE_URL}/traductor-binario`,
  },
  openGraph: {
    title: 'Traductor Binario, Morse y Hexadecimal Online',
    description: 'Traduce cualquier texto a lenguaje binario, morse o hexadecimal rápidamente con nuestra herramienta gratuita.',
    url: `${SITE_URL}/traductor-binario`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Traductor Binario y Morse",
  url: `${SITE_URL}/traductor-binario`,
  description: "Traductor online gratuito para convertir texto simple en códigos binarios, morse y hexadecimales.",
  applicationCategory: "CommunicationApplication",
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
