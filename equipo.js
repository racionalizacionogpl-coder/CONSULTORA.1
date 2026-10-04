/* ==========================================================
   EQUIPO DE ROIC & COMPANY
   Lo usan la sección «Nuestra gente» de index.html y la página de
   perfil de cada integrante (persona.html?p=<id>).

   Fotos, en media/equipo/:
     <id>.jpg          foto cuadrada; se usa en las tarjetas y, si no hay
                       recorte, en un círculo en el perfil;
     <id>-recorte.png  opcional: la misma foto sin fondo (PNG transparente),
                       de la cintura hacia arriba; el perfil la muestra
                       sobre el degradado celeste, como en McKinsey.
   Si no hay foto, se muestran las iniciales.

   Datos del perfil de LinkedIn de cada integrante:
     experiencia:     [{ empresa: '', cargo: '', periodo: '' }]
     formacion:       [{ institucion: '', programa: '', grado: '' }]
     certificaciones: ['', '']
   Bloques con subtítulo debajo de «Acerca de» (opcional):
     secciones: [{ titulo: '', items: [['Etiqueta', 'Texto'], …] }]
   Las secciones vacías no se muestran.
   ========================================================== */
window.EQUIPO = [
  {
    id: 'chumacero',
    nombre: 'José Antonio Chumacero Calle',
    corto: 'José Antonio',
    ini: 'JC',
    cargo: 'Gerente General',
    sede: 'Lima, Perú',
    bio: 'Magíster en Economía, especializado en inversión pública y privada. Dirige la relación estratégica con cada cliente y la estructuración de costos de cada propuesta, con decisiones fundamentadas en modelos cuantitativos.',
    resumen: 'José Antonio es el Gerente General de ROIC & Company y dirige la relación estratégica con cada cliente.',
    acerca: [
      'Como Gerente General de ROIC & Company, José Antonio dirige la relación estratégica con cada cliente desde el diagnóstico preliminar hasta la entrega del valor final. Su grado de Magíster en Economía inyecta un rigor financiero implacable a cada proyecto, garantizando que todo rediseño de procesos se justifique en costo, tiempo y rentabilidad, y que las decisiones de mejora se fundamenten estrictamente en modelos cuantitativos.',
      'Con una alta especialización en evaluación de inversión pública y privada, José Antonio lidera la viabilidad financiera de las intervenciones. Para ello, trabaja en absoluta sinergia con el Subgerente, Alvaro Rojas Carnero; mientras Alvaro orquesta y diseña la arquitectura integral del plan de gestión del proyecto, José Antonio asume el control exclusivo de la estructuración de costos, asegurando la rentabilidad de la propuesta.'
    ],
    secciones: [
      { titulo: 'Capacidades directivas y estructuración comercial', items: [
        ['Negociación global', 'Es el encargado de ejecutar y presentar la Consulting Proposal ante corporaciones transnacionales, respaldando el alcance técnico mediante el Statement of Work (SoW).'],
        ['Contratación privada (Perú)', 'Elabora y sustenta la Carta Propuesta comercial para grandes empresas nacionales, integrando los marcos legales y operativos requeridos.'],
        ['Licitación pública (Perú)', 'Formula la Oferta Técnica y Económica del proyecto, asegurando el cumplimiento estricto de los Términos de Referencia (TDR) exigidos por la entidad gubernamental.']
      ] },
      { titulo: 'Funciones clave en la gestión de proyectos', items: [
        ['Costeo de operaciones', 'Determina el valor real de cada servicio mediante el costeo minucioso de procesos y actividades organizacionales.'],
        ['Análisis costo-beneficio', 'Proyecta la viabilidad económica de cada mejora antes de su implementación, minimizando el riesgo de inversión para el cliente.'],
        ['Evaluación de impacto', 'Cuantifica los resultados de los cambios estructurales midiendo su impacto directo en tiempo, dinero o valor público.'],
        ['Supervisión del ciclo de Deming', 'Supervisa las cuatro fases de gestión por procesos, coordinando su ejecución directamente con Alvaro Rojas (Subgerente), Isabel Flores (Automatización), Oriol Romero (Indicadores) y Luis Balarezo (Full Stack).'],
        ['Gobierno corporativo', 'Dirige el despliegue del proyecto y rinde cuentas de los indicadores de éxito directamente ante el directorio y la alta dirección del cliente.']
      ] }
    ],
    especialidades: [
      ['Evaluación de inversión pública y privada', 'servicios.html#mejorar'],
      ['Propuestas comerciales y licitaciones', 'servicios.html#como-trabajamos'],
      ['Costeo de procesos', 'servicios.html#servicios'],
      ['Análisis costo-beneficio', 'servicios.html#servicios'],
      ['Evaluación de impacto', 'servicios.html#mejorar'],
      ['Mejorar', 'servicios.html#mejorar']
    ],
    experiencia: [],
    formacion: [
      { programa: 'Magíster en Economía' },
      { programa: 'Especialización en Inversión Pública y Privada' }
    ],
    publicaciones: ['art-cuna', 'art-errores', 'art-nt', 'art-avance'],
    correo: '',
    linkedin: 'https://www.linkedin.com/in/jos%C3%A9-antonio-chumacero-calle-1164303a/'
  },
  {
    id: 'rojas',
    nombre: 'Alvaro Rojas Carnero',
    corto: 'Alvaro',
    ini: 'AR',
    cargo: 'Subgerente',
    sede: 'Lima',
    bio: 'Supervisa y coordina al equipo de especialistas —automatización, indicadores y desarrollo— y la ejecución de cada proyecto. Analista de procesos y mejora continua: BPMN 2.0, Lean Six Sigma y automatización RPA.',
    resumen: 'Alvaro es el subgerente de ROIC & Company: supervisa y coordina al equipo de especialistas y la ejecución de cada proyecto.',
    acerca: [
      'Alvaro es el subgerente de ROIC & Company. Supervisa, delega y coordina directamente el trabajo de los especialistas de la firma: Isabel Flores Huamani en automatización, Oriol Romero Saavedra en indicadores, KPI y OKR, y Luis Balarezo en el desarrollo de plataformas. Responde por la calidad técnica de cada entregable y por el cumplimiento del cronograma, y lidera las fases de documentar y procedimentar.',
      'Es analista de procesos y mejora continua en la Oficina General de Planificación de la Universidad Nacional Mayor de San Marcos, donde diseñó el marco metodológico de gestión por procesos de la institución y acompaña técnicamente a sus 20 facultades. Cursa el décimo ciclo de Investigación Operativa en la misma universidad, lo que le da una base cuantitativa para medir cada mejora.',
      'Trabaja con BPM y BPMN 2.0 (Bizagi Modeler y Microsoft Visio), análisis AS-IS/TO-BE, Lean Six Sigma, KPI y OKR, Power BI, Excel avanzado, automatización RPA con UiPath, Google Apps Script e ISO 9001.'
    ],
    listaIntro: 'Entre sus trabajos recientes:',
    lista: [
      'redujo en 18,92 % el tiempo de ciclo del procedimiento de disponibilidad presupuestal (de 37 a 30 horas) con un procedimiento operativo estándar y listas de verificación obligatorias, eliminando reprocesos;',
      'diseñó y estandarizó el marco metodológico de gestión por procesos de la universidad —plan de gestión, guía práctica, fichas de caracterización e indicadores⁠— y reestructuró su mapa de procesos;',
      'condujo y auditó el modelamiento de procesos de extremo a extremo en BPMN 2.0, identificando las brechas del AS-IS para diseñar flujos TO-BE más eficientes;',
      'actuó como enlace entre negocio y TI en el Sistema de Gestión por Procesos, donde definió especificaciones funcionales, reglas de negocio y la arquitectura de flujos;',
      'desarrolló automatizaciones con Google Apps Script para el control documental e implementó un sistema de actas digitales para dar seguimiento a los acuerdos;',
      'formuló KPI por proceso alineados con los objetivos estratégicos y reportó cada mes a la jefatura con tableros dinámicos y reportes ejecutivos.'
    ],
    especialidades: [
      ['Documentar', 'servicios.html#documentar'],
      ['Procedimentar', 'servicios.html#procedimentar'],
      ['BPM y BPMN 2.0', 'servicios.html#procedimentar'],
      ['Mejora continua y Lean Six Sigma', 'servicios.html#mejorar'],
      ['Automatización RPA y Apps Script', 'servicios.html#servicios'],
      ['Indicadores, KPI y OKR', 'servicios.html#medir'],
      ['Gestión de proyectos y PMO', 'servicios.html#como-trabajamos']
    ],
    experiencia: [
      { empresa: 'Universidad Nacional Mayor de San Marcos', cargo: 'Analista de Procesos y Mejora Continua, Oficina General de Planificación', periodo: 'Julio de 2025 - actualidad' },
      { empresa: 'Universidad Nacional Mayor de San Marcos', cargo: 'Asistente de Procesos', periodo: 'Mayo - julio de 2025' },
      { empresa: 'Universidad Nacional Mayor de San Marcos', cargo: 'Asistente de Calidad', periodo: 'Enero - mayo de 2025' },
      { empresa: 'Facultad de Medicina San Fernando, UNMSM', cargo: 'Asistente de Procesos', periodo: 'Agosto - noviembre de 2024' },
      { empresa: 'Facultad de Ciencias Matemáticas, UNMSM', cargo: 'Asistente de Procesos', periodo: 'Mayo - julio de 2024' }
    ],
    formacion: [
      { institucion: 'Universidad Nacional Mayor de San Marcos', programa: 'Investigación Operativa', grado: 'Pregrado, décimo ciclo' }
    ],
    certificaciones: [
      'Lean Six Sigma Yellow Belt',
      'Robotización de Procesos con UiPath',
      'Gestión por Procesos',
      'IX Congreso Peruano de Investigación de Operaciones y Sistemas'
    ],
    publicaciones: ['art-errores', 'art-avance', 'art-nt', 'art-auto'],
    correo: '',
    linkedin: 'https://www.linkedin.com/in/alvaro-rojas-carnero-015922267/'
  },
  {
    id: 'flores',
    nombre: 'Isabel Flores Huamani',
    corto: 'Isabel',
    ini: 'IF',
    cargo: 'Especialista en automatización de procesos',
    sede: 'Lima',
    bio: 'Convierte tareas repetitivas en flujos automáticos: carga y validación de datos, formularios, reportes y alertas, sobre procesos ya documentados.',
    resumen: 'Isabel es la especialista en automatización de procesos de ROIC & Company.',
    acerca: [
      'Isabel convierte tareas repetitivas en flujos automáticos: carga y validación de datos, formularios, reportes y alertas. Automatiza solo lo que ya está documentado y estandarizado, para no acelerar un proceso que todavía funciona mal.',
      'Trabaja bajo la supervisión de Alvaro Rojas Carnero, subgerente, quien le delega y coordina directamente cada automatización. Participa en las fases de procedimentar y mejorar, junto con José Antonio Chumacero Calle y Luis Balarezo.'
    ],
    listaIntro: 'Entre las automatizaciones que diseña:',
    lista: [
      'formularios que llenan los formatos solos;',
      'validaciones antes de guardar un registro;',
      'reportes que se consolidan sin copiar y pegar;',
      'alertas de plazos por vencer.'
    ],
    especialidades: [
      ['Automatización de procesos', 'servicios.html#servicios'],
      ['Procedimentar', 'servicios.html#procedimentar'],
      ['Mejorar', 'servicios.html#mejorar'],
      ['Integración de datos', 'servicios.html#servicios']
    ],
    experiencia: [],
    formacion: [],
    publicaciones: ['art-auto', 'art-errores', 'art-cuna', 'art-kpi'],
    correo: '',
    linkedin: 'https://www.linkedin.com/in/isabel-jazmin-flores-huamani-241201275/'
  },
  {
    id: 'romero',
    nombre: 'Oriol Romero Saavedra',
    corto: 'Oriol',
    ini: 'OR',
    cargo: 'Especialista en indicadores, KPI y OKR',
    sede: 'Lima',
    bio: 'Diseña sistemas de medición: indicadores con ficha técnica, línea base y meta, OKR que conectan la estrategia con la operación, y tableros que se leen en un minuto.',
    resumen: 'Oriol es el especialista en indicadores, KPI y OKR de ROIC & Company.',
    acerca: [
      'Oriol diseña el sistema de medición de cada proyecto: indicadores con ficha técnica, línea base y meta; OKR que conectan la estrategia con la operación; y tableros que la alta dirección entiende en un minuto.',
      'Trabaja bajo la supervisión de Alvaro Rojas Carnero, subgerente, quien le delega y coordina directamente el diseño de cada sistema de medición. Lidera la fase de medir y participa en la de mejorar, donde los indicadores muestran si un cambio funcionó.'
    ],
    listaIntro: 'En cada proyecto, Oriol se encarga de:',
    lista: [
      'elaborar la ficha técnica de cada indicador;',
      'fijar la línea base y metas realistas;',
      'definir los OKR trimestrales;',
      'construir tableros conectados a la fuente del dato.'
    ],
    especialidades: [
      ['Medir', 'servicios.html#medir'],
      ['Indicadores, KPI y OKR', 'servicios.html#servicios'],
      ['Tableros de control', 'servicios.html#medir'],
      ['Mejorar', 'servicios.html#mejorar']
    ],
    experiencia: [],
    formacion: [],
    publicaciones: ['art-kpi', 'art-avance', 'art-cuna', 'art-nt'],
    correo: '',
    linkedin: 'https://www.linkedin.com/in/oriol-maximo-romero-saavedra-883a47277/'
  },
  {
    id: 'balarezo',
    nombre: 'Luis Balarezo',
    corto: 'Luis',
    ini: 'LB',
    cargo: 'Desarrollador full stack, especialidad backend',
    sede: 'Lima',
    bio: 'Construye las plataformas que sostienen la gestión por procesos: repositorios de procesos, módulos de indicadores, actas digitales e integraciones con los sistemas del cliente.',
    resumen: 'Luis es el desarrollador full stack de ROIC & Company, con especialidad en backend.',
    acerca: [
      'Luis construye las plataformas que sostienen la gestión por procesos: repositorios de procesos y fichas, módulos de indicadores, encuestas y actas digitales, integrados con los sistemas que el cliente ya usa.',
      'Trabaja bajo la coordinación de Alvaro Rojas Carnero, subgerente, quien le delega y da seguimiento a cada desarrollo. Participa en las fases de medir y mejorar, junto con José Antonio Chumacero Calle, Oriol Romero Saavedra e Isabel Flores Huamani.'
    ],
    listaIntro: 'Entre los sistemas que desarrolla:',
    lista: [
      'repositorios de procesos y fichas de caracterización;',
      'módulos de indicadores y tableros;',
      'encuestas y actas digitales;',
      'integraciones con los sistemas del cliente.'
    ],
    especialidades: [
      ['Plataformas a medida', 'servicios.html#servicios'],
      ['Backend y API', 'servicios.html#servicios'],
      ['Bases de datos', 'servicios.html#servicios'],
      ['Medir', 'servicios.html#medir'],
      ['Mejorar', 'servicios.html#mejorar']
    ],
    experiencia: [],
    formacion: [],
    publicaciones: ['art-auto', 'art-kpi', 'art-avance', 'art-errores'],
    correo: '',
    linkedin: 'https://www.linkedin.com/in/luisbalarezo/'
  }
];

