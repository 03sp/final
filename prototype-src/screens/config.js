/* DATA FIXES (differences from the original screenshots, all deliberate)
 1. Channels covered: the original footer listed "Push, Pop-up" but the cap table and sequence only had SMS, WhatsApp, Email, Voice, IVR and Field visit.
    Decision: Push and Pop-up are dropped everywhere; footer strip lists the same six channels the rule can actually cap.
 2. Opt-Out Cool-Off (90 days) was greyed with no lock cue, unlike the other locked controls. Now it uses the same padlock + "Mandatory" idiom (fixed by policy).
 3. Stepper had no active state in the original; now scroll-spy + click-to-scroll, with aria-current="step".
 4. "Effective To" was rendered in pale placeholder blue while editable; now an empty optional date with the hint "Leave empty for open-ended".
 5. Locked/OFF toggle contrast fixed (locked = full-strength track + padlock; OFF = outlined track).
 6. Caption spacing on "Customer-requested time override" and "Mandatory" normalised.
 7. Field visit cap row: Max/day, Min gap and Max unanswered shown as "n/a" (structurally not applicable), as in the original dashes.
 8. Select option lists, escalation actions, stage and category lists were not visible in the source: SENSIBLE DEFAULTS invented
    (Category: Collections/Service/Reminders; Stage: Pre-due/Bucket 0-3; Product from DATA.loans; Escalation: Next channel in sequence / Stop and flag for review / Hand over to field agent; Level: Customer / Loan account).
 9. Section D contents below Opt-Out were never visible; assumed nothing else exists. Number limits (1-10 day, 1-30 week, 1-90 month, gap 1-72 h, unanswered 1-10) are defaults.
10. Holiday used by the simulation (day 4, 26 Nov 2026) and the demand per channel per day are illustrative, not real campaign data.
11. Footer "Access level: Read-only" contradicted editable form: now "Maker (changes need approval)". Time zone completed to IST (UTC+05:30).
12. Rule status flow Draft -> Pending approval (-> Inactive on Deactivate) implemented as inferred in the analysis.
*/
Screens.config = {
title: 'Rule configuration',
css: `
.s-config{--hi:var(--a1);display:flex;flex-direction:column;gap:22px;padding-top:6px}
[data-skin=soda] .s-config{--hi:var(--a2)}
.s-config h2{font-size:24px}.s-config h3{font-size:17px}
.s-config .meta{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;justify-content:space-between}
.s-config .crumbs{font-size:13.5px;color:var(--ink-2);font-weight:600}
.s-config .ruleid{display:flex;gap:10px;align-items:center;font-weight:600}
.s-config .ruleid b{font-family:var(--font-display)}
.s-config .hero{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:28px;align-items:center;overflow:hidden;padding:24px 28px}
.s-config .hero h2{font-size:clamp(22px,2.6vw,30px);max-width:20ch}
.s-config .hero p{margin:10px 0 16px;color:var(--ink-2);max-width:52ch}
.s-config .hstats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;max-width:460px}
.s-config .hstat{padding:10px 12px;border-radius:var(--r-sm);background:var(--surface-2);border:calc(var(--bw)*.6) solid var(--line)}
.s-config .hstat b{display:block;font:var(--head-weight) 24px/1.1 var(--font-display)}
.s-config .hstat span{font-size:12.5px;color:var(--ink-2);font-weight:700}
.s-config .hero-train{--u:2.4px;position:relative;margin:4px 8px 4px 0}
.s-config .tr-g{position:absolute;display:block}
.s-config .tr-g svg.gear{width:100%;height:100%}
.s-config .tr-g .lab{position:absolute;inset:0;display:grid;place-content:center;text-align:center;line-height:1.05;pointer-events:none}
.s-config .lab b{font:var(--head-weight) 27px/1 var(--font-display)}
.s-config .lab small{font-size:10.5px;color:var(--ink-2);font-weight:800;margin-top:3px}
.s-config .stepper{position:sticky;top:var(--topH,70px);z-index:15;display:flex;align-items:center;gap:22px;padding:8px 22px;flex-wrap:wrap}
.s-config .stp{--u:1.4px;--lp:30px;position:relative;flex:none}
.s-config .stp-g{position:absolute;background:none;border:0;padding:0;cursor:pointer;border-radius:50%}
.s-config .stp-g .gear-body{transition:fill .3s}
.s-config .stp-g:hover .gear-body,.s-config .stp-g.on .gear-body{fill:var(--hi)}
.s-config .stp-g .ltr{position:absolute;inset:0;display:grid;place-items:center;font:800 14px var(--font-display);color:var(--ink);pointer-events:none}
.s-config .stp-l{position:absolute;text-align:center;font:700 11.5px/1.2 var(--font-body);color:var(--ink-2);pointer-events:none}
.s-config .stp-l.on{color:var(--ink);font-weight:800}
.s-config .stp.burst .gear{animation-duration:calc(var(--dur)/5)!important}
.s-config .stp-now{font-weight:700;color:var(--ink-2);font-size:14px}.s-config .stp-now b{color:var(--ink);font-family:var(--font-display);font-size:16px}
.s-config .sec{scroll-margin-top:var(--scrollOff,170px)}
.s-config .sec-h{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.s-config .sec-gear{position:relative;display:grid;place-items:center;width:46px;height:46px;flex:none}
.s-config .sec-gear svg{position:absolute;inset:0;width:100%;height:100%;animation-play-state:paused}
.s-config .sec.on .sec-gear svg{animation-play-state:running}
.s-config .sec-gear b{position:relative;font:800 14px var(--font-display)}
.s-config .sec-h p{margin:2px 0 0;font-size:13.5px;color:var(--ink-2)}
.s-config .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:16px}
.s-config .field .hint{font-size:12.5px;color:var(--ink-2);font-weight:600}
.s-config .req{color:var(--bad)}
.s-config .input[aria-invalid=true]{border-color:var(--bad)}
.s-config .err{color:var(--bad);font-size:12.5px;font-weight:700;min-height:0}
.s-config select.input{appearance:auto}
.s-config .input:disabled{opacity:.55}
.s-config .caps{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px}
.s-config .cc{padding:16px;display:flex;flex-direction:column;gap:12px;box-shadow:none}
.s-config .cc.off{opacity:.6}
.s-config .cc.off .gear{animation-play-state:paused}
.s-config .cc-h{display:flex;align-items:center;gap:10px}
.s-config .cc-h h3{margin-right:auto;font-size:16px}
.s-config .dials{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.s-config .dial-c{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:12px;font-weight:700;color:var(--ink-2)}
.s-config .gauge{position:relative;width:80px;height:80px}
.s-config .gauge svg{width:100%;height:100%;transform:rotate(135deg)}
.s-config .gauge circle{fill:none;stroke-width:7;stroke-linecap:round}
.s-config .g-track{stroke:var(--line);opacity:.3}
.s-config .g-arc{stroke:var(--hi);transition:stroke-dasharray .6s var(--ease)}
.s-config .gauge input{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:46px;border:0;background:transparent;text-align:center;font:var(--head-weight) 22px var(--font-display);color:var(--ink);padding:0;-moz-appearance:textfield}
.s-config input::-webkit-outer-spin-button,.s-config input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
.s-config .gauge .na{position:absolute;inset:0;display:grid;place-items:center;font:700 13px var(--font-body);color:var(--ink-2)}
.s-config .nb{display:inline-flex;gap:6px}
.s-config .nb button{width:30px;height:30px;border-radius:50%;border:calc(var(--bw)*.8) solid var(--line);background:var(--surface);cursor:pointer;font:800 16px/1 var(--font-body);display:grid;place-items:center;padding:0}
.s-config .nb button:hover:not(:disabled){background:var(--hi);color:var(--a1-ink)}
[data-skin=soda] .s-config .nb button:hover:not(:disabled){color:var(--a2-ink)}
.s-config .nb button:disabled{opacity:.4;cursor:not-allowed}
.s-config .mini{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:13px;font-weight:700;color:var(--ink-2)}
.s-config .mini .nstep{display:inline-flex;align-items:center;gap:6px;color:var(--ink)}
.s-config .mini input{width:52px;text-align:center;padding:6px 4px;font-size:14px;border-radius:99px;-moz-appearance:textfield}
.s-config .cc-warn{font-size:12.5px;font-weight:700;color:var(--bad);min-height:0}
.s-config .cc-info{font-size:12.5px;color:var(--ink-2);font-weight:600}
.s-config .overall{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-top:18px;padding-top:18px;border-top:var(--bw) solid var(--line);align-items:start}
.s-config .ceil{padding:12px 14px;border-radius:var(--r-sm);background:var(--surface-2);border:calc(var(--bw)*.6) solid var(--line);font-size:13px;font-weight:700;color:var(--ink-2)}
.s-config .ceil b{display:block;font:var(--head-weight) 22px var(--font-display);color:var(--ink)}
.s-config .seq-wrap{margin-top:18px;padding-top:18px;border-top:var(--bw) solid var(--line)}
.s-config .seq{display:flex;flex-wrap:wrap;align-items:center;gap:8px 4px;list-style:none;padding:0;margin:12px 0 8px;transition:opacity .2s}
.s-config .seq.dim{opacity:.45}
.s-config .seq li{display:flex;align-items:center;gap:4px}
.s-config .tok{display:flex;align-items:center;gap:8px;padding:8px 10px;border:var(--bw) solid var(--line);border-radius:var(--r-sm);background:var(--surface-2);cursor:grab;font-weight:800;font-size:14px}
.s-config .tok.off{opacity:.5}.s-config .tok.over{outline:3px dashed var(--hi)}
.s-config .tok svg{width:30px;height:30px;flex:none}
.s-config .tok .nb button{width:26px;height:26px;font-size:13px}
.s-config .arrow{color:var(--ink-2);font-weight:800}
.s-config .tw{display:grid;grid-template-columns:230px minmax(0,1fr);gap:28px;align-items:start}
.s-config .dial{position:relative;width:220px;height:220px}
.s-config .dial>svg.gear{width:100%;height:100%}
.s-config .dial .ov{position:absolute;inset:0;width:100%;height:100%}
.s-config .dial .arc{fill:none;stroke:var(--hi);stroke-width:5.2;stroke-linecap:butt;transform-origin:0 0;transition:stroke-dasharray .5s var(--ease),transform .5s var(--ease)}
.s-config .dial .trk{fill:none;stroke:var(--line);stroke-width:5.2;opacity:.25}
.s-config .dial text{font:800 3.6px var(--font-body);fill:var(--ink-2);text-anchor:middle;dominant-baseline:central}
.s-config .dial-c2{position:absolute;inset:0;display:grid;place-content:center;text-align:center;pointer-events:none;line-height:1.1}
.s-config .dial-c2 b{font:var(--head-weight) 26px var(--font-display)}.s-config .dial-c2 small{font-size:11px;font-weight:800;color:var(--ink-2)}
.s-config .days{display:flex;flex-wrap:wrap;gap:8px}
.s-config .day{min-width:56px;padding:10px 0;border-radius:999px;border:var(--bw) solid var(--line);background:var(--surface);font-weight:800;cursor:pointer;transition:transform .15s var(--ease),background .2s}
.s-config .day:hover{transform:translateY(-2px)}
.s-config .day[aria-pressed=true]{background:var(--a2);color:var(--a2-ink)}
[data-skin=night] .s-config .day[aria-pressed=false]{border-color:var(--line)}
.s-config .trow{display:flex;gap:12px;align-items:center;font-weight:600;font-size:14px}
.s-config .tcol{display:flex;flex-direction:column;gap:16px}
.s-config .cons{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}
.s-config .tile{padding:14px;border-radius:var(--r-sm);background:var(--surface-2);border:calc(var(--bw)*.6) solid var(--line);display:flex;flex-direction:column;gap:10px}
.s-config .tile .t-l{font-weight:800;font-size:14px}
.s-config .tile .t-r{display:flex;align-items:center;gap:10px;font-size:12.5px;font-weight:700;color:var(--ink-2)}
.s-config .lock{flex:none}
.s-config .lock.nudge{animation:cfg-nudge .4s}
@keyframes cfg-nudge{25%{transform:rotate(-18deg)}75%{transform:rotate(18deg)}}
.s-config .toggle[aria-disabled=true]{opacity:1;cursor:not-allowed;box-shadow:inset 0 0 0 2px var(--surface)}
.s-config .cool{display:flex;gap:12px;align-items:center}
.s-config .cool .cg{position:relative;width:64px;height:64px;flex:none}
.s-config .cool .cg svg{width:100%;height:100%}
.s-config .cool .cg b{position:absolute;inset:0;display:grid;place-items:center;font:800 18px var(--font-display)}
.s-config .simrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;align-items:end}
.s-config .belt{position:relative;height:60px;margin:18px 0 6px;display:flex;align-items:center;gap:0}
.s-config .belt .bl{position:relative;flex:1;height:14px;overflow:hidden;background:repeating-linear-gradient(90deg,var(--line) 0 2px,transparent 2px 14px);border-radius:8px;border:calc(var(--bw)*.6) solid var(--line)}
.s-config .belt .pk{position:absolute;top:1px;left:-14px;width:10px;height:10px;border-radius:3px;background:var(--hi);opacity:0}
.s-config .belt.run .pk{animation:cfg-belt 1.1s linear infinite;opacity:1}
.s-config .belt.run .pk:nth-child(2){animation-delay:.27s;background:var(--a3)}
.s-config .belt.run .pk:nth-child(3){animation-delay:.55s}
.s-config .belt.run .pk:nth-child(4){animation-delay:.82s;background:var(--bad)}
@keyframes cfg-belt{to{transform:translateX(900px)}}
.s-config .belt .gear{animation-play-state:paused}.s-config .belt.run .gear{animation-play-state:running;animation-duration:1.2s}
.s-config .belt svg{width:56px;height:56px;flex:none}
.s-config .res{display:flex;flex-direction:column;gap:16px;margin-top:14px}
.s-config .rtiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.s-config .rtile{padding:12px 14px;border-radius:var(--r-sm);border:calc(var(--bw)*.6) solid var(--line);background:var(--surface-2)}
.s-config .rtile b{display:block;font:var(--head-weight) 30px/1.1 var(--font-display)}.s-config .rtile span{font-size:12.5px;font-weight:700;color:var(--ink-2)}
.s-config .rtile[data-tone=ok]{background:var(--ok-bg)}.s-config .rtile[data-tone=bad]{background:var(--bad-bg)}
.s-config .brow{display:grid;grid-template-columns:130px 1fr 90px;gap:10px;align-items:center;font-size:13px;font-weight:700;margin-bottom:6px}
.s-config .bbar{display:flex;height:14px;border-radius:99px;overflow:hidden;background:var(--surface-2);border:calc(var(--bw)*.6) solid var(--line)}
.s-config .bbar i{display:block;height:100%}.s-config .bbar .a{background:var(--a3)}.s-config .bbar .s{background:var(--bad)}
.s-config .bar{position:sticky;bottom:12px;z-index:16;display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:12px 16px}
.s-config .bar-st{display:flex;gap:10px;align-items:center;font-weight:700;font-size:13.5px;color:var(--ink-2)}
.s-config .bar-btns{margin-left:auto;display:flex;gap:8px;flex-wrap:wrap}
.s-config .bar .btn{padding:11px 16px;font-size:14px}
.s-config .btn.danger{color:var(--bad)}
.s-config .metas{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px 20px;font-size:13px;color:var(--ink-2);padding:4px 4px 90px}
.s-config .metas b{display:block;color:var(--ink);font-size:13px}
.s-config .dlg{border:var(--bw) solid var(--line);border-radius:var(--r);background:var(--surface);color:var(--ink);padding:22px;width:min(460px,92vw);box-shadow:var(--shadow-lg)}
.s-config .dlg::backdrop{background:rgba(10,8,25,.55)}
.s-config .dlg h3{font-size:20px;margin-bottom:8px}
.s-config .dlg ul{margin:8px 0;padding-left:20px}
.s-config .dlg .acts{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:18px}
.s-config .toast{position:fixed;left:50%;bottom:96px;transform:translate(-50%,16px);opacity:0;pointer-events:none;padding:12px 20px;border-radius:999px;background:var(--ink);color:var(--surface);font-weight:800;font-size:14px;transition:opacity .25s,transform .3s var(--ease);z-index:60;max-width:90vw}
.s-config .toast.show{opacity:1;transform:translate(-50%,0)}
@media (max-width:760px){
 .s-config .hero{grid-template-columns:1fr;padding:18px}.s-config .hero-train{display:none}
 .s-config .stp{--u:.95px;--lp:0px}.s-config .stp-l{display:none}.s-config .stp-g .ltr{font-size:11px}
 .s-config .stepper{gap:10px;padding:8px 12px}
 .s-config .tw{grid-template-columns:1fr;justify-items:center}.s-config .tcol{width:100%}
 .s-config .brow{grid-template-columns:90px 1fr 70px}
 .s-config .bar{bottom:8px}.s-config .bar-btns{margin-left:0;width:100%}
 .s-config .bar .btn{flex:1 1 auto;justify-content:center}
}
`,
render(root, ctx){
const $=(s,r=root)=>r.querySelector(s), $$=(s,r=root)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const CH=[{id:'sms',n:'SMS'},{id:'wa',n:'WhatsApp'},{id:'email',n:'Email'},{id:'voice',n:'Voice (agent / dialer)',s:'Voice'},{id:'ivr',n:'IVR / robo-call',s:'IVR'},{id:'field',n:'Field visit'}];
const cn=id=>CH.find(c=>c.id===id);
const ESC=['Next channel in sequence','Stop and flag for review','Hand over to field agent'];
const LIM={d:[1,10],w:[1,30],m:[1,90],gap:[1,72],un:[1,10],oD:[1,20],oW:[1,60],dpdFrom:[0,999],dpdTo:[0,999]};
const S={name:'',cat:'Collections',stage:'Bucket 0',prod:'All',dpdFrom:1,dpdTo:30,effFrom:'2026-11-19',effTo:'',
 ch:{sms:{on:1,d:2,w:7,m:20,gap:4,un:3},wa:{on:1,d:2,w:7,m:20,gap:4,un:3},email:{on:1,d:1,w:3,m:10,gap:24,un:3},voice:{on:1,d:3,w:10,m:30,gap:2,un:5},ivr:{on:1,d:1,w:3,m:10,gap:24,un:3},field:{on:1,d:null,w:1,m:4,gap:null,un:null}},
 oD:4,oW:15,esc:ESC[0],level:'Customer',seq:['wa','sms','voice','ivr','email','field'],start:'08:00',end:'19:00',days:[1,1,1,1,1,1,0],hol:true,ovr:false,dnd:false,cons:false,status:'Draft',dirty:false,period:7,segment:''};
const DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const timers=[],cancels=new Map(),offs=[];
const later=(f,ms)=>{const t=setTimeout(f,ms);timers.push(t);return t};
const on=(t,e,f,o)=>{t.addEventListener(e,f,o);offs.push(()=>t.removeEventListener(e,f,o))};
const lockSvg='<svg class="lock" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const spin=ctx.reduced?'':'spin';

/* gear trains: positions in gear units, scaled by --u */
function train(ns,m,phis,dur){
 const it=[{n:ns[0],cx:0,cy:0,phase:0,dur,rev:false}];let x=0,y=0;
 for(let i=1;i<ns.length;i++){const p=it[i-1],mm=Gears.mesh(p.n,ns[i],m,p.dur,phis[i-1],p.phase);x+=mm.dx;y+=mm.dy;it.push({n:ns[i],cx:x,cy:y,phase:mm.phase2,dur:mm.dur2,rev:!p.rev});}
 let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
 it.forEach(g=>{g.V=Gears.dims(g.n,m).outer+2;x0=Math.min(x0,g.cx-g.V);y0=Math.min(y0,g.cy-g.V);x1=Math.max(x1,g.cx+g.V);y1=Math.max(y1,g.cy+g.V);});
 it.forEach(g=>{g.x=g.cx-x0;g.y=g.cy-y0;});
 return {it,w:x1-x0,h:y1-y0};
}
const place=g=>'left:calc(var(--u)*'+(g.x-g.V).toFixed(2)+');top:calc(var(--u)*'+(g.y-g.V).toFixed(2)+');width:calc(var(--u)*'+(2*g.V).toFixed(2)+');height:calc(var(--u)*'+(2*g.V).toFixed(2)+')';
const gsvg=(g,m,hole,cls)=>Gears.svg({teeth:g.n,m,hole,cls:cls===undefined?spin:cls,dur:g.dur,reverse:g.rev,phase:g.phase,size:50});

/* hero train: 22 / 20 / 22 / 20 teeth, zigzag */
const HT=train([22,20,22,20],3,[18,-18,18],26);
const HL=[['oD','per day'],['oW','per week'],['win','window'],['cool','cool-off']];
const heroGears=HT.it.map((g,i)=>'<span class="tr-g" style="'+place(g)+'">'+gsvg(g,3,.62)+'<span class="lab"><b data-hn="'+HL[i][0]+'" data-v="0">0</b><small data-hs="'+HL[i][0]+'">'+HL[i][1]+'</small></span></span>').join('');
/* stepper train: 5 big gears (12) joined by idlers (8) */
const ST=train([12,8,12,8,12,8,12,8,12],3,[0,0,0,0,0,0,0,0],20);
const STEPS=[['a','Rule header'],['b','Frequency caps'],['c','Time window'],['d','Consent & compliance'],['e','Rule simulation']];
const stpHtml=ST.it.map((g,i)=>{
 if(i%2){return '<span class="tr-g" style="'+place(g)+'">'+gsvg(g,3,.5)+'</span>';}
 const k=i/2,s=STEPS[k];
 return '<button class="stp-g" data-go-step="'+k+'" style="'+place(g)+'" aria-label="Go to section '+s[0].toUpperCase()+', '+s[1]+'" title="'+s[1]+'">'+gsvg(g,3,.62)+'<span class="ltr">'+s[0].toUpperCase()+'</span></button>'+
 '<span class="stp-l" data-stp-l="'+k+'" style="left:calc(var(--u)*'+Math.max(0,g.x-30).toFixed(1)+');width:calc(var(--u)*60);top:calc(var(--u)*'+ST.h.toFixed(1)+' + 3px)">'+s[1]+'</span>';
}).join('');

const secH=(k,t,sub)=>'<div class="sec-h"><span class="sec-gear">'+Gears.svg({teeth:10,m:2.2,hole:.58,cls:'spin',dur:10,size:46})+'<b>'+k.toUpperCase()+'</b></span><div><h2 id="h-'+k+'" tabindex="-1">'+t+'</h2><p>'+sub+'</p></div></div>';
const opts=(a,v)=>a.map(o=>'<option'+(o===v?' selected':'')+'>'+o+'</option>').join('');
const nIn=(path,extra='')=>'<input class="input" type="number" inputmode="numeric" data-n="'+path+'" '+extra+'>';
const toggle=(path,label,v)=>'<button type="button" class="toggle" role="switch" aria-checked="'+!!v+'" aria-label="'+label+'" data-t="'+path+'"></button>';

function card(c){
 const r=S.ch[c.id],f=c.id==='field';
 const dial=(k,u,max)=>{
  const body=(f&&k==='d')?'<span class="na">n/a</span>':'<input type="number" inputmode="numeric" data-n="ch.'+c.id+'.'+k+'" aria-label="'+(c.s||c.n)+' max per '+u+'">';
  const btn=(f&&k==='d')?'':'<span class="nb"><button type="button" data-nb="ch.'+c.id+'.'+k+'" data-dir="-1" aria-label="Decrease max per '+u+' for '+(c.s||c.n)+'">&minus;</button><button type="button" data-nb="ch.'+c.id+'.'+k+'" data-dir="1" aria-label="Increase max per '+u+' for '+(c.s||c.n)+'">+</button></span>';
  return '<div class="dial-c"><div class="gauge"><svg viewBox="0 0 80 80" aria-hidden="true"><circle class="g-track" cx="40" cy="40" r="32" pathLength="100" stroke-dasharray="75 100"/><circle class="g-arc" data-g="ch.'+c.id+'.'+k+'" data-max="'+max+'" cx="40" cy="40" r="32" pathLength="100" stroke-dasharray="0 100"/></svg>'+body+'</div>'+btn+'<span>per '+u+'</span></div>';
 };
 const mini=(k,l)=>f?'':'<div class="mini"><span>'+l+'</span><span class="nstep"><span class="nb"><button type="button" data-nb="ch.'+c.id+'.'+k+'" data-dir="-1" aria-label="Decrease '+l+' for '+(c.s||c.n)+'">&minus;</button></span><input class="input" type="number" data-n="ch.'+c.id+'.'+k+'" aria-label="'+(c.s||c.n)+' '+l+'"><span class="nb"><button type="button" data-nb="ch.'+c.id+'.'+k+'" data-dir="1" aria-label="Increase '+l+' for '+(c.s||c.n)+'">+</button></span></span></div>';
 return '<article class="card flat cc" data-card="'+c.id+'"><div class="cc-h">'+Gears.svg({teeth:8,m:2,hole:.4,cls:'spin',dur:8,reverse:CH.indexOf(c)%2,size:26})+'<h3>'+c.n+'</h3>'+toggle('ch.'+c.id+'.on','Enable '+c.n,r.on)+'</div>'+
  '<div class="dials">'+dial('d','day',LIM.d[1])+dial('w','week',LIM.w[1])+dial('m','month',LIM.m[1])+'</div>'+
  (f?'<div class="mini"><span>Min gap, max unanswered</span><span>n/a for visits</span></div>':mini('gap','Min gap (hours)')+mini('un','Escalate after unanswered'))+
  '<div class="cc-warn" data-warn="'+c.id+'" role="status"></div></article>';
}
const lockTile=(label,hint)=>'<div class="tile"><span class="t-l" id="lk-'+label.replace(/\W/g,'')+'">'+label+'</span><div class="t-r"><button type="button" class="toggle" role="switch" aria-checked="true" aria-disabled="true" aria-labelledby="lk-'+label.replace(/\W/g,'')+'" data-locked></button>'+lockSvg+'<span>Mandatory. '+hint+'</span></div></div>';
const freeTile=(label,path,v,hint)=>'<div class="tile"><span class="t-l" id="fr-'+path+'">'+label+'</span><div class="t-r">'+'<button type="button" class="toggle" role="switch" aria-checked="'+v+'" aria-labelledby="fr-'+path+'" data-t="'+path+'"></button><span>'+hint+'</span></div></div>';
const coolG={n:20,dur:30,rev:false,phase:0};
const dial24=(()=>{const d=Gears.dims(24,3),V=d.outer+2;let t='';[0,6,12,18].forEach(h=>{const a=(h/24)*2*Math.PI-Math.PI/2;t+='<text x="'+(Math.cos(a)*16.5).toFixed(2)+'" y="'+(Math.sin(a)*16.5).toFixed(2)+'">'+h+'</text>';});
 return '<div class="dial">'+Gears.svg({teeth:24,m:3,hole:.8,cls:'',phase:-90-7.5,size:220})+'<svg class="ov" viewBox="'+(-V)+' '+(-V)+' '+2*V+' '+2*V+'" aria-hidden="true"><circle class="trk" r="22" pathLength="100" stroke-dasharray="100 100"/><circle class="arc" id="arc" r="22" pathLength="100" stroke-dasharray="0 100"/>'+t+'</svg><div class="dial-c2"><b id="winH">0</b><small>hours a day</small></div></div>';})();
const metaB=(a,b)=>'<div><b>'+a+'</b>'+b+'</div>';

root.innerHTML=
'<div class="meta"><div><div class="crumbs">Communication governance &rsaquo; New rule</div></div><div class="ruleid"><span>Rule ID</span><b>CG-2026-0001</b><span class="chip" data-tone="warn" id="stChip" tabindex="-1">Draft</span></div></div>'+
'<section class="card hero" aria-label="Rule engine summary"><div><h2 id="heroT">At most 4 contacts a day and 15 a week</h2><p>Every number below drives one gear. Change a cap or the time window and the engine updates live.</p>'+
 '<div class="hstats"><div class="hstat"><b data-hn="effD" data-v="0">0</b><span>Contacts a day, effective ceiling</span></div><div class="hstat"><b data-hn="effW" data-v="0">0</b><span>Contacts a week, effective ceiling</span></div><div class="hstat"><b data-hn="oD2" data-v="0">0</b><span>Overall cap per day</span></div><div class="hstat"><b data-hn="oW2" data-v="0">0</b><span>Overall cap per week</span></div></div></div>'+
 '<div class="hero-train" style="width:calc(var(--u)*'+HT.w.toFixed(1)+');height:calc(var(--u)*'+HT.h.toFixed(1)+')" role="img" aria-label="Rule engine gears: overall daily cap, weekly cap, time window, opt-out cool-off">'+heroGears+'</div></section>'+
'<nav class="card stepper" aria-label="Configuration steps"><div class="stp" style="width:calc(var(--u)*'+ST.w.toFixed(1)+');height:calc(var(--u)*'+ST.h.toFixed(1)+' + var(--lp))">'+stpHtml+'</div><div class="stp-now" aria-live="off">Step <b id="stpN">1</b> of 5: <b id="stpT">Rule header</b></div></nav>'+
/* A */
'<section class="card sec" id="sec-a" aria-labelledby="h-a">'+secH('a','Rule header','Who the rule applies to and when it is in force.')+
 '<div class="grid"><div class="field"><label for="f-name">Rule name <span class="req" aria-hidden="true">*</span></label><input class="input" id="f-name" data-v="name" placeholder="e.g. Pre-due EMI reminder, PL" aria-required="true" aria-describedby="e-name"><span class="err" id="e-name"></span></div>'+
 '<div class="field"><label for="f-cat">Communication category <span class="req" aria-hidden="true">*</span></label><select class="input" id="f-cat" data-v="cat">'+opts(['Collections','Service','Reminders'],S.cat)+'</select></div>'+
 '<div class="field"><label for="f-stage">Lifecycle stage <span class="req" aria-hidden="true">*</span></label><select class="input" id="f-stage" data-v="stage">'+opts(['Pre-due','Bucket 0','Bucket 1','Bucket 2','Bucket 3'],S.stage)+'</select></div>'+
 '<div class="field"><label for="f-prod">Product <span class="req" aria-hidden="true">*</span></label><select class="input" id="f-prod" data-v="prod">'+opts(['All','Home Loan','Personal Loan','Two-Wheeler Loan'],S.prod)+'</select></div>'+
 '<div class="field"><label for="f-df">DPD from</label>'+nIn('dpdFrom','id="f-df"')+'</div><div class="field"><label for="f-dt">DPD to</label>'+nIn('dpdTo','id="f-dt" aria-describedby="e-dpd"')+'<span class="err" id="e-dpd"></span></div>'+
 '<div class="field"><label for="f-ef">Effective from <span class="req" aria-hidden="true">*</span></label><input class="input" id="f-ef" type="date" data-v="effFrom" value="2026-11-19"></div>'+
 '<div class="field"><label for="f-et">Effective to</label><input class="input" id="f-et" type="date" data-v="effTo" aria-describedby="e-et"><span class="hint" id="e-et">Leave empty for open-ended</span></div></div></section>'+
/* B */
'<section class="card sec" id="sec-b" aria-labelledby="h-b">'+secH('b','Frequency caps, per customer','Each dial fills against its limit. Type a number or use the buttons.')+
 '<div class="caps">'+CH.map(card).join('')+'</div>'+
 '<div class="overall"><div class="field"><label for="f-od">Overall cap per day (all channels)</label>'+nIn('oD','id="f-od"')+'<span class="err" id="e-o"></span></div><div class="field"><label for="f-ow">Overall cap per week</label>'+nIn('oW','id="f-ow"')+'</div>'+
 '<div class="field"><label for="f-esc">Escalation action</label><select class="input" id="f-esc" data-v="esc">'+opts(ESC,S.esc)+'</select></div><div class="field"><label for="f-lv">Level <span class="req" aria-hidden="true">*</span></label><select class="input" id="f-lv" data-v="level">'+opts(['Customer','Loan account'],S.level)+'</select><span class="hint" id="lvHint">Caps apply across all loans of the customer</span></div>'+
 '<div class="ceil">Channel caps add up to<b><span id="sumD">0</span>/day, <span id="sumW">0</span>/week</b>The overall cap is the binding limit when lower.</div></div>'+
 '<div class="seq-wrap"><h3>Channel sequence</h3><ol class="seq" id="seq" aria-label="Channel sequence"></ol><p class="hint muted" style="font-size:12.5px;margin:0">Drag a token, or use the arrow buttons, to reorder. Defines the order channels are attempted when Escalation action is next channel in sequence. Channels switched off are skipped.</p></div></section>'+
/* C */
'<section class="card sec" id="sec-c" aria-labelledby="h-c">'+secH('c','Time window','The dial shows the hours contact is allowed. Times are IST.')+
 '<div class="tw">'+dial24+'<div class="tcol"><div class="grid"><div class="field"><label for="f-st">Allowed start time <span class="req" aria-hidden="true">*</span></label><input class="input" id="f-st" type="time" data-v="start" value="08:00" aria-describedby="e-t"><span class="hint">Collections: not before 08:00 (RBI)</span></div>'+
 '<div class="field"><label for="f-en">Allowed end time <span class="req" aria-hidden="true">*</span></label><input class="input" id="f-en" type="time" data-v="end" value="19:00" aria-describedby="e-t"><span class="hint">Collections: not after 19:00 (RBI)</span></div></div><span class="err" id="e-t"></span>'+
 '<div class="field"><label id="l-days">Allowed days</label><div class="days" role="group" aria-labelledby="l-days">'+DAYS.map((d,i)=>'<button type="button" class="day" data-day="'+i+'" aria-pressed="'+!!S.days[i]+'">'+d+'</button>').join('')+'</div><span class="err" id="e-d"></span></div>'+
 '<div class="trow">'+toggle('hol','Exclude holidays',S.hol)+'<span>Exclude holidays (holiday master)</span></div><div class="trow">'+toggle('ovr','Customer-requested time override',S.ovr)+'<span>Customer-requested time override (recorded consent required)</span></div></div></div></section>'+
/* D */
'<section class="card sec" id="sec-d" aria-labelledby="h-d">'+secH('d','Consent and compliance controls','Locked controls are enforced by policy and cannot be changed in a rule.')+
 '<div class="cons">'+freeTile('DND scrubbing required','dnd',false,'Check the DND registry before contact')+freeTile('Explicit consent required','cons',false,'Recorded opt-in per channel')+
 lockTile('DLT template check','SMS templates must be registered')+lockTile('Sensitive-event suppression','Pause outreach after sensitive events')+lockTile('Call recording required','Every voice call is recorded')+
 '<div class="tile"><span class="t-l">Opt-out cool-off (days)</span><div class="cool"><div class="cg">'+Gears.svg({teeth:20,m:3,hole:.6,cls:'',size:64})+'<b>90</b></div><div class="t-r" style="flex-direction:column;align-items:flex-start;gap:4px"><span style="display:flex;gap:6px;align-items:center">'+lockSvg+'Mandatory</span><span>Fixed by policy</span></div></div></div></div></section>'+
/* E */
'<section class="card sec" id="sec-e" aria-labelledby="h-e">'+secH('e','Rule simulation','Replay a sample period against the settings above. Results are illustrative.')+
 '<div class="simrow"><div class="field"><label for="f-seg">Sample account or segment</label><input class="input" id="f-seg" data-v="segment" placeholder="Loan A/c no. or segment"></div><div class="field"><label for="f-per">Period</label><select class="input" id="f-per" data-v="period"><option value="7">7 days</option><option value="14">14 days</option><option value="30">30 days</option></select></div><div><button type="button" class="btn btn-alt" id="runSim">Run simulation</button></div></div>'+
 '<div class="belt" id="belt" aria-hidden="true">'+Gears.svg({teeth:12,m:3,hole:.4,cls:'spin',dur:6,size:56})+'<div class="bl"><i class="pk"></i><i class="pk"></i><i class="pk"></i><i class="pk"></i></div>'+Gears.svg({teeth:12,m:3,hole:.4,cls:'spin',dur:6,reverse:true,size:56})+'</div>'+
 '<div id="simOut" class="res" role="status" aria-live="polite"><p class="muted" style="margin:0">No run yet. Press Run simulation to see how many contacts the rule would allow and suppress.</p></div></section>'+
'<div class="metas">'+metaB('Data freshness','Near real-time (2 min or less)')+metaB('Channels covered','SMS, WhatsApp, Email, Voice, IVR, Field visit')+metaB('Retention window','24 months online')+metaB('Access level','Maker (changes need approval)')+metaB('Time zone','IST (UTC+05:30)')+'</div>'+
'<div class="card bar" role="region" aria-label="Rule actions"><div class="bar-st"><span class="chip" data-tone="warn" id="barChip">Draft</span><span id="dirty">No changes yet</span></div><div class="bar-btns"><button class="btn btn-ghost" data-act="audit">View audit history</button><button class="btn btn-ghost" data-act="clone">Clone rule</button><button class="btn btn-ghost danger" data-act="deact">Deactivate</button><button class="btn" data-act="save">Save draft</button><button class="btn btn-primary" data-act="submit" id="btnSubmit">Submit for approval</button></div></div>'+
'<dialog class="dlg" id="dlg" aria-labelledby="dlgT"><h3 id="dlgT"></h3><div id="dlgB"></div><div class="acts"><button type="button" class="btn btn-ghost" id="dlgNo">Cancel</button><button type="button" class="btn" id="dlgAlt" hidden></button><button type="button" class="btn btn-primary" id="dlgOk"></button></div></dialog>'+
'<div class="toast" id="toast" role="status" aria-live="polite"></div><div class="sr-only" id="sr" aria-live="polite"></div>';

const get=p=>p.split('.').reduce((o,k)=>o[k],S);
const setP=(p,v)=>{const a=p.split('.'),l=a.pop();a.reduce((o,k)=>o[k],S)[l]=v;};
const lim=p=>LIM[p.split('.').pop()]||[0,9999];
const toMin=t=>{const m=/^(\d\d):(\d\d)/.exec(t||'');return m?(+m[1])*60+(+m[2]):NaN;};
const winH=()=>{const h=(toMin(S.end)-toMin(S.start))/60;return h>0?h:0;};
const first=!0;let firstRun=true;
function setNum(el,v,dec=0){
 if(!el)return;const cur=parseFloat(el.dataset.v||'0');if(cur===v&&!firstRun)return;
 el.dataset.v=v;if(cancels.get(el))cancels.get(el)();
 cancels.set(el,Anim.countUp(el,{to:v,from:firstRun?0:cur,dur:firstRun?1500:450,delay:firstRun?200:0,decimals:dec,group:false}));
}
const sumK=k=>CH.reduce((a,c)=>a+(S.ch[c.id].on&&S.ch[c.id][k]?S.ch[c.id][k]:0),0);
function issues(){
 const L=[];
 if(!S.name.trim())L.push({msg:'Rule name is required',sel:'#f-name'});
 if(S.dpdFrom>S.dpdTo)L.push({msg:'DPD from must not exceed DPD to',sel:'#f-df'});
 if(S.effTo&&S.effTo<S.effFrom)L.push({msg:'Effective to is before effective from',sel:'#f-et'});
 CH.forEach(c=>{const r=S.ch[c.id];if(r.on&&((r.d&&r.d>r.w)||r.w>r.m))L.push({msg:c.n+': day cap must not exceed week cap, week not above month',sel:'[data-card='+c.id+'] input'});});
 if(S.oD>S.oW)L.push({msg:'Overall day cap exceeds the weekly cap',sel:'#f-od'});
 if(!S.ovr&&(toMin(S.start)<480||toMin(S.end)>1140))L.push({msg:'Time window must stay within 08:00 to 19:00 (RBI) unless a customer override is on',sel:'#f-st'});
 if(!(winH()>0))L.push({msg:'End time must be after start time',sel:'#f-en'});
 if(!S.days.some(Boolean))L.push({msg:'Pick at least one allowed day',sel:'.day'});
 return L;
}
function refresh(){
 $$('[data-n]').forEach(i=>{if(document.activeElement===i)return;const v=get(i.dataset.n);i.value=v==null?'':v;});
 CH.forEach(c=>{
  const r=S.ch[c.id],card=$('[data-card='+c.id+']');card.classList.toggle('off',!r.on);
  $$('input,[data-nb]',card).forEach(e=>e.disabled=!r.on);
  $$('[data-g]',card).forEach(g=>{const k=g.dataset.g.split('.')[2],v=r[k]||0;g.style.strokeDasharray=(75*Math.min(1,v/+g.dataset.max)).toFixed(1)+' 100';});
  const bad=r.on&&((r.d&&r.d>r.w)||r.w>r.m);
  $$('input',card).forEach(i=>i.setAttribute('aria-invalid',bad&&/\.(d|w|m)$/.test(i.dataset.n||'')?'true':'false'));
  const w=$('[data-warn='+c.id+']');
  w.textContent=bad?'Day cap cannot exceed week cap, and week cap cannot exceed month cap.':'';
  if(!bad&&r.on&&r.d&&r.d>S.oD){w.className='cc-info';w.textContent='Daily cap is above the overall cap ('+S.oD+'); the overall cap will bind.';}else w.className='cc-warn';
 });
 const sd=sumK('d'),sw=sumK('w'),ed=Math.min(S.oD,sd),ew=Math.min(S.oW,sw),wh=winH();
 setNum($('[data-hn=oD]'),S.oD);setNum($('[data-hn=oW]'),S.oW);setNum($('[data-hn=win]'),Math.round(wh*10)/10,wh%1?1:0);setNum($('[data-hn=cool]'),90);
 setNum($('[data-hn=effD]'),ed);setNum($('[data-hn=effW]'),ew);setNum($('[data-hn=oD2]'),S.oD);setNum($('[data-hn=oW2]'),S.oW);
 setNum($('#winH'),Math.round(wh*10)/10,wh%1?1:0);
 $('[data-hs=win]').textContent=S.start+'–'+S.end;
 $('#heroT').textContent='At most '+S.oD+' contacts a day and '+S.oW+' a week';
 $('#sumD').textContent=sd;$('#sumW').textContent=sw;
 const a=$('#arc'),st=toMin(S.start),en=toMin(S.end);
 a.style.strokeDasharray=(wh>0?Math.min(100,wh/24*100):0).toFixed(2)+' 100';a.style.transform='rotate('+(((isNaN(st)?0:st)/1440)*360-90).toFixed(1)+'deg)';
 $('#e-o').textContent=S.oD>S.oW?'Daily cap cannot exceed the weekly cap.':'';
 $('#e-dpd').textContent=S.dpdFrom>S.dpdTo?'DPD to must be at least DPD from.':'';
 $('#f-dt').setAttribute('aria-invalid',S.dpdFrom>S.dpdTo?'true':'false');
 const tErr=!S.ovr&&(st<480||en>1140)?'Outside the RBI window of 08:00 to 19:00. Turn on the customer override (with recorded consent) to go beyond it.':(wh>0?'':'End time must be after start time.');
 $('#e-t').textContent=tErr;$('#f-st').setAttribute('aria-invalid',tErr?'true':'false');$('#f-en').setAttribute('aria-invalid',tErr?'true':'false');
 $('#e-d').textContent=S.days.some(Boolean)?'':'Pick at least one allowed day.';
 $('#lvHint').textContent=S.level==='Customer'?'Caps apply across all loans of the customer':'Caps apply separately to each loan account';
 firstRun=false;renderSeq();
}
let seqFocus=null;
function renderSeq(){
 const el=$('#seq');el.classList.toggle('dim',S.esc!==ESC[0]);
 el.innerHTML=S.seq.map((id,i)=>{const c=cn(id),off=!S.ch[id].on;
  return '<li draggable="true" data-id="'+id+'"><span class="tok'+(off?' off':'')+'">'+Gears.svg({teeth:8,m:2,hole:.4,cls:off?'':spin,dur:8,reverse:i%2===1,phase:i%2?22.5:0,size:30})+'<span>'+(i+1)+'. '+(c.s||c.n)+(off?' (off)':'')+'</span><span class="nb"><button type="button" data-mv="'+id+'|-1" aria-label="Move '+c.n+' earlier"'+(i===0?' disabled':'')+'>&larr;</button><button type="button" data-mv="'+id+'|1" aria-label="Move '+c.n+' later"'+(i===S.seq.length-1?' disabled':'')+'>&rarr;</button></span></span>'+(i<S.seq.length-1?'<span class="arrow" aria-hidden="true">&rarr;</span>':'')+'</li>';}).join('');
 if(seqFocus){const b=$('[data-mv="'+seqFocus[0]+'|'+seqFocus[1]+'"]:not(:disabled)')||$('[data-mv="'+seqFocus[0]+'|'+(-seqFocus[1])+'"]:not(:disabled)');if(b)b.focus();seqFocus=null;}
}
function moveSeq(id,dir){const i=S.seq.indexOf(id),j=i+dir;if(j<0||j>=S.seq.length)return;S.seq.splice(j,0,S.seq.splice(i,1)[0]);seqFocus=[id,dir];dirty();renderSeq();$('#sr').textContent=cn(id).n+' moved to position '+(j+1)+' of '+S.seq.length;}
function dirty(){if(S.status!=='Draft')return;S.dirty=true;$('#dirty').textContent='Unsaved changes';}
let toastT;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2600);}
function setStatus(s,tone){S.status=s;['#stChip','#barChip'].forEach(q=>{const e=$(q);e.textContent=s;e.dataset.tone=tone;});$('#btnSubmit').disabled=s!=='Draft';$('[data-act=save]').disabled=s!=='Draft';}
function setN(p,v,final){
 if(isNaN(v))return;const [a,b]=lim(p);if(final||v<a||v>b)v=Math.max(a,Math.min(b,v));
 setP(p,v);dirty();refresh();
}

