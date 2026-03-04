"use client";
import { useState } from "react";

export default function CalculadoraPorcentajes() {
  const [cantidad, setCantidad] = useState("");
  const [porcentaje, setPorcentaje] = useState("");

  const resultado = Number(cantidad) * (Number(porcentaje) / 100);

  return (
    <main className="min-h-[100dvh] bg-slate-50 flex flex-col items-center py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      
      {/* Contenedor central adaptable (Responsive) */}
      <div className="w-full max-w-md bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-6 text-center tracking-tight">
          Calculadora de <span className="text-blue-600">Porcentajes</span>
        </h1>
        
        <div className="space-y-5">
          {/* Bloque Input 1 */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-1.5">
              ¿Cuánto es el...
            </label>
            <div className="relative flex items-center">
              <input 
                inputMode="decimal"
                type="number" 
                value={porcentaje}
                onChange={(e) => setPorcentaje(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 sm:p-4 text-lg text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                placeholder="Ej: 21"
              />
              <span className="absolute right-4 text-slate-400 font-bold text-lg select-none pointer-events-none">%</span>
            </div>
          </div>

          {/* Bloque Input 2 */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-1.5">
              de esta cantidad?
            </label>
            <input 
              inputMode="decimal"
              type="number" 
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 sm:p-4 text-lg text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
              placeholder="Ej: 1500"
            />
          </div>

          {/* Bloque Resultado */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-sm font-medium text-slate-500 text-center mb-2 uppercase tracking-wider">
              Resultado final
            </p>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center min-h-[5rem]">
              <p className="text-4xl sm:text-5xl font-black text-blue-700 text-center break-all">
                {!isNaN(resultado) && cantidad && porcentaje ? resultado.toLocaleString('es-ES', { maximumFractionDigits: 2 }) : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Espacio reservado para AdSense (Adaptable cuadrado en móvil, horizontal en PC) */}
      <div className="w-full max-w-md mt-auto mb-4 bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm font-medium rounded-xl h-[250px] sm:h-[120px] shadow-inner">
        Publicidad Automática (AdSense)
      </div>

    </main>
  );
}