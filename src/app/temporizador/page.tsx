"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Timer, StopCircle, Play, Pause, RotateCcw, AlarmClock, Split, Bell, BellOff } from 'lucide-react';

export default function TemporizadorApp() {
  const [activeTab, setActiveTab] = useState<'timer' | 'stopwatch'>('timer');
  const [timeLeft, setTimeLeft] = useState(1500); // 25 min default
  const [timerRunning, setTimerRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('25');
  const [inputSeconds, setInputSeconds] = useState('00');
  
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stopwatchRef = useRef<NodeJS.Timeout | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize and unlock AudioContext on user gesture
  const initAudio = () => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
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

  // Timer Logic
  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
        setTimerRunning(false);
        setIsAlarmActive(true);
        playBeep();
        // Ring for 3 seconds
        const alarmInterval = setInterval(playBeep, 1000);
        setTimeout(() => clearInterval(alarmInterval), 4000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning, timeLeft]);

  // Stopwatch Logic
  useEffect(() => {
    if (stopwatchRunning) {
      stopwatchRef.current = setInterval(() => {
        setStopwatchTime(t => t + 10); // accurate to 10ms
      }, 10);
    }
    return () => { if (stopwatchRef.current) clearInterval(stopwatchRef.current); };
  }, [stopwatchRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatStopwatch = (ms: number) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const m_ms = Math.floor((ms % 1000) / 10);
    return `${h > 0 ? h.toString().padStart(2, '0') + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${m_ms.toString().padStart(2, '0')}`;
  };

  const setManualTimer = () => {
    const m = parseInt(inputMinutes) || 0;
    const s = parseInt(inputSeconds) || 0;
    setTimeLeft(m * 60 + s);
    setTimerRunning(false);
    setIsAlarmActive(false);
  };

  const addLap = () => {
    setLaps([stopwatchTime, ...laps]);
  };

  return (
    <main className={`min-h-screen transition-colors duration-1000 ${isAlarmActive ? 'bg-rose-50' : 'bg-slate-50'} flex flex-col items-center pt-8 pb-16 px-4`}>
      
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-slate-100 rounded-3xl mb-6 shadow-sm">
          {activeTab === 'timer' ? <AlarmClock className="w-10 h-10 text-indigo-500" /> : <Split className="w-10 h-10 text-emerald-500" />}
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">{activeTab === 'timer' ? 'Temporizador' : 'Cronómetro'}</h1>
        
        {/* TAB Switch */}
        <div className="flex bg-slate-200 p-1 rounded-2xl max-w-xs mx-auto mb-8 shadow-inner">
            <button 
                onClick={() => setActiveTab('timer')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'timer' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <AlarmClock className="w-4 h-4" /> Temporizador
            </button>
            <button 
                onClick={() => setActiveTab('stopwatch')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'stopwatch' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Split className="w-4 h-4" /> Cronómetro
            </button>
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Interface Group */}
        <section className={`lg:col-span-8 bg-white border rounded-[40px] shadow-2xl p-10 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 ${isAlarmActive ? 'border-rose-400 ring-4 ring-rose-100' : 'border-slate-100'}`}>
            
            <div className="absolute top-6 right-6">
                <button onClick={() => { initAudio(); playBeep(); setIsMuted(!isMuted); }} className="p-3 text-slate-300 hover:text-slate-600 rounded-full hover:bg-slate-50" title="Probar sonido">
                    {isMuted ? <BellOff className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                </button>
            </div>

            {activeTab === 'timer' ? (
                <>
                <div className={`text-8xl sm:text-9xl font-black tabular-nums tracking-tighter mb-10 ${isAlarmActive ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
                    {formatTime(timeLeft)}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <button 
                        onClick={() => { initAudio(); setTimerRunning(!timerRunning); }}
                        className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition active:scale-95 ${timerRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'} ${isAlarmActive ? 'animate-bounce' : ''}`}
                    >
                        {timerRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-1" />}
                    </button>
                    <button 
                        onClick={() => { setTimeLeft(parseInt(inputMinutes)*60 + parseInt(inputSeconds)); setTimerRunning(false); setIsAlarmActive(false); }}
                        className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition active:rotate-180 duration-500"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>
                </>
            ) : (
                <>
                <div className="text-7xl sm:text-9xl font-black text-slate-800 tabular-nums tracking-tighter mb-10 leading-none">
                    {formatStopwatch(stopwatchTime)}
                </div>
                <div className="flex items-center justify-center gap-4">
                    <button 
                        onClick={() => { initAudio(); setStopwatchRunning(!stopwatchRunning); }}
                        className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition active:scale-95 ${stopwatchRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                    >
                        {stopwatchRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-1" />}
                    </button>
                    <button 
                        onClick={addLap}
                        disabled={!stopwatchRunning}
                        className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition disabled:opacity-30"
                    >
                        <Split className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => { setStopwatchTime(0); setStopwatchRunning(false); setLaps([]); }}
                        className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
                </>
            )}

            {isAlarmActive && (
                <div className="mt-8 px-6 py-2 bg-rose-600 text-white rounded-full font-bold animate-bounce shadow-lg">
                    ¡TIEMPO FINALIZADO!
                </div>
            )}
        </section>

        {/* Adjustments Section */}
        <section className="lg:col-span-4 space-y-6">
            
            {activeTab === 'timer' ? (
                <div className="bg-white rounded-[32px] shadow-xl p-8 border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">Configurar Tiempo</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2 block">Minutos</label>
                            <input 
                                type="number" 
                                value={inputMinutes} 
                                onChange={(e) => { setInputMinutes(e.target.value); }}
                                onBlur={setManualTimer}
                                className="w-full bg-slate-50 border p-4 rounded-2xl text-2xl font-bold text-center appearance-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2 block">Segundos</label>
                            <input 
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
            ) : (
                <div className="bg-white rounded-[32px] shadow-xl p-8 border border-slate-100 h-full overflow-hidden flex flex-col">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">Vueltas ({laps.length})</h3>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {laps.length > 0 ? laps.map((l, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="text-slate-400 font-bold">#{laps.length - i}</span>
                                <span className="font-mono font-bold text-slate-700">{formatStopwatch(l)}</span>
                            </div>
                        )) : (
                            <div className="h-40 flex flex-col items-center justify-center text-slate-300 italic text-sm">
                                <Split className="w-8 h-8 mb-2 opacity-20" />
                                Sin vueltas registradas
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
      </div>

      <section className="w-full max-w-4xl mt-16 prose prose-slate text-slate-600">
          <h2>Mucho más que un simple reloj online</h2>
          <p>Esta herramienta ha sido diseñada para ser lo más liviana posible en tu navegador, garantizando que el consumo de recursos sea mínimo mientras está abierta en segundo plano.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-indigo-600 mb-2">Método Pomodoro</h4>
                  <p className="text-sm">Configura 25 minutos para trabajar sin distracciones. La alarma te avisará exactamente cuando tu ciclo haya terminado para que tomes un descanso.</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-emerald-600 mb-2">Cronómetro de Precisión</h4>
                  <p className="text-sm">Mide cada milisegundo de tus tareas o actividades físicas. Usa el botón de vueltas (Laps) para comparar distintos intervalos de tiempo.</p>
              </div>
          </div>
      </section>

    </main>
  );
}
