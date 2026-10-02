"""Construye el logo de ROIC & Company en vector.

Las letras salen de los trazos de Montserrat, con el peso, el tamaño, la
línea base y el espaciado de cada línea que fija especificacion.json. Esos
valores se ajustaron contra original.png con ajustar_logo.py.

Uso, desde la raíz del repositorio:

    python3 herramientas/logo/construir_logo.py

Escribe media/roic-logo.svg y media/roic-icono.svg. Requiere
`pip install fonttools uharfbuzz` y descarga Montserrat de Google Fonts la
primera vez (queda en herramientas/logo/fuentes/, que git ignora).
"""
import json
import re
import urllib.request
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.svgLib.path import parse_path
from fontTools.ttLib import TTFont

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parents[1]
FUENTES = AQUI / 'fuentes'
COLOR = '#182E46'
PESOS = (300, 400, 500, 600, 700, 800)
ETIQUETA = 'ROIC &amp; Company · Management &amp; Technology Consulting'

_cache = {}


def descargar_fuentes():
    """Baja los pesos estáticos de Montserrat que falten."""
    FUENTES.mkdir(exist_ok=True)
    if all((FUENTES / f'M{w}.ttf').exists() for w in PESOS):
        return
    url = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@' + ';'.join(map(str, PESOS))
    pedido = urllib.request.Request(url, headers={'User-Agent': 'Wget/1.21'})  # este agente recibe .ttf
    css = urllib.request.urlopen(pedido).read().decode()
    for peso, ttf in re.findall(r'font-weight: (\d+);\s*src: url\((https://[^)]+\.ttf)\)', css):
        destino = FUENTES / f'M{peso}.ttf'
        if not destino.exists():
            destino.write_bytes(urllib.request.urlopen(ttf).read())


def fuente(peso):
    if peso not in _cache:
        ruta = str(FUENTES / f'M{peso}.ttf')
        tt = TTFont(ruta)
        hf = hb.Font(hb.Face(hb.Blob.from_file_path(ruta)))
        _cache[peso] = (tt, hf, tt.getGlyphSet(), tt['head'].unitsPerEm)
    return _cache[peso]


def componer(texto, peso):
    """Glifos y avances de una línea, con el interletrado (kern) de la fuente."""
    tt, hf, _, _ = fuente(peso)
    buf = hb.Buffer()
    buf.add_str(texto)
    buf.guess_segment_properties()
    hb.shape(hf, buf, {'kern': True, 'liga': False})
    orden = tt.getGlyphOrder()
    return [(orden[i.codepoint], p.x_advance, p.x_offset, p.y_offset)
            for i, p in zip(buf.glyph_infos, buf.glyph_positions)]


def tinta(texto, peso, tam, espaciado):
    """Borde izquierdo y derecho de la tinta, en píxeles, con la pluma en x = 0."""
    _, _, gs, upem = fuente(peso)
    s = tam / upem
    x = 0
    izq = der = None
    for nombre, avance, dx, _ in componer(texto, peso):
        bp = BoundsPen(gs)
        gs[nombre].draw(bp)
        if bp.bounds:
            a = x + (bp.bounds[0] + dx) * s
            b = x + (bp.bounds[2] + dx) * s
            izq = a if izq is None else min(izq, a)
            der = b if der is None else max(der, b)
        x += avance * s + espaciado
    return izq, der


def trazo(texto, peso, tam, espaciado, x0, base):
    """Datos `d` de un <path> SVG con la línea de texto dibujada."""
    _, _, gs, upem = fuente(peso)
    s = tam / upem
    x = x0
    partes = []
    for nombre, avance, dx, dy in componer(texto, peso):
        pluma = SVGPathPen(gs, ntos=lambda v: ('%.2f' % v).rstrip('0').rstrip('.'))
        gs[nombre].draw(TransformPen(pluma, (s, 0, 0, -s, x + dx * s, base - dy * s)))
        d = pluma.getCommands()
        if d:
            partes.append(d)
        x += avance * s + espaciado
    return ''.join(partes)


def ajustar(texto, peso, tam, izquierda, derecha):
    """Espaciado entre letras y x inicial para que la tinta ocupe [izquierda, derecha]."""
    n = len(componer(texto, peso))
    a, b = tinta(texto, peso, tam, 0)
    espaciado = ((derecha - izquierda) - (b - a)) / (n - 1)
    a, _ = tinta(texto, peso, tam, espaciado)
    return espaciado, izquierda - a


def trazo_linea(linea):
    esp, x0 = ajustar(linea['text'], linea['w'], linea['size'], linea['left'], linea['right'])
    return trazo(linea['text'], linea['w'], linea['size'], esp, x0, linea['base'])


def svg_lienzo(lineas, ancho=642, alto=270):
    """Logo sobre el mismo lienzo que original.png, para compararlos."""
    d = ''.join(trazo_linea(l) for l in lineas)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {ancho} {alto}" width="{ancho}" height="{alto}">'
            f'<path fill="{COLOR}" d="{d}"/></svg>')


def limites(d):
    bp = BoundsPen(None)
    parse_path(d, bp)
    return bp.bounds


def construir():
    descargar_fuentes()
    lineas = json.loads((AQUI / 'especificacion.json').read_text(encoding='utf-8'))
    media = RAIZ / 'media'

    # Logo completo, recortado a la tinta con 6 px de margen.
    d = ''.join(trazo_linea(l) for l in lineas)
    x0, y0, x1, y1 = limites(d)
    m = 6
    vb = (round(x0 - m, 2), round(y0 - m, 2), round(x1 - x0 + 2 * m, 2), round(y1 - y0 + 2 * m, 2))
    logo = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb[0]} {vb[1]} {vb[2]} {vb[3]}" '
            f'width="{vb[2]}" height="{vb[3]}" role="img" aria-label="{ETIQUETA}">'
            f'<title>{ETIQUETA}</title><path fill="{COLOR}" d="{d}"/></svg>')
    (media / 'roic-logo.svg').write_text(logo, encoding='utf-8')

    # Ícono: la palabra ROIC centrada en un cuadrado blanco.
    di = trazo_linea(lineas[0])
    a, b, c, e = limites(di)
    lado = (c - a) * 1.16
    cx, cy = (a + c) / 2, (b + e) / 2
    icono = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{cx - lado / 2:.2f} {cy - lado / 2:.2f} {lado:.2f} {lado:.2f}">'
             f'<rect x="{cx - lado / 2:.2f}" y="{cy - lado / 2:.2f}" width="{lado:.2f}" height="{lado:.2f}" '
             f'rx="{lado * 0.12:.2f}" fill="#FFFFFF"/><path fill="{COLOR}" d="{di}"/></svg>')
    (media / 'roic-icono.svg').write_text(icono, encoding='utf-8')
    print('Escrito media/roic-logo.svg y media/roic-icono.svg')


if __name__ == '__main__':
    construir()
