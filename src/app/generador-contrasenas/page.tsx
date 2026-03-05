"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function GeneradorContrasenas() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num = "0123456789";
    let sym = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let chars = lower;
    if (includeUppercase) chars += upper;
    if (includeNumbers) chars += num;
    if (includeSymbols) chars += sym;
    
    let pass = "";
    for (let i = 0; i < length; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if(navigator.clipboard) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-slate-50 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-md bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 text-center">
          Generador de <span className="text-rose-500">Contraseñas</span> Seguras
        </h1>
        <p className="text-center text-slate-500 text-sm mb-6">Generadas localmente en tu navegador, nunca enviadas por internet.</p>

        <div className="relative mb-6">
          <div className="w-full bg-slate-100 text-slate-800 p-4 rounded-xl border border-slate-200 font-mono text-xl text-center break-all select-all min-h-[4rem] flex items-center justify-center" role="status" aria-live="polite" aria-label="Contraseña generada">
            {password}
          </div>
          <button 
            onClick={copyToClipboard}
            className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold shadow-md transition-colors ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-100 hover:bg-slate-700'}`}
            aria-label={copied ? 'Contraseña copiada' : 'Copiar contraseña al portapapeles'}
          >
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>

        <div className="space-y-5 mt-8">
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="longitud-slider" className="text-sm font-semibold text-slate-700">Longitud: {length}</label>
            </div>
            <input 
              id="longitud-slider"
              type="range" min="8" max="64" value={length} 
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
              aria-label={`Longitud de la contraseña: ${length} caracteres`}
            />
          </div>

          <fieldset>
            <legend className="sr-only">Opciones de contraseña</legend>
            <div className="flex flex-col gap-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} className="w-5 h-5 rounded text-rose-500 bg-slate-100 border-slate-300 focus:ring-rose-500" />
                <span className="text-slate-700 font-medium select-none">Mayúsculas (A-Z)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} className="w-5 h-5 rounded text-rose-500 bg-slate-100 border-slate-300 focus:ring-rose-500" />
                <span className="text-slate-700 font-medium select-none">Números (0-9)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} className="w-5 h-5 rounded text-rose-500 bg-slate-100 border-slate-300 focus:ring-rose-500" />
                <span className="text-slate-700 font-medium select-none">Símbolos (@%#...)</span>
              </label>
            </div>
          </fieldset>

          <button onClick={generatePassword} className="w-full mt-4 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-lg shadow-sm transition-all active:scale-95">
            Generar Otra
          </button>
        </div>
      </div>
      
      {/* AdSense */}
      <div className="w-full max-w-md mt-6 bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm font-medium rounded-xl h-[120px]">
        Publicidad AdSense
      </div>

      {/* Contenido SEO */}
      <article className="w-full max-w-md mt-6 bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">¿Cómo crear una contraseña segura?</h2>
        <div className="text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            Una <strong>contraseña segura</strong> debe tener al menos <strong>12 caracteres</strong>, incluir 
            <strong>mayúsculas, minúsculas, números y símbolos</strong>. Evita usar palabras del diccionario, 
            fechas de nacimiento o información personal.
          </p>
          <p>
            Nuestro <strong>generador de contraseñas</strong> crea claves totalmente aleatorias 
            directamente en tu navegador. <strong>La contraseña nunca se envía por internet</strong>, 
            garantizando tu privacidad total.
          </p>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">Preguntas frecuentes</h2>
        <div className="space-y-3">
          <details className="border border-slate-100 rounded-xl overflow-hidden">
            <summary className="p-4 cursor-pointer font-semibold text-slate-700 hover:text-blue-600 text-sm">¿Las contraseñas generadas se guardan en algún servidor?</summary>
            <p className="px-4 pb-4 text-slate-600 text-sm">No. Las contraseñas se generan 100% en tu navegador usando JavaScript. Nunca se envían, almacenan ni registran en ningún servidor.</p>
          </details>
          <details className="border border-slate-100 rounded-xl overflow-hidden">
            <summary className="p-4 cursor-pointer font-semibold text-slate-700 hover:text-blue-600 text-sm">¿Cuántos caracteres debe tener una contraseña segura?</summary>
            <p className="px-4 pb-4 text-slate-600 text-sm">Los expertos en seguridad recomiendan un mínimo de 12-16 caracteres. Cuanto más larga, más difícil de descifrar por fuerza bruta.</p>
          </details>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Herramientas relacionadas</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/generador-qr" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Generador de QR
            </Link>
            <Link href="/mayusculas-minusculas" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Conversor Mayúsculas
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
