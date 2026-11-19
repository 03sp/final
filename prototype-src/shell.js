/* Shell: router, frame, themes, helpers (Anim, Gears, Logo, Icons, Fmt). Screens register on window.Screens. */
(function () {
  'use strict';
  const Reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const Q = new URLSearchParams(location.search);

  /* ---------- formatting ---------- */
  const Fmt = {
    num: (n, d = 0) => Number(n).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d }),
    inr: n => '₹' + Number(n).toLocaleString('en-IN'),
    pct: (n, d = 1) => Number(n).toFixed(d) + '%'
  };

  /* ---------- animation helpers ---------- */
  const Anim = {
    countUp(el, o) {
      const { to, from = 0, dur = 1300, delay = 0, decimals = 0, prefix = '', suffix = '', group = true } = o;
      const f = v => prefix + (group ? Fmt.num(v, decimals) : v.toFixed(decimals)) + suffix;
      if (Reduced) { el.textContent = f(to); return () => {}; }
      el.textContent = f(from);
      let raf, t0, dead = false;
      const step = t => {
        if (dead) return;
        if (!t0) t0 = t;
        const p = Math.min(1, (t - t0) / dur), e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = f(from + (to - from) * e);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      const id = setTimeout(() => { raf = requestAnimationFrame(step); }, delay);
      return () => { dead = true; clearTimeout(id); cancelAnimationFrame(raf); };
    },
    /* Scans root for [data-count] (value, data-decimals/prefix/suffix/dur/delay/group="false"), [data-draw] (SVG stroke draw-on, data-delay ms), [data-bar] (grow in; set style="--d:.2s"). Idempotent. */
    scan(root) {
      $$('[data-count]', root).forEach(el => {
        if (el.dataset.done) return; el.dataset.done = 1;
        Anim.countUp(el, {
          to: parseFloat(el.dataset.count), from: parseFloat(el.dataset.from || 0), decimals: +(el.dataset.decimals || 0),
          prefix: el.dataset.prefix || '', suffix: el.dataset.suffix || '', dur: +(el.dataset.dur || 1300),
          delay: +(el.dataset.delay || 0), group: el.dataset.group !== 'false'
        });
      });
      $$('[data-draw]', root).forEach(el => {
        if (el.dataset.done) return; el.dataset.done = 1;
        if (Reduced || !el.getTotalLength) return;
        const L = el.getTotalLength(); el.style.strokeDasharray = L; el.style.strokeDashoffset = L;
        el.getBoundingClientRect();
        el.style.transition = 'stroke-dashoffset 1.3s var(--ease) ' + (+(el.dataset.delay || 0)) + 'ms';
        requestAnimationFrame(() => { el.style.strokeDashoffset = 0; });
      });
      requestAnimationFrame(() => requestAnimationFrame(() => $$('[data-bar]', root).forEach(el => el.classList.add('in'))));
    }
  };

  /* ---------- gears ---------- */
  const Gears = {
    /* module m (tooth size). pitch radius = teeth*m/2 */
    dims(teeth, m = 3) { const pr = teeth * m / 2; return { pitch: pr, outer: pr + m * 0.85, root: pr - m * 1.05 }; },
    path(teeth, ro, rr) {
      const step = 2 * Math.PI / teeth, P = (a, r) => (Math.cos(a) * r).toFixed(2) + ' ' + (Math.sin(a) * r).toFixed(2);
      let d = '';
      for (let i = 0; i < teeth; i++) {
        const a = i * step, b = step * 0.27, t = step * 0.15;
        d += (i ? 'A' + rr + ' ' + rr + ' 0 0 1 ' + P(a - b, rr) : 'M' + P(a - b, rr)) + 'L' + P(a - t, ro) + 'L' + P(a + t, ro) + 'L' + P(a + b, rr);
      }
      return d + 'A' + rr + ' ' + rr + ' 0 0 1 ' + P(-step * 0.27, rr) + 'Z';
    },
    /* Returns an <svg> string. opts: teeth, m (module, default 3), hole (0-1 of root radius, default .4), spokes (count of round cut-outs, default 0), cls, dur (seconds per rev), reverse, phase (deg), size (css px; default = 2*outer), label */
    svg(o) {
      const { teeth = 12, m = 3, hole = 0.4, spokes = 0, cls = 'spin', dur = 14, reverse = false, phase = 0, size, label = '' } = o;
      const g = Gears.dims(teeth, m), vb = g.outer + 2, hr = g.root * hole;
      let d = Gears.path(teeth, g.outer.toFixed(2), g.root.toFixed(2)) + 'M' + hr + ' 0a' + hr + ' ' + hr + ' 0 1 0 ' + (-2 * hr) + ' 0a' + hr + ' ' + hr + ' 0 1 0 ' + 2 * hr + ' 0Z';
      for (let i = 0; i < spokes; i++) { // round cut-outs between hub and rim
        const a = i * 2 * Math.PI / spokes, rc = (hr + g.root) / 2, rr = Math.max(1.2, (g.root - hr) * 0.26);
        const cx = Math.cos(a) * rc, cy = Math.sin(a) * rc;
        d += 'M' + (cx + rr).toFixed(2) + ' ' + cy.toFixed(2) + 'a' + rr.toFixed(2) + ' ' + rr.toFixed(2) + ' 0 1 0 ' + (-2 * rr).toFixed(2) + ' 0a' + rr.toFixed(2) + ' ' + rr.toFixed(2) + ' 0 1 0 ' + (2 * rr).toFixed(2) + ' 0Z';
      }
      const px = size || Math.round(vb * 2);
      return '<svg class="gear ' + cls + (reverse ? ' rev' : '') + '" style="--dur:' + dur + 's" width="' + px + '" height="' + px + '" viewBox="' + (-vb) + ' ' + (-vb) + ' ' + 2 * vb + ' ' + 2 * vb + '"' + (label ? ' role="img" aria-label="' + label + '"' : ' aria-hidden="true"') + '><g transform="rotate(' + phase + ')"><path class="gear-body" fill-rule="evenodd" d="' + d + '"/></g></svg>';
    },
    /* For a gear2 meshing with gear1 (phase1 = 0) with gear2's centre at contact angle phiDeg (SVG angle, y down, 0 = to the right) from gear1: returns {phase2, dur2, distance}. Gear 1 turns clockwise (no .rev), gear 2 must get .rev and dur2 = dur1*n2/n1. */
    mesh(n1, n2, m = 3, dur1 = 14, phiDeg = 0, phase1 = 0) {
      const s1 = 360 / n1, s2 = 360 / n2;
      const mod = (x, y) => ((x % y) + y) % y;
      const local1 = mod(phiDeg - phase1, s1), frac = mod(0.5 - local1 / s1, 1);
      return { phase2: phiDeg + 180 - s2 * frac, dur2: dur1 * n2 / n1, distance: (n1 + n2) * m / 2, dx: Math.cos(phiDeg * Math.PI / 180) * (n1 + n2) * m / 2, dy: Math.sin(phiDeg * Math.PI / 180) * (n1 + n2) * m / 2 };
    }
  };

  /* ---------- logo (user-supplied image in LOGO_SRC) ---------- */
  const Logo = {
    html(o = {}) {
      const { size = 40, wordmark = false } = o;
      return '<span class="logo logo-slot"><img class="lm-img" style="--lh:' + size + 'px" src="' + window.LOGO_SRC + '" alt="Bajaj Finance">' + (wordmark ? '<span class="logo-word">' + DATA.product + '</span>' : '') + '</span>';
    }
  };

  /* ---------- icons ---------- */
  const st = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const Icons = {
    overview: '<svg viewBox="0 0 24 24" ' + st + '><rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/></svg>',
    timeline: '<svg viewBox="0 0 24 24" ' + st + '><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></svg>',
    config: Gears.svg({ teeth: 8, m: 2.2, hole: 0.38, cls: '', size: 22 }),
    out: '<svg viewBox="0 0 24 24" ' + st + '><path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/></svg>',
    bell: '<svg viewBox="0 0 24 24" width="20" height="20" ' + st + '><path d="M6 17V11a6 6 0 1 1 12 0v6l1.5 2h-15zM10 21h4"/></svg>',
    search: '<svg viewBox="0 0 24 24" width="18" height="18" ' + st + '><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>'
  };

  /* ---------- themes + session ---------- */
  const THEMES = [
    { id: 'pop', name: 'Pop', a: '#FF3E8A', b: '#FFD93D' },
    { id: 'night', name: 'Midnight', a: '#FF6F59', b: '#36E3D3' },
    { id: 'soda', name: 'Soda', a: '#3A3CFF', b: '#FF8A1F' },
    { id: 'neon', name: 'Neon', a: '#39FF14', b: '#050605' }
  ];
  let theme = 'pop';
  try { theme = localStorage.getItem('dms-theme') || 'pop'; } catch (e) {}
  if (Q.get('theme')) theme = Q.get('theme');
  if (!THEMES.some(t => t.id === theme)) theme = 'pop';
  const session = { signedIn: Q.get('auth') === '1' };

  function setTheme(id) {
    theme = id; document.documentElement.dataset.skin = id;
    try { localStorage.setItem('dms-theme', id); } catch (e) {}
    $$('[data-theme-pick]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.themePick === id)));
    window.dispatchEvent(new CustomEvent('themechange', { detail: id })); // re-read CSS vars if you draw in canvas/JS
  }
  const themeSwitch = (cls = '') => '<div class="themes ' + cls + '" role="radiogroup" aria-label="Colour theme">' + THEMES.map(t =>
    '<button role="radio" aria-checked="' + (t.id === theme) + '" data-theme-pick="' + t.id + '"><i style="--s1:' + t.a + ';--s2:' + t.b + '"></i><span>' + t.name + '</span></button>').join('') + '</div>';

  /* ---------- router ---------- */
  const Screens = window.Screens = window.Screens || {};
  const ROUTES = ['intro', 'login', 'search', 'overview', 'timeline', 'config'];
  const BARE = new Set(['intro', 'login']);
  const NAV = [['search', 'Customer search'], ['overview', 'Customer overview'], ['timeline', 'Communication timeline'], ['config', 'Rule configuration']];
  let cleanup = null;

  const go = name => { if (location.hash === '#/' + name) render(); else location.hash = '#/' + name; };
  const ctx = {
    go, data: null, fmt: Fmt, Anim, Gears, Logo, Icons, reduced: Reduced, session,
    signIn() { session.signedIn = true; go('search'); },
    toast(msg) {
      let t = $('.toast'); if (t) t.remove();
      t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg; document.body.appendChild(t);
      setTimeout(() => t.classList.add('out'), 2200); setTimeout(() => t.remove(), 2600);
    },
    signOut() { session.signedIn = false; go('login'); },
    get theme() { return theme; }, setTheme
  };

  function frame(name) {
    const S = Screens[name] || {}, cu = ctx.selection ? ctx.selection.customer : DATA.customer;
    return '<div class="frame"><aside class="side"><div class="side-brand">' + Logo.html({ size: 40, wordmark: true }) + '</div>' +
      '<nav class="side-nav" aria-label="Main">' + (() => {
        const lk = (k, l, x) => { const on = k === name; return '<a href="#/' + k + '" class="side-link' + (on ? ' on' : '') + (x || '') + '"' + (on ? ' aria-current="page"' : '') + '>' + Icons[k] + '<span>' + l + '</span></a>'; };
        const par = name === 'overview' || name === 'timeline';
        return lk('search', 'Customer search', par ? ' parent' : '') + '<div class="side-sub">' + lk('overview', 'Customer overview') + lk('timeline', 'Communication timeline') + '</div>' + lk('config', 'Rule configuration');
      })() + '</nav>' +
      '<div class="side-foot"><div class="side-who"><span class="avatar">' + cu.initials + '</span><div><b>' + cu.name + '</b><span class="m">' + cu.cif + ' · ' + cu.city + '</span></div></div>' +
      '<button class="side-out" data-signout>' + Icons.out.replace('<svg', '<svg width="18" height="18"') + 'Sign out</button></div></aside>' +
      '<div class="main"><header class="top"><h1>' + (S.title || name) + '</h1><a class="search" href="#/search">' + Icons.search + '<span>Search customer, CIF or LAN</span><kbd>⌘K</kbd></a>' + themeSwitch() +
      '<button class="icon-btn" aria-label="Alerts">' + Icons.bell + '<span class="ping"></span></button></header><main id="stage" class="stage enter"></main></div></div>';
  }

  function render() {
    let name = (location.hash.replace('#/', '') || 'intro');
    if (!ROUTES.includes(name)) name = 'intro';
    if (!BARE.has(name) && !session.signedIn) { name = 'login'; }
    if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; }
    const S = Screens[name] || { title: name, render(r) { r.innerHTML = '<div class="card" style="margin:32px">Screen "' + name + '" not built yet.</div>'; } };
    if (S.css && !document.querySelector('style[data-screen="' + name + '"]')) {
      const s = document.createElement('style'); s.dataset.screen = name; s.textContent = S.css; document.head.appendChild(s);
    }
    const app = $('#app'); window.scrollTo(0, 0);
    if (BARE.has(name)) { app.className = 'bare'; app.innerHTML = '<main id="stage" class="stage s-' + name + '"></main>' + themeSwitch('float'); }
    else { app.className = 'framed'; app.innerHTML = frame(name); $('#stage').classList.add('s-' + name); }
    const stage = $('#stage');
    document.title = (S.title ? S.title + ' — ' : '') + DATA.product;
    cleanup = S.render(stage, ctx) || null;
    Anim.scan(stage);
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-theme-pick]'); if (t) { setTheme(t.dataset.themePick); return; }
    if (e.target.closest('[data-signout]')) { ctx.signOut(); return; }
    const g = e.target.closest('[data-go]'); if (g) { e.preventDefault(); go(g.dataset.go); }
  });
  window.addEventListener('hashchange', render);

  window.Shell = { ctx, start() { ctx.data = window.DATA; setTheme(theme); render(); } };
  Object.assign(window, { Anim, Gears, Logo, Icons, Fmt, Reduced });
})();
