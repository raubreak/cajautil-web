import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contador de Palabras y Caracteres Online",
  description: "Cuenta el número exacto de palabras, caracteres y estima el tiempo de lectura de tu texto al instante. Funciona offline."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
