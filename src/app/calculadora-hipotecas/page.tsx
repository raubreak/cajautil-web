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
          Introduce el capital solicitado, el plazo en anos y el tipo de interes nominal anual para obtener una estimacion
          rapida de la cuota mensual. Es una ayuda util para comparar escenarios antes de pedir ofertas a varias entidades.
        </p>
        <p>
          El calculo se basa en el <strong>sistema de amortizacion frances</strong>, que es el mas habitual en Espana:
          cuotas constantes durante toda la vida del prestamo, con una parte destinada a intereses y otra a la
          devolucion del capital. Al principio los intereses representan una proporcion mayor, que va disminuyendo
          con el tiempo mientras aumenta la parte destinada a amortizar el principal.
        </p>

        <h2>Conceptos clave para entender tu hipoteca</h2>
        <ul>
          <li><strong>Capital:</strong> cantidad que solicitas al banco. Normalmente los bancos financian hasta el 80% del valor de tasacion.</li>
          <li><strong>TIN (Tipo de Interes Nominal):</strong> porcentaje anual que el banco cobra por el dinero prestado sin incluir comisiones.</li>
          <li><strong>TAE (Tasa Anual Equivalente):</strong> indicador que incluye el TIN, las comisiones y los gastos obligatorios. Util para comparar ofertas reales.</li>
          <li><strong>Euribor:</strong> indice de referencia para hipotecas a tipo variable en la zona euro. Se revisa periodicamente y afecta directamente a tu cuota.</li>
          <li><strong>Plazo:</strong> tiempo total para devolver el prestamo. Los plazos habituales en Espana oscilan entre 15 y 30 anos.</li>
        </ul>

        <h2>Que conviene revisar ademas de la cuota</h2>
        <ul>
          <li><strong>TAE y comisiones:</strong> no te quedes solo con el interes nominal. Compara la TAE entre entidades.</li>
          <li><strong>Vinculaciones:</strong> seguros, domiciliacion de nomina o tarjetas pueden bonificar el tipo pero tambien anadir costes.</li>
          <li><strong>Ahorro disponible:</strong> ademas de la entrada (normalmente un 20% del valor), recuerda gastos de notaria, tasacion, registro e impuestos (entre un 10-12% adicional).</li>
          <li><strong>Amortizacion anticipada:</strong> revisa si hay penalizacion por devolver capital antes de plazo.</li>
        </ul>

        <h2>Tipo fijo, variable o mixto</h2>
        <p>
          Las hipotecas a <strong>tipo fijo</strong> mantienen la cuota constante durante toda la vida del prestamo,
          lo que aporta seguridad. Las de <strong>tipo variable</strong> se revisan anualmente segun el Euribor, por
          lo que la cuota puede subir o bajar. Las <strong>mixtas</strong> combinan un periodo inicial fijo (normalmente
          entre 5 y 15 anos) con un periodo variable posterior.
        </p>

        <h2>Uso orientativo, no vinculante</h2>
        <p>
          Esta calculadora sirve como referencia inicial para hacerte una idea del importe mensual aproximado.
          La cuota definitiva depende de la oferta formal de la entidad financiera, tu perfil crediticio,
          el tipo de interes real aplicado y las condiciones del producto hipotecario concreto.
          Antes de firmar, compara siempre varias ofertas y consulta con un asesor financiero independiente.
        </p>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/calculadora-prestamos">Simulador de prestamos personales</Link></li>
          <li><Link href="/calculadora-interes-compuesto">Calculadora de interes compuesto</Link></li>
          <li><Link href="/calculadora-porcentajes">Calculadora de porcentajes</Link></li>
          <li><Link href="/calculadora-sueldo-neto">Calculadora de sueldo neto</Link></li>
        </ul>
      </section>
    </main>
  );
}
