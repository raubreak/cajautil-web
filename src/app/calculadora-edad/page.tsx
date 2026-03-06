"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Cake, Hourglass, Timer, Milestone, Infinity, PartyPopper } from 'lucide-react';

interface AgeStats {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }
}

export default function CalculadoraEdad() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [stats, setStats] = useState<AgeStats | null>(null);

  useEffect(() => {
    if (!birthDate) return;

    const timer = setInterval(() => {
      const birth = new Date(birthDate);
      const now = new Date();
      
      if (isNaN(birth.getTime())) return;

      // Basic Age Logic
      let y = now.getFullYear() - birth.getFullYear();
      let m = now.getMonth() - birth.getMonth();
      let d = now.getDate() - birth.getDate();

      if (d < 0) {
        m--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        d += prevMonth.getDate();
      }
      if (m < 0) {
        y--;
        m += 12;
      }

      // High Precision Stats
      const diffMs = now.getTime() - birth.getTime();
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const totalSeconds = Math.floor(diffMs / 1000);

      // Next Birthday Logic
      const nextBdayYear = now.getMonth() > birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() > birth.getDate()) 
        ? now.getFullYear() + 1 
        : now.getFullYear();
      const nextBday = new Date(nextBdayYear, birth.getMonth(), birth.getDate());
      const bdayDiffMs = nextBday.getTime() - now.getTime();
      
      const bdayDays = Math.floor(bdayDiffMs / (1000 * 60 * 60 * 24));
      const bdayHours = Math.floor((bdayDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const bdayMinutes = Math.floor((bdayDiffMs % (1000 * 60 * 60)) / (1000 * 60));
      const bdaySeconds = Math.floor((bdayDiffMs % (1000 * 60)) / 1000);

      setStats({
        years: y,
        months: m,
        days: d,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds,
        nextBirthday: {
            days: bdayDays,
            hours: bdayHours,
            minutes: bdayMinutes,
            seconds: bdaySeconds
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [birthDate]);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-amber-100/50 rounded-3xl mb-6 border border-amber-50 shadow-sm">
          <Cake className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Calculadora de <span className="text-amber-500">Edad Exacta</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">Selecciona tu fecha de nacimiento y descubre detalles fascinantes sobre el tiempo que has vivido.</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        
        {/* Lado Izquierdo: Input */}
        <section className="bg-white rounded-[40px] shadow-2xl p-8 lg:col-span-4 border border-slate-100 flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center">
                 <Calendar className="w-8 h-8 text-amber-600" />
            </div>
            <div className="w-full">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block text-center">Tu fecha de nacimiento</label>
                <input 
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl text-2xl font-bold text-slate-700 focus:outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-50 transition uppercase"
                />
            </div>
            {!stats && (
                <p className="text-xs text-slate-400 italic text-center leading-relaxed">Inserta el día en que naciste para que nuestro algoritmo calcule tu trayectoria cronológica en tiempo real.</p>
            )}
        </section>

        {/* Lado Derecho: Resultados Instantáneos */}
        <section className="lg:col-span-8 space-y-6">
            
            {/* Tarjeta Principal: Edad */}
            <div className="bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100 relative overflow-hidden group min-h-[250px] flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-8 text-slate-50 group-hover:text-amber-50 transition-colors pointer-events-none">
                     <Milestone className="w-40 h-40" />
                </div>
                
                {stats ? (
                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-10">
                        <div className="text-center">
                            <span className="text-7xl font-black text-slate-800 tabular-nums">{stats.years}</span>
                            <span className="block text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Años</span>
                        </div>
                        <div className="h-20 w-[1px] bg-slate-100 hidden sm:block"></div>
                        <div className="text-center">
                            <span className="text-5xl font-black text-amber-500 tabular-nums">{stats.months}</span>
                            <span className="block text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Meses</span>
                        </div>
                        <div className="h-10 w-[1px] bg-slate-100 hidden sm:block"></div>
                        <div className="text-center">
                            <span className="text-5xl font-black text-amber-500 tabular-nums">{stats.days}</span>
                            <span className="block text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Días</span>
                        </div>
                    </div>
                ) : (
                    <div className="relative z-10 h-full flex items-center justify-center text-slate-300 gap-3 italic">
                         <Hourglass className="w-8 h-8 animate-spin duration-1000 pr-1" /> Esperando fecha...
                    </div>
                )}
            </div>

            {/* Grid de Stats Detalladas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Cuánto falta para el cumple */}
                <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group">
                     {stats && stats.nextBirthday.days === 0 && <PartyPopper className="absolute -bottom-4 -right-4 w-32 h-32 text-amber-500/20 rotate-12" />}
                     <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Cake className="w-4 h-4 text-amber-500" /> Próximo Cumpleaños
                     </h3>
                     {stats ? (
                         <div className="space-y-4">
                            <div className="text-3xl font-black text-white tabular-nums leading-none">
                                {stats.nextBirthday.days} <span className="text-sm font-normal text-slate-400">días restantes</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                                <span className="px-2 py-1 bg-white/5 rounded-lg border border-white/10">{stats.nextBirthday.hours}h</span>
                                <span className="px-2 py-1 bg-white/5 rounded-lg border border-white/10">{stats.nextBirthday.minutes}m</span>
                                <span className="px-2 py-1 bg-white/5 rounded-lg border border-white/10">{stats.nextBirthday.seconds}s</span>
                            </div>
                         </div>
                     ) : (
                         <div className="text-slate-700 italic text-sm">--</div>
                     )}
                </div>

                {/* Días Vividos */}
                <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl group">
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Infinity className="w-4 h-4 text-blue-500" /> Trayectoria de vida
                     </h3>
                     {stats ? (
                         <div className="space-y-2">
                            <div className="text-3xl font-black text-slate-800 tabular-nums leading-none">
                                {stats.totalDays.toLocaleString()}
                            </div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Días totales vividos</p>
                            
                            <div className="pt-4 flex flex-col gap-1.5 border-t border-slate-50 mt-4">
                                <span className="text-[10px] text-slate-400 font-mono">Total Horas: {stats.totalHours.toLocaleString()}</span>
                                <span className="text-[10px] text-slate-400 font-mono">Total Minutos: {stats.totalMinutes.toLocaleString()}</span>
                                <span className="text-[10px] text-slate-400 font-mono">Total Segundos: {stats.totalSeconds.toLocaleString()}</span>
                            </div>
                         </div>
                     ) : (
                         <div className="text-slate-100 italic text-sm">--</div>
                     )}
                </div>
            </div>
        </section>
      </div>

      <section className="w-full max-w-4xl mt-16 prose prose-slate text-slate-600">
          <h2>Más que una simple Calculadora de Edad</h2>
          <p>Esta herramienta ha sido diseñada para amantes de los datos curiosos. La mayoría de las calculadoras de edad solo te dicen tus años, pero nosotros bajamos hasta el último segundo de tu existencia.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h4 className="font-black text-amber-500 mb-2 uppercase tracking-wide">Fórmula Cronológica</h4>
                  <p className="text-sm">Calculamos la edad teniendo en cuenta años bisiestos y la duración exacta de cada mes lunar según el calendario gregoriano. Por eso nuestro cálculo es extremadamente preciso.</p>
              </div>
              <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h4 className="font-black text-indigo-600 mb-2 uppercase tracking-wide">Próximo Aniversario</h4>
                  <p className="text-sm">Nuestro temporizador en tiempo real te dice exactamente cuánto tiempo falta para que sopléis las velas. Se actualiza cada segundo para darte una sensación real del paso del tiempo.</p>
              </div>
          </div>
          <p>¿Vas a celebrar un <strong>aniversario de oro</strong> o quieres saber cuántas horas has trabajado en tu vida? Conocer tu edad en días es una métrica sorprendente que a menudo nos ayuda a valorar más cada jornada.</p>
      </section>

    </main>
  );
}
