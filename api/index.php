<?php
// Roadmap API: ro'yxatdan o'tish, kirish, progress (SQLite, PHP sessiya).
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$base = dirname(__DIR__, 2) . '/private';
if (!is_dir($base)) @mkdir($base, 0750, true);
function out($x, int $code = 200): void { http_response_code($code); echo json_encode($x, JSON_UNESCAPED_UNICODE); exit; }

try {
  $db = new PDO('sqlite:' . $base . '/roadmap.sqlite');
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $db->exec('PRAGMA journal_mode=WAL');
  $db->exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, pass_hash TEXT NOT NULL, created_at TEXT NOT NULL, last_login TEXT)');
  $db->exec('CREATE TABLE IF NOT EXISTS progress (user_id INTEGER PRIMARY KEY, data TEXT NOT NULL, updated_at TEXT NOT NULL)');
  $db->exec('CREATE TABLE IF NOT EXISTS throttle (k TEXT PRIMARY KEY, n INTEGER NOT NULL, until INTEGER NOT NULL)');
} catch (Throwable $e) {
  out(['error' => 'db', 'detail' => 'SQLite ishlamadi: php-sqlite3 o\'rnatilganini tekshiring'], 500);
}

session_set_cookie_params(['lifetime' => 60 * 60 * 24 * 180, 'path' => '/', 'secure' => !empty($_SERVER['HTTPS']), 'httponly' => true, 'samesite' => 'Lax']);
session_name('roadmap_sid');
session_start();

$a = $_GET['a'] ?? '';
$m = $_SERVER['REQUEST_METHOD'];
$ip = $_SERVER['HTTP_X_REAL_IP'] ?? (explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '')[0] ?: ($_SERVER['REMOTE_ADDR'] ?? '0'));
$ip = trim((string)$ip);

function body(): array { $j = json_decode((string)file_get_contents('php://input'), true); return is_array($j) ? $j : []; }
// $max marta / $window soniya; oshsa true (bloklangan)
function throttled(PDO $db, string $k, int $max, int $window): bool {
  $now = time();
  $row = $db->query('SELECT n, until FROM throttle WHERE k = ' . $db->quote($k))->fetch(PDO::FETCH_ASSOC);
  if (!$row || (int)$row['until'] < $now) { $db->prepare('REPLACE INTO throttle (k, n, until) VALUES (?, 1, ?)')->execute([$k, $now + $window]); return false; }
  $n = (int)$row['n'] + 1;
  $db->prepare('UPDATE throttle SET n = ? WHERE k = ?')->execute([$n, $k]);
  return $n > $max;
}
function clearThrottle(PDO $db, string $k): void { $db->prepare('DELETE FROM throttle WHERE k = ?')->execute([$k]); }
function user(): ?array { return isset($_SESSION['uid']) ? ['id' => (int)$_SESSION['uid'], 'username' => (string)$_SESSION['username']] : null; }

