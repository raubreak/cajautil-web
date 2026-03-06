"use client";

import React, { useState, useRef, useEffect } from 'react';
import { RefreshCcw, Hand, Trophy, Trash2, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'
];

export default function RuletaAleatoria() {
  const [inputText, setInputText] = useState("Ana\nJuan\nMaría\nCarlos\nLaura\nPedro");
  const [items, setItems] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parse items from textarea
  useEffect(() => {
    const lines = inputText.split('\n').map(i => i.trim()).filter(i => i.length > 0);
    setItems(lines.length > 0 ? lines : ['Agrega', 'Nombres']);
  }, [inputText]);

  // Draw wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2 - 10;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);
    
    // Draw shadow
    ctx.shadowColor = 'rgba(0,0,0,0.1)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    
    // Draw slices
    const sliceAngle = (2 * Math.PI) / items.length;
    
    for (let i = 0; i < items.length; i++) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(i * sliceAngle + rotation); // Add rotation state
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, 0, sliceAngle);
        ctx.closePath();
        
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // Draw Text
        ctx.rotate(sliceAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.max(12, Math.min(24, 200/items.length))}px Inter, sans-serif`;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        
        // Truncate long text properly
        let text = items[i];
        if(text.length > 15) text = text.substring(0, 15) + '...';
        ctx.fillText(text, radius - 20, 5);
        
        ctx.restore();
    }
    
    // Draw Center Peg
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#slate-800';
    ctx.stroke();
    ctx.restore();

  }, [items, rotation]);

  const spinWheel = () => {
    if (isSpinning || items.length < 2) return;
    setIsSpinning(true);
    setWinner(null);

    // Calculate spin physics
    const spins = Math.floor(Math.random() * 5) + 5; // 5 to 10 extra full rotations
    const sliceAngle = (2 * Math.PI) / items.length;
    const randomAngle = Math.random() * (2 * Math.PI); 
    const finalRotation = rotation - (spins * 2 * Math.PI) - randomAngle;
    
    const duration = 4000;
    const startTime = performance.now();
    const startRotation = rotation;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentEasedRotation = startRotation + (finalRotation - startRotation) * easeOutQuart(progress);
      setRotation(currentEasedRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setRotation(currentEasedRotation % (2 * Math.PI));
        
        // Pointer is at the mathematical top (which corresponds to angle 3*Pi/2 in standard Canvas coordinates)
        // Adjust for drawing offset and find winner index
        const normalizedEndRot = ((currentEasedRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const pointerAngle = (3 * Math.PI) / 2; 
        let winningAngle = pointerAngle - normalizedEndRot;
        winningAngle = (winningAngle + 2 * Math.PI) % (2 * Math.PI);
        const winIndex = Math.floor(winningAngle / sliceAngle);
        
        setWinner(items[winIndex]);
        
        // Trigger generic confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4 sm:px-6 z-10">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-orange-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-orange-50">
          <RefreshCcw className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Ruleta <span className="text-orange-500">Aleatoria</span>
        </h1>
        <p className="text-base text-slate-500 font-medium max-w-xl mx-auto px-2">
          Gira la rueda de la fortuna online para tomar decisiones rápidas o realizar sorteos limpios.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* PANEL IZQUIERDO: RUEDA 8 Col */}
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 lg:p-8 border border-slate-100 lg:col-span-8 flex flex-col justify-center items-center relative overflow-hidden">
             {/* Puntero Superior SVG */}
             <div className="absolute top-4 z-20 drop-shadow-md">
                 <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 50L0 20V0H40V20L20 50Z" fill="#334155"/>
                 </svg>
             </div>
             
             {/* Contenedor Responsivo Canvas */}
             <div className="w-full max-w-[400px] aspect-square relative my-4">
                 <canvas 
                    ref={canvasRef} 
                    width={400} 
                    height={400} 
                    className="w-full h-full object-contain"
                 />
             </div>

             <button
                onClick={spinWheel}
                disabled={isSpinning || items.length < 2}
                className="mt-6 w-full sm:w-80 py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-2xl font-black rounded-2xl uppercase tracking-widest shadow-lg shadow-orange-500/30 transition-transform active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group"
             >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <Hand className="w-6 h-6" /> {isSpinning ? 'Girando...' : 'Girar Ahora'}
             </button>

             {winner && (
                 <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                     <Trophy className="w-20 h-20 text-yellow-500 mb-4 animate-bounce" />
                     <p className="text-slate-500 font-bold mb-2 uppercase tracking-widest">Tenemos un ganador</p>
                     <h2 className="text-4xl sm:text-6xl font-black text-slate-800 text-center px-4 mb-8 break-words max-w-full drop-shadow-sm">{winner}</h2>
                     <button 
                         onClick={() => setWinner(null)}
                         className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition active:scale-95"
                     >
                         Cerrar y Continuar
                     </button>
                 </div>
             )}
        </section>

        {/* PANEL DERECHO: INPUTS 4 Col */}
        <section className="bg-white lg:col-span-4 rounded-3xl shadow-xl shadow-slate-200/40 p-5 border border-slate-100 flex flex-col h-full">
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-orange-500" /> Nombres ({items.length})
                </h3>
                <button 
                  onClick={() => setInputText('')}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  title="Borrar Nombres"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
            </div>
            <textarea
                className="w-full flex-1 min-h-[300px] p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-700 font-medium resize-none leading-relaxed"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Pedro&#10;Juan&#10;Manolito&#10;Gafotas..."
            />
            <p className="text-xs text-slate-400 mt-4 text-center">Introduce un nombre u opción por cada línea. La ruleta se actualizará automáticamente.</p>
        </section>

      </div>

      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
          <h2>La Herramienta Definitiva para Sorteos Limpios y Justos</h2>
          <p>¿No logras decidir dónde cenar hoy? ¿Tienes que elegir un ganador para el Sorteo de tu cuenta de Instagram y no quieres que haya trampas? Nuestra rueda virtual algorítmica aplica funciones aleatorias matemáticas en tu navegador para que la decisión sea 100% ciega e impredecible.</p>
          <p>Puedes usarla en tus streamings de Twitch porque está completamente libre de anuncios intrusivos y funciona de manera instantánea, sin tiempos de carga, dándole mucha emoción gracias al Confetti automático una vez haya un ganador en pantalla.</p>
      </section>

    </main>
  );
}
