# ROIC & Company · sitio web

Sitio de ROIC & Company (Management & Technology Consulting), consultora en
gestión por procesos. Son cuatro páginas HTML autocontenidas: estilos, scripts
y gráficos van dentro de cada una, y solo descargan las tipografías de Google
Fonts.

| Página | Contenido |
|---|---|
| [`index.html`](index.html) | Descripción general |
| [`trabajo.html`](trabajo.html) | Nuestro trabajo |
| [`impacto.html`](impacto.html) | Nuestro impacto |
| [`servicios.html`](servicios.html) | Fases, metodología, autodiagnóstico, artículos, preguntas frecuentes y contacto |

Las herramientas para regenerar el logo y los gráficos, y para verificar el
sitio antes de publicar un cambio, están en [`herramientas/`](herramientas/).

## Publicación

El sitio se publica con GitHub Pages en
**https://racionalizacionogpl-coder.github.io/CONSULTORA.1/**

GitHub Pages sirve la rama `gh-pages`. No hace falta tocarla: el flujo
[`.github/workflows/publicar.yml`](.github/workflows/publicar.yml) la iguala a
`main` cada vez que se sube un cambio, y el sitio se actualiza solo en uno o
dos minutos. Trabaje siempre en `main`: lo que se escriba directamente en
`gh-pages` se reemplaza en la siguiente publicación.

---

## Qué contiene `servicios.html`

| Sección | Para qué sirve |
|---|---|
| Portada | Tesis, rueda de Deming sobre la pendiente de madurez y acceso directo a las cuatro fases |
| ¿En qué podemos ayudarle? | El visitante elige tipo de organización y objetivo; la página recomienda servicio, primer entregable, duración y marco normativo |
| Servicios | Las cuatro fases (Documentar, Procedimentar, Medir, Mejorar) con actividades, entregables, duración, responsable y herramientas; seis capacidades transversales |
| Metodología | Correspondencia fase ↔ PHVA ↔ NT N.º 002-2025-PCM/SGP; la cuña de Deming; seis reglas de trabajo |
| Sectores | Sector público, sector privado y educación superior |
| Experiencia | Proyecto de las 20 facultades, con sus cifras representadas como un kipu; tres escenarios ilustrativos |
| Autodiagnóstico | 12 preguntas: nivel de madurez de 1 a 5, punto de partida y hoja de ruta en semanas |
| Equipo | Las cinco personas, su rol y las fases en que participan |
| Recursos | Seis artículos que se leen en la misma página |
| Cómo trabajamos | Seis modalidades de contratación y los seis pasos para empezar |
| Preguntas frecuentes | Doce respuestas: costo, plazos, requisitos, herramientas, propiedad, confidencialidad… |
| Contacto | Formulario que prepara la solicitud y la deja lista para enviar por correo |

Todo funciona sin servidor. El autodiagnóstico guarda las respuestas solo en
el navegador del visitante.

## Datos que hay que completar

En `servicios.html`, busque `var CONFIG` (al inicio del bloque `<script>`):

```js
var CONFIG = {
  firma: 'ROIC & Company',
  correo: '',     // p. ej. 'contacto@sudominio.pe'
  telefono: '',   // p. ej. '+51 1 234 5678'
  whatsapp: '',   // solo dígitos con código de país, p. ej. '51987654321'
  linkedin: '',   // URL completa de la página de LinkedIn
  ciudad: 'Lima, Perú'
};
```

Cada campo que se complete aparece solo en la sección Contacto. Con `correo`
completo, el formulario ofrece además «Abrir en mi correo» con el mensaje ya
redactado.

**El formulario no envía nada por sí mismo**, porque GitHub Pages no tiene
servidor: prepara el texto y el visitante lo envía desde su correo. Para
recibir las solicitudes directamente hay que conectarlo a un servicio de
formularios (Formspree, Google Forms o un Apps Script de Google).

## Afirmaciones que conviene confirmar antes de publicar

