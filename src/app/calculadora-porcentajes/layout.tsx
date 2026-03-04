import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Porcentajes Online Rápida",
  description: "Calcula porcentajes, descuentos, IVA e incrementos fácil y gratis en tu navegador. Ideal para compras y matemáticas 2026."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