/* events */
on(root,'click',e=>{
 const nb=e.target.closest('[data-nb]');if(nb){setN(nb.dataset.nb,(get(nb.dataset.nb)||0)+ +nb.dataset.dir,true);return;}
 const t=e.target.closest('[data-t]');if(t){const p=t.dataset.t,v=!get(p);setP(p,p.endsWith('.on')?(v?1:0):v);t.setAttribute('aria-checked',String(v));dirty();refresh();return;}
 const lk=e.target.closest('[data-locked]');if(lk){const l=lk.parentNode.querySelector('.lock');l.classList.remove('nudge');void l.getBoundingClientRect();l.classList.add('nudge');toast('Mandatory by policy, this cannot be changed in a rule');return;}
 const d=e.target.closest('[data-day]');if(d){const i=+d.dataset.day;S.days[i]=S.days[i]?0:1;d.setAttribute('aria-pressed',String(!!S.days[i]));dirty();refresh();return;}
 const mv=e.target.closest('[data-mv]');if(mv){const[id,dr]=mv.dataset.mv.split('|');moveSeq(id,+dr);return;}
 const gs=e.target.closest('[data-go-step]');if(gs){goStep(+gs.dataset.goStep);return;}
 if(e.target.closest('#runSim')){runSim();return;}
 const ac=e.target.closest('[data-act]');if(ac)act(ac.dataset.act,ac);
});
on(root,'input',e=>{
 const i=e.target;
 if(i.dataset.n){setN(i.dataset.n,parseFloat(i.value),false);}
 else if(i.dataset.v){S[i.dataset.v]=i.dataset.v==='period'?+i.value:i.value;if(i.dataset.v==='name')$('#e-name').textContent='';if(i.dataset.v==='esc'||i.dataset.v==='start'||i.dataset.v==='end'||i.dataset.v==='effTo'||i.dataset.v==='effFrom')refresh();dirty();}
});
on(root,'change',e=>{const i=e.target;if(i.dataset.n){setN(i.dataset.n,parseFloat(i.value),true);if(i.value==='')refresh();}});
let dragId=null;const seqEl=$('#seq');
on(seqEl,'dragstart',e=>{const li=e.target.closest('li');if(!li)return;dragId=li.dataset.id;e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain',dragId);}catch(x){}});
on(seqEl,'dragover',e=>{if(!dragId)return;e.preventDefault();const li=e.target.closest('li');$$('.tok.over',seqEl).forEach(t=>t.classList.remove('over'));if(li)li.querySelector('.tok').classList.add('over');});
on(seqEl,'drop',e=>{e.preventDefault();const li=e.target.closest('li');if(!li||!dragId||li.dataset.id===dragId){dragId=null;return;}const to=S.seq.indexOf(li.dataset.id);S.seq.splice(S.seq.indexOf(dragId),1);S.seq.splice(to,0,dragId);dragId=null;dirty();renderSeq();});
on(seqEl,'dragend',()=>{dragId=null;$$('.tok.over',seqEl).forEach(t=>t.classList.remove('over'));});

/* simulation */
function simulate(days){
 const DEM={sms:3,wa:3,email:1,voice:4,ivr:2,field:1},R={window:0,channel:0,gap:0,overall:0};
 const by={};CH.forEach(c=>by[c.id]={a:0,s:0});let prop=0,all=0;const mo={};const wh=winH();
 let wk={},wkAll=0;
 for(let i=0;i<days;i++){
  if(i%7===0){wk={};wkAll=0;}
  const closed=!S.days[i%7]||(S.hol&&i===3),today={};let dayAll=0;
  S.seq.forEach(id=>{const r=S.ch[id];if(!r.on)return;
   for(let k=0;k<DEM[id];k++){prop++;
    let why=null;today[id]=today[id]||0;
    if(closed||!(wh>0))why='window';
    else if((r.d&&today[id]>=r.d)||(wk[id]||0)>=r.w||(mo[id]||0)>=r.m)why='channel';
    else if(r.gap&&today[id]>=Math.floor(wh/r.gap)+1)why='gap';
    else if(dayAll>=S.oD||wkAll>=S.oW)why='overall';
    if(why){R[why]++;by[id].s++;}else{by[id].a++;all++;today[id]++;dayAll++;wkAll++;wk[id]=(wk[id]||0)+1;mo[id]=(mo[id]||0)+1;}
   }});
 }
 return {prop,all,sup:prop-all,R,by};
}
let running=false;
function runSim(){
 if(running)return;running=true;const b=$('#runSim'),belt=$('#belt');b.disabled=true;b.textContent='Running...';belt.classList.add('run');
 $('#simOut').setAttribute('aria-busy','true');
 later(()=>{
  const days=S.period,r=simulate(days),out=$('#simOut');
  const tile=(n,l,tone)=>'<div class="rtile"'+(tone?' data-tone="'+tone+'"':'')+'><b data-count="'+n+'" data-group="false">'+n+'</b><span>'+l+'</span></div>';
  const rs=[['window','Outside window, day or holiday'],['channel','Channel cap reached'],['gap','Min gap not met'],['overall','Overall cap reached']].filter(x=>r.R[x[0]]);
  out.innerHTML='<div><h3>Sample '+days+' days from Mon 23 Nov 2026'+(S.segment.trim()?' for '+esc(S.segment.trim()):'')+'</h3></div><div class="rtiles">'+tile(r.prop,'Contacts proposed')+tile(r.all,'Contacts allowed','ok')+tile(r.sup,'Contacts suppressed','bad')+tile(r.R.channel+r.R.overall,'Cap hits')+'</div>'+
   '<div>'+CH.filter(c=>S.ch[c.id].on).map((c,i)=>{const q=r.by[c.id],t=Math.max(1,q.a+q.s);return '<div class="brow"><span>'+(c.s||c.n)+'</span><div class="bbar"><i class="a" data-bar style="width:'+q.a/t*100+'%;--d:'+i*.08+'s"></i><i class="s" data-bar style="width:'+q.s/t*100+'%;--d:'+(i*.08+.1)+'s"></i></div><span>'+q.a+' of '+(q.a+q.s)+'</span></div>';}).join('')+'</div>'+
   '<div style="display:flex;gap:8px;flex-wrap:wrap">'+(rs.length?rs.map(x=>'<span class="chip" data-tone="bad">'+x[1]+': '+r.R[x[0]]+'</span>').join(''):'<span class="chip" data-tone="ok">Nothing suppressed</span>')+'</div><p class="muted" style="margin:0;font-size:12.5px">Illustrative: assumes upstream campaigns propose SMS 3, WhatsApp 3, Voice 4, IVR 2, Email 1 and Field visit 1 a day, with a holiday on 26 Nov.</p>';
  out.removeAttribute('aria-busy');Anim.scan(out);belt.classList.remove('run');b.disabled=false;b.textContent='Run simulation again';running=false;
 },ctx.reduced?0:1700);
}

/* dialogs */
const dlg=$('#dlg');let opener=null,okFn=null,altFn=null;
function openDlg(o){
 opener=document.activeElement;$('#dlgT').textContent=o.title;$('#dlgB').innerHTML=o.body;
 const ok=$('#dlgOk'),alt=$('#dlgAlt');ok.textContent=o.ok;ok.disabled=!!o.okOff;ok.hidden=!!o.okHide;okFn=o.onOk;
 alt.hidden=!o.alt;if(o.alt)alt.textContent=o.alt;altFn=o.onAlt;dlg.showModal();
}
on($('#dlgNo'),'click',()=>dlg.close());
on($('#dlgOk'),'click',()=>{const f=okFn;dlg.close();f&&f();});
on($('#dlgAlt'),'click',()=>{const f=altFn;dlg.close();f&&f();});
on(dlg,'click',e=>{if(e.target===dlg)dlg.close();});
on(dlg,'close',()=>{const t=opener&&!opener.disabled&&document.contains(opener)?opener:$('#barChip');if(t){t.tabIndex=t.tabIndex<0?-1:t.tabIndex;t.focus();}});
function toField(sel){const f=$(sel);if(!f)return;f.scrollIntoView({block:'center',behavior:ctx.reduced?'auto':'smooth'});later(()=>f.focus({preventScroll:true}),300);}
function act(a,btn){
 if(a==='save'){S.dirty=false;$('#dirty').textContent='Draft saved just now';toast('Draft saved');}
 else if(a==='clone')toast('Cloned as CG-2026-0002 (draft copy)');
 else if(a==='audit')openDlg({title:'Audit history',ok:'Close',body:'<ul><li>19 Nov 2026: rule ID CG-2026-0001 reserved as Draft</li><li>'+(S.status==='Draft'?'No other events yet':'Status changed to '+S.status)+'</li></ul><p class="muted">Every save, submission and approval is recorded here.</p>',onOk:()=>{}});
 else if(a==='deact')openDlg({title:'Deactivate this rule?',ok:'Deactivate rule',body:'<p>Rule CG-2026-0001 will stop applying to customers. You can clone it later.</p>',onOk:()=>{setStatus('Inactive','bad');toast('Rule deactivated');}});
 else if(a==='submit'){
  const L=issues();
  if(L.length)openDlg({title:'Fix '+L.length+(L.length>1?' things':' thing')+' first',okHide:true,ok:'',alt:'Take me there',onAlt:()=>toField(L[0].sel),body:'<ul>'+L.map(x=>'<li>'+esc(x.msg)+'</li>').join('')+'</ul>'});
  else openDlg({title:'Submit for approval?',ok:'Submit rule',body:'<p>'+esc(S.name)+' (CG-2026-0001) goes to a checker. You will not be able to edit the draft while it is pending.</p>',onOk:()=>{setStatus('Pending approval','info');$('#dirty').textContent='Waiting for a checker';toast('Submitted for approval');}});
 }
}

/* stepper + scroll spy */
const secs=STEPS.map(s=>$('#sec-'+s[0]));let cur=-1,forced=null;
function setActive(i,burst){
 if(i===cur)return;cur=i;
 $$('.stp-g').forEach((g,k)=>{g.classList.toggle('on',k===i);if(k===i)g.setAttribute('aria-current','step');else g.removeAttribute('aria-current');});
 $$('.stp-l').forEach((l,k)=>l.classList.toggle('on',k===i));
 secs.forEach((s,k)=>s.classList.toggle('on',k===i));
 $('#stpN').textContent=i+1;$('#stpT').textContent=STEPS[i][1];
 if(burst&&!ctx.reduced){const st=$('.stp');st.classList.add('burst');later(()=>st.classList.remove('burst'),1300);}
}
function goStep(i){forced=i;setActive(i,true);secs[i].scrollIntoView({behavior:ctx.reduced?'auto':'smooth',block:'start'});later(()=>$('#h-'+STEPS[i][0]).focus({preventScroll:true}),ctx.reduced?0:600);}
function measure(){const top=document.querySelector('.top'),h=top?top.offsetHeight:70;root.style.setProperty('--topH',h+'px');root.style.setProperty('--scrollOff',(h+$('.stepper').offsetHeight+14)+'px');}
function spy(){
 const off=parseFloat(getComputedStyle(root).getPropertyValue('--scrollOff'))||170;let i=0;
 secs.forEach((s,k)=>{if(s.getBoundingClientRect().top<=off+60)i=k;});
 if(forced!==null)i=forced;else if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)i=4;
 setActive(i,true);
}
let raf=0;on(window,'scroll',()=>{if(!raf)raf=requestAnimationFrame(()=>{raf=0;spy();});},{passive:true});
['wheel','touchmove','keydown'].forEach(ev=>on(window,ev,()=>{forced=null;},{passive:true}));
on(window,'resize',()=>{measure();spy();});

measure();setActive(0,false);
$$('[data-v]').forEach(i=>{if(i.dataset.v==='period')i.value=String(S.period);});
refresh();
Anim.scan(root);
later(()=>{measure();spy();},300);
return ()=>{timers.forEach(clearTimeout);clearTimeout(toastT);cancelAnimationFrame(raf);cancels.forEach(c=>c());offs.forEach(f=>f());if(dlg.open)dlg.close();};
}
};
