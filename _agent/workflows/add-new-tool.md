---
description: Cómo añadir una nueva herramienta a CajaUtil con todo el SEO (JSON-LD, Sitemap, etc.)
---

Cuando el usuario pida añadir una nueva herramienta web a CajaUtil.com, debes seguir obligatoriamente este checklist paso a paso para asegurar que el proyecto mantiene su 100% de optimización SEO On-Page, enrutado y coherencia visual:

1. **Crear Layout con Metadata y JSON-LD (`src/app/[slug-herramienta]/layout.tsx`)**
   - Asegúrate de importar `type { Metadata } from 'next'`.
   - Incluye `title`, `description` (muy atractiva para CTR) y un array de `keywords` muy conciso.
   - Define el `canonical` y las etiquetas `openGraph` correspondientes con título y descripción.
   - Escribe el código de **Schema.org** (JSON-LD) designando el tipo (ej: `WebApplication`, `UtilityApplication` o `FinanceApplication`).
   - El layout debe renderizar e inyectar el JSON-LD al `<head>` del DOM usando un `<script type="application/ld+json" dangerouslySetInnerHTML="..." />`.

2. **Crear Página Cliente (Interfaz + Contenido) (`src/app/[slug-herramienta]/page.tsx`)**
   - Debe empezar con `"use client"` si tiene formularios, validadores o botones.
   - Usar el sistema de diseño actual (iconos grandes de `lucide-react`, paletas de colores consistentes en gradientes de Tailwind `from-x to-y`, bordes e inputs limpios).
   - Incluir **"SEO & CONTENT SECTION"**: Al acabar la calculadora, añadir una sección semántica (`<section>`) insertando información valiosa de long-tail (`<h2>`, `<h3>` y `<p>`).
   - Incluir **"FAQ SECTION"**: Preguntas Frecuentes montadas sobre la etiqueta nativa `<details>` / `<summary>`, para forzar la aparición de Snippets de Preguntas en Google y resolver la intención del usuario.
   - Meter **Link Building Interno**: Insertar enlaces de `next/link` de otras de nuestras herramientas dentro del cuerpo del texto o del sidebar simulado de la página.

3. **Inyectarlo en el Root Layout y Menús (`src/app/layout.tsx`)**
   - Añadir en el archivo principal el nombre y la url de la herramienta dentro del array general `herramientasNav` (sobre la línea ~107).
   - En el **Footer Inferior**, introducir un nuevo elemento de lista (`<li><Link...`) bajo la categoría que mejor le encaje (Calculadoras, Texto, Utilidades Generales).

4. **Actualizar Catálogo de la Portada Principal (`src/app/page.tsx`)**
   - Añadir el campo de búsqueda/keywords de la herramienta al array superior `keywords` del objeto de metadata.
   - Modificar el objeto JSON-LD general (`itemListJsonLd`). Hay que subir una posición a `numberOfItems` e inyectar el nuevo string `{ "@type": "ListItem", position: X, ... }`.
   - Añadir la carta visual de la herramienta al componente `<main>`, agregándola al array nativo que renderiza las tarjetas (`titulo`, `descripcion`, `ruta`, `Icono`, y su gradiente tailwind en `color`).

5. **Añadir al Mapa del Sitio (`src/app/sitemap.ts`)**
   - Crear una nueva entrada en el retorno del sitemap para darle visibilidad de rastreo automático al los bots (Googlebot). Usar `<priority: 0.9>` y `<changeFrequency: 'monthly'>` por defecto.

6. **Revisar Compilación y Push (Git)**
   - Tras programarlo, asegúrate de correr `npm run build` en el terminal de background.
   - Si compila bien el Next.js SSG y no rompe rutas, envía la subida a producción lanzando `git add`, `git commit` y `git push`. Vercel lo desplegará autónomamente.
