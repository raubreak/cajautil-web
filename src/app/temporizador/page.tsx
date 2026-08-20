"use client";

import React, { useState, useEffect, useEffectEvent, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, RotateCcw, AlarmClock, Bell, BellOff } from 'lucide-react';

export default function TemporizadorApp() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 min default
  const [timerRunning, setTimerRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('25');
  const [inputSeconds, setInputSeconds] = useState('00');
  
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize and unlock AudioContext on user gesture
  const initAudio = () => {
    if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as typeof window & {
          webkitAudioContext: typeof AudioContext;
        }).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
    }
    if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
    }
  };

  const playBeep = () => {
    if (isMuted) return;
    try {
        initAudio();
        const ctx = audioContextRef.current!;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, ctx.currentTime);
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);

        oscillator.start();
        oscillator.stop(ctx.currentTime + 1);
    } catch (e) {
        console.error("Audio API not supported", e);
    }
  };

  const handleTimerEnd = useEffectEvent(() => {
    setTimerRunning(false);
    setIsAlarmActive(true);
    playBeep();
    const alarmInterval = setInterval(playBeep, 1000);
    setTimeout(() => clearInterval(alarmInterval), 4000);
  });

  // Timer Logic
  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
        const alarmTimeout = setTimeout(handleTimerEnd, 0);
        return () => clearTimeout(alarmTimeout);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const setManualTimer = () => {
    const m = parseInt(inputMinutes) || 0;
    const s = parseInt(inputSeconds) || 0;
    setTimeLeft(m * 60 + s);
    setTimerRunning(false);
    setIsAlarmActive(false);
  };

  return (
    <main className={`min-h-screen transition-colors duration-1000 ${isAlarmActive ? 'bg-rose-50' : 'bg-slate-50'} flex flex-col items-center pt-8 pb-16 px-4`}>
      
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-slate-100 rounded-3xl mb-6 shadow-sm">
          <AlarmClock className="w-10 h-10 text-indigo-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Temporizador Online</h1>
        <p className="text-slate-500">
          ¿Necesitas medir tiempo ascendente y vueltas? Usa el{' '}
          <Link href="/cronometro" className="font-bold text-indigo-600 hover:underline">cronómetro online</Link>.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Interface Group */}
        <section className={`lg:col-span-8 bg-white border rounded-[40px] shadow-2xl p-10 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 ${isAlarmActive ? 'border-rose-400 ring-4 ring-rose-100' : 'border-slate-100'}`}>
            
            <div className="absolute top-6 right-6">
                <button onClick={() => { initAudio(); playBeep(); setIsMuted(!isMuted); }} className="p-3 text-slate-300 hover:text-slate-600 rounded-full hover:bg-slate-50" title="Probar sonido">
                    {isMuted ? <BellOff className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                </button>
            </div>

            <div className={`text-8xl sm:text-9xl font-black tabular-nums tracking-tighter mb-10 ${isAlarmActive ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
                {formatTime(timeLeft)}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                    onClick={() => { initAudio(); setTimerRunning(!timerRunning); }}
                    aria-label={timerRunning ? 'Pausar temporizador' : 'Iniciar temporizador'}
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition active:scale-95 ${timerRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'} ${isAlarmActive ? 'animate-bounce' : ''}`}
                >
                    {timerRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-1" />}
                </button>
                <button
                    onClick={() => { setTimeLeft(parseInt(inputMinutes)*60 + parseInt(inputSeconds)); setTimerRunning(false); setIsAlarmActive(false); }}
                    aria-label="Reiniciar temporizador"
                    className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition active:rotate-180 duration-500"
                >
                    <RotateCcw className="w-6 h-6" />
                </button>
            </div>

            {isAlarmActive && (
                <div className="mt-8 px-6 py-2 bg-rose-600 text-white rounded-full font-bold animate-bounce shadow-lg">
                    ¡TIEMPO FINALIZADO!
                </div>
            )}
        </section>

        {/* Adjustments Section */}
        <section className="lg:col-span-4 space-y-6">
            
                <div className="bg-white rounded-[32px] shadow-xl p-8 border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">Configurar Tiempo</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="timer-minutes" className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2 block">Minutos</label>
                            <input 
                                id="timer-minutes"
                                type="number" 
                                value={inputMinutes} 
                                onChange={(e) => { setInputMinutes(e.target.value); }}
                                onBlur={setManualTimer}
                                className="w-full bg-slate-50 border p-4 rounded-2xl text-2xl font-bold text-center appearance-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="timer-seconds" className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2 block">Segundos</label>
                            <input 
                                id="timer-seconds"
                                type="number" 
                                value={inputSeconds} 
                                onChange={(e) => { setInputSeconds(e.target.value); }}
                                onBlur={setManualTimer}
                                className="w-full bg-slate-50 border p-4 rounded-2xl text-2xl font-bold text-center appearance-none"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-6">
                        {[1, 5, 10, 25, 45, 60].map(m => (
                            <button 
                                key={m} 
                                onClick={() => { setInputMinutes(m.toString()); setInputSeconds('00'); setTimeLeft(m*60); setTimerRunning(false); setIsAlarmActive(false); }}
                                className="py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition text-xs"
                            >
                                {m}m
                            </button>
                        ))}
                    </div>
                </div>
        </section>
      </div>

      <section className="w-full max-w-4xl mt-16 prose prose-slate text-slate-600">
          <h2>Temporizador de cuenta atrás para estudiar, cocinar o entrenar</h2>
          <p>Esta herramienta ha sido diseñada para ser lo más liviana posible en tu navegador, garantizando que el consumo de recursos sea mínimo mientras está abierta en segundo plano.</p>
          <div className="my-8">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-indigo-600 mb-2">Método Pomodoro</h4>
                  <p className="text-sm">Configura 25 minutos para trabajar sin distracciones. La alarma te avisará exactamente cuando tu ciclo haya terminado para que tomes un descanso.</p>
              </div>
          </div>
      </section>

    </main>
  );
}
