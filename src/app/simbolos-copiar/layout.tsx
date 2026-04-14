import type { Metadata } from 'next';

import { LOW_VALUE_TOOL_ROBOTS } from '@/lib/adsenseReadiness';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Símbolos para Copiar y Pegar | Corazones, Estrellas y Signos',
  description: 'Miles de símbolos especiales, flechas, signos y emojis para copiar y pegar en Instagram, TikTok o Facebook. Colección organizada de caracteres estéticos y nicks.',
  keywords: [
    "simbolos para copiar",
    "corazones para copiar",
    "estrellas para copiar",
    "flechas para copiar",
    "simbolos esteticos nicks",
    "signos de puntuacion raros",
    "emojis para bios"
  ],
  alternates: {
    canonical: `${SITE_URL}/simbolos-copiar`,
  },
  openGraph: {
    title: 'Colección de Símbolos y Signos para Copiar y Pegar',
    description: 'Encuentra todos los símbolos que necesites para tus perfiles sociales en un solo lugar.',
    url: `${SITE_URL}/simbolos-copiar`,
  },
  robots: LOW_VALUE_TOOL_ROBOTS,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Símbolos para Copiar y Pegar",
  url: `${SITE_URL}/simbolos-copiar`,
  description: "Biblioteca interactiva de caracteres especiales y símbolos categorizados para facilitar su copia y uso en plataformas digitales.",
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
    </>
  );
}
