/* Инфо о сборке — обновляется скриптом scripts/bake_build_info.py перед пушем */
const BUILD_TIME = "2026-09-20 20:25 UTC";
const BUILD_VERSION = "0.2.0";
const BUILD_NUMBER = 10;

const SVG = `<svg viewBox="0 0 341 66" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M181.499 21.9978H236.5C239.538 21.9978 241.999 24.4593 241.999 27.4973C241.999 30.5353 244.461 32.9967 247.499 32.9967H250.716C252.173 32.9967 253.575 32.4139 254.604 31.3847L262.385 23.6037C263.42 22.5683 263.997 21.1732 263.997 19.7162V16.4984C263.997 13.4604 261.535 10.999 258.497 10.999H181.499C178.461 10.999 176 13.4604 176 16.4984C176 19.5364 178.461 21.9978 181.499 21.9978Z" fill="white"/>
<path d="M335.5 44.001H332.282C330.825 44.001 329.424 44.5838 328.395 45.613L320.614 53.394C319.579 54.4294 319.002 55.8244 319.002 57.2814V60.4992C319.002 63.5372 321.463 65.9986 324.501 65.9986H335.5C338.538 65.9986 341 63.5372 341 60.4992V49.5004C341 46.4624 338.538 44.001 335.5 44.001Z" fill="white"/>
<path d="M5.49941 21.9977H8.71722C10.1742 21.9977 11.5754 21.4149 12.6046 20.3856L20.3856 12.6046C21.4211 11.5692 21.9977 10.1742 21.9977 8.71722V5.49941C21.9977 2.46141 19.5362 0 16.4982 0H5.49941C2.46141 0 0 2.46141 0 5.49941V16.4982C0 19.5362 2.46141 21.9977 5.49941 21.9977Z" fill="white"/>
<path d="M335.501 10.999H321.279C319.822 10.999 318.42 11.5818 317.391 12.611L287.612 42.3897C286.577 43.4251 285.182 44.0017 283.725 44.0017H189.28C187.823 44.0017 186.422 43.4189 185.393 42.3897L166.613 23.6099C165.578 22.5745 165.001 21.1794 165.001 19.7224V16.5046C165.001 13.4666 162.54 11.0052 159.502 11.0052H35.2781C33.8211 11.0052 32.4199 11.588 31.3907 12.6172L1.612 42.3897C0.576601 43.4251 0 44.8201 0 46.2771V60.4999C0 63.5379 2.46141 65.9994 5.49941 65.9994H8.71722C10.1742 65.9994 11.5754 65.4165 12.6046 64.3873L42.3833 34.6087C43.4187 33.5733 44.8137 32.9967 46.2707 32.9967H85.7152C87.1722 32.9967 88.5734 32.4139 89.6026 31.3847L97.3836 23.6037C98.419 22.5683 99.814 21.9916 101.271 21.9916H137.492C140.53 21.9916 142.991 24.4531 142.991 27.4911V30.7089C142.991 32.1659 142.408 33.5671 141.379 34.5963L133.598 42.3773C132.562 43.4127 131.168 43.9893 129.711 43.9893H101.265C99.8078 43.9893 98.4066 44.5721 97.3774 45.6013L89.5964 53.3823C88.561 54.4177 87.166 54.9943 85.709 54.9943H68.2622C66.8052 54.9943 65.404 55.5771 64.3747 56.6063C60.9089 60.0721 63.3641 65.9932 68.2622 65.9932H151.708C153.165 65.9932 154.566 65.4103 155.596 64.3811L161.095 58.8817C163.24 56.7365 166.725 56.7365 168.876 58.8817L174.375 64.3811C175.411 65.4165 176.806 65.9932 178.263 65.9932H294.705C296.162 65.9932 297.564 65.4103 298.593 64.3811L339.37 23.6037C340.406 22.5683 340.982 21.1732 340.982 19.7162V16.4984C340.982 13.4604 338.521 10.999 335.483 10.999H335.501Z" fill="white"/>
</svg>`;

