import CalculadoraPrestamosClient from "@/components/tools/CalculadoraPrestamosClient";
import Link from "next/link";
import React from "react";
import { Plus } from 'lucide-react';

export const metadata = {
  title: 'Simulador de Préstamos Personales — Cuadro de Amortización',
  description: 'Calcula online tu cuota mensual, coste total y genera la tabla de amortización de tu préstamo bancario de forma gratuita.',
  alternates: {
    canonical: 'https://cajautil.com/calculadora-prestamos',
  },
};

export default function CalculadoraPrestamos() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Cómo calcular la cuota de un préstamo personal',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Debes indicar capital, plazo e interés nominal. La calculadora usa esos datos para estimar una cuota mensual constante y el coste total del préstamo.',
        },
      },
      {
        '@type': 'Question',
        name: 'Qué diferencia hay entre TIN y TAE',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El TIN mide el interés nominal del préstamo, mientras que el TAE incorpora comisiones y otros costes para reflejar mejor el precio real de la financiación.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo usar esta calculadora para financiar estudios universitarios?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Puedes simular importes y plazos generales o ir directamente a la calculadora de préstamos para estudios universitarios si quieres una landing más enfocada a ese caso de uso.',
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

      <CalculadoraPrestamosClient />
      
      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
          <h2>Simulador de Préstamos Personales Online</h2>
          <p>Calcula de forma gratuita y sin compromiso las cuotas mensuales de tu <strong>préstamo personal</strong>. La herramienta utiliza el <strong>sistema de amortización francés</strong>, que es el método más extendido por entidades bancarias en España y Europa, donde la cuota se mantiene constante durante toda la vida del préstamo (si el tipo de interés no varía).</p>

          <h3>¿Qué es el TIN y el TAE?</h3>
          <p>En este simulador utilizamos el <strong>TIN (Tipo de Interés Nominal)</strong> para calcular la cuota bruta. Recuerda que el <strong>TAE (Tasa Anual Equivalente)</strong> es el indicador real del coste, ya que incluye comisiones de apertura, seguros obligatorios y otros gastos adicionales que tu banco podría aplicarte.</p>
          
          <h3>Cómo optimizar tu préstamo</h3>
          <ul>
              <li><strong>Plazo:</strong> A menor plazo, pagas menos intereses totales pero tu cuota mensual será más alta.</li>
              <li><strong>Intereses:</strong> Una variación de solo el 1% en el TIN puede suponer miles de euros de ahorro en la vida del préstamo.</li>
              <li><strong>Amortización:</strong> Realizar pagos extra reduce el capital pendiente y, por tanto, los intereses futuros.</li>
          </ul>

          <h3>Cuándo te conviene usar este simulador</h3>
          <p>
            Te ayuda a comparar ofertas de financiación, decidir si puedes asumir una cuota mensual concreta y anticipar el coste total del préstamo antes de firmar.
            También sirve para hacer simulaciones rápidas cambiando importe, plazo o interés y ver cómo afecta cada variable.
          </p>

          <h3>Caso real: bajar 40 EUR de cuota puede salir muy caro</h3>
          <p>
            Un escenario muy habitual es alargar el plazo para que la cuota &quot;entre mejor&quot; en el presupuesto. A corto plazo parece una buena noticia,
            pero cuando comparas el total devuelto descubres que esa rebaja mensual puede costarte cientos o miles de euros extra durante la vida del préstamo.
          </p>
          <p>
            Por eso esta calculadora no se queda solo en la cuota. Sirve para ver el precio real de ganar comodidad mensual y decidir si ese intercambio te compensa o no.
          </p>

          <p>
            Si estás valorando pagar una carrera, un máster o un curso largo, puedes pasar a la{' '}
            <Link href="/calculadora-prestamos-estudios-universitarios">calculadora de préstamos para estudios universitarios</Link>{' '}
            para revisar ese escenario con una intención más específica.
          </p>

          <h3>Importante antes de tomar una decisión</h3>
          <p>
            El cálculo es orientativo y no sustituye la oferta vinculante de una entidad. Comisiones, seguros, carencias o productos asociados pueden cambiar el coste final.
            Usa esta herramienta como referencia inicial y revisa siempre la documentación contractual completa.
          </p>

          <h3>Checklist mínima antes de aceptar un préstamo</h3>
          <ul>
            <li><strong>Compara el total devuelto:</strong> no solo la cuota mensual.</li>
            <li><strong>Revisa TAE y comisiones:</strong> es donde suelen esconderse diferencias importantes.</li>
            <li><strong>Prueba dos o tres plazos:</strong> para ver el coste de comprar una cuota más baja.</li>
            <li><strong>Calcula tu margen mensual real:</strong> mejor sobre ingresos netos y no sobre un escenario optimista.</li>
          </ul>

          <h3>Preguntas frecuentes</h3>
          <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
            <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
              <span>Cómo calcular la cuota mensual de un préstamo</span>
              <Plus className="h-5 w-5 shrink-0 text-blue-500 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="mt-4 mb-0">
              Introduce el importe solicitado, el plazo en meses y el TIN anual. La herramienta estima tu cuota mensual, el total devuelto y el coste financiero del préstamo.
            </p>
          </details>
          <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
            <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
              <span>Qué mirar además del TIN</span>
              <Plus className="h-5 w-5 shrink-0 text-blue-500 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="mt-4 mb-0">
              Conviene revisar la TAE, las comisiones de apertura, productos vinculados y posibles penalizaciones por amortización anticipada para comparar ofertas en igualdad de condiciones.
            </p>
          </details>
          <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
            <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
              <span>Sirve para financiar estudios universitarios</span>
              <Plus className="h-5 w-5 shrink-0 text-blue-500 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="mt-4 mb-0">
              Sí. Puedes usar esta simulación general y, si tu caso encaja mejor con financiación académica, visitar la <Link href="/calculadora-prestamos-estudios-universitarios">landing específica para estudios universitarios</Link> para mantener la navegación dentro del mismo tema.
            </p>
          </details>

          <h3>Herramientas relacionadas</h3>
          <ul>
            <li><Link href="/calculadora-hipotecas">Calculadora de hipotecas</Link></li>
            <li><Link href="/calculadora-prestamos-estudios-universitarios">Préstamos para estudios universitarios</Link></li>
            <li><Link href="/calculadora-porcentajes">Calculadora de porcentajes</Link></li>
          </ul>
      </section>
    </main>
  );
}
