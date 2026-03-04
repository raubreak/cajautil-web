"use client";
import { useState } from "react";

export default function CalculadoraSueldo() {
  const [brutoAnual, setBrutoAnual] = useState<number | "">("");
  const [pagas, setPagas] = useState<12 | 14>(12);

  // Estimación HIPER simplificada de IRPF para MVP (No usar para datos reales fiscales)
  const calcularIRPF = (bruto: number) => {
    if (bruto <= 15000) return 0;
    if (bruto <= 20000) return 10;
    if (bruto <= 30000) return 15;
    if (bruto <= 45000) return 20;
    if (bruto <= 60000) return 25;
    return 30;
  };

  const irpfEstimado = brutoAnual ? calcularIRPF(Number(brutoAnual)) : 0;
  const retencionSS = 6.35; // % Cotización Seguridad Social Genérica

  const totalDeducciones = irpfEstimado + retencionSS;
  const netoAnual = brutoAnual 
    ? Number(brutoAnual) * (1 - totalDeducciones / 100) 
    : 0;
  const netoMensual = netoAnual / pagas;

  return (
    <main className="min-h-[100dvh] bg-slate-50 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-md bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 text-center leading-tight">
          Calculadora de <span className="text-amber-500">Sueldo Neto</span>
        </h1>
        <p className="text-center text-slate-500 text-sm mb-6">Estimación España 2026 (Bruto a Neto mensul)</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Sueldo Bruto Anual (€)</label>
            <input 
              type="number" 
              value={brutoAnual}
              onChange={(e) => setBrutoAnual(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 font-medium"
              placeholder="Ej: 30000"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Número de Pagas</label>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setPagas(12)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${pagas === 12 ? 'bg-white shadow text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                12 Pagas
              </button>
              <button 
                onClick={() => setPagas(14)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${pagas === 14 ? 'bg-white shadow text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                14 Pagas
              </button>
            </div>
          </div>

          <div className="mt-8 p-5 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-sm font-bold text-amber-800 uppercase tracking-wide text-center mb-1">Tu Sueldo Mensual (Neto)</p>
            <p className="text-5xl font-black text-amber-600 text-center mb-4">
              {netoMensual > 0 ? `${netoMensual.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €` : "0 €"}
            </p>
            
            <div className="space-y-2 mt-4 pt-4 border-t border-amber-200/50 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Retención IRPF (Estimada):</span>
                <span className="font-bold text-red-500">-{irpfEstimado}%</span>
              </div>
              <div className="flex justify-between">
                <span>Seguridad Social:</span>
                <span className="font-bold text-red-500">-{retencionSS}%</span>
              </div>
              <p className="text-xs text-amber-700/60 mt-4 leading-tight italic">
                *Nota: Es un cálculo base que da una idea rápida aproximada de tu entrada líquida a cuenta.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Banner */}
      <div className="w-full max-w-md mt-6 bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm font-medium rounded-xl h-[120px]">
        Anuncio Google
      </div>
    </main>
  );
}
