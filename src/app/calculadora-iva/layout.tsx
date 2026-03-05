import type { Metadata } from 'next';

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: 'Calculadora de IVA (Añadir y Quitar IVA) | CajaUtil.com',
  description: 'Calcula el IVA fácilmente. Añade o quita el IVA de cualquier precio. Calcula la base imponible y el precio final con el tipo de IVA que elijas (21%, 10%, 4%).',
  keywords: [
    "calculadora iva",
    "calcular iva",
    "añadir iva",
    "quitar iva",
    "desglosar iva",
    "base imponible",
    "precio con iva",
    "precio sin iva",
    "iva españa 21",
    "calculadora impuestos"
  ],
  alternates: {
    canonical: `${SITE_URL}/calculadora-iva`,
  },
  openGraph: {
    title: 'Calculadora de IVA Fácil y Rápida',
    description: 'Añade o extrae el IVA de cualquier importe. Comprueba la base imponible y la cuota de IVA al instante (por defecto 21%).',
    url: `${SITE_URL}/calculadora-iva`,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de IVA",
  url: `${SITE_URL}/calculadora-iva`,
  description: "Herramienta online para añadir o quitar el Impuesto sobre el Valor Añadido (IVA) a un importe, calculando la base imponible y el importe total a partir del porcentaje indicado.",
  applicationCategory: "BusinessApplication",
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
