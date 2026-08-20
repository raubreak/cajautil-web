"use client";

import { usePathname } from 'next/navigation';

import ToolEditorialSection from '@/components/ToolEditorialSection';
import { toolEditorialContent } from '@/lib/toolEditorialContent';

const toolsWithLocalEditorial = new Set([
  'calculadora-calorias',
  'calculadora-descuentos',
  'calculadora-dias',
  'calculadora-hipotecas',
  'calculadora-imc',
  'calculadora-iva',
  'calculadora-porcentajes',
  'calculadora-prestamos',
  'calculadora-regla-de-tres',
  'calculadora-sueldo-neto',
  'compresor-webp',
  'contador-de-palabras',
  'cps-test',
  'extractor-colores',
  'generador-contrasenas',
  'generador-enlace-whatsapp',
  'generador-letras-raras',
  'generador-nombres',
  'generador-qr',
  'lector-qr',
  'mayusculas-minusculas',
  'validador-iban',
]);

export default function ToolEditorialRouterSection() {
  const pathname = usePathname();

  if (!pathname || pathname === '/') {
    return null;
  }

  const slug = pathname.replace(/^\//, '');

  if (slug.includes('/') || !(slug in toolEditorialContent)) {
    return null;
  }

  return <ToolEditorialSection slug={slug} compact={toolsWithLocalEditorial.has(slug)} />;
}
