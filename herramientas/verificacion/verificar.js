// Revisa las páginas del sitio en diez anchos de pantalla, de un celular
// pequeño (320 px) a un monitor grande (1920 px). En cada combinación busca:
//   - errores de JavaScript;
//   - archivos que no cargan (salvo las fotos y videos de media/ que aún faltan);
//   - desplazamiento horizontal: algo más ancho que la pantalla;
//   - pestañas del encabezado pegadas o montadas sobre la lupa de búsqueda.
//
// Uso, desde la raíz del repositorio:
//   node herramientas/verificacion/verificar.js             solo el informe
//   node herramientas/verificacion/verificar.js --capturas  además guarda capturas
//                                                           en herramientas/verificacion/capturas/
// Termina con código 1 si encuentra algún problema.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const RAIZ = path.resolve(__dirname, '..', '..');
const PAGINAS = ['index.html', 'trabajo.html', 'impacto.html', 'servicios.html', 'persona.html?p=chumacero'];
const ANCHOS = [320, 390, 820, 1120, 1280, 1366, 1440, 1536, 1600, 1920];
const CAPTURAS = process.argv.includes('--capturas');
const DIR_CAPTURAS = path.join(__dirname, 'capturas');

(async () => {
  if (CAPTURAS) fs.mkdirSync(DIR_CAPTURAS, { recursive: true });
  const navegador = await chromium.launch();
  let problemas = 0;

  for (const pagina of PAGINAS) {
    for (const ancho of ANCHOS) {
      // ignoreHTTPSErrors: solo afecta a la descarga de tipografías desde Google Fonts.
      const contexto = await navegador.newContext({ viewport: { width: ancho, height: 900 }, ignoreHTTPSErrors: true });
      const p = await contexto.newPage();
      const hallazgos = [];
      p.on('pageerror', e => hallazgos.push('error de JavaScript: ' + e.message));
      p.on('requestfailed', r => {
        const u = r.url();
        if (u.startsWith('file:') && u.includes('/media/')) return;      // fotos o videos pendientes
        if (u.includes('fonts.g')) return;                               // sin red: el sitio usa fuentes de respaldo
        hallazgos.push('no carga: ' + u);
      });
      const [archivo, consulta] = pagina.split('?');
      await p.goto(pathToFileURL(path.join(RAIZ, archivo)).href + (consulta ? '?' + consulta : ''), { waitUntil: 'load' });
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(300);

      const medida = await p.evaluate(() => {
        const de = document.documentElement;
        const anchos = [];
        document.querySelectorAll('body *').forEach(el => {
          const r = el.getBoundingClientRect();
          if (!r.width || r.right <= de.clientWidth + 0.5) return;
          for (let q = el.parentElement; q; q = q.parentElement) {
            if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(q).overflowX)) return;  // dentro de un contenedor con su propio scroll
          }
          anchos.push((el.id ? '#' + el.id : el.tagName.toLowerCase()) + ' (' + Math.round(r.right) + ' px)');
        });
        // Se mide la última pestaña y no la lista: la lista se encoge y las pestañas se desbordan fuera de ella.
        let choque = null;
        const tabs = document.querySelector('.tabs, .mk-tabs');
        const lupa = document.querySelector('#search-open');
        if (tabs && lupa && tabs.getBoundingClientRect().width > 0) {
          const fin = Math.max(...[...tabs.querySelectorAll(':scope > li')].map(li => li.getBoundingClientRect().right));
          const hueco = lupa.getBoundingClientRect().left - fin;
          if (hueco < 16) choque = Math.round(16 - hueco);
        }
        return { desborde: de.scrollWidth - de.clientWidth, anchos: anchos.slice(0, 5), choque };
      });
      if (medida.desborde > 0) hallazgos.push(`desplazamiento horizontal de ${medida.desborde} px: ${medida.anchos.join(', ')}`);
      if (medida.choque) hallazgos.push(`la última pestaña queda a menos de 16 px de la lupa (faltan ${medida.choque} px)`);

      if (CAPTURAS) await p.screenshot({ path: path.join(DIR_CAPTURAS, `${pagina.replace('.html', '').replace('?p=', '-')}-${ancho}.png`) });
      console.log((hallazgos.length ? '✗ ' : '✓ ') + pagina.padEnd(26) + String(ancho).padStart(5) + ' px' +
        (hallazgos.length ? '\n    ' + hallazgos.join('\n    ') : ''));
      problemas += hallazgos.length;
      await contexto.close();
    }
  }
  await navegador.close();
  console.log(problemas ? `\n${problemas} problema(s).` : '\nSin problemas.');
  process.exit(problemas ? 1 : 0);
})();
