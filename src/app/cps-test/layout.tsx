import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'CPS Test Online | Contador de Clicks por Segundo en Vivo',
  description: 'Mide tu velocidad de clic con nuestro CPS Test gratuito. Descubre cuántos clics puedes hacer en 5 o 10 segundos y compara tu récord con otros jugadores de Minecraft o MMO.',
  keywords: [
    "cps test",
    "contador de clicks",
    "clicks por segundo",
    "test de velocidad de click",
    "clicks per second test",
    "medidor de clicks minecraft",
    "juego de clicar rapido"
  ],
  alternates: {
    canonical: `${SITE_URL}/cps-test`,
  },
  openGraph: {
    title: 'CPS Test Online Gratis | Test de Velocidad de Clic',
    description: '¿Qué tan rápido puedes cliquear? ¡Ponte a prueba con nuestro contador de CPS interactivo!',
    url: `${SITE_URL}/cps-test`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CPS Test Online",
  url: `${SITE_URL}/cps-test`,
  description: "Herramienta online gratuita para medir la velocidad de clics por segundo (CPS) del usuario a través de un juego interactivo de tiempo limitado.",
  applicationCategory: "GameApplication",
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
