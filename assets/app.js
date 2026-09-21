// ---- Holat (progress) ----
const KEY = "gswe_roadmap_v1";
let state = { p: {}, s: {}, theme: "system" };
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) state = Object.assign(state, JSON.parse(raw)); } catch (e) {}
}
function save(push = true) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  if (push) pushToServer();
}

// ---- Server bilan sinxronlash (api/progress.php, kalit bilan) ----
const SYNC_URL = "api/progress.php";
let syncKey = ""; try { syncKey = localStorage.getItem("gswe_sync_key") || ""; } catch (e) {}
let syncTimer = null;
function setSyncStatus(txt, cls) {
  document.querySelectorAll("[data-sync-status]").forEach(el => { el.textContent = txt; el.className = "sync-status " + (cls || ""); });
}
function mergeState(remote) {
  const p = Object.assign({}, state.p);
  for (const [id, r] of Object.entries(remote.p || {})) {
    const rr = typeof r === "string" ? { s: r, t: 0 } : r;
    const l = state.p[id]; const lt = l ? (typeof l === "string" ? 0 : (l.t || 0)) : -1;
    if ((rr.t || 0) >= lt) p[id] = rr;
  }
  state.p = p;
  state.s = Object.assign({}, remote.s || {}, state.s);
  const days = Object.assign({}, remote.days || {});
  for (const [d, n] of Object.entries(state.days || {})) days[d] = Math.max(days[d] || 0, n);
  state.days = days;
}
async function pullFromServer() {
  if (!syncKey) { setSyncStatus("o'chiq", ""); return; }
  setSyncStatus("ulanmoqda…", "");
  try {
    const r = await fetch(SYNC_URL, { headers: { "X-Key": syncKey }, cache: "no-store" });
    if (r.status === 401) { setSyncStatus("kalit noto'g'ri", "bad"); return; }
    if (!r.ok) throw new Error("HTTP " + r.status);
    const remote = await r.json();
    if (remote && typeof remote === "object" && (remote.p || remote.s || remote.days)) { mergeState(remote); save(false); renderAll(); }
    setSyncStatus("ulangan", "ok");
    pushToServer();
  } catch (e) { setSyncStatus("server javob bermadi", "bad"); }
}
function pushToServer() {
  if (!syncKey) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(async () => {
    try {
      const body = JSON.stringify({ p: state.p, s: state.s, days: state.days || {}, updatedAt: Date.now() });
      const r = await fetch(SYNC_URL, { method: "POST", headers: { "X-Key": syncKey, "Content-Type": "application/json" }, body });
      if (r.status === 401) { setSyncStatus("kalit noto'g'ri", "bad"); return; }
      if (!r.ok) throw new Error("HTTP " + r.status);
      setSyncStatus("saqlandi " + new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }), "ok");
    } catch (e) { setSyncStatus("saqlanmadi — offline?", "bad"); }
  }, 600);
}
function initSync() {
  document.querySelectorAll("[data-sync-form]").forEach(f => {
    const inp = f.querySelector("input");
    if (syncKey) inp.value = syncKey;
    f.addEventListener("submit", e => {
      e.preventDefault();
      syncKey = inp.value.trim();
      try { if (syncKey) localStorage.setItem("gswe_sync_key", syncKey); else localStorage.removeItem("gswe_sync_key"); } catch (err) {}
      document.querySelectorAll("[data-sync-form] input").forEach(i => { i.value = syncKey; });
      if (syncKey) pullFromServer(); else setSyncStatus("o'chiq", "");
    });
  });
  if (syncKey) pullFromServer(); else setSyncStatus("o'chiq", "");
}
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const P = PROBLEMS.map(([id, name, slug, d, pat, w, prem, alt]) => ({ id, name, slug, d, pat, w, prem: !!prem, alt: alt || "" }));
const MAIN = P.filter(p => p.w <= 12);
const rec = (id) => { const r = state.p[id]; return !r ? null : (typeof r === "string" ? { s: r, t: 0 } : r); };
const statusOf = (id) => (rec(id) || { s: "none" }).s;
const DAY = 86400000;
function setStatus(id, st) {
  if (st === "none") delete state.p[id]; else state.p[id] = { s: st, t: Date.now() };
  const d = new Date().toISOString().slice(0, 10);
  state.days = state.days || {}; state.days[d] = (state.days[d] || 0) + 1;
}
// Takrorlash vaqti keldimi? ac → 1 kun / 7 kun; r7 → 30 kun
function dueOf(id) {
  const r = rec(id); if (!r || !r.t) return null;
  const age = (Date.now() - r.t) / DAY;
  if (r.s === "ac" && age >= 7) return { k: "7 kunlik takror", d: Math.floor(age) };
  if (r.s === "ac" && age >= 1) return { k: "1 kunlik takror", d: Math.floor(age) };
  if (r.s === "r7" && age >= 30) return { k: "30 kunlik takror", d: Math.floor(age) };
  return null;
}
function streak() {
  const days = state.days || {}; let n = 0; const t = new Date();
  for (;;) { const k = t.toISOString().slice(0, 10); if (!days[k]) break; n++; t.setDate(t.getDate() - 1); }
  return { cur: n, total: Object.keys(days).length };
}
const isSolved = (st) => st === "ac" || st === "r7" || st === "r30" || st === "done";
const DIFF_LABEL = { E: "Easy", M: "Medium", H: "Hard" };

