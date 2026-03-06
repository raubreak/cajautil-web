import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Cronómetro Online Gratis | Precisión con Vueltas y Alarma',
  description: 'Cronómetro online de alta precisión para medir tiempos. Incluye registro de vueltas, modo pantalla completa y diseño minimalista. Ideal para deporte o estudio.',
  keywords: [
    "cronometro online",
    "cronometro gratis",
    "medir tiempo online",
    "stopwatch online",
    "cronometro con vueltas",
    "reloj cronometro online"
  ],
  alternates: { canonical: `${SITE_URL}/cronometro` },
  openGraph: {
    title: 'Cronómetro Online Gratis y de Precisión — CajaUtil',
    description: 'Mide tus tiempos de forma precisa con nuestro cronómetro online gratuito.',
    url: `${SITE_URL}/cronometro`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cronómetro Online",
  url: `${SITE_URL}/cronometro`,
  description: "Cronómetro web gratuito para medir intervalos de tiempo con precisión de milisegundos y registro de vueltas.",
  applicationCategory: "MultimediaApplication",
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
