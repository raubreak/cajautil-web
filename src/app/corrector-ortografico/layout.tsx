import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Corrector Ortográfico Online Gratis | Revisar Textos en Español',
  description: 'Corrector ortográfico y gramatical online gratuito. Revisa y corrige errores de ortografía, acentos y gramática en tus textos en español al instante sin registro.',
  keywords: [
    "corrector ortografico",
    "corrector ortografico online",
    "corrector de textos",
    "corrector gramatical",
    "revisar ortografia online",
    "corrector español online gratis",
    "corrector ortografico castellano"
  ],
  alternates: {
    canonical: `${SITE_URL}/corrector-ortografico`,
  },
  openGraph: {
    title: 'Corrector Ortográfico y Gramatical Online Gratis',
    description: 'Pega tu texto y encuentra errores de ortografía y gramática al instante. Sin registro ni instalación.',
    url: `${SITE_URL}/corrector-ortografico`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Corrector Ortográfico Online",
  url: `${SITE_URL}/corrector-ortografico`,
  description: "Herramienta online gratuita para revisar y corregir errores de ortografía y gramática en textos en español.",
  applicationCategory: "UtilitiesApplication",
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
