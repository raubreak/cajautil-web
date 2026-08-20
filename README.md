# CajaUtil

[CajaUtil](https://cajautil.com) reúne calculadoras, generadores, conversores y utilidades gratuitas que funcionan sin registro. El proyecto prioriza respuestas claras, procesamiento local cuando es posible y una experiencia sin publicidad intrusiva.

## Qué incluye

- Calculadoras financieras y cotidianas: sueldo neto, IVA, préstamos, hipotecas, porcentajes y fechas.
- Utilidades de texto, imágenes, códigos QR, contraseñas y conversiones.
- Guías editoriales que explican fórmulas, límites y fuentes utilizadas.
- Páginas estáticas optimizadas para móvil, accesibilidad y rastreo.

Consulta las herramientas publicadas en [cajautil.com](https://cajautil.com) y la metodología del proyecto en [Sobre CajaUtil](https://cajautil.com/sobre-nosotros).

## Privacidad y publicidad

Las herramientas procesan los datos en el navegador siempre que la operación lo permite. La publicidad de terceros permanece desactivada mientras no se puedan garantizar formatos respetuosos con el uso recurrente de las herramientas.

Los detalles sobre analítica, cookies y tratamiento de datos están disponibles en la [política de privacidad](https://cajautil.com/politica-de-privacidad) y la [política de cookies](https://cajautil.com/politica-de-cookies).

## Desarrollo local

```bash
npm ci
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Validación

```bash
npx eslint .
npx tsc --noEmit
npm run editorial:audit
npm run build
```

El repositorio no tiene todavía un framework de pruebas unitarias. Para cambios pequeños se usa lint dirigido, comprobación de tipos y la validación específica de la herramienta afectada.

## Stack

- Next.js App Router y React.
- TypeScript en modo estricto.
- Tailwind CSS.
- Prisma y PostgreSQL para contenido dinámico.
- Vercel para despliegues de producción.

## Estructura

| Ruta | Responsabilidad |
|---|---|
| `src/app/` | Páginas, metadata, sitemap y rutas API |
| `src/components/` | Interfaz y herramientas interactivas |
| `src/lib/` | Contenido editorial, SEO y servicios compartidos |
| `scripts/` | Auditorías y operaciones de contenido |
| `prisma/` | Esquema de datos |

## Contribuciones

Si detectas un cálculo incorrecto, una fuente desactualizada o un problema de accesibilidad, abre una incidencia con la URL, el resultado obtenido y el resultado esperado. No incluyas datos personales ni credenciales.
