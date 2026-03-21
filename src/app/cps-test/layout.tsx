import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'CPS Test Online | Contador de Clicks por Segundo en Vivo',
  description: 'Haz un CPS Test online gratis y mide tus clicks por segundo en 1, 5 o 10 segundos. Ideal para Minecraft, aim training y mejorar tu velocidad de clic.',
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
    description: 'Mide tus clicks por segundo en vivo, compara tu resultado y entrena para Minecraft, PvP o juegos competitivos.',
    url: `${SITE_URL}/cps-test`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CPS Test Online Gratis | Clicks por Segundo',
    description: 'Prueba tu velocidad de clic en 1, 5 o 10 segundos con este CPS test interactivo y gratis.',
  },
};

const webApplicationJsonLd = {
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: 'Que es un CPS test',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Un CPS test mide cuantos clics por segundo puedes hacer durante un tiempo concreto, normalmente 1, 5 o 10 segundos.',
      },
    },
    {
      "@type": "Question",
      name: 'Cuantos clicks por segundo son buenos',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Para la mayoria de usuarios, 5 a 8 CPS es un nivel normal. A partir de 8 CPS ya se considera un resultado alto para juegos competitivos.',
      },
    },
    {
      "@type": "Question",
      name: 'Sirve este CPS test para Minecraft',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Si. Este test sirve para practicar velocidad de clic y medir tu rendimiento en contextos como Minecraft PvP, shooters o juegos que exigen reaccion rapida.',
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {children}
    </>
  );
}
