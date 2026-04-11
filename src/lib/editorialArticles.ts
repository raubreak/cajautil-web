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
    title: 'Como negociar tu sueldo bruto sin perder de vista el neto',
    description:
      'Guia practica para evaluar ofertas salariales, traducir bruto a neto y negociar una subida con argumentos concretos.',
    targetToolUrl: '/calculadora-sueldo-neto',
    tags: ['salario', 'nomina', 'empleo'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-04-11T09:00:00.000Z',
    content: `## Por que no basta con mirar el bruto

Cuando una empresa te habla de salario anual, casi siempre te esta dando una cifra en bruto. Esa cantidad es util para comparar bandas salariales, pero no te dice cuanto dinero real entrara en tu cuenta cada mes. Entre el bruto y el neto intervienen las cotizaciones a la Seguridad Social, la retencion de IRPF, el numero de pagas y, en algunos casos, bonus, dietas o retribucion flexible.

Por eso, negociar solo con la cifra anual puede llevarte a errores. Dos ofertas con el mismo bruto pueden terminar en netos distintos si cambia el numero de pagas, el tratamiento fiscal o la parte variable.

## Que deberias calcular antes de aceptar una oferta

1. **Neto mensual en 12 y en 14 pagas**. Es la mejor forma de saber como afectara la oferta a tu liquidez real.
2. **Coste de desplazamiento o teletrabajo**. Un aumento pequeño de bruto puede quedar neutralizado si tus gastos mensuales suben.
3. **Parte fija y parte variable**. Un bonus prometido no equivale a salario garantizado.
4. **Beneficios extras**. Seguro medico, comida o tickets transporte pueden mejorar el paquete total.

## Como plantear la negociacion

Negociar bien no significa pedir una cifra al azar. Lo mas efectivo es justificarla con contexto:

- rango de mercado del puesto,
- impacto de tus responsabilidades,
- ahorro o ingresos que generas,
- comparacion entre tu neto actual y el que te ofrecen.

Una forma practica de hacerlo es traducir varias propuestas a neto mensual y explicar que, para asumir el cambio, necesitas que la mejora se note de verdad en el bolsillo.

## Errores frecuentes

- Comparar una oferta en 14 pagas con otra en 12 sin convertirlas a neto anual y mensual.
- Dar por hecho que la retencion de IRPF sera igual en todas las empresas.
- Aceptar un variable alto como si fuera salario fijo.
- Valorar solo el titular de la oferta sin mirar el impacto real en liquidez.

## Recomendacion final

Antes de responder a una empresa, simula varios escenarios con la **calculadora de sueldo neto**. Te servira para llegar a la conversacion con una base clara y evitar negociar a ciegas.
`,
  },
  {
    slug: 'tin-tae-cuota-mensual-como-comparar-prestamos-de-verdad',
    title: 'TIN, TAE y cuota mensual: como comparar prestamos de verdad',
    description:
      'Aprende a diferenciar TIN, TAE, plazo y coste total para no elegir un prestamo solo por la cuota mensual.',
    targetToolUrl: '/calculadora-prestamos',
    tags: ['prestamos', 'finanzas', 'tae'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-04-11T09:00:00.000Z',
    content: `## La cuota mas baja no siempre es la mejor oferta

Muchas personas comparan prestamos mirando solo la cuota mensual. Es comprensible: la cuota es el dato que mas se nota en el presupuesto domestico. El problema es que una cuota mas baja puede esconder un plazo mas largo y, por tanto, un coste total mucho mayor.

## Diferencia entre TIN y TAE

El **TIN** es el tipo de interes nominal. Sirve para calcular el interes financiero puro del prestamo. La **TAE**, en cambio, intenta reflejar el coste real anual incorporando comisiones y otros gastos obligatorios.

En igualdad de condiciones, la TAE es mejor indicador para comparar dos ofertas. Aun asi, tampoco debe leerse sola: si una entidad incluye productos vinculados o seguros opcionales, conviene revisar la letra pequena.

## Variables que mas cambian el resultado

- **Capital solicitado**: cuanto mas pides, mas interes total acabaras pagando.
- **Plazo**: a mayor plazo, menor cuota, pero mas intereses acumulados.
- **Tipo aplicado**: pequenas variaciones tienen impacto grande en prestamos largos.
- **Comisiones**: apertura, cancelacion anticipada o estudio.

## Ejemplo simple

Un prestamo de 10.000 EUR a 5 anos con un tipo del 7 % puede parecer razonable por cuota. Pero si alargas el plazo a 8 anos, la cuota baja y el coste total sube. Esa diferencia es la que deberias mirar antes de firmar.

## Errores comunes al comparar financiacion

1. Elegir solo por cuota mensual.
2. Ignorar comisiones y productos vinculados.
3. No revisar si conviene amortizar antes de tiempo.
4. No comparar el coste total devuelto.

## Que hacer antes de firmar

Usa un simulador para comparar escenarios con el mismo capital y distintos plazos. Despues revisa la documentacion precontractual y verifica si la TAE publicada coincide con tu caso real.
`,
  },
  {
    slug: 'como-calcular-el-iva-correctamente-en-facturas-y-presupuestos',
    title: 'Como calcular el IVA correctamente en facturas y presupuestos',
    description:
      'Repaso practico de base imponible, cuota, tipos del IVA y errores tipicos al preparar facturas o presupuestos.',
    targetToolUrl: '/calculadora-iva',
    tags: ['iva', 'facturacion', 'autonomos'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-04-11T09:00:00.000Z',
    content: `## IVA: lo que mas se confunde en el dia a dia

El IVA parece sencillo hasta que tienes que quitarlo de un precio final o revisar una factura antigua. En ese punto aparecen errores muy comunes: aplicar el porcentaje sobre una cantidad equivocada, confundir base imponible con total o no saber cuando corresponde un tipo reducido.

## Los tres datos que debes distinguir

- **Base imponible**: importe antes de impuestos.
- **Cuota de IVA**: cantidad resultante de aplicar el porcentaje.
- **Total**: base imponible mas cuota.

Si tienes base y porcentaje, calcular el total es directo. Si tienes el total final, quitar el IVA requiere dividir correctamente por el factor correspondiente y no limitarse a restar un porcentaje simple.

## Tipos mas habituales en Espana

- **21 %**: tipo general.
- **10 %**: tipo reducido para determinados bienes y servicios.
- **4 %**: tipo superreducido para supuestos concretos.

La Agencia Tributaria publica los criterios aplicables y conviene revisarlos cuando hay dudas sobre una actividad concreta.

## Ejemplo rapido

Si una factura tiene una base de 100 EUR y un IVA del 21 %, la cuota sera 21 EUR y el total 121 EUR. Si lo unico que conoces es el total de 121 EUR, la base no se obtiene restando 21 %, sino dividiendo entre 1,21.

## Errores frecuentes

1. Restar el porcentaje directamente al total para quitar el impuesto.
2. Usar un tipo general cuando el servicio tiene uno reducido.
3. No redondear de forma coherente entre lineas y total de factura.

## Recomendacion practica

Usa la calculadora para presupuestos rapidos, revision de tickets o comprobacion de importes. Para facturacion formal, revisa siempre la normativa aplicable y el criterio de redondeo de tu software.
`,
  },
  {
    slug: 'webp-cuando-conviene-convertir-imagenes-y-cuando-no',
    title: 'WebP: cuando conviene convertir imagenes y cuando no',
    description:
      'Ventajas, limitaciones y buenas practicas para usar WebP sin perder calidad ni romper compatibilidad.',
    targetToolUrl: '/compresor-webp',
    tags: ['imagenes', 'webp', 'rendimiento'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-04-11T09:00:00.000Z',
    content: `## Por que WebP se ha vuelto el formato por defecto en muchas webs

Reducir el peso de las imagenes es una de las mejoras mas rentables en cualquier sitio web. Menos peso significa menos tiempo de descarga, mejor experiencia movil y, en muchos casos, mejores metricas de rendimiento. WebP se ha consolidado porque suele ofrecer una compresion superior a JPG y PNG sin una perdida visible en la mayoria de contextos.

## Cuando si merece la pena usarlo

- Fotografias para blog o ecommerce.
- Imagenes decorativas en landing pages.
- Recursos de newsletters o portfolios.
- Contenido orientado a movil.

## Cuando conviene revisar antes

- Logos o graficos con lineas muy finas.
- Archivos que necesitas editar repetidamente.
- Flujos donde otro sistema exige PNG o JPG.

## Como evitar errores habituales

1. No comprimas a ciegas: compara calidad visual y peso final.
2. Manten una copia original por si luego necesitas volver a editar.
3. Verifica dimensiones finales: a veces el problema no es el formato, sino subir una imagen mucho mas grande de lo necesario.
4. Si tu proyecto necesita compatibilidad antigua, usa fallback con la etiqueta <picture>.

## Relacion con SEO y Core Web Vitals

Google no premia un formato concreto, pero si premia una experiencia mas rapida. Si tus imagenes pesadas retrasan la carga del contenido principal, comprimirlas puede ayudarte a mejorar LCP y a reducir el consumo de datos del usuario.

## Conclusiones

WebP suele ser una mejora clara para contenido web, pero no sustituye una estrategia completa de optimizacion. Tamano correcto, lazy loading y eleccion de imagen adecuada siguen siendo igual de importantes.
`,
  },
  {
    slug: 'como-crear-codigos-qr-utiles-y-evitar-errores-de-escaneo',
    title: 'Como crear codigos QR utiles y evitar errores de escaneo',
    description:
      'Guia practica para generar codigos QR legibles, utiles y preparados para movil, impresion y carteleria.',
    targetToolUrl: '/generador-qr',
    tags: ['qr', 'marketing', 'movil'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-04-11T09:00:00.000Z',
    content: `## Un QR no sirve si nadie puede escanearlo

Los codigos QR parecen trivialmente faciles de crear, pero en la practica fallan mucho por decisiones de diseno: poco contraste, tamano insuficiente, enlaces rotos o exceso de elementos decorativos.

## Que deberia tener un QR funcional

- Un contenido claro: URL final, telefono, texto o tarjeta de contacto.
- Tamano suficiente para el contexto de uso.
- Contraste alto entre modulos y fondo.
- Pruebas reales en varios moviles antes de imprimir o publicar.

## Escenarios habituales

### Restaurantes y menus

Lo importante no es solo el codigo, sino que el destino cargue rapido y se vea bien en movil.

### Tarjetas de visita

Conviene que el QR apunte a una pagina ligera o a una vCard limpia, no a una pagina llena de scripts pesados.

### Carteleria y escaparates

Cuanta mas distancia haya entre el usuario y el cartel, mas grande debera ser el codigo.

## Errores mas comunes

1. Cambiar colores hasta perder legibilidad.
2. Usar un tamano demasiado pequeno para impresion.
3. Generar un QR hacia una URL provisional que luego cambia.
4. No comprobar el enlace con cobertura movil normal.

## Recomendacion final

Genera el QR, descargalo, imprimelo si hace falta y pruebalo con varios dispositivos antes de darlo por valido. Un minuto de test evita muchos fallos despues.
`,
  },
  {
    slug: 'por-que-las-contrasenas-largas-suelen-ser-mejores-que-las-complejas',
    title: 'Por que las contrasenas largas suelen ser mejores que las complejas',
    description:
      'Que hace fuerte a una contrasena, cuantos caracteres convienen y como combinar longitud, aleatoriedad y gestores.',
    targetToolUrl: '/generador-contrasenas',
    tags: ['seguridad', 'contrasenas', 'privacidad'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-04-11T09:00:00.000Z',
    content: `## El problema de las reglas antiguas

Durante anos se repitio la misma receta: una mayuscula, un numero, un simbolo y listo. Eso mejora algo la resistencia, pero hoy se sabe que la **longitud** y la **aleatoriedad real** pesan mucho mas que un patron complicado pero previsible.

## Que hace fuerte a una contrasena

- Muchos caracteres.
- Sin palabras obvias ni sustituciones tipicas.
- Distinta para cada servicio.
- Guardada en un gestor fiable en lugar de reutilizarla.

## Longitud frente a complejidad

Una contrasena corta con muchos simbolos puede seguir siendo peor que una larga y aleatoria. En la practica, 16 caracteres aleatorios suelen ser una base razonable para cuentas importantes. Si el servicio lo permite, 20 o mas es mejor.

## Errores frecuentes

1. Reutilizar la misma contrasena en varios sitios.
2. Crear variantes previsibles del mismo patron.
3. Guardarlas en notas sin proteccion.
4. No activar doble factor en servicios criticos.

## Recomendacion practica

Usa un generador local, guarda las claves en un gestor y reserva la memoria solo para una contrasena maestra robusta. Esa combinacion suele ser mucho mas segura que intentar inventar claves a mano.
`,
  },
  {
    slug: 'iban-bic-y-transferencias-como-evitar-errores-antes-de-enviar-dinero',
    title: 'IBAN, BIC y transferencias: como evitar errores antes de enviar dinero',
    description:
      'Que comprueba un IBAN, que no comprueba y que deberias revisar antes de confirmar una transferencia.',
    targetToolUrl: '/validador-iban',
    tags: ['iban', 'banca', 'transferencias'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-04-11T09:00:00.000Z',
    content: `## Validar no es lo mismo que confirmar titularidad

Un validador de IBAN sirve para detectar errores de formato y de digitos de control. Eso ya evita muchos fallos tipicos al copiar o transcribir una cuenta bancaria. Sin embargo, no confirma por si solo que el titular sea correcto ni que la cuenta este operativa.

## Que comprueba realmente un IBAN

- Longitud adecuada segun el pais.
- Estructura valida.
- Digitos de control correctos mediante el algoritmo MOD 97.

## Que no comprueba

- Nombre del titular.
- Si la cuenta esta activa.
- Si pertenece al destinatario que crees.

## Errores comunes al enviar transferencias

1. Copiar espacios o caracteres extra.
2. Confundir un cero con una O o un uno con una I.
3. Dar por valida una cuenta solo porque el banco no da error inmediato.
4. No contrastar el IBAN con una fuente independiente.

## Buenas practicas

- Valida el formato antes de confirmar el pago.
- Si es una transferencia importante, confirma el IBAN por segundo canal.
- Guarda plantillas seguras solo cuando ya has verificado al destinatario.

## Idea clave

El validador te ayuda a evitar fallos mecanicos. La comprobacion de identidad del beneficiario sigue dependiendo de tus procesos de verificacion.
`,
  },
  {
    slug: 'interes-compuesto-la-diferencia-entre-aportar-pronto-y-aportar-tarde',
    title: 'Interes compuesto: la diferencia entre aportar pronto y aportar tarde',
    description:
      'Guia para entender como crece el capital con el tiempo y por que el plazo suele importar mas que la aportacion puntual.',
    targetToolUrl: '/calculadora-interes-compuesto',
    tags: ['ahorro', 'inversion', 'interes compuesto'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-04-11T09:00:00.000Z',
    content: `## El tiempo es el verdadero acelerador

Cuando se habla de interes compuesto se suele poner el foco en la rentabilidad, pero el factor decisivo muchas veces es el tiempo. Un capital que permanece invertido durante mas anos no solo crece por la rentabilidad anual, sino porque cada periodo genera rendimientos sobre los rendimientos anteriores.

## Por que empezar antes cambia tanto el resultado

Dos personas pueden invertir la misma cantidad total y acabar con resultados muy distintos si una empieza antes. La ventaja no viene de aportar mucho de golpe, sino de dejar trabajar al capital durante mas ciclos.

## Variables clave que debes vigilar

- capital inicial,
- aportacion periodica,
- rentabilidad anual estimada,
- frecuencia de capitalizacion,
- horizonte temporal.

## Error comun: obsesionarse con el ultimo 1 %

Mucha gente intenta afinar rentabilidades imposibles y olvida lo mas importante: constancia, comisiones razonables y un plazo suficiente. En muchos escenarios, ahorrar antes o mantener el plan durante mas tiempo pesa mas que encontrar un producto milagroso.

## Como usar bien una calculadora

No la uses para predecir el futuro con precision. Usala para comparar escenarios y entender sensibilidades: que pasa si subes la aportacion mensual, si reduces comisiones o si extiendes el plazo cinco anos mas.

## Conclusiones

El interes compuesto no es magia. Es matematicas aplicadas a la constancia. Cuanto antes empieces y mas estable sea tu estrategia, mayor suele ser la diferencia final.
`,
  },
  {
    slug: 'imc-calorias-y-tdee-como-leer-estas-metricas-sin-obsesionarte',
    title: 'IMC, calorias y TDEE: como leer estas metricas sin obsesionarte',
    description:
      'Guia para entender que mide cada calculadora de salud, cuando sirve y cuando conviene no sacar conclusiones rapidas.',
    targetToolUrl: '/calculadora-calorias',
    tags: ['salud', 'imc', 'calorias'],
    publishedAt: '2026-04-11T09:00:00.000Z',
    updatedAt: '2026-04-11T09:00:00.000Z',
    content: `## Estas calculadoras sirven para orientarte, no para diagnosticarte

Las herramientas de IMC, metabolismo basal y gasto calorico diario pueden ser utiles para tener una referencia rapida, pero no sustituyen una valoracion clinica ni un plan nutricional personalizado.

## Que mide cada una

- **IMC**: relacion entre peso y altura. Sirve como indicador poblacional basico, pero no distingue masa muscular ni composicion corporal.
- **BMR**: energia minima estimada que tu cuerpo necesita en reposo.
- **TDEE**: gasto diario total segun nivel de actividad.

## Donde se suele fallar al interpretarlas

1. Tomar el IMC como conclusion definitiva.
2. Usar un nivel de actividad irreal.
3. Ajustar calorias de forma agresiva sin seguimiento.
4. Ignorar contexto: edad, sexo, entrenamiento, salud metabolica.

## Como sacarles partido de forma sensata

Utilizalas para definir un punto de partida. Si quieres perder grasa, ganar masa o mejorar rendimiento, lo razonable es observar tendencia, adherencia y sensaciones durante varias semanas en lugar de reaccionar a un numero aislado.

## Recomendacion final

Las calculadoras son utiles cuando abren la puerta a decisiones prudentes y medibles. Si necesitas una interpretacion clinica o tienes condicion medica previa, consulta con un profesional sanitario.
`,
  },
];

export function getEditorialArticleBySlug(slug: string): EditorialArticle | undefined {
  return editorialArticles.find((article) => article.slug === slug);
}
