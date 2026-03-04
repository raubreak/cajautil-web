import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generador de Códigos QR Gratis",
  description: "Crea códigos QR personalizados para URLs, textos, o tarjetas de visita al instante. Descargables en alta resolución."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
