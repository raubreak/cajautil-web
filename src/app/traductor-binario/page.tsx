"use client";

import React, { useState, useEffect } from 'react';
import { Binary, Radio, Key, Hash, Copy, Check, RefreshCcw, ArrowRightLeft } from 'lucide-react';

type Mode = 'binario' | 'morse' | 'hex';

const MORSE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
};

const REVERSE_MORSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);

export default function TraductorTraducciones() {
  const [activeMode, setActiveMode] = useState<Mode>('binario');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [direction, setDirection] = useState<'toCode' | 'fromCode'>('toCode');
  const [copyStatus, setCopyStatus] = useState(false);

  // Conversion Logic
  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    if (direction === 'toCode') {
      if (activeMode === 'binario') {
         setOutputText(inputText.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '));
      } else if (activeMode === 'hex') {
         setOutputText(inputText.split('').map(c => c.charCodeAt(0).toString(16).toUpperCase()).join(' '));
      } else if (activeMode === 'morse') {
         setOutputText(inputText.toUpperCase().split('').map(c => MORSE_MAP[c] || c).join(' '));
      }
    } else {
        // From Code to Text
        try {
            if (activeMode === 'binario') {
                setOutputText(inputText.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join(''));
            } else if (activeMode === 'hex') {
                setOutputText(inputText.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join(''));
            } else if (activeMode === 'morse') {
                setOutputText(inputText.split(' ').map(m => REVERSE_MORSE[m] || m).join('').toLowerCase());
            }
        } catch (e) {
            setOutputText('Entrada no válida para el formato seleccionado.');
        }
    }
  }, [inputText, activeMode, direction]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100/50 rounded-3xl mb-6 border border-blue-50">
          <Binary className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Traductor de <span className="text-blue-600">Códigos</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">Convierte instantáneamente entre Texto normal y Binario, Morse o Hexadecimal.</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Lado Izquierdo: Entrada */}
        <section className="bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 flex flex-col space-y-6">
            
            {/* Tabs de Selección de Modo */}
            <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner">
                <button
                    onClick={() => { setActiveMode('binario'); setInputText(''); }}
                    className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeMode === 'binario' ? 'bg-white text-blue-600 shadow-sm scale-105 z-10' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <Binary className="w-4 h-4" /> Binario
                </button>
                <button
                    onClick={() => { setActiveMode('morse'); setInputText(''); }}
                    className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeMode === 'morse' ? 'bg-white text-orange-600 shadow-sm scale-105 z-10' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <Radio className="w-4 h-4" /> Morse
                </button>
                <button
                    onClick={() => { setActiveMode('hex'); setInputText(''); }}
                    className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeMode === 'hex' ? 'bg-white text-emerald-600 shadow-sm scale-105 z-10' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <Hash className="w-4 h-4" /> Hex
                </button>
            </div>

            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-2">
                    {direction === 'toCode' ? 'Texto a traducir' : `Traducir desde ${activeMode}`}
                </h3>
                <button 
                  onClick={() => setDirection(d => d === 'toCode' ? 'fromCode' : 'toCode')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition text-xs font-bold"
                >
                    <ArrowRightLeft className="w-3 h-3" /> Invertir Dirección
                </button>
            </div>

            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                autoFocus
                className="w-full flex-1 min-h-[250px] p-6 bg-slate-50 border border-slate-100 rounded-[32px] text-xl font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all resize-none shadow-inner"
                placeholder={direction === 'toCode' ? 'Escribe aquí tu texto...' : 'Ej: 01001000 01001111 01001100 01000001'}
            />

            <button 
                onClick={() => setInputText('')}
                className="flex items-center justify-center gap-2 text-slate-300 hover:text-rose-500 transition-colors text-xs font-bold self-end"
            >
                <RefreshCcw className="w-3 h-3" /> Limpiar todo
            </button>
        </section>

        {/* Lado Derecho: Salida / Traducción */}
        <section className="bg-slate-900 rounded-[40px] shadow-2xl p-8 flex flex-col space-y-6 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center justify-between relative z-10">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-2">Resultado traducido</h3>
                {outputText && (
                    <button 
                        onClick={copyToClipboard}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ring-1 ${copyStatus ? 'bg-emerald-500 ring-emerald-400 text-white' : 'bg-white/5 hover:bg-white/10 ring-white/10 text-slate-300'}`}
                    >
                        {copyStatus ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copyStatus ? '¡Copiado!' : 'Copiar Resultado'}
                    </button>
                )}
            </div>

            <div className="flex-1 min-h-[250px] p-8 bg-white/5 border border-white/5 rounded-[32px] font-mono text-lg break-all overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-white/10 relative z-10">
                {outputText || <span className="text-slate-600 block pt-4">El resultado aparecerá aquí automáticamente mientras escribes...</span>}
            </div>

            <div className="p-6 bg-white/5 rounded-[28px] border border-white/5 flex gap-4 items-center relative z-10">
                <div className="p-3 bg-blue-600 rounded-2xl shadow-lg ring-4 ring-blue-600/20">
                    <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">Dato curioso</h4>
                    <p className="text-xs text-slate-400 leading-tight">El código <span className="text-blue-400 font-mono">01001000 01001001</span> significa "HI" en binario internacional.</p>
                </div>
            </div>
        </section>
      </div>

      <section className="w-full max-w-4xl mt-16 prose prose-slate text-slate-600">
          <h2>Mucho más que un Traductor a Binario</h2>
          <p>Nuestra herramienta gratuita agrupa los traductores de códigos más populares de internet en una sola interfaz premium y ligera.</p>
          <ul>
              <li><strong>Traductor Binario a Texto:</strong> Traduce automáticamente el lenguaje de "ceros y unos" a formato legible. Ideal para estudiantes de informática y entusiastas del hardware.</li>
              <li><strong>Convertidor de Código Morse:</strong> Envía mensajes secretos convirtiendo letras en puntos y rayas internacionales. No solo usamos el alfabeto latino, sino también números y caracteres comunes.</li>
              <li><strong>Hexadecimal y Caracteres Especiales:</strong> Convierte tus nicks o nombres a códigos HEX para usar en el desarrollo de aplicaciones o juegos que requieran este formato.</li>
          </ul>
      </section>

    </main>
  );
}
