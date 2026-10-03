#!/bin/sh
# Prepara el video de fondo de «Descripción general» (media/peru.mp4,
# media/peru-720.mp4 y media/peru.jpg) a partir de la toma original en 4K,
# guardada en el release «video-peru» del repositorio.
#
# Para que el bucle no se note, el último segundo se funde con el principio:
# el video publicado dura 11,1 s y su último cuadro empalma con el primero.
#
# Uso, desde la raíz del repositorio: sh herramientas/video/preparar_video_peru.sh
# Requiere curl y ffmpeg con libx264.
set -e
ORIGEN=https://github.com/racionalizacionogpl-coder/CONSULTORA.1/releases/download/video-peru/16214498_3840_2160_30fps.mp4
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
curl -sSL -o "$TMP/original.mp4" "$ORIGEN"

FILTRO="[0:v]trim=start=1:end=12.1,setpts=PTS-STARTPTS,fps=30,format=yuv420p[a];\
[0:v]trim=start=0:end=1,setpts=PTS-STARTPTS,fps=30,format=yuv420p[b];\
[a][b]xfade=transition=fade:duration=1:offset=10.1,scale=1920:1080:flags=lanczos,split=2[hd][x];\
[x]scale=1280:720:flags=lanczos[sd]"

ffmpeg -v error -y -i "$TMP/original.mp4" -filter_complex "$FILTRO" \
  -map "[hd]" -c:v libx264 -preset slow -crf 29 -profile:v high -pix_fmt yuv420p -movflags +faststart -an media/peru.mp4 \
  -map "[sd]" -c:v libx264 -preset slow -crf 30 -profile:v high -pix_fmt yuv420p -movflags +faststart -an media/peru-720.mp4
ffmpeg -v error -y -i media/peru.mp4 -frames:v 1 -vf scale=1280:-1 -q:v 5 media/peru.jpg
ls -l media/peru.mp4 media/peru-720.mp4 media/peru.jpg
