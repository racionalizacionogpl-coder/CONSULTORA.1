"""Prepara las fotos de Oriol Romero Saavedra a partir de originales/romero.jpg.

  media/equipo/romero-recorte.png  figura sin fondo, de la cintura hacia arriba,
                                      para la cabecera del perfil;
  media/equipo/romero.jpg          foto cuadrada sobre fondo claro para las tarjetas.

El original (2000 × 2000) llega hasta la cadera: el recorte del perfil se corta
a la altura de la cintura (BUSTO) y la foto de las tarjetas se encuadra en la
cabeza y los hombros (CUADRO).

Uso, desde la raíz del repositorio:
  pip install "rembg[cpu]" opencv-python-headless
  python3 herramientas/fotos/recortar_romero.py
"""
import os
import cv2
import numpy as np
from PIL import Image
from rembg import remove, new_session

AQUI = os.path.dirname(os.path.abspath(__file__))
MEDIA = os.path.join(AQUI, '..', '..', 'media', 'equipo')
BUSTO = 1450                    # línea de corte del recorte, en píxeles del original
CUADRO = (560, 0, 1380, 820)    # cabeza y hombros para las tarjetas

foto = Image.open(os.path.join(AQUI, 'originales', 'romero.jpg')).convert('RGB')

# 1. Quitar el fondo de la oficina.
rgba = np.array(remove(foto, session=new_session('u2net_human_seg')))
alfa = rgba[:, :, 3].astype(np.float32)
# Se aprieta la máscara unos píxeles para no arrastrar el halo gris del fondo.
alfa = cv2.erode(alfa, np.ones((5, 5), np.uint8), iterations=2)
alfa = cv2.GaussianBlur(alfa, (5, 5), 0)
rgba[:, :, 3] = np.clip(alfa, 0, 255).astype(np.uint8)
figura = Image.fromarray(rgba)

# 2. Recorte del perfil: de la cintura hacia arriba, con el corte inferior recto.
busto = figura.crop((0, 0, figura.width, BUSTO))
busto = busto.crop(busto.getbbox())
busto.thumbnail((820, 820), Image.LANCZOS)
busto.save(os.path.join(MEDIA, 'romero-recorte.png'), optimize=True)

# 3. Foto cuadrada sobre el fondo claro de las tarjetas.
fondo = Image.new('RGB', foto.size, '#DCE3EA')
fondo.paste(figura, (0, 0), figura)
fondo.crop(CUADRO).resize((600, 600), Image.LANCZOS).save(os.path.join(MEDIA, 'romero.jpg'), quality=88, optimize=True, progressive=True)
print('Listo: media/equipo/romero-recorte.png y media/equipo/romero.jpg')
