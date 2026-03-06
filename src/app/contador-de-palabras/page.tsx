"use client";
import { useState } from "react";
import Link from "next/link";
import { Type } from "lucide-react";

export default function ContadorPalabras() {
  const [texto, setTexto] = useState("");

  const palabras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
  const caracteres = texto.length;
  const sinEspacios = texto.replace(/\s+/g, "").length;
  const tiempoLecturaMin = (palabras / 200);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-100/50 rounded-3xl mb-6 border border-emerald-50 shadow-sm">
          <Type className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Contador de <span className="text-emerald-600">Palabras</span> y Caracteres
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          Pega tu texto abajo. Analizaremos instantáneamente las palabras, caracteres y tiempo de lectura.
        </p>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 flex flex-col gap-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2" role="status" aria-live="polite" aria-label="Estadísticas del texto">
          <div className="bg-emerald-50 py-6 rounded-2xl text-center border border-emerald-100 flex flex-col items-center justify-center">
            <span className="block text-4xl font-black text-emerald-600 mb-1">{palabras}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">Palabras</span>
          </div>
          <div className="bg-slate-50 py-6 rounded-2xl text-center border border-slate-200 flex flex-col items-center justify-center">
            <span className="block text-4xl font-black text-slate-700 mb-1">{caracteres}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Caracteres</span>
          </div>
          <div className="bg-slate-50 py-6 rounded-2xl text-center border border-slate-200 flex flex-col items-center justify-center">
            <span className="block text-4xl font-black text-slate-700 mb-1">{sinEspacios}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Sin espacios</span>
          </div>
          <div className="bg-emerald-50 py-6 rounded-2xl text-center border border-emerald-100 flex flex-col items-center justify-center">
            <span className="block text-4xl font-black text-emerald-600 mb-1">{tiempoLecturaMin < 1 ? "< 1" : Math.ceil(tiempoLecturaMin)}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">Min. Lectura</span>
          </div>
        </div>

        <div>
          <label htmlFor="texto-input" className="sr-only">Escribe o pega tu texto para contar palabras</label>
          <textarea 
            id="texto-input"
            className="w-full h-80 border-2 border-slate-200 rounded-2xl p-6 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 outline-none resize-y text-slate-700 shadow-inner text-lg transition"
            placeholder="Escribe o pega aquí tu texto..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            aria-label="Zona de texto para contar palabras y caracteres"
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button onClick={() => setTexto("")} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors font-bold text-sm">
            Limpiar texto
          </button>
        </div>
      </div>

      {/* Contenido SEO */}
      <section className="w-full max-w-4xl prose prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-800 px-4 text-slate-600 prose-a:text-emerald-600">
        <h2>¿Para qué sirve un contador de palabras?</h2>
        <p>
          Un <strong>contador de palabras online</strong> es esencial para escritores, estudiantes, periodistas, community managers y 
          cualquier persona que necesite controlar la extensión de sus textos. Esta herramienta te muestra al instante el número 
          de <strong>palabras</strong>, <strong>caracteres</strong> (con y sin espacios) y el <strong>tiempo de lectura estimado</strong>.
        </p>
        <p>
          Es ideal para cumplir con límites de <strong>caracteres en redes sociales</strong> (Twitter/X: 280 caracteres), 
          <strong>meta descriptions para SEO</strong> (150-160 caracteres) o <strong>ensayos académicos</strong> con requisitos de extensión.
        </p>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/mayusculas-minusculas">Convertir Mayúsculas a Minúsculas</Link></li>
          <li><Link href="/generador-contrasenas">Generador de Contraseñas Seguras</Link></li>
        </ul>
      </section>
    </main>
  );
}
