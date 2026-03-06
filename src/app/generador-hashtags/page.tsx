"use client";

import React, { useState } from 'react';
import { Hash, Copy, Check, Instagram, Sparkles, Shuffle, X } from 'lucide-react';

// Base de hashtags por categoría temática
const HASHTAG_DB: Record<string, string[]> = {
  // General / Virales
  _viral: ["viral", "trending", "fyp", "foryou", "explore", "instagood", "instamoment", "follow", "likes", "reels", "contenido", "community"],
  // Fitness
  fitness: ["fitness", "gym", "workout", "fitnessmotivation", "gymlife", "healthylifestyle", "training", "muscle", "fitfam", "bodybuilding", "cardio", "crossfit", "fitnessaddict", "personaltrainer", "fitlife", "stronger", "gains", "exercise", "healthyfood", "protein"],
  deporte: ["deporte", "entrenamiento", "vida_sana", "correr", "running", "ciclismo", "yoga", "pilates", "nutricion", "salud", "bienestar"],
  // Comida
  comida: ["foodie", "instafood", "foodporn", "cooking", "receta", "cocina", "healthyfood", "homemade", "chef", "delicious", "foodlover", "foodstagram", "gastronomia", "restaurant", "comidasana", "brunch", "desayuno", "cena"],
  // Viajes
  viajes: ["travel", "travelgram", "wanderlust", "instatravel", "travelphotography", "adventure", "explore", "nature", "vacation", "trip", "traveltheworld", "viajar", "turismo", "backpacking", "roadtrip", "playa", "montaña"],
  // Moda
  moda: ["fashion", "style", "ootd", "fashionblogger", "streetstyle", "outfit", "trendy", "lookoftheday", "fashionista", "clothing", "instafashion", "shopping", "ropa", "tendencias", "estilo", "beauty", "accessories"],
  // Fotografía
  fotografia: ["photography", "photo", "photooftheday", "photographer", "naturephotography", "portrait", "landscape", "streetphotography", "canon", "nikon", "shotoniphone", "goldenhour", "sunset", "fotografia", "foto"],
  // Tech
  tecnologia: ["tech", "technology", "programming", "coding", "developer", "webdev", "javascript", "python", "ai", "startup", "innovation", "software", "app", "digital", "gadgets"],
  // Marketing
  marketing: ["marketing", "digitalmarketing", "socialmedia", "branding", "business", "entrepreneur", "seo", "contentmarketing", "marketingdigital", "strategy", "growth", "ecommerce", "emprendimiento", "negocio", "ventas"],
  // Arte
  arte: ["art", "artist", "artwork", "drawing", "painting", "illustration", "digitalart", "creative", "design", "artoftheday", "sketch", "instaart", "arte", "diseño", "creatividad"],
  // Música
  musica: ["music", "musician", "dj", "hiphop", "pop", "rock", "singer", "producer", "beats", "newmusic", "song", "musica", "spotify", "playlist", "livemusic"],
  // Mascotas
  mascotas: ["dog", "cat", "pet", "puppy", "kitten", "dogsofinstagram", "catsofinstagram", "petstagram", "cute", "animals", "perro", "gato", "mascota", "adorable"],
  // Emprendimiento
  emprendimiento: ["emprendedor", "emprendimiento", "negocio", "startup", "motivacion", "exito", "liderazgo", "mindset", "hustle", "business", "entrepreneur", "money", "invest", "finanzas"],
};

