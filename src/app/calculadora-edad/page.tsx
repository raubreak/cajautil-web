"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Cake, Hourglass, Milestone, Infinity, PartyPopper } from 'lucide-react';

import { calculateCalendarAge, calculateNextBirthday } from '@/lib/ageCalculator';

interface AgeStats {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: {
    isToday: boolean;
    date: Date;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }
}

const birthdayFormatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const formatBirthday = (date: Date) => {
  const label = birthdayFormatter.format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
};

export default function CalculadoraEdad() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [stats, setStats] = useState<AgeStats | null>(null);
  const [error, setError] = useState('');

  const now = new Date();
  const maxBirthDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    if (!birthDate) {
      return;
    }

    const updateStats = () => {
      const [year, month, day] = birthDate.split('-').map(Number);
      const birth = new Date(year, month - 1, day);
      const now = new Date();

      if (
        Number.isNaN(birth.getTime()) ||
        birth.getFullYear() !== year ||
        birth.getMonth() !== month - 1 ||
        birth.getDate() !== day
      ) {
        setStats(null);
        setError('Introduce una fecha válida.');
        return;
      }

      if (birth.getTime() > now.getTime()) {
        setStats(null);
        setError('La fecha de nacimiento no puede estar en el futuro.');
        return;
      }

      setError('');

      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const calendarAge = calculateCalendarAge(birth, today);

      // High Precision Stats
      const diffMs = now.getTime() - birth.getTime();
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const totalSeconds = Math.floor(diffMs / 1000);

      const nextBirthday = calculateNextBirthday(birth, now);

      setStats({
        years: calendarAge.years,
        months: calendarAge.months,
        days: calendarAge.days,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds,
        nextBirthday,
      });
    };

    updateStats();
    const timer = setInterval(updateStats, 1000);

    return () => clearInterval(timer);
  }, [birthDate]);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-amber-100/50 rounded-3xl mb-6 border border-amber-50 shadow-sm">
          <Cake className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Calculadora de <span className="text-amber-500">Edad</span>
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
                <label htmlFor="birth-date" className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block text-center">Tu fecha de nacimiento</label>
                <input 
                    id="birth-date"
                    type="date"
                    max={maxBirthDate}
                    value={birthDate}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'birth-date-error' : stats ? undefined : 'birth-date-help'}
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                      if (!e.target.value) {
                        setStats(null);
                        setError('');
                      }
                    }}
                    className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl text-2xl font-bold text-slate-700 focus:outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-50 transition uppercase"
                />
            </div>
            {error && <p id="birth-date-error" className="text-sm font-semibold text-red-600 text-center" role="alert">{error}</p>}
            {!stats && !error && (
                <p id="birth-date-help" className="text-xs text-slate-400 italic text-center leading-relaxed">Introduce tu fecha de nacimiento para calcular la edad por calendario.</p>
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
                     {stats?.nextBirthday.isToday && <PartyPopper className="absolute -bottom-4 -right-4 w-32 h-32 text-amber-500/20 rotate-12" />}
                     <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Cake className="w-4 h-4 text-amber-500" /> Próximo Cumpleaños
                     </h3>
                     {stats ? (
                         <div className="space-y-4">
                              {stats.nextBirthday.isToday ? (
                                <div className="space-y-2">
                                  <div className="text-3xl font-black text-white leading-none">¡Es hoy!</div>
                                  <p className="text-xs text-slate-400">{formatBirthday(stats.nextBirthday.date)}</p>
                                </div>
                              ) : (
                                <>
                                  <p className="text-xs text-slate-400">{formatBirthday(stats.nextBirthday.date)}</p>
                                  <div className="text-3xl font-black text-white tabular-nums leading-none">
                                     {stats.nextBirthday.days} <span className="text-sm font-normal text-slate-400">días restantes</span>
                                 </div>
                                 <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                                     <span className="px-2 py-1 bg-white/5 rounded-lg border border-white/10">{stats.nextBirthday.hours}h</span>
                                     <span className="px-2 py-1 bg-white/5 rounded-lg border border-white/10">{stats.nextBirthday.minutes}m</span>
                                     <span className="px-2 py-1 bg-white/5 rounded-lg border border-white/10">{stats.nextBirthday.seconds}s</span>
                                 </div>
                               </>
                             )}
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
                             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Días transcurridos (aprox.)</p>
                            
                            <div className="pt-4 flex flex-col gap-1.5 border-t border-slate-50 mt-4">
                                 <span className="text-[10px] text-slate-400 font-mono">Horas aprox.: {stats.totalHours.toLocaleString()}</span>
                                 <span className="text-[10px] text-slate-400 font-mono">Minutos aprox.: {stats.totalMinutes.toLocaleString()}</span>
                                 <span className="text-[10px] text-slate-400 font-mono">Segundos aprox.: {stats.totalSeconds.toLocaleString()}</span>
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
          <p>Esta herramienta muestra tu edad en años, meses y días, además de una estimación del tiempo transcurrido desde la fecha indicada.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                    <h3 className="font-black text-amber-500 mb-2 uppercase tracking-wide">Cálculo por calendario</h3>
                   <p className="text-sm">La edad en años, meses y días se calcula con el calendario gregoriano y contempla la distinta duración de los meses y los años bisiestos. Los totales de horas y días son estimaciones basadas en el tiempo transcurrido y pueden variar por la zona horaria.</p>
              </div>
              <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                   <h3 className="font-black text-indigo-600 mb-2 uppercase tracking-wide">Próximo Aniversario</h3>
                   <p className="text-sm">El temporizador estima cuánto falta para el próximo cumpleaños y se actualiza cada segundo. Para fechas del 29 de febrero, usa el último día de febrero en años no bisiestos.</p>
              </div>
          </div>
          <p>¿Vas a celebrar un <strong>aniversario de oro</strong> o quieres estimar cuántas horas han transcurrido desde que naciste? Conocer tu edad en días puede ofrecer otra perspectiva sobre el paso del tiempo.</p>
      </section>

    </main>
  );
}
