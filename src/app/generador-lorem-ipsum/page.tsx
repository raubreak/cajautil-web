"use client";

import React, { useState } from 'react';
import { TextCursorInput, Copy, Check, Minus, Plus, AlignLeft, List, Type } from 'lucide-react';

const LOREM_WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

const EXTRA_WORDS = "ac accumsan adipisicing aliquam amet ante aptent arcu at auctor augue bibendum blandit congue cras curabitur cursus dapibus diam dignissim donec efficitur egestas eleifend elementum erat eros etiam euismod facilisis faucibus felis fermentum finibus fringilla fusce gravida hendrerit iaculis imperdiet integer justo lacinia lacus laoreet lectus leo libero ligula lobortis luctus maecenas massa mattis mauris maximus metus molestie morbi nam nec neque nibh nullam nunc odio orci ornare pellentesque pharetra phasellus placerat porta porttitor posuere praesent pretium primis proin pulvinar purus quam rhoncus risus rutrum sagittis sapien scelerisque semper senectus sociosqu sollicitudin suscipit suspendisse tellus tempus tincidunt tortor tristique turpis ultrices ultricies urna varius vehicula vel vestibulum vitae vivamus viverra volutpat vulputate".split(" ");

const ALL_WORDS = [...LOREM_WORDS, ...EXTRA_WORDS];

function generateWords(count: number): string {
  let words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)]);
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(): string {
  const sentenceCount = 3 + Math.floor(Math.random() * 4);
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    const wordCount = 8 + Math.floor(Math.random() * 12);
    sentences.push(generateWords(wordCount));
  }
  return sentences.join(" ");
}

function generateParagraphs(count: number, startWithClassic: boolean): string {
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    if (i === 0 && startWithClassic) {
      paragraphs.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
    } else {
      paragraphs.push(generateParagraph());
    }
  }
  return paragraphs.join("\n\n");
}

function generateList(count: number): string {
  const items: string[] = [];
  for (let i = 0; i < count; i++) {
    const wordCount = 4 + Math.floor(Math.random() * 8);
    items.push(`• ${generateWords(wordCount)}`);
  }
  return items.join("\n");
}

type Mode = 'paragraphs' | 'words' | 'list';

export default function GeneradorLoremIpsum() {
  const [mode, setMode] = useState<Mode>('paragraphs');
  const [count, setCount] = useState(3);
  const [startClassic, setStartClassic] = useState(true);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState(() => generateParagraphs(3, true));

  const generate = () => {
    if (mode === 'paragraphs') setOutput(generateParagraphs(count, startClassic));
    else if (mode === 'words') setOutput(generateWords(count));
    else setOutput(generateList(count));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modes: { key: Mode; label: string; icon: React.ReactNode; max: number; defaultVal: number }[] = [
    { key: 'paragraphs', label: 'Párrafos', icon: <AlignLeft className="w-4 h-4" />, max: 20, defaultVal: 3 },
    { key: 'words', label: 'Palabras', icon: <Type className="w-4 h-4" />, max: 500, defaultVal: 50 },
    { key: 'list', label: 'Lista', icon: <List className="w-4 h-4" />, max: 30, defaultVal: 8 },
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-violet-100/50 rounded-3xl mb-6 border border-violet-50">
          <TextCursorInput className="w-10 h-10 text-violet-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Generador de <span className="text-violet-600">Lorem Ipsum</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
          Genera texto de relleno para tus diseños, webs o aplicaciones. Configura el formato y la cantidad.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Panel de control */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Formato</h3>
            <div className="grid grid-cols-3 gap-2 mb-8">
              {modes.map(m => (
                <button
                  key={m.key}
                  onClick={() => { setMode(m.key); setCount(m.defaultVal); }}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl font-bold text-xs transition-all ${mode === m.key ? 'bg-violet-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  {m.icon}
                  {m.label}
                </button>
              ))}
            </div>

            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Cantidad</h3>
            <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-3">
              <button onClick={() => setCount(c => Math.max(1, c - 1))} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-500 hover:bg-violet-50 hover:text-violet-600 transition shadow-sm border border-slate-100"><Minus className="w-4 h-4" /></button>
              <span className="text-3xl font-black text-slate-800 tabular-nums">{count}</span>
              <button onClick={() => setCount(c => Math.min(modes.find(m => m.key === mode)!.max, c + 1))} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-500 hover:bg-violet-50 hover:text-violet-600 transition shadow-sm border border-slate-100"><Plus className="w-4 h-4" /></button>
            </div>

            {mode === 'paragraphs' && (
              <label className="flex items-center gap-3 mt-6 cursor-pointer">
                <input type="checkbox" checked={startClassic} onChange={(e) => setStartClassic(e.target.checked)} className="w-5 h-5 rounded text-violet-600 focus:ring-violet-300" />
                <span className="text-sm font-medium text-slate-500">Empezar con "Lorem ipsum..."</span>
              </label>
            )}

            <button onClick={generate} className="w-full mt-8 py-4 bg-violet-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-violet-700 transition shadow-xl active:scale-95">
              Generar
            </button>
          </div>
        </section>

        {/* Área de resultado */}
        <section className="lg:col-span-8 bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resultado</span>
            <button onClick={handleCopy} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400 hover:bg-violet-50 hover:text-violet-600'}`}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? '¡Copiado!' : 'Copiar'}
            </button>
          </div>
          <div className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-mono min-h-[300px] max-h-[500px] overflow-y-auto select-all">
            {output}
          </div>
        </section>
      </div>

      <section className="w-full max-w-4xl prose prose-slate text-slate-600">
        <h2>¿Qué es Lorem Ipsum y por qué se usa?</h2>
        <p><strong>Lorem Ipsum</strong> es un texto de relleno estándar utilizado desde el siglo XVI en la industria tipográfica y la imprenta. Hoy en día, los <strong>diseñadores web, desarrolladores front-end y maquetadores</strong> lo utilizan como texto de prueba para visualizar cómo quedará el diseño final sin distraer la atención del lector con contenido real.</p>
        <p>Nuestro generador te permite elegir entre párrafos, palabras sueltas o listas con viñetas, y ajustar la cantidad exacta que necesites. Todo se genera al instante en tu navegador.</p>
      </section>
    </main>
  );
}
