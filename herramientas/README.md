# Herramientas del sitio

Programas con los que se construyeron y se revisan piezas del sitio. El sitio
no los necesita para funcionar: sirven para regenerar el logo y los gráficos
o para comprobar que un cambio no rompió nada.

Todos se ejecutan desde la raíz del repositorio.

## Requisitos

- Python 3 con `pip install fonttools uharfbuzz`
- Node.js con `npm install playwright` y `npx playwright install chromium`
- ImageMagick (`convert`, `compare`), solo para `ajustar_logo.py`

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

## Verificación (`verificacion/`)

| Archivo | Qué revisa |
|---|---|
| `verificar.js` | Las cuatro páginas en siete anchos (320 a 1920 px): errores de JavaScript, archivos que no cargan, desplazamiento horizontal y pestañas que chocan con la búsqueda. Con `--capturas` guarda una captura de cada combinación en `verificacion/capturas/`. |
| `probar-interacciones.js` | Selector «¿En qué podemos ayudarle?», pestañas, menú lateral, búsqueda, autodiagnóstico, formulario, artículos y enlaces directos. |

```sh
node herramientas/verificacion/verificar.js
node herramientas/verificacion/probar-interacciones.js
```

Los dos terminan con código 1 si algo falla. Conviene correrlos antes de
subir cualquier cambio a `main`.
