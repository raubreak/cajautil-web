"use client";

import React, { useState, useMemo } from 'react';
import { SpellCheck, ClipboardPaste, Eraser, AlertTriangle, CheckCircle2, Copy, Check } from 'lucide-react';

// Diccionario de errores comunes en español
const COMMON_ERRORS: Record<string, string> = {
  "aver": "a ver / haber",
  "haver": "haber / a ver",
  "ay": "hay / ¡ay!",
  "haya": "haya (verbo haber) / aya (niñera)",
  "haber si": "a ver si",
  "a ver si": "",
  "esque": "es que",
  "nose": "no sé",
  "enserio": "en serio",
  "deveria": "debería",
  "deverias": "deberías",
  "deverian": "deberían",
  "agamos": "hagamos",
  "asia": "hacía / hacia",
  "haci": "así",
  "ahi": "ahí",
  "ai": "ahí / hay",
  "qual": "cual",
  "conque": "con que / conque",
  "porque": "",
  "por que": "",
  "sobretodo": "sobre todo",
  "apropósito": "a propósito",
  "aparte": "",
  "osea": "o sea",
  "ósea": "ósea (del hueso) / o sea",
  "atravez": "a través",
  "atraves": "a través",
  "asta": "hasta",
  "cojer": "coger",
  "cojido": "cogido",
  "vajamos": "vayamos",
  "valla": "vaya / valla (cerca)",
  "balla": "vaya / valla",
  "tubo": "tubo / tuvo (del verbo tener)",
  "tubo que": "tuvo que",
  "hiva": "iba",
  "hivan": "iban",
  "hechar": "echar",
  "hecho": "",
  "echo": "echo (verbo echar) / hecho (participio de hacer)",
  "abrir": "",
  "abierto": "",
  "aber": "haber / a ver",
  "demaciado": "demasiado",
  "inportante": "importante",
  "enpezar": "empezar",
  "enpieza": "empieza",
  "inpresionante": "impresionante",
  "inposible": "imposible",
  "convinacion": "combinación",
  "conbinacion": "combinación",
  "desición": "decisión",
  "desicion": "decisión",
  "exito": "éxito",
  "exámen": "examen",
  "examenes": "exámenes",
  "vehiculo": "vehículo",
  "curriculo": "currículo",
  "tambien": "también",
  "ademas": "además",
  "asi": "así",
  "facil": "fácil",
  "dificil": "difícil",
  "telefono": "teléfono",
  "numero": "número",
  "musica": "música",
  "pagina": "página",
  "rapido": "rápido",
  "ultimo": "último",
  "publico": "público",
  "articulo": "artículo",
  "titulo": "título",
  "codigo": "código",
  "calculo": "cálculo",
  "tecnico": "técnico",
  "practica": "práctica",
  "medico": "médico",
  "unico": "único",
  "clasico": "clásico",
  "historico": "histórico",
  "politico": "político",
  "economico": "económico",
  "logico": "lógico",
  "automatico": "automático",
  "electronico": "electrónico",
  "informacion": "información",
  "comunicacion": "comunicación",
  "educacion": "educación",
  "organizacion": "organización",
  "situacion": "situación",
  "relacion": "relación",
  "operacion": "operación",
  "condicion": "condición",
  "administracion": "administración",
  "evaluacion": "evaluación",
  "atención": "",
  "atencion": "atención",
  "motivacion": "motivación",
  "investigacion": "investigación",
  "aplicacion": "aplicación",
  "presentacion": "presentación",
  "poblacion": "población",
  "produccion": "producción",
  "construccion": "construcción",
  "recomendasion": "recomendación",
  "conclucion": "conclusión",
  "conclusion": "conclusión",
  "proffesional": "profesional",
  "profesional": "",
  "profecional": "profesional",
  "travez": "través",
  "traves": "través",
  "sino": "",
  "si no": "",
  "halla": "halla (encontrar) / haya (verbo haber)",
  "consigo": "",
  "consiguo": "consigo",
};

interface ErrorItem {
  word: string;
  suggestion: string;
  index: number;
  type: 'ortografia' | 'tilde' | 'gramatical';
}

