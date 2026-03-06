'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteArticleAction } from './actions';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que quieres eliminar este artículo? Esta acción no se puede deshacer.')) {
      setLoading(true);
      try {
        const result = await deleteArticleAction(id);
        if (result.success) {
          router.refresh();
        } else {
          alert('Error: ' + result.error);
        }
      } catch (e) {
        alert('Error conectando con el servidor.');
      }
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
        loading 
          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
          : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'
      }`}
      title="Eliminar Artículo"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
