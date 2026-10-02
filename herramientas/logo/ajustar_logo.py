"""Busca el peso, el tamaño y la línea base de cada línea del logo.

Dibuja cada combinación con renderizar.js y la compara píxel a píxel con
original.png (la imagen que entregó la empresa). Muestra las mejores
combinaciones; los valores elegidos se copian a especificacion.json.

Uso, desde la raíz del repositorio:

    python3 herramientas/logo/ajustar_logo.py roic
    python3 herramientas/logo/ajustar_logo.py company
    python3 herramientas/logo/ajustar_logo.py eslogan

Requiere ImageMagick (`compare`, `convert`) y Node con Playwright.
"""
import itertools
import json
import subprocess
import sys
import tempfile
from pathlib import Path

from construir_logo import AQUI, descargar_fuentes, svg_lienzo

# Bordes de la tinta medidos en original.png y zona que se compara (x, y, ancho, alto).
LINEAS = {
    'roic': dict(text='ROIC', left=143.2, right=520.0, zona=(130, 10, 400, 125),
                 rejilla=dict(w=[500, 600, 700], size=[147, 148, 149, 150, 151], base=[123.2, 123.6, 124.0])),
    'company': dict(text='& Company', left=95.2, right=567.8, zona=(85, 140, 490, 85),
                    rejilla=dict(w=[400, 500, 600], size=[79.5, 80.5, 81.5, 82.5], base=[202.6, 202.9, 203.2])),
    'eslogan': dict(text='MANAGEMENT & TECHNOLOGY CONSULTING', left=37.6, right=623.6, zona=(30, 234, 600, 26),
                    rejilla=dict(w=[500, 600, 700], size=[22.9, 23.4, 23.9, 24.4], base=[254.8, 255.1, 255.4])),
}


def main(clave):
    descargar_fuentes()
    linea = LINEAS[clave]
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        original = tmp / 'original-gris.png'
        subprocess.run(['convert', str(AQUI / 'original.png'), '-alpha', 'remove', '-background', 'white',
                        '-colorspace', 'Gray', str(original)], check=True)
        trabajos, combinaciones = [], []
        r = linea['rejilla']
        for i, (w, tam, base) in enumerate(itertools.product(r['w'], r['size'], r['base'])):
            spec = [dict(text=linea['text'], w=w, size=tam, left=linea['left'], right=linea['right'], base=base)]
            svg, png = tmp / f'{i}.svg', tmp / f'{i}.png'
            svg.write_text(svg_lienzo(spec), encoding='utf-8')
            trabajos.append([str(svg), str(png)])
            combinaciones.append((w, tam, base))
        (tmp / 'trabajos.json').write_text(json.dumps(trabajos))
        subprocess.run(['node', str(AQUI / 'renderizar.js'), str(tmp / 'trabajos.json')], check=True)

        x, y, ancho, alto = linea['zona']
        resultados = []
        for (_, png), comb in zip(trabajos, combinaciones):
            salida = subprocess.run(['compare', '-metric', 'RMSE', f'{png}[{ancho}x{alto}+{x}+{y}]',
                                     f'{original}[{ancho}x{alto}+{x}+{y}]', 'null:'],
                                    capture_output=True, text=True).stderr
            resultados.append((float(salida.split('(')[1].split(')')[0]), comb))
    print(f'Mejores combinaciones para «{linea["text"]}» (error, peso, tamaño, línea base):')
    for error, (w, tam, base) in sorted(resultados)[:6]:
        print(f'  {error:.4f}  peso {w}  tamaño {tam}  base {base}')


if __name__ == '__main__':
    if len(sys.argv) != 2 or sys.argv[1] not in LINEAS:
        sys.exit('Uso: ajustar_logo.py ' + '|'.join(LINEAS))
    main(sys.argv[1])
