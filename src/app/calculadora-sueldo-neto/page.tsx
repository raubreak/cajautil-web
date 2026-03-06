"use client";
import { useState } from "react";
import Link from "next/link";

export default function CalculadoraSueldo() {
  const [brutoAnual, setBrutoAnual] = useState<number | "">("");
  const [pagas, setPagas] = useState<12 | 14>(12);

  const calcularIRPF = (bruto: number) => {
    if (bruto <= 15000) return 0;
    if (bruto <= 20000) return 10;
    if (bruto <= 30000) return 15;
    if (bruto <= 45000) return 20;
    if (bruto <= 60000) return 25;
    return 30;
  };

  const irpfEstimado = brutoAnual ? calcularIRPF(Number(brutoAnual)) : 0;
  const retencionSS = 6.35;

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
        <p className="text-center text-slate-500 text-sm mb-6">Estimación España 2026 (Bruto a Neto mensual)</p>

        <div className="space-y-4">
          <div>
            <label htmlFor="bruto-anual" className="block text-sm font-bold text-slate-700 mb-1">Sueldo Bruto Anual (€)</label>
            <input 
              id="bruto-anual"
              type="number" 
              value={brutoAnual}
              onChange={(e) => setBrutoAnual(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 font-medium"
              placeholder="Ej: 30000"
              aria-label="Introduce tu sueldo bruto anual en euros"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Número de Pagas</label>
            <div className="flex bg-slate-100 p-1 rounded-xl" role="group" aria-label="Seleccionar número de pagas">
              <button 
                onClick={() => setPagas(12)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${pagas === 12 ? 'bg-white shadow text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}
                aria-pressed={pagas === 12}
              >
                12 Pagas
              </button>
              <button 
                onClick={() => setPagas(14)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${pagas === 14 ? 'bg-white shadow text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}
                aria-pressed={pagas === 14}
              >
                14 Pagas
              </button>
            </div>
          </div>

          <div className="mt-8 p-5 bg-amber-50 rounded-xl border border-amber-100" role="status" aria-live="polite">
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
      
      {/* Contenido SEO */}
      <article className="w-full max-w-md mt-6 bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">¿Cómo calcular el sueldo neto en España?</h2>
        <div className="text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            Para calcular tu <strong>sueldo neto</strong> a partir del <strong>salario bruto anual</strong>, se restan las <strong>retenciones de IRPF</strong> y 
            la <strong>cotización a la Seguridad Social</strong> (6,35% para trabajadores por cuenta ajena en España).
          </p>
          <p>
            El <strong>tipo de IRPF</strong> depende de tus ingresos totales, situación familiar y comunidad autónoma. 
            Nuestra calculadora aplica una estimación general orientativa para darte una idea rápida.
          </p>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">Preguntas frecuentes</h2>
        <div className="space-y-3">
          <details className="border border-slate-100 rounded-xl overflow-hidden">
            <summary className="p-4 cursor-pointer font-semibold text-slate-700 hover:text-blue-600 text-sm">¿Cuánto es el sueldo neto de 30.000€ brutos?</summary>
            <p className="px-4 pb-4 text-slate-600 text-sm">Con un salario bruto de 30.000€ anuales, las retenciones aproximadas (IRPF ~15% + SS 6,35%) dejarían un neto mensual de aproximadamente 1.966€ en 12 pagas, o 1.685€ en 14 pagas.</p>
          </details>
          <details className="border border-slate-100 rounded-xl overflow-hidden">
            <summary className="p-4 cursor-pointer font-semibold text-slate-700 hover:text-blue-600 text-sm">¿Qué diferencia hay entre 12 y 14 pagas?</summary>
            <p className="px-4 pb-4 text-slate-600 text-sm">El neto anual es el mismo. Con 14 pagas cobras menos al mes pero recibes dos pagas extra (generalmente en junio y diciembre). Con 12 pagas cobras más cada mes sin extras.</p>
          </details>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Herramientas relacionadas</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculadora-porcentajes" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Calculadora de Porcentajes
            </Link>
            <Link href="/calculadora-dias" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Calculadora de Días
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
