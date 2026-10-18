# Sitio de ROIC & Company

Sitio estático (HTML, CSS y JavaScript sin compilar) publicado en GitHub
Pages desde `main`. El contenido está en español; los textos visibles se
escriben para el cliente, no para programadores.

- **Diseño:** replica el de McKinsey por pedido expreso del cliente. Las
  skills de diseño instaladas en `.claude/skills/` (Taste Skill, Emil
  Kowalski) son criterio de calidad, pero no reemplazan esa estructura sin
  pedido del cliente. El orden de prioridad está en
  `.claude/skills/README.md`.
- **Movimiento:** todo vive en `movimiento.css` y `movimiento.js` y sigue la
  skill `roic-movimiento`.
- **Equipo:** los datos de las personas están en `equipo.js`; no inventar
  experiencia, estudios ni cifras.
- **Antes de publicar:** correr
  `node herramientas/verificacion/verificar.js` y
  `node herramientas/verificacion/probar-interacciones.js`. Las demás
  herramientas están descritas en `herramientas/README.md`.
