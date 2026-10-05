// Dibuja las ilustraciones de la sección «Nuestro impacto» de la portada
// (index.html): una por recuadro, cada una ligada a su contenido.
//
//   media/impacto/sigpro.jpg   Estudio de caso: el panel del sistema SIGPRO
//   media/impacto/apqc.jpg     Fase 1: mapa de procesos bajo el marco APQC y 58 KPI
//   media/impacto/bpmn.jpg     Fase 2: un procedimiento modelado en BPMN 2.0
//   media/impacto/kpi.jpg      Fase 3: monitoreo de 300 oficinas
//   media/impacto/rpa.jpg      Fase 4: automatización de un servicio (As-Is / To-Be)
//
// Son ilustraciones vectoriales exportadas a 1,5 veces su tamaño de diseño (de 2 a 5 veces su tamaño en pantalla),
// para que se vean nítidas en pantallas de alta densidad y con zoom.
// Las cifras que aparecen son solo las del texto de cada caso (58 KPI,
// 300 oficinas); los gráficos no muestran datos inventados.
//
// Uso, desde la raíz del repositorio:
//   node herramientas/graficos/generar_impacto.js
// Requiere Node con Playwright y curl (descarga las tipografías del sitio la
// primera vez y las guarda en herramientas/graficos/fuentes/, que git ignora).
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');
const SALIDA = path.join(RAIZ, 'media', 'impacto');
const FUENTES = path.join(__dirname, 'fuentes');

// ---------- Tipografías del sitio (Public Sans y Source Serif 4) ----------
function fuentes() {
  fs.mkdirSync(FUENTES, { recursive: true });
  const archivos = { 'PublicSans-300': 0, 'PublicSans-400': 0, 'PublicSans-600': 0, 'PublicSans-700': 0, 'SourceSerif4-600': 0, 'SourceSerif4-700': 0 };
  const faltan = Object.keys(archivos).some(n => !fs.existsSync(path.join(FUENTES, n + '.ttf')));
  if (faltan) {
    const css = execFileSync('curl', ['-sS', '-A', 'Wget/1.21',
      'https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;600;700&family=Source+Serif+4:wght@600;700']).toString();
    const re = /font-family: '([^']+)';[\s\S]*?font-weight: (\d+);[\s\S]*?url\((https:[^)]+\.ttf)\)/g;
    let m;
    while ((m = re.exec(css))) {
      const nombre = m[1].replace(/\s+/g, '') + '-' + m[2];
      execFileSync('curl', ['-sS', '-o', path.join(FUENTES, nombre + '.ttf'), m[3]]);
    }
  }
  return Object.keys(archivos).map(n => {
    const [familia, peso] = n.split('-');
    const nombre = familia === 'PublicSans' ? 'Public Sans' : 'Source Serif 4';
    const datos = fs.readFileSync(path.join(FUENTES, n + '.ttf')).toString('base64');
    return `@font-face{font-family:"${nombre}";font-weight:${peso};src:url(data:font/ttf;base64,${datos}) format("truetype")}`;
  }).join('\n');
}

// ---------- Paleta del sitio ----------
const C = {
  navy: '#051C2C', azul: '#2251FF', profundo: '#0B2A6B', medio: '#163E9E',
  celeste: '#AFC2FF', claro: '#F4F7FC', linea: '#DCE3EA', texto: '#1B2A3F', gris: '#64717F',
  lila: '#8E9AF5', verde: '#43C9B2', ambar: '#E9B64C', rosa: '#F2607F'
};

// Fondo azul marino común, con una retícula de puntos muy suave.
function fondo(w, h, id) {
  return `<defs>
    <linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.navy}"/><stop offset=".6" stop-color="${C.profundo}"/><stop offset="1" stop-color="${C.medio}"/>
    </linearGradient>
    <pattern id="p${id}" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#fff" opacity=".07"/></pattern>
    <filter id="s${id}" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000" flood-opacity=".35"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g${id})"/><rect width="${w}" height="${h}" fill="url(#p${id})"/>`;
}

