/* Shared data. Screens may extend: DATA.timeline = {...}, DATA.rule = {...} at the top of their own file. */
window.LOGO_SRC = "__LOGO_DATA_URI__"; // replaced by build.py with assets/logo.png (user-supplied logo)
window.DATA = {
  product: 'DMS Collections',
  subtitle: 'Customer Communications Audit',
  customer: {
    name: 'Rajesh Kumar Iyer', initials: 'RK', cif: 'CIF-7742019', city: 'Chennai',
    segment: 'Prime', kyc: 'Verified', loans: 3,
    consent: [
      { ch: 'SMS', opted: true }, { ch: 'WhatsApp', opted: true }, { ch: 'Email', opted: true },
      { ch: 'Push', opted: false }
    ],
    dnd: 'Not registered'
  },
  // Overview KPIs as shown in the original prototype (see the "known data issues" below)
  kpis: { deliveryRate: 94.9, totalComms: 291, failed: 15, activeLans: 2, totalLans: 3, avgLatencySec: 9 },
  loans: [
    { lan: 'LAN-HL-2019-004417', type: 'Home Loan',        status: 'Overdue', dpdLabel: '34 DPD',  outstanding: 3842650, comms: 142, rate: 93.7, failed: 9, last: '21 Oct 2026, 06:42' },
    { lan: 'LAN-PL-2024-118203', type: 'Personal Loan',    status: 'Active',  dpdLabel: 'Current', outstanding: 286400,  comms: 61,  rate: 96.7, failed: 2, last: '19 Oct 2026, 09:15' },
    { lan: 'LAN-TW-2022-071954', type: 'Two-Wheeler Loan', status: 'Closed',  dpdLabel: 'Current', outstanding: 0,       comms: 88,  rate: 95.4, failed: 4, last: '02 Aug 2025, 11:20' }
  ]
  /* Known data issues in the original (fixed here, list them in the final report):
     - Personal Loan rate printed 97.1% but 59/61 = 96.7% (we use 96.7).
     - Banner "3 failed" vs KPI 15 failed (KPI is portfolio-wide, 9+2+4 = 15; the 3 belongs to the selected LAN timeline).
     - Per-loan comms 142+61+88 = 291 matches the KPI.  Delivery 94.9% is the weighted result. */
};
