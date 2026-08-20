import CalculadoraPorcentajesClient from "@/components/tools/CalculadoraPorcentajesClient";

export default function CalculadoraPorcentajes() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo usar la calculadora de porcentajes",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <CalculadoraPorcentajesClient />
    </main>
  );
}
