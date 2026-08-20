import Link from "next/link";
import { Plus } from "lucide-react";
import CalculadoraDescuentosClient from "@/components/tools/CalculadoraDescuentosClient";

export default function DescuentosApp() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo sacar el descuento de un precio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiplica el precio original por el porcentaje y divide entre 100. Ese será el ahorro. Luego resta el ahorro al precio inicial para obtener el precio final.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué hago si la tienda muestra el porcentaje pero no el ahorro?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Introduce el precio y el porcentaje en la calculadora para conocer el ahorro. También puedes usar la calculadora de porcentajes para comprobar cuánto representa un porcentaje concreto sobre cualquier importe.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo calculo dos descuentos seguidos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aplica el primer descuento y usa el precio resultante como precio original para el segundo. Por ejemplo, un 20% y después un 10% equivalen a un 28% acumulado, no a un 30%.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <CalculadoraDescuentosClient />

      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
        <h2>Cuándo usar esta calculadora de descuentos</h2>
        <p>
          Esta herramienta te ayuda a validar rebajas en tiendas online, promociones puntuales, cupones y ofertas de temporada sin hacer cuentas mentales.
          Solo necesitas el precio original y el porcentaje para ver el ahorro y el precio final al instante.
        </p>

        <h2>Ejemplos de uso habituales</h2>
        <ul>
          <li><strong>Rebajas de ropa:</strong> comprueba si una oferta del 30% realmente encaja en tu presupuesto.</li>
          <li><strong>Black Friday:</strong> compara varios descuentos antes de decidir una compra.</li>
          <li><strong>Tiendas online:</strong> revisa si el porcentaje anunciado coincide con el precio final mostrado.</li>
          <li><strong>Compras profesionales:</strong> estima promociones para stock, material o pedidos recurrentes.</li>
        </ul>

        <h2>Preguntas frecuentes</h2>
        <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
            <span>¿Cómo sacar el descuento de un precio?</span>
            <Plus className="h-5 w-5 shrink-0 text-rose-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0">
            Multiplica el precio original por el porcentaje y divide entre 100. Ese será el ahorro. Luego resta el ahorro al precio inicial para obtener el precio final.
          </p>
        </details>
        <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
            <span>¿Qué hago si la tienda muestra el porcentaje pero no el ahorro?</span>
            <Plus className="h-5 w-5 shrink-0 text-rose-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0">
            Introduce ambos datos en la calculadora y verás cuánto dinero te ahorras. Si quieres comprobar también cuánto representa un porcentaje concreto sobre cualquier importe, usa la <Link href="/calculadora-porcentajes">calculadora de porcentajes</Link>.
          </p>
        </details>
        <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
            <span>¿Cómo calculo dos descuentos seguidos?</span>
            <Plus className="h-5 w-5 shrink-0 text-rose-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0">
            Aplica el primer descuento y usa el precio resultante como precio original para el segundo. Por ejemplo, un 20% y después un 10% equivalen a un 28% acumulado, no a un 30%.
          </p>
        </details>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/calculadora-porcentajes">Calculadora de porcentajes</Link></li>
          <li><Link href="/calculadora-iva">Calculadora de IVA</Link></li>
          <li><Link href="/calculadora-prestamos">Simulador de préstamos</Link></li>
        </ul>
      </section>
    </main>
  );
}
