#!/bin/sh
# Prepara los videos de las regiones que se suceden en la portada
# («Descripción general») a partir de los originales guardados en los
# releases del repositorio:
#   - video-peru:      la toma de Lima en 4K;
#   - videos-regiones: un video por región, con el nombre de la región
#                      (puno.mp4, cusco.mp4, la-libertad.mp4…).
#
# Por cada región deja en media/regiones/:
#   <region>-720.mp4  1280 × 720, para celulares (y para computadoras si el
#                     original no llega a 1080 líneas);
#   <region>.mp4      1920 × 1080, para computadoras, solo si el original
#                     tiene al menos 1080 líneas;
#   <region>.jpg      primer cuadro, la imagen que se ve mientras carga.
# Los videos van sin sonido y se recortan a 16:9 si hace falta.
#
# Uso, desde la raíz del repositorio:
#   sh herramientas/video/preparar_videos_regiones.sh          todas las regiones
#   sh herramientas/video/preparar_videos_regiones.sh puno     solo una
# Requiere curl, python3 y ffmpeg con libx264. Después de agregar una región,
# súmela a la lista REGIONES de index.html.
set -e
REPO=racionalizacionogpl-coder/CONSULTORA.1
DESTINO=media/regiones
SOLO=$1
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$DESTINO"

# «nombre-region url» por cada video de los dos releases. Lima viene del
# release video-peru; el nombre se pasa a minúsculas y sin tildes.
curl -sS "https://api.github.com/repos/$REPO/releases" | python3 -c '
import json, sys, unicodedata
for r in json.load(sys.stdin):
    if r["draft"] or r["tag_name"] not in ("video-peru", "videos-regiones"):
        continue
    for a in r["assets"]:
        if not a["name"].lower().endswith((".mp4", ".mov", ".m4v")):
            continue
        if r["tag_name"] == "video-peru":
            nombre = "lima"
        else:
            base = a["name"].rsplit(".", 1)[0]
            base = unicodedata.normalize("NFKD", base).encode("ascii", "ignore").decode()
            nombre = "-".join(base.lower().replace("_", " ").split())
        print(nombre, a["browser_download_url"])
' > "$TMP/lista"

while read -r nombre url; do
  [ -n "$SOLO" ] && [ "$SOLO" != "$nombre" ] && continue
  echo "== $nombre"
  curl -sSL -o "$TMP/original" "$url" </dev/null
  alto=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$TMP/original")
  # Escala, recorta a 16:9 y suaviza un poco el reescalado de originales pequeños.
  recorte() { echo "scale=$1:$2:force_original_aspect_ratio=increase:flags=lanczos,crop=$1:$2,fps=30,format=yuv420p"; }
  nitidez=""
  [ "$alto" -lt 720 ] && nitidez=",unsharp=5:5:0.5"
  ffmpeg -nostdin -v error -y -i "$TMP/original" -vf "$(recorte 1280 720)$nitidez" \
    -c:v libx264 -preset slow -crf 28 -profile:v high -movflags +faststart -an "$DESTINO/$nombre-720.mp4"
  if [ "$alto" -ge 1080 ]; then
    ffmpeg -nostdin -v error -y -i "$TMP/original" -vf "$(recorte 1920 1080)" \
      -c:v libx264 -preset slow -crf 29 -profile:v high -movflags +faststart -an "$DESTINO/$nombre.mp4"
    ffmpeg -nostdin -v error -y -i "$DESTINO/$nombre.mp4" -frames:v 1 -vf scale=1280:-1 -q:v 5 "$DESTINO/$nombre.jpg"
  else
    rm -f "$DESTINO/$nombre.mp4"
    ffmpeg -nostdin -v error -y -i "$DESTINO/$nombre-720.mp4" -frames:v 1 -q:v 5 "$DESTINO/$nombre.jpg"
  fi
done < "$TMP/lista"
ls -l "$DESTINO"
