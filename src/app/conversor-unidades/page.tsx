"use client";

import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, Ruler, Weight, Thermometer, Droplets, Gauge, Clock } from 'lucide-react';

interface UnitCategory {
  name: string;
  icon: React.ReactNode;
  units: { name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[];
}

const CATEGORIES: UnitCategory[] = [
  {
    name: 'Longitud',
    icon: <Ruler className="w-4 h-4" />,
    units: [
      { name: 'Metros (m)', toBase: v => v, fromBase: v => v },
      { name: 'Kilómetros (km)', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { name: 'Centímetros (cm)', toBase: v => v / 100, fromBase: v => v * 100 },
      { name: 'Milímetros (mm)', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { name: 'Millas', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
      { name: 'Yardas', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      { name: 'Pies (ft)', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      { name: 'Pulgadas (in)', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
    ]
  },
  {
    name: 'Peso',
    icon: <Weight className="w-4 h-4" />,
    units: [
      { name: 'Kilogramos (kg)', toBase: v => v, fromBase: v => v },
      { name: 'Gramos (g)', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { name: 'Miligramos (mg)', toBase: v => v / 1e6, fromBase: v => v * 1e6 },
      { name: 'Toneladas', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { name: 'Libras (lb)', toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
      { name: 'Onzas (oz)', toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
    ]
  },
  {
    name: 'Temperatura',
    icon: <Thermometer className="w-4 h-4" />,
    units: [
      { name: 'Celsius (°C)', toBase: v => v, fromBase: v => v },
      { name: 'Fahrenheit (°F)', toBase: v => (v - 32) * 5 / 9, fromBase: v => v * 9 / 5 + 32 },
      { name: 'Kelvin (K)', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
    ]
  },
  {
    name: 'Volumen',
    icon: <Droplets className="w-4 h-4" />,
    units: [
      { name: 'Litros (L)', toBase: v => v, fromBase: v => v },
      { name: 'Mililitros (mL)', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { name: 'Galones (US)', toBase: v => v * 3.78541, fromBase: v => v / 3.78541 },
      { name: 'Metros cúbicos', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { name: 'Tazas (US)', toBase: v => v * 0.236588, fromBase: v => v / 0.236588 },
    ]
  },
  {
    name: 'Velocidad',
    icon: <Gauge className="w-4 h-4" />,
    units: [
      { name: 'km/h', toBase: v => v, fromBase: v => v },
      { name: 'm/s', toBase: v => v * 3.6, fromBase: v => v / 3.6 },
      { name: 'Millas/h (mph)', toBase: v => v * 1.60934, fromBase: v => v / 1.60934 },
      { name: 'Nudos', toBase: v => v * 1.852, fromBase: v => v / 1.852 },
    ]
  },
  {
    name: 'Tiempo',
    icon: <Clock className="w-4 h-4" />,
    units: [
      { name: 'Segundos', toBase: v => v, fromBase: v => v },
      { name: 'Minutos', toBase: v => v * 60, fromBase: v => v / 60 },
      { name: 'Horas', toBase: v => v * 3600, fromBase: v => v / 3600 },
      { name: 'Días', toBase: v => v * 86400, fromBase: v => v / 86400 },
      { name: 'Semanas', toBase: v => v * 604800, fromBase: v => v / 604800 },
    ]
  },
];

export default function ConversorUnidades() {
  const [catIdx, setCatIdx] = useState(0);
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [value, setValue] = useState('1');

  const category = CATEGORIES[catIdx];
  const fromUnit = category.units[fromIdx];
  const toUnit = category.units[toIdx];

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return '';
    const base = fromUnit.toBase(v);
    const converted = toUnit.fromBase(base);
    const decimals = Math.abs(converted) < 0.01 ? 8 : Math.abs(converted) < 1 ? 6 : 4;
    return parseFloat(converted.toFixed(decimals)).toString();
  }, [value, fromUnit, toUnit]);

  const swap = () => {
    setFromIdx(toIdx);
    setToIdx(fromIdx);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-sky-100/50 rounded-3xl mb-6 border border-sky-50">
          <ArrowRightLeft className="w-10 h-10 text-sky-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Conversor de <span className="text-sky-600">Unidades</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
          Convierte entre unidades de longitud, peso, temperatura, volumen, velocidad y tiempo al instante.
        </p>
      </div>

      <div className="w-full max-w-4xl">
        {/* Tabs de categoría */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => { setCatIdx(i); setFromIdx(0); setToIdx(1); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${catIdx === i ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/20' : 'bg-white text-slate-400 hover:bg-sky-50 hover:text-sky-600 border border-slate-100'}`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Converter Card */}
        <div className="bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
            {/* FROM */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">De:</label>
              <select
                value={fromIdx}
                onChange={(e) => setFromIdx(Number(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-sky-300 mb-3"
              >
                {category.units.map((u, i) => <option key={i} value={i}>{u.name}</option>)}
              </select>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-3xl font-black text-slate-800 focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-50 tabular-nums"
                placeholder="0"
              />
            </div>

            {/* Swap */}
            <div className="flex justify-center">
              <button
                onClick={swap}
                className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 hover:bg-sky-600 hover:text-white transition-all active:scale-90 shadow-sm"
              >
                <ArrowRightLeft className="w-6 h-6" />
              </button>
            </div>

            {/* TO */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">A:</label>
              <select
                value={toIdx}
                onChange={(e) => setToIdx(Number(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-sky-300 mb-3"
              >
                {category.units.map((u, i) => <option key={i} value={i}>{u.name}</option>)}
              </select>
              <div className="w-full bg-sky-50 border-2 border-sky-100 rounded-2xl p-5 text-3xl font-black text-sky-700 tabular-nums min-h-[76px] flex items-center">
                {result || '—'}
              </div>
            </div>
          </div>

          {/* Fórmula */}
          {result && (
            <div className="mt-8 text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-sm text-slate-500 font-medium">
                <span className="font-black text-slate-700">{value} {fromUnit.name}</span> = <span className="font-black text-sky-600">{result} {toUnit.name}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <section className="w-full max-w-4xl mt-16 prose prose-slate text-slate-600">
        <h2>Conversor de Unidades Universal</h2>
        <p>
          Nuestro <strong>conversor de unidades online</strong> soporta las categorías más buscadas:
          <strong> longitud</strong> (metros, pies, millas, pulgadas), <strong>peso</strong> (kg, libras, onzas, toneladas),
          <strong> temperatura</strong> (Celsius, Fahrenheit, Kelvin), <strong>volumen</strong> (litros, galones, tazas),
          <strong> velocidad</strong> (km/h, mph, nudos) y <strong>tiempo</strong> (segundos, minutos, horas, dias, semanas).
          La conversión se realiza en tiempo real sin recargar la página.
        </p>

        <h2>Cómo funciona la conversión</h2>
        <p>
          Cada unidad se convierte primero a una unidad base del Sistema Internacional (metros para longitud, 
          kilogramos para peso, etc.) y después se transforma a la unidad de destino. Este método de dos pasos
          garantiza precision matematica y permite anadrir nuevas unidades facilmente.
        </p>
        <p>
          Un caso especial es la <strong>temperatura</strong>, donde la conversion no es proporcional: la formula
          de Celsius a Fahrenheit es <code>F = C x 9/5 + 32</code>, mientras que para Kelvin es <code>K = C + 273,15</code>.
          Nuestro conversor aplica las formulas exactas en cada caso.
        </p>

        <h2>Casos de uso habituales</h2>
        <ul>
          <li><strong>Cocina internacional:</strong> convertir tazas a mililitros, onzas a gramos o Fahrenheit a Celsius para seguir recetas de otros paises.</li>
          <li><strong>Viajes:</strong> pasar de millas a kilometros, libras a kilos o galones a litros al conducir o comprar en el extranjero.</li>
          <li><strong>Estudios y trabajo:</strong> resolver ejercicios de fisica, ingenieria o quimica que requieren cambiar entre sistemas de medida.</li>
          <li><strong>Deporte:</strong> comparar velocidades en km/h y mph, o tiempos en segundos y minutos.</li>
        </ul>

        <h2>Precision y limitaciones</h2>
        <p>
          Los resultados se muestran con hasta 8 decimales para valores muy pequenos y 4 decimales para valores
          grandes, lo que cubre la gran mayoria de necesidades practicas. Para calculos cientificos de alta
          precision, es recomendable verificar los resultados con software especializado.
        </p>
        <p>
          Todo el procesamiento se realiza localmente en tu navegador. No se envia ningun dato a servidores externos.
        </p>
      </section>
    </main>
  );
}
