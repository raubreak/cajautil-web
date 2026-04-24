"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { isLowValueTool } from '@/lib/adsenseReadiness';

const TOOLS = [
  { nombre: "Calculadora de Sueldo Neto", ruta: "/calculadora-sueldo-neto", tags: "sueldo neto bruto irpf seguridad social salario nomina" },
  { nombre: "Calculadora de IVA", ruta: "/calculadora-iva", tags: "iva impuestos base imponible cuota" },
  { nombre: "Calculadora de Porcentajes", ruta: "/calculadora-porcentajes", tags: "porcentaje tanto por ciento descuento propina" },
  { nombre: "Generador Link WhatsApp", ruta: "/generador-enlace-whatsapp", tags: "whatsapp link enlace mensaje directo wa.me" },
  { nombre: "Calculadora de Hipotecas", ruta: "/calculadora-hipotecas", tags: "hipoteca prestamo cuota mensual amortizacion interes" },
  { nombre: "Contador de Palabras", ruta: "/contador-de-palabras", tags: "palabras caracteres texto contar letras" },
  { nombre: "Regla de 3", ruta: "/calculadora-regla-de-tres", tags: "regla de tres proporcion directa inversa matematicas" },
  { nombre: "Calculadora de Descuentos", ruta: "/calculadora-descuentos", tags: "descuento rebajas precio final ahorro oferta" },
  { nombre: "Calculadora de IMC", ruta: "/calculadora-imc", tags: "imc indice masa corporal peso altura bmi" },
  { nombre: "Compresor WebP", ruta: "/compresor-webp", tags: "comprimir imagen webp jpg png foto reducir" },
  { nombre: "Generador de QR", ruta: "/generador-qr", tags: "qr codigo url texto generar descargar" },
  { nombre: "Lector de QR", ruta: "/lector-qr", tags: "leer qr escanear codigo" },
  { nombre: "Extractor de Colores", ruta: "/extractor-colores", tags: "color paleta hex rgb imagen foto diseño" },
  { nombre: "Temporizador y Cronómetro", ruta: "/temporizador", tags: "temporizador cronometro timer alarma cuenta atras" },
  { nombre: "Ruleta Aleatoria", ruta: "/ruleta-aleatoria", tags: "ruleta sorteo aleatorio girar decisiones" },
  { nombre: "Generador de Letras Raras", ruta: "/generador-letras-raras", tags: "letras raras instagram fuentes goticas esteticas bio tiktok" },
  { nombre: "Mayúsculas y Minúsculas", ruta: "/mayusculas-minusculas", tags: "mayusculas minusculas convertir texto capitalizar" },
  { nombre: "Generador de Contraseñas", ruta: "/generador-contrasenas", tags: "contraseña password segura aleatoria generar" },
  { nombre: "Generador de Nombres", ruta: "/generador-nombres", tags: "nombres aleatorios personajes masculinos femeninos apellidos" },
  { nombre: "Validador de IBAN", ruta: "/validador-iban", tags: "iban banco cuenta validar verificar" },
  { nombre: "Calculadora de Días", ruta: "/calculadora-dias", tags: "dias entre fechas diferencia semanas meses" },
  { nombre: "Traductor Binario", ruta: "/traductor-binario", tags: "binario morse hexadecimal codigo convertir texto" },
  { nombre: "Símbolos para Copiar", ruta: "/simbolos-copiar", tags: "simbolos copiar pegar corazones estrellas emojis signos" },
  { nombre: "Texto Invisible", ruta: "/texto-invisible", tags: "texto invisible unicode whatsapp vacio caracter" },
  { nombre: "CPS Test", ruta: "/cps-test", tags: "cps clicks por segundo test velocidad gaming" },
  { nombre: "Calculadora de Edad", ruta: "/calculadora-edad", tags: "edad exacta cumpleaños dias vividos horas" },
  { nombre: "Generador Lorem Ipsum", ruta: "/generador-lorem-ipsum", tags: "lorem ipsum texto relleno prueba dummy parrafo" },
  { nombre: "Conversor de Unidades", ruta: "/conversor-unidades", tags: "unidades convertir kg libras metros pies celsius fahrenheit" },
  { nombre: "Calculadora de Calorías", ruta: "/calculadora-calorias", tags: "calorias tdee metabolismo basal bmr fitness dieta" },
  { nombre: "Generador de Hashtags", ruta: "/generador-hashtags", tags: "hashtags instagram tiktok twitter redes sociales" },
  { nombre: "Cronómetro Online", ruta: "/cronometro", tags: "cronometro online stopwatch reloj medir tiempo vueltas" },
  { nombre: "Simulador de Préstamos", ruta: "/calculadora-prestamos", tags: "prestamo cuota mensual amortizacion frances interes banco dinero" },
  { nombre: "Firmas de Email", ruta: "/generador-firmas-email", tags: "firma email firma correo html profesional gmail outlook avatar logo" },
].filter((tool) => !isLowValueTool(tool.ruta.slice(1)));

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const results = useMemo(() => {
    if (!query.trim()) return TOOLS;
    const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return TOOLS.filter(t => {
      const haystack = `${t.nombre} ${t.tags}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return haystack.includes(q);
    });
  }, [query]);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      setIsOpen(false);
      setQuery('');
      window.location.href = results[selectedIdx].ruta;
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-all text-xs font-medium border border-slate-200"
        aria-label="Buscar herramientas"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Buscar...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-400">
          ⌘K
        </kbd>
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]" onClick={() => { setIsOpen(false); setQuery(''); }}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          
          {/* Modal */}
          <div
            className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIdx(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Buscar herramienta..."
                  className="flex-1 text-base font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none bg-transparent"
                />
              {query && (
                <button onClick={() => setQuery('')} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => { setIsOpen(false); setQuery(''); }} className="text-xs text-slate-400 font-medium px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto py-2">
              {results.length === 0 ? (
                <div className="px-5 py-10 text-center text-slate-400 text-sm">
                  No se encontraron herramientas para &quot;<span className="font-bold text-slate-600">{query}</span>&quot;
                </div>
              ) : (
                results.map((tool, i) => (
                  <Link
                    key={tool.ruta}
                    href={tool.ruta}
                    onClick={() => { setIsOpen(false); setQuery(''); }}
                    className={`flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                      i === selectedIdx ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                    onMouseEnter={() => setSelectedIdx(i)}
                  >
                    <span className={`font-semibold ${i === selectedIdx ? 'text-blue-700' : 'text-slate-700'}`}>
                      {tool.nombre}
                    </span>
                    <ArrowRight className={`w-4 h-4 ${i === selectedIdx ? 'text-blue-400' : 'text-slate-300'}`} />
                  </Link>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-4 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-mono">↑↓</kbd> Navegar</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-mono">↵</kbd> Abrir</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-mono">ESC</kbd> Cerrar</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
