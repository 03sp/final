# BRD guidance for the prototype

Source: Communication Governance & Audit Trail BRD v1.3 (draft, 11 Nov 2026). Section numbers below are the BRD heading numbers (the BRD's own list numbering restarts oddly, so "§4 step 3" means the third step of the §4 flow). Screens read: intro, login, overview, timeline, config (config.js read mid-build).

Headline: the BRD covers delivery, customer statuses, global thresholds, evidence and matching. It does not define per-channel day/week/month caps, a time window, DLT, cool-off, escalation, a channel sequence or a simulator. Most of the Rule configuration screen is therefore prototype invention. Keep it if the demo wants it, but label it as illustrative.

## 1. What each screen should reflect, and the BRD's words

**Overview (customer in User 360): §6, §6.1-6.3, §3, §5, §9, §13, §21**
- Channels: SMS, Email, WhatsApp, Push Notification, Telephony (§2, §5). Evidence types: bot conversations (§14) and physical letters (§16).
- Delivery statuses, in order: Queued, Submitted, Accepted, Sent, Delivered, Read, Failed, Bounced, Expired, Rejected (§5).
- Customer Communication Status values: DNC, Opted Out, Death, Legal Hold, Settlement, VIP, Escalated, Communication Hold, Other Restricted (§6.2). Several can be active at once. User 360 shows current active statuses only, read-only, with a last-checked timestamp. Empty state copy: "No Active Communication Restriction".
- Consent (§6.1): consent by channel, preferred channel, preferred language, preferred contact days/time, time zone, communication-purpose permission, each with effective_from and optional effective_to. Consent never overrides an active status (§6.3).
- Any active status blocks every outbound message, transactional included (§6.3, §17).
- Masking: mobile and email are masked unless the user has unmasking access (§22). Every search, evidence access and export is audit logged.

**Timeline (one LAN): §5, §5.1, §7, §10, §12-§15, §17**
- Each row has one communication_id and one ledger record. Search is by Campaign Name and Campaign ID (§5). The expandable event history is append-only. The current status is the event with the latest status_ts, and ties go to the event received last (§5).
- Metrics: provider latency = delivered_ts - submitted_ts; end-to-end latency = delivered_ts - queued_ts; both blank until a Delivered event (§5).
- read_ts is blank unless the provider returns a valid read receipt (§5).
- Failure categories (§5.1), defined list: Customer Communication Restriction, Customer Threshold Exceeded, LAN Threshold Exceeded, Content Compliance Failure, Provider Rejection, Provider Delivery Failure, Invalid Recipient, Internal Processing Failure, Other Configured Failure.
- Blocked sends (§6.3, §7) show as Failed with a category, are never submitted to a provider, and use no threshold count. A threshold block carries blocked_flag = true.
- Decision evidence kept per send (§17): consent result, active statuses, restriction references, threshold results, cap_rule_id values, transactional classification, outcome, reasons, evaluation timestamp.

**Rule configuration: §7, §18, §19, §3, §6.3, §17, §8**
- Only global thresholds exist (§7). Window: hours, days or months; rolling or calendar. Scope: Customer plus every linked LAN. Product, channel, campaign and customer overrides are "not required".
- Counting: the message that reaches the cap is allowed and the next is blocked. A count is consumed only after provider submission is confirmed. Transactional messages bypass thresholds (override_reason = "Transactional Communication"). Multi-LAN sends add one Customer count and one count per linked LAN.
- Fields: cap_limit, period, threshold_scope, cap_rule_id, mandatory effective_from, optional effective_to.
- Maker-checker (§18): Global Threshold Maker and Global Threshold Checker (RACI §19: Maker responsible, Checker accountable, Operations/Compliance consulted, Campaign Owners informed). A maker cannot approve their own request. A pending change does not replace the active approved rule. Approval takes effect on effective_from. Rejection needs a mandatory reason. Submit, approve, reject, activate, turn off and expire are all audited.
- Campaign Maker/Checker handle campaign status restrictions and campaign classification, including Transactional.
- Content compliance is a CCOE check through an Azure Boards ticket (§8), not an in-platform engine.

## 2. Mismatches with the current screens

| # | Screen / element | Shows | BRD says |
|---|---|---|---|
| 1 | timeline.js, `STATUSES` and the status filter chips and tiles | Read, Delivered, Failed, Expired, Suppressed | Ten statuses (§5). "Suppressed" does not exist. A blocked send is Failed plus a category (§6.3, §7). |
| 2 | timeline.js, rows tagged Suppressed ("Outside permitted contact window"), "Held back, never sent" trail, excluded from rate | Neutral hold, not counted as failed | BRD has no contact-window rule. Real blocks are Failed with Customer Communication Restriction or a threshold category. Failed counts must include them. |
| 3 | timeline.js, `trailHTML` | Triggered, Delivered or "Call connected", Read, link opened | Queued, Submitted, Accepted, Sent, Delivered, Read (§5), with timestamps and reason codes. "Link opened" and Action engagement are not in the BRD. |
| 4 | timeline.js, latency copy "Ns to deliver" and the avg latency tile | One latency from trigger | Two metrics (§5): provider and end-to-end. |
| 5 | timeline.js, `CH` (popup, voice, ivr) and overview.js, Push consent and `data-ch=Push` | "In-app pop-up", "Voice", "IVR", "Push" | Channels are SMS, Email, WhatsApp, Push Notification, Telephony. Pop-up has no BRD basis. Voice and IVR belong under Telephony. |
| 6 | timeline.js, failure `reason` text ("Device token unregistered", "Operator timeout") | Free text only | Each Failed row needs a category (§5.1) plus detailed reason, with provider code kept. |
| 7 | timeline.js, "Not read yet" on Email/WhatsApp | Implies unread | Blank read_ts means no valid receipt, not "unread" (§5). |
| 8 | overview.js, consent card ("Opted in/out", DND registry, NCPR) | Per-channel opt-in only | Status block (§6.2), effective dates, preferred channel/language/time (§6.1). "Opted Out" and "DNC" are statuses that block all channels. Missing last-checked timestamp. |
| 9 | overview.js, "Channels open" chip, Push "Opted out" | Consent-level Push opt-out | Channel consent is distinct from the "Opted Out" status. The UI blurs the two (see section 4). |
| 10 | config.js, section B per-channel Max/Day, Max/Week, Max/Month, Min gap, Max unanswered | Six channel rows | Global thresholds only, no channel overrides (§7). Periods are hours, days, months. No weekly, min-gap or unanswered counters. |
| 11 | config.js, `CH` includes Voice, IVR, Field visit; footer "Channels covered" | Six channels | Field visit is not a BRD channel. IVR and Voice are Telephony. Push Notification is covered but has no row. |
| 12 | config.js, section A: product, DPD from/to, lifecycle stage, category | Rule scoping | Product-, campaign- and customer-specific overrides are not required (§7). Classification is a Campaign Maker/Checker activity (§18). |
| 13 | config.js, section B: escalation action, channel sequence | "Next channel in sequence" | Fallback channel is "not required" (§5). Queue order is a technology decision (§4, §7). |
| 14 | config.js, section C: time window, days, holidays, customer override, RBI 08:00-19:00 | Enforced window and validation | No window rule in the BRD. Preferred contact time is a customer preference that cannot override restrictions or thresholds (§6.1). |
| 15 | config.js, section D: DND scrubbing, Explicit consent, DLT check, Sensitive-event suppression, Call recording required, Opt-out cool-off | Rule toggles | DND, Death, Legal Hold and similar are backend-fed, read-only statuses that always apply (§6.2). Consent is per customer. DLT and cool-off are absent. Content compliance is CCOE via Azure Boards (§8). |
| 16 | config.js, section E simulation | Simulator | Not in the BRD. |
| 17 | config.js, Draft to "Pending approval", Deactivate, Clone, footer "Maker" | Single-step submit | Needs named personas, a Checker who is not the maker, a mandatory reject reason, effective_from gating and "active rule stays live while pending" (§18). BRD says "turn off", not "Deactivate". |
| 18 | config.js and shell, footer "retention 24 months", "freshness 2 min" | Hard numbers | Retention is configurable by channel and product with a global default, counted from the latest lifecycle event (§5, §22). Freshness is not specified. |
| 19 | timeline.js, header links "Chat Sessions Archive", "Complaint & Escalation" | Links only | Use BRD names: bot sessions (§14) and complaint/escalation linkage (§13). |

## 3. Features with no screen, ranked for a demo

1. **Missing trail / record matching (§12).** Add a per-row badge and a campaign counter strip on Timeline. Badges: Matched, Pending Partner Data, Missing Partner Data, Missing Record, Duplicate Record, Unmatched Partner Data, Status Mismatch. Seed one Pending and one Missing row; missing data is never shown as Delivered or Failed.
2. **AI 30-day summary (§9).** On Overview, add a "Generate summary" button. It is on demand only, not auto-run. The result card shows unresolved commitments and an intent-to-pay line, a read-only note and a "newer activity, refresh" hint.
3. **Complaint linkage (§13).** On a Timeline row, add a "Linked cases" chip with case_id, state, owner and priority, plus an "Automatic" or "Manually confirmed" tag. Add a "Suggested links" tray using the window of 30 days before to 7 days after case creation, with a Confirm button.
4. **Decision evidence panel (§17, §6.3).** In the expanded row, show consent result, active statuses, cap_rule_id, threshold result (count against cap), transactional yes/no and evaluation time. This makes Failed with "Customer Threshold Exceeded" explain itself.
5. **Voice recording and transcript (§10).** On a Telephony row, show a call_id plus separate Play recording and View transcript buttons gated by role. "Not available" still leaves the call record visible.
6. **Compliance pre-check status (§8).** On Rule configuration or a campaign chip, show "Content verified by CCOE, Azure Boards ticket" with ticket state. Never describe it as automated.
7. **Active status chips with last-checked time (§6.2).** Overview: chips for active statuses with an empty state of "No Active Communication Restriction".
8. **Email thread and view-only attachment (§15), bot session transcript (§14), letter documents (§16).** Lower priority. Attachments are view-only with no download.
9. **Search (§11).** Criteria joined by AND, values within one criterion by OR. Keyword search covers message and transcript text.

## 4. Conflicts and ambiguities (not resolved here)

1. **Threshold block naming.** §5.1 lists two categories, "Customer Threshold Exceeded" and "LAN Threshold Exceeded". §7 says one failure reason, "Communication Threshold Exceeded". §6.3 uses category "Customer Communication Restriction" for status blocks. Is it a category or a reason, and one value or two?
2. **Two failure category lists (§5.1).** Nine defined categories and eleven "illustrative" ones, overlapping (Invalid Recipient appears in both). Bounce and Expiry are also lifecycle statuses. It is unclear whether Bounced, Expired and Rejected need a category, which is why the prototype's "Expired" is not safely a BRD concept.
3. **Weekly caps.** §7 prose says hours, days, months. The field table says hourly, daily or monthly. The prototype's weekly cap has no support.
4. **"Never exceed" vs "count after submission" (§4, §7).** Counts are consumed only after provider confirmation, yet caps must never be exceeded. In-flight sends are left to a technology design.
5. **Status maintenance.** §3 gives a Global Restriction Maker/Checker who can "create, approve, schedule and turn off" statuses (and §18, §19 match). §6.2 says statuses are backend-maintained and read-only in User 360. Where does that UI live, and does it belong in this prototype's Rule configuration?
6. **Which statuses block transactional.** §6.3 blocks everything for any active status, including VIP, Escalated and Settlement. Whether a VIP flag should stop all transactional messages is a business question.
7. **"Opted Out" status vs channel consent.** Both exist (§6.1, §6.2). The precedence for channel opt-out versus the status is not stated.
8. **Time window.** Preferred contact time is stored (§6.1) but no rule says whether sends must respect it, or any regulatory window.
9. **Unknown provider codes are ignored (§5, §17)** while mapping is out of scope. An ignored code could surface as Missing Partner Data after the one global waiting period, whose length is not given (§12). Partner Data Completeness is "to be baselined" (§21).
10. **Campaign restrictions vs "global" scope.** §6.3 is titled Global and Campaign Applicability, but its text only describes global blocking. §3 and §18 add Campaign-specific restrictions without saying how they combine.
11. **§4 flow order.** Thresholds (step 4) come before CCOE verification (step 5), but CCOE approval happens at content-approval time, not per send. The sequence is not a runtime order.
12. **Attachment access.** §15 says any User 360 user can view attachments with no separate permission. §22 says access to recordings, transcripts and exports is role-based.
