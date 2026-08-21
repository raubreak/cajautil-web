import type { MetadataRoute } from 'next';

import { isLowValueTool } from '@/lib/adsenseReadiness';
import { editorialArticles } from '@/lib/editorialArticles';

const SITE_URL = 'https://cajautil.com';

const toolDefinitions = [
  ['calculadora-interes-compuesto', 'monthly', 0.9, '2026-08-21T11:11:30.000Z'],
  ['extractor-colores', 'monthly', 0.9, '2026-08-21T09:33:30.000Z'],
  ['temporizador', 'monthly', 0.9, '2026-08-21T09:19:29.000Z'],
  ['calculadora-descuentos', 'monthly', 0.9, '2026-08-21T08:22:34.000Z'],
  ['ruleta-aleatoria', 'monthly', 0.9],
  ['calculadora-regla-de-tres', 'monthly', 0.9, '2026-08-21T10:33:42.000Z'],
  ['generador-letras-raras', 'monthly', 0.9],
  ['compresor-webp', 'monthly', 0.9, '2026-08-21T11:11:30.000Z'],
  ['calculadora-hipotecas', 'monthly', 0.9, '2026-08-20T23:53:43.000Z'],
  ['generador-enlace-whatsapp', 'monthly', 0.9, '2026-08-21T10:39:14.000Z'],
  ['calculadora-imc', 'monthly', 0.9, '2026-08-21T11:11:30.000Z'],
  ['calculadora-porcentajes', 'monthly', 0.9, '2026-08-21T10:39:14.000Z'],
  ['calculadora-iva', 'monthly', 0.9, '2026-08-21T13:04:59.000Z'],
  ['calculadora-sueldo-neto', 'monthly', 0.9, '2026-08-21T12:05:35.000Z'],
  ['validador-iban', 'monthly', 0.9, '2026-08-21T13:37:48.000Z'],
  ['generador-nombres', 'monthly', 0.8],
  ['contador-de-palabras', 'monthly', 0.8, '2026-08-21T11:11:30.000Z'],
  ['generador-contrasenas', 'monthly', 0.8, '2026-08-21T13:51:48.000Z'],
  ['mayusculas-minusculas', 'monthly', 0.7, '2026-08-20T22:10:06.000Z'],
  ['generador-qr', 'monthly', 0.8, '2026-08-21T09:02:34.000Z'],
  ['lector-qr', 'monthly', 0.7, '2026-08-21T12:33:41.000Z'],
  ['calculadora-dias', 'monthly', 0.7, '2026-08-21T11:11:30.000Z'],
  ['traductor-binario', 'monthly', 0.9],
  ['calculadora-edad', 'monthly', 0.9, '2026-08-21T11:11:30.000Z'],
  ['simbolos-copiar', 'monthly', 0.9, '2026-08-21T10:12:56.000Z'],
  ['texto-invisible', 'monthly', 0.9],
  ['cps-test', 'monthly', 0.9],
  ['generador-lorem-ipsum', 'monthly', 0.8],
  ['conversor-unidades', 'monthly', 0.9, '2026-08-21T00:11:03.000Z'],
  ['calculadora-calorias', 'monthly', 0.9, '2026-08-21T10:33:42.000Z'],
  ['generador-hashtags', 'monthly', 0.9],
  ['calculadora-prestamos', 'monthly', 0.9, '2026-08-21T13:23:35.000Z'],
  ['generador-firmas-email', 'monthly', 0.9, '2026-08-21T10:55:31.000Z'],
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
    { url: SITE_URL, lastModified: new Date('2026-08-21T10:46:33.000Z'), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/articulos`, lastModified: latestArticleUpdate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/sobre-nosotros`, lastModified: new Date('2026-08-21T11:42:59.000Z'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contacto`, lastModified: new Date('2026-08-21T10:46:33.000Z'), changeFrequency: 'monthly', priority: 0.6 },
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
