<?php
// Serverda: php /var/www/roadmap/admin.php list | reset LOGIN YANGIPAROL | delete LOGIN | import-legacy LOGIN
$base = '/home/imezon/web/roadmap.saydullayevapi.uz/private';
$db = new PDO('sqlite:' . $base . '/roadmap.sqlite'); $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$cmd = $argv[1] ?? 'list';
switch ($cmd) {
  case 'list':
    printf("%-4s %-24s %-22s %-22s %s\n", 'id', 'login', 'yaratilgan', 'oxirgi kirish', 'yechilgan');
    foreach ($db->query('SELECT u.id, u.username, u.created_at, u.last_login, p.data FROM users u LEFT JOIN progress p ON p.user_id = u.id ORDER BY u.id') as $r) {
      $n = 0; if ($r['data']) { $d = json_decode($r['data'], true); foreach (($d['p'] ?? []) as $v) { $s = is_array($v) ? ($v['s'] ?? '') : $v; if (in_array($s, ['ac','r7','r30','done'])) $n++; } }
      printf("%-4d %-24s %-22s %-22s %d\n", $r['id'], $r['username'], substr($r['created_at'],0,16), substr((string)$r['last_login'],0,16), $n);
    }
    break;
  case 'reset':
    [$u, $p] = [$argv[2] ?? '', $argv[3] ?? ''];
    if ($u === '' || strlen($p) < 6) { echo "php admin.php reset LOGIN YANGIPAROL (kamida 6 belgi)\n"; exit(1); }
    $n = $db->prepare('UPDATE users SET pass_hash = ? WHERE username = ?'); $n->execute([password_hash($p, PASSWORD_DEFAULT), $u]);
    echo $n->rowCount() ? "Parol yangilandi: $u\n" : "Topilmadi: $u\n"; break;
  case 'delete':
    $u = $argv[2] ?? ''; $st = $db->prepare('SELECT id FROM users WHERE username = ?'); $st->execute([$u]); $id = $st->fetchColumn();
    if (!$id) { echo "Topilmadi: $u\n"; exit(1); }
    $db->prepare('DELETE FROM progress WHERE user_id = ?')->execute([$id]); $db->prepare('DELETE FROM users WHERE id = ?')->execute([$id]);
    echo "O'chirildi: $u\n"; break;
  case 'import-legacy':
    $u = $argv[2] ?? ''; $st = $db->prepare('SELECT id FROM users WHERE username = ?'); $st->execute([$u]); $id = $st->fetchColumn();
    $f = "$base/roadmap-progress.json";
    if (!$id) { echo "Topilmadi: $u\n"; exit(1); }
    if (!is_file($f)) { echo "Eski progress fayli yo'q: $f\n"; exit(1); }
    $db->prepare('REPLACE INTO progress (user_id, data, updated_at) VALUES (?, ?, ?)')->execute([$id, file_get_contents($f), date('c')]);
    echo "Ko'chirildi: kalitli progress -> $u\n"; break;
  default: echo "list | reset LOGIN YANGIPAROL | delete LOGIN | import-legacy LOGIN\n";
}
