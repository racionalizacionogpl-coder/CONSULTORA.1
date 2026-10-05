"""Prepara las fotos de Alvaro Rojas Carnero a partir de originales/rojas.png.

  media/equipo/rojas-recorte.png  figura sin fondo para la cabecera del perfil;
  media/equipo/rojas.jpg          foto cuadrada sobre fondo claro para las tarjetas.

Para otra persona se copia este archivo y se ajusta el encuadre de la foto
cuadrada (CUADRO).

Uso, desde la raíz del repositorio:
  pip install "rembg[cpu]" opencv-python-headless
  python3 herramientas/fotos/recortar_rojas.py
La primera vez rembg descarga su modelo (unos 170 MB).
"""
import os
import cv2
import numpy as np
from PIL import Image
from rembg import remove, new_session

AQUI = os.path.dirname(os.path.abspath(__file__))
MEDIA = os.path.join(AQUI, '..', '..', 'media', 'equipo')
CUADRO = (150, 10, 470, 330)   # cabeza y hombros, en píxeles del original (620 × 620)

foto = Image.open(os.path.join(AQUI, 'originales', 'rojas.png')).convert('RGB')

# 1. Quitar el fondo; el borde inferior de la foto corta el cuerpo y se deja recto.
rgba = np.array(remove(foto, session=new_session('u2net_human_seg')))
alfa = rgba[:, :, 3].astype(np.float32)
# Bordes suaves pero sin halo: se aprieta un poco la máscara antes de suavizarla.
alfa = cv2.erode(alfa, np.ones((3, 3), np.uint8))
alfa = cv2.GaussianBlur(alfa, (3, 3), 0)
rgba[:, :, 3] = np.clip(alfa, 0, 255).astype(np.uint8)
recorte = Image.fromarray(rgba)

# 2. Guardar: el recorte sin márgenes transparentes y la foto cuadrada.
recorte.crop(recorte.getbbox()).save(os.path.join(MEDIA, 'rojas-recorte.png'), optimize=True)
fondo = Image.new('RGB', foto.size, '#DCE3EA')
fondo.paste(recorte, (0, 0), recorte)
fondo.crop(CUADRO).resize((600, 600), Image.LANCZOS).save(os.path.join(MEDIA, 'rojas.jpg'), quality=88, optimize=True, progressive=True)
print('Listo: media/equipo/rojas-recorte.png y media/equipo/rojas.jpg')
