/* Инфо о сборке — обновляется скриптом scripts/bake_build_info.py перед пушем */
const BUILD_TIME = "2026-09-19 17:58 UTC";
const BUILD_VERSION = "0.1.0";
const BUILD_NUMBER = 3;

const SVG = `<svg viewBox="0 0 676 131" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M359.804 43.6088H468.837C474.859 43.6088 479.739 48.4882 479.739 54.5108C479.739 60.5333 484.618 65.4128 490.641 65.4128H497.02C499.908 65.4128 502.686 64.2575 504.726 62.2172L520.151 46.7921C522.204 44.7395 523.347 41.9741 523.347 39.0857V32.7067C523.347 26.6842 518.467 21.8047 512.445 21.8047H359.804C353.782 21.8047 348.902 26.6842 348.902 32.7067C348.902 38.7293 353.782 43.6088 359.804 43.6088Z" fill="white"/>
<path d="M665.098 87.2285H658.719C655.831 87.2285 653.053 88.3839 651.013 90.4242L635.588 105.849C633.535 107.902 632.392 110.667 632.392 113.556V119.935C632.392 125.957 637.271 130.837 643.294 130.837H665.098C671.121 130.837 676 125.957 676 119.935V98.1305C676 92.108 671.121 87.2285 665.098 87.2285Z" fill="white"/>
<path d="M10.902 43.6081H17.281C20.1694 43.6081 22.9471 42.4528 24.9874 40.4125L40.4125 24.9874C42.4651 22.9348 43.6081 20.1694 43.6081 17.281V10.902C43.6081 4.87949 38.7287 0 32.7061 0H10.902C4.87949 0 0 4.87949 0 10.902V32.7061C0 38.727 4.87949 43.6081 10.902 43.6081Z" fill="white"/>
<path d="M665.098 21.8047H636.903C634.014 21.8047 631.237 22.96 629.196 25.0003L570.163 84.0336C568.11 86.0861 565.345 87.2292 562.457 87.2292H375.229C372.341 87.2292 369.563 86.0739 367.523 84.0336L330.294 46.8044C328.241 44.7518 327.098 41.9864 327.098 39.098V32.719C327.098 26.6965 322.218 21.817 316.196 21.817H69.9353C67.0469 21.817 64.2692 22.9723 62.2289 25.0126L3.19564 84.0336C1.14305 86.0861 0 88.8516 0 91.74V119.935C0 125.958 4.87949 130.837 10.902 130.837H17.281C20.1694 130.837 22.9471 129.682 24.9874 127.642L84.0207 68.6085C86.0732 66.5559 88.8387 65.4128 91.7271 65.4128H169.922C172.81 65.4128 175.588 64.2575 177.628 62.2172L193.053 46.7921C195.106 44.7395 197.871 43.5965 200.76 43.5965H272.563C278.586 43.5965 283.465 48.476 283.465 54.4985V60.8775C283.465 63.7658 282.31 66.5436 280.27 68.5839L264.845 84.009C262.792 86.0616 260.026 87.2046 257.138 87.2046H200.747C197.859 87.2046 195.081 88.36 193.041 90.4003L177.616 105.825C175.563 107.878 172.798 109.021 169.91 109.021H135.323C132.435 109.021 129.657 110.176 127.617 112.217C120.746 119.087 125.613 130.825 135.323 130.825H300.746C303.635 130.825 306.412 129.67 308.453 127.629L319.355 116.727C323.607 112.475 330.515 112.475 334.78 116.727L345.682 127.629C347.734 129.682 350.5 130.825 353.388 130.825H584.224C587.112 130.825 589.89 129.67 591.93 127.629L672.768 46.7921C674.82 44.7395 675.963 41.9741 675.963 39.0857V32.7067C675.963 26.6842 671.084 21.8047 665.061 21.8047H665.098Z" fill="white"/>
</svg>`;

