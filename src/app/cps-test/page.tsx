"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2, Timer, RotateCcw, Award, Rocket, Trophy, Target } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CPSTest() {
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5.0);
  const [duration, setDuration] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [highScore, setHighScore] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Stats Logic
  const cpsValue = isFinished ? (clickCount / duration).toFixed(2) : (isRunning ? (clickCount / (duration - timeLeft)).toFixed(1) : '0.0');

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
            if(t <= 0.1) {
                stopTest();
                return 0;
            }
            return Number((t - 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => { if(timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning]);

  const startTest = () => {
    setClickCount(1);
    setTimeLeft(duration);
    setIsRunning(true);
    setIsFinished(false);
  };

  const stopTest = () => {
    setIsRunning(false);
    setIsFinished(true);
    if(timerRef.current) clearInterval(timerRef.current);
    
    const finalCPS = clickCount / duration;
    if(finalCPS > highScore) setHighScore(Number(finalCPS.toFixed(2)));

    // Trigger Success
    if(finalCPS > 6) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
  };

  const handleClick = () => {
    if(!isRunning && !isFinished) {
        startTest();
    } else if (isRunning) {
        setClickCount(c => c + 1);
    }
  };

  const resetTest = () => {
    setClickCount(0);
    setTimeLeft(duration);
    setIsRunning(false);
    setIsFinished(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-100/50 rounded-3xl mb-6 border border-emerald-50 group">
          <MousePointer2 className="w-10 h-10 text-emerald-600 group-hover:scale-110 transition-transform" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Test de <span className="text-emerald-600">CPS</span> (Clicks por Segundo)
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">¿Que tan rápido eres? Pon a prueba tu velocidad de clicking en 5 segundos.</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        
        {/* Lado Izquierdo: Configuración y Stats */}
        <section className="lg:col-span-4 space-y-6 flex flex-col h-full">
            
            {/* Duración Tabs */}
            <div className="bg-white rounded-[32px] p-6 shadow-xl border border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Timer className="w-4 h-4" /> Duración del test
                </h3>
                <div className="grid grid-cols-3 gap-2">
                    {[1, 5, 10].map(d => (
                        <button
                            key={d}
                            disabled={isRunning}
                            onClick={() => { setDuration(d); setTimeLeft(d); setClickCount(0); setIsFinished(false); }}
                            className={`py-3 rounded-xl font-bold transition-all ${duration === d ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                        >
                            {d}s
                        </button>
                    ))}
                </div>
            </div>

            {/* Scoreboard */}
            <div className="bg-slate-900 rounded-[32px] p-8 text-white flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-white/5 opacity-50">
                    <Award className="w-32 h-32" />
                </div>
                <div className="mb-8">
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Récord de CPS</p>
                     <div className="text-4xl font-black text-emerald-400 tabular-nums">{highScore} <span className="text-xs font-normal text-slate-500">CPS</span></div>
                </div>
                
                <div className="space-y-6 relative z-10">
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Tu Rango actual</p>
                        <div className="text-xl font-bold text-white flex items-center gap-2">
                            {highScore === 0 ? '--' : (highScore < 5 ? '🐢 Tortuga' : highScore < 8 ? '🐰 Conejo' : highScore < 11 ? '🏎 Rayo' : '🚀 Semidiós')}
                        </div>
                    </div>
                    <div className="pt-6 border-t border-white/5 flex gap-4">
                        <div className="flex-1">
                            <span className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Tiempo</span>
                            <span className="text-2xl font-black tabular-nums">{timeLeft}s</span>
                        </div>
                        <div className="flex-1">
                            <span className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Clicks</span>
                            <span className="text-2xl font-black tabular-nums">{clickCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Lado Derecho: Área de Clic */}
        <section className="lg:col-span-8">
             <div 
                onMouseDown={handleClick}
                className={`w-full min-h-[450px] rounded-[48px] shadow-2xl border-4 transition-all flex flex-col items-center justify-center text-center p-12 relative overflow-hidden select-none cursor-pointer group ${isRunning ? 'bg-white border-emerald-500 ring-[12px] ring-emerald-50' : isFinished ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-100 hover:border-emerald-200'}`}
             >
                {/* Visual Feedback on Click (Simplified) */}
                <div className="absolute inset-0 bg-emerald-500/5 group-active:bg-emerald-500/10 transition-colors"></div>

                {!isRunning && !isFinished ? (
                    <div className="flex flex-col items-center gap-6 animate-pulse">
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                             <Target className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800">Haz clic para empezar</h2>
                        <p className="text-slate-400 font-medium">El cronómetro comenzará con el primer clic.</p>
                    </div>
                ) : isRunning ? (
                    <div className="text-center">
                         <div className="text-[12rem] font-black text-emerald-600/10 leading-none absolute inset-0 flex items-center justify-center -z-10 tabular-nums">{clickCount}</div>
                         <div className="text-6xl font-black text-slate-800 tabular-nums mb-4">{cpsValue} <span className="text-2xl">CPS</span></div>
                         <div className="flex items-center justify-center gap-1.5">
                             <Rocket className="w-5 h-5 text-emerald-500 animate-bounce" />
                             <span className="font-black text-emerald-600 uppercase tracking-widest text-sm">¡Dale más rápido!</span>
                         </div>
                    </div>
                ) : (
                    <div className="text-center animate-in zoom-in duration-300">
                        <Trophy className="w-20 h-20 text-amber-500 mx-auto mb-6 drop-shadow-lg" />
                        <h2 className="text-4xl font-black text-slate-800 mb-2">¡Resultado Final!</h2>
                        <div className="text-7xl font-black text-emerald-600 mb-8 tabular-nums">{cpsValue} <span className="text-2xl">CPS</span></div>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button 
                                onClick={(e) => { e.stopPropagation(); resetTest(); }}
                                className="px-10 py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-sm flex items-center gap-3 hover:bg-slate-800 transition shadow-xl"
                            >
                                <RotateCcw className="w-5 h-5" /> Reintentar
                            </button>
                        </div>
                    </div>
                )}
             </div>
        </section>
      </div>

      <section className="w-full max-w-4xl prose prose-slate text-slate-600">
          <h2>La guía definitiva del CPS Test (Clicks por segundo)</h2>
          <p>El **CPS Test** es una métrica crucial en el mundo gaming, especialmente en títulos como Minecraft, donde la velocidad de interacción con el ratón determina el éxito en combates (PvP). Nuestra herramienta mide cuántas veces puedes pulsar el botón izquierdo del ratón en un intervalo de tiempo exacto.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
               <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h4 className="font-black text-slate-800 mb-2 uppercase tracking-wide">Rangos de Jugador</h4>
                  <ul className="text-sm space-y-1">
                      <li>🐢 <strong>0-5 CPS:</strong> Principiante. Lento para juegos competitivos.</li>
                      <li>🐰 <strong>5-8 CPS:</strong> Intermedio. Estándar para uso general.</li>
                      <li>🏎 <strong>8-11 CPS:</strong> Pro. Excelente nivel de reacción.</li>
                      <li>🚀 <strong>12+ CPS:</strong> Élite. Nivel de campeones de eSports.</li>
                  </ul>
               </div>
               <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h4 className="font-black text-slate-800 mb-2 uppercase tracking-wide">Técnicas Comunes</h4>
                  <p className="text-xs">Existen métodos como el **Jitter Clicking** (hacer vibrar el músculo del antebrazo) o el **Butterfly Clicking** (usar dos dedos alternamente) que pueden disparar tus CP hasta niveles inhumanos.</p>
               </div>
          </div>
          <p>¿Quieres mejorar tu habilidad en los videojuegos? Entrenar tu velocidad de clic de forma regular te ayudará a mejorar la coordinación mano-ojo y la memoria muscular de tus dedos. ¡Marca tu mejor puntuación y compártela!</p>
      </section>

    </main>
  );
}
