"use client";

import React, { useState } from 'react';
import { Ghost, Copy, Check, MessageSquareOff, EyeOff, Share2, Sparkles } from 'lucide-react';

export default function TextoInvisible() {
  const [copied, setCopied] = useState(false);
  const invisibleChar = "ㅤ"; // U+3164 HANGUL FILLER

  const copyToClipboard = () => {
    navigator.clipboard.writeText(invisibleChar);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-slate-100 rounded-3xl mb-6 border border-slate-50 shadow-sm group">
          <Ghost className="w-10 h-10 text-slate-400 group-hover:text-indigo-500 transition-colors" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Texto <span className="text-indigo-600">Invisible</span> para Copiar
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
           Copia el carácter de espacio en blanco invisible para enviar mensajes vacíos o crear nicks con espacios transparentes.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        
        {/* PANEL IZQUIERDO: Acción principal */}
        <section className="bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center border-4 border-indigo-100/50 shadow-inner">
                 <EyeOff className="w-10 h-10 text-indigo-400" />
            </div>

            <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-800">Copia el carácter</h3>
                <p className="text-sm text-slate-400 font-medium px-4">Haz clic en el botón de abajo para copiar al portapapeles el carácter <span className="text-indigo-500 font-bold underline decoration-dotted">U+3164</span>.</p>
            </div>

            <button
                onClick={copyToClipboard}
                className={`w-full py-5 rounded-2xl text-lg font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden ${copied ? 'bg-emerald-500 text-white animate-pulse' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/20'}`}
            >
                {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                {copied ? '¡Carácter Copiado!' : 'Copiar Texto Invisible'}
                
                {copied && (
                    <div className="absolute inset-0 bg-white/10 animate-ping pointer-events-none"></div>
                )}
            </button>

            <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-mono text-slate-400 select-all">
                Codificación Unicode: U+3164
            </div>
        </section>

        {/* PANEL DERECHO: Usos y SEO */}
        <section className="space-y-6">
            <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group">
                <div className="absolute -bottom-8 -right-8 p-10 text-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MessageSquareOff className="w-32 h-32" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-indigo-400" /> Usos Populares
                </h3>
                <ul className="space-y-4 relative z-10">
                    <li className="flex items-start gap-3">
                         <div className="w-5 h-5 bg-indigo-500 rounded-full flex shrink-0 items-center justify-center text-[10px] font-black mt-0.5">1</div>
                         <p className="text-sm text-slate-300 font-medium leading-tight">Enviar mensajes vacíos por WhatsApp o Telegram.</p>
                    </li>
                    <li className="flex items-start gap-3">
                         <div className="w-5 h-5 bg-indigo-500 rounded-full flex shrink-0 items-center justify-center text-[10px] font-black mt-0.5">2</div>
                         <p className="text-sm text-slate-300 font-medium leading-tight">Crea nicks o nombres de perfil sin texto en juegos.</p>
                    </li>
                    <li className="flex items-start gap-3">
                         <div className="w-5 h-5 bg-indigo-500 rounded-full flex shrink-0 items-center justify-center text-[10px] font-black mt-0.5">3</div>
                         <p className="text-sm text-slate-300 font-medium leading-tight">Formato limpio para pies de foto en Instagram.</p>
                    </li>
                </ul>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl flex gap-6 items-center">
                 <div className="p-4 bg-indigo-50 rounded-2xl">
                    <Sparkles className="w-8 h-8 text-indigo-600" />
                 </div>
                 <div>
                    <h3 className="font-black text-slate-800 uppercase tracking-tight">¿Sabías que...?</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">El carácter U+3164 proviene del Hangul coreano y es el único signo Unicode realmente invisible que no se recorta automáticamente.</p>
                 </div>
            </div>
        </section>
      </div>

      <section className="w-full max-w-4xl prose prose-slate text-slate-600 px-2">
          <h2>¿Cómo funciona el Texto Invisible?</h2>
          <p>No es magia, es programación. En internet, lo que conocemos como **"espacio vacío"** suele ser ignorado por las aplicaciones si se introduce solo. Sin embargo, el estándar Unicode alberga caracteres como el **U+3164 (Hangul Filler)**, que los programas interpretan como una letra física pero de apariencia completamente transparente e invisible.</p>
          
          <h3>Ventajas de usar U+3164 en lugar de un espacio común</h3>
          <ul>
              <li><strong>Compatibilidad Total:</strong> Funciona en WhatsApp, Instagram Stories, TikTok, Twitter y juegos como Free Fire o Among Us.</li>
              <li><strong>Omisión de Filtros:</strong> Permite saltar validaciones que no permiten dejar campos vacíos en formularios.</li>
              <li><strong>Formato Estético:</strong> Ideal para separar bloques de texto o biografías sin usar caracteres de puntuación visibles.</li>
          </ul>

          <p>Utilizar nuestro **generador de texto invisible** es la forma más rápida y segura de obtener este carácter especial sin tener que recordar códigos complejos o usar combinaciones de teclado complicadas. Solo haz clic en el botón, ¡y listo para pegar!</p>
      </section>

    </main>
  );
}
