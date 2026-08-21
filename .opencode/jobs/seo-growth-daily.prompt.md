@scheduled-job-best-practices

Revisa cada dia Google Analytics 4 y Google Search Console de CajaUtil para detectar oportunidades de crecimiento organico.

Objetivos:
- Encontrar landings y articulos con muchas impresiones y bajo CTR.
- Detectar consultas emergentes, caidas de trafico y paginas con potencial de mejora.
- Aplicar mejoras SEO on-page de bajo riesgo y alto impacto dentro de este repositorio cuando haya suficiente evidencia.
- Generar como maximo un borrador editorial de calidad cada 7 dias cuando exista una oportunidad demostrable.

Flujo:
1. Haz un preflight: confirma que existen los scripts requeridos, que produccion responde y que las APIs pueden consultarse sin mostrar credenciales. Si falla, termina pronto con un unico motivo claro.
2. Revisa los scripts, integraciones y datos disponibles de analytics/search console en este proyecto.
3. Ejecuta `npm run seo:gsc-indexation` para medir por separado URLs indexadas, descubiertas sin indexar, rastreadas sin indexar y no reconocidas. Compara con el ultimo reporte disponible.
4. Identifica las URLs y consultas con mayor oportunidad de mejora.
5. Comprueba en produccion que no existan Moneytag, Monetag, popunders, interstitials ni scripts publicitarios de terceros no documentados.
6. Lee `docs/editorial-workflow.md` y comprueba canibalizacion contra herramientas, articulos editoriales y borradores existentes.
7. Si es seguro, actualiza contenido, metadatos, FAQs y enlazado interno siguiendo `AGENTS.md` y los patrones existentes.
8. Solo si no existe otro borrador creado durante los ultimos 7 dias, hay demanda suficiente y la cobertura de indexacion no esta empeorando, crea un borrador completo en `docs/seo-drafts/YYYY-MM-DD-slug.md`.
9. El borrador debe incluir al principio: consulta objetivo, intencion, evidencia de demanda, URL relacionada, paginas revisadas por solapamiento y fuentes utilizadas.
10. Redacta para resolver la necesidad del usuario, no para alcanzar una longitud. Incluye ejemplos verificables, limites, enlaces internos y fuentes oficiales cuando aplique.
11. No copies el borrador a `src/lib/editorialArticles.ts`, no escribas en Prisma y no lo incluyas en el sitemap: la publicacion requiere revision posterior.
12. No toques secretos ni configuracion sensible.
13. No leas archivos `.env*`, `ga4-key.json` ni otros ficheros de credenciales directamente; usa solo scripts/comandos que consuman esas credenciales si ya estan configuradas en el entorno.
14. No hagas commit ni push.
15. Ejecuta lint de los archivos de codigo tocados. Si hay cambios sustanciales, ejecuta `npm run build`.
16. Deja en la salida un resumen corto con:
   - estado: success, skipped o failed,
   - motivo principal,
   - principales oportunidades detectadas,
   - cobertura GSC observada,
   - estado de publicidad intrusiva,
   - archivos cambiados,
   - checks ejecutados,
   - riesgos o siguientes pasos,
   - rutas exactas de los reportes o borradores generados.

Guardrails:
- No inventes datos si alguna API no responde.
- Si faltan credenciales o acceso, detente y deja un informe de bloqueo en vez de improvisar.
- No hagas cambios destructivos ni borres contenido util.
- Prioriza mejoras incrementales y verificables.
- No elijas temas al azar ni generes contenido para cumplir una cuota.
- No inventes experiencia personal, credenciales, citas, fuentes ni resultados.
- No generes otra pieza con la misma intencion de una URL existente.
- En finanzas, fiscalidad, empleo, salud o seguridad, exige al menos dos fuentes oficiales verificadas.
- No aumentes el numero de URLs indexables si menos del 50 % del sitemap esta indexado o si la cobertura empeora frente al ultimo reporte.
- No afirmes que una mejora produjo trafico o indexacion hasta que GA4 o GSC lo confirme.
