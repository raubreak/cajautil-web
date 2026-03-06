"use client";
import { useState } from "react";
import Link from "next/link";

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
          Convertidor a <span className="text-purple-600">Mayúsculas</span> y Minúsculas
        </h1>
        <p className="text-center text-slate-500 text-sm mb-6">Cambia el formato de tu texto con un solo clic. Sin registro.</p>
        
        <div className="flex flex-wrap gap-2 justify-center my-6" role="group" aria-label="Opciones de conversión">
          <button onClick={toUpper} className="px-4 py-2 bg-purple-100 text-purple-700 font-bold rounded-lg hover:bg-purple-200 transition">MAYÚSCULAS</button>
          <button onClick={toLower} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition">minúsculas</button>
          <button onClick={toCapitalize} className="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg hover:bg-blue-200 transition">Capitalizadas</button>
          <button onClick={aOracion} className="px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-lg hover:bg-emerald-200 transition">Tipo oración.</button>
        </div>

        <label htmlFor="texto-convertir" className="sr-only">Texto para convertir</label>
        <textarea 
          id="texto-convertir"
          className="w-full h-80 border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-purple-500 outline-none resize-y text-slate-700 shadow-inner"
          placeholder="Pega el texto que quieres transformar aquí..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          aria-label="Zona de texto para convertir mayúsculas y minúsculas"
        ></textarea>
      </div>

      {/* Contenido SEO */}
      <article className="w-full max-w-4xl mt-6 bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">¿Cómo cambiar texto de mayúsculas a minúsculas online?</h2>
        <div className="text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            Nuestro <strong>convertidor de mayúsculas y minúsculas</strong> transforma cualquier texto de forma instantánea. 
            Elige entre 4 formatos: <strong>TODO MAYÚSCULAS</strong>, <strong>todo minúsculas</strong>, 
            <strong>Cada Palabra Capitalizada</strong> o <strong>Formato tipo oración</strong>.
          </p>
          <p>
            Es perfecto para corregir textos que escribiste con Bloq Mayús activado, 
            formatear títulos, o preparar contenido para publicaciones.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Herramientas relacionadas</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/contador-de-palabras" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Contador de Palabras
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
