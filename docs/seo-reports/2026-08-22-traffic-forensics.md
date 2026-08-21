# Diagnóstico forense de la caída de tráfico

La caída observada en GA4 no fue una pérdida de tráfico SEO. El pico de marzo estuvo compuesto casi por completo por visitas directas con una huella técnica repetida, coincidente con el periodo de desarrollo y verificación intensiva del sitio. El problema SEO real es distinto: Google probó un inventario nuevo y amplio, apenas obtuvo clics y actualmente solo mantiene indexadas 5 de las 44 URLs del sitemap.

## Conclusión

| Pregunta | Respuesta basada en datos |
|----------|---------------------------|
| ¿Google enviaba muchas visitas en marzo? | No. Entre el 1 y el 22 de marzo GSC registró 677 impresiones, pero solo 1 clic. GA4 atribuyó únicamente 2 de 239 sesiones a búsqueda orgánica. |
| ¿Qué produjo el pico de GA4? | Con alta probabilidad, verificaciones humanas o automatizadas durante el lanzamiento. 173 sesiones compartieron exactamente Chrome, iOS y resolución 414x896; 175 se localizaron en Barcelona y 209 aterrizaron directamente en la portada. |
| ¿Por qué cayó? | La actividad de desarrollo y comprobación se redujo drásticamente. El tráfico con esa misma huella pasó de 173 sesiones en las tres primeras semanas a 48 en las tres siguientes y luego desapareció. |
| ¿Existe además un problema SEO? | Sí. Google apenas ha consolidado el sitio: 5 de 44 URLs están indexadas; 15 están descubiertas sin indexar, 22 no son reconocidas y 2 fueron rastreadas pero no indexadas. |
| ¿Hay un fallo técnico general? | No se ha encontrado. Las URLs indexadas permiten indexación, se descargan correctamente y sus canonicals coinciden. La limitación principal es de selección, calidad histórica y autoridad, no un bloqueo global. |

## Evidencia

### El pico no era orgánico

Periodo del 1 al 22 de marzo:

- GA4: 239 sesiones totales.
- Direct: 237 sesiones.
- Organic Search: 2 sesiones.
- GSC: 677 impresiones, 1 clic, CTR del 0,15 % y posición media 65,8.
- Portada como landing directa: 209 sesiones, 12 engaged.
- Barcelona como ubicación directa: 175 sesiones.
- Huella `mobile / Chrome / iOS / 414x896`: 173 sesiones y 151 usuarios.

Que 151 supuestos usuarios compartan ciudad, navegador, sistema, resolución y landing, con baja interacción y casi una sesión por usuario, no corresponde a una audiencia orgánica normal. Es consistente con navegadores efímeros, emulación móvil, verificaciones automatizadas o tráfico sintético que elimina o renueva identificadores.

### La actividad coincide con el desarrollo

| Semana | Sesiones GA4 | Sesiones orgánicas | Commits |
|--------|-------------:|-------------------:|--------:|
| 2 de marzo | 53 | 0 | 65 |
| 9 de marzo | 95 | 1 | 25 |
| 16 de marzo | 91 | 1 | 16 |
| 23 de marzo | 41 | 0 | 0 |
| 30 de marzo | 10 | 0 | 1 |
| 6 de abril | 1 | 0 | 1 |

GA4 se añadió el 5 de marzo y el identificador actual se configuró el 6 de marzo. En esos mismos días se desplegaron decenas de herramientas, el motor pSEO, artículos generados y numerosas comprobaciones. La caída empieza cuando termina esa actividad, no después de una pérdida demostrable de clics orgánicos.

### Google hizo una prueba inicial, no consolidó rankings

Entre el 1 y el 22 de marzo, la mayor parte de las impresiones procedió de páginas en posiciones poco competitivas:

- `/calculadora-sueldo-neto`: 413 impresiones, 0 clics, posición media 72,9.
- `/calculadora-iva-facturas`: 89 impresiones, 0 clics, posición media 74,5.
- `/generador-qr`: 54 impresiones, 0 clics, posición media 72,2.
- `/lector-qr`: 30 impresiones, 0 clics, posición media 18,1.

