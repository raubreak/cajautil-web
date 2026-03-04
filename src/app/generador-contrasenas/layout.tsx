import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generador de Contraseñas Seguras y Aleatorias",
  description: "Crea claves robustas offline con un solo clic. Configura longitud, símbolos y números para proteger tus cuentas fácilmente."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
