import type { Metadata } from 'next';

import ToolEditorialSection from '@/components/ToolEditorialSection';
import { LOW_VALUE_TOOL_ROBOTS } from '@/lib/adsenseReadiness';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Generador de Ideas de Hashtags para Redes Sociales',
  description: 'Obtén ideas de hashtags para Instagram, TikTok y X a partir de una palabra clave. Revisa, selecciona y copia etiquetas relacionadas gratis.',
  keywords: [
    "generador de hashtags",
    "hashtags instagram",
    "hashtags tiktok",
    "generador hashtags gratis",
    "mejores hashtags instagram",
    "hashtag generator",
    "hashtags populares"
  ],
  robots: LOW_VALUE_TOOL_ROBOTS,
  alternates: { canonical: `${SITE_URL}/generador-hashtags` },
  openGraph: {
    title: 'Generador de Ideas de Hashtags para Redes Sociales',
    description: 'Introduce un tema y obtén ideas de etiquetas para revisar, seleccionar y copiar.',
    url: `${SITE_URL}/generador-hashtags`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generador de Hashtags",
  url: `${SITE_URL}/generador-hashtags`,
  description: "Herramienta gratuita para generar hashtags relevantes para Instagram, TikTok y otras redes sociales a partir de palabras clave.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
      <ToolEditorialSection slug="generador-hashtags" />
    </>
  );
}
