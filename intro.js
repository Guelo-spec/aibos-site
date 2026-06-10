/* ============================================================
   AIBOS — Mobile intro (Phone Intro Draft 1, production)
   The PixelMark bursts into particles that fly into the hero
   headline's letterforms and fuse into the real <h1> in place.
   Rules: mobile-only; tap to start or auto-start after 3s;
   skipped on repeat visits (sessionStorage), reduced motion,
   and desktop. Fails open — any error just removes the overlay.
   ============================================================ */
(function () {
  'use strict';

  if (!window.matchMedia || !matchMedia('(max-width: 768px)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try { if (sessionStorage.getItem('aibos_intro_seen')) return; } catch (e) { return; }

  var BG = '#FAFAF8', INK = '#1A1815', GREEN = '#10A862', HINT = '#84827A';
  var GRID = 5, PER = 16, BURST_S = 1.5, FUSE0 = 1.55, FUSE1 = 2.3;

  var overlay = document.createElement('div');
  overlay.id = 'aibos-intro';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.cssText =
    'position:fixed;inset:0;z-index:99999;background:' + BG +
    ';transition:opacity .65s ease;touch-action:manipulation;';
  var cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  var hint = document.createElement('div');
  hint.style.cssText =
    'position:absolute;left:0;right:0;bottom:40px;text-align:center;' +
    "font:500 12px 'Geist Mono',monospace;letter-spacing:.08em;color:" + HINT +
    ';transition:opacity .4s;';
  hint.textContent = 'TAP TO BEGIN';
  overlay.appendChild(cv);
  overlay.appendChild(hint);
  document.body.appendChild(overlay);
  var prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';

  var cx = cv.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;
  function size() {
    W = overlay.clientWidth; H = overlay.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();

  var cell = Math.min(34, W * 0.085), gap = cell * 0.2;
  var logoW = GRID * cell + (GRID - 1) * gap;
  var ox = (W - logoW) / 2, oy = (H - logoW) / 2 - H * 0.06;

  var state = 'idle', t0 = 0, idle0 = 0, raf = 0, pendingStart = false;
  var particles = [], headLines = null, finished = false;

  function ease(u) { return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; }
  function clamp01(v) { return Math.min(Math.max(v, 0), 1); }

  function roundRect(x, y, w, h, r) {
    cx.beginPath();
    cx.moveTo(x + r, y);
    cx.arcTo(x + w, y, x + w, y + h, r); cx.arcTo(x + w, y + h, x, y + h, r);
    cx.arcTo(x, y + h, x, y, r); cx.arcTo(x, y, x + w, y, r);
    cx.fill();
  }

  /* Measure the real hero <h1>: font, position, and per-visual-line text
     (re-wrapped with canvas metrics to mirror the browser's wrapping). */
  function measureHeadline() {
    var h1 = document.querySelector('h1');
    if (!h1) return null;
    var cs = getComputedStyle(h1);
    var rect = h1.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) return null;
    var font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    var probe = document.createElement('canvas').getContext('2d');
    probe.font = font;
    if ('letterSpacing' in probe) probe.letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
    var maxW = h1.clientWidth;
    var hardLines = h1.innerText.split('\n');
    var lines = [];
    for (var i = 0; i < hardLines.length; i++) {
      var words = hardLines[i].split(/\s+/).filter(Boolean), cur = '';
      for (var j = 0; j < words.length; j++) {
        var test = cur ? cur + ' ' + words[j] : words[j];
        if (probe.measureText(test).width > maxW && cur) { lines.push(cur); cur = words[j]; }
        else cur = test;
      }
      if (cur) lines.push(cur);
    }
    var fsz = parseFloat(cs.fontSize);
    var lh = cs.lineHeight === 'normal' ? fsz * 1.2 : parseFloat(cs.lineHeight);
    var m = probe.measureText('Hg');
    var ascent = m.fontBoundingBoxAscent || fsz * 0.8;
    var descent = m.fontBoundingBoxDescent || fsz * 0.2;
    var firstBase = rect.top + (lh - (ascent + descent)) / 2 + ascent;
    var centered = cs.textAlign === 'center';
    return {
      font: font, ls: cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing,
      align: centered ? 'center' : 'left',
      x: centered ? rect.left + rect.width / 2 : rect.left,
      lines: lines,
      baselines: lines.map(function (_, i) { return firstBase + i * lh; })
    };
  }

  function drawHeadline(ctx) {
    ctx.font = headLines.font;
    if ('letterSpacing' in ctx) ctx.letterSpacing = headLines.ls;
    ctx.textAlign = headLines.align; ctx.textBaseline = 'alphabetic';
    for (var i = 0; i < headLines.lines.length; i++)
      ctx.fillText(headLines.lines[i], headLines.x, headLines.baselines[i]);
  }

  function buildParticles() {
    var off = document.createElement('canvas');
    off.width = W; off.height = H;
    var o = off.getContext('2d');
    o.fillStyle = '#fff';
    o.font = headLines.font;
    if ('letterSpacing' in o) o.letterSpacing = headLines.ls;
    o.textAlign = headLines.align; o.textBaseline = 'alphabetic';
    for (var i = 0; i < headLines.lines.length; i++)
      o.fillText(headLines.lines[i], headLines.x, headLines.baselines[i]);
    var data = o.getImageData(0, 0, W, H).data;
    var pts = [];
    for (var y = 0; y < H; y += 4)
      for (var x = 0; x < W; x += 4)
        if (data[(y * W + x) * 4 + 3] > 128) pts.push([x, y]);
    if (!pts.length) return false;
    particles = [];
    var k = 0;
    for (var r = 0; r < GRID; r++) for (var c = 0; c < GRID; c++) {
      var bx = ox + c * (cell + gap), by = oy + r * (cell + gap);
      var isG = r === 2 && c === 2;
      for (var i2 = 0; i2 < PER; i2++) {
        var sx = bx + (i2 % 4) * (cell / 4) + cell / 8;
        var sy = by + Math.floor(i2 / 4) * (cell / 4) + cell / 8;
        var tp = pts[(k * 37 + i2 * 211) % pts.length];
        particles.push({
          sx: sx, sy: sy, tx: tp[0], ty: tp[1],
          c: isG ? GREEN : INK,
          mx: sx + Math.sin(k * 3.7 + i2) * W * 0.4,
          my: sy + Math.cos(k * 2.3 + i2) * W * 0.4 - H * 0.12,
          d: (r * 5 + c) * 0.012 + (i2 % 4) * 0.008
        });
      }
      k++;
    }
    return true;
  }

  function drawIdle(ts) {
    cx.clearRect(0, 0, W, H);
    var s = 1 + Math.sin(ts / 600) * 0.025;
    cx.save();
    cx.translate(W / 2, oy + logoW / 2); cx.scale(s, s); cx.translate(-W / 2, -(oy + logoW / 2));
    for (var r = 0; r < GRID; r++) for (var c = 0; c < GRID; c++) {
      cx.fillStyle = r === 2 && c === 2 ? GREEN : INK;
      roundRect(ox + c * (cell + gap), oy + r * (cell + gap), cell, cell, cell * 0.15);
    }
    cx.restore();
  }

  function finish() {
    if (finished) return;
    finished = true;
    try { sessionStorage.setItem('aibos_intro_seen', '1'); } catch (e) {}
    overlay.style.opacity = '0';
    setTimeout(function () {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = prevOverflow;
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 700);
  }

  function ready() { return !!headLines || !!(headLines = measureHeadline()); }

  function start() {
    if (state !== 'idle') return;
    if (!ready() || !buildParticles()) { finish(); return; }
    state = 'anim'; t0 = 0;
    hint.style.opacity = '0';
  }

  function loop(ts) {
    if (finished) return;
    if (state === 'idle') {
      drawIdle(ts);
      if (pendingStart) {
        if (!idle0) idle0 = ts;
        if (ready()) start();
        else if (ts - idle0 > 7000) { finish(); return; }
      }
    } else if (state === 'anim') {
      if (!t0) t0 = ts;
      var T = (ts - t0) / 1000;
      cx.clearRect(0, 0, W, H);
      var cf = ease(clamp01((T - FUSE0) / (FUSE1 - FUSE0)));
      if (cf > 0) {
        cx.globalAlpha = cf; cx.fillStyle = INK;
        drawHeadline(cx);
        cx.globalAlpha = 1;
      }
      if (cf < 1) {
        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];
          var e = ease(clamp01((T - p.d) / BURST_S));
          var ie = 1 - e;
          var x = ie * ie * p.sx + 2 * ie * e * p.mx + e * e * p.tx;
          var y = ie * ie * p.sy + 2 * ie * e * p.my + e * e * p.ty;
          cx.globalAlpha = 1 - cf;
          cx.fillStyle = p.c;
          var sz = 7 - e * 4;
          cx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
        }
        cx.globalAlpha = 1;
      }
      if (T > FUSE1 + 0.25) { finish(); return; }
    }
    raf = requestAnimationFrame(loop);
  }

  overlay.addEventListener('click', function () {
    if (state === 'idle') { pendingStart = true; if (ready()) start(); }
    else finish();
  });
  window.addEventListener('orientationchange', finish);

  try { raf = requestAnimationFrame(loop); }
  catch (e) { finish(); }
})();