El sitio se escribió con la información del repositorio y del encargo. Estas
afirmaciones son supuestos razonables, pero las tiene que confirmar la firma:

1. **Caso de la universidad.** Se presenta como «experiencia del equipo» en
   una universidad pública de 20 facultades, sin nombrarla. Si hay autorización
   para citar a la universidad por su nombre, puede nombrarse en la sección
   Experiencia.
2. **Cifras del caso**: 16 procesos de Nivel 0, 20 facultades, 2 823
   productos revisados, 37 hallazgos y 108 recomendaciones (datos del
   proyecto, a agosto de 2026).
3. **Duraciones referenciales** de cada fase (6–10, 8–14, 4–8 y 6–12 semanas)
   y la fórmula del autodiagnóstico. Se ajustan en las constantes
   `BASE` y `SIZE` del script, en el bloque del autodiagnóstico.
4. **Quién lidera cada fase** y qué fases toca cada persona del equipo.
5. **Compromisos comerciales** de las preguntas frecuentes: cotización por
   entregables, entrega del código fuente al cliente, acuerdo de
   confidencialidad, cobertura en todo el Perú y trabajo remoto.
6. **El equipo.** El encargo habla de cuatro personas y enumera cinco; el
   sitio muestra a las cinco. Solo se indica la formación académica que se
   conoce (Magíster en Economía). Las fotos se reemplazaron por iniciales.

## Referencias de diseño

Se estudiaron las webs de McKinsey, BCG, Bain, Deloitte, Accenture y PwC.
Desde este entorno no se pudo acceder directamente a sus páginas, así que el
análisis combina reseñas publicadas sobre ellas con el conocimiento de su
estructura. Lo que se tomó de cada una:

| Referencia | Patrón | Dónde está en el sitio |
|---|---|---|
| McKinsey | Titular editorial con tipografía serif, paleta sobria, contenidos propios que se leen en el sitio | Portada, Recursos |
| BCG | «How can we assist you today?»: el visitante elige su caso en lugar de recorrer un menú | ¿En qué podemos ayudarle? |
| Bain | Resultados concretos y casos con cifras | Experiencia |
| Deloitte | Descripción detallada de cada servicio, espacio en blanco, estructura ordenada | Servicios |
| Accenture | Servicios, casos y contenido en un solo recorrido | Estructura general |
| PwC | Posicionamiento claro desde la primera pantalla | Portada |

Además, las grandes consultoras ofrecen herramientas interactivas propias.
Aquí ese papel lo cumple el autodiagnóstico de madurez.

## Fuentes normativas citadas

