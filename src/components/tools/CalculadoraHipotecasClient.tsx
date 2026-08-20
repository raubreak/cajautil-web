"use client";

import React, { useState } from 'react';
import { Home, Euro, Calendar, Percent, Banknote, Info, Plus } from 'lucide-react';

const MAX_MORTGAGE_AMOUNT = 10_000_000;
const MAX_INTEREST_RATE = 100;

const formatCurrency = (value: number) =>
  value.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const CalculadoraHipotecasClient = () => {
  const [importe, setImporte] = useState('150000');
  const [anios, setAnios] = useState('25');
  const [interes, setInteres] = useState('3.5');

  const importeNumerico = Number(importe);
  const aniosNumerico = Number(anios);
  const interesNumerico = Number(interes);
  const errorImporte = importe.trim() === ''
    ? 'Introduce el capital que quieres solicitar.'
    : !Number.isFinite(importeNumerico) || importeNumerico <= 0 || importeNumerico > MAX_MORTGAGE_AMOUNT
      ? 'El importe debe estar entre 0,01 € y 10.000.000 €.'
      : null;
  const errorAnios = anios.trim() === ''
    ? 'Introduce el plazo de amortización.'
    : !Number.isInteger(aniosNumerico) || aniosNumerico < 1 || aniosNumerico > 50
      ? 'El plazo debe ser un número entero entre 1 y 50 años.'
      : null;
  const errorInteres = interes.trim() === ''
    ? 'Introduce el TIN anual; puede ser 0.'
    : !Number.isFinite(interesNumerico) || interesNumerico < 0 || interesNumerico > MAX_INTEREST_RATE
      ? 'El TIN debe estar entre 0% y 100%.'
      : null;
  const hasErrors = Boolean(errorImporte || errorAnios || errorInteres);

  const resultado = (() => {
    if (hasErrors) return null;

    const meses = aniosNumerico * 12;
    const interesMensual = interesNumerico / 100 / 12;

    let cuota: number;
    if (interesNumerico === 0) {
      cuota = importeNumerico / meses;
    } else {
      const factor = Math.pow(1 + interesMensual, meses);
      cuota = importeNumerico * (interesMensual * factor) / (factor - 1);
    }

    const pagoTotal = cuota * meses;
    const interesesTotales = pagoTotal - importeNumerico;

    if (![cuota, pagoTotal, interesesTotales].every(Number.isFinite)) return null;

    return {
      cuotaMensual: cuota,
      totalIntereses: interesesTotales,
      costeTotal: pagoTotal,
      meses,
      interesMensual,
    };
  })();

  const amortizacionInicial = (() => {
    if (!resultado) return [];

    let pendiente = importeNumerico;
    return Array.from({ length: Math.min(12, resultado.meses) }, (_, index) => {
      const interesesMes = pendiente * resultado.interesMensual;
      const capitalMes = resultado.cuotaMensual - interesesMes;
      pendiente = Math.max(0, pendiente - capitalMes);

      return {
        numero: index + 1,
        cuota: resultado.cuotaMensual,
        capital: capitalMes,
        intereses: interesesMes,
        pendiente,
      };
    });
  })();

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4 sm:px-6 z-10">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-sky-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-sky-50">
          <Home className="w-8 h-8 sm:w-10 sm:h-10 text-sky-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Calculadora de <span className="text-sky-600">Hipotecas</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-2">
          Simulador online para estimar la cuota de una hipoteca. Rápido, gratis y sin enviar datos al banco.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        {/* PANEL IZQUIERDO: CONTROLES */}
        <section className="lg:col-span-2 bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 sm:p-8 border border-slate-100 h-fit">
          <div className="space-y-6">
            
            {/* Monto del Préstamo */}
            <div>
              <label htmlFor="mortgage-amount" className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                Importe del Préstamo
                <span className="text-sky-700">{!errorImporte ? `${importeNumerico.toLocaleString('es-ES')} €` : '—'}</span>
              </label>
              <div className="relative">
                <Euro className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="mortgage-amount"
                  type="number"
                  min="0.01"
                  max={MAX_MORTGAGE_AMOUNT}
                  step="1000"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-sky-100 focus:border-sky-500 text-lg font-semibold transition-all"
                  value={importe}
                  onChange={(event) => setImporte(event.target.value)}
                  aria-describedby={errorImporte ? 'mortgage-amount-error' : undefined}
                  aria-invalid={Boolean(errorImporte)}
                />
              </div>
              {errorImporte && <p id="mortgage-amount-error" className="mt-2 text-xs font-semibold text-rose-700">{errorImporte}</p>}
            </div>

            {/* Plazo */}
            <div>
              <label htmlFor="mortgage-years" className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                Plazo de amortización
                <span className="text-sky-700">{!errorAnios ? `${aniosNumerico} ${aniosNumerico === 1 ? 'año' : 'años'}` : '—'}</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="mortgage-years"
                  type="number"
                  min="1"
                  max="50"
                  step="1"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-sky-100 focus:border-sky-500 text-lg font-semibold transition-all"
                  value={anios}
                  onChange={(event) => setAnios(event.target.value)}
                  aria-describedby={errorAnios ? 'mortgage-years-error' : undefined}
                  aria-invalid={Boolean(errorAnios)}
                />
              </div>
              {errorAnios && <p id="mortgage-years-error" className="mt-2 text-xs font-semibold text-rose-700">{errorAnios}</p>}
            </div>

            {/* Tipo de Interés */}
            <div>
              <label htmlFor="mortgage-interest" className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                TIN anual
                <span className="text-sky-700">{!errorInteres ? `${interesNumerico.toLocaleString('es-ES')}%` : '—'}</span>
              </label>
              <div className="relative mb-3">
                <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="mortgage-interest"
                  type="number"
                  min="0"
                  max={MAX_INTEREST_RATE}
                  step="0.1"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-sky-100 focus:border-sky-500 text-lg font-semibold transition-all"
                  value={interes}
                  onChange={(event) => setInteres(event.target.value)}
                  aria-describedby={errorInteres ? 'mortgage-interest-help mortgage-interest-error' : 'mortgage-interest-help'}
                  aria-invalid={Boolean(errorInteres)}
                />
              </div>
              <p id="mortgage-interest-help" className="text-xs leading-relaxed text-slate-500">
                Introduce el TIN, no la TAE. La cuota no incluye comisiones, seguros ni otros productos vinculados.
              </p>
              {errorInteres && <p id="mortgage-interest-error" className="mt-2 text-xs font-semibold text-rose-700">{errorInteres}</p>}
            </div>
            
          </div>
        </section>

        {/* PANEL DERECHO: RESULTADOS */}
        <section className="lg:col-span-3 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl shadow-xl shadow-indigo-900/20 p-6 sm:p-10 border border-slate-800 flex flex-col justify-center text-white relative overflow-hidden" role="status" aria-live="polite">
          {/* Elementos decorativos */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500 rounded-full mix-blend-screen filter blur-[80px] opacity-40"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30"></div>
          
          <div className="relative z-10">
            <h2 className="text-sky-300 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Banknote className="w-5 h-5" /> Tu Cuota Mensual Resultante
            </h2>
            
            <div className="mb-10">
              <span className="text-5xl sm:text-7xl font-black tabular-nums tracking-tight">
                {resultado ? resultado.cuotaMensual.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'}
              </span>
              <span className="text-2xl text-slate-300 font-medium ml-2">€/mes</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-700/50 pt-8 mt-2">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                 <p className="text-slate-300 text-sm font-medium mb-1">Total de Intereses a pagar</p>
                 <p className="text-2xl font-bold text-red-300 tabular-nums">
                   {resultado ? formatCurrency(resultado.totalIntereses) : '—'}
                 </p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                 <p className="text-slate-300 text-sm font-medium mb-1">Coste Total del Préstamo</p>
                 <p className="text-2xl font-bold text-white tabular-nums">
                   {resultado ? formatCurrency(resultado.costeTotal) : '—'}
                 </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {resultado && (
        <section className="w-full max-w-4xl mb-16" aria-labelledby="amortizacion-heading">
          <div className="mb-5 px-2">
            <h2 id="amortizacion-heading" className="text-2xl font-bold text-slate-800">Primeras cuotas de amortización</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Desglose orientativo de las primeras {amortizacionInicial.length} cuotas con TIN constante. No incluye comisiones, seguros ni cambios de tipo.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-sm text-slate-700">
              <thead className="bg-slate-100 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-4 py-3">Cuota</th>
                  <th className="px-4 py-3">Pago</th>
                  <th className="px-4 py-3">Capital</th>
                  <th className="px-4 py-3">Intereses</th>
                  <th className="px-4 py-3">Pendiente</th>
                </tr>
              </thead>
              <tbody>
                {amortizacionInicial.map((fila) => (
                  <tr key={fila.numero} className="border-t border-slate-200 even:bg-slate-50/70">
                    <td className="px-4 py-3 font-semibold">{fila.numero}</td>
                    <td className="whitespace-nowrap px-4 py-3">{formatCurrency(fila.cuota)}</td>
                    <td className="whitespace-nowrap px-4 py-3">{formatCurrency(fila.capital)}</td>
                    <td className="whitespace-nowrap px-4 py-3">{formatCurrency(fila.intereses)}</td>
                    <td className="whitespace-nowrap px-4 py-3">{formatCurrency(fila.pendiente)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SEO & CONTENT SECTION */}
      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <Info className="w-6 h-6 text-sky-500" />
          ¿Cómo funciona el simulador de hipotecas online?
        </h2>
        
        <p>Al financiar una vivienda, los bancos muestran porcentajes como TIN y TAE, pero a menudo es difícil saber en qué se traducen mes a mes. Esta <strong>calculadora de cuota hipotecaria</strong> estima la mensualidad sin necesidad de ceder tus datos personales a ninguna entidad.</p>

        <p>El simulador utiliza el sistema de <strong>amortización francés</strong> y mantiene una cuota constante mientras no cambien el TIN ni el plazo introducidos. Al principio se pagan más intereses y al final se amortiza más capital. En una hipoteca variable, la entidad recalcula la cuota cuando revisa el tipo, por lo que conviene simular varios escenarios.</p>

        <p>Es una herramienta útil para hacer una primera estimación antes de hablar con un banco, comparar ofertas o entender cómo cambia la cuota cuando modificas importe, plazo o interés. El resultado no sustituye una FEIN, una oferta vinculante ni el asesoramiento financiero profesional.</p>

        <h3>Qué no incluye esta simulación</h3>
        <ul>
          <li><strong>Comisiones y seguros:</strong> la cuota puede variar si el producto incorpora gastos adicionales.</li>
          <li><strong>Gastos de compra y formalización:</strong> impuestos, tasación y otros costes que correspondan en tu operación no forman parte del cálculo.</li>
          <li><strong>Escenarios variables complejos:</strong> si tu hipoteca revisa tipo periódicamente, conviene hacer varias simulaciones.</li>
        </ul>

      </section>

      {/* FAQ SECTION */}
      <section className="w-full max-w-4xl px-2" aria-label="Preguntas Frecuentes">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Preguntas frecuentes sobre el cálculo de hipotecas</h2>
        <div className="space-y-4">
          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex list-none items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-sky-600 transition-colors [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-bold m-0 pr-4">¿Cuál es la fórmula para calcular la cuota de la hipoteca?</h3>
              <Plus className="h-5 w-5 text-sky-500 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
              <p>El código matemático que usamos es el siguiente: <code>Cuota = Importe * (i * (1+i)^n) / ((1+i)^n - 1)</code>, donde <i>i</i> es el interés mensual (Interés anual dividido por 12) y <i>n</i> es el total de cuotas (Años multiplicados por 12 meses).</p>
            </div>
          </details>

          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex list-none items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-sky-600 transition-colors [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-bold m-0 pr-4">Si mi hipoteca es de interés variable, ¿sirve esta calculadora?</h3>
              <Plus className="h-5 w-5 text-sky-500 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
              <p>Sirve para comparar escenarios con un TIN constante. En una hipoteca variable puedes probar distintos valores del índice de referencia más el diferencial, pero la herramienta no modela fechas de revisión ni cambios futuros del Euríbor. El resultado es orientativo y no sustituye la información de la entidad.</p>
            </div>
          </details>

          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex list-none items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-sky-600 transition-colors [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-bold m-0 pr-4">¿Guardan un registro de mis simulaciones u opciones de compra?</h3>
              <Plus className="h-5 w-5 text-sky-500 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
              <p>No guardamos los importes que introduces. El cálculo se resuelve localmente en tu navegador y CajaUtil no envía esos valores a un servidor. Al cerrar o recargar la página, la simulación se restablece.</p>
            </div>
          </details>
        </div>
      </section>

    </div>
  );
};

export default CalculadoraHipotecasClient;
