"use client";

import { useState } from "react";
import { generateToolVariantsAction } from "./actions";
import { Boxes, Sparkles, Loader2 } from "lucide-react";

export default function BulkVariantCreator() {
  const [baseTool, setBaseTool] = useState("calculadora-prestamos");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBulkGenerate = async () => {
    if (!keywords) return;
    setLoading(true);
    setMessage("Generando variantes con IA... Esto puede tardar.");
    
    const res = await generateToolVariantsAction(baseTool, keywords);
    
    if (res.success) {
      setMessage(`✅ ¡Éxito! Se han creado/actualizado ${res.count} variantes SEO.`);
      setKeywords("");
    } else {
      setMessage(`❌ Error: ${res.error}`);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Boxes className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Creador de SEO Programático</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Herramienta Base</label>
          <select 
            value={baseTool}
            onChange={(e) => setBaseTool(e.target.value)}
            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-indigo-400 transition"
          >
            <option value="calculadora-prestamos">Simulador de Préstamos</option>
            {/* Iremos añadiendo más bases aquí según las extraigamos a componentes */}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Keywords (separadas por coma)</label>
          <textarea 
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Ej: coche, reformas, estudios, boda, muebles"
            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-medium text-slate-700 outline-none focus:border-indigo-400 transition min-h-[100px]"
          />
          <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase italic">La IA generará una URL completa y 800 palabras de contenido SEO para cada palabra.</p>
        </div>

        <button
          onClick={handleBulkGenerate}
          disabled={loading || !keywords}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {loading ? "Generando..." : "Generar Variantes Masivamente"}
        </button>

        {message && (
          <div className={`p-4 rounded-xl text-sm font-bold text-center ${message.startsWith('✅') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
