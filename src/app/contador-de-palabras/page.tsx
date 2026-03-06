"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContadorPalabras() {
  const [texto, setTexto] = useState("");

  const palabras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
  const caracteres = texto.length;
  const sinEspacios = texto.replace(/\s+/g, "").length;
  const tiempoLecturaMin = (palabras / 200);

  return (
    <main className="min-h-[100dvh] bg-slate-50 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-4xl bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-800 mb-2 text-center">
          Contador de <span className="text-emerald-500">Palabras</span> y Caracteres
        </h1>
        <p className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
          Pega tu texto abajo. Analizaremos instantáneamente las palabras, caracteres y tiempo de lectura de tu ensayo, artículo o post.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" role="status" aria-live="polite" aria-label="Estadísticas del texto">
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

        <label htmlFor="texto-input" className="sr-only">Escribe o pega tu texto para contar palabras</label>
        <textarea 
          id="texto-input"
          className="w-full h-80 border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none resize-y text-slate-700 shadow-inner"
          placeholder="Escribe o pega aquí tu texto..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          aria-label="Zona de texto para contar palabras y caracteres"
        ></textarea>
        
        <button onClick={() => setTexto("")} className="mt-4 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium text-sm">
          Limpiar texto
        </button>
      </div>

      {/* Contenido SEO */}
      <article className="w-full max-w-4xl mt-6 bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">¿Para qué sirve un contador de palabras?</h2>
        <div className="text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            Un <strong>contador de palabras online</strong> es esencial para escritores, estudiantes, periodistas, community managers y 
            cualquier persona que necesite controlar la extensión de sus textos. Esta herramienta te muestra al instante el número 
            de <strong>palabras</strong>, <strong>caracteres</strong> (con y sin espacios) y el <strong>tiempo de lectura estimado</strong>.
          </p>
          <p>
            Es ideal para cumplir con límites de <strong>caracteres en redes sociales</strong> (Twitter/X: 280 caracteres), 
            <strong>meta descriptions para SEO</strong> (150-160 caracteres) o <strong>ensayos académicos</strong> con requisitos de extensión.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Herramientas relacionadas</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/mayusculas-minusculas" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Convertir Mayúsculas/Minúsculas
            </Link>
            <Link href="/generador-contrasenas" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Generador de Contraseñas
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
