"use client";
import { useState } from "react";
import Link from "next/link";
import { CaseUpper } from "lucide-react";

export default function ConvertidorTexto() {
  const [texto, setTexto] = useState("");

  const toUpper = () => setTexto(texto.toUpperCase());
  const toLower = () => setTexto(texto.toLowerCase());
  const toCapitalize = () => setTexto(texto.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()));
  const aOracion = () => setTexto(texto.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()));

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-purple-100/50 rounded-3xl mb-6 border border-purple-50 shadow-sm">
          <CaseUpper className="w-10 h-10 text-purple-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Convertidor a <span className="text-purple-600">Mayúsculas</span> y Minúsculas
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          Cambia el formato de tu texto con un solo clic. Sin registro y al instante.
        </p>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 flex flex-col gap-6 mb-12">
        <div className="flex flex-wrap gap-3 justify-center mb-2" role="group" aria-label="Opciones de conversión">
          <button onClick={toUpper} className="px-5 py-3 bg-slate-50 border-2 border-slate-100 text-slate-700 font-black tracking-widest uppercase rounded-xl hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 shadow-sm hover:shadow transition-all">MAYÚSCULAS</button>
          <button onClick={toLower} className="px-5 py-3 bg-slate-50 border-2 border-slate-100 text-slate-700 font-bold lowercase rounded-xl hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 shadow-sm hover:shadow transition-all">minúsculas</button>
          <button onClick={toCapitalize} className="px-5 py-3 bg-slate-50 border-2 border-slate-100 text-slate-700 font-bold capitalize rounded-xl hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 shadow-sm hover:shadow transition-all">Capitalizadas</button>
          <button onClick={aOracion} className="px-5 py-3 bg-slate-50 border-2 border-slate-100 text-slate-700 font-bold rounded-xl hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 shadow-sm hover:shadow transition-all">Tipo oración.</button>
        </div>

        <div>
          <label htmlFor="texto-convertir" className="sr-only">Texto para convertir</label>
          <textarea 
            id="texto-convertir"
            className="w-full h-80 border-2 border-slate-200 rounded-2xl p-6 focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none resize-y text-slate-700 shadow-inner text-lg transition"
            placeholder="Pega el texto que quieres transformar aquí..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            aria-label="Zona de texto para convertir mayúsculas y minúsculas"
          ></textarea>
        </div>
      </div>

      {/* Contenido SEO */}
      <section className="w-full max-w-4xl prose prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-800 px-4 text-slate-600 prose-a:text-purple-600">
        <h2>¿Cómo cambiar texto de mayúsculas a minúsculas online?</h2>
        <p>
          Nuestro <strong>convertidor de mayúsculas y minúsculas</strong> transforma cualquier texto de forma instantánea. 
          Elige entre 4 formatos: <strong>TODO MAYÚSCULAS</strong>, <strong>todo minúsculas</strong>, 
          <strong>Cada Palabra Capitalizada</strong> o <strong>Formato tipo oración</strong>.
        </p>
        <p>
          Es perfecto para corregir textos que escribiste con Bloq Mayús activado, 
          formatear títulos, o preparar contenido para blogs y redes sociales. Al procesarse en tu dispositivo, es 100% privado.
        </p>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/contador-de-palabras">Contador de Palabras y Caracteres</Link></li>
          <li><Link href="/generador-contrasenas">Generador de Contraseñas Seguras</Link></li>
        </ul>
      </section>
    </main>
  );
}
