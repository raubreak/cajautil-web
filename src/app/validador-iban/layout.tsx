import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Validador de IBAN Seguro y Privado | CajaUtil.com',
  description: 'Comprueba si un número de cuenta bancaria IBAN es correcto y válido. La validación se hace 100% en tu navegador por motivos de seguridad.',
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
    title: 'Validador de IBAN Online 100% Seguro',
    description: 'Verifica códigos de cuenta bancaria IBAN al instante. Tus datos no se envían a ningún servidor, el algoritmo funciona localmente.',
    url: `${SITE_URL}/validador-iban`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Validador de IBAN",
  url: `${SITE_URL}/validador-iban`,
  description: "Herramienta online para auditar y validar números de cuenta bancarios (IBAN) usando el algoritmo matemático MOD 97-10 de manera segura en el cliente.",
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
    </>
  );
}
