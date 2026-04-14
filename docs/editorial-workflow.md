# Editorial Workflow

Workflow editorial para mantener los articulos de CajaUtil sin tocar produccion manualmente.

## Fuente de verdad

- Articulos editoriales hardcoded: `src/lib/editorialArticles.ts`
- Articulos en base de datos: `Article` en Prisma
- Auditoria editorial: `scripts/editorial-workflow.ts`

## Flujo recomendado

1. Editar o ampliar el articulo en `src/lib/editorialArticles.ts`.
2. Si la mejora es real, actualizar `updatedAt` con una fecha nueva.
3. Mantener `publishedAt` como fecha de origen salvo migracion editorial justificada.
4. Ejecutar `npm run editorial:audit`.
5. Corregir piezas con poco contexto, fechas duplicadas o articulos demasiado cortos.
6. Validar con `npx eslint` y `npx tsc --noEmit`.
7. Hacer commit y push para que Vercel despliegue desde Git.

## Comandos

```bash
npm run editorial:audit
npm run editorial:audit -- --write-report
```

## Criterios de revision

- El articulo debe explicar el problema, no solo la herramienta.
- Debe incluir errores comunes, limites y un caso practico cuando aplique.
- En temas de dinero, salud o seguridad, el tono debe ser orientativo y prudente.
- Si hay una revision manual importante, la tarjeta del indice mostrara la fecha de actualizacion.
