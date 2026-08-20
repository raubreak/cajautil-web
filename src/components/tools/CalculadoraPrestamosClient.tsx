"use client";

import React, { useMemo, useState } from 'react';
import { Landmark, TrendingUp, Calendar, Wallet, PieChart } from 'lucide-react';

interface Row {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  remaining: number;
}

const MAX_LOAN_AMOUNT = 100_000_000;

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
  const [showFullTable, setShowFullTable] = useState(false);

  const inputError = useMemo(() => {
    if (!amount || !interest || !years) return null;

    const principal = Number(amount);
    const annualInterest = Number(interest);
    const termYears = Number(years);

    if (!Number.isFinite(principal) || principal <= 0 || principal > MAX_LOAN_AMOUNT) {
      return 'El importe debe estar entre 0,01 € y 100.000.000 €.';
    }
    if (!Number.isFinite(annualInterest) || annualInterest < 0 || annualInterest > 100) {
      return 'El TIN debe estar entre 0% y 100%.';
    }
    if (!Number.isInteger(termYears) || termYears < 1 || termYears > 50) {
      return 'El plazo debe ser un número entero entre 1 y 50 años.';
    }

    return null;
  }, [amount, interest, years]);

  const simulation = useMemo(() => {
    if (inputError || !amount || !interest || !years) return null;

    const P = Number(amount);
    const annualRate = Number(interest) / 100;
    const nTotal = Number(years) * 12;

    if (!Number.isFinite(P) || !Number.isFinite(annualRate) || !Number.isFinite(nTotal)) return null;

    const monthlyRate = annualRate / 12;
    const cuota = monthlyRate === 0
      ? P / nTotal
      : P * (monthlyRate * Math.pow(1 + monthlyRate, nTotal)) / (Math.pow(1 + monthlyRate, nTotal) - 1);
    
    if (!Number.isFinite(cuota)) return null;

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
      rows,
      nTotal
    };
  }, [amount, inputError, interest, years]);

  const visibleRows = simulation
    ? showFullTable ? simulation.rows : simulation.rows.slice(0, 12)
    : [];
  const calculationError = inputError ?? (
    amount && interest && years && !simulation
      ? 'No se pudo calcular este escenario. Revisa que los valores estén dentro de los límites.'
      : null
  );

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
            <label htmlFor="loan-amount" className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Importe solicitado</label>
            <div className="relative">
              <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                id="loan-amount"
                type="number"
                min="0.01"
                max={MAX_LOAN_AMOUNT}
                step="0.01"
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                placeholder="10000"
              />
            </div>
          </div>

          <div>
             <label htmlFor="loan-interest" className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">TIN (Interés Anual)</label>
             <div className="relative">
               <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
               <input 
                 id="loan-interest"
                 type="number"
                 min="0"
                 max="100"
                 step="0.1"
                 value={interest} 
                 onChange={(e) => setInterest(e.target.value)}
                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                 placeholder="5.5"
               />
             </div>
          </div>

          <div>
             <label htmlFor="loan-years" className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Plazo (años)</label>
             <div className="relative">
               <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
               <input 
                 id="loan-years"
                 type="number"
                 min="1"
                 max="50"
                 step="1"
                 value={years} 
                 onChange={(e) => setYears(e.target.value)}
                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                 placeholder="5"
               />
             </div>
          </div>

          {calculationError && (
            <p role="alert" className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {calculationError}
            </p>
          )}

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
              <div aria-live="polite" className="bg-blue-600 rounded-[32px] p-8 text-white shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                 <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <PieChart className="w-48 h-48" />
                 </div>
                 <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-2 relative z-10">Cuota Mensual Estimada</p>
                 <p className="text-4xl sm:text-6xl font-black tabular-nums transition-transform relative z-10 break-all">{formatCurrency(simulation.cuota)}</p>
                 <div className="mt-6 px-4 py-2 bg-white/10 rounded-full border border-white/20 relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest">Total Intereses: {formatCurrency(simulation.totalInterest)}</p>
                 </div>
              </div>

              {/* TABLE PREVIEW */}
              <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl overflow-hidden">
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                   Tabla de amortización {showFullTable ? `(${simulation.nTotal} meses)` : '(primeros 12 meses)'}
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <caption className="sr-only">
                          Desglose mensual de cuota, intereses, capital amortizado y capital pendiente
                        </caption>
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
                            {visibleRows.map(row => (
                                <tr key={row.month} className="border-b border-slate-50 hover:bg-blue-50 transition-colors">
                                    <td className="py-3 px-2 font-bold">{row.month}</td>
                                    <td className="py-3 px-2">{formatCurrency(row.payment)}</td>
                                    <td className="py-3 px-2 text-rose-500">{row.interest > 0 ? '-' : ''}{formatCurrency(row.interest)}</td>
                                    <td className="py-3 px-2 text-emerald-600">+{formatCurrency(row.principal)}</td>
                                    <td className="py-3 px-2 font-mono">{formatCurrency(row.remaining)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {simulation.nTotal > 12 && (
                  <button
                    type="button"
                    onClick={() => setShowFullTable(current => !current)}
                    aria-expanded={showFullTable}
                    className="mx-auto mt-5 block rounded-xl bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    {showFullTable ? 'Mostrar solo los primeros 12 meses' : `Ver tabla completa (${simulation.nTotal} meses)`}
                  </button>
                )}
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
