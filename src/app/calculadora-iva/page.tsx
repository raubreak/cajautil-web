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

        <h2>Caso real: revisar una factura rapido sin sacar la calculadora del movil</h2>
        <p>
          Uno de los usos mas frecuentes de esta pagina es comprobar importes mientras preparas un presupuesto o revisas una factura de proveedor.
          Si el total ya incluye IVA, esta herramienta evita el error clasico de restar el 21 % de forma directa. En vez de improvisar la formula,
          puedes pasar del total a la base en segundos y comprobar si la cuota cuadra.
        </p>
        <p>
          Tambien resulta util cuando comparas precios entre profesionales o quieres estimar margen real. En ese contexto, la rapidez importa mucho,
          pero aun mas no equivocarte por usar una regla mental mal aplicada.
        </p>

        <h2>Situaciones donde mas suele ayudar</h2>
        <ul>
          <li><strong>Presupuestos:</strong> para pasar de base a total sin rehacer formulas cada vez.</li>
          <li><strong>Tickets y gastos:</strong> para separar base e impuesto antes de registrar una compra.</li>
          <li><strong>Comparativa de proveedores:</strong> para ver si dos importes estan hablando realmente del mismo precio antes de impuestos.</li>
          <li><strong>Revision rapida:</strong> para detectar si el tipo aplicado tiene sentido antes de enviar o pagar un documento.</li>
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
            <span>Que error se comete mas al quitar el IVA</span>
            <Plus className="h-5 w-5 shrink-0 text-blue-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0">
            El fallo mas comun es restar directamente el 21 % al total. Si el IVA ya esta incluido, lo correcto es dividir por 1,21 para recuperar la base imponible real.
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
