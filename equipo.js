/* ==========================================================
   EQUIPO DE ROIC & COMPANY
   Lo usan la sección «Nuestra gente» de index.html y la página de
   perfil de cada integrante (persona.html?p=<id>).

   Fotos, en media/equipo/:
     <id>.jpg          foto cuadrada; se usa en las tarjetas y, si no hay
                       recorte, en un círculo en el perfil;
     <id>-recorte.webp opcional: la misma foto sin fondo (WebP transparente, a
                       resolución completa), de la cintura hacia arriba; el
                       perfil la muestra sobre el degradado celeste, como en
                       McKinsey. Se genera con herramientas/fotos/preparar_fotos.py.
   Si no hay foto, se muestran las iniciales.

   Datos del perfil de LinkedIn de cada integrante:
     experiencia:     [{ empresa: '', cargo: '', periodo: '' }]  (o cargos: ['', ''])
     experienciaIntro: texto opcional antes de la experiencia
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
    cargo: 'Managing Partner & Gerente General',
    sede: 'Lima, Perú',
    bio: 'Managing Partner y Account Sponsor de cada cliente. Magíster en Economía, especializado en inversión pública y privada: estructura los costos de cada propuesta y asegura su rentabilidad.',
    resumen: 'José Antonio es Managing Partner y Gerente General de ROIC & Company, y Account Sponsor de cada uno de sus clientes.',
    acerca: [
      'Como Managing Partner y Gerente General de ROIC & Company, José Antonio es el Account Sponsor de cada cliente: dirige la relación estratégica desde el diagnóstico preliminar hasta la entrega del valor final. Su formación como Magíster en Economía aporta rigor financiero a cada proyecto: todo rediseño de procesos debe justificarse en costo, tiempo y rentabilidad, y toda decisión de mejora debe sustentarse en modelos cuantitativos.',
      'Especializado en la evaluación de inversión pública y privada, lidera la viabilidad financiera de cada intervención. Trabaja en estrecha sinergia con el Subgerente de Operaciones, Alvaro Rojas Carnero: mientras Alvaro diseña y orquesta la arquitectura integral del plan de gestión del proyecto, José Antonio asume en exclusiva la estructuración de costos y asegura la rentabilidad de la propuesta.'
    ],
    secciones: [
      { titulo: 'Capacidades directivas y estructuración comercial', items: [
        ['Negociación global', 'Prepara y presenta la Consulting Proposal ante corporaciones transnacionales y respalda su alcance técnico con el Statement of Work (SoW).'],
        ['Contratación privada (Perú)', 'Elabora y sustenta la carta propuesta comercial para grandes empresas nacionales, integrando los marcos legales y operativos que cada contratación requiere.'],
        ['Licitación pública (Perú)', 'Formula la oferta técnica y económica del proyecto, en estricto cumplimiento de los Términos de Referencia (TDR) de la entidad convocante.']
      ] },
      { titulo: 'Funciones clave en la gestión de proyectos', items: [
        ['Costeo de operaciones', 'Determina el costo real de cada servicio mediante el costeo detallado de procesos y actividades.'],
        ['Análisis costo-beneficio', 'Proyecta la viabilidad económica de cada mejora antes de implementarla, para reducir el riesgo de inversión del cliente.'],
        ['Evaluación de impacto', 'Cuantifica el efecto de cada cambio estructural en tiempo, dinero o valor público.'],
        ['Supervisión del ciclo de Deming', 'Supervisa las cuatro fases de la gestión por procesos —documentar, procedimentar, medir y mejorar\u2060— y coordina su ejecución directamente con Alvaro Rojas (Subgerente de Operaciones), Isabel Flores (Automatización), Oriol Romero (Indicadores) y Luis Balarezo (Full Stack).'],
        ['Gobierno corporativo', 'Dirige el despliegue de cada proyecto y rinde cuentas de los indicadores de éxito ante el directorio y la alta dirección del cliente.']
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
    cargo: 'Engagement Manager & Subgerente de Operaciones',
    sede: 'Lima, Perú',
    bio: 'Dirige la ejecución de cada proyecto bajo la guía del PMBOK y supervisa al equipo de especialistas en automatización, indicadores y desarrollo. Investigación Operativa, BPMN 2.0 y Lean Six Sigma.',
    resumen: 'Alvaro es Engagement Manager y Subgerente de Operaciones de ROIC & Company: dirige la ejecución de cada proyecto y al equipo de especialistas.',
    acerca: [
      'Alvaro es Engagement Manager y Subgerente de Operaciones de ROIC & Company. Su liderazgo en la firma se respalda en su trayectoria técnica y directiva en la Universidad Nacional Mayor de San Marcos (UNMSM), donde ocupó el cargo de Analista Senior de Gestión por Procesos y Mejora Continua: diseñó el marco metodológico de gestión por procesos de la institución y brindó acompañamiento técnico a sus 20 facultades.',
      'En la consultora supervisa, delega y coordina directamente el trabajo de los especialistas técnicos: Isabel Flores Huamani en automatización, Oriol Romero Saavedra en indicadores, KPI y OKR, y Luis Balarezo en el desarrollo de plataformas. Responde ante el Managing Partner & Gerente General por la calidad técnica de cada entregable y por el cumplimiento estricto del cronograma, y dirige personalmente la ejecución de las cuatro fases de la gestión por procesos —documentar, procedimentar, medir y mejorar⁠—, construidas sobre el ciclo de Deming.',
      'Su formación en Investigación Operativa le da una base cuantitativa rigurosa para medir y sustentar cada mejora. Domina la gestión integral de proyectos: estructura y dirige la ejecución de cada iniciativa según los estándares globales de la guía del PMBOK (7.ª y 8.ª edición). Trabaja además a nivel avanzado con BPM y el estándar BPMN 2.0 (Bizagi Modeler y Microsoft Visio), análisis AS-IS/TO-BE, Lean Six Sigma, diseño de KPI y OKR, Power BI, automatización RPA con UiPath, Google Apps Script y la norma ISO 9001.'
    ],
    listaIntro: 'Entre sus trabajos recientes de mayor impacto:',
    lista: [
      'redujo en 18,92 % el tiempo de ciclo del procedimiento de disponibilidad presupuestal (de 37 a 30 horas) con un procedimiento operativo estándar y listas de verificación obligatorias, eliminando de raíz los reprocesos;',
      'diseñó y estandarizó el marco metodológico de gestión por procesos de la universidad —plan de gestión, guía práctica, fichas de caracterización e indicadores⁠— y reestructuró su mapa de procesos institucional;',
      'condujo y auditó el modelamiento de procesos de extremo a extremo en BPMN 2.0, identificando las brechas operativas del AS-IS para diseñar flujos TO-BE de alta eficiencia;',
      'actuó como enlace técnico entre las áreas de negocio y TI en el desarrollo del Sistema de Gestión por Procesos, donde definió las especificaciones funcionales, las reglas de negocio y la arquitectura de flujos;',
      'desarrolló automatizaciones con Google Apps Script para el control documental e implementó un sistema de actas digitales que asegura el seguimiento de los acuerdos directivos;',
      'formuló KPI por proceso alineados con los objetivos estratégicos de la organización y reportó cada mes a la jefatura con tableros dinámicos y reportes ejecutivos.'
    ],
    especialidades: [
      ['Dirección de proyectos (PMBOK 7.ª y 8.ª ed.)', 'servicios.html#como-trabajamos'],
      ['Documentar', 'servicios.html#documentar'],
      ['Procedimentar', 'servicios.html#procedimentar'],
      ['BPM y BPMN 2.0', 'servicios.html#procedimentar'],
      ['Mejora continua y Lean Six Sigma', 'servicios.html#mejorar'],
      ['Indicadores, KPI y OKR', 'servicios.html#medir'],
      ['Automatización RPA y Apps Script', 'servicios.html#servicios']
    ],
    experienciaIntro: 'Su capacidad de ejecución se apoya en una carrera progresiva, con responsabilidades crecientes:',
    experiencia: [
      { empresa: 'Universidad Nacional Mayor de San Marcos (UNMSM)', cargos: [
        'Analista Senior de Gestión por Procesos y Mejora Continua',
        'Analista Junior de Procesos',
        'Asistente de Procesos',
        'Asistente de Calidad',
        'Practicante Profesional de Procesos'
      ] }
    ],
    formacion: [
      { institucion: 'Universidad Nacional Mayor de San Marcos (UNMSM)', programa: 'Investigación Operativa' }
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
      'Trabaja bajo la supervisión de Alvaro Rojas Carnero, Subgerente de Operaciones, quien le delega y coordina directamente cada automatización. Participa en las fases de procedimentar y mejorar, junto con José Antonio Chumacero Calle y Luis Balarezo.'
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
      'Trabaja bajo la supervisión de Alvaro Rojas Carnero, Subgerente de Operaciones, quien le delega y coordina directamente el diseño de cada sistema de medición. Es el responsable técnico de la fase de medir y participa en la de mejorar, donde los indicadores muestran si un cambio funcionó.'
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
      'Trabaja bajo la coordinación de Alvaro Rojas Carnero, Subgerente de Operaciones, quien le delega y da seguimiento a cada desarrollo. Participa en las fases de medir y mejorar, junto con José Antonio Chumacero Calle, Oriol Romero Saavedra e Isabel Flores Huamani.'
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
