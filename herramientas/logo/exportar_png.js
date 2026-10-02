// Exporta el logo y el ícono vectoriales a PNG con fondo transparente:
//   media/roic-logo.png   4 veces el tamaño del SVG (2392 × 1000 px)
//   media/roic-icono.png  256 × 256 px
//
// Uso, desde la raíz del repositorio: node herramientas/logo/exportar_png.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const MEDIA = path.join(__dirname, '..', '..', 'media');

(async () => {
  const navegador = await chromium.launch();

  async function exportar(svgArchivo, pngArchivo, ancho, alto, escala) {
    const contexto = await navegador.newContext({ viewport: { width: ancho, height: alto }, deviceScaleFactor: escala });
    const pagina = await contexto.newPage();
    const svg = fs.readFileSync(path.join(MEDIA, svgArchivo), 'utf8')
      .replace('<svg ', '<svg style="width:100%;height:100%;display:block" ');
    await pagina.setContent(`<html><body style="margin:0;background:transparent"><div style="width:${ancho}px;height:${alto}px">${svg}</div></body></html>`);
    await pagina.screenshot({ path: path.join(MEDIA, pngArchivo), omitBackground: true, clip: { x: 0, y: 0, width: ancho, height: alto } });
    await contexto.close();
    console.log('Escrito media/' + pngArchivo);
  }

  const vb = fs.readFileSync(path.join(MEDIA, 'roic-logo.svg'), 'utf8').match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
  await exportar('roic-logo.svg', 'roic-logo.png', Math.round(vb[2]), Math.round(vb[3]), 4);
  await exportar('roic-icono.svg', 'roic-icono.png', 64, 64, 4);
  await navegador.close();
})();
