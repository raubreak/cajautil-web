# Refuerzo SEO del clúster salarial

## Evidencia

- GSC, últimos 28 días: `/calculadora-sueldo-neto` concentra 665 impresiones, 0 clics y una posición media de 86.
- Consultas principales: `calculadora sueldo neto` (31 impresiones), `calcular sueldo bruto` (24), `calculadora sueldo` (15), `calcular salario bruto` (15) y `calculadora salario neto` (14).
- La inspección de URL de GSC confirma `Enviada e indexada`, rastreo correcto, canonical elegida por Google igual a la declarada e indexación permitida.
- GA4 no registra sesiones orgánicas ni eventos de herramientas en los últimos siete días completos. La semana anterior tuvo dos sesiones y dos vistas.
- El rastreo de producción previo al cambio mantiene 43/43 URLs con `200`, indexables, sin títulos ni descripciones duplicados.
- No existe código de Moneytag, Monetag, popunder, OnClickA, PropellerAds, Adsterra ni interstitials en los archivos desplegables revisados.

## Decisión editorial

No se crea otra calculadora ni una landing equivalente, porque competiría con la URL que ya concentra las impresiones. Se refuerza esa página y se añade una guía con intención informativa distinta: aprender a leer una nómina, sus devengos, bases y deducciones.

El mapa queda separado así:

- `/calculadora-sueldo-neto`: intención transaccional, convertir bruto y neto con porcentajes editables.
- `/articulos/como-negociar-tu-sueldo-bruto-sin-perder-neto`: intención de decisión, comparar y negociar ofertas.
- `/articulos/como-leer-una-nomina-paso-a-paso`: intención informativa, interpretar y comprobar un recibo salarial.

## Cambios

- Nueva guía manual de 2.041 palabras, 17 secciones, cinco preguntas frecuentes, dos fuentes oficiales y un caso aritmético reproducible.
- El caso de 30.000 EUR enlaza a la calculadora e indica los cuatro valores necesarios para reproducirlo.
- La calculadora muestra ahora los importes anuales de IRPF y Seguridad Social, además de sus porcentajes.
- La página explica la fórmula exacta y reproduce el escenario de 30.000 EUR: 4.500 EUR de IRPF, 1.950 EUR de cotización y 23.550 EUR netos.
- La calculadora y su H1 permanecen en el HTML inicial, sin depender de JavaScript para el contenido transaccional principal.
- Se enlazan herramienta y artículos en ambos sentidos y se actualizan las fechas reales del sitemap.

## Validación local

- Auditoría editorial: 11 artículos, ninguno por debajo del mínimo, sin fuentes ausentes, enlaces a herramienta ausentes ni relaciones inválidas.
- ESLint, TypeScript, `git diff --check` y build de Next.js correctos.
- Build: 59 rutas generadas; `/calculadora-sueldo-neto` permanece estática y el nuevo artículo se genera por SSG.
- Rastreo local: 44/44 URLs con `200`, indexables, sin incidencias, duplicados ni páginas huérfanas.
- El nuevo artículo recibe enlaces desde la calculadora, la guía de negociación y el índice editorial.
- JSON-LD `Article`: 1.973 palabras limpias, canonical propio, autor y publisher estables, sin tuberías ni separadores Markdown.
- Escenario verificado: 32.000 EUR produce 25.120 EUR netos anuales y 2.093,33 EUR por paga con 15% y 6,50%.
- Lighthouse móvil en artículo y calculadora: 100 en accesibilidad, buenas prácticas y SEO; sin errores de consola ni desbordamiento horizontal.

## Publicación

Pendiente de commit, despliegue y comprobación de producción. IndexNow y GSC solo se notificarán cuando las nuevas respuestas estén disponibles públicamente.

La preparación técnica y editorial no garantiza rankings, clics ni indexación inmediata. La autoridad externa, la competencia y el tiempo de reevaluación de Google siguen fuera del control del sitio.
