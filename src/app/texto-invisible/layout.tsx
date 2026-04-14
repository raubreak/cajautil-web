import type { Metadata } from 'next';

import { LOW_VALUE_TOOL_ROBOTS } from '@/lib/adsenseReadiness';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Texto Invisible para Copiar y Pegar | Espacio en Blanco Unicode',
  description: 'Copia el texto invisible o carácter en blanco (espacio vacío U+3164) para WhatsApp, Instagram, TikTok o nicks de juegos. Herramienta gratuita para enviar mensajes vacíos.',
  keywords: [
    "texto invisible",
    "espacio en blanco para copiar",
    "mensaje vacio whatsapp",
    "caracter invisible",
    "copiar espacio transparente",
    "texto transparente",
    "u+3164 copy"
  ],
  alternates: {
    canonical: `${SITE_URL}/texto-invisible`,
  },
  openGraph: {
    title: 'Texto Invisible y Espacio en Blanco para Copiar',
    description: 'Envía mensajes vacíos o crea nicks con espacios invisibles fácilmente con nuestra herramienta gratuita.',
    url: `${SITE_URL}/texto-invisible`,
  },
  robots: LOW_VALUE_TOOL_ROBOTS,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Texto Invisible",
  url: `${SITE_URL}/texto-invisible`,
  description: "Herramienta online gratuita para copiar caracteres Unicode invisibles (U+3164) que permiten enviar mensajes vacíos y espacios transparentes en redes sociales.",
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
