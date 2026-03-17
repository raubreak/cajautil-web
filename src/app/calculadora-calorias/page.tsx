"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, TrendingDown, Equal, TrendingUp, Dumbbell } from 'lucide-react';

type Gender = 'male' | 'female';
type Activity = 1.2 | 1.375 | 1.55 | 1.725 | 1.9;

const ACTIVITIES: { factor: Activity; label: string; desc: string }[] = [
  { factor: 1.2, label: 'Sedentario', desc: 'Poco o nada de ejercicio' },
  { factor: 1.375, label: 'Ligero', desc: 'Ejercicio 1-3 días/semana' },
  { factor: 1.55, label: 'Moderado', desc: 'Ejercicio 3-5 días/semana' },
  { factor: 1.725, label: 'Intenso', desc: 'Ejercicio 6-7 días/semana' },
  { factor: 1.9, label: 'Atleta', desc: 'Ejercicio intenso diario' },
];

function calcBMR(gender: Gender, weight: number, height: number, age: number): number {
  // Mifflin-St Jeor
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

export default function CalculadoraCalorias() {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState<Activity>(1.55);
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const calculate = () => {
    const a = parseInt(age), w = parseFloat(weight), h = parseFloat(height);
    if (isNaN(a) || isNaN(w) || isNaN(h)) return;
    const bmr = calcBMR(gender, w, h, a);
    const tdee = bmr * activity;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-orange-100/50 rounded-3xl mb-6 border border-orange-50">
          <Flame className="w-10 h-10 text-orange-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Calculadora de <span className="text-orange-500">Calorías</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
          Calcula tu metabolismo basal (BMR) y gasto calórico diario (TDEE) con la fórmula Mifflin-St Jeor.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Form */}
        <section className="lg:col-span-5 bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 space-y-6">
          {/* Género */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Sexo</label>
            <div className="grid grid-cols-2 gap-3">
              {(['male', 'female'] as Gender[]).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-4 rounded-2xl font-bold text-sm transition-all ${gender === g ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                  {g === 'male' ? '♂ Hombre' : '♀ Mujer'}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Edad</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-center text-lg font-black text-slate-700 focus:outline-none focus:border-orange-300" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Peso (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-center text-lg font-black text-slate-700 focus:outline-none focus:border-orange-300" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Altura (cm)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-center text-lg font-black text-slate-700 focus:outline-none focus:border-orange-300" />
            </div>
          </div>

          {/* Actividad */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Nivel de actividad</label>
            <div className="space-y-2">
              {ACTIVITIES.map(a => (
                <button
                  key={a.factor}
                  onClick={() => setActivity(a.factor)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${activity === a.factor ? 'border-orange-400 bg-orange-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                >
                  <Dumbbell className={`w-4 h-4 ${activity === a.factor ? 'text-orange-500' : 'text-slate-300'}`} />
                  <div>
                    <span className={`text-sm font-bold ${activity === a.factor ? 'text-orange-600' : 'text-slate-600'}`}>{a.label}</span>
                    <span className="text-[10px] text-slate-400 block">{a.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate} className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition shadow-xl active:scale-95">
            Calcular Calorías
          </button>
        </section>

        {/* Results */}
        <section className="lg:col-span-7 space-y-6">
          {result ? (
            <>
              {/* BMR y TDEE */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Metabolismo Basal (BMR)</p>
                  <p className="text-4xl font-black text-slate-800 tabular-nums">{result.bmr}</p>
                  <p className="text-xs text-slate-400 mt-1">kcal/día en reposo</p>
                </div>
                <div className="bg-orange-500 rounded-[32px] p-8 text-white text-center shadow-xl">
                  <p className="text-xs font-bold text-orange-200 uppercase tracking-widest mb-2">Gasto Diario (TDEE)</p>
                  <p className="text-4xl font-black tabular-nums">{result.tdee}</p>
                  <p className="text-xs text-orange-200 mt-1">kcal/día con actividad</p>
                </div>
              </div>

              {/* Objetivos */}
              <div className="bg-slate-900 rounded-[32px] p-8 text-white">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Calorías Según tu Objetivo</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <TrendingDown className="w-5 h-5 text-emerald-400" />
                      <div><p className="font-bold text-sm">Perder peso</p><p className="text-[10px] text-slate-500">Déficit de 500 kcal</p></div>
                    </div>
                    <span className="text-xl font-black text-emerald-400 tabular-nums">{result.tdee - 500}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <Equal className="w-5 h-5 text-blue-400" />
                      <div><p className="font-bold text-sm">Mantener</p><p className="text-[10px] text-slate-500">Gasto = Ingesta</p></div>
                    </div>
                    <span className="text-xl font-black text-blue-400 tabular-nums">{result.tdee}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-amber-400" />
                      <div><p className="font-bold text-sm">Ganar músculo</p><p className="text-[10px] text-slate-500">Superávit +300 kcal</p></div>
                    </div>
                    <span className="text-xl font-black text-amber-400 tabular-nums">{result.tdee + 300}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
              <Flame className="w-16 h-16 text-slate-100 mb-6" />
              <p className="text-slate-300 font-bold text-lg">Completa tus datos y pulsa Calcular</p>
              <p className="text-slate-200 text-sm mt-2">Verás tu metabolismo basal y gasto diario al instante.</p>
            </div>
          )}
        </section>
      </div>

      <section className="w-full max-w-4xl prose prose-slate text-slate-600">
        <h2>¿Qué es el TDEE y cómo se calcula?</h2>
        <p>El <strong>TDEE (Total Daily Energy Expenditure)</strong> es la cantidad total de calorías que tu cuerpo quema en un día. Se calcula multiplicando tu <strong>metabolismo basal (BMR)</strong> por un factor de actividad física. Utilizamos la <strong>ecuación de Mifflin-St Jeor</strong>, considerada la más precisa por la comunidad científica para estimar el gasto energético en reposo.</p>
        <h3>¿Cómo usar estos resultados?</h3>
        <ul>
          <li><strong>Para perder grasa:</strong> Consume entre 300-500 kcal menos que tu TDEE.</li>
          <li><strong>Para mantener tu peso:</strong> Tu ingesta debe igualar tu TDEE.</li>
          <li><strong>Para ganar masa muscular:</strong> Añade un superávit de 200-400 kcal a tu TDEE.</li>
        </ul>

        <h3>Que conviene tener en cuenta</h3>
        <p>
          El gasto calorico diario es una estimacion. Factores como composicion corporal, medicacion, descanso, estres o actividad no registrada pueden hacer que tu consumo real sea distinto.
          Lo recomendable es usar el resultado como punto de partida y ajustar tras observar tu evolucion durante varias semanas.
        </p>

        <h3>Para quien sirve esta herramienta</h3>
        <p>
          Puede ayudarte si quieres perder grasa, mantener peso o planificar una fase de volumen. No sustituye el consejo de un dietista-nutricionista o medico,
          especialmente si tienes patologias, objetivos deportivos avanzados o necesidades clinicas especificas.
        </p>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/calculadora-imc">Calculadora de IMC</Link></li>
          <li><Link href="/calculadora-edad">Calculadora de edad</Link></li>
        </ul>
      </section>
    </main>
  );
}
