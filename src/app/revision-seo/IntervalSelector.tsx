'use client';

import { useState } from 'react';
import { Clock, Loader2, Check } from 'lucide-react';
import { setIntervalDaysAction } from './actions';
import { useRouter } from 'next/navigation';

export default function IntervalSelector({ currentInterval }: { currentInterval: number }) {
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(currentInterval);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await setIntervalDaysAction(selectedValue);
      if (result.success) {
        alert('Configuración guardada correctamente');
        router.refresh();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (e) {
      alert('Error de conexión');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-indigo-500" />
        <span className="text-sm font-bold text-slate-700">Frecuencia de Inserción:</span>
      </div>
      
      <div className="flex flex-1 items-center gap-2">
        <select 
          value={selectedValue}
          onChange={(e) => setSelectedValue(parseInt(e.target.value))}
          className="bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 font-semibold"
        >
          <option value={1}>1 Artículo cada 24 horas (Recomendado)</option>
          <option value={2}>1 Artículo cada 2 días</option>
          <option value={3}>1 Artículo cada 3 días</option>
          <option value={7}>1 Artículo a la semana</option>
          <option value={15}>1 Artículo cada 15 días</option>
          <option value={30}>1 Artículo al mes</option>
          <option value={0}>Pausado (No generar automáticamente)</option>
        </select>

        <button 
          onClick={handleSave}
          disabled={loading || selectedValue === currentInterval}
          className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
            selectedValue !== currentInterval && !loading
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
          title="Guardar Configuración"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
