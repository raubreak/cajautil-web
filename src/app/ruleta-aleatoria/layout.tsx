import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Ruleta Aleatoria Online | Sorteos y Toma de Decisiones',
  description: 'Gira la ruleta virtual gratis para sortear nombres, números o tomar decisiones al azar. Personalizable, rápida y sin registro.',
  keywords: [
    "ruleta aleatoria",
    "ruleta online",
    "sorteo aleatorio",
    "ruleta de nombres",
    "generador de decisiones",
    "ruleta de la suerte",
    "ruleta sorteo"
  ],
  alternates: {
    canonical: `${SITE_URL}/ruleta-aleatoria`,
  },
  openGraph: {
    title: 'Ruleta Aleatoria Online | Sorteos y Toma de Decisiones',
    description: 'Añade nombres o elementos y gira la ruleta mágica para elegir a alguien al azar al instante.',
    url: `${SITE_URL}/ruleta-aleatoria`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Ruleta Aleatoria",
  url: `${SITE_URL}/ruleta-aleatoria`,
  description: "Herramienta online para realizar sorteos aleatorios de nombres o palabras mediante una ruleta giratoria visual interactiva.",
  applicationCategory: "EntertainmentApplication",
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
