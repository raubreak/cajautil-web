import type { Metadata } from "next";
import CalculadoraPorcentajesClient from "@/components/tools/CalculadoraPorcentajesClient";

const canonical = "https://cajautil.com/calculadora-porcentajes";

export const metadata: Metadata = {
  title: "Calculadora de Porcentajes Online - IVA, Descuentos y Subidas",
  description:
    "Calcula porcentajes, descuentos, IVA, propinas y aumentos de forma instantanea. Herramienta gratis para saber cuanto es un porcentaje de cualquier cantidad.",
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Calculadora de Porcentajes Online - IVA, Descuentos y Subidas",
    description:
      "Resuelve porcentajes, descuentos y variaciones en segundos con una calculadora rapida y gratuita.",
    url: canonical,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Porcentajes Online",
    description:
      "Calcula cuanto es un porcentaje, un descuento o una subida sobre cualquier cantidad.",
  },
};

export default function CalculadoraPorcentajes() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como calcular un porcentaje de una cantidad",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiplica la cantidad por el porcentaje y divide el resultado entre 100. Esta calculadora automatiza ese proceso para descuentos, IVA, comisiones o subidas.",
        },
      },
      {
        "@type": "Question",
        name: "Como saber el descuento de un precio",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Introduce el porcentaje y el precio base para obtener el importe descontado. Si quieres ver directamente el precio final, puedes usar tambien la calculadora de descuentos.",
        },
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como usar la calculadora de porcentajes",
    step: [
      {
        "@type": "HowToStep",
        text: "Escribe el porcentaje que quieres calcular, por ejemplo 21 para IVA o 15 para un descuento.",
      },
      {
        "@type": "HowToStep",
        text: "Introduce la cantidad base sobre la que aplicar el porcentaje.",
      },
      {
        "@type": "HowToStep",
        text: "Consulta el resultado instantaneo y usa las herramientas relacionadas si necesitas calcular IVA o rebajas completas.",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <CalculadoraPorcentajesClient />
    </main>
  );
}
