import type { Metadata } from "next";

const SITE_URL = "https://cajautil.com";

export const metadata: Metadata = {
  title: "Generador de Contraseñas Seguras — Aleatorias y Offline",
  description: "Genera contraseñas seguras, aleatorias e imposibles de hackear con un solo clic. Configura longitud, mayúsculas, números y símbolos. 100% offline y privado: la contraseña nunca sale de tu navegador.",
  keywords: [
    "generador de contraseñas",
    "contraseña segura",
    "generar contraseña aleatoria",
    "generador de claves",
    "contraseña fuerte",
    "crear contraseña segura",
    "generador contraseñas online",
    "password generator",
  ],
  alternates: {
    canonical: `${SITE_URL}/generador-contrasenas`,
  },
  openGraph: {
    title: "Generador de Contraseñas Seguras Online",
    description: "Crea contraseñas robustas e imposibles de adivinar. 100% offline y gratis.",
    url: `${SITE_URL}/generador-contrasenas`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generador de Contraseñas Seguras",
  url: `${SITE_URL}/generador-contrasenas`,
  description: "Genera contraseñas seguras y aleatorias directamente en tu navegador.",
  applicationCategory: "SecurityApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  browserRequirements: "Requires JavaScript. Requires HTML5.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
