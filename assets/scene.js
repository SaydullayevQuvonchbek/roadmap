// 3D "Yo'l": 196 masala — spiral bo'ylab tugunlar. Yechilganlari yonadi, keyingisi pulsatsiya qiladi, tepada — Google.
import * as THREE from './vendor/three.module.min.js';

const canvas = document.querySelector('[data-scene]');
const wrap = canvas && canvas.closest('.path3d-wrap');
const tip = document.querySelector('[data-scene-tip]');

function webglOk() {
  try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch (e) { return false; }
}

if (canvas && wrap && typeof window.roadmapData === 'function' && webglOk()) {
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DIFF = { E: new THREE.Color(0x4CC27C), M: new THREE.Color(0xF0A44A), H: new THREE.Color(0xF07070) };
  const DIM = new THREE.Color(0x2E3A58);
  const GOLD = new THREE.Color(0xF5C451);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.3, 10.2);
  camera.lookAt(0, 0, 0);

  const group = new THREE.Group();
  scene.add(group);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.PointLight(0xffffff, 1.6, 40); key.position.set(3, 5, 7); scene.add(key);
  const goalLight = new THREE.PointLight(0xF5C451, 1.2, 6); goalLight.position.set(0, 3.3, 0); group.add(goalLight);

  // ---- yulduzlar (fon)
  {
    const n = 700, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 9 + Math.random() * 9, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = r * Math.cos(ph) * 0.7; pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0x8AA0FF, size: 0.035, transparent: true, opacity: 0.55, depthWrite: false })));
  }

  // ---- glow teksturasi
  const glowTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();

  // ---- tugunlar (spiral)
  const data0 = window.roadmapData();
  const N = data0.nodes.length;
  const positions = [];
  const TURNS = 4.2, R = 2.35, H = 5.0;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1), a = t * Math.PI * 2 * TURNS;
    positions.push(new THREE.Vector3(R * Math.cos(a), -H / 2 + H * t, R * Math.sin(a)));
  }
  const nodeGeo = new THREE.SphereGeometry(0.075, 14, 14);
  const nodeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.15 });
  const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, N);
  nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  group.add(nodes);

  // ---- yo'l chizig'i (xira + yorug' qism)
  const curve = new THREE.CatmullRomCurve3(positions);
  const linePts = curve.getPoints(N * 3);
  const dimLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(linePts), new THREE.LineBasicMaterial({ color: 0x3A4670, transparent: true, opacity: 0.9 }));
  group.add(dimLine);
  const litGeo = new THREE.BufferGeometry().setFromPoints(linePts);
  litGeo.setDrawRange(0, 0);
  const litLine = new THREE.Line(litGeo, new THREE.LineBasicMaterial({ color: 0x8AA0FF }));
  group.add(litLine);

  // ---- yechilganlar uchun glow (Points, additive)
  const glowGeo = new THREE.BufferGeometry();
  glowGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
  glowGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
  const glow = new THREE.Points(glowGeo, new THREE.PointsMaterial({ map: glowTex, size: 0.55, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
  group.add(glow);

  // ---- keyingi masala belgisi (pulsatsiya)
  const marker = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffffff, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }));
  marker.scale.set(0.7, 0.7, 1);
  group.add(marker);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.012, 8, 40), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  group.add(ring);

  // ---- maqsad: Google (oltin)
  const goal = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 24), new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0.9, roughness: 0.3 }));
  goal.position.set(0, H / 2 + 0.45, 0);
  group.add(goal);
  const goalGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: GOLD, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
  goalGlow.position.copy(goal.position); goalGlow.scale.set(1.8, 1.8, 1);
  group.add(goalGlow);

  // ---- holatni qo'llash
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s3 = new THREE.Vector3();
  let nodesData = data0.nodes, nextIndex = data0.nextIndex;
  function apply(data) {
    nodesData = data.nodes; nextIndex = data.nextIndex;
    const gp = glowGeo.attributes.position.array, gc = glowGeo.attributes.color.array;
    let solved = 0;
    for (let i = 0; i < N; i++) {
      const n = data.nodes[i], p = positions[i];
      const sc = n.solved ? 1.45 : (i === nextIndex ? 1.25 : 1);
      m4.compose(p, q, s3.set(sc, sc, sc)); nodes.setMatrixAt(i, m4);
      nodes.setColorAt(i, n.solved ? DIFF[n.d] : (i === nextIndex ? new THREE.Color(0xE6EAF2) : DIM));
      if (n.solved) {
        const c = DIFF[n.d];
        gp[solved * 3] = p.x; gp[solved * 3 + 1] = p.y; gp[solved * 3 + 2] = p.z;
        gc[solved * 3] = c.r; gc[solved * 3 + 1] = c.g; gc[solved * 3 + 2] = c.b;
        solved++;
      }
    }
    nodes.instanceMatrix.needsUpdate = true;
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
    glowGeo.setDrawRange(0, solved);
    glowGeo.attributes.position.needsUpdate = true; glowGeo.attributes.color.needsUpdate = true;
    litGeo.setDrawRange(0, Math.round(linePts.length * solved / N));
    const mp = nextIndex >= 0 && nextIndex < N ? positions[nextIndex] : goal.position;
    marker.position.copy(mp); ring.position.copy(mp);
    marker.visible = ring.visible = nextIndex >= 0 && nextIndex < N;
  }
  apply(data0);
  document.addEventListener('roadmap:update', () => apply(window.roadmapData()));

  // ---- o'lcham
  function resize() {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // ---- sudrash
  let dragging = false, lx = 0, ly = 0, moved = 0, rotX = 0.12, rotY = 0, vel = 0;
  canvas.addEventListener('pointerdown', e => { dragging = true; moved = 0; lx = e.clientX; ly = e.clientY; canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; });
  canvas.addEventListener('pointerup', e => { dragging = false; canvas.style.cursor = 'grab'; if (moved < 4) click(e); });
  canvas.addEventListener('pointercancel', () => { dragging = false; canvas.style.cursor = 'grab'; });
  canvas.addEventListener('pointerleave', () => { if (tip) tip.hidden = true; });

  // ---- hover / click (raycast)
  const ray = new THREE.Raycaster(); const ndc = new THREE.Vector2();
  let hovered = -1;
  function pick(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObject(nodes, false)[0];
    return hit && hit.instanceId != null ? hit.instanceId : -1;
  }
  canvas.addEventListener('pointermove', e => {
    if (dragging) {
      const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
      rotY += dx * 0.006; vel = dx * 0.006; rotX = Math.max(-0.6, Math.min(0.6, rotX + dy * 0.004));
      return;
    }
    const i = pick(e);
    if (i !== hovered) { hovered = i; canvas.style.cursor = i >= 0 ? 'pointer' : 'grab'; }
    if (tip) {
      if (i >= 0) {
        const n = nodesData[i];
        const st = n.solved ? 'yechilgan' : (i === nextIndex ? 'keyingi' : 'yechilmagan');
        tip.textContent = `#${n.id} ${n.name} · ${n.d} · ${n.w}-hafta · ${st}`;
        const r = wrap.getBoundingClientRect();
        tip.style.left = (e.clientX - r.left) + 'px'; tip.style.top = (e.clientY - r.top) + 'px'; tip.hidden = false;
      } else tip.hidden = true;
    }
  });
  function click(e) {
    const i = pick(e);
    if (i >= 0 && typeof window.roadmapGoto === 'function') window.roadmapGoto(nodesData[i].w, nodesData[i].id);
  }

  // ---- animatsiya (faqat ko'rinib turganda)
  let visible = true, t0 = performance.now();
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { threshold: 0.05 }).observe(wrap);
  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) return;
    const dt = Math.min(0.05, (now - t0) / 1000); t0 = now;
    if (!dragging) { if (!reduced) rotY += 0.12 * dt; rotY += vel; vel *= 0.92; }
    group.rotation.y = rotY; group.rotation.x = rotX;
    const pulse = reduced ? 1 : 1 + 0.18 * Math.sin(now / 350);
    marker.scale.set(0.7 * pulse, 0.7 * pulse, 1); ring.scale.setScalar(pulse); ring.lookAt(camera.position);
    goalGlow.scale.setScalar(1.8 + (reduced ? 0 : 0.12 * Math.sin(now / 900)));
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
} else if (canvas) {
  const sec = canvas.closest('.path3d'); if (sec) sec.hidden = true;
}
