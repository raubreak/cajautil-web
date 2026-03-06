import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Temporizador Online y Cronómetro | Alarma Gratis con Sonido',
  description: 'Usa nuestro temporizador de cuenta atrás y cronómetro online gratis. Perfecto como reloj Pomodoro, para estudiar, cocinar o entrenar. Con alarmas y pantalla completa.',
  keywords: [
    "temporizador online",
    "cronometro online",
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
    title: 'Temporizador y Cronómetro Online Gratis con Alarma',
    description: 'Reloj de cuenta regresiva y cronómetro profesional para gestionar tu tiempo de forma productiva.',
    url: `${SITE_URL}/temporizador`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@id": `${SITE_URL}/temporizador#webapplication`,
  "@type": "WebApplication",
  name: "Temporizador y Cronómetro Online",
  url: `${SITE_URL}/temporizador`,
  description: "Herramienta de gestión de tiempo que incluye temporizador de cuenta atrás personalizable y cronómetro de alta precisión.",
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
