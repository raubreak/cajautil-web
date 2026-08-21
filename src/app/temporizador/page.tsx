"use client";

import React, { useState, useEffect, useEffectEvent, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, RotateCcw, AlarmClock, Bell, BellOff } from 'lucide-react';

const MAX_TIMER_SECONDS = 24 * 60 * 60;

export default function TemporizadorApp() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 min default
  const [timerRunning, setTimerRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('25');
  const [inputSeconds, setInputSeconds] = useState('00');
  
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const endTimeRef = useRef<number | null>(null);
  const alarmIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const alarmTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isMutedRef = useRef(false);

  const minutes = Number(inputMinutes);
  const seconds = Number(inputSeconds);
  const configuredSeconds = minutes * 60 + seconds;
  const minutesError = !inputMinutes
    ? 'Completa los minutos y los segundos.'
    : !Number.isInteger(minutes) || minutes < 0 || minutes > 1440
      ? 'Los minutos deben ser un número entero entre 0 y 1.440.'
      : null;
  const secondsError = !inputSeconds
    ? 'Completa los minutos y los segundos.'
    : !Number.isInteger(seconds) || seconds < 0 || seconds > 59
      ? 'Los segundos deben ser un número entero entre 0 y 59.'
      : null;
  const durationError = !minutesError && !secondsError && (configuredSeconds < 1 || configuredSeconds > MAX_TIMER_SECONDS)
    ? 'Configura una duración entre 1 segundo y 24 horas.'
    : null;
  const inputError = minutesError ?? secondsError ?? durationError;

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
    if (isMutedRef.current) return;
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

  const stopAlarm = () => {
    if (alarmIntervalRef.current) clearInterval(alarmIntervalRef.current);
    if (alarmTimeoutRef.current) clearTimeout(alarmTimeoutRef.current);
    alarmIntervalRef.current = null;
    alarmTimeoutRef.current = null;
    setIsAlarmActive(false);
  };

  const handleTimerEnd = useEffectEvent(() => {
    endTimeRef.current = null;
    setTimerRunning(false);
    setIsAlarmActive(true);
    playBeep();
    alarmIntervalRef.current = setInterval(playBeep, 1000);
    alarmTimeoutRef.current = setTimeout(() => {
      if (alarmIntervalRef.current) clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
      alarmTimeoutRef.current = null;
    }, 4000);
  });

  useEffect(() => {
    if (!timerRunning) return;

    const updateTimer = () => {
      if (endTimeRef.current === null) return;
      const remaining = Math.max(0, Math.ceil((endTimeRef.current - performance.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) handleTimerEnd();
    };
    const timer = setInterval(updateTimer, 250);

    return () => clearInterval(timer);
  }, [timerRunning]);

  useEffect(() => () => {
    if (alarmIntervalRef.current) clearInterval(alarmIntervalRef.current);
    if (alarmTimeoutRef.current) clearTimeout(alarmTimeoutRef.current);
    audioContextRef.current?.close();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const setManualTimer = () => {
    if (inputError) return;
    stopAlarm();
    endTimeRef.current = null;
    setTimeLeft(configuredSeconds);
    setTimerRunning(false);
  };

  const toggleTimer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const now = event.timeStamp;
    initAudio();
    if (isAlarmActive) {
      stopAlarm();
      if (!inputError) setTimeLeft(configuredSeconds);
      return;
    }
    if (timerRunning) {
      const remaining = endTimeRef.current === null
        ? timeLeft
        : Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
      endTimeRef.current = null;
      setTimeLeft(remaining);
      setTimerRunning(false);
      return;
    }
    if (timeLeft <= 0) return;
    endTimeRef.current = now + timeLeft * 1000;
    setTimerRunning(true);
  };

  const resetTimer = () => {
    if (inputError) return;
    stopAlarm();
    endTimeRef.current = null;
    setTimeLeft(configuredSeconds);
    setTimerRunning(false);
  };

  const setPreset = (presetMinutes: number) => {
    stopAlarm();
    endTimeRef.current = null;
    setInputMinutes(presetMinutes.toString());
    setInputSeconds('00');
    setTimeLeft(presetMinutes * 60);
    setTimerRunning(false);
  };

  const toggleMute = () => {
    initAudio();
    const nextMuted = !isMutedRef.current;
    isMutedRef.current = nextMuted;
    setIsMuted(nextMuted);
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
                <button
                    type="button"
                    onClick={toggleMute}
                    className="p-3 text-slate-300 hover:text-slate-600 rounded-full hover:bg-slate-50"
                    aria-label={isMuted ? 'Activar sonido de alarma' : 'Silenciar alarma'}
                    aria-pressed={isMuted}
                >
                    {isMuted ? <BellOff className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                </button>
            </div>

            <div role="timer" aria-live={isAlarmActive ? 'assertive' : 'off'} className={`text-7xl sm:text-9xl font-black tabular-nums tracking-tighter mb-10 ${isAlarmActive ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
                {formatTime(timeLeft)}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                    type="button"
                    onClick={toggleTimer}
                    disabled={!timerRunning && !isAlarmActive && timeLeft <= 0}
                    aria-label={isAlarmActive ? 'Detener alarma' : timerRunning ? 'Pausar temporizador' : 'Iniciar temporizador'}
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition active:scale-95 ${timerRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {isAlarmActive ? <BellOff className="w-8 h-8" /> : timerRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-1" />}
                </button>
                <button
                    type="button"
                    onClick={resetTimer}
                    disabled={Boolean(inputError)}
                    aria-label="Reiniciar temporizador"
                    className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition active:rotate-180 duration-500"
                >
                    <RotateCcw className="w-6 h-6" />
                </button>
            </div>

            {isAlarmActive && (
                <div role="alert" className="mt-8 px-6 py-2 bg-rose-600 text-white rounded-full font-bold shadow-lg">
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
                                min="0"
                                max="1440"
                                step="1"
                                value={inputMinutes}
                                onChange={(e) => { setInputMinutes(e.target.value); }}
                                onBlur={setManualTimer}
                                aria-describedby={minutesError || durationError ? 'timer-input-error' : undefined}
                                aria-invalid={Boolean(minutesError || durationError)}
                                className="w-full bg-slate-50 border p-4 rounded-2xl text-2xl font-bold text-center appearance-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="timer-seconds" className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2 block">Segundos</label>
                            <input
                                id="timer-seconds"
                                type="number"
                                min="0"
                                max="59"
                                step="1"
                                value={inputSeconds}
                                onChange={(e) => { setInputSeconds(e.target.value); }}
                                onBlur={setManualTimer}
                                aria-describedby={secondsError || durationError ? 'timer-input-error' : undefined}
                                aria-invalid={Boolean(secondsError || durationError)}
                                className="w-full bg-slate-50 border p-4 rounded-2xl text-2xl font-bold text-center appearance-none"
                            />
                        </div>
                    </div>
                    <p id="timer-input-error" role={inputError ? 'alert' : undefined} className={`mt-4 text-sm font-semibold ${inputError ? 'text-rose-600' : 'text-slate-400'}`}>
                        {inputError ?? 'Duración máxima: 24 horas.'}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-6">
                        {[1, 5, 10, 25, 45, 60].map(m => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setPreset(m)}
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
          <p>La cuenta atrás se calcula a partir de una hora objetivo para evitar que los intervalos acumulen retraso cuando la pestaña está en segundo plano. El navegador o el sistema operativo pueden retrasar el sonido si suspenden la pestaña o el dispositivo.</p>
          <div className="my-8">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-indigo-600 mb-2">Método Pomodoro</h4>
                  <p className="text-sm">Configura 25 minutos para trabajar sin distracciones. La alarma sonará al finalizar el ciclo si el navegador permite reproducir audio y la pestaña no está suspendida.</p>
              </div>
          </div>
      </section>

    </main>
  );
}
