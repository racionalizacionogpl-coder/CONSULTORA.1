"""Prepara las fotos de Alvaro Rojas Carnero a partir de originales/rojas.jpg.

  media/equipo/rojas-recorte.png  busto sin fondo para la cabecera del perfil;
  media/equipo/rojas.jpg          foto cuadrada sobre fondo claro para las tarjetas.

En la foto original hay un micrófono delante del saco: se borra rellenando su
silueta con la textura de alrededor (inpainting) antes de quitar el fondo.
Las coordenadas son propias de esta foto; para otra persona se copian este
archivo y se ajustan el recorte y las zonas a limpiar.

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

im = cv2.imread(os.path.join(AQUI, 'originales', 'rojas.jpg'))

# 1. Borrar el micrófono: la cabeza y el brazo que cruza el saco.
mascara = np.zeros(im.shape[:2], np.uint8)
cv2.circle(mascara, (1186, 1021), 46, 255, -1)
brazo = np.array([(1205, 1038), (1250, 1052), (1325, 1066), (1400, 1078), (1475, 1095),
                  (1550, 1117), (1630, 1140), (1700, 1175), (1760, 1215)], np.int32)
cv2.polylines(mascara, [brazo], False, 255, 24)
limpia = cv2.inpaint(im, mascara, 10, cv2.INPAINT_TELEA)

# 2. Quitar el fondo del busto, que termina justo encima de la laptop.
x0, y0, x1, y1 = 470, 400, 1600, 1180
busto = Image.fromarray(cv2.cvtColor(limpia[y0:y1, x0:x1], cv2.COLOR_BGR2RGB))
rgba = np.array(remove(busto, session=new_session('u2net_human_seg')))

# 3. Restos del sillón: a la derecha del brazo y el borde gris junto al cuello.
h, w = rgba.shape[:2]
yy, xx = np.mgrid[0:h, 0:w]
alfa = rgba[:, :, 3].astype(np.float32)
alfa[(yy >= 660) & (xx > 1050 + (yy - 675) * 30 / 75)] = 0
hsv = cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2HSV)
cuello = (xx >= 245) & (xx <= 325) & (yy >= 420) & (yy <= 540)
alfa[cuello & (hsv[:, :, 1] < 40) & (hsv[:, :, 2] > 90)] = 0
suave = cv2.GaussianBlur(alfa, (5, 5), 0)
bordes = ((xx >= 235) & (xx <= 335) & (yy >= 410) & (yy <= 550)) | ((yy >= 650) & (xx > 1030))
alfa[bordes] = suave[bordes]
rgba[:, :, 3] = np.clip(alfa, 0, 255).astype(np.uint8)
recorte = Image.fromarray(rgba)

# 4. Guardar: el recorte sin márgenes transparentes y la foto cuadrada.
recorte.crop(recorte.getbbox()).save(os.path.join(MEDIA, 'rojas-recorte.png'), optimize=True)
fondo = Image.new('RGB', (680, 680), '#DCE3EA')
cuadro = recorte.crop((120, 20, 800, 700))
fondo.paste(cuadro, (0, 0), cuadro)
fondo.resize((600, 600), Image.LANCZOS).save(os.path.join(MEDIA, 'rojas.jpg'), quality=86, optimize=True, progressive=True)
print('Listo: media/equipo/rojas-recorte.png y media/equipo/rojas.jpg')
