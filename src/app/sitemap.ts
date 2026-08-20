import type { MetadataRoute } from 'next';

import { isLowValueTool } from '@/lib/adsenseReadiness';
import { editorialArticles } from '@/lib/editorialArticles';

const SITE_URL = 'https://cajautil.com';

const toolDefinitions = [
  ['calculadora-interes-compuesto', 'monthly', 0.9],
  ['extractor-colores', 'monthly', 0.9],
  ['temporizador', 'monthly', 0.9],
  ['calculadora-descuentos', 'monthly', 0.9],
  ['ruleta-aleatoria', 'monthly', 0.9],
  ['calculadora-regla-de-tres', 'monthly', 0.9],
  ['generador-letras-raras', 'monthly', 0.9],
  ['compresor-webp', 'monthly', 0.9],
  ['calculadora-hipotecas', 'monthly', 0.9],
  ['generador-enlace-whatsapp', 'monthly', 0.9],
  ['calculadora-imc', 'monthly', 0.9],
  ['calculadora-porcentajes', 'monthly', 0.9],
  ['calculadora-iva', 'monthly', 0.9],
  ['calculadora-sueldo-neto', 'yearly', 0.9],
  ['validador-iban', 'monthly', 0.9],
  ['generador-nombres', 'monthly', 0.8],
  ['contador-de-palabras', 'monthly', 0.8],
  ['generador-contrasenas', 'monthly', 0.8],
  ['mayusculas-minusculas', 'monthly', 0.7],
  ['generador-qr', 'monthly', 0.8],
  ['lector-qr', 'monthly', 0.7],
  ['calculadora-dias', 'monthly', 0.7],
  ['traductor-binario', 'monthly', 0.9],
  ['calculadora-edad', 'monthly', 0.9],
  ['simbolos-copiar', 'monthly', 0.9],
  ['texto-invisible', 'monthly', 0.9],
  ['cps-test', 'monthly', 0.9],
  ['generador-lorem-ipsum', 'monthly', 0.8],
  ['conversor-unidades', 'monthly', 0.9],
  ['calculadora-calorias', 'monthly', 0.9],
  ['generador-hashtags', 'monthly', 0.9],
  ['calculadora-prestamos', 'monthly', 0.9],
  ['generador-firmas-email', 'monthly', 0.9],
  ['cronometro', 'monthly', 0.9],
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const toolEntries = toolDefinitions
    .filter(([slug]) => !isLowValueTool(slug))
    .map(([slug, changeFrequency, priority]) => ({
      url: `${SITE_URL}/${slug}`,
      changeFrequency,
      priority,
    }));

  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/articulos`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/sobre-nosotros`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contacto`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/politica-de-privacidad`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/politica-de-cookies`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/aviso-legal`, changeFrequency: 'yearly', priority: 0.4 },
    ...toolEntries,
    ...editorialArticles.map((article) => ({
      url: `${SITE_URL}/articulos/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
