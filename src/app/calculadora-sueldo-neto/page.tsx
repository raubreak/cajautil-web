import type { Metadata } from 'next';
import CalculadoraSueldoNetoClient from "@/components/tools/CalculadoraSueldoNetoClient";

export const metadata: Metadata = {
  title: 'Calculadora de Sueldo Neto 2024 — Calcular Salario Mensual',
  description: 'Calcula tu sueldo neto mensual y anual a partir del bruto. Incluye retenciones de IRPF y seguridad social actualizadas para 2024.',
  alternates: {
    canonical: 'https://cajautil.com/calculadora-sueldo-neto',
  },
};

export default function CalculadoraSueldo() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <CalculadoraSueldoNetoClient />
    </main>
  );
}
