"use client";
import { useRef, useState } from "react";
import { Coins } from "lucide-react";

import { trackToolEvent } from '@/lib/analytics';

interface Props {
  title?: React.ReactNode;
  subtitle?: string;
  initialBruto?: number | "";
  initialPagas?: 12 | 14;
}

export default function CalculadoraSueldoNetoClient({ 
  title, 
  subtitle, 
  initialBruto = "", 
  initialPagas = 12 
}: Props) {
  const [brutoAnual, setBrutoAnual] = useState<number | "">(initialBruto);
  const [pagas, setPagas] = useState<12 | 14>(initialPagas);
  const [irpf, setIrpf] = useState(15);
  const [retencionSS, setRetencionSS] = useState(6.5);
  const startedTracked = useRef(false);
  const completedTracked = useRef(false);

  const handleSalaryChange = (value: number) => {
    setBrutoAnual(value);

    if (value <= 0) return;
    if (!startedTracked.current) {
      startedTracked.current = true;
      trackToolEvent('tool_started', 'calculadora-sueldo-neto');
    }
    if (!completedTracked.current) {
      completedTracked.current = true;
      trackToolEvent('tool_completed', 'calculadora-sueldo-neto');
    }
  };

  const totalDeducciones = irpf + retencionSS;
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
          {title || <>Calculadora de <span className="text-amber-700">Sueldo Neto</span></>}
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          {subtitle || "Estima el neto mensual con tu IRPF, cotización y número de pagas reales."}
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
                onChange={(e) => handleSalaryChange(Number(e.target.value))}
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
                  className={`flex-1 py-3 text-sm font-black rounded-xl transition-all shadow-sm ${pagas === 12 ? 'bg-white shadow-md text-amber-700 scale-105' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/50'}`}
                  aria-pressed={pagas === 12}
                >
                  12 Pagas
                </button>
                <button 
                  onClick={() => setPagas(14)}
                  className={`flex-1 py-3 text-sm font-black rounded-xl transition-all shadow-sm ${pagas === 14 ? 'bg-white shadow-md text-amber-700 scale-105' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/50'}`}
                  aria-pressed={pagas === 14}
                >
                  14 Pagas
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="irpf" className="block text-sm font-bold text-slate-700 mb-2">Retención de IRPF (%)</label>
              <input
                id="irpf"
                type="number"
                min="0"
                max="55"
                step="0.1"
                value={irpf}
                onChange={(event) => setIrpf(Math.min(55, Math.max(0, Number(event.target.value))))}
                className="w-full border-2 border-slate-200 rounded-2xl p-4 text-xl font-bold bg-white focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all text-slate-900"
              />
              <p className="mt-2 text-xs text-slate-500">Usa el porcentaje de tu nómina o de la simulación de la AEAT.</p>
            </div>
            <div>
              <label htmlFor="seguridad-social" className="block text-sm font-bold text-slate-700 mb-2">Cotización del trabajador (%)</label>
              <input
                id="seguridad-social"
                type="number"
                min="0"
                max="15"
                step="0.01"
                value={retencionSS}
                onChange={(event) => setRetencionSS(Math.min(15, Math.max(0, Number(event.target.value))))}
                className="w-full border-2 border-slate-200 rounded-2xl p-4 text-xl font-bold bg-white focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all text-slate-900"
              />
              <p className="mt-2 text-xs text-slate-500">Valor inicial editable: comprueba el porcentaje aplicado en tu nómina.</p>
            </div>
          </div>

          <div className="mt-8 p-8 bg-amber-50 rounded-[32px] border border-amber-100 shadow-inner transform transition hover:scale-[1.01]" role="status" aria-live="polite">
            <p className="text-sm font-extrabold text-amber-900 uppercase tracking-widest text-center mb-4">Tu Sueldo Mensual (Neto)</p>
            <p className="text-6xl font-black text-amber-600 text-center mb-8 drop-shadow-sm">
              {netoMensual > 0 ? `${netoMensual.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €` : "0 €"}
            </p>
            
            <div className="space-y-3 mt-4 pt-6 text-sm text-slate-600">
              <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-amber-100/50">
                <span className="font-bold text-slate-700">Retención de IRPF</span>
                <span className="font-black text-rose-700 bg-rose-100 px-3 py-1 rounded-lg">-{irpf.toLocaleString('es-ES')}%</span>
              </div>
              <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-amber-100/50">
                <span className="font-bold text-slate-700">Seguridad Social</span>
                <span className="font-black text-rose-700 bg-rose-100 px-3 py-1 rounded-lg">-{retencionSS.toLocaleString('es-ES')}%</span>
              </div>
              <p className="text-xs text-amber-900 mt-4 leading-tight italic font-medium px-4">
                *Estimación aritmética basada en los porcentajes que indiques. No calcula automáticamente tu retención fiscal personal.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
