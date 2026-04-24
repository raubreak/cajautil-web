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
        <h2>Cómo usar esta calculadora de hipotecas</h2>
        <p>
          Introduce el capital solicitado, el plazo en años y el tipo de interés nominal anual para obtener una estimación
          rápida de la cuota mensual. Es una ayuda útil para comparar escenarios antes de pedir ofertas a varias entidades.
        </p>
        <p>
          El cálculo se basa en el <strong>sistema de amortización francés</strong>, que es el más habitual en España:
          cuotas constantes durante toda la vida del préstamo, con una parte destinada a intereses y otra a la
          devolución del capital. Al principio los intereses representan una proporción mayor, que va disminuyendo
          con el tiempo mientras aumenta la parte destinada a amortizar el principal.
        </p>

        <h2>Conceptos clave para entender tu hipoteca</h2>
        <ul>
          <li><strong>Capital:</strong> cantidad que solicitas al banco. Normalmente los bancos financian hasta el 80% del valor de tasación.</li>
          <li><strong>TIN (Tipo de Interés Nominal):</strong> porcentaje anual que el banco cobra por el dinero prestado sin incluir comisiones.</li>
          <li><strong>TAE (Tasa Anual Equivalente):</strong> indicador que incluye el TIN, las comisiones y los gastos obligatorios. Útil para comparar ofertas reales.</li>
          <li><strong>Euríbor:</strong> índice de referencia para hipotecas a tipo variable en la zona euro. Se revisa periódicamente y afecta directamente a tu cuota.</li>
          <li><strong>Plazo:</strong> tiempo total para devolver el préstamo. Los plazos habituales en España oscilan entre 15 y 30 años.</li>
        </ul>

        <h2>Qué conviene revisar además de la cuota</h2>
        <ul>
          <li><strong>TAE y comisiones:</strong> no te quedes solo con el interés nominal. Compara la TAE entre entidades.</li>
          <li><strong>Vinculaciones:</strong> seguros, domiciliación de nómina o tarjetas pueden bonificar el tipo pero también añadir costes.</li>
          <li><strong>Ahorro disponible:</strong> además de la entrada (normalmente un 20% del valor), recuerda gastos de notaría, tasación, registro e impuestos (entre un 10-12% adicional).</li>
          <li><strong>Amortización anticipada:</strong> revisa si hay penalización por devolver capital antes de plazo.</li>
        </ul>

        <h2>Caso real: cuando una cuota asumible no significa una compra comoda</h2>
        <p>
          Mucha gente llega a esta calculadora con una pregunta sencilla: &quot;si el banco me deja una cuota de 850 EUR, puedo permitírmela?&quot;.
          La simulación ayuda, pero la respuesta real casi siempre exige mirar más cosas: ahorro restante después de la entrada, gastos de comunidad,
          IBI, reformas iniciales y margen mensual si suben tipos o baja un ingreso.
        </p>
        <p>
          Una forma útil de usarla es probar primero un escenario ideal y luego otro más conservador. Si en el escenario prudente la cuota ya te aprieta,
          probablemente no te interese centrarte solo en que &quot;el banco me la concede&quot;. Lo importante es que la hipoteca encaje en tu vida real durante años.
        </p>

        <h2>Tipo fijo, variable o mixto</h2>
        <p>
          Las hipotecas a <strong>tipo fijo</strong> mantienen la cuota constante durante toda la vida del préstamo,
          lo que aporta seguridad. Las de <strong>tipo variable</strong> se revisan anualmente según el Euribor, por
          lo que la cuota puede subir o bajar. Las <strong>mixtas</strong> combinan un periodo inicial fijo (normalmente
          entre 5 y 15 años) con un periodo variable posterior.
        </p>

        <h2>Preguntas útiles antes de tomarte en serio una oferta</h2>
        <ul>
          <li><strong>Qué pasa con la cuota si el tipo sube:</strong> especialmente importante en hipotecas variables o mixtas.</li>
          <li><strong>Cuánto efectivo te queda tras firmar:</strong> comprar sin colchón complica cualquier imprevisto.</li>
          <li><strong>Cuánto cuestan las vinculaciones:</strong> una bonificación puede salir cara si obliga a seguros o productos poco competitivos.</li>
          <li><strong>Qué parte del ingreso familiar comprometes:</strong> conviene mirar el esfuerzo sobre ingresos netos y no solo sobre el bruto.</li>
        </ul>

        <h2>Uso orientativo, no vinculante</h2>
        <p>
          Esta calculadora sirve como referencia inicial para hacerte una idea del importe mensual aproximado.
          La cuota definitiva depende de la oferta formal de la entidad financiera, tu perfil crediticio,
          el tipo de interés real aplicado y las condiciones del producto hipotecario concreto.
          Antes de firmar, compara siempre varias ofertas y consulta con un asesor financiero independiente.
        </p>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/calculadora-prestamos">Simulador de préstamos personales</Link></li>
          <li><Link href="/calculadora-interes-compuesto">Calculadora de interés compuesto</Link></li>
          <li><Link href="/calculadora-porcentajes">Calculadora de porcentajes</Link></li>
          <li><Link href="/calculadora-sueldo-neto">Calculadora de sueldo neto</Link></li>
        </ul>
      </section>
    </main>
  );
}
