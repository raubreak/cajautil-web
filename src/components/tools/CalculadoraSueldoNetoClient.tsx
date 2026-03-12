"use client";
import { useState } from "react";
import Link from "next/link";
import { Coins } from "lucide-react";

interface Props {
  title?: React.ReactNode;
  subtitle?: string;
}

export default function CalculadoraSueldoNetoClient({ title, subtitle }: Props) {
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
    <div className="w-full flex flex-col items-center">
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-amber-100/50 rounded-3xl mb-6 border border-amber-50 shadow-sm">
          <Coins className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          {title || <>Calculadora de <span className="text-amber-500">Sueldo Neto</span></>}
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          {subtitle || "Estimación España 2026 (Bruto a Neto mensual). Descubre cuánto te quedará limpio a final de mes."}
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl p-8 sm:p-12 border border-slate-100 flex flex-col gap-8 mb-12">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            <div>
              <label htmlFor="bruto-anual" className="block text-sm font-bold text-slate-700 mb-2">Sueldo Bruto Anual (€)</label>
              <input 
                id="bruto-anual"
                type="number" 
                value={brutoAnual}
                onChange={(e) => setBrutoAnual(Number(e.target.value))}
                className="w-full border-2 border-slate-200 rounded-2xl p-4 text-xl font-bold bg-white focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all text-slate-900"
                placeholder="Ej: 30000"
                aria-label="Introduce tu sueldo bruto anual en euros"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Número de Pagas</label>
              <div className="flex bg-slate-100 p-2 rounded-2xl border-2 border-slate-100" role="group" aria-label="Seleccionar número de pagas">
                <button 
                  onClick={() => setPagas(12)}
                  className={`flex-1 py-3 text-sm font-black rounded-xl transition-all shadow-sm ${pagas === 12 ? 'bg-white shadow-md text-amber-600 scale-105' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                  aria-pressed={pagas === 12}
                >
                  12 Pagas
                </button>
                <button 
                  onClick={() => setPagas(14)}
                  className={`flex-1 py-3 text-sm font-black rounded-xl transition-all shadow-sm ${pagas === 14 ? 'bg-white shadow-md text-amber-600 scale-105' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                  aria-pressed={pagas === 14}
                >
                  14 Pagas
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 p-8 bg-amber-50 rounded-[32px] border border-amber-100 shadow-inner transform transition hover:scale-[1.01]" role="status" aria-live="polite">
            <p className="text-sm font-extrabold text-amber-800/80 uppercase tracking-widest text-center mb-4">Tu Sueldo Mensual (Neto)</p>
            <p className="text-6xl font-black text-amber-600 text-center mb-8 drop-shadow-sm">
              {netoMensual > 0 ? `${netoMensual.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €` : "0 €"}
            </p>
            
            <div className="space-y-3 mt-4 pt-6 text-sm text-slate-600">
              <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-amber-100/50">
                <span className="font-bold text-slate-700">Retención IRPF (Estimada)</span>
                <span className="font-black text-rose-500 bg-rose-100 px-3 py-1 rounded-lg">-{irpfEstimado}%</span>
              </div>
              <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-amber-100/50">
                <span className="font-bold text-slate-700">Seguridad Social</span>
                <span className="font-black text-rose-500 bg-rose-100 px-3 py-1 rounded-lg">-{retencionSS}%</span>
              </div>
              <p className="text-xs text-amber-700/60 mt-4 leading-tight italic font-medium px-4">
                *Nota: Es un cálculo base que da una idea rápida aproximada. Variables de estado civil o CCAA no aplicadas.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido SEO Base (Solo se muestra en la home de la tool si no hay variants, 
          o se puede dejar para que Gemini lo pise debajo) */}
      {!title && (
        <section className="w-full max-w-3xl prose prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-800 px-4 text-slate-600 prose-a:text-amber-600">
          <h2>¿Cómo calcular el sueldo neto en España?</h2>
          <p>
            Para calcular tu <strong>sueldo neto</strong> a partir del <strong>salario bruto anual</strong>, se restan las <strong>retenciones de IRPF</strong> y 
            la <strong>cotización a la Seguridad Social</strong> (6,35% para trabajadores por cuenta ajena en España).
          </p>
          <p>
            El <strong>tipo de IRPF</strong> depende de tus ingresos totales, situación familiar y comunidad autónoma. 
            Nuestra calculadora aplica una estimación general orientativa para darte una idea rápida.
          </p>

          <h2>Preguntas frecuentes</h2>
          <details className="open:bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
            <summary className="cursor-pointer font-bold text-slate-800 focus:outline-none">¿Cuánto es el sueldo neto de 30.000€ brutos?</summary>
            <p className="mt-4 mb-0 text-slate-600">Con un salario bruto de 30.000€ anuales, las retenciones aproximadas (IRPF ~15% + SS ~6%) dejarían un neto mensual de aproximadamente 1.966€ en 12 pagas, o 1.685€ en 14 pagas.</p>
          </details>
          <details className="open:bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
            <summary className="cursor-pointer font-bold text-slate-800 focus:outline-none">¿Qué diferencia hay entre 12 y 14 pagas?</summary>
            <p className="mt-4 mb-0 text-slate-600">El neto anual es el mismo. Con 14 pagas cobras menos al mes pero recibes dos pagas extra (generalmente en junio y diciembre). Con 12 pagas cobras más cada mes sin extras.</p>
          </details>

          <h3>Herramientas relacionadas</h3>
          <ul>
            <li><Link href="/calculadora-porcentajes">Calculadora de Porcentajes de IRPF</Link></li>
            <li><Link href="/calculadora-dias">Calculadora de Días de Vacaciones</Link></li>
          </ul>
        </section>
      )}
    </div>
  );
}
