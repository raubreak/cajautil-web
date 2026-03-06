"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

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
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-100/50 rounded-3xl mb-6 border border-indigo-50 shadow-sm">
          <CalendarDays className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Calculadora de <span className="text-indigo-600">Días</span> entre Fechas
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          Calcula la diferencia exacta entre dos fechas, al instante.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 flex flex-col gap-6 mb-12">
        <div className="space-y-4 mb-4">
          <div>
            <label htmlFor="fecha-inicio" className="block text-sm font-bold text-slate-700 mb-1">Fecha de Inicio</label>
            <input 
              id="fecha-inicio"
              type="date" 
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-2xl p-4 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none text-slate-900 font-medium transition"
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
              className="w-full border-2 border-slate-200 rounded-2xl p-4 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none text-slate-900 font-medium transition"
              aria-label="Fecha de fin"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center" role="status" aria-live="polite" aria-label="Resultado del cálculo">
          <div className="p-6 bg-indigo-50 rounded-[24px] border border-indigo-100 flex flex-col items-center justify-center">
            <span className="block text-5xl font-black text-indigo-700 mb-2">{dias}</span>
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-800/60">Días</span>
          </div>
          <div className="p-6 bg-indigo-50 rounded-[24px] border border-indigo-100 flex flex-col items-center justify-center">
            <span className="block text-5xl font-black text-indigo-700 mb-2">{semanas}</span>
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-800/60">Semanas</span>
          </div>
          <div className="p-6 bg-indigo-50 rounded-[24px] border border-indigo-100 flex flex-col items-center justify-center">
            <span className="block text-5xl font-black text-indigo-700 mb-2">{meses}</span>
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-800/60">Meses</span>
          </div>
          <div className="p-6 bg-indigo-50 rounded-[24px] border border-indigo-100 flex flex-col items-center justify-center">
            <span className="block text-5xl font-black text-indigo-700 mb-2">{anos}</span>
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-800/60">Años</span>
          </div>
        </div>
      </div>
      
      {/* Contenido SEO */}
      <section className="w-full max-w-3xl prose prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-800 px-4 text-slate-600 prose-a:text-indigo-600">
        <h2>¿Cómo calcular los días entre dos fechas?</h2>
        <p>
          Nuestra <strong>calculadora de días entre fechas</strong> te muestra al instante la diferencia exacta 
          en <strong>días, semanas, meses y años</strong>. Solo tienes que seleccionar la fecha de inicio y la de fin.
        </p>
        <p>
          Es perfecta para calcular <strong>plazos legales</strong>, <strong>vacaciones</strong>, 
          <strong>eventos</strong>, <strong>embarazos</strong>, <strong>proyectos</strong> o 
          <strong>períodos de prueba</strong>.
        </p>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/calculadora-porcentajes">Calculadora de Porcentajes</Link></li>
          <li><Link href="/calculadora-sueldo-neto">Calculadora Sueldo Neto</Link></li>
        </ul>
      </section>
    </main>
  );
}
