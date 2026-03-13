"use client";

import React, { useState, useMemo } from 'react';
import { Landmark, TrendingUp, Calendar, Wallet, PieChart } from 'lucide-react';

interface Row {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  remaining: number;
}

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(val);

interface Props {
  title?: React.ReactNode;
  subtitle?: string;
  initialAmount?: string;
  initialInterest?: string;
  initialYears?: string;
}

export default function CalculadoraPrestamosClient({ 
  title, 
  subtitle, 
  initialAmount = '10000', 
  initialInterest = '5.5', 
  initialYears = '5' 
}: Props) {
  const [amount, setAmount] = useState(initialAmount);
  const [interest, setInterest] = useState(initialInterest);
  const [years, setYears] = useState(initialYears);

  const simulation = useMemo(() => {
    const P = parseFloat(amount);
    const annualRate = parseFloat(interest) / 100;
    const nTotal = parseInt(years) * 12;

    if (isNaN(P) || isNaN(annualRate) || isNaN(nTotal) || nTotal <= 0) return null;

    const monthlyRate = annualRate / 12;
    const cuota = P * (monthlyRate * Math.pow(1 + monthlyRate, nTotal)) / (Math.pow(1 + monthlyRate, nTotal) - 1);
    
    if (isNaN(cuota) || !isFinite(cuota)) return null;

    let balance = P;
    const rows: Row[] = [];
    let totalInterest = 0;

    for (let i = 1; i <= nTotal; i++) {
       const interestPayment = balance * monthlyRate;
       const principalPayment = cuota - interestPayment;
       balance -= principalPayment;
       totalInterest += interestPayment;

       rows.push({
         month: i,
         payment: cuota,
         interest: interestPayment,
         principal: principalPayment,
         remaining: Math.max(0, balance)
       });
    }

    return {
      cuota,
      totalPaid: cuota * nTotal,
      totalInterest,
      rows: rows.slice(0, 12),
      fullRows: rows,
      nTotal
    };
  }, [amount, interest, years]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100/50 rounded-3xl mb-6 border border-blue-50 shadow-sm">
          <Landmark className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          {title || <><span className="text-blue-600">Simulador</span> de Préstamos</>}
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          {subtitle || 'Calcula tu cuota mensual y el coste total de intereses de manera instantánea.'}
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* INPUTS PANEL */}
        <section className="lg:col-span-5 bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 flex flex-col gap-6">
          
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Importe solicitado</label>
            <div className="relative">
              <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                placeholder="10000"
              />
            </div>
          </div>

          <div>
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">TIN (Interés Anual)</label>
             <div className="relative">
               <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
               <input 
                 type="number" 
                 step="0.1"
                 value={interest} 
                 onChange={(e) => setInterest(e.target.value)}
                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                 placeholder="5.5"
               />
             </div>
          </div>

          <div>
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Plazo (años)</label>
             <div className="relative">
               <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
               <input 
                 type="number" 
                 value={years} 
                 onChange={(e) => setYears(e.target.value)}
                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                 placeholder="5"
               />
             </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col items-center">
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mb-2 text-center">Coste total del préstamo (Capital + Intereses):</p>
             <p className="text-2xl font-black text-slate-800 tabular-nums">
                {simulation ? formatCurrency(simulation.totalPaid) : '€0,00'}
             </p>
          </div>
        </section>

        {/* RESULTS PANEL */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          
          {simulation ? (
            <>
              {/* MAIN RESULT CARD */}
              <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                 <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <PieChart className="w-48 h-48" />
                 </div>
                 <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-2 relative z-10">Cuota Mensual Estimada</p>
                 <p className="text-6xl font-black tabular-nums transition-transform relative z-10">{formatCurrency(simulation.cuota)}</p>
                 <div className="mt-6 px-4 py-2 bg-white/10 rounded-full border border-white/20 relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest">Total Intereses: {formatCurrency(simulation.totalInterest)}</p>
                 </div>
              </div>

              {/* TABLE PREVIEW */}
              <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl overflow-hidden">
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                   Tabla de Amortización (Primeros 12 meses)
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="text-slate-400 font-bold border-b border-slate-50">
                                <th className="pb-3 px-2">Mes</th>
                                <th className="pb-3 px-2">Cuota</th>
                                <th className="pb-3 px-2">Interés</th>
                                <th className="pb-3 px-2">Capital</th>
                                <th className="pb-3 px-2">Pendiente</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600 font-medium">
                            {simulation.rows.map(row => (
                                <tr key={row.month} className="border-b border-slate-50 hover:bg-blue-50 transition-colors">
                                    <td className="py-3 px-2 font-bold">{row.month}</td>
                                    <td className="py-3 px-2">{formatCurrency(row.payment)}</td>
                                    <td className="py-3 px-2 text-rose-500">-{formatCurrency(row.interest)}</td>
                                    <td className="py-3 px-2 text-emerald-600">+{formatCurrency(row.principal)}</td>
                                    <td className="py-3 px-2 font-mono">{formatCurrency(row.remaining)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-slate-300 mt-4 italic text-center">
                   Para ver la tabla completa, ajusta los parámetros de tu préstamo arriba.
                </p>
              </div>
            </>
          ) : (
             <div className="bg-white rounded-[40px] shadow-xl border border-dashed border-slate-200 p-16 flex flex-col items-center justify-center text-center opacity-30">
                <Landmark className="w-16 h-16 mb-6" />
                <p className="text-lg font-bold">Introduce los datos para calcular</p>
             </div>
          )}
        </section>

      </div>
    </div>
  );
}