// ---- Mavzu ----
function applyTheme() {
  const root = document.documentElement;
  if (state.theme === "light" || state.theme === "dark") root.setAttribute("data-theme", state.theme);
  else root.removeAttribute("data-theme");
  const label = { system: "Mavzu: tizim", light: "Mavzu: yorug'", dark: "Mavzu: qorong'i" }[state.theme];
  $$("[data-theme-toggle]").forEach(b => { if (b.textContent.trim().length > 2) b.textContent = label; b.title = label; });
}
$$("[data-theme-toggle]").forEach(b => b.addEventListener("click", () => {
  state.theme = state.theme === "system" ? "light" : state.theme === "light" ? "dark" : "system";
  save(false); applyTheme();
}));

// ---- Toast ----
let toastT;
function toast(msg) {
  const t = $("[data-toast]"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 1800);
}

// ---- Reyting (Codeforces uslubida) ----
const RANKS = [[0, "Newbie"], [20, "Pupil"], [50, "Specialist"], [90, "Expert"], [130, "Candidate Master"], [170, "Master"], [196, "Grandmaster"]];
function rankOf(n) {
  let cur = RANKS[0], next = null;
  for (const r of RANKS) { if (n >= r[0]) cur = r; else { next = r; break; } }
  return { name: cur[1], next };
}
const setJ = (k, v) => { const el = $(`[data-j="${k}"]`); if (el) el.textContent = v; };

// ---- Statistika ----
function updateStats() {
  const solved = MAIN.filter(p => isSolved(statusOf(p.id)));
  const done = MAIN.filter(p => statusOf(p.id) === "done");
  const rev = MAIN.filter(p => ["ac", "r7", "r30"].includes(statusOf(p.id)));
  const pct = Math.round(100 * solved.length / MAIN.length);
  // judge paneli
  setJ("tests", `${solved.length} / ${MAIN.length}`);
  const barI = $("[data-j=bar] i"); if (barI) barI.style.width = pct + "%";
  setJ("pct", pct + "%");
  ["E", "M", "H"].forEach(d => {
    const all = MAIN.filter(p => p.d === d), s = all.filter(p => isSolved(statusOf(p.id)));
    setJ(d, `${s.length}/${all.length}`);
  });
  const rk = rankOf(solved.length);
  setJ("rank", rk.name);
  setJ("next", rk.next ? `→ ${rk.next[1]}: ${rk.next[0] - solved.length} masala` : "· maksimal reyting");
  const st = streak();
  setJ("streak", st.cur);
  const vd = $("[data-j=verdict]");
  if (vd) {
    if (solved.length >= MAIN.length) { vd.textContent = "ACCEPTED"; vd.className = "vd ac"; setJ("vnote", "— Strong Hire. Endi mock va ariza."); }
    else if (done.length >= 100) { vd.textContent = "PARTIAL"; vd.className = "vd pending"; setJ("vnote", `— ${done.length} ta o'zlashtirildi, ${rev.length} ta takror navbatida`); }
    else { vd.textContent = "PENDING"; vd.className = "vd pending"; setJ("vnote", "— 196/196 + 6 mock = Strong Hire"); }
  }
  $("[data-side-solved]").textContent = `${solved.length} / ${MAIN.length}`;
  $("[data-side-meter]").style.width = pct + "%";
  const sr = $("[data-side-rank]"); if (sr) sr.textContent = rk.name;
  const totalSkills = SKILLS.reduce((a, g) => a + g.items.length, 0);
  const doneSkills = SKILLS.reduce((a, g) => a + g.items.filter((_, i) => state.s[g.id + ":" + i]).length, 0);
  const sp = totalSkills ? Math.round(100 * doneSkills / totalSkills) : 0;
  setJ("skills", `${doneSkills} / ${totalSkills}`);
  $("[data-side-skills]").textContent = `${doneSkills} / ${totalSkills}`;
  $("[data-side-skills-meter]").style.width = sp + "%";
  // hafta kartalari
  $$("[data-week-card]").forEach(card => {
    const w = +card.dataset.weekCard;
    const all = P.filter(p => p.w === w), s = all.filter(p => isSolved(statusOf(p.id)));
    card.querySelector(".c").textContent = `${s.length}/${all.length}`;
    card.querySelector(".meter > i").style.width = (all.length ? 100 * s.length / all.length : 0) + "%";
    card.classList.toggle("done", all.length > 0 && s.length === all.length);
  });
  SKILLS.forEach(g => {
    const el = $(`[data-skill-count="${g.id}"]`); if (!el) return;
    const n = g.items.filter((_, i) => state.s[g.id + ":" + i]).length;
    el.textContent = `${n}/${g.items.length}`;
  });
  document.dispatchEvent(new CustomEvent("roadmap:update"));
}

