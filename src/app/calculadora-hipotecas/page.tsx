"use client";

import React, { useState, useEffect } from 'react';
import { Home, Euro, Calendar, Percent, Banknote, HelpCircle, Info } from 'lucide-react';

const CalculadoraHipotecas = () => {
  const [importe, setImporte] = useState<number>(150000);
  const [anios, setAnios] = useState<number>(25);
  const [interes, setInteres] = useState<number>(3.5);

  const [resultado, setResultado] = useState({
    cuotaMensual: 0,
    totalIntereses: 0,
    costeTotal: 0
  });

  const calcularHipoteca = () => {
    if (importe <= 0 || anios <= 0 || interes < 0) {
      setResultado({ cuotaMensual: 0, totalIntereses: 0, costeTotal: 0 });
      return;
    }

    const meses = anios * 12;
    const interesMensual = interes / 100 / 12;

    let cuota = 0;
    if (interes === 0) {
      cuota = importe / meses;
    } else {
      cuota = importe * (interesMensual * Math.pow(1 + interesMensual, meses)) / (Math.pow(1 + interesMensual, meses) - 1);
    }

    const pagoTotal = cuota * meses;
    const interesesTotales = pagoTotal - importe;

    setResultado({
      cuotaMensual: cuota,
      totalIntereses: interesesTotales,
      costeTotal: pagoTotal
    });
  };

  useEffect(() => {
    calcularHipoteca();
  }, [importe, anios, interes]);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4 sm:px-6 z-10">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-sky-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-sky-50">
          <Home className="w-8 h-8 sm:w-10 sm:h-10 text-sky-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Calculadora de <span className="text-sky-600">Hipotecas</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-2">
          Simulador online para calcular cuotas y gastos de tu préstamo. Rápido, gratis y sin bancos fisgando.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        {/* PANEL IZQUIERDO: CONTROLES */}
        <section className="lg:col-span-2 bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 sm:p-8 border border-slate-100 h-fit">
          <div className="space-y-6">
            
            {/* Monto del Préstamo */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                Importe del Préstamo
                <span className="text-sky-600">{importe.toLocaleString('es-ES')} €</span>
              </label>
              <div className="relative">
                <Euro className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  step="1000"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-sky-100 focus:border-sky-500 text-lg font-semibold transition-all"
                  value={importe || ''}
                  onChange={(e) => setImporte(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Plazo */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                Plazo de amortización
                <span className="text-sky-600">{anios} {anios === 1 ? 'año' : 'años'}</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="number"
                  min="1"
                  max="50"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-sky-100 focus:border-sky-500 text-lg font-semibold transition-all"
                  value={anios || ''}
                  onChange={(e) => setAnios(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Tipo de Interés */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                Tipo de interés (TIN/TAE)
                <span className="text-sky-600">{interes}%</span>
              </label>
              <div className="relative mb-3">
                <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-sky-100 focus:border-sky-500 text-lg font-semibold transition-all"
                  value={interes || ''}
                  onChange={(e) => setInteres(Number(e.target.value))}
                />
              </div>
            </div>
            
          </div>
        </section>

        {/* PANEL DERECHO: RESULTADOS */}
        <section className="lg:col-span-3 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl shadow-xl shadow-indigo-900/20 p-6 sm:p-10 border border-slate-800 flex flex-col justify-center text-white relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500 rounded-full mix-blend-screen filter blur-[80px] opacity-40"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30"></div>
          
          <div className="relative z-10">
            <h2 className="text-sky-300 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Banknote className="w-5 h-5" /> Tu Cuota Mensual Resultante
            </h2>
            
            <div className="mb-10">
              <span className="text-5xl sm:text-7xl font-black tabular-nums tracking-tight">
                {resultado.cuotaMensual.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-2xl text-slate-400 font-medium ml-2">€/mes</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-700/50 pt-8 mt-2">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                 <p className="text-slate-400 text-sm font-medium mb-1">Total de Intereses a pagar</p>
                 <p className="text-2xl font-bold text-red-300 tabular-nums">
                   {resultado.totalIntereses.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                 </p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                 <p className="text-slate-400 text-sm font-medium mb-1">Coste Total del Préstamo</p>
                 <p className="text-2xl font-bold text-white tabular-nums">
                   {resultado.costeTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                 </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SEO & CONTENT SECTION */}
      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <Info className="w-6 h-6 text-sky-500" />
          ¿Cómo funciona el simulador de hipotecas online?
        </h2>
        
        <p>A la hora de comprar un coche o una vivienda, los bancos nos muestran porcentajes (TIN y TAE), pero a menudo es difícil saber en qué se traduce eso mes a mes. Nuestra <strong>calculadora de cuota hipotecaria</strong> te permite descubrir en segundos y sin necesidad de ceder tus datos personales a ninguna entidad qué mensualidad te va a quedar.</p>

        <p>El simulador utiliza el sistema de <strong>amortización francés</strong>, el estándar utilizado en España, México, Colombia y casi la totalidad de Europa y América Latina para los préstamos con interés fijo o variable. Este sistema se caracteriza por mantener unas cuotas mensuales constantes de principio a fin del plazo, donde al principio se pagan más intereses y al final se amortiza más capital neto.</p>

      </section>

      {/* FAQ SECTION */}
      <section className="w-full max-w-4xl px-2" aria-label="Preguntas Frecuentes">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Preguntas Frecuentes sobre el cálculo de préstamos</h2>
        <div className="space-y-4">
          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-sky-600 transition-colors">
              <h3 className="text-base font-bold m-0 pr-4">¿Cuál es la fórmula para calcular la cuota de la hipoteca?</h3>
              <span className="text-sky-500 text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
              <p>El código matemático que usamos es el siguiente: <code>Cuota = Importe * (i * (1+i)^n) / ((1+i)^n - 1)</code>, donde <i>i</i> es el interés mensual (Interés anual dividido por 12) y <i>n</i> es el total de cuotas (Años multiplicados por 12 meses).</p>
            </div>
          </details>

          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-sky-600 transition-colors">
              <h3 className="text-base font-bold m-0 pr-4">Si mi hipoteca es de interés variable, ¿sirve esta calculadora?</h3>
              <span className="text-sky-500 text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
              <p>Sí, sirve perfectamente para simular lo que pagarás bajo un escenario u otro. Haz una prueba con el interés Euríbor/Libor actual y vuelve a hacer una simulación sumándole 1 o 2 puntos porcentuales para saber cómo quedaría tu cuota en los peores y mejores escenarios.</p>
            </div>
          </details>

          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-sky-600 transition-colors">
              <h3 className="text-base font-bold m-0 pr-4">¿Guardan un registro de mis simulaciones u opciones de compra?</h3>
              <span className="text-sky-500 text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
              <p>En absoluto. A diferencia de las calculadoras de los grandes bancos, nuestra utilidad es estricta sobre privacidad. Toda la matemática se resuleve <em>offline</em> de lado cliente en la RAM momentánea de tu teléfono. Al cerrar la página, se pierde todo.</p>
            </div>
          </details>
        </div>
      </section>

    </main>
  );
};

export default CalculadoraHipotecas;
