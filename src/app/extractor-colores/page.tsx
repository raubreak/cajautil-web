"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Palette, Upload, Copy, Check, MousePointer2, Image as ImageIcon } from 'lucide-react';

interface ColorInfo {
  hex: string;
  rgb: string;
}

export default function ExtractorColores() {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorInfo[]>([]);
  const [hoverColor, setHoverColor] = useState<ColorInfo | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      const img = new Image();

      img.onload = () => {
        // Limit dimensions for fast processing
        const MAX_WIDTH = 500;
        const scale = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          extractMainColors(ctx, canvas.width, canvas.height);
        }
      };
      img.src = image;
    }
  }, [image]);

  const extractMainColors = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height).data;
    const colorCounts: Record<string, number> = {};
    const step = 8; // Faster scanning

    for (let i = 0; i < imageData.length; i += 4 * step) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      
      // Basic grouping (slightly round colors to get clusters)
      const rG = Math.round(r / 20) * 20;
      const gG = Math.round(g / 20) * 20;
      const bG = Math.round(b / 20) * 20;
      const key = `${rG},${gG},${bG}`;
      
      colorCounts[key] = (colorCounts[key] || 0) + 1;
    }

    const sortedColors = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([key]) => {
        const [r, g, b] = key.split(',').map(Number);
        return {
          hex: rgbToHex(r, g, b),
          rgb: `rgb(${r}, ${g}, ${b})`
        };
      });

    setColors(sortedColors);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      setHoverColor({
        hex: rgbToHex(pixel[0], pixel[1], pixel[2]),
        rgb: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(text);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-100/50 rounded-3xl mb-6 border border-indigo-50">
          <Palette className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Extractor de <span className="text-indigo-600">Colores</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium">Extrae la paleta cromática perfecta o selecciona cualquier color moviendo el cursor sobre tu imagen.</p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Lado Izquierdo: Visualizador Imagen */}
        <section className="bg-white lg:col-span-8 rounded-3xl shadow-xl p-4 sm:p-6 border border-slate-100 flex flex-col items-center">
            {!image ? (
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="w-full aspect-video border-4 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-indigo-200 transition group p-8 text-center"
                >
                    <div className="p-5 bg-indigo-50 rounded-full mb-4 group-hover:scale-110 transition">
                        <Upload className="w-12 h-12 text-indigo-500" />
                    </div>
                    <p className="text-xl font-bold text-slate-700">Arrastra una imagen o haz clic</p>
                    <p className="text-slate-400 mt-2">JPG, PNG, WebP soportados por tu navegador</p>
                </div>
            ) : (
                <div className="w-full relative cursor-crosshair">
                   <canvas 
                    ref={canvasRef} 
                    onMouseMove={handleMouseMove}
                    onClick={() => hoverColor && copyToClipboard(hoverColor.hex)}
                    className="w-full h-auto rounded-xl shadow-lg border border-slate-100"
                   />
                   <button 
                    onClick={() => setImage(null)}
                    className="mt-6 px-6 py-2 bg-slate-100 text-slate-500 rounded-xl font-bold hover:bg-rose-50 hover:text-rose-600 transition"
                   >
                    Subir otra imagen
                   </button>
                </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </section>

        {/* Lado Derecho: Paleta y Cuentagotas */}
        <section className="lg:col-span-4 space-y-6">
            
            {/* Cuentagotas tiempo real */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <MousePointer2 className="w-5 h-5 text-indigo-500" /> Cuentagotas
                </h3>
                <div className="flex items-center gap-5">
                    <div 
                        className="w-20 h-20 rounded-2xl shadow-inner border border-slate-100 flex items-center justify-center"
                        style={{ backgroundColor: hoverColor?.hex || '#f8fafc' }}
                    >
                        {!hoverColor && <ImageIcon className="w-6 h-6 text-slate-300" />}
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Color Actual</p>
                        <p className="text-2xl font-black text-slate-800 font-mono tracking-tight">{hoverColor?.hex || '#------'}</p>
                        <p className="text-xs text-slate-400 font-mono">{hoverColor?.rgb || 'rgb(---, ---, ---)'}</p>
                    </div>
                </div>
            </div>

            {/* Paleta Automática */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Colores Dominantes</h3>
                <div className="grid grid-cols-2 gap-3">
                    {colors.length > 0 ? colors.map((c, i) => (
                        <button
                            key={i}
                            onClick={() => copyToClipboard(c.hex)}
                            className="group relative flex items-center gap-3 p-2 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-200 transition text-left"
                        >
                            <div 
                                className="w-10 h-10 rounded-lg shrink-0" 
                                style={{ backgroundColor: c.hex }}
                            />
                            <div className="overflow-hidden">
                                <span className="block font-mono font-bold text-slate-700 text-sm truncate">{c.hex}</span>
                                <span className="block text-[10px] text-slate-400 truncate">Copiar HEX</span>
                            </div>
                            {copyStatus === c.hex && (
                                <div className="absolute inset-0 bg-indigo-600/90 rounded-xl flex items-center justify-center animate-in fade-in zoom-in duration-200">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </button>
                    )) : (
                        <div className="col-span-2 py-8 text-center text-slate-400">
                            <Palette className="w-8 h-8 mx-auto mb-2 opacity-20" />
                            <p className="text-xs">Sube una imagen para extraer la paleta.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
      </div>

      <section className="w-full max-w-4xl mt-16 prose prose-slate text-slate-600">
          <h2>Genera Paletas de Colores de forma Profesional</h2>
          <p>Nuestra herramienta te permite extraer los códigos HEX y RGB de cualquier fotografía. Es ideal para crear identidades visuales coherentes basadas en imágenes reales.</p>
          <ul>
              <li><strong>Privacidad Total:</strong> La imagen se procesa en la memoria RAM de tu ordenador a través del navegador. Nunca se sube a nuestros servidores.</li>
              <li><strong>Precisión:</strong> Puedes mover el ratón sobre la imagen para obtener el color exacto de cualquier píxel.</li>
              <li><strong>Rápido:</strong> Copia los códigos de color con un solo clic para pegarlos en Photoshop, CSS o Figma.</li>
          </ul>
      </section>
    </main>
  );
}
