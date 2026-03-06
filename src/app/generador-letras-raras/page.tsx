"use client";

import React, { useState } from 'react';
import { Type, Sparkles, Copy, CheckCircle, Smartphone, PenTool, Hash } from 'lucide-react';

const diccionarios: Record<string, Record<string, string>> = {
  cursiva: {
    'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
    'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍'
  },
  gotica: {
    'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤', 'h': '𝔥', 'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫', 'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱', 'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷',
    'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ', 'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓', 'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ'
  },
  doble: {
    'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
    'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ'
  },
  circulos: {
    'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
    'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ'
  },
  burbujas_negras: {
    'a': '🅐', 'b': '🅑', 'c': '🅒', 'd': '🅓', 'e': '🅔', 'f': '🅕', 'g': '🅖', 'h': '🅗', 'i': '🅘', 'j': '🅙', 'k': '🅚', 'l': '🅛', 'm': '🅜', 'n': '🅝', 'o': '🅞', 'p': '🅟', 'q': '🅠', 'r': '🅡', 's': '🅢', 't': '🅣', 'u': '🅤', 'v': '🅥', 'w': '🅦', 'x': '🅧', 'y': '🅨', 'z': '🅩',
    'A': '🅐', 'B': '🅑', 'C': '🅒', 'D': '🅓', 'E': '🅔', 'F': '🅕', 'G': '🅖', 'H': '🅗', 'I': '🅘', 'J': '🅙', 'K': '🅚', 'L': '🅛', 'M': '🅜', 'N': '🅝', 'O': '🅞', 'P': '🅟', 'Q': '🅠', 'R': '🅡', 'S': '🅢', 'T': '🅣', 'U': '🅤', 'V': '🅥', 'W': '🅦', 'X': '🅧', 'Y': '🅨', 'Z': '🅩'
  },
  al_reves: {
    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
    'A': '∀', 'B': '𐐒', 'C': 'Ɔ', 'D': '◖', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': '⋊', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z'
  },
  monoespacio: {
    'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣',
    'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉'
  }
};

const convertirTexto = (texto: string, estilo: string) => {
  if (!diccionarios[estilo]) return texto;
  let resultado = '';
  // Convertimos carácter a carácter
  for (let i = 0; i < texto.length; i++) {
    const char = texto[i];
    resultado += diccionarios[estilo][char] || char; // Si no hay map (espacios, números, tildes), lo deja igual
  }
  return estilo === 'al_reves' ? resultado.split('').reverse().join('') : resultado;
};

