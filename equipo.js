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

   Campos que todavía faltan (se completan con el perfil de LinkedIn):
     experiencia: [{ empresa: '', cargo: '', periodo: '' }]
     formacion:   [{ institucion: '', programa: '', grado: '' }]
   Las secciones vacías no se muestran.
   ========================================================== */
window.EQUIPO = [
  {
    id: 'chumacero',
    tratamiento: 'Dr.',
    nombre: 'José Antonio Chumacero Calle',
    corto: 'José Antonio',
    ini: 'JC',
    cargo: 'Gerente general',
    sede: 'Lima',
    bio: 'Doctor en Economía. Dirige la firma y la relación con cada cliente, y aporta la mirada económica: que cada proceso rediseñado se justifique en costo, tiempo y valor generado.',
    resumen: 'José Antonio es el gerente general de ROIC & Company y dirige la relación de la firma con cada cliente.',
    acerca: [
      'José Antonio dirige ROIC & Company y la relación con cada cliente, desde el primer diagnóstico hasta la entrega final. Es doctor en Economía y aporta esa mirada a cada proyecto: que todo proceso rediseñado se justifique en costo, tiempo y valor generado, y que las decisiones de mejora se tomen con números.',
      'Participa en las cuatro fases de la gestión por procesos —documentar, procedimentar, medir y mejorar\u2060— y lidera la fase de mejora junto con Isabel Flores Huamani y Luis Balarezo.'
    ],
    listaIntro: 'En cada proyecto, José Antonio se encarga de:',
    lista: [
      'costear procesos y actividades, para saber cuánto cuesta realmente cada servicio;',
      'analizar el costo y el beneficio de cada mejora antes de implementarla;',
      'evaluar el impacto de los cambios en tiempo, dinero o valor público;',
      'dirigir el proyecto y rendir cuentas ante la alta dirección del cliente.'
    ],
    especialidades: [
      ['Mejorar', 'servicios.html#mejorar'],
      ['Análisis económico de procesos', 'servicios.html#servicios'],
      ['Costeo de procesos', 'servicios.html#servicios'],
      ['Evaluación de impacto', 'servicios.html#mejorar'],
      ['Dirección de proyectos', 'servicios.html#como-trabajamos']
    ],
    experiencia: [],
    formacion: [{ institucion: '', programa: 'Economía', grado: 'Doctorado' }],
    publicaciones: ['art-cuna', 'art-errores', 'art-nt', 'art-avance'],
    correo: '',
    linkedin: 'https://www.linkedin.com/in/jos%C3%A9-antonio-chumacero-calle-1164303a/'
  },
  {
    id: 'rojas',
    nombre: 'Álvaro Rojas Carnero',
    corto: 'Álvaro',
    ini: 'ÁR',
    cargo: 'Subgerente',
    sede: 'Lima',
    bio: 'Coordina la ejecución de los proyectos: plan de trabajo, cronograma, ruta crítica y control de calidad de cada entregable. Lidera la documentación y la procedimentación.',
    resumen: 'Álvaro es el subgerente de ROIC & Company y coordina la ejecución de sus proyectos.',
    acerca: [
      'Álvaro coordina la ejecución de cada proyecto de ROIC & Company: el plan de trabajo, el cronograma, la ruta crítica y el control de calidad de cada entregable. Es el punto de contacto diario del cliente.',
      'Lidera las dos primeras fases de la gestión por procesos: documentar —inventario de productos, mapa de procesos y fichas de caracterización\u2060— y procedimentar, esta última junto con Isabel Flores Huamani. También dirige el diagnóstico documental y la gestión del proyecto (PMO).'
    ],
    listaIntro: 'En cada proyecto, Álvaro se encarga de:',
    lista: [
      'auditar la coherencia entre planes, cronogramas y registros, con hallazgos y recomendaciones que tienen un responsable;',
      'construir el inventario de productos, el mapa de procesos y las fichas de caracterización;',
      'gestionar el proyecto con cronograma, ruta crítica y control de riesgos;',
      'revisar la calidad de cada entregable antes de que llegue al cliente.'
    ],
    especialidades: [
      ['Documentar', 'servicios.html#documentar'],
      ['Procedimentar', 'servicios.html#procedimentar'],
      ['Diagnóstico documental y PMO', 'servicios.html#servicios'],
      ['Gestión de proyectos (PMBOK)', 'servicios.html#como-trabajamos'],
      ['Mapas de procesos', 'servicios.html#documentar']
    ],
    experiencia: [],
    formacion: [],
    publicaciones: ['art-errores', 'art-avance', 'art-nt', 'art-cuna'],
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
      'Participa en la fase de procedimentar, junto con Álvaro Rojas Carnero, y en la de mejorar, junto con José Antonio Chumacero Calle y Luis Balarezo.'
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
      'Lidera la fase de medir y participa en la de mejorar, donde los indicadores muestran si un cambio funcionó.'
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
      'Participa en las fases de medir y mejorar, junto con José Antonio Chumacero Calle, Oriol Romero Saavedra e Isabel Flores Huamani.'
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
