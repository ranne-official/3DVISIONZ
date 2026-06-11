# BLUEPRINT TO BUILDER SUMMIT — Integrations & Automations Spec
**3D VISIONZ · Mike Jenkins · Ticket Funnel (summit.html)**
Payment processor: **Square** (native in GHL order forms). HTO is **off this page** (pitched Day 4, July 10).

> These items are platform configuration (GHL / Square / Zapier / ManyChat / ClickUp) — they can't live in static HTML. This doc is the build-ready spec for whoever configures the stack. The page, checkout form, and thank-you pages are already wired to match the field names and tier params below.

---

## CONFIRMED FACTS (build to these)
- **Dates:** July 7, 8, 9, 2026 (Tue/Wed/Thu). Main sessions **8 PM EST**; **VIP Q&A 7 PM EST** (1 hr before each).
- **HTO pitch:** Day 4 — July 10 (Fri). **HTO cart July 10 → 17, closes midnight.** (Not on this page.)
- **Tiers (high→low):** Platinum **$497**, VIP **$97**, GA **$27**.
- **Free feeder:** New Construction Masterclass at `3d-visionz.com/opt-in`.
- **Payment:** Square, connected natively in GHL order forms.

## ⚠️ OPEN — confirm before lock (owners: Mike + Kelli)
- GA price **$27 vs free** (gates checkout build — see "GA = free" toggle below).
- Brand colors — STYLE LOCK currently **emerald / gold / cream**. Holds until confirmed.
- Exact **VIP / Platinum inclusions** (Offer Stack 1-pager not loaded) → `[SWAP]` in checklist.
- **Fast-action bonus** for Urgency Bar 1 → `[will send]`.
- **Emcee** (Shaky or David) → emcee card `[SWAP]`.
- **Order bump** (name + price) → `[SWAP]` on checkout.

---

## PRODUCTS (Square, via GHL order form)
| Product | Price | Tier param (checkout URL) | Thank-you |
|---|---|---|---|
| GA | $27 | `summit-checkout.html?tier=ga` | `summit-ty-ga.html` |
| VIP | $97 | `summit-checkout.html?tier=vip` | `summit-ty-vip.html` |
| Platinum | $497 | `summit-checkout.html?tier=platinum` | `summit-ty-platinum.html` |
| Order bump | $[SWAP] | checkbox on checkout | — |

**GA = free toggle:** if GA is set to free, swap the GA product for a GHL form (no Square charge), keep the same `buyer_ga` tag + `summit-ty-ga.html`, and skip the payment trigger for GA only. Everything else identical.

---

## TAGS
**Pageview:** `b2b_pageview`
**Buyer (per tier):** `b2b_buyer_ga` · `b2b_buyer_vip` · `b2b_buyer_platinum`
**Cart abandon:** `b2b_cart_abandon`
**Order bump:** `b2b_bump` *(when confirmed)*
**Phase routing (Day 4):** `b2b_hto_eligible` (set on any ticket buyer at HTO open)

---

## WORKFLOW 1 — Square → GHL (native)
**Trigger:** GHL **Payment Received** (native, fires from the Square-connected order form).
1. Create/update contact (name, email, phone, billing).
2. Add tier tag (`b2b_buyer_<tier>`) from the order's `tier` field.
3. Remove `b2b_cart_abandon` if present.
4. Enroll in **Workflow 5** (tier welcome sequence).
5. Fire downstream: Slack (W2), Zoom sync (W3), Telegram (W4), ClickUp (W7).

## WORKFLOW 2 — Square sale → Slack
**Trigger:** Payment Received. **Action:** Zapier or GHL webhook → post to the **3D VISIONZ ops** Slack channel: `New {tier} sale — {first_name} {last_name} · ${price}`.

## WORKFLOW 3 — Zoom Webinar → GHL (Zapier)
**Trigger:** Payment Received (buyer tag added). **Action:** Zapier registers the buyer in the Zoom Webinar; Zoom returns the unique join link → write to contact field `zoom_join_url`; used in reminders.

