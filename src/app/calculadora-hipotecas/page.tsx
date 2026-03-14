import React from 'react';
import type { Metadata } from 'next';
import CalculadoraHipotecasClient from '@/components/tools/CalculadoraHipotecasClient';

export const metadata: Metadata = {
  title: 'Calculadora de Hipotecas — Simulador Online Gratis',
  description: 'Simulador de hipoteca online para calcular cuota mensual, intereses y cuadro de amortización de tu préstamo de forma rápida y gratuita.',
  alternates: {
    canonical: 'https://cajautil.com/calculadora-hipotecas',
  },
};

export default function CalculadoraHipotecas() {
  return <CalculadoraHipotecasClient />;
}