function analyzeText(text: string): ErrorItem[] {
  if (!text.trim()) return [];
  const errors: ErrorItem[] = [];
  const words = text.toLowerCase().split(/\b/);
  
  let charIndex = 0;
  for (const segment of words) {
    const word = segment.trim();
    if (word && COMMON_ERRORS[word] && COMMON_ERRORS[word] !== "") {
      const suggestion = COMMON_ERRORS[word];
      const isAccent = /[áéíóúü]/.test(suggestion) && !/[áéíóúü]/.test(word);
      errors.push({
        word: segment,
        suggestion,
        index: charIndex,
        type: isAccent ? 'tilde' : 'ortografia',
      });
    }
    charIndex += segment.length;
  }

  // Detectar frases problemáticas
  const textLower = text.toLowerCase();
  const phrases: [string, string, 'gramatical'][] = [
    ["haber si", "a ver si", 'gramatical'],
    ["a sido", "ha sido", 'gramatical'],
    ["a tenido", "ha tenido", 'gramatical'],
    ["a hecho", "ha hecho", 'gramatical'],
    ["a llegado", "ha llegado", 'gramatical'],
    ["a pasado", "ha pasado", 'gramatical'],
    ["tubo que", "tuvo que", 'gramatical'],
    ["me a", "me ha", 'gramatical'],
    ["le a", "le ha", 'gramatical'],
  ];

  for (const [wrong, right, type] of phrases) {
    let pos = textLower.indexOf(wrong);
    while (pos !== -1) {
      errors.push({
        word: wrong,
        suggestion: right,
        index: pos,
        type,
      });
      pos = textLower.indexOf(wrong, pos + 1);
    }
  }

  // Remove duplicates by index
  const unique = errors.filter((e, i, arr) => arr.findIndex(x => x.index === e.index) === i);
  return unique.sort((a, b) => a.index - b.index);
}

export default function CorrectorOrtografico() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const errors = useMemo(() => analyzeText(text), [text]);

  const typeLabels = { ortografia: 'Ortografía', tilde: 'Tilde/Acento', gramatical: 'Gramática' };
  const typeColors = { ortografia: 'bg-red-100 text-red-700', tilde: 'bg-amber-100 text-amber-700', gramatical: 'bg-purple-100 text-purple-700' };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-red-100/50 rounded-3xl mb-6 border border-red-50">
          <SpellCheck className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Corrector <span className="text-red-500">Ortográfico</span> Online
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
          Pega tu texto y detectaremos los errores ortográficos, de tildes y gramaticales más comunes del español.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Área de texto */}
        <section className="lg:col-span-7 bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tu texto</label>
            <div className="flex items-center gap-2">
              <button onClick={() => setText('')} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition"><Eraser className="w-4 h-4" /></button>
              <button onClick={handleCopy} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Pega o escribe aquí tu texto para revisarlo al instante..."
            className="w-full flex-1 min-h-[300px] bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-slate-700 text-base leading-relaxed focus:outline-none focus:border-red-200 focus:ring-4 focus:ring-red-50 resize-none font-medium transition"
            spellCheck={false}
          />
          <div className="flex items-center justify-between mt-4 text-xs text-slate-400 font-mono">
            <span>{text.split(/\s+/).filter(Boolean).length} palabras</span>
            <span>{text.length} caracteres</span>
          </div>
        </section>

        {/* Panel de resultados */}
        <section className="lg:col-span-5 space-y-6">
          {/* Score */}
          <div className={`rounded-[32px] p-8 border relative overflow-hidden ${errors.length === 0 && text.length > 5 ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100 shadow-xl'}`}>
            {errors.length === 0 && text.length > 5 ? (
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                <div>
                  <h3 className="text-xl font-black text-emerald-700">¡Sin errores!</h3>
                  <p className="text-sm text-emerald-500 font-medium">Tu texto parece correcto.</p>
                </div>
              </div>
            ) : errors.length > 0 ? (
              <div className="flex items-center gap-4">
                <AlertTriangle className="w-12 h-12 text-amber-500" />
                <div>
                  <h3 className="text-xl font-black text-slate-800">{errors.length} {errors.length === 1 ? 'error' : 'errores'} detectados</h3>
                  <p className="text-sm text-slate-400 font-medium">Revisa las sugerencias de abajo.</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-300 py-4 italic">Introduce texto para empezar a analizar.</div>
            )}
          </div>

          {/* Lista de errores */}
          {errors.length > 0 && (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {errors.map((err, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${typeColors[err.type]}`}>
                      {typeLabels[err.type]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="line-through text-red-400 font-bold">{err.word}</span>
                    <span className="text-slate-300">→</span>
                    <span className="text-emerald-600 font-bold">{err.suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="w-full max-w-4xl prose prose-slate text-slate-600">
        <h2>El corrector de español más rápido de internet</h2>
        <p>Nuestro <strong>corrector ortográfico online</strong> analiza tu texto al instante buscando los errores más comunes del castellano: desde tildes olvidadas hasta confusiones clásicas como "haber/a ver", "tubo/tuvo" o "haya/halla". Perfecto para estudiantes, copywriters en español o cualquier profesional que trabaje con texto.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <h4 className="font-black text-red-500 mb-2">100% Privado</h4>
            <p className="text-xs">Todo el análisis se ejecuta en tu navegador. Tu texto nunca sale de tu dispositivo.</p>
          </div>
          <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <h4 className="font-black text-indigo-500 mb-2">Sin Registro</h4>
            <p className="text-xs">Utiliza el corrector tantas veces como necesites sin crear cuenta ni dar tu email.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
