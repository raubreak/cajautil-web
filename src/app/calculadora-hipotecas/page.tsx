import React from 'react';
import type { Metadata } from 'next';
import CalculadoraHipotecasClient from '@/components/tools/CalculadoraHipotecasClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Calculadora de Hipotecas — Simulador Online Gratis',
  description: 'Simulador de hipoteca online para calcular cuota mensual, intereses y cuadro de amortización de tu préstamo de forma rápida y gratuita.',
  alternates: {
    canonical: 'https://cajautil.com/calculadora-hipotecas',
  },
};

export default function CalculadoraHipotecas() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <CalculadoraHipotecasClient />

      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 px-2 text-slate-600">
        <h2>Como usar esta calculadora de hipotecas</h2>
        <p>
          Introduce el capital, el plazo y el tipo de interes para obtener una estimacion rapida de la cuota mensual.
          Es una ayuda util para comparar escenarios antes de pedir ofertas a varias entidades.
        </p>

        <h2>Que conviene revisar ademas de la cuota</h2>
        <ul>
          <li><strong>TAE y comisiones:</strong> no te quedes solo con el interes nominal.</li>
          <li><strong>Vinculaciones:</strong> seguros, nomina o tarjetas pueden cambiar el coste real.</li>
          <li><strong>Ahorro disponible:</strong> recuerda gastos de entrada, notaria, tasacion e impuestos.</li>
        </ul>

        <h2>Uso orientativo, no vinculante</h2>
        <p>
          El resultado sirve como referencia inicial. La cuota definitiva depende de la oferta formal, el perfil financiero,
          el tipo de interes aplicado y las condiciones del producto hipotecario concreto.
        </p>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/calculadora-prestamos">Simulador de prestamos</Link></li>
          <li><Link href="/calculadora-porcentajes">Calculadora de porcentajes</Link></li>
        </ul>
      </section>
    </main>
  );
}
