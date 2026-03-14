import React from 'react';
import type { Metadata } from 'next';
import CalculadoraIVAClient from '@/components/tools/CalculadoraIVAClient';

export const metadata: Metadata = {
  title: 'Calculadora de IVA Online — Añadir o Quitar IVA Fácil',
  description: 'Calcula el IVA (21%, 10%, 4%) de cualquier importe. Extrae la base imponible o añade el impuesto de forma rápida y gratuita.',
  alternates: {
    canonical: 'https://cajautil.com/calculadora-iva',
  },
};

export default function CalculadoraIVA() {
  return <CalculadoraIVAClient />;
}
