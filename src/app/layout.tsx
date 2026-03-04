import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Utilidades Web - Herramientas y Calculadoras Gratuitas Rápidas",
    template: "%s | Utilidades Web"
  },
  description: "Tu navaja suiza digital. Calculadoras de porcentajes, sueldo neto, generadores de contraseñas, contadores de palabras y más. Gratis y sin instalación.",
  keywords: ["herramientas web", "calculadora online", "contador de palabras", "calcular iva", "generar qr"],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Utilidades Web"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <nav className="w-full bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-black tracking-tighter text-slate-800 hover:opacity-80 transition-opacity">
              Utilidades<span className="text-blue-600">Web</span>
            </Link>
          </div>
        </nav>
        <div className="flex-grow flex flex-col">
          {children}
        </div>
        <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm">
            <p>© {new Date().getFullYear()} Utilidades Web. Todas las herramientas son de uso gratuito.</p>
            <p className="mt-2 text-slate-500">Hecho para agilizar tu día a día de forma segura y en tu navegador.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
