"use client";
import { useState } from "react";
import Link from "next/link";

export default function CalculadoraPorcentajes() {
  const [cantidad, setCantidad] = useState("");
  const [porcentaje, setPorcentaje] = useState("");

  const resultado = Number(cantidad) * (Number(porcentaje) / 100);

  return (
    <main className="min-h-[100dvh] bg-slate-50 flex flex-col items-center py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      
      <div className="w-full max-w-md bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-6 text-center tracking-tight">
          Calculadora de <span className="text-blue-600">Porcentajes</span>
        </h1>
        
        <div className="space-y-5">
          <div>
            <label htmlFor="porcentaje-input" className="block text-sm sm:text-base font-semibold text-slate-700 mb-1.5">
              ¿Cuánto es el...
            </label>
            <div className="relative flex items-center">
              <input 
                id="porcentaje-input"
                inputMode="decimal"
                type="number" 
                value={porcentaje}
                onChange={(e) => setPorcentaje(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 sm:p-4 text-lg text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                placeholder="Ej: 21"
                aria-label="Porcentaje a calcular"
              />
              <span className="absolute right-4 text-slate-400 font-bold text-lg select-none pointer-events-none">%</span>
            </div>
          </div>

          <div>
            <label htmlFor="cantidad-input" className="block text-sm sm:text-base font-semibold text-slate-700 mb-1.5">
              de esta cantidad?
            </label>
            <input 
              id="cantidad-input"
              inputMode="decimal"
              type="number" 
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 sm:p-4 text-lg text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
              placeholder="Ej: 1500"
              aria-label="Cantidad base"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-sm font-medium text-slate-500 text-center mb-2 uppercase tracking-wider">
              Resultado final
            </p>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center min-h-[5rem]" role="status" aria-live="polite">
              <p className="text-4xl sm:text-5xl font-black text-blue-700 text-center break-all">
                {!isNaN(resultado) && cantidad && porcentaje ? resultado.toLocaleString('es-ES', { maximumFractionDigits: 2 }) : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido SEO */}
      <article className="w-full max-w-md bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">¿Cómo calcular porcentajes?</h2>
        <div className="text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            Calcular un <strong>porcentaje</strong> es tan sencillo como multiplicar la cantidad por el porcentaje y dividir entre 100. 
            Por ejemplo, el <strong>21% de IVA</strong> de 100€ son 21€. Nuestra calculadora hace este cálculo al instante.
          </p>
          <p>
            Esta herramienta es perfecta para calcular <strong>descuentos en compras</strong>, <strong>propinas</strong>, 
            <strong>incrementos salariales</strong> o el <strong>IVA de cualquier producto</strong>.
          </p>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">Preguntas frecuentes</h2>
        <div className="space-y-3">
          <details className="border border-slate-100 rounded-xl overflow-hidden">
            <summary className="p-4 cursor-pointer font-semibold text-slate-700 hover:text-blue-600 text-sm">¿Cómo se calcula el IVA de un producto?</summary>
            <p className="px-4 pb-4 text-slate-600 text-sm">Para calcular el IVA, multiplica el precio del producto por 0.21 (para el 21%). Por ejemplo, un producto de 50€ tendrá 10,50€ de IVA, resultando en un precio final de 60,50€.</p>
          </details>
          <details className="border border-slate-100 rounded-xl overflow-hidden">
            <summary className="p-4 cursor-pointer font-semibold text-slate-700 hover:text-blue-600 text-sm">¿Cómo calcular un descuento del 20%?</summary>
            <p className="px-4 pb-4 text-slate-600 text-sm">Introduce 20 en el campo de porcentaje y el precio original en cantidad. El resultado es lo que te descuentan. Réstalo del precio original para saber el precio final.</p>
          </details>
        </div>

        {/* Internal Linking */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Herramientas relacionadas</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculadora-sueldo-neto" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Calculadora Sueldo Neto
            </Link>
            <Link href="/calculadora-dias" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Calculadora de Días
            </Link>
            <Link href="/contador-de-palabras" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Contador de Palabras
            </Link>
          </div>
        </div>
      </article>

    </main>
  );
}