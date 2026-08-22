# Panel semanal de trafico y monetizacion

El panel separa las sesiones medidas por GA4 en cuatro segmentos excluyentes para que el trafico interno o automatizado no infle el inventario atribuido a Monetag.

## Ejecucion

```bash
npm run analytics:weekly
```

Por defecto compara los ultimos siete dias completos con los siete anteriores. Para guardar un informe reproducible:

```bash
npm run analytics:weekly -- \
  --end-date 2026-08-21 \
  --output docs/analytics-reports/2026-08-21-ga4-weekly.md
```

Si se dispone del ingreso semanal exportado de Monetag:

```bash
npm run analytics:weekly -- \
  --monetag-revenue 12.34 \
  --monetag-impressions 8500 \
  --currency USD
```

El importe y las impresiones se utilizan para calcular Page RPM, Session RPM y eCPM. El panel no estima ingresos cuando no existen datos reales de Monetag.

## Automatizacion semanal

La tarea local `weekly-ga4-monetag-panel` se ejecuta los lunes a las 09:30 y sigue `.opencode/jobs/analytics-weekly.prompt.md`. El informe se guarda en `docs/analytics-reports/` y una repeticion durante el mismo dia sobrescribe de forma segura el mismo archivo.

## Segmentos

| Segmento | Definicion |
|----------|------------|
| Organico | GA4 atribuye la sesion a `Organic Search` y no existen senales de automatizacion. |
| Real no organico | Trafico directo, referral, social u otros canales sin senales conservadoras de automatizacion. |
| Automatizado probable | Marcador explicito, ruta de automatizacion o huella sintetica historica que supera umbrales semanales. |
| Interno / QA | Panel privado, parametros de despliegue o marcador interno. |

`Real total` suma organico y real no organico. Las sesiones automatizadas e internas permanecen en GA4 para poder auditarlas, pero no se contabilizan como inventario monetizable.

## Marcar verificaciones

Toda automatizacion que abra produccion debe usar:

```text
https://cajautil.com/?caja_traffic=automation
```

Las comprobaciones humanas internas deben usar:

```text
https://cajautil.com/?caja_traffic=internal
```

El marcador debe estar en la primera URL de la sesion. GA4 lo conserva en `landingPagePlusQueryString`, lo que permite excluir toda la sesion sin depender de cookies especiales, direcciones IP o identificadores personales.

## Monetag

El panel mide inventario valido y rendimiento, pero no activa scripts publicitarios. Monetag permanece desactivado hasta disponer de:

- Consentimiento publicitario separado y textos legales alineados.
- Zona y formatos documentados.
- Export o acceso oficial a ingresos e impresiones.
- Volumen real suficiente para que el ingreso incremental compense el impacto en UX, SEO y retencion.

Maximizar monetizacion sostenible significa optimizar `ingresos / paginas vistas reales`, no aumentar formatos sobre trafico sintetico o inexistente.

## Limitaciones

- GA4 solo representa usuarios que aceptaron analitica.
- La deteccion heuristica es deliberadamente conservadora y puede dejar automatizaciones no marcadas dentro del trafico real.
- Monetag puede aplicar su propia deteccion de trafico invalido; sus cifras facturables son la fuente final para revenue e impresiones.
- RPM alto con pocas sesiones no demuestra escalabilidad. Debe evaluarse junto a engagement, recurrencia, indexacion y crecimiento organico.
