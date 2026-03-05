import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Días entre Fechas Online",
  description: "Calcula la diferencia exacta de días, semanas, meses y años entre dos fechas. Ideal para proyectos, eventos y plazos."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
