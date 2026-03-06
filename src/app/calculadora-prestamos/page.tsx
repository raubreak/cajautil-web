import CalculadoraPrestamosClient from "@/components/tools/CalculadoraPrestamosClient";
import React from "react";

export const metadata = {
  title: 'Simulador de Préstamos Personales con Cuadro de Amortización | CajaUtil',
  description: 'Calcula online tu cuota mensual, coste total y genera la tabla de amortización de tu préstamo bancario.',
};

export default function CalculadoraPrestamos() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
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
      </section>
    </main>
  );
}
