Revisa cada dia Google Analytics 4 y Google Search Console de CajaUtil para detectar oportunidades de crecimiento organico.

Objetivos:
- Encontrar landings y articulos con muchas impresiones y bajo CTR.
- Detectar consultas emergentes, caidas de trafico y paginas con potencial de mejora.
- Aplicar mejoras SEO on-page de bajo riesgo y alto impacto dentro de este repositorio cuando haya suficiente evidencia.
- Generar como maximo un borrador editorial de calidad cada 7 dias cuando exista una oportunidad demostrable.

Flujo:
1. Revisa los scripts, integraciones y datos disponibles de analytics/search console en este proyecto.
2. Identifica las URLs y consultas con mayor oportunidad de mejora.
3. Lee `docs/editorial-workflow.md` y comprueba canibalizacion contra herramientas, articulos editoriales y borradores existentes.
4. Si es seguro, actualiza contenido, metadatos, FAQs y enlazado interno siguiendo `AGENTS.md` y los patrones existentes.
5. Solo si no existe otro borrador creado durante los ultimos 7 dias y hay demanda suficiente, crea un borrador completo en `docs/seo-drafts/YYYY-MM-DD-slug.md`.
6. El borrador debe incluir al principio: consulta objetivo, intencion, evidencia de demanda, URL relacionada, paginas revisadas por solapamiento y fuentes utilizadas.
7. Redacta para resolver la necesidad del usuario, no para alcanzar una longitud. Incluye ejemplos verificables, limites, enlaces internos y fuentes oficiales cuando aplique.
8. No copies el borrador a `src/lib/editorialArticles.ts`, no escribas en Prisma y no lo incluyas en el sitemap: la publicacion requiere revision posterior.
9. No toques secretos ni configuracion sensible.
10. No leas archivos `.env*`, `ga4-key.json` ni otros ficheros de credenciales directamente; usa solo scripts/comandos que consuman esas credenciales si ya estan configuradas en el entorno.
11. No hagas commit ni push.
12. Ejecuta lint de los archivos de codigo tocados. Si hay cambios sustanciales, ejecuta `npm run build`.
13. Deja en la salida un resumen corto con:
   - principales oportunidades detectadas,
   - archivos cambiados,
   - checks ejecutados,
   - riesgos o siguientes pasos.

Guardrails:
- No inventes datos si alguna API no responde.
- Si faltan credenciales o acceso, detente y deja un informe de bloqueo en vez de improvisar.
- No hagas cambios destructivos ni borres contenido util.
- Prioriza mejoras incrementales y verificables.
- No elijas temas al azar ni generes contenido para cumplir una cuota.
- No inventes experiencia personal, credenciales, citas, fuentes ni resultados.
- No generes otra pieza con la misma intencion de una URL existente.
- En finanzas, fiscalidad, empleo, salud o seguridad, exige al menos dos fuentes oficiales verificadas.
