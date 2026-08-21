"use client";

import React, { useState } from 'react';
import { Activity, Weight, Ruler, HeartPulse, Plus } from 'lucide-react';
import Link from 'next/link';

const BMI_CATEGORIES = [
  {
    max: 18.5,
    label: 'Bajo peso',
    panelClass: 'border-blue-200 bg-blue-50 shadow-blue-500/10',
    valueClass: 'text-blue-600',
    badgeClass: 'bg-blue-700 ring-blue-200',
    textClass: 'text-blue-700',
    desc: 'El IMC está por debajo del rango de referencia para adultos.',
  },
  {
    max: 25,
    label: 'Rango de referencia',
    panelClass: 'border-emerald-200 bg-emerald-50 shadow-emerald-500/10',
    valueClass: 'text-emerald-600',
    badgeClass: 'bg-emerald-700 ring-emerald-200',
    textClass: 'text-emerald-700',
    desc: 'El IMC está entre 18,5 y 24,9; esto no equivale por sí solo a un diagnóstico de salud.',
  },
  {
    max: 30,
    label: 'Sobrepeso',
    panelClass: 'border-amber-200 bg-amber-50 shadow-amber-500/10',
    valueClass: 'text-amber-600',
    badgeClass: 'bg-amber-700 ring-amber-200',
    textClass: 'text-amber-700',
    desc: 'El IMC está en el rango de sobrepeso para adultos.',
  },
  {
    max: 35,
    label: 'Obesidad I',
    panelClass: 'border-orange-200 bg-orange-50 shadow-orange-500/10',
    valueClass: 'text-orange-600',
    badgeClass: 'bg-orange-700 ring-orange-200',
    textClass: 'text-orange-700',
    desc: 'El IMC está en el rango de obesidad de clase I; conviene interpretarlo con contexto profesional.',
  },
  {
    max: 40,
    label: 'Obesidad II',
    panelClass: 'border-rose-200 bg-rose-50 shadow-rose-500/10',
    valueClass: 'text-rose-600',
    badgeClass: 'bg-rose-700 ring-rose-200',
    textClass: 'text-rose-700',
    desc: 'El IMC está en el rango de obesidad de clase II; solicita valoración individual si te preocupa.',
  },
  {
    max: Number.POSITIVE_INFINITY,
    label: 'Obesidad III',
    panelClass: 'border-rose-200 bg-rose-50 shadow-rose-500/10',
    valueClass: 'text-rose-600',
    badgeClass: 'bg-rose-700 ring-rose-200',
    textClass: 'text-rose-700',
    desc: 'El IMC está en el rango de obesidad de clase III; solicita valoración médica individual.',
  },
] as const;

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState('75');
  const [altura, setAltura] = useState('175');
  const pesoValue = Number(peso);
  const alturaValue = Number(altura);
  const pesoError = peso.trim() === '' || !Number.isFinite(pesoValue) || pesoValue < 30 || pesoValue > 300
    ? 'Introduce un peso entre 30 y 300 kg.'
    : null;
  const alturaError = altura.trim() === '' || !Number.isFinite(alturaValue) || alturaValue < 100 || alturaValue > 250
    ? 'Introduce una altura entre 100 y 250 cm.'
    : null;
  const calculation = (() => {
    if (pesoError || alturaError) return null;

    const alturaMetros = alturaValue / 100;
    const rawBmi = pesoValue / (alturaMetros * alturaMetros);
    if (!Number.isFinite(rawBmi) || rawBmi <= 0) return null;

    const bmi = Math.round(rawBmi * 10) / 10;

    return {
      bmi,
      category: BMI_CATEGORIES.find(({ max }) => bmi < max) ?? BMI_CATEGORIES.at(-1)!,
      referenceWeight: {
        min: 18.5 * alturaMetros * alturaMetros,
        max: 24.9 * alturaMetros * alturaMetros,
      },
    };
  })();

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
          Calcula el Índice de Masa Corporal de una persona adulta de forma privada y consulta su rango orientativo.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* PANEL IZQUIERDO: CONTROLES */}
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 sm:p-8 border border-slate-100 h-fit">
          <div className="space-y-8">
            
            {/* Peso */}
            <div>
              <label htmlFor="bmi-weight" className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Weight className="w-4 h-4 text-rose-500" /> Peso (kg)
              </label>
              <input
                id="bmi-weight"
                type="number"
                min="30"
                max="300"
                step="0.1"
                inputMode="decimal"
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 p-3 text-lg font-black text-slate-700 focus:border-rose-300 focus:outline-none"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                aria-invalid={Boolean(pesoError)}
                aria-describedby={pesoError ? 'bmi-weight-error' : undefined}
              />
              {pesoError && <p id="bmi-weight-error" className="mt-2 text-sm font-semibold text-rose-600">{pesoError}</p>}
            </div>

            {/* Altura */}
            <div>
              <label htmlFor="bmi-height" className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-emerald-500" /> Altura (cm)
              </label>
              <input
                id="bmi-height"
                type="number"
                min="100"
                max="250"
                step="0.1"
                inputMode="decimal"
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 p-3 text-lg font-black text-slate-700 focus:border-emerald-300 focus:outline-none"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                aria-invalid={Boolean(alturaError)}
                aria-describedby={alturaError ? 'bmi-height-error' : undefined}
              />
              {alturaError && <p id="bmi-height-error" className="mt-2 text-sm font-semibold text-rose-600">{alturaError}</p>}
            </div>

          </div>
        </section>

        {/* PANEL DERECHO: RESULTADOS */}
        <section className={`rounded-3xl shadow-xl p-6 sm:p-8 border flex flex-col items-center justify-center text-center relative overflow-hidden ${calculation ? calculation.category.panelClass : 'border-slate-200 bg-slate-50'}`} aria-live="polite" aria-atomic="true">
          {calculation ? (
            <>
              <h2 className="text-slate-700 text-sm font-bold uppercase tracking-widest mb-4 z-10">IMC estimado</h2>
              <div className="z-10 bg-white/60 p-6 rounded-full w-40 h-40 flex items-center justify-center mb-6 shadow-inner border border-white">
                <output htmlFor="bmi-weight bmi-height" className={`text-5xl font-black tracking-tighter tabular-nums ${calculation.category.valueClass}`}>
                  {calculation.bmi.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </output>
              </div>
              <div className="z-10 mb-2">
                <span className={`px-4 py-1.5 rounded-full text-base font-bold text-white shadow-sm ring-4 ${calculation.category.badgeClass}`}>
                  {calculation.category.label}
                </span>
              </div>
              <p className={`font-medium text-lg mt-4 z-10 px-4 ${calculation.category.textClass}`}>
                {calculation.category.desc}
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-600">
                Para esta altura, un IMC entre 18,5 y 24,9 corresponde aproximadamente a {calculation.referenceWeight.min.toLocaleString('es-ES', { maximumFractionDigits: 1 })}-{calculation.referenceWeight.max.toLocaleString('es-ES', { maximumFractionDigits: 1 })} kg.
              </p>
            </>
          ) : (
            <p role="alert" className="font-semibold text-rose-600">Corrige el peso o la altura para obtener una estimación.</p>
          )}
        </section>
      </div>

      {/* SEO & CONTENT SECTION */}
      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <HeartPulse className="w-6 h-6 text-rose-500" />
          ¿Qué es el IMC y por qué hay que calcularlo?
        </h2>
        
        <p>
          El <strong>Índice de Masa Corporal (IMC)</strong> relaciona peso y altura para clasificar rangos orientativos en adultos. La{' '}
          <a href="https://www.who.int/es/news-room/fact-sheets/detail/obesity-and-overweight" target="_blank" rel="noopener noreferrer">
            Organización Mundial de la Salud
          </a>{' '}
          utiliza este indicador como referencia poblacional, no como diagnóstico individual.
        </p>

        <h3 className="text-lg font-bold">Limitaciones de este medidor</h3>
         <p>El IMC no distingue entre masa grasa y masa muscular. Deportistas, personas mayores o perfiles con condiciones concretas pueden obtener un resultado poco representativo. Los menores de 18 años necesitan percentiles por edad y sexo, por lo que no deben interpretar este cálculo con rangos de adultos.</p>

         <h3 className="text-lg font-bold">Cómo usar bien el resultado</h3>
         <p>Puede servirte como punto de partida para seguir tu evolución o detectar si conviene revisar hábitos. El rango de peso mostrado solo traduce matemáticamente los límites de IMC para la altura indicada: no es un objetivo personal ni una recomendación. Si tienes dudas sobre composición corporal, salud metabólica o nutrición, lo ideal es complementarlo con otras mediciones y con el criterio de un profesional.</p>
       </section>

      {/* FAQ SECTION */}
      <section className="w-full max-w-4xl px-2 mb-12" aria-label="Preguntas Frecuentes">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Preguntas frecuentes sobre el IMC</h2>
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
               <p>El cálculo se realiza en la página con los datos que introduces en el formulario. No requiere crear una cuenta ni enviar un historial médico. La analítica general del sitio solo se activa si la aceptas.</p>
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
