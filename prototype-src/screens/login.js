/* Login: split layout. Left = animated panel (logo, floating live stats, gear cluster). Right = sign-in card. Any input works (prototype). */
Screens.login = {
  title: 'Sign in',
  css: `
.s-login{background:var(--bg-pattern),var(--bg);min-height:100vh;display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);gap:clamp(20px,4vw,64px);align-items:stretch}
.bare .stage.s-login{padding:clamp(16px,3vw,40px)}
.s-login .pane{position:relative;overflow:hidden;border-radius:calc(var(--r) + 10px);--pn-bg:var(--a1);--pn-ink:var(--a1-ink);--pn-gear:rgba(21,18,27,.16);
 background:var(--pn-bg);color:var(--pn-ink);border:var(--bw) solid var(--line);box-shadow:var(--shadow-lg);padding:clamp(24px,3.4vw,48px);display:flex;flex-direction:column;min-height:560px;animation:lg-pane .8s cubic-bezier(.2,.9,.25,1) both}
[data-skin=night] .s-login .pane{--pn-bg:linear-gradient(155deg,var(--surface-2),var(--surface) 55%,color-mix(in srgb,var(--a1) 22%,var(--surface)));--pn-ink:var(--ink);--pn-gear:color-mix(in srgb,var(--a2) 26%,transparent)}
[data-skin=soda] .s-login .pane{--pn-gear:rgba(255,255,255,.2);background:radial-gradient(500px 360px at 90% 100%,color-mix(in srgb,var(--a2) 55%,transparent),transparent 70%),var(--a1)}
.s-login .pane::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 20% 10%,rgba(255,255,255,.22),transparent 40%)}
[data-skin=pop] .s-login .pane::before{background:radial-gradient(rgba(21,18,27,.18) 1.4px,transparent 1.6px) 0 0/18px 18px}
@keyframes lg-pane{from{opacity:0;transform:translateX(-26px) scale(.98)}}
.s-login .brand{display:flex;align-items:center;gap:14px;position:relative;z-index:2;animation:lg-up .6s var(--ease) .25s both}
.s-login .brand .lm-img{height:58px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.3))}
[data-skin=pop] .s-login .brand .lm-img{filter:drop-shadow(3px 3px 0 var(--ink))}
.s-login .brand b{font:var(--head-weight) 21px/1 var(--font-display);letter-spacing:var(--head-track)}
.s-login .pane h2{position:relative;z-index:2;font-size:clamp(32px,4vw,56px);max-width:12ch;margin-top:auto;padding-top:150px;animation:lg-up .7s var(--ease) .4s both}
.s-login .pane p.lede{position:relative;z-index:2;margin:14px 0 0;max-width:36ch;font:600 clamp(15px,1.4vw,18px)/1.4 var(--font-body);opacity:.86;animation:lg-up .7s var(--ease) .55s both}
@keyframes lg-up{from{opacity:0;transform:translateY(16px)}}

/* floating stat chips */
.s-login .stat{position:absolute;z-index:3;display:flex;align-items:baseline;gap:9px;padding:12px 18px;background:var(--surface);color:var(--ink);border:var(--bw) solid var(--line);border-radius:var(--r);box-shadow:var(--shadow);animation:lg-pop .7s cubic-bezier(.3,1.5,.5,1) var(--d) both,lg-float var(--ft) ease-in-out calc(var(--d) + .7s) infinite}
.s-login .stat b{font:var(--head-weight) 30px/1 var(--font-display);letter-spacing:var(--head-track);font-variant-numeric:tabular-nums;color:var(--ink)}
.s-login .stat span{font:700 13.5px/1.2 var(--font-body);color:var(--ink-2)}
.s-login .stat i{position:absolute;top:-7px;right:-7px;width:16px;height:16px;border-radius:50%;background:var(--sc);border:calc(var(--bw)*.8) solid var(--line);box-shadow:0 0 0 3px color-mix(in srgb,var(--sc) 30%,transparent)}
@keyframes lg-pop{from{opacity:0;transform:scale(.4) translateY(30px) rotate(var(--rt,-6deg))}}
@keyframes lg-float{0%,100%{translate:0 0}50%{translate:0 -10px}}
.s-login .stat.s1{top:calc(clamp(24px,3.4vw,48px) + 84px);right:clamp(24px,4vw,56px);--d:.9s;--ft:5.2s;--sc:var(--ok);--rt:6deg}
.s-login .stat.s2{top:calc(clamp(24px,3.4vw,48px) + 168px);left:clamp(24px,10%,90px);--d:1.1s;--ft:6.1s;--sc:var(--a2);--rt:-8deg}
.s-login .stat.s3{bottom:clamp(130px,20%,190px);right:clamp(40px,12%,130px);--d:1.3s;--ft:5.6s;--sc:var(--warn);--rt:5deg}
[data-skin=night] .s-login .stat{background:color-mix(in srgb,var(--surface) 86%,transparent);backdrop-filter:blur(8px);border:1px solid var(--line)}

/* gear cluster */
.s-login .gears{position:absolute;right:-30px;bottom:-40px;width:340px;height:300px;z-index:1;opacity:0;animation:lg-fade 1s ease .6s forwards}
@keyframes lg-fade{to{opacity:1}}
.s-login .gears .gear{position:absolute;transform-origin:50% 50%}
.s-login .gears .gear-body{fill:var(--pn-gear)}
[data-skin=pop] .s-login .gears .gear-body{fill:rgba(21,18,27,.9)}

/* sign-in */
.s-login .lgside{display:grid;place-items:center;padding:56px 0 24px}
.s-login .card{width:min(100%,430px);padding:clamp(22px,3vw,34px);box-shadow:var(--shadow-lg);animation:lg-card .75s cubic-bezier(.2,.9,.25,1) .15s both}
@keyframes lg-card{from{opacity:0;transform:translateY(28px) rotate(1.2deg)}}
.s-login .card.shake{animation:lg-shake .45s ease}
@keyframes lg-shake{20%{transform:translateX(-8px)}40%{transform:translateX(7px)}60%{transform:translateX(-5px)}80%{transform:translateX(3px)}}
.s-login .card h1{font-size:32px}
.s-login .card .hint{margin:8px 0 22px;font-size:15px}
.s-login form{display:flex;flex-direction:column;gap:16px}
.s-login .pw{position:relative}
.s-login .pw .input{padding-right:78px}
.s-login .pw button{position:absolute;right:6px;top:50%;transform:translateY(-50%);border:0;background:transparent;padding:7px 10px;border-radius:var(--r-sm);font:700 13px var(--font-body);color:var(--ink-2);cursor:pointer}
.s-login .pw button:hover{color:var(--ink);background:var(--surface-2)}
.s-login .input[aria-invalid=true]{border-color:var(--bad);background:var(--bad-bg)}
[data-skin=night] .s-login .input[aria-invalid=true]{border-color:var(--bad)}
.s-login .err{display:flex;gap:6px;align-items:center;color:var(--bad);font:700 13px/1.3 var(--font-body);animation:lg-up .3s var(--ease) both}
.s-login .err::before{content:"!";display:inline-grid;place-items:center;width:16px;height:16px;border-radius:50%;background:var(--bad);color:var(--surface);font:800 11px var(--font-body);flex:none}
.s-login .remember{display:flex;align-items:center;justify-content:space-between;gap:12px;font:700 14px var(--font-body);cursor:pointer;padding:2px 0}
.s-login .remember small{display:block;font:500 12.5px var(--font-body);color:var(--ink-2)}
.s-login .go{width:100%;justify-content:center;padding:16px 20px;font-size:16px;margin-top:4px;position:relative}
.s-login .go .sp{width:16px;height:16px;border-radius:50%;border:2.5px solid currentColor;border-right-color:transparent;animation:lg-spin .7s linear infinite;display:none}
.s-login .go.busy .sp{display:inline-block}
.s-login .go.busy{pointer-events:none;opacity:.9}
@keyframes lg-spin{to{transform:rotate(360deg)}}
.s-login .proto{margin:20px 0 0;text-align:center;font-size:12.5px;color:var(--ink-2)}
.s-login .proto b{color:var(--ink)}
@media (max-width:900px){
 .s-login{grid-template-columns:1fr;gap:18px;align-content:start}
 .bare .stage.s-login{padding:14px}
 .s-login .pane{min-height:0;padding:20px;flex-direction:row;align-items:center;gap:14px;box-shadow:var(--shadow);margin-top:58px}
 .s-login .pane h2,.s-login .pane p.lede,.s-login .stat,.s-login .gears{display:none}
 .s-login .brand .lm-img{height:48px}
 .s-login .lgside{padding:4px 0 24px}
}
@media (min-width:901px) and (max-width:1180px){.s-login .stat.s2{display:none}}
`,
  render(root, ctx) {
    const k = DATA.kpis, G = ctx.Gears;
    // gear cluster: big gear (18T) meshing a mid gear (11T) and that one meshing a small gear (8T)
    const m = 3, scale = 5.1; // px per svg unit
    const n1 = 18, n2 = 11, n3 = 8, d1 = 26;
    const m12 = G.mesh(n1, n2, m, d1, -38, 0), m23 = G.mesh(n2, n3, m, m12.dur2, -112, m12.phase2);
    const vb = n => (G.dims(n, m).outer + 2) * scale;
    const place = (n, o, cx, cy) => `<span style="position:absolute;left:${(cx - vb(n)).toFixed(1)}px;top:${(cy - vb(n)).toFixed(1)}px">${G.svg({ teeth: n, m, size: Math.round(vb(n) * 2), hole: .36, spokes: n > 12 ? 5 : 0, dur: o.dur, reverse: o.reverse, phase: o.phase })}</span>`;
    const c1 = [225, 205];
    const c2 = [c1[0] + m12.dx * scale, c1[1] + m12.dy * scale];
    const c3 = [c2[0] + m23.dx * scale, c2[1] + m23.dy * scale];
    const gears = place(n1, { dur: d1, phase: 0 }, ...c1) + place(n2, { dur: m12.dur2, reverse: true, phase: m12.phase2 }, ...c2) + place(n3, { dur: m23.dur2, reverse: false, phase: m23.phase2 }, ...c3);

    root.innerHTML = `
<section class="pane" aria-label="Product overview">
 <div class="brand">${ctx.Logo.html({ size: 58 })}<b>${DATA.product}</b></div>
 <div class="gears" aria-hidden="true" style="width:${Math.round(c1[0] + vb(n1))}px;height:${Math.round(c1[1] + vb(n1))}px;right:-48px;bottom:-60px">${gears}</div>
 <h2>Every customer message, accounted for.</h2>
 <p class="lede">See what was sent, what landed and which rule decided it.</p>
 <div class="stat s1"><i></i><b data-count="${k.deliveryRate}" data-decimals="1" data-suffix="%" data-delay="1000">0</b><span>delivered</span></div>
 <div class="stat s2"><i></i><b data-count="${k.totalComms}" data-delay="1200">0</b><span>comms audited</span></div>
 <div class="stat s3"><i></i><b data-count="${k.avgLatencySec}" data-suffix="s" data-delay="1400">0</b><span>average latency</span></div>
</section>
<section class="lgside">
 <div class="card" id="lg-card">
  <h1>Sign in</h1>
  <p class="hint muted">Use your Bajaj Finance employee credentials.</p>
  <form novalidate autocomplete="off">
   <div class="field"><label for="lg-id">Employee ID</label>
    <input class="input" id="lg-id" name="employeeId" autocomplete="username" autocapitalize="characters" spellcheck="false" aria-describedby="lg-id-err"><div id="lg-id-err" aria-live="polite"></div></div>
   <div class="field"><label for="lg-pw">Password</label>
    <div class="pw"><input class="input" id="lg-pw" name="password" type="password" autocomplete="current-password" aria-describedby="lg-pw-err"><button type="button" id="lg-eye" aria-pressed="false" aria-label="Show password">Show</button></div><div id="lg-pw-err" aria-live="polite"></div></div>
   <div class="remember" id="lg-rem-row"><span id="lg-rem-l">Remember this device<small>Skip sign-in on this browser for 30 days</small></span><button type="button" class="toggle" role="switch" id="lg-rem" aria-checked="false" aria-labelledby="lg-rem-l"></button></div>
   <button class="btn btn-primary go" type="submit"><i class="sp"></i><span id="lg-go-t">Sign in</span></button>
  </form>
  <p class="proto"><b>Prototype</b> — no real data. Any ID and password work.</p>
 </div>
</section>`;
    const $ = s => root.querySelector(s);
    const card = $('#lg-card'), form = $('form'), id = $('#lg-id'), pw = $('#lg-pw'), btn = $('.go');
    const timers = [];
    let busy = false;
    const setErr = (input, slot, msg) => {
      slot.innerHTML = msg ? `<div class="err">${msg}</div>` : '';
      msg ? input.setAttribute('aria-invalid', 'true') : input.removeAttribute('aria-invalid');
    };
    const idErr = $('#lg-id-err'), pwErr = $('#lg-pw-err');
    id.addEventListener('input', () => setErr(id, idErr, ''));
    pw.addEventListener('input', () => setErr(pw, pwErr, ''));
    $('#lg-eye').addEventListener('click', e => {
      const show = pw.type === 'password'; pw.type = show ? 'text' : 'password';
      e.currentTarget.textContent = show ? 'Hide' : 'Show'; e.currentTarget.setAttribute('aria-pressed', String(show)); e.currentTarget.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
    const rem = $('#lg-rem');
    const flip = () => rem.setAttribute('aria-checked', String(rem.getAttribute('aria-checked') !== 'true'));
    rem.addEventListener('click', flip);
    $('#lg-rem-l').addEventListener('click', flip);
    form.addEventListener('submit', e => {
      e.preventDefault(); if (busy) return;
      const a = id.value.trim(), b = pw.value;
      setErr(id, idErr, a ? '' : 'Enter your employee ID to continue');
      setErr(pw, pwErr, !a || b ? '' : 'Enter your password');
      if (!a || !b) {
        card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
        (a ? pw : id).focus(); return;
      }
      busy = true; btn.classList.add('busy'); btn.setAttribute('aria-busy', 'true'); $('#lg-go-t').textContent = 'Signing in…';
      timers.push(setTimeout(() => ctx.signIn(), 900));
    });
    timers.push(setTimeout(() => { if (!matchMedia('(max-width:900px)').matches) id.focus({ preventScroll: true }); }, 700));
    return () => timers.forEach(clearTimeout);
  }
};
