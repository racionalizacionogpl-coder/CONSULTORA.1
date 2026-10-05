"""Prepara las fotos del equipo a partir de los originales de originales/.

Por cada integrante deja en media/equipo/:
  <id>-recorte.webp  figura sin fondo para la cabecera de su perfil, a la
                     resolución completa del original para que se vea nítida
                     aun con el navegador ampliado al 400 %; WebP con
                     transparencia, mucho más liviano que un PNG;
  <id>.jpg           foto cuadrada de 800 × 800 sobre fondo claro para las
                     tarjetas del equipo, encuadrada en la cabeza y los hombros.

En FOTOS, por integrante: el archivo original, la línea (en píxeles del
original) donde se corta el recorte del perfil y el encuadre de la foto
cuadrada (izquierda, arriba, derecha, abajo).

Uso, desde la raíz del repositorio:
  pip install "rembg[cpu]" opencv-python-headless
  python3 herramientas/fotos/preparar_fotos.py            todos
  python3 herramientas/fotos/preparar_fotos.py rojas      solo uno
La primera vez rembg descarga su modelo (unos 170 MB).
"""
import os
import sys
import cv2
import numpy as np
from PIL import Image
from rembg import remove, new_session

AQUI = os.path.dirname(os.path.abspath(__file__))
MEDIA = os.path.join(AQUI, '..', '..', 'media', 'equipo')

FOTOS = {
    # José Antonio: cuerpo entero sobre fondo gris; el perfil se corta encima del cinturón.
    'chumacero': ('chumacero.jpg', 1400, (540, 40, 1320, 820)),
    # Alvaro: hasta la cadera sobre fondo blanco; el perfil usa la foto entera.
    'rojas':     ('rojas.jpg',     2000, (580, 40, 1400, 860)),
    # Oriol: hasta la cadera, fondo de oficina; el perfil se corta a la cintura.
    'romero':    ('romero.jpg',    1450, (560, 0, 1380, 820)),
}

sesion = new_session('u2net_human_seg')


def preparar(id_, original, busto_hasta, cuadro):
    foto = Image.open(os.path.join(AQUI, 'originales', original)).convert('RGB')

    # 1. Quitar el fondo. La máscara se aprieta unos píxeles para no arrastrar el
    #    halo del fondo y se suaviza para que el borde no se vea dentado.
    rgba = np.array(remove(foto, session=sesion))
    alfa = rgba[:, :, 3].astype(np.float32)
    alfa = cv2.erode(alfa, np.ones((5, 5), np.uint8), iterations=2)
    alfa = cv2.GaussianBlur(alfa, (5, 5), 0)
    rgba[:, :, 3] = np.clip(alfa, 0, 255).astype(np.uint8)
    figura = Image.fromarray(rgba)

    # 2. Recorte del perfil, sin reducirlo, con el corte inferior recto.
    busto = figura.crop((0, 0, figura.width, busto_hasta))
    busto = busto.crop(busto.getbbox())
    busto.save(os.path.join(MEDIA, id_ + '-recorte.webp'), quality=90, alpha_quality=100, method=6)

    # 3. Foto cuadrada sobre el fondo claro de las tarjetas.
    fondo = Image.new('RGB', foto.size, '#DCE3EA')
    fondo.paste(figura, (0, 0), figura)
    fondo.crop(cuadro).resize((800, 800), Image.LANCZOS).save(
        os.path.join(MEDIA, id_ + '.jpg'), quality=88, optimize=True, progressive=True)
    print('Listo: media/equipo/%s-recorte.webp (%d × %d) y media/equipo/%s.jpg' % (id_, busto.width, busto.height, id_))


for id_ in (sys.argv[1:] or FOTOS):
    preparar(id_, *FOTOS[id_])
