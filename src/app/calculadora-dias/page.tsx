"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

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
    const m = Math.floor(d / 30.4375);
    const a = Math.floor(d / 365.25);

    return { dias: d, semanas: s, meses: m, anos: a };
  }, [fechaInicio, fechaFin]);

  return (
    <main className="min-h-[100dvh] bg-slate-50 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-xl bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 text-center">
          Calculadora de <span className="text-indigo-500">Días</span> entre Fechas
        </h1>
        <p className="text-center text-slate-500 text-sm mb-6">Calcula la diferencia exacta entre dos fechas, al instante.</p>

        <div className="space-y-4 mb-8">
          <div>
            <label htmlFor="fecha-inicio" className="block text-sm font-bold text-slate-700 mb-1">Fecha de Inicio</label>
            <input 
              id="fecha-inicio"
              type="date" 
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-medium"
              aria-label="Fecha de inicio"
            />
          </div>
          <div>
            <label htmlFor="fecha-fin" className="block text-sm font-bold text-slate-700 mb-1">Fecha de Fin</label>
            <input 
              id="fecha-fin"
              type="date" 
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-medium"
              aria-label="Fecha de fin"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center" role="status" aria-live="polite" aria-label="Resultado del cálculo">
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
      
      {/* AdSense */}
      <div className="w-full max-w-xl mt-6 bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm font-medium rounded-xl h-[120px]">
        Publicidad AdSense
      </div>

      {/* Contenido SEO */}
      <article className="w-full max-w-xl mt-6 bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">¿Cómo calcular los días entre dos fechas?</h2>
        <div className="text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            Nuestra <strong>calculadora de días entre fechas</strong> te muestra al instante la diferencia exacta 
            en <strong>días, semanas, meses y años</strong>. Solo tienes que seleccionar la fecha de inicio y la de fin.
          </p>
          <p>
            Es perfecta para calcular <strong>plazos legales</strong>, <strong>vacaciones</strong>, 
            <strong>eventos</strong>, <strong>embarazos</strong>, <strong>proyectos</strong> o 
            <strong>períodos de prueba</strong>.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Herramientas relacionadas</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculadora-porcentajes" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Calculadora de Porcentajes
            </Link>
            <Link href="/calculadora-sueldo-neto" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Calculadora Sueldo Neto
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
