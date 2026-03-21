import type { Metadata } from 'next';
import Link from 'next/link';
import CalculadoraSueldoNetoClient from "@/components/tools/CalculadoraSueldoNetoClient";

export const metadata: Metadata = {
  title: 'Calculadora de Sueldo Neto 2026 — Calcular Salario Mensual',
  description: 'Calcula tu sueldo neto mensual y anual a partir del bruto. Incluye una estimacion orientativa de IRPF y Seguridad Social para Espana en 2026.',
  alternates: {
    canonical: 'https://cajautil.com/calculadora-sueldo-neto',
  },
  openGraph: {
    title: 'Calculadora de Sueldo Neto 2026 — Calcular Salario Mensual',
    description:
      'Calcula tu sueldo neto mensual y anual a partir del bruto con una estimacion orientativa de IRPF y Seguridad Social en Espana.',
    url: 'https://cajautil.com/calculadora-sueldo-neto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Sueldo Neto 2026 — Calcular Salario Mensual',
    description:
      'Simula tu salario neto mensual en 12 o 14 pagas con una estimacion orientativa de IRPF y Seguridad Social.',
  },
};

export default function CalculadoraSueldo() {
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como calcular tu sueldo neto con la calculadora',
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
        text: 'Revisa la estimacion de IRPF, Seguridad Social y neto mensual resultante.',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Como pasar de sueldo bruto a neto en Espana',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Debes restar al salario bruto las cotizaciones a la Seguridad Social y la retencion de IRPF. Esta calculadora ofrece una estimacion orientativa para 12 o 14 pagas.',
        },
      },
      {
        '@type': 'Question',
        name: 'Es lo mismo cobrar en 12 que en 14 pagas',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El importe anual puede ser el mismo, pero cambia como se reparte el dinero durante el ano. Con 14 pagas la cuantia ordinaria mensual suele ser menor y se cobran extras en momentos concretos.',
        },
      },
      {
        '@type': 'Question',
        name: 'La calculadora sustituye una nomina real',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Sirve como simulacion inicial. El resultado final depende de retenciones reales, convenio, beneficios, reducciones y circunstancias personales del trabajador.',
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
        <h2>Como interpretar tu sueldo neto</h2>
        <p>
          El resultado es una <strong>estimacion orientativa</strong> del salario que podrias recibir tras descontar IRPF y cotizaciones sociales.
          El neto real puede variar segun tu comunidad autonoma, situacion familiar, contrato, pagas prorrateadas y otras circunstancias laborales.
        </p>
        <p>
          Esta calculadora resulta util para comparar ofertas de empleo, revisar una subida salarial o hacer simulaciones rapidas antes de hablar con una asesoria o con tu empresa.
        </p>

        <h2>Que factores pueden cambiar el neto</h2>
        <ul>
          <li><strong>IRPF:</strong> cambia segun ingresos, situacion personal y retencion aplicada por la empresa.</li>
          <li><strong>Numero de pagas:</strong> reparte el mismo neto anual en 12 o 14 cobros.</li>
          <li><strong>Complementos:</strong> bonus, pluses, variables o dietas pueden alterar el importe mensual.</li>
          <li><strong>Convenio y contrato:</strong> influyen en bases, extras y cotizaciones.</li>
        </ul>

        <h2>Cuando usar esta calculadora</h2>
        <p>
          Es especialmente util para una primera aproximacion. Si necesitas una cifra exacta para nominas, finiquitos o cambios complejos de contrato,
          conviene contrastar el resultado con un profesional laboral o con los datos fiscales actualizados de tu caso.
        </p>

        <h2>Ejemplos orientativos de sueldo bruto a neto</h2>
        <p>
          Si buscas una referencia rapida para salarios como 25.000, 30.000 o 40.000 euros brutos al ano, estas estimaciones usan la misma logica que la calculadora principal.
          Son utiles para comparar ofertas y estimar cuanto cambia tu salario si pasas de 12 a 14 pagas.
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
          Si estas valorando una subida salarial, puedes calcular antes el impacto porcentual en la <Link href="/calculadora-porcentajes">calculadora de porcentajes</Link> y despues volver aqui para estimar el neto final.
        </p>

        <h2>Que revisar si usas el neto para tomar decisiones</h2>
        <ul>
          <li><strong>Oferta laboral:</strong> compara el neto mensual real y no solo el bruto anual anunciado.</li>
          <li><strong>Hipoteca o alquiler:</strong> usa el neto aproximado como base antes de pasar a la <Link href="/calculadora-hipotecas">calculadora de hipotecas</Link>.</li>
          <li><strong>Pagas extra:</strong> comprueba si te conviene ver el dinero mas repartido o concentrado en dos extras.</li>
          <li><strong>Revision salarial:</strong> estima el efecto de una subida del 3%, 5% o 10% antes de negociarla.</li>
        </ul>

        <h2>Preguntas frecuentes</h2>
        <details className="open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="cursor-pointer font-bold text-slate-800">Como pasar de sueldo bruto a neto</summary>
          <p className="mt-4 mb-0">
            Introduce el salario bruto anual, elige si cobras en 12 o 14 pagas y revisa la estimacion de IRPF y cotizaciones.
            Si tambien necesitas calcular una subida o una retencion concreta, puedes apoyarte en la <Link href="/calculadora-porcentajes">calculadora de porcentajes</Link>.
          </p>
        </details>
        <details className="open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="cursor-pointer font-bold text-slate-800">Que cambia entre 12 y 14 pagas</summary>
          <p className="mt-4 mb-0">
            El salario anual puede ser igual, pero el reparto mensual cambia. Con 14 pagas cobras dos extras y la mensualidad ordinaria suele ser menor que con 12 pagas prorrateadas.
          </p>
        </details>
        <details className="open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="cursor-pointer font-bold text-slate-800">Sirve para negociar una oferta laboral</summary>
          <p className="mt-4 mb-0">
            Si. Te ayuda a comparar bruto anual, neto mensual y diferencias entre varias propuestas antes de aceptar un contrato o pedir una revision salarial.
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
