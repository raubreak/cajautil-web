import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de Edad Exacta | Cuántos Días He Vivido',
  description: 'Calcula tu edad exacta en años, meses, días, horas, minutos y segundos. Descubre cuánto falta para tu próximo cumpleaños y cuántos días has vivido desde que naciste.',
  keywords: [
    "calculadora de edad",
    "cuantos dias he vivido",
    "calculadora edad exacta",
    "cuanto falta para mi cumpleaños",
    "edad en meses y dias",
    "calculadora cronologica",
    "edad exacta online"
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-edad`,
  },
  openGraph: {
    title: 'Calculadora de Edad Exacta Online Gratis',
    description: 'Descubre tu edad al detalle y cuántos segundos han pasado desde tu nacimiento al instante.',
    url: `${SITE_URL}/calculadora-edad`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Edad Exacta",
  url: `${SITE_URL}/calculadora-edad`,
  description: "Herramienta online para calcular la edad exacta de una persona en múltiples unidades temporales y el tiempo restante para su próximo aniversario.",
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