export default {
  async fetch(request) {
    // реальный статус: MCP проверяем server-side (этот воркер отвечает => Active)
    let mcpReady = false;
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 2500);
      const r = await fetch('https://mcp.worldwidemultivision.com/', { signal: ctrl.signal });
      mcpReady = r.ok;
      clearTimeout(t);
    } catch (e) { mcpReady = false; }
    const serverStatus = 'Server: Active' + (mcpReady ? ' · MCP ready' : ' · MCP offline');

    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>worldwidemultivision.com</title>
  <script type="importmap">
  { "imports": {
      "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
      "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
  } }
  </script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; }
    body { min-height: 100vh; background: #000; overflow: hidden; }
    canvas#bg3d {
      position: fixed; inset: 0; width: 100%; height: 100%;
      z-index: 0; display: block;
    }
    .vignette {
      position: fixed; inset: 0; z-index: 1; pointer-events: none;
      background: radial-gradient(ellipse at center,
        rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%);
    }
    .ui {
      position: fixed; inset: 0; z-index: 2;
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(5, 1fr);
    }
    .meta {
      grid-column: 2 / 5; grid-row: 2;
      display: grid; grid-template-columns: repeat(3, 1fr);
      align-items: start; gap: 8px;
      font-family: "Segoe UI", system-ui, sans-serif;
      font-size: clamp(9px, .72vw, 12px);
      color: #4a4a4a; letter-spacing: .08em; text-transform: uppercase;
    }
    .meta span { white-space: nowrap; }
    .scene {
      grid-column: 2 / 5; grid-row: 3;
      perspective: 1300px;
      display: flex; align-items: center; justify-content: center;
    }
    .logo {
      width: min(341px, 30vw); height: auto;
      transform-style: preserve-3d;
      transform-origin: 50% 50%;
      will-change: transform;
      filter: drop-shadow(0 0 22px rgba(255,255,255,.14));
    }
    .logo svg { width: 100%; height: auto; display: block; }
    .buttons {
      grid-column: 8 / 10; grid-row: 3;
      display: flex; align-items: center;
      gap: clamp(20px, 2.6vw, 52px);
    }
    .btn {
      font-family: "Segoe UI", system-ui, sans-serif;
      font-size: clamp(14px, 1.35vw, 19px);
      font-weight: 400; color: #fff; letter-spacing: .03em;
      text-decoration: none; white-space: nowrap;
      background: none; border: 0; padding: 0; cursor: pointer;
      transition: opacity var(--press-t) var(--press-ease),
                  transform var(--press-t) var(--press-ease),
                  filter var(--press-t) var(--press-ease);
      filter: drop-shadow(0 0 6px rgba(255,255,255,.05));
    }
    .btn:hover { opacity: .65; transform: translateY(-2px); filter: drop-shadow(0 0 12px rgba(255,255,255,.28)); }
    .btn.pressed { opacity: .5; transform: translateY(1.5px) scale(.94); }
    @media (max-width: 760px) {
      .ui { grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; padding: 20px; }
      .meta { grid-column: 1; grid-row: 1; grid-template-columns: repeat(3, 1fr); }
      .scene { grid-column: 1; grid-row: 2; }
      .logo { width: min(341px, 82vw); }
      .buttons { grid-column: 1; grid-row: 3; flex-wrap: wrap; justify-content: center; }
    }
    :root { --press-t: .18s; --press-ease: cubic-bezier(.22, .61, .36, 1); }
    .sound-hint {
      position: fixed; bottom: 18px; right: 22px;
      font-family: "Segoe UI", system-ui, sans-serif; font-size: 12px;
      color: #4a4a4a; letter-spacing: .06em;
      pointer-events: none; transition: opacity 1.2s ease;
    }
    .sound-hint.hide { opacity: 0; }
    .gyro-hint {
      position: fixed; bottom: 18px; left: 22px; max-width: 70vw;
      font-family: "Segoe UI", system-ui, sans-serif; font-size: 12px;
      color: #4a4a4a; letter-spacing: .06em;
      pointer-events: none; transition: opacity 1.2s ease;
    }
    .gyro-hint.hide { opacity: 0; }
  </style>
