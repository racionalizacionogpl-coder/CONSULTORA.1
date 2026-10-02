// Prueba, en un navegador real, que las partes interactivas del sitio
// funcionen: selector «¿En qué podemos ayudarle?», pestañas de las fases,
// menú lateral, búsqueda, autodiagnóstico, formulario de contacto, artículos
// y enlaces directos. También comprueba que el logo cargue en las cuatro
// páginas y que se dibujen las ilustraciones de «Nuestro trabajo».
//
// Uso, desde la raíz del repositorio: node herramientas/verificacion/probar-interacciones.js
// Termina con código 1 si alguna prueba falla.
const { chromium } = require('playwright');
const path = require('path');
const { pathToFileURL } = require('url');

const RAIZ = path.resolve(__dirname, '..', '..');
const url = (pagina, ancla = '') => pathToFileURL(path.join(RAIZ, pagina)).href + ancla;

let fallas = 0;
function comprobar(ok, descripcion, detalle) {
  console.log((ok ? '✓ ' : '✗ ') + descripcion + (ok || detalle === undefined ? '' : ` (obtenido: ${JSON.stringify(detalle)})`));
  if (!ok) fallas++;
}

(async () => {
  const navegador = await chromium.launch();
  const contexto = await navegador.newContext({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: true });
  const p = await contexto.newPage();
  const errores = [];
  p.on('pageerror', e => errores.push(e.message));

  // Las cuatro páginas cargan el logo vectorial.
  for (const pagina of ['index.html', 'trabajo.html', 'impacto.html', 'servicios.html']) {
    await p.goto(url(pagina), { waitUntil: 'load' });
    const logo = await p.$eval('.logo img, .mk-logo img', i => i.complete && i.naturalWidth > 0);
    comprobar(logo, `${pagina}: el logo carga`);
  }
  await p.goto(url('trabajo.html'), { waitUntil: 'load' });
  const lienzos = await p.$$eval('canvas.art', cs => cs.filter(c => c.width > 0).length);
  comprobar(lienzos >= 10, 'trabajo.html: se dibujan las ilustraciones', lienzos);

  // Video de «Nuestro trabajo»: se reproduce en pantalla ancha y el botón lo pausa.
  const enMarcha = await p.waitForFunction(() => {
    const v = document.getElementById('vid');
    return !v.hidden && !v.paused && v.currentTime > 0.2;
  }, null, { timeout: 10000 }).then(() => true, () => false);
  comprobar(enMarcha, 'trabajo.html: el video de la portada se reproduce',
    await p.$eval('#vid', v => ({ oculto: v.hidden, pausado: v.paused, fuente: v.currentSrc.split('/').pop(), error: v.error && v.error.code })));
  await p.click('#pause');
  comprobar(await p.$eval('#vid', v => v.paused), 'trabajo.html: el botón pausa el video');
  await p.click('#pause');
  await p.waitForTimeout(400);
  comprobar(await p.$eval('#vid', v => !v.paused), 'trabajo.html: el botón vuelve a reproducir el video');
  const movil = await navegador.newContext({ viewport: { width: 390, height: 844 }, ignoreHTTPSErrors: true });
  const pm = await movil.newPage();
  await pm.goto(url('trabajo.html'), { waitUntil: 'load' });
  await pm.waitForTimeout(1500);
  comprobar(await pm.$eval('#vid', v => v.hidden && !v.currentSrc), 'trabajo.html: en celular no se descarga el video y se ve la animación');
  await movil.close();

  await p.goto(url('servicios.html'), { waitUntil: 'load' });
  await p.evaluate(() => localStorage.clear());
  await p.reload({ waitUntil: 'load' });

  // Selector «¿En qué podemos ayudarle?»
  await p.selectOption('#h-org', 'privada');
  comprobar(await p.$eval('#h-goal option[value="norma"]', o => o.disabled), 'una empresa privada no puede elegir «cumplir la norma técnica»');
  await p.selectOption('#h-goal', 'medir');
  const servicio = await p.textContent('#h-svc');
  comprobar(servicio === 'Sistema de indicadores, KPI y OKR', 'el selector recomienda el servicio correcto', servicio);
  await p.click('#h-cta');
  await p.waitForTimeout(500);
  const msj = await p.inputValue('#f-msg');
  comprobar(msj.startsWith('Somos una empresa privada y queremos medir'), 'el selector rellena el mensaje del formulario', msj.slice(0, 60));
  comprobar(await p.inputValue('#f-tipo') === 'Empresa privada', 'el selector elige el tipo de organización');

  // Pestañas de las fases
  await p.click('#tab-medir');
  comprobar(await p.isVisible('#medir'), 'la pestaña Medir muestra su panel');
  await p.keyboard.press('ArrowDown');
  comprobar(await p.evaluate(() => document.activeElement.id) === 'tab-mejorar', 'la flecha del teclado pasa a la siguiente pestaña');
  await p.click('.ps[data-tab="procedimentar"]');
  await p.waitForTimeout(500);
  comprobar(await p.isVisible('#procedimentar'), 'el enlace de la portada abre la fase Procedimentar');

  // Menú lateral y búsqueda
  await p.click('#menu-open');
  comprobar(await p.isVisible('#side'), 'el menú lateral se abre');
  await p.keyboard.press('Escape');
  comprobar(!(await p.isVisible('#side')), 'Escape cierra el menú lateral');
  await p.click('#search-open');
  await p.fill('#q', 'indicadores');
  const resultados = await p.$$eval('#srch-res li', l => l.length);
  comprobar(resultados > 0, 'la búsqueda encuentra «indicadores»', resultados);
  await p.keyboard.press('Escape');
  comprobar(!(await p.isVisible('#srch')), 'Escape cierra la búsqueda');

  // Autodiagnóstico
  comprobar((await p.textContent('#r-tag')).startsWith('Ejemplo'), 'el autodiagnóstico empieza con respuestas de ejemplo');
  await p.click('label:has(#q-m1-3)');
  await p.click('label:has(#q-m2-3)');
  await p.click('label:has(#q-m3-2)');
  comprobar(await p.textContent('#r-tag') === 'Su resultado', 'al responder pasa a «Su resultado»');
  comprobar(await p.textContent('#r-n') === '3', 'el nivel de madurez se recalcula', await p.textContent('#r-n'));
  await p.selectOption('#r-size', 'xl');
  comprobar(/\d+ semanas/.test(await p.textContent('#r-total')), 'la hoja de ruta calcula las semanas');
  comprobar(!!(await p.evaluate(() => localStorage.getItem('kipu-diagnostico-v1'))), 'las respuestas se guardan en el navegador');
  await p.click('#r-send');
  await p.waitForTimeout(500);
  comprobar((await p.inputValue('#f-msg')).includes('Resultado del autodiagnóstico'), 'el resultado pasa al formulario');

  // Formulario de contacto
  await p.fill('#f-msg', '');
  await p.click('#ct-form button[type=submit]');
  const avisos = await p.$$eval('.err', e => e.map(x => x.textContent).filter(Boolean).length);
  comprobar(avisos === 5, 'el formulario avisa de los cinco campos obligatorios', avisos);
  await p.fill('#f-nombre', 'María Pérez');
  await p.fill('#f-org', 'Municipalidad de Ejemplo');
  await p.fill('#f-correo', 'maria@ejemplo.gob.pe');
  await p.fill('#f-msg', 'Necesitamos actualizar el manual de procedimientos.');
  await p.check('#f-ok');
  await p.click('#ct-form button[type=submit]');
  comprobar(await p.isVisible('#ct-done'), 'el formulario prepara la solicitud');
  comprobar((await p.textContent('#done-text')).includes('Municipalidad de Ejemplo'), 'la solicitud incluye los datos escritos');

  // Artículos
  await p.click('[data-open="art-avance"]');
  comprobar(await p.$eval('#art-avance', d => d.open), 'el artículo se abre');
  await p.click('#art-avance [data-close]');
  comprobar(await p.$eval('#art-avance', d => !d.open), 'el artículo se cierra');
  await p.click('[data-open="art-kpi"]');
  await p.click('#art-kpi a[data-tab="medir"]');
  await p.waitForTimeout(500);
  comprobar(await p.evaluate(() => !document.getElementById('art-kpi').open && !document.getElementById('medir').hidden),
    'un enlace dentro del artículo lo cierra y abre la fase Medir');

  // Enlaces directos
  await p.goto(url('servicios.html', '#mejorar'), { waitUntil: 'load' });
  await p.waitForTimeout(300);
  comprobar(await p.isVisible('#mejorar'), 'servicios.html#mejorar abre la fase Mejorar');
  await p.goto(url('servicios.html', '#art-nt'), { waitUntil: 'load' });
  await p.waitForTimeout(300);
  comprobar(await p.$eval('#art-nt', d => d.open), 'servicios.html#art-nt abre el artículo');

  comprobar(errores.length === 0, 'sin errores de JavaScript', errores);
  await navegador.close();
  console.log(fallas ? `\n${fallas} prueba(s) fallaron.` : '\nTodas las pruebas pasaron.');
  process.exit(fallas ? 1 : 0);
})();
