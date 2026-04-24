import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import CalculadoraSueldoNetoClient from "@/components/tools/CalculadoraSueldoNetoClient";

export const metadata: Metadata = {
  title: 'Calculadora de Sueldo Neto 2026 — Calcular Salario Mensual',
  description: 'Calcula tu sueldo neto mensual y anual a partir del bruto. Incluye una estimación orientativa de IRPF y Seguridad Social para España en 2026.',
  alternates: {
    canonical: 'https://cajautil.com/calculadora-sueldo-neto',
  },
  openGraph: {
    title: 'Calculadora de Sueldo Neto 2026 — Calcular Salario Mensual',
    description:
      'Calcula tu sueldo neto mensual y anual a partir del bruto con una estimación orientativa de IRPF y Seguridad Social en España.',
    url: 'https://cajautil.com/calculadora-sueldo-neto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Sueldo Neto 2026 — Calcular Salario Mensual',
    description:
      'Simula tu salario neto mensual en 12 o 14 pagas con una estimación orientativa de IRPF y Seguridad Social.',
  },
};

export default function CalculadoraSueldo() {
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Cómo calcular tu sueldo neto con la calculadora',
    step: [
      {
        '@type': 'HowToStep',
        text: 'Introduce tu salario bruto anual en euros.',
      },
      {
        '@type': 'HowToStep',
        text: 'Selecciona si cobras en 12 o 14 pagas.',
      },
      {
        '@type': 'HowToStep',
        text: 'Revisa la estimación de IRPF, Seguridad Social y neto mensual resultante.',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Cómo pasar de sueldo bruto a neto en España',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Debes restar al salario bruto las cotizaciones a la Seguridad Social y la retención de IRPF. Esta calculadora ofrece una estimación orientativa para 12 o 14 pagas.',
        },
      },
      {
        '@type': 'Question',
        name: 'Es lo mismo cobrar en 12 que en 14 pagas',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El importe anual puede ser el mismo, pero cambia cómo se reparte el dinero durante el año. Con 14 pagas la cuantía ordinaria mensual suele ser menor y se cobran extras en momentos concretos.',
        },
      },
      {
        '@type': 'Question',
        name: 'La calculadora sustituye una nómina real',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Sirve como simulación inicial. El resultado final depende de retenciones reales, convenio, beneficios, reducciones y circunstancias personales del trabajador.',
        },
      },
      {
        '@type': 'Question',
        name: 'Cuánto son 2000 euros brutos al mes en neto',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Depende de si hablas de 12 o 14 pagas y de tu retención real de IRPF. Como referencia, 2000 euros brutos al mes en 12 pagas equivalen a 24000 euros brutos al año, que puedes simular aquí para obtener un neto mensual orientativo.',
        },
      },
      {
        '@type': 'Question',
        name: 'Cuánto son 26000 euros brutos al año en neto',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El neto depende sobre todo del IRPF aplicado, de las cotizaciones y del número de pagas. Con esta calculadora puedes estimar rápidamente cuánto quedaría al mes en 12 o 14 pagas.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <CalculadoraSueldoNetoClient />

      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 px-2 text-slate-600">
        <h2>Cómo interpretar tu sueldo neto</h2>
        <p>
          El resultado es una <strong>estimación orientativa</strong> del salario que podrías recibir tras descontar IRPF y cotizaciones sociales.
          El neto real puede variar según tu comunidad autónoma, situación familiar, contrato, pagas prorrateadas y otras circunstancias laborales.
        </p>
        <p>
          Esta calculadora resulta útil para comparar ofertas de empleo, revisar una subida salarial o hacer simulaciones rápidas antes de hablar con una asesoría o con tu empresa.
        </p>

        <h2>Qué factores pueden cambiar el neto</h2>
        <ul>
          <li><strong>IRPF:</strong> cambia según ingresos, situación personal y retención aplicada por la empresa.</li>
          <li><strong>Número de pagas:</strong> reparte el mismo neto anual en 12 o 14 cobros.</li>
          <li><strong>Complementos:</strong> bonus, pluses, variables o dietas pueden alterar el importe mensual.</li>
          <li><strong>Convenio y contrato:</strong> influyen en bases, extras y cotizaciones.</li>
        </ul>

        <h2>Cuando usar esta calculadora</h2>
        <p>
          Es especialmente útil para una primera aproximación. Si necesitas una cifra exacta para nóminas, finiquitos o cambios complejos de contrato,
          conviene contrastar el resultado con un profesional laboral o con los datos fiscales actualizados de tu caso.
        </p>

        <h2>Caso real: comparar una oferta que parecía mejor de lo que era</h2>
        <p>
          Un uso muy común de esta herramienta es comparar dos ofertas que en bruto parecen parecidas pero en la práctica cambian bastante tu liquidez.
          Por ejemplo, una propuesta de <strong>28.000 EUR en 14 pagas</strong> frente a otra de <strong>31.000 EUR en 12 pagas</strong> puede dar una sensación distinta
          cuando conviertes ambas a neto mensual y añades gastos de transporte, comida o teletrabajo perdido.
        </p>
        <p>
          En ese tipo de decisión, esta calculadora sirve para aterrizar la conversación. El objetivo no es acertar el último euro, sino evitar negociar a ciegas.
          Cuando ya ves el neto mensual aproximado, resulta mucho más fácil decidir si una subida realmente mejora tu situación o solo suena bien en el titular.
        </p>

        <h2>Ejemplos orientativos de sueldo bruto a neto</h2>
        <p>
          Si buscas una referencia rápida para salarios como 25.000, 30.000 o 40.000 euros brutos al año, estas estimaciones usan la misma lógica que la calculadora principal.
          Son útiles para comparar ofertas y estimar cuánto cambia tu salario si pasas de 12 a 14 pagas.
        </p>
        <div className="not-prose overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm text-slate-700">
            <thead className="bg-slate-100 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Bruto anual</th>
                <th className="px-4 py-3">IRPF estimado</th>
                <th className="px-4 py-3">Neto mensual 12 pagas</th>
                <th className="px-4 py-3">Neto mensual 14 pagas</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3 font-semibold">25.000 EUR</td>
                <td className="px-4 py-3">15%</td>
                <td className="px-4 py-3">1.639 EUR aprox.</td>
                <td className="px-4 py-3">1.404 EUR aprox.</td>
              </tr>
              <tr className="border-t border-slate-200 bg-slate-50/70">
                <td className="px-4 py-3 font-semibold">30.000 EUR</td>
                <td className="px-4 py-3">15%</td>
                <td className="px-4 py-3">1.966 EUR aprox.</td>
                <td className="px-4 py-3">1.685 EUR aprox.</td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3 font-semibold">40.000 EUR</td>
                <td className="px-4 py-3">20%</td>
                <td className="px-4 py-3">2.455 EUR aprox.</td>
                <td className="px-4 py-3">2.104 EUR aprox.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Si estás valorando una subida salarial, puedes calcular antes el impacto porcentual en la <Link href="/calculadora-porcentajes">calculadora de porcentajes</Link> y después volver aquí para estimar el neto final.
        </p>

        <h2>Referencias rápidas para consultas frecuentes</h2>
        <p>
          Muchas búsquedas de sueldo neto giran en torno a cantidades concretas como <strong>22.000</strong>, <strong>26.000</strong> o <strong>28.000 euros brutos al año</strong>,
          así como dudas del tipo <strong>2000 brutos a netos</strong> o <strong>2400 brutos a netos</strong>. Esta tabla ofrece una referencia inicial con la misma lógica orientativa de la calculadora.
        </p>
        <div className="not-prose overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm text-slate-700">
            <thead className="bg-slate-100 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Busqueda habitual</th>
                <th className="px-4 py-3">Equivalencia bruta</th>
                <th className="px-4 py-3">Neto 12 pagas aprox.</th>
                <th className="px-4 py-3">Neto 14 pagas aprox.</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3 font-semibold">22.000 brutos a netos</td>
                <td className="px-4 py-3">22.000 EUR al año</td>
                <td className="px-4 py-3">1.442 EUR aprox.</td>
                <td className="px-4 py-3">1.236 EUR aprox.</td>
              </tr>
              <tr className="border-t border-slate-200 bg-slate-50/70">
                <td className="px-4 py-3 font-semibold">26.000 brutos a netos</td>
                <td className="px-4 py-3">26.000 EUR al año</td>
                <td className="px-4 py-3">1.704 EUR aprox.</td>
                <td className="px-4 py-3">1.461 EUR aprox.</td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3 font-semibold">28.000 brutos a netos</td>
                <td className="px-4 py-3">28.000 EUR al año</td>
                <td className="px-4 py-3">1.835 EUR aprox.</td>
                <td className="px-4 py-3">1.573 EUR aprox.</td>
              </tr>
              <tr className="border-t border-slate-200 bg-slate-50/70">
                <td className="px-4 py-3 font-semibold">2000 brutos a netos</td>
                <td className="px-4 py-3">24.000 EUR al año si son 12 pagas</td>
                <td className="px-4 py-3">1.573 EUR aprox.</td>
                <td className="px-4 py-3">1.348 EUR aprox.</td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3 font-semibold">2400 brutos a netos</td>
                <td className="px-4 py-3">28.800 EUR al año si son 12 pagas</td>
                <td className="px-4 py-3">1.888 EUR aprox.</td>
                <td className="px-4 py-3">1.618 EUR aprox.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Ten en cuenta que estas cifras son orientativas. Si tu empresa aplica otro IRPF, tienes pagas extra prorrateadas o trabajas con complementos, conviene introducir tu caso exacto en la calculadora para afinar mejor.
        </p>

        <h2>Qué revisar si usas el neto para tomar decisiones</h2>
        <ul>
          <li><strong>Oferta laboral:</strong> compara el neto mensual real y no solo el bruto anual anunciado.</li>
          <li><strong>Hipoteca o alquiler:</strong> usa el neto aproximado como base antes de pasar a la <Link href="/calculadora-hipotecas">calculadora de hipotecas</Link>.</li>
          <li><strong>Pagas extra:</strong> comprueba si te conviene ver el dinero más repartido o concentrado en dos extras.</li>
          <li><strong>Revisión salarial:</strong> estima el efecto de una subida del 3%, 5% o 10% antes de negociarla.</li>
        </ul>

        <h2>Errores habituales al interpretar el resultado</h2>
        <ul>
          <li><strong>Tomar el neto como definitivo:</strong> la retención real puede cambiar por situación familiar, comunidad autónoma o ajustes de empresa.</li>
          <li><strong>Olvidar variables y bonus:</strong> una parte del paquete puede no llegar todos los meses.</li>
          <li><strong>Comparar 12 pagas con 14 sin convertir:</strong> el impacto psicologico y de tesoreria no es el mismo.</li>
          <li><strong>No mirar el coste total del cambio:</strong> transporte, guarderia o mudanza pueden comerse la mejora.</li>
        </ul>

        <h2>Preguntas frecuentes</h2>
        <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
            <span>Cómo pasar de sueldo bruto a neto</span>
            <Plus className="h-5 w-5 shrink-0 text-amber-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0">
            Introduce el salario bruto anual, elige si cobras en 12 o 14 pagas y revisa la estimación de IRPF y cotizaciones.
            Si también necesitas calcular una subida o una retención concreta, puedes apoyarte en la <Link href="/calculadora-porcentajes">calculadora de porcentajes</Link>.
          </p>
        </details>
        <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
            <span>Qué cambia entre 12 y 14 pagas</span>
            <Plus className="h-5 w-5 shrink-0 text-amber-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0">
            El salario anual puede ser igual, pero el reparto mensual cambia. Con 14 pagas cobras dos extras y la mensualidad ordinaria suele ser menor que con 12 pagas prorrateadas.
          </p>
        </details>
        <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
            <span>Sirve para negociar una oferta laboral</span>
            <Plus className="h-5 w-5 shrink-0 text-amber-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0">
            Sí. Te ayuda a comparar bruto anual, neto mensual y diferencias entre varias propuestas antes de aceptar un contrato o pedir una revisión salarial.
          </p>
        </details>
        <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
            <span>Cuánto son 2000 euros brutos al mes en neto</span>
            <Plus className="h-5 w-5 shrink-0 text-amber-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0">
            Si cobras 2000 EUR brutos al mes en 12 pagas, partes de 24.000 EUR brutos al año. El neto final depende del IRPF y de tu situación personal, pero la tabla superior te da una referencia rápida y la calculadora te permite ajustar el caso.
          </p>
        </details>
        <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
            <span>Cuánto son 26000 o 28000 brutos al año en neto</span>
            <Plus className="h-5 w-5 shrink-0 text-amber-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0">
            Son dos de las consultas más habituales cuando comparas ofertas. Puedes usar las referencias orientativas de esta página para una respuesta rápida y después simular 12 o 14 pagas para acercarte más a tu situación real.
          </p>
        </details>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/calculadora-porcentajes">Calculadora de porcentajes</Link></li>
          <li><Link href="/calculadora-hipotecas">Calculadora de hipotecas</Link></li>
          <li><Link href="/calculadora-iva">Calculadora de IVA</Link></li>
        </ul>
      </section>
    </main>
  );
}
