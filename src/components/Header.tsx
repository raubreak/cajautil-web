"use client";

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { isLowValueTool } from '@/lib/adsenseReadiness';

const SearchModal = dynamic(() => import('./SearchModal'), {
  ssr: false,
  loading: () => <div className="w-24 h-8 bg-slate-100 animate-pulse rounded-xl" />
});

const herramientasNav = [
  { nombre: "Colores", ruta: "/extractor-colores" },
  { nombre: "Temporizador", ruta: "/temporizador" },
  { nombre: "Descuentos", ruta: "/calculadora-descuentos" },
  { nombre: "Ruleta", ruta: "/ruleta-aleatoria" },
  { nombre: "Binario/Morse", ruta: "/traductor-binario" },
  { nombre: "Símbolos", ruta: "/simbolos-copiar" },
  { nombre: "Texto Invisible", ruta: "/texto-invisible" },
  { nombre: "CPS Test", ruta: "/cps-test" },
  { nombre: "Edad Exacta", ruta: "/calculadora-edad" },
  { nombre: "WebP", ruta: "/compresor-webp" },
  { nombre: "Regla de 3", ruta: "/calculadora-regla-de-tres" },
  { nombre: "Hipotecas", ruta: "/calculadora-hipotecas" },
  { nombre: "Link WhatsApp", ruta: "/generador-enlace-whatsapp" },
  { nombre: "IMC", ruta: "/calculadora-imc" },
  { nombre: "Calculadora %", ruta: "/calculadora-porcentajes" },
  { nombre: "Sueldo Neto", ruta: "/calculadora-sueldo-neto" },
  { nombre: "Calculadora IVA", ruta: "/calculadora-iva" },
  { nombre: "Validador IBAN", ruta: "/validador-iban" },
  { nombre: "Contraseñas", ruta: "/generador-contrasenas" },
  { nombre: "Generador Nombres", ruta: "/generador-nombres" },
  { nombre: "Contador Palabras", ruta: "/contador-de-palabras" },
  { nombre: "Letras Raras", ruta: "/generador-letras-raras" },
  { nombre: "Mayúsculas", ruta: "/mayusculas-minusculas" },
  { nombre: "Generador QR", ruta: "/generador-qr" },
  { nombre: "Lector QR", ruta: "/lector-qr" },
  { nombre: "Calculadora Días", ruta: "/calculadora-dias" },
  { nombre: "Lorem Ipsum", ruta: "/generador-lorem-ipsum" },
  { nombre: "Unidades", ruta: "/conversor-unidades" },
  { nombre: "Calorías", ruta: "/calculadora-calorias" },
  { nombre: "Hashtags", ruta: "/generador-hashtags" },
  { nombre: "Préstamos", ruta: "/calculadora-prestamos" },
  { nombre: "Firmas Email", ruta: "/generador-firmas-email" },
  { nombre: "Cronómetro", ruta: "/cronometro" },
].filter((item) => !isLowValueTool(item.ruta.slice(1)));

export default function Header() {
  return (
    <nav className="w-full bg-white border-b border-slate-200 px-6 py-4 shadow-sm z-50 relative" aria-label="Navegación principal">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter text-slate-800 hover:opacity-80 transition-opacity" aria-label="Ir a la página de inicio">
          Caja<span className="text-blue-600">Util</span><span className="text-slate-400 text-sm font-medium">.com</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {herramientasNav.slice(0, 5).map((item) => (
            <Link 
              key={item.ruta} 
              href={item.ruta} 
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
            >
              {item.nombre}
            </Link>
          ))}
          <SearchModal />
        </div>
        <div className="md:hidden">
          <SearchModal />
        </div>
      </div>
    </nav>
  );
}
