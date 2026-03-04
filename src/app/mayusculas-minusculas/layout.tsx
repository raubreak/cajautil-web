import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convertir Mayúsculas a Minúsculas Online",
  description: "Herramienta gratuita para cambiar texto a mayúsculas, minúsculas, capitalizar o alternar letras instantáneamente."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
