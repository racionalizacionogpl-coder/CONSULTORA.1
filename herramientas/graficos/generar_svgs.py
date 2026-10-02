"""Genera los dos gráficos SVG de servicios.html.

- La rueda de Deming sobre la pendiente de la madurez (portada): cuatro
  segmentos PHVA con sus nombres sobre arcos, la cuña del estándar
  documentado y los niveles N1 a N5 en la rampa.
- El kipu (sección Experiencia): cada cuerda guarda una cifra del proyecto
  con nudos simples para millares, centenas y decenas, y un nudo largo para
  las unidades.

Los colores no van en el SVG: los ponen las clases (.w-*, .k-*, .c-k*, .f-k*)
desde la hoja de estilos de servicios.html.

Uso, desde la raíz del repositorio:

    python3 herramientas/graficos/generar_svgs.py            # escribe salida/
    python3 herramientas/graficos/generar_svgs.py --comparar # además los compara con servicios.html
"""
import math
import sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parents[1]


def f(v):
    return f'{v:.1f}'.rstrip('0').rstrip('.')


def rueda():
    W, H = 560, 460
    A0, A1 = (10, 440), (550, 170)                       # extremos de la rampa
    L = math.hypot(A1[0] - A0[0], A1[1] - A0[1])
    d = ((A1[0] - A0[0]) / L, (A1[1] - A0[1]) / L)       # dirección de la rampa
    n = (d[1], -d[0])
    if n[1] > 0:
        n = (-n[0], -n[1])                               # normal hacia arriba
    R, RI, s = 122, 58, 330                              # radio exterior, interior, apoyo
    P = (A0[0] + s * d[0], A0[1] + s * d[1])
    C = (P[0] + R * n[0], P[1] + R * n[1])               # centro de la rueda

    def en(s, off=0):
        return (A0[0] + s * d[0] + off * n[0], A0[1] + s * d[1] + off * n[1])

    ang = math.degrees(math.atan2(d[1], d[0]))
    out = ['<svg class="wheel" viewBox="0 0 %d %d" role="img" aria-labelledby="wheel-t wheel-d">' % (W, H),
           '<title id="wheel-t">La rueda de Deming sube la pendiente de la madurez</title>',
           '<desc id="wheel-d">Rueda dividida en cuatro fases: Documentar (Planificar), Procedimentar (Hacer), '
           'Medir (Verificar) y Mejorar (Actuar). Una cuña llamada estándar documentado impide que la rueda '
           'retroceda por la pendiente, marcada con los niveles de madurez 1 a 5.</desc>']
    out.append(f'<polygon class="w-ground" points="{f(A0[0])},{f(A0[1])} {f(A1[0])},{f(A1[1])} {W},{f(A1[1])} {W},{H} 0,{H} 0,{f(A0[1])}"/>')
    out.append(f'<line class="w-ramp" x1="{f(A0[0])}" y1="{f(A0[1])}" x2="{f(A1[0])}" y2="{f(A1[1])}"/>')
    for i, ss in enumerate([60, 165, 270, 395, 500]):  # niveles de madurez
        a, b, t = en(ss), en(ss, -10), en(ss, -26)
        out.append(f'<line class="w-tick" x1="{f(a[0])}" y1="{f(a[1])}" x2="{f(b[0])}" y2="{f(b[1])}"/>')
        out.append(f'<text class="w-lvl" x="{f(t[0])}" y="{f(t[1])}" transform="rotate({f(ang)} {f(t[0])} {f(t[1])})" text-anchor="middle">N{i + 1}</text>')
    t = en(452, -44)
    out.append(f'<text class="w-ramp-l" x="{f(t[0])}" y="{f(t[1])}" transform="rotate({f(ang)} {f(t[0])} {f(t[1])})" text-anchor="middle">MADUREZ DE LA GESTIÓN →</text>')
    # La cuña toca la rueda: su cara vertical queda a la distancia en que la rueda está h px sobre la rampa.
    h = 54
    sw = math.sqrt(R * R - (R - h) ** 2) + 2
    B2, Ap, B1 = en(s - sw), en(s - sw, h), en(s - sw - 92)
    out.append(f'<polygon class="w-wedge" points="{f(B1[0])},{f(B1[1])} {f(B2[0])},{f(B2[1])} {f(Ap[0])},{f(Ap[1])}"/>')
    t = en(s - sw - 40, -44)
    out.append(f'<text class="w-wedge-l" x="{f(t[0])}" y="{f(t[1])}" transform="rotate({f(ang)} {f(t[0])} {f(t[1])})" text-anchor="middle">CUÑA · ESTÁNDAR DOCUMENTADO</text>')
    # Anillo punteado con flechas que gira (CSS), recortado para que no cruce la rampa.
    out.append(f'<g clip-path="url(#w-above)"><g class="w-ring"><circle cx="{f(C[0])}" cy="{f(C[1])}" r="{R + 16}" class="w-ring-c"/>')
    for k in range(4):
        a = math.radians(-90 + k * 90 + 45 - 8)
        x, y = C[0] + (R + 16) * math.cos(a), C[1] + (R + 16) * math.sin(a)
        out.append(f'<path class="w-chev" d="M -5 -5 L 2 0 L -5 5" transform="translate({f(x)} {f(y)}) rotate({f(math.degrees(a) + 90)})"/>')
    out.append('</g></g>')
    fases = [('Documentar', 'Planificar', 'p1', -90), ('Procedimentar', 'Hacer', 'p2', 0),
             ('Medir', 'Verificar', 'p3', 90), ('Mejorar', 'Actuar', 'p4', 180)]

    def pt(r, a):
        a = math.radians(a)
        return (C[0] + r * math.cos(a), C[1] + r * math.sin(a))

    for nombre, verbo, cls, a0 in fases:
        a1, a2 = a0 + 1.2, a0 + 90 - 1.2
        o1, o2, i2, i1 = pt(R, a1), pt(R, a2), pt(RI, a2), pt(RI, a1)
        out.append(f'<path class="w-seg {cls}" d="M {f(o1[0])} {f(o1[1])} A {R} {R} 0 0 1 {f(o2[0])} {f(o2[1])} '
                   f'L {f(i2[0])} {f(i2[1])} A {RI} {RI} 0 0 0 {f(i1[0])} {f(i1[1])} Z"/>')
    # Arcos para los textos: arriba se leen en sentido horario; abajo, al revés, para que no queden de cabeza.
    defs = ['<defs><clipPath id="w-above"><polygon points="0,0 560,0 560,170 550,170 10,440 0,440"/></clipPath>']
    for i, (_, _, _, a0) in enumerate(fases):
        arriba = a0 in (-90, 180)
        for j in range(2):
            r = [97, 73][j] if arriba else [104, 80][j]
            a1, a2 = a0 + 6, a0 + 84
            p1, p2, giro = (pt(r, a1), pt(r, a2), 1) if arriba else (pt(r, a2), pt(r, a1), 0)
            defs.append(f'<path id="wp{i}{j}" d="M {f(p1[0])} {f(p1[1])} A {r} {r} 0 0 {giro} {f(p2[0])} {f(p2[1])}"/>')
    defs.append('</defs>')
    out.insert(3, ''.join(defs))
    for i, (nombre, verbo, _, _) in enumerate(fases):
        out.append(f'<text class="w-name"><textPath href="#wp{i}0" startOffset="50%" text-anchor="middle">{nombre.upper()}</textPath></text>')
        out.append(f'<text class="w-verb"><textPath href="#wp{i}1" startOffset="50%" text-anchor="middle">{verbo}</textPath></text>')
    out.append(f'<circle class="w-hub" cx="{f(C[0])}" cy="{f(C[1])}" r="{RI - 6}"/>')
    out.append(f'<text class="w-hub-t" x="{f(C[0])}" y="{f(C[1] + 2)}" text-anchor="middle">PHVA</text>')
    out.append(f'<text class="w-hub-s" x="{f(C[0])}" y="{f(C[1] + 20)}" text-anchor="middle">DEMING</text>')
    out.append('</svg>')
    return '\n'.join(out)


