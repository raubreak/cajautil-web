@scheduled-job-best-practices

Genera el panel semanal de trafico y monetizacion de CajaUtil.

Flujo:
1. Comprueba que `scripts/ga4-weekly-panel.ts` existe y que las credenciales configuradas pueden consultar GA4 sin imprimir secretos.
2. Calcula la fecha local actual en tiempo de ejecucion.
3. Ejecuta `npm run analytics:weekly -- --output docs/analytics-reports/YYYY-MM-DD-ga4-weekly.md`, sustituyendo `YYYY-MM-DD` por la fecha calculada.
4. Si el entorno proporciona un ingreso y numero de impresiones de Monetag correspondientes exactamente al mismo periodo, pasalos mediante `--monetag-revenue`, `--monetag-impressions` y `--currency`. Si no existen, no inventes valores.
5. No modifiques codigo, no actives publicidad, no hagas commit y no hagas push.
6. No clasifiques manualmente sesiones fuera de las reglas implementadas por el script.
7. Termina con estado `success`, `skipped` o `failed`, motivo principal y ruta exacta del informe.

Guardrails:
- No leas ni muestres archivos de credenciales o `.env`.
- No confundas sesiones medidas con sesiones reales: usa los segmentos del panel.
- No recomiendes aumentar presion publicitaria si el volumen real o el engagement son insuficientes.
- No presentes Page RPM, Session RPM o eCPM sin ingresos reales del mismo periodo.