// ---- 3D sahna uchun ma'lumot ko'prigi ----
window.roadmapData = () => {
  const nodes = MAIN.map(p => ({ id: p.id, name: p.name, d: p.d, w: p.w, solved: isSolved(statusOf(p.id)) }));
  return { nodes, nextIndex: nodes.findIndex(n => !n.solved) };
};
window.roadmapGoto = (w, id) => {
  $("#f-week").value = String(w); $("#f-diff").value = ""; $("#f-status").value = ""; $("#q").value = id ? String(id) : "";
  renderProblems();
  $("#problems").scrollIntoView({ behavior: "smooth", block: "start" });
};

// ---- Yo'l xarita ----
function renderTimeline() {
  const host = $("[data-timeline]");
  host.innerHTML = PHASES.map(ph => {
    const weeks = WEEKS.filter(w => w.phase === ph.n);
    const cards = weeks.map(w => `
      <button class="week" type="button" data-week-card="${w.n}" data-goto-week="${w.n}" title="${esc(w.goal)}">
        <div class="t"><span class="n">${w.n <= 12 ? w.n + "-hafta" : "Bonus"} · ${esc(w.sec)}</span><span class="c">0/0</span></div>
        <h4>${esc(w.title)}</h4>
        <div class="meter"><i></i></div>
      </button>`).join("");
    const extra = ph.n === 5 ? `
      <div class="weeks">
        <div class="week" style="cursor:default"><div class="t"><span class="n">13-hafta</span></div><h4>Rezyume, LinkedIn, GitHub — ariza yuborish</h4><p class="small muted">Ko'nikmalar → Profil va ariza</p></div>
        <div class="week" style="cursor:default"><div class="t"><span class="n">14-hafta</span></div><h4>STAR hikoyalar va telefon skrining mashqi</h4><p class="small muted">Ko'nikmalar → Xulq-atvor</p></div>
        <div class="week" style="cursor:default"><div class="t"><span class="n">15–16-hafta</span></div><h4>System design asoslari + haftasiga 5–8 takror masala</h4><p class="small muted">Onsite loop'gacha formani saqlash</p></div>
        ${cards}
      </div>` : `<div class="weeks">${cards}</div>`;
    return `
      <div class="phase">
        <div class="rail"><div class="num">${ph.n}</div></div>
        <div class="body">
          <div class="head"><span class="w">${esc(ph.weeks)}</span><h3>${esc(ph.title)}</h3></div>
          <p>${esc(ph.text)}</p>
          ${extra}
        </div>
      </div>`;
  }).join("");
  $$("[data-goto-week]").forEach(b => b.addEventListener("click", () => {
    $("#f-week").value = b.dataset.gotoWeek; $("#f-diff").value = ""; $("#f-status").value = ""; $("#q").value = "";
    renderProblems();
    $("#problems").scrollIntoView({ behavior: "smooth", block: "start" });
  }));
}

