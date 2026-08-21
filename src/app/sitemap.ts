import type { MetadataRoute } from 'next';

import { isLowValueTool } from '@/lib/adsenseReadiness';
import { editorialArticles } from '@/lib/editorialArticles';

const SITE_URL = 'https://cajautil.com';

const toolDefinitions = [
  ['calculadora-interes-compuesto', 'monthly', 0.9, '2026-08-20T23:40:10.000Z'],
  ['extractor-colores', 'monthly', 0.9, '2026-08-20T20:44:39.000Z'],
  ['temporizador', 'monthly', 0.9, '2026-08-20T21:54:24.000Z'],
  ['calculadora-descuentos', 'monthly', 0.9, '2026-08-20T21:45:00.000Z'],
  ['ruleta-aleatoria', 'monthly', 0.9],
  ['calculadora-regla-de-tres', 'monthly', 0.9, '2026-08-20T20:58:50.000Z'],
  ['generador-letras-raras', 'monthly', 0.9],
  ['compresor-webp', 'monthly', 0.9, '2026-08-20T23:40:10.000Z'],
  ['calculadora-hipotecas', 'monthly', 0.9, '2026-08-20T23:53:43.000Z'],
  ['generador-enlace-whatsapp', 'monthly', 0.9, '2026-08-20T22:38:27.000Z'],
  ['calculadora-imc', 'monthly', 0.9, '2026-08-21T01:11:34.000Z'],
  ['calculadora-porcentajes', 'monthly', 0.9, '2026-08-20T22:23:43.000Z'],
  ['calculadora-iva', 'monthly', 0.9, '2026-08-21T00:36:37.000Z'],
  ['calculadora-sueldo-neto', 'yearly', 0.9, '2026-08-20T23:40:10.000Z'],
  ['validador-iban', 'monthly', 0.9, '2026-08-21T01:00:00.000Z'],
  ['generador-nombres', 'monthly', 0.8],
  ['contador-de-palabras', 'monthly', 0.8, '2026-08-21T00:25:43.000Z'],
  ['generador-contrasenas', 'monthly', 0.8, '2026-08-21T08:15:31.000Z'],
  ['mayusculas-minusculas', 'monthly', 0.7, '2026-08-20T22:10:06.000Z'],
  ['generador-qr', 'monthly', 0.8, '2026-08-20T23:40:10.000Z'],
  ['lector-qr', 'monthly', 0.7, '2026-08-20T23:40:10.000Z'],
  ['calculadora-dias', 'monthly', 0.7, '2026-08-20T20:37:15.000Z'],
  ['traductor-binario', 'monthly', 0.9],
  ['calculadora-edad', 'monthly', 0.9, '2026-08-20T22:50:49.000Z'],
  ['simbolos-copiar', 'monthly', 0.9],
  ['texto-invisible', 'monthly', 0.9],
  ['cps-test', 'monthly', 0.9],
  ['generador-lorem-ipsum', 'monthly', 0.8],
  ['conversor-unidades', 'monthly', 0.9, '2026-08-21T00:11:03.000Z'],
  ['calculadora-calorias', 'monthly', 0.9, '2026-08-21T00:48:11.000Z'],
  ['generador-hashtags', 'monthly', 0.9],
  ['calculadora-prestamos', 'monthly', 0.9, '2026-08-20T23:40:10.000Z'],
  ['generador-firmas-email', 'monthly', 0.9, '2026-08-20T21:25:29.000Z'],
  ['cronometro', 'monthly', 0.9, '2026-08-20T22:03:17.000Z'],
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const latestArticleUpdate = new Date(
    Math.max(...editorialArticles.map((article) => new Date(article.updatedAt).getTime())),
  );
  const toolEntries = toolDefinitions
    .filter(([slug]) => !isLowValueTool(slug))
    .map(([slug, changeFrequency, priority, lastModified]) => ({
      url: `${SITE_URL}/${slug}`,
      ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
      changeFrequency,
      priority,
    }));

  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/articulos`, lastModified: latestArticleUpdate, changeFrequency: 'weekly', priority: 0.9 },
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
