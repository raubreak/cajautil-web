"use client";

import React, { useEffect, useRef, useState } from 'react';
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
    items: ['⭐', '🌟', '✨', '🌠', '☄', '✡', '✴', '✳', '🌌', '🌃', '★', '☆', '✧', '✦', '✥', '✺', '❂', '✵', '✷', '✸', '✹']
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
    items: ['⚛', '☸', '☯', '☮', '✝', '☪', '☬', '⊕', '⊖', '⊗', '⊘', '⊙', '⊚', '⊛', '⊜', '⊝', '⊞', '⊟', '⊠', '⊡', '⊿', '◬', '◭', '◮', '✂', '✁', '✃', '✄', '✆', '✇', '✈', '✍', '✎', '✏', '✐', '✑', '✒', '✓', '✔', '✕', '✖', '✗', '✘', '✙', '✚', '✛', '✜']
  },
  {
    category: 'Matemáticos',
    icon: <Shapes className="w-4 h-4" />,
    items: ['∀', '∁', '∂', '∃', '∄', '∅', '∆', '∇', '∈', '∉', '∊', '∋', '∌', '∍', '∎', '∏', '∐', '∑', '−', '∓', '∔', '∕', '∖', '∗', '∘', '∙', '√', '∛', '∜', '∝', '∞', '∟', '∠', '∡', '∢', '∣', '∤', '∥', '∦', '∧', '∨', '∩', '∪', '∫', '∬', '∭', '∮', '∯', '∰', '∱', '∲', '∳', '∴', '∵', '∶', '∷', '∸', '∹', '∺', '∻', '∼', '∽', '∾', '∿', '≀']
  }
];

export default function SimbolosCopiar() {
  const [copiedItem, setCopiedItem] = useState<{ id: string; symbol: string } | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
  }, []);

  const copyToClipboard = async (symbol: string, id: string) => {
    setCopyError(null);
    let copied = false;

    try {
      if (!navigator.clipboard) throw new Error('Clipboard API no disponible');
      await navigator.clipboard.writeText(symbol);
      copied = true;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = symbol;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();

      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      } finally {
        textarea.remove();
      }
    }

    if (!copied) {
      setCopiedItem(null);
      setCopyError(symbol);
      return;
    }

    setCopiedItem({ id, symbol });
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopiedItem(null), 1500);
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
                  {group.items.map((symbol, sIdx) => {
                    const itemId = `${group.category}-${sIdx}`;

                    return (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => copyToClipboard(symbol, itemId)}
                        aria-label={`Copiar símbolo ${symbol} de ${group.category}`}
                        className={`group relative h-14 rounded-2xl border-2 transition-all flex items-center justify-center text-2xl hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-200 ${copiedItem?.id === itemId ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-white hover:border-rose-400 hover:shadow-md'}`}
                      >
                        {symbol}
                        
                        {/* Tooltip Copiado */}
                        {copiedItem?.id === itemId && (
                          <div className="absolute -top-10 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg animate-in fade-in zoom-in slide-in-from-bottom-1 uppercase tracking-widest pointer-events-none">
                            ¡Copiado!
                          </div>
                        )}

                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <MousePointer2 className="w-4 h-4 text-rose-400/50" />
                        </div>
                      </button>
                    );
                  })}
              </div>
          </section>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {copiedItem ? `Símbolo ${copiedItem.symbol} copiado al portapapeles.` : ''}
      </p>
      {copyError && (
        <p className="w-full max-w-4xl rounded-2xl border border-rose-200 bg-rose-50 p-4 text-center text-sm font-semibold text-rose-800" role="alert">
          No se pudo copiar automáticamente. Selecciona y copia este símbolo: <code className="select-all rounded bg-white px-2 py-1 text-lg">{copyError}</code>
        </p>
      )}

      <section className="w-full max-w-4xl prose prose-slate text-slate-600 px-2 lg:px-0">
          <h2>Más de 200 símbolos Unicode organizados por categorías</h2>
          <p>Nuestra biblioteca de <strong>símbolos especiales</strong> reúne corazones, estrellas, flechas, notas musicales y signos matemáticos para perfiles, listas y mensajes. Son caracteres Unicode, y su aspecto puede variar según la fuente, la aplicación y el dispositivo.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
              <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h3 className="font-black text-rose-500 mb-2 uppercase tracking-wide">Para bios</h3>
                  <p className="text-xs">Usa nuestros corazones y estrellas para decorar tu biografía de Instagram sin aplicaciones externas.</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h3 className="font-black text-blue-500 mb-2 uppercase tracking-wide">Para juegos</h3>
                  <p className="text-xs">Crea nicks con símbolos matemáticos y flechas que tus oponentes nunca habrán visto.</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h3 className="font-black text-emerald-700 mb-2 uppercase tracking-wide">Sin registro</h3>
                  <p className="text-xs">Uso ilimitado y gratuito. Sin anuncios invasivos. Haz clic, copia y disfruta.</p>
              </div>
          </div>
          <p>¿Buscas una flecha específica o un signo musical? Navega por las categorías para encontrar el <strong>signo Unicode</strong> adecuado y prueba siempre el resultado en la aplicación donde vayas a publicarlo.</p>
      </section>

    </main>
  );
}
