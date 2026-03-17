import type { Metadata } from 'next';
import Link from 'next/link';
import CalculadoraSueldoNetoClient from "@/components/tools/CalculadoraSueldoNetoClient";

export const metadata: Metadata = {
  title: 'Calculadora de Sueldo Neto 2026 — Calcular Salario Mensual',
  description: 'Calcula tu sueldo neto mensual y anual a partir del bruto. Incluye una estimacion orientativa de IRPF y Seguridad Social para Espana en 2026.',
  alternates: {
    canonical: 'https://cajautil.com/calculadora-sueldo-neto',
  },
};

export default function CalculadoraSueldo() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
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

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/calculadora-iva">Calculadora de IVA</Link></li>
          <li><Link href="/calculadora-porcentajes">Calculadora de porcentajes</Link></li>
        </ul>
      </section>
    </main>
  );
}
