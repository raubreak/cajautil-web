"use client";
import { useState, useMemo } from "react";

export default function CalculadoraDias() {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");

  const { dias, semanas, meses, anos } = useMemo(() => {
    if (!fechaInicio || !fechaFin) return { dias: 0, semanas: 0, meses: 0, anos: 0 };

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    const diferenciaMs = Math.abs(fin.getTime() - inicio.getTime());
    const d = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    const s = Math.floor(d / 7);
    const m = Math.floor(d / 30.4375); // Promedio de días al mes
    const a = Math.floor(d / 365.25);  // Promedio de días al año

    return { dias: d, semanas: s, meses: m, anos: a };
  }, [fechaInicio, fechaFin]);

  return (
    <main className="min-h-[100dvh] bg-slate-50 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-xl bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 text-center">
          Calculadora de <span className="text-indigo-500">Días</span>
        </h1>
        <p className="text-center text-slate-500 text-sm mb-6">Calcula la diferencia entre dos fechas, al instante.</p>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Fecha de Inicio</label>
            <input 
              type="date" 
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Fecha de Fin</label>
            <input 
              type="date" 
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <span className="block text-3xl font-black text-indigo-700">{dias}</span>
            <span className="text-sm font-medium text-indigo-800">Días</span>
          </div>
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <span className="block text-3xl font-black text-indigo-700">{semanas}</span>
            <span className="text-sm font-medium text-indigo-800">Semanas</span>
          </div>
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <span className="block text-3xl font-black text-indigo-700">{meses}</span>
            <span className="text-sm font-medium text-indigo-800">Meses</span>
          </div>
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <span className="block text-3xl font-black text-indigo-700">{anos}</span>
            <span className="text-sm font-medium text-indigo-800">Años</span>
          </div>
        </div>
      </div>
      
      {/* Espacio reservado para AdSense */}
      <div className="w-full max-w-xl mt-6 bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm font-medium rounded-xl h-[120px]">
        Publicidad AdSense
      </div>
    </main>
  );
}
