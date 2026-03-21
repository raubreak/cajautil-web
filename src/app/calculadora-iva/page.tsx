import React from 'react';
import type { Metadata } from 'next';
import CalculadoraIVAClient from '@/components/tools/CalculadoraIVAClient';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Calculadora de IVA Online — Añadir o Quitar IVA Fácil',
  description: 'Calcula el IVA (21%, 10%, 4%) de cualquier importe. Extrae la base imponible o añade el impuesto de forma rápida y gratuita.',
  alternates: {
    canonical: 'https://cajautil.com/calculadora-iva',
  },
};

export default function CalculadoraIVA() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <CalculadoraIVAClient />

      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 px-2 text-slate-600">
        <h2>Como usar esta calculadora de IVA</h2>
        <p>
          Esta herramienta te permite <strong>anadir IVA</strong> a un precio base o <strong>quitar IVA</strong> a un importe final para obtener la base imponible.
          Es util para presupuestos, facturas, tickets, compras online y calculos rapidos de impuestos en Espana.
        </p>
        <p>
          Puedes trabajar con los tipos mas habituales del sistema espanol, como el <strong>21%</strong>, el <strong>10%</strong> y el <strong>4%</strong>,
          o introducir un porcentaje personalizado si necesitas una simulacion concreta.
        </p>

        <h2>Que resultado muestra</h2>
        <ul>
          <li><strong>Base imponible:</strong> el precio antes de aplicar el impuesto.</li>
          <li><strong>Cuota de IVA:</strong> la parte del importe que corresponde al impuesto.</li>
          <li><strong>Total:</strong> la suma final con IVA incluido.</li>
        </ul>

        <h2>Preguntas frecuentes</h2>
        <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
            <span>Como quitar el IVA a un precio final</span>
            <Plus className="h-5 w-5 shrink-0 text-blue-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0">
            Cambia al modo Quitar IVA, introduce el precio final y selecciona el porcentaje. La calculadora estimara la base imponible y la cuota del impuesto.
          </p>
        </details>
        <details className="group open:bg-white p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
            <span>Sirve para facturas y tickets</span>
            <Plus className="h-5 w-5 shrink-0 text-blue-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0">
            Si, es una utilidad orientativa para revisar importes rapidamente. Para documentos oficiales conviene comprobar siempre el tipo aplicable y el redondeo final de la factura.
          </p>
        </details>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/calculadora-porcentajes">Calculadora de porcentajes</Link></li>
          <li><Link href="/calculadora-prestamos">Simulador de prestamos</Link></li>
        </ul>
      </section>
    </main>
  );
}
