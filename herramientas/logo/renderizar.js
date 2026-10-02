// Dibuja archivos SVG como PNG con Chromium, a 642 × 270 px (el lienzo de
// original.png). Lo usa ajustar_logo.py.
//
// Uso: node herramientas/logo/renderizar.js trabajos.json
// trabajos.json es una lista de pares [svg_de_entrada, png_de_salida].
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const trabajos = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const navegador = await chromium.launch();
  const contexto = await navegador.newContext({ viewport: { width: 642, height: 270 }, deviceScaleFactor: 1 });
  const pagina = await contexto.newPage();
  for (const [svg, png] of trabajos) {
    await pagina.setContent('<html><body style="margin:0;background:#fff">' + fs.readFileSync(svg, 'utf8') + '</body></html>');
    await pagina.screenshot({ path: png, clip: { x: 0, y: 0, width: 642, height: 270 } });
  }
  await navegador.close();
})();