// ---- Ko'nikmalar ----
function renderSkills() {
  const host = $("[data-skills]");
  host.innerHTML = SKILLS.map(g => `
    <div class="card skill">
      <div class="head"><h3>${esc(g.title)}</h3><span class="cnt" data-skill-count="${g.id}">0/${g.items.length}</span></div>
      <div class="note">${esc(g.note)}</div>
      <ul>${g.items.map(([t, s], i) => {
        const k = g.id + ":" + i, on = !!state.s[k];
        return `<li><label class="${on ? "on" : ""}"><input type="checkbox" id="sk-${g.id}-${i}" data-skill="${k}" ${on ? "checked" : ""}><span><span class="t">${esc(t)}</span><br><span class="s">${esc(s)}</span></span></label></li>`;
      }).join("")}</ul>
    </div>`).join("");
  $$("[data-skill]").forEach(cb => cb.addEventListener("change", () => {
    if (cb.checked) state.s[cb.dataset.skill] = true; else delete state.s[cb.dataset.skill];
    cb.closest("label").classList.toggle("on", cb.checked);
    save(); updateStats();
  }));
}

// ---- Masalalar ----
function renderProblems() {
  const q = $("#q").value.trim().toLowerCase();
  const fw = $("#f-week").value, fd = $("#f-diff").value, fs = $("#f-status").value;
  const rows = P.filter(p => {
    if (fw && String(p.w) !== fw) return false;
    if (fd && p.d !== fd) return false;
    if (fs && statusOf(p.id) !== fs) return false;
    if (q && !(String(p.id).includes(q) || p.name.toLowerCase().includes(q) || p.pat.toLowerCase().includes(q))) return false;
    return true;
  });
  const opts = STATUSES.map(s => `<option value="${s.k}">${esc(s.label)}</option>`).join("");
  let html = "", lastW = null;
  rows.forEach(p => {
    if (!fw && p.w !== lastW) {
      lastW = p.w; const wk = WEEKS.find(w => w.n === p.w);
      html += `<tr class="week-anchor" id="w${p.w}"><td colspan="6" style="background:var(--surface-2);font-family:var(--font-mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)">${p.w <= 12 ? p.w + "-hafta" : "Bonus"} · ${esc(wk ? wk.title : "")}</td></tr>`;
    }
    const st = statusOf(p.id);
    html += `<tr class="${st}">
      <td class="row-status"><select data-pid="${p.id}" class="${st}" aria-label="Holat ${p.id}">${opts}</select></td>
      <td class="id">${p.id}</td>
      <td class="nm"><a href="https://leetcode.com/problems/${p.slug}/" target="_blank" rel="noopener">${esc(p.name)}</a>${p.prem ? ` <span class="badge prem">Premium${p.alt ? " · muqobil " + esc(p.alt) : ""}</span>` : ""}${(() => { const d = dueOf(p.id); return d ? ` <span class="badge due" data-due>${esc(d.k)}</span>` : ""; })()}</td>
      <td><span class="badge ${p.d}">${p.d}</span> <span class="muted small">${DIFF_LABEL[p.d]}</span></td>
      <td class="pt">${esc(p.pat)}</td>
      <td class="wk">${p.w <= 12 ? p.w + "-hafta" : "Bonus"}</td>
    </tr>`;
  });
  $("[data-problems]").innerHTML = html || `<tr><td colspan="6" class="muted" style="padding:18px">Hech narsa topilmadi.</td></tr>`;
  $("[data-count]").textContent = `${rows.length} ta masala`;
  $$("select[data-pid]").forEach(sel => {
    sel.value = statusOf(+sel.dataset.pid);
    sel.addEventListener("change", () => {
      const id = +sel.dataset.pid;
      setStatus(id, sel.value);
      sel.className = sel.value; sel.closest("tr").className = sel.value;
      const dueCell = sel.closest("tr").querySelector("[data-due]"); if (dueCell) dueCell.remove();
      save(); updateStats(); renderToday();
    });
  });
}
function initFilters() {
  const fw = $("#f-week");
  WEEKS.forEach(w => { const o = document.createElement("option"); o.value = w.n; o.textContent = (w.n <= 12 ? w.n + "-hafta" : "Bonus") + " — " + w.title; fw.appendChild(o); });
  ["#q", "#f-week", "#f-diff", "#f-status"].forEach(s => $(s).addEventListener("input", renderProblems));
}

