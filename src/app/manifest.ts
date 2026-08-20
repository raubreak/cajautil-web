import type { MetadataRoute } from 'next';
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CajaUtil.com - Herramientas Online Gratis',
    short_name: 'CajaUtil',
    description: 'Calculadoras, generadores y conversores gratuitos directamente en tu navegador.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/pwa-icons/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-icons/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
