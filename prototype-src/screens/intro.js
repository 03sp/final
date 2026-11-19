/* Intro: logo reveal before login. All theme differences are driven by CSS variables / [data-theme] selectors so it survives live theme switching. */
Screens.intro = {
  title: 'Welcome',
  css: `
.s-intro{background:var(--bg-pattern),var(--bg);--u:1;--logo-h:148px;position:relative;min-height:100vh;display:grid;place-items:center;overflow:hidden;cursor:pointer;isolation:isolate}
.s-intro .stagebox{position:relative;display:flex;flex-direction:column;align-items:center;gap:0;padding:24px;z-index:2}
.s-intro .mark{position:relative;width:calc(var(--logo-h)*1.1);height:calc(var(--logo-h)*1.1);display:grid;place-items:center;margin-bottom:34px}
.s-intro .logo-wrap{position:relative;animation:in-logo 1.05s cubic-bezier(.3,1.5,.5,1) .15s both;transform-origin:50% 60%}
.s-intro .logo-wrap .lm-img{height:var(--logo-h);filter:drop-shadow(0 14px 22px rgba(0,0,0,.28))}
[data-skin=pop] .s-intro .logo-wrap .lm-img{filter:drop-shadow(7px 7px 0 var(--ink))}
[data-skin=night] .s-intro .logo-wrap .lm-img{filter:drop-shadow(0 0 28px color-mix(in srgb,var(--a2) 60%,transparent))}
.s-intro .sweep{position:absolute;inset:0;pointer-events:none;-webkit-mask:var(--logo-mask) center/contain no-repeat;mask:var(--logo-mask) center/contain no-repeat;overflow:hidden}
.s-intro .sweep::after{content:"";position:absolute;top:-20%;bottom:-20%;left:0;width:45%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.95),transparent);transform:translateX(-140%) skewX(-18deg);animation:in-sweep .9s ease-in-out 1.05s both}
@keyframes in-logo{0%{opacity:0;transform:scale(.15) rotate(-24deg) translateY(30px)}55%{opacity:1;transform:scale(1.14) rotate(7deg)}78%{transform:scale(.96) rotate(-3deg)}100%{opacity:1;transform:none}}
@keyframes in-sweep{to{transform:translateX(320%) skewX(-18deg)}}

/* ripples */
.s-intro .rip{position:absolute;left:50%;top:50%;width:calc(var(--logo-h)*.9);height:calc(var(--logo-h)*.9);margin:calc(var(--logo-h)*-.45) 0 0 calc(var(--logo-h)*-.45);border-radius:50%;border:var(--rb,3px) solid var(--a1);opacity:0;animation:in-rip 1.7s cubic-bezier(.2,.7,.3,1) var(--rd) both}
.s-intro .rip:nth-child(2){border-color:var(--a2)}
.s-intro .rip:nth-child(3){border-color:var(--a3)}
[data-skin=night] .s-intro .rip{--rb:2px;box-shadow:0 0 22px currentColor,inset 0 0 22px currentColor;color:var(--a1)}
[data-skin=night] .s-intro .rip:nth-child(2){color:var(--a2)}[data-skin=night] .s-intro .rip:nth-child(3){color:var(--a3)}
[data-skin=soda] .s-intro .rip{--rb:0px;background:radial-gradient(circle,transparent 58%,color-mix(in srgb,var(--a1) 28%,transparent) 62%,transparent 70%)}
[data-skin=soda] .s-intro .rip:nth-child(2){background:radial-gradient(circle,transparent 58%,color-mix(in srgb,var(--a2) 40%,transparent) 62%,transparent 70%)}
[data-skin=soda] .s-intro .rip:nth-child(3){background:radial-gradient(circle,transparent 58%,color-mix(in srgb,var(--a3) 35%,transparent) 62%,transparent 70%)}
@keyframes in-rip{0%{opacity:0;transform:scale(.5)}15%{opacity:.9}100%{opacity:0;transform:scale(3.6)}}

/* shapes: each flies in from afar and snaps to its place */
.s-intro .sh{position:absolute;left:50%;top:50%;width:calc(var(--w)*var(--u)*1px);height:calc(var(--w)*var(--u)*1px);margin:calc(var(--w)*var(--u)*-.5px) 0 0 calc(var(--w)*var(--u)*-.5px);background:var(--c);border-radius:var(--br,50%);opacity:0;animation:in-shape var(--sd,.7s) cubic-bezier(.3,1.6,.5,1) var(--dl) both,in-bob 4s ease-in-out calc(var(--dl) + 1s) infinite}
.s-intro .sh.sq{--br:calc(var(--r-sm)*.5)}
.s-intro .sh.tri{border-radius:0;clip-path:polygon(50% 4%,96% 92%,4% 92%)}
.s-intro .sh.pill{height:calc(var(--w)*var(--u)*.45px);margin-top:calc(var(--w)*var(--u)*-.225px);border-radius:99px}
[data-skin=pop] .s-intro .sh{border:var(--bw) solid var(--line);box-shadow:var(--shadow-press)}
[data-skin=pop] .s-intro .sh.tri{border:0;box-shadow:none;filter:drop-shadow(3px 3px 0 var(--ink))}
[data-skin=night] .s-intro .sh{background:transparent;border:2px solid var(--c);box-shadow:0 0 20px var(--c),inset 0 0 14px color-mix(in srgb,var(--c) 50%,transparent);border-radius:50%!important;clip-path:none!important}
[data-skin=night] .s-intro .sh.pill{height:calc(var(--w)*var(--u)*1px);margin-top:calc(var(--w)*var(--u)*-.5px)}
[data-skin=soda] .s-intro .sh{border-radius:50%!important;clip-path:none!important;background:radial-gradient(circle at 30% 28%,rgba(255,255,255,.95) 0 9%,transparent 11%),radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--c) 45%,transparent),color-mix(in srgb,var(--c) 85%,transparent));box-shadow:0 10px 24px color-mix(in srgb,var(--c) 40%,transparent)}
[data-skin=soda] .s-intro .sh.pill{height:calc(var(--w)*var(--u)*1px);margin-top:calc(var(--w)*var(--u)*-.5px)}
@keyframes in-shape{0%{opacity:0;transform:translate(calc(var(--x)*var(--u)*3px),calc(var(--y)*var(--u)*3px)) scale(.2) rotate(var(--r0,90deg))}100%{opacity:1;transform:translate(calc(var(--x)*var(--u)*1px),calc(var(--y)*var(--u)*1px)) scale(1) rotate(var(--r1,0deg))}}
@keyframes in-bob{0%,100%{translate:0 0}50%{translate:0 -8px}}

/* comms channel chips */
.s-intro .ch{position:absolute;left:50%;top:50%;z-index:3;white-space:nowrap;font-size:13px;padding:7px 13px;opacity:0;box-shadow:var(--shadow-press);animation:in-chip .6s cubic-bezier(.3,1.5,.5,1) var(--dl) both,in-bob 5s ease-in-out calc(var(--dl) + .8s) infinite}
@keyframes in-chip{0%{opacity:0;transform:translate(calc(var(--x)*var(--u)*1px - 50%),calc(var(--y)*var(--u)*1px - 50% + 24px)) scale(.4)}100%{opacity:1;transform:translate(calc(var(--x)*var(--u)*1px - 50%),calc(var(--y)*var(--u)*1px - 50%)) scale(1)}}

/* background rings for night / bubbles for soda / grid blocks for pop */
.s-intro .bgfx{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.s-intro .bgfx i{position:absolute;display:none}
[data-skin=night] .s-intro .bgfx i.n{display:block;left:50%;top:44%;border-radius:50%;border:1px solid color-mix(in srgb,var(--a2) 35%,transparent);width:calc(var(--s)*1px);height:calc(var(--s)*1px);margin:calc(var(--s)*-.5px) 0 0 calc(var(--s)*-.5px);animation:in-ring 1.6s cubic-bezier(.2,.8,.2,1) var(--dl) both}
[data-skin=soda] .s-intro .bgfx i.b{display:block;left:var(--l);bottom:-80px;width:calc(var(--s)*1px);height:calc(var(--s)*1px);border-radius:50%;background:radial-gradient(circle at 30% 28%,rgba(255,255,255,.9) 0 8%,transparent 10%),color-mix(in srgb,var(--c) 28%,transparent);animation:in-bubble var(--t) ease-in var(--dl) infinite}
[data-skin=pop] .s-intro .bgfx i.p{display:block;left:var(--l);top:var(--t);width:calc(var(--s)*1px);height:calc(var(--s)*1px);background:var(--c);border:var(--bw) solid var(--line);box-shadow:var(--shadow-press);border-radius:var(--br,6px);animation:in-block .5s cubic-bezier(.3,1.7,.5,1) var(--dl) both}
@keyframes in-ring{0%{opacity:0;transform:scale(.3)}100%{opacity:1;transform:none}}
@keyframes in-bubble{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:1}100%{transform:translateY(-115vh) scale(1.1);opacity:.9}}
@keyframes in-block{0%{opacity:0;transform:scale(0) rotate(-40deg)}100%{opacity:1;transform:rotate(var(--r,0deg))}}

/* title */
.s-intro h1{display:flex;flex-wrap:wrap;justify-content:center;font-size:clamp(40px,7.4vw,84px);line-height:1;color:var(--ink);text-align:center}
.s-intro h1 .w{display:inline-flex;overflow:hidden;padding:0 .08em .14em}
.s-intro h1 .w + .w{margin-left:.14em}
.s-intro h1 .l{display:inline-block;transform:translateY(110%) rotate(8deg);animation:in-letter .7s cubic-bezier(.2,.9,.2,1) calc(1.35s + var(--i)*.045s) both}
@keyframes in-letter{to{transform:none}}
[data-skin=pop] .s-intro h1{text-shadow:4px 4px 0 var(--a1)}
.s-intro .sub{margin:16px 0 0;font:600 clamp(15px,2.2vw,20px)/1.3 var(--font-body);color:var(--ink-2);opacity:0;animation:in-sub .7s var(--ease) 2.05s both}
@keyframes in-sub{from{opacity:0;transform:translateY(12px);letter-spacing:.06em}to{opacity:1;transform:none}}

/* progress + skip */
.s-intro .prog{margin-top:44px;width:min(320px,70vw);height:10px;border-radius:99px;background:var(--surface);border:var(--bw) solid var(--line);overflow:hidden;opacity:0;animation:in-sub .5s var(--ease) .5s both}
[data-skin=soda] .s-intro .prog,[data-skin=night] .s-intro .prog{border-color:transparent;background:var(--surface-2)}
.s-intro .prog i{display:block;height:100%;width:100%;background:var(--a1);border-radius:99px;transform-origin:0 50%;transform:scaleX(0);animation:in-prog 3.3s cubic-bezier(.45,.1,.35,1) .5s forwards}
[data-skin=night] .s-intro .prog i{background:linear-gradient(90deg,var(--a1),var(--a2));box-shadow:0 0 14px var(--a2)}
@keyframes in-prog{to{transform:none}}
.s-intro .skip{position:fixed;left:16px;top:16px;z-index:60;padding:9px 16px;font-size:14px;opacity:0;animation:in-sub .5s var(--ease) .8s both}
.s-intro.out .stagebox{animation:in-out .45s cubic-bezier(.6,0,.8,.4) forwards}
@keyframes in-out{to{opacity:0;transform:scale(1.08) translateY(-10px)}}
.s-intro.static *,.s-intro.static *::before,.s-intro.static *::after{animation:none!important}
.s-intro.static .l,.s-intro.static .sub,.s-intro.static .prog,.s-intro.static .skip,.s-intro.static .logo-wrap,.s-intro.static .sh,.s-intro.static .ch,.s-intro.static .bgfx i{opacity:1;transform:none}
.s-intro.static .sh{transform:translate(calc(var(--x)*var(--u)*1px),calc(var(--y)*var(--u)*1px))}
.s-intro.static .ch{transform:translate(calc(var(--x)*var(--u)*1px - 50%),calc(var(--y)*var(--u)*1px - 50%))}
.s-intro.static .prog i{transform:scaleX(.5)}
.s-intro.static .rip{display:none}
@media (max-width:640px){.s-intro{--u:.56;--logo-h:116px}.s-intro .ch{display:none}.s-intro .skip{top:62px}}
@media (min-width:1100px){.s-intro{--u:1.15}}
`,
  render(root, ctx) {
    const reduced = ctx.reduced;
    const word = (t, off) => `<span class="w">${[...t].map((c, i) => `<span class="l" style="--i:${off + i}" aria-hidden="true">${c}</span>`).join('')}</span>`;
    // [x,y px from logo centre, size, colour var, class, delay s, start rotation, end rotation]
    const shapes = [
      [-205, -105, 46, 'var(--a2)', 'sq', .30, '120deg', '-12deg'],
      [200, -120, 38, 'var(--a1)', '', .38, '-90deg', '0deg'],
      [-236, 40, 30, 'var(--a3)', 'tri', .46, '200deg', '-8deg'],
      [232, 62, 50, 'var(--a3)', 'sq', .54, '-150deg', '14deg'],
      [-128, 92, 60, 'var(--a1)', 'pill', .62, '90deg', '-18deg'],
      [140, -190, 70, 'var(--a2)', 'pill', .70, '-60deg', '16deg'],
      [-60, -200, 26, 'var(--a1)', '', .78, '0deg', '0deg'],
      [96, 112, 24, 'var(--a2)', 'tri', .86, '160deg', '10deg']
    ];
    const chips = [
      ['SMS delivered', 'ok', -250, -20, 1.55, ''], ['WhatsApp read', 'info', 262, -26, 1.7, ''],
      ['Email opened', 'a2', -190, 86, 1.85, 'far'], ['Push opted out', 'warn', 205, 100, 2.0, 'far']
    ];
    root.innerHTML = `
<div class="bgfx" aria-hidden="true">
 <i class="n" style="--s:260;--dl:.1s"></i><i class="n" style="--s:460;--dl:.25s"></i><i class="n" style="--s:700;--dl:.4s"></i><i class="n" style="--s:980;--dl:.55s"></i>
 ${[[6, 82, 28, 5, '--c:var(--a2)'], [14, 66, 20, 6, ''], [24, 90, 40, 8, '--c:var(--a1)'], [38, 70, 22, 5.5, ''], [60, 86, 34, 7, '--c:var(--a1)'], [72, 70, 18, 6.5, ''], [84, 92, 44, 9, '--c:var(--a2)'], [93, 74, 24, 5, '']].map(([l, , s, t, c], i) => `<i class="b" style="--l:${l}%;--s:${s};--t:${t}s;--dl:${i * .35}s;${c || '--c:var(--a3)'}"></i>`).join('')}
 <i class="p" style="--l:5%;--t:18%;--s:44;--c:var(--a2);--dl:.2s;--r:-8deg"></i><i class="p" style="--l:90%;--t:12%;--s:34;--c:var(--a3);--dl:.35s;--r:12deg;--br:50%"></i>
 <i class="p" style="--l:8%;--t:80%;--s:30;--c:var(--a1);--dl:.5s;--r:10deg;--br:50%"></i><i class="p" style="--l:91%;--t:78%;--s:50;--c:var(--surface);--dl:.65s;--r:-10deg"></i>
</div>
<button class="btn btn-ghost skip" data-skip>Skip intro</button>
<div class="stagebox">
 <div class="mark">
  <span class="rip" style="--rd:.55s"></span><span class="rip" style="--rd:.8s"></span><span class="rip" style="--rd:1.05s"></span>
  ${shapes.map(([x, y, w, c, k, d, r0, r1]) => `<span class="sh ${k}" aria-hidden="true" style="--x:${x};--y:${y};--w:${w};--c:${c};--dl:${d}s;--r0:${r0};--r1:${r1}"></span>`).join('')}
  <div class="logo-wrap">${ctx.Logo.html({ size: 148 })}<span class="sweep" style="--logo-mask:url(${window.LOGO_SRC})"></span></div>
  ${chips.map(([t, tone, x, y, d, k]) => `<span class="chip ch ${k}" data-tone="${tone}" aria-hidden="true" style="--x:${x};--y:${y};--dl:${d}s"><i class="dot"></i>${t}</span>`).join('')}
 </div>
 <h1 aria-label="${DATA.product}">${word('DMS', 0)}${word('Collections', 3)}</h1>
 <p class="sub">${DATA.subtitle}</p>
 <div class="prog" role="progressbar" aria-label="Loading"><i></i></div>
</div>`;
    const stage = root;
    if (reduced) stage.classList.add('static');
    let done = false;
    const t = [];
    const leave = () => {
      if (done) return; done = true;
      if (!reduced) stage.classList.add('out');
      t.push(setTimeout(() => ctx.go('login'), reduced ? 0 : 380));
    };
    t.push(setTimeout(leave, reduced ? 1200 : 3800));
    const onClick = e => { if (e.target.closest('[data-theme-pick]')) return; leave(); };
    const onKey = e => {
      if (e.target.closest('[data-theme-pick]')) return;
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { e.preventDefault(); leave(); }
    };
    stage.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    stage.tabIndex = 0; stage.setAttribute('aria-label', 'Intro animation. Press Enter or Space to skip.');
    const skip = stage.querySelector('[data-skip]'); skip && skip.focus({ preventScroll: true });
    return () => { done = true; t.forEach(clearTimeout); stage.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); };
  }
};
