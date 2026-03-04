"use client";
import { useState } from "react";

export default function ConvertidorTexto() {
  const [texto, setTexto] = useState("");

  const toUpper = () => setTexto(texto.toUpperCase());
  const toLower = () => setTexto(texto.toLowerCase());
  const toCapitalize = () => setTexto(texto.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()));
  const aOracion = () => setTexto(texto.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()));

  return (
    <main className="min-h-[100dvh] bg-slate-50 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-4xl bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-800 mb-2 text-center">
          Convertidor a <span className="text-purple-600">Mayúsculas</span>
        </h1>
        
        <div className="flex flex-wrap gap-2 justify-center my-6">
          <button onClick={toUpper} className="px-4 py-2 bg-purple-100 text-purple-700 font-bold rounded-lg hover:bg-purple-200 transition">MAYÚSCULAS</button>
          <button onClick={toLower} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition">minúsculas</button>
          <button onClick={toCapitalize} className="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg hover:bg-blue-200 transition">Capitalizadas</button>
          <button onClick={aOracion} className="px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-lg hover:bg-emerald-200 transition">Tipo oración.</button>
        </div>

        <textarea 
          className="w-full h-80 border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-purple-500 outline-none resize-y text-slate-700 shadow-inner"
          placeholder="Pega el texto que quieres transformar aquí..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        ></textarea>
        
        {/* AdSense Bottom */}
        <div className="w-full h-[90px] mt-6 bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm rounded-xl">Publicidad AdSense Auto</div>

      </div>
    </main>
  );
}
