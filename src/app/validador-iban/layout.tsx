import type { Metadata } from 'next';

import ToolEditorialSection from '@/components/ToolEditorialSection';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Validador de IBAN Español Online',
  description: 'Comprueba un IBAN español con MOD-97 y los dígitos internos del CCC en tu navegador. No verifica titularidad ni existencia de la cuenta.',
  keywords: [
    "validador iban",
    "comprobar iban",
    "validar iban españa",
    "verificar numero de cuenta",
    "calculadora iban",
    "comprobar cuenta bancaria segura"
  ],
  alternates: {
    canonical: `${SITE_URL}/validador-iban`,
  },
  openGraph: {
    title: 'Validador de IBAN Español | Comprobación MOD-97',
    description: 'Comprueba localmente MOD-97 y los dígitos internos del CCC antes de revisar los datos con tu banco.',
    url: `${SITE_URL}/validador-iban`,
    images: ['https://cajautil.com/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Validador de IBAN Español | MOD-97 y CCC',
    description: 'Comprueba localmente los controles matemáticos de un IBAN español sin verificar titularidad ni existencia.',
    images: ['https://cajautil.com/og-image.png'],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Validador de IBAN",
  url: `${SITE_URL}/validador-iban`,
  description: "Herramienta online para comprobar la estructura, MOD 97-10 y los dígitos internos del CCC de un IBAN español en el navegador.",
  applicationCategory: "FinanceApplication",
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
      <ToolEditorialSection slug="validador-iban" compact />
    </>
  );
}
