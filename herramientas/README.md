# Herramientas del sitio

Programas con los que se construyeron y se revisan piezas del sitio. El sitio
no los necesita para funcionar: sirven para regenerar el logo y los gráficos
o para comprobar que un cambio no rompió nada.

Todos se ejecutan desde la raíz del repositorio.

## Requisitos

- Python 3 con `pip install fonttools uharfbuzz`
- Node.js con `npm install playwright` y `npx playwright install chromium`
- ImageMagick (`convert`, `compare`), solo para `ajustar_logo.py`
- ffmpeg con libx264 y libvpx-vp9, solo para el video

## Logo (`logo/`)

| Archivo | Para qué sirve |
|---|---|
| `original.png` | El logo que entregó la empresa (642 × 270 px). Es la referencia. |
| `especificacion.json` | Peso, tamaño, línea base y bordes de cada línea del logo. |
| `construir_logo.py` | Dibuja `media/roic-logo.svg` y `media/roic-icono.svg` con los trazos de Montserrat. |
| `exportar_png.js` | Exporta `media/roic-logo.png` (2392 × 1000 px) y `media/roic-icono.png` (256 × 256 px). |
| `ajustar_logo.py` | Compara combinaciones de peso y tamaño con `original.png` y muestra las que mejor coinciden. |
| `renderizar.js` | Auxiliar de `ajustar_logo.py`: dibuja los SVG de prueba como PNG. |

```sh
python3 herramientas/logo/construir_logo.py   # SVG del logo y del ícono
node herramientas/logo/exportar_png.js        # PNG del logo y del ícono
python3 herramientas/logo/ajustar_logo.py roic   # o company, o eslogan
```

`construir_logo.py` descarga Montserrat de Google Fonts la primera vez y la
guarda en `logo/fuentes/`, que git ignora. Con la especificación actual,
regenera los archivos de `media/` idénticos a los publicados.

## Gráficos (`graficos/`)

`generar_svgs.py` dibuja la rueda de Deming de la portada de
`servicios.html` y el kipu de la sección Experiencia. Los deja en
`graficos/salida/`; con `--comparar` además confirma que coinciden con los
que están dentro de `servicios.html`.

```sh
python3 herramientas/graficos/generar_svgs.py --comparar
```

## Video de «Nuestro trabajo» (`video/`)

`generar_video_trabajo.js` dibuja, cuadro por cuadro, el anillo de esferas
plateadas de la portada de «Nuestro trabajo» y lo codifica con ffmpeg en
`media/trabajo.webm` (VP9) y `media/trabajo.mp4` (H.264): 12 s, 1920 × 1080,
30 cuadros por segundo. Es un bucle perfecto: el último cuadro empalma con el
primero.

```sh
node herramientas/video/generar_video_trabajo.js            # video completo (1 a 2 minutos)
node herramientas/video/generar_video_trabajo.js --muestra  # un solo cuadro en video/muestra.png
```

Requiere ffmpeg con libx264 y libvpx-vp9.

## Videos de las regiones (`video/preparar_videos_regiones.sh`)

Descarga los originales de los releases `video-peru` (Lima) y
`videos-regiones` (un video por región, con el nombre de la región) y deja en
`media/regiones/` cada video en 1280 × 720 para celulares, en 1920 × 1080
para computadoras cuando el original llega a esa calidad, y su primer cuadro
como imagen de espera. Después de agregar una región hay que sumarla a la
lista `REGIONES` de `index.html`.

```sh
sh herramientas/video/preparar_videos_regiones.sh        # todas
sh herramientas/video/preparar_videos_regiones.sh puno   # solo una
```

## Fotos del equipo (`fotos/`)

`originales/` guarda las fotos tal como las entregó la empresa.
`recortar_rojas.py` produce, a partir de la de Alvaro Rojas Carnero, la figura
sin fondo de la cabecera de su perfil (`media/equipo/rojas-recorte.png`) y la
foto cuadrada de las tarjetas (`media/equipo/rojas.jpg`), encuadrada en la
cabeza y los hombros. `recortar_chumacero.py` hace lo mismo con la de José
Antonio Chumacero Calle, que es de cuerpo entero: el recorte del perfil se
corta encima del cinturón. `recortar_romero.py`, lo mismo con la de Oriol Romero
Saavedra.

```sh
pip install "rembg[cpu]" opencv-python-headless
python3 herramientas/fotos/recortar_rojas.py
python3 herramientas/fotos/recortar_chumacero.py
python3 herramientas/fotos/recortar_romero.py
```

## Verificación (`verificacion/`)

| Archivo | Qué revisa |
|---|---|
| `verificar.js` | Las páginas del sitio (incluido un perfil) en diez anchos (320 a 1920 px): errores de JavaScript, archivos que no cargan, desplazamiento horizontal y pestañas pegadas a la búsqueda. Con `--capturas` guarda una captura de cada combinación en `verificacion/capturas/`. |
| `probar-interacciones.js` | Video de «Nuestro trabajo» (reproducción, pausa y que no se descargue en celular), selector «¿En qué podemos ayudarle?», pestañas, menú lateral, búsqueda, autodiagnóstico, formulario, artículos y enlaces directos. |

```sh
node herramientas/verificacion/verificar.js
node herramientas/verificacion/probar-interacciones.js
```

Los dos terminan con código 1 si algo falla. Conviene correrlos antes de
subir cualquier cambio a `main`.
