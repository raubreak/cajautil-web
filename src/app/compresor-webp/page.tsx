"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Image as ImageIcon, UploadCloud, Settings, Download, Trash2, ArrowRightCircle, Shield, CheckCircle2, X } from 'lucide-react';

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  resultBlob: Blob | null;
  resultUrl: string | null;
  status: 'pending' | 'processing' | 'done';
}

const formatBytes = (bytes: number, decimals = 1) => {
  if (!+bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

export default function CompresorWebP() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const newImages: ImageItem[] = [];
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        newImages.push({
          id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
          file,
          previewUrl: URL.createObjectURL(file),
          resultBlob: null,
          resultUrl: null,
          status: 'pending',
        });
      }
    });
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const item = prev.find(i => i.id === id);
      if (item) {
        URL.revokeObjectURL(item.previewUrl);
        if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach(i => {
      URL.revokeObjectURL(i.previewUrl);
      if (i.resultUrl) URL.revokeObjectURL(i.resultUrl);
    });
    setImages([]);
  };

  const compressOne = (item: ImageItem): Promise<ImageItem> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) { resolve({ ...item, status: 'done' }); return; }
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve({ ...item, status: 'done' }); return; }

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                ...item,
                resultBlob: blob,
                resultUrl: URL.createObjectURL(blob),
                status: 'done',
              });
            } else {
              resolve({ ...item, status: 'done' });
            }
          },
          'image/webp',
          quality / 100
        );
      };
      img.onerror = () => resolve({ ...item, status: 'done' });
      img.src = item.previewUrl;
    });
  };

  const compressAll = async () => {
    setIsProcessing(true);
    const pending = images.filter(i => i.status === 'pending');

    for (const item of pending) {
      setImages(prev => prev.map(i => i.id === item.id ? { ...i, status: 'processing' } : i));
      const result = await compressOne(item);
      setImages(prev => prev.map(i => i.id === item.id ? result : i));
    }
    setIsProcessing(false);
  };

  const downloadAll = () => {
    images.forEach((item, idx) => {
      if (item.resultUrl) {
        const a = document.createElement('a');
        a.href = item.resultUrl;
        const name = item.file.name.replace(/\.[^.]+$/, '');
        a.download = `${name}_webp_q${quality}.webp`;
        a.click();
      }
    });
  };

  const totalOriginal = images.reduce((s, i) => s + i.file.size, 0);
  const totalCompressed = images.reduce((s, i) => s + (i.resultBlob?.size ?? 0), 0);
  const allDone = images.length > 0 && images.every(i => i.status === 'done');
  const hasPending = images.some(i => i.status === 'pending');
  const savedPercent = totalOriginal > 0 && totalCompressed > 0 ? Math.round((1 - totalCompressed / totalOriginal) * 100) : 0;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4 sm:px-6 z-10">

      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-sky-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-sky-50">
          <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-sky-600 fill-sky-600/20" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Convertir a <span className="text-sky-600">WebP</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-2">
          Comprime una o varias imágenes a la vez. Arrastra tus fotos y descárgalas en WebP con un solo clic.
        </p>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center mb-12">
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 sm:p-8 border border-slate-100 w-full">

          {/* Upload area — siempre visible */}
          <label
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border-2 border-dashed bg-sky-50 hover:bg-sky-100/50 transition-colors w-full rounded-2xl flex flex-col items-center justify-center cursor-pointer group ${images.length > 0 ? 'h-[120px] border-sky-200 hover:border-sky-400' : 'h-[280px] border-sky-200 hover:border-sky-400'}`}
          >
            <UploadCloud className={`text-sky-400 group-hover:text-sky-500 mb-2 transition-transform group-hover:-translate-y-1 ${images.length > 0 ? 'w-8 h-8' : 'w-16 h-16 mb-4'}`} />
            <span className={`font-bold text-slate-700 ${images.length > 0 ? 'text-sm' : 'text-lg'}`}>
              {images.length > 0 ? 'Añadir más imágenes' : 'Haz clic o arrastra tus fotos aquí'}
            </span>
            {images.length === 0 && <span className="text-sm font-medium text-slate-400 mt-2">Soporta JPG, PNG, HEIC — Múltiples archivos</span>}
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
          </label>

          {/* Image list */}
          {images.length > 0 && (
            <div className="mt-6 space-y-3">
              {/* Controls bar */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{images.length} {images.length === 1 ? 'imagen' : 'imágenes'}</span>
                  <button onClick={clearAll} className="text-xs text-rose-400 hover:text-rose-600 font-bold uppercase tracking-widest transition">Limpiar todo</button>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4 text-sky-500" />
                  <span className="text-xs font-bold text-slate-500">Calidad:</span>
                  <input type="range" min="10" max="100" step="5" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-24 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500" />
                  <span className="text-sky-700 bg-sky-100 px-2 py-1 rounded-lg text-xs font-mono font-bold tabular-nums">{quality}%</span>
                </div>
              </div>

              {/* Files */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {images.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <img src={item.previewUrl} alt="" className="w-12 h-12 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-700 truncate">{item.file.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {formatBytes(item.file.size)}
                        {item.resultBlob && (
                          <> → <span className="text-emerald-600 font-bold">{formatBytes(item.resultBlob.size)}</span> <span className="text-emerald-500">(-{Math.round((1 - item.resultBlob.size / item.file.size) * 100)}%)</span></>
                        )}
                      </p>
                    </div>
                    {item.status === 'processing' && (
                      <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin shrink-0" />
                    )}
                    {item.status === 'done' && item.resultUrl && (
                      <a href={item.resultUrl} download={`${item.file.name.replace(/\.[^.]+$/, '')}_q${quality}.webp`} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition shrink-0" title="Descargar">
                        <Download className="w-5 h-5" />
                      </a>
                    )}
                    {item.status === 'done' && !item.resultUrl && (
                      <CheckCircle2 className="w-5 h-5 text-slate-300 shrink-0" />
                    )}
                    <button onClick={() => removeImage(item.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {hasPending && (
                  <button
                    onClick={compressAll}
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-lg group shadow-md disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Comprimiendo...</>
                    ) : (
                      <>Comprimir {images.filter(i => i.status === 'pending').length} {images.filter(i => i.status === 'pending').length === 1 ? 'imagen' : 'imágenes'} <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                )}
                {allDone && (
                  <button
                    onClick={downloadAll}
                    className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-lg shadow-lg shadow-emerald-500/20"
                  >
                    <Download className="w-5 h-5" /> Descargar Todas ({formatBytes(totalCompressed)})
                  </button>
                )}
              </div>

              {/* Summary */}
              {allDone && savedPercent > 0 && (
                <div className="mt-4 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
                  <p className="text-3xl font-black text-emerald-700 tabular-nums">{savedPercent}% menos</p>
                  <p className="text-sm text-emerald-600 mt-1">{formatBytes(totalOriginal)} → {formatBytes(totalCompressed)} total</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <Shield className="w-6 h-6 text-sky-500" />
          Velocidad WebP sin Servidores Externos.
        </h2>
        <p>A diferencia de otras gigantescas webs de edición fotográfica, nosotros <strong>no enviamos jamás tu fotografía a ningún servidor externo</strong>. Todo el procesamiento ocurre íntegramente en tu navegador usando la API Canvas nativa.</p>
        <p>El motor gráfico de tu hardware lee los píxeles, descarta los imperceptibles al ojo y reescribe el contenido en formato <code>.webp</code> (el estándar libre de Google). Esto significa que tu privacidad está 100% garantizada.</p>
        <h3 className="text-lg font-bold">Por qué deberías subir el 100% como WebP</h3>
        <p>Una imagen JPEG de cámara puede pesar 7 MB. Aplicando WebP en calidad media (Q=75) la misma foto pesa apenas <strong>140 KB</strong> con idéntica apariencia visual. Ideal para eCommerce, portfolios y cualquier web que necesite velocidad de carga.</p>
      </section>
    </main>
  );
}
