"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Flag, Trophy, Clock } from 'lucide-react';

export default function CronometroPage() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const countRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isActive) {
      startTimeRef.current = Date.now() - time;
      countRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      if (countRef.current) clearInterval(countRef.current);
    }
    return () => {
      if (countRef.current) clearInterval(countRef.current);
    };
  }, [isActive]);

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([time, ...laps]);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return {
      min: minutes.toString().padStart(2, '0'),
      sec: seconds.toString().padStart(2, '0'),
      ms: centiseconds.toString().padStart(2, '0')
    };
  };

  const t = formatTime(time);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      
      {/* HEADER */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-100/50 rounded-3xl mb-6 border border-indigo-50 shadow-sm">
          <Timer className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Cronómetro <span className="text-indigo-600">Online</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          Mide el tiempo con precisión absoluta. Incluye contador de vueltas y centésimas.
        </p>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center gap-8">
        
        {/* DISPLAY PRINCIPAL */}
        <section className="w-full bg-white rounded-[40px] shadow-2xl p-10 sm:p-16 border border-slate-100 flex flex-col items-center text-center">
            
            <div className="flex items-baseline gap-2 mb-12 select-none">
                <span className="text-7xl sm:text-9xl font-black text-slate-800 tracking-tight font-mono leading-none">
                    {t.min}<span className="text-indigo-500 animate-pulse">:</span>{t.sec}
                </span>
                <span className="text-3xl sm:text-5xl font-bold text-indigo-400 font-mono w-[2ch]">
                    .{t.ms}
                </span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 w-full max-w-md">
                {!isActive ? (
                    <button 
                        onClick={handleStart}
                        className="flex-1 min-w-[140px] py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-xl shadow-indigo-600/20 group"
                    >
                        <Play className="w-6 h-6 fill-current" /> EMPEZAR
                    </button>
                ) : (
                    <button 
                        onClick={handlePause}
                        className="flex-1 min-w-[140px] py-6 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-xl group"
                    >
                        <Pause className="w-6 h-6 fill-current" /> PAUSAR
                    </button>
                )}

                <button 
                    onClick={handleLap}
                    disabled={time === 0}
                    className="flex-1 min-w-[140px] py-6 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none group"
                >
                    <Flag className="w-6 h-6" /> VUELTA
                </button>

                <button 
                    onClick={handleReset}
                    className="p-6 bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-2xl font-black transition-all active:rotate-180"
                    title="Reiniciar"
                >
                    <RotateCcw className="w-6 h-6" />
                </button>
            </div>
        </section>

        {/* LAPS LIST */}
        {laps.length > 0 && (
            <section className="w-full bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl max-w-md animate-in slide-in-from-bottom-4 duration-500 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Trophy className="w-40 h-40" />
                </div>
                
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Clock className="w-4 h-4 text-indigo-400" /> Registro de Vueltas
                </h3>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {laps.map((lap, index) => {
                        const lt = formatTime(lap);
                        return (
                            <div key={index} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0 group">
                                <span className="text-slate-500 font-bold text-xs uppercase">Vuelta {laps.length - index}</span>
                                <span className="text-xl font-mono font-black text-slate-200 group-hover:text-indigo-400 transition-colors">
                                    {lt.min}:{lt.sec}.<span className="text-sm opacity-50">{lt.ms}</span>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </section>
        )}

      </div>

      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mt-16 px-2 text-slate-600">
          <h2>Cronómetro Online profesional y gratuito</h2>
          <p>Nuestra herramienta de **cronómetro online** ha sido diseñada para ofrecer la máxima precisión en cualquier dispositivo. Ya sea para entrenamientos deportivos, sesiones de estudio (Pomodoro), cocina o experimentos, dispones de una interfaz ultra limpia y sin distracciones.</p>

          <h3>Funciones destacadas:</h3>
          <ul>
              <li><strong>Precisión de centésimas:</strong> Medición en milisegundos reales.</li>
              <li><strong>Registro de Vueltas (Laps):</strong> Guarda marcas de tiempo intermedias sin detener el contador principal.</li>
              <li><strong>Sin instalación:</strong> Funciona directamente en el navegador, ocupando cero espacio en tu móvil o PC.</li>
              <li><strong>Privacidad Total:</strong> Los tiempos no se guardan en ningún servidor; todo el conteo ocurre de forma local.</li>
          </ul>

          <p>Utilizar un cronómetro digital en lugar de uno físico te permite llevar un mejor registro de tus marcas personales y analizar tus intervalos de tiempo de forma más cómoda en pantallas grandes.</p>
      </section>

    </main>
  );
}
