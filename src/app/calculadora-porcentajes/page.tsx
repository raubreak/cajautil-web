"use client";
import { useState } from "react";
import Link from "next/link";
import { Percent } from "lucide-react";

export default function CalculadoraPorcentajes() {
  const [cantidad, setCantidad] = useState("");
  const [porcentaje, setPorcentaje] = useState("");

  const resultado = Number(cantidad) * (Number(porcentaje) / 100);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100/50 rounded-3xl mb-6 border border-blue-50 shadow-sm">
          <Percent className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Calculadora de <span className="text-blue-600">Porcentajes</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          Calcula el IVA, descuentos, incrementos o descubre el porcentaje de cualquier cantidad.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl p-8 sm:p-12 border border-slate-100 flex flex-col gap-6 mb-12">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="porcentaje-input" className="block text-sm sm:text-base font-bold text-slate-700 mb-2">
                ¿Cuánto es el...
              </label>
              <div className="relative flex items-center">
                <input 
                  id="porcentaje-input"
                  inputMode="decimal"
                  type="number" 
                  value={porcentaje}
                  onChange={(e) => setPorcentaje(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-2xl p-4 text-xl font-bold text-slate-900 bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                  placeholder="Ej: 21"
                  aria-label="Porcentaje a calcular"
                />
                <span className="absolute right-6 text-slate-400 font-black text-xl select-none pointer-events-none">%</span>
              </div>
            </div>

            <div>
              <label htmlFor="cantidad-input" className="block text-sm sm:text-base font-bold text-slate-700 mb-2">
                de esta cantidad?
              </label>
              <input 
                id="cantidad-input"
                inputMode="decimal"
                type="number" 
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="w-full border-2 border-slate-200 rounded-2xl p-4 text-xl font-bold text-slate-900 bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                placeholder="Ej: 1500"
                aria-label="Cantidad base"
              />
            </div>
          </div>

          <div className="mt-6 pt-8 border-t border-slate-100">
            <p className="text-sm font-bold text-slate-400 text-center mb-4 uppercase tracking-widest">
              Resultado final
            </p>
            <div className="p-8 bg-blue-50 rounded-[32px] border border-blue-100 flex items-center justify-center min-h-[8rem] shadow-sm transform transition-all hover:scale-[1.02]" role="status" aria-live="polite">
              <p className="text-5xl sm:text-6xl font-black text-blue-700 text-center break-all drop-shadow-sm">
                {!isNaN(resultado) && cantidad && porcentaje ? resultado.toLocaleString('es-ES', { maximumFractionDigits: 2 }) : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido SEO */}
      <section className="w-full max-w-3xl prose prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-800 px-4 text-slate-600 prose-a:text-blue-600">
        <h2>¿Cómo calcular porcentajes?</h2>
        <p>
          Calcular un <strong>porcentaje</strong> es tan sencillo como multiplicar la cantidad por el porcentaje y dividir entre 100. 
          Por ejemplo, el <strong>21% de IVA</strong> de 100€ son 21€. Nuestra calculadora hace este cálculo al instante.
        </p>
        <p>
          Esta herramienta es perfecta para calcular <strong>descuentos en compras</strong>, <strong>propinas</strong>, 
          <strong>incrementos salariales</strong> o el <strong>IVA de cualquier producto</strong>.
        </p>

        <h2>Casos practicos en los que te puede ayudar</h2>
        <ul>
          <li><strong>Rebajas:</strong> saber cuanto te descuentan y el precio final.</li>
          <li><strong>Facturas:</strong> calcular un porcentaje de IVA o de retencion.</li>
          <li><strong>Finanzas personales:</strong> medir subidas, bajadas o variaciones de ingresos y gastos.</li>
          <li><strong>Trabajo y ventas:</strong> estimar comisiones, margenes o aumentos porcentuales.</li>
        </ul>

        <p>
          Si necesitas operaciones mas concretas, como anadir o quitar IVA con desglose completo, te conviene usar una herramienta especializada.
        </p>

        <h2>Preguntas frecuentes</h2>
        <details className="open:bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="cursor-pointer font-bold text-slate-800 focus:outline-none">¿Cómo se calcula el IVA de un producto?</summary>
          <p className="mt-4 mb-0 text-slate-600">Para calcular el IVA, multiplica el precio del producto por 0.21 (para el 21%). Por ejemplo, un producto de 50€ tendrá 10,50€ de IVA, resultando en un precio final de 60,50€.</p>
        </details>
        <details className="open:bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="cursor-pointer font-bold text-slate-800 focus:outline-none">¿Cómo calcular un descuento del 20%?</summary>
          <p className="mt-4 mb-0 text-slate-600">Introduce 20 en el campo de porcentaje y el precio original en cantidad. El resultado es lo que te descuentan. Réstalo del precio original para saber el precio final.</p>
        </details>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/calculadora-iva">Calculadora de IVA</Link></li>
          <li><Link href="/calculadora-sueldo-neto">Calculadora Sueldo Neto</Link></li>
          <li><Link href="/calculadora-dias">Calculadora de Días Exactos</Link></li>
        </ul>
      </section>
    </main>
  );
}