</head>
<body>
<canvas id="bg3d"></canvas>
<div class="vignette"></div>
<main class="ui">
  <div class="meta">
    <span>ВЕРСИЯ ${BUILD_VERSION}</span>
    <span>${serverStatus}</span>
    <span>Designed by Semenov Innokentii (C) MMXXVI</span>
  </div>
  <div class="scene"><div class="logo" id="logo">${SVG}</div></div>
  <div class="buttons">
    <a class="btn" href="#" aria-label="Spotify">Spotify</a>
    <a class="btn" href="https://t.me/designbygod" target="_blank" rel="noopener" aria-label="Telegram">Telegram</a>
    <a class="btn" href="#" aria-label="YouTube">YouTube</a>
    <a class="btn" href="#" aria-label="Shop">Shop</a>
  </div>
</main>
<div class="sound-hint" id="hint">звук включится после первого клика</div>
<div class="gyro-hint hide" id="gyro-hint"></div>
<script>
(function () {
  /* ============ Лого: мышь — едва заметная реакция (~0.2-0.5%) ============ */
  var logo = document.getElementById('logo');
  var RY = 5.0;   // макс. rotateY, ° (мышь)
    var RX = 3.5;   // макс. rotateX, ° (мышь)
    var PX = 14, PY = 10;  // макс. сдвиг, px (мышь)
    var rx = 0, ry = 0, px = 0, py = 0;     // текущие (сглаженные)
    var rxT = 0, ryT = 0, pxT = 0, pyT = 0; // цели от мыши
    var K = 10;      // скорость сглаживания (1/с) — отзывчивее

  /* ============ Гироскоп (iPhone): заметная динамика ============ */
  var GY_ON = false;
  var GY_RY = 18, GY_RX = 13;      // макс. углы, °
    var GY_PX = 24, GY_PY = 18;      // макс. сдвиг, px
  var baseG = null, baseB = null; // стартовая поза устройства
  var dxt = 0, dyt = 0, dpx = 0, dpy = 0; // цели от гироскопа
  var gyroTry = 0;

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  function onOrient(e) {
    if (e.gamma === null || e.beta === null) return;
    if (!GY_ON) { // первое живое событие от датчика — включаем режим
      GY_ON = true;
      baseG = e.gamma; baseB = e.beta;
      var h = document.getElementById('gyro-hint');
      if (h) { h.textContent = 'гироскоп активен'; h.classList.remove('hide');
               setTimeout(function(){ h.classList.add('hide'); }, 4000); }
    }
    var dg = clamp(e.gamma - baseG, -45, 45); // отклонение влево/вправо
    var db = clamp(e.beta  - baseB, -45, 45); // отклонение вперёд/назад
    dyt = (dg / 45) * GY_RY;
    dxt = (db / 45) * GY_RX;
    dpx = (dg / 45) * GY_PX;
    dpy = (db / 45) * GY_PY;
  }

  function startGyro() {
    if (GY_ON) return;                      // датчик уже живой
    if (gyroTry++ >= 3) return;             // максимум 3 попытки на загрузку
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+: разрешение именно на deviceorientation, из click/touchend-жеста
      DeviceOrientationEvent.requestPermission().then(function (resp) {
        if (resp === 'granted') {
          window.addEventListener('deviceorientation', onOrient);
        } else {
          var h = document.getElementById('gyro-hint');
          if (h) { h.textContent = 'гироскоп запрещён: Настройки → Safari → Доступ к датчикам движения';
                   h.classList.remove('hide'); }
        }
      }).catch(function () {});
    } else if (window.DeviceOrientationEvent) {
      // Android/прочие: разрешения не нужно
      window.addEventListener('deviceorientation', onOrient);
    }
  }

  // iOS признаёт user gesture только в click/touchend — touchstart ненадёжен
  window.addEventListener('touchend', startGyro);
  window.addEventListener('click', startGyro);

  window.addEventListener('mousemove', function (e) {
    var nx = (e.clientX / window.innerWidth) * 2 - 1;
    var ny = (e.clientY / window.innerHeight) * 2 - 1;
    ryT = nx * RY;
    rxT = ny * RX;
    pxT = nx * PX;
    pyT = ny * PY;
  });
  window.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget) { rxT = ryT = pxT = pyT = 0; }
  });

  function frame(now) {
    var dt = Math.min(0.05, (now - prev) / 1000);
    prev = now;
    var k = Math.min(1, dt * K);
    // гироскоп активен — он главный (на телефоне мыши нет), иначе мышь
    var tRX = GY_ON ? dxt : rxT;
    var tRY = GY_ON ? dyt : ryT;
    var tPX = GY_ON ? dpx : pxT;
    var tPY = GY_ON ? dpy : pyT;
    rx += (tRX - rx) * k;
    ry += (tRY - ry) * k;
    px += (tPX - px) * k;
    py += (tPY - py) * k;
    press += (pressT - press) * k;   // плавный press-in/out лого
    logo.style.transform =
      'perspective(1300px) translate3d(' + px.toFixed(2) + 'px,' + py.toFixed(2) + 'px,0)' +
      ' rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)' +
      ' scale(' + (1 - press * 0.02).toFixed(4) + ')';
    requestAnimationFrame(frame);
  }
  var prev = performance.now();
  requestAnimationFrame(frame);

  /* ============ Аудио (AudioContext: низкая задержка hover) ============ */
  var FILES = {
    ambient: '/audio/ambient_catechism.mp3',
    body:    '/audio/mouse_layer_body_mono.mp3',
    hover0:  '/audio/mouse_hoover_01.mp3',
    hover1:  '/audio/mouse_hoover_02.mp3',
    hover2:  '/audio/mouse_hoover_03.mp3',
    hover3:  '/audio/mouse_hoover_04.mp3',
    click0:  '/audio/mouse_click_01.mp3',
    click1:  '/audio/mouse_click_02.mp3',
    click2:  '/audio/mouse_click_03.mp3',
    click3:  '/audio/mouse_click_04.mp3'
  };
  var AMBIENT_VOL = 0.35, BODY_VOL = 0.16;
  var raw = {}, buf = {};   // сырые байты / декодированные буферы
  var AC = null, gainAmbient = null, gainBody = null;
  var master = null, analyser = null, freqData = null;
  var started = false;

  // предзагрузка байтов сразу (fetch не требует user-gesture)
  Object.keys(FILES).forEach(function (n) {
    fetch(FILES[n]).then(function (r) { return r.arrayBuffer(); })
      .then(function (ab) { raw[n] = ab; })
      .catch(function () {});
  });

  function startLoop(name, vol) {
    if (!buf[name]) return;
    var src = AC.createBufferSource();
    src.buffer = buf[name]; src.loop = true;
    var g = AC.createGain(); g.gain.value = vol;
    src.connect(g); g.connect(master);
    src.start();
    if (name === 'ambient') gainAmbient = g;
    if (name === 'body') gainBody = g;
  }

  function decodeAll() {
    Object.keys(FILES).forEach(function (n) {
      if (!raw[n]) return;
      AC.decodeAudioData(raw[n].slice(0)).then(function (dec) {
        buf[n] = dec;
        if (n === 'ambient') startLoop('ambient', AMBIENT_VOL);
        if (n === 'body') startLoop('body', 0);
      }).catch(function () {});
    });
  }

  function play(prefix) {
    if (!AC || !started) return;
    var picks = [buf[prefix + '0'], buf[prefix + '1'], buf[prefix + '2'], buf[prefix + '3']]
      .filter(Boolean);
    if (!picks.length) return;
    var src = AC.createBufferSource();
    src.buffer = picks[Math.floor(Math.random() * picks.length)];
    var g = AC.createGain(); g.gain.value = 0.5;
    src.connect(g); g.connect(master);
    src.start();
  }

  /* ============ Нажатия: каждый ассет реагирует по-своему ============ */
  // лого — плавное вдавливание в сцену (scale в главном цикле)
  var press = 0, pressT = 0;
  logo.addEventListener('pointerdown', function () { pressT = 1; });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) {
    logo.addEventListener(ev, function () { pressT = 0; });
  });
  // кнопки — тактильное сжатие + hover-звук (компоненты с анимацией)
  function pressFX(el) {
    if (!el) return;
    el.addEventListener('pointerdown', function () { el.classList.add('pressed'); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) {
      el.addEventListener(ev, function () { el.classList.remove('pressed'); });
    });
  }
  document.querySelectorAll('.btn').forEach(pressFX);

  var lastHover = 0, hovered = false;
  logo.addEventListener('pointerenter', function () {
    if (!started || hovered) return;
    var n = performance.now();
    if (n - lastHover < 120) return;  // антиспам
    lastHover = n; hovered = true;
    play('hover');
  });
  logo.addEventListener('pointerleave', function () { hovered = false; });
  document.querySelectorAll('.btn').forEach(function (b) {
    b.addEventListener('pointerenter', function () {
      if (!started || hovered) return;
      var n = performance.now();
      if (n - lastHover < 120) return;
      lastHover = n; hovered = true;
      play('hover');
    });
    b.addEventListener('pointerleave', function () { hovered = false; });
  });

  window.addEventListener('pointerdown', function () {
    if (!started) return;
    play('click');
  });

  var moving = false, moveTimer = null, bodyVol = 0;
  window.addEventListener('mousemove', function () {
    moving = true;
    clearTimeout(moveTimer);
    moveTimer = setTimeout(function () { moving = false; }, 250);
  });

  function unlock() {
    if (started) return;
    started = true;
    var Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return;
    AC = new Ctor();
    AC.resume();
    master = AC.createGain(); master.gain.value = 1;
    analyser = AC.createAnalyser(); analyser.fftSize = 256;
    master.connect(analyser); analyser.connect(AC.destination);
    freqData = new Uint8Array(analyser.frequencyBinCount);
    // отдаём уровень громкости 3D-сцене (для «лампочки»)
    window.__audioLevel = 0;
    decodeAll();
    var hint = document.getElementById('hint');
    if (hint) hint.classList.add('hide');
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
  }
  window.addEventListener('pointerdown', unlock);
  window.addEventListener('keydown', unlock);

  // громкость слоя движения + экспорт уровня для блика
  var frame2 = function (now) {
    requestAnimationFrame(frame2);
    if (!AC || !gainBody || !started) return;
    var bt = moving ? BODY_VOL : 0;
    bodyVol += (bt - bodyVol) * 0.08;
    gainBody.gain.value = Math.max(0, Math.min(1, bodyVol));
    if (analyser) {
      analyser.getByteFrequencyData(freqData);
      var sum = 0;
      for (var i = 0; i < freqData.length; i++) sum += freqData[i];
      window.__audioLevel = sum / freqData.length / 255;   // 0..1
    }
  };
  requestAnimationFrame(frame2);
})();
</script>
<script type="module">
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

