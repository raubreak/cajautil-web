import type { Metadata } from 'next';

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Símbolos para Copiar y Pegar | Corazones, Estrellas y Signos',
  description: 'Más de 200 símbolos Unicode, flechas, corazones, estrellas y signos para copiar y pegar. Colección gratuita organizada por categorías.',
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
    description: 'Explora más de 200 símbolos Unicode organizados y copia el que necesites con un clic.',
    url: `${SITE_URL}/simbolos-copiar`,
    type: 'website',
    images: ['https://cajautil.com/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Símbolos para Copiar y Pegar | CajaUtil',
    description: 'Más de 200 corazones, estrellas, flechas, notas y signos Unicode organizados por categorías.',
    images: ['https://cajautil.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <ToolEditorialSection slug="simbolos-copiar" />
    </>
  );
}
