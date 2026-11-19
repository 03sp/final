/* DATA FIXES (original prototype inconsistencies, resolved here):
   - Personal Loan delivery rate 97.1% -> 96.7% (59/61); Two-Wheeler stays 95.4% (from DATA).
   - Failure banner said "3 failed ... Home Loan LAN across 3 accounts" -> now "15 failed across all 3 LANs, 9 on the Home Loan" (15 = 9+2+4 = KPI).
   - "+6 this month" on Failed was green (looked good); now shown in the bad tone. "-1.4 pts" delivery delta shown in a warning tone.
   - "Latest communications" claimed "Across all 3 LANs" but listed only the Home Loan; now 6 entries spanning HL, PL and TW, newest first, matching each loan's last-communication timestamp (HL 21 Oct 06:42, PL 19 Oct 09:15, TW 02 Aug 2025 11:20). PL and TW entries are derived/plausible, not from the original.
   - Customer initials use DATA (RK). Email masked so it can't wrap mid-domain; mask styles unified to bullets; "Popup" naming not used (no popup consent row in original, kept out).
   - DND row now reads "DND registry • not registered" like the other rows.
   - Delivery-rate meters encode value on a zoomed 90-100% scale (the original bars were all the same length); scale is labelled.
   - Analysis charts (added): they show the LAST-30-DAY SLICE (22 Sep to 21 Oct 2026), not the lifetime 291. Slice = 124 comms (round(291*.426)); all 15 failures fall inside it so the red days sum to the Failed KPI (15).
     Delivery status for the slice: Read 38, Delivered 64, Failed 15, Expired 4, Suppressed 3 = 124 (the daily bars also sum to 124). Per-day split is generated deterministically (seeded), so it is illustrative.
     Channel mix uses the original labels SMS / WhatsApp / Email / Push / Popup (BRD says Telephony/Push; the timeline screen says "In-app pop-up"); 124 split 41/29/26/17/11 (illustrative proportions).
   - Selected customer: for anyone other than Rajesh the whole screen is derived from their LANs (seeded) and flagged with an "Illustrative data" chip.
*/
Screens.overview = {
  title: 'Customer overview',
  css: `
.s-overview{--gap:20px;max-width:1240px;margin:0 auto;display:flex;flex-direction:column;gap:var(--gap)}
.s-overview .rise{animation:ov-rise .6s var(--ease) both;animation-delay:calc(var(--i,0)*70ms + 60ms)}
@keyframes ov-rise{from{opacity:0;transform:translateY(18px) scale(.985)}}
.s-overview .lift{transition:transform .22s var(--ease),box-shadow .22s var(--ease)}
.s-overview .lift:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg)}
.s-overview .lift:active{transform:translateY(1px) scale(.99);box-shadow:var(--shadow-press)}
.s-overview h2{font-size:21px}
.s-overview h3{font-size:17px}
.s-overview .sub{font-size:13.5px;color:var(--ink-2);margin:4px 0 0}

/* top row */
.s-overview .top-row{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);gap:var(--gap);align-items:stretch}
.s-overview .who{display:flex;flex-direction:column;gap:20px;position:relative;overflow:hidden}
.s-overview .who-head{display:flex;gap:18px;align-items:center}
.s-overview .who .big-av{width:76px;height:76px;font-size:28px;flex:none;background:var(--a1);color:var(--a1-ink);transition:transform .4s var(--ease)}
.s-overview .who:hover .big-av{transform:rotate(-8deg) scale(1.06)}
.s-overview .who h2{font-size:30px;line-height:1.05}
.s-overview .chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.s-overview .recent{margin-top:auto;display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:var(--r-sm);background:var(--surface-2);flex-wrap:wrap}.s-overview .recent b{display:block;font-size:14.5px}.s-overview .recent small{color:var(--ink-2);font-size:13px}.s-overview .recent .ctile{background:var(--ok-bg);color:var(--ok)}
.s-overview .facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px 18px;padding-top:18px;border-top:var(--bw) dashed var(--line)}
.s-overview .fact{display:flex;flex-direction:column;gap:2px;min-width:0}
.s-overview .fact span{font-size:12.5px;color:var(--ink-2);font-weight:700}
.s-overview .fact b{font:700 15px var(--font-body);overflow-wrap:anywhere}
.s-overview .who-gear{position:absolute;right:-26px;top:-26px;opacity:.1;color:var(--ink);pointer-events:none}
.s-overview .who-gear .gear-body{fill:currentColor}

.s-overview .consent h3{display:flex;align-items:center;gap:8px}
.s-overview .crow{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--line)}
.s-overview .crow:last-child{border-bottom:0;padding-bottom:0}
.s-overview .crow .ic{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;flex:none;transition:transform .25s var(--ease)}
.s-overview .crow:hover .ic{transform:scale(1.14) rotate(-6deg)}
.s-overview .crow .ic svg{width:16px;height:16px}
.s-overview .crow .ic.ok{background:var(--ok-bg);color:var(--ok)}
.s-overview .crow .ic.no{background:var(--bad-bg);color:var(--bad)}
.s-overview .crow b{display:block;font-size:14.5px}
.s-overview .crow small{color:var(--ink-2);font-size:13px}
.s-overview .crow .chip{margin-left:auto}

/* banner */
.s-overview .alert{display:flex;align-items:center;gap:16px;padding:16px 20px;background:linear-gradient(var(--bad-bg),var(--bad-bg)),var(--surface);color:var(--ink);border:var(--bw) solid var(--line);border-radius:var(--r);box-shadow:var(--shadow);flex-wrap:wrap}
[data-skin=night] .s-overview .alert,[data-skin=soda] .s-overview .alert{border-color:color-mix(in srgb,var(--bad) 40%,transparent)}
.s-overview .alert .tri{width:44px;height:44px;border-radius:14px;background:var(--bad);color:var(--surface);display:grid;place-items:center;flex:none;animation:ov-wob 3.4s ease-in-out infinite}
[data-skin=night] .s-overview .alert .tri{color:#0C1736}
@keyframes ov-wob{0%,86%,100%{transform:rotate(0)}90%{transform:rotate(-9deg)}94%{transform:rotate(7deg)}97%{transform:rotate(-3deg)}}
.s-overview .alert .tri svg{width:24px;height:24px}
.s-overview .alert .tx{flex:1;min-width:220px}
.s-overview .alert b{font:var(--head-weight) 17px var(--font-display);display:block}
.s-overview .alert p{margin:3px 0 0;font-size:14px;color:var(--ink)}
.s-overview .alert .btn{background:var(--ink);color:var(--surface);border-color:var(--ink)}
[data-skin=night] .s-overview .alert .btn{background:var(--bad);color:#0C1736;border-color:transparent}

/* KPI mosaic */
.s-overview .kpis{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--gap)}
.s-overview .kpi{position:relative;overflow:hidden;border:var(--bw) solid var(--line);border-radius:var(--r);box-shadow:var(--shadow);padding:20px;display:flex;flex-direction:column;gap:6px;min-height:150px}
[data-skin=night] .s-overview .kpi{border-color:var(--line)}
.s-overview .kpi .lab{font-size:13.5px;font-weight:700;display:flex;align-items:center;gap:8px;opacity:.85}
.s-overview .kpi .note{font-size:13px;font-weight:700;display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:auto}
.s-overview .k-rate{grid-column:span 4;grid-row:span 2;background:var(--a2);color:var(--a2-ink);align-items:center;text-align:center;justify-content:center;gap:10px;padding:26px 20px}
.s-overview .k-total{grid-column:span 5;background:var(--a1);color:var(--a1-ink)}
.s-overview .k-fail{grid-column:span 3;background:linear-gradient(var(--bad-bg),var(--bad-bg)),var(--surface);color:var(--bad)}
.s-overview .k-lan{grid-column:span 4;background:var(--surface);color:var(--ink)}
.s-overview .k-lat{grid-column:span 4;background:var(--a3);color:var(--a3-ink)}
.s-overview .ring{position:relative;width:min(100%,208px);aspect-ratio:1}
.s-overview .ring svg{width:100%;height:100%;transform:rotate(-90deg);display:block;overflow:visible}
.s-overview .ring .trk{fill:none;stroke:currentColor;opacity:.22;stroke-width:11}
.s-overview .ring .val{fill:none;stroke:currentColor;stroke-width:11;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:100;transition:stroke-dashoffset 1.6s var(--ease) .35s}
.s-overview .ring.go .val{stroke-dashoffset:5.1}
.s-overview .ring .num{position:absolute;inset:0;display:grid;place-content:center;font:var(--head-weight) 44px/1 var(--font-display);letter-spacing:var(--head-track)}
.s-overview .ring .num small{font-size:14px;font-family:var(--font-body);font-weight:700;opacity:.8;text-align:center;margin-top:4px}
.s-overview .ring .tick{fill:none;stroke:currentColor;stroke-width:2;opacity:.5;animation:ov-pulse 3.2s ease-in-out infinite}
@keyframes ov-pulse{50%{opacity:.15}}
.s-overview .delta{display:inline-flex;gap:5px;align-items:center;padding:3px 10px;border-radius:999px;background:color-mix(in srgb,currentColor 16%,transparent);font-size:13px;font-weight:800}
.s-overview .odo{display:flex;align-items:flex-end;gap:2px;font:var(--head-weight) 76px/1 var(--font-display);letter-spacing:0;margin:2px 0 0;height:1em;overflow:hidden;font-variant-numeric:tabular-nums}
.s-overview .odo .win{display:block;height:1em;width:.64em;overflow:hidden;border-radius:10px;background:color-mix(in srgb,currentColor 12%,transparent)}
.s-overview .odo .strip{display:flex;flex-direction:column;transform:translateY(0);transition:transform 1.8s cubic-bezier(.16,.9,.2,1) var(--d,0s)}
.s-overview .odo .strip i{font-style:normal;display:block;height:1em;line-height:1;text-align:center}
.s-overview .odo.go .strip{transform:translateY(calc(var(--n)*-10%))}
.s-overview .spark{position:absolute;right:14px;bottom:12px;width:44%;height:46px;opacity:.9;overflow:visible}
.s-overview .spark path{fill:none;stroke:currentColor;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
.s-overview .spark circle{fill:currentColor}
.s-overview .big-num{font:var(--head-weight) 52px/1 var(--font-display);letter-spacing:var(--head-track);font-variant-numeric:tabular-nums}
.s-overview .pips{display:flex;gap:8px;margin:6px 0 4px}
.s-overview .pip{width:44px;height:44px;border-radius:12px;border:var(--bw) solid var(--line);display:grid;place-items:center;font:800 12px var(--font-body);background:var(--surface-2);color:var(--ink-2);transform:scale(.6);opacity:0;animation:ov-pop .5s var(--ease) forwards;animation-delay:calc(.7s + var(--p)*120ms)}
[data-skin=soda] .s-overview .pip{border:0}
.s-overview .pip.on{background:var(--ok-bg);color:var(--ok)}
.s-overview .pip.on.warn{background:var(--warn-bg);color:var(--warn)}
@keyframes ov-pop{to{transform:none;opacity:1}}
.s-overview .lat-gears{position:absolute;right:6px;top:6px;width:90px;height:90px;pointer-events:none;opacity:.45;color:var(--a3-ink)}
.s-overview .lat-gears .gear{position:absolute}
.s-overview .lat-gears .gear-body{fill:currentColor}
.s-overview .lat-track{position:relative;height:8px;border-radius:99px;background:color-mix(in srgb,currentColor 20%,transparent);margin:8px 0 2px}
.s-overview .lat-track i{position:absolute;left:0;top:0;bottom:0;width:15%;border-radius:99px;background:currentColor}
.s-overview .lat-scale{display:flex;justify-content:space-between;font-size:11.5px;font-weight:700;opacity:.8}

/* section heads */
.s-overview .sec-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:-4px}

/* loans */
.s-overview .loans{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap)}
.s-overview .loan{display:flex;flex-direction:column;gap:14px;position:relative}
.s-overview .loan.closed{background:var(--surface-2)}
.s-overview .loan.overdue::before{content:"";position:absolute;left:20px;right:20px;top:0;height:5px;border-radius:0 0 6px 6px;background:var(--bad)}
.s-overview .loan .lh{flex-wrap:wrap;display:flex;justify-content:space-between;gap:10px;align-items:flex-start}
.s-overview .loan .lan{font:700 12.5px ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--ink-2);letter-spacing:0;white-space:nowrap;margin-top:4px}
.s-overview .loan .chips{margin:0;justify-content:flex-end}
.s-overview .loan .amt{font:var(--head-weight) 28px/1 var(--font-display);letter-spacing:var(--head-track)}
.s-overview .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:left}
.s-overview .stats div{background:var(--surface-2);border-radius:var(--r-sm);padding:9px 10px;min-width:0}
.s-overview .closed .stats div{background:var(--surface)}
.s-overview .stats span{display:block;font-size:12px;color:var(--ink-2);font-weight:700}
.s-overview .stats b{font:800 19px var(--font-display)}
.s-overview .stats b.bad{color:var(--bad)}
.s-overview .meter .mh{display:flex;justify-content:space-between;align-items:baseline;font-size:13px;font-weight:700;margin-bottom:6px}
.s-overview .meter .mh b{font:800 20px var(--font-display)}
.s-overview .mtrack{height:14px;border-radius:99px;background:var(--surface-2);position:relative;overflow:hidden;border:calc(var(--bw)*.6) solid var(--line)}
.s-overview .closed .mtrack{background:var(--surface)}
.s-overview .mfill{position:absolute;inset:0;border-radius:99px;background:var(--ok)}
.s-overview .mfill.warn{background:var(--warn)}
.s-overview .mtick{position:absolute;top:0;bottom:0;width:2px;background:var(--ink);opacity:.45}
.s-overview .mscale{display:flex;justify-content:space-between;font-size:11px;color:var(--ink-2);margin-top:4px;font-weight:600}
.s-overview .loan .lf{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:auto;flex-wrap:wrap}
.s-overview .loan .last{font-size:13px;color:var(--ink-2)}
.s-overview .loan .last b{display:block;color:var(--ink);font-size:13.5px}
.s-overview .btn .arr{transition:transform .2s var(--ease)}
.s-overview .btn:hover .arr{transform:translateX(4px)}

/* lower row */
.s-overview .low-row{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:var(--gap);align-items:start}
.s-overview .split-row{margin-top:16px}
.s-overview .split-row .sh{display:flex;justify-content:space-between;font-size:13px;font-weight:700;margin-bottom:6px;gap:8px}
.s-overview .split-row .sh span:last-child{color:var(--ink-2)}
.s-overview .strack{height:26px;border-radius:99px;display:flex;overflow:hidden;border:calc(var(--bw)*.6) solid var(--line);background:var(--surface-2);transform-origin:0 50%}
.s-overview .strack .d{background:var(--a2);height:100%}
.s-overview .strack .f{background:var(--bad);height:100%;min-width:6px;position:relative}
.s-overview .strack .f::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(135deg,rgba(255,255,255,.35) 0 4px,transparent 4px 8px);animation:ov-stripe 2s linear infinite}
@keyframes ov-stripe{to{background-position:16px 0}}
.s-overview .legend{display:flex;gap:16px;font-size:13px;font-weight:700;margin-top:18px;flex-wrap:wrap}
.s-overview .legend i{display:inline-block;width:12px;height:12px;border-radius:4px;margin-right:6px;vertical-align:-1px}
.s-overview .sum{display:flex;gap:10px;align-items:baseline;margin-top:6px}
.s-overview .sum b{font:var(--head-weight) 38px/1 var(--font-display);font-variant-numeric:tabular-nums}
.s-overview .lat-list{list-style:none;margin:10px 0 0;padding:0}
.s-overview .lrow{display:flex;gap:14px;align-items:center;width:100%;text-align:left;background:transparent;border:0;border-bottom:1px solid var(--line);padding:12px 8px;cursor:pointer;border-radius:var(--r-sm);transition:background .18s,transform .18s var(--ease)}
.s-overview li:last-child .lrow{border-bottom:0}
.s-overview .lrow:hover{background:var(--surface-2);transform:translateX(4px)}
.s-overview .lrow:active{transform:scale(.99)}
.s-overview .ctile{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;flex:none;background:var(--surface-2);color:var(--ink);border:calc(var(--bw)*.6) solid var(--line)}
.s-overview .ctile svg{width:20px;height:20px}
.s-overview .ctile[data-ch=WhatsApp]{background:var(--ok-bg);color:var(--ok)}
.s-overview .ctile[data-ch=SMS]{background:var(--info-bg);color:var(--info)}
.s-overview .ctile[data-ch=Email]{background:var(--warn-bg);color:var(--warn)}
.s-overview .ctile[data-ch=Push]{background:var(--bad-bg);color:var(--bad)}
.s-overview .lrow .tt{flex:1;min-width:0}
.s-overview .lrow .tt b{display:block;font-size:14.5px}
.s-overview .lrow .tt span{font-size:12.5px;color:var(--ink-2)}
.s-overview .lrow .rt{display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end}
.s-overview .lanchip{font:700 12px ui-monospace,SFMono-Regular,Menlo,monospace;padding:3px 8px;border-radius:8px;background:var(--surface-2);border:calc(var(--bw)*.6) solid var(--line);color:var(--ink-2)}
.s-overview .chip-link{background:none;border:0;padding:4px 2px;font:800 14px var(--font-body);color:var(--a2);cursor:pointer;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px}
[data-skin=pop] .s-overview .chip-link{color:var(--a2)}
[data-skin=night] .s-overview .chip-link{color:var(--a2)}
[data-skin=soda] .s-overview .chip-link{color:var(--a1)}
.s-overview .card-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}

/* charts */
.s-overview .charts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--gap)}
.s-overview .ch-wide{grid-column:1/-1}
.s-overview .lg{display:flex;gap:8px;flex-wrap:wrap}
.s-overview .lgi,.s-overview .dli{display:inline-flex;align-items:center;gap:8px;font:700 13px var(--font-body);padding:6px 12px;border-radius:999px;background:var(--surface-2);border:calc(var(--bw)*.6) solid var(--line);cursor:pointer;transition:opacity .18s,transform .15s var(--ease)}
.s-overview .lgi:hover,.s-overview .dli:hover{transform:translateY(-2px)}
.s-overview .lgi i,.s-overview .dli i{width:12px;height:12px;border-radius:4px;flex:none}
.s-overview .lgi[aria-pressed=false]{opacity:.45;text-decoration:line-through}
.s-overview .vol{position:relative;display:grid;grid-template-columns:28px minmax(0,1fr);grid-template-rows:230px auto;column-gap:10px;margin-top:18px}
.s-overview .yax{position:relative}
.s-overview .yax span{position:absolute;right:0;transform:translateY(50%);font-size:11.5px;font-weight:700;color:var(--ink-2)}
.s-overview .plot{position:relative;border-bottom:var(--bw) solid var(--line)}
.s-overview .gl{position:absolute;left:0;right:0;border-top:1px dashed var(--line);opacity:.6}
.s-overview .cols{position:absolute;inset:0;display:grid;grid-template-columns:repeat(30,minmax(0,1fr));gap:4px;align-items:end}
.s-overview .dcol{height:100%;display:flex;align-items:flex-end;padding:0;border:0;background:transparent;cursor:pointer;border-radius:4px}
.s-overview .dcol:hover,.s-overview .dcol:focus-visible{background:color-mix(in srgb,var(--ink) 9%,transparent)}
.s-overview .dcol:focus-visible{outline-offset:1px}
.s-overview .stack{width:100%;display:flex;flex-direction:column-reverse;border-radius:5px 5px 0 0;overflow:hidden}
.s-overview .stack .sd{background:var(--a2);min-height:0;transition:flex .4s var(--ease),opacity .3s}
.s-overview .stack .sf{background:var(--bad);min-height:0;transition:flex .4s var(--ease),opacity .3s}
.s-overview .stack .sf:not([style*="flex:0"]){min-height:3px}
.s-overview .vol.hide-d .sd{flex:0!important;opacity:0}
.s-overview .vol.hide-f .sf{flex:0!important;opacity:0;min-height:0!important}
.s-overview .xax{grid-column:2;display:grid;grid-template-columns:repeat(30,minmax(0,1fr));gap:4px;margin-top:8px}
.s-overview .xax span{font-size:11px;font-weight:700;color:var(--ink-2);white-space:nowrap;overflow:visible;text-align:center;min-width:0;margin:0 -20px}
.s-overview .sbars{list-style:none;margin:18px 0 0;padding:0;display:flex;flex-direction:column;gap:14px}
.s-overview .sbar{display:grid;grid-template-columns:86px minmax(0,1fr) 34px;gap:12px;align-items:center;font-size:14px;font-weight:700;border-radius:var(--r-sm);padding:4px 6px;margin:-4px -6px}
.s-overview .sbar:hover,.s-overview .sbar:focus-visible{background:var(--surface-2)}
.s-overview .sbar .st{height:18px;border-radius:99px;background:var(--surface-2);border:calc(var(--bw)*.6) solid var(--line);overflow:hidden;display:block}
.s-overview .sbar .st i{display:block;height:100%;border-radius:99px}
.s-overview .sbar b{text-align:right}
.s-overview .donut-row{display:flex;align-items:center;gap:26px;flex-wrap:wrap;margin-top:14px}
.s-overview .donut{position:relative;width:190px;flex:none}
.s-overview .donut svg{display:block;width:100%;overflow:visible}
.s-overview .donut .seg{fill:none;stroke-width:16;cursor:pointer;transition:opacity .2s,stroke-width .2s var(--ease)}
.s-overview .donut .seg:hover,.s-overview .donut .seg:focus-visible,.s-overview .donut .seg.sel{stroke-width:20}
.s-overview .donut .seg:focus-visible{outline:none;filter:drop-shadow(0 0 3px var(--ink))}
.s-overview .has-sel .seg:not(.sel){opacity:.28}
.s-overview .has-sel .dli:not(.sel){opacity:.5}
.s-overview .dli[aria-pressed=true]{background:var(--ink);color:var(--surface)}
.s-overview .dc{position:absolute;inset:0;display:grid;place-content:center;text-align:center;pointer-events:none}
.s-overview .dc b{font:var(--head-weight) 34px/1 var(--font-display)}
.s-overview .dc span{font-size:12px;font-weight:700;color:var(--ink-2);max-width:90px;margin:2px auto 0}
.s-overview .dlg{list-style:none;margin:0;padding:0;flex:1 1 150px;display:flex;flex-direction:column;gap:8px;min-width:0}
.s-overview .dli{width:100%;border-radius:var(--r-sm)}
.s-overview .dli span{flex:1;text-align:left}
.s-overview .dli small{color:inherit;opacity:.7;font-weight:700;min-width:34px;text-align:right}
.ov-tip{position:fixed;z-index:200;pointer-events:none;padding:9px 12px;border-radius:var(--r-sm);background:var(--ink);color:var(--surface);font:600 12.5px/1.45 var(--font-body);box-shadow:var(--shadow);display:flex;flex-direction:column}
.ov-tip[hidden]{display:none}
.ov-tip b{font:800 13px var(--font-display);margin-bottom:2px}
@media (max-width:1100px){.s-overview .charts{grid-template-columns:1fr}}
@media (max-width:640px){.s-overview .xax span{font-size:9.5px}.s-overview .vol{grid-template-columns:22px minmax(0,1fr)}.s-overview .cols,.s-overview .xax{gap:2px}}
@media (max-width:1100px){
 .s-overview .top-row,.s-overview .low-row{grid-template-columns:1fr}
 .s-overview .loans{grid-template-columns:1fr}
 .s-overview .k-rate{grid-column:span 12;grid-row:auto}
 .s-overview .k-total{grid-column:span 7}.s-overview .k-fail{grid-column:span 5}
 .s-overview .k-lan,.s-overview .k-lat{grid-column:span 6}
}
@media (max-width:640px){
 .s-overview{--gap:14px}
 .s-overview .k-total,.s-overview .k-fail,.s-overview .k-lan,.s-overview .k-lat{grid-column:span 12}
 .s-overview .who h2{font-size:24px}.s-overview .who-head{align-items:flex-start}
 .s-overview .odo{font-size:64px}
 .s-overview .lrow{flex-wrap:wrap}.s-overview .lrow .rt{width:100%;justify-content:flex-start;padding-left:54px}
 .s-overview .spark{width:38%}
}
`,
  render(root, ctx) {
    const D = DATA, F = ctx.fmt, SEL = ctx.selection, CU = SEL && SEL.customer;
    const LOANS = CU ? CU.lans : D.loans, ILLU = !!(CU && CU.illustrative);
    const C = CU ? Object.assign({}, D.customer, CU, { loans: LOANS.length }) : D.customer;
    const K = !ILLU ? D.kpis : (() => {
      const tot = LOANS.reduce((a, l) => a + l.comms, 0), fl = LOANS.reduce((a, l) => a + l.failed, 0), seed = tot % 7;
      return { deliveryRate: +((tot - fl) / tot * 100).toFixed(1), totalComms: tot, failed: fl, activeLans: LOANS.filter(l => l.status !== 'Closed').length, totalLans: LOANS.length, avgLatencySec: 7 + seed };
    })();
    const I = {
      check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
      x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
      tri: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5l9.5 16.5h-19z"/><path d="M12 10v4.5M12 17.5v.1"/></svg>',
      arr: '<svg class="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
      down: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l10 10M17 8v9H8"/></svg>',
      up: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>',
      SMS: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 10.5h.1M12 10.5h.1M15.5 10.5h.1"/></svg>',
      WhatsApp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1.4-4.2A8 8 0 1 1 8.2 18.6z"/><path d="M9.5 9.5c0 3 2 5 5 5l1-1.5-2-1-.8.7c-.8-.4-1.4-1-1.8-1.8l.7-.8-1-2z"/></svg>',
      Email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/></svg>',
      Push: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 17v-6a6 6 0 1 1 12 0v6l1.5 2h-15zM10 21h4"/></svg>',
      shield: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>'
    };
    const loanById = k => LOANS.find(l => l.lan.includes(k));
    const tone = { Overdue: 'warn', Active: 'ok', Closed: '' };
    const sparkPath = (arr, w = 100, h = 40) => {
      const mx = Math.max(...arr), mn = Math.min(...arr), n = arr.length - 1;
      const pts = arr.map((v, i) => [(i / n * w).toFixed(1), (h - 4 - (v - mn) / (mx - mn || 1) * (h - 8)).toFixed(1)]);
      return { d: 'M' + pts.map(p => p.join(' ')).join('L'), last: pts[n] };
    };
    const spFail = sparkPath([1, 2, 1, 3, 2, 2, 4, 3, 5, 4, 7, 9, 12, 15]);
    const spTot = sparkPath([30, 52, 61, 79, 95, 118, 140, 170, 205, 228, 251, 266, 280, 291]);

    const consentDetail = {
      SMS: 'DLT consent on file', WhatsApp: 'Opt-in via app, 14 Jun 2023', Email: 'Verified address', Push: 'Notifications disabled on device'
    };
    const consentRows = C.consent.map(c => `<div class="crow"><span class="ic ${c.opted ? 'ok' : 'no'}">${c.opted ? I.check : I.x}</span><div><b>${c.ch}</b><small>${consentDetail[c.ch] || ''}</small></div><span class="chip" data-tone="${c.opted ? 'ok' : 'bad'}">${c.opted ? 'Opted in' : 'Opted out'}</span></div>`).join('') +
      `<div class="crow"><span class="ic ok">${I.shield.replace('width="18" height="18"', '')}</span><div><b>DND registry</b><small>NCPR checked 12 Oct 2026</small></div><span class="chip" data-tone="ok">${C.dnd}</span></div>`;

    const worstL = LOANS.reduce((a, l) => l.failed > a.failed ? l : a, LOANS[0]), wd = parseInt(worstL.dpdLabel, 10) || 0;
    const ALERT = !ILLU ? 'Nine of them sit on the Home Loan, which is 34 days overdue. Review the delivery failures in the timeline.' : worstL.failed + ' of them sit on the ' + worstL.type + (wd ? ', which is ' + wd + ' days overdue' : '') + '. Review the delivery failures in the timeline.';
    const odoDigits = String(K.totalComms).split('').map((d, i) =>
      `<span class="win"><span class="strip" style="--n:${d};--d:${(i * 0.18).toFixed(2)}s">${[0,1,2,3,4,5,6,7,8,9].map(n => `<i>${n}</i>`).join('')}</span></span>`).join('');

    const loanCard = (l, i) => {
      const cl = l.status === 'Closed' ? 'closed' : l.status === 'Overdue' ? 'overdue' : '';
      const warn = l.rate < 95;
      const w = Math.max(0, (l.rate - 90) * 10);
      return `<article class="card lift loan rise ${cl}" style="--i:${9 + i}">
        <div class="lh"><div><h3>${l.type}</h3><div class="lan">${l.lan}</div></div>
          <div class="chips"><span class="chip" data-tone="${tone[l.status]}"><i class="dot"></i>${l.status}</span><span class="chip" data-tone="${l.dpdLabel === 'Current' ? 'ok' : 'bad'}">${l.dpdLabel}</span></div></div>
        <div><span class="muted" style="font-size:12.5px;font-weight:700">Outstanding</span><div class="amt tabular">${l.outstanding ? '<span data-count="' + l.outstanding + '" data-prefix="₹" data-dur="1500" data-delay="' + (700 + i * 120) + '">₹0</span>' : '₹0'}</div></div>
        <div class="stats"><div><span>Comms</span><b class="tabular" data-count="${l.comms}" data-delay="${800 + i * 120}">0</b></div><div><span>Failed</span><b class="tabular ${l.failed >= 5 ? 'bad' : ''}" data-count="${l.failed}" data-delay="${900 + i * 120}">0</b></div><div><span>Delivered</span><b class="tabular" data-count="${l.comms - l.failed}" data-delay="${850 + i * 120}">0</b></div></div>
        <div class="meter"><div class="mh"><span>Delivery rate</span><b class="tabular" data-count="${l.rate}" data-decimals="1" data-suffix="%" data-delay="${800 + i * 120}">0%</b></div>
          <div class="mtrack" role="img" aria-label="Delivery rate ${l.rate}%"><div class="mfill ${warn ? 'warn' : ''}" data-bar style="--d:${0.7 + i * 0.12}s;width:${w}%"></div><span class="mtick" style="left:50%" title="95% target"></span></div>
          <div class="mscale"><span>90%</span><span>95% target</span><span>100%</span></div></div>
        <div class="lf"><div class="last">Last communication<b>${l.last}</b></div><button class="btn ${l.status === 'Overdue' ? 'btn-primary' : ''}" data-tl="${l.lan}" aria-label="View timeline for ${l.lan}">View timeline ${I.arr}</button></div>
      </article>`;
    };

    const latestR = [
      { ch: 'WhatsApp', t: 'EMI overdue reminder — Day 34', at: '21 Oct 2026, 06:42', k: 'HL', st: 'Read' },
      { ch: 'SMS', t: 'EMI overdue reminder — Day 34', at: '21 Oct 2026, 06:40', k: 'HL', st: 'Delivered' },
      { ch: 'Email', t: 'Late payment charges notice', at: '20 Oct 2026, 10:00', k: 'HL', st: 'Delivered' },
      { ch: 'Push', t: 'EMI overdue reminder — Day 33', at: '20 Oct 2026, 07:30', k: 'HL', st: 'Failed' },
      { ch: 'SMS', t: 'Upcoming EMI reminder — due 5 Nov', at: '19 Oct 2026, 09:15', k: 'PL', st: 'Delivered' },
      { ch: 'Email', t: 'Loan closure confirmation', at: '02 Aug 2025, 11:20', k: 'TW', st: 'Delivered' }
    ];
    const hm = t => t.replace(/(\d\d):(\d\d)$/, (m, h, mi) => { const x = (+h * 60 + +mi - 2 + 1440) % 1440; return String(Math.floor(x / 60)).padStart(2, '0') + ':' + String(x % 60).padStart(2, '0'); });
    const latest = !ILLU ? latestR : LOANS.flatMap((l, i) => {
      const dpd = parseInt(l.dpdLabel, 10) || 0, ttl = l.status === 'Closed' ? 'Loan closure confirmation' : dpd ? 'EMI overdue reminder — Day ' + dpd : 'Upcoming EMI reminder';
      const chs = ['SMS', 'WhatsApp', 'Email', 'Push'], c1 = chs[(l.comms + i) % 4];
      return [{ ch: c1, t: ttl, at: l.last, lan: l, st: l.failed > 3 && i % 2 ? 'Failed' : c1 === 'WhatsApp' ? 'Read' : 'Delivered' }, { ch: 'SMS', t: ttl, at: l.last.replace(/\d\d:\d\d$/, hm(l.last.slice(-5))), lan: l, st: 'Delivered' }];
    }).slice(0, 6);
    const stTone = { Read: 'ok', Delivered: 'info', Failed: 'bad' };
    const lanShort = l => l.lan.split('-')[1] + ' …' + l.lan.slice(-4);
    const latestHtml = latest.map(r => `<li><button class="lrow" data-tl="${(r.lan || loanById('-' + r.k + '-')).lan}"><span class="ctile" data-ch="${r.ch}" title="${r.ch}">${I[r.ch]}</span><span class="tt"><b>${r.t}</b><span>${r.ch} · ${r.at}</span></span><span class="rt"><span class="lanchip">${lanShort(r.lan || loanById('-' + r.k + '-'))}</span><span class="chip" data-tone="${stTone[r.st]}"><i class="dot"></i>${r.st}</span></span></button></li>`).join('');

    const maxC = Math.max(...LOANS.map(l => l.comms));
    const splitHtml = LOANS.map((l, i) => `<div class="split-row"><div class="sh"><span>${l.type}</span><span class="tabular">${l.comms - l.failed} delivered · ${l.failed} failed</span></div>
      <div class="strack" data-bar style="--d:${0.6 + i * 0.15}s;width:${(l.comms / maxC * 100).toFixed(1)}%" role="img" aria-label="${l.type}: ${l.comms - l.failed} delivered, ${l.failed} failed"><span class="d" style="flex:${l.comms - l.failed}"></span><span class="f" style="flex:${l.failed}"></span></div></div>`).join('');

    const gm = ctx.Gears.mesh(12, 8, 3, 16, 50);

    /* ---- analysis charts: 30-day slice (22 Sep to 21 Oct 2026) ---- */
    const rng = (a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; })(K.totalComms * 31 + K.failed);
    const spread = (total, w) => { const sw = w.reduce((a, b) => a + b, 0), raw = w.map(x => x / sw * total), out = raw.map(Math.floor); let r = total - out.reduce((a, b) => a + b, 0); raw.map((x, i) => [x - out[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (r-- > 0) out[i]++; }); return out; };
    const SL = (() => {
      const total = Math.max(K.failed + 1, Math.round(K.totalComms * 0.426)), failed = Math.min(K.failed, total);
      const day = []; const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let i = 0; i < 30; i++) { const d = new Date(Date.UTC(2026, 8, 22 + i)); day.push({ lab: d.getUTCDate() + ' ' + MON[d.getUTCMonth()], dow: d.getUTCDay() }); }
      const w = day.map((d, i) => (d.dow === 0 || d.dow === 6 ? .55 : 1) * (.5 + i / 30 * 1.6) * (.7 + rng() * .8));
      const tot = spread(total, w);
      const fw = tot.map((t, i) => t * (i > 14 ? 1 : .35) * (rng() < .35 ? 2.4 : .5)), f = new Array(30).fill(0);
      let left = failed; while (left > 0) { const cand = tot.map((t, i) => f[i] < t ? fw[i] : 0), sum = cand.reduce((x, y) => x + y, 0); let r = rng() * sum, k = 0; for (; k < 30; k++) { r -= cand[k]; if (r <= 0) break; } k = Math.min(k, 29); if (!cand[k]) k = cand.findIndex(x => x > 0); f[k]++; left--; fw[k] *= .6; }
      const exp = Math.min(Math.round(failed * .27), total - failed), sup = Math.round(total * .025), rest = total - failed - exp - sup, read = Math.round(rest * .37);
      return { total, failed, day, tot, f, status: [['Read', read, 'var(--ok)'], ['Delivered', rest - read, 'var(--info)'], ['Failed', failed, 'var(--bad)'], ['Expired', exp, 'var(--warn)'], ['Suppressed', sup, 'var(--ink-2)']] };
    })();
    const vmax = Math.max(4, Math.ceil(Math.max(...SL.tot) / 4) * 4);
    const volHtml = `<div class="yax" aria-hidden="true">${[0, 1, 2, 3, 4].map(i => `<span style="bottom:${i * 25}%">${vmax / 4 * i}</span>`).join('')}</div>
      <div class="plot">${[1, 2, 3, 4].map(i => `<i class="gl" style="bottom:${i * 25}%"></i>`).join('')}
      <div class="cols">${SL.day.map((d, i) => `<button type="button" class="dcol" data-tip="${d.lab}|Total ${SL.tot[i]}|Delivered ${SL.tot[i] - SL.f[i]}|Failed ${SL.f[i]}" aria-label="${d.lab}: ${SL.tot[i]} communications, ${SL.f[i]} failed"><span class="stack" data-bar data-axis="y" style="--d:${(0.3 + i * 0.025).toFixed(3)}s;height:${SL.tot[i] / vmax * 100}%"><span class="sd" style="flex:${SL.tot[i] - SL.f[i]}"></span><span class="sf" style="flex:${SL.f[i]}"></span></span></button>`).join('')}</div></div>
      <div class="xax" aria-hidden="true">${SL.day.map((d, i) => `<span>${(i % 4 === 0 && i < 27) || i === 29 ? d.lab : ''}</span>`).join('')}</div>`;
    const smax = Math.max(...SL.status.map(x => x[1]), 1);
    const statusHtml = SL.status.map(([n, v, col], i) => `<li class="sbar" tabindex="0" data-tip="${n}|${v} of ${SL.total} (${(v / SL.total * 100).toFixed(1)}%)" aria-label="${n}: ${v} of ${SL.total}"><span class="sn">${n}</span><span class="st"><i data-bar style="--d:${(0.4 + i * 0.1).toFixed(2)}s;width:${Math.max(v / smax * 100, v ? 2 : 0)}%;background:${col}"></i></span><b class="tabular">${v}</b></li>`).join('');
    const mixP = [.33, .23, .21, .14, .09], mixN = spread(SL.total, mixP), mixC = ['var(--a2)', 'var(--a3)', 'var(--a1)', 'var(--warn)', 'var(--ink-2)'];
    const CHS = ['SMS', 'WhatsApp', 'Email', 'Push', 'Popup'].map((name, i) => ({ name, n: mixN[i], col: mixC[i] }));
    let acc = 0;
    const arcs = CHS.map((c, i) => {
      const a0 = acc / SL.total * 2 * Math.PI - Math.PI / 2 + .035; acc += c.n; const a1 = acc / SL.total * 2 * Math.PI - Math.PI / 2 - .035, R = 44, big = a1 - a0 > Math.PI ? 1 : 0;
      return `<path class="seg" data-seg="${i}" tabindex="0" data-tip="${c.name}|${c.n} of ${SL.total} (${(c.n / SL.total * 100).toFixed(1)}%)" aria-label="${c.name}: ${c.n} of ${SL.total}" d="M${(60 + R * Math.cos(a0)).toFixed(2)} ${(60 + R * Math.sin(a0)).toFixed(2)}A${R} ${R} 0 ${big} 1 ${(60 + R * Math.cos(a1)).toFixed(2)} ${(60 + R * Math.sin(a1)).toFixed(2)}" stroke="${c.col}" data-draw data-delay="${300 + i * 160}"/>`;
    }).join('');

    root.innerHTML = `
    <section class="top-row">
      <article class="card who rise lift" style="--i:0">
        <span class="who-gear">${ctx.Gears.svg({ teeth: 14, m: 5, hole: .45, spokes: 5, dur: 60, size: 150 })}</span>
        <div class="who-head"><span class="avatar big-av" aria-hidden="true">${C.initials}</span>
          <div style="min-width:0"><h2>${C.name}</h2>
            <div class="chips"><span class="chip" data-tone="${C.kyc === 'Verified' ? 'ok' : 'warn'}"><i class="dot"></i>${C.kyc === 'Verified' ? 'KYC verified' : C.kyc}</span><span class="chip" data-tone="a2">${C.segment}</span><span class="chip">${C.cif}</span><span class="chip">${C.city}</span><span class="chip">${C.loans} loan account${C.loans > 1 ? 's' : ''}</span>${ILLU ? '<span class="chip" data-tone="info" title="Figures for this customer are generated for the prototype">Illustrative data</span>' : ''}</div></div></div>
        <div class="facts">
          <div class="fact"><span>Mobile</span><b class="tabular">${C.mobile || '+91 98•••• 4521'}</b></div>
          <div class="fact"><span>Email</span><b>${C.email || 'r••••••r@gmail.com'}</b></div>
          <div class="fact"><span>PAN</span><b>${C.pan || 'BQ•••••K'}</b></div>
          <div class="fact"><span>Customer since</span><b>${C.since || 'Mar 2019'}</b></div>
        </div>
        <div class="recent"><span class="ctile" aria-hidden="true">${I.WhatsApp}</span><div><small>Last reached</small><b>WhatsApp, read 21 Oct 2026, 06:42</b></div><span class="chip" style="margin-left:auto" data-tone="warn">${C.consent.filter(c=>c.opted).length} of ${C.consent.length} channels open</span></div>
      </article>
      <article class="card consent rise" style="--i:1">
        <h3>Channel consent</h3><p class="sub">Why a channel may not have been used</p>
        <div style="margin-top:8px">${consentRows}</div>
      </article>
    </section>

    ${K.failed ? `<section class="alert rise" style="--i:2" role="alert"><span class="tri">${I.tri}</span>
      <div class="tx"><b>${K.failed} communications failed across all ${K.totalLans} LANs</b><p>${ALERT}</p></div>
      <button class="btn" data-go-tl>View failures ${I.arr}</button></section>` : ''}

    <section class="kpis" aria-label="Key figures">
      <article class="kpi k-rate lift rise" style="--i:3">
        <span class="lab">Delivery rate</span>
        <div class="ring" id="ov-ring" role="img" aria-label="Delivery rate ${K.deliveryRate}%">
          <svg viewBox="0 0 120 120"><circle class="trk" cx="60" cy="60" r="52" pathLength="100"/><circle class="val" cx="60" cy="60" r="52" pathLength="100"/><circle class="tick" cx="60" cy="60" r="41" stroke-dasharray="1 5.4"/></svg>
          <div class="num"><span data-count="${K.deliveryRate}" data-decimals="1" data-suffix="%" data-dur="1600" data-delay="350">0%</span><small>of messages landed</small></div></div>
        <div class="note" style="justify-content:center"><span class="delta">${I.down} 1.4 pts</span><span>across all LANs</span></div>
      </article>
      <article class="kpi k-total lift rise" style="--i:4">
        <span class="lab">Total communications</span>
        <div class="odo" id="ov-odo" role="img" aria-label="${K.totalComms} communications">${odoDigits}</div>
        <span class="note">lifetime, all LANs</span>
        <svg class="spark" viewBox="0 0 100 40" aria-hidden="true"><path d="${spTot.d}" data-draw data-delay="500"/><circle cx="${spTot.last[0]}" cy="${spTot.last[1]}" r="3.2"/></svg>
      </article>
      <article class="kpi k-fail lift rise" style="--i:5">
        <span class="lab">Failed</span>
        <div class="big-num" data-count="${K.failed}" data-dur="1400" data-delay="500">0</div>
        <span class="note"><span class="delta">${I.up} 6 this month</span></span>
        <svg class="spark" viewBox="0 0 100 40" aria-hidden="true" style="bottom:46px;width:40%"><path d="${spFail.d}" data-draw data-delay="650"/><circle cx="${spFail.last[0]}" cy="${spFail.last[1]}" r="3.2"/></svg>
      </article>
      <article class="kpi k-lan lift rise" style="--i:6">
        <span class="lab">Active LANs</span>
        <div class="big-num"><span data-count="${K.activeLans}" data-delay="600">0</span> <span class="muted" style="font-size:24px">of ${K.totalLans}</span></div>
        <div class="pips" aria-hidden="true">${LOANS.map((l, i) => `<span class="pip${l.status === 'Closed' ? '' : ' on'}${l.status === 'Overdue' ? ' warn' : ''}" style="--p:${i}">${l.lan.split('-')[1]}</span>`).join('')}</div>
        <span class="note muted">${K.totalLans - K.activeLans} closed</span>
      </article>
      <article class="kpi k-lat lift rise" style="--i:7">
        <span class="lat-gears" aria-hidden="true">
          <span class="gear-wrap">${ctx.Gears.svg({ teeth: 12, m: 3, hole: .4, spokes: 4, dur: 16, size: 45 }).replace('<svg ', '<svg style="left:6px;top:6px;--dur:16s" ')}</span>
          ${ctx.Gears.svg({ teeth: 8, m: 3, hole: .35, dur: gm.dur2, reverse: true, phase: gm.phase2, size: 31 }).replace('<svg ', '<svg style="left:' + (28.5 + gm.dx - 15.5) + 'px;top:' + (28.5 + gm.dy - 15.5) + 'px" ')}
        </span>
        <span class="lab">Avg latency</span>
        <div class="big-num"><span data-count="${K.avgLatencySec}" data-delay="700">0</span>s</div>
        <div><div class="lat-track" aria-hidden="true"><i data-bar style="--d:.9s;width:${K.avgLatencySec / 60 * 100}%"></i></div><div class="lat-scale" aria-hidden="true"><span>0s</span><span>60s</span></div></div>
        <span class="note">trigger to delivery</span>
      </article>
    </section>

    <div class="sec-head rise" style="--i:8"><div><h2>Loan accounts</h2><p class="sub">Select a LAN to open its timeline</p></div></div>
    <section class="loans" style="${LOANS.length < 3 ? 'grid-template-columns:repeat(' + LOANS.length + ',minmax(0,1fr))' : ''}">${LOANS.map(loanCard).join('')}</section>

    <section class="charts" aria-label="Analysis charts">
      <article class="card rise ch-wide" style="--i:11">
        <div class="card-head"><div><h3>Daily communication volume</h3><p class="sub">Last 30 days across all LANs · failure spikes in red</p></div>
          <div class="lg" role="group" aria-label="Series"><button type="button" class="lgi" data-ser="d" aria-pressed="true"><i style="background:var(--a2)"></i>Delivered</button><button type="button" class="lgi" data-ser="f" aria-pressed="true"><i style="background:var(--bad)"></i>Failed</button></div></div>
        <div class="vol" data-vol>${volHtml}</div>
      </article>
      <article class="card rise" style="--i:12">
        <h3>Delivery status</h3><p class="sub">All channels, last 30 days</p>
        <ul class="sbars">${statusHtml}</ul>
      </article>
      <article class="card rise" style="--i:13">
        <h3>Channel mix</h3><p class="sub">Share of communications by channel</p>
        <div class="donut-row">
          <div class="donut" data-donut><svg viewBox="0 0 120 120" role="img" aria-label="Channel mix donut">${arcs}</svg><div class="dc"><b data-dc-n>${SL.total}</b><span data-dc-l>communications</span></div></div>
          <ul class="dlg">${CHS.map((c, i) => `<li><button type="button" class="dli" data-seg="${i}" aria-pressed="false"><i style="background:${c.col}"></i><span>${c.name}</span><b class="tabular">${c.n}</b><small>${(c.n / SL.total * 100).toFixed(0)}%</small></button></li>`).join('')}</ul>
        </div>
      </article>
    </section>

    <section class="low-row">
      <article class="card rise" style="--i:12">
        <h3>Delivered vs failed</h3><p class="sub">Bar length is volume per loan</p>
        <div class="sum"><b data-count="${K.totalComms - K.failed}" data-delay="800">0</b><span class="muted" style="font-weight:700">delivered</span><b style="color:var(--bad);font-size:26px" data-count="${K.failed}" data-delay="900">0</b><span class="muted" style="font-weight:700">failed</span></div>
        ${splitHtml}
        <div class="legend"><span><i style="background:var(--a2)"></i>Delivered</span><span><i style="background:var(--bad)"></i>Failed</span></div>
      </article>
      <article class="card rise" style="--i:13">
        <div class="card-head"><div><h3>Latest communications</h3><p class="sub">Across all ${K.totalLans} LANs, newest first</p></div><button class="chip-link" data-go-tl>Open full timeline</button></div>
        <ul class="lat-list">${latestHtml}</ul>
      </article>
    </section>`;

    const onClick = e => {
      const t = e.target.closest('[data-tl],[data-go-tl]'); if (!t) return;
      if (t.dataset.tl && CU) { const l = LOANS.find(x => x.lan === t.dataset.tl); if (l) ctx.selection = { customer: CU, lan: l }; }
      ctx.go('timeline');
    };
    root.addEventListener('click', onClick);
    const tip = document.createElement('div'); tip.className = 'ov-tip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true; document.body.appendChild(tip);
    const showTip = e => { const el = e.target.closest && e.target.closest('[data-tip]'); if (!el) return; const [h, ...r] = el.dataset.tip.split('|'); tip.innerHTML = '<b>' + h + '</b>' + r.map(x => '<span>' + x + '</span>').join(''); tip.hidden = false; const b = el.getBoundingClientRect(), t = tip.getBoundingClientRect(); tip.style.left = Math.max(8, Math.min(innerWidth - t.width - 8, b.left + b.width / 2 - t.width / 2)) + 'px'; tip.style.top = Math.max(8, b.top - t.height - 10) + 'px'; };
    const hideTip = () => { tip.hidden = true; };
    root.addEventListener('mouseover', showTip); root.addEventListener('focusin', showTip); root.addEventListener('mouseout', hideTip); root.addEventListener('focusout', hideTip);
    const vol = root.querySelector('[data-vol]'), donut = root.querySelector('[data-donut]');
    let segSel = -1;
    const setSeg = i => {
      segSel = i === segSel ? -1 : i; const box = donut.closest('.donut-row');
      box.classList.toggle('has-sel', segSel >= 0);
      box.querySelectorAll('[data-seg]').forEach(el => { const on = +el.dataset.seg === segSel; el.classList.toggle('sel', on); if (el.matches('button')) el.setAttribute('aria-pressed', String(on)); });
      donut.querySelector('[data-dc-n]').textContent = segSel >= 0 ? CHS[segSel].n : SL.total;
      donut.querySelector('[data-dc-l]').textContent = segSel >= 0 ? CHS[segSel].name + ' · ' + (CHS[segSel].n / SL.total * 100).toFixed(0) + '%' : 'communications';
    };
    const onChart = e => {
      const sg = e.target.closest('[data-seg]'); if (sg) { setSeg(+sg.dataset.seg); return; }
      const sr = e.target.closest('[data-ser]'); if (sr) { const on = sr.getAttribute('aria-pressed') !== 'true'; sr.setAttribute('aria-pressed', String(on)); vol.classList.toggle('hide-' + sr.dataset.ser, !on); }
    };
    const onKey = e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('path[data-seg]')) { e.preventDefault(); setSeg(+e.target.dataset.seg); } };
    root.addEventListener('click', onChart); root.addEventListener('keydown', onKey);

    const ring = root.querySelector('#ov-ring'), odo = root.querySelector('#ov-odo');
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => { ring.classList.add('go'); odo.classList.add('go'); }));
    return () => { cancelAnimationFrame(raf); root.removeEventListener('click', onClick); root.removeEventListener('click', onChart); root.removeEventListener('keydown', onKey); root.removeEventListener('mouseover', showTip); root.removeEventListener('focusin', showTip); root.removeEventListener('mouseout', hideTip); root.removeEventListener('focusout', hideTip); tip.remove(); };
  }
};