/* Artículos de «Nuestras perspectivas» (servicios.html) que se muestran en
   los perfiles. color: tono de la ilustración de la tarjeta. */
window.PUBLICACIONES = {
  'art-nt':      { tag: 'Sector público · Normativa', titulo: 'La Norma Técnica N.º 002-2025-PCM/SGP en cinco puntos', lectura: 'Lectura de 4 min', color: '#8E9AF5' },
  'art-errores': { tag: 'Gestión de proyectos', titulo: 'Cinco errores que frenan una implementación', lectura: 'Lectura de 5 min', color: '#F2607F' },
  'art-avance':  { tag: 'Indicadores', titulo: 'Cómo medir el avance sin engañarse', lectura: 'Lectura de 3 min', color: '#E9B64C' },
  'art-kpi':     { tag: 'Indicadores', titulo: 'KPI y OKR: dos herramientas, dos preguntas', lectura: 'Lectura de 4 min', color: '#E9B64C' },
  'art-auto':    { tag: 'Automatización', titulo: 'Automatizar después de documentar', lectura: 'Lectura de 3 min', color: '#43C9B2' },
  'art-cuna':    { tag: 'Metodología', titulo: 'La cuña de Deming: por qué las mejoras retroceden', lectura: 'Lectura de 3 min', color: '#8E9AF5' }
};
