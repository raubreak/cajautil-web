"use client";
import { useRef, useState } from "react";
import { Coins } from "lucide-react";
import { useSearchParams } from 'next/navigation';

import { trackToolEvent } from '@/lib/analytics';

type ConversionDirection = 'bruto-neto' | 'neto-bruto';
type InputPeriod = 'anual' | 'paga';

const MAX_ANNUAL_SALARY = 10_000_000;

const formatCurrency = (value: number) =>
  value.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

interface Props {
  title?: React.ReactNode;
  subtitle?: string;
  initialBruto?: number | "";
  initialPagas?: 12 | 14;
  initialDireccion?: ConversionDirection;
  initialPeriodo?: InputPeriod;
  initialIrpf?: number;
  initialRetencionSS?: number;
}

export default function CalculadoraSueldoNetoClient({ 
  title, 
  subtitle, 
  initialBruto = "", 
  initialPagas = 12,
  initialDireccion = 'bruto-neto',
  initialPeriodo = 'anual',
  initialIrpf = 15,
  initialRetencionSS = 6.5,
}: Props) {
  const [importe, setImporte] = useState<number | "">(initialBruto);
  const [direccion, setDireccion] = useState<ConversionDirection>(initialDireccion);
  const [periodo, setPeriodo] = useState<InputPeriod>(initialPeriodo);
  const [pagas, setPagas] = useState<12 | 14>(initialPagas);
  const [irpf, setIrpf] = useState(initialIrpf);
  const [retencionSS, setRetencionSS] = useState(initialRetencionSS);
  const startedTracked = useRef(false);
  const completedTracked = useRef(false);

  const handleSalaryChange = (value: string) => {
    const numericValue = value === '' ? '' : Number(value);
    setImporte(numericValue);

    if (numericValue === '' || !Number.isFinite(numericValue) || numericValue <= 0) return;
    if (!startedTracked.current) {
      startedTracked.current = true;
      trackToolEvent('tool_started', 'calculadora-sueldo-neto');
    }
    if (!completedTracked.current) {
      completedTracked.current = true;
      trackToolEvent('tool_completed', 'calculadora-sueldo-neto');
    }
  };

  const totalDeducciones = irpf + retencionSS;
  const factorNeto = 1 - totalDeducciones / 100;
  const importeNumerico = importe === '' ? 0 : importe;
  const importeAnual = periodo === 'anual' ? importeNumerico : importeNumerico * pagas;
  const error = importe === ''
    ? null
    : !Number.isFinite(importeNumerico)
      ? 'Introduce un importe numérico válido.'
      : importeNumerico <= 0
        ? 'El importe debe ser mayor que cero.'
        : importeAnual > MAX_ANNUAL_SALARY
          ? 'El importe anual no puede superar los 10.000.000 €.'
          : null;
  const hasResult = importe !== '' && error === null;
  const brutoAnual = hasResult
    ? direccion === 'bruto-neto'
      ? importeAnual
      : importeAnual / factorNeto
    : 0;
  const netoAnual = hasResult
    ? direccion === 'bruto-neto'
      ? importeAnual * factorNeto
      : importeAnual
    : 0;
  const brutoPorPaga = brutoAnual / pagas;
  const netoPorPaga = netoAnual / pagas;
  const promedioNetoMensual = netoAnual / 12;
  const irpfAnual = brutoAnual * irpf / 100;
  const cotizacionAnual = brutoAnual * retencionSS / 100;
  const resultadoPrincipal = direccion === 'bruto-neto'
    ? netoPorPaga
    : periodo === 'anual'
      ? brutoAnual
      : brutoPorPaga;
  const resultadoLabel = direccion === 'bruto-neto'
    ? 'Sueldo neto por paga'
    : periodo === 'anual'
      ? 'Sueldo bruto anual estimado'
      : 'Sueldo bruto por paga estimado';
  const importeLabel = `Sueldo ${direccion === 'bruto-neto' ? 'bruto' : 'neto'} ${periodo === 'anual' ? 'anual' : 'por paga'} (€)`;
  const maxImporte = periodo === 'anual' ? MAX_ANNUAL_SALARY : MAX_ANNUAL_SALARY / pagas;

  return (
    <div className="w-full flex flex-col items-center">
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-amber-100/50 rounded-3xl mb-6 border border-amber-50 shadow-sm">
          <Coins className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          {title || <>Calculadora de <span className="text-amber-700">Sueldo Neto</span></>}
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          {subtitle || "Convierte sueldo bruto y neto con tu IRPF, cotización y número de pagas reales."}
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl p-8 sm:p-12 border border-slate-100 flex flex-col gap-8 mb-12">
          <div className="space-y-6">
            <fieldset>
              <legend className="block text-sm font-bold text-slate-700 mb-2">Qué quieres calcular</legend>
              <div className="grid grid-cols-2 bg-slate-100 p-2 rounded-2xl border-2 border-slate-100">
                <button
                  type="button"
                  onClick={() => setDireccion('bruto-neto')}
                  className={`py-3 px-2 text-sm font-black rounded-xl transition-all ${direccion === 'bruto-neto' ? 'bg-white shadow-md text-amber-700' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/50'}`}
                  aria-pressed={direccion === 'bruto-neto'}
                >
                  Bruto a neto
                </button>
                <button
                  type="button"
                  onClick={() => setDireccion('neto-bruto')}
                  className={`py-3 px-2 text-sm font-black rounded-xl transition-all ${direccion === 'neto-bruto' ? 'bg-white shadow-md text-amber-700' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/50'}`}
                  aria-pressed={direccion === 'neto-bruto'}
                >
                  Neto a bruto
                </button>
              </div>
            </fieldset>

            <fieldset>
              <legend className="block text-sm font-bold text-slate-700 mb-2">El importe que vas a introducir es</legend>
              <div className="grid grid-cols-2 bg-slate-100 p-2 rounded-2xl border-2 border-slate-100">
                <button
                  type="button"
                  onClick={() => setPeriodo('anual')}
                  className={`py-3 px-2 text-sm font-black rounded-xl transition-all ${periodo === 'anual' ? 'bg-white shadow-md text-amber-700' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/50'}`}
                  aria-pressed={periodo === 'anual'}
                >
                  Anual
                </button>
                <button
                  type="button"
                  onClick={() => setPeriodo('paga')}
                  className={`py-3 px-2 text-sm font-black rounded-xl transition-all ${periodo === 'paga' ? 'bg-white shadow-md text-amber-700' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/50'}`}
                  aria-pressed={periodo === 'paga'}
                >
                  Mensual / por paga
                </button>
              </div>
            </fieldset>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
              <div>
                <label htmlFor="importe-sueldo" className="block text-sm font-bold text-slate-700 mb-2">
                  {importeLabel}
                </label>
                <input
                  id="importe-sueldo"
                  type="number"
                  min="0.01"
                  max={maxImporte}
                  step="0.01"
                  value={importe}
                  onChange={(event) => handleSalaryChange(event.target.value)}
                  className="w-full border-2 border-slate-200 rounded-2xl p-4 text-xl font-bold bg-white focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all text-slate-900"
                  placeholder={periodo === 'anual' ? 'Ej: 30000' : 'Ej: 2000'}
                  aria-describedby={error ? 'ayuda-importe error-importe' : 'ayuda-importe'}
                  aria-invalid={Boolean(error)}
                />
                <p id="ayuda-importe" className="mt-2 text-xs text-slate-500">
                  {periodo === 'paga' && pagas === 14
                    ? 'Se multiplicará por 14; cada paga ordinaria y extra se considera del mismo importe.'
                    : `Se usará como base para ${pagas} pagas al año.`}
                </p>
                {error && <p id="error-importe" className="mt-2 text-sm font-semibold text-rose-700">{error}</p>}
              </div>

            <fieldset>
              <legend className="block text-sm font-bold text-slate-700 mb-2">Número de Pagas</legend>
              <div className="flex bg-slate-100 p-2 rounded-2xl border-2 border-slate-100" role="group" aria-label="Seleccionar número de pagas">
                <button 
                  type="button"
                  onClick={() => setPagas(12)}
                  className={`flex-1 py-3 text-sm font-black rounded-xl transition-all shadow-sm ${pagas === 12 ? 'bg-white shadow-md text-amber-700 scale-105' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/50'}`}
                  aria-pressed={pagas === 12}
                >
                  12 Pagas
                </button>
                <button 
                  type="button"
                  onClick={() => setPagas(14)}
                  className={`flex-1 py-3 text-sm font-black rounded-xl transition-all shadow-sm ${pagas === 14 ? 'bg-white shadow-md text-amber-700 scale-105' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/50'}`}
                  aria-pressed={pagas === 14}
                >
                  14 Pagas
                </button>
              </div>
            </fieldset>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="irpf" className="block text-sm font-bold text-slate-700 mb-2">Retención de IRPF (%)</label>
              <input
                id="irpf"
                type="number"
                min="0"
                max="55"
                step="0.1"
                value={irpf}
                onChange={(event) => setIrpf(Math.min(55, Math.max(0, Number(event.target.value))))}
                className="w-full border-2 border-slate-200 rounded-2xl p-4 text-xl font-bold bg-white focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all text-slate-900"
              />
              <p className="mt-2 text-xs text-slate-500">Usa el porcentaje de tu nómina o de la simulación de la AEAT.</p>
            </div>
            <div>
              <label htmlFor="seguridad-social" className="block text-sm font-bold text-slate-700 mb-2">Cotización del trabajador (%)</label>
              <input
                id="seguridad-social"
                type="number"
                min="0"
                max="15"
                step="0.01"
                value={retencionSS}
                onChange={(event) => setRetencionSS(Math.min(15, Math.max(0, Number(event.target.value))))}
                className="w-full border-2 border-slate-200 rounded-2xl p-4 text-xl font-bold bg-white focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all text-slate-900"
              />
              <p className="mt-2 text-xs text-slate-500">Valor orientativo inicial, no universal. Comprueba el porcentaje total de tu nómina. Referencias revisadas en agosto de 2026.</p>
            </div>
          </div>

          <div className="mt-8 p-8 bg-amber-50 rounded-[32px] border border-amber-100 shadow-inner" role="status" aria-live="polite">
            <p className="text-sm font-extrabold text-amber-900 uppercase tracking-widest text-center mb-4">
              {resultadoLabel}
            </p>
            <p className="text-5xl sm:text-6xl font-black text-amber-600 text-center mb-8 drop-shadow-sm break-words">
              {hasResult ? formatCurrency(resultadoPrincipal) : '0,00 €'}
            </p>

            {hasResult && (
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm">
                <div className="bg-white/60 p-4 rounded-xl border border-amber-100/50">
                  <dt className="font-bold text-slate-600">Bruto anual</dt>
                  <dd className="font-black text-slate-800 mt-1">{formatCurrency(brutoAnual)}</dd>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-amber-100/50">
                  <dt className="font-bold text-slate-600">Neto anual</dt>
                  <dd className="font-black text-slate-800 mt-1">{formatCurrency(netoAnual)}</dd>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-amber-100/50">
                  <dt className="font-bold text-slate-600">Bruto por paga ({pagas})</dt>
                  <dd className="font-black text-slate-800 mt-1">{formatCurrency(brutoPorPaga)}</dd>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-amber-100/50">
                  <dt className="font-bold text-slate-600">Neto por paga ({pagas})</dt>
                  <dd className="font-black text-slate-800 mt-1">{formatCurrency(netoPorPaga)}</dd>
                </div>
                <div className="bg-white/60 p-4 rounded-xl border border-amber-100/50 sm:col-span-2">
                  <dt className="font-bold text-slate-600">Promedio neto mensual (neto anual ÷ 12)</dt>
                  <dd className="font-black text-slate-800 mt-1">{formatCurrency(promedioNetoMensual)}</dd>
                </div>
              </dl>
            )}
            
            <div className="space-y-3 mt-4 pt-6 text-sm text-slate-600">
              <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-amber-100/50">
                <span className="font-bold text-slate-700">Retención de IRPF</span>
                <span className="text-right font-black text-rose-700">
                  -{irpf.toLocaleString('es-ES')}%
                  {hasResult ? <span className="block text-xs">{formatCurrency(irpfAnual)} al año</span> : null}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-amber-100/50">
                <span className="font-bold text-slate-700">Seguridad Social</span>
                <span className="text-right font-black text-rose-700">
                  -{retencionSS.toLocaleString('es-ES')}%
                  {hasResult ? <span className="block text-xs">{formatCurrency(cotizacionAnual)} al año</span> : null}
                </span>
              </div>
              <p className="text-xs text-amber-900 mt-4 leading-tight italic font-medium px-4">
                * Estimación aritmética basada en los porcentajes que indiques. No calcula automáticamente tu retención fiscal personal.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

function readBoundedNumber(
  rawValue: string | null,
  min: number,
  max: number,
  fallback: number,
): number {
  if (rawValue === null || rawValue.trim() === '') return fallback;

  const value = Number(rawValue);
  return Number.isFinite(value) && value >= min && value <= max ? value : fallback;
}

export function CalculadoraSueldoNetoWithSearchParams() {
  const searchParams = useSearchParams();
  const direccion: ConversionDirection = searchParams.get('direccion') === 'neto-bruto'
    ? 'neto-bruto'
    : 'bruto-neto';
  const periodo: InputPeriod = searchParams.get('periodo') === 'paga' ? 'paga' : 'anual';
  const pagas: 12 | 14 = searchParams.get('pagas') === '14' ? 14 : 12;
  const maxImporte = periodo === 'anual' ? MAX_ANNUAL_SALARY : MAX_ANNUAL_SALARY / pagas;
  const importe = readBoundedNumber(searchParams.get('importe'), 0.01, maxImporte, 0);
  const irpf = readBoundedNumber(searchParams.get('irpf'), 0, 55, 15);
  const retencionSS = readBoundedNumber(searchParams.get('ss'), 0, 15, 6.5);

  return (
    <CalculadoraSueldoNetoClient
      initialBruto={importe || ''}
      initialPagas={pagas}
      initialDireccion={direccion}
      initialPeriodo={periodo}
      initialIrpf={irpf}
      initialRetencionSS={retencionSS}
    />
  );
}
