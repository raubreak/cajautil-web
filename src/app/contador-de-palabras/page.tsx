"use client";
import { useState } from "react";

export default function ContadorPalabras() {
  const [texto, setTexto] = useState("");

  const palabras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
  const caracteres = texto.length;
  const sinEspacios = texto.replace(/\s+/g, "").length;
  // Promedio de 200 palabras por minuto
  const tiempoLecturaMin = (palabras / 200);

  return (
    <main className="min-h-[100dvh] bg-slate-50 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-4xl bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-800 mb-2 text-center">
          Contador de <span className="text-emerald-500">Palabras</span>
        </h1>
        <p className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
          Pega tu texto abajo. Analizaremos instantáneamente el volumen de tu ensayo, artículo o post.
        </p>
        
        {/* AdSense Top */}
        <div className="w-full h-[90px] mb-6 bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm rounded-xl">Espacio AdSense Leaderboard</div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-emerald-50 p-4 rounded-xl text-center border border-emerald-100">
            <span className="block text-3xl font-black text-emerald-600">{palabras}</span>
            <span className="text-sm font-medium text-emerald-800">Palabras</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
            <span className="block text-3xl font-black text-slate-700">{caracteres}</span>
            <span className="text-sm font-medium text-slate-500">Caracteres</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
            <span className="block text-3xl font-black text-slate-700">{sinEspacios}</span>
            <span className="text-sm font-medium text-slate-500">Sin espacios</span>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl text-center border border-emerald-100">
            <span className="block text-3xl font-black text-emerald-600">{tiempoLecturaMin < 1 ? "< 1" : Math.ceil(tiempoLecturaMin)}</span>
            <span className="text-sm font-medium text-emerald-800">Min. Lectura</span>
          </div>
        </div>

        <textarea 
          className="w-full h-80 border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none resize-y text-slate-700 shadow-inner"
          placeholder="Escribe o pega aquí tu texto..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        ></textarea>
        
        <button onClick={() => setTexto("")} className="mt-4 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium text-sm">
          Limpiar texto
        </button>

      </div>
    </main>
  );
}
