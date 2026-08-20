import type { Metadata } from 'next';

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Cronómetro Online Gratis con Vueltas y Centésimas',
  description: 'Mide tiempo online y registra cada vuelta con su intervalo y tiempo total. Cronómetro gratuito con pausa, reinicio y lectura en centésimas.',
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
    title: 'Cronómetro Online Gratis con Vueltas — CajaUtil',
    description: 'Mide tiempo transcurrido y compara el intervalo y el total de cada vuelta.',
    url: `${SITE_URL}/cronometro`,
    images: ['https://cajautil.com/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cronómetro Online Gratis con Vueltas — CajaUtil',
    description: 'Mide tiempo transcurrido y compara el intervalo y el total de cada vuelta.',
    images: ['https://cajautil.com/og-image.png'],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cronómetro Online",
  url: `${SITE_URL}/cronometro`,
  description: "Cronómetro web gratuito con pausa, reinicio y registro del intervalo y tiempo total de cada vuelta.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
      <ToolEditorialSection slug="cronometro" />
    </>
  );
}
