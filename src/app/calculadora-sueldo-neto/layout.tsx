import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Sueldo Neto 2026 | España",
  description: "Calcula tu sueldo neto mensual a partir de tu salario bruto anual. Incluye estimaciones automáticas de IRPF y retenciones en España."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
