"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CaseUpper, Check, Copy, Trash2 } from "lucide-react";

const toSpanishLowerCase = (text: string) => text.toLocaleLowerCase("es-ES");
const toSpanishUpperCase = (text: string) => text.toLocaleUpperCase("es-ES");

const capitalizeWords = (text: string) => toSpanishLowerCase(text).replace(
  /\p{L}[\p{L}\p{M}]*/gu,
  (word) => word.replace(/^\p{L}/u, (letter) => toSpanishUpperCase(letter)),
);

const capitalizeSentences = (text: string) => toSpanishLowerCase(text).replace(
  /(^|[.!?]+(?:\s|["'”’)\]])+|[\r\n]+\s*)([\s"'“‘([{¿¡]*)(\p{L})/gu,
  (_, boundary: string, prefix: string, letter: string) => `${boundary}${prefix}${toSpanishUpperCase(letter)}`,
);

export default function ConvertidorTexto() {
  const [texto, setTexto] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updateText = (nextText: string) => {
    setTexto(nextText);
    setCopyStatus("idle");
  };

  const copyText = async () => {
    if (!texto) return;
    try {
      await navigator.clipboard.writeText(texto);
      setCopyStatus("copied");
    } catch {
      const textarea = textareaRef.current;
      if (!textarea) {
        setCopyStatus("error");
        return;
      }
      try {
        textarea.focus();
        textarea.select();
        setCopyStatus(document.execCommand("copy") ? "copied" : "error");
      } catch {
        setCopyStatus("error");
      }
    }
  };

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
          <button type="button" onClick={() => updateText(toSpanishUpperCase(texto))} disabled={!texto} className="px-5 py-3 bg-slate-50 border-2 border-slate-100 text-slate-700 font-black tracking-widest uppercase rounded-xl hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 shadow-sm hover:shadow transition-all disabled:opacity-40">MAYÚSCULAS</button>
          <button type="button" onClick={() => updateText(toSpanishLowerCase(texto))} disabled={!texto} className="px-5 py-3 bg-slate-50 border-2 border-slate-100 text-slate-700 font-bold lowercase rounded-xl hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 shadow-sm hover:shadow transition-all disabled:opacity-40">minúsculas</button>
          <button type="button" onClick={() => updateText(capitalizeWords(texto))} disabled={!texto} className="px-5 py-3 bg-slate-50 border-2 border-slate-100 text-slate-700 font-bold capitalize rounded-xl hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 shadow-sm hover:shadow transition-all disabled:opacity-40">Capitalizar palabras</button>
          <button type="button" onClick={() => updateText(capitalizeSentences(texto))} disabled={!texto} className="px-5 py-3 bg-slate-50 border-2 border-slate-100 text-slate-700 font-bold rounded-xl hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 shadow-sm hover:shadow transition-all disabled:opacity-40">Tipo oración</button>
        </div>

        <div>
          <label htmlFor="texto-convertir" className="sr-only">Texto para convertir</label>
          <textarea
            ref={textareaRef}
            id="texto-convertir"
            className="w-full h-80 border-2 border-slate-200 rounded-2xl p-6 focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none resize-y text-slate-700 shadow-inner text-lg transition"
            placeholder="Pega el texto que quieres transformar aquí..."
            value={texto}
            onChange={(e) => updateText(e.target.value)}
          ></textarea>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-400" aria-live="polite">
              {copyStatus === "copied" ? "Texto copiado." : copyStatus === "error" ? "No se pudo copiar. Selecciona el texto manualmente." : `${texto.length.toLocaleString("es-ES")} caracteres`}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => updateText("")} disabled={!texto} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-500 transition hover:border-rose-200 hover:text-rose-600 disabled:opacity-40">
                <Trash2 className="h-4 w-4" aria-hidden="true" /> Limpiar
              </button>
              <button type="button" onClick={copyText} disabled={!texto} className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 font-bold text-white transition hover:bg-purple-700 disabled:opacity-40">
                {copyStatus === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copyStatus === "copied" ? "Copiado" : "Copiar texto"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido SEO */}
      <section className="w-full max-w-4xl prose prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-800 px-4 text-slate-600 prose-a:text-purple-600">
        <h2>Cómo cambiar texto de mayúsculas a minúsculas online</h2>
        <p>
          Nuestro <strong>convertidor de mayusculas y minusculas</strong> transforma cualquier texto de forma instantanea
          sin necesidad de registro ni instalación. Elige entre cuatro formatos disponibles:
        </p>
        <ul>
          <li><strong>TODO MAYÚSCULAS:</strong> convierte cada carácter a su versión en mayúscula, incluidas letras con tilde y la ñ.</li>
          <li><strong>todo minúsculas:</strong> pasa todo el texto a minúsculas para normalizar contenido con formato inconsistente.</li>
          <li><strong>Cada Palabra Capitalizada:</strong> convierte en mayúscula la primera letra Unicode de cada palabra. No decide qué palabras deberían ir en minúscula según un manual de estilo.</li>
          <li><strong>Formato tipo oración:</strong> pone en mayúscula la primera letra del texto y la que aparece después de un cierre de frase o un salto de línea.</li>
        </ul>

        <h2>Casos de uso habituales</h2>
        <p>
          Esta herramienta es especialmente útil para:
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
          Todo el procesamiento se realiza directamente en tu navegador. CajaUtil no envía el texto a su servidor ni lo almacena en una base de datos. Como en cualquier aplicación web, las extensiones instaladas y el propio dispositivo quedan fuera de nuestro control.
        </p>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/contador-de-palabras">Contador de Palabras y Caracteres</Link></li>
          <li><Link href="/simbolos-copiar">Símbolos para copiar y pegar</Link></li>
          <li><Link href="/generador-contrasenas">Generador de Contraseñas Seguras</Link></li>
        </ul>
      </section>
    </main>
  );
}
