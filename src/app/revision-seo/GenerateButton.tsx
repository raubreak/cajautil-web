'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { forceGenerateArticle } from './actions';
import { useRouter } from 'next/navigation';

export default function GenerateButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (confirm('¿Generar un artículo nuevo sobre una de las utilidades ahora mismo (Ignorando la frecuencia de días)?')) {
      setLoading(true);
      try {
        const result = await forceGenerateArticle();
        if (result.success) {
          alert('¡Artículo generado y guardado correctamente!');
          router.refresh();
        } else {
          alert('Error: ' + (result.error || result.message));
        }
      } catch (e) {
        alert('Error conectando con Gemini.');
      }
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleGenerate} 
      disabled={loading}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all ${
        loading 
          ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white shadow-blue-500/20 cursor-pointer'
      }`}
    >
      {loading ? (
        <><Loader2 className="w-4 h-4 animate-spin" /> Generando IA...</>
      ) : (
        <><Sparkles className="w-4 h-4 text-yellow-300" /> Crear Entrada Ahora</>
      )}
    </button>
  );
}
