export interface EditorialArticle {
  slug: string;
  title: string;
  description: string;
  targetToolUrl: string;
  relatedArticleSlugs: string[];
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  content: string;
}

export const editorialArticles: EditorialArticle[] = [
  {
    slug: 'como-leer-una-nomina-paso-a-paso',
    title: 'Cómo leer una nómina paso a paso: devengos y deducciones',
    description:
      'Aprende a revisar salario bruto, bases de cotización, IRPF, deducciones y líquido con un ejemplo comprobable y fuentes oficiales.',
    targetToolUrl: '/calculadora-sueldo-neto',
    relatedArticleSlugs: [
      'como-negociar-tu-sueldo-bruto-sin-perder-neto',
      'cuanto-dinero-necesitas-ahorrado-para-comprar-una-vivienda',
    ],
    tags: ['nomina', 'salario', 'irpf'],
    publishedAt: '2026-08-21T12:05:35.000Z',
    updatedAt: '2026-08-21T12:05:35.000Z',
    content: `## ¿Qué es una nómina y qué deberías comprobar primero?

Una nómina es el documento que explica cómo se pasa de tu salario bruto al dinero que finalmente recibes. No es solo un justificante de pago: reúne los datos de la empresa y del trabajador, el período liquidado, los conceptos que suman, las cantidades que se descuentan y las bases utilizadas para cotizar y calcular retenciones.

Para leer una nómina sin perderte, sigue siempre el mismo orden: identifica el período, revisa los devengos, localiza las bases, comprueba las deducciones y contrasta el líquido. Ese recorrido evita el error habitual de mirar solo el último número y dar por bueno todo lo anterior.

Esta guía explica cada bloque con un caso reproducible. Los porcentajes del ejemplo son ilustrativos, porque una nómina real depende del contrato, del convenio, de la situación fiscal y de los conceptos incluidos. Para contrastar datos vigentes, consulta el [servicio de retenciones de la Agencia Tributaria](https://sede.agenciatributaria.gob.es/Sede/Retenciones.shtml) y la información de [cotización de la Seguridad Social](https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/36537).

## El mapa rápido de una nómina

Aunque el diseño cambia entre empresas y programas de gestión, la información suele dividirse en cinco zonas:

1. **Encabezado**: identifica empresa, trabajador, grupo profesional y período.
2. **Devengos**: muestra todo lo generado antes de descuentos.
3. **Bases**: indica sobre qué importes se calculan cotizaciones y retenciones.
4. **Deducciones**: recoge cotizaciones del trabajador, IRPF y otros descuentos.
5. **Líquido total a percibir**: es el importe que debería llegar a tu cuenta.

Si esos cinco bloques están presentes y entiendes cómo se conectan, ya puedes detectar muchas incoherencias sin dominar legislación laboral. El objetivo no es sustituir a una asesoría, sino saber qué preguntas hacer cuando un importe no cuadra.

## 1. Revisa el encabezado y el período liquidado

Empieza por lo aparentemente sencillo. Comprueba tu nombre, documento identificativo, número de afiliación, categoría o grupo profesional y fecha de antigüedad cuando aparezca. En la parte de la empresa deben constar su denominación, identificación fiscal y código de cuenta de cotización.

El período de liquidación merece especial atención. Una nómina mensual puede reflejar 30 días aunque el mes tenga 28 o 31, según el sistema salarial aplicado. También conviene verificar si existen ausencias, incapacidad temporal, alta o baja a mitad de mes, porque pueden explicar diferencias frente al cobro anterior.

La antigüedad y el grupo profesional no son detalles decorativos. Pueden afectar a complementos, bases y condiciones previstas por convenio. Si alguno no coincide con tu contrato o con una modificación firmada, pide una explicación antes de asumir que es un simple error de formato.

## 2. Entiende los devengos: todo lo que suma

Los devengos son las cantidades generadas durante el período. Normalmente se separan entre percepciones salariales y no salariales. Las primeras retribuyen el trabajo; las segundas pueden compensar gastos o situaciones concretas, aunque su tratamiento depende de cada concepto y de los límites aplicables.

Entre los devengos salariales puedes encontrar:

- salario base,
- complementos de convenio, puesto, antigüedad o responsabilidad,
- horas extraordinarias,
- incentivos, comisiones o bonus,
- prorrata de pagas extraordinarias,
- retribución en especie.

No sumes mentalmente solo el salario base. Dos ofertas con la misma base pueden producir brutos diferentes por complementos, y un variable cobrado un mes no debe confundirse con una cantidad garantizada. Para comparar empleos, separa siempre fijo, variable y compensaciones de gastos.

Las percepciones no salariales pueden incluir dietas, kilometraje, suplidos o determinadas indemnizaciones. Que aparezcan en la nómina no significa automáticamente que tengan el mismo tratamiento fiscal o de cotización que el salario. Revisa el concepto exacto y no des por hecho que todo importe denominado dieta está exento.

## 3. Diferencia salario bruto, base de cotización y base de IRPF

Este es uno de los puntos que más confunden. El total devengado, la base de cotización y la base sometida a IRPF pueden parecer cifras intercambiables, pero no siempre lo son. Cada una responde a una finalidad distinta.

El **bruto** resume lo generado antes de deducciones. La **base de cotización** sirve para aplicar los tipos correspondientes a contingencias y otros conceptos de Seguridad Social. La **base sujeta a IRPF** se utiliza para calcular la retención fiscal. Retribuciones en especie, pagas extra prorrateadas, horas extra o conceptos con tratamiento específico pueden hacer que estas cifras no coincidan exactamente.

Por eso una calculadora sencilla debe presentarse como simulación. Puede aplicar los porcentajes que introduces sobre un bruto, pero no puede reconstruir todas las bases de una nómina individual sin conocer contrato, conceptos y circunstancias. Esa limitación no invalida la estimación: simplemente define para qué sirve y para qué no.

## 4. Comprueba las deducciones una por una

Las deducciones reducen el bruto hasta llegar al líquido. Las más habituales son las aportaciones del trabajador a la Seguridad Social y la retención de IRPF. También pueden aparecer anticipos, embargos, cuotas sindicales, retribución flexible u otros ajustes autorizados.

No te limites a leer el porcentaje. Multiplica la base indicada por el tipo y comprueba el importe, teniendo en cuenta el redondeo aplicado por el programa de nóminas. Si el cálculo difiere, revisa primero que estás usando la base correcta: aplicar el porcentaje al líquido o a una base distinta produce una discrepancia falsa.

La retención de IRPF es un pago a cuenta, no el impuesto definitivo de todo el año. Puede variar si cambian ingresos previstos, contrato o circunstancias comunicadas a la empresa. Una retención baja aumenta el neto mensual, pero podría dejar una regularización posterior; una más alta reduce liquidez durante el año, aunque tampoco significa por sí sola que pagues más impuesto definitivo.

## Caso reproducible: de 2.500 EUR brutos a 1.962,50 EUR netos

Supongamos un caso deliberadamente simplificado: 2.500 EUR brutos por paga, 12 pagas, todos los conceptos incluidos en la misma base, una cotización del trabajador del 6,50 % y una retención de IRPF del 15 %. No representa una nómina universal; sirve para comprobar la aritmética de principio a fin.

| Paso | Operación | Resultado |
|---|---|---|
| Bruto mensual | Importe de partida | 2.500,00 EUR |
| Cotización | 2.500 × 6,50 % | 162,50 EUR |
| IRPF | 2.500 × 15 % | 375,00 EUR |
| Total deducciones | 162,50 + 375,00 | 537,50 EUR |
| Líquido | 2.500 − 537,50 | 1.962,50 EUR |

En términos anuales, el bruto sería 30.000 EUR, la cotización simulada 1.950 EUR, la retención 4.500 EUR y el neto 23.550 EUR. Puedes reproducir el escenario en la [calculadora de sueldo neto](/calculadora-sueldo-neto) introduciendo 30.000 EUR, 12 pagas, un 15 % de IRPF y un 6,50 % de cotización. El resultado debe coincidir salvo diferencias de redondeo.

La comprobación importante no es memorizar 1.962,50 EUR. Es entender que, si cambias cualquiera de las bases o porcentajes, cambia el resultado. En una nómina real debes utilizar los valores que aparecen en el documento o en una simulación oficial, no adoptar automáticamente los de este ejemplo.

## Cómo interpretar 12 y 14 pagas

Cobrar en 14 pagas no significa necesariamente ganar más al año. Si el salario anual es el mismo, cambia la distribución: doce mensualidades ordinarias más dos extras frente a doce pagos con las extras prorrateadas. Para comparar correctamente, lleva ambas opciones a bruto anual y neto anual.

Con el ejemplo anterior, 23.550 EUR netos anuales equivalen a 1.962,50 EUR por paga si son 12. Si se repartieran en 14 pagos iguales, serían 1.682,14 EUR por paga. El promedio mensual económico seguiría siendo 1.962,50 EUR al dividir el neto anual entre doce, aunque la tesorería real de cada mes sería distinta.

Comprueba también si las pagas extraordinarias incluyen todos los complementos. El convenio o el contrato pueden definir su composición, de modo que no siempre equivalen exactamente a una mensualidad ordinaria.

## Señales que merecen una segunda revisión

Una diferencia no demuestra por sí sola que exista un error, pero estas situaciones justifican revisar documentos o preguntar a recursos humanos:

- el salario base no coincide con el contrato o la tabla aplicable,
- falta un complemento fijo que aparecía en meses anteriores,
- las unidades de horas extra o variables no corresponden al período,
- la base cambia sin que haya variado el salario o la situación laboral,
- el porcentaje de IRPF se modifica de forma notable sin explicación,
- el líquido no coincide con el ingreso bancario,
- aparecen descuentos que no reconoces.

Guarda contrato, anexos, nóminas y justificantes de ingreso. Comparar tres meses consecutivos suele ser más útil que mirar un documento aislado, porque permite distinguir cambios recurrentes de ajustes puntuales.

## Errores frecuentes al leer una nómina

El primer error es confundir bruto con base. El segundo es interpretar la retención como el impuesto final. El tercero es comparar pagos mensuales sin convertir 12 y 14 pagas al mismo período anual.

También es frecuente ignorar la retribución en especie, contar un bonus como fijo o pensar que una dieta tiene siempre el mismo tratamiento. Otra equivocación consiste en sumar porcentajes correctos y aplicarlos a una cifra equivocada. La operación puede estar bien y la conclusión ser falsa.

Evita, por último, usar una tabla genérica como si fuera una nómina personalizada. Las referencias orientativas ayudan a detectar órdenes de magnitud, pero no conocen tus bases, reducciones, convenio ni situación comunicada a la empresa.

## Checklist para revisar tu nómina en cinco minutos

1. Confirma empresa, trabajador y período.
2. Compara salario base y complementos con el contrato y el mes anterior.
3. Suma los devengos y comprueba el total bruto.
4. Identifica la base usada para cada deducción.
5. Multiplica base por porcentaje y revisa el redondeo.
6. Resta todas las deducciones al total devengado.
7. Contrasta el líquido con el ingreso bancario.
8. Anota cualquier diferencia y solicita el detalle antes de aceptar una explicación verbal.

Este proceso no convierte una revisión doméstica en asesoramiento profesional, pero mejora mucho la calidad de la consulta. En lugar de decir "creo que cobro menos", puedes señalar el concepto, la base y la diferencia concreta.

## Preguntas frecuentes sobre la nómina

### ¿El salario neto aparece siempre con ese nombre?

No necesariamente. Puede figurar como "líquido total a percibir", "líquido" o una expresión equivalente. Es el resultado después de restar las deducciones al total devengado y debe corresponder con el pago realizado, salvo anticipos o ajustes identificados.

### ¿Por qué cambia mi neto si el bruto es igual?

Puede cambiar la retención, una base, un complemento, una ausencia o algún descuento. Compara ambos recibos línea por línea y no solo los totales. Si la diferencia procede del IRPF, pide que te indiquen la causa de la regularización.

### ¿La base de cotización debe ser igual al bruto?

No siempre. Existen conceptos y reglas que pueden producir diferencias. La nómina debe mostrar las bases utilizadas; aplica cada porcentaje sobre su base correspondiente y consulta una fuente oficial o profesional si el encaje no está claro.

### ¿Puedo calcular mi nómina solo con el salario anual?

Puedes obtener una aproximación si conoces el número de pagas y porcentajes razonables, pero no una réplica exacta. Para precisión necesitas las bases, conceptos salariales, situación fiscal y condiciones del contrato.

### ¿Qué documento uso para conocer mi IRPF?

La nómina muestra el porcentaje aplicado en ese período. Para una estimación actualizada puedes usar el servicio oficial de retenciones de la AEAT y comunicar correctamente tus circunstancias a la empresa mediante los procedimientos previstos.

## Qué hacer después de entender las cifras

Una nómina bien leída te permite comparar ofertas con el mismo criterio, detectar cambios y planificar gastos con un dato más realista. Si estás valorando otra empresa, utiliza la guía para [negociar el sueldo sin perder de vista el neto](/articulos/como-negociar-tu-sueldo-bruto-sin-perder-neto). Si el ingreso condiciona una compra, contrasta también el margen disponible con la guía sobre [ahorro necesario para comprar una vivienda](/articulos/cuanto-dinero-necesitas-ahorrado-para-comprar-una-vivienda).

La regla final es sencilla: no aceptes el líquido como una caja negra. Sigue el camino desde los devengos hasta las bases y deducciones, reproduce las operaciones y pregunta cuando una cifra no pueda explicarse. Entender el documento no garantiza que nunca haya ajustes, pero sí evita tomar decisiones importantes apoyándote en una lectura incompleta.

Cuando tengas claros los datos de tu recibo, usa la [calculadora de sueldo neto](/calculadora-sueldo-neto) para contrastar otros escenarios con tus propios porcentajes.
`,
  },
  {
    slug: 'como-negociar-tu-sueldo-bruto-sin-perder-neto',
    title: 'Cómo negociar tu sueldo bruto sin perder de vista el neto',
    description:
      'Guía práctica para evaluar ofertas salariales, traducir bruto a neto y negociar una subida con argumentos concretos.',
    targetToolUrl: '/calculadora-sueldo-neto',
    relatedArticleSlugs: [
      'como-leer-una-nomina-paso-a-paso',
      'cuanto-dinero-necesitas-ahorrado-para-comprar-una-vivienda',
      'interes-compuesto-la-diferencia-entre-aportar-pronto-y-aportar-tarde',
    ],
    tags: ['salario', 'nomina', 'empleo'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-21T12:05:35.000Z',
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

Antes de responder a una empresa, simula varios escenarios con la [calculadora de sueldo neto](/calculadora-sueldo-neto). Por ejemplo, introduce una oferta de 32.000 EUR en 12 pagas y ajusta los porcentajes a tu caso. Te servira para llegar a la conversacion con una base clara, detectar si la mejora es real y evitar negociar a ciegas.

Si antes necesitas comprobar de donde salen el bruto, las bases y las deducciones, revisa la guia para [leer una nomina paso a paso](/articulos/como-leer-una-nomina-paso-a-paso). Entender esos conceptos evita trasladar a la simulacion un porcentaje o una base incorrectos.

Tambien puedes abrir la [calculadora de sueldo neto](/calculadora-sueldo-neto) sin valores de ejemplo y completar directamente los datos de tu nomina.

Si la subida tiene un objetivo concreto, traduce tambien la diferencia mensual a ese objetivo. Puedes estimar cuanto cambia tu capacidad de entrada con la guia sobre [ahorro necesario para comprar una vivienda](/articulos/cuanto-dinero-necesitas-ahorrado-para-comprar-una-vivienda) o comparar el efecto de aportar esa diferencia durante varios anos con la guia de [interes compuesto](/articulos/interes-compuesto-la-diferencia-entre-aportar-pronto-y-aportar-tarde). Asi la negociacion deja de centrarse en una cifra aislada y pasa a medir que decisiones reales permite financiar.
`,
  },
  {
    slug: 'tin-tae-cuota-mensual-como-comparar-prestamos-de-verdad',
    title: 'TIN, TAE y cuota mensual: cómo comparar préstamos de verdad',
    description:
      'Aprende a diferenciar TIN, TAE, plazo y coste total para no elegir un préstamo solo por la cuota mensual.',
    targetToolUrl: '/calculadora-prestamos',
    relatedArticleSlugs: [
      'cuanto-dinero-necesitas-ahorrado-para-comprar-una-vivienda',
      'iban-bic-y-transferencias-como-evitar-errores-antes-de-enviar-dinero',
    ],
    tags: ['prestamos', 'finanzas', 'tae'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-21T13:23:35.000Z',
    content: `## La cuota más baja no siempre es la mejor oferta

La cuota mensual indica cuánto saldrá de tu cuenta cada mes, pero no cuánto te costará financiarte. Una cuota baja puede proceder de un tipo menor, aunque también de alargar el préstamo durante más años. En ese segundo caso ganas margen mensual a cambio de permanecer endeudado más tiempo y pagar más intereses.

Para comparar préstamos de verdad necesitas leer juntas al menos cinco cifras: capital, plazo, TIN, TAE y total a devolver. La cuota sirve para comprobar si el pago cabe en tu presupuesto; la TAE y el total ayudan a medir el precio de la financiación. Ninguna cifra aislada responde a todas las preguntas.

## ¿Cuál es la diferencia entre TIN y TAE?

El **TIN (tipo de interés nominal)** es el porcentaje nominal utilizado para calcular los intereses. No incorpora por sí solo todos los gastos de la operación. La **TAE (tasa anual equivalente)** expresa el coste o rendimiento efectivo en términos anuales a partir de los flujos y de los costes que deban incluirse en su cálculo.

Por eso, si dos préstamos tienen el mismo capital y plazo, el que anuncia un TIN menor no tiene por qué ser el más barato cuando exige una comisión de apertura u otros costes. Para comparar ofertas homogéneas, la TAE suele ser más informativa que el TIN. Aun así, debes comprobar qué condiciones se han usado para calcularla.

El [simulador de TAE del Banco de España](https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/calculo_tae_prestamo_personal.html) utiliza importe, plazo, tipo de interés, comisiones y otros gastos. También advierte que su TAE teórica puede diferir de la ofertada por una entidad si existen condiciones distintas o adicionales. La TAE facilita la comparación, pero no reemplaza la documentación precontractual ni el contrato.

## Qué responde cada cifra de una oferta

El [Banco de España explica que un préstamo personal](https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/prestamopersonal/) se formaliza mediante un contrato que recoge la cantidad concedida y las cuotas periódicas conforme a las condiciones pactadas. Antes de elegir, separa los datos:

| Dato | Pregunta que responde | Lo que no te dice por sí solo |
|---|---|---|
| Capital | ¿Cuánto dinero recibo o financio? | Cuánto devolverás en total |
| TIN | ¿Qué tipo nominal se aplica al capital? | El efecto completo de comisiones y gastos |
| TAE | ¿Cuál es el coste anual equivalente bajo esas condiciones? | Si la cuota cabe con holgura en tu presupuesto |
| Cuota | ¿Cuánto pagaré en cada vencimiento? | Cuánto costará alargar el plazo |
| Total a devolver | ¿Cuánto habré pagado al final? | Cuándo se produce cada pago |
| Comisión o vinculación | ¿Qué coste o requisito acompaña a la oferta? | Su impacto agregado si no lo cuantificas |

No compares una TAE de un préstamo a tres años con la cuota de otro a ocho como si fueran alternativas idénticas. Primero iguala capital, plazo, frecuencia de pago y servicios incluidos. Después contrasta TAE, cuota y total.

## Cómo calcula la cuota esta herramienta

La [calculadora de préstamos](/calculadora-prestamos) aplica el sistema francés a un préstamo a tipo fijo y con cuotas mensuales constantes. Es la misma hipótesis general que declara el simulador de TAE del Banco de España: cada mes se pagan intereses sobre el capital pendiente y el resto de la cuota amortiza capital.

Si llamamos **P** al capital, **i** al TIN anual expresado como decimal, **r = i / 12** al tipo mensual y **n** al número total de cuotas, la cuota estimada **C** es:

**C = P × [r × (1 + r)^n] / [(1 + r)^n − 1]**

Con un TIN del 0 %, la fórmula se simplifica a **C = P / n**. La herramienta calcula el total como **C × n** y los intereses como la suma de los intereses mensuales. En una entidad, la última cuota puede variar unos céntimos por su política de redondeo y calendario.

La simulación no calcula la TAE ni añade comisiones, seguros, períodos de carencia, cambios de tipo o pagos extraordinarios. Si una oferta contiene alguno de esos elementos, debes incorporarlo al comparar el coste real o utilizar el cuadro facilitado por la entidad.

## Caso reproducible: 10.000 EUR al 7 % TIN

Supongamos un préstamo de 10.000 EUR, un TIN fijo del 7 %, pagos mensuales, sin comisiones, sin seguros y sin carencia. Solo cambiamos el plazo. Los importes se obtienen con la fórmula anterior y se muestran redondeados a céntimos:

| Plazo | Cuota mensual | Total de cuotas | Intereses estimados |
|---|---:|---:|---:|
| 3 años (36 cuotas) | 308,77 EUR | 11.115,75 EUR | 1.115,75 EUR |
| 5 años (60 cuotas) | 198,01 EUR | 11.880,72 EUR | 1.880,72 EUR |
| 8 años (96 cuotas) | 136,34 EUR | 13.088,37 EUR | 3.088,37 EUR |

Puedes reproducir cada fila en la calculadora introduciendo 10.000 EUR, 7 % y el plazo correspondiente. Al pasar de cinco a ocho años, la cuota baja unos **61,67 EUR al mes**, pero los intereses estimados aumentan en **1.207,65 EUR**. Frente al plazo de tres años, la cuota de ocho años es 172,43 EUR menor, pero el coste financiero aumenta en 1.972,62 EUR.

Este ejemplo no demuestra que el plazo corto sea siempre correcto: una cuota demasiado alta también puede provocar impagos o dejarte sin margen para imprevistos. Demuestra algo más útil: el alivio mensual tiene un precio cuantificable y debes decidir si ese intercambio encaja en tu situación.

## Cómo cambia una comisión de apertura la comparación

Una comisión de apertura puede hacer que dos ofertas con el mismo TIN tengan distinto coste efectivo. El [Banco de España indica que esta comisión](https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/comisiones/comisionesproductosbancarios/comision-de-apertura-de-un-prestamo.html) suele expresarse como porcentaje del importe y que la entidad debe informar de ella antes de formalizar la operación.

Por ejemplo, un 1 % sobre 10.000 EUR equivale a 100 EUR. Si la comisión se paga al inicio y solo recibes económicamente 9.900 EUR aunque debas devolver las cuotas calculadas sobre 10.000 EUR, el coste efectivo es mayor que el sugerido por el TIN. No sumes esa comisión a los intereses y la llames TAE: la TAE se obtiene considerando importes y fechas de los flujos, no con una suma directa de porcentajes.

Cuantifica también seguros o cuentas vinculadas cuando sean necesarios para obtener las condiciones anunciadas. Si son opcionales, compara al menos dos escenarios: préstamo sin el producto y préstamo con el producto, incluyendo su coste durante todo el período relevante.

## Qué ocurre al amortizar antes de tiempo

Una amortización parcial reduce capital pendiente. Según cómo se recalcule el préstamo, puede bajar la cuota manteniendo el plazo o acortar el plazo manteniendo una cuota similar. Reducir plazo suele ahorrar más intereses que reducir cuota si el importe amortizado, el momento y el resto de condiciones son iguales, porque el capital permanece menos tiempo generando intereses.

Pero el resultado no se decide solo con esa regla. Revisa la compensación aplicable, la liquidez que conservarás y las condiciones del contrato. El [Banco de España explica la amortización parcial anticipada](https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/prestamopersonal/guia-textual/vidaprestamo/Amortizacion_pa_305d2c7f2dd7d51.html) y señala que en créditos al consumo puede existir compensación bajo determinadas condiciones; en otros préstamos personales dependerá de lo previsto en el contrato o del acuerdo con la entidad.

Nuestra calculadora no modela amortizaciones anticipadas. Para evaluarlas necesitas el capital pendiente en la fecha prevista, el importe extra, la posible compensación y el nuevo cuadro de amortización.

## Método para comparar dos préstamos paso a paso

1. **Iguala el capital** que necesitas financiar. No infles una oferta con servicios que no comprarías al contado.
2. **Compara el mismo plazo** para aislar el efecto del tipo y los costes.
3. **Anota TIN y TAE** sin sustituir una por otra: responden a preguntas distintas.
4. **Registra cuota y total a devolver** según la documentación de cada entidad.
5. **Añade comisiones y vinculaciones** con su importe y calendario, sin contar dos veces lo ya incorporado a la TAE o al total informado.
6. **Prueba otro plazo** para medir cuánto cuesta reducir la cuota.
7. **Revisa la salida anticipada**: compensación, amortización parcial y cancelación total.
8. **Comprueba tu margen mensual** con ingresos prudentes y gastos reales, no con el mejor mes del año.

Una tabla sencilla evita que el argumento comercial marque la comparación:

| Concepto | Oferta A | Oferta B |
|---|---:|---:|
| Capital financiado |  |  |
| Plazo y número de cuotas |  |  |
| TIN |  |  |
| TAE |  |  |
| Cuota |  |  |
| Total a devolver |  |  |
| Comisión inicial |  |  |
| Coste de productos vinculados |  |  |
| Compensación por amortizar |  |  |

Si falta un dato, no inventes una equivalencia. Solicita la documentación y confirma si el total a devolver ya incorpora cada coste antes de sumarlo.

## Señales de alerta al leer una oferta

- La publicidad destaca la cuota, pero oculta el número total de pagos.
- El TIN aparece en grande y la TAE resulta difícil de localizar.
- Una rebaja del tipo exige productos cuyo coste no se cuantifica.
- La comisión se descuenta del dinero recibido, pero el préstamo se calcula sobre el importe completo.
- No queda claro si el tipo es fijo, variable o promocional durante una parte del plazo.
- La posibilidad y el coste de amortizar anticipadamente no están explicados.
- El total a devolver solo aparece bajo supuestos que no coinciden con tu caso.

Una señal de alerta no prueba que la oferta sea irregular. Indica que necesitas una explicación escrita y cifras comparables antes de decidir.

## Errores frecuentes al comparar financiación

El error más común es elegir la cuota menor sin observar el plazo. También es frecuente comparar TIN entre ofertas con comisiones distintas, interpretar la TAE como una comisión que se suma al capital o asumir que cualquier seguro está siempre incluido en ella.

Otro fallo consiste en duplicar costes: por ejemplo, sumar una comisión al total a devolver cuando la documentación ya la incorpora. En sentido contrario, también puedes infravalorar la operación si ignoras un pago inicial descontado del importe recibido o un producto vinculado que pagarás aparte.

Finalmente, no uses una cuota simulada como promesa contractual. Una calculadora permite aislar variables y detectar órdenes de magnitud; la cifra que obliga a las partes procede de la documentación y las condiciones de la oferta real.

## Preguntas frecuentes sobre TIN, TAE y cuota

### ¿Un préstamo con menor TAE siempre es mejor?

Una TAE menor suele indicar un menor coste anual equivalente cuando comparas ofertas realmente homogéneas. No basta si cambian capital, plazo, frecuencia, riesgos o condiciones, ni responde a si puedes asumir la cuota. Contrasta también total a devolver, flexibilidad y requisitos.

### ¿La calculadora usa TIN o TAE?

Usa el TIN anual para estimar la cuota del sistema francés. No calcula la TAE porque no solicita comisiones, gastos ni sus fechas de pago. Introducir la TAE en el campo TIN produciría una simulación conceptualmente incorrecta.

### ¿Por qué al principio pago más intereses que capital?

Cada mes el interés se calcula sobre el saldo pendiente. Al inicio ese saldo es mayor, por lo que una parte más grande de la cuota corresponde a intereses. A medida que amortizas capital, baja el interés mensual y aumenta la parte destinada a devolver principal.

### ¿Conviene reducir cuota o plazo al amortizar?

Acortar plazo suele reducir más intereses si el resto de variables se mantiene, mientras que bajar cuota libera más presupuesto mensual. La decisión depende de tu liquidez, de posibles compensaciones y del cuadro que ofrezca la entidad.

### ¿Qué debo mirar antes de firmar?

Revisa la documentación precontractual y contractual, capital neto recibido, número e importe de cuotas, TIN, TAE, total a devolver, comisiones, productos vinculados, consecuencias de impago y condiciones de amortización anticipada. Si una cifra no se explica, pide el cálculo por escrito.

## Límites de esta guía y siguiente paso

Los ejemplos presuponen tipo fijo, mensualidades iguales, meses equivalentes, primer pago al mes siguiente y ausencia de carencia, comisiones o seguros. No cubren préstamos a tipo variable, cuotas finales elevadas, períodos sin amortización, cambios de condiciones ni efectos jurídicos individuales.

Usa la [calculadora de préstamos](/calculadora-prestamos) para reproducir el caso y comparar el mismo capital con varios plazos. Después sustituye la simulación por los datos de la oferta real y verifica que cada coste esté contabilizado una sola vez. La meta no es encontrar la cuota más baja: es elegir un coste asumible sin perder de vista cuánto pagarás, durante cuánto tiempo y bajo qué condiciones.
`,
  },
  {
    slug: 'como-calcular-el-iva-correctamente-en-facturas-y-presupuestos',
    title: 'Cómo calcular el IVA correctamente en facturas y presupuestos',
    description:
      'Repaso práctico de base imponible, cuota, tipos del IVA y errores típicos al preparar facturas o presupuestos.',
    targetToolUrl: '/calculadora-iva',
    relatedArticleSlugs: [
      'cuanto-dinero-necesitas-ahorrado-para-comprar-una-vivienda',
      'tin-tae-cuota-mensual-como-comparar-prestamos-de-verdad',
    ],
    tags: ['iva', 'facturacion', 'autonomos'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-21T13:04:59.000Z',
    content: `## IVA: lo que más se confunde en el día a día

El IVA parece sencillo hasta que tienes que quitarlo de un precio final, revisar una factura o separar conceptos con tipos distintos. En ese punto aparecen errores muy comunes: aplicar el porcentaje sobre una cantidad equivocada, confundir base imponible con total o asumir que un tipo reducido sirve para cualquier operación.

En muchos negocios pequeños el problema no es la teoría, sino la velocidad. Cuando preparas varios presupuestos, corriges tickets o revisas facturas de proveedores, es fácil cometer fallos por hacerlo mentalmente o por copiar una fórmula incompleta.

## Los tres importes que debes distinguir

- **Base imponible:** importe sobre el que se calcula el impuesto.
- **Cuota de IVA:** resultado de aplicar el tipo a la base imponible.
- **Total:** suma de la base imponible y la cuota.

La operación aritmética cambia según el dato de partida. Si conoces la base, añades el IVA. Si solo conoces el total con IVA incluido, debes extraer la base mediante una división; restar directamente el porcentaje no deshace la operación original.

## Fórmulas para añadir y quitar IVA

Convierte primero el porcentaje en número decimal. Para un 21 %, t = 0,21; para un 10 %, t = 0,10.

**Para añadir IVA a una base:**

- Cuota de IVA = base × t
- Total = base × (1 + t)

**Para quitar IVA de un total:**

- Base = total / (1 + t)
- Cuota de IVA = total - base

La [calculadora de IVA](/calculadora-iva) utiliza estas operaciones con el porcentaje que introduzcas y muestra base, cuota y total con dos decimales.

## El error más habitual: restar el 21 % al total

Si una factura totaliza 121 EUR con un IVA del 21 %, restar el 21 % al total produce 95,59 EUR. Esa cifra es incorrecta porque el 21 % se aplicó sobre la base, no sobre los 121 EUR finales.

La operación inversa correcta es 121 / 1,21 = 100 EUR. La cuota es 121 - 100 = 21 EUR. Esta comprobación también permite detectar el error: si aplicas un 21 % a 95,59 EUR, el resultado no vuelve a ser 121 EUR.

## Casos de control para comprobar el cálculo

Estos ejemplos se pueden reproducir introduciendo los mismos importes y tipos en la herramienta:

| Operación | Importe introducido | Tipo | Base | Cuota | Total |
|---|---:|---:|---:|---:|---:|
| Añadir IVA | 100 EUR | 21 % | 100 EUR | 21 EUR | 121 EUR |
| Quitar IVA | 121 EUR | 21 % | 100 EUR | 21 EUR | 121 EUR |
| Añadir IVA | 250 EUR | 10 % | 250 EUR | 25 EUR | 275 EUR |
| Quitar IVA | 104 EUR | 4 % | 100 EUR | 4 EUR | 104 EUR |

El método de ida y vuelta es útil para una revisión rápida: calcula el total desde la base y después vuelve a extraer la base desde ese total. Salvo pequeñas diferencias de redondeo, debes recuperar el importe inicial.

## Tipos de IVA vigentes y ámbito territorial

La [Agencia Tributaria indica para 2026](https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/tipos-impositivos-iva.html) un tipo general del 21 %, tipos reducidos del 10 % y el 4 %, y un 0 % aplicable a determinadas operaciones. Estos tipos corresponden al territorio de aplicación del IVA, formado por la Península y Baleares. El [artículo 3 de la Ley del IVA](https://www.boe.es/buscar/act.php?id=BOE-A-1992-28740#a3) excluye Canarias, Ceuta y Melilla, donde existen tributos indirectos propios.

Que estos tipos existan no permite elegirlos libremente. El porcentaje depende del bien o servicio, del lugar, de las partes y de las condiciones de la operación. Además, una operación al 0 % no debe confundirse automáticamente con una operación exenta o no sujeta: son tratamientos fiscales distintos aunque el importe repercutido pueda ser cero.

La calculadora admite un porcentaje personalizado porque también sirve para comprobar operaciones históricas o hacer simulaciones. Esa libertad matemática NO determina qué tipo legal corresponde.

## Qué puede formar parte de la base imponible

La base no siempre coincide con el precio principal escrito en una línea. La [Agencia Tributaria explica cómo calcular la base imponible](https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/calculo-base-imponible.html) y señala que, con carácter general, pueden incluirse conceptos repercutidos al cliente como comisiones, transporte, envases, embalajes o seguros.

También indica que los descuentos y bonificaciones concedidos antes o al realizar la operación pueden quedar fuera de la base cuando cumplen las condiciones aplicables. Los suplidos, que exigen requisitos concretos, tampoco se tratan igual que un gasto propio repercutido. Por eso no conviene introducir en la calculadora solo el precio principal si la operación incluye otros conceptos que legalmente forman parte de la contraprestación.

## Una factura con varios tipos necesita un desglose separado

Si una factura combina conceptos al 21 % y al 10 %, calcula cada grupo por separado:

| Grupo | Base | Tipo | Cuota | Total |
|---|---:|---:|---:|---:|
| Conceptos al tipo general | 100 EUR | 21 % | 21 EUR | 121 EUR |
| Conceptos al tipo reducido | 50 EUR | 10 % | 5 EUR | 55 EUR |
| Suma | 150 EUR | — | 26 EUR | 176 EUR |

Un tipo medio ponderado podría reproducir matemáticamente la cuota total: en este caso, 26 / 150 = 17,333... %. Sin embargo, no conserva el desglose de las bases y tipos que permite justificar y revisar cada operación. El [Reglamento de facturación exige especificar por separado la parte de base correspondiente a cada tipo](https://www.boe.es/buscar/act.php?id=BOE-A-2012-14696#a6). La herramienta calcula un tipo cada vez: para una operación mixta, realiza un cálculo por cada grupo y suma después bases, cuotas y totales.

## IVA repercutido e IVA soportado no son lo mismo

El IVA repercutido es el que un empresario o profesional cobra a sus clientes en operaciones sujetas. El IVA soportado es el que paga en sus compras. Esta calculadora desglosa un importe, pero no determina si una cuota soportada es deducible ni calcula el resultado de una autoliquidación.

La deducibilidad depende de requisitos materiales y formales, de la afectación a la actividad y de las limitaciones aplicables. No restes automáticamente todo el IVA de tus gastos al IVA cobrado basándote solo en el resultado de esta página.

## Redondeo: por qué puede aparecer un céntimo de diferencia

La herramienta redondea base, cuota y total a céntimos y hace que los tres importes mostrados cuadren entre sí. En una factura con muchas líneas, redondear cada cuota por separado puede producir un total distinto al de aplicar el tipo sobre una base agrupada y redondear al final.

Por ejemplo, tres líneas pequeñas pueden acumular fracciones de céntimo. No corrijas la diferencia cambiando el tipo o forzando una base sin entender el criterio utilizado. Para emitir una factura, aplica de forma coherente el sistema de redondeo de tu programa y revisa que base, cuota y total sean trazables.

## Cálculo correcto no significa tratamiento fiscal correcto

La fórmula puede ser exacta y la factura seguir estando mal si el tipo, la exención, el devengo o la base no corresponden. La [Agencia Tributaria organiza el cálculo del IVA repercutido](https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes.html) en decisiones separadas sobre sujeción, tipo, base y momento de repercusión.

Esta distinción importa en anticipos, operaciones exentas, inversión del sujeto pasivo, comercio exterior, ventas intracomunitarias y facturas rectificativas. La calculadora resuelve la aritmética; no clasifica fiscalmente la operación ni sustituye la normativa o el asesoramiento profesional.

## Errores frecuentes al calcular el IVA

1. Restar el porcentaje directamente al total para quitar el impuesto.
2. Aplicar el tipo sobre un importe que no contiene todos los conceptos de la base.
3. Usar el tipo general o uno reducido sin comprobar el supuesto legal.
4. Mezclar en un único cálculo conceptos sujetos a tipos diferentes.
5. Confundir IVA repercutido con IVA soportado deducible.
6. Cambiar importes para ocultar una diferencia de redondeo.
7. Tratar una estimación rápida como criterio fiscal definitivo.

## Lista de comprobación antes de enviar una factura

- Identifica primero la operación y confirma si está sujeta, exenta o no sujeta.
- Comprueba qué conceptos forman parte de la base imponible.
- Separa las bases cuando haya varios tipos de IVA.
- Recalcula cuota y total con las fórmulas de ida y vuelta.
- Revisa el redondeo y conserva un desglose que permita reconstruir el resultado.
- Contrasta los casos dudosos con la Agencia Tributaria o con un profesional.

Usa la calculadora para presupuestos rápidos, revisión de tickets o comprobación de importes. Para facturación formal, revisa siempre el tratamiento aplicable y la configuración de tu software.
`,
  },
  {
    slug: 'webp-cuando-conviene-convertir-imagenes-y-cuando-no',
    title: 'WebP: cuándo conviene convertir imágenes y cuándo no',
    description:
      'Ventajas, limitaciones y buenas prácticas para usar WebP sin perder calidad ni romper compatibilidad.',
    targetToolUrl: '/compresor-webp',
    relatedArticleSlugs: [
      'como-crear-codigos-qr-utiles-y-evitar-errores-de-escaneo',
    ],
    tags: ['imagenes', 'webp', 'rendimiento'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-21T11:42:58.000Z',
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

## Prueba reproducible con una imagen real de CajaUtil

Para no basar esta guia solo en porcentajes ajenos, convertimos la imagen social de CajaUtil en la version de produccion del compresor. El archivo original og-image.png mide 640 x 640 px y ocupa 545,3 KB. Con calidad 80, el navegador genero og-image_q80.webp con 37,3 KB, una reduccion aproximada del 93 %.

| Paso | Valor observado |
|---|---|
| Entrada | PNG, 640 x 640 px, 545,3 KB |
| Ajuste | WebP con calidad 80 |
| Salida | WebP, 37,3 KB |
| Procesamiento | Local en el navegador, sin subida del archivo |

El resultado demuestra que esta imagen concreta se beneficia mucho de la conversion, no que cualquier PNG vaya a reducirse en la misma proporcion. Una captura con texto fino, un archivo ya optimizado o una fotografia distinta pueden producir un ahorro menor, crecer o perder detalle visible. Para repetir la prueba, descarga la imagen social de CajaUtil, cargala en el [compresor WebP](/compresor-webp), conserva la calidad 80 y compara ambos archivos a tamano real.

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
    relatedArticleSlugs: [
      'webp-cuando-conviene-convertir-imagenes-y-cuando-no',
      'por-que-las-contrasenas-largas-suelen-ser-mejores-que-las-complejas',
    ],
    tags: ['qr', 'marketing', 'movil'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-21T11:42:57.000Z',
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

## Prueba reproducible con un QR denso

Probamos el generador de CajaUtil con 1.200 caracteres ASCII y un tamano minimo solicitado de 100 px. El contenido obliga a usar un patron de 181 modulos por lado. Para no dibujar fracciones de modulo, la descarga ajusto el resultado a 724 x 724 px: exactamente cuatro pixeles enteros por modulo.

Despues volvimos a leer el PNG descargado con jsQR. El lector recupero los 1.200 caracteres sin diferencias. Esta comprobacion valida el archivo de ese caso concreto y el ajuste de escala; no garantiza que un QR impreso, desenfocado o modificado despues conserve la misma legibilidad.

| Dato de la prueba | Resultado |
|---|---:|
| Contenido | 1.200 caracteres ASCII |
| Modulos por lado | 181 |
| Pixeles por modulo | 4 |
| Tamano final | 724 x 724 px |
| Lectura posterior | 1.200 caracteres recuperados |

Puedes reproducir el flujo generando un texto largo, descargando el PNG y abriendolo despues en el [lector de QR desde imagen](/lector-qr). Si cambias el contenido, el numero de modulos y el tamano final pueden variar.

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
    relatedArticleSlugs: [
      'iban-bic-y-transferencias-como-evitar-errores-antes-de-enviar-dinero',
      'como-crear-codigos-qr-utiles-y-evitar-errores-de-escaneo',
    ],
    tags: ['seguridad', 'contrasenas', 'privacidad'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-21T13:51:48.000Z',
    content: `## Una contraseña compleja puede seguir siendo previsible

Durante años se repitió la misma receta: una mayúscula, un número, un símbolo y un cambio periódico. El resultado habitual no era una cadena verdaderamente imprevisible, sino variantes como una palabra conocida con la primera letra en mayúscula, un año y un signo al final. Cumplían la regla visual, pero un atacante también podía anticipar el patrón.

Una contraseña resistente combina tres propiedades distintas: **longitud**, **imprevisibilidad** y **unicidad por servicio**. La longitud amplía el espacio que tendría que explorar un ataque de adivinación; la generación aleatoria evita decisiones humanas previsibles; la unicidad impide que una filtración abra otras cuentas. Ninguna de ellas sustituye a la autenticación multifactor ni protege por sí sola frente al phishing.

La [guía vigente NIST SP 800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html#passwordver) refleja ese cambio de enfoque. Para los servicios que verifican contraseñas, establece un mínimo de 15 caracteres cuando se usan como único factor y permite un mínimo de ocho cuando forman parte de un proceso multifactor. También desaconseja imponer reglas de composición adicionales y cambios periódicos sin evidencia de compromiso.

## Qué significa que la longitud importa más

Si cada posición se elige de forma independiente y uniforme entre **N** símbolos, una cadena de longitud **L** tiene **N^L** combinaciones posibles. Su máximo teórico de información puede expresarse como **L × log2(N)** bits. Añadir una posición multiplica todas las combinaciones por N; por eso la longitud produce un efecto acumulativo.

Esta fórmula describe bien un generador uniforme conocido, pero NO permite atribuir automáticamente una cifra de entropía a una contraseña inventada por una persona. El [apéndice de NIST sobre fortaleza de contraseñas](https://pages.nist.gov/800-63-4/sp800-63b/passwords/) advierte precisamente que estimar la entropía de claves elegidas por usuarios es difícil: nombres, frases populares, sustituciones y patrones de teclado no siguen una distribución uniforme.

Una comparación sencilla muestra la diferencia. Si una máquina eligiera solo letras minúsculas de forma uniforme, existirían estos máximos matemáticos:

| Longitud | Espacio de búsqueda | Máximo teórico aproximado |
|---:|---:|---:|
| 8 | 26^8 | 37,60 bits |
| 12 | 26^12 | 56,41 bits |
| 16 | 26^16 | 75,21 bits |
| 20 | 26^20 | 94,01 bits |

No son tiempos de descifrado ni garantías. La velocidad real depende de si el ataque es online u offline, del almacenamiento del servicio, del algoritmo de hash, de su coste, del hardware y de lo que el atacante ya sepa. En un acceso online, el límite de intentos puede frenar las pruebas. Tras una brecha de hashes, el atacante puede trabajar offline sin ese límite, aunque un hash lento, con sal individual y parámetros adecuados eleva el coste.

## Por qué «Casa2026!» no equivale a nueve elecciones aleatorias

Contar caracteres sin estudiar cómo se eligieron produce una falsa sensación de precisión. «Casa2026!» tiene mayúscula, minúsculas, números y símbolo, pero procede de una palabra común, el año y una posición típica para el signo. Un atacante no necesita recorrer antes todas las cadenas posibles: prueba diccionarios, credenciales filtradas, años y transformaciones frecuentes.

Ese es el motivo por el que NIST rechaza las reglas obligatorias de composición como defensa principal. Su ejemplo explica que, al exigir mayúscula y número, quien habría usado «password» puede pasar a «Password1»; al pedir símbolo, a «Password1!». La apariencia cambia más que la estrategia.

Para una contraseña que debas memorizar, una frase larga de varias palabras no relacionadas puede ser más manejable que una cadena breve llena de signos. No utilices una cita, letra de canción, refrán ni secuencia que otras personas puedan asociar contigo. Para cuentas almacenadas en un gestor, una cadena aleatoria generada por software evita tener que inventar y recordar patrones.

## Cómo genera CajaUtil una contraseña

El [generador de contraseñas](/generador-contrasenas) ejecuta todo el proceso en el navegador. El código no realiza una petición para crear la clave ni la guarda en una base de datos. Utiliza **Crypto.getRandomValues()**, que [MDN describe como una fuente de valores criptográficamente fuertes](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues), en lugar de la función no criptográfica Math.random().

El procedimiento es reproducible mediante estos pasos:

1. Incluye siempre las 26 letras minúsculas.
2. Añade, si los seleccionas, 26 mayúsculas, 10 números y 29 símbolos.
3. Elige al menos un carácter de cada grupo activo.
4. Completa las posiciones restantes desde la unión de esos grupos.
5. Baraja el resultado con Fisher-Yates para que los caracteres obligatorios no queden siempre al principio.

Cada índice aleatorio usa **rejection sampling**. Se toma un entero de 32 bits y se descartan los valores de la franja final que impedirían repartir el rango por igual entre todos los índices disponibles. Aplicar directamente un resto a cualquier entero introduciría un pequeño sesgo cuando el tamaño del alfabeto no divide exactamente 2^32.

Con todas las opciones activas, la unión contiene 91 caracteres. Dieciséis elecciones independientes y uniformes entre 91 símbolos tendrían un límite de 16 × log2(91), aproximadamente **104,12 bits**. Esa cifra es solo una referencia superior: el generador fuerza la presencia de cada grupo y después baraja, por lo que su distribución concreta no es simplemente 91^16. No publicamos ese número como una puntuación ni como una promesa de años necesarios para romper la clave.

## Qué longitud deberías elegir

No existe un número universal que convierta cualquier contraseña en segura. Como regla operativa, usa **16 caracteres aleatorios o más** cuando el servicio lo permita y elige hasta 64 para cuentas donde prefieras un margen mayor. El control de CajaUtil permite generar entre 8 y 64, porque algunos sistemas mantienen límites heredados, pero mostrar ocho no significa recomendarlo como opción general de un solo factor.

La propia norma NIST diferencia entre una contraseña usada sola y otra integrada en autenticación multifactor. Además, el contexto cambia el riesgo: el correo principal puede restablecer muchas otras cuentas; el gestor contiene todas tus credenciales; una cuenta bancaria expone operaciones sensibles. En esos casos, usa una clave larga, única y aleatoria, junto con el método multifactor más resistente que ofrezca el servicio.

Los símbolos amplían el alfabeto disponible, pero no compensan una longitud insuficiente ni una selección previsible. Si un sitio rechaza ciertos caracteres, genera una clave más larga con los grupos admitidos en vez de crear una variante fácil de recordar.

## El gestor evita el fallo más peligroso: reutilizar

Cuando una combinación filtrada se prueba automáticamente en otros servicios se produce **credential stuffing**. El problema no es que la contraseña original fuera necesariamente corta; es que la misma credencial servía en varios lugares. Una clave única limita el alcance de la filtración a la cuenta afectada.

Un gestor fiable permite almacenar una credencial distinta por servicio, rellenarla sin teclearla y detectar reutilizaciones. NIST indica que los verificadores deben permitir gestores y autocompletado, y que deberían permitir pegar contraseñas cuando el autocompletado no esté disponible. [OWASP también recomienda facilitar los gestores de contraseñas](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#password-managers) en lugar de bloquear esos mecanismos.

Protege especialmente la contraseña maestra: debe ser larga, única y memorizable, no una derivación de tus otras claves. Activa MFA en el gestor, guarda sus códigos de recuperación fuera del propio almacén y entiende su procedimiento de recuperación antes de depender de él. No guardes la única copia de esos códigos dentro de la cuenta que necesitarías recuperar.

## MFA y passkeys cubren amenazas diferentes

Una contraseña larga sigue siendo vulnerable si la escribes en una página falsa, un malware registra el teclado o alguien controla el dispositivo. NIST recalca que longitud y complejidad no detienen el phishing ni la ingeniería social. La defensa debe tener varias capas.

Activa MFA en correo, gestor, banca, redes sociales y cualquier cuenta que permita recuperar otras. Una aplicación autenticadora o una llave de seguridad evita depender solo de la contraseña. Los códigos temporales todavía pueden ser solicitados por una web de phishing en tiempo real, así que no todos los segundos factores ofrecen la misma resistencia.

Cuando el servicio lo permita, una **passkey** es una alternativa relevante. La [FIDO Alliance explica que las passkeys](https://fidoalliance.org/passkeys/) usan pares de claves criptográficas asociados al sitio: el servidor no recibe un secreto compartido reutilizable y el inicio se aprueba desde el dispositivo. Están diseñadas para resistir el phishing, aunque debes revisar cómo se sincronizan, recuperan o vinculan a un dispositivo en el proveedor elegido.

## Qué hacer si una contraseña aparece en una filtración

No esperes al cambio periódico. Actúa cuando exista evidencia: aviso del servicio, acceso no reconocido, exposición confirmada o sospecha razonable de que alguien la ha visto.

1. Entra escribiendo la dirección oficial o desde la aplicación, no desde el enlace del aviso.
2. Cambia la contraseña afectada por una nueva, aleatoria y única.
3. Si la reutilizaste, cambia también todas sus copias, empezando por correo y cuentas financieras.
4. Cierra sesiones abiertas y revisa dispositivos, reglas de reenvío, métodos MFA y datos de recuperación.
5. Guarda nuevos códigos de recuperación y elimina factores que no reconozcas.
6. Comprueba movimientos o actividad y contacta con el proveedor si existe daño.

Cambiar todas las claves cada pocos meses sin un incidente puede fomentar patrones incrementales. NIST establece que los servicios no deben exigir rotaciones periódicas arbitrarias, pero sí forzar el cambio cuando hay evidencia de compromiso. La diferencia es responder a riesgo real en lugar de cumplir un calendario.

## Privacidad y límites del generador local

La generación local evita enviar la clave a un servidor para calcularla. Al pulsar copiar, la contraseña pasa al portapapeles del sistema porque tú lo solicitas. Puede permanecer allí hasta que otra copia la sustituya, y otras aplicaciones con los permisos adecuados podrían leerlo. Pégala inmediatamente en tu gestor y usa su borrado temporizado si está disponible. Reemplazar después el contenido reduce la exposición activa, pero no elimina posibles historiales locales ni copias sincronizadas.

«Local» tampoco significa invulnerable. Una extensión maliciosa, un equipo infectado, una grabación de pantalla o una persona mirando pueden acceder a lo que ves. No generes credenciales críticas en un dispositivo compartido o que no controles. La herramienta reduce exposición de red, pero no puede sanear el entorno desde el que se utiliza.

## Errores frecuentes que debes evitar

- Reutilizar una contraseña robusta en dos sitios.
- Añadir el nombre del servicio al mismo patrón base.
- Confundir una puntuación visual con una auditoría de seguridad.
- Enviar la clave por correo, chat o un documento compartido.
- Dejarla indefinidamente en el portapapeles.
- Guardar contraseña y códigos de recuperación en el mismo lugar sin alternativa.
- Ignorar avisos de acceso porque la clave «era muy compleja».
- Aprobar una solicitud MFA que no has iniciado.

## Checklist práctico para una cuenta importante

1. Genera una contraseña aleatoria de al menos 16 caracteres si el servicio la admite.
2. No la reutilices ni construyas una variante para otra cuenta.
3. Guárdala en un gestor fiable y comprueba que el autocompletado apunta al dominio correcto.
4. Activa MFA o una passkey; prioriza opciones resistentes al phishing.
5. Conserva códigos de recuperación en una ubicación separada y protegida.
6. Revisa sesiones y métodos de recuperación después de cualquier alerta.
7. Cámbiala inmediatamente si existe evidencia de exposición, no por una fecha arbitraria.

## Preguntas frecuentes sobre contraseñas largas

### ¿Dieciséis caracteres garantizan que una contraseña sea segura?

No. Es una referencia práctica para cadenas aleatorias, no una garantía. Dieciséis caracteres previsibles, reutilizados o robados mediante phishing pueden fallar. La fortaleza depende también del método de elección, almacenamiento, controles del servicio y segundo factor.

### ¿Es obligatorio usar mayúsculas, números y símbolos?

CajaUtil permite combinarlos para ampliar el conjunto y cumplir restricciones heredadas. Sin embargo, NIST desaconseja que los servicios impongan reglas de composición como defensa principal. Una clave larga, aleatoria y única importa más que colocar un signo en una posición previsible.

### ¿Una frase de contraseña es segura?

Puede serlo si es suficientemente larga y sus palabras no forman una cita, expresión conocida ni dato personal. Varias palabras realmente no relacionadas son más defendibles que una frase popular. Para credenciales que no necesitas memorizar, es preferible generar una cadena aleatoria y guardarla.

### ¿Debo cambiar todas mis contraseñas cada seis meses?

No como regla automática. Cámbialas ante compromiso, reutilización detectada, acceso no reconocido o indicación fundada del proveedor. Una rotación rutinaria puede producir variantes previsibles y no corrige phishing, malware ni almacenamiento inseguro.

### ¿CajaUtil puede recuperar una contraseña generada?

No. El generador no crea una cuenta ni guarda un historial de claves. Si cierras la página o generas otra sin almacenar la anterior, CajaUtil no puede recuperarla. Guárdala en el gestor antes de abandonar la pantalla.

## Recomendación final

Usa el [generador de contraseñas](/generador-contrasenas) para producir una clave larga y única, pero completa el proceso: guárdala en un gestor, activa una protección adicional y conserva una vía de recuperación segura. La longitud resuelve una parte del problema; la unicidad, el almacenamiento y la resistencia al phishing resuelven otras.
`,
  },
  {
    slug: 'iban-bic-y-transferencias-como-evitar-errores-antes-de-enviar-dinero',
    title: 'IBAN y BIC: evita errores antes de una transferencia',
    description:
      'Aprende a comprobar un IBAN, distinguirlo del BIC y revisar el beneficiario antes de confirmar una transferencia para reducir errores y fraudes.',
    targetToolUrl: '/validador-iban',
    relatedArticleSlugs: [
      'tin-tae-cuota-mensual-como-comparar-prestamos-de-verdad',
      'por-que-las-contrasenas-largas-suelen-ser-mejores-que-las-complejas',
    ],
    tags: ['iban', 'banca', 'transferencias'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-21T13:37:48.000Z',
    content: `## Validar no es lo mismo que confirmar titularidad

Un validador de IBAN sirve para detectar muchos errores de formato y de dígitos de control. Eso reduce fallos al copiar una cuenta desde una factura, un correo o un PDF. Sin embargo, superar una comprobación matemática no demuestra que la cuenta exista, esté activa o pertenezca a la persona a la que quieres pagar.

La diferencia es crítica: **IBAN formalmente válido** no significa **beneficiario confirmado**. El [Banco de España define el IBAN como identificador único](https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/serviciospago/traspasostransfe/guia-textual/conceptocaracter/Identificador_unico.html) de la cuenta en España y en la zona SEPA, y explica que la entidad ejecuta la transferencia basándose en ese identificador. Por eso debes comprobar tanto la sintaxis como el destinatario.

Esta guía explica qué hace exactamente el [validador de IBAN español](/validador-iban), cómo reproducir sus cálculos y qué controles adicionales aplicar antes de enviar dinero. La herramienta procesa el dato localmente en tu navegador y no consulta bases de datos bancarias.

## Cómo se compone un IBAN español

Un IBAN español tiene siempre 24 caracteres. Los espacios se añaden para facilitar la lectura, pero no forman parte del identificador:

| Posición | Longitud | Contenido | Ejemplo |
|---|---:|---|---|
| 1-2 | 2 | Código de país | ES |
| 3-4 | 2 | Control internacional del IBAN | 91 |
| 5-8 | 4 | Código de entidad | 2100 |
| 9-12 | 4 | Código de oficina | 0418 |
| 13-14 | 2 | Controles internos del CCC | 45 |
| 15-24 | 10 | Número de cuenta | 0200051332 |

La parte formada por entidad, oficina, controles internos y número de cuenta corresponde al antiguo Código Cuenta Cliente o CCC. Nuestro validador realiza dos verificaciones distintas: el control internacional MOD-97 sobre el IBAN completo y el control nacional de los dos dígitos del CCC.

No deduzcas el nombre del banco únicamente del código de entidad mostrado por una herramienta. Las entidades pueden cambiar, fusionarse o gestionar numeraciones heredadas. Para identificar la entidad actual o confirmar una cuenta debes consultar documentación bancaria vigente.

## Qué comprueba exactamente el validador

La herramienta aplica estas reglas, en este orden:

1. Elimina espacios y guiones usados para presentar el número.
2. Convierte las letras a mayúsculas y rechaza caracteres no admitidos.
3. Exige el prefijo ES y los 24 caracteres del formato español.
4. Comprueba que los 22 caracteres posteriores a ES sean dígitos.
5. Ejecuta el algoritmo internacional MOD-97-10.
6. Recalcula los dos controles internos del CCC español.

Si todas las pruebas son correctas, el resultado indica que la estructura y los controles son coherentes. Es una conclusión matemática, no una consulta a la entidad. La herramienta tampoco valida IBAN de otros países, porque cada país define su propia longitud y estructura nacional dentro del estándar.

## Cómo funciona MOD-97 paso a paso

El control internacional permite detectar muchos errores de transcripción sin manejar una lista de cuentas. El proceso puede reproducirse así:

1. Quita espacios y guiones.
2. Mueve los cuatro primeros caracteres al final.
3. Sustituye cada letra por su valor: A = 10, B = 11, hasta Z = 35.
4. Divide la secuencia numérica entre 97.
5. El IBAN supera este control si el resto es 1.

Para evitar problemas con números demasiado largos, una implementación puede calcular el resto por bloques o dígito a dígito. No hace falta convertir toda la secuencia a un número de JavaScript de precisión limitada. El validador de CajaUtil procesa bloques cortos y arrastra el resto hasta terminar.

## Prueba reproducible con un IBAN de ejemplo

Usaremos el IBAN de ejemplo **ES91 2100 0418 4502 0005 1332**. No lo utilices como destino de una transferencia: aquí solo sirve para reproducir los controles matemáticos.

Al quitar los espacios y mover ES91 al final obtenemos:

**21000418450200051332ES91**

Como E = 14 y S = 28, la secuencia termina en **142891**. Al calcular el módulo 97 de la secuencia completa, el resto es **1**. Los controles internos del CCC también producen **45**, que coincide con los caracteres situados después de entidad y oficina. Por tanto, el ejemplo supera las dos comprobaciones.

Ahora cambia solo el último dígito y prueba **ES91 2100 0418 4502 0005 1333**. El resto MOD-97 pasa a ser **28** y los controles internos esperados dejan de coincidir. El validador debe marcarlo como incorrecto. Esta comparación demuestra qué detecta la herramienta sin usar datos personales ni una cuenta real del lector.

Un matiz importante: los dígitos de control detectan muchos cambios accidentales, pero no todos los posibles. También es posible construir deliberadamente otra secuencia que supere las reglas matemáticas. Por eso una validación correcta nunca acredita legitimidad ni titularidad.

## IBAN y BIC o SWIFT no son lo mismo

El IBAN identifica una cuenta dentro de una estructura normalizada. El **BIC**, también llamado **código SWIFT**, identifica a la entidad financiera que participa en la operación. Según la explicación del [Banco de España sobre el código SWIFT](https://clientebancario.bde.es/pcb/es/blog/codigoswift.html), suele tener 8 u 11 caracteres:

| Parte | Longitud | Función |
|---|---:|---|
| Entidad | 4 letras | Identifica la institución |
| País | 2 letras | Indica el país |
| Localidad | 2 caracteres | Identifica la ubicación |
| Sucursal | 3 caracteres opcionales | Identifica oficina o servicio concreto |

El BIC no sustituye al IBAN ni confirma el titular. En las operaciones SEPA normalmente basta el IBAN; en determinadas transferencias internacionales la entidad puede solicitar además un BIC/SWIFT u otros datos. Obtén ese código de la documentación oficial o del banco, no lo deduzcas ni lo copies de una fuente no verificada.

Nuestro validador no comprueba códigos BIC. Su alcance se limita a la estructura y controles de un IBAN español. Esta separación evita mostrar como verificado un dato que la herramienta realmente no ha analizado.

## Qué no puede confirmar un IBAN válido

Aunque el resultado sea correcto, todavía no sabes:

- si la cuenta existe o admite transferencias,
- si está abierta o bloqueada,
- quién es su titular,
- si el nombre que te han facilitado coincide con el registrado,
- si la factura o el mensaje han sido manipulados,
- si el pago corresponde a una operación legítima,
- si recuperarás el dinero en caso de error.

La privacidad local también tiene un límite claro. CajaUtil no recibe el IBAN introducido, pero el navegador, el dispositivo, el portapapeles o una extensión maliciosa quedan fuera del control de la página. Utiliza un equipo de confianza y no compartas capturas con datos bancarios completos.

## Verificación del beneficiario: el control que falta al validador

Desde el 9 de octubre de 2025, los proveedores de servicios de pago deben ofrecer gratuitamente la [verificación del beneficiario](https://clientebancario.bde.es/pcb/es/blog/nuevo-servicio-gratuito-de-verificacion-del-beneficiario-a-partir-del-9-de-octubre-de-2025-.html) para transferencias en euros, tanto ordinarias como inmediatas. El banco consulta si el nombre indicado coincide con el asociado al IBAN y puede responder: coincidente, casi coincidente, no coincidente o no verificable.

El [European Payments Council describe este servicio](https://www.europeanpaymentscouncil.eu/what-we-do/other-schemes/verification-payee) como un intercambio inmediato entre los proveedores del pagador y del beneficiario. También aclara que permite verificar determinados datos, pero no identifica por sí mismo a una persona física o jurídica.

Estos controles son complementarios:

| Control | Quién lo hace | Qué aporta |
|---|---|---|
| Formato, MOD-97 y CCC | Validador local | Detecta incoherencias matemáticas y estructurales |
| Verificación del beneficiario | Proveedores bancarios | Compara nombre e IBAN con los datos registrados |
| Segundo canal | Pagador y destinatario | Confirma que la instrucción procede del contacto esperado |

Si tu banco muestra una discrepancia y decides continuar, los fondos se enviarán al IBAN escrito. No ignores el aviso por presión, urgencia o porque el remitente afirme que se trata de una diferencia menor. Detén el proceso y confirma el dato por un canal que ya conocieras antes del mensaje.

## Protocolo seguro ante un cambio de cuenta

El escenario de mayor riesgo no suele ser un dígito escrito al azar, sino una instrucción aparentemente legítima para cambiar el IBAN de un proveedor, una inmobiliaria o un profesional. Aplica este protocolo:

1. No respondas al mismo correo para verificarlo: la cuenta podría estar comprometida.
2. Busca un teléfono previamente guardado, un contrato anterior o la web oficial.
3. Contrasta el IBAN completo con el contacto mediante ese canal independiente; no basta con verificar solo el inicio o los últimos dígitos.
4. Compara el titular esperado con el resultado de verificación que muestre tu banco.
5. Si el importe es elevado, realiza primero una transferencia pequeña solo cuando el procedimiento interno lo permita.
6. No aceptes prisas, amenazas de penalización ni cambios de última hora sin documentación.
7. Conserva la factura, la confirmación y el justificante de la operación.

Una transferencia de prueba reduce el importe expuesto, pero no demuestra por sí sola que el interlocutor sea legítimo. La confirmación independiente del cambio sigue siendo el paso principal.

## Qué hacer si detectas un error después de enviar

Contacta inmediatamente con tu entidad por sus canales oficiales y facilita los datos de la operación. No esperes a que el destinatario responda si sospechas fraude o has escrito una cuenta equivocada. La posibilidad de detener o recuperar los fondos depende del estado de la transferencia y de la colaboración necesaria; una solicitud rápida mejora las opciones, pero no garantiza la devolución.

Guarda mensajes, facturas, justificantes y cualquier aviso de verificación. Si sospechas una estafa, sigue además las indicaciones de tu entidad y de las autoridades competentes. No envíes un segundo pago para “desbloquear” o recuperar el primero.

## Errores frecuentes al comprobar una cuenta

- Validar un IBAN y asumir que el nombre también está verificado.
- Copiar el número desde el mismo mensaje sospechoso que se intenta confirmar.
- Confundir BIC con número de cuenta.
- Usar un validador de España para un formato extranjero.
- Compartir el IBAN completo en una captura o conversación pública.
- Ignorar un resultado “casi coincidente” sin revisar la diferencia.
- Autorizar el pago porque el importe de prueba llegó, sin confirmar quién controla la cuenta.

## Preguntas frecuentes sobre IBAN, BIC y transferencias

### ¿Un IBAN válido pertenece necesariamente a una cuenta real?

No. Significa que la cadena cumple las reglas comprobadas. Una secuencia puede ser matemáticamente coherente sin que CajaUtil pueda acreditar existencia, estado o titularidad. Esa información requiere controles de la entidad.

### ¿Los espacios hacen que un IBAN sea incorrecto?

No cuando se usan solo para agrupar caracteres. El validador elimina espacios y guiones antes de calcular. No admite otros signos, porque podrían ocultar un error de copia.

### ¿Puedo validar un IBAN de otro país?

No con esta herramienta. CajaUtil exige la estructura española ES más 22 dígitos. Un IBAN extranjero puede ser legítimo y tener otra longitud; debe comprobarse con una herramienta que conozca la estructura de ese país.

### ¿Necesito el BIC para una transferencia SEPA?

Normalmente el IBAN es suficiente en operaciones SEPA. Para otros destinos o circuitos, tu entidad puede pedir BIC/SWIFT y datos adicionales. Sigue las instrucciones del banco para esa operación concreta.

### ¿Qué significa “casi coincidente” en mi banco?

Indica que el nombre introducido no coincide exactamente con el registrado y la entidad puede mostrar el nombre asociado para que revises la diferencia. No corrijas ni continúes automáticamente: confirma que se trata del beneficiario esperado.

## Checklist antes de autorizar la transferencia

1. Copia el IBAN desde una fuente fiable y comprueba sus controles.
2. Confirma importe, moneda, concepto y fecha.
3. Revisa el resultado de verificación del beneficiario.
4. Ante un cambio de cuenta, usa un segundo canal conocido.
5. Comprueba BIC/SWIFT solo cuando la operación lo requiera.
6. Lee todos los avisos del banco antes de autorizar.
7. Guarda el justificante y revisa el estado de la operación.

El [validador de IBAN](/validador-iban) cubre el primer paso y permite reproducir la comprobación con el ejemplo de esta guía. La verificación bancaria y el segundo canal cubren riesgos distintos. Usarlos juntos reduce errores y fraudes, aunque ningún control aislado puede garantizar que una transferencia sea segura.
`,
  },
  {
    slug: 'interes-compuesto-la-diferencia-entre-aportar-pronto-y-aportar-tarde',
    title: 'Interés compuesto: empezar antes o aportar más',
    description:
      'Compara con cifras cómo influyen el tiempo, las aportaciones y la rentabilidad en el interés compuesto, sin confundir una simulación con una promesa.',
    targetToolUrl: '/calculadora-interes-compuesto',
    relatedArticleSlugs: [
      'como-negociar-tu-sueldo-bruto-sin-perder-neto',
      'cuanto-dinero-necesitas-ahorrado-para-comprar-una-vivienda',
    ],
    tags: ['ahorro', 'inversion', 'interes compuesto'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-21T12:54:28.000Z',
    content: `## Por qué empezar antes puede pesar más que aportar más

En el interés compuesto, empezar antes añade periodos en los que los rendimientos pueden generar nuevos rendimientos. Por eso una aportación modesta mantenida durante más años puede alcanzar un resultado parecido, o incluso superior, al de una aportación mayor iniciada tarde. No es una garantía de rentabilidad: es el efecto matemático de disponer de más tiempo.

La forma más clara de entenderlo es comparar escenarios con los mismos supuestos. La [calculadora de interés compuesto](/calculadora-interes-compuesto) permite cambiar aportación, plazo y rentabilidad para comprobar cuánto depende el resultado de cada variable.

## Ejemplo: 100 EUR al mes desde ahora frente a 200 EUR al mes dentro de diez años

Supongamos una tasa nominal anual constante del 5 %, dividida entre 12 para la capitalización mensual, y aportaciones realizadas al final de cada mes:

| Escenario | Periodo aportando | Aportación mensual | Dinero aportado | Capital final estimado |
|---|---:|---:|---:|---:|
| Empezar ahora | 30 años | 100 EUR | 36.000 EUR | 83.226 EUR |
| Esperar 10 años | 20 años | 200 EUR | 48.000 EUR | 82.207 EUR |

En este ejemplo, quien empieza antes aporta 12.000 EUR menos y termina con una cifra ligeramente superior. La diferencia no procede de una rentabilidad mejor, sino de conceder diez años adicionales a las primeras aportaciones.

Los importes están redondeados y no descuentan comisiones, impuestos ni inflación. Tampoco suponen que vaya a existir una rentabilidad estable del 5 %. Sirven para entender la relación entre tiempo y capitalización, no para anticipar el resultado de un producto real.

## Cómo evoluciona una aportación de 100 EUR al mes

Con el mismo supuesto teórico del 5 % nominal anual, el crecimiento no avanza a velocidad constante:

| Plazo | Total aportado | Capital final estimado | Rendimiento acumulado estimado |
|---|---:|---:|---:|
| 10 años | 12.000 EUR | 15.528 EUR | 3.528 EUR |
| 20 años | 24.000 EUR | 41.103 EUR | 17.103 EUR |
| 30 años | 36.000 EUR | 83.226 EUR | 47.226 EUR |

Durante los primeros años, la mayor parte del saldo procede de tus aportaciones. Conforme aumenta el capital, el rendimiento hipotético se aplica sobre una base mayor. Esa es la razón por la que la distancia entre los escenarios de 20 y 30 años es mucho mayor que entre los de 10 y 20.

## Cómo reproducir los cálculos paso a paso

Para comprobar los ejemplos usamos capitalización mensual y aportaciones al final de cada mes. Si el capital inicial es C, la aportación mensual es A, la tasa nominal anual es r y el plazo tiene n meses, primero convertimos la tasa anual en una tasa mensual: i = r / 12. Después sumamos el crecimiento del capital inicial y el valor futuro de las aportaciones:

**Valor futuro = C × (1 + i)^n + A × ((1 + i)^n - 1) / i**

Cuando la rentabilidad es 0 %, la fórmula cerrada se simplifica a C + A × n. La calculadora llega al mismo resultado mediante su simulación mes a mes, sin realizar esa división.

Caso reproducible: 5.000 EUR iniciales, 200 EUR al mes, diez años y una tasa nominal anual constante del 7 %. Las aportaciones totales son 29.000 EUR: 5.000 EUR iniciales más 24.000 EUR en aportaciones mensuales. Aplicando la fórmula, el saldo final teórico es 44.665,27 EUR y el crecimiento acumulado es 15.665,27 EUR. Puedes introducir exactamente esos cuatro datos en la calculadora y contrastar el resultado.

## Tabla de sensibilidad: el resultado no es una promesa

Una sola tasa puede dar una falsa sensación de certeza. Esta comparación mantiene constantes una aportación de 100 EUR al final de cada mes y un plazo de 30 años, sin capital inicial, impuestos ni comisiones. Solo cambia la rentabilidad anual supuesta.

| Tasa nominal anual | Aportado | Saldo final teórico | Crecimiento teórico |
|---:|---:|---:|---:|
| 3 % | 36.000 EUR | 58.273,69 EUR | 22.273,69 EUR |
| 4 % | 36.000 EUR | 69.404,94 EUR | 33.404,94 EUR |
| 5 % | 36.000 EUR | 83.225,86 EUR | 47.225,86 EUR |
| 7 % | 36.000 EUR | 121.997,10 EUR | 85.997,10 EUR |

La distancia entre el escenario del 3 % y el del 7 % supera los 63.700 EUR. Eso no convierte al 7 % en una previsión fiable: demuestra cuánto depende una proyección larga de una hipótesis que nadie conoce de antemano. Para tomar decisiones prudentes conviene comparar al menos un escenario conservador, uno central y otro favorable.

## Las cinco variables que cambian el resultado

1. **Capital inicial:** empieza a generar rendimientos desde el primer periodo.
2. **Aportación periódica:** aumenta de forma constante la base sobre la que se calcula el crecimiento.
3. **Rentabilidad:** pequeñas diferencias se amplifican con plazos largos, pero una cifra más alta suele implicar también más riesgo.
4. **Tiempo:** determina cuántos ciclos de capitalización puede completar el capital.
5. **Costes e impuestos:** reducen el rendimiento que realmente permanece invertido.

La frecuencia de capitalización también influye, aunque en una decisión real suelen importar más el plazo, la constancia, el riesgo y los costes totales del producto.

## Rentabilidad nominal, inflación y poder adquisitivo

El saldo de una proyección está expresado en euros futuros. No indica directamente cuánto podrás comprar con ellos. Como el 5 % nominal de esta calculadora se capitaliza cada mes, equivale a un 5,12 % efectivo anual. Con una inflación media del 2 %, la rentabilidad real aproximada sería (1 + 5,12 %) / (1 + 2 %) - 1 = 3,06 %, antes de costes e impuestos.

Para expresar un saldo futuro en euros de hoy hay que descontar la inflación acumulada: valor actual = saldo futuro / (1 + inflación)^años. Reducir la tasa de rentabilidad no produce el mismo resultado cuando realizas aportaciones nominales periódicas, porque cada aportación permanece invertida durante un plazo distinto.

El [Banco Central Europeo explica la inflación](https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_inflation.es.html) como un aumento general de los precios y mantiene un objetivo del 2 % a medio plazo. Un objetivo no es una garantía para cada año. Por eso es mejor probar varias tasas de inflación y no descontar siempre un 2 % como si fuera fijo.

## El efecto silencioso de costes e impuestos

Las comisiones reducen la tasa que realmente se capitaliza. En el ejemplo de 100 EUR mensuales durante 30 años, pasar de un 5 % bruto a un 4 % neto reduce el saldo teórico de 83.225,86 EUR a 69.404,94 EUR: 13.820,92 EUR menos. No significa que todos los productos cobren un punto porcentual; es una prueba de sensibilidad para visualizar el efecto acumulado de cualquier diferencia anual persistente.

La fiscalidad depende del producto, del momento del reembolso y de la situación personal. Una calculadora educativa no puede estimar una rentabilidad neta universal. Antes de comparar alternativas, revisa al menos la comisión total, los costes de compraventa o custodia, la tributación aplicable y si existen penalizaciones o restricciones de liquidez. La [CNMV publica guías para inversores](https://www.cnmv.es/portal/publicaciones/guias.aspx) sobre conceptos, productos y precauciones que ayudan a interpretar mejor una simulación.

## Cómo comparar escenarios sin engañarte

- Usa una hipótesis conservadora, otra central y otra optimista.
- Mantén iguales las demás variables cuando quieras medir el efecto de una sola.
- Reduce la tasa introducida si quieres crear una aproximación que descuente los costes conocidos del producto.
- Compara también el dinero aportado, no solo el capital final.
- Revisa el resultado en euros de hoy si el plazo es muy largo y la inflación importa.

No busques una cifra que confirme lo que quieres creer. La utilidad de la simulación está en descubrir qué variables pueden romper el plan y cuánto margen existe si la rentabilidad es menor de la esperada.

## Qué no representa esta simulación

- No modela años positivos y negativos: aplica una tasa constante para facilitar la comparación.
- No incorpora inflación, impuestos ni comisiones. Una tasa menor solo puede aproximar costes conocidos; la inflación acumulada debe descontarse por separado y la fiscalidad depende del caso.
- No contempla retiradas, pausas en las aportaciones ni cambios de importe a lo largo del tiempo.
- No mide riesgo, volatilidad ni probabilidad de pérdida, y no recomienda ningún producto financiero.

La utilidad del cálculo no está en adivinar el saldo exacto, sino en comparar decisiones con las mismas reglas. Para estudiar una pausa, una subida de aportaciones o una retirada, divide el plan en etapas y utiliza el saldo final de una etapa como capital inicial de la siguiente.

## Qué pasa si interrumpes las aportaciones

Dejar de aportar no borra el capital acumulado, pero reduce la cantidad nueva que puede beneficiarse de los periodos restantes. El efecto es mayor cuando la interrupción ocurre al principio, porque cada aportación omitida pierde muchos años potenciales de capitalización.

Si tus ingresos cambian, una aportación menor pero sostenible puede ser más realista que abandonar el plan por completo. La constancia no significa mantener una cifra a cualquier precio: significa adaptar el ahorro sin comprometer gastos esenciales ni el fondo de emergencia.

## Lista de comprobación antes de decidir

1. Separa primero un colchón para imprevistos y no proyectes dinero que puedas necesitar a corto plazo.
2. Compara tres rentabilidades y anota por qué consideras razonable cada una.
3. Reduce la tasa para aproximar costes conocidos y descuenta por separado la inflación acumulada si necesitas expresar el saldo en euros de hoy.
4. Distingue capital aportado, crecimiento teórico y saldo final.
5. Revisa el plan una vez al año o cuando cambien tus ingresos, plazo o tolerancia al riesgo.

## Conclusión

El interés compuesto no convierte una aportación en riqueza de forma automática. Muestra cómo el tiempo puede amplificar una estrategia constante cuando existen rendimientos positivos. Empezar antes aporta una ventaja matemática, pero el resultado real seguirá dependiendo de riesgo, costes, impuestos, inflación y disciplina.
`,
  },
  {
    slug: 'imc-calorias-y-tdee-como-leer-estas-metricas-sin-obsesionarte',
    title: 'IMC, calorías y TDEE: cómo leer estas métricas sin obsesionarte',
    description:
      'Guía para entender qué mide cada calculadora de salud, cuándo sirve y cuándo conviene no sacar conclusiones rápidas.',
    targetToolUrl: '/calculadora-calorias',
    relatedArticleSlugs: [],
    tags: ['salud', 'imc', 'calorias'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-08-21T14:38:37.000Z',
    content: `## Tres cifras útiles si sabes qué pregunta responde cada una

El IMC, el gasto energético en reposo y el TDEE son estimaciones distintas. El **IMC** relaciona peso y altura; la ecuación de **Mifflin-St Jeor** estima energía utilizada en reposo; el **TDEE** multiplica esa estimación por un nivel de actividad. Ninguna de las tres mide directamente tu composición corporal, metabolismo o ingesta necesaria.

Estas herramientas pueden ayudarte a comprobar una operación y comparar escenarios, pero no diagnostican una enfermedad ni prescriben una dieta. Su valor está en mostrar un punto de partida transparente, con fórmulas y supuestos visibles. Su riesgo aparece cuando una cifra orientativa se interpreta como objetivo obligatorio.

Esta guía reproduce exactamente los cálculos de CajaUtil, explica dónde entra la incertidumbre y señala cuándo no deberías tomar decisiones solo con una calculadora. El contenido es informativo y se apoya en fuentes sanitarias y en el estudio original de Mifflin-St Jeor; no ha sido presentado como una revisión médica individual.

## Qué mide el IMC y cómo se calcula

El índice de masa corporal se obtiene dividiendo el peso en kilogramos entre la altura en metros al cuadrado:

**IMC = peso (kg) / altura² (m²)**

La [Organización Mundial de la Salud](https://www.who.int/es/news-room/fact-sheets/detail/obesity-and-overweight) describe el IMC como un marcador indirecto de la grasa. Para adultos establece sobrepeso a partir de 25 y obesidad a partir de 30, mientras que en niños y adolescentes deben utilizarse referencias específicas según edad y sexo. La propia OMS señala que otras mediciones, como el perímetro de cintura, pueden aportar contexto adicional.

La [calculadora de IMC](/calculadora-imc) utiliza estos rangos generales para personas adultas:

| IMC sin redondear | Categoría orientativa |
|---:|---|
| Menor de 18,5 | Bajo peso |
| Desde 18,5 hasta menos de 25 | Rango de referencia |
| Desde 25 hasta menos de 30 | Sobrepeso |
| Desde 30 hasta menos de 35 | Obesidad I |
| Desde 35 hasta menos de 40 | Obesidad II |
| Desde 40 | Obesidad III |

La categoría describe el resultado matemático, no la salud completa de una persona. No debe utilizarse para diagnosticar síntomas ni para decidir por sí sola un objetivo de peso.

## Caso reproducible de IMC: 75 kg y 1,75 m

Para una persona adulta que pesa 75 kg y mide 175 cm:

1. Convierte 175 cm a 1,75 m.
2. Eleva la altura al cuadrado: 1,75 × 1,75 = 3,0625.
3. Divide el peso: 75 / 3,0625 = 24,4897.
4. Redondea a dos cifras decimales: **IMC 24,49**.

La herramienta mostrará «Rango de referencia». También traduce los umbrales 18,5 y 25 a peso para esa altura:

- límite inferior: 18,5 × 3,0625 = 56,65625 kg, mostrado como **56,66 kg** aproximadamente;
- umbral superior exclusivo: 25 × 3,0625 = 76,5625 kg, mostrado como **76,56 kg** aproximadamente. El valor exacto de 76,5625 kg ya produce IMC 25 y queda fuera del rango de referencia.

Ese intervalo solo invierte la fórmula del IMC. NO es una recomendación para adelgazar, engordar o mantener un peso concreto. Dos personas con la misma altura y peso pueden tener diferente masa muscular, distribución de grasa, antecedentes y riesgo metabólico.

## Por qué el IMC no equivale a porcentaje de grasa

El cálculo solo conoce dos datos. No puede separar músculo, grasa, hueso o agua, ni indicar dónde se distribuye la grasa. El [NHS explica que el IMC no distingue músculo y grasa](https://www.nhs.uk/health-assessment-tools/calculate-your-body-mass-index/calculate-bmi-for-adults) y propone considerar también la cintura para interpretar mejor el contexto.

El NHS también advierte que algunas personas de origen asiático, africano negro, afrocaribeño o de Oriente Medio pueden presentar mayor riesgo de problemas de salud con valores de IMC más bajos. CajaUtil aplica los umbrales generales de adultos y no solicita origen étnico, cintura, analíticas ni antecedentes. Por tanto, el resultado no personaliza riesgo clínico.

El IMC puede resultar especialmente poco representativo en personas con mucha masa muscular. En el extremo contrario, un valor dentro del rango general no garantiza una composición corporal, presión arterial, glucosa o perfil lipídico saludables. Sirve como cribado sencillo, no como examen completo.

## Mifflin-St Jeor estima gasto en reposo, no lo mide

La ecuación publicada por Mifflin, St Jeor y colaboradores en 1990 se tituló [«A new predictive equation for resting energy expenditure in healthy individuals»](https://pubmed.ncbi.nlm.nih.gov/2305711/). Es decir, predice **gasto energético en reposo** o REE. Muchas calculadoras lo etiquetan como BMR o metabolismo basal, pero una medición basal clínica exige condiciones estandarizadas y no es lo mismo que una predicción realizada con cuatro datos.

CajaUtil aplica estas expresiones para personas adultas:

- coeficiente masculino: **REE = 10 × peso + 6,25 × altura − 5 × edad + 5**;
- coeficiente femenino: **REE = 10 × peso + 6,25 × altura − 5 × edad − 161**.

El peso se introduce en kilogramos, la altura en centímetros y la edad en años. La selección de sexo solo determina cuál de los dos coeficientes publicados usa la fórmula. La calculadora no puede representar por sí sola todas las diferencias individuales de composición corporal, estado hormonal, medicación o enfermedad.

## Cómo pasa CajaUtil del reposo al TDEE

Después de estimar REE, la [calculadora de calorías y TDEE](/calculadora-calorias) lo multiplica por uno de estos factores:

| Nivel seleccionado | Descripción mostrada | Factor aplicado |
|---|---|---:|
| Sedentario | Trabajo sentado y poco ejercicio | 1,2 |
| Ligero | Actividad cotidiana y ejercicio 1-3 días | 1,375 |
| Moderado | Actividad cotidiana y ejercicio 3-5 días | 1,55 |
| Intenso | Trabajo activo o ejercicio 6-7 días | 1,725 |
| Muy intenso | Trabajo físico y ejercicio intenso frecuente | 1,9 |

La operación es **TDEE estimado = REE estimado × factor de actividad**. CajaUtil ofrece estos multiplicadores convencionales como una heurística no validada por el estudio original de Mifflin-St Jeor ni por el modelo del NIDDK. Clasificar toda una semana en una sola etiqueta introduce incertidumbre: dos personas que entrenan cuatro días pueden tener trabajos, desplazamientos, pasos diarios, duración e intensidad muy diferentes.

Por eso el nombre de una categoría no debe elegirse por aspiración. Selecciona el nivel que mejor describa tu actividad real y compara escenarios si dudas. Un factor más alto no significa que estés «mejor» ni autoriza automáticamente una ingesta concreta.

## Caso reproducible de REE y TDEE

Supongamos 35 años, 75 kg, 175 cm y actividad moderada, cuyo factor es 1,55.

Con el coeficiente masculino:

**REE = 10 × 75 + 6,25 × 175 − 5 × 35 + 5 = 1.673,75 kcal/día**

**TDEE = 1.673,75 × 1,55 = 2.594,31 kcal/día**

La herramienta redondea los resultados finales y muestra **1.674 kcal/día en reposo** y **2.594 kcal/día de TDEE**.

Con los mismos datos y el coeficiente femenino:

**REE = 10 × 75 + 6,25 × 175 − 5 × 35 − 161 = 1.507,75 kcal/día**

**TDEE = 1.507,75 × 1,55 = 2.337,01 kcal/día**

La pantalla mostrará **1.508** y **2.337 kcal/día** respectivamente. Puedes reproducir ambos casos cambiando solo el selector de sexo. La diferencia procede del coeficiente de la fórmula, no de una medición individual del metabolismo.

## Qué significa realmente el TDEE calculado

TDEE significa gasto energético diario total. En una estimación ideal intenta reunir energía en reposo, actividad cotidiana, ejercicio y otros componentes del gasto. CajaUtil no mide cada componente: aplica un multiplicador fijo al REE estimado.

El resultado tampoco predice exactamente qué ocurrirá si consumes esa cantidad. El registro de alimentos tiene errores, la actividad cambia y el cuerpo no responde como una cuenta lineal invariable. El [Body Weight Planner del NIDDK](https://www.niddk.nih.gov/bwp), una herramienta de los Institutos Nacionales de Salud de Estados Unidos, utiliza un modelo dinámico más complejo para proyectar cambios de peso y aun así declara incertidumbre, límites de población y la necesidad de consejo profesional.

Usa el TDEE de CajaUtil para responder preguntas comparativas: cuánto cambia la estimación al modificar el nivel de actividad, qué parte procede de la fórmula de reposo y qué orden de magnitud resulta. No lo conviertas automáticamente en una dieta ni en una meta diaria rígida.

## Método para auditar una estimación

1. **Comprueba las unidades**: kilogramos, centímetros y años completos.
2. **Identifica el supuesto de actividad**: cada factor resume trabajo, desplazamientos, actividad cotidiana y ejercicio.
3. **Guarda el supuesto**: anota qué datos y factor utilizaste para poder reproducirlo.
4. **Compara solo escenarios hipotéticos**: cambiar el factor muestra cómo responde la fórmula, no cómo responderá una persona.
5. **Separa gasto estimado e ingesta**: el resultado no determina cuánto debes comer ni qué ajuste sería adecuado.
6. **Busca valoración profesional** cuando haya síntomas, medicación, enfermedad, embarazo, lactancia, crecimiento o un objetivo que requiera intervención nutricional.

Este método no convierte la calculadora en una medición metabólica. Evita algo más básico: tratar una cifra sin contexto como una verdad exacta.

## Cuándo no deberías usar estas cifras para actuar por tu cuenta

El NHS limita su calculadora de IMC para adultos y desaconseja usarla durante embarazo, en menores, ante un trastorno de la conducta alimentaria diagnosticado o sospechado y cuando existe una condición que afecta a la altura. El Body Weight Planner del NIDDK también excluye menores, embarazo y lactancia.

Aplica especial prudencia si:

- tienes menos de 18 años;
- estás embarazada, en lactancia o en recuperación;
- existe una enfermedad, medicación o condición que pueda afectar al peso o al gasto;
- entrenas a un nivel que hace poco representativo el IMC;
- tienes un trastorno de la conducta alimentaria o sospechas que puede existir;
- contar calorías, pesarte o comparar cifras te genera ansiedad o conductas compulsivas.

En estos casos, no necesitas una cifra más precisa de una web: necesitas una evaluación adecuada al contexto. Si hay síntomas o preocupación por tu salud, consulta a un profesional sanitario.

## Cómo evitar que el seguimiento se convierta en obsesión

Una calculadora es una herramienta, no una puntuación personal. Repetir el cálculo varias veces al día no añade información porque edad, altura y fórmula no han cambiado. Tampoco tiene sentido reaccionar a cada variación de peso, que puede deberse a hidratación, contenido digestivo y otros cambios normales.

Define antes qué pregunta quieres responder. Si solo deseas comprobar la fórmula, basta con un cálculo. Si un profesional te ha indicado observar una tendencia, acuerda la frecuencia y las variables relevantes. Si el seguimiento empeora tu relación con la comida, el cuerpo o el ejercicio, detén el uso y busca ayuda cualificada.

## Privacidad y límites técnicos

Ambas calculadoras realizan la operación en la página con los datos introducidos. No requieren cuenta ni crean un historial clínico en CajaUtil. La analítica general del sitio solo se activa si la aceptas, pero eso no convierte el dispositivo en un entorno clínico protegido: evita introducir información que no sea necesaria y no compartas capturas con datos personales.

La precisión decimal de la pantalla tampoco elimina la incertidumbre del modelo. Mostrar 2.594 kcal no significa que la necesidad real se conozca con una precisión de una kilocaloría; significa que el código redondeó el resultado de la fórmula al entero más cercano.

## Preguntas frecuentes sobre IMC, REE y TDEE

### ¿Un IMC normal significa que estoy sano?

No. Solo indica que peso y altura producen un valor dentro del rango general. No mide composición corporal, analíticas, presión arterial, alimentación, actividad ni salud mental. Interprétalo como una referencia, no como un certificado.

### ¿BMR y REE son exactamente lo mismo?

No en una medición clínica estricta. La ecuación de Mifflin-St Jeor se publicó para predecir gasto energético en reposo. Muchas herramientas usan BMR como término popular, pero CajaUtil aclara que el resultado es una estimación de reposo y no una calorimetría.

### ¿El TDEE indica cuántas calorías debo comer?

No automáticamente. Es una estimación del gasto basada en un factor de actividad. Una recomendación de ingesta requiere considerar objetivo, salud, evolución, composición de la dieta y contexto personal.

### ¿Por qué el resultado cambia tanto con la actividad?

Porque el TDEE se obtiene multiplicando por un factor. Pasar de 1,2 a 1,55 incrementa matemáticamente el resultado un 29,2 % respecto al escenario sedentario, aunque tus datos físicos no cambien. Esa sensibilidad es una razón para elegir el nivel de forma conservadora.

### ¿Puedo usar estas calculadoras si soy menor?

No con los rangos y ecuaciones presentados como guía individual. El IMC infantil se interpreta por edad y sexo, y las necesidades energéticas durante el crecimiento requieren referencias específicas.

## Recomendación final

Usa la [calculadora de IMC](/calculadora-imc) para comprobar la relación entre peso y altura y la [calculadora de calorías y TDEE](/calculadora-calorias) para reproducir Mifflin-St Jeor y comparar factores de actividad. Conserva los supuestos, interpreta el resultado como intervalo orientativo y no transformes una estimación matemática en diagnóstico o prescripción.
`,
  },
  {
    slug: 'cuanto-dinero-necesitas-ahorrado-para-comprar-una-vivienda',
    title: 'Cuánto dinero necesitas ahorrar para comprar una vivienda',
    description:
      'Calcula la entrada, los gastos de compra y el colchón que conviene conservar antes de firmar una hipoteca.',
    targetToolUrl: '/calculadora-hipotecas',
    relatedArticleSlugs: [
      'como-negociar-tu-sueldo-bruto-sin-perder-neto',
      'tin-tae-cuota-mensual-como-comparar-prestamos-de-verdad',
    ],
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
