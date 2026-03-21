"use client";

import React, { useState } from 'react';
import { Activity, Weight, Ruler, HeartPulse, Plus } from 'lucide-react';
import Link from 'next/link';

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState<number>(75);
  const [altura, setAltura] = useState<number>(175);

  const calcularIMC = () => {
    if (peso <= 0 || altura <= 0) {
      return {
        imc: 0,
        categoria: {
          id: 'normal',
          label: 'Peso Normal',
          color: 'emerald',
          desc: 'Tu peso es saludable.'
        }
      };
    }

    const alturaMetros = altura / 100;
    const calculo = peso / (alturaMetros * alturaMetros);
    const imc = Math.round(calculo * 10) / 10;

    if (imc < 18.5) {
      return { imc, categoria: { id: 'bajo', label: 'Bajo Peso', color: 'blue', desc: 'Estas por debajo del rango saludable.' } };
    }

    if (imc <= 24.9) {
      return { imc, categoria: { id: 'normal', label: 'Peso Normal', color: 'emerald', desc: 'Estas en el rango orientativo considerado saludable.' } };
    }

    if (imc <= 29.9) {
      return { imc, categoria: { id: 'sobrepeso', label: 'Sobrepeso', color: 'amber', desc: 'El resultado orienta a un rango de sobrepeso respecto a tu estatura.' } };
    }

    if (imc <= 34.9) {
      return { imc, categoria: { id: 'obesidad1', label: 'Obesidad I', color: 'orange', desc: 'Conviene revisar habitos y valorar asesoramiento profesional.' } };
    }

    return { imc, categoria: { id: 'obesidad2', label: 'Obesidad Extrema', color: 'rose', desc: 'El resultado sugiere pedir valoracion medica individualizada.' } };
  };

  const { imc, categoria } = calcularIMC();

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4 sm:px-6 z-10">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-rose-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-rose-50">
          <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Calculadora de <span className="text-rose-500">IMC</span> Online
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-2">
          Calcula tu Índice de Masa Corporal de forma privada. Descubre tu rango saludable según los baremos de la OMS al instante.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* PANEL IZQUIERDO: CONTROLES */}
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 sm:p-8 border border-slate-100 h-fit">
          <div className="space-y-8">
            
            {/* Peso */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between items-center group">
                <span className="flex items-center gap-2"><Weight className="w-4 h-4 text-rose-400 group-hover:text-rose-500" /> Tu Peso (Kg)</span>
                <span className="text-rose-600 bg-rose-50 px-3 py-1 rounded-lg text-lg tabular-nums border border-rose-100">{peso} KG</span>
              </label>
              <input
                type="range"
                min="30"
                max="200"
                step="1"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500 my-4"
                value={peso}
                onChange={(e) => setPeso(Number(e.target.value))}
              />
            </div>

            {/* Altura */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between items-center group">
                <span className="flex items-center gap-2"><Ruler className="w-4 h-4 text-emerald-400 group-hover:text-emerald-500" /> Tu Altura (cm)</span>
                <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg text-lg tabular-nums border border-emerald-100">{altura} CM</span>
              </label>
              <input
                type="range"
                min="100"
                max="250"
                step="1"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 my-4"
                value={altura}
                onChange={(e) => setAltura(Number(e.target.value))}
              />
            </div>

          </div>
        </section>

        {/* PANEL DERECHO: RESULTADOS */}
        <section className={`rounded-3xl shadow-xl p-6 sm:p-8 border border-${categoria.color}-200 flex flex-col items-center justify-center text-center transition-all duration-300 relative overflow-hidden bg-${categoria.color}-50 shadow-${categoria.color}-500/10`}>
          
          <h2 className={`text-${categoria.color}-800 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 z-10`}>
            Tu Índice Resultante
          </h2>
          
          <div className="z-10 bg-white/60 p-6 rounded-full w-40 h-40 flex items-center justify-center mb-6 shadow-inner border border-white">
            <span className={`text-5xl font-black text-${categoria.color}-600 tracking-tighter tabular-nums`}>
              {imc.toLocaleString('es-ES')}
            </span>
          </div>
          
          <div className="z-10 mb-2">
            <span className={`px-4 py-1.5 rounded-full text-base font-bold bg-${categoria.color}-500 text-white shadow-sm ring-4 ring-${categoria.color}-200`}>
              {categoria.label}
            </span>
          </div>

          <p className={`text-${categoria.color}-700 font-medium text-lg mt-4 z-10 px-4`}>
            {categoria.desc}
          </p>

        </section>
      </div>

      {/* SEO & CONTENT SECTION */}
      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <HeartPulse className="w-6 h-6 text-rose-500" />
          ¿Qué es el IMC y por qué hay que calcularlo?
        </h2>
        
        <p>El <strong>Índice de Masa Corporal (IMC)</strong> es un indicador avalado mundialmente por la Organización Mundial de la Salud (OMS) y la comunidad médica internacional para determinar estadísticamente si una persona joven o adulta se encuentra dentro de las horquillas de salud o, si por el contrario, padece de bajo peso, sobrepeso incipiente y rangos de obesidad.</p>

        <h3 className="text-lg font-bold">Limitaciones de este medidor</h3>
         <p>El IMC no distingue entre masa grasa y masa muscular. Deportistas, personas mayores, adolescentes o perfiles con condiciones concretas pueden obtener un resultado poco representativo. Por eso debe interpretarse como una <strong>referencia estadistica</strong>, no como un diagnostico medico.</p>

         <h3 className="text-lg font-bold">Como usar bien el resultado</h3>
         <p>Puede servirte como punto de partida para seguir tu evolucion o detectar si conviene revisar habitos. Si tienes dudas sobre composicion corporal, salud metabolica o nutricion, lo ideal es complementarlo con otras mediciones y con el criterio de un profesional.</p>
       </section>

      {/* FAQ SECTION */}
      <section className="w-full max-w-4xl px-2 mb-12" aria-label="Preguntas Frecuentes">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">FAQs Médicas sobre tu Talla</h2>
        <div className="space-y-4">
          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex list-none items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-rose-500 transition-colors [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-bold m-0 pr-4">Regla y fórmula para calcular Índice de Masa</h3>
              <Plus className="h-5 w-5 text-rose-500 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
              <p>Tomamos tu peso real expresado en kilogramos y lo dividimos por el cuadrado de tu estatura expresada en sistema métrico internacional (Metros x Metros).</p>
            </div>
          </details>

          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex list-none items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-rose-500 transition-colors [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-bold m-0 pr-4">La seguridad de mis mediciones en la web</h3>
              <Plus className="h-5 w-5 text-rose-500 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
               <p>El calculo se realiza en la pagina con los datos que introduces en el formulario. Aun asi, recuerda que el sitio utiliza servicios generales de analitica y publicidad descritos en nuestras politicas, aunque este calculo concreto no requiere crear una cuenta ni enviar un historial medico.</p>
             </div>
          </details>
        </div>

        <div className="mt-8 prose prose-slate max-w-none text-slate-600">
          <h3>Herramientas relacionadas</h3>
          <ul>
            <li><Link href="/calculadora-calorias">Calculadora de calorias</Link></li>
            <li><Link href="/calculadora-edad">Calculadora de edad</Link></li>
          </ul>
        </div>
      </section>
      
    </main>
  );
}
