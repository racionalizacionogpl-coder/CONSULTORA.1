---
name: roic-movimiento
description: Reglas de animación y movimiento del sitio de ROIC & Company (movimiento.css y movimiento.js). Úsala antes de agregar, cambiar o revisar cualquier animación, transición, efecto al pasar el ratón, aparición al desplazarse o paso entre páginas del sitio.
---

# Movimiento del sitio de ROIC & Company

El sitio se mueve como una consultora de primer nivel: con precisión y sin
adornos. Estas reglas adaptan a este sitio las skills de animación de
Emil Kowalski (`animate` y `review-animations`, de
[github.com/emilkowalski/skill](https://github.com/emilkowalski/skill)) y las
reglas de movimiento de Taste Skill
([github.com/Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)).

Todo el movimiento vive en dos archivos que comparten las cinco páginas:

- `movimiento.css`: curvas, duraciones, estados iniciales y finales.
- `movimiento.js`: cuándo empieza cada animación.

Ninguna página tiene animaciones propias fuera de esos dos archivos, salvo
las que ya traía `servicios.html` en su portada (rueda de Deming y entrada
del título).

## Reglas

1. **Cada movimiento tiene un motivo.** Orientar (de dónde viene algo),
   indicar un estado, responder a una acción o explicar (portada,
   organigrama, cifras). Si no tiene motivo, se borra.
2. **Según la frecuencia.** Lo que se usa muchas veces al día (pestañas,
   menú, búsqueda) se mueve poco y rápido. Lo que se ve una vez (portada,
   organigrama) puede lucirse.
3. **Solo `transform` y `opacity`.** Para descubrir imágenes se permite
   `clip-path`. Nunca `width`, `height`, `margin`, `padding`, `top` ni
   `left` (la única excepción es `top` de los elementos que siguen al
   encabezado, que cambia una sola vez al esconderse).
4. **Curvas** (variables de `movimiento.css`):
   - entrar y salir: `--m-out: cubic-bezier(.23,1,.32,1)`;
   - moverse por la pantalla (línea de pestañas, líneas del organigrama,
     nombre que viaja al perfil): `--m-in-out: cubic-bezier(.77,0,.175,1)`;
   - al pasar el ratón o cambiar de color: `ease`;
   - movimiento constante (acercamiento del video): `linear`;
   - **nunca `ease-in`** en la interfaz, ni las curvas `ease-out` de fábrica.
5. **Duraciones.**
   - Al presionar un botón: 140 ms.
   - Encabezado y efectos al pasar el ratón: 200–280 ms.
   - Fichas y artículos que se abren: 220–300 ms al abrir; 160 ms al cerrar.
   - Interfaz, siempre por debajo de 300 ms.
   - Contenido que aparece al desplazarse: 700 ms; imágenes, 900 ms la
     cortina y 1,2 s el asentamiento.
   - Portada: palabras de 900 ms; contadores, 1,6 s.
6. **Escalonado de 70 ms**, con un máximo de 490 ms. Nada entra todo a la
   vez.
7. **Subida de 24 px** con fundido. Nada aparece desde `scale(0)`: como
   mucho desde `scale(.97)`.
8. **Las fichas (modales) se abren centradas**, desde `scale(.97)` y 8 px
   más abajo.
9. **Efectos al pasar el ratón solo con ratón:** dentro de
   `@media (hover:hover) and (pointer:fine)`.
10. **Movimiento reducido: menos y más suave, no nada.** Con
    `prefers-reduced-motion: reduce` el `<head>` agrega la clase `rv-suave`.
    Con ella todo aparece con fundido y sin desplazamiento, los contadores
    muestran su valor final y el encabezado no se esconde.
11. **El contenido se ve aunque el script falle.** Si `movimiento.js` no
    carga, el script del `<head>` quita la clase `rv` a los 3 s.
12. **No inventar datos para animarlos.** Las cifras de «Nuestro impacto en
    cifras» salen de los casos publicados en el sitio (20 facultades,
    16 procesos, 58 KPI, 300 oficinas).

## Qué se mueve hoy

| Dónde | Qué hace |
|---|---|
| Portada | El título entra palabra por palabra; el video se acerca muy despacio; el texto se desplaza y se desvanece al bajar; la flecha invita a bajar. |
| Todas las páginas | El contenido aparece al llegar a él, escalonado; las imágenes se descubren de abajo hacia arriba. |
| Encabezado | Se esconde al bajar y vuelve al subir; una línea azul se desliza hasta la pestaña señalada; una barra arriba marca el avance de lectura. |
| «Nuestro impacto en cifras» | Contadores de 0 a cada cifra. |
| Organigrama | Las líneas se dibujan de arriba abajo y cada caja aparece en orden. |
| Fichas de casos y artículos | Se abren desde abajo y se cierran más rápido. |
| Paso de una página a otra | Fundido; el nombre de una persona viaja desde su tarjeta hasta el título de su perfil. |
| Botones | Se hunden un poco al presionarlos. |

## Para animar un elemento nuevo

1. Agregue su selector a las **dos** listas de `.rv :is(...)` en
   `movimiento.css` y a `REVELAR` en `movimiento.js` (o a `IMAGENES` si es
   una imagen que debe descubrirse).
2. No le ponga transiciones propias que choquen con `transform` u
   `opacity`.
3. Pruebe con movimiento normal y con movimiento reducido.

## Revisión antes de publicar

- Nada de `transition: all`, `scale(0)` ni `ease-in`.
- Nada que mida más de 300 ms en la interfaz sin motivo.
- Recorrer cada página hasta el final y comprobar que no queda nada oculto
  (opacidad 0 o cortina cerrada).
- Correr las dos verificaciones:
  `node herramientas/verificacion/verificar.js` y
  `node herramientas/verificacion/probar-interacciones.js` (esta última
  incluye pruebas del movimiento).
