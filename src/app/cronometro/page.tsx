"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Flag, Trophy, Clock } from 'lucide-react';

interface Lap {
  number: number;
  split: number;
  total: number;
}

const MAX_LAPS = 500;

export default function CronometroPage() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef(0);

  useEffect(() => {
    if (!isActive || startTimeRef.current === null) return;

    let animationFrame: number;
    const updateTime = (now: number) => {
      if (startTimeRef.current === null) return;
      setTime(accumulatedTimeRef.current + now - startTimeRef.current);
      animationFrame = requestAnimationFrame(updateTime);
    };

    animationFrame = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animationFrame);
  }, [isActive]);

  const handleStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    startTimeRef.current = event.timeStamp;
    setIsActive(true);
  };

  const handlePause = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (startTimeRef.current === null) return;
    const elapsed = accumulatedTimeRef.current + event.timeStamp - startTimeRef.current;
    accumulatedTimeRef.current = elapsed;
    startTimeRef.current = null;
    setTime(elapsed);
    setIsActive(false);
  };

  const handleReset = () => {
    startTimeRef.current = null;
    accumulatedTimeRef.current = 0;
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isActive || startTimeRef.current === null) return;
    const total = accumulatedTimeRef.current + event.timeStamp - startTimeRef.current;
    setLaps((previousLaps) => {
      if (previousLaps.length >= MAX_LAPS) return previousLaps;
      return [{
        number: previousLaps.length + 1,
        split: total - (previousLaps[0]?.total ?? 0),
        total,
      }, ...previousLaps];
    });
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
          Mide tiempo transcurrido y registra cada vuelta con su intervalo y tiempo total.
        </p>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center gap-8">
        
        {/* DISPLAY PRINCIPAL */}
        <section className="w-full bg-white rounded-[40px] shadow-2xl p-10 sm:p-16 border border-slate-100 flex flex-col items-center text-center">
            
            <div role="timer" aria-label={`Tiempo transcurrido: ${t.min} minutos, ${t.sec} segundos y ${t.ms} centésimas`} className="flex items-baseline gap-2 mb-12 select-none">
                <span className="text-7xl sm:text-9xl font-black text-slate-800 tracking-tight font-mono leading-none">
                    {t.min}<span className="text-indigo-500">:</span>{t.sec}
                </span>
                <span className="text-3xl sm:text-5xl font-bold text-indigo-400 font-mono w-[2ch]">
                    .{t.ms}
                </span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 w-full max-w-md">
                {!isActive ? (
                    <button
                        type="button"
                        onClick={handleStart}
                        className="flex-1 min-w-[140px] py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-xl shadow-indigo-600/20 group"
                    >
                        <Play className="w-6 h-6 fill-current" /> EMPEZAR
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handlePause}
                        className="flex-1 min-w-[140px] py-6 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-xl group"
                    >
                        <Pause className="w-6 h-6 fill-current" /> PAUSAR
                    </button>
                )}

                <button
                    type="button"
                     onClick={handleLap}
                    disabled={!isActive || laps.length >= MAX_LAPS}
                    aria-label={laps.length >= MAX_LAPS ? 'Límite de vueltas alcanzado' : 'Registrar vuelta'}
                    className="flex-1 min-w-[140px] py-6 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none group"
                >
                    <Flag className="w-6 h-6" /> VUELTA
                </button>

                <button
                    type="button"
                     onClick={handleReset}
                    aria-label="Reiniciar cronómetro"
                     className="p-6 bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-2xl font-black transition-all active:rotate-180"
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
                
                <div className="grid grid-cols-[auto_1fr_1fr] gap-3 border-b border-slate-700 pb-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <span>Vuelta</span>
                    <span className="text-right">Intervalo</span>
                    <span className="text-right">Total</span>
                </div>
                <ol className="space-y-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar" aria-label="Vueltas registradas">
                    {laps.map((lap) => {
                        const splitTime = formatTime(lap.split);
                        const totalTime = formatTime(lap.total);
                         return (
                            <li key={lap.number} className="grid grid-cols-[auto_1fr_1fr] gap-3 items-center py-3 border-b border-slate-800 last:border-0 group">
                                <span className="text-slate-500 font-bold text-xs">#{lap.number}</span>
                                <span className="text-right font-mono font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">
                                    {splitTime.min}:{splitTime.sec}.<span className="text-xs opacity-60">{splitTime.ms}</span>
                                 </span>
                                <span className="text-right font-mono text-sm text-slate-400">
                                    {totalTime.min}:{totalTime.sec}.<span className="text-xs opacity-60">{totalTime.ms}</span>
                                </span>
                            </li>
                         );
                     })}
                </ol>
                {laps.length >= MAX_LAPS && <p role="status" className="mt-4 text-sm text-amber-300">Límite de 500 vueltas alcanzado.</p>}
            </section>
        )}

      </div>

      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mt-16 px-2 text-slate-600">
          <h2>Cronómetro online gratuito con vueltas</h2>
          <p>Esta herramienta mide el tiempo transcurrido con el reloj monotónico del navegador. Puedes usarla para entrenamientos deportivos, sesiones de estudio, cocina o actividades en las que necesites comparar intervalos.</p>

          <h3>Funciones destacadas:</h3>
          <ul>
              <li><strong>Lectura en centésimas:</strong> La pantalla se actualiza según la frecuencia disponible en el navegador.</li>
              <li><strong>Registro de vueltas:</strong> Guarda el intervalo de cada vuelta y su tiempo total sin detener el contador principal.</li>
              <li><strong>Sin instalación:</strong> Funciona directamente en el navegador, ocupando cero espacio en tu móvil o PC.</li>
              <li><strong>Privacidad Total:</strong> Los tiempos no se guardan en ningún servidor; todo el conteo ocurre de forma local.</li>
          </ul>

          <p>Utilizar un cronómetro digital en lugar de uno físico te permite llevar un mejor registro de tus marcas personales y analizar tus intervalos de tiempo de forma más cómoda en pantallas grandes.</p>
      </section>

    </main>
  );
}