(function () {
  const canvas = document.getElementById('bg3d');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.05, 120);
  camera.position.set(0, 1.6, 0);

  // тусклое ночное освещение — тёмная атмосфера, акценты на emissive-полосах
  scene.add(new THREE.AmbientLight(0x223344, 0.55));
  const key = new THREE.DirectionalLight(0x8899bb, 0.45);
  key.position.set(3, 4, 2);
  scene.add(key);
  const down = new THREE.DirectionalLight(0x335577, 0.30);
  down.position.set(0, 0, 8);      // слабый свет вдоль коридора вглубь
  scene.add(down);
  const rim = new THREE.DirectionalLight(0x113355, 0.35);
  rim.position.set(-4, 2, -5);
  scene.add(rim);

  let model = null;
  let depth = 8;      // длина коридора (вдоль Z)
  let halfW = 3;      // половина ширины (X)
  let eyeY = 0;       // уровень глаз (Y)

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load('/models/sci_fi_hallway.glb', (gltf) => {
    // двусторонние материалы — интерьер коридора виден изнутри
    gltf.scene.traverse((o) => {
      if (o.isMesh && o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => { m.side = THREE.DoubleSide; });
      }
    });
    const g = new THREE.Group();
    g.add(gltf.scene);
    const b = new THREE.Box3().setFromObject(g);
    const center = b.getCenter(new THREE.Vector3());
    const size = b.getSize(new THREE.Vector3());
    g.position.sub(center);          // центр модели -> origin
    scene.add(g);
    // оси: глубина = самая длинная горизонтальная ось, высота = Y
    const horiz = { x: size.x, z: size.z };
    depth = Math.max(horiz.x, horiz.z);
    halfW = Math.min(horiz.x, horiz.z) / 2;
    eyeY = -0.4;                     // ниже центра высоты — уровень взгляда человека
    model = g;
    console.log('hallway loaded', JSON.stringify(size), 'depth', depth, 'halfW', halfW);
  }, undefined, (err) => { console.error('GLB load error', err); });

  // ввод: мышь + гироскоп -> целевые углы параллакса
  const target = { mx: 0, my: 0, gx: 0, gy: 0 };
  const cur = { mx: 0, my: 0, gx: 0, gy: 0 };

  window.addEventListener('mousemove', (e) => {
    target.mx = (e.clientX / window.innerWidth) * 2 - 1;
    target.my = (e.clientY / window.innerHeight) * 2 - 1;
  });

  let baseG = null, baseB = null;
  function onOrient(e) {
    if (e.gamma == null || e.beta == null) return;
    if (baseG == null) { baseG = e.gamma; baseB = e.beta; }
    target.gx = Math.max(-1, Math.min(1, (e.gamma - baseG) / 30));
    target.gy = Math.max(-1, Math.min(1, (e.beta - baseB) / 30));
  }
  window.addEventListener('deviceorientation', onOrient);
  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    // разрешение запросит существующий UI-обработчик при первом клике; здесь просто слушаем
  }

  const clock = new THREE.Clock();

  function frame() {
    requestAnimationFrame(frame);
    const dt = clock.getDelta();
    const tt = clock.elapsedTime;

    // сглаживание ввода
    const k = Math.min(1, dt * 4);
    cur.mx += (target.mx - cur.mx) * k;
    cur.my += (target.my - cur.my) * k;
    cur.gx += (target.gx - cur.gx) * k;
    cur.gy += (target.gy - cur.gy) * k;

    if (model) {
      // очень медленное возвратно-поступательное дрейфование в дальней части коридора.
      // Камера НЕ доходит впритык к двери (зазор depth*0.2) и не проходит насквозь.
      const doorZ = depth / 2;              // дверь в конце (−Z после разворота)
      const gap = depth * 0.20;             // зазор до двери
      const centerZ = doorZ - depth * 0.55; // середина траектории, ближе к дальней части
      const amp = depth * 0.06;             // маленькая амплитуда дрейфа — фокус на двери
      const z = centerZ + Math.sin(tt * 0.06) * amp;
      // параллакс от мыши/гироскопа (очень сдержанный — фокус держится на двери)
      const px = cur.mx * halfW * 0.18 + cur.gx * halfW * 0.14;
      const py = cur.my * 0.14 + cur.gy * 0.11;
      camera.position.set(px, eyeY + py, z);
      // смотрим на дверь (−Z), почти не сдвигая точку взгляда
      const lookX = px + cur.mx * halfW * 0.22 + cur.gx * halfW * 0.16;
      const lookY = eyeY + py + cur.my * 0.18 + cur.gy * 0.13;
      camera.lookAt(lookX, lookY, z - 1);
      camera.rotation.z += cur.mx * 0.008;
    } else {
      // до загрузки — лёгкое параллакс-покачивание пустой сцены
      camera.position.set(cur.mx * 0.3, 1.6 + cur.my * 0.2, 0);
      camera.lookAt(0, 1.6, -1);
    }
    renderer.render(scene, camera);
  }
  frame();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
</script>
</body>
</html>`;
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
}