- [Resolución de Secretaría de Gestión Pública N.º 002-2025-PCM/SGP](https://www.gob.pe/institucion/pcm/normas-legales/6501954-002-2025-pcm-sgp): aprueba la Norma Técnica N.º 002-2025-PCM/SGP.
- [Resolución de Secretaría de Gestión Pública N.º 009-2025-PCM/SGP](https://www.gob.pe/institucion/pcm/normas-legales/7260049-009-2025-pcm-sgp): aprueba los Lineamientos N.º 001-2025-PCM/SGP, «Guía práctica para la Gestión por Procesos».
- [Decreto Supremo N.º 103-2022-PCM](https://www.gob.pe/institucion/pcm/normas-legales/3361746-103-2022-pcm): Política Nacional de Modernización de la Gestión Pública al 2030.
- Ley N.º 29733, de Protección de Datos Personales: se cita en el formulario de contacto.

## Portada (index.html) y video

La portada sigue la estructura de la página «Descripción general» de
McKinsey: encabezado con pestañas, video a pantalla completa con
«Bienvenido a ROIC & Company Group in the Perú», texto de presentación, «Nuestro impacto»,
cuatro tarjetas y «Nuestra gente». «Nuestro trabajo» está en [`trabajo.html`](trabajo.html), con la estructura de
la página equivalente de McKinsey: portada animada, áreas de especialización,
historias de impacto y funcionalidades destacadas. Sus imágenes abstractas se
dibujan en el navegador; una foto en `media/` con el nombre indicado en el
código las reemplaza. El contenido detallado (fases, autodiagnóstico,
artículos y contacto) está en [`servicios.html`](servicios.html).

Archivos de `media/` (los que aún faltan se reemplazan por un fondo de color):

| Archivo | Contenido |
|---|---|
| `media/regiones/` | **Incluidos.** Videos de las regiones que se suceden de fondo en la portada (hoy Lima y Puno). Antes de cada uno aparece el nombre de su región y sus coordenadas; abajo a la derecha se indica la región que se está viendo. Por región: `<region>-720.mp4` (1280 × 720, para celulares), `<region>.mp4` (1920 × 1080, para computadoras, cuando el original lo permite) y `<region>.jpg` (imagen mientras carga). Los originales están en los releases `video-peru` (Lima) y `videos-regiones` (las demás, con el nombre de la región: `cusco.mp4`, `la-libertad.mp4`…). Para agregar una región: subir el video a `videos-regiones`, correr `herramientas/video/preparar_videos_regiones.sh` y sumarla a la lista `REGIONES` de `index.html`. |
| `media/trabajo.webm`, `media/trabajo.mp4` | **Incluidos.** Video de fondo de «Nuestro trabajo»: anillo de esferas plateadas, bucle de 12 s en 1920 × 1080, en VP9 y en H.264. En pantallas de más de 900 px se reproduce el formato que admita el navegador; en celulares se ve la misma animación dibujada, sin descargar el video. Se regenera con `herramientas/video/generar_video_trabajo.js`. |
| `media/caso-universidad.jpg` | Foto del estudio de caso |
| `media/norma.jpg`, `media/errores.jpg`, `media/indicadores.jpg`, `media/diagnostico.jpg` | Fotos de las cuatro tarjetas |
| `media/equipo/chumacero.jpg`, `rojas.jpg`, `flores.jpg`, `romero.jpg`, `balarezo.jpg` | Fotos del equipo, cuadradas. Opcional: `<id>-recorte.webp`, la misma foto sin fondo, para la cabecera del perfil |

El equipo está en `equipo.js`: nombres, cargos, textos, especialidades,
correos y LinkedIn. Lo usan la sección «Nuestra gente» y la página de perfil
de cada integrante, `persona.html?p=<id>` (por ejemplo,
`persona.html?p=rojas`), con el diseño de las páginas de personas de McKinsey.
La experiencia previa y la formación se completan en los campos `experiencia`
y `formacion`; mientras estén vacíos, esas secciones no se muestran.

## Nuestro impacto (impacto.html)

Sigue la estructura de la página «Nuestro impacto social» de McKinsey: portada
con foto, introducción, «Formación y fortalecimiento de capacidades» con
cuatro frentes, la pieza interactiva (autodiagnóstico), cuatro lecturas y un
video con su texto. Las figuras de personas son ilustraciones provisionales;
esta página necesita fotos reales:

| Archivo | Contenido sugerido |
|---|---|
| `media/impacto-portada.jpg` | Personas atendidas o equipo trabajando, horizontal y ancha |
| `media/impacto-formacion.jpg` | Taller o capacitación con servidores públicos |
| `media/impacto-interactivo.jpg` | Persona usando el autodiagnóstico o un tablero |
| `media/impacto-1.jpg` … `media/impacto-4.jpg` | Fotos de las cuatro lecturas |
| `media/impacto.mp4` | Video del gerente o del equipo explicando la propuesta de la firma |

## Logo

`media/roic-logo.svg` es el logo de ROIC & Company reconstruido como vector a
partir de la imagen original: Montserrat SemiBold para «ROIC», Medium para
«& Company» y SemiBold para el eslogan, en color #182E46, con las letras
convertidas en trazos (no depende de que la fuente esté instalada). Se ve
nítido a cualquier tamaño. También hay una versión `media/roic-logo.png` de
2392 × 1000 px con fondo transparente para documentos y redes, y el ícono en
`media/roic-icono.svg` y `media/roic-icono.png`.
