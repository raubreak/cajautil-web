import type { NextConfig } from "next";

const legacyVariantGroups = [
  {
    destination: '/calculadora-sueldo-neto',
    slugs: [
      'calculadora-sueldo-neto-la-rioja',
      'calculadora-sueldo-neto-cantabria',
      'calculadora-sueldo-neto-navarra',
      'calculadora-sueldo-neto-asturias',
      'calculadora-sueldo-neto-extremadura',
      'calculadora-sueldo-neto-islas-baleares',
      'calculadora-sueldo-neto-aragon',
      'calculadora-sueldo-neto-region-de-murcia',
      'calculadora-sueldo-neto-castilla-la-mancha',
      'calculadora-sueldo-neto-castilla-y-leon',
      'calculadora-sueldo-neto-canarias',
      'calculadora-sueldo-neto-pais-vasco',
      'calculadora-sueldo-neto-comunidad-valenciana',
      'calculadora-sueldo-neto-galicia',
      'calculadora-sueldo-neto-andalucia',
      'calculadora-sueldo-neto-cataluna',
      'calculadora-sueldo-neto-madrid',
    ],
  },
  {
    destination: '/calculadora-iva',
    slugs: [
      'calculadora-iva-vehiculos-hibridos-y-electricos',
      'calculadora-iva-dietas-y-gastos-de-viaje',
      'calculadora-iva-exportaciones-e-importaciones',
      'calculadora-iva-artistas-y-creadores-de-contenido',
      'calculadora-iva-alquiler-de-locales-comerciales',
      'calculadora-iva-productos-alimenticios-basicos',
      'calculadora-iva-canarias-igic',
      'calculadora-iva-servicios-digitales',
      'calculadora-iva-hosteleria',
      'calculadora-iva-obras-y-reformas',
      'calculadora-iva-vivienda-nueva',
      'calculadora-iva-coches-de-segunda-mano',
      'calculadora-iva-facturas',
      'calculadora-iva-autonomos',
    ],
  },
  {
    destination: '/calculadora-prestamos',
    slugs: [
      'calculadora-prestamos-reunificacion-de-deudas',
      'calculadora-prestamos-autonomos',
      'calculadora-prestamos-tratamiento-dental',
      'calculadora-prestamos-muebles',
      'calculadora-prestamos-bodas-y-celebraciones',
      'calculadora-prestamos-viajes',
      'calculadora-prestamos-estudios-universitarios',
      'calculadora-prestamos-reformas-integrales',
      'calculadora-prestamos-coche-segunda-mano',
      'calculadora-prestamos-coche-nuevo',
      'calculadora-prestamos-reformas',
      'calculadora-prestamos-coche',
    ],
  },
] as const;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
  async redirects() {
    return legacyVariantGroups.flatMap(({ destination, slugs }) =>
      slugs.map((slug) => ({
        source: `/${slug}`,
        destination,
        permanent: true,
      })),
    );
  },
};

export default nextConfig;
