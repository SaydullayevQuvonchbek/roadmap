# Middle → Google — roadmap.saydullayevapi.uz

Statik sayt: `index.html` + `assets/` (CSS, JS, 3D sahna uchun three.js). Backend yo'q, progress brauzerda saqlanadi.

## Yangilash (Hestia droplet)

1. Fayllarni repoga yuklang (commit).
2. Droplet konsolida:
   ```
   bash /var/www/roadmap/update.sh
   ```
   (birinchi marta: `curl -fsSL https://raw.githubusercontent.com/SaydullayevQuvonchbek/roadmap/main/update.sh -o /var/www/roadmap/update.sh && bash /var/www/roadmap/update.sh`)

## Tuzilma

- `index.html` — sahifa
- `assets/style.css` — uslub (yorug'/qorong'i mavzu)
- `assets/data.js` — haftalar, 196 + 12 masala, ko'nikmalar, C++ shablonlar
- `assets/app.js` — progress, takrorlash tizimi, reyting, filtrlar
- `assets/scene.js` — 3D yo'l (three.js), progress bilan bog'langan
- `assets/vendor/three.module.min.js` — three.js r170 (MIT)
