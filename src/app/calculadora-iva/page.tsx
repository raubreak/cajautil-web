"use client";

import React, { useState, useEffect } from 'react';
import { Landmark, ArrowRightCircle, HandCoins, Info, ArrowLeftRight } from 'lucide-react';

const CalculadoraIVA = () => {
  const [importe, setImporte] = useState<string>('');
  const [porcentajeIva, setPorcentajeIva] = useState<number>(21);
  const [modo, setModo] = useState<"sumar" | "restar">("sumar");
  
  const [resultado, setResultado] = useState({
    baseImponible: 0,
    cuotaIva: 0,
    total: 0
  });

  const calcular = () => {
    const valor = parseFloat(importe.replace(',', '.'));
    if (isNaN(valor) || valor <= 0) {
      setResultado({ baseImponible: 0, cuotaIva: 0, total: 0 });
      return;
    }

    if (modo === "sumar") {
      // Importe es la base imponible. Queremos saber el total.
      const base = valor;
      const cuota = base * (porcentajeIva / 100);
      const total = base + cuota;
      setResultado({
        baseImponible: Number(base.toFixed(2)),
        cuotaIva: Number(cuota.toFixed(2)),
        total: Number(total.toFixed(2))
      });
    } else {
      // Importe es el total. Queremos extraer la base y el IVA.
      const total = valor;
      const base = total / (1 + (porcentajeIva / 100));
      const cuota = total - base;
      setResultado({
        baseImponible: Number(base.toFixed(2)),
        cuotaIva: Number(cuota.toFixed(2)),
        total: Number(total.toFixed(2))
      });
    }
  };

  useEffect(() => {
    calcular();
  }, [importe, porcentajeIva, modo]);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4 sm:px-6 z-10">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-yellow-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-yellow-50">
          <Landmark className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Calculadora de <span className="text-yellow-600">IVA</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-2">
          Calcula la base imponible, la cuota de IVA y el precio total. Añade o quita el IVA fácilmente con cualquier porcentaje.
        </p>
      </div>

      {/* CALCULATOR PLATFORM */}
      <section className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 sm:p-10 border border-slate-100 mb-12">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => setModo('sumar')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border-2 ${modo === 'sumar' ? 'bg-yellow-50 border-yellow-500 text-yellow-700' : 'bg-white border-slate-200 text-slate-500 hover:border-yellow-300'}`}
          >
            <HandCoins className="w-5 h-5" /> Añadir IVA
          </button>
          <button
            onClick={() => setModo('restar')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border-2 ${modo === 'restar' ? 'bg-yellow-50 border-yellow-500 text-yellow-700' : 'bg-white border-slate-200 text-slate-500 hover:border-yellow-300'}`}
          >
            <ArrowLeftRight className="w-5 h-5" /> Quitar IVA
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              {modo === 'sumar' ? 'Precio sin IVA (Base Imponible)' : 'Precio con IVA incluido (Total)'}
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Ej. 100"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 text-lg font-semibold"
                value={importe}
                onChange={(e) => setImporte(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">€</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Porcentaje de IVA (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 text-lg font-semibold bg-white"
                value={porcentajeIva}
                onChange={(e) => setPorcentajeIva(parseFloat(e.target.value) || 0)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
            </div>
            
            <div className="mt-3 flex gap-2">
              <button onClick={() => setPorcentajeIva(21)} className="text-xs bg-slate-200 hover:bg-yellow-200 text-slate-700 font-semibold py-1 px-3 rounded-full transition-colors">21%</button>
              <button onClick={() => setPorcentajeIva(10)} className="text-xs bg-slate-200 hover:bg-yellow-200 text-slate-700 font-semibold py-1 px-3 rounded-full transition-colors">10%</button>
              <button onClick={() => setPorcentajeIva(4)} className="text-xs bg-slate-200 hover:bg-yellow-200 text-slate-700 font-semibold py-1 px-3 rounded-full transition-colors">4%</button>
            </div>
          </div>
        </div>

        {/* RESULTS DESGLOSE */}
        <div className="border border-yellow-200 bg-yellow-50 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-yellow-800 uppercase tracking-widest mb-4 border-b border-yellow-200/50 pb-2 flex items-center gap-2">
            <ArrowRightCircle className="w-5 h-5 text-yellow-500" />
            Resultado del Desglose
          </h3>
          
          <div className="space-y-4">
            <div className={`flex justify-between items-center ${modo === 'restar' ? 'opacity-80' : 'font-bold'}`}>
              <span className="text-slate-600">Base Imponible (Precio sin IVA):</span>
              <span className="text-xl text-slate-800">{resultado.baseImponible.toLocaleString('es-ES')} €</span>
            </div>
            
            <div className="flex justify-between items-center opacity-90 border-b border-yellow-200/50 pb-4">
              <span className="text-slate-600">Cuota de IVA ({porcentajeIva}%):</span>
              <span className="text-xl text-red-600">+{resultado.cuotaIva.toLocaleString('es-ES')} €</span>
            </div>
            
            <div className={`flex justify-between items-center ${modo === 'sumar' ? 'opacity-80 text-xl' : 'text-2xl font-black'}`}>
              <span className="text-slate-800">Precio Total (con IVA):</span>
              <span className="text-yellow-600">{resultado.total.toLocaleString('es-ES')} €</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEO & CONTENT SECTION */}
      <section className="w-full max-w-3xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <Info className="w-6 h-6 text-yellow-500" />
          ¿Cómo se calcula o se extrae el IVA matemáticamente?
        </h2>
        
        <p>A veces nos dan un precio final cerrado y no sabemos de cuánto dinero neto estamos hablando. Extraer el IVA no es tan intuitivo como restar el porcentaje directamente, porque el IVA se aplica siempre sobre la Base Imponible.</p>
        
        <h3>Cómo añadir IVA</h3>
        <p>Si tienes la Base Imponible y quieres aplicar un 21%, la fórmula es multiplicarlo por `1.21`. El resultado será el importe final.</p>

        <h3>Cómo extraer o quitar el IVA de un total</h3>
        <p>El error más común es restarle el 21% a la factura total (Total * 0.79). <strong>Esto es matemáticamente incorrecto</strong>. Para sacar la base imponible de un precio Final con IVA, debes <strong>dividir el total entre 1.21</strong>.</p>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 my-6 shadow-sm">
           <p className="font-mono text-sm text-slate-700 m-0">👉 Base Imponible = Total / (1 + (Porcentaje / 100))</p>
        </div>
      </section>
      
    </main>
  );
};

export default CalculadoraIVA;
