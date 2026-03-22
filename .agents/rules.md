# Reglas de Prevención de Errores para Agentes (CajaUtil)

Este documento contiene reglas críticas derivadas de errores pasados para asegurar que no se repitan. **Todos los agentes deben seguir estas pautas.**

## 1. Estabilidad de Modelos de IA (Año 2026)
*   **Error:** Fallos 404 al usar identificadores de modelos antiguos (ej. `gemini-1.5-flash`).
*   **Regla:** Antes de implementar o actualizar scripts de IA, verificar los modelos disponibles en el entorno actual.
*   **Estándar Actual:** Usar `gemini-2.5-flash-lite` para tareas generales gratuitas y `gemini-2.5-flash-image` para generación de imágenes.

## 2. Parseo Robustos de JSON (Contenidos Largos)
*   **Error:** `JSON.parse()` falla en artículos de >1500 palabras debido a problemas de escapado de comillas de la IA.
*   **Regla:** En contenidos extensos, **NUNCA** confiar únicamente en `JSON.parse()`. 
*   **Solución Obligatoria:** Implementar siempre un "Rescate Quirúrgico" mediante expresiones regulares (Regex) para extraer los campos si el parseo estándar falla. (Ver implementación de referencia en `src/lib/gemini-seo.ts`).

## 3. Calidad de Contenido (AdSense / E-E-A-T)
*   **Error:** Rechazo por "Bajo Valor de Contenido".
*   **Regla:** Los artículos generados deben tener >1500 palabras, incluir FAQs, tips de experto y casos prácticos.
*   **Estructura:** Seguir estrictamente el `systemPrompt` definido en `gemini-seo.ts` que garantiza señales de autoridad.

## 4. Enlaces Internos con Contexto
*   **Error:** Enlaces genéricos que no aportan valor funcional.
*   **Regla:** Cada artículo debe enlazar a una herramienta relevante pasando parámetros iniciales de contexto (ej. `?value=...`) para que la herramienta sea útil de inmediato para el lector.

## 5. Años en Títulos SEO Generados
*   **Error:** Publicar artículos nuevos con años obsoletos en el título o metadata (ej. `2024` en un contenido generado en 2026).
*   **Regla:** Los artículos generados no deben incluir años pasados en `title`, `metaDescription` ni `slug` salvo que el contenido sea explícitamente histórico y esté justificado.
*   **Validación:** Antes de guardar un artículo generado, comprobar cualquier año de cuatro cifras y corregirlo al año actual o eliminarlo si el contenido es evergreen.

## 6. Flujo de Despliegue (Prohibido tocar Producción)
*   **Error:** Cambios aplicados directamente en producción sin trazabilidad.
*   **Regla Crítica:** **NUNCA** modificar producción de forma directa (hotfix manual, edición en panel, cambios ad-hoc en runtime).
*   **Procedimiento Obligatorio:** Todo cambio debe realizarse en código, subirse a la rama del repositorio y desplegarse desde Git para mantener historial, revisión y rollback.
