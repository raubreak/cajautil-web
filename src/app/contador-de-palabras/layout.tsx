import type { Metadata } from "next";

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Contador de Palabras y Caracteres Online Gratis",
  description: "Cuenta palabras, caracteres y estima el tiempo de lectura de cualquier texto al instante. Ideal para ensayos, artículos, posts de redes sociales y SEO. Funciona offline.",
  keywords: [
    "contador de palabras",
    "contar palabras online",
    "contador de caracteres",
    "contar letras",
    "contador de texto",
    "tiempo de lectura",
    "contador de palabras online gratis",
  ],
  alternates: {
    canonical: `${SITE_URL}/contador-de-palabras`,
  },
  openGraph: {
    title: "Contador de Palabras y Caracteres Online",
    description: "Cuenta palabras, caracteres y tiempo de lectura al instante. 100% gratis.",
    url: `${SITE_URL}/contador-de-palabras`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Contador de Palabras Online",
  url: `${SITE_URL}/contador-de-palabras`,
  description: "Herramienta gratuita para contar palabras, caracteres y estimar tiempo de lectura.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  browserRequirements: "Requires JavaScript. Requires HTML5.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