Del 23 de marzo al 12 de abril las impresiones bajaron a 124 y los clics a 0. Esto encaja con una evaluación inicial de un dominio nuevo y un inventario publicado en bloque, seguida de menor exposición al no encontrar señales suficientes para competir.

El historial refuerza esta lectura:

- El sitio y el dominio se prepararon entre el 4 y el 6 de marzo.
- El 6 de marzo se añadieron muchas herramientas y el motor programático en pocas horas.
- El 12 de marzo se publicaron 17 variantes regionales de sueldo neto.
- Parte de la superficie programática se eliminó después por bajo valor; desde mayo la ruta dinámica desconocida devuelve 404 y `noindex`.
- En agosto se reforzaron contenido editorial, SSR, entidades, metadata, canonicals y señales de confianza, pero Google aún debe volver a rastrear y reevaluar esas mejoras.

## Estado actual

La inspección de las 44 URLs del sitemap el 22 de agosto devuelve:

- 5 enviadas e indexadas: portada, privacidad, sueldo neto, generador QR y lector QR.
- 15 descubiertas, actualmente sin indexar.
- 22 que Google todavía no reconoce.
- 2 rastreadas, actualmente sin indexar.

Que una página legal esté indexada mientras muchas herramientas no lo están muestra que no existe un bloqueo técnico uniforme. Google está seleccionando muy pocas URLs de un dominio con autoridad y señales históricas todavía débiles.

No se pudo comprobar la sección de acciones manuales porque la sesión web de Search Console requiere autenticación. Los datos disponibles no muestran el patrón típico de una penalización que haya eliminado tráfico existente: el sitio nunca tuvo un volumen orgánico relevante que pudiera perder.

## Plan de recuperación

1. No ampliar el sitemap ni reactivar pSEO hasta mejorar claramente la cobertura actual.
2. Consolidar primero los clústeres ya indexados: sueldo neto y QR. Enlazar desde ellos solo contenido complementario realmente útil.
3. Mantener `lastmod` veraz, sitemap, canonicals e IndexNow automatizado tras cada despliegue; estas acciones aceleran descubrimiento, pero no fuerzan indexación.
4. Solicitar indexación en GSC de un grupo pequeño de páginas prioritarias después de cada mejora sustancial, no de las 44 a la vez.
5. Conseguir menciones y enlaces editoriales reales hacia las herramientas principales. Sin autoridad externa, competir en salario, IVA, préstamos o QR seguirá siendo difícil aunque el SEO técnico sea correcto.
6. Completar identidad editorial y datos legales reales. En contenido financiero y de salud, la confianza pesa especialmente.
7. Medir durante 6-8 semanas impresiones, páginas reconocidas e indexación antes de generar nuevas URLs.
8. Excluir de GA4 las verificaciones internas y automatizadas, o ejecutarlas sin consentimiento analítico. Usar UTM en cualquier promoción para que el tráfico real no termine clasificado como `Direct`.

## Criterios de avance

No aumentar el inventario hasta cumplir al menos dos de estas condiciones:

- 20 o más URLs del sitemap reconocidas por Google.
- 12 o más URLs indexadas.
- Crecimiento de impresiones no concentrado únicamente en sueldo neto.
- Primeros clics recurrentes durante cuatro semanas.
- Enlaces externos relevantes hacia dos o más clústeres prioritarios.

## Límites del análisis

- GA4 solo permite interpretar el tráfico que llegó a medirse; no identifica por sí solo al operador de una automatización.
- La atribución `Direct` puede incluir enlaces sin UTM, favoritos, mensajería y referers perdidos. La huella repetida y la correlación con Git hacen que la hipótesis de pruebas o tráfico sintético sea alta, pero no permiten nombrar una herramienta concreta.
- IndexNow y las solicitudes de GSC facilitan el descubrimiento. La decisión de indexar y posicionar sigue siendo de Google.
