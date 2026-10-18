# Skills de diseño del sitio

Skills de Claude Code que cargan las sesiones que trabajan en este
repositorio. Las de terceros son copias sin cambios de sus repositorios
originales, con licencia MIT (cada carpeta incluye su `LICENSE`).

## Propia del sitio

| Skill | Para qué |
|---|---|
| `roic-movimiento` | Reglas de animación de este sitio (`movimiento.css` y `movimiento.js`). Manda sobre las demás en lo que es propio del sitio. |

## De Emil Kowalski

Origen: [github.com/emilkowalski/skill](https://github.com/emilkowalski/skill),
commit `2d228630ba1446365f614a108cb8252f1feda202`.

| Skill | Para qué |
|---|---|
| `emil-design-eng` | Su filosofía de diseño de interfaces: pulido, componentes y detalles. |
| `animate` | Construir una animación decidiendo en orden: si debe animarse, con qué curva, duración y propiedades. |
| `review-animations` | Revisar animaciones con su vara de calidad; los valores exactos están en `STANDARDS.md`. |
| `improve-animations` | Auditar todo el movimiento del sitio y producir planes de mejora. |
| `find-animation-opportunities` | Buscar dónde falta movimiento y dónde sobra (solo lectura). |
| `animation-performance` | Que las animaciones no pierdan cuadros. |
| `animation-vocabulary` | Glosario para nombrar con precisión un efecto. |
| `mobile-native` | Ajustes para que el sitio se sienta nativo en el celular. |
| `break-ui` | Probar la interfaz con datos extremos: nombres largos, campos vacíos, cifras enormes. |

No se instalaron las de ese repositorio que no aplican a un sitio HTML:
`animate-expo` (React Native), `write-swift` (Swift), `apple-design`
(gestos), `ask-sonner`, `pick-ui-library` y `prototype` (React).

## De Taste Skill

Origen: [github.com/Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill),
commit `f624f37a8c650b9cc550253104925efe4c8de246`.

| Carpeta | Para qué |
|---|---|
| `design-taste-frontend` | Taste Skill v2, la del video: dirección de arte contra el diseño genérico, con referencias, inspector y bucle de revisión. Sus programas (`scripts/`) usan Node 22 y Chrome; `assets.mjs` busca imágenes con licencia abierta. |
| `redesign-existing-projects` | Mejorar un sitio existente sin romper lo que funciona. |
| `minimalist-ui` | Estilo editorial sobrio. |
| `high-end-visual-design` | Acabado de agencia de alto nivel. |

No se instalaron las variantes que generan imágenes, las de otros estilos
(brutalista, GPT/GSAP, Google Stitch) ni las versiones antiguas.

## Prioridad

1. Lo que pida el cliente.
2. El diseño actual del sitio, que replica a McKinsey por pedido expreso del
   cliente (rótulos en mayúsculas, filas de tarjetas, encabezado y pestañas).
3. `roic-movimiento` para todo lo que se mueve.
4. Las skills de terceros, como criterio de calidad. Varias reglas de estilo
   de Taste Skill (por ejemplo, prohibir rótulos pequeños en mayúsculas o
   filas de tarjetas iguales) contradicen el punto 2 y no se aplican sin
   pedido del cliente.

## Actualizar

Clonar el repositorio de origen y reemplazar la carpeta de la skill,
conservando su `LICENSE`. Revisar antes el contenido nuevo: estas skills
dan instrucciones a Claude y pueden traer programas.
