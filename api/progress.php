<?php
// Progressni serverda saqlash. Kalit: <domen>/private/roadmap.key ; ma'lumot: <domen>/private/roadmap-progress.json
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
$base = dirname(__DIR__, 2) . '/private';
$keyFile = $base . '/roadmap.key';
$dataFile = $base . '/roadmap-progress.json';
$key = $_SERVER['HTTP_X_KEY'] ?? ($_GET['key'] ?? '');
$real = is_file($keyFile) ? trim((string)file_get_contents($keyFile)) : '';
if ($real === '' || $key === '' || !hash_equals($real, (string)$key)) { http_response_code(401); echo '{"error":"unauthorized"}'; exit; }
$m = $_SERVER['REQUEST_METHOD'];
if ($m === 'GET') { echo is_file($dataFile) ? file_get_contents($dataFile) : '{}'; exit; }
if ($m === 'POST') {
  $raw = file_get_contents('php://input');
  if (strlen($raw) > 400000) { http_response_code(413); echo '{"error":"too large"}'; exit; }
  $j = json_decode($raw, true);
  if (!is_array($j)) { http_response_code(400); echo '{"error":"bad json"}'; exit; }
  $j['savedAt'] = date('c');
  if (!is_dir($base)) mkdir($base, 0750, true);
  if (file_put_contents($dataFile, json_encode($j, JSON_UNESCAPED_UNICODE), LOCK_EX) === false) { http_response_code(500); echo '{"error":"write failed"}'; exit; }
  echo json_encode(['ok' => true, 'savedAt' => $j['savedAt']]); exit;
}
http_response_code(405); echo '{"error":"method"}';
