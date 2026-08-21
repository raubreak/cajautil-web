"use client";

import React, { useState } from 'react';
import { PiggyBank, TrendingUp, Calendar, Wallet, BarChart3, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const MAX_INITIAL_AMOUNT = 100_000_000;
const MAX_MONTHLY_CONTRIBUTION = 1_000_000;
const MIN_INTEREST_RATE = -100;
const MAX_INTEREST_RATE = 100;
const MAX_YEARS = 50;

const currencyFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 2,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);
const formatSignedCurrency = (value: number) => `${value > 0 ? '+' : ''}${formatCurrency(value)}`;

interface InputErrors {
  initialAmount?: string;
  monthlyContribution?: string;
  interestRate?: string;
  years?: string;
}

export default function CalculadoraInteresCompuesto() {
  const [initialAmount, setInitialAmount] = useState('5000');
  const [monthlyContribution, setMonthlyContribution] = useState('200');
  const [interestRate, setInterestRate] = useState('7');
  const [years, setYears] = useState('10');

  const calculation = (() => {
    const principal = Number(initialAmount);
    const contribution = Number(monthlyContribution);
    const annualRatePercent = Number(interestRate);
    const durationYears = Number(years);
    const errors: InputErrors = {};

    if (!initialAmount.trim() || !Number.isFinite(principal) || principal < 0 || principal > MAX_INITIAL_AMOUNT) {
      errors.initialAmount = `Introduce un importe entre 0 € y ${MAX_INITIAL_AMOUNT.toLocaleString('es-ES')} €.`;
    }
    if (!monthlyContribution.trim() || !Number.isFinite(contribution) || contribution < 0 || contribution > MAX_MONTHLY_CONTRIBUTION) {
      errors.monthlyContribution = `Introduce una aportación entre 0 € y ${MAX_MONTHLY_CONTRIBUTION.toLocaleString('es-ES')} €.`;
    }
    if (!interestRate.trim() || !Number.isFinite(annualRatePercent) || annualRatePercent < MIN_INTEREST_RATE || annualRatePercent > MAX_INTEREST_RATE) {
      errors.interestRate = `Introduce una tasa entre ${MIN_INTEREST_RATE}% y ${MAX_INTEREST_RATE}%.`;
    }
    if (!years.trim() || !Number.isInteger(durationYears) || durationYears < 1 || durationYears > MAX_YEARS) {
      errors.years = `Introduce un plazo entero entre 1 y ${MAX_YEARS} años.`;
    }

    if (Object.keys(errors).length > 0) {
      return { simulation: null, errors, calculationError: null };
    }
    if (principal === 0 && contribution === 0) {
      return {
        simulation: null,
        errors,
        calculationError: 'La inversión inicial y la aportación mensual no pueden ser ambas cero.',
      };
    }

    let currentBalance = principal;
    let totalContributions = principal;
    const chartData = [];

    // Mes 0
    chartData.push({
      year: 0,
      Aportaciones: totalContributions,
      Intereses: 0,
      Total: currentBalance
    });

    const monthlyRate = annualRatePercent / 100 / 12;

    for (let year = 1; year <= durationYears; year++) {
      for (let month = 1; month <= 12; month++) {
        currentBalance *= (1 + monthlyRate); // Interés compuesto
        currentBalance += contribution;     // Aportación mensual a final de mes
        totalContributions += contribution;
      }

      if (!Number.isFinite(currentBalance) || !Number.isFinite(totalContributions)) {
        return {
          simulation: null,
          errors,
          calculationError: 'El resultado queda fuera del rango que puede calcular el navegador.',
        };
      }

      chartData.push({
        year,
        Aportaciones: Math.round(totalContributions),
        Intereses: Math.round(currentBalance - totalContributions),
        Total: Math.round(currentBalance)
      });
    }

    const finalBalance = currentBalance;
    const totalInterest = finalBalance - totalContributions;

    return {
      simulation: {
        finalBalance,
        totalContributions,
        totalInterest,
        chartData,
      },
      errors,
      calculationError: null,
    };
  })();

  const { simulation, errors, calculationError } = calculation;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-100/50 rounded-3xl mb-6 border border-emerald-50 shadow-sm">
          <TrendingUp className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Calculadora de <br/><span className="text-emerald-600">Interés Compuesto</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
          Compara cómo podrían evolucionar tus aportaciones bajo una tasa anual constante y distintos plazos.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* INPUTS PANEL */}
        <section className="lg:col-span-4 bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 flex flex-col gap-6">
          
          <div>
            <label htmlFor="compound-initial" className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3 block">Inversión Inicial</label>
            <div className="relative">
              <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                id="compound-initial"
                type="number" 
                min="0"
                max={MAX_INITIAL_AMOUNT}
                step="0.01"
                value={initialAmount} 
                onChange={(e) => setInitialAmount(e.target.value)}
                aria-invalid={Boolean(errors.initialAmount)}
                aria-describedby={errors.initialAmount ? 'compound-initial-error' : undefined}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition"
                placeholder="5000"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">€</span>
            </div>
            {errors.initialAmount && <p id="compound-initial-error" role="alert" className="mt-2 text-xs font-semibold text-rose-600">{errors.initialAmount}</p>}
          </div>

          <div>
             <label htmlFor="compound-monthly" className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3 block">Aportación Mensual</label>
             <div className="relative">
               <PiggyBank className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  id="compound-monthly"
                 type="number"
                 min="0"
                 max={MAX_MONTHLY_CONTRIBUTION}
                 step="0.01"
                 value={monthlyContribution} 
                 onChange={(e) => setMonthlyContribution(e.target.value)}
                 aria-invalid={Boolean(errors.monthlyContribution)}
                 aria-describedby={errors.monthlyContribution ? 'compound-monthly-error' : undefined}
                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition"
                 placeholder="200"
               />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">€</span>
              </div>
              {errors.monthlyContribution && <p id="compound-monthly-error" role="alert" className="mt-2 text-xs font-semibold text-rose-600">{errors.monthlyContribution}</p>}
          </div>

          <div>
             <label htmlFor="compound-rate" className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-1 group relative">
               Tasa de Interés Anual
               <Info className="w-4 h-4 text-emerald-400 cursor-help" />
                 <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 bg-slate-800 text-white text-xs p-3 rounded-xl shadow-lg z-50 normal-case tracking-normal">
                  Tasa anual constante usada solo para la simulación. No representa una rentabilidad garantizada ni incorpora inflación, comisiones o impuestos.
               </div>
             </label>
             <div className="relative">
               <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  id="compound-rate"
                  type="number"
                  min={MIN_INTEREST_RATE}
                  max={MAX_INTEREST_RATE}
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  aria-invalid={Boolean(errors.interestRate)}
                  aria-describedby={errors.interestRate ? 'compound-rate-error' : undefined}
                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition"
                 placeholder="7"
               />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
              {errors.interestRate && <p id="compound-rate-error" role="alert" className="mt-2 text-xs font-semibold text-rose-600">{errors.interestRate}</p>}
          </div>

          <div>
             <label htmlFor="compound-years" className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3 block">Años de Inversión</label>
             <div className="relative">
               <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  id="compound-years"
                  type="number"
                  min="1"
                  max={MAX_YEARS}
                  step="1"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  aria-invalid={Boolean(errors.years)}
                  aria-describedby={errors.years ? 'compound-years-error' : undefined}
                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition"
                 placeholder="10"
               />
                 <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 font-bold shrink-0">Años</span>
              </div>
              {errors.years && <p id="compound-years-error" role="alert" className="mt-2 text-xs font-semibold text-rose-600">{errors.years}</p>}
             
             {/* Slider simple */}
              <input
                 aria-label="Años de inversión"
                type="range" 
                 min="1"
                 max={MAX_YEARS}
                 value={Math.min(MAX_YEARS, Math.max(1, Number(years) || 1))}
                onChange={(e) => setYears(e.target.value)} 
                className="w-full mt-4 accent-emerald-500"
             />
          </div>
        </section>

        {/* RESULTS PANEL */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          {simulation ? (
            <>
              {/* TOP CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-emerald-700 rounded-[32px] p-8 text-white shadow-xl flex flex-col justify-center relative overflow-hidden group">
                   <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-700">
                      <TrendingUp className="w-48 h-48" />
                   </div>
                    <p className="text-xs font-bold text-white uppercase tracking-widest mb-2 relative z-10">Capital final simulado</p>
                   <p className="text-4xl sm:text-5xl font-black tabular-nums transition-transform relative z-10 leading-none py-1">
                     {formatCurrency(simulation.finalBalance)}
                   </p>
                </div>
                
                <div className="bg-white border text-center sm:text-left border-slate-100 rounded-[32px] p-8 shadow-xl flex justify-between flex-col">
                   <div>
                     <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">Total Aportado</p>
                     <p className="text-2xl font-black text-slate-700">{formatCurrency(simulation.totalContributions)}</p>
                   </div>
                   
                   <div className="mt-4 sm:mt-0">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">Rendimiento simulado</p>
                      <p className={`text-2xl font-black ${simulation.totalInterest >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>{formatSignedCurrency(simulation.totalInterest)}</p>
                   </div>
                </div>
              </div>

              {/* CHART */}
              <div className="bg-white rounded-[32px] p-4 sm:p-8 border border-slate-100 shadow-xl overflow-hidden mt-2">
                 <h2 className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-6 flex items-center px-4 pt-2">
                   Evolución de tu Inversión (Años)
                 </h2>
                <div className="w-full h-72 sm:h-96">
                  <AreaChart
                    responsive
                    style={{ width: '100%', height: '100%' }}
                    data={simulation.chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorAportaciones" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorIntereses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="year" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 12}}
                        tickFormatter={(value) => `Año ${value}`}
                    />
                    <YAxis
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 12}}
                        tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`}
                        width={60}
                    />
                    <Tooltip
                        formatter={(value: unknown) => formatCurrency(Number(Array.isArray(value) ? value[0] : value ?? 0))}
                        labelFormatter={(label) => `Año ${label}`}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                        itemStyle={{ color: '#1e293b', fontSize: '14px' }}
                    />
                    <Area type="monotone" dataKey="Aportaciones" stackId="1" stroke="#64748b" strokeWidth={3} fill="url(#colorAportaciones)" />
                    <Area type="monotone" dataKey="Intereses" stackId="1" stroke="#059669" strokeWidth={3} fill="url(#colorIntereses)" />
                  </AreaChart>
                </div>
              </div>
            </>
          ) : (
             <div className="bg-white rounded-[40px] shadow-xl border border-dashed border-slate-200 p-16 flex flex-col items-center justify-center text-center opacity-30 h-full min-h-[400px]">
                <TrendingUp className="w-16 h-16 mb-6 text-slate-300" />
                <p className="text-lg font-bold text-slate-400" role={calculationError ? 'alert' : undefined}>{calculationError ?? 'Introduce valores válidos para calcular la simulación.'}</p>
             </div>
          )}
        </section>

      </div>

      {/* SEO SECTION */}
       <section className="w-full max-w-4xl prose prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-800 mb-16 px-4 text-slate-600 prose-a:text-emerald-600">
           <h2>¿Qué es el interés compuesto?</h2>
           <p>El interés compuesto reinvierte los rendimientos generados para que también puedan producir nuevos rendimientos en los periodos siguientes.</p>
           <p>Con el paso del tiempo, <strong>esa reinversión puede acelerar el crecimiento del capital</strong>, aunque el resultado real siempre depende de la rentabilidad, las comisiones, la fiscalidad y la regularidad de las aportaciones.</p>

          <h3>Un ejemplo muy humano: empezar antes pesa más que afinar el producto perfecto</h3>
          <p>
            Una de las lecciones más repetidas al usar esta calculadora es que empezar con 150 o 200 EUR al mes durante muchos años suele tener más impacto que esperar &quot;al momento ideal&quot;
            para invertir más cantidad. La intuición empuja a posponer; la simulación suele demostrar justo lo contrario.
          </p>
          <p>
            Por eso esta herramienta no está pensada para vender una promesa de rentabilidad exacta, sino para ayudarte a visualizar decisiones: qué cambia si empiezas hoy,
            si retrasas cinco años el plan o si aumentas una pequeña aportación mensual. Ese tipo de comparación es mucho más útil que una cifra aislada.
          </p>
           
           <h3>Fórmula Matemática del Interés Compuesto</h3>
           <p>La fórmula clásica es <code>A = P (1 + r/n)^(nt)</code>. Esta calculadora añade las aportaciones al final de cada mes y aplica una tasa nominal anual constante dividida entre doce. No incorpora inflación, comisiones, impuestos, volatilidad ni cambios de rentabilidad.</p>

           <h3>Claves para comparar escenarios con prudencia</h3>
           <ul>
               <li><strong>Compara plazos:</strong> un horizonte mayor da más periodos de composición, pero no elimina el riesgo ni garantiza una rentabilidad.</li>
               <li><strong>Usa aportaciones sostenibles:</strong> prueba cantidades que puedas mantener sin comprometer gastos esenciales ni tu fondo de emergencia.</li>
               <li><strong>Separa costes e inflación:</strong> usa escenarios de menor rentabilidad para aproximar costes conocidos; para expresar el saldo en euros de hoy, descuenta la inflación acumulada por separado.</li>
           </ul>

          <h3>Cómo usar la simulación sin engañarte</h3>
          <ul>
            <li><strong>Prueba varios escenarios:</strong> uno prudente, uno central y uno optimista.</li>
            <li><strong>No ignores comisiones:</strong> una pequeña diferencia anual erosiona mucho a largo plazo.</li>
            <li><strong>Piensa en constancia real:</strong> mejor una aportación sostenible que una cifra brillante pero imposible de mantener.</li>
            <li><strong>Recuerda que es una herramienta de decisión:</strong> no una predicción exacta del mercado.</li>
          </ul>
       </section>

    </main>
  );
}
