import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Temporizador Online Gratis con Alarma y Sonido',
  description: 'Configura una cuenta atrás online con alarma y accesos rápidos. Temporizador gratuito para estudiar, cocinar, entrenar o aplicar Pomodoro.',
  keywords: [
    "temporizador online",
    "alarma online gratis",
    "cuenta atras online",
    "reloj pomodoro online",
    "alarma para estudiar",
    "temporizador 10 minutos"
  ],
  alternates: {
    canonical: `${SITE_URL}/temporizador`,
  },
  openGraph: {
    title: 'Temporizador Online Gratis con Alarma',
    description: 'Configura una cuenta atrás con sonido para estudiar, cocinar o entrenar.',
    url: `${SITE_URL}/temporizador`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@id": `${SITE_URL}/temporizador#webapplication`,
  "@type": "WebApplication",
  name: "Temporizador Online con Alarma",
  url: `${SITE_URL}/temporizador`,
  description: "Temporizador de cuenta atrás personalizable con alarma y accesos rápidos para intervalos habituales.",
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
