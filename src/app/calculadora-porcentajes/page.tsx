import CalculadoraPorcentajesClient from "@/components/tools/CalculadoraPorcentajesClient";

export default function CalculadoraPorcentajes() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo usar la calculadora de porcentajes",
    step: [
      {
        "@type": "HowToStep",
        text: "Elige si quieres calcular un porcentaje de una cantidad, una proporción o una variación porcentual.",
      },
      {
        "@type": "HowToStep",
        text: "Introduce los dos valores que solicita la operación seleccionada.",
      },
      {
        "@type": "HowToStep",
        text: "Consulta el resultado instantáneo y revisa la fórmula indicada bajo los campos.",
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
