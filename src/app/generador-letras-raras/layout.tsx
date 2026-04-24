import type { Metadata } from 'next';

import { LOW_VALUE_TOOL_ROBOTS } from '@/lib/adsenseReadiness';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Generador de Letras Raras y Fuentes para Instagram y TikTok',
  description: 'Convierte tus textos a letras bonitas, raras, góticas o cursivas. Copia y pega fuentes diferentes para tus biografías de Instagram, WhatsApp o TikTok.',
  keywords: [
    "letras para instagram",
    "letras bonitas para copiar",
    "generador de letras online",
    "conversor de fuentes raras",
    "cambia letras",
    "letras para whatsapp",
    "fuentes para tiktok"
  ],
  robots: LOW_VALUE_TOOL_ROBOTS,
  alternates: {
    canonical: `${SITE_URL}/generador-letras-raras`,
  },
  openGraph: {
    title: 'Generador de Letras Raras | Cambia-letras',
    description: 'Transforma cualquier texto en letras únicas, raras y estéticas listas para copiar y pegar.',
    url: `${SITE_URL}/generador-letras-raras`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generador de Letras Raras",
  url: `${SITE_URL}/generador-letras-raras`,
  description: "Herramienta online para codificar palabras en Unicode matemático produciendo letras góticas, cursivas, rodeadas, etc, permitiendo su uso en redes sociales copiando y pegando.",
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
