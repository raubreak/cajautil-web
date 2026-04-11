export interface EditorialLink {
  href: string;
  label: string;
}

export interface EditorialSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface EditorialFaq {
  question: string;
  answer: string;
}

export interface ToolEditorialEntry {
  summary: string[];
  sections: EditorialSection[];
  faqs: EditorialFaq[];
  relatedTools: EditorialLink[];
  relatedArticles?: EditorialLink[];
  references?: EditorialLink[];
  disclaimer?: string;
}

function buildEntry(entry: ToolEditorialEntry): ToolEditorialEntry {
  return entry;
}

export const toolEditorialContent: Record<string, ToolEditorialEntry> = {
  'calculadora-sueldo-neto': buildEntry({
    summary: [
      'Entender el sueldo neto es clave para comparar ofertas, revisar una subida salarial o planificar tus gastos fijos con una base mas realista que el salario bruto anual.',
      'Aunque la nomina final depende de circunstancias personales, esta guia te ayuda a interpretar que parte del salario corresponde a IRPF, cotizaciones y reparto en 12 o 14 pagas.',
    ],
    sections: [
      {
        title: 'Que calcula exactamente un sueldo neto',
        paragraphs: [
          'El neto mensual es la cantidad aproximada que queda despues de descontar cotizaciones sociales y retenciones de IRPF sobre el salario bruto. Es el dato que mejor refleja el dinero disponible para gasto o ahorro.',
          'A igualdad de bruto, el neto puede cambiar por el numero de pagas, la situacion familiar, la comunidad autonoma o determinados complementos incluidos en la nomina.',
        ],
      },
      {
        title: 'Como interpretar el resultado sin caer en errores',
        bullets: [
          'No compares una oferta en 12 pagas con otra en 14 sin pasar ambas a neto mensual y anual.',
          'Una retencion distinta de IRPF puede mover el neto aunque el bruto no cambie.',
          'Las dietas, bonus o variables no siempre deben tratarse como salario fijo recurrente.',
          'La calculadora sirve para una estimacion inicial, no para sustituir una nomina real o un calculo laboral individualizado.',
        ],
      },
      {
        title: 'Cuando conviene usarla',
        paragraphs: [
          'Resulta especialmente util al negociar un contrato, comparar una propuesta nueva con tu situacion actual o decidir si una subida compensa realmente despues de impuestos.',
          'Tambien es una buena base para calcular capacidad de ahorro, cuota hipotecaria asumible o impacto de un cambio de pagas extraordinarias.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Por que dos personas con el mismo bruto pueden cobrar netos distintos',
        answer: 'Porque el IRPF y algunas circunstancias de cotizacion dependen de la situacion personal, familiar y contractual. El bruto por si solo no determina el neto exacto.',
      },
      {
        question: 'Que es mejor, 12 o 14 pagas',
        answer: 'No hay una respuesta universal. El total anual puede ser igual, pero cambia el reparto de liquidez durante el ano. La mejor opcion depende de tu forma de organizar gastos y ahorro.',
      },
      {
        question: 'Puedo usar este resultado para pedir una hipoteca',
        answer: 'Te sirve como referencia inicial para estimar capacidad de pago, pero el banco revisara ingresos netos reales, estabilidad laboral y otras deudas.',
      },
    ],
    relatedTools: [
      { href: '/calculadora-porcentajes', label: 'Calculadora de porcentajes' },
      { href: '/calculadora-hipotecas', label: 'Calculadora de hipotecas' },
      { href: '/calculadora-prestamos', label: 'Simulador de prestamos' },
    ],
    relatedArticles: [
      { href: '/articulos/como-negociar-tu-sueldo-bruto-sin-perder-neto', label: 'Como negociar tu sueldo bruto sin perder de vista el neto' },
    ],
    references: [
      { href: 'https://sede.agenciatributaria.gob.es/', label: 'Agencia Tributaria' },
      { href: 'https://www.seg-social.es/', label: 'Seguridad Social' },
    ],
    disclaimer:
      'Informacion orientativa para planificacion personal. No sustituye una nomina, un certificado de retenciones ni asesoramiento laboral o fiscal individual.',
  }),
  'calculadora-iva': buildEntry({
    summary: [
      'Calcular IVA con rapidez es util para presupuestos, revision de tickets, facturacion y comprobacion de importes finales antes de emitir o pagar un documento.',
      'La dificultad habitual no esta en anadir el impuesto, sino en quitarlo correctamente cuando solo tienes el total final y necesitas recuperar la base imponible.',
    ],
    sections: [
      {
        title: 'Como se calcula de verdad el IVA',
        paragraphs: [
          'Para anadir IVA se multiplica la base imponible por el tipo correspondiente y se suma la cuota resultante al precio base. Para quitarlo, no basta con restar el porcentaje: hay que dividir el total entre el factor adecuado.',
          'Ese detalle evita uno de los errores mas habituales cuando se revisan facturas antiguas o precios ya impuestos incluidos.',
        ],
      },
      {
        title: 'Situaciones practicas donde mas se usa',
        bullets: [
          'Preparar presupuestos de servicios y conocer el total antes de enviarlo al cliente.',
          'Revisar tickets o compras online para separar base imponible y cuota.',
          'Comprobar facturas de proveedores o simulaciones de margen comercial.',
          'Contrastar rapidamente si el tipo aplicado parece razonable en un caso concreto.',
        ],
      },
      {
        title: 'Errores comunes y normativa',
        paragraphs: [
          'El tipo aplicable depende del bien o servicio. En Espana conviven el tipo general, el reducido y el superreducido segun los supuestos previstos en la normativa del IVA.',
          'Antes de emitir documentos oficiales conviene revisar el tratamiento correcto con la Agencia Tributaria o con asesoria si el caso no es estandar.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Como quitar el IVA de un precio final sin equivocarme',
        answer: 'Debes dividir el total entre 1,21, 1,10 o 1,04 segun el tipo aplicable. Restar el porcentaje directamente suele dar un resultado incorrecto.',
      },
      {
        question: 'Sirve para tickets y facturas oficiales',
        answer: 'Sirve para revisar y estimar importes. Para emitir documentos oficiales debes verificar tipo, redondeos y criterio fiscal aplicable.',
      },
      {
        question: 'Que diferencia hay entre base imponible y total',
        answer: 'La base imponible es el importe antes de impuestos. El total es la base mas la cuota de IVA.',
      },
    ],
    relatedTools: [
      { href: '/calculadora-porcentajes', label: 'Calculadora de porcentajes' },
      { href: '/calculadora-descuentos', label: 'Calculadora de descuentos' },
      { href: '/calculadora-sueldo-neto', label: 'Calculadora de sueldo neto' },
    ],
    relatedArticles: [
      { href: '/articulos/como-calcular-el-iva-correctamente-en-facturas-y-presupuestos', label: 'Como calcular el IVA correctamente en facturas y presupuestos' },
    ],
    references: [{ href: 'https://sede.agenciatributaria.gob.es/', label: 'Informacion fiscal oficial' }],
    disclaimer:
      'Calculo orientativo para comprobaciones rapidas. La aplicacion del tipo correcto y el criterio de redondeo deben revisarse en cada caso real.',
  }),
  'calculadora-prestamos': buildEntry({
    summary: [
      'Un simulador de prestamos sirve para comparar escenarios antes de hablar con una entidad y evitar decidir solo por la cuota mensual anunciada.',
      'La diferencia real entre dos ofertas suele estar en el coste total, el plazo, la TAE y las comisiones, no solo en el TIN nominal.',
    ],
    sections: [
      {
        title: 'Que es el sistema de amortizacion frances',
        paragraphs: [
          'Es el modelo mas habitual en prestamos personales en Espana. La cuota se mantiene estable si el tipo no cambia, pero la composicion interna varia: al inicio pagas mas intereses y menos capital, y al final sucede lo contrario.',
          'Por eso una amortizacion anticipada temprana suele tener mas impacto en el ahorro de intereses que la misma amortizacion realizada al final del prestamo.',
        ],
      },
      {
        title: 'Variables que mas cambian el resultado',
        bullets: [
          'Capital solicitado: cuanto mayor sea, mayor sera el coste financiero acumulado.',
          'Plazo: baja la cuota cuando se alarga, pero eleva los intereses totales.',
          'TIN y TAE: el primero sirve para el calculo base; la segunda ayuda a comparar el coste real.',
          'Comisiones o productos vinculados: pueden volver menos competitiva una oferta aparentemente barata.',
        ],
      },
      {
        title: 'Como comparar dos ofertas sin autoenganarte',
        paragraphs: [
          'Conviene simular el mismo capital con distintos plazos y observar no solo la cuota, sino el total devuelto. Es frecuente elegir un plazo comodo y descubrir despues que el coste adicional ha sido muy elevado.',
          'Si el prestamo financia un gasto no imprescindible, la simulacion tambien sirve para valorar si compensa esperar y ahorrar antes de endeudarte.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Que deberia mirar ademas de la cuota',
        answer: 'La TAE, el coste total devuelto, las comisiones y la posibilidad de amortizar anticipadamente sin penalizacion relevante.',
      },
      {
        question: 'Un plazo mas largo siempre es mejor porque baja la cuota',
        answer: 'No. Baja la cuota mensual, pero normalmente sube bastante el total de intereses pagados.',
      },
      {
        question: 'La simulacion sirve para una oferta bancaria concreta',
        answer: 'Sirve como referencia previa. La oferta final puede cambiar por scoring, comisiones, seguros u otras condiciones del contrato.',
      },
    ],
    relatedTools: [
      { href: '/calculadora-hipotecas', label: 'Calculadora de hipotecas' },
      { href: '/calculadora-interes-compuesto', label: 'Calculadora de interes compuesto' },
      { href: '/calculadora-porcentajes', label: 'Calculadora de porcentajes' },
    ],
    relatedArticles: [
      { href: '/articulos/tin-tae-cuota-mensual-como-comparar-prestamos-de-verdad', label: 'TIN, TAE y cuota mensual: como comparar prestamos de verdad' },
    ],
    references: [{ href: 'https://www.bde.es/', label: 'Banco de Espana' }],
    disclaimer:
      'Simulacion informativa. No sustituye la FEIN, la oferta vinculante ni el analisis individual del contrato.',
  }),
  'calculadora-hipotecas': buildEntry({
    summary: [
      'La cuota hipotecaria es solo una parte de la foto. Antes de comprar vivienda conviene entender capital, plazo, TIN, TAE, gastos iniciales y margen real de endeudamiento.',
      'Una buena simulacion no sirve solo para ver cuanto pagarias al mes, sino para comparar escenarios y detectar cuando una hipoteca empieza a tensionar demasiado tus finanzas.',
    ],
    sections: [
      {
        title: 'Que deberias mirar ademas de la cuota',
        bullets: [
          'Entrada necesaria y porcentaje financiado por la entidad.',
          'Gastos iniciales de tasacion, notaria o gestiones adicionales.',
          'Diferencia entre interes fijo, variable o mixto.',
          'Impacto de productos vinculados sobre el coste total.',
        ],
      },
      {
        title: 'Como se usa la simulacion para tomar decisiones mejores',
        paragraphs: [
          'Lo mas util es comparar el mismo inmueble con distintos plazos o distintos porcentajes de entrada. A veces una entrada mayor reduce mucho el riesgo financiero a largo plazo.',
          'Tambien sirve para fijar un presupuesto maximo de compra antes de empezar a visitar viviendas y evitar enamorarte de un precio que luego no encaja con tu neto real.',
        ],
      },
      {
        title: 'Errores que encarecen una hipoteca',
        paragraphs: [
          'Centrarse solo en la cuota del primer ano, ignorar la TAE o asumir que el Euribor siempre sera benigno son errores frecuentes. Otro fallo habitual es no reservar colchones para imprevistos una vez firmada la compra.',
          'Si la cuota proyectada deja tu margen mensual demasiado justo, el problema no es solo bancario: es de estabilidad financiera personal.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Que porcentaje del sueldo neto deberia ir a la hipoteca',
        answer: 'Como regla prudente, muchas personas intentan no superar aproximadamente un tercio del neto mensual, aunque depende del resto de gastos y estabilidad de ingresos.',
      },
      {
        question: 'Es mejor hipoteca fija o variable',
        answer: 'Depende de tu tolerancia al riesgo, del momento del mercado y de la previsibilidad que necesites. La fija da estabilidad; la variable puede abaratar o encarecer la cuota con el tiempo.',
      },
      {
        question: 'La simulacion incluye todos los gastos de compra',
        answer: 'No siempre. La cuota refleja el prestamo, pero debes sumar entrada, tasacion y otros costes iniciales para tener la foto completa.',
      },
    ],
    relatedTools: [
      { href: '/calculadora-sueldo-neto', label: 'Calculadora de sueldo neto' },
      { href: '/calculadora-prestamos', label: 'Simulador de prestamos' },
      { href: '/calculadora-porcentajes', label: 'Calculadora de porcentajes' },
    ],
    relatedArticles: [
      { href: '/articulos/tin-tae-cuota-mensual-como-comparar-prestamos-de-verdad', label: 'TIN, TAE y cuota mensual: como comparar prestamos de verdad' },
    ],
    references: [{ href: 'https://www.bde.es/', label: 'Guia hipotecaria del Banco de Espana' }],
    disclaimer:
      'Estimacion orientativa. La oferta final depende de tasacion, perfil financiero, vinculaciones y documentacion precontractual.',
  }),
  'calculadora-porcentajes': buildEntry({
    summary: [
      'Los porcentajes aparecen en rebajas, IVA, subidas salariales, descuentos compuestos, comisiones y comparativas de precios. Saber leerlos bien evita muchos errores cotidianos.',
      'Esta herramienta sirve tanto para resolver calculos rapidos como para entender cuanto cambia realmente una cantidad cuando sube o baja un porcentaje.',
    ],
    sections: [
      {
        title: 'Que tipos de calculo conviene dominar',
        bullets: [
          'Cuanto es un porcentaje de una cantidad.',
          'Que porcentaje representa una cantidad sobre otra.',
          'Como calcular una subida o una bajada porcentual.',
          'Como pasar de un valor inicial a uno final y medir la variacion real.',
        ],
      },
      {
        title: 'Errores muy habituales',
        paragraphs: [
          'No es lo mismo bajar un 20 % y luego subir un 20 %: el punto de partida cambia y el resultado final no vuelve al valor original.',
          'Tambien se confunden mucho el descuento aplicado sobre precio base con el ahorro real una vez sumados otros costes como IVA o envio.',
        ],
      },
      {
        title: 'Usos practicos reales',
        paragraphs: [
          'Resulta util para comparar promociones, analizar una revision salarial, estimar rentabilidades o medir el impacto de una comision sobre tus ingresos o gastos.',
          'Es una de las utilidades mas transversales porque sirve de apoyo a muchas otras calculadoras del sitio.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Un descuento del 50 % y luego otro del 20 % equivale al 70 %',
        answer: 'No. El segundo descuento se aplica sobre el precio ya rebajado, asi que el descuento acumulado real es menor del 70 %.',
      },
      {
        question: 'Como saber cuanto ha subido algo en porcentaje',
        answer: 'Debes restar el valor inicial al final, dividir la diferencia entre el inicial y multiplicar por 100.',
      },
      {
        question: 'Sirve para calcular propinas o comisiones',
        answer: 'Si. Cualquier situacion basada en una proporcion respecto a una cantidad puede resolverse con una calculadora de porcentajes.',
      },
    ],
    relatedTools: [
      { href: '/calculadora-descuentos', label: 'Calculadora de descuentos' },
      { href: '/calculadora-iva', label: 'Calculadora de IVA' },
      { href: '/calculadora-sueldo-neto', label: 'Calculadora de sueldo neto' },
    ],
    disclaimer: 'Los porcentajes ayudan a estimar cambios y proporciones, pero siempre conviene revisar el contexto y la base exacta sobre la que se aplican.',
  }),
  'calculadora-descuentos': buildEntry({
    summary: [
      'Una rebaja atractiva no siempre implica una buena compra. Para valorar un descuento conviene separar ahorro absoluto, precio final y comparacion con otras ofertas reales.',
      'Esta herramienta te ayuda a calcular rapido cuanto pagas y cuanto ahorras, pero tambien a evitar trampas habituales en promociones comerciales.',
    ],
    sections: [
      {
        title: 'Que deberias mirar en unas rebajas',
        bullets: [
          'Precio inicial real y no solo el porcentaje promocionado.',
          'Ahorro absoluto en euros, que es lo que realmente impacta en tu bolsillo.',
          'Si existe IVA, envio o coste adicional que altere el precio final.',
          'Si el descuento se acumula con otras promociones o no.',
        ],
      },
      {
        title: 'Errores comunes al interpretar descuentos',
        paragraphs: [
          'Es frecuente creer que dos descuentos sucesivos se suman linealmente. En realidad, el segundo se aplica sobre una base ya reducida, por lo que el ahorro final es menor de lo que parece.',
          'Otro error habitual es comprar por porcentaje y no por necesidad real. Un gran descuento sobre algo que no ibas a comprar sigue siendo gasto, no ahorro.',
        ],
      },
      {
        title: 'Cuando esta calculadora es mas util',
        paragraphs: [
          'Funciona especialmente bien para comparar dos ofertas, medir el impacto de cupones o saber si te conviene mas una rebaja fija en euros o una promocion porcentual.',
          'Tambien puede servir para fijar limites de gasto antes de periodos de rebajas y compras impulsivas.',
        ],
      },
    ],
    faqs: [
      { question: 'Un 2x1 siempre sale mejor que un descuento porcentual', answer: 'No necesariamente. Depende del numero de unidades que realmente necesitas y del precio base de cada producto.' },
      { question: 'Como comparo dos ofertas distintas', answer: 'Calcula el precio final y el ahorro absoluto en euros en cada una. Eso te permite comparar en igualdad de condiciones.' },
      { question: 'Sirve para calcular cupones acumulados', answer: 'Si, aunque conviene aplicarlos en el mismo orden que usa la tienda para no sobrestimar el ahorro.' },
    ],
    relatedTools: [
      { href: '/calculadora-porcentajes', label: 'Calculadora de porcentajes' },
      { href: '/calculadora-iva', label: 'Calculadora de IVA' },
      { href: '/contador-de-palabras', label: 'Contador de palabras' },
    ],
  }),
  'validador-iban': buildEntry({
    summary: [
      'Validar un IBAN ayuda a detectar errores de formato antes de enviar dinero, automatizar pagos o registrar cuentas bancarias en un sistema.',
      'El dato importante es entender que la validacion evita fallos mecanicos, pero no confirma por si sola la identidad del titular ni la operatividad de la cuenta.',
    ],
    sections: [
      {
        title: 'Que comprueba el algoritmo MOD 97',
        paragraphs: [
          'El estandar IBAN usa digitos de control que permiten detectar si la cadena ha sido escrita con errores. El algoritmo convierte la cuenta a una secuencia numerica y comprueba el resto sobre 97.',
          'Si el resultado no cuadra, la cuenta se considera invalida desde el punto de vista formal.',
        ],
      },
      {
        title: 'Usos practicos del validador',
        bullets: [
          'Verificar un IBAN antes de una transferencia manual.',
          'Comprobar cuentas enviadas por email o formularios.',
          'Reducir errores al importar datos bancarios en procesos administrativos.',
          'Detectar fallos de transcripcion antes de que generen devoluciones o incidencias.',
        ],
      },
      {
        title: 'Limitaciones que conviene recordar',
        paragraphs: [
          'Un IBAN formalmente valido no garantiza que el titular sea correcto ni que la cuenta este activa. Para pagos importantes conviene verificar el dato por una segunda via.',
          'Tampoco sustituye los procedimientos internos de prevencion de fraude o validacion documental en empresa.',
        ],
      },
    ],
    faqs: [
      { question: 'Puedo fiarme de una cuenta solo porque el IBAN sea valido', answer: 'No. Significa que el formato y los digitos de control son correctos, pero no valida identidad ni titularidad.' },
      { question: 'Que errores detecta mejor', answer: 'Copias incompletas, digitos intercambiados, espacios o fallos de transcripcion frecuentes.' },
      { question: 'Sirve para cuentas de otros paises', answer: 'Si el formato IBAN esta soportado, la validacion formal puede aplicarse tambien a cuentas internacionales con IBAN.' },
    ],
    relatedTools: [
      { href: '/calculadora-iva', label: 'Calculadora de IVA' },
      { href: '/calculadora-prestamos', label: 'Simulador de prestamos' },
      { href: '/calculadora-sueldo-neto', label: 'Calculadora de sueldo neto' },
    ],
    relatedArticles: [
      { href: '/articulos/iban-bic-y-transferencias-como-evitar-errores-antes-de-enviar-dinero', label: 'IBAN, BIC y transferencias: como evitar errores antes de enviar dinero' },
    ],
  }),
  'calculadora-imc': buildEntry({
    summary: [
      'El IMC es una referencia rapida para relacionar peso y altura, util como primera aproximacion pero insuficiente para describir por si solo la salud de una persona.',
      'Lo mas importante al usar esta herramienta es interpretar el resultado con prudencia y dentro de un contexto mayor que incluya habitos, composicion corporal y objetivos reales.',
    ],
    sections: [
      {
        title: 'Que mide y que no mide el IMC',
        paragraphs: [
          'El indice de masa corporal divide el peso en kilogramos entre la altura al cuadrado en metros. Permite clasificar rangos generales, pero no distingue masa muscular, grasa corporal o distribucion del peso.',
          'Por eso puede sobrestimar el riesgo en personas musculadas o infraestimarlo en otros perfiles.',
        ],
      },
      {
        title: 'Como usarlo de forma util',
        bullets: [
          'Tomalo como un punto de partida, no como un diagnostico.',
          'Combinalo con habitos de actividad, descanso y alimentacion.',
          'Si buscas un objetivo de composicion corporal, revisa tambien medidas de cintura o evolucion en el tiempo.',
          'Si tienes dudas clinicas, consulta con un profesional sanitario.',
        ],
      },
      {
        title: 'Errores frecuentes',
        paragraphs: [
          'El error mas comun es sacar conclusiones absolutas de un unico numero. Otro fallo es usarlo para justificar dietas extremas o expectativas poco realistas a corto plazo.',
          'El IMC es una referencia poblacional; tu contexto individual importa tanto o mas que la cifra aislada.',
        ],
      },
    ],
    faqs: [
      { question: 'El IMC sirve para deportistas', answer: 'Puede servir como dato orientativo, pero suele ser menos representativo cuando hay mucha masa muscular.' },
      { question: 'Con un IMC normal ya esta todo bien', answer: 'No necesariamente. Es posible tener un IMC normal y necesitar revisar otros factores de salud o composicion corporal.' },
      { question: 'Debo cambiar mi dieta solo por el resultado del IMC', answer: 'No de forma automatica. Lo razonable es valorar contexto, historial y objetivos antes de hacer cambios importantes.' },
    ],
    relatedTools: [
      { href: '/calculadora-calorias', label: 'Calculadora de calorias y TDEE' },
      { href: '/calculadora-edad', label: 'Calculadora de edad' },
      { href: '/temporizador', label: 'Temporizador' },
    ],
    relatedArticles: [
      { href: '/articulos/imc-calorias-y-tdee-como-leer-estas-metricas-sin-obsesionarte', label: 'IMC, calorias y TDEE: como leer estas metricas sin obsesionarte' },
    ],
    references: [{ href: 'https://www.who.int/', label: 'Organizacion Mundial de la Salud' }],
    disclaimer:
      'Informacion general orientativa. No sustituye evaluacion medica, nutricional ni diagnostico clinico.',
  }),
  'calculadora-calorias': buildEntry({
    summary: [
      'Calcular metabolismo basal y gasto energetico diario ayuda a fijar un punto de partida para mantenimiento, perdida de peso o ganancia de masa, siempre como estimacion.',
      'El valor mas util no es la cifra perfecta, sino entender como cambian tus necesidades segun actividad, peso, altura y constancia en el tiempo.',
    ],
    sections: [
      {
        title: 'Que es BMR y que es TDEE',
        paragraphs: [
          'El BMR o metabolismo basal estima la energia minima que el cuerpo necesita en reposo. El TDEE o gasto diario total anade el efecto de la actividad cotidiana y el ejercicio.',
          'Por eso dos personas con peso similar pueden necesitar calorias distintas si su nivel de movimiento es muy diferente.',
        ],
      },
      {
        title: 'Como usar el resultado con sentido practico',
        bullets: [
          'Usa el TDEE como punto de partida y revisa la evolucion durante varias semanas.',
          'No elijas un nivel de actividad mas alto de lo real por optimismo.',
          'Pequenos ajustes sostenidos suelen funcionar mejor que recortes extremos.',
          'La adherencia y la calidad del plan importan tanto como el numero inicial.',
        ],
      },
      {
        title: 'Errores comunes',
        paragraphs: [
          'Se falla mucho al sobrestimar actividad y al buscar cambios rapidos. Tambien es frecuente ignorar que las formulas son estimaciones y que el cuerpo humano no responde como una calculadora exacta.',
          'La observacion de tendencia, energia, hambre y rendimiento sigue siendo clave para ajustar cualquier estrategia nutricional.',
        ],
      },
    ],
    faqs: [
      { question: 'La formula acierta siempre', answer: 'No. Ofrece una aproximacion util, pero cada persona puede desviarse respecto al valor estimado.' },
      { question: 'Si quiero perder peso debo bajar mucho las calorias desde el primer dia', answer: 'No suele ser lo mas recomendable. Ajustes moderados y sostenibles suelen facilitar mejor adherencia y mejores resultados.' },
      { question: 'El TDEE cambia con el tiempo', answer: 'Si. Puede variar por peso, composicion corporal, actividad, descanso y otros factores.' },
    ],
    relatedTools: [
      { href: '/calculadora-imc', label: 'Calculadora de IMC' },
      { href: '/temporizador', label: 'Temporizador' },
      { href: '/contador-de-palabras', label: 'Contador de palabras' },
    ],
    relatedArticles: [
      { href: '/articulos/imc-calorias-y-tdee-como-leer-estas-metricas-sin-obsesionarte', label: 'IMC, calorias y TDEE: como leer estas metricas sin obsesionarte' },
    ],
    disclaimer:
      'Estimacion orientativa para planificacion personal. No sustituye consejo nutricional o medico individual.',
  }),
  'calculadora-interes-compuesto': buildEntry({
    summary: [
      'El interes compuesto permite visualizar como crecen el ahorro y la inversion cuando los rendimientos se reinvierten a lo largo del tiempo.',
      'La leccion mas valiosa de esta calculadora no es una cifra final exacta, sino entender el peso del tiempo, la constancia y las aportaciones periodicas.',
    ],
    sections: [
      {
        title: 'Por que el tiempo importa tanto',
        paragraphs: [
          'Cada periodo genera rendimiento sobre el capital inicial y tambien sobre rendimientos anteriores. Esa acumulacion hace que los ultimos anos tengan un impacto visual enorme en la curva final.',
          'Por eso empezar antes suele compensar mas que intentar aportar mucho mas tarde y de golpe.',
        ],
      },
      {
        title: 'Variables que conviene probar',
        bullets: [
          'Capital inicial y aportacion mensual.',
          'Horizonte temporal realista.',
          'Rentabilidad anual prudente, no optimista en exceso.',
          'Frecuencia de capitalizacion y efecto de las comisiones.',
        ],
      },
      {
        title: 'Errores comunes al proyectar',
        paragraphs: [
          'El error mas tipico es asumir rentabilidades demasiado altas de forma constante. Otro es ignorar comisiones, fiscalidad o periodos de caida cuando se usan simulaciones largas.',
          'Esta herramienta es muy util para comparar escenarios, no para prometer resultados garantizados.',
        ],
      },
    ],
    faqs: [
      { question: 'Es mejor invertir mucho una vez o poco todos los meses', answer: 'Depende del caso, pero muchas personas se benefician de aportar de forma constante porque reduce la dependencia del momento exacto de entrada.' },
      { question: 'La rentabilidad anual debe ser siempre la misma', answer: 'No. En la realidad varia. La calculadora usa una media para que puedas comparar escenarios de forma sencilla.' },
      { question: 'Sirve para planificar jubilacion o ahorro a largo plazo', answer: 'Si, especialmente para ver como afectan plazo y aportacion mensual a un objetivo futuro.' },
    ],
    relatedTools: [
      { href: '/calculadora-prestamos', label: 'Simulador de prestamos' },
      { href: '/calculadora-hipotecas', label: 'Calculadora de hipotecas' },
      { href: '/calculadora-porcentajes', label: 'Calculadora de porcentajes' },
    ],
    relatedArticles: [
      { href: '/articulos/interes-compuesto-la-diferencia-entre-aportar-pronto-y-aportar-tarde', label: 'Interes compuesto: la diferencia entre aportar pronto y aportar tarde' },
    ],
    disclaimer: 'Proyeccion estimativa. No equivale a rentabilidades garantizadas ni a recomendacion de inversion.',
  }),
  'calculadora-regla-de-tres': buildEntry({
    summary: [
      'La regla de tres sigue siendo una de las herramientas mas utiles para resolver proporcionalidad en estudios, trabajo, cocina, compras o conversiones rapidas.',
      'Entender si la relacion es directa o inversa es el paso decisivo para no aplicar la formula correcta en el contexto equivocado.',
    ],
    sections: [
      {
        title: 'Diferencia entre proporcionalidad directa e inversa',
        paragraphs: [
          'En una relacion directa, si una magnitud sube, la otra tambien sube en la misma proporcion. En una relacion inversa, cuando una aumenta, la otra disminuye.',
          'El error mas comun no esta en la formula, sino en elegir mal el tipo de relacion.',
        ],
      },
      {
        title: 'Ejemplos practicos donde aparece',
        bullets: [
          'Escalar recetas o mezclas.',
          'Calcular precio por cantidad.',
          'Repartir tiempos o cargas de trabajo.',
          'Resolver ejercicios de matematicas, fisica o quimica.',
        ],
      },
      {
        title: 'Consejos para no equivocarte',
        paragraphs: [
          'Antes de meter numeros, piensa en la logica del caso: si duplicas una magnitud, la otra deberia duplicarse o reducirse? Esa pregunta suele desbloquear el modo correcto.',
          'Si el resultado final te parece absurdo, revisa unidades y orden de los valores antes de darlo por bueno.',
        ],
      },
    ],
    faqs: [
      { question: 'Cuando se usa la regla de tres inversa', answer: 'Cuando al aumentar una magnitud la otra disminuye, como en ciertos repartos de tiempo o trabajo.' },
      { question: 'Puedo usarla con porcentajes', answer: 'Si. Muchas operaciones porcentuales pueden interpretarse como relaciones de proporcionalidad.' },
      { question: 'Sirve para recetas y cantidades de cocina', answer: 'Si, es uno de los usos mas habituales para adaptar ingredientes a mas o menos raciones.' },
    ],
    relatedTools: [
      { href: '/calculadora-porcentajes', label: 'Calculadora de porcentajes' },
      { href: '/conversor-unidades', label: 'Conversor de unidades' },
      { href: '/calculadora-descuentos', label: 'Calculadora de descuentos' },
    ],
  }),
  'calculadora-dias': buildEntry({
    summary: [
      'Calcular dias entre fechas sirve para contratos, plazos administrativos, vacaciones, entregas, antiguedad o simplemente para organizar hitos personales.',
      'La clave esta en diferenciar si necesitas una diferencia exacta en dias o una interpretacion mas humana en meses y anos.',
    ],
    sections: [
      {
        title: 'Que cambia segun el tipo de calculo',
        paragraphs: [
          'No es lo mismo contar dias naturales exactos que expresar la diferencia en anos, meses y dias. Cada enfoque responde mejor a una necesidad distinta.',
          'Para plazos legales o administrativos conviene revisar siempre si el criterio exige dias naturales o habiles.',
        ],
      },
      {
        title: 'Casos de uso frecuentes',
        bullets: [
          'Saber cuantos dias faltan para una fecha importante.',
          'Medir duracion de vacaciones o permisos.',
          'Calcular antiguedad entre dos hitos.',
          'Revisar intervalos en proyectos, reservas o entregas.',
        ],
      },
      {
        title: 'Errores comunes',
        paragraphs: [
          'Confundir dia inicial y final, no tener en cuenta anos bisiestos o aplicar dias naturales cuando realmente importan los habiles son fallos frecuentes.',
          'La herramienta ayuda a contar con rapidez, pero el criterio juridico del plazo depende de la normativa concreta.',
        ],
      },
    ],
    faqs: [
      { question: 'Incluye anos bisiestos', answer: 'Si, el calculo de fechas reales debe contemplar la longitud efectiva de cada ano y mes.' },
      { question: 'Sirve para plazos legales', answer: 'Sirve como apoyo, pero debes confirmar si tu caso exige dias naturales o habiles segun la norma aplicable.' },
      { question: 'Puedo usarla para vacaciones', answer: 'Si, es uno de los usos mas comunes para medir periodos completos o dias restantes.' },
    ],
    relatedTools: [
      { href: '/calculadora-edad', label: 'Calculadora de edad' },
      { href: '/temporizador', label: 'Temporizador' },
      { href: '/cronometro', label: 'Cronometro' },
    ],
  }),
  'calculadora-edad': buildEntry({
    summary: [
      'Calcular edad exacta es util para tramites, formularios, curiosidad personal o para medir tiempo en dias, meses y anos con mas detalle que una fecha de nacimiento aislada.',
      'La herramienta gana valor cuando necesitas una diferencia precisa y no solo saber cuantos anos has cumplido.',
    ],
    sections: [
      {
        title: 'Para que sirve una edad exacta',
        paragraphs: [
          'Ademas de la curiosidad, puede ayudarte en formularios, seguimiento de hitos personales, comparativas de tiempo o simples calculos de antiguedad vital.',
          'Expresar la edad en dias, horas o semanas tambien puede tener interes educativo o divulgativo.',
        ],
      },
      {
        title: 'Como se calcula',
        paragraphs: [
          'Se parte de la fecha de nacimiento y se compara con la fecha actual o una fecha objetivo, teniendo en cuenta la longitud real de meses y anos.',
          'Eso evita errores tipicos cuando se simplifica el calculo como si todos los meses tuvieran la misma duracion.',
        ],
      },
      {
        title: 'Limitaciones y buen uso',
        paragraphs: [
          'Para usos administrativos delicados conviene contrastar el resultado con el criterio exacto exigido por el formulario o la autoridad competente.',
          'Como herramienta general es excelente para referencias rapidas, pero no sustituye documentos oficiales.',
        ],
      },
    ],
    faqs: [
      { question: 'Cuenta anos bisiestos', answer: 'Si, la edad exacta debe considerar la longitud real del calendario.' },
      { question: 'Puedo calcular la edad en una fecha futura', answer: 'Si, es util para saber cuantos anos o dias tendras en un momento concreto.' },
      { question: 'Sirve para tramites oficiales', answer: 'Sirve como referencia, pero la validez juridica la determina siempre la documentacion oficial.' },
    ],
    relatedTools: [
      { href: '/calculadora-dias', label: 'Calculadora de dias entre fechas' },
      { href: '/calculadora-imc', label: 'Calculadora de IMC' },
      { href: '/temporizador', label: 'Temporizador' },
    ],
  }),
  'conversor-unidades': buildEntry({
    summary: [
      'Convertir unidades con precision es una necesidad cotidiana en cocina, viajes, deporte, compras, estudios y trabajo tecnico.',
      'La ventaja de un conversor fiable es que evita cadenas de calculos manuales y reduce errores de redondeo o equivalencias mal recordadas.',
    ],
    sections: [
      {
        title: 'Por que los errores de unidad son mas graves de lo que parecen',
        paragraphs: [
          'Una conversion mal hecha puede arruinar una receta, distorsionar una compra internacional o dar un resultado incorrecto en un ejercicio tecnico. Por eso conviene trabajar con equivalencias consistentes y no confiar en memoria aproximada.',
          'Las categorias mas consultadas suelen ser longitud, peso, temperatura, volumen, velocidad y tiempo porque aparecen constantemente en la vida diaria.',
        ],
      },
      {
        title: 'Situaciones donde mas ayuda',
        bullets: [
          'Recetas extranjeras con tazas, onzas o Fahrenheit.',
          'Compras y comparativas internacionales.',
          'Entrenamientos y ritmos en distintas unidades.',
          'Tareas escolares, cientificas o tecnicas.',
        ],
      },
      {
        title: 'Recomendaciones practicas',
        paragraphs: [
          'Si el resultado va a usarse en un contexto critico, revisa tambien el nivel de precision necesario y evita redondear demasiado pronto.',
          'Para temperatura, recuerda que no todas las conversiones son proporcionales: algunas incorporan suma o resta de constantes.',
        ],
      },
    ],
    faqs: [
      { question: 'Por que temperatura no se convierte igual que peso o longitud', answer: 'Porque necesita una formula con desplazamiento, no solo un factor multiplicador.' },
      { question: 'Es mejor redondear al principio o al final', answer: 'Normalmente al final, para conservar mas precision durante el calculo.' },
      { question: 'Sirve para cocina y deporte', answer: 'Si. Son dos de los contextos mas habituales para este tipo de conversion.' },
    ],
    relatedTools: [
      { href: '/calculadora-regla-de-tres', label: 'Regla de tres' },
      { href: '/calculadora-porcentajes', label: 'Calculadora de porcentajes' },
      { href: '/contador-de-palabras', label: 'Contador de palabras' },
    ],
  }),
  'compresor-webp': buildEntry({
    summary: [
      'Convertir imagenes a WebP puede reducir peso y mejorar carga web, pero el verdadero valor esta en saber cuando mantener calidad, compatibilidad y dimensiones adecuadas.',
      'La optimizacion de imagenes no deberia entenderse como un gesto cosmetico: afecta a experiencia movil, SEO tecnico y consumo de datos.',
    ],
    sections: [
      {
        title: 'Cuando WebP suele ser mejor opcion',
        bullets: [
          'Fotografias para blog, ecommerce y landings.',
          'Recursos que se cargan sobre todo en movil.',
          'Imagenes de contenido donde prima equilibrio entre calidad y peso.',
          'Procesos rapidos de optimizacion sin instalar software.',
        ],
      },
      {
        title: 'Que revisar despues de convertir',
        paragraphs: [
          'No basta con ver que el archivo pese menos. Tambien hay que revisar nitidez, artefactos, dimensiones finales y compatibilidad con el proyecto donde se publicara.',
          'En logos y graficos finos puede interesar conservar formatos alternativos para evitar perdida visual innecesaria.',
        ],
      },
      {
        title: 'Buenas practicas de rendimiento',
        paragraphs: [
          'Conviene combinar el formato optimizado con imagenes del tamano correcto, lazy loading y un uso razonable de recursos visuales. El formato ayuda, pero no arregla por si solo una estrategia de imagen deficiente.',
        ],
      },
    ],
    faqs: [
      { question: 'WebP siempre se ve igual que el original', answer: 'No siempre. Depende del nivel de compresion y del tipo de imagen. Lo recomendable es comprobar calidad y peso antes de publicar.' },
      { question: 'Sirve para SEO', answer: 'Ayuda indirectamente al mejorar velocidad y experiencia de carga, especialmente en movil.' },
      { question: 'Puedo convertir muchas imagenes y usar todas sin revisar', answer: 'No es lo ideal. En proyectos profesionales conviene inspeccionar muestras y confirmar compatibilidad.' },
    ],
    relatedTools: [
      { href: '/extractor-colores', label: 'Extractor de colores' },
      { href: '/generador-qr', label: 'Generador QR' },
      { href: '/generador-firmas-email', label: 'Generador de firmas de email' },
    ],
    relatedArticles: [
      { href: '/articulos/webp-cuando-conviene-convertir-imagenes-y-cuando-no', label: 'WebP: cuando conviene convertir imagenes y cuando no' },
    ],
  }),
  'generador-qr': buildEntry({
    summary: [
      'Un buen codigo QR ahorra friccion entre el mundo fisico y el digital, pero solo funciona si el contenido, el contraste y el contexto de uso estan bien resueltos.',
      'La diferencia entre un QR util y uno fallido suele estar en detalles simples: enlace correcto, tamano, contraste y pruebas reales antes de publicarlo.',
    ],
    sections: [
      {
        title: 'Para que sirve realmente un QR',
        paragraphs: [
          'Sirve para convertir una accion de escritura o busqueda en un escaneo directo. Eso reduce pasos en carteleria, menus, packaging, tarjetas o atencion al cliente.',
          'Su valor aumenta cuando el destino esta pensado para movil y carga rapido.',
        ],
      },
      {
        title: 'Buenas practicas de uso',
        bullets: [
          'Usa alto contraste entre modulos y fondo.',
          'Comprueba el destino final desde varios moviles.',
          'No lo hagas demasiado pequeno si va a imprimirse.',
          'Evita enlaces provisionales o paginas de destino muy pesadas.',
        ],
      },
      {
        title: 'Errores comunes que arruinan el escaneo',
        paragraphs: [
          'Los colores con poco contraste, las URL mal copiadas o un tamano insuficiente son los fallos mas tipicos. Tambien es frecuente olvidarse de que el destino final debe ser usable desde movil.',
        ],
      },
    ],
    faqs: [
      { question: 'Puedo poner colores personalizados', answer: 'Si, pero manteniendo contraste suficiente para que los lectores lo detecten bien.' },
      { question: 'Sirve para imprimir', answer: 'Si, siempre que descargues un tamano adecuado y pruebes el resultado antes.' },
      { question: 'Es mejor poner una URL corta', answer: 'Suele ayudar a simplificar el contenido y puede facilitar ciertos usos, aunque el usuario no vea la URL directamente.' },
    ],
    relatedTools: [
      { href: '/lector-qr', label: 'Lector de QR' },
      { href: '/generador-enlace-whatsapp', label: 'Generador de enlace WhatsApp' },
      { href: '/compresor-webp', label: 'Compresor WebP' },
    ],
    relatedArticles: [
      { href: '/articulos/como-crear-codigos-qr-utiles-y-evitar-errores-de-escaneo', label: 'Como crear codigos QR utiles y evitar errores de escaneo' },
    ],
  }),
  'lector-qr': buildEntry({
    summary: [
      'Leer un QR desde una imagen guardada es util cuando no puedes escanear con otra camara o cuando necesitas auditar codigos recibidos por email, diseño o mensajeria.',
      'Tambien resulta practico para verificar que un QR imprime bien, apunta al destino correcto y no contiene errores antes de compartirlo.',
    ],
    sections: [
      {
        title: 'Cuandote ayuda mas un lector desde imagen',
        bullets: [
          'Validar un QR antes de imprimirlo.',
          'Leer capturas o archivos recibidos por mensajeria.',
          'Comprobar si un diseño contiene el enlace correcto.',
          'Auditar material grafico sin usar el movil como camara secundaria.',
        ],
      },
      {
        title: 'Problemas habituales al leer un QR',
        paragraphs: [
          'La baja resolucion, el contraste pobre o los recortes excesivos pueden impedir la lectura. Tambien fallan los codigos demasiado distorsionados o con decoraciones que invaden modulos clave.',
        ],
      },
      {
        title: 'Recomendaciones de uso',
        paragraphs: [
          'Si un codigo no se lee bien, prueba una version con mas tamano, mejor nitidez o mas contraste. Para materiales impresos, revisar el archivo antes de fabricar o publicar ahorra muchas incidencias.',
        ],
      },
    ],
    faqs: [
      { question: 'Por que algunos QR no se detectan', answer: 'Normalmente por mala calidad de imagen, contraste insuficiente o distorsion en el diseño.' },
      { question: 'Sirve con capturas de pantalla', answer: 'Si, siempre que el codigo tenga resolucion suficiente y no este demasiado comprimido.' },
      { question: 'Puedo usarlo para comprobar un QR antes de imprimir', answer: 'Si, es uno de los usos mas recomendables.' },
    ],
    relatedTools: [
      { href: '/generador-qr', label: 'Generador QR' },
      { href: '/compresor-webp', label: 'Compresor WebP' },
      { href: '/extractor-colores', label: 'Extractor de colores' },
    ],
  }),
  'extractor-colores': buildEntry({
    summary: [
      'Extraer colores de una imagen ayuda a construir paletas coherentes para diseño web, branding, redes sociales o material impreso.',
      'La utilidad real no esta solo en ver codigos HEX, sino en identificar colores dominantes y trabajar con una base visual consistente.',
    ],
    sections: [
      {
        title: 'Cuando conviene extraer una paleta',
        bullets: [
          'Rediseñar una web a partir de una foto o referencia visual.',
          'Preparar una identidad visual rapida para redes o presentaciones.',
          'Detectar colores dominantes en packaging, producto o logotipo.',
          'Construir combinaciones coherentes para piezas creativas.',
        ],
      },
      {
        title: 'Que deberias revisar despues',
        paragraphs: [
          'No todos los colores extraidos son igual de utiles. Conviene distinguir entre tono dominante, color de apoyo y colores de acento, y revisar contraste si los vas a usar en texto o interfaces.',
          'Una paleta bonita puede seguir siendo poco accesible si no ofrece suficiente legibilidad.',
        ],
      },
      {
        title: 'Errores comunes',
        paragraphs: [
          'Elegir demasiados colores, ignorar contraste o usar tonos muy saturados en todas las superficies puede empeorar el resultado final. A menudo menos colores bien elegidos funcionan mejor.',
        ],
      },
    ],
    faqs: [
      { question: 'La paleta resultante sirve para web y redes sociales', answer: 'Si, especialmente como punto de partida para mantener coherencia visual entre piezas.' },
      { question: 'Debo usar todos los colores extraidos', answer: 'No. Lo normal es seleccionar solo los mas utiles y equilibrados.' },
      { question: 'Sirve para logos', answer: 'Si, puede ayudarte a identificar y replicar colores de marca, aunque luego conviene validar contraste y exactitud.' },
    ],
    relatedTools: [
      { href: '/compresor-webp', label: 'Compresor WebP' },
      { href: '/generador-qr', label: 'Generador QR' },
      { href: '/generador-firmas-email', label: 'Generador de firmas de email' },
    ],
  }),
  'contador-de-palabras': buildEntry({
    summary: [
      'Contar palabras no sirve solo para cumplir extensiones. Tambien ayuda a ajustar ritmo de lectura, densidad de contenido y claridad en textos academicos, comerciales o SEO.',
      'Una buena revision de texto combina longitud con estructura, no solo numero bruto de palabras.',
    ],
    sections: [
      {
        title: 'Para que sirve mas alla del numero final',
        paragraphs: [
          'En SEO, copywriting y trabajo academico, contar palabras permite verificar si un texto responde con suficiente profundidad al objetivo que persigue.',
          'Tambien es util para estimar tiempo de lectura, controlar limites editoriales o comparar versiones de un borrador.',
        ],
      },
      {
        title: 'Casos de uso habituales',
        bullets: [
          'Entradas de blog o paginas de servicio.',
          'Descripcion de productos o fichas comerciales.',
          'Ensayos, trabajos o resenas.',
          'Publicaciones para redes con limites o recomendaciones de longitud.',
        ],
      },
      {
        title: 'Errores comunes al interpretar la longitud',
        paragraphs: [
          'Mas palabras no significan automaticamente mejor contenido. Un texto puede ser largo y seguir siendo pobre si repite ideas o no responde a la intencion del usuario.',
          'La utilidad del contador esta en apoyar la edicion, no en reemplazar criterio editorial.',
        ],
      },
    ],
    faqs: [
      { question: 'Un texto mas largo posiciona mejor por si solo', answer: 'No. Importan mas la utilidad, la estructura y la adecuacion a la intencion de busqueda que el numero absoluto de palabras.' },
      { question: 'Sirve para controlar tiempo de lectura', answer: 'Si, puede darte una estimacion util para contenidos editoriales y UX.' },
      { question: 'Cuenta igual palabras y caracteres', answer: 'No. Son metricas distintas y cada una sirve para necesidades diferentes.' },
    ],
    relatedTools: [
      { href: '/mayusculas-minusculas', label: 'Convertidor de mayusculas y minusculas' },
      { href: '/generador-lorem-ipsum', label: 'Generador de lorem ipsum' },
      { href: '/traductor-binario', label: 'Traductor binario y morse' },
    ],
  }),
  'mayusculas-minusculas': buildEntry({
    summary: [
      'Transformar texto de un formato a otro es una tarea pequena pero muy frecuente en edicion, limpieza de datos, redaccion y trabajo en redes sociales.',
      'El valor real de la herramienta esta en corregir rapido errores de formato sin reescribir manualmente bloques enteros de texto.',
    ],
    sections: [
      {
        title: 'Cuando conviene usar cada formato',
        bullets: [
          'Mayusculas: avisos, siglas o enfasis puntual.',
          'Minusculas: normalizacion de textos y limpieza de datos.',
          'Capitalizado: titulos, nombres o encabezados.',
          'Tipo oracion: parrafos y contenido editorial natural.',
        ],
      },
      {
        title: 'Errores que evita',
        paragraphs: [
          'Ahorras tiempo cuando has escrito con bloqueo de mayusculas activado o cuando recibes textos con formatos mezclados desde PDF, hojas de calculo o copias de otras fuentes.',
          'Tambien evita inconsistencias visuales que restan profesionalidad a un texto final.',
        ],
      },
      {
        title: 'Privacidad y uso seguro',
        paragraphs: [
          'Como el procesamiento puede hacerse en el navegador, resulta util incluso para contenidos internos o textos sensibles que no quieres enviar a servicios externos.',
        ],
      },
    ],
    faqs: [
      { question: 'Sirve para textos largos', answer: 'Si, especialmente cuando quieres corregir de golpe un bloque de contenido ya escrito.' },
      { question: 'El formato tipo oracion arregla toda la puntuacion', answer: 'No. Ayuda con capitalizacion basica, pero no sustituye una revision editorial completa.' },
      { question: 'Puedo usarlo con textos confidenciales', answer: 'Si, siempre que el procesamiento siga siendo local en tu navegador.' },
    ],
    relatedTools: [
      { href: '/contador-de-palabras', label: 'Contador de palabras' },
      { href: '/generador-lorem-ipsum', label: 'Generador de lorem ipsum' },
      { href: '/traductor-binario', label: 'Traductor binario y morse' },
    ],
  }),
  'generador-contrasenas': buildEntry({
    summary: [
      'Generar contrasenas fuertes reduce uno de los riesgos mas comunes en seguridad digital: reutilizar claves o crear patrones faciles de adivinar.',
      'La longitud y la aleatoriedad suelen ser mas importantes que una complejidad aparente basada en reglas previsibles.',
    ],
    sections: [
      {
        title: 'Que hace fuerte a una contrasena',
        bullets: [
          'Longitud suficiente para el nivel de riesgo de la cuenta.',
          'Aleatoriedad real, no patrones memorizables.',
          'Diferente para cada servicio.',
          'Apoyo de gestor de contrasenas y doble factor cuando sea posible.',
        ],
      },
      {
        title: 'Errores que conviene evitar',
        paragraphs: [
          'Reutilizar la misma clave en varios servicios sigue siendo uno de los fallos mas costosos. Otro error comun es crear variantes previsibles del mismo patron para todas las cuentas.',
          'Tambien conviene desconfiar de soluciones improvisadas como notas sin proteger o archivos sin cifrar.',
        ],
      },
      {
        title: 'Buenas practicas de uso',
        paragraphs: [
          'Genera una clave larga, guardala en un gestor fiable y usa autenticacion en dos pasos para servicios criticos. Esa combinacion suele ser mejor que confiar en memoria humana para decenas de cuentas.',
        ],
      },
    ],
    faqs: [
      { question: 'Es mejor una contrasena larga o una muy compleja pero corta', answer: 'En general, una larga y aleatoria suele ser preferible a una corta con patrones complejos pero previsibles.' },
      { question: 'Debo cambiar mis contrasenas muy a menudo', answer: 'Mas importante que cambiarlas por rutina es usar claves unicas, fuertes y revisar si ha habido filtraciones o incidencias.' },
      { question: 'Sirve para cuentas importantes como banca o correo', answer: 'Si, y en esos casos conviene combinar la clave fuerte con doble factor.' },
    ],
    relatedTools: [
      { href: '/generador-qr', label: 'Generador QR' },
      { href: '/contador-de-palabras', label: 'Contador de palabras' },
      { href: '/texto-invisible', label: 'Texto invisible' },
    ],
    relatedArticles: [
      { href: '/articulos/por-que-las-contrasenas-largas-suelen-ser-mejores-que-las-complejas', label: 'Por que las contrasenas largas suelen ser mejores que las complejas' },
    ],
  }),
  'generador-enlace-whatsapp': buildEntry({
    summary: [
      'Crear un enlace directo de WhatsApp reduce friccion en ventas, soporte y atencion al cliente porque evita que el usuario tenga que guardar el numero o escribir un mensaje desde cero.',
      'Su utilidad aumenta cuando se combina con un texto inicial claro y un contexto visible que explique que ocurrira al pulsar.',
    ],
    sections: [
      {
        title: 'Cuando aporta mas valor',
        bullets: [
          'Perfiles de Instagram o TikTok con objetivo comercial.',
          'Paginas de contacto y soporte rapido.',
          'Carteleria y material impreso junto a QR.',
          'Campanas donde quieres medir interes y facilitar la conversion.',
        ],
      },
      {
        title: 'Buenas practicas',
        paragraphs: [
          'Conviene predefinir un mensaje inicial util, como una consulta comercial o una solicitud de presupuesto. Eso acelera la conversacion y evita mensajes vacios o ambiguos.',
          'Tambien es recomendable acompanar el enlace con una explicacion visible para que el usuario sepa que abrira WhatsApp y con quien hablara.',
        ],
      },
      {
        title: 'Errores comunes',
        paragraphs: [
          'Copiar mal el prefijo internacional, dejar caracteres innecesarios o usar mensajes demasiado largos y poco naturales son fallos frecuentes.',
        ],
      },
    ],
    faqs: [
      { question: 'Sirve para negocio y uso personal', answer: 'Si. Se usa tanto para atencion comercial como para compartir un contacto personal de forma mas comoda.' },
      { question: 'Puedo poner un mensaje predefinido', answer: 'Si, y suele ser recomendable para guiar mejor la conversacion.' },
      { question: 'Es util combinarlo con un QR', answer: 'Si, especialmente en escaparates, flyers, menus o tarjetas.' },
    ],
    relatedTools: [
      { href: '/generador-qr', label: 'Generador QR' },
      { href: '/lector-qr', label: 'Lector QR' },
      { href: '/generador-firmas-email', label: 'Generador de firmas de email' },
    ],
  }),
  'generador-firmas-email': buildEntry({
    summary: [
      'Una buena firma de email refuerza imagen profesional, facilita contacto y convierte cada correo enviado en una pequena pieza de marca.',
      'La clave no es sobrecargarla, sino incluir la informacion justa, bien ordenada y compatible con clientes de correo reales.',
    ],
    sections: [
      {
        title: 'Que deberia incluir una firma util',
        bullets: [
          'Nombre y cargo.',
          'Empresa o proyecto.',
          'Telefono, correo y web si son relevantes.',
          'Diseno limpio y colores coherentes con la marca.',
        ],
      },
      {
        title: 'Errores muy frecuentes',
        paragraphs: [
          'Las firmas sobrecargadas con demasiados iconos, frases, imagenes o colores suelen verse peor y provocar problemas de compatibilidad. Otro fallo comun es no probarlas en Gmail, Outlook y movil.',
        ],
      },
      {
        title: 'Recomendacion de implementacion',
        paragraphs: [
          'Lo mejor es usar una estructura simple, copiarla al cliente de correo y enviarte mensajes de prueba para verificar alineacion, imagenes y enlaces.',
        ],
      },
    ],
    faqs: [
      { question: 'Debo poner muchas redes sociales', answer: 'Solo si aportan contexto profesional real. Demasiadas distracciones suelen empeorar la firma.' },
      { question: 'Sirve para Gmail y Outlook', answer: 'Si, siempre que luego pruebes el pegado y visualizacion en ambos entornos.' },
      { question: 'Una firma con foto siempre es mejor', answer: 'No necesariamente. Depende del contexto y de si mejora o no la claridad visual.' },
    ],
    relatedTools: [
      { href: '/generador-qr', label: 'Generador QR' },
      { href: '/compresor-webp', label: 'Compresor WebP' },
      { href: '/extractor-colores', label: 'Extractor de colores' },
    ],
  }),
  'generador-hashtags': buildEntry({
    summary: [
      'Los hashtags sirven para contextualizar una publicacion, mejorar descubrimiento tematico y ordenar contenido, pero su impacto depende mas de la relevancia que de la cantidad.',
      'Un buen generador ayuda a salir del bloqueo inicial, pero la seleccion final debe seguir teniendo criterio editorial.',
    ],
    sections: [
      {
        title: 'Como elegir hashtags que aporten',
        bullets: [
          'Combina etiquetas generales con otras mas especificas.',
          'Evita listas genericas copiadas sin relacion con el contenido.',
          'Prioriza contexto y relevancia antes que volumen puro.',
          'Ajusta segun plataforma y tono del contenido.',
        ],
      },
      {
        title: 'Errores frecuentes',
        paragraphs: [
          'Usar demasiados hashtags irrelevantes, repetir siempre la misma lista o incluir etiquetas extremadamente amplias puede diluir el mensaje y dar sensacion automatizada.',
        ],
      },
      {
        title: 'Donde resulta mas util',
        paragraphs: [
          'Ayuda especialmente al planificar publicaciones para Instagram, TikTok, X o LinkedIn cuando quieres combinar rapidez con una base semantica razonable.',
        ],
      },
    ],
    faqs: [
      { question: 'Mas hashtags significa mas alcance', answer: 'No necesariamente. Importa mucho que sean relevantes y coherentes con el contenido.' },
      { question: 'Debo usar siempre los mismos', answer: 'Conviene variarlos segun tema, formato y objetivo de cada publicacion.' },
      { question: 'Sirven igual en todas las redes', answer: 'No. Cada plataforma trata y valora las etiquetas de forma distinta.' },
    ],
    relatedTools: [
      { href: '/generador-letras-raras', label: 'Generador de letras raras' },
      { href: '/generador-enlace-whatsapp', label: 'Generador de enlace WhatsApp' },
      { href: '/contador-de-palabras', label: 'Contador de palabras' },
    ],
  }),
  'generador-nombres': buildEntry({
    summary: [
      'Un generador de nombres resulta util para escribir ficcion, prototipos, cuentas de prueba, juegos, branding inicial o ejercicios creativos.',
      'Su valor no esta en producir el nombre perfecto por si solo, sino en desbloquear opciones y combinaciones que luego puedas filtrar con criterio.',
    ],
    sections: [
      {
        title: 'Casos donde mas se usa',
        bullets: [
          'Personajes de novela, rol o videojuegos.',
          'Mocks y datos de prueba en desarrollo.',
          'Lluvia de ideas para nombres de proyecto o marca.',
          'Ejercicios creativos o dinamicas de clase.',
        ],
      },
      {
        title: 'Como sacar mejor partido al resultado',
        paragraphs: [
          'Lo recomendable es generar varias tandas, anotar las combinaciones que tienen mejor sonido o encaje y despues revisar pronunciacion, tono y posible disponibilidad si van a usarse para marca o dominio.',
        ],
      },
      {
        title: 'Errores frecuentes',
        paragraphs: [
          'Quedarse con el primer nombre sin contexto, ignorar connotaciones culturales o no comprobar si el resultado ya esta muy asociado a otra marca o personaje.',
        ],
      },
    ],
    faqs: [
      { question: 'Sirve para escribir personajes', answer: 'Si, es uno de los usos mas habituales para generar ideas rapidas.' },
      { question: 'Puedo usar el resultado como marca', answer: 'Como inspiracion si, pero conviene revisar disponibilidad legal, dominio y posibles registros.' },
      { question: 'Genera nombres reales o inventados', answer: 'Depende del modo y de la combinacion, pero la utilidad principal es inspirar opciones plausibles.' },
    ],
    relatedTools: [
      { href: '/generador-letras-raras', label: 'Generador de letras raras' },
      { href: '/generador-lorem-ipsum', label: 'Generador de lorem ipsum' },
      { href: '/contador-de-palabras', label: 'Contador de palabras' },
    ],
  }),
  'generador-letras-raras': buildEntry({
    summary: [
      'Las letras decorativas se usan sobre todo en bios, nombres de perfil, encabezados sociales y pequenos elementos de estilo visual.',
      'Funcionan bien como recurso expresivo, pero conviene recordar que no siempre mejoran legibilidad ni compatibilidad en todos los contextos.',
    ],
    sections: [
      {
        title: 'Cuando puede ser util este tipo de texto',
        bullets: [
          'Bios y nombres en redes sociales.',
          'Pequenos titulares decorativos.',
          'Mensajes creativos en perfiles o comunidades.',
          'Pruebas de estilo visual rapido.',
        ],
      },
      {
        title: 'Limitaciones reales',
        paragraphs: [
          'No todos los caracteres Unicode se renderizan igual en todos los dispositivos y aplicaciones. A veces el estilo elegido puede verse distinto, cortarse o perder legibilidad.',
        ],
      },
      {
        title: 'Consejo de uso',
        paragraphs: [
          'Usalo como acento visual, no como base de todo un texto. Cuando hay demasiado adorno, la comprension cae y el efecto puede pasar de original a confuso.',
        ],
      },
    ],
    faqs: [
      { question: 'Se ve igual en todos los moviles', answer: 'No siempre. Depende de la fuente y del soporte Unicode de cada dispositivo o app.' },
      { question: 'Sirve para nombres de Instagram o TikTok', answer: 'Si, es uno de los usos mas comunes.' },
      { question: 'Es recomendable para textos largos', answer: 'No. Suele funcionar mejor en fragmentos breves.' },
    ],
    relatedTools: [
      { href: '/simbolos-copiar', label: 'Simbolos para copiar' },
      { href: '/texto-invisible', label: 'Texto invisible' },
      { href: '/generador-hashtags', label: 'Generador de hashtags' },
    ],
  }),
  'simbolos-copiar': buildEntry({
    summary: [
      'Los simbolos Unicode sirven para personalizar perfiles, destacar listas, decorar mensajes o dar estructura visual ligera sin depender de imagenes.',
      'Su mejor uso esta en pequenas dosis, cuando aportan jerarquia o personalidad sin dificultar la lectura.',
    ],
    sections: [
      {
        title: 'Donde suelen utilizarse',
        bullets: [
          'Bios y nombres de redes.',
          'Listas o bullets visuales.',
          'Mensajes, estados y descripciones.',
          'Pequenos toques decorativos en textos digitales.',
        ],
      },
      {
        title: 'Que deberias evitar',
        paragraphs: [
          'Llenar un texto de simbolos puede volverlo menos profesional y mas dificil de leer. Tambien puede generar inconsistencias entre plataformas si determinados caracteres no se muestran igual.',
        ],
      },
      {
        title: 'Consejo practico',
        paragraphs: [
          'Elige unos pocos simbolos coherentes con el estilo del texto y prueba el resultado donde vayas a publicarlo antes de reutilizarlo en varios canales.',
        ],
      },
    ],
    faqs: [
      { question: 'Todos los simbolos son compatibles con cualquier app', answer: 'No necesariamente. Conviene probarlos en el entorno final antes de usarlos de forma fija.' },
      { question: 'Sirven para destacar contenido sin usar imagenes', answer: 'Si, especialmente en textos cortos y listas.' },
      { question: 'Es mejor usar muchos o pocos', answer: 'Normalmente pocos y bien elegidos.' },
    ],
    relatedTools: [
      { href: '/generador-letras-raras', label: 'Generador de letras raras' },
      { href: '/texto-invisible', label: 'Texto invisible' },
      { href: '/generador-hashtags', label: 'Generador de hashtags' },
    ],
  }),
  'texto-invisible': buildEntry({
    summary: [
      'El texto invisible se usa sobre todo para mensajes vacios, separadores, pruebas en perfiles o pequeños trucos de formato visual basados en caracteres Unicode especiales.',
      'Aunque parece una curiosidad, conviene entender sus limites para no romper formularios, nombres o mensajes en plataformas que filtran estos caracteres.',
    ],
    sections: [
      {
        title: 'Para que se usa realmente',
        bullets: [
          'Enviar mensajes aparentemente vacios.',
          'Crear separadores discretos en perfiles o biografias.',
          'Realizar pruebas de formato en apps y redes.',
          'Experimentar con caracteres especiales sin instalar nada.',
        ],
      },
      {
        title: 'Limitaciones importantes',
        paragraphs: [
          'No todas las plataformas aceptan o interpretan igual estos caracteres. Algunas los eliminan, otras los renderizan de forma inesperada y otras pueden limitar su uso en nombres o formularios.',
        ],
      },
      {
        title: 'Consejo de uso responsable',
        paragraphs: [
          'Usalo para fines visuales o experimentales, no para manipular entradas donde pueda generar confusion o problemas de accesibilidad.',
        ],
      },
    ],
    faqs: [
      { question: 'Funciona en cualquier red social', answer: 'No siempre. Depende de como cada plataforma trate esos caracteres.' },
      { question: 'Es un espacio normal del teclado', answer: 'No. Suele basarse en caracteres Unicode especiales con comportamiento distinto.' },
      { question: 'Puedo usarlo en nombres de usuario', answer: 'Solo si la plataforma lo admite y el resultado sigue siendo usable.' },
    ],
    relatedTools: [
      { href: '/simbolos-copiar', label: 'Simbolos para copiar' },
      { href: '/generador-letras-raras', label: 'Generador de letras raras' },
      { href: '/traductor-binario', label: 'Traductor binario y morse' },
    ],
  }),
  'traductor-binario': buildEntry({
    summary: [
      'Traducir entre texto, binario, morse o hexadecimal es util para aprendizaje, curiosidad tecnica, juegos educativos y pruebas rapidas de codificacion.',
      'La herramienta es especialmente interesante cuando se usa para entender representacion de informacion mas que como simple truco visual.',
    ],
    sections: [
      {
        title: 'Que diferencia hay entre estos sistemas',
        paragraphs: [
          'El binario representa informacion con ceros y unos; el hexadecimal la agrupa en una notacion mas compacta; el codigo morse usa secuencias de puntos y rayas con otra logica historica y operativa.',
          'Aunque no son equivalentes en contexto, compararlos ayuda a entender como se codifica la informacion.',
        ],
      },
      {
        title: 'Usos habituales',
        bullets: [
          'Aprendizaje basico de informatica.',
          'Juegos, retos o mensajes tematicos.',
          'Apoyo docente en tecnologia o telecomunicaciones.',
          'Curiosidad tecnica y conversiones rapidas.',
        ],
      },
      {
        title: 'Errores comunes',
        paragraphs: [
          'Es frecuente mezclar alfabetos incompletos, olvidar separadores o asumir que todos los simbolos tienen equivalencia directa en cualquier sistema.',
        ],
      },
    ],
    faqs: [
      { question: 'Sirve para aprender binario desde cero', answer: 'Si, como apoyo visual y rapido para entender equivalencias basicas.' },
      { question: 'Todo texto puede pasarse exactamente a morse', answer: 'Depende del alfabeto soportado y de los caracteres concretos.' },
      { question: 'Hexadecimal y binario son lo mismo', answer: 'No. Son dos formas distintas de representar informacion, aunque pueden traducirse entre si.' },
    ],
    relatedTools: [
      { href: '/contador-de-palabras', label: 'Contador de palabras' },
      { href: '/texto-invisible', label: 'Texto invisible' },
      { href: '/mayusculas-minusculas', label: 'Convertidor de mayusculas y minusculas' },
    ],
  }),
  'generador-lorem-ipsum': buildEntry({
    summary: [
      'El texto de relleno sigue siendo util en diseno, prototipado y maquetacion porque permite probar estructura visual sin depender del contenido definitivo.',
      'Bien usado ahorra tiempo en wireframes y demos; mal usado puede colarse en produccion y dañar imagen y SEO.',
    ],
    sections: [
      {
        title: 'Para que sirve el lorem ipsum hoy',
        paragraphs: [
          'Permite probar espaciados, jerarquias, modulos y comportamiento de cajas de texto antes de tener copia definitiva. Esto es especialmente util en webs, newsletters, apps y presentaciones.',
        ],
      },
      {
        title: 'Cuando conviene evitarlo',
        paragraphs: [
          'En fases cercanas a produccion es mejor usar contenido representativo real. El lorem ipsum puede ocultar problemas de longitud, tono o estructura que si apareceran con el texto definitivo.',
        ],
      },
      {
        title: 'Error mas importante',
        paragraphs: [
          'Olvidar reemplazarlo antes de publicar. Ese descuido transmite falta de cuidado editorial y puede afectar negativamente a la percepcion del proyecto.',
        ],
      },
    ],
    faqs: [
      { question: 'Es mejor usar lorem ipsum o texto real', answer: 'Depende de la fase. Para prototipos, lorem ipsum ayuda. Cerca de produccion, conviene usar contenido representativo real.' },
      { question: 'Sirve para diseño web y presentaciones', answer: 'Si, son dos de sus usos mas habituales.' },
      { question: 'Tiene algun valor SEO', answer: 'No. En produccion debe sustituirse por contenido real y util.' },
    ],
    relatedTools: [
      { href: '/contador-de-palabras', label: 'Contador de palabras' },
      { href: '/mayusculas-minusculas', label: 'Convertidor de mayusculas y minusculas' },
      { href: '/generador-nombres', label: 'Generador de nombres' },
    ],
  }),
  'cps-test': buildEntry({
    summary: [
      'Un CPS test mide rapidez de clic, pero tambien sirve como pequeno reto de coordinacion, reflejos y comparativa informal entre dispositivos o personas.',
      'La lectura del resultado tiene sentido sobre todo como juego o referencia ligera, no como prueba cientifica de rendimiento motor.',
    ],
    sections: [
      {
        title: 'Que mide realmente',
        paragraphs: [
          'CPS significa clicks por segundo. El resultado depende de velocidad de mano, coordinacion, ergonomia y, en menor medida, latencia o comodidad del dispositivo.',
        ],
      },
      {
        title: 'Factores que influyen',
        bullets: [
          'Tipo de raton o touchpad.',
          'Posicion de la mano y comodidad.',
          'Duracion de la prueba.',
          'Fatiga o calentamiento previo.',
        ],
      },
      {
        title: 'Como interpretar bien el resultado',
        paragraphs: [
          'La comparacion solo tiene sentido si mantienes condiciones parecidas entre pruebas. Cambiar de dispositivo o postura puede alterar mucho el resultado.',
        ],
      },
    ],
    faqs: [
      { question: 'Sirve para entrenar reflejos', answer: 'Como juego rapido puede ayudarte a practicar ritmo y coordinacion, aunque no es una herramienta de entrenamiento profesional.' },
      { question: 'El movil y el PC son comparables', answer: 'No del todo, porque el metodo de entrada y la ergonomia cambian bastante.' },
      { question: 'Un resultado alto significa mejor jugador', answer: 'No necesariamente. Es solo una referencia muy concreta de velocidad de clic.' },
    ],
    relatedTools: [
      { href: '/cronometro', label: 'Cronometro' },
      { href: '/temporizador', label: 'Temporizador' },
      { href: '/ruleta-aleatoria', label: 'Ruleta aleatoria' },
    ],
  }),
  'cronometro': buildEntry({
    summary: [
      'Un cronometro online es util para medir tiempos de estudio, cocina, entrenamientos, pruebas o tareas repetitivas sin depender de hardware dedicado.',
      'Lo mas valioso no es solo contar tiempo, sino registrar vueltas y comparar intervalos de manera visual y rapida.',
    ],
    sections: [
      {
        title: 'Cuando un cronometro web resulta suficiente',
        paragraphs: [
          'Para usos cotidianos, entrenamiento ligero, Pomodoro, cocina o seguimiento de pruebas simples, un cronometro en navegador suele ser mas que suficiente.',
          'Su ventaja principal es la inmediatez: entrar, empezar y registrar vueltas sin instalacion.',
        ],
      },
      {
        title: 'Que aportan las vueltas',
        paragraphs: [
          'Registrar laps ayuda a comparar tramos sin detener el contador principal. Esto resulta util en series, ejercicios por bloques, productividad o cualquier actividad donde importen parciales.',
        ],
      },
      {
        title: 'Limitaciones a recordar',
        paragraphs: [
          'No sustituye cronometraje profesional ni certificacion deportiva. El navegador, el dispositivo y el contexto de uso pueden introducir pequenas variaciones o incomodidades.',
        ],
      },
    ],
    faqs: [
      { question: 'Sirve para entrenamientos por series', answer: 'Si, especialmente si necesitas guardar vueltas o parciales.' },
      { question: 'Es tan preciso como un cronometro profesional', answer: 'Para uso cotidiano si, pero no debe considerarse instrumento homologado.' },
      { question: 'Puedo usarlo en movil', answer: 'Si, aunque la experiencia suele ser mejor con buena visibilidad y acceso facil al boton principal.' },
    ],
    relatedTools: [
      { href: '/temporizador', label: 'Temporizador' },
      { href: '/cps-test', label: 'CPS test' },
      { href: '/calculadora-dias', label: 'Calculadora de dias' },
    ],
  }),
  'temporizador': buildEntry({
    summary: [
      'Un temporizador online es una herramienta simple pero muy efectiva para estructurar tareas, bloques de estudio, descanso, cocina y rutinas repetitivas.',
      'La mayor utilidad esta en convertir una intencion difusa en un bloque temporal concreto que puedes empezar y terminar con claridad.',
    ],
    sections: [
      {
        title: 'Cuando ayuda mas un temporizador que un cronometro',
        paragraphs: [
          'El temporizador se usa cuando conoces el tiempo objetivo de antemano: 25 minutos de trabajo, 10 minutos de horno o 60 segundos de descanso. El cronometro, en cambio, sirve para medir duracion transcurrida.',
        ],
      },
      {
        title: 'Casos practicos muy comunes',
        bullets: [
          'Pomodoro y bloques de foco.',
          'Cocina y preparacion de recetas.',
          'Rutinas deportivas y descansos.',
          'Tareas con tiempo limite o recordatorios.',
        ],
      },
      {
        title: 'Consejos de uso',
        paragraphs: [
          'Definir duraciones realistas es mas importante que buscar el intervalo perfecto. Si el bloque es demasiado largo, baja la adherencia; si es demasiado corto, interrumpes el trabajo sin necesidad.',
        ],
      },
    ],
    faqs: [
      { question: 'Sirve para tecnica Pomodoro', answer: 'Si, es uno de los usos mas clasicos de un temporizador online.' },
      { question: 'Que diferencia hay con un cronometro', answer: 'El temporizador cuenta hacia atras hasta una meta; el cronometro cuenta desde cero hacia adelante.' },
      { question: 'Puedo usarlo para deporte y cocina', answer: 'Si, son dos contextos donde mas sentido tiene.' },
    ],
    relatedTools: [
      { href: '/cronometro', label: 'Cronometro' },
      { href: '/calculadora-dias', label: 'Calculadora de dias' },
      { href: '/cps-test', label: 'CPS test' },
    ],
  }),
  'ruleta-aleatoria': buildEntry({
    summary: [
      'Una ruleta aleatoria sirve para sorteos informales, decisiones de grupo, dinamicas de clase o juegos donde importa visualizar la eleccion de forma clara y entretenida.',
      'Su valor esta en la transparencia del proceso y en hacer visible una decision que, de otro modo, seria menos participativa.',
    ],
    sections: [
      {
        title: 'Donde resulta mas util',
        bullets: [
          'Sorteos rapidos en clase o reuniones.',
          'Decisiones entre opciones equivalentes.',
          'Dinamicas de stream o contenido en directo.',
          'Juegos, retos y actividades de equipo.',
        ],
      },
      {
        title: 'Buenas practicas para un sorteo limpio',
        paragraphs: [
          'Conviene revisar que no haya nombres duplicados, que todas las opciones tengan el mismo peso y que el listado final sea visible antes de girar. Esa claridad evita dudas y mejora la confianza en el resultado.',
        ],
      },
      {
        title: 'Limitaciones',
        paragraphs: [
          'Es una herramienta excelente para sorteos informales o dinamicas recreativas, pero no sustituye bases legales, auditoria ni requisitos formales en promociones reguladas.',
        ],
      },
    ],
    faqs: [
      { question: 'Todas las opciones tienen la misma probabilidad', answer: 'Si cada opcion aparece una sola vez, la logica es repartir probabilidad de forma equivalente entre entradas.' },
      { question: 'Sirve para sorteos en directo', answer: 'Si, especialmente por su componente visual y facil de seguir.' },
      { question: 'Puedo usarla para promociones legales', answer: 'Solo como apoyo informal; las promociones reguladas requieren sus propias bases y procesos.' },
    ],
    relatedTools: [
      { href: '/generador-nombres', label: 'Generador de nombres' },
      { href: '/cps-test', label: 'CPS test' },
      { href: '/temporizador', label: 'Temporizador' },
    ],
  }),
};
