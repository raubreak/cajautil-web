import React from 'react';
import type { Metadata } from 'next';
import CompresorWebPClient from '@/components/tools/CompresorWebPClient';

export const metadata: Metadata = {
  title: 'Convertir a WebP Online — Compresor de Imágenes Gratis',
  description: 'Comprime y convierte tus fotos a WebP sin subirlas al servidor. Mejora la velocidad de tu web con un procesado 100% local y seguro.',
  alternates: {
    canonical: 'https://cajautil.com/compresor-webp',
  },
};

export default function CompresorWebP() {
  return <CompresorWebPClient />;
}
