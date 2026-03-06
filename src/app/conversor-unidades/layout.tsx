import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Conversor de Unidades Online Gratis | Peso, Longitud, Temperatura',
  description: 'Conversor de unidades instantáneo: convierte kilos a libras, metros a pies, grados Celsius a Fahrenheit y mucho más. Herramienta gratuita y sin registro.',
  keywords: [
    "conversor de unidades",
    "convertir kg a libras",
    "convertir metros a pies",
    "celsius a fahrenheit",
    "conversor medidas online",
    "conversor peso online",
    "conversor distancia online"
  ],
  alternates: { canonical: `${SITE_URL}/conversor-unidades` },
  openGraph: {
    title: 'Conversor de Unidades Online — Peso, Longitud y Temperatura',
    description: 'Convierte entre unidades de medida al instante. Todo en tu navegador, sin instalar nada.',
    url: `${SITE_URL}/conversor-unidades`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Conversor de Unidades",
  url: `${SITE_URL}/conversor-unidades`,
  description: "Herramienta online gratuita para convertir entre diferentes unidades de medida: peso, longitud, temperatura, volumen, velocidad y más.",
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
