# Google SWE yo'l xaritasi — roadmap.saydullayevapi.uz

Bitta fayl: `index.html` (backend yo'q, progress brauzerda saqlanadi).

## Variant 1 — GitHub Pages (tavsiya: server kerak emas, HTTPS avtomatik)

1. Repo → **Settings → Pages** → *Source: Deploy from a branch* → `main` / `/ (root)` → Save.
2. Shu sahifada **Custom domain**: `roadmap.saydullayevapi.uz` → Save (`CNAME` fayli allaqachon repoda).
3. DigitalOcean → Networking → Domains → saydullayevapi.uz → Create a record:
   **CNAME**, hostname `roadmap`, alias `saydullayevquvonchbek.github.io` (oxirida nuqta bo'lsa ham bo'ladi).
4. 5–20 daqiqadan keyin Pages sahifasida **Enforce HTTPS** ni yoqing.

Yangilash: `index.html` ni repoda almashtirasiz — 1–2 daqiqada sayt yangilanadi.

## Variant 2 — DigitalOcean droplet (nginx)

DNS: **A** yozuv, hostname `roadmap` → `164.90.217.190`.
Droplet konsolida `deploy-from-github.sh` ichidagi `RAW_URL` ni o'z repongizga moslab, faylni paste qiling.
Yangilash: konsolda `bash /var/www/roadmap/update.sh`.
