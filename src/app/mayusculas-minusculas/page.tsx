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
        <h2>Como cambiar texto de mayusculas a minusculas online</h2>
        <p>
          Nuestro <strong>convertidor de mayusculas y minusculas</strong> transforma cualquier texto de forma instantanea
          sin necesidad de registro ni instalacion. Elige entre 4 formatos disponibles:
        </p>
        <ul>
          <li><strong>TODO MAYUSCULAS:</strong> convierte cada caracter a su version en mayuscula. Util para titulos, siglas o para dar enfasis.</li>
          <li><strong>todo minusculas:</strong> pasa todo el texto a minusculas. Ideal para normalizar texto copiado de documentos con formato inconsistente.</li>
          <li><strong>Cada Palabra Capitalizada:</strong> la primera letra de cada palabra se convierte en mayuscula. Perfecto para titulos de articulos, nombres propios o encabezados.</li>
          <li><strong>Formato tipo oracion:</strong> solo la primera letra despues de un punto, signo de exclamacion o interrogacion se pone en mayuscula. Es el formato mas natural para textos largos.</li>
        </ul>

        <h2>Casos de uso habituales</h2>
        <p>
          Esta herramienta es especialmente util para:
        </p>
        <ul>
          <li>Corregir textos escritos accidentalmente con el <strong>Bloq Mayus</strong> activado.</li>
          <li>Formatear titulos y encabezados para blogs, newsletters o documentos profesionales.</li>
          <li>Preparar contenido para redes sociales como Instagram, Twitter o LinkedIn.</li>
          <li>Normalizar datos importados de hojas de calculo o bases de datos con formatos mixtos.</li>
          <li>Limpiar texto copiado de PDFs o imagenes donde el formato original se ha perdido.</li>
        </ul>

        <h2>Privacidad y procesamiento local</h2>
        <p>
          Todo el procesamiento se realiza directamente en tu navegador. El texto que introduces no se envia
          a ningun servidor externo ni se almacena en ninguna base de datos. Puedes usar la herramienta con
          total tranquilidad, incluso para textos confidenciales o datos sensibles.
        </p>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/contador-de-palabras">Contador de Palabras y Caracteres</Link></li>
          <li><Link href="/generador-contrasenas">Generador de Contrasenas Seguras</Link></li>
          <li><Link href="/generador-lorem-ipsum">Generador de Lorem Ipsum</Link></li>
          <li><Link href="/traductor-binario">Traductor Binario y Morse</Link></li>
        </ul>
      </section>
    </main>
  );
}
