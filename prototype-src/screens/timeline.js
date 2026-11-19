/* DATA FIXES (original timeline vs this build)
 1. DPD / Day-N / due dates were mutually inconsistent (Day 29 on 16 Oct puts the missed EMI at 17 Sep, but T-3 on 02 Oct, NACH on 06 Oct and "next due 05 Nov" implied a 5th-of-month EMI).
    Now: EMI falls due on the 17th. Oldest unpaid EMI = 17 Sep 2026, so DPD(date) = days since 17 Sep (21 Oct = 34 DPD, matches DATA.loans). Every row shows its computed DPD and "Day N" templates equal it.
    Next due is therefore 17 Nov 2026 (was 05 Nov). The "EMI Due Reminder T-3" pair moved from 02 Oct to 14 Oct (T-3 of the 17 Oct instalment).
 2. Header showed "34 DPD" against a 19 Nov "today"; the DPD is now labelled "as of 21 Oct 2026" (end of the audit window).
 3. Date filters defaulted to 19/11/2026 (outside all data, yet 18 of 18 shown). Now default to the real window 28 Sep to 21 Oct 2026, min/max enforced, and they really filter.
 4. "Suppressed" was styled red like an error and excluded from nothing. It is a compliance hold (message never sent), so: neutral style, not counted as failed, and excluded from the delivery-rate denominator (14 of 17 sent = 82.4%, was 14/18 = 77.8%).
    The Day 29 SMS (suppressed) was at 07:30 while 06:38 to 07:30 sends elsewhere went out, so "outside contact window" contradicted itself; its trigger time is now 19:42 (after the window closes).
 5. "6 of 18 actions" (33%) could not be derived: 18 rows had action labels, 3 were tinted. Now each row has a real opened-link timestamp or none; 6 rows are engaged (Read/Delivered only); engagement = 6 of 14 delivered = 43%. Engaged rows: Day 34 WhatsApp, Day 33 SMS, Day 30 SMS (was WhatsApp), statement email, T-3 WhatsApp, rate-review email.
 6. "+3 this week" (green, for failures) and "-2.1 pts vs prior 30d" were unverifiable: removed. Failed/expired tile now says "2 failed, 1 expired".
 7. "1 communications" pluralisation, "Popup" vs "In-app Pop-up" (now "In-app pop-up" everywhere), POP-OD-005 id kept as is (different channel family).
 8. All numbers (count, rate, failed/expired, latency, engagement, chart, chips) are derived from rows; avg latency = mean over delivered rows (256s / 14 = 18s).
 9. Other LANs: Personal Loan gets a 6-row generated timeline (its totals stay 61 comms; the table is the selected window). Two-wheeler loan is closed (last comm 02 Aug 2025) so the window is empty with a friendly state. PL EMI figure (9,860) and due day (19th) are illustrative; the source gave none.
*/
(function () {
  const W0 = '2026-09-28', W1 = '2026-10-21';
  const OD = 'Collections — Soft Bucket 31–60';
  const R = (d, t, del, ch, status, tpl, tid, camp, action, o) => Object.assign({ d, t, del, ch, status, tpl, tid, camp, action }, o || {});
  const od = (n, d, t, del, ch, status, o) => R(d, t, del, ch, status, 'EMI Overdue Reminder — Day ' + n, 'TPL-OD-0' + n, OD, 'Pay EMI Now', o);
  const T3 = (d, t, del, ch, status, o) => R(d, t, del, ch, status, 'EMI Due Reminder — T-3', 'TPL-DU-003', 'Pre-due Reminders', 'Pay EMI Now', o);

  const HL = [
    od(34, '2026-10-21', '06:42:00', '06:42:11', 'whatsapp', 'Read', { read: '06:47:32', click: '06:48:05' }),
    od(34, '2026-10-21', '06:40:00', '06:40:04', 'sms', 'Delivered'),
    R('2026-10-20', '10:00:00', '10:00:38', 'email', 'Delivered', 'Late Payment Charges Notice', 'TPL-LPC-011', OD, 'View Statement'),
    R('2026-10-20', '08:15:00', '08:15:02', 'popup', 'Delivered', 'Overdue Alert — App Pop-up', 'POP-OD-005', OD, 'Open Payments'),
    od(33, '2026-10-20', '07:30:00', null, 'push', 'Failed', { reason: 'Device token unregistered' }),
    od(33, '2026-10-20', '07:28:00', '07:28:06', 'sms', 'Delivered', { click: '07:35:12' }),
    R('2026-10-19', '11:05:00', '11:05:19', 'whatsapp', 'Delivered', 'Payment Mode Reminder — UPI AutoPay', 'TPL-AP-002', 'AutoPay Enrolment Drive Q4', 'Set Up AutoPay'),
    od(32, '2026-10-19', '07:28:00', null, 'sms', 'Failed', { reason: 'Operator timeout' }),
    R('2026-10-18', '09:00:00', '09:00:41', 'email', 'Read', 'Account Statement — Monthly', 'TPL-ST-001', 'Monthly Statements', 'Download Statement', { read: '09:14:20', click: '09:15:02' }),
    od(30, '2026-10-17', '06:40:00', '06:40:14', 'whatsapp', 'Delivered'),
    od(30, '2026-10-17', '06:38:00', '06:38:03', 'sms', 'Delivered', { click: '06:41:55' }),
    R('2026-10-16', '12:00:00', '12:00:02', 'push', 'Delivered', 'Customer Care Callback Offer', 'TPL-CC-004', 'Collections — Assisted Resolution', 'Request Callback'),
    od(29, '2026-10-16', '19:42:00', null, 'sms', 'Suppressed', { reason: 'Outside permitted contact window' }),
    R('2026-10-15', '14:20:00', '14:20:52', 'email', 'Delivered', 'Bounce Charge Intimation', 'TPL-BC-002', OD, 'View Charges'),
    T3('2026-10-14', '09:00:00', null, 'push', 'Expired', { reason: 'Message TTL expired — device offline for 24h' }),
    T3('2026-10-14', '09:00:00', '09:00:12', 'whatsapp', 'Read', { read: '09:03:14', click: '09:03:50' }),
    R('2026-10-06', '08:10:00', '08:10:05', 'sms', 'Delivered', 'NACH Mandate Failure Notice', 'TPL-NM-003', 'NACH Failure Handling', 'Update Bank Details'),
    R('2026-09-28', '11:30:00', '11:30:47', 'email', 'Read', 'Welcome Back — Interest Rate Review', 'TPL-RR-001', 'Rate Review Communication', 'View New Rate', { read: '11:42:10', click: '11:43:00' })
  ];
  const PL = [
    R('2026-10-19', '09:15:00', '09:15:03', 'sms', 'Delivered', 'EMI Received — Thank You', 'TPL-RC-001', 'Payment Acknowledgements', 'View Receipt'),
    T3('2026-10-16', '09:00:00', '09:00:09', 'whatsapp', 'Read', { read: '09:06:40', click: '09:07:15' }),
    T3('2026-10-16', '09:00:00', '09:00:05', 'sms', 'Delivered'),
    R('2026-10-14', '11:00:00', null, 'ivr', 'Failed', 'Pre-due IVR Reminder', 'IVR-DU-002', 'Pre-due Reminders', 'Pay EMI Now', { reason: 'Call not answered after 3 attempts' }),
    R('2026-10-08', '15:20:00', '15:20:12', 'voice', 'Delivered', 'Customer Care Callback — Rate Query', 'VC-CC-001', 'Assisted Resolution', 'Request Callback'),
    R('2026-10-02', '10:00:00', '10:00:21', 'email', 'Read', 'Account Statement — Monthly', 'TPL-ST-001', 'Monthly Statements', 'Download Statement', { read: '10:20:00' })
  ];

  DATA.timeline = {
    window: [W0, W1],
    byLan: {
      'LAN-HL-2019-004417': { rows: HL, emi: 38420, nextDue: '2026-11-17', overdueSince: '2026-09-17', dueDay: 17 },
      'LAN-PL-2024-118203': { rows: PL, emi: 9860, nextDue: '2026-11-19', overdueSince: null, dueDay: 19 },
      'LAN-TW-2022-071954': { rows: [], emi: null, nextDue: null, overdueSince: null, dueDay: null }
    }
  };

  /* ---------- helpers ---------- */
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const U = s => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
  const dayDiff = (a, b) => Math.round((U(a) - U(b)) / 864e5);
  const addDay = (s, n) => new Date(U(s) + n * 864e5).toISOString().slice(0, 10);
  const fd = s => { const [y, m, d] = s.split('-'); return d + ' ' + MON[+m - 1] + ' ' + y; };
  const fds = s => { const [, m, d] = s.split('-'); return d + ' ' + MON[+m - 1]; };
  const wd = s => WD[new Date(U(s)).getUTCDay()];
  const sec = t => { const [h, m, s] = t.split(':').map(Number); return h * 3600 + m * 60 + s; };
  const off = n => n < 60 ? '+' + n + 's' : '+' + Math.floor(n / 60) + 'm ' + String(n % 60).padStart(2, '0') + 's';
  const hm = t => t.slice(0, 5);
  const plural = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const sv = (p, x) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (x || '') + '>' + p + '</svg>';
  const CH = {
    sms: { label: 'SMS', ico: sv('<path d="M5 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-8l-5 4v-4H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M8.5 10h.01M12 10h.01M15.5 10h.01" stroke-width="2.6"/>') },
    whatsapp: { label: 'WhatsApp', ico: sv('<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M9 8.5c0 3 3 6 6 6l1-1.6-2.1-1-1 .8a4 4 0 0 1-2.1-2.1l.8-1-1-2.1z"/>') },
    email: { label: 'Email', ico: sv('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>') },
    push: { label: 'Push', ico: sv('<path d="M6 17v-6a6 6 0 1 1 12 0v6l1.5 2h-15z"/><path d="M10 21h4"/>') },
    popup: { label: 'In-app pop-up', ico: sv('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9.5h18M6.5 7.3h.01M9 7.3h.01" stroke-width="2.4"/>') },
    voice: { label: 'Voice', ico: sv('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>') },
    ivr: { label: 'IVR', ico: sv('<path d="M7 6h.01M12 6h.01M17 6h.01M7 12h.01M12 12h.01M17 12h.01M7 18h.01M12 18h.01M17 18h.01" stroke-width="3.2"/>') },
    field: { label: 'Field visit', ico: sv('<path d="M12 21s-6-5.4-6-10a6 6 0 0 1 12 0c0 4.6-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/>') }
  };
  const ST = {
    Read: { tone: 'ok', ico: sv('<path d="M2.5 12.5l4 4L14 8M10 15.5l1 1L21 7"/>') },
    Delivered: { tone: 'info', ico: sv('<path d="M5 12.5l4.5 4.5L19 7"/>') },
    Failed: { tone: 'bad', ico: sv('<path d="M6 6l12 12M18 6L6 18"/>') },
    Expired: { tone: 'warn', ico: sv('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>') },
    Suppressed: { tone: '', ico: sv('<path d="M12 3l8 3v5.5c0 4.7-3.2 8.2-8 9.5-4.8-1.300-8-4.800-8-9.500V6z"/><path d="M9.500 9.500v5M14.500 9.500v5"/>') }
  };
  const STATUSES = ['Read', 'Delivered', 'Failed', 'Expired', 'Suppressed'];
  const chip = s => '<span class="chip" ' + (ST[s].tone ? 'data-tone="' + ST[s].tone + '"' : '') + '>' + ST[s].ico + s + '</span>';

  function decorate(rows, meta) {
    return rows.map((r, i) => {
      const lat = r.del ? sec(r.del) - sec(r.t) : null;
      const dpd = meta.overdueSince ? Math.max(0, dayDiff(r.d, meta.overdueSince)) : null;
      return Object.assign({}, r, { id: i, lat, dpd, key: r.d + ' ' + r.t });
    }).sort((a, b) => a.key < b.key ? 1 : a.key > b.key ? -1 : b.id - a.id);
  }

  function msgText(r, meta) {
    const FN = meta.first || 'Rajesh', LT = meta.type || 'Home Loan';
    const emi = meta.emi ? '₹' + Fmt.num(meta.emi) : 'your EMI';
    const p = r.tid;
    if (/^TPL-OD/.test(p)) return 'Dear ' + FN + ', your ' + LT + ' EMI of ' + emi + ' is ' + r.dpd + ' days overdue. Please pay today to avoid further charges and protect your credit score. Tap Pay EMI Now to pay securely.';
    if (p === 'TPL-LPC-011') return 'Late payment charges have been applied to your overdue ' + LT + ' EMI. Open your statement to see the full breakup.';
    if (p === 'POP-OD-005') return 'Your EMI is overdue. Pay now from the Payments tab so late charges stop building up.';
    if (p === 'TPL-AP-002') return 'Never miss an EMI again. Set up UPI AutoPay on your ' + LT + ' in under a minute.';
    if (p === 'TPL-ST-001') return 'Your monthly account statement is ready. Tap Download Statement to view it.';
    if (p === 'TPL-CC-004' || p === 'VC-CC-001') return r.ch === 'voice' ? 'Care team call about your interest-rate query. Connected when the customer picked up.' : 'Need help with your overdue EMI? Request a callback and our care team will call you at a time that suits you.';
    if (p === 'TPL-BC-002') return 'A bounce charge was applied because your last EMI debit did not go through. See the charge details.';
    if (p === 'TPL-NM-003') return 'Your NACH mandate did not process. Please update your bank details so future EMIs debit automatically.';
    if (p === 'TPL-DU-003') return 'Friendly reminder: your ' + (meta.type || (meta.overdueSince ? 'Home Loan' : 'Personal Loan')) + ' EMI is due on ' + (meta.dueText || (meta.overdueSince ? '17 Oct 2026' : '19 Oct 2026')) + '. Keep your account funded or pay early with Pay EMI Now.';
    if (p === 'TPL-RR-001') return 'Good to have you back, ' + FN + '. We have reviewed the interest rate on your ' + LT + '. Tap View New Rate to see what changes.';
    if (p === 'TPL-RC-001') return 'Dear ' + FN + ', we have received your EMI payment for your ' + (meta.type || 'Personal Loan') + '. Thank you.';
    if (p === 'IVR-DU-002') return 'Automated call: "Your Personal Loan EMI is due on 19 October. Press 1 to pay by UPI."';
    return r.tpl;
  }

  /* ---------- illustrative LAN data for customers other than Rajesh (seeded from LAN id + comms count) ---------- */
  function metaFor(l, cu) {
    const T = DATA.timeline.byLan;
    if (T[l.lan]) return T[l.lan];
    const dpd = parseInt(l.dpdLabel, 10) || 0, first = cu ? cu.name.split(' ')[0] : '';
    let a = 0; for (const ch of l.lan) a = (a * 31 + ch.charCodeAt(0)) >>> 0; a = (a + l.comms * 7919) >>> 0;
    const rnd = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    if (l.status === 'Closed') return (T[l.lan] = { rows: [], emi: null, nextDue: null, overdueSince: null, dueDay: null, type: l.type, first });
    const overdueSince = dpd ? addDay(W1, -dpd) : null, dueDay = overdueSince ? +overdueSince.slice(8) : 3 + Math.floor(rnd() * 24);
    const nextDue = (dueDay > 21 ? '2026-10-' : '2026-11-') + String(dueDay).padStart(2, '0');
    const dueText = fd((dueDay > 21 ? '2026-10-' : '2026-10-') + String(dueDay).padStart(2, '0'));
    const rows = [], n = 6 + Math.floor(rnd() * 5), CHS = ['sms', 'whatsapp', 'email', 'push', 'sms', 'whatsapp'];
    let d = W1;
    for (let i = 0; i < n; i++) {
      const h = 6 + Math.floor(rnd() * 12), m = Math.floor(rnd() * 60), t = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':00';
      const ch = CHS[Math.floor(rnd() * CHS.length)], x = rnd(), st = x < .1 ? 'Failed' : x < .14 ? 'Expired' : x < .18 ? 'Suppressed' : x < .42 ? 'Read' : 'Delivered';
      const dl = st === 'Failed' || st === 'Expired' || st === 'Suppressed' ? null : t.slice(0, 6) + String(3 + Math.floor(rnd() * 38)).padStart(2, '0');
      const o = {}; if (st === 'Failed') o.reason = 'Operator timeout'; if (st === 'Expired') o.reason = 'Message TTL expired, device offline for 24h'; if (st === 'Suppressed') o.reason = 'Outside permitted contact window';
      if (st === 'Read') { o.read = String(h).padStart(2, '0') + ':' + String(Math.min(59, m + 5)).padStart(2, '0') + ':10'; if (rnd() < .6) o.click = String(h).padStart(2, '0') + ':' + String(Math.min(59, m + 6)).padStart(2, '0') + ':05'; }
      const day = overdueSince ? dayDiff(d, overdueSince) : -1;
      rows.push(overdueSince && day >= 1 ? od(day, d, t, dl, ch, st, o) : i % 3 === 2 ? R(d, t, dl, ch, st, 'Account Statement — Monthly', 'TPL-ST-001', 'Monthly Statements', 'Download Statement', o) : T3(d, t, dl, ch, st, o));
      if (rnd() < .65) d = addDay(d, -1 - Math.floor(rnd() * 3)); if (d < W0) d = W0;
    }
    return (T[l.lan] = { rows, emi: l.emi, nextDue, overdueSince, dueDay, type: l.type, first, dueText });
  }

  /* ---------- screen ---------- */
  Screens.timeline = {
    title: 'Communication timeline',
    css: `
.s-timeline{--nw:38px;display:grid;gap:22px;padding-top:6px;max-width:1180px;
 --c-sms:var(--a2);--ci-sms:var(--a2-ink);--c-whatsapp:var(--a3);--ci-whatsapp:var(--a3-ink);--c-email:var(--a1);--ci-email:var(--a1-ink);
 --c-push:color-mix(in srgb,var(--a1) 50%,var(--a2));--ci-push:var(--surface);
 --c-popup:var(--ink);--ci-popup:var(--surface);--c-voice:var(--warn);--ci-voice:var(--surface);
 --c-ivr:color-mix(in srgb,var(--warn) 55%,var(--a1));--ci-ivr:var(--surface);--c-field:var(--ink-2);--ci-field:var(--surface)}
.s-timeline button{cursor:pointer}
.s-timeline .crumbs{display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center}
.s-timeline .cr{font:700 13.5px var(--font-body);padding:8px 14px;border-radius:999px;background:var(--surface);color:var(--ink);border:calc(var(--bw)*.6) solid var(--line);text-decoration:none;cursor:pointer;display:inline-flex;gap:8px;align-items:center;transition:transform .15s var(--ease),background .15s}
.s-timeline .cr:hover{transform:translateY(-2px);background:var(--surface-2)}.s-timeline .cr:active{transform:scale(.96)}
.s-timeline .cr.other{margin-left:auto;background:var(--a1);color:var(--a1-ink)}
.s-timeline .cr.other .chip{padding:1px 8px;background:var(--surface);color:var(--ink)}
.s-timeline .stc{--c:var(--ink-2);--ci:var(--surface)}
.s-timeline [data-ch=sms]{--c:var(--c-sms);--ci:var(--ci-sms)}.s-timeline [data-ch=whatsapp]{--c:var(--c-whatsapp);--ci:var(--ci-whatsapp)}
.s-timeline [data-ch=email]{--c:var(--c-email);--ci:var(--ci-email)}.s-timeline [data-ch=push]{--c:var(--c-push);--ci:var(--ci-push)}
.s-timeline [data-ch=popup]{--c:var(--c-popup);--ci:var(--ci-popup)}.s-timeline [data-ch=voice]{--c:var(--c-voice);--ci:var(--ci-voice)}
.s-timeline [data-ch=ivr]{--c:var(--c-ivr);--ci:var(--ci-ivr)}.s-timeline [data-ch=field]{--c:var(--c-field);--ci:var(--ci-field)}

/* loan card */
.s-timeline .loans{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}
.s-timeline .ltab{display:flex;align-items:center;gap:10px;padding:9px 16px 9px 12px;border-radius:999px;border:var(--bw) solid var(--line);background:var(--surface-2);font:700 14px var(--font-body);transition:transform .15s var(--ease),background .2s,color .2s}
[data-skin=soda] .s-timeline .ltab{border-color:transparent}
.s-timeline .ltab:hover{transform:translateY(-2px)}
.s-timeline .ltab[aria-pressed=true]{background:var(--ink);color:var(--surface)}
.s-timeline .ltab small{font:600 12px var(--font-body);opacity:.75}
.s-timeline .ltab i{width:10px;height:10px;border-radius:50%;background:var(--ok)}
.s-timeline .ltab i.od{background:var(--bad)}.s-timeline .ltab i.cl{background:var(--ink-2)}
.s-timeline .lhead{display:flex;gap:20px 36px;flex-wrap:wrap;align-items:flex-end;justify-content:space-between}
.s-timeline .lhead h2{font-size:clamp(22px,3.2vw,30px)}
.s-timeline .lchips{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 6px}
.s-timeline .lwho{font-size:14px;color:var(--ink-2);font-weight:600}
.s-timeline .facts{display:flex;gap:10px 30px;flex-wrap:wrap}
.s-timeline .facts div{display:flex;flex-direction:column;gap:2px}
.s-timeline .facts span{font:700 12.5px var(--font-body);color:var(--ink-2)}
.s-timeline .facts b{font:var(--head-weight) 22px/1.1 var(--font-display);letter-spacing:var(--head-track)}
.s-timeline .lnote{margin:14px 0 0;font-size:13.5px;color:var(--ink-2)}
.s-timeline .lnote b{color:var(--ink)}

/* stats */
.s-timeline .stats{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
.s-timeline .st{padding:16px 18px 15px;display:flex;flex-direction:column;gap:3px;min-width:0;transition:transform .2s var(--ease),background .3s}
.s-timeline .st:hover{transform:translateY(-3px)}
.s-timeline .st-l{display:flex;align-items:center;gap:8px;font:700 13.5px var(--font-body);opacity:.85}
.s-timeline .st-l svg{width:18px;height:18px;flex:none}
.s-timeline .st-v{font:var(--head-weight) clamp(34px,4vw,46px)/1 var(--font-display);letter-spacing:var(--head-track);margin-top:6px;font-variant-numeric:tabular-nums}
.s-timeline .st-s{font-size:13px;font-weight:600;opacity:.85;min-height:2.6em}
.s-timeline .st.hot{background:var(--a1);color:var(--a1-ink)}
.s-timeline .st.alert{background:var(--bad-bg);color:var(--bad)}
.s-timeline .st.alert.calm{background:var(--ok-bg);color:var(--ok)}

/* window card: strip + filters */
.s-timeline .win h3{font-size:19px}
.s-timeline .win-top{display:flex;justify-content:space-between;gap:12px;align-items:baseline;flex-wrap:wrap;margin-bottom:14px}
.s-timeline .count{font:700 14px var(--font-body);color:var(--ink-2)}
.s-timeline .count b{color:var(--ink);font-size:16px}
.s-timeline .strip{position:relative;display:grid;grid-template-columns:repeat(var(--n),1fr);gap:3px;align-items:end;padding-top:20px}
.s-timeline .strip::after{content:"";position:absolute;left:0;right:0;bottom:30px;height:3px;background:var(--ink);opacity:.8;border-radius:3px;transform-origin:0 50%;animation:s-tl-line 1.1s var(--ease) both}
@keyframes s-tl-line{from{transform:scaleX(0)}}
.s-timeline .sday{position:relative;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:0;padding:0 0 0;border:0;background:none;border-radius:8px;min-width:0;height:calc(var(--mx)*17px + 52px);transition:background .2s}
.s-timeline .sday:hover{background:color-mix(in srgb,var(--ink) 8%,transparent)}
.s-timeline .sday[aria-pressed=true]{background:color-mix(in srgb,var(--a2) 22%,transparent);box-shadow:inset 0 0 0 2px var(--a2)}
.s-timeline .sq-wrap{display:flex;flex-direction:column-reverse;gap:3px;margin-bottom:11px;width:100%;align-items:center}
.s-timeline .sq{width:min(100%,24px);height:14px;border-radius:5px;background:var(--c);transition:transform .95s var(--ease) var(--d,0s),opacity .3s,filter .3s}
.s-timeline .sq[data-s=Read]{--c:var(--ok)}.s-timeline .sq[data-s=Delivered]{--c:var(--info)}.s-timeline .sq[data-s=Failed]{--c:var(--bad)}.s-timeline .sq[data-s=Expired]{--c:var(--warn)}
.s-timeline .sq[data-s=Suppressed]{--c:transparent;box-shadow:inset 0 0 0 2.5px var(--ink-2)}
.s-timeline .sq.off{opacity:.16}
.s-timeline .sd{font:700 11.5px var(--font-body);color:var(--ink-2);height:19px;line-height:19px;margin-top:3px;font-variant-numeric:tabular-nums}
.s-timeline .sday.mo .sd::before{content:attr(data-m);position:absolute;bottom:-18px;left:50%;transform:translateX(-50%);font:800 11px var(--font-body);color:var(--ink)}
.s-timeline .sday.due{box-shadow:inset 0 -3px 0 var(--a1)}
.s-timeline .sday.due::before{content:"EMI due";position:absolute;top:-2px;left:50%;transform:translateX(-50%);font:800 10.5px var(--font-body);white-space:nowrap;color:var(--ink);background:var(--a1);color:var(--a1-ink);padding:1px 6px;border-radius:99px}
.s-timeline .strip-wrap{padding-bottom:20px}
.s-timeline .legend{display:flex;gap:6px 16px;flex-wrap:wrap;margin:6px 0 16px;font:600 12.5px var(--font-body);color:var(--ink-2)}
.s-timeline .legend span{display:inline-flex;gap:6px;align-items:center}
.s-timeline .legend i{width:12px;height:12px;border-radius:4px;background:var(--c)}
.s-timeline .legend i[data-s=Read]{--c:var(--ok)}.s-timeline .legend i[data-s=Delivered]{--c:var(--info)}.s-timeline .legend i[data-s=Failed]{--c:var(--bad)}.s-timeline .legend i[data-s=Expired]{--c:var(--warn)}
.s-timeline .legend i[data-s=Suppressed]{background:transparent;box-shadow:inset 0 0 0 2.5px var(--ink-2)}
.s-timeline .frow{display:grid;gap:12px;grid-template-columns:auto 1fr;align-items:start;padding:12px 0;border-top:var(--bw) solid var(--line)}
[data-skin=night] .s-timeline .frow,[data-skin=soda] .s-timeline .frow{border-top-width:1px}
.s-timeline .frow>b{font:700 13px var(--font-body);color:var(--ink-2);width:64px;padding-top:8px}
.s-timeline .fchips{display:flex;gap:7px;flex-wrap:wrap}
.s-timeline .fc{display:inline-flex;align-items:center;gap:7px;padding:6px 12px 6px 7px;border-radius:999px;border:var(--bw) solid var(--line);background:var(--surface-2);font:700 13.5px var(--font-body);transition:transform .15s var(--ease),background .2s,color .2s,opacity .2s}
[data-skin=soda] .s-timeline .fc{border-color:transparent}
.s-timeline .fc:hover:not([disabled]){transform:translateY(-2px)}
.s-timeline .fc[aria-pressed=true]{background:var(--ink);color:var(--surface)}
.s-timeline .fc em{font:700 12px var(--font-body);font-style:normal;padding:1px 7px;border-radius:99px;background:color-mix(in srgb,currentColor 14%,transparent);font-variant-numeric:tabular-nums}
.s-timeline .fc.z:not([aria-pressed=true]){opacity:.5}
.s-timeline .fc[disabled]{opacity:.4;cursor:not-allowed}
.s-timeline .mini{width:24px;height:24px;border-radius:50%;background:var(--c);color:var(--ci);display:grid;place-items:center;flex:none}
.s-timeline .mini svg{width:14px;height:14px}
.s-timeline .fc .dotc{width:10px;height:10px;border-radius:50%;margin:0 2px 0 5px;background:var(--c)}
.s-timeline .fc .dotc[data-s=Read]{--c:var(--ok)}.s-timeline .fc .dotc[data-s=Delivered]{--c:var(--info)}.s-timeline .fc .dotc[data-s=Failed]{--c:var(--bad)}.s-timeline .fc .dotc[data-s=Expired]{--c:var(--warn)}
.s-timeline .fc .dotc[data-s=Suppressed]{background:transparent;box-shadow:inset 0 0 0 2px var(--ink-2)}
.s-timeline .fc[aria-pressed=true] .dotc{box-shadow:0 0 0 2px var(--surface)}
.s-timeline .dates{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end}
.s-timeline .dates .field{width:170px}
.s-timeline .dates .field label{font-size:12.5px}
.s-timeline .dates .input{padding:9px 12px;font-size:14px}
[data-skin=night] .s-timeline input[type=date]{color-scheme:dark}
.s-timeline .sep{align-self:center;padding-top:20px;color:var(--ink-2);font-weight:700}
.s-timeline .reset{margin-left:auto;font-size:14px;padding:10px 16px}

/* timeline hero */
.s-timeline .tlh{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:6px}
.s-timeline .tlh h3{font-size:clamp(22px,3vw,28px)}
.s-timeline .tlh .btn{font-size:13.5px;padding:9px 15px}
.s-timeline .tl{list-style:none;margin:10px 0 0;padding:6px 0 4px;position:relative;display:grid;gap:12px}
.s-timeline .tl::before{content:"";position:absolute;top:0;bottom:0;left:calc(var(--nw)/2 - 1.5px);width:3px;border-radius:3px;background:linear-gradient(var(--a1),var(--a2) 55%,var(--a3));opacity:.85;transform-origin:50% 0}
.s-timeline .tl.fresh::before{animation:s-tl-rail 1.7s cubic-bezier(.5,.1,.2,1) both}
@keyframes s-tl-rail{from{transform:scaleY(0)}}
.s-timeline .tl>li{display:grid;grid-template-columns:calc(var(--nw) + 16px) 1fr;align-items:start;position:relative}
.s-timeline .day{align-items:center!important;margin-top:8px}
.s-timeline .day .dm{width:var(--nw);display:grid;place-items:center}
.s-timeline .day .dm i{width:16px;height:16px;border-radius:5px;transform:rotate(45deg);background:var(--ink);box-shadow:0 0 0 5px var(--bg);}
.s-timeline .day .dt{display:flex;gap:8px 12px;align-items:center;flex-wrap:wrap;padding:6px 14px 6px 12px;background:var(--bg);border-radius:99px;justify-self:start;max-width:100%}
.s-timeline .day .dt b{font:var(--head-weight) 19px var(--font-display);letter-spacing:var(--head-track)}
.s-timeline .day .dt span.m{font-size:13px;font-weight:700;color:var(--ink-2)}
.s-timeline .nd{width:var(--nw);height:var(--nw);border-radius:50%;background:var(--c);color:var(--ci);display:grid;place-items:center;border:var(--bw) solid var(--line);box-shadow:0 0 0 5px var(--bg);margin-top:11px;position:relative;z-index:1}
[data-skin=soda] .s-timeline .nd{border:0}
.s-timeline .nd svg{width:calc(var(--nw)*.52);height:calc(var(--nw)*.52)}
.s-timeline .nd.bad::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:3px solid var(--bad);animation:s-tl-ping 2.2s ease-out 1.6s 2 both}
@keyframes s-tl-ping{from{transform:scale(.8);opacity:.9}to{transform:scale(1.5);opacity:0}}
.s-timeline .nd.gapn{background:var(--bg);color:var(--ink);border:2.5px dashed var(--ink-2);box-shadow:0 0 0 5px var(--bg)}
.s-timeline .anim .nd{animation:s-tl-pop .5s var(--ease) var(--dl,0s) both}
.s-timeline .anim .box{animation:s-tl-card .55s var(--ease) var(--dl,0s) both}
.s-timeline .anim.day .dt,.s-timeline .anim.gap .gp{animation:s-tl-card .5s var(--ease) var(--dl,0s) both}
@keyframes s-tl-pop{from{transform:scale(0)}60%{transform:scale(1.18)}}
@keyframes s-tl-card{from{opacity:0;transform:translateX(18px)}}
.s-timeline .box{background:var(--surface);border:var(--bw) solid var(--line);border-radius:var(--r-sm);box-shadow:var(--shadow-press);min-width:0;transition:transform .18s var(--ease),box-shadow .18s var(--ease),background .25s}
.s-timeline .box:hover{transform:translate(-2px,-2px);box-shadow:var(--shadow)}
.s-timeline .box.failed{background:var(--bad-bg)}.s-timeline .box.expired{background:var(--warn-bg)}
.s-timeline .box.suppressed{background:var(--surface-2);border-style:dashed}
.s-timeline .hd{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:1fr auto auto;gap:6px 14px;align-items:center;padding:12px 14px 12px 16px;width:100%;border-radius:var(--r-sm)}
.s-timeline .hd:focus-visible{outline:3px solid var(--a2);outline-offset:2px}
.s-timeline .ttl{font:700 16px/1.25 var(--font-body);min-width:0}
.s-timeline .meta{font-size:13px;color:var(--ink-2);font-weight:600;margin-top:3px;display:flex;gap:4px 10px;flex-wrap:wrap}
.s-timeline .meta .tm{color:var(--ink);font-weight:800;font-variant-numeric:tabular-nums}
.s-timeline .why{font-size:13px;font-weight:700;margin-top:5px}
.s-timeline .failed .why{color:var(--bad)}.s-timeline .expired .why{color:var(--warn)}.s-timeline .suppressed .why{color:var(--ink-2)}
.s-timeline .rt{display:flex;flex-direction:column;align-items:flex-end;gap:5px}
.s-timeline .rt .chip svg{width:13px;height:13px}
.s-timeline .lat{font:700 12.5px var(--font-body);color:var(--ink-2);font-variant-numeric:tabular-nums}
.s-timeline .chev{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--surface-2);transition:transform .35s var(--ease)}
.s-timeline .chev svg{width:16px;height:16px}
.s-timeline li.open .chev{transform:rotate(180deg);background:var(--ink);color:var(--surface)}
.s-timeline .dtl{display:grid;grid-template-rows:0fr;transition:grid-template-rows .38s var(--ease)}
.s-timeline li.open .dtl{grid-template-rows:1fr}
.s-timeline .dtl>div{overflow:hidden;min-height:0;visibility:hidden;opacity:0;transition:opacity .25s,visibility 0s .38s}
.s-timeline li.open .dtl>div{visibility:visible;opacity:1;transition:opacity .3s .08s,visibility 0s}
.s-timeline .dg{display:grid;grid-template-columns:1.25fr 1fr;gap:18px 26px;padding:6px 18px 18px;border-top:1.5px dashed color-mix(in srgb,var(--ink) 25%,transparent);margin:0 14px;padding-left:2px;padding-right:2px;padding-top:16px}
.s-timeline .msg{position:relative;padding:12px 14px;border-radius:var(--r-sm);background:var(--surface-2);font-size:14.5px;line-height:1.5;border-left:5px solid var(--c)}
.s-timeline .flb{font:700 12.5px var(--font-body);color:var(--ink-2);margin:0 0 6px}
.s-timeline .msg-note{font-size:12.5px;color:var(--ink-2);margin-top:6px;font-weight:600}
.s-timeline .kv{display:grid;grid-template-columns:repeat(2,auto);gap:10px 18px;margin-top:14px;justify-content:start}
.s-timeline .kv div{min-width:0}.s-timeline .kv span{display:block;font:700 12px var(--font-body);color:var(--ink-2)}.s-timeline .kv b{font:700 14px/1.3 var(--font-body);overflow-wrap:anywhere}
.s-timeline .trail{list-style:none;margin:0;padding:0;position:relative;display:grid;gap:12px}
.s-timeline .trail::before{content:"";position:absolute;left:6px;top:8px;bottom:8px;width:2px;background:color-mix(in srgb,var(--ink) 28%,transparent)}
.s-timeline .trail li{display:grid;grid-template-columns:14px 1fr auto;gap:10px;align-items:center;font-size:14px;font-weight:600;position:relative}
.s-timeline .trail li i{width:14px;height:14px;border-radius:50%;background:var(--surface);border:3px solid var(--c);z-index:1}
.s-timeline .trail li[data-k=ok] i{--c:var(--ok);background:var(--ok)}.s-timeline .trail li[data-k=info] i{--c:var(--info)}.s-timeline .trail li[data-k=bad] i{--c:var(--bad);background:var(--bad)}.s-timeline .trail li[data-k=warn] i{--c:var(--warn);background:var(--warn)}.s-timeline .trail li[data-k=idle] i{--c:var(--ink-2)}
.s-timeline .trail li[data-k=skip]{opacity:.55}.s-timeline .trail li[data-k=skip] i{--c:var(--ink-2);border-style:dashed}
.s-timeline .trail small{font:700 12.5px var(--font-body);color:var(--ink-2);font-variant-numeric:tabular-nums}
.s-timeline .trail .t{font-variant-numeric:tabular-nums;font-weight:800}
.s-timeline .gap .gp{margin:2px 0;padding:10px 14px;border:2.5px dashed var(--ink-2);border-radius:var(--r-sm);font-size:13.5px;font-weight:600;color:var(--ink-2);background:transparent}
.s-timeline .gap .gp b{color:var(--ink)}
.s-timeline .gap .nd{margin-top:3px}
.s-timeline .gap{align-items:center!important}
.s-timeline .empty{display:grid;justify-items:center;text-align:center;gap:10px;padding:36px 12px 28px}
.s-timeline .empty svg{width:96px;height:96px;color:var(--ink)}
.s-timeline .empty h4{font-size:22px}.s-timeline .empty p{margin:0;max-width:46ch;color:var(--ink-2)}
.s-timeline .rdonly{margin:6px 0 0;font-size:13px;color:var(--ink-2);font-weight:600}

@media (max-width:980px){.s-timeline .stats{grid-template-columns:repeat(2,1fr)}.s-timeline .st.hot{grid-column:1/-1}}
@media (max-width:640px){
 .s-timeline{--nw:30px;gap:18px}
 .s-timeline .stats{gap:10px}.s-timeline .st{padding:13px}.s-timeline .st-s{min-height:3.8em;font-size:12.5px}
 .s-timeline .tl>li{grid-template-columns:calc(var(--nw) + 10px) 1fr}
 .s-timeline .hd{grid-template-columns:1fr auto;padding:11px 10px 11px 12px}
 .s-timeline .rt{grid-column:1;grid-row:2;flex-direction:row;align-items:center;gap:10px}.s-timeline .chev{grid-column:2;grid-row:1/3}
 .s-timeline .dg{grid-template-columns:1fr}
 .s-timeline .frow{grid-template-columns:1fr}.s-timeline .frow>b{padding:0}
 .s-timeline .dates .field{width:calc(50% - 20px)}
 .s-timeline .reset{margin-left:0}
 .s-timeline .sd{font-size:9.5px}.s-timeline .strip{gap:1px}
 .s-timeline .sday:not(:nth-child(3n+1)) .sd{visibility:hidden}.s-timeline .sday.mo .sd,.s-timeline .sday.due .sd{visibility:visible}
}
`,
    render(root, ctx) {
      const SEL = ctx && ctx.selection, CU = SEL ? SEL.customer : null, ILLU = !!(CU && CU.illustrative);
      const loans = CU ? CU.lans : DATA.loans, cleanups = [], handles = new Map();
      const cname = CU ? CU.name : DATA.customer.name, ccif = CU ? CU.cif : DATA.customer.cif;
      let loan = (SEL && loans.find(l => l.lan === SEL.lan.lan)) || loans[0], meta, rows = [];
      const state = { from: W0, to: W1, ch: new Set(), st: new Set(), open: new Set() };
      const days = []; for (let d = W0; d <= W1; d = addDay(d, 1)) days.push(d);
      const inRange = r => r.d >= state.from && r.d <= state.to;
      const view = (ex) => rows.filter(r => inRange(r) && (ex === 'ch' || !state.ch.size || state.ch.has(r.ch)) && (ex === 'st' || !state.st.size || state.st.has(r.status)));
      const isDefault = () => state.from === W0 && state.to === W1 && !state.ch.size && !state.st.size;

      /* derived stats from rows only */
      const calc = rs => {
        const sent = rs.filter(r => r.status !== 'Suppressed'), dl = rs.filter(r => r.del);
        const failed = rs.filter(r => r.status === 'Failed').length, expired = rs.filter(r => r.status === 'Expired').length;
        return {
          n: rs.length, sent: sent.length, delivered: dl.length,
          rate: sent.length ? dl.length / sent.length * 100 : null,
          failed, expired, held: rs.filter(r => r.status === 'Suppressed').length,
          lat: dl.length ? dl.reduce((a, r) => a + r.lat, 0) / dl.length : null,
          clicks: rs.filter(r => r.click).length,
          eng: dl.length ? rs.filter(r => r.click).length / dl.length * 100 : null
        };
      };

      root.innerHTML = `
<nav class="crumbs" aria-label="Customer navigation"><a href="#/search" class="cr">‹ Back to search</a><a href="#/overview" class="cr">Customer overview</a><button type="button" class="cr" data-soon>Chat sessions archive</button><button type="button" class="cr" data-soon>Complaint &amp; escalation</button>${loans.length > 1 ? `<button type="button" class="cr other" data-other aria-haspopup="dialog">Other LANs <span class="chip">${loans.length}</span></button>` : ''}</nav>
<section class="card" aria-label="Loan">
  <div class="loans" role="group" aria-label="Choose a loan">${loans.map((l, i) => `<button class="ltab" data-loan="${i}" aria-pressed="${i === 0}"><i class="${l.status === 'Overdue' ? 'od' : l.status === 'Closed' ? 'cl' : ''}"></i>${l.type}<small>${l.lan.slice(-4)}</small></button>`).join('')}</div>
  <div class="lhead"><div><h2 data-l="lan"></h2><div class="lchips" data-l="chips"></div><div class="lwho">${esc(cname)} · ${ccif}${ILLU ? ' <span class="chip" data-tone="info" title="Rows and figures for this customer are generated for the prototype">Illustrative data</span>' : ''}</div></div><div class="facts" data-l="facts"></div></div>
  <p class="lnote" data-l="note"></p>
</section>
<section class="stats" aria-label="Summary of the communications in view" data-stats>
  <div class="card st hot"><div class="st-l">${sv('<path d="M5 12.5l4.5 4.5L19 7"/>')}Delivery rate</div><div class="st-v" data-v="rate">—</div><div class="st-s" data-s="rate"></div></div>
  <div class="card st"><div class="st-l">${sv('<path d="M21 4L3 11l7 3 3 7z"/>')}Communications</div><div class="st-v" data-v="n">0</div><div class="st-s" data-s="n"></div></div>
  <div class="card st alert" data-card="bad"><div class="st-l">${sv('<path d="M12 4l9.500 16h-19z"/><path d="M12 10v4.500M12 17.500h.01"/>')}Failed or expired</div><div class="st-v" data-v="bad">0</div><div class="st-s" data-s="bad"></div></div>
  <div class="card st"><div class="st-l">${sv('<circle cx="12" cy="13.500" r="7.500"/><path d="M12 9.500v4l2.500 1.500M9.500 3h5"/>')}Avg delivery time</div><div class="st-v" data-v="lat">—</div><div class="st-s" data-s="lat"></div></div>
  <div class="card st"><div class="st-l">${sv('<path d="M8 3l3 8 2-3 5 5-3 3-5-5-3 2z"/>')}Link engagement</div><div class="st-v" data-v="eng">—</div><div class="st-s" data-s="eng"></div></div>
</section>
<section class="card win" aria-label="Day by day and filters">
  <div class="win-top"><h3>${fds(W0)} to ${fds(W1)}, day by day</h3><div class="count" aria-live="polite" data-count-line></div></div>
  <div class="strip-wrap"><div class="strip" data-strip></div></div>
  <div class="legend" aria-hidden="true">${STATUSES.map(s => `<span><i data-s="${s}"></i>${s}</span>`).join('')}<span>Select a day to filter to it</span></div>
  <div class="frow"><b>Channel</b><div class="fchips" data-fch role="group" aria-label="Channel filter"></div></div>
  <div class="frow"><b>Status</b><div class="fchips" data-fst role="group" aria-label="Status filter"></div></div>
  <div class="frow"><b>Dates</b><div class="dates">
    <div class="field"><label for="tl-from">From</label><input id="tl-from" class="input" type="date" min="${W0}" max="${W1}" value="${W0}"></div><span class="sep">to</span>
    <div class="field"><label for="tl-to">To</label><input id="tl-to" class="input" type="date" min="${W0}" max="${W1}" value="${W1}"></div>
    <button class="btn reset" data-reset type="button">Reset filters</button></div></div>
</section>
<section class="card" aria-label="Communications">
  <div class="tlh"><h3>Unified timeline</h3><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><span class="muted" style="font-size:13.5px;font-weight:600">Newest first, times in IST</span><button class="btn" data-expand type="button">Expand all</button></div></div>
  <div data-list></div>
  <p class="rdonly">Read-only audit view. Communications can't be re-sent from here.</p>
</section>`;

      const $ = (s) => root.querySelector(s);
      const setV = (key, to, o) => {
        const el = $('[data-v=' + key + ']'); if (!el) return;
        if (handles.get(key)) handles.get(key)();
        if (to == null) { el.textContent = '—'; el._v = 0; return; }
        const from = el._v || 0; el._v = to;
        handles.set(key, Anim.countUp(el, Object.assign({ to, from, dur: o.first ? 1300 : 750, delay: o.first ? o.delay : 0 }, o.fmt)));
      };

      function updateStats(first) {
        const s = calc(view()), o = { first };
        setV('rate', s.rate, Object.assign({}, o, { delay: 100, fmt: { decimals: 1, suffix: '%' } }));
        setV('n', s.n, Object.assign({}, o, { delay: 250, fmt: {} }));
        setV('bad', s.failed + s.expired, Object.assign({}, o, { delay: 400, fmt: {} }));
        setV('lat', s.lat, Object.assign({}, o, { delay: 550, fmt: { suffix: 's' } }));
        setV('eng', s.eng, Object.assign({}, o, { delay: 700, fmt: { suffix: '%' } }));
        const T = (k, h) => { $('[data-s=' + k + ']').textContent = h; };
        T('rate', s.sent ? s.delivered + ' of ' + s.sent + ' sent reached the customer' + (s.held ? '. ' + s.held + ' held back, not counted' : '') : 'Nothing sent in view');
        T('n', rows.length ? 'of ' + rows.length + ' in this window; ' + loan.comms + ' in total on the loan' : 'in this window; ' + loan.comms + ' in total on the loan');
        T('bad', s.failed + s.expired ? s.failed + ' failed, ' + s.expired + ' expired' : s.n ? 'Nothing failed or expired' : 'Nothing in view');
        T('lat', s.lat != null ? 'Trigger to delivery, over ' + plural(s.delivered, 'delivered message') : 'No delivered messages');
        T('eng', s.eng != null ? s.clicks + ' of ' + s.delivered + ' delivered had the action link opened' : 'No delivered messages');
        $('[data-card=bad]').classList.toggle('calm', s.failed + s.expired === 0);
        $('[data-count-line]').innerHTML = '<b>' + s.n + '</b> of ' + rows.length + ' communications shown';
        root.querySelector('[data-reset]').disabled = isDefault();
      }

      function renderLoan() {
        $('[data-l=lan]').textContent = loan.lan;
        const dpdNow = meta.overdueSince ? dayDiff(W1, meta.overdueSince) : null;
        $('[data-l=chips]').innerHTML = '<span class="chip" data-tone="' + (loan.status === 'Overdue' ? 'warn' : loan.status === 'Closed' ? '' : 'ok') + '"><span class="dot"></span>' + loan.status + '</span><span class="chip" data-tone="' + (dpdNow ? 'bad' : '') + '">' + (dpdNow ? dpdNow + ' DPD as of ' + fd(W1) : 'No days past due') + '</span><span class="chip">' + loan.type + '</span>';
        $('[data-l=facts]').innerHTML = '<div><span>Outstanding</span><b>' + Fmt.inr(loan.outstanding) + '</b></div><div><span>EMI</span><b>' + (meta.emi ? Fmt.inr(meta.emi) : '—') + '</b></div><div><span>' + (meta.nextDue ? 'Next due' : 'Next due') + '</span><b>' + (meta.nextDue ? fd(meta.nextDue) : 'None, loan closed') + '</b></div>';
        $('[data-l=note]').innerHTML = rows.length
          ? 'Showing <b>' + rows.length + '</b> communications from ' + fds(W0) + ' to ' + fds(W1) + ' ' + '2026. The loan has <b>' + loan.comms + '</b> in total since it started.'
          : 'Showing <b>0</b> communications in this window. The loan has <b>' + loan.comms + '</b> in total; the last one went out ' + loan.last + '.';
        root.querySelectorAll('[data-loan]').forEach(b => b.setAttribute('aria-pressed', String(loans[+b.dataset.loan] === loan)));
      }

      function renderFilters() {
        const chs = [...new Set(rows.map(r => r.ch))];
        $('[data-fch]').innerHTML = chs.length ? chs.map(c => `<button class="fc" type="button" data-fch-v="${c}" data-ch="${c}" aria-pressed="false"><span class="mini">${CH[c].ico}</span>${CH[c].label}<em></em></button>`).join('') : '<span class="muted">No channels used in this window</span>';
        $('[data-fst]').innerHTML = STATUSES.map(s => `<button class="fc" type="button" data-fst-v="${s}" aria-pressed="false"><span class="dotc" data-s="${s}"></span>${s}<em></em></button>`).join('');
        root.querySelectorAll('.fc').forEach(b => { b.disabled = !rows.length; });
        $('#tl-from').disabled = $('#tl-to').disabled = !rows.length;
        syncFilters();
      }
      function syncFilters() {
        const vc = view('ch'), vs = view('st');
        root.querySelectorAll('[data-fch-v]').forEach(b => { const v = b.dataset.fchV, n = vc.filter(r => r.ch === v).length; b.setAttribute('aria-pressed', String(state.ch.has(v))); b.querySelector('em').textContent = n; b.classList.toggle('z', !n); });
        root.querySelectorAll('[data-fst-v]').forEach(b => { const v = b.dataset.fstV, n = vs.filter(r => r.status === v).length; b.setAttribute('aria-pressed', String(state.st.has(v))); b.querySelector('em').textContent = n; b.classList.toggle('z', !n); });
        $('#tl-from').value = state.from; $('#tl-to').value = state.to;
        const vv = new Set(view().map(r => r.id));
        root.querySelectorAll('.sq').forEach(q => q.classList.toggle('off', !vv.has(+q.dataset.id)));
        root.querySelectorAll('.sday').forEach(b => b.setAttribute('aria-pressed', String(state.from === state.to && state.from === b.dataset.day)));
      }

      function renderStrip() {
        const mx = Math.max(1, ...days.map(d => rows.filter(r => r.d === d).length));
        const strip = $('[data-strip]'); strip.style.setProperty('--n', days.length); strip.style.setProperty('--mx', mx);
        strip.innerHTML = days.map((d, i) => {
          const rs = rows.filter(r => r.d === d).sort((a, b) => a.key < b.key ? -1 : 1);
          const mo = i === 0 || d.endsWith('-01'), due = meta.dueDay && +d.slice(8) === meta.dueDay;
          return `<button type="button" class="sday${mo ? ' mo' : ''}${due ? ' due' : ''}" data-day="${d}" aria-pressed="false" aria-label="${fd(d)}, ${plural(rs.length, 'communication')}${due ? ', EMI due date' : ''}. Filter to this day."><span class="sq-wrap">${rs.map((r, j) => `<span class="sq" data-bar data-axis="y" data-id="${r.id}" data-s="${r.status}" style="--d:${(0.25 + i * 0.035 + j * 0.06).toFixed(2)}s" title="${CH[r.ch].label}, ${r.status}, ${hm(r.t)}"></span>`).join('')}</span><span class="sd" data-m="${MON[+d.slice(5, 7) - 1]}">${d.slice(8)}</span></button>`;
        }).join('');
      }

      function trailHTML(r) {
        const live = r.ch === 'voice' || r.ch === 'ivr', dv = live ? 'Call connected' : 'Delivered';
        const L = [];
        L.push(['idle', r.status === 'Suppressed' ? 'Scheduled' : 'Triggered', r.t, '']);
        if (r.del) {
          L.push(['info', dv, r.del, off(r.lat)]);
          if (!live && r.ch !== 'sms' && r.ch !== 'push' && r.ch !== 'popup') L.push([r.read ? 'ok' : 'skip', r.read ? 'Read' : 'Not read yet', r.read || '', r.read ? off(sec(r.read) - sec(r.del)) : '']);
          else if (r.status === 'Read') L.push(['ok', 'Read', r.read, off(sec(r.read) - sec(r.del))]);
          L.push([r.click ? 'ok' : 'skip', r.click ? r.action + ' opened' : r.action + ' not opened', r.click || '', r.click ? off(sec(r.click) - sec(r.del)) : '']);
        } else if (r.status === 'Failed') L.push(['bad', 'Failed, no delivery receipt', '', '']);
        else if (r.status === 'Expired') L.push(['warn', 'Expired before delivery', '', '']);
        else L.push(['idle', 'Held back, never sent', '', '']);
        return '<ol class="trail" aria-label="Message trail">' + L.map(x => `<li data-k="${x[0]}"><i></i><span>${x[1]}</span>${x[2] ? `<small><span class="t">${x[2]}</span>${x[3] ? ' · ' + x[3] : ''}</small>` : '<small></small>'}</li>`).join('') + '</ol>';
      }

      function itemHTML(r, idx, anim) {
        const open = state.open.has(r.id), cls = r.status.toLowerCase();
        const why = r.status === 'Suppressed' ? 'Held back by the contact-window rule. Not an error, nothing was sent.' : r.reason || '';
        const lat = r.lat != null ? r.lat + 's to deliver' : (r.status === 'Suppressed' ? 'not sent' : 'no delivery');
        const live = r.ch === 'voice' || r.ch === 'ivr';
        return `<li class="${anim ? 'anim ' : ''}item${open ? ' open' : ''}" data-id="${r.id}" style="--dl:${anim.dl(idx)}s">
  <div class="nd stc ${r.status === 'Failed' ? 'bad' : ''}" data-ch="${r.ch}" title="${CH[r.ch].label}">${CH[r.ch].ico}</div>
  <div class="box ${cls}"><button class="hd" type="button" aria-expanded="${open}" aria-controls="d${r.id}">
    <span><span class="ttl">${esc(r.tpl)}</span><span class="meta"><span class="tm">${hm(r.t)}</span><span>${CH[r.ch].label}</span>${meta.overdueSince ? '<span>' + r.dpd + ' DPD</span>' : ''}<span>${r.tid}</span></span>${why ? '<div class="why">' + esc(why) + '</div>' : ''}</span>
    <span class="rt">${chip(r.status)}<span class="lat">${lat}</span></span>
    <span class="chev" aria-hidden="true">${sv('<path d="M6 9l6 6 6-6"/>')}</span></button>
  <div class="dtl" id="d${r.id}" role="region" aria-label="Details for ${esc(r.tpl)}"><div><div class="dg">
    <div class="stc" data-ch="${r.ch}"><p class="flb">Message preview, from the template</p><div class="msg">${esc(msgText(r, meta))}</div>
      <div class="kv"><div><span>Template</span><b>${r.tid}</b></div><div><span>Campaign</span><b>${esc(r.camp)}</b></div><div><span>Overdue day</span><b>${meta.overdueSince ? 'Day ' + r.dpd + ' past due (due ' + fds(meta.overdueSince) + ')' : 'Not overdue'}</b></div><div><span>${live ? 'Time to connect' : 'Delivery time'}</span><b>${r.lat != null ? r.lat + ' seconds' : 'None, ' + (r.status === 'Suppressed' ? 'not sent' : 'not delivered')}</b></div><div><span>Linked action</span><b>${esc(r.action)}${r.del ? (r.click ? ', opened' : ', not opened') : ''}</b></div><div><span>Sent</span><b>${fd(r.d)}, ${r.t} IST</b></div></div></div>
    <div><p class="flb">What happened</p>${trailHTML(r)}</div></div></div></div></div></li>`;
      }

      function renderList(mode) {
        const vs = view(), host = $('[data-list]');
        if (!vs.length) {
          const none = !rows.length;
          host.innerHTML = `<div class="empty">${sv('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3.5 8l8.500 6 8.500-6M4 20L20 4" stroke-dasharray="1 0"/>')}<h4>${none ? 'Nothing to show for this loan' : 'No communications match these filters'}</h4><p>${none ? 'This loan is closed. Its last communication went out ' + loan.last + ', which is before the ' + fds(W0) + ' to ' + fds(W1) + ' window.' : 'Try a wider date range, or clear a channel or status.'}</p>${none ? '' : '<button class="btn btn-primary" type="button" data-reset>Reset filters</button>'}</div>`;
          root.querySelector('[data-expand]').disabled = true; return;
        }
        root.querySelector('[data-expand]').disabled = false;
        const anim = mode === 'fresh' ? { dl: i => (0.7 + Math.min(i, 16) * 0.09).toFixed(2) } : { dl: i => (Math.min(i, 12) * 0.035).toFixed(2) };
        const noFilter = !state.ch.size && !state.st.size;
        let html = '', lastD = null, idx = 0;
        const groups = []; vs.forEach(r => { const g = groups[groups.length - 1]; if (g && g.d === r.d) g.rs.push(r); else groups.push({ d: r.d, rs: [r] }); });
        // audit gap: days inside the run of overdue reminders with no reminder sent
        const odDays = new Set(rows.filter(r => /^TPL-OD/.test(r.tid)).map(r => r.d)), odMin = [...odDays].sort()[0], odMax = [...odDays].sort().pop();
        groups.forEach((g, gi) => {
          const dpd = meta.overdueSince ? Math.max(0, dayDiff(g.d, meta.overdueSince)) : null;
          html += `<li class="anim day" style="--dl:${anim.dl(idx)}s"><div class="dm"><i></i></div><div class="dt"><b>${wd(g.d)} ${fd(g.d)}</b>${dpd != null ? `<span class="chip" data-tone="${dpd ? 'bad' : ''}">${dpd} DPD</span>` : ''}<span class="m">${plural(g.rs.length, 'communication')}</span></div></li>`;
          g.rs.forEach(r => { html += itemHTML(r, idx++, anim); });
          if (noFilter && odMin && g.d > odMin && g.d < odMax && !odDays.has(g.d)) {
            const n = dayDiff(g.d, meta.overdueSince);
            html += `<li class="anim gap" style="--dl:${anim.dl(idx++)}s"><div class="nd gapn" aria-hidden="true">${sv('<path d="M12 8v5M12 16.5h.01"/>')}</div><div class="gp"><b>No overdue reminder went out on Day ${n}.</b> The Day ${n - 1} and Day ${n + 1} reminders did, so this day is a gap in the cadence.</div></li>`;
          }
        });
        host.innerHTML = '<ol class="tl ' + (mode === 'fresh' ? 'fresh' : '') + '" aria-label="Communications, newest first">' + html + '</ol>';
        syncExpandLabel();
      }
      function syncExpandLabel() {
        const its = root.querySelectorAll('.item'), all = its.length && [...its].every(i => i.classList.contains('open'));
        $('[data-expand]').textContent = all ? 'Collapse all' : 'Expand all';
      }

      function setLoan(l, first) {
        loan = l; meta = metaFor(l, CU); rows = decorate(meta.rows, meta);
        Object.assign(state, { from: W0, to: W1 }); state.ch.clear(); state.st.clear(); state.open.clear();
        renderLoan(); renderFilters(); renderStrip(); renderList('fresh'); updateStats(first);
        Anim.scan(root);
      }

      const refresh = () => { syncFilters(); renderList('filter'); updateStats(false); };

      root.addEventListener('click', e => {
        const t = e.target, q = s => t.closest(s);
        if (q('[data-soon]')) { ctx.toast('Not part of this prototype yet'); return; }
        if (q('[data-other]')) { ctx.openLanPicker(CU, q('[data-other]')); return; }
        if (q('[data-loan]')) { const l = loans[+q('[data-loan]').dataset.loan]; if (l !== loan) { setLoan(l, false); if (CU) ctx.selection = { customer: CU, lan: l }; } return; }
        if (q('[data-fch-v]')) { const v = q('[data-fch-v]').dataset.fchV; state.ch.has(v) ? state.ch.delete(v) : state.ch.add(v); refresh(); return; }
        if (q('[data-fst-v]')) { const v = q('[data-fst-v]').dataset.fstV; state.st.has(v) ? state.st.delete(v) : state.st.add(v); refresh(); return; }
        if (q('[data-reset]')) { Object.assign(state, { from: W0, to: W1 }); state.ch.clear(); state.st.clear(); refresh(); return; }
        if (q('[data-day]')) { const d = q('[data-day]').dataset.day, same = state.from === d && state.to === d; state.from = same ? W0 : d; state.to = same ? W1 : d; refresh(); return; }
        if (q('[data-expand]')) {
          const its = [...root.querySelectorAll('.item')], all = its.every(i => i.classList.contains('open'));
          its.forEach(i => { i.classList.toggle('open', !all); i.querySelector('.hd').setAttribute('aria-expanded', String(!all)); all ? state.open.delete(+i.dataset.id) : state.open.add(+i.dataset.id); });
          syncExpandLabel(); return;
        }
        const hd = q('.hd');
        if (hd) { const li = hd.closest('.item'), on = li.classList.toggle('open'); hd.setAttribute('aria-expanded', String(on)); on ? state.open.add(+li.dataset.id) : state.open.delete(+li.dataset.id); syncExpandLabel(); }
      });
      root.addEventListener('change', e => {
        const el = e.target; if (el.id !== 'tl-from' && el.id !== 'tl-to') return;
        const clamp = v => !v ? null : v < W0 ? W0 : v > W1 ? W1 : v;
        const v = clamp(el.value);
        if (el.id === 'tl-from') { state.from = v || W0; if (state.from > state.to) state.to = state.from; }
        else { state.to = v || W1; if (state.to < state.from) state.from = state.to; }
        refresh();
      });

      setLoan(loan, true);
      return () => { handles.forEach(h => h && h()); cleanups.forEach(f => f()); };
    }
  };
})();
