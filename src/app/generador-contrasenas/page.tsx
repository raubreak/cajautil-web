"use client";
import { useState, useEffect } from "react";

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
          Generador de <span className="text-rose-500">Contraseñas</span>
        </h1>
        <p className="text-center text-slate-500 text-sm mb-6">Generadas localmente, nunca enviadas por internet.</p>

        <div className="relative mb-6">
          <div className="w-full bg-slate-100 text-slate-800 p-4 rounded-xl border border-slate-200 font-mono text-xl text-center break-all select-all min-h-[4rem] flex items-center justify-center">
            {password}
          </div>
          <button 
            onClick={copyToClipboard}
            className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold shadow-md transition-colors ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-100 hover:bg-slate-700'}`}
          >
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>

        <div className="space-y-5 mt-8">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-semibold text-slate-700">Longitud: {length}</label>
            </div>
            <input 
              type="range" min="8" max="64" value={length} 
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

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

          <button onClick={generatePassword} className="w-full mt-4 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-lg shadow-sm transition-all active:scale-95">
            Generar Otra
          </button>
        </div>
      </div>
      
      {/* Espacio reservado para AdSense */}
      <div className="w-full max-w-md mt-6 bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm font-medium rounded-xl h-[120px]">
        Publicidad AdSense
      </div>
    </main>
  );
}