def kipu():
    KW, KH = 560, 360
    cuerdas = [(16, 'k1'), (20, 'k2'), (2823, 'k3'), (108, 'k4')]  # en el orden de las cuatro fases
    xs = [70, 210, 350, 490]
    ys = {1000: 78, 100: 142, 10: 212, 1: 282}                      # altura de cada orden de magnitud
    o = [f'<svg class="kipu-svg" viewBox="0 0 {KW} {KH}" aria-hidden="true">',
         '<path class="k-main" d="M 8 30 Q 280 46 552 30"/>']
    for pv, y in ys.items():
        o.append(f'<line class="k-guide" x1="0" y1="{y}" x2="{KW}" y2="{y}"/>')
        o.append(f'<text class="k-pv" x="0" y="{y - 6}">{ {1000: "×1000", 100: "×100", 10: "×10", 1: "×1"}[pv] }</text>')
    for (num, cls), x in zip(cuerdas, xs):
        arriba = 30 + 16 * (1 - ((x - 280) / 272) ** 2)              # punto sobre la cuerda principal
        o.append(f'<path class="k-cord c-{cls}" d="M {x} {f(arriba)} C {x + 3} 120, {x - 3} 230, {x} 330"/>')
        for dx in (-5, 0, 5):
            o.append(f'<line class="k-tassel c-{cls}" x1="{x}" y1="328" x2="{x + dx}" y2="346"/>')
        digitos = {1000: num // 1000 % 10, 100: num // 100 % 10, 10: num // 10 % 10, 1: num % 10}
        for pv, y in ys.items():
            dg = digitos[pv]
            if (pv == 1000 and num < 1000) or dg == 0:
                continue
            if pv != 1:                                               # nudos simples
                sp = 9.5
                y0 = y - (dg - 1) * sp / 2
                for k in range(dg):
                    o.append(f'<circle class="k-knot f-{cls}" cx="{x}" cy="{f(y0 + k * sp)}" r="5"/>')
            elif dg == 1:                                             # el 1 es un nudo en ocho
                o.append(f'<circle class="k-knot f-{cls}" cx="{x}" cy="{y - 5}" r="4.6"/><circle class="k-knot f-{cls}" cx="{x}" cy="{y + 4}" r="4.6"/>')
            else:                                                     # nudo largo con tantas vueltas como unidades
                hh = dg * 5.5 + 6
                o.append(f'<rect class="k-knot f-{cls}" x="{x - 6}" y="{f(y - hh / 2)}" width="12" height="{f(hh)}" rx="6"/>')
                for k in range(dg):
                    yy = y - hh / 2 + 3 + 5.5 * k + 2.75
                    o.append(f'<line class="k-turn" x1="{x - 5}" y1="{f(yy + 2)}" x2="{x + 5}" y2="{f(yy - 2)}"/>')
    o.append('</svg>')
    return '\n'.join(o)


def main():
    salida = AQUI / 'salida'
    salida.mkdir(exist_ok=True)
    graficos = {'rueda-deming.svg': rueda(), 'kipu.svg': kipu()}
    for nombre, svg in graficos.items():
        (salida / nombre).write_text(svg, encoding='utf-8')
        print('Escrito herramientas/graficos/salida/' + nombre)
    if '--comparar' in sys.argv:
        pagina = (RAIZ / 'servicios.html').read_text(encoding='utf-8')
        for nombre, svg in graficos.items():
            print(('igual' if svg in pagina else 'DISTINTO') + ' al que está en servicios.html: ' + nombre)


if __name__ == '__main__':
    main()
