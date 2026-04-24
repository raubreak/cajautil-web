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
          WebP es un formato de imagen desarrollado por Google que ofrece una compresion superior a JPG y PNG
          manteniendo una calidad visual excelente para la mayoria de usos web. En promedio, un archivo WebP
          pesa entre un 25% y un 34% menos que un JPEG equivalente y hasta un 26% menos que un PNG.
        </p>
        <p>
          Reducir el peso de las imágenes tiene un impacto directo en la velocidad de carga de tu página web,
          mejora la experiencia de usuario en dispositivos moviles y puede contribuir positivamente al posicionamiento
          en buscadores, ya que Google valora las metricas de Core Web Vitals como el LCP (Largest Contentful Paint).
        </p>

        <h2>Cómo funciona nuestro compresor</h2>
        <p>
          Esta herramienta utiliza la API Canvas del navegador para convertir tus imagenes a formato WebP
          directamente en tu dispositivo. El proceso es el siguiente:
        </p>
        <ol>
          <li><strong>Selecciona o arrastra</strong> una o varias imagenes en formato JPG, PNG o GIF.</li>
          <li>El navegador lee el archivo y lo dibuja en un elemento Canvas interno.</li>
          <li>Se exporta como WebP con el nivel de calidad que elijas (normalmente entre 75% y 85% es optimo).</li>
          <li><strong>Descarga el resultado</strong> directamente. No se sube nada a ningun servidor.</li>
        </ol>

        <h2>Cuando usar este compresor online</h2>
        <ul>
          <li><strong>Antes de subir imagenes</strong> a una web, blog o tienda online para mejorar la velocidad de carga.</li>
          <li><strong>Para preparar recursos</strong> de newsletters, portfolios o landing pages.</li>
          <li><strong>Para optimizar en lote</strong> varias fotos sin instalar programas como Photoshop o GIMP.</li>
          <li><strong>Para redes sociales</strong> cuando necesitas imágenes más ligeras sin perder calidad perceptible.</li>
        </ul>

        <h2>Compatibilidad de WebP</h2>
        <p>
          WebP es compatible con todos los navegadores modernos: Chrome, Firefox, Edge, Safari (desde la version 14)
          y Opera. Para entornos más antiguos que no lo soporten, es buena práctica mantener una copia en JPG como
          fallback utilizando la etiqueta <code>&lt;picture&gt;</code> de HTML.
        </p>

        <h2>Privacidad y limites</h2>
        <p>
          Esta utilidad procesa los archivos integramente en tu navegador, sin enviar datos a servidores externos.
          El rendimiento depende de la capacidad del dispositivo: en móviles antiguos, imágenes muy grandes (más de
          10 MP) pueden tardar algo más. Revisa siempre la calidad final y el peso resultante antes de publicar
          en un proyecto profesional.
        </p>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/extractor-colores">Extractor de colores de imagen</Link></li>
          <li><Link href="/generador-qr">Generador de codigos QR</Link></li>
          <li><Link href="/generador-firmas-email">Generador de firmas de email</Link></li>
        </ul>
      </section>
    </>
  );
}
