import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Generador de Firmas de Email HTML Online Gratis | CajaUtil',
  description: 'Crea tu firma profesional para Gmail, Outlook o Apple Mail. Generador de firmas de correo electrónico con foto, enlaces a redes sociales y diseño moderno.',
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
    description: 'Diseña tu firma de correo en segundos. Compatible con todos los clientes de email.',
    url: `${SITE_URL}/generador-firmas-email`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generador de Firmas de Email",
  url: `${SITE_URL}/generador-firmas-email`,
  description: "Crea firmas de correo electrónico profesionales con plantillas HTML listas para copiar y pegar en Gmail, Outlook o Mail.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