// Línea de tendencia suave (sin cifras) a partir de una lista de alturas relativas.
function curva(x, y, w, h, valores) {
  const pts = valores.map((v, i) => [x + (w * i) / (valores.length - 1), y + h - v * h]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

// ---------- 1. SIGPRO: panel de la plataforma (estudio de caso) ----------
function sigpro() {
  const W = 1600, H = 924;
  const x0 = 110, y0 = 92, ww = 1380, wh = 760;     // ventana del navegador
  const sx = x0, sy = y0 + 54, sw = 270;              // barra lateral
  const mx = sx + sw + 40, my = sy + 36, mw = x0 + ww - mx - 40;
  const menu = ['Mapa de procesos', 'Procedimientos', 'Indicadores (KPI)', 'Mejora continua', 'Documentos', 'Usuarios'];
  const tw = (mw - 3 * 24) / 4;
  const tiles = [
    ['Procesos documentados', 'barra', C.azul],
    ['KPI en seguimiento', '58', C.verde],
    ['Oficinas monitoreadas', '300', C.lila],
    ['Mejoras en curso', 'pasos', C.ambar]
  ];
  const ry = my + 112 + 150 + 30, rh = y0 + wh - 40 - ry;
  const cw = mw * 0.6, dx = mx + cw + 24, dw = mw - cw - 24;
  const rcx = dx + dw / 2, rcy = ry + rh / 2 + 18, rr = Math.min(dw, rh) * 0.3;
  const fases = [['Planificar', C.lila], ['Hacer', C.verde], ['Verificar', C.ambar], ['Actuar', C.rosa]];
  const arco = (i) => {
    const a0 = -Math.PI / 2 + i * Math.PI / 2 + 0.06, a1 = a0 + Math.PI / 2 - 0.12;
    return `M${rcx + rr * Math.cos(a0)},${rcy + rr * Math.sin(a0)} A${rr},${rr} 0 0 1 ${rcx + rr * Math.cos(a1)},${rcy + rr * Math.sin(a1)}`;
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${fondo(W, H, 1)}
  <g filter="url(#s1)">
    <rect x="${x0}" y="${y0}" width="${ww}" height="${wh}" rx="18" fill="${C.claro}"/>
  </g>
  <path d="M${x0},${y0 + 18} a18,18 0 0 1 18,-18 h${ww - 36} a18,18 0 0 1 18,18 v36 h-${ww} z" fill="#E4EAF3"/>
  <circle cx="${x0 + 30}" cy="${y0 + 27}" r="7" fill="#F2607F"/><circle cx="${x0 + 54}" cy="${y0 + 27}" r="7" fill="#E9B64C"/><circle cx="${x0 + 78}" cy="${y0 + 27}" r="7" fill="#43C9B2"/>
  <rect x="${x0 + 420}" y="${y0 + 12}" width="540" height="30" rx="15" fill="#fff"/>
  <text x="${x0 + 690}" y="${y0 + 33}" text-anchor="middle" font-size="16" fill="${C.gris}">sigpro · Sistema de Gestión por Procesos</text>
  <path d="M${sx},${sy} h${sw} v${wh - 54} h-${sw - 18} a18,18 0 0 1 -18,-18 z" fill="${C.navy}"/>
  <text x="${sx + 34}" y="${sy + 62}" font-family="'Source Serif 4', serif" font-weight="700" font-size="34" fill="#fff">SIGPRO</text>
  <rect x="${sx + 34}" y="${sy + 78}" width="48" height="4" fill="${C.azul}"/>
  ${menu.map((t, i) => {
    const y = sy + 130 + i * 58, act = i === 2;
    return `${act ? `<rect x="${sx + 16}" y="${y - 30}" width="${sw - 32}" height="46" rx="8" fill="${C.azul}"/>` : ''}
    <rect x="${sx + 34}" y="${y - 14}" width="14" height="14" rx="3" fill="none" stroke="${act ? '#fff' : C.celeste}" stroke-width="2"/>
    <text x="${sx + 62}" y="${y}" font-size="18" font-weight="${act ? 600 : 400}" fill="${act ? '#fff' : '#C9D4EA'}">${t}</text>`;
  }).join('')}
  <text x="${mx}" y="${my + 30}" font-family="'Source Serif 4', serif" font-weight="700" font-size="34" fill="${C.texto}">Panel institucional</text>
  <text x="${mx}" y="${my + 62}" font-size="17" fill="${C.gris}">Documentar · Procedimentar · Medir · Mejorar</text>
  ${tiles.map((t, i) => {
    const x = mx + i * (tw + 24), y = my + 112;
    let cuerpo;
    if (t[1] === 'barra') cuerpo = `<rect x="${x + 24}" y="${y + 92}" width="${tw - 48}" height="12" rx="6" fill="${C.linea}"/><rect x="${x + 24}" y="${y + 92}" width="${(tw - 48) * 0.86}" height="12" rx="6" fill="${t[2]}"/>`;
    else if (t[1] === 'pasos') cuerpo = [0, 1, 2, 3, 4].map(k => `<rect x="${x + 24 + k * 30}" y="${y + 80}" width="22" height="22" rx="5" fill="${k < 3 ? t[2] : C.linea}"/>`).join('');
    else cuerpo = `<text x="${x + 24}" y="${y + 110}" font-family="'Source Serif 4', serif" font-weight="700" font-size="54" fill="${C.texto}">${t[1]}</text>`;
    return `<rect x="${x}" y="${y}" width="${tw}" height="150" rx="12" fill="#fff"/>
    <rect x="${x}" y="${y}" width="6" height="150" rx="3" fill="${t[2]}"/>
    <text x="${x + 24}" y="${y + 40}" font-size="17" font-weight="600" fill="${C.gris}">${t[0]}</text>${cuerpo}`;
  }).join('')}
  <rect x="${mx}" y="${ry}" width="${cw}" height="${rh}" rx="12" fill="#fff"/>
  <text x="${mx + 24}" y="${ry + 40}" font-size="18" font-weight="600" fill="${C.texto}">Desempeño por proceso</text>
  ${[0, 1, 2, 3].map(k => `<line x1="${mx + 24}" x2="${mx + cw - 24}" y1="${ry + 80 + k * (rh - 110) / 3}" y2="${ry + 80 + k * (rh - 110) / 3}" stroke="${C.linea}" stroke-width="1.5"/>`).join('')}
  <path d="${curva(mx + 24, ry + 80, cw - 48, rh - 110, [.32, .38, .35, .5, .56, .62, .6, .74, .82])}" fill="none" stroke="${C.azul}" stroke-width="5" stroke-linecap="round"/>
  <path d="${curva(mx + 24, ry + 80, cw - 48, rh - 110, [.2, .24, .3, .28, .36, .42, .48, .52, .6])}" fill="none" stroke="${C.verde}" stroke-width="5" stroke-linecap="round"/>
  <rect x="${dx}" y="${ry}" width="${dw}" height="${rh}" rx="12" fill="#fff"/>
  <text x="${dx + 24}" y="${ry + 40}" font-size="18" font-weight="600" fill="${C.texto}">Ciclo de Deming</text>
  ${fases.map((f, i) => `<path d="${arco(i)}" fill="none" stroke="${f[1]}" stroke-width="26" stroke-linecap="butt"/>`).join('')}
  <text x="${rcx}" y="${rcy + 12}" text-anchor="middle" font-family="'Source Serif 4', serif" font-weight="700" font-size="34" fill="${C.texto}">PHVA</text>
  ${fases.map((f, i) => {
    const a = -Math.PI / 4 + i * Math.PI / 2, r2 = rr + 46;
    const x = rcx + r2 * Math.cos(a), y = rcy + r2 * Math.sin(a) + 6;
    return `<text x="${x}" y="${y}" text-anchor="${Math.cos(a) > 0 ? 'start' : 'end'}" font-size="16" font-weight="600" fill="${C.gris}">${f[0]}</text>`;
  }).join('')}
</svg>`;
}

// ---------- 2. APQC: mapa de procesos y 58 KPI (Fase 1) ----------
function apqc() {
  const W = 1280, H = 720;
  const px = 70, py = 70, pw = 780, ph = 580;
  const banda = (y, titulo, n, color, chevron) => {
    const bx = px + 150, bw = pw - 150 - 30, gap = 14, w = (bw - gap * (n - 1)) / n, h = 104;
    const cajas = Array.from({ length: n }, (_, i) => {
      const x = bx + i * (w + gap);
      const forma = chevron
        ? `<path d="M${x},${y} h${w - 16} l16,${h / 2} l-16,${h / 2} h-${w - 16} ${i ? `l16,-${h / 2} z` : 'z'}" fill="${color}"/>`
        : `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${color}"/>`;
      return `${forma}<rect x="${x + (chevron && i ? 30 : 16)}" y="${y + 30}" width="${w * 0.48}" height="9" rx="4.5" fill="#fff" opacity=".9"/>
        <rect x="${x + (chevron && i ? 30 : 16)}" y="${y + 52}" width="${w * 0.32}" height="9" rx="4.5" fill="#fff" opacity=".55"/>`;
    }).join('');
    return `<text x="${px + 30}" y="${y + 46}" font-size="17" font-weight="700" fill="${C.texto}">${titulo[0]}</text>
      <text x="${px + 30}" y="${y + 70}" font-size="15" fill="${C.gris}">${titulo[1]}</text>${cajas}`;
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${fondo(W, H, 2)}
  <g filter="url(#s2)"><rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="16" fill="#fff"/></g>
  <text x="${px + 30}" y="${py + 52}" font-family="'Source Serif 4', serif" font-weight="700" font-size="30" fill="${C.texto}">Mapa de procesos institucional</text>
  <text x="${px + 30}" y="${py + 82}" font-size="16" fill="${C.gris}">Marco de referencia APQC · Process Classification Framework</text>
  ${banda(py + 118, ['Estratégicos', 'Dirección'], 3, C.medio, false)}
  ${banda(py + 268, ['Misionales', 'Cadena de valor'], 4, C.azul, true)}
  ${banda(py + 418, ['De soporte', 'Recursos'], 5, '#5E77B8', false)}
  <text x="1010" y="292" text-anchor="middle" font-family="'Source Serif 4', serif" font-weight="700" font-size="190" fill="#fff">58</text>
  <text x="1010" y="346" text-anchor="middle" font-size="30" font-weight="600" fill="#fff">KPI críticos</text>
  <rect x="975" y="372" width="70" height="5" fill="${C.azul}"/>
  ${[['Objetivos SMART', 430], ['Sistema de OKR', 496], ['Un único mapa estándar', 562]].map(([t, y]) =>
    `<rect x="890" y="${y - 32}" width="240" height="46" rx="23" fill="none" stroke="${C.celeste}" stroke-width="2"/>
     <text x="1010" y="${y - 2}" text-anchor="middle" font-size="18" font-weight="600" fill="#fff">${t}</text>`).join('')}
</svg>`;
}

// ---------- 3. BPMN 2.0: un procedimiento modelado (Fase 2) ----------
function bpmn() {
  const W = 1280, H = 720;
  const x0 = 60, y0 = 120, pw = 1160, lh = 170, lab = 54, lane = 150;
  const carriles = [['Solicitante'], ['Mesa de partes'], ['Unidad', 'responsable']];
  const cy = i => y0 + lh * i + lh / 2;
  const TW = 170;
  const tarea = (x, i, t1, t2) => `<rect x="${x}" y="${cy(i) - 44}" width="${TW}" height="88" rx="14" fill="#fff" stroke="${C.texto}" stroke-width="2.5"/>
    <text x="${x + TW / 2}" y="${cy(i) - 4}" text-anchor="middle" font-size="18" font-weight="600" fill="${C.texto}">${t1}</text>
    <text x="${x + TW / 2}" y="${cy(i) + 20}" text-anchor="middle" font-size="18" font-weight="600" fill="${C.texto}">${t2}</text>`;
  const flecha = d => `<path d="${d}" fill="none" stroke="${C.texto}" stroke-width="2.5" stroke-linejoin="round" marker-end="url(#fl)"/>`;
  const xa = x0 + lab + lane, gx = xa + 420, gy = cy(1);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><marker id="fl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.texto}"/></marker>
  <pattern id="r3" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#E4EAF3" stroke-width="1"/></pattern></defs>
  <rect width="${W}" height="${H}" fill="${C.claro}"/><rect width="${W}" height="${H}" fill="url(#r3)"/>
  <rect x="${x0}" y="34" width="150" height="50" rx="8" fill="${C.navy}"/>
  <text x="${x0 + 75}" y="67" text-anchor="middle" font-size="22" font-weight="700" fill="#fff">BPMN 2.0</text>
  <text x="${x0 + 176}" y="56" font-family="'Source Serif 4', serif" font-weight="700" font-size="26" fill="${C.texto}">Procedimiento: atención de una solicitud</text>
  <text x="${x0 + 176}" y="82" font-size="16" fill="${C.gris}">Diagrama de flujo y registro formal por proceso</text>
  <rect x="${x0}" y="${y0}" width="${pw}" height="${lh * 3}" fill="#fff" stroke="${C.texto}" stroke-width="2.5"/>
  <line x1="${x0 + lab}" y1="${y0}" x2="${x0 + lab}" y2="${y0 + lh * 3}" stroke="${C.texto}" stroke-width="2.5"/>
  <text transform="translate(${x0 + 34},${y0 + lh * 1.5}) rotate(-90)" text-anchor="middle" font-size="18" font-weight="700" fill="${C.texto}">Institución</text>
  ${carriles.map((t, i) => `${i ? `<line x1="${x0 + lab}" y1="${y0 + lh * i}" x2="${x0 + pw}" y2="${y0 + lh * i}" stroke="${C.texto}" stroke-width="1.5"/>` : ''}
    <rect x="${x0 + lab}" y="${y0 + lh * i}" width="${lane}" height="${lh}" fill="${i % 2 ? '#F7F9FD' : '#EEF3FB'}"/>
    <line x1="${x0 + lab + lane}" y1="${y0 + lh * i}" x2="${x0 + lab + lane}" y2="${y0 + lh * (i + 1)}" stroke="${C.texto}" stroke-width="1.5"/>
    ${t.map((l, k) => `<text x="${x0 + lab + lane / 2}" y="${cy(i) + 6 + (k - (t.length - 1) / 2) * 22}" text-anchor="middle" font-size="17" font-weight="600" fill="${C.texto}">${l}</text>`).join('')}`).join('')}
  <circle cx="${xa + 44}" cy="${cy(0)}" r="20" fill="#fff" stroke="${C.verde}" stroke-width="3"/>
  ${flecha(`M${xa + 64},${cy(0)} H${xa + 88}`)}
  ${tarea(xa + 90, 0, 'Presenta', 'solicitud')}
  ${flecha(`M${xa + 175},${cy(0) + 44} V${cy(1) - 46}`)}
  ${tarea(xa + 90, 1, 'Registra', 'y revisa')}
  ${flecha(`M${xa + 260},${gy} H${gx - 40}`)}
  <path d="M${gx},${gy - 38} l38,38 l-38,38 l-38,-38 z" fill="#fff" stroke="${C.texto}" stroke-width="2.5"/>
  <path d="M${gx - 14},${gy - 14} l28,28 M${gx + 14},${gy - 14} l-28,28" stroke="${C.texto}" stroke-width="3"/>
  <text x="${gx + 50}" y="${gy + 6}" font-size="16" font-weight="600" fill="${C.gris}">¿Conforme?</text>
  ${flecha(`M${gx},${gy - 38} V${cy(0) + 46}`)}
  <text x="${gx + 10}" y="${cy(0) + 76}" font-size="15" fill="${C.gris}">No</text>
  ${tarea(gx - 85, 0, 'Subsana', 'observaciones')}
  ${flecha(`M${gx - 85},${cy(0)} H${xa + 262}`)}
  ${flecha(`M${gx},${gy + 38} V${cy(2)} H${xa + 478}`)}
  <text x="${gx + 10}" y="${gy + 66}" font-size="15" fill="${C.gris}">Sí</text>
  ${tarea(xa + 480, 2, 'Atiende la', 'solicitud')}
  ${flecha(`M${xa + 650},${cy(2)} H${xa + 698}`)}
  ${tarea(xa + 700, 2, 'Notifica', 'al usuario')}
  ${flecha(`M${xa + 870},${cy(2)} H${xa + 896}`)}
  <circle cx="${xa + 920}" cy="${cy(2)}" r="20" fill="#fff" stroke="${C.rosa}" stroke-width="7"/>
</svg>`;
}

// ---------- 4. KPI: monitoreo de 300 oficinas (Fase 3) ----------
function kpi() {
  const W = 1280, H = 720;
  const cols = 25, filas = 12, t = 22, g = 7, gx = 80, gy = 190;
  // Reparto ilustrativo del estado de cada oficina: la mayoría en meta.
  let s = 7;
  const azar = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const celdas = [];
  for (let f = 0; f < filas; f++) for (let c = 0; c < cols; c++) {
    const r = azar();
    const color = r < 0.78 ? C.verde : r < 0.94 ? C.ambar : C.rosa;
    celdas.push(`<rect x="${gx + c * (t + g)}" y="${gy + f * (t + g)}" width="${t}" height="${t}" rx="4" fill="${color}"/>`);
  }
  const ancho = cols * (t + g) - g;
  const indicadores = ['Tiempo de atención', 'Cumplimiento de plazos', 'Satisfacción del usuario'];
  const tend = [[.3, .36, .34, .46, .52, .58, .66], [.42, .4, .5, .54, .52, .64, .7], [.36, .44, .42, .5, .6, .62, .72]];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${fondo(W, H, 4)}
  <text x="${gx}" y="104" font-family="'Source Serif 4', serif" font-weight="700" font-size="64" fill="#fff">300 oficinas</text>
  <text x="${gx}" y="146" font-size="21" fill="${C.celeste}">Monitoreo integral de KPI estandarizados por proceso</text>
  ${celdas.join('')}
  ${[['En meta', C.verde], ['En observación', C.ambar], ['Fuera de meta', C.rosa]].map(([l, col], i) =>
    `<rect x="${gx + i * 220}" y="${gy + filas * (t + g) + 26}" width="18" height="18" rx="4" fill="${col}"/>
     <text x="${gx + i * 220 + 30}" y="${gy + filas * (t + g) + 41}" font-size="18" fill="#fff">${l}</text>`).join('')}
  <g filter="url(#s4)"><rect x="${gx + ancho + 50}" y="190" width="${W - gx - ancho - 50 - 60}" height="${filas * (t + g) + 50}" rx="14" fill="#fff"/></g>
  ${indicadores.map((n, i) => {
    const x = gx + ancho + 76, y = 236 + i * 128, w = W - gx - ancho - 50 - 60 - 52;
    return `<text x="${x}" y="${y}" font-size="17" font-weight="600" fill="${C.texto}">${n}</text>
      <path d="${curva(x, y + 18, w - 40, 62, tend[i])}" fill="none" stroke="${C.azul}" stroke-width="4" stroke-linecap="round"/>
      <path d="M${x + w - 22},${y + 50} l12,-14 l12,14" fill="none" stroke="${C.verde}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="translate(-6,0)"/>
      ${i < 2 ? `<line x1="${x}" x2="${x + w}" y1="${y + 104}" y2="${y + 104}" stroke="${C.linea}" stroke-width="1.5"/>` : ''}`;
  }).join('')}
</svg>`;
}

// ---------- 5. RPA: automatización de un servicio (Fase 4) ----------
function rpa() {
  const W = 1280, H = 720;
  const nodos = [
    ['Formulario', 'Google Forms', 'form'],
    ['Hoja de cálculo', 'Google Sheets', 'hoja'],
    ['Robot', 'Apps Script · UiPath · Power Automate', 'robot'],
    ['Respuesta', 'Usuario atendido', 'ok']
  ];
  const r = 64, y = 250, x0 = 150, paso = 327;
  const icono = (tipo, cx, cy) => ({
    form: `<rect x="${cx - 22}" y="${cy - 28}" width="44" height="56" rx="5" fill="none" stroke="#fff" stroke-width="3.5"/>
      <path d="M${cx - 12},${cy - 12} h24 M${cx - 12},${cy} h24 M${cx - 12},${cy + 12} h14" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`,
    hoja: `<rect x="${cx - 28}" y="${cy - 24}" width="56" height="48" rx="5" fill="none" stroke="#fff" stroke-width="3.5"/>
      <path d="M${cx - 28},${cy - 8} h56 M${cx - 28},${cy + 8} h56 M${cx - 9},${cy - 24} v48 M${cx + 9},${cy - 24} v48" stroke="#fff" stroke-width="3"/>`,
    robot: `<rect x="${cx - 26}" y="${cy - 18}" width="52" height="40" rx="9" fill="none" stroke="#fff" stroke-width="3.5"/>
      <circle cx="${cx - 11}" cy="${cy + 1}" r="5" fill="#fff"/><circle cx="${cx + 11}" cy="${cy + 1}" r="5" fill="#fff"/>
      <path d="M${cx},${cy - 18} v-12 M${cx - 38},${cy + 2} h12 M${cx + 26},${cy + 2} h12" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy - 33}" r="5" fill="#fff"/>`,
    ok: `<path d="M${cx - 22},${cy + 1} l14,14 l30,-30" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`
  })[tipo];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${fondo(W, H, 5)}
  <defs><marker id="f5" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${C.celeste}"/></marker></defs>
  <text x="80" y="96" font-family="'Source Serif 4', serif" font-weight="700" font-size="44" fill="#fff">Servicio digitalizado y automatizado</text>
  <text x="80" y="134" font-size="20" fill="${C.celeste}">Del trámite manual al flujo automático, en cuatro pasos</text>
  ${nodos.map(([t, sub, tipo], i) => {
    const cx = x0 + i * paso, col = i === 2 ? C.azul : 'rgba(255,255,255,.12)';
    return `${i < 3 ? `<path d="M${cx + r + 14},${y} H${cx + paso - r - 18}" stroke="${C.celeste}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round" marker-end="url(#f5)"/>` : ''}
      <circle cx="${cx}" cy="${y}" r="${r}" fill="${col}" stroke="${i === 2 ? C.azul : C.celeste}" stroke-width="2.5"/>
      ${icono(tipo, cx, y)}
      <text x="${cx}" y="${y + r + 44}" text-anchor="middle" font-size="22" font-weight="700" fill="#fff">${t}</text>
      <text x="${cx}" y="${y + r + 72}" text-anchor="middle" font-size="${i === 2 ? 15 : 17}" fill="${C.celeste}">${sub}</text>`;
  }).join('')}
  <g filter="url(#s5)"><rect x="80" y="476" width="1120" height="180" rx="14" fill="#fff"/></g>
  <text x="112" y="520" font-size="18" font-weight="700" fill="${C.texto}">Tiempo de espera del usuario</text>
  <text x="112" y="572" font-size="17" font-weight="600" fill="${C.gris}">As-Is</text>
  <rect x="200" y="554" width="940" height="24" rx="12" fill="${C.ambar}"/>
  <text x="112" y="624" font-size="17" font-weight="600" fill="${C.gris}">To-Be</text>
  <rect x="200" y="606" width="330" height="24" rx="12" fill="${C.verde}"/>
  <path d="M560,618 h560" stroke="${C.linea}" stroke-width="2" stroke-dasharray="6 8"/>
</svg>`;
}

(async () => {
  fs.mkdirSync(SALIDA, { recursive: true });
  const css = fuentes();
  const navegador = await chromium.launch();
  const escenas = { sigpro: [sigpro, 1600, 924], apqc: [apqc, 1280, 720], bpmn: [bpmn, 1280, 720], kpi: [kpi, 1280, 720], rpa: [rpa, 1280, 720] };
  for (const [nombre, [dibujo, w, h]] of Object.entries(escenas)) {
    const pagina = await navegador.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1.5 });
    await pagina.setContent(`<!doctype html><html><head><style>${css}
      html,body{margin:0}svg{display:block;font-family:"Public Sans",sans-serif}</style></head><body>${dibujo()}</body></html>`);
    await pagina.evaluate(() => document.fonts.ready);
    const destino = path.join(SALIDA, nombre + '.jpg');
    await pagina.screenshot({ path: destino, type: 'jpeg', quality: 88 });
    await pagina.close();
    console.log('Escrito media/impacto/' + nombre + '.jpg (' + Math.round(fs.statSync(destino).size / 1024) + ' KB)');
  }
  await navegador.close();
})();
