import React from 'react';
import type { Metadata } from 'next';
import CompresorWebPClient from '@/components/tools/CompresorWebPClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Convertir a WebP Online — Compresor de Imágenes Gratis',
  description: 'Comprime y convierte tus fotos a WebP sin subirlas al servidor. Mejora la velocidad de tu web con un procesado 100% local y seguro.',
  alternates: {
    canonical: 'https://cajautil.com/compresor-webp',
  },
};

export default function CompresorWebP() {
  return (
    <>
      <CompresorWebPClient />

      <section className="mx-auto mb-16 w-full max-w-4xl px-6 prose prose-slate prose-headings:text-slate-800 text-slate-600">
        <h2>Por que convertir imagenes a WebP</h2>
        <p>
          WebP suele ofrecer archivos mas ligeros que JPG o PNG manteniendo una calidad visual valida para la mayoria de usos web.
          Reducir el peso de las imagenes ayuda a mejorar tiempos de carga, experiencia movil y rendimiento general de la pagina.
        </p>

        <h2>Cuando usar este compresor online</h2>
        <ul>
          <li><strong>Antes de subir imagenes</strong> a una web, blog o tienda online.</li>
          <li><strong>Para preparar recursos</strong> de newsletters, portfolios o landing pages.</li>
          <li><strong>Para optimizar en lote</strong> varias fotos sin instalar programas.</li>
        </ul>

        <h2>Privacidad y limites</h2>
        <p>
          Esta utilidad procesa los archivos en tu navegador siempre que el dispositivo lo permita. Aun asi, conviene revisar manualmente la calidad final,
          el peso resultante y la compatibilidad que necesitas antes de publicar las imagenes en un proyecto profesional.
        </p>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/extractor-colores">Extractor de colores</Link></li>
          <li><Link href="/generador-qr">Generador de codigos QR</Link></li>
        </ul>
      </section>
    </>
  );
}
