#!/bin/bash
# Serverda bir marta: progress API'ni o'rnatadi va sinxronlash kalitini chiqaradi.
set -e
W=/home/imezon/web/roadmap.saydullayevapi.uz
B=https://raw.githubusercontent.com/SaydullayevQuvonchbek/roadmap/main
mkdir -p "$W/private" "$W/public_html/api"
if [ ! -s "$W/private/roadmap.key" ]; then
  head -c 64 /dev/urandom | base64 | tr -dc 'a-z0-9' | head -c 24 > "$W/private/roadmap.key"; echo >> "$W/private/roadmap.key"
fi
chown imezon:imezon "$W/private/roadmap.key"; chmod 640 "$W/private/roadmap.key"
curl -fsSL "$B/api/progress.php?$(date +%s)" -o "$W/public_html/api/progress.php"
chown -R imezon:imezon "$W/public_html/api"
KEY=$(tr -d '\n' < "$W/private/roadmap.key")
echo "== PHP: $(php -v 2>/dev/null | head -1 || echo 'php topilmadi')"
echo "== API testi (kutilgan: {} yoki {\"p\":...}):"
curl -s -H "X-Key: $KEY" "https://roadmap.saydullayevapi.uz/api/progress.php"; echo
echo "== Noto'g'ri kalit testi (kutilgan: unauthorized):"
curl -s -H "X-Key: xxx" "https://roadmap.saydullayevapi.uz/api/progress.php"; echo
echo
echo "SINXRONLASH KALITI:  $KEY"
echo "Saytda chap paneldagi 'Sinxronlash' maydoniga shu kalitni kiriting -> Ulash."