if ($m === 'POST' && ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') !== 'fetch') out(['error' => 'bad request'], 400);

switch ($a) {
  case 'register': {
    if ($m !== 'POST') out(['error' => 'method'], 405);
    if (throttled($db, "reg:$ip", 15, 86400)) out(['error' => 'Bugungi ro\'yxatdan o\'tish limiti tugadi, ertaga urinib ko\'ring'], 429);
    $b = body();
    $u = strtolower(trim((string)($b['username'] ?? ''))); $p = (string)($b['password'] ?? '');
    if (!preg_match('/^[a-z0-9_]{3,24}$/', $u)) out(['error' => 'Login: 3–24 belgi, faqat lotin harf, raqam va _'], 400);
    if (strlen($p) < 6 || strlen($p) > 72) out(['error' => 'Parol kamida 6 belgi'], 400);
    try {
      $db->prepare('INSERT INTO users (username, pass_hash, created_at, last_login) VALUES (?, ?, ?, ?)')
         ->execute([$u, password_hash($p, PASSWORD_DEFAULT), date('c'), date('c')]);
    } catch (PDOException $e) { out(['error' => 'Bu login band'], 409); }
    session_regenerate_id(true);
    $_SESSION['uid'] = (int)$db->lastInsertId(); $_SESSION['username'] = $u;
    out(['ok' => true, 'username' => $u]);
  }
  case 'login': {
    if ($m !== 'POST') out(['error' => 'method'], 405);
    $b = body();
    $u = strtolower(trim((string)($b['username'] ?? ''))); $p = (string)($b['password'] ?? '');
    if ($u === '' || $p === '') out(['error' => 'Login va parolni kiriting'], 400);
    if (throttled($db, "login:$u", 8, 900)) out(['error' => 'Ko\'p urinish — 15 daqiqadan keyin qayta urinib ko\'ring'], 429);
    $st = $db->prepare('SELECT id, pass_hash FROM users WHERE username = ?'); $st->execute([$u]);
    $row = $st->fetch(PDO::FETCH_ASSOC);
    if (!$row || !password_verify($p, $row['pass_hash'])) out(['error' => 'Login yoki parol noto\'g\'ri'], 401);
    clearThrottle($db, "login:$u");
    if (password_needs_rehash($row['pass_hash'], PASSWORD_DEFAULT)) $db->prepare('UPDATE users SET pass_hash = ? WHERE id = ?')->execute([password_hash($p, PASSWORD_DEFAULT), $row['id']]);
    $db->prepare('UPDATE users SET last_login = ? WHERE id = ?')->execute([date('c'), $row['id']]);
    session_regenerate_id(true);
    $_SESSION['uid'] = (int)$row['id']; $_SESSION['username'] = $u;
    out(['ok' => true, 'username' => $u]);
  }
  case 'logout': {
    $_SESSION = []; session_destroy();
    setcookie(session_name(), '', ['expires' => time() - 3600, 'path' => '/']);
    out(['ok' => true]);
  }
  case 'me': {
    $me = user(); if (!$me) out(['error' => 'unauthorized'], 401);
    out(['username' => $me['username']]);
  }
  case 'progress': {
    $me = user(); if (!$me) out(['error' => 'unauthorized'], 401);
    if ($m === 'GET') {
      $st = $db->prepare('SELECT data FROM progress WHERE user_id = ?'); $st->execute([$me['id']]);
      $d = $st->fetchColumn(); echo $d !== false ? $d : '{}'; exit;
    }
    if ($m === 'POST') {
      $raw = (string)file_get_contents('php://input');
      if (strlen($raw) > 400000) out(['error' => 'too large'], 413);
      $j = json_decode($raw, true); if (!is_array($j)) out(['error' => 'bad json'], 400);
      $j['savedAt'] = date('c');
      $db->prepare('REPLACE INTO progress (user_id, data, updated_at) VALUES (?, ?, ?)')->execute([$me['id'], json_encode($j, JSON_UNESCAPED_UNICODE), $j['savedAt']]);
      out(['ok' => true, 'savedAt' => $j['savedAt']]);
    }
    out(['error' => 'method'], 405);
  }
  case 'password': {
    $me = user(); if (!$me) out(['error' => 'unauthorized'], 401);
    if ($m !== 'POST') out(['error' => 'method'], 405);
    $b = body(); $old = (string)($b['old'] ?? ''); $new = (string)($b['new'] ?? '');
    if (strlen($new) < 6 || strlen($new) > 72) out(['error' => 'Yangi parol kamida 6 belgi'], 400);
    $st = $db->prepare('SELECT pass_hash FROM users WHERE id = ?'); $st->execute([$me['id']]);
    if (!password_verify($old, (string)$st->fetchColumn())) out(['error' => 'Eski parol noto\'g\'ri'], 401);
    $db->prepare('UPDATE users SET pass_hash = ? WHERE id = ?')->execute([password_hash($new, PASSWORD_DEFAULT), $me['id']]);
    out(['ok' => true]);
  }
  default: out(['error' => 'unknown action'], 404);
}
