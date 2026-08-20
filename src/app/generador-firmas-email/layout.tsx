import type { Metadata } from 'next';

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Generador de Firmas de Email HTML Online Gratis',
  description: 'Crea una firma de correo HTML con nombre, empresa, teléfono, email, web, foto y color. Cópiala y pruébala en Gmail, Outlook o Apple Mail.',
  keywords: [
    "generador de firmas de email",
    "firma correo electronico gratis",
    "crear firma gmail",
    "firma profesional outlook",
    "email signature generator",
    "firma html email"
  ],
  alternates: { canonical: `${SITE_URL}/generador-firmas-email` },
  openGraph: {
    title: 'Generador de Firmas de Email Profesionales Gratis — CajaUtil',
    description: 'Diseña una firma HTML sencilla, copia el resultado y pruébalo en tu cliente de correo.',
    url: `${SITE_URL}/generador-firmas-email`,
    images: ['https://cajautil.com/og-image.png'],
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generador de Firmas de Email",
  url: `${SITE_URL}/generador-firmas-email`,
  description: "Crea una firma de correo HTML personalizable para copiar, pegar y probar en Gmail, Outlook o Mail.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
      <ToolEditorialSection slug="generador-firmas-email" />
    </>
  );
}