## WORKFLOW 4 — GHL → Telegram auto-invite
**Trigger:** tag `b2b_buyer_vip` OR `b2b_buyer_platinum` (tiers that include chat).
**Action:** send the tier-appropriate Telegram invite link (VIP chat vs Platinum chat). GA does not receive an invite.

## WORKFLOW 5 — Tier welcome sequence (email + SMS)
**Trigger:** `b2b_buyer_<tier>` added. Branch by tier:
- **GA:** confirm Zoom access + community; soft VIP upgrade (adds Rick Ross Q&A).
- **VIP:** confirm Zoom + VIP Q&A (7 PM) + Rick Ross Q&A + workbook/Telegram; Platinum upgrade band.
- **Platinum:** confirm everything + bonuses + Telegram; no upsell.
All branches: deliver Zoom link, calendar invite (.ics), community link.

## WORKFLOW 6 — Abandon cart (email + SMS) — 2-STEP CAPTURE
The checkout is a **2-step order form**. Step 1 (name/email/phone) is the **cart START**;
Step 2 is the Square payment. Capturing contact on Step 1 is what makes abandon-cart possible.
- **Build:** use GHL's native **2-Step Order Form**. Completing Step 1 creates/updates the
  contact *before* payment. On Step 1 submit → add `b2b_cart_abandon` + fire FB **Lead** (CAPI).
- **Trigger:** has `b2b_cart_abandon` AND **no** Payment Received in 45 min.
- **Sequence:** Email #1 (45 min) → SMS (4 hr) → Email #2 (24 hr, scarcity).
- **Exit:** on Payment Received (Workflow 1 also removes `b2b_cart_abandon`).
> The static page mirrors this: Step 1's "Continue to Payment" runs `captureCartStart()`
> (pushes a `cart_start` dataLayer event) before revealing Step 2. Wire that hook to the
> GHL form-step / pixel on the live build. (The phone select submits `phone_country`; the
> page concatenates it with the number for E.164-style storage.)

## WORKFLOW 7 — GHL → ClickUp
**Trigger:** Payment Received. **Action:** create a fulfillment task in ClickUp (buyer name, tier, email) for delivery/QA.

## WORKFLOW 8 — Per-night reminders
**Trigger:** any `b2b_buyer_*`. Scheduled sends each summit day:
- VIP/Platinum: 6:30 PM EST (VIP Q&A at 7) + 7:45 PM EST (main at 8).
- GA: 7:45 PM EST (main at 8).
- Each reminder includes the **backup Zoom link** (`zoom_join_url` + fallback).
Repeat for July 7, 8, 9.

## WORKFLOW 9 — Day 4 → route to HTO flow
**Trigger:** date = July 10 AND contact has any `b2b_buyer_*`.
**Action:** add `b2b_hto_eligible`, enroll in the **HTO flow** (separate funnel; not on this page). HTO cart July 10→17, closes midnight July 17.

## ManyChat (Craig's bot) → GHL
Keyword captures pass tags into GHL and auto-reply the correct funnel link **per phase** (pre-summit = ticket page; Day 4+ = HTO page). Map each keyword → tag → reply link in ManyChat; GHL receives the tag via the ManyChat↔GHL integration.

## FB Ads → GHL
Pixel + **Conversions API** for **Lead** (checkout start / opt-in) and **Purchase** (Payment Received, value = tier price). Dedupe with event IDs.

---

## COUNTDOWN TIMERS
1. **Summit start** — on the ticket page (`summit.html`), target **2026-07-08T00:00:00Z** (= July 7, 8 PM EDT). Already live via `data-countdown` on `#cd`.
2. **HTO cart close** — separate timer to **July 17, 2026 midnight** for the HTO flow (build on the HTO pages, not this page). Target `2026-07-18T03:59:00Z` (≈ midnight EDT July 17→18 — confirm exact close TZ).

---

## INTERNAL PLAYS (keep OUT of public copy — already invisible on page)
Platinum top-tier anchor · VIP most-popular decoy · Rick Ross association as the upgrade lever (GA→VIP) · hard cart close + top-bar fast-action bonus · proof hierarchy (mansion → Cam → day-of $6,500 close) · all payment options visible.
