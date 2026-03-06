import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Generador de Enlaces de WhatsApp con Mensaje | CajaUtil.com',
  description: 'Crea un link directo a tu número de WhatsApp con un mensaje personalizado. Ideal para negocios, Instagram y TikTok. Gratis y rápido.',
  keywords: [
    "generador enlace whatsapp",
    "crear link whatsapp",
    "whatsapp api link",
    "link corto whatsapp",
    "wa.me creador",
    "enlace para mi negocio whatsapp",
    "generador link whatsapp instagram"
  ],
  alternates: {
    canonical: `${SITE_URL}/generador-enlace-whatsapp`,
  },
  openGraph: {
    title: 'Generador Link WhatsApp | Crea Tu Enlace Personalizado',
    description: 'Convierte tu número de teléfono en un enlace dinámico hacia tu chat de WhatsApp con un solo clic.',
    url: `${SITE_URL}/generador-enlace-whatsapp`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generador Link de WhatsApp",
  url: `${SITE_URL}/generador-enlace-whatsapp`,
  description: "Crea dinámicamente URLs wa.me y web.whatsapp acortadas para compartir chats directos de clientes a negocios sin la necesidad de guardar el teléfono en contactos.",
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
