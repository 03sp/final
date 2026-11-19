/* Customer search: the screen between sign-in and the overview. Also owns the customer dataset and the LAN picker (ctx.openLanPicker).
   INVENTED DATA: customers 7-10 (Arjun Mehta, Gurpreet Singh Gill, Kavita Joshi, Imran Qureshi), all full mobile/email/comm-ID values used only for matching,
   every LAN for customers 2-4 and 6-10, disbursement dates for Rajesh's three LANs, EMI for his closed Two-Wheeler LAN is shown as a dash.
   Real from the original: customers 1-6 headline facts (CIF, masked mobile, city, KYC, LAN count, worst DPD, segment/since) and Sandeep's two LANs. */
(function () {
  const L = (lan, type, disbursed, dpd, outstanding, emi, comms, last, failed, closed) => ({
    lan, type, disbursed, status: closed ? 'Closed' : dpd ? 'Overdue' : 'Active', dpdLabel: dpd ? dpd + ' DPD' : 'Current',
    outstanding, emi, comms, last, failed, rate: +((comms - failed) / comms * 100).toFixed(1)
  });
  // Rajesh's LANs are the shared DATA.loans; add the fields the picker needs
  const extra = { 'LAN-HL-2019-004417': ['14 Mar 2019', 38420], 'LAN-PL-2024-118203': ['09 Jan 2024', 9860], 'LAN-TW-2022-071954': ['22 Jun 2022', null] };
  DATA.loans.forEach(l => { const e = extra[l.lan]; if (e && !l.disbursed) { l.disbursed = e[0]; l.emi = e[1]; } });

  const consentFor = (push, wa = true) => [{ ch: 'SMS', opted: true }, { ch: 'WhatsApp', opted: wa }, { ch: 'Email', opted: true }, { ch: 'Push', opted: push }];
  const C = (o) => Object.assign({ kyc: 'Verified', dnd: 'Not registered', consent: consentFor(true), illustrative: true }, o);

  DATA.customers = [
    Object.assign({}, DATA.customer, { mobile: '+91 98•••• 4521', mobileFull: '+91 98123 44521', email: 'r••••••r@gmail.com', emailFull: 'rajesh.iyer@gmail.com', pan: 'BQ•••••K', since: 'Mar 2019', lans: DATA.loans, illustrative: false }),
    C({ name: 'Priya Nair', initials: 'PN', cif: 'CIF-8815632', mobile: '+91 99•••• 8830', mobileFull: '+91 99471 08830', email: 'p••••••r@outlook.com', emailFull: 'priya.nair@outlook.com', pan: 'CK•••••M', city: 'Kochi', segment: 'Prime', since: 'Aug 2023', consent: consentFor(true),
      lans: [L('LAN-PL-2023-091376', 'Personal Loan', '12 Aug 2023', 0, 148200, 7450, 38, '16 Oct 2026, 10:05', 1)] }),
    C({ name: 'Mohammed Faisal Shaikh', initials: 'MS', cif: 'CIF-6630481', kyc: 'Re-KYC due', mobile: '+91 98•••• 1176', mobileFull: '+91 98221 51176', email: 'm••••••h@gmail.com', emailFull: 'faisal.shaikh@gmail.com', pan: 'DL•••••F', city: 'Pune', segment: 'Near-prime', since: 'Jan 2020', consent: consentFor(false),
      lans: [L('LAN-BL-2020-015582', 'Business Loan', '14 Jan 2020', 92, 1862400, 51200, 204, '21 Oct 2026, 07:10', 17), L('LAN-TW-2021-063340', 'Two-Wheeler Loan', '03 Mar 2021', 0, 41800, 3250, 76, '12 Oct 2026, 09:30', 3)] }),
    C({ name: 'Ananya Deshmukh', initials: 'AD', cif: 'CIF-9021377', mobile: '+91 97•••• 5509', mobileFull: '+91 97650 25509', email: 'a••••••e@gmail.com', emailFull: 'ananya.deshmukh@gmail.com', pan: 'EG•••••R', city: 'Nagpur', segment: 'Prime', since: 'Nov 2024', consent: consentFor(true),
      lans: [L('LAN-CD-2024-130877', 'Consumer Durable Loan', '18 Nov 2024', 0, 32500, 3100, 22, '15 Oct 2026, 09:00', 0)] }),
    C({ name: 'Sandeep Singh Rathore', initials: 'SR', cif: 'CIF-5509824', mobile: '+91 98•••• 7743', mobileFull: '+91 98290 17743', email: 's••••••e@yahoo.com', emailFull: 'sandeep.rathore@yahoo.com', pan: 'FH•••••P', city: 'Jaipur', segment: 'Prime', since: 'Jul 2018', consent: consentFor(false),
      lans: [L('LAN-LAP-2018-002907', 'Loan Against Property', '20 Jul 2018', 0, 5120300, 62400, 167, '18 Oct 2026, 16:20', 6), L('LAN-HL-2021-052214', 'Home Loan', '11 Sep 2021', 0, 2874100, 29300, 119, '18 Oct 2026, 16:20', 4)] }),
    C({ name: 'Lakshmi Venkataraman', initials: 'LV', cif: 'CIF-7103358', mobile: '+91 94•••• 2208', mobileFull: '+91 94430 52208', email: 'l••••••n@gmail.com', emailFull: 'lakshmi.venkat@gmail.com', pan: 'GJ•••••V', city: 'Bengaluru', segment: 'Prime', since: 'Feb 2021', consent: consentFor(true),
      lans: [L('LAN-HL-2021-038745', 'Home Loan', '08 Feb 2021', 7, 3156800, 33100, 96, '21 Oct 2026, 06:50', 5)] }),
    C({ name: 'Arjun Mehta', initials: 'AM', cif: 'CIF-6847205', mobile: '+91 99•••• 3314', mobileFull: '+91 99202 63314', email: 'a••••••a@gmail.com', emailFull: 'arjun.mehta@gmail.com', pan: 'HK•••••A', city: 'Mumbai', segment: 'Prime', since: 'May 2022', consent: consentFor(true),
      lans: [L('LAN-PL-2022-082219', 'Personal Loan', '19 May 2022', 18, 212600, 11800, 58, '21 Oct 2026, 07:05', 4), L('LAN-CD-2023-104412', 'Consumer Durable Loan', '02 Sep 2023', 0, 18900, 2400, 24, '14 Oct 2026, 09:00', 1)] }),
    C({ name: 'Gurpreet Singh Gill', initials: 'GG', cif: 'CIF-7390146', mobile: '+91 98•••• 6092', mobileFull: '+91 98728 36092', email: 'g••••••l@gmail.com', emailFull: 'gurpreet.gill@gmail.com', pan: 'JM•••••G', city: 'Ludhiana', segment: 'Near-prime', since: 'Sep 2021', consent: consentFor(true, false),
      lans: [L('LAN-TW-2021-066118', 'Two-Wheeler Loan', '21 Sep 2021', 47, 58300, 4600, 113, '21 Oct 2026, 06:35', 8)] }),
    C({ name: 'Kavita Joshi', initials: 'KJ', cif: 'CIF-8264913', mobile: '+91 96•••• 1847', mobileFull: '+91 96011 41847', email: 'k••••••i@outlook.com', emailFull: 'kavita.joshi@outlook.com', pan: 'KN•••••J', city: 'Ahmedabad', segment: 'Prime', since: 'Oct 2022', consent: consentFor(true),
      lans: [L('LAN-HL-2022-071530', 'Home Loan', '06 Oct 2022', 0, 4218000, 38900, 41, '18 Oct 2026, 09:00', 1)] }),
    C({ name: 'Imran Qureshi', initials: 'IQ', cif: 'CIF-5918472', kyc: 'Re-KYC due', mobile: '+91 93•••• 5026', mobileFull: '+91 93980 75026', email: 'i••••••i@gmail.com', emailFull: 'imran.qureshi@gmail.com', pan: 'LP•••••Q', city: 'Hyderabad', segment: 'Near-prime', since: 'Jun 2020', consent: consentFor(false),
      lans: [L('LAN-BL-2020-021904', 'Business Loan', '11 Jun 2020', 12, 904700, 28800, 131, '21 Oct 2026, 06:58', 9), L('LAN-PL-2022-087761', 'Personal Loan', '27 Apr 2022', 0, 0, null, 64, '09 Mar 2026, 11:00', 3, true), L('LAN-TW-2023-109255', 'Two-Wheeler Loan', '15 Jul 2023', 0, 66200, 3700, 47, '10 Oct 2026, 09:30', 2)] })
  ];
  const CUST = DATA.customers;
  const dpdOf = l => parseInt(l.dpdLabel, 10) || 0;
  const worstDpd = c => Math.max(0, ...c.lans.map(dpdOf));

  /* ---------- selection (persists for the session) ---------- */
  const ctx0 = Shell.ctx;
  let sel = null;
  try {
    const s = JSON.parse(sessionStorage.getItem('dms-sel') || 'null');
    const c = s && CUST.find(x => x.cif === s.cif);
    if (c) sel = { customer: c, lan: c.lans.find(l => l.lan === s.lan) || c.lans[0] };
  } catch (e) {}
  if (!sel) sel = { customer: CUST[0], lan: CUST[0].lans.find(l => l.lan.includes('-HL-')) };
  Object.defineProperty(ctx0, 'selection', { get: () => sel, set: v => { sel = v; try { sessionStorage.setItem('dms-sel', JSON.stringify({ cif: v.customer.cif, lan: v.lan.lan })); } catch (e) {} } });

  const sv = (p, x) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (x || '') + '>' + p + '</svg>';
  const ICO = {
    layers: sv('<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.500l9 5 9-5M3 16.500l9 5 9-5" opacity=".7"/>'),
    chev: sv('<path d="M9 5l7 7-7 7"/>'),
    bank: sv('<path d="M3 9.500L12 4l9 5.500M5 10v8M9.500 10v8M14.500 10v8M19 10v8M3 20.500h18"/>'),
    lock: sv('<rect x="5" y="10.500" width="14" height="10" rx="2.500"/><path d="M8 10.500V8a4 4 0 0 1 8 0v2.500"/>'),
    x: sv('<path d="M6 6l12 12M18 6L6 18"/>'),
    search: sv('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
    mask: sv('<path d="M2.500 12S6 5.500 12 5.500 21.500 12 21.500 12 18 18.500 12 18.500 2.500 12 2.500 12z"/><path d="M4 20L20 4"/>'),
    clock: sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.200 2"/>'),
    list: sv('<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" stroke-width="2.600"/>')
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- search ---------- */
  const FIELDS = [['all', 'All fields'], ['name', 'Customer name'], ['lan', 'LAN'], ['mobile', 'Mobile'], ['email', 'Email'], ['comm', 'Communication ID'], ['campaign', 'Campaign'], ['channel', 'Channel'], ['date', 'Date'], ['status', 'Status'], ['template', 'Template'], ['message', 'Message'], ['cif', 'CIF']];
  const MON = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
  const facets = c => {
    const w = worstDpd(c), anyFail = c.lans.some(l => l.failed > 0);
    const f = {
      name: [c.name], cif: [c.cif], email: [c.emailFull], lan: c.lans.map(l => l.lan),
      comm: c.lans.flatMap(l => [0, 1, 2].map(n => 'COM-' + l.lan.slice(-4) + '-' + String(Math.max(1, l.comms - n)).padStart(4, '0'))),
      channel: ['SMS', 'WhatsApp', 'Email'].concat(w > 0 ? ['Push', 'In-app pop-up'] : [], w > 30 ? ['Voice', 'IVR'] : []),
      status: ['Delivered', 'Read'].concat(anyFail ? ['Failed'] : [], w > 30 ? ['Expired', 'Suppressed'] : []),
      campaign: ['Pre-due Reminders', 'Monthly Statements'].concat(w > 0 ? ['Collections — Early Bucket 1–30'] : [], w > 30 ? ['Collections — Soft Bucket 31–60'] : [], w > 60 ? ['Collections — Hard Bucket 61–90'] : []),
      template: ['EMI Due Reminder — T-3', 'Account Statement — Monthly'].concat(w > 0 ? ['EMI Overdue Reminder'] : [], w > 30 ? ['Late Payment Charges Notice'] : []),
      message: ['Your EMI is due on', 'Your monthly account statement is ready'].concat(w > 0 ? ['Your EMI is overdue. Please pay today'] : [], w > 30 ? ['Late payment charges have been applied'] : []),
      date: c.lans.flatMap(l => { const m = /^(\d\d) (\w{3}) (\d{4})/.exec(l.last); return m ? [m[1] + ' ' + m[2] + ' ' + m[3], m[3] + '-' + MON[m[2]] + '-' + m[1], m[2] + ' ' + m[3]] : []; })
    };
    return f;
  };
  const mobileMatch = (c, q) => {
    const re = q.replace(/[\s+-]/g, '').replace(/[•*xX]+/g, '.*');
    if (!/^[\d.*]+$/.test(re) || !/\d/.test(re)) return false;
    try { return new RegExp(re).test(c.mobileFull.replace(/\D/g, '')); } catch (e) { return false; }
  };
  const hay = (c, keys) => { const f = facets(c); return keys.flatMap(k => f[k] || []).join(' | ').toLowerCase(); };
  const ALLKEYS = ['name', 'lan', 'email', 'comm', 'campaign', 'channel', 'date', 'status', 'template', 'message', 'cif'];
  const matches = (c, q, scope) => {
    q = q.trim().toLowerCase(); if (!q) return true;
    const mobileLike = /^[+\d\s•*x-]+$/i.test(q) && /\d/.test(q);
    if ((scope === 'all' || scope === 'mobile') && mobileLike && mobileMatch(c, q)) return true;
    if (scope === 'mobile') return false;
    const h = hay(c, scope === 'all' ? ALLKEYS : [scope]);
    return q.split(/\s+/).every(t => h.includes(t));
  };

  /* ---------- LAN picker (modal) ---------- */
  const lpCss = `
.lp{border:var(--bw) solid var(--line);border-radius:var(--r);background:var(--surface);color:var(--ink);box-shadow:var(--shadow-lg);padding:0;width:min(720px,calc(100vw - 24px));max-height:calc(100vh - 24px);overflow:hidden;font-family:var(--font-body)}
.lp[open]{display:block}
.lp::backdrop{background:rgba(10,8,24,.6);backdrop-filter:blur(3px);animation:lp-fade .25s var(--ease) both}
[data-skin=pop] .lp::backdrop{background:rgba(21,18,27,.55)}
@keyframes lp-fade{from{opacity:0}}
.lp-box{display:flex;flex-direction:column;max-height:calc(100vh - 24px)}
.lp-head{display:flex;gap:16px;align-items:flex-start;justify-content:space-between;padding:22px 24px 14px}
.lp-head h2{font-size:24px}
.lp-head p{margin:6px 0 0;color:var(--ink-2);font-weight:600;font-size:14.5px}
.lp-x{flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:var(--surface-2);border:calc(var(--bw)*.6) solid var(--line);cursor:pointer;transition:transform .2s var(--ease)}
.lp-x:hover{transform:rotate(90deg)}.lp-x:active{transform:scale(.92)}
.lp-x svg{width:18px;height:18px}
.lp-list{display:flex;flex-direction:column;gap:12px;padding:6px 24px 18px;overflow:auto}
.lp-card{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:6px 16px;align-items:center;text-align:left;width:100%;padding:16px;border-radius:var(--r-sm);background:var(--surface);color:var(--ink);border:var(--bw) solid var(--line);cursor:pointer;animation:lp-in .5s var(--ease) both;animation-delay:calc(var(--i)*70ms + 120ms);transition:transform .18s var(--ease),box-shadow .18s var(--ease),background .18s}
[data-skin=night] .lp-card,[data-skin=neon] .lp-card{background:var(--surface-2)}
[data-skin=soda] .lp-card{background:var(--surface-2)}
@keyframes lp-in{from{opacity:0;transform:translateY(14px)}}
.lp-card:hover{transform:translateY(-2px);box-shadow:var(--shadow)}
.lp-card:active{transform:translateY(1px) scale(.992);box-shadow:none}
.lp-card .ic{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:var(--a2);color:var(--a2-ink);grid-row:span 2}
.lp-card .ic svg{width:24px;height:24px}
.lp-card .id{font:800 15px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0;overflow-wrap:anywhere}
.lp-card .ty{font-size:13px;color:var(--ink-2);font-weight:600;margin-top:2px;display:block}
.lp-card .go{grid-row:span 2;grid-column:3;grid-row:1/3;transition:transform .2s var(--ease)}
.lp-card:hover .go{transform:translateX(4px)}
.lp-card .go svg{width:22px;height:22px;display:block}
.lp-card .chips{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-start;grid-column:2}
.lp-card .st{grid-column:1/-1;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:6px}
.lp-card .st span{display:block;background:var(--surface-2);border-radius:var(--r-sm);padding:8px 10px;min-width:0}
[data-skin=night] .lp-card .st span,[data-skin=neon] .lp-card .st span,[data-skin=soda] .lp-card .st span{background:var(--surface)}
.lp-card .st small{display:block;font-size:11.5px;color:var(--ink-2);font-weight:700}
.lp-card .st b{font:800 14px var(--font-display);display:block;overflow-wrap:anywhere;font-variant-numeric:tabular-nums}
.lp-foot{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;justify-content:space-between;padding:14px 24px 18px;border-top:var(--bw) solid var(--line)}
.lp-ro{display:flex;align-items:center;gap:8px;color:var(--ink-2);font-size:13.5px;font-weight:600}
.lp-ro svg{width:16px;height:16px;flex:none}
.lp-sum{font:800 14px var(--font-body);background:none;border:0;padding:6px 2px;cursor:pointer;color:var(--a2);text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px}
[data-skin=soda] .lp-sum{color:var(--a1)}
[data-skin=pop] .lp-sum{color:var(--a2)}
@media (max-width:560px){.lp-card .st{grid-template-columns:repeat(2,minmax(0,1fr))}.lp-head{padding:18px 16px 10px}.lp-list{padding:6px 16px 16px}.lp-foot{padding:12px 16px 16px}.lp-head h2{font-size:20px}}
`;
  let activeDlg = null;
  function openLanPicker(customer, opener, opts) {
    opts = opts || {};
    if (activeDlg) return;
    if (!document.querySelector('style[data-screen="lanpicker"]')) { const s = document.createElement('style'); s.dataset.screen = 'lanpicker'; s.textContent = lpCss; document.head.appendChild(s); }
    const dlg = document.createElement('dialog'); dlg.className = 'lp'; dlg.setAttribute('aria-labelledby', 'lp-t');
    const n = customer.lans.length;
    dlg.innerHTML = `<div class="lp-box">
      <div class="lp-head"><div><h2 id="lp-t">Select a Loan Account (LAN)</h2><p>${esc(customer.name)} • ${customer.cif} has ${n} loan accounts</p></div><button class="lp-x" type="button" aria-label="Close" data-close>${ICO.x}</button></div>
      <div class="lp-list">${customer.lans.map((l, i) => `<button type="button" class="lp-card" style="--i:${i}" data-lan="${i}"${i === 0 ? ' autofocus' : ''}>
        <span class="ic">${ICO.bank}</span>
        <span><span class="id">${l.lan}</span><span class="ty">${l.type} • Disbursed ${l.disbursed || '—'}</span></span>
        <span class="go">${ICO.chev}</span>
        <span class="chips"><span class="chip" data-tone="${l.status === 'Overdue' ? 'warn' : l.status === 'Closed' ? '' : 'ok'}"><i class="dot"></i>${l.status}</span><span class="chip" data-tone="${dpdOf(l) ? (dpdOf(l) > 30 ? 'bad' : 'warn') : 'ok'}">${l.dpdLabel}</span></span>
        <span class="st"><span><small>Outstanding</small><b>${Fmt.inr(l.outstanding)}</b></span><span><small>EMI</small><b>${l.emi ? Fmt.inr(l.emi) : '—'}</b></span><span><small>Communications</small><b>${l.comms}</b></span><span><small>Last sent</small><b>${l.last}</b></span></span>
      </button>`).join('')}</div>
      <div class="lp-foot"><span class="lp-ro">${ICO.lock}Read-only view. Communications cannot be re-triggered.</span><button class="lp-sum" type="button" data-summary>View customer-level overview</button></div></div>`;
    document.body.appendChild(dlg);
    activeDlg = dlg;
    let done = false, closing = false;
    const rect = () => opener && opener.isConnected ? opener.getBoundingClientRect() : null;
    const finish = () => { if (done) return; done = true; activeDlg = null; dlg.remove(); if (!navigated && opener && opener.isConnected) opener.focus({ preventScroll: true }); };
    let navigated = false;
    const close = animate => {
      if (closing) return; closing = true;
      const r = rect();
      if (animate && r && !ctx0.reduced && dlg.animate) {
        const b = dlg.getBoundingClientRect();
        const a = dlg.animate([{ transform: 'none', opacity: 1 }, { transform: `translate(${r.left + r.width / 2 - b.left - b.width / 2}px,${r.top + r.height / 2 - b.top - b.height / 2}px) scale(.4)`, opacity: 0 }], { duration: 200, easing: 'cubic-bezier(.4,0,.8,.4)', fill: 'forwards' });
        a.onfinish = () => dlg.close();
      } else dlg.close();
    };
    dlg.addEventListener('close', finish);
    dlg.addEventListener('cancel', e => { e.preventDefault(); close(true); });
    dlg.addEventListener('click', e => {
      if (e.target === dlg) { close(true); return; }
      if (e.target.closest('[data-close]')) { close(true); return; }
      const card = e.target.closest('[data-lan]');
      if (card) { navigated = true; const lan = customer.lans[+card.dataset.lan]; dlg.close(); (opts.onPick || defaultPick)(customer, lan); return; }
      if (e.target.closest('[data-summary]')) { navigated = true; dlg.close(); (opts.onSummary || defaultSummary)(customer); }
    });
    dlg.showModal();
    const r = rect();
    if (r && !ctx0.reduced && dlg.animate) {
      const b = dlg.getBoundingClientRect();
      dlg.animate([{ transform: `translate(${r.left + r.width / 2 - b.left - b.width / 2}px,${r.top + r.height / 2 - b.top - b.height / 2}px) scale(.35)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.2,.9,.25,1)' });
    }
  }
  const defaultPick = (customer, lan) => { ctx0.selection = { customer, lan }; ctx0.go('timeline'); };
  const defaultSummary = customer => { ctx0.selection = { customer, lan: sel.customer === customer ? sel.lan : customer.lans[0] }; ctx0.go('overview'); };
  ctx0.openLanPicker = openLanPicker;
  ctx0.customers = CUST;

  /* ---------- screen ---------- */
  Screens.search = {
    title: 'Customer search',
    css: `
.s-search{width:100%;max-width:1240px;margin:0 auto;display:flex;flex-direction:column;gap:20px;container-type:inline-size}
.s-search .rise{animation:sr-rise .6s var(--ease) both;animation-delay:calc(var(--i,0)*80ms + 40ms)}
@keyframes sr-rise{from{opacity:0;transform:translateY(16px)}}
.s-search .hero h2{font-size:clamp(30px,4.4vw,46px)}
.s-search .hero p{margin:10px 0 0;max-width:62ch;color:var(--ink-2);font-size:16px;font-weight:600}
.s-search .finder{display:flex;flex-direction:column;gap:18px}
.s-search .by{display:flex;flex-direction:column;gap:10px}
.s-search .lbl{font:700 13px var(--font-body);color:var(--ink-2)}
.s-search .opts{display:flex;flex-wrap:wrap;gap:8px}
.s-search .opt{font:700 13.5px var(--font-body);padding:8px 14px;border-radius:999px;background:var(--surface-2);color:var(--ink);border:calc(var(--bw)*.6) solid var(--line);cursor:pointer;transition:transform .15s var(--ease),background .15s,color .15s}
.s-search .opt:hover{transform:translateY(-2px)}
.s-search .opt:active{transform:scale(.95)}
.s-search .opt[aria-checked=true]{background:var(--a1);color:var(--a1-ink);border-color:var(--line)}
.s-search .sbar{display:flex;gap:10px;align-items:stretch;flex-wrap:wrap}
.s-search .sfield{flex:1 1 200px;min-width:0;display:flex;align-items:center;gap:12px;padding:0 16px;border-radius:999px;background:var(--surface);border:var(--bw) solid var(--line);transition:box-shadow .18s var(--ease),transform .18s var(--ease)}
[data-skin=soda] .sfield,[data-skin=night] .sfield,[data-skin=neon] .sfield{background:var(--surface-2)}
[data-skin=soda] .sfield{border:2px solid transparent}
.s-search .sfield:focus-within{box-shadow:var(--shadow-press);transform:translateY(-1px);border-color:var(--a2)}
[data-skin=soda] .sfield:focus-within{border-color:var(--a1)}
.s-search .sfield svg{width:22px;height:22px;flex:none;color:var(--ink-2)}
.s-search .sfield input{flex:1;min-width:0;border:0;background:transparent;color:var(--ink);font:600 17px var(--font-body);padding:18px 0;outline:0}
.s-search .sfield input::placeholder{color:var(--ink-2);opacity:.8;font-size:15px}
.s-search .sfield .clr{border:0;background:var(--surface-2);color:var(--ink);width:28px;height:28px;border-radius:50%;display:grid;place-items:center;cursor:pointer;padding:0}
.s-search .sfield .clr[hidden]{display:none}
.s-search .sfield .clr svg{width:14px;height:14px;color:inherit}
.s-search .sbar .btn{padding:0 28px;font-size:16px}
.s-search .recent{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.s-search .recent .lbl{display:flex;align-items:center;gap:6px;margin-right:4px}
.s-search .recent .lbl svg{width:15px;height:15px}
.s-search .rc{font:700 13px var(--font-body);padding:6px 12px;border-radius:999px;background:var(--surface);border:calc(var(--bw)*.6) dashed var(--line);cursor:pointer;transition:transform .15s var(--ease),background .15s}
.s-search .rc:hover{background:var(--surface-2);transform:translateY(-2px)}
.s-search .rc:active{transform:scale(.95)}
.s-search .grid{display:grid;grid-template-columns:minmax(0,1fr);gap:20px;align-items:start}
.s-search .res{padding:0;overflow:hidden}
.s-search .res-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:18px 22px 12px}
.s-search .res-head h3{font-size:20px}
.s-search .res-head span{color:var(--ink-2);font-weight:700;font-size:13.5px}
.s-search .thead,.s-search .rw{display:grid;grid-template-columns:minmax(200px,2.3fr) 1.05fr 1.25fr .9fr 1fr 1.5fr .9fr 20px;gap:12px;align-items:center;padding:0 22px}
.s-search .thead{font:700 12.5px var(--font-body);color:var(--ink-2);padding-top:10px;padding-bottom:10px;border-top:var(--bw) solid var(--line);border-bottom:var(--bw) solid var(--line)}
.s-search ul.rows{list-style:none;margin:0;padding:0}
.s-search .rows li{border-bottom:1px solid var(--line)}
[data-skin=pop] .s-search .rows li{border-bottom-width:1.5px}
.s-search .rows li:last-child{border-bottom:0}
.s-search .rw{width:100%;text-align:left;background:transparent;border:0;color:var(--ink);padding-top:13px;padding-bottom:13px;cursor:pointer;font:600 14px var(--font-body);transition:background .16s,transform .16s var(--ease)}
.s-search .rw:hover{background:var(--surface-2)}
.s-search .rw:active{transform:scale(.992);background:var(--surface-2)}
.s-search .rw:focus-visible{outline-offset:-3px}
.s-search .rows.enter li{animation:sr-row .5s var(--ease) both;animation-delay:calc(var(--i)*55ms + 200ms)}
@keyframes sr-row{from{opacity:0;transform:translateX(-14px)}}
.s-search .c-cust{display:flex;align-items:center;gap:12px;min-width:0}
.s-search .c-cust .avatar{flex:none;width:40px;height:40px;transition:transform .25s var(--ease)}
.s-search .rw:hover .avatar{transform:rotate(-8deg) scale(1.08)}
.s-search .c-cust b{display:block;font:700 14.5px var(--font-body)}
.s-search .c-cust small{display:block;color:var(--ink-2);font-weight:600;font-size:12.5px}
.s-search .c-cif,.s-search .c-mob{font-variant-numeric:tabular-nums;white-space:nowrap}
.s-search .c-cif{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px}
.s-search .c-lan{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.s-search .c-lan .n{display:inline-flex;align-items:center;gap:6px;font-weight:800}
.s-search .c-lan svg{width:18px;height:18px;color:var(--ink-2)}
.s-search .c-lan em{font-style:normal;font-size:12px;color:var(--ink-2);font-weight:600}
.s-search .go{color:var(--ink-2);transition:transform .2s var(--ease),color .2s}
.s-search .go svg{width:18px;height:18px;display:block}
.s-search .rw:hover .go{transform:translateX(4px);color:var(--ink)}
.s-search .empty{padding:44px 22px 52px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;animation:sr-rise .4s var(--ease) both}
.s-search .empty svg{width:42px;height:42px;color:var(--ink-2)}
.s-search .empty h4{font-size:19px;overflow-wrap:anywhere}
.s-search .empty p{margin:0;color:var(--ink-2);font-weight:600}
.s-search .how{display:grid;gap:16px}
.s-search .how h3{font-size:19px}
.s-search .hw{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.s-search .hw div{display:flex;flex-direction:column;gap:4px}
.s-search .hw b{display:flex;align-items:center;gap:8px;font:700 14.5px var(--font-body)}
.s-search .hw b svg{width:18px;height:18px;color:var(--a2);flex:none}
[data-skin=soda] .s-search .hw b svg{color:var(--a1)}
.s-search .hw p{margin:0;font-size:13.5px;color:var(--ink-2);font-weight:500}
.s-search .audit{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:var(--r-sm);background:var(--info-bg);color:var(--info);font-size:13.5px;font-weight:700}
.s-search .audit svg{width:18px;height:18px;flex:none;margin-top:1px}
@container (min-width:1300px){.s-search .grid{grid-template-columns:minmax(0,1fr) 300px}.s-search .hw{grid-template-columns:1fr}}
@container (max-width:900px){
 .s-search .thead{display:none}
 .s-search .rw{display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;padding-top:14px;padding-bottom:14px}
 .s-search .c-cust{order:0;flex:1 1 55%}.s-search .c-dpd{order:1}.s-search .go{order:2}
 .s-search .c-cif,.s-search .c-mob,.s-search .c-city,.s-search .c-kyc,.s-search .c-lan{order:3}
 .s-search .c-cif{margin-left:52px}
}
`,
    render(root, ctx) {
      let scope = 'all', q = '', firstPaint = true;
      root.innerHTML = `
<header class="hero rise"><h2>Find a customer</h2><p>Search to review every communication triggered to a customer across SMS, WhatsApp, Email, Push and in-app pop-ups.</p></header>
<section class="card finder rise" style="--i:1" aria-label="Customer search">
  <div class="by"><span class="lbl" id="sr-by">Search by</span><div class="opts" role="radiogroup" aria-labelledby="sr-by">${FIELDS.map(([k, l]) => `<button type="button" class="opt" role="radio" aria-checked="${k === 'all'}" data-scope="${k}">${l}</button>`).join('')}</div></div>
  <form class="sbar" role="search" data-form>
    <label class="sfield">${ICO.search}<span class="sr-only">Search</span><input type="search" data-q autocomplete="off" spellcheck="false" placeholder="Search by name, LAN, mobile, email, communication ID, campaign, channel, date, status, template or message"><button type="button" class="clr" data-clear hidden aria-label="Clear search">${ICO.x}</button></label>
    <button class="btn btn-primary" type="submit">Search</button>
  </form>
  <div class="recent"><span class="lbl">${ICO.clock}Recent</span>${['Rajesh Kumar Iyer', 'LAN-BL-2020-015582', 'CIF-8815632', 'Arjun Mehta', '+91 98•••• 7743', 'Gurpreet Singh Gill'].map(r => `<button type="button" class="rc" data-recent="${esc(r)}">${esc(r)}</button>`).join('')}</div>
</section>
<div class="grid">
  <section class="card res rise" style="--i:2" aria-label="Customers">
    <div class="res-head"><h3>Customers</h3><span data-shown aria-live="polite"></span></div>
    <div class="thead" aria-hidden="true"><span>Customer</span><span>CIF</span><span>Mobile</span><span>City</span><span>KYC</span><span>LANs</span><span>Worst DPD</span><span></span></div>
    <div data-list></div>
  </section>
  <aside class="card how rise" style="--i:3" aria-label="How lookup works">
    <h3>How lookup works</h3>
    <div class="hw">
      <div><b>${ICO.layers}Multiple LANs</b><p>If a customer holds more than one loan, you pick the LAN first. Single-LAN customers go straight to the timeline.</p></div>
      <div><b>${ICO.mask}Masked identifiers</b><p>Mobile, email and PAN are masked. Search with the full value; results never reveal it.</p></div>
      <div><b>${ICO.clock}Data freshness</b><p>Delivery statuses refresh within 2 minutes of the provider callback.</p></div>
    </div>
    <p class="audit">${ICO.list}<span>Every lookup is recorded in the access audit log with your user ID.</span></p>
  </aside>
</div>`;
      const input = root.querySelector('[data-q]'), list = root.querySelector('[data-list]'), count = root.querySelector('[data-shown]'), clr = root.querySelector('[data-clear]');
      const label = () => FIELDS.find(f => f[0] === scope)[1];

      function paint() {
        const hits = CUST.filter(c => matches(c, q, scope));
        count.textContent = 'Showing ' + hits.length + ' of ' + CUST.length;
        clr.hidden = !q;
        if (!hits.length) {
          list.innerHTML = `<div class="empty">${ICO.search}<h4>No customers match “${esc(q.trim())}”${scope === 'all' ? '' : ' in ' + esc(label())}</h4><p>Try another search field.</p></div>`;
          return;
        }
        list.innerHTML = '<ul class="rows' + (firstPaint ? ' enter' : '') + '">' + hits.map((c, i) => {
          const w = worstDpd(c), n = c.lans.length, tone = i % 3 === 0 ? 'a1' : i % 3 === 1 ? 'a2' : 'a3';
          return `<li style="--i:${i}"><button type="button" class="rw" data-cif="${c.cif}" aria-label="${esc(c.name)}, ${c.cif}, ${n} loan account${n > 1 ? 's' : ''}, ${w ? w + ' days past due' : 'current'}">
            <span class="c-cust"><span class="avatar" style="background:var(--${tone});color:var(--${tone}-ink)" aria-hidden="true">${c.initials}</span><span><b>${esc(c.name)}</b><small>${c.segment} • since ${c.since}</small></span></span>
            <span class="c-cif">${c.cif}</span><span class="c-mob">${c.mobile}</span><span class="c-city">${c.city}</span>
            <span class="c-kyc"><span class="chip" data-tone="${c.kyc === 'Verified' ? 'ok' : 'warn'}">${c.kyc}</span></span>
            <span class="c-lan"><span class="n">${ICO.layers}${n}</span>${n === 1 ? '<em>opens directly</em>' : ''}</span>
            <span class="c-dpd"><span class="chip" data-tone="${w === 0 ? 'ok' : w > 30 ? 'bad' : 'warn'}">${w ? w + ' DPD' : 'Current'}</span></span>
            <span class="go">${ICO.chev}</span></button></li>`;
        }).join('') + '</ul>';
        firstPaint = false;
      }
      paint();

      const run = () => { q = input.value; paint(); };
      const onInput = () => { q = input.value; paint(); };
      const onClick = e => {
        const s = e.target.closest('[data-scope]');
        if (s) { scope = s.dataset.scope; root.querySelectorAll('[data-scope]').forEach(b => b.setAttribute('aria-checked', String(b === s))); paint(); input.focus(); return; }
        const r = e.target.closest('[data-recent]');
        if (r) { scope = 'all'; root.querySelectorAll('[data-scope]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.scope === 'all'))); input.value = r.dataset.recent; run(); input.focus(); return; }
        if (e.target.closest('[data-clear]')) { input.value = ''; run(); input.focus(); return; }
        const row = e.target.closest('[data-cif]');
        if (row) {
          const c = CUST.find(x => x.cif === row.dataset.cif);
          if (c.lans.length === 1) { ctx.selection = { customer: c, lan: c.lans[0] }; ctx.go('timeline'); }
          else ctx.openLanPicker(c, row);
        }
      };
      const onSubmit = e => { e.preventDefault(); run(); };
      input.addEventListener('input', onInput);
      root.addEventListener('click', onClick);
      root.querySelector('[data-form]').addEventListener('submit', onSubmit);
      return () => { input.removeEventListener('input', onInput); root.removeEventListener('click', onClick); if (activeDlg) { try { activeDlg.close(); } catch (e) {} } };
    }
  };
})();
