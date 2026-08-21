"use client";

import React, { useState } from 'react';
import { Heart, Star, ArrowRight, Music, Sparkles, Shapes, MousePointer2 } from 'lucide-react';

const SYMBOLS_DATA = [
  {
    category: 'Corazones',
    icon: <Heart className="w-4 h-4" />,
    items: ['❤', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '❣', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '❦', '❧', '☙', '♥', 'ღ', 'დ', '❥']
  },
  {
    category: 'Estrellas',
    icon: <Star className="w-4 h-4" />,
    items: ['⭐', '🌟', '✨', '🌠', '☄', '⭐', '✡', '✴', '✳', '🌌', '🌃', '★', '☆', '✧', '✡', '✦', '✥', '✺', '❂', '✵', '✷', '✸', '✹']
  },
  {
    category: 'Flechas',
    icon: <ArrowRight className="w-4 h-4" />,
    items: ['➔', '➘', '➚', '➛', '➜', '➝', '➞', '➟', '➠', '➡', '➢', '➣', '➤', '➥', '➦', '➧', '➨', '➩', '➪', '➫', '➬', '➭', '➮', '➯', '➱', '➲', '➳', '➴', '➵', '➶', '➷', '➸', '➹', '➺', '➻', '➼', '➽', '➾', '↵', '⇐', '⇑', '⇒', '⇓', '⇔', '⇖', '⇗', '⇘', '⇙']
  },
  {
    category: 'Música & Notas',
    icon: <Music className="w-4 h-4" />,
    items: ['♩', '♪', '♫', '♬', '♭', '♮', '♯', '𝄞', '𝄢', '𝄡', '𝄪', '𝄫', '🎵', '🎶', '📻', '🎸', '🎹', '🎻', '🎙', '🎧']
  },
  {
    category: 'Varios / Nicks',
    icon: <Sparkles className="w-4 h-4" />,
    items: ['⚛', '☸', '❣', '☯', '☮', '✝', '☪', '☸', '☬', '⊕', '⊖', '⊗', '⊘', '⊙', '⊚', '⊛', '⊜', '⊝', '⊞', '⊟', '⊠', '⊡', '⊿', '◬', '◭', '◮', '✂', '✁', '✃', '✄', '✆', '✇', '✈', '✍', '✎', '✏', '✐', '✑', '✒', '✓', '✔', '✕', '✖', '✗', '✘', '✙', '✚', '✛', '✜', '✝']
  },
  {
    category: 'Matemáticos',
    icon: <Shapes className="w-4 h-4" />,
    items: ['∀', '∁', '∂', '∃', '∄', '∅', '∆', '∇', '∈', '∉', '∊', '∋', '∌', '∍', '∎', '∏', '∐', '∑', '−', '∓', '∔', '∕', '∖', '∗', '∘', '∙', '√', '∛', '∜', '∝', '∞', '∟', '∠', '∡', '∢', '∣', '∤', '∥', '∦', '∧', '∨', '∩', '∪', '∫', '∬', '∭', '∮', '∯', '∰', '∱', '∲', '∳', '∴', '∵', '∶', '∷', '∸', '∹', '∺', '∻', '∼', '∽', '∾', '∿', '≀']
  }
];

export default function SimbolosCopiar() {
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  const copyToClipboard = (symbol: string) => {
    navigator.clipboard.writeText(symbol);
    setCopiedSymbol(symbol);
    setTimeout(() => setCopiedSymbol(null), 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-rose-100/50 rounded-3xl mb-6 border border-rose-50">
          <Heart className="w-10 h-10 text-rose-500 fill-rose-500/20" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Símbolos para <span className="text-rose-500">Copiar y Pegar</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
          Haz clic en cualquier símbolo para copiarlo al portapapeles al instante. Personaliza tus nicks, bios y perfiles sociales.
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-12 mb-16">
        {SYMBOLS_DATA.map((group, idx) => (
          <section key={idx} className="bg-white rounded-[40px] shadow-xl shadow-slate-200/40 p-8 border border-slate-100">
             <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                 <div className="p-2.5 bg-slate-50 rounded-xl text-slate-600">
                    {group.icon}
                 </div>
                 <h2 className="text-xl font-black text-slate-800 tracking-tight">{group.category}</h2>
             </div>
             
             <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                 {group.items.map((symbol, sIdx) => (
                    <button
                        key={sIdx}
                        onClick={() => copyToClipboard(symbol)}
                        className={`group relative h-14 rounded-2xl border-2 transition-all flex items-center justify-center text-2xl hover:scale-105 active:scale-95 ${copiedSymbol === symbol ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-white hover:border-rose-400 hover:shadow-md'}`}
                    >
                        {symbol}
                        
                        {/* Tooltip Copiado */}
                        {copiedSymbol === symbol && (
                            <div className="absolute -top-10 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg animate-in fade-in zoom-in slide-in-from-bottom-1 uppercase tracking-widest pointer-events-none">
                                ¡Copiado!
                            </div>
                        )}

                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <MousePointer2 className="w-4 h-4 text-rose-400/50" />
                        </div>
                    </button>
                 ))}
             </div>
          </section>
        ))}
      </div>

      <section className="w-full max-w-4xl prose prose-slate text-slate-600 px-2 lg:px-0">
          <h2>La Colección de Caracteres más Estética de Internet</h2>
          <p>Nuestra biblioteca de **símbolos especiales** es la herramienta favorita de influencers y gamers que buscan destacar en plataformas como Instagram, TikTok, Discord o Free Fire. No son emojis estándar, sino glifos Unicode que funcionan en casi cualquier sistema.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
              <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h4 className="font-black text-rose-500 mb-2 uppercase tracking-wide">Para Bios</h4>
                  <p className="text-xs">Usa nuestros corazones y estrellas para decorar tu biografía de Instagram sin aplicaciones externas.</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h4 className="font-black text-blue-500 mb-2 uppercase tracking-wide">Para Juegos</h4>
                  <p className="text-xs">Crea nicks con símbolos matemáticos y flechas que tus oponentes nunca habrán visto.</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h4 className="font-black text-emerald-500 mb-2 uppercase tracking-wide">Sin Registro</h4>
                  <p className="text-xs">Uso ilimitado y gratuito. Sin anuncios invasivos. Haz clic, copia y disfruta.</p>
              </div>
          </div>
          <p>¿Buscas una flecha específica o un signo musical? Navega por nuestras categorías organizadas para encontrar el **signo Unicode** perfecto en segundos. Recuerda que todos estos símbolos son compatibles con el estándar universal, por lo que se verán bien en la mayoría de dispositivos móviles actuales.</p>
      </section>

    </main>
  );
}
