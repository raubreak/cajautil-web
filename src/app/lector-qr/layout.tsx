import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lector de Códigos QR Online | Extraer texto de imagen",
  description: "Sube una foto de un código QR y lee su contenido al instante. 100% privado y seguro, la imagen no sale de tu navegador."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
