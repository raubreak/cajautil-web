"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, CornerDownRight, Percent, ArrowLeftRight, Type } from 'lucide-react';

export default function ReglaDeTres() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [modo, setModo] = useState<'directa' | 'inversa'>('directa');

  // Cálculo Seguro
  const calcularX = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC) || numA === 0) return null;

    if (modo === 'directa') {
      // Directa: A -> B, C -> X  => X = (B * C) / A
      return (numB * numC) / numA;
    } else {
      // Inversa: A -> B, C -> X => X = (A * B) / C
      if (numC === 0) return null;
      return (numA * numB) / numC;
    }
  };

  const resultado = calcularX();
  const formatNum = (num: number | null) => {
    if (num === null) return 'X';
    return Number.isInteger(num) ? num.toString() : num.toFixed(2).replace(/\.00$/, '');
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4 sm:px-6 z-10">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-emerald-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-emerald-50">
          <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 fill-emerald-600/20" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Regla de <span className="text-emerald-600">Tres</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto px-2">
          Calculadora rápida para resolver proporcionalidad de forma automática, mostrando cómo se hace y la fórmula paso a paso.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* PANEL IZQUIERDO: CALCULADORA */}
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 sm:p-8 border border-slate-100 flex flex-col h-full">
            
            {/* TABS DIRECTA / INVERSA */}
            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center mb-8 relative w-full overflow-hidden">
                <div 
                    className={`absolute inset-y-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${modo === 'directa' ? 'left-1.5' : 'left-[calc(50%+1.5px)]'}`}
                />
                <button
                    onClick={() => setModo('directa')}
                    className={`flex-1 py-3 text-sm font-bold sm:text-base relative z-10 transition-colors ${modo === 'directa' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Regla Directa
                </button>
                <button
                    onClick={() => setModo('inversa')}
                    className={`flex-1 py-3 text-sm font-bold sm:text-base relative z-10 transition-colors ${modo === 'inversa' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Regla Inversa
                </button>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-6">
                {/* FILA 1: A -> B */}
                <div className="flex items-center gap-4 w-full">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Valor A</label>
                        <input
                            type="number"
                            value={a}
                            onChange={(e) => setA(e.target.value)}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xl font-bold text-slate-700 text-center"
                            placeholder="Ej: 10"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center shrink-0 pt-6">
                         <div className="w-10 h-[2px] bg-slate-200 rounded relative">
                              <div className="absolute right-0 -translate-y-[4px] translate-x-[2px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-slate-200"></div>
                         </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Valor B (Equivalencia)</label>
                        <input
                            type="number"
                            value={b}
                            onChange={(e) => setB(e.target.value)}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xl font-bold text-slate-700 text-center"
                            placeholder="Ej: 50"
                        />
                    </div>
                </div>

                {/* FILA 2: C -> X */}
                <div className="flex items-center gap-4 w-full">
                    <div className="flex-1 relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center pt-2">
                             <div className="h-6 w-[2px] bg-slate-200 border-l border-dashed border-slate-300 relative group">
                                <span className={`absolute bg-white px-2 py-1 text-[10px] font-bold rounded-lg border shadow-sm left-4 top-0 opacity-0 group-hover:opacity-100 transition whitespace-nowrap ${modo === 'directa' ? 'text-emerald-600 border-emerald-100' : 'text-amber-500 border-amber-100'}`}>
                                    {modo === 'directa' ? 'Si "A" Sube, "B" Sube' : 'Si "A" Sube, "B" Baja'}
                                </span>
                             </div>
                        </div>
                        
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-emerald-600">Nueva C</label>
                        <input
                            type="number"
                            value={c}
                            onChange={(e) => setC(e.target.value)}
                            className="w-full px-4 py-4 bg-sky-50 border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-xl font-bold text-slate-700 text-center shadow-inner"
                            placeholder="Ej: 20"
                        />
                    </div>
                     <div className="flex flex-col items-center justify-center shrink-0 pt-6">
                         <div className="w-10 h-[2px] bg-slate-200 rounded relative">
                              <div className="absolute right-0 -translate-y-[4px] translate-x-[2px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-slate-200"></div>
                         </div>
                    </div>
                    <div className="flex-1 group">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-indigo-500">Resultado (X)</label>
                        <div
                            className={`w-full px-4 py-4 border-2 rounded-xl transition-all text-2xl font-black text-center shadow-sm relative overflow-hidden flex items-center justify-center h-[62px] ${resultado !== null ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-slate-50 border-slate-200 text-slate-400 border-dashed'}`}
                        >
                            {formatNum(resultado)}
                            
                            {/* Brillo en caso de éxito */}
                            {resultado !== null && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <button
                onClick={() => {setA(''); setB(''); setC('');}}
                className="mt-8 text-sm font-bold text-slate-400 hover:text-slate-600 transition"
            >
                Resetear Campos
            </button>

        </section>

        {/* PANEL DERECHO: EXPLICACIÓN Y FÓRMULA */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 lg:col-span-1 rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden">
            {/* Background Decorator */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
            
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ArrowLeftRight className="w-5 h-5 text-emerald-400" /> Resolución y Fórmula
                </h3>

                {resultado !== null ? (
                    <div className="space-y-6">
                        <div className="p-5 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md">
                            <p className="text-sm text-slate-300 font-bold mb-3 uppercase tracking-wider">La Matemática Aplicada:</p>
                            
                            {modo === 'directa' ? (
                                <div className="flex flex-col font-mono text-lg text-emerald-200 items-center justify-center bg-black/20 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span>X</span> <span>=</span> 
                                        <div className="flex flex-col items-center">
                                            <span className="border-b border-white/30 px-2">{b} × {c}</span>
                                            <span className="px-2">{a}</span>
                                        </div>
                                    </div>
                                    <div className="text-sm opacity-60 mt-2">({b} × {c}) ÷ {a} = {formatNum(resultado)}</div>
                                </div>
                            ) : (
                                <div className="flex flex-col font-mono text-lg text-emerald-200 items-center justify-center bg-black/20 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span>X</span> <span>=</span> 
                                        <div className="flex flex-col items-center">
                                            <span className="border-b border-white/30 px-2">{a} × {b}</span>
                                            <span className="px-2">{c}</span>
                                        </div>
                                    </div>
                                    <div className="text-sm opacity-60 mt-2">({a} × {b}) ÷ {c} = {formatNum(resultado)}</div>
                                </div>
                            )}
                        </div>

                        <div className="bg-emerald-500/10 border-l-4 border-emerald-400 p-4 rounded-r-xl">
                            <h4 className="font-bold text-emerald-400 mb-1">
                                {modo === 'directa' ? 'Se cumple la Directa' : 'Se cumple la Inversa'}
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {modo === 'directa' 
                                  ? `Como es Directamente proporcional, si pasamos de una cantidad base de ${a} a una cantidad nueva de ${c}, su equivalencia también se escala linealmente desde ${b} hasta tu resultado final: ${formatNum(resultado)}.`
                                  : `Como es Inversamente proporcional, un aumento en la carga ${a} -> ${c} hace que el impacto por cada unidad baje desde el original ${b} hasta el resultado final de: ${formatNum(resultado)}.`
                                }
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50 py-12">
                        <CornerDownRight className="w-16 h-16 text-slate-600 mb-4" />
                        <p className="text-lg font-medium text-slate-300">Rellena los valores primero.</p>
                        <p className="text-sm text-slate-400 mt-2 max-w-[250px]">El algoritmo calculará automáticamente y te explicará el desglose en tiempo real.</p>
                    </div>
                )}
            </div>
        </section>

      </div>

      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800 border-b border-slate-200 pb-4">
          <Type className="w-6 h-6 text-emerald-500" />
          Ejemplos y Guía de Uso
        </h2>
        
        <h3 className="text-lg font-bold">1. ¿Qué es la Regla de Tres Directa?</h3>
        <p>Se utiliza en los supuestos en que si aumenta una variable, la otra aumenta exactamente en la misma proporción. (Si sube una, sube la otra. Si baja, baja la otra).</p>
        <ul className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <li><strong>Ejemplo clásico (Una receta de Cocina):</strong> Si para hacer una tarta de 4 personas (A) se necesitan 200 gramos (B) de azúcar... ¿Cuánto azúcar (X) necesitamos para hacer una tarta para 6 personas (C)?</li>
            <li>En este caso, <strong>tienes que usar el tab de Regla Directa.</strong></li>
        </ul>

        <h3 className="text-lg font-bold mt-8">2. ¿Qué es la Regla de Tres Inversa?</h3>
        <p>Es el modelo contrario. Cuando una magnitud <strong>crece</strong>, el resultado o tiempo que cuesta realizarlo proporcionalmente <strong>disminuye</strong>.</p>
        <ul className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <li><strong>Ejemplo de Vida Real (Obreros / Tiempo):</strong> Si para pintar una casa, 2 albañiles (A) tardan 6 días (B)... ¿Cuántos días (X) tardarán si contratas a 3 albañiles (C)?</li>
            <li>Teórica y lógicamente tardarán menos tiempo en acabarlo porque hay "más" trabajadores. <strong>En este caso debes seleccionar Arriba la pestaña Regla Inversa.</strong></li>
        </ul>
        
      </section>

    </main>
  );
}
