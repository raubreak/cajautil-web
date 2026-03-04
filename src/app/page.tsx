"use client";
import { useState } from "react";

export default function CalculadoraPorcentajes() {
  const [cantidad, setCantidad] = useState("");
  const [porcentaje, setPorcentaje] = useState("");

  const resultado = Number(cantidad) * (Number(porcentaje) / 100);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Calculadora de Porcentajes</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">¿Cuánto es el...</label>
            <div className="flex items-center">
              <input 
                type="number" 
                value={porcentaje}
                onChange={(e) => setPorcentaje(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="Ej: 21"
              />
              <span className="ml-2 text-gray-600 font-bold">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">de esta cantidad?</label>
            <input 
              type="number" 
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Ej: 1500"
            />
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800 text-center mb-1">Resultado:</p>
            <p className="text-3xl font-bold text-blue-900 text-center">
              {!isNaN(resultado) && cantidad && porcentaje ? resultado.toFixed(2) : "0.00"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Espacio reservado para AdSense */}
      <div className="mt-8 max-w-md w-full h-32 bg-gray-200 border border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-sm rounded-md">
        Espacio publicitario reservado (AdSense)
      </div>
    </main>
  );
}