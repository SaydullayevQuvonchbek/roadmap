#!/bin/bash
# Serverda: GitHub'dagi so'nggi versiyani saytga tortadi.
set -e
W=/home/imezon/web/roadmap.saydullayevapi.uz/public_html
B=https://raw.githubusercontent.com/SaydullayevQuvonchbek/roadmap/main
for f in index.html assets/style.css assets/data.js assets/app.js assets/scene.js assets/vendor/three.module.min.js api/index.php; do
  mkdir -p "$W/$(dirname "$f")"
  curl -fsSL "$B/$f?$(date +%s)" -o "$W/$f"
done
rm -f "$W/api/progress.php"
chown -R imezon:imezon "$W/index.html" "$W/assets" "$W/api"
mkdir -p /var/www/roadmap
curl -fsSL "$B/tools/admin.php?$(date +%s)" -o /var/www/roadmap/admin.php
P=/home/imezon/web/roadmap.saydullayevapi.uz/private; mkdir -p "$P"; chown imezon:imezon "$P"; chmod 750 "$P"
echo "PHP: $(php -v 2>/dev/null | head -1 || echo 'php CLI topilmadi')"
php -m 2>/dev/null | grep -qi pdo_sqlite && echo "SQLite: OK" || echo "SQLite: YO'Q — apt install -y php-sqlite3 (yoki php8.x-sqlite3) va systemctl restart php*-fpm"
echo "API testi: $(curl -s https://roadmap.saydullayevapi.uz/api/index.php?a=me)"
echo "yangilandi: $(date)"
