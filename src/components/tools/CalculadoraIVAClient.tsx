"use client";

import React, { useState } from 'react';
import { Landmark, ArrowRightCircle, HandCoins, ArrowLeftRight } from 'lucide-react';

interface Props {
  title?: React.ReactNode;
  subtitle?: string;
  initialImporte?: string;
  initialIva?: number;
  initialModo?: "sumar" | "restar";
}

const MAX_AMOUNT = 1_000_000_000_000;
const MAX_VAT_RATE = 100;
const currencyFormatter = new Intl.NumberFormat('es-ES', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function parseDecimal(value: string) {
  return Number(value.replace(',', '.'));
}

const CalculadoraIVAClient = ({ 
  title, 
  subtitle, 
  initialImporte = '', 
  initialIva = 21, 
  initialModo = "sumar" 
}: Props) => {
  const [importe, setImporte] = useState<string>(initialImporte);
  const [porcentajeIva, setPorcentajeIva] = useState<string>(String(initialIva));
  const [modo, setModo] = useState<"sumar" | "restar">(initialModo);

  const calculation = (() => {
    const amount = parseDecimal(importe);
    const vatRate = parseDecimal(porcentajeIva);
    const importeError = importe.trim() === ''
      ? null
      : !Number.isFinite(amount) || amount <= 0 || amount > MAX_AMOUNT
        ? 'Introduce un importe superior a 0 y no mayor de 1.000.000.000.000 €.'
        : null;
    const ivaError = porcentajeIva.trim() === ''
      ? 'Introduce un porcentaje de IVA.'
      : !Number.isFinite(vatRate) || vatRate < 0 || vatRate > MAX_VAT_RATE
        ? 'El porcentaje de IVA debe estar entre 0% y 100%.'
        : null;

    if (importe.trim() === '' || importeError || ivaError) {
      return { result: null, importeError, ivaError, calculationError: null };
    }

    const baseImponible = modo === 'sumar' ? amount : amount / (1 + vatRate / 100);
    const total = modo === 'sumar' ? amount * (1 + vatRate / 100) : amount;
    const cuotaIva = total - baseImponible;

    if (![baseImponible, cuotaIva, total].every(Number.isFinite)) {
      return {
        result: null,
        importeError: null,
        ivaError: null,
        calculationError: 'El resultado queda fuera del rango numérico admitido.',
      };
    }

    return {
      result: { baseImponible, cuotaIva, total, vatRate },
      importeError: null,
      ivaError: null,
      calculationError: null,
    };
  })();

  const formatCurrency = (value: number) => currencyFormatter.format(value);

  return (
    <div className="w-full flex flex-col items-center">
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-yellow-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-yellow-50">
          <Landmark className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight text-center">
          {title || <>Calculadora de <span className="text-yellow-600">IVA</span></>}
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-2">
          {subtitle || "Calcula la base imponible, la cuota de IVA y el precio total. Añade o quita el IVA con un porcentaje entre 0% y 100%."}
        </p>
      </div>

      {/* CALCULATOR PLATFORM */}
      <section className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 sm:p-10 border border-slate-100 mb-12">
        <div className="flex flex-col sm:flex-row gap-4 mb-8" role="group" aria-label="Operación de IVA">
          <button
            type="button"
            onClick={() => setModo('sumar')}
            aria-pressed={modo === 'sumar'}
            className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border-2 ${modo === 'sumar' ? 'bg-yellow-50 border-yellow-500 text-yellow-700' : 'bg-white border-slate-200 text-slate-500 hover:border-yellow-300'}`}
          >
            <HandCoins className="w-5 h-5" /> Añadir IVA
          </button>
          <button
            type="button"
            onClick={() => setModo('restar')}
            aria-pressed={modo === 'restar'}
            className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border-2 ${modo === 'restar' ? 'bg-yellow-50 border-yellow-500 text-yellow-700' : 'bg-white border-slate-200 text-slate-500 hover:border-yellow-300'}`}
          >
            <ArrowLeftRight className="w-5 h-5" /> Quitar IVA
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div>
            <label htmlFor="iva-amount" className="block text-sm font-bold text-slate-700 mb-2">
              {modo === 'sumar' ? 'Precio sin IVA (Base Imponible)' : 'Precio con IVA incluido (Total)'}
            </label>
            <div className="relative">
              <input
                id="iva-amount"
                type="number"
                min="0.01"
                max={MAX_AMOUNT}
                step="0.01"
                placeholder="Ej. 100"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 text-lg font-semibold"
                value={importe}
                onChange={(e) => setImporte(e.target.value)}
                aria-invalid={Boolean(calculation.importeError)}
                aria-describedby={calculation.importeError ? 'iva-amount-error' : undefined}
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">€</span>
            </div>
            {calculation.importeError && <p id="iva-amount-error" role="alert" className="mt-2 text-sm font-semibold text-red-700">{calculation.importeError}</p>}
          </div>
          
          <div>
            <label htmlFor="iva-rate" className="block text-sm font-bold text-slate-700 mb-2">
              Porcentaje de IVA (%)
            </label>
            <div className="relative">
              <input
                id="iva-rate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 text-lg font-semibold bg-white"
                value={porcentajeIva}
                onChange={(e) => setPorcentajeIva(e.target.value)}
                aria-invalid={Boolean(calculation.ivaError)}
                aria-describedby={calculation.ivaError ? 'iva-rate-error' : undefined}
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
            </div>
            {calculation.ivaError && <p id="iva-rate-error" role="alert" className="mt-2 text-sm font-semibold text-red-700">{calculation.ivaError}</p>}
            
            <div className="mt-3 flex gap-2" role="group" aria-label="Tipos de IVA habituales">
              {['21', '10', '4'].map((rate) => (
                <button
                  type="button"
                  key={rate}
                  onClick={() => setPorcentajeIva(rate)}
                  aria-pressed={porcentajeIva === rate}
                  className="text-xs bg-slate-200 hover:bg-yellow-200 text-slate-700 font-semibold py-1 px-3 rounded-full transition-colors"
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS DESGLOSE */}
        <div className="border border-yellow-200 bg-yellow-50 rounded-2xl p-6 shadow-sm" role="status" aria-live="polite" aria-atomic="true">
          <h3 className="text-sm font-bold text-yellow-800 uppercase tracking-widest mb-4 border-b border-yellow-200/50 pb-2 flex items-center gap-2">
            <ArrowRightCircle className="w-5 h-5 text-yellow-500" />
            Resultado del Desglose
          </h3>
          
          {calculation.calculationError && <p className="mb-4 text-sm font-semibold text-red-700">{calculation.calculationError}</p>}
          {!calculation.result && !calculation.calculationError ? (
            <p className="text-sm font-medium text-slate-600">
              {calculation.importeError || calculation.ivaError
                ? 'Corrige los campos indicados para ver el resultado.'
                : 'Introduce un importe válido para ver la base, la cuota y el total.'}
            </p>
          ) : calculation.result && (
            <div className="space-y-4">
              <div className={`flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center ${modo === 'restar' ? 'opacity-80' : 'font-bold'}`}>
                <span className="text-slate-600">Base Imponible (Precio sin IVA):</span>
                <span className="text-xl text-right text-slate-800">{formatCurrency(calculation.result.baseImponible)} €</span>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center opacity-90 border-b border-yellow-200/50 pb-4">
                <span className="text-slate-600">Cuota de IVA ({calculation.result.vatRate}%):</span>
                <span className="text-xl text-right text-red-600">+{formatCurrency(calculation.result.cuotaIva)} €</span>
              </div>

              <div className={`flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center ${modo === 'sumar' ? 'opacity-80 text-xl' : 'text-2xl font-black'}`}>
                <span className="text-slate-800">Precio Total (con IVA):</span>
                <span className="text-right text-yellow-600">{formatCurrency(calculation.result.total)} €</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CalculadoraIVAClient;
