// Genera el video de fondo de «Nuestro trabajo» (media/trabajo.webm y
// media/trabajo.mp4, el mismo video en VP9 y en H.264): un anillo
// de esferas plateadas que gira sobre el degradado azul marino de la página,
// en la línea de la animación de la página equivalente de McKinsey.
//
// El video es un bucle perfecto de 12 s a 30 cuadros por segundo: en ese
// tiempo el anillo avanza un número entero de esferas en cada dirección, así
// que el último cuadro empalma con el primero.
//
// Uso, desde la raíz del repositorio:
//   node herramientas/video/generar_video_trabajo.js            video completo
//   node herramientas/video/generar_video_trabajo.js --muestra  solo un cuadro de prueba (muestra.png)
// Requiere Node con Playwright y ffmpeg con libx264 y libvpx-vp9.
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ANCHO = 1920, ALTO = 1080, FPS = 30, SEGUNDOS = 12;
const CUADROS = FPS * SEGUNDOS;
const MEDIA = path.join(__dirname, '..', '..', 'media');
const MP4 = path.join(MEDIA, 'trabajo.mp4'), WEBM = path.join(MEDIA, 'trabajo.webm');

// Dibujo de un cuadro, dentro del navegador. f va de 0 a 1 a lo largo del bucle.
const PAGINA = `<!doctype html><html><body style="margin:0;background:#000">
<canvas id="c" width="${ANCHO}" height="${ALTO}"></canvas>
<script>
const c = document.getElementById('c').getContext('2d');
const W = ${ANCHO}, H = ${ALTO};
const U = 40, V = 14;          // esferas alrededor del anillo y del tubo
const KU = 9, KV = 7;          // esferas que avanza cada giro en un bucle completo

// Grano fijo muy suave: evita escalones en el degradado al comprimir el video.
const grano = document.createElement('canvas');
grano.width = W; grano.height = H;
(function () {
  const g = grano.getContext('2d'), img = g.createImageData(W, H);
  let s = 12345;
  for (let i = 0; i < img.data.length; i += 4) {
    s = (s * 16807) % 2147483647;
    const v = (s / 2147483647) * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 7;
  }
  g.putImageData(img, 0, 0);
})();

function fondo() {
  const g = c.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#03111D'); g.addColorStop(.55, '#061E3A'); g.addColorStop(1, '#0B2A8C');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
}

// Esfera cromada: brillo arriba a la izquierda, reflejo azul abajo a la derecha.
function esfera(x, y, r, lejania) {
  const g = c.createRadialGradient(x - r * .32, y - r * .38, r * .04, x, y, r * 1.02);
  g.addColorStop(0, '#FFFFFF');
  g.addColorStop(.16, '#F3F6F9');
  g.addColorStop(.42, '#BCC6D1');
  g.addColorStop(.7, '#647386');
  g.addColorStop(.9, '#2D3D52');
  g.addColorStop(1, '#1B2A3F');
  c.fillStyle = g;
  c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
  const b = c.createRadialGradient(x + r * .28, y + r * .34, r * .55, x + r * .1, y + r * .12, r * 1.05);
  b.addColorStop(0, 'rgba(120,150,215,0)');
  b.addColorStop(1, 'rgba(120,150,215,.38)');
  c.save(); c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.clip();
  c.fillStyle = b; c.fillRect(x - r, y - r, 2 * r, 2 * r);
  if (lejania > 0) { c.fillStyle = 'rgba(3,17,29,' + lejania + ')'; c.fillRect(x - r, y - r, 2 * r, 2 * r); }
  c.restore();
}

window.cuadro = function (f) {
  fondo();
  const cx = W * .08, cy = H * .5, R = Math.min(H * .36, W * .18), r = R * .3;  // a la izquierda, lejos del texto
  const giroU = 2 * Math.PI / U * KU * f, giroV = 2 * Math.PI / V * KV * f;
  const pts = [];
  for (let i = 0; i < U; i++) for (let j = 0; j < V; j++) {
    const u = i / U * Math.PI * 2 + giroU, v = j / V * Math.PI * 2 + giroV;
    const x = (R + r * Math.cos(v)) * Math.cos(u), y = (R + r * Math.cos(v)) * Math.sin(u), z = r * Math.sin(v);
    const ty = y * Math.cos(1.05) - z * Math.sin(1.05), tz = y * Math.sin(1.05) + z * Math.cos(1.05);
    const ax = .35, px = x * Math.cos(ax) + tz * Math.sin(ax), pz = -x * Math.sin(ax) + tz * Math.cos(ax);
    const s = 900 / (900 + pz);
    pts.push([cx + px * s, cy + ty * s, pz, s]);
  }
  pts.sort((a, b) => b[2] - a[2]);            // de atrás hacia adelante
  const radio = r * .235;
  for (const p of pts) esfera(p[0], p[1], radio * p[3], Math.max(0, Math.min(.38, p[2] / (R * 1.4))));
  c.drawImage(grano, 0, 0);
  return document.getElementById('c').toDataURL('image/png');
};
</script></body></html>`;

(async () => {
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport: { width: ANCHO, height: ALTO } });
  await pagina.setContent(PAGINA);

  if (process.argv.includes('--muestra')) {
    const png = await pagina.evaluate(() => window.cuadro(0));
    const destino = path.join(__dirname, 'muestra.png');
    fs.writeFileSync(destino, Buffer.from(png.split(',')[1], 'base64'));
    console.log('Escrito ' + path.relative(process.cwd(), destino));
    await navegador.close();
    return;
  }

  // Un solo ffmpeg codifica las dos versiones a partir de los mismos cuadros.
  const ffmpeg = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', MP4,
    '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '33', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2',
    '-pix_fmt', 'yuv420p', '-an', WEBM],
    { stdio: ['pipe', 'inherit', 'inherit'] });
  const fin = new Promise((ok, mal) => ffmpeg.on('close', code => (code === 0 ? ok() : mal(new Error('ffmpeg terminó con código ' + code)))));

  for (let i = 0; i < CUADROS; i++) {
    const png = await pagina.evaluate(f => window.cuadro(f), i / CUADROS);
    const datos = Buffer.from(png.split(',')[1], 'base64');
    if (!ffmpeg.stdin.write(datos)) await new Promise(r => ffmpeg.stdin.once('drain', r));
    if ((i + 1) % 60 === 0) console.log(`${i + 1} de ${CUADROS} cuadros`);
  }
  ffmpeg.stdin.end();
  await fin;
  await navegador.close();
  for (const archivo of [WEBM, MP4]) {
    console.log('Escrito media/' + path.basename(archivo) + ' (' + (fs.statSync(archivo).size / 1e6).toFixed(1) + ' MB)');
  }
})();
