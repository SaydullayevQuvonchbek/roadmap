# DigitalOcean droplet konsoliga paste qiling. 
bash <<'INSTALL_EOF'
set -e
RAW_URL="https://raw.githubusercontent.com/SaydullayevQuvonchbek/roadmap/main/index.html"
DOMAIN="roadmap.saydullayevapi.uz"
ROOT="/var/www/roadmap"

mkdir -p "$ROOT"
curl -fsSL "$RAW_URL" -o "$ROOT/index.html"
echo "yuklandi: $(wc -c < "$ROOT/index.html") bayt"

# keyingi yangilashlar uchun
cat > "$ROOT/update.sh" <<UPD
#!/usr/bin/env bash
curl -fsSL "$RAW_URL" -o "$ROOT/index.html" && echo "yangilandi: \$(date)"
UPD
chmod +x "$ROOT/update.sh"

command -v nginx >/dev/null 2>&1 || { apt-get update -y && apt-get install -y nginx; }
cat > /etc/nginx/sites-available/roadmap <<'NGX'
server {
    listen 80;
    listen [::]:80;
    server_name roadmap.saydullayevapi.uz;
    root /var/www/roadmap;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
    gzip on;
    gzip_types text/html text/css application/javascript;
}
NGX
ln -sf /etc/nginx/sites-available/roadmap /etc/nginx/sites-enabled/roadmap
nginx -t && systemctl reload nginx
echo "HTTP tayyor: http://$DOMAIN"

command -v certbot >/dev/null 2>&1 || apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --redirect -m saydullayevquvonchbek1@gmail.com \
  && echo "TAYYOR: https://$DOMAIN" \
  || echo "certbot o'tmadi — DNS tarqalgach: certbot --nginx -d $DOMAIN"
INSTALL_EOF
