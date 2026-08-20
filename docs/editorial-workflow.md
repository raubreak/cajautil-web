# Flujo editorial de CajaUtil

Los modelos de IA pueden investigar y redactar borradores, pero solo se publica contenido con demanda demostrable, intencion diferenciada y fuentes verificadas.

## Fuente de verdad

- Articulos editoriales hardcoded: `src/lib/editorialArticles.ts`
- Articulos en base de datos: `Article` en Prisma
- Auditoria editorial: `scripts/editorial-workflow.ts`
- Borradores generados: `docs/seo-drafts/`

## Flujo recomendado

1. Usar GA4 y GSC para seleccionar una consulta o necesidad real.
2. Comprobar que ninguna pagina existente satisface ya la misma intencion.
3. Crear el borrador en `docs/seo-drafts/YYYY-MM-DD-slug.md`.
4. Verificar hechos, calculos, fuentes, enlaces internos y limites de interpretacion.
5. Tras la revision, trasladar el contenido aprobado a `src/lib/editorialArticles.ts`.
6. Mantener `publishedAt` como fecha de origen y cambiar `updatedAt` solo tras una revision material.
7. Ejecutar `npm run editorial:audit`, `npx eslint` y `npx tsc --noEmit`.
8. Publicar exclusivamente mediante commit, push y despliegue de Vercel.

## Politica de generacion

| Regla | Criterio |
|---|---|
| Cadencia | Maximo un borrador nuevo cada 7 dias y dos publicaciones por semana. |
| Demanda | Toda propuesta debe citar datos de GSC o justificar un hueco editorial vinculado a una herramienta activa. |
| Intencion | Una intencion principal por URL; no crear otra pieza si una pagina existente ya la resuelve. |
| Fuentes | En temas financieros, fiscales, laborales, sanitarios o de seguridad, usar al menos dos fuentes oficiales verificables. |
| Experiencia | No inventar vivencias, credenciales, pruebas, citas ni resultados propios. |
| Aprobacion | Todo contenido generado permanece fuera del sitemap y con estado de borrador hasta revision. |
| Retirada | Si una pieza publicada no indexa ni obtiene impresiones tras dos ciclos de revision, consolidarla, mejorarla o retirarla. |

## Contenido que no se publica

- Temas elegidos al azar o sin relacion directa con una herramienta util.
- Variaciones que solo cambian el titulo, una cifra o unas pocas palabras.
- Texto sin fuentes cuando realiza afirmaciones que afectan a dinero, salud, impuestos o seguridad.
- Consejos presentados como experiencia personal o experta si no existe evidencia real.
- Articulos creados para cumplir una cuota diaria de publicacion.

## Comandos

```bash
npm run editorial:audit
npm run editorial:audit -- --write-report
```

## Criterios de revision

- El articulo debe explicar el problema, no solo la herramienta.
- Debe incluir errores comunes, limites y un caso practico cuando aplique.
- En temas de dinero, salud o seguridad, el tono debe ser orientativo y prudente.
- Debe enlazar de forma contextual a la herramienta principal y a contenido complementario, sin forzar anclas.
- Las fuentes externas deben ser relevantes, accesibles y preferiblemente oficiales.
- Si hay una revision manual importante, la tarjeta del indice mostrara la fecha de actualizacion.