function generateHashtags(keyword: string): string[] {
  const kw = keyword.toLowerCase().trim().replace(/\s+/g, '');
  if (!kw) return [];

  const result = new Set<string>();
  
  // 1. Direct keyword as hashtag
  result.add(kw);

  // 2. Find matching categories
  for (const [cat, tags] of Object.entries(HASHTAG_DB)) {
    if (cat === '_viral') continue;
    const allWords = [cat, ...tags];
    const matches = allWords.some(w => w.includes(kw) || kw.includes(w));
    if (matches) {
      tags.forEach(t => result.add(t));
    }
  }

  // 3. Variations with keyword
  const variations = [
    `${kw}life`, `${kw}lovers`, `${kw}gram`, `${kw}daily`,
    `${kw}community`, `${kw}tips`, `${kw}blog`, `${kw}addict`,
    `insta${kw}`, `${kw}goals`, `${kw}vibes`, `best${kw}`,
    `${kw}oftheday`, `${kw}lover`, `${kw}world`,
  ];
  variations.forEach(v => result.add(v));

  // 4. Viral/general hashtags
  HASHTAG_DB._viral.forEach(t => result.add(t));

  return Array.from(result).slice(0, 30);
}

export default function GeneradorHashtags() {
  const [keyword, setKeyword] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const tags = generateHashtags(keyword);
    setHashtags(tags);
    setSelected(new Set(tags));
  };

  const toggleTag = (tag: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag); else next.add(tag);
      return next;
    });
  };

  const copySelected = () => {
    const text = Array.from(selected).map(t => `#${t}`).join(' ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shuffle = () => {
    setHashtags(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-pink-100/50 rounded-3xl mb-6 border border-pink-50">
          <Hash className="w-10 h-10 text-pink-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Generador de <span className="text-pink-500">Hashtags</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
          Introduce una palabra clave y genera los mejores hashtags para Instagram, TikTok y Twitter al instante.
        </p>
      </div>

      <div className="w-full max-w-4xl">
        {/* Search bar */}
        <div className="bg-white rounded-[32px] shadow-2xl p-6 border border-slate-100 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="Ej: fitness, comida, viajes, marketing..."
              className="w-full pl-12 pr-4 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg font-bold text-slate-700 focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-50"
            />
          </div>
          <button
            onClick={handleGenerate}
            className="px-10 py-5 bg-pink-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-pink-600 transition shadow-xl active:scale-95 flex items-center gap-2 justify-center whitespace-nowrap"
          >
            <Sparkles className="w-5 h-5" /> Generar
          </button>
        </div>

        {/* Results */}
        {hashtags.length > 0 && (
          <div className="bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selected.size} seleccionados</span>
                <button onClick={shuffle} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-pink-500 hover:bg-pink-50 transition" title="Reordenar"><Shuffle className="w-4 h-4" /></button>
              </div>
              <button
                onClick={copySelected}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-pink-500 text-white hover:bg-pink-600'}`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '¡Copiados!' : 'Copiar Todos'}
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {hashtags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${selected.has(tag) ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-pink-200'}`}
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* Preview */}
            <div className="mt-8 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Vista previa para copiar</p>
              <p className="text-sm text-slate-600 leading-relaxed break-all select-all">
                {Array.from(selected).map(t => `#${t}`).join(' ')}
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="w-full max-w-4xl mt-16 prose prose-slate text-slate-600">
        <h2>La importancia de los Hashtags en Redes Sociales</h2>
        <p>Los <strong>hashtags</strong> son el motor de descubrimiento en plataformas como <strong>Instagram, TikTok y Twitter</strong>. Usar los hashtags correctos puede multiplicar el alcance de tus publicaciones exponencialmente. Nuestro generador analiza tu temática y crea una selección personalizada de hashtags que combinan términos populares con variaciones específicas de nicho.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <h4 className="font-black text-pink-500 mb-2">Instagram</h4>
            <p className="text-xs">Puedes usar hasta 30 hashtags por post. Mezcla populares con específicos para maximizar alcance.</p>
          </div>
          <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <h4 className="font-black text-slate-800 mb-2">TikTok</h4>
            <p className="text-xs">Los hashtags en TikTok conducen directamente al For You Page (FYP). Usa 3-5 relevantes por vídeo.</p>
          </div>
          <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <h4 className="font-black text-blue-500 mb-2">Twitter/X</h4>
            <p className="text-xs">1-2 hashtags por tweet es lo óptimo. Más de eso puede parecer spam y reducir el engagement.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
