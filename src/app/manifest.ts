import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CajaUtil.com — Herramientas Online Gratis',
    short_name: 'CajaUtil',
    description: 'Calculadoras, generadores y conversores gratuitos directamente en tu navegador.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
