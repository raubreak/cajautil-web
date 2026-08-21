"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { KeyRound, Plus } from "lucide-react";

export default function GeneradorContrasenas() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const secureRandomIndex = (max: number) => {
    const values = new Uint32Array(1);
    const limit = 2 ** 32 - ((2 ** 32) % max);

    do {
      window.crypto.getRandomValues(values);
    } while (values[0] >= limit);

    return values[0] % max;
  };

  const generatePassword = () => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = "0123456789";
    const sym = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    const selectedSets = [lower];
    if (includeUppercase) selectedSets.push(upper);
    if (includeNumbers) selectedSets.push(num);
    if (includeSymbols) selectedSets.push(sym);

    const chars = selectedSets.join('');
    const passwordChars = selectedSets.map((set) => set[secureRandomIndex(set.length)]);

    while (passwordChars.length < length) {
      passwordChars.push(chars[secureRandomIndex(chars.length)]);
    }

    for (let index = passwordChars.length - 1; index > 0; index--) {
      const randomIndex = secureRandomIndex(index + 1);
      [passwordChars[index], passwordChars[randomIndex]] = [passwordChars[randomIndex], passwordChars[index]];
    }

    setPassword(passwordChars.join(''));
    setCopyStatus("idle");
  };

  useEffect(() => {
    generatePassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  const copyToClipboard = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(password);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-rose-100/50 rounded-3xl mb-6 border border-rose-50 shadow-sm">
          <KeyRound className="w-10 h-10 text-rose-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Generador de <span className="text-rose-600">Contraseñas</span> Seguras
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          Se generan localmente: el código no las envía a servidores ni las almacena de forma persistente.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl p-8 sm:p-12 border border-slate-100 flex flex-col gap-8 mb-12">
        <div className="relative">
          <div 
            className="w-full bg-slate-50 text-slate-800 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 font-mono text-xl sm:text-2xl text-center break-all select-all min-h-[7rem] flex items-center justify-center transition-all hover:border-slate-300" 
            role="status" 
            aria-live="polite" 
            aria-label="Contraseña generada"
          >
            {password}
          </div>
          <button 
            onClick={copyToClipboard}
            className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all ${
              copyStatus === "copied"
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white translate-y-0 scale-105' 
                : 'bg-slate-800 hover:bg-slate-700 text-white hover:-translate-y-1'
            }`}
            aria-label={copyStatus === "copied" ? 'Contraseña copiada' : 'Copiar contraseña al portapapeles'}
          >
            {copyStatus === "copied" ? '¡Copiado!' : 'Copiar Contraseña'}
          </button>
        </div>

        <p
          className={copyStatus === "error" ? "text-center text-sm font-semibold text-red-700" : "sr-only"}
          role="status"
          aria-live="polite"
        >
          {copyStatus === "copied" && "Contraseña copiada al portapapeles."}
          {copyStatus === "error" && "No se pudo copiar. Selecciona la contraseña y cópiala manualmente."}
        </p>

        <div className="space-y-8 mt-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="longitud-slider" className="text-sm font-bold text-slate-700">Longitud de la Contraseña</label>
              <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-lg text-sm font-bold">{length}</span>
            </div>
            <input 
              id="longitud-slider"
              type="range" min="8" max="64" value={length} 
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
              aria-label={`Longitud de la contraseña: ${length} caracteres`}
            />
          </div>

          <fieldset className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <legend className="sr-only">Opciones de contraseña</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center justify-between sm:justify-start space-x-3 cursor-pointer p-4 sm:p-0 bg-white sm:bg-transparent rounded-xl sm:rounded-none border sm:border-transparent border-slate-200 shadow-sm sm:shadow-none hover:border-rose-200 transition-colors">
                <span className="text-slate-700 font-bold select-none text-sm">Mayúsculas (A-Z)</span>
                <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} className="w-6 h-6 rounded-md text-rose-500 bg-slate-100 border-slate-300 focus:ring-rose-500" />
              </label>
              <label className="flex items-center justify-between sm:justify-start space-x-3 cursor-pointer p-4 sm:p-0 bg-white sm:bg-transparent rounded-xl sm:rounded-none border sm:border-transparent border-slate-200 shadow-sm sm:shadow-none hover:border-rose-200 transition-colors">
                <span className="text-slate-700 font-bold select-none text-sm">Números (0-9)</span>
                <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} className="w-6 h-6 rounded-md text-rose-500 bg-slate-100 border-slate-300 focus:ring-rose-500" />
              </label>
              <label className="flex items-center justify-between sm:justify-start space-x-3 cursor-pointer p-4 sm:p-0 bg-white sm:bg-transparent rounded-xl sm:rounded-none border sm:border-transparent border-slate-200 shadow-sm sm:shadow-none hover:border-rose-200 transition-colors">
                <span className="text-slate-700 font-bold select-none text-sm">Símbolos (@#...)</span>
                <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} className="w-6 h-6 rounded-md text-rose-500 bg-slate-100 border-slate-300 focus:ring-rose-500" />
              </label>
            </div>
          </fieldset>

          <button onClick={generatePassword} className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
            Generar Nueva Aleatoria
          </button>
        </div>
      </div>
      
      {/* Contenido SEO */}
      <section className="w-full max-w-3xl prose prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-800 px-4 text-slate-600 prose-a:text-rose-600">
        <h2>¿Cómo crear una contraseña segura?</h2>
        <p>
          Una contraseña resistente debe ser <strong>larga, única y aleatoria</strong>. Como referencia práctica, usa 16 caracteres o más cuando el servicio lo permita y evita palabras del diccionario, fechas o información personal.
        </p>
        <p>
          Nuestro <strong>generador de contraseñas</strong> crea claves aleatorias directamente en tu navegador usando la <code>Crypto API</code> del dispositivo.
          Esto ayuda a generar resultados más robustos que una aleatoriedad básica basada en <code>Math.random()</code>. Cada grupo de caracteres seleccionado aparece al menos una vez en el resultado.
        </p>
        <p>
          Consulta la guía sobre <Link href="/articulos/por-que-las-contrasenas-largas-suelen-ser-mejores-que-las-complejas">por qué la longitud, la aleatoriedad y la unicidad importan más que una complejidad aparente</Link>. Incluye los cálculos, los límites de la estimación y un protocolo para actuar ante filtraciones.
        </p>

        <h2>Consejos para usar bien una contraseña segura</h2>
        <ul>
          <li><strong>Usa una diferente para cada servicio</strong> importante.</li>
          <li><strong>Activa 2FA</strong> siempre que la plataforma lo permita.</li>
          <li><strong>Guarda la clave</strong> en un gestor de contraseñas fiable en lugar de reutilizarla.</li>
        </ul>

        <h2>Preguntas frecuentes</h2>
        <details className="group open:bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 focus:outline-none [&::-webkit-details-marker]:hidden">
            <span>¿Las contraseñas generadas se guardan en algún servidor?</span>
            <Plus className="h-5 w-5 shrink-0 text-cyan-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0 text-slate-600">La función genera la contraseña en tu navegador y no realiza una petición para enviarla ni la guarda en CajaUtil. Al copiarla sí pasa al portapapeles; una extensión maliciosa o un dispositivo comprometido quedan fuera del control de la página.</p>
        </details>
        <details className="group open:bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 focus:outline-none [&::-webkit-details-marker]:hidden">
            <span>¿Cuántos caracteres debe tener una contraseña segura?</span>
            <Plus className="h-5 w-5 shrink-0 text-cyan-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0 text-slate-600">No existe una longitud universal para todos los servicios. Una clave aleatoria de 16 caracteres o más ofrece un margen práctico sólido; para frases de contraseña, prioriza todavía más longitud, además de unicidad y almacenamiento en un gestor fiable.</p>
        </details>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/generador-qr">Generador de QR</Link></li>
          <li><Link href="/contador-de-palabras">Contador de palabras</Link></li>
          <li><Link href="/mayusculas-minusculas">Conversor Mayúsculas y Minúsculas</Link></li>
        </ul>
      </section>
    </main>
  );
}