export default {
  async fetch(request) {
    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>worldwidemultivision.com</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; }
    body {
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      min-height: 100vh; background: #111; overflow: hidden;
    }
    /* статичная виньетка — глубина сцены, НЕ реагирует на мышь */
    body::before {
      content: ""; position: fixed; inset: 0; pointer-events: none;
      background: radial-gradient(ellipse at 50% 42%, rgba(255,255,255,.05), transparent 55%);
    }
    .scene { perspective: 1300px; }
    .logo {
      width: min(676px, 90vw); height: auto;
      transform-style: preserve-3d;
      transform-origin: 50% 50%;
      will-change: transform;
      filter: drop-shadow(0 0 22px rgba(255,255,255,.14));
    }
    .logo svg { width: 100%; height: auto; display: block; }
    :root { --press-t: .18s; --press-ease: cubic-bezier(.22, .61, .36, 1); }
    .email {
      margin-top: 40px;
      font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
      font-size: clamp(15px, 2.2vw, 20px);
      color: #9a9a9a; letter-spacing: .04em;
      text-decoration: none; user-select: none;
      transition: color var(--press-t) var(--press-ease),
                  transform var(--press-t) var(--press-ease);
    }
    .email:hover { color: #fff; }
    .email.pressed { color: #fff; transform: translateY(1.5px); }
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
    .build-bar {
      position: fixed; top: 14px; left: 50%; transform: translateX(-50%);
      font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
      font-size: 11px; color: #454545; letter-spacing: .08em;
      white-space: nowrap; pointer-events: none; user-select: none;
    }
    .telegram {
      margin-top: 22px;
      display: inline-flex; align-items: center; gap: 9px;
      font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
      font-size: 15px; color: #9a9a9a; text-decoration: none;
      letter-spacing: .02em; user-select: none;
      transition: color var(--press-t) var(--press-ease),
                  transform var(--press-t) var(--press-ease);
    }
    .telegram:hover { color: #fff; transform: translateY(-2px); }
    .telegram.pressed { color: #fff; transform: translateY(0) scale(.96); }
    .telegram svg { width: 19px; height: 19px; display: block; flex: none; }
    .ripple {
      position: fixed; left: 0; top: 0; width: 10px; height: 10px;
      margin: -5px 0 0 -5px; border-radius: 50%;
      border: 1px solid rgba(255,255,255,.3);
      pointer-events: none;
      animation: ripple .5s var(--press-ease) forwards;
    }
    @keyframes ripple { to { transform: scale(8); opacity: 0; } }
  </style>
</head>
<body>
<div class="build-bar">build ${BUILD_TIME} &middot; v${BUILD_VERSION} &middot; #${BUILD_NUMBER}</div>
<div class="scene"><div class="logo" id="logo">${SVG}</div></div>
<a class="email" href="mailto:innokenty@worldwidemultivision.com">innokenty@worldwidemultivision.com</a>
<a class="telegram" href="https://t.me/designbygod" target="_blank" rel="noopener">
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
  <span>@designbygod</span>
</a>
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
    ambient: '/audio/ambient_web.mp3',
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
    src.connect(g); g.connect(AC.destination);
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
    src.connect(g); g.connect(AC.destination);
    src.start();
  }

  /* ============ Нажатия: каждый ассет реагирует по-своему ============ */
  // лого — плавное вдавливание в сцену (scale в главном цикле)
  var press = 0, pressT = 0;
  logo.addEventListener('pointerdown', function () { pressT = 1; });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) {
    logo.addEventListener(ev, function () { pressT = 0; });
  });
  // email — лёгкое опускание, telegram — тактильное сжатие (CSS .pressed)
  function pressFX(el) {
    if (!el) return;
    el.addEventListener('pointerdown', function () { el.classList.add('pressed'); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) {
      el.addEventListener(ev, function () { el.classList.remove('pressed'); });
    });
  }
  pressFX(document.querySelector('.email'));
  pressFX(document.querySelector('.telegram'));

  // пустота — тихий рипл из точки клика (единый стиль/изинг)
  window.addEventListener('pointerdown', function (e) {
    if (e.target.closest && e.target.closest('.logo, .email, .telegram')) return;
    var r = document.createElement('div');
    r.className = 'ripple';
    r.style.left = e.clientX + 'px';
    r.style.top = e.clientY + 'px';
    document.body.appendChild(r);
    r.addEventListener('animationend', function () { r.remove(); });
  });

  var lastHover = 0, hovered = false;
  logo.addEventListener('pointerenter', function () {
    if (!started || hovered) return;
    var n = performance.now();
    if (n - lastHover < 120) return;  // антиспам
    lastHover = n; hovered = true;
    play('hover');
  });
  logo.addEventListener('pointerleave', function () { hovered = false; });

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
    decodeAll();
    var hint = document.getElementById('hint');
    if (hint) hint.classList.add('hide');
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
  }
  window.addEventListener('pointerdown', unlock);
  window.addEventListener('keydown', unlock);

  // громкость слоя движения в главном цикле (плавно вверх при движении)
  var frame2 = function (now) {
    requestAnimationFrame(frame2);
    if (!AC || !gainBody || !started) return;
    var bt = moving ? BODY_VOL : 0;
    bodyVol += (bt - bodyVol) * 0.08;
    gainBody.gain.value = Math.max(0, Math.min(1, bodyVol));
  };
  requestAnimationFrame(frame2);
})();
</script>
</body>
</html>`;
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
}