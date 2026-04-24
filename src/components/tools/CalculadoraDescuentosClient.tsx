"use client";

import { useState } from "react";
import { Tag, Sparkles, TrendingDown, Wallet, CornerRightDown, RefreshCcw } from "lucide-react";

export default function CalculadoraDescuentosClient() {
  const [precioOriginal, setPrecioOriginal] = useState<string>("100");
  const [descuento, setDescuento] = useState<string>("20");

  const original = parseFloat(precioOriginal) || 0;
  const desc = parseFloat(descuento) || 0;

  const ahorro = (original * desc) / 100;
  const precioFinal = original - ahorro;

  const formatMoney = (n: number) =>
    n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-rose-100/50 rounded-3xl mb-6 border border-rose-50">
          <Tag className="w-10 h-10 text-rose-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Calculadora de <span className="text-rose-500">Descuentos</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium">No vuelvas a dudar en las rebajas. Introduce el precio y el porcentaje para saber cuanto pagas exactamente.</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <section className="bg-white rounded-[40px] shadow-2xl p-8 sm:p-10 border border-slate-100 flex flex-col justify-center space-y-8">
          <div className="relative group">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 block pl-2">Precio original (EUR)</label>
            <div className="relative">
              <input
                type="number"
                value={precioOriginal}
                onChange={(e) => setPrecioOriginal(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-3xl text-4xl font-black text-slate-800 focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition appearance-none"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-2xl">EUR</div>
            </div>
          </div>

          <div className="relative group">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 block pl-2">Porcentaje de descuento (%)</label>
            <div className="relative">
              <input
                type="number"
                value={descuento}
                onChange={(e) => setDescuento(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-3xl text-4xl font-black text-rose-500 focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition appearance-none"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-2xl">%</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15, 20, 25, 30, 50, 70].map((p) => (
              <button
                key={p}
                onClick={() => setDescuento(p.toString())}
                className={`py-3 rounded-2xl font-bold transition-all border ${descuento === p.toString() ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200" : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-white hover:border-rose-200"}`}
              >
                {p}%
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setPrecioOriginal("");
              setDescuento("");
            }}
            className="flex items-center justify-center gap-2 text-slate-300 hover:text-slate-500 transition text-sm font-bold"
          >
            <RefreshCcw className="w-4 h-4" /> Resetear todo
          </button>
        </section>

        <section className="bg-slate-900 rounded-[40px] shadow-2xl p-10 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-rose-600/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10">
            <h3 className="text-lg font-bold text-slate-400 mb-10 flex items-center gap-2 uppercase tracking-widest">Resumen del ahorro</h3>

            <div className="space-y-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-2xl">
                  <TrendingDown className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Te ahorras</p>
                  <p className="text-3xl font-black text-white">-{formatMoney(ahorro)} EUR</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-600 rounded-2xl shadow-xl shadow-rose-900/40">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Precio final</p>
                  <p className="text-6xl font-black text-white leading-none tabular-nums">{formatMoney(precioFinal)} <span className="text-2xl font-bold text-slate-500 block mt-2 sm:inline">EUR</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-10 mt-10 border-t border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Precio original</span>
              <span className="font-mono">{formatMoney(original)} EUR</span>
            </div>
            <div className="flex items-center justify-between text-sm text-emerald-400 font-bold bg-emerald-500/10 p-4 rounded-2xl">
              <div className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Buena oferta</div>
              <span>{formatMoney(ahorro)} EUR menos</span>
            </div>
          </div>
        </section>
      </div>

      <section className="w-full max-w-4xl mt-16 prose prose-slate text-slate-600">
        <h2 className="text-2xl font-black text-slate-800 mb-6">Cómo funciona el cálculo del descuento</h2>
        <p>Para obtener el precio rebajado de forma manual, multiplica el precio original por el porcentaje de la rebaja y divide el resultado entre 100 para obtener el ahorro bruto. Después, resta esa cifra al precio inicial.</p>
        <div className="bg-white border rounded-3xl p-6 shadow-sm flex items-center gap-6">
          <CornerRightDown className="w-8 h-8 text-rose-500 shrink-0" />
          <p className="text-sm font-medium italic">Ejemplo: una chaqueta de 60 EUR con un 15% de descuento se calcula así: (60 x 15) / 100 = 9 EUR. Su precio final sería de 51 EUR.</p>
        </div>
        <p className="mt-8">Nuestra herramienta agiliza este proceso para que no cometas errores matemáticos y puedas comparar rápidamente entre varios artículos en periodos como Navidad o Black Friday.</p>
      </section>
    </>
  );
}
