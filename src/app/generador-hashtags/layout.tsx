import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Generador de Hashtags para Instagram y TikTok | Gratis',
  description: 'Genera los mejores hashtags para Instagram, TikTok y Twitter a partir de una palabra clave. Copia y pega los hashtags más relevantes para crecer en redes sociales gratis.',
  keywords: [
    "generador de hashtags",
    "hashtags instagram",
    "hashtags tiktok",
    "generador hashtags gratis",
    "mejores hashtags instagram",
    "hashtag generator",
    "hashtags populares"
  ],
  alternates: { canonical: `${SITE_URL}/generador-hashtags` },
  openGraph: {
    title: 'Generador de Hashtags Gratis para Redes Sociales',
    description: 'Introduce tu tema y genera al instante los mejores hashtags para Instagram, TikTok, Twitter y LinkedIn.',
    url: `${SITE_URL}/generador-hashtags`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generador de Hashtags",
  url: `${SITE_URL}/generador-hashtags`,
  description: "Herramienta gratuita para generar hashtags relevantes para Instagram, TikTok y otras redes sociales a partir de palabras clave.",
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