export default function GeneradorLetras() {
  const [texto, setTexto] = useState<string>('Hola mundo');
  const [copiadoIdx, setCopiadoIdx] = useState<string | null>(null);

  const handleCopy = (res: string, idx: string) => {
    navigator.clipboard.writeText(res);
    setCopiadoIdx(idx);
    setTimeout(() => setCopiadoIdx(null), 2000);
  };

  const estilosDisponibles = [
    { id: 'gotica', nombre: 'Gótica / Antigua' },
    { id: 'cursiva', nombre: 'Cursiva Elegante' },
    { id: 'doble', nombre: 'Doble Trazo (Matemática)' },
    { id: 'circulos', nombre: 'Círculos Claros' },
    { id: 'burbujas_negras', nombre: 'Burbujas Oscuras' },
    { id: 'monoespacio', nombre: 'Máquina de escribir' },
    { id: 'al_reves', nombre: 'Texto Invertido (Al Reves)' },
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4 sm:px-6 z-10">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-purple-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-purple-50">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 fill-purple-600/20" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Generador de <span className="text-purple-600">Letras Raras</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-2">
          Transforma tu escritura en letras góticas, cursivas e infinidad de tipografías <i>Aesthetic</i> ideales para copiar en tus biografías de Instagram, WhatsApp y TikTok.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {/* PANEL IZQUIERDO: INPUT TEXT */}
        <section className="bg-white md:col-span-4 rounded-3xl shadow-xl shadow-slate-200/40 p-1 border border-slate-100 h-fit">
           <textarea
              className="w-full px-5 py-5 rounded-3xl focus:outline-none text-xl sm:text-2xl font-medium transition-all h-32 sm:h-40 resize-none text-slate-800 bg-white placeholder:text-slate-300"
              placeholder={`Escribe algo aquí...`}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
        </section>

        {/* PANEL INFERIOR: RESULTADOS GRID */}
        <section className="md:col-span-4 space-y-4">
          
          {estilosDisponibles.map((estilo) => {
             const resultado = convertirTexto(texto || 'Escribe algo aquí...', estilo.id);
             const isCopied = copiadoIdx === estilo.id;
             
             return (
              <div key={estilo.id} className="w-full bg-white border border-slate-200 rounded-2xl flex items-center justify-between p-2 sm:p-3 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="flex flex-col pl-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{estilo.nombre}</span>
                  <div className="text-lg sm:text-2xl text-slate-800 break-all h-auto py-1">
                    {resultado}
                  </div>
                </div>
                
                <button 
                  onClick={() => handleCopy(resultado, estilo.id)}
                  className={`ml-4 shrink-0 px-4 sm:px-6 py-4 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-2 transition-all shadow-sm ${isCopied ? 'bg-slate-800 text-white' : 'bg-purple-100 hover:bg-purple-200 text-purple-700'}`}
                >
                  {isCopied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  <span className="hidden sm:inline">{isCopied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
             )
          })}
          
        </section>
      </div>

      {/* SEO & CONTENT SECTION */}
      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <Type className="w-6 h-6 text-purple-500" />
          ¿Cómo funcionan las letras y fuentes raras de Instagram?
        </h2>
        
        <p>A pesar de que parezca magia, no estamos "incrustando" fuentes ni imágenes raras en tu teclado. Nuestro Cambia-Letras utiliza algo llamado el <strong>Estándar Internacional Unicode.</strong> </p>

        <p>Unicode es sistema de programación del lenguaje informático de Internet que tiene miles y miles de variables para los lenguajes de todo el mundo. Existen alfabetos matemáticos extintos o de la familia asiática que, combinados, recrean versiones "dobles", "tachadas" o "góticas" de nuestras letras occidentales habituales. Al copiar ese código unicode, plataformas cerradas como TikTok o WhatsApp lo interpretan a la perfección dejándote lucir una <strong>Bio Aesthetic o Gamer</strong> asombrosa en tu perfil.</p>

        <h3 className="text-lg font-bold">100% Cero Lag. Ni Apps ni teclados invasivos.</h3>
        <p>No tienes que descargarte esos incómodos "Teclados de Android o iPhone" que la mayoría de los casos leen todo lo que pulsas secretamente. Esta aplicación funciona solo en tu navegador cliente (Client-side) de forma instantánea.</p>
        
      </section>

      {/* FAQ SECTION */}
      <section className="w-full max-w-4xl px-2 mb-12" aria-label="Preguntas Frecuentes">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">FAQs de Letras Especiales</h2>
        <div className="space-y-4">
          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-purple-600 transition-colors">
              <h3 className="text-base font-bold m-0 pr-4">¿Estas letras funcionan para mi perfil de FreeFire o Twitch?</h3>
              <span className="text-purple-500 text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
              <p>Por supuesto. Tanto los nicks y etiquetas de FreeFire, Call of Duty, Discord, Twitch o League of Legends (además de Insta/Twitter/Facebook) aceptan los caracteres Unicode por lo que el parseo será directo una vez des al botón mágico de "Copiar".</p>
            </div>
          </details>

          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-purple-600 transition-colors">
              <h3 className="text-base font-bold m-0 pr-4">¿Por qué algunas letras no llevan Tilde en las raras?</h3>
              <span className="text-purple-500 text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
              <p>Al forzar los conjuntos (Sets) de números Unicode, las vocales con Acentos o Tildes españolas no suelen tener un equivalente matemático dibujado en esa capa pseudo-gótica, así que el software automáticamente la dejará sola para evitar romper toda la palabra y que en vez de tu nombre se vea un cuadrado blanco raro.</p>
            </div>
          </details>
        </div>
      </section>
      
    </main>
  );
}
