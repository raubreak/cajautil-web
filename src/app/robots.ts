import { MetadataRoute } from 'next'

const SITE_URL = 'https://cajautil.com';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/revision-seo', '/articulos/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/articulos/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
