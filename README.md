# Middle → Google — roadmap.saydullayevapi.uz

Statik sayt (`index.html` + `assets/`) + kichik PHP API (`api/index.php`, SQLite) — ro'yxatdan o'tish, kirish, progressni serverda saqlash.

## Yangilash (Hestia droplet)

1. Fayllarni repoga yuklang (commit).
2. Droplet konsolida: `bash /var/www/roadmap/update.sh`

## Foydalanuvchilarni boshqarish (serverda)

```
php /var/www/roadmap/admin.php list
php /var/www/roadmap/admin.php reset LOGIN YANGIPAROL
php /var/www/roadmap/admin.php delete LOGIN
php /var/www/roadmap/admin.php import-legacy LOGIN   # eski kalitli progressni hisobga ko'chirish
```

## Tuzilma

- `index.html`, `assets/style.css`, `assets/data.js`, `assets/app.js`, `assets/scene.js` (3D, three.js), `assets/vendor/`
- `api/index.php` — API: `?a=register|login|logout|me|progress|password`
- `tools/admin.php` — server buyruq satri vositasi
- Ma'lumotlar: `<domen>/private/roadmap.sqlite` (public_html'dan tashqarida)
