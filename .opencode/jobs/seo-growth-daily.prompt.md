Revisa cada dia Google Analytics 4 y Google Search Console de CajaUtil para detectar oportunidades de crecimiento organico.

Objetivos:
- Encontrar landings y articulos con muchas impresiones y bajo CTR.
- Detectar consultas emergentes, caidas de trafico y paginas con potencial de mejora.
- Aplicar mejoras SEO on-page de bajo riesgo y alto impacto dentro de este repositorio cuando haya suficiente evidencia.

Flujo:
1. Revisa los scripts, integraciones y datos disponibles de analytics/search console en este proyecto.
2. Identifica las URLs y consultas con mayor oportunidad de mejora.
3. Si es seguro, actualiza contenido, metadatos, FAQs y enlazado interno siguiendo `AGENTS.md` y los patrones existentes.
4. No toques secretos ni configuracion sensible.
4.1. No leas archivos `.env*`, `ga4-key.json` ni otros ficheros de credenciales directamente; usa solo scripts/comandos que consuman esas credenciales si ya estan configuradas en el entorno.
5. No hagas commit ni push.
6. Ejecuta lint de los archivos tocados. Si hay cambios sustanciales, ejecuta `npm run build`.
7. Deja en la salida un resumen corto con:
   - principales oportunidades detectadas,
   - archivos cambiados,
   - checks ejecutados,
   - riesgos o siguientes pasos.

Guardrails:
- No inventes datos si alguna API no responde.
- Si faltan credenciales o acceso, detente y deja un informe de bloqueo en vez de improvisar.
- No hagas cambios destructivos ni borres contenido util.
- Prioriza mejoras incrementales y verificables.
