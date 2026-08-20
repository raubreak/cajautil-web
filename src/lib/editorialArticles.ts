export interface EditorialArticle {
  slug: string;
  title: string;
  description: string;
  targetToolUrl: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  content: string;
}

export const editorialArticles: EditorialArticle[] = [
  {
    slug: 'como-negociar-tu-sueldo-bruto-sin-perder-neto',
    title: 'Cómo negociar tu sueldo bruto sin perder de vista el neto',
    description:
      'Guía práctica para evaluar ofertas salariales, traducir bruto a neto y negociar una subida con argumentos concretos.',
    targetToolUrl: '/calculadora-sueldo-neto',
    tags: ['salario', 'nomina', 'empleo'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-20T17:18:00.000Z',
    content: `## Por que no basta con mirar el bruto

Cuando una empresa te habla de salario anual, casi siempre te esta dando una cifra en bruto. Esa cantidad es util para comparar bandas salariales, pero no te dice cuanto dinero real entrara en tu cuenta cada mes. Entre el bruto y el neto intervienen las cotizaciones a la Seguridad Social, la retencion de IRPF, el numero de pagas y, en algunos casos, bonus, dietas o retribucion flexible.

Por eso, negociar solo con la cifra anual puede llevarte a errores. Dos ofertas con el mismo bruto pueden terminar en netos distintos si cambia el numero de pagas, el tratamiento fiscal o la parte variable. En la practica, el dato que mas condiciona tu vida diaria no es el titular de la oferta, sino el dinero que realmente te queda despues de impuestos y gastos asociados al cambio.

La estimacion debe contrastarse con fuentes actualizadas. La [Agencia Tributaria publica su servicio de calculo de retenciones de 2026](https://sede.agenciatributaria.gob.es/Sede/Retenciones.shtml), mientras que la [Seguridad Social mantiene las bases y tipos de cotizacion vigentes](https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/36537). Una calculadora orientativa ayuda a comparar escenarios, pero una nomina real tambien depende del contrato, la situacion personal y los conceptos incluidos por la empresa.

## Que deberias calcular antes de aceptar una oferta

1. **Neto mensual en 12 y en 14 pagas**. Es la mejor forma de saber como afectara la oferta a tu liquidez real.
2. **Coste de desplazamiento o teletrabajo**. Un aumento pequeno de bruto puede quedar neutralizado si tus gastos mensuales suben.
3. **Parte fija y parte variable**. Un bonus prometido no equivale a salario garantizado.
4. **Beneficios extras**. Seguro medico, comida o tickets transporte pueden mejorar el paquete total.
5. **Horario y exigencia real del puesto**. Un salario algo mejor puede salir caro si el cambio implica mas horas, guardias o menor estabilidad.

## Plantilla para comparar dos ofertas sin mezclar conceptos

No necesitas una hoja de calculo compleja. Empieza con una tabla que separe lo garantizado de lo probable y de lo puramente estimado:

| Concepto | Puesto actual | Nueva oferta | Como compararlo |
|---|---|---|---|
| Bruto fijo anual | Importe contractual | Importe contractual | Compara el mismo periodo anual |
| Pagas | 12 o 14 | 12 o 14 | Convierte ambos escenarios a neto anual y mensual |
| Variable | Cobrado realmente | Garantizado o discrecional | No lo trates como fijo si depende de objetivos |
| Beneficios | Valor que utilizas | Valor que realmente usaras | Evita valorar al 100 % algo que no necesitas |
| Gastos asociados | Transporte y comidas | Transporte, comidas o teletrabajo | Restalos de la mejora neta mensual |
| Tiempo | Horas y desplazamiento | Horas, guardias y desplazamiento | Calcula tambien el coste en tiempo personal |

Esta separacion evita una trampa habitual: sumar al nuevo paquete todos los beneficios teoricos, pero comparar esa cifra con el salario fijo que ya cobras. Para que el ejercicio sea prudente, prepara una version conservadora sin bonus y otra en la que solo incluyas el variable que tenga condiciones claras y alcanzables.

## Caso practico: cuando 32.000 EUR no mejoran tanto como parece

Imagina que cobras 28.000 EUR brutos en 14 pagas y te ofrecen 32.000 EUR en 12. Sobre el papel parece una mejora clara. Sin embargo, si el nuevo puesto exige ir a oficina varios dias, asumir un trayecto mas largo y perder parte de la flexibilidad actual, la diferencia neta disponible puede reducirse bastante.

Ese es el motivo por el que conviene pasar cualquier propuesta a neto mensual y ponerla al lado de tus gastos recurrentes. Si la subida se traduce en 140 o 180 EUR reales al mes, la pregunta deja de ser "me suben 4.000 EUR" y pasa a ser "me compensa este cambio por el dinero real que vere en mi cuenta".

## Como plantear la negociacion

Negociar bien no significa pedir una cifra al azar. Lo mas efectivo es justificarla con contexto:

- rango de mercado del puesto,
- impacto de tus responsabilidades,
- ahorro o ingresos que generas,
- comparacion entre tu neto actual y el que te ofrecen.

Una forma practica de hacerlo es traducir varias propuestas a neto mensual y explicar que, para asumir el cambio, necesitas que la mejora se note de verdad en el bolsillo. Ese enfoque suele funcionar mejor que responder con una cifra sin justificar, porque convierte la conversacion en una comparacion razonable y no en un pulso arbitrario.

## Preguntas que conviene hacer antes de negociar la cifra final

- El variable es contractual o discrecional.
- Hay revision salarial prevista a 6 o 12 meses.
- Las pagas extras estan prorrateadas o separadas.
- Existen beneficios con valor economico real.
- Se espera disponibilidad fuera de horario o viajes frecuentes.

Estas preguntas ayudan a evitar una negociacion miope. A veces una empresa no puede subir mucho el fijo, pero si mejorar teletrabajo, variable garantizado o un calendario de revision. Otras veces ocurre lo contrario: el titular salarial parece bueno, pero el paquete total es peor de lo que parecia al principio.

## Errores frecuentes

- Comparar una oferta en 14 pagas con otra en 12 sin convertirlas a neto anual y mensual.
- Dar por hecho que la retencion de IRPF sera igual en todas las empresas.
- Aceptar un variable alto como si fuera salario fijo.
- Valorar solo el titular de la oferta sin mirar el impacto real en liquidez.
- Olvidar el coste de cambiar de rutina, trayecto o flexibilidad.

## Una regla util para no negociar a ciegas

Antes de contestar, intenta resumir cada oferta en una hoja simple con cinco filas: bruto, neto mensual, neto anual, gastos asociados y margen de ahorro estimado. Ese ejercicio obliga a aterrizar la emocion del cambio y te da una base mucho mas solida para responder con calma.

## Recomendacion final

Antes de responder a una empresa, simula varios escenarios con la [calculadora de sueldo neto](/calculadora-sueldo-neto). Te servira para llegar a la conversacion con una base clara, detectar si la mejora es real y evitar negociar a ciegas.

Si la subida tiene un objetivo concreto, traduce tambien la diferencia mensual a ese objetivo. Puedes estimar cuanto cambia tu capacidad de entrada con la guia sobre [ahorro necesario para comprar una vivienda](/articulos/cuanto-dinero-necesitas-ahorrado-para-comprar-una-vivienda) o comparar el efecto de aportar esa diferencia durante varios anos con la guia de [interes compuesto](/articulos/interes-compuesto-la-diferencia-entre-aportar-pronto-y-aportar-tarde). Asi la negociacion deja de centrarse en una cifra aislada y pasa a medir que decisiones reales permite financiar.
`,
  },
  {
    slug: 'tin-tae-cuota-mensual-como-comparar-prestamos-de-verdad',
    title: 'TIN, TAE y cuota mensual: cómo comparar préstamos de verdad',
    description:
      'Aprende a diferenciar TIN, TAE, plazo y coste total para no elegir un préstamo solo por la cuota mensual.',
    targetToolUrl: '/calculadora-prestamos',
    tags: ['prestamos', 'finanzas', 'tae'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-20T17:37:00.000Z',
    content: `## La cuota mas baja no siempre es la mejor oferta

Muchas personas comparan prestamos mirando solo la cuota mensual. Es comprensible: la cuota es el dato que mas se nota en el presupuesto domestico. El problema es que una cuota mas baja puede esconder un plazo mas largo y, por tanto, un coste total mucho mayor.

## Diferencia entre TIN y TAE

El **TIN** es el tipo de interes nominal que se aplica al capital. La **TAE**, en cambio, permite expresar el coste de la operacion en terminos anuales teniendo en cuenta el tipo, las comisiones y otros gastos incluidos en sus condiciones.

El [simulador de TAE del Banco de Espana](https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/calculo_tae_prestamo_personal.html) parte precisamente del importe, el plazo, el tipo de interes, las comisiones y otros gastos. Tambien advierte que el resultado puede diferir de la oferta de una entidad si existen condiciones adicionales. Por eso la TAE es util para comparar propuestas equivalentes, pero no sustituye la lectura del contrato ni explica por si sola todos los productos vinculados.

## Que incluye realmente la cuota

El [Banco de Espana explica que el contrato de un prestamo personal](https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/prestamopersonal/) recoge la cantidad concedida y las cuotas periodicas, que incluyen intereses, comisiones y gastos conforme a las condiciones pactadas. Antes de comparar, separa estos conceptos:

| Dato | Que te permite evaluar |
|---|---|
| TIN | El tipo nominal aplicado al capital |
| TAE | El coste anual de ofertas comparables bajo sus condiciones |
| Cuota | La presion mensual sobre tu presupuesto |
| Total devuelto | La suma que habras pagado al terminar |
| Comisiones y vinculaciones | Costes o requisitos que pueden alterar la comparacion |

Si dos propuestas no usan el mismo importe, plazo o frecuencia de pago, una diferencia de TAE no cuenta toda la historia. Igualar primero esos datos evita comparar productos distintos como si fueran equivalentes.

## Lo que cambia de verdad cuando alargas el plazo

El plazo es la palanca que mas facilmente maquilla una oferta. Si alargas meses o anos, la cuota se suaviza y parece mas asumible. El problema es que ese alivio casi siempre se compra pagando mas intereses durante mas tiempo.

Por eso dos prestamos con cuota parecida pueden ser radicalmente distintos en coste total. Uno puede terminarse antes y dejarte libre de deuda. El otro puede acompanarte muchos meses adicionales solo para reducir ligeramente la presion mensual.

## Variables que mas cambian el resultado

- **Capital solicitado**: cuanto mas pides, mas interes total acabaras pagando.
- **Plazo**: a mayor plazo, menor cuota, pero mas intereses acumulados.
- **Tipo aplicado**: pequenas variaciones tienen impacto grande en prestamos largos.
- **Comisiones**: apertura, cancelacion anticipada o estudio.
- **Productos vinculados**: seguros, tarjetas o domiciliaciones que alteran el coste efectivo.

## Ejemplo simple

Un prestamo de 10.000 EUR a 5 anos con un tipo del 7 % puede parecer razonable por cuota. Pero si alargas el plazo a 8 anos, la cuota baja y el coste total sube. Esa diferencia es la que deberias mirar antes de firmar.

La pregunta util no es solo "cuanto pago al mes", sino tambien "cuanto dinero extra pago por ganar esa comodidad". Cuando lo planteas asi, a veces descubres que bajar 35 o 40 EUR la cuota implica asumir cientos o miles de euros mas de coste financiero.

## Senales de alerta al leer una oferta

1. La cuota parece sorprendentemente baja para el capital pedido.
2. La TAE aparece, pero no te explican con claridad de donde sale.
3. Hay comisiones pequenas que parecen irrelevantes por separado.
4. El comercial insiste en la cuota y evita hablar del total devuelto.
5. El ahorro por amortizacion anticipada no queda claro.

## Errores comunes al comparar financiacion

1. Elegir solo por cuota mensual.
2. Ignorar comisiones y productos vinculados.
3. No revisar si conviene amortizar antes de tiempo.
4. No comparar el coste total devuelto.
5. Firmar sin probar al menos dos plazos distintos con el mismo capital.

## Un metodo rapido para comparar dos propuestas

Cuando tengas dos ofertas delante, intenta ponerlas en una tabla con estas columnas: capital, plazo, TIN, TAE, cuota, total devuelto y coste por cancelar antes. Si uno de esos datos no esta claro, todavia no tienes una comparacion real.

Ese ejercicio suele revelar algo importante: la mejor oferta no siempre es la de la entidad mas conocida, sino la que mantiene un equilibrio razonable entre cuota, flexibilidad y coste total.

## Que hacer antes de firmar

Usa la [calculadora de prestamos](/calculadora-prestamos) para comparar escenarios con el mismo capital y distintos plazos. Despues revisa la documentacion precontractual, confirma que has incluido las comisiones y verifica si la TAE publicada corresponde a las condiciones de tu caso real.
`,
  },
  {
    slug: 'como-calcular-el-iva-correctamente-en-facturas-y-presupuestos',
    title: 'Cómo calcular el IVA correctamente en facturas y presupuestos',
    description:
      'Repaso práctico de base imponible, cuota, tipos del IVA y errores típicos al preparar facturas o presupuestos.',
    targetToolUrl: '/calculadora-iva',
    tags: ['iva', 'facturacion', 'autonomos'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-20T17:38:00.000Z',
    content: `## IVA: lo que mas se confunde en el dia a dia

El IVA parece sencillo hasta que tienes que quitarlo de un precio final o revisar una factura antigua. En ese punto aparecen errores muy comunes: aplicar el porcentaje sobre una cantidad equivocada, confundir base imponible con total o no saber cuando corresponde un tipo reducido.

En muchos negocios pequenos el problema no es la teoria, sino la velocidad. Cuando preparas varios presupuestos, corriges tickets o revisas facturas de proveedores, es facil cometer fallos por hacerlo mentalmente o por copiar una formula a medias.

## Los tres datos que debes distinguir

- **Base imponible**: importe antes de impuestos.
- **Cuota de IVA**: cantidad resultante de aplicar el porcentaje.
- **Total**: base imponible mas cuota.

Si tienes base y porcentaje, calcular el total es directo. Si tienes el total final, quitar el IVA requiere dividir correctamente por el factor correspondiente y no limitarse a restar un porcentaje simple.

## El error mas habitual: restar 21 en lugar de dividir entre 1,21

Cuando una factura totaliza 121 EUR, muchas personas restan 21 % y concluyen que la base es 95,59 EUR o una cifra parecida segun el calculo improvisado. Ese enfoque es incorrecto porque el porcentaje ya esta incluido en el total.

La manera correcta es dividir 121 entre 1,21. Solo asi recuperas la base real sobre la que se aplico el impuesto. Parece un matiz pequeno, pero es el fallo que mas se repite en presupuestos rapidos y comprobaciones de ultima hora.

## Tipos mas habituales en Espana

- **21 %**: tipo general.
- **10 %**: tipo reducido para determinados bienes y servicios.
- **4 %**: tipo superreducido para supuestos concretos.
- **0 %**: aplicable solo a determinadas operaciones previstas por la normativa.

La [Agencia Tributaria detalla los tipos impositivos vigentes](https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/tipos-impositivos-iva.html) y los supuestos a los que se aplica cada uno. Que exista un tipo reducido, superreducido o del 0 % no permite elegirlo libremente: depende del bien, el servicio y las condiciones de la operacion.

## Calculo y criterio fiscal son decisiones distintas

La formula puede ser correcta y la factura seguir estando mal si se ha elegido un tipo que no corresponde. La [Agencia Tributaria separa el calculo del IVA repercutido](https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes.html) de la identificacion del tipo aplicable: primero debes saber que tratamiento fiscal corresponde y despues calcular la cuota sobre la base imponible.

Esta distincion es especialmente importante en actividades con excepciones, operaciones exentas o ventas que combinan conceptos diferentes. La calculadora resuelve la operacion aritmetica; no clasifica fiscalmente lo que estas vendiendo.

## Situaciones practicas donde mas ayuda una calculadora

- Preparar un presupuesto para un cliente y querer ver base, cuota y total en segundos.
- Revisar si un proveedor ha aplicado un tipo coherente.
- Convertir rapidamente precios con IVA a importes sin IVA para estimar margen.
- Comprobar tickets o gastos antes de registrarlos.

## Ejemplo rapido

Si una factura tiene una base de 100 EUR y un IVA del 21 %, la cuota sera 21 EUR y el total 121 EUR. Si lo unico que conoces es el total de 121 EUR, la base no se obtiene restando 21 %, sino dividiendo entre 1,21.

Algo parecido ocurre con el 10 % y el 4 %. El truco practico es pensar siempre en el factor completo: 1,10 o 1,04. Eso reduce mucho los errores cuando vas con prisa.

## Errores frecuentes

1. Restar el porcentaje directamente al total para quitar el impuesto.
2. Usar un tipo general cuando el servicio tiene uno reducido.
3. No redondear de forma coherente entre lineas y total de factura.
4. Confundir una estimacion rapida con un criterio fiscal definitivo.

## Una comprobacion rapida antes de enviar un documento

Si trabajas con presupuestos o facturas, merece la pena revisar tres cosas antes de dar el importe por bueno: que el tipo aplicado sea el correcto, que la base cuadre con la cuota y que el redondeo no rompa el total final. Esa mini revision tarda menos de un minuto y evita correcciones posteriores.

## Recomendacion practica

Usa la [calculadora de IVA](/calculadora-iva) para presupuestos rapidos, revision de tickets o comprobacion de importes. Para facturacion formal, revisa siempre el tipo aplicable, la normativa de tu operacion y el criterio de redondeo de tu software.
`,
  },
  {
    slug: 'webp-cuando-conviene-convertir-imagenes-y-cuando-no',
    title: 'WebP: cuándo conviene convertir imágenes y cuándo no',
    description:
      'Ventajas, limitaciones y buenas prácticas para usar WebP sin perder calidad ni romper compatibilidad.',
    targetToolUrl: '/compresor-webp',
    tags: ['imagenes', 'webp', 'rendimiento'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-20T17:50:00.000Z',
    content: `## Por que WebP se ha vuelto el formato por defecto en muchas webs

Reducir el peso de las imagenes es una de las mejoras mas rentables en cualquier sitio web. Menos peso significa menos tiempo de descarga, mejor experiencia movil y, en muchos casos, mejores metricas de rendimiento. WebP se ha consolidado porque admite compresion con y sin perdida, transparencia y animacion.

Google documenta que, en sus estudios, las [imagenes WebP sin perdida fueron un 26 % menores que PNG](https://developers.google.com/speed/webp) y las versiones con perdida entre un 25 % y un 34 % menores que JPEG a calidad comparable. Son referencias generales, no una garantia para cada archivo: una captura, un logotipo y una fotografia pueden responder de forma muy distinta al mismo ajuste.

La clave no es convertir por convertir, sino entender cuando el cambio mejora de verdad la experiencia y cuando solo complica tu flujo de trabajo. En proyectos pequenos, esa diferencia importa mucho porque cada paso extra en edicion y exportacion termina costando tiempo.

## Cuando si merece la pena usarlo

- Fotografias para blog o ecommerce.
- Imagenes decorativas en landing pages.
- Recursos de newsletters o portfolios.
- Contenido orientado a movil.
- Bibliotecas de imagenes donde el peso total afecta mucho al tiempo de carga.

## Cuando conviene revisar antes

- Logos o graficos con lineas muy finas.
- Archivos que necesitas editar repetidamente.
- Flujos donde otro sistema exige PNG o JPG.
- Casos donde necesitas transparencia o exportaciones muy concretas para imprenta.

## Elegir por contenido, no solo por extension

La eleccion correcta depende de lo que contiene la imagen y de como se utilizara:

| Tipo de recurso | Primera opcion que conviene probar | Que debes comprobar |
|---|---|---|
| Fotografia | WebP con perdida o AVIF | Artefactos en piel, cielo, texto y degradados |
| Captura de interfaz | WebP sin perdida o PNG | Nitidez de texto, iconos y lineas finas |
| Logotipo o icono geometrico | SVG | Que no incluya rasterizados innecesarios |
| Imagen con transparencia | WebP, AVIF o PNG | Bordes, sombras y compatibilidad del flujo |
| Animacion compleja | Video antes que GIF | Peso, controles, accesibilidad y reproduccion |

La guia de rendimiento de web.dev recomienda [elegir el formato segun las propiedades visuales y funcionales](https://web.dev/articles/choose-the-right-image-format), y servir imagenes rasterizadas con dimensiones adecuadas. Convertir una fotografia enorme a WebP sin ajustar sus pixeles puede seguir dejando una descarga excesiva.

## Un criterio util antes de convertir una carpeta entera

Si una imagen ya pesa poco, apenas aparece en pantalla o forma parte de un flujo interno, el beneficio real de convertirla puede ser minimo. En cambio, si se trata de una portada, una galeria o una pagina con mucho trafico movil, reducir kilobytes si suele marcar diferencia.

La mejor decision suele salir de comparar tres cosas: peso final, calidad visual y compatibilidad con tu herramienta de trabajo. Si una de las tres falla, no compensa adoptar el formato por inercia.

## Como evitar errores habituales

1. No comprimas a ciegas: compara calidad visual y peso final.
2. Manten una copia original por si luego necesitas volver a editar.
3. Verifica dimensiones finales: a veces el problema no es el formato, sino subir una imagen mucho mas grande de lo necesario.
4. Si tu proyecto necesita compatibilidad antigua, usa fallback con la etiqueta <picture>.
5. No confundas compresion con optimizacion completa: el tamano visual sigue importando igual.

## Relacion con SEO y Core Web Vitals

WebP no concede una ventaja SEO automatica. Si una imagen es el elemento principal visible, su peso y tiempo de descarga pueden influir en LCP. Comprimirla, dimensionarla correctamente y priorizar su carga puede mejorar esa metrica y reducir el consumo de datos del usuario.

Ademas, una biblioteca de imagenes bien optimizada reduce la friccion del usuario en movil. No es solo una cuestion de robots o metricas: una pagina que pesa menos suele cargar antes, consumir menos datos y dar una sensacion de mayor calidad tecnica.

## Recomendacion practica para equipos pequenos

Antes de migrar todo a WebP, prueba con 10 o 15 imagenes reales de tu sitio. Revisa cuanto baja el peso, si la calidad aguanta y si tu CMS o tu flujo de publicacion lo soportan sin rozes. Ese piloto pequeno suele darte una respuesta mas fiable que cualquier consejo generico.

## Conclusiones

WebP suele ser una mejora clara para contenido web, pero no sustituye una estrategia completa de optimizacion. Tamano correcto, imagenes responsivas, carga diferida fuera de pantalla y eleccion de formato siguen siendo igual de importantes.

Convierte una muestra con el [compresor WebP](/compresor-webp), compara el archivo resultante al tamano real de uso y conserva el original. Si el recurso es un codigo QR, evita una compresion que difumine el patron y sigue primero la guia para [crear QR faciles de escanear](/articulos/como-crear-codigos-qr-utiles-y-evitar-errores-de-escaneo).
`,
  },
  {
    slug: 'como-crear-codigos-qr-utiles-y-evitar-errores-de-escaneo',
    title: 'Cómo crear códigos QR útiles y evitar errores de escaneo',
    description:
      'Guía práctica para generar códigos QR legibles, útiles y preparados para móvil, impresión y cartelería.',
    targetToolUrl: '/generador-qr',
    tags: ['qr', 'marketing', 'movil'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-20T18:09:35.000Z',
    content: `## Un QR no sirve si nadie puede escanearlo

Los codigos QR parecen trivialmente faciles de crear, pero en la practica fallan mucho por decisiones de diseno: poco contraste, tamano insuficiente, enlaces rotos o exceso de elementos decorativos.

Lo que parece una tarea de segundos puede convertirse en un problema si el QR termina en una carta lenta, una landing desactualizada o un PDF imposible de leer en movil. El codigo solo es la puerta de entrada: la experiencia completa empieza despues del escaneo.

## Que deberia tener un QR funcional

- Un contenido claro: URL final, telefono, texto o tarjeta de contacto.
- Tamano suficiente para el contexto de uso.
- Contraste alto entre modulos y fondo.
- Pruebas reales en varios moviles antes de imprimir o publicar.
- Un destino rapido y pensado para el dispositivo desde el que se escanea.

## La zona de silencio no es decorativa

El patron necesita un espacio limpio alrededor para que el lector separe el codigo de textos, bordes, fotografias y otros elementos del diseño. DENSO WAVE, creadora del QR Code, indica que la [zona de silencio debe tener cuatro modulos en los cuatro lados](https://www.qrcode.com/en/howto/code.html). Un modulo es cada cuadrado minimo que forma el patron.

No recortes ese margen al exportar ni coloques un marco, un logotipo o una frase dentro. Una imagen puede parecer mas integrada en el cartel si ocupa todo el espacio, pero tambien puede dejar de ser reconocible para la camara. El generador de CajaUtil incluye ese margen de cuatro modulos en la descarga.

## Tamano, resolucion y distancia de lectura

No existe un unico tamaño correcto en centimetros para todos los casos. Depende de cuantos modulos tenga el codigo, de la resolucion de impresion, de la distancia y de la camara que lo lee. DENSO WAVE recomienda [imprimir los modulos tan grandes como permita el espacio disponible](https://www.qrcode.com/en/howto/cell.html) y usar al menos cuatro puntos de impresora por modulo para una operacion estable.

Esto explica por que aumentar solo el lienzo no siempre salva un QR complejo. Una URL larga genera un patron mas denso: cada modulo termina siendo mas pequeno dentro del mismo tamaño fisico. Si el codigo va a verse desde lejos, simplifica el contenido, aumenta el tamaño final y prueba una copia a escala real antes de producir todo el material.

## Correccion de errores: ayuda, pero no sustituye una buena impresion

La correccion de errores permite recuperar parte de los datos cuando existe suciedad o daño. [DENSO WAVE documenta cuatro niveles](https://www.qrcode.com/en/about/error_correction.html): elevar el nivel mejora la capacidad de recuperacion, pero tambien aumenta la cantidad de datos y puede hacer el patron mas denso.

El generador de CajaUtil utiliza nivel H para ofrecer mayor tolerancia. Aun asi, no debes usar esa tolerancia como permiso para tapar esquinas, reducir contraste o imprimir demasiado pequeño. La correccion puede ayudar ante daños parciales; no corrige una fotografia desenfocada, una zona de silencio eliminada o un destino web roto.

## Escenarios habituales

### Restaurantes y menus

Lo importante no es solo el codigo, sino que el destino cargue rapido y se vea bien en movil.

Si el menu tarda, tiene letras pequenas o obliga a hacer zoom, el usuario no percibe un fallo del PDF: percibe que el QR no sirve.

### Tarjetas de visita

Conviene que el QR apunte a una pagina ligera o a una vCard limpia, no a una pagina llena de scripts pesados.

En este contexto menos es mas. Cuanta menos friccion haya entre el escaneo y la accion final, mayor sera la probabilidad de que el contacto termine guardando tus datos.

### Carteleria y escaparates

Cuanta mas distancia haya entre el usuario y el cartel, mas grande debera ser el codigo.

Tambien conviene pensar en la luz ambiente, el reflejo del cristal y la calidad de impresion. Un QR perfecto en pantalla puede fallar en la calle si no se prueba en condiciones reales.

## Errores de destino que tambien rompen un QR

- Enlazar a una URL temporal o con parametros que luego caducan.
- Apuntar a una pagina pesada para cobertura movil normal.
- No revisar si el contenido final sigue activo tras unas semanas.
- Usar acortadores o redirecciones opacas sin necesidad.

Tampoco conviene publicar en un QR credenciales, claves privadas o datos que deban permanecer restringidos: cualquiera que vea el soporte puede copiarlos. Si el acceso necesita una clave, aplica primero las recomendaciones para [crear y guardar contrasenas seguras](/articulos/por-que-las-contrasenas-largas-suelen-ser-mejores-que-las-complejas) y decide si ese cartel es realmente el canal adecuado.

## Errores mas comunes

1. Cambiar colores hasta perder legibilidad.
2. Usar un tamano demasiado pequeno para impresion.
3. Generar un QR hacia una URL provisional que luego cambia.
4. No comprobar el enlace con cobertura movil normal.
5. Dar por hecho que un unico test en tu movil basta para todos los casos.

## Una lista rapida antes de publicarlo

Antes de mandar a imprenta o publicar un QR en un cartel, merece la pena hacer esta comprobacion minima: probarlo con iPhone y Android, revisar el destino con datos moviles, confirmar que el enlace no redirige de forma rara y comprobar que el contraste sigue siendo alto en el material final.

| Comprobacion | Que revisar |
|---|---|
| Contenido | La URL o el texto codificado es definitivo y no contiene errores |
| Margen | Quedan cuatro modulos limpios alrededor del patron |
| Contraste | Los modulos se distinguen con claridad del fondo |
| Tamaño | La prueba impresa se lee desde la distancia de uso prevista |
| Dispositivos | Funciona al menos en iPhone y Android con camaras distintas |
| Destino | La pagina abre con datos moviles, carga rapido y sigue activa |
| Archivo final | El QR se vuelve a leer desde el PDF, imagen o impresion definitiva |

## Recomendacion final

Genera una primera version con el [generador de QR](/generador-qr), descargala e imprimela a escala real si el destino es fisico. Despues prueba el archivo final con varios dispositivos y compruebalo tambien con el [lector de QR desde imagen](/lector-qr). Este flujo detecta tanto problemas del patron como errores introducidos al maquetar, comprimir o exportar el diseño.

Si el QR forma parte de una imagen para web, revisa antes [cuando conviene convertir a WebP](/articulos/webp-cuando-conviene-convertir-imagenes-y-cuando-no). Una compresion con perdida puede ser razonable para la fotografia que lo rodea, pero no para el patron que debe decodificarse.
`,
  },
  {
    slug: 'por-que-las-contrasenas-largas-suelen-ser-mejores-que-las-complejas',
    title: 'Contraseñas largas: por qué suelen ser más seguras',
    description:
      'Descubre por qué la longitud y la aleatoriedad protegen más que las reglas complejas, cuántos caracteres usar y cómo guardar tus contraseñas con seguridad.',
    targetToolUrl: '/generador-contrasenas',
    tags: ['seguridad', 'contrasenas', 'privacidad'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-20T17:51:00.000Z',
    content: `## El problema de las reglas antiguas

Durante anos se repitio la misma receta: una mayuscula, un numero, un simbolo y listo. El problema es que cumplir esa plantilla no elimina patrones humanos previsibles. La **longitud**, la **aleatoriedad real** y no reutilizar la clave importan mas que una complejidad puramente cosmetica.

El problema de muchas contrasenas supuestamente complejas es que siguen teniendo una logica humana facil de adivinar: nombres, fechas, patrones repetidos o sustituciones obvias como cambiar una a por @. Eso da sensacion de seguridad, pero no siempre resistencia real.

## Que hace fuerte a una contrasena

- Muchos caracteres.
- Sin palabras obvias ni sustituciones tipicas.
- Distinta para cada servicio.
- Guardada en un gestor fiable en lugar de reutilizarla.
- Acompanada de doble factor cuando el servicio lo permite.

## Longitud frente a complejidad

Una contrasena corta con muchos simbolos puede seguir siendo peor que una larga y aleatoria. Como referencia para los servicios que verifican contrasenas, la [publicacion NIST SP 800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html#passwordver) exige un minimo de 15 caracteres cuando la contrasena es el unico factor y permite ocho cuando forma parte de una autenticacion multifactor. Tambien recomienda admitir al menos 64 caracteres.

Eso no convierte 15 en una cifra magica para todas las cuentas. Una clave generada aleatoriamente de 16 o mas caracteres ofrece un margen practico alto, siempre que el servicio la acepte, sea unica y se almacene de forma segura.

En el dia a dia, la mejor estrategia no es inventar claves cada vez mas ingeniosas, sino reducir la dependencia de la memoria. Si cada cuenta tiene una contrasena distinta y fuerte guardada en un gestor, el riesgo baja mucho aunque tu no recuerdes ninguna salvo la maestra.

## Donde suele romperse la seguridad de verdad

- Reutilizacion entre servicios.
- Fugas de datos en una web secundaria.
- Contrasenas guardadas en notas o correos sin proteccion.
- Ausencia de doble factor en cuentas criticas.
- Respuestas de recuperacion faciles de deducir.

## Reglas que ya no ayudan como se pensaba

NIST indica que los servicios no deberian imponer reglas adicionales de composicion ni exigir cambios periodicos sin evidencia de compromiso. Forzar una sustitucion cada pocas semanas puede llevar a variaciones predecibles, como cambiar solo el mes o el ultimo numero.

El cambio inmediato si es necesario cuando existe una filtracion, un aviso de acceso no reconocido o sospecha de robo. En ese caso, cambia primero la cuenta afectada y despues cualquier otra donde hayas reutilizado una clave igual o parecida.

## Gestor, doble factor y passkeys

Un gestor reduce la tentacion de reutilizar claves y permite generar una distinta para cada servicio. NIST tambien exige que los verificadores permitan gestores y autocompletado. Para correo, banca y cuentas que recuperan otras credenciales, activa ademas un segundo factor; si el servicio ofrece una opcion resistente al phishing, como una passkey o llave de seguridad, merece prioridad frente a codigos reenviables.

Ninguna contrasena evita que entregues tus credenciales en una pagina falsa. La longitud protege frente a intentos de adivinacion, mientras que el segundo factor y los autenticadores resistentes al phishing cubren otros tipos de ataque.

## Errores frecuentes

1. Reutilizar la misma contrasena en varios sitios.
2. Crear variantes previsibles del mismo patron.
3. Guardarlas en notas sin proteccion.
4. No activar doble factor en servicios criticos.
5. Pensar que una clave dificil de recordar siempre es mas segura.

## Una regla simple para cuentas importantes

Si una cuenta te doleria perderla, la combinacion minima deberia ser esta: contrasena unica, longitud generosa, generacion aleatoria y doble factor activo. Esa base suele proteger mejor que cualquier truco creativo para "complicar" una palabra facil.

## Recomendacion practica

Usa el [generador de contrasenas](/generador-contrasenas) para crear una clave unica y larga, guardala en un gestor y reserva la memoria para una contrasena maestra robusta. El generador funciona en tu navegador, pero la seguridad final depende tambien de donde almacenas la clave, de no reutilizarla y de activar protecciones adicionales.
`,
  },
  {
    slug: 'iban-bic-y-transferencias-como-evitar-errores-antes-de-enviar-dinero',
    title: 'IBAN y BIC: evita errores antes de una transferencia',
    description:
      'Aprende qué validan el IBAN y el BIC, qué no comprueban y qué datos revisar antes de confirmar una transferencia para reducir errores y fraudes.',
    targetToolUrl: '/validador-iban',
    tags: ['iban', 'banca', 'transferencias'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-20T17:39:00.000Z',
    content: `## Validar no es lo mismo que confirmar titularidad

Un validador de IBAN sirve para detectar errores de formato y de digitos de control. Eso ya evita muchos fallos tipicos al copiar o transcribir una cuenta bancaria. Sin embargo, la herramienta no confirma por si sola que el titular sea correcto ni que la cuenta este operativa.

Esa distincion es importante porque muchas personas interpretan "IBAN valido" como "destinatario correcto". No es asi. La validacion reduce errores mecanicos, pero no sustituye una comprobacion de identidad cuando hay dinero de por medio. El [Banco de Espana define el IBAN como identificador unico](https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/serviciospago/traspasostransfe/guia-textual/conceptocaracter/Identificador_unico.html) de la cuenta en Espana y en la zona SEPA.

## Que comprueba realmente un IBAN

- Longitud adecuada segun el pais.
- Estructura valida.
- Digitos de control correctos mediante el algoritmo MOD 97.

## Que no comprueba

- Nombre del titular.
- Si la cuenta esta activa.
- Si pertenece al destinatario que crees.
- Si el pago solicitado forma parte de un fraude o una suplantacion.

## Errores comunes al enviar transferencias

1. Copiar espacios o caracteres extra.
2. Confundir un cero con una O o un uno con una I.
3. Dar por valida una cuenta solo porque el banco no da error inmediato.
4. No contrastar el IBAN con una fuente independiente.
5. Aceptar un cambio de cuenta por email sin verificacion adicional.

## Buenas practicas

- Valida el formato antes de confirmar el pago.
- Si es una transferencia importante, confirma el IBAN por segundo canal.
- Guarda plantillas seguras solo cuando ya has verificado al destinatario.
- Si recibes un IBAN nuevo para un proveedor habitual, verificalo antes de pagar.

## Verificacion del beneficiario: que ha cambiado

Desde el 9 de octubre de 2025, los proveedores de servicios de pago deben ofrecer gratuitamente la [verificacion del beneficiario](https://clientebancario.bde.es/pcb/es/blog/nuevo-servicio-gratuito-de-verificacion-del-beneficiario-a-partir-del-9-de-octubre-de-2025-.html) para transferencias bancarias en euros, tanto ordinarias como inmediatas. El banco comprueba si el nombre indicado coincide con el titular de la cuenta de destino y puede responder que es coincidente, casi coincidente, no coincidente o que no ha podido verificarlo.

Esta comprobacion mejora la seguridad, pero no convierte cualquier IBAN valido en un destinatario fiable. Si el resultado no coincide y decides continuar, la transferencia se ejecutara hacia el IBAN introducido. Lee el aviso de tu banco, detente ante una discrepancia y confirma el dato por un canal independiente antes de autorizar el envio.

## Cuando mas valor aporta un validador

Este tipo de herramienta es especialmente util cuando copias un IBAN largo desde una factura, un PDF o una cadena reenviada por mensajeria. En esos casos basta un caracter mal escrito para enviar dinero a una cuenta errada o provocar una devolucion evitable.

Tambien ayuda mucho en procesos internos: alta de proveedores, controles manuales antes de pagar y revisiones rapidas cuando no quieres depender solo del formulario del banco.

## Idea clave

El [validador de IBAN](/validador-iban) te ayuda a evitar fallos mecanicos antes de iniciar la operacion. La verificacion bancaria del beneficiario y tus comprobaciones por un segundo canal cubren riesgos distintos y siguen siendo necesarias cuando el pago es importante o el numero de cuenta ha cambiado.
`,
  },
  {
    slug: 'interes-compuesto-la-diferencia-entre-aportar-pronto-y-aportar-tarde',
    title: 'Interés compuesto: empezar antes o aportar más',
    description:
      'Compara con cifras cómo influyen el tiempo, las aportaciones y la rentabilidad en el interés compuesto, sin confundir una simulación con una promesa.',
    targetToolUrl: '/calculadora-interes-compuesto',
    tags: ['ahorro', 'inversion', 'interes compuesto'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-20T15:15:00.000Z',
    content: `## Por que empezar antes puede pesar mas que aportar mas

En el interes compuesto, empezar antes añade periodos en los que los rendimientos pueden generar nuevos rendimientos. Por eso una aportacion modesta mantenida durante mas anos puede alcanzar un resultado parecido, o incluso superior, al de una aportacion mayor iniciada tarde. No es una garantia de rentabilidad: es el efecto matematico de disponer de mas tiempo.

La forma mas clara de entenderlo es comparar escenarios con los mismos supuestos. La [calculadora de interes compuesto](/calculadora-interes-compuesto) permite cambiar aportacion, plazo y rentabilidad para comprobar cuanto depende el resultado de cada variable.

## Ejemplo: 100 EUR ahora frente a 200 EUR dentro de diez anos

Supongamos una rentabilidad anual constante del 5 %, capitalizacion mensual y aportaciones realizadas al final de cada mes:

| Escenario | Periodo aportando | Aportacion mensual | Dinero aportado | Capital final estimado |
|---|---:|---:|---:|---:|
| Empezar ahora | 30 anos | 100 EUR | 36.000 EUR | 83.226 EUR |
| Esperar 10 anos | 20 anos | 200 EUR | 48.000 EUR | 82.207 EUR |

En este ejemplo, quien empieza antes aporta 12.000 EUR menos y termina con una cifra ligeramente superior. La diferencia no procede de una rentabilidad mejor, sino de conceder diez anos adicionales a las primeras aportaciones.

Los importes estan redondeados y no descuentan comisiones, impuestos ni inflacion. Tampoco suponen que vaya a existir una rentabilidad estable del 5 %. Sirven para entender la relacion entre tiempo y capitalizacion, no para anticipar el resultado de un producto real.

## Como evoluciona una aportacion de 100 EUR al mes

Con el mismo supuesto teorico del 5 % anual, el crecimiento no avanza a velocidad constante:

| Plazo | Total aportado | Capital final estimado | Rendimiento acumulado estimado |
|---|---:|---:|---:|
| 10 anos | 12.000 EUR | 15.528 EUR | 3.528 EUR |
| 20 anos | 24.000 EUR | 41.103 EUR | 17.103 EUR |
| 30 anos | 36.000 EUR | 83.226 EUR | 47.226 EUR |

Durante los primeros anos, la mayor parte del saldo procede de tus aportaciones. Conforme aumenta el capital, el rendimiento hipotetico se aplica sobre una base mayor. Esa es la razon por la que la distancia entre los escenarios de 20 y 30 anos es mucho mayor que entre los de 10 y 20.

## Las cinco variables que cambian el resultado

1. **Capital inicial:** empieza a generar rendimientos desde el primer periodo.
2. **Aportacion periodica:** aumenta de forma constante la base sobre la que se calcula el crecimiento.
3. **Rentabilidad:** pequenas diferencias se amplifican con plazos largos, pero una cifra mas alta suele implicar tambien mas riesgo.
4. **Tiempo:** determina cuantos ciclos de capitalizacion puede completar el capital.
5. **Costes e impuestos:** reducen el rendimiento que realmente permanece invertido.

La frecuencia de capitalizacion tambien influye, aunque en una decision real suelen importar mas el plazo, la constancia, el riesgo y los costes totales del producto.

## Rentabilidad nominal no es rentabilidad real

Una simulacion puede mostrar crecimiento en euros y, aun asi, exagerar el aumento de poder adquisitivo si ignora la inflacion. Tambien puede omitir comisiones de gestion, custodia, compraventa o cambio de divisa.

Antes de contratar un producto conviene revisar su documentacion y entender riesgos y costes. La [CNMV publica guias para inversores](https://www.cnmv.es/Portal/Inversor/Guias.aspx) sobre conceptos, productos y precauciones que ayudan a interpretar mejor una simulacion.

## Como comparar escenarios sin enganarte

- Usa una hipotesis conservadora, otra central y otra optimista.
- Mantén iguales las demas variables cuando quieras medir el efecto de una sola.
- Introduce costes aproximados si conoces las comisiones del producto.
- Compara tambien el dinero aportado, no solo el capital final.
- Revisa el resultado en euros de hoy si el plazo es muy largo y la inflacion importa.

No busques una cifra que confirme lo que quieres creer. La utilidad de la simulacion está en descubrir que variables pueden romper el plan y cuanto margen existe si la rentabilidad es menor de la esperada.

## Que pasa si interrumpes las aportaciones

Dejar de aportar no borra el capital acumulado, pero reduce la cantidad nueva que puede beneficiarse de los periodos restantes. El efecto es mayor cuando la interrupcion ocurre al principio, porque cada aportacion omitida pierde muchos anos potenciales de capitalizacion.

Si tus ingresos cambian, una aportacion menor pero sostenible puede ser mas realista que abandonar el plan por completo. La constancia no significa mantener una cifra a cualquier precio: significa adaptar el ahorro sin comprometer gastos esenciales ni el fondo de emergencia.

## Conclusion

El interes compuesto no convierte una aportacion en riqueza de forma automatica. Muestra como el tiempo puede amplificar una estrategia constante cuando existen rendimientos positivos. Empezar antes aporta una ventaja matematica, pero el resultado real seguira dependiendo de riesgo, costes, impuestos, inflacion y disciplina.
`,
  },
  {
    slug: 'imc-calorias-y-tdee-como-leer-estas-metricas-sin-obsesionarte',
    title: 'IMC, calorías y TDEE: cómo leer estas métricas sin obsesionarte',
    description:
      'Guía para entender qué mide cada calculadora de salud, cuándo sirve y cuándo conviene no sacar conclusiones rápidas.',
    targetToolUrl: '/calculadora-calorias',
    tags: ['salud', 'imc', 'calorias'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-20T17:52:00.000Z',
    content: `## Estas calculadoras sirven para orientarte, no para diagnosticarte

Las herramientas de IMC, metabolismo basal y gasto calorico diario pueden ser utiles para tener una referencia rapida, pero no sustituyen una valoracion clinica ni un plan nutricional personalizado.

Eso no significa que no sirvan. Significa que funcionan mejor cuando se usan como punto de partida y no como sentencia. Una cifra aislada puede orientar; una interpretacion precipitada puede confundir.

## Que mide cada una

- **IMC**: relacion entre peso y altura. Sirve como indicador poblacional basico, pero no distingue masa muscular, grasa ni distribucion corporal.
- **BMR**: energia minima estimada que tu cuerpo necesita en reposo.
- **TDEE**: gasto diario total segun nivel de actividad.

La [Organizacion Mundial de la Salud describe el IMC como un marcador indirecto](https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight) y senala que medidas adicionales, como el perimetro de cintura, pueden ayudar a valorar el contexto. En adultos usa 25 como umbral de sobrepeso y 30 para obesidad, pero en menores los criterios dependen de edad y sexo.

## Por que BMR y TDEE no son una prescripcion

La formula de Mifflin-St Jeor estima el gasto en reposo a partir de variables como peso, altura, edad y sexo. El TDEE aplica despues un factor de actividad. Cada paso introduce incertidumbre: una persona puede describir su actividad de forma optimista, cambiar su entrenamiento o tener necesidades distintas a la media usada por la ecuacion.

Por eso el resultado no indica automaticamente cuanto debes comer. Es un punto de partida matematico que necesita observacion y, cuando hay una condicion clinica o un objetivo exigente, valoracion profesional.

| Resultado | Uso razonable | Lo que no demuestra |
|---|---|---|
| IMC | Detectar un rango orientativo en adultos | Composicion corporal o diagnostico individual |
| BMR | Estimar energia en reposo | Consumo diario total exacto |
| TDEE | Preparar un punto inicial segun actividad | Necesidad calorica constante o garantizada |

## Donde se suele fallar al interpretarlas

1. Tomar el IMC como conclusion definitiva.
2. Usar un nivel de actividad irreal.
3. Ajustar calorias de forma agresiva sin seguimiento.
4. Ignorar contexto: edad, sexo, entrenamiento, salud metabolica.
5. Cambiar objetivos cada pocos dias por reaccionar a un dato puntual.

## Como sacarles partido de forma sensata

Utilizalas para definir un punto de partida. Si quieres perder grasa, ganar masa o mejorar rendimiento, lo razonable es observar tendencia, adherencia y sensaciones durante varias semanas en lugar de reaccionar a un numero aislado.

Tambien conviene recordar que las formulas son estimaciones. Dos personas con la misma altura, peso y actividad declarada pueden tener necesidades reales distintas. Por eso el seguimiento en el tiempo suele aportar mas valor que la primera cifra calculada. El [NHS recuerda que el IMC no distingue musculo y grasa](https://www.nhs.uk/health-assessment-tools/calculate-your-body-mass-index/calculate-bmi-for-adults) y recomienda no usar estas herramientas para diagnosticar sintomas.

## Cuando conviene ser especialmente prudente

- Si tienes antecedentes medicos relevantes.
- Si estas en una etapa de crecimiento, embarazo o recuperacion.
- Si entrenas con mucha intensidad y el IMC no refleja tu composicion corporal.
- Si la relacion con la comida o el peso te genera ansiedad.

En estos casos, una calculadora puede seguir siendo util, pero necesita mucho mas contexto para no inducir decisiones equivocadas.

## Recomendacion final

Usa la [calculadora de IMC](/calculadora-imc) para obtener una referencia de peso y altura, y la [calculadora de calorias y TDEE](/calculadora-calorias) para comparar escenarios de actividad. Si necesitas una interpretacion clinica, estas embarazada, eres menor, tienes una condicion medica o la relacion con el peso y la comida te genera ansiedad, consulta con un profesional sanitario antes de modificar tu alimentacion.
`,
  },
  {
    slug: 'cuanto-dinero-necesitas-ahorrado-para-comprar-una-vivienda',
    title: 'Cuánto dinero necesitas ahorrar para comprar una vivienda',
    description:
      'Calcula la entrada, los gastos de compra y el colchón que conviene conservar antes de firmar una hipoteca.',
    targetToolUrl: '/calculadora-hipotecas',
    tags: ['hipoteca', 'vivienda', 'ahorro'],
    publishedAt: '2026-08-20T10:00:00.000Z',
    updatedAt: '2026-08-20T18:09:36.000Z',
    content: `## La entrada no es el único ahorro que necesitas

Cuando calculas cuánto dinero necesitas ahorrar para comprar una vivienda, es fácil quedarse con una sola cifra: la parte del precio que el banco no financia. Sin embargo, llegar a la firma exige separar al menos cuatro bolsas de dinero: la diferencia entre el precio y el préstamo, los impuestos y gastos de la compraventa, los costes que correspondan al comprador y un colchón para no estrenar la hipoteca con la cuenta vacía.

No existe un porcentaje universal válido para todas las compras. La vivienda nueva y la usada tributan de forma distinta, los impuestos cambian según la comunidad autónoma y la financiación depende de la tasación, la solvencia y la política de cada entidad. Por eso es más útil calcular por escenarios que repetir una regla cerrada.

Si comparas una vivienda nueva con una usada, no reutilices un porcentaje genérico sin confirmar qué impuesto corresponde. La guía para [calcular el IVA correctamente](/articulos/como-calcular-el-iva-correctamente-en-facturas-y-presupuestos) explica por qué la operación matemática y el criterio fiscal son decisiones distintas.

## La fórmula práctica para estimar el ahorro inicial

Puedes ordenar el cálculo así:

**Ahorro necesario = parte no financiada + impuestos y gastos de compra + tasación y costes del comprador + colchón posterior**

Cada bloque responde a una pregunta diferente:

1. **Parte no financiada:** diferencia entre el precio de compra y el importe que finalmente presta el banco.
2. **Impuestos y compraventa:** dependen de si la vivienda es nueva o usada, de su ubicación y de las circunstancias del comprador.
3. **Costes asociados:** pueden incluir tasación, copias solicitadas, asesoramiento o gestiones que no asuma la entidad.
4. **Colchón posterior:** reserva para mudanza, reparaciones, mobiliario, comunidad e imprevistos sin recurrir a deuda de consumo.

La clave es no mezclar estos importes. Si utilizas todo el ahorro para completar el precio, cualquier reparación o gasto de instalación aparecerá justo cuando acabas de asumir una obligación mensual de largo plazo.

## Ejemplo con una vivienda de 200.000 EUR

Imagina una compra de 200.000 EUR y una oferta hipotecaria de 160.000 EUR. Este 80% es solo un supuesto para entender el método; no es un derecho ni una financiación garantizada.

| Concepto | Importe ilustrativo |
|---|---:|
| Precio de compra | 200.000 EUR |
| Préstamo supuesto | 160.000 EUR |
| Parte no financiada | 40.000 EUR |
| Impuestos y compra, escenario del 8% | 16.000 EUR |
| Impuestos y compra, escenario del 10% | 20.000 EUR |
| Impuestos y compra, escenario del 12% | 24.000 EUR |

Antes de añadir tasación y colchón, el ahorro se situaría entre 56.000 y 64.000 EUR en esos tres escenarios. Los porcentajes sirven para probar sensibilidad, no para sustituir el cálculo fiscal real. Debes confirmar el impuesto aplicable, las posibles bonificaciones y los gastos concretos de la operación antes de firmar arras.

Puedes usar la [calculadora de porcentajes](/calculadora-porcentajes) para probar distintos costes de compra y la [calculadora de hipotecas](/calculadora-hipotecas) para convertir el préstamo previsto en una cuota mensual.

## Gastos de compra y gastos de hipoteca no son lo mismo

Esta distinción evita muchos cálculos inflados o incompletos. Los impuestos y gastos de comprar la vivienda pertenecen a la compraventa. Los gastos de formalizar el préstamo hipotecario tienen otro reparto.

El [Banco de España explica el reparto vigente de los gastos de formalización](https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/hipotecas/guia-textual/primerospasoscon/Gastos_asociados_a_la_hipoteca.html): el cliente paga la tasación, mientras que la entidad asume notaría, registro, impuestos y gestoría asociados a la hipoteca. Esto no significa que el banco pague los impuestos de la compraventa ni todos los costes de adquirir la vivienda.

La [Ley 5/2019 reguladora de los contratos de crédito inmobiliario](https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814) establece el marco de transparencia y protección en la contratación. Aun así, cada compraventa necesita un presupuesto desglosado para distinguir qué corresponde al préstamo y qué corresponde a adquirir el inmueble.

## El precio y la tasación pueden cambiar la financiación

El banco estudia tu capacidad de pago y también encarga o acepta una tasación homologada. Si compras por 200.000 EUR pero la valoración que utiliza la entidad es inferior, el importe financiable puede quedar por debajo de lo que esperabas. Esa diferencia sale de tu ahorro o puede impedir la operación.

Por eso conviene preparar tres escenarios antes de entregar cantidades importantes:

- **Escenario previsto:** financiación y tasación encajan con el presupuesto inicial.
- **Escenario prudente:** el banco presta algo menos y necesitas aportar más entrada.
- **Escenario de salida:** defines cuánto perderías o qué condiciones deberían cumplirse para no continuar.

Las arras y sus condiciones merecen revisión profesional. Una preaprobación comercial no equivale necesariamente a una concesión definitiva del préstamo.

## Cuánto colchón conservar después de comprar

El colchón no debería calcularse como un porcentaje automático de la vivienda, sino a partir de tus gastos reales. Suma hipoteca, alimentación, suministros, seguros, transporte, comunidad y otras obligaciones mensuales. Después decide cuántos meses necesitas poder cubrir si bajan tus ingresos o aparece un gasto importante.

Una persona con ingresos muy estables, dos titulares y pocos gastos puede aceptar una reserva distinta a la de un autónomo con ingresos variables. Lo importante es que el resultado no sea cero. Comprar una vivienda sin liquidez convierte una avería, una derrama o una mudanza más cara de lo previsto en nueva deuda.

El [Banco de España recomienda analizar coste total, cuota, plazo y productos adicionales](https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/hipotecas/guia-textual/primerospasoscon/Contratacion_de_la_hipoteca.html) antes de contratar. La entidad también evaluará ingresos, activos, gastos y compromisos, pero superar su estudio no garantiza que la operación sea cómoda para tu economía doméstica.

## Señales de que todavía vas demasiado justo

- Necesitas financiar también impuestos, muebles o reformas con préstamos personales.
- La compra consume todo tu ahorro y no deja reserva para imprevistos.
- Solo puedes pagar la cuota si mantienes bonus u horas extra inciertas.
- Has calculado la cuota inicial, pero no seguros, comunidad, mantenimiento o posibles subidas.
- El presupuesto depende de que la tasación sea igual o superior al precio.
- No has comparado la FEIN, la TAE y el coste de los productos vinculados.

En ese punto, rebajar el precio objetivo o aplazar la compra no es fracasar. Es evitar que una operación de largo plazo nazca sin margen.

## Checklist antes de firmar arras

1. Confirma cuánto presta realmente la entidad y sobre qué valor realiza el cálculo.
2. Solicita una estimación fiscal según vivienda nueva o usada y comunidad autónoma.
3. Separa los gastos de compraventa de los gastos de formalización hipotecaria.
4. Reserva el coste de tasación y cualquier servicio que contrates voluntariamente.
5. Simula la cuota con varios tipos y plazos, no solo con la oferta más optimista.
6. Comprueba cuánto ahorro queda después de firma, mudanza y primeras reparaciones.
7. Lee la FEIN y pregunta cualquier diferencia respecto a la propuesta inicial.
8. Antes de transferir arras o cantidades importantes, confirma el destinatario por un canal independiente y revisa cómo [evitar errores al copiar un IBAN](/articulos/iban-bic-y-transferencias-como-evitar-errores-antes-de-enviar-dinero).

## Preguntas frecuentes

### ¿Necesito tener ahorrado siempre el 30% del precio?

No existe una regla legal universal del 30%. Esa cifra suele mezclar una entrada orientativa con impuestos y otros gastos, pero la necesidad real depende del porcentaje financiado, la tasación, la fiscalidad y el colchón que quieras conservar.

### ¿El banco paga todos los gastos de comprar la vivienda?

No. El reparto legal de determinados gastos se refiere a la formalización de la hipoteca. Los impuestos y costes de la compraventa deben presupuestarse aparte.

### ¿Puedo usar todos mis ahorros como entrada?

Poder no significa que sea prudente. Si la operación deja tu liquidez a cero, cualquier imprevisto puede obligarte a contratar deuda más cara. Incluye una reserva posterior dentro del objetivo de ahorro.

### ¿Cómo sé si la cuota será asumible?

Compara la cuota con tu neto mensual y con todos tus gastos recurrentes. Si estás valorando una oferta laboral o un cambio de ingresos, la guía para [negociar el sueldo sin perder de vista el neto](/articulos/como-negociar-tu-sueldo-bruto-sin-perder-neto) ayuda a separar bruto, liquidez y gastos asociados. Prueba también un escenario menos favorable y revisa cuánto margen queda para ahorro, mantenimiento e imprevistos.

## Siguiente paso

Calcula primero cuánto préstamo necesitarías y simula diferentes entradas en la [calculadora de hipotecas](/calculadora-hipotecas). Después añade impuestos, tasación y colchón en partidas separadas. El resultado será menos atractivo que una regla rápida, pero mucho más útil para decidir si puedes comprar sin quedarte sin margen.
`,
  },
];

export function getEditorialArticleBySlug(slug: string): EditorialArticle | undefined {
  return editorialArticles.find((article) => article.slug === slug);
}
