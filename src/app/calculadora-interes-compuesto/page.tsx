"use client";

import React, { useState, useMemo } from 'react';
import { PiggyBank, TrendingUp, Calendar, Wallet, BarChart3, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

export default function CalculadoraInteresCompuesto() {
  const [initialAmount, setInitialAmount] = useState('5000');
  const [monthlyContribution, setMonthlyContribution] = useState('200');
  const [interestRate, setInterestRate] = useState('7');
  const [years, setYears] = useState('10');

  const simulation = useMemo(() => {
    const P = parseFloat(initialAmount);
    const PMT = parseFloat(monthlyContribution);
    const rate = parseFloat(interestRate) / 100;
    const t = parseInt(years);

    if (isNaN(P) || isNaN(PMT) || isNaN(rate) || isNaN(t) || t <= 0) return null;

    let currentBalance = P;
    let totalContributions = P;
    const chartData = [];

    // Mes 0
    chartData.push({
      year: 0,
      Aportaciones: totalContributions,
      Intereses: 0,
      Total: currentBalance
    });

    const monthlyRate = rate / 12;

    for (let year = 1; year <= t; year++) {
      for (let month = 1; month <= 12; month++) {
        currentBalance *= (1 + monthlyRate); // Interés compuesto
        currentBalance += PMT;             // Aportación mensual a final de mes
        totalContributions += PMT;
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
      finalBalance,
      totalContributions,
      totalInterest,
      chartData
    };
  }, [initialAmount, monthlyContribution, interestRate, years]);

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
          Descubre cómo tu dinero puede crecer exponencialmente a lo largo del tiempo gracias al poder de la inversión a largo plazo.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* INPUTS PANEL */}
        <section className="lg:col-span-4 bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 flex flex-col gap-6">
          
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Inversión Inicial</label>
            <div className="relative">
              <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="number" 
                value={initialAmount} 
                onChange={(e) => setInitialAmount(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition"
                placeholder="5000"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">€</span>
            </div>
          </div>

          <div>
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Aportación Mensual</label>
             <div className="relative">
               <PiggyBank className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
               <input 
                 type="number" 
                 value={monthlyContribution} 
                 onChange={(e) => setMonthlyContribution(e.target.value)}
                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition"
                 placeholder="200"
               />
               <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">€</span>
             </div>
          </div>

          <div>
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1 group relative">
               Tasa de Interés Anual
               <Info className="w-4 h-4 text-emerald-400 cursor-help" />
               <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 bg-slate-800 text-white text-xs p-3 rounded-xl shadow-lg z-50 normal-case tracking-normal">
                 El rendimiento estimado o interés anual (%). Históricamente, el S&P 500 ha rendido en torno al 7-10% anual.
               </div>
             </label>
             <div className="relative">
               <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
               <input 
                 type="number" 
                 step="0.1"
                 value={interestRate} 
                 onChange={(e) => setInterestRate(e.target.value)}
                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition"
                 placeholder="7"
               />
               <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
             </div>
          </div>

          <div>
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Años de Inversión</label>
             <div className="relative">
               <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
               <input 
                 type="number" 
                 value={years} 
                 onChange={(e) => setYears(e.target.value)}
                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition"
                 placeholder="10"
               />
               <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold shrink-0">Años</span>
             </div>
             
             {/* Slider simple */}
             <input 
                type="range" 
                min="1" 
                max="50" 
                value={years} 
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
                <div className="bg-emerald-600 rounded-[32px] p-8 text-white shadow-xl flex flex-col justify-center relative overflow-hidden group">
                   <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-700">
                      <TrendingUp className="w-48 h-48" />
                   </div>
                   <p className="text-xs font-bold text-emerald-200 uppercase tracking-widest mb-2 relative z-10">Balance Final Esperado</p>
                   <p className="text-4xl sm:text-5xl font-black tabular-nums transition-transform relative z-10 leading-none py-1">
                     {formatCurrency(simulation.finalBalance)}
                   </p>
                </div>
                
                <div className="bg-white border text-center sm:text-left border-slate-100 rounded-[32px] p-8 shadow-xl flex justify-between flex-col">
                   <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Aportado</p>
                     <p className="text-2xl font-black text-slate-700">{formatCurrency(simulation.totalContributions)}</p>
                   </div>
                   
                   <div className="mt-4 sm:mt-0">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Intereses Ganados</p>
                     <p className="text-2xl font-black text-emerald-500">+{formatCurrency(simulation.totalInterest)}</p>
                   </div>
                </div>
              </div>

              {/* CHART */}
              <div className="bg-white rounded-[32px] p-4 sm:p-8 border border-slate-100 shadow-xl overflow-hidden mt-2">
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-6 flex items-center px-4 pt-2">
                   Evolución de tu Inversión (Años)
                </h3>
                <div className="w-full h-72 sm:h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
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
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
             <div className="bg-white rounded-[40px] shadow-xl border border-dashed border-slate-200 p-16 flex flex-col items-center justify-center text-center opacity-30 h-full min-h-[400px]">
                <TrendingUp className="w-16 h-16 mb-6 text-slate-300" />
                <p className="text-lg font-bold text-slate-400">Introduce los datos para calcular la magia del interés compuesto</p>
             </div>
          )}
        </section>

      </div>

      {/* SEO SECTION */}
       <section className="w-full max-w-4xl prose prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-800 mb-16 px-4 text-slate-600 prose-a:text-emerald-600">
           <h2>¿Qué es el Interés Compuesto y por qué lo llaman &quot;magia&quot;?</h2>
           <p>El interés compuesto es el principio financiero responsable de generar un crecimiento exponencial en el patrimonio de un inversor a largo plazo. Albert Einstein solía referirse a él como &quot;la octava maravilla del mundo&quot;.</p>
           <p>La mecánica es sencilla pero profunda: <strong>los intereses que genera tu inversión inicial se reinvierten para generar, a su vez, nuevos intereses</strong>. Con el paso del tiempo, la curva de tu riqueza (como puedes ver en la gráfica de color verde) empieza a dispararse agresivamente hacia arriba creando el llamado efecto &quot;bola de nieve&quot;.</p>

          <h3>Un ejemplo muy humano: empezar antes pesa mas que afinar el producto perfecto</h3>
          <p>
            Una de las lecciones mas repetidas al usar esta calculadora es que empezar con 150 o 200 EUR al mes durante muchos anos suele tener mas impacto que esperar &quot;al momento ideal&quot;
            para invertir mas cantidad. La intuicion empuja a posponer; la simulacion suele demostrar justo lo contrario.
          </p>
          <p>
            Por eso esta herramienta no esta pensada para vender una promesa de rentabilidad exacta, sino para ayudarte a visualizar decisiones: que cambia si empiezas hoy,
            si retrasas cinco anos el plan o si aumentas una pequena aportacion mensual. Ese tipo de comparacion es mucho mas util que una cifra aislada.
          </p>
           
           <h3>Fórmula Matemática del Interés Compuesto</h3>
           <p>La fórmula clásica matemática es <code>A = P (1 + r/n)^(nt)</code>. Sin embargo, en nuestra calculadora gratuita hemos incorporado los aportes mensuales (que es como la mayoría de los mortales invierten), un cálculo mucho más complejo que suma el rendimiento mensual al capital aportado hasta esa fecha y lo vuelve a componer de nuevo cada 30 días.</p>

           <h3>Tips para Maximizar tu Rendimiento</h3>
           <ul>
               <li><strong>Empieza Temprano:</strong> El tiempo es el factor multiplicador en esta ecuación matemática (<code className="bg-slate-100 px-1 rounded">t</code>). El dinero de una persona en la veintena crece infinitamente más que el de una de cuarenta con el mismo interés porque los intereses tienen más décadas de rodaje.</li>
               <li><strong>Sé Constante:</strong> Ingresar de 200€ a 400€ al mes habitualmente como un &quot;gasto fijo&quot; hacia tus fondos indexados (aportaciones periódicas) es el pilar de la libertad financiera y el movimiento FIRE.</li>
               <li><strong>Evita Sacar el Dinero:</strong> Cada vez que retiras el capital para comprar un coche o un capricho asestas un golpe mortal a la base de la bola de nieve. Cortas de raíz cientos de ramificaciones futuras de intereses.</li>
           </ul>

          <h3>Como usar la simulacion sin enganarte</h3>
          <ul>
            <li><strong>Prueba varios escenarios:</strong> uno prudente, uno central y uno optimista.</li>
            <li><strong>No ignores comisiones:</strong> una pequena diferencia anual erosiona mucho a largo plazo.</li>
            <li><strong>Piensa en constancia real:</strong> mejor una aportacion sostenible que una cifra brillante pero imposible de mantener.</li>
            <li><strong>Recuerda que es una herramienta de decision:</strong> no una prediccion exacta del mercado.</li>
          </ul>
       </section>

    </main>
  );
}
