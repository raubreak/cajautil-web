"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Dumbbell } from 'lucide-react';

type Gender = 'male' | 'female';
type Activity = 1.2 | 1.375 | 1.55 | 1.725 | 1.9;

const ACTIVITIES: { factor: Activity; label: string; desc: string }[] = [
  { factor: 1.2, label: 'Sedentario', desc: 'Trabajo sentado y poco ejercicio' },
  { factor: 1.375, label: 'Ligero', desc: 'Actividad cotidiana y ejercicio 1-3 días' },
  { factor: 1.55, label: 'Moderado', desc: 'Actividad cotidiana y ejercicio 3-5 días' },
  { factor: 1.725, label: 'Intenso', desc: 'Trabajo activo o ejercicio 6-7 días' },
  { factor: 1.9, label: 'Muy intenso', desc: 'Trabajo físico y ejercicio intenso frecuente' },
];

function calcRestingEnergy(gender: Gender, weight: number, height: number, age: number): number {
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
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculation = (() => {
    if (!hasCalculated) {
      return { result: null, ageError: null, weightError: null, heightError: null, calculationError: null };
    }

    const ageValue = Number(age);
    const weightValue = Number(weight);
    const heightValue = Number(height);
    const ageError = age.trim() === ''
      ? 'Introduce tu edad.'
      : !Number.isInteger(ageValue) || ageValue < 18 || ageValue > 100
        ? 'La edad debe ser un número entero entre 18 y 100 años.'
        : null;
    const weightError = weight.trim() === ''
      ? 'Introduce tu peso.'
      : !Number.isFinite(weightValue) || weightValue < 30 || weightValue > 300
        ? 'El peso debe estar entre 30 y 300 kg.'
        : null;
    const heightError = height.trim() === ''
      ? 'Introduce tu altura.'
      : !Number.isFinite(heightValue) || heightValue < 120 || heightValue > 230
        ? 'La altura debe estar entre 120 y 230 cm.'
        : null;

    if (ageError || weightError || heightError) {
      return { result: null, ageError, weightError, heightError, calculationError: null };
    }

    const restingEnergy = calcRestingEnergy(gender, weightValue, heightValue, ageValue);
    const tdee = restingEnergy * activity;

    if (![restingEnergy, tdee].every(Number.isFinite) || restingEnergy <= 0 || tdee <= 0) {
      return {
        result: null,
        ageError: null,
        weightError: null,
        heightError: null,
        calculationError: 'No se pudo obtener una estimación válida con estos datos.',
      };
    }

    return {
      result: {
        restingEnergy: Math.round(restingEnergy),
        restingEnergyExact: restingEnergy,
        tdee: Math.round(tdee),
      },
      ageError: null,
      weightError: null,
      heightError: null,
      calculationError: null,
    };
  })();

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-orange-100/50 rounded-3xl mb-6 border border-orange-50">
          <Flame className="w-10 h-10 text-orange-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Calculadora de <span className="text-orange-700">Calorías</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
          Estima tu gasto energético en reposo (REE) con Mifflin-St Jeor y el gasto diario (TDEE) mediante un factor de actividad.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Form */}
        <section className="lg:col-span-5 bg-white rounded-[40px] shadow-2xl p-5 sm:p-8 border border-slate-100 space-y-6">
          {/* Género */}
          <div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3 block">Sexo usado por la fórmula</span>
            <div className="grid grid-cols-2 gap-3" role="group" aria-label="Sexo usado por la fórmula">
              {(['male', 'female'] as Gender[]).map(g => (
                <button type="button" key={g} onClick={() => setGender(g)} aria-pressed={gender === g} className={`py-4 rounded-2xl font-bold text-sm transition-all ${gender === g ? 'bg-orange-700 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                  {g === 'male' ? '♂ Hombre' : '♀ Mujer'}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="calorie-age" className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1 block">Edad</label>
              <input id="calorie-age" type="number" min="18" max="100" step="1" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" aria-invalid={Boolean(calculation.ageError)} aria-describedby={calculation.ageError ? 'calorie-age-error' : undefined} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-center text-lg font-black text-slate-700 focus:outline-none focus:border-orange-300" />
              {calculation.ageError && <p id="calorie-age-error" className="sr-only">{calculation.ageError}</p>}
            </div>
            <div>
              <label htmlFor="calorie-weight" className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1 block">Peso (kg)</label>
              <input id="calorie-weight" type="number" min="30" max="300" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" aria-invalid={Boolean(calculation.weightError)} aria-describedby={calculation.weightError ? 'calorie-weight-error' : undefined} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-center text-lg font-black text-slate-700 focus:outline-none focus:border-orange-300" />
              {calculation.weightError && <p id="calorie-weight-error" className="sr-only">{calculation.weightError}</p>}
            </div>
            <div>
              <label htmlFor="calorie-height" className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1 block">Altura (cm)</label>
              <input id="calorie-height" type="number" min="120" max="230" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" aria-invalid={Boolean(calculation.heightError)} aria-describedby={calculation.heightError ? 'calorie-height-error' : undefined} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-center text-lg font-black text-slate-700 focus:outline-none focus:border-orange-300" />
              {calculation.heightError && <p id="calorie-height-error" className="sr-only">{calculation.heightError}</p>}
            </div>
          </div>

          {(calculation.ageError || calculation.weightError || calculation.heightError) && (
            <p role="alert" className="text-sm font-semibold leading-relaxed text-rose-600">
              {[calculation.ageError, calculation.weightError, calculation.heightError].filter(Boolean).join(' ')}
            </p>
          )}
          {calculation.calculationError && <p role="alert" className="text-sm font-semibold leading-relaxed text-rose-600">{calculation.calculationError}</p>}

          {/* Actividad */}
          <div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3 block">Nivel de actividad</span>
            <div className="space-y-2" role="group" aria-label="Nivel de actividad">
              {ACTIVITIES.map(a => (
                <button
                  key={a.factor}
                  type="button"
                  onClick={() => setActivity(a.factor)}
                  aria-pressed={activity === a.factor}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${activity === a.factor ? 'border-orange-400 bg-orange-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                >
                  <Dumbbell className={`w-4 h-4 ${activity === a.factor ? 'text-orange-700' : 'text-slate-500'}`} />
                  <div>
                    <span className={`text-sm font-bold ${activity === a.factor ? 'text-orange-700' : 'text-slate-700'}`}>
                      {a.label} · ×{a.factor.toLocaleString('es-ES', { maximumFractionDigits: 3 })}
                    </span>
                    <span className="text-xs text-slate-600 block">{a.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button type="button" onClick={() => setHasCalculated(true)} className="w-full py-5 bg-orange-700 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-800 transition shadow-xl active:scale-95">
            Calcular Calorías
          </button>
        </section>

        {/* Results */}
        <section className="lg:col-span-7 space-y-6" role="status" aria-live="polite" aria-atomic="true">
          {calculation.result ? (
            <>
              {/* REE y TDEE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-100 shadow-xl text-center">
                   <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Gasto en reposo (REE)</p>
                   <p className="text-3xl sm:text-4xl font-black text-slate-800 tabular-nums leading-none">{calculation.result.restingEnergy}</p>
                   <p className="text-xs text-slate-600 mt-2">kcal/día estimadas</p>
                </div>
                <div className="bg-orange-700 rounded-[32px] p-6 sm:p-8 text-white text-center shadow-xl">
                  <p className="text-xs font-bold text-orange-50 uppercase tracking-widest mb-2">Gasto diario (TDEE)</p>
                  <p className="text-3xl sm:text-4xl font-black tabular-nums leading-none">{calculation.result.tdee}</p>
                  <p className="text-xs text-orange-50 mt-2">
                    {calculation.result.restingEnergyExact.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 3 })} × {activity.toLocaleString('es-ES', { maximumFractionDigits: 3 })}
                  </p>
                </div>
              </div>

              {/* Interpretación */}
              <div className="bg-slate-900 rounded-[32px] p-8 text-white">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Cómo interpretar la estimación</h3>
                <p className="text-sm leading-relaxed text-slate-200">
                  El TDEE permite comparar los supuestos de la fórmula. No determina una ingesta, un déficit, un superávit ni ajustes individuales.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
              <Flame className="w-16 h-16 text-slate-100 mb-6" />
              <p className="text-slate-600 font-bold text-lg">{hasCalculated ? 'Corrige los datos indicados' : 'Completa tus datos y pulsa Calcular'}</p>
              <p className="text-slate-500 text-sm mt-2">La estimación se actualizará si después cambias cualquier dato.</p>
            </div>
          )}
        </section>
      </div>

      <section className="w-full max-w-4xl prose prose-slate text-slate-600">
        <h2>¿Qué es el TDEE y cómo se calcula?</h2>
        <p>El <strong>TDEE (Total Daily Energy Expenditure)</strong> estima la energía total utilizada en un día. Primero se estima el <strong>gasto energético en reposo (REE)</strong> con la <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer">ecuación de Mifflin-St Jeor</a> para personas adultas y después se aplica un factor orientativo según el nivel de actividad seleccionado. Los factores no forman parte de la ecuación original.</p>
        <p>Los multiplicadores son heurísticas convencionales, no una escala validada por el estudio de Mifflin-St Jeor ni por el modelo del NIDDK. Resume trabajo, desplazamientos, actividad cotidiana y ejercicio en una sola categoría, por lo que el resultado conserva una incertidumbre importante.</p>
        <h3>¿Qué permiten comparar estos resultados?</h3>
        <ul>
          <li><strong>La fórmula de reposo:</strong> muestra el resultado de Mifflin-St Jeor con los datos introducidos.</li>
          <li><strong>Los escenarios de actividad:</strong> permite comprobar cuánto cambia la estimación al seleccionar otro factor.</li>
          <li><strong>Los supuestos:</strong> ayuda a distinguir qué parte procede de los datos y cuál del multiplicador elegido.</li>
        </ul>

        <h3>Que conviene tener en cuenta</h3>
        <p>
          El gasto calórico diario es una estimación. Factores como composición corporal, medicación, descanso, estrés o actividad no registrada pueden hacer que el gasto real sea distinto.
          La herramienta no mide esos factores ni determina una pauta de alimentación individual.
        </p>

        <h3>Para quien sirve esta herramienta</h3>
        <p>
          Está diseñada como referencia para adultos. No debe usarse como guía individual durante embarazo, lactancia, crecimiento, trastornos de la conducta alimentaria o situaciones clínicas.
          No sustituye el consejo de un dietista-nutricionista o médico.
        </p>

        <p>
          Si conoces tu peso en libras o tu altura en pies y pulgadas, pásalos primero a kilogramos y centímetros con el <Link href="/conversor-unidades">conversor de unidades</Link>. La fórmula necesita esas unidades métricas para calcular la estimación correctamente.
        </p>
        <p>
          La guía de <Link href="/articulos/imc-calorias-y-tdee-como-leer-estas-metricas-sin-obsesionarte">IMC, REE y TDEE</Link> reproduce las operaciones, compara los factores y explica cuándo estas cifras no deben usarse como prescripción.
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
