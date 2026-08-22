# Panel semanal GA4 y monetizacion

Periodo actual: **2026-03-16 a 2026-03-22**. Comparativa: **2026-03-09 a 2026-03-15**.

> Los segmentos son excluyentes. "Real total" suma organico y real no organico; excluye automatizacion probable e interno/QA. GA4 solo representa usuarios que aceptaron analitica.

## Resumen ejecutivo

| KPI | Semana actual | Semana anterior | Variacion |
|-----|--------------:|----------------:|----------:|
| Sesiones medidas | 92 | 95 | -3,2% |
| Sesiones reales | 14 | 28 | -50,0% |
| Sesiones organicas | 1 | 1 | 0,0% |
| Automatizadas probables | 73 | 65 | +12,3% |
| Internas / QA | 5 | 2 | +150,0% |
| Paginas vistas reales | 38 | 30 | +26,7% |
| Engagement real | 42.9% | 17.9% | - |
| Paginas por sesion real | 2.71 | 1.07 | - |

## Segmentos

| Segmento | Sesiones | Usuarios | Vistas | Engagement | Duracion media |
|----------|---------:|---------:|-------:|-----------:|---------------:|
| Organico | 1 | 1 | 1 | 100.0% | 49.31 s |
| Real no organico | 13 | 11 | 37 | 38.5% | 122.46 s |
| Automatizado probable | 73 | 72 | 108 | 4.1% | 13.76 s |
| Interno / QA | 5 | 2 | 19 | 80.0% | 233.77 s |

## Canales reales

| Canal | Sesiones | Vistas | Engagement |
|-------|---------:|-------:|-----------:|
| Direct | 13 | 37 | 38.5% |
| Organic Search | 1 | 1 | 100.0% |

## Landings con inventario valido

| Landing | Sesiones | Vistas | Paginas/sesion | Engagement |
|---------|---------:|-------:|---------------:|-----------:|
| `/` | 7 | 20 | 2.86 | 42.9% |
| `/articulos/simulador-de-prestamos-domina-tus-finanzas` | 1 | 11 | 11.00 | 100.0% |
| `/calculadora-sueldo-neto` | 2 | 3 | 1.50 | 50.0% |
| `/articulos/desbloquea-el-poder-de-tus-publicaciones-guia-definitiva-de-los-generadores-de-hashtags` | 1 | 1 | 1.00 | 0.0% |
| `/calculadora-sueldo-neto-la-rioja` | 1 | 1 | 1.00 | 0.0% |
| `/contacto` | 1 | 1 | 1.00 | 0.0% |
| `/calculadora-prestamos-estudios-universitarios` | 1 | 1 | 1.00 | 100.0% |

## Monetag

No se aportaron ingresos de Monetag. El panel no estima ni inventa revenue.

- Inventario valido medido: **38 paginas vistas**.
- Sesiones reales medidas: **14**.
- Paginas por sesion real: **2.71**.
- Para calcular Page RPM y Session RPM, ejecuta el panel con `--monetag-revenue <importe> --currency USD`.

## Trafico excluido del inventario

| Tipo | Landing | Huella | Sesiones | Motivo |
|------|---------|--------|---------:|--------|
| Automatizado | `/` | Barcelona; mobile/Chrome/iOS/414x896 | 73 | Huella sintetica historica de alta confianza |
| Interno/QA | `/revision-seo` | Barcelona; mobile/Chrome/iOS/414x896 | 5 | Marcador, ruta o parametro interno/QA |

## Acciones recomendadas

- Revisar las fuentes de automatizacion: superan el 10% de las sesiones medidas y distorsionan cualquier RPM sin limpiar.
- No aumentar todavia la presion publicitaria: con menos de 100 paginas vistas reales semanales, el ingreso incremental sera minimo y el riesgo UX/SEO sera desproporcionado.
- Incorporar el ingreso semanal exportado de Monetag para medir Page RPM y Session RPM sobre trafico valido.

## Reglas de medicion

- Las verificaciones automatizadas deben abrir una URL con `?caja_traffic=automation`.
- Las comprobaciones humanas internas deben usar `?caja_traffic=internal`.
- El panel conserva el dato bruto en GA4, pero lo excluye de sesiones y paginas vistas reales.
- La huella historica solo se clasifica como automatizada cuando acumula al menos 3 sesiones, ratio usuario/sesion >= 75% y engagement <= 25%.
- Los ingresos de Monetag son datos declarados mediante CLI; no se infieren desde GA4.
