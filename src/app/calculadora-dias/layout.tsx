import type { Metadata } from "next";

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Calculadora de Días entre Fechas Online — Calcula Diferencias",
  description: "Calcula la diferencia exacta en días, semanas, meses y años entre dos fechas. Ideal para plazos, proyectos, embarazos, eventos y vacaciones. Gratis y al instante.",
  keywords: [
    "calculadora de días",
    "calcular días entre fechas",
    "cuantos días faltan",
    "diferencia entre fechas",
    "contar días",
    "calculadora de fechas",
    "días entre dos fechas",
    "cuántas semanas entre fechas",
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-dias`,
  },
  openGraph: {
    title: "Calculadora de Días entre Fechas",
    description: "Calcula días, semanas, meses y años entre dos fechas. Gratis.",
    url: `${SITE_URL}/calculadora-dias`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Días entre Fechas",
  url: `${SITE_URL}/calculadora-dias`,
  description: "Calcula la diferencia exacta entre dos fechas en días, semanas, meses y años.",
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
