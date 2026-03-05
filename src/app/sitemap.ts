import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://utilidades-web.vercel.app';
  const routes = [
    '',
    '/calculadora-porcentajes',
    '/contador-de-palabras',
    '/calculadora-sueldo-neto',
    '/generador-contrasenas',
    '/mayusculas-minusculas',
    '/generador-qr',
    '/lector-qr',
    '/calculadora-dias'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
