"use client";

import { useState } from "react";
import Link from "next/link";
import { Percent, Plus } from "lucide-react";

type CalculationMode = "percentageOf" | "proportion" | "findBase" | "change";

const modes: Array<{
  id: CalculationMode;
  label: string;
  firstLabel: string;
  firstPlaceholder: string;
  secondLabel: string;
  secondPlaceholder: string;
}> = [
  {
    id: "percentageOf",
    label: "X% de una cantidad",
    firstLabel: "Porcentaje",
    firstPlaceholder: "Ej: 21",
    secondLabel: "Cantidad base",
    secondPlaceholder: "Ej: 1500",
  },
  {
    id: "proportion",
    label: "Qué porcentaje es",
    firstLabel: "Cantidad parcial",
    firstPlaceholder: "Ej: 25",
    secondLabel: "Cantidad total",
    secondPlaceholder: "Ej: 200",
  },
  {
    id: "findBase",
    label: "Hallar la cantidad total",
    firstLabel: "Cantidad parcial",
    firstPlaceholder: "Ej: 30",
    secondLabel: "Porcentaje que representa",
    secondPlaceholder: "Ej: 20",
  },
  {
    id: "change",
    label: "Variación porcentual",
    firstLabel: "Valor inicial",
    firstPlaceholder: "Ej: 100",
    secondLabel: "Valor final",
    secondPlaceholder: "Ej: 120",
  },
];

const numberFormatter = new Intl.NumberFormat("es-ES", {
  maximumSignificantDigits: 12,
  useGrouping: true,
});

