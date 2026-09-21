#!/bin/bash
# Serverda: GitHub'dagi so'nggi versiyani saytga tortadi.
set -e
W=/home/imezon/web/roadmap.saydullayevapi.uz/public_html
B=https://raw.githubusercontent.com/SaydullayevQuvonchbek/roadmap/main
for f in index.html assets/style.css assets/data.js assets/app.js assets/scene.js assets/vendor/three.module.min.js api/progress.php; do
  mkdir -p "$W/$(dirname "$f")"
  curl -fsSL "$B/$f?$(date +%s)" -o "$W/$f"
done
chown -R imezon:imezon "$W/index.html" "$W/assets" "$W/api"
echo "yangilandi: $(date) — $(wc -c < "$W/index.html") bayt index.html"