// ---- Bugun ----
function renderToday() {
  const host = $("[data-today]"); if (!host) return;
  const due = P.filter(p => p.w <= 12).map(p => ({ p, d: dueOf(p.id) })).filter(x => x.d).sort((a, b) => b.d.d - a.d.d).slice(0, 6);
  let next = [], wk = null;
  for (const w of WEEKS) {
    if (w.n > 12) break;
    const left = P.filter(p => p.w === w.n && !isSolved(statusOf(p.id)));
    if (left.length) { wk = w; next = left.slice(0, 3); break; }
  }
  const st = streak();
  const li = (p, extra) => `<li><span class="id mono">${p.id}</span><a href="https://leetcode.com/problems/${p.slug}/" target="_blank" rel="noopener">${esc(p.name)}</a> <span class="badge ${p.d}">${p.d}</span>${extra || ""}</li>`;
  host.innerHTML = `
    <div class="today-col">
      <div class="eyebrow">Takrorlash vaqti kelganlar</div>
      ${due.length ? `<ul class="today-list">${due.map(x => li(x.p, ` <span class="muted small">— ${esc(x.d.k)}, ${x.d.d} kun oldin</span>`)).join("")}</ul>` : `<p class="muted small">Hozircha yo'q. Masalani "Yechildi" deb belgilaganingizdan 1 va 7 kun o'tgach, "7 kunlik takror"dan 30 kun o'tgach shu yerda chiqadi.</p>`}
    </div>
    <div class="today-col">
      <div class="eyebrow">Keyingi yangi masalalar${wk ? ` · ${wk.n}-hafta` : ""}</div>
      ${next.length ? `<ul class="today-list">${next.map(p => li(p)).join("")}</ul>` : `<p class="muted small">12 haftaning barcha masalalari yechilgan — Bonus Hard va mock'larga o'ting.</p>`}
      ${wk ? `<p class="muted small" style="margin-top:8px">${esc(wk.goal)}</p>` : ""}
    </div>
    <div class="today-col streak">
      <div class="eyebrow">Faollik</div>
      <div class="big">${st.cur}<span class="muted small"> kun ketma-ket</span></div>
      <div class="muted small">Jami faol kunlar: ${st.total}. Haftasiga 6 kun — maqsad.</div>
    </div>`;
}

// ---- Shablonlar ----
function renderTemplates() {
  $("[data-templates]").innerHTML = TEMPLATES.map(t => `
    <details class="tpl" id="tpl-${t.id}">
      <summary><svg class="arrow" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>${esc(t.title)}<span class="tag">${esc(t.tag)}</span></summary>
      <div class="code"><button class="btn small copy" type="button" data-copy="${t.id}">Nusxa</button><pre><code>${esc(t.code)}</code></pre></div>
    </details>`).join("");
  $$("[data-copy]").forEach(b => b.addEventListener("click", async () => {
    const t = TEMPLATES.find(x => x.id === b.dataset.copy);
    try { await navigator.clipboard.writeText(t.code); toast("Nusxalandi"); } catch (e) { toast("Nusxalab bo'lmadi — qo'lda belgilang"); }
  }));
}

// ---- Eksport / import / tozalash ----
$$("[data-export]").forEach(b => b.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), ...state }, null, 2)], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "roadmap-progress.json"; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}));
$$("[data-import]").forEach(b => b.addEventListener("click", () => $("[data-import-input]").click()));
$("[data-import-input]")?.addEventListener("change", (e) => {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const d = JSON.parse(r.result);
      if (d && typeof d === "object") { state.p = d.p || {}; state.s = d.s || {}; if (d.theme) state.theme = d.theme; save(); renderAll(); toast("Progress yuklandi"); }
    } catch (err) { toast("Fayl o'qilmadi"); }
  };
  r.readAsText(f); e.target.value = "";
});
$$("[data-reset]").forEach(b => b.addEventListener("click", () => {
  if (!confirm("Barcha progress o'chiriladi. Davom etasizmi?")) return;
  state.p = {}; state.s = {}; save(); renderAll(); toast("Tozalandi");
}));

// ---- Navigatsiya ----
function initNav() {
  const links = $$("[data-nav] a");
  const secs = ["top", "roadmap", "skills", "problems", "templates", "interview", "resources"].map(id => document.getElementById(id));
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id)); });
  }, { rootMargin: "-30% 0px -60% 0px" });
  secs.forEach(s => s && io.observe(s));
}

function renderAll() {
  renderTimeline(); renderSkills(); renderProblems(); updateStats(); renderToday();
}
load(); applyTheme(); initFilters(); renderTemplates(); renderAll(); initNav(); initSync();