export default function CalculadoraPorcentajesClient() {
  const [mode, setMode] = useState<CalculationMode>("percentageOf");
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");

  const selectedMode = modes.find((item) => item.id === mode) ?? modes[0];
  const firstNumber = Number(firstValue);
  const secondNumber = Number(secondValue);
  const hasBothValues = Boolean(firstValue && secondValue);

  const firstError = (() => {
    if (!hasBothValues) return null;
    if (!Number.isFinite(firstNumber)) {
      return "El primer valor debe ser un número finito dentro del rango admitido.";
    }
    if (mode === "change" && firstNumber <= 0) {
      return "El valor inicial debe ser mayor que cero para calcular una variación porcentual.";
    }
    return null;
  })();
  const secondError = (() => {
    if (!hasBothValues) return null;
    if (!Number.isFinite(secondNumber)) {
      return "El segundo valor debe ser un número finito dentro del rango admitido.";
    }
    if (mode === "proportion" && secondNumber === 0) {
      return "La cantidad total no puede ser cero.";
    }
    if (mode === "findBase" && secondNumber === 0) {
      return "El porcentaje no puede ser cero para hallar la cantidad total.";
    }
    return null;
  })();
  const inputError = firstError ?? secondError;

  const result = (() => {
    if (!hasBothValues || inputError) return null;
    const calculated = mode === "percentageOf"
      ? secondNumber * (firstNumber / 100)
      : mode === "proportion"
        ? (firstNumber / secondNumber) * 100
        : mode === "findBase"
          ? (firstNumber / secondNumber) * 100
          : ((secondNumber - firstNumber) / firstNumber) * 100;
    return Number.isFinite(calculated) ? calculated : null;
  })();

  const calculationError = inputError ?? (
    hasBothValues && result === null
      ? "El resultado queda fuera del rango que puede calcular el navegador."
      : null
  );

  const resultLabel = result === null
    ? calculationError ? "Sin resultado" : "Completa los dos valores"
    : `${mode === "change" && result > 0 ? "+" : ""}${numberFormatter.format(result)}${mode === "proportion" || mode === "change" ? "%" : ""}`;

  const changeMode = (nextMode: CalculationMode) => {
    setMode(nextMode);
    setFirstValue("");
    setSecondValue("");
  };

  return (
    <>
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100/50 rounded-3xl mb-6 border border-blue-50 shadow-sm">
          <Percent className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Calculadora de <span className="text-blue-600">Porcentajes</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          Calcula un porcentaje, descubre qué proporción representa un valor, halla el total o mide una variación.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-[40px] shadow-2xl p-8 sm:p-12 border border-slate-100 flex flex-col gap-6 mb-12">
        <div role="group" aria-label="Tipo de cálculo" className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-2">
          {modes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => changeMode(item.id)}
              aria-pressed={mode === item.id}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition ${mode === item.id ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="percentage-first-value" className="block text-sm sm:text-base font-bold text-slate-700 mb-2">
                {selectedMode.firstLabel}
              </label>
              <div className="relative flex items-center">
                <input
                  id="percentage-first-value"
                  inputMode="decimal"
                  type="number"
                  value={firstValue}
                  onChange={(event) => setFirstValue(event.target.value)}
                  aria-describedby={firstError ? "percentage-error" : undefined}
                  aria-invalid={Boolean(firstError)}
                  className="w-full border-2 border-slate-200 rounded-2xl p-4 text-xl font-bold text-slate-900 bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                  placeholder={selectedMode.firstPlaceholder}
                />
                {mode === "percentageOf" && <span className="absolute right-6 text-slate-400 font-black text-xl select-none pointer-events-none">%</span>}
              </div>
            </div>

            <div>
              <label htmlFor="percentage-second-value" className="block text-sm sm:text-base font-bold text-slate-700 mb-2">
                {selectedMode.secondLabel}
              </label>
              <input
                id="percentage-second-value"
                inputMode="decimal"
                type="number"
                value={secondValue}
                onChange={(event) => setSecondValue(event.target.value)}
                aria-describedby={secondError ? "percentage-error" : undefined}
                aria-invalid={Boolean(secondError)}
                className="w-full border-2 border-slate-200 rounded-2xl p-4 text-xl font-bold text-slate-900 bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                placeholder={selectedMode.secondPlaceholder}
              />
            </div>
          </div>

          <p id="percentage-error" role={calculationError ? "alert" : undefined} className={`min-h-5 text-sm font-semibold ${calculationError ? "text-rose-600" : "text-slate-400"}`}>
            {calculationError ?? (
              mode === "percentageOf"
                ? "Fórmula: cantidad × porcentaje ÷ 100."
                : mode === "proportion"
                  ? "Fórmula: cantidad parcial ÷ cantidad total × 100."
                  : mode === "findBase"
                    ? "Fórmula: cantidad parcial ÷ porcentaje × 100."
                  : "Fórmula: (valor final − valor inicial) ÷ valor inicial × 100."
            )}
          </p>

          <div className="mt-6 pt-8 border-t border-slate-100">
            <p className="text-sm font-bold text-slate-400 text-center mb-4 uppercase tracking-widest">
              Resultado
            </p>
            <div className="p-8 bg-blue-50 rounded-[32px] border border-blue-100 flex items-center justify-center min-h-[8rem] shadow-sm" role="status" aria-live="polite">
              <p className={`font-black text-blue-700 text-center break-words ${result === null ? "text-2xl" : "text-4xl sm:text-6xl"}`}>
                {resultLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full max-w-3xl prose prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-800 px-4 text-slate-600 prose-a:text-blue-600">
        <h2>Cómo calcular porcentajes</h2>
        <p>
          Puedes calcular cuánto es un porcentaje de una cantidad, qué porcentaje representa una parte sobre el total, hallar la cantidad total a partir de una parte y medir cuánto ha variado un valor entre dos momentos. Cada operación usa una base distinta, por eso conviene elegir primero el tipo de cálculo.
        </p>

        <h2>Casos prácticos en los que te puede ayudar</h2>
        <ul>
          <li><strong>Rebajas e IVA:</strong> calcula el importe correspondiente a un porcentaje sobre un precio.</li>
          <li><strong>Proporciones:</strong> descubre qué porcentaje representa 25 sobre un total de 200.</li>
          <li><strong>Cantidad total:</strong> averigua de qué total es 30 el 20%.</li>
          <li><strong>Variaciones:</strong> mide la subida o bajada entre un valor inicial y otro final.</li>
          <li><strong>Trabajo y ventas:</strong> estima comisiones, márgenes o aumentos porcentuales.</li>
        </ul>

        <p>
          Si necesitas añadir o quitar IVA con desglose completo o calcular el precio final de unas rebajas, usa las herramientas especializadas enlazadas a continuación.
        </p>

        <h2>Preguntas frecuentes</h2>
        <details className="group open:bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 focus:outline-none [&::-webkit-details-marker]:hidden">
            <span>¿Cómo sé qué porcentaje representa una cantidad?</span>
            <Plus className="h-5 w-5 shrink-0 text-blue-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0 text-slate-600">Divide la cantidad parcial entre el total y multiplica por 100. Por ejemplo, 25 entre 200 equivale al 12,5%.</p>
        </details>
        <details className="group open:bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 focus:outline-none [&::-webkit-details-marker]:hidden">
            <span>¿Cómo calculo una subida o bajada porcentual?</span>
            <Plus className="h-5 w-5 shrink-0 text-blue-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0 text-slate-600">Resta el valor inicial al final, divide la diferencia entre el valor inicial y multiplica por 100. De 100 a 120 hay una subida del 20%.</p>
        </details>
        <details className="group open:bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 transition-colors">
          <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 focus:outline-none [&::-webkit-details-marker]:hidden">
            <span>¿Cómo hallo el total si conozco una parte y su porcentaje?</span>
            <Plus className="h-5 w-5 shrink-0 text-blue-500 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-4 mb-0 text-slate-600">Divide la cantidad parcial entre el porcentaje y multiplica por 100. Si 30 representa el 20%, la cantidad total es 150.</p>
        </details>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/calculadora-iva">Calculadora de IVA</Link></li>
          <li><Link href="/calculadora-descuentos">Calculadora de descuentos</Link></li>
          <li><Link href="/calculadora-sueldo-neto">Calculadora sueldo neto</Link></li>
          <li><Link href="/calculadora-dias">Calculadora de días exactos</Link></li>
        </ul>
      </section>
    </>
  );
}
