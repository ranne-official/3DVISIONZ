# SECTION 4 — GHL AUTOMATION BLUEPRINT
**Blueprint to Builder Summit · Mike Jenkins · 3D VISIONZ**
Build these as GHL Workflows. Email template names map to **Section 2**; page names map to the funnel site.

---

## FUNNEL FLOW (overview)
1. Landing Page → GA/VIP Purchase
2. GA Purchase → Platinum Upsell → Platinum Confirmation **OR** GA Confirmation
3. VIP Purchase → Platinum Upsell → Platinum Confirmation **OR** VIP Confirmation
4. Summit Ends → HTO Application → Application Accepted → Deposit Page → Deposit Confirmation
5. HTO Declined → $2K Downsell
6. GA Non-Buyers → $97 Replay

### Page map
| Step | Page file |
|------|-----------|
| Registration | `index.html` |
| Platinum upsell | `platinum-upsell.html` (`?from=ga` / `?from=vip`) |
| GA confirmation | `ga-confirmation.html` |
| VIP confirmation | `vip-confirmation.html` |
| Platinum confirmation | `platinum-confirmation.html` |
| HTO application | `hto-application.html` |
| Application congrats | `application-congrats.html` |
| HTO deposit | `hto-deposit.html` |
| Deposit confirmation | `deposit-confirmation.html` |
| $2K downsell | `downsell.html` |
| $2K thank you | `downsell-thankyou.html` |
| $97 replay | `replay.html` |

---

## WORKFLOW 1 — REGISTRATION & TICKET PURCHASES

### Trigger: GA Purchase ($27)
1. **Add tags:** `summit_registered`, `ticket_ga`, `paid_27`
2. **Send email:** "GA Registration Confirmation" — delay: immediate
3. **Redirect** to Platinum Upsell Page (`platinum-upsell.html?from=ga`)
   - If "Upgrade to Platinum" → **Workflow 2**
   - If "No thanks" → send to GA Confirmation Page

### Trigger: VIP Purchase ($97)
1. **Add tags:** `summit_registered`, `ticket_vip`, `vip_qa_access`, `paid_97`
2. **Send email:** "VIP Registration Confirmation" — delay: immediate
3. **Redirect** to Platinum Upsell Page (`platinum-upsell.html?from=vip`)
   - If "Upgrade to Platinum" → **Workflow 2**
   - If "No thanks" → send to VIP Confirmation Page

---

## WORKFLOW 2 — PLATINUM UPGRADE PATH

### Trigger: Platinum Purchase from GA ($297 total)
1. **Remove tag:** `ticket_ga`
2. **Add tags:** `ticket_platinum`, `houston_meetup`, `vip_qa_access`, `platinum_priority`, `paid_297`
3. **Send email:** "Platinum Confirmation" — delay: immediate
4. **Redirect** to Platinum Confirmation Page
5. **Internal task:** "Call {First Name} within 24 hours to confirm Houston attendance" → assign to `[Team Member]`

### Trigger: Platinum Purchase from VIP ($297 total)
1. **Remove tag:** `ticket_vip`
2. **Add tags:** `ticket_platinum`, `houston_meetup`, `platinum_priority`, `paid_297` *(keep `vip_qa_access`)*
3. **Send email:** "Platinum Confirmation" — delay: immediate
4. **Redirect** to Platinum Confirmation Page
5. **Internal task:** "Call {First Name} within 24 hours to confirm Houston attendance" → assign to `[Team Member]`

---

## WORKFLOW 3 — COUNTDOWN & EVENT REMINDERS

**Trigger:** Contact has tag `summit_registered`
1. **Wait until** June 30 (7 days before)
2. **Send** "7 Days to Go" email
3. **Wait until** July 7, 6 PM EST
4. **If/Else:**
   - IF tag `vip_qa_access` → send VIP reminder (7 PM session)
   - ELSE → send GA reminder (8 PM session)
5. **Repeat** step 3–4 for Day 2 (July 8) and Day 3 (July 9)

---

## WORKFLOW 4 — HTO APPLICATION & ENROLLMENT

**Trigger:** Application Submitted (`hto-application.html` form)
1. **Add tag:** `hto_application_submitted`
2. **Send email:** "Application Submitted" — delay: immediate
3. **Internal task:** "Review {First Name}'s application within 24 hours" → assign to `[Sales Team]`
4. **Manual review & approval**
5. **If APPROVED:**
   - Add tag: `hto_application_approved`
   - Send email: "Application Approved — Secure Your Spot" (links to `hto-deposit.html`)
6. **If DEPOSIT PAID ($2,000 or $5,000):**
   - Add tags: `hto_enrolled`, `site_tour_aug7`, `paid_deposit`
   - Send "Deposit Confirmation" email
   - Redirect to Deposit Confirmation Page

---

## WORKFLOW 5 — $2K DOWNSELL PATH

**Trigger:** Did NOT submit HTO application OR application declined
1. **Wait until** July 11, 10 AM EST
2. **Send** "Thank You + Starter Pack Offer" email
3. **Wait** 3 days
4. **Send** "$500 Gets You Started" email
5. **Wait** 3 days
6. **Send** "Last Call — Closes Tonight" email
7. **If PURCHASED:**
   - Add tags: `starter_pack_2k`, `site_tour_aug7`
   - Send "$2K Welcome" email (→ `downsell-thankyou.html`)

---

## WORKFLOW 6 — REPLAY OFFER (GA NON-BUYERS)

**Trigger:** Has tag `ticket_ga` AND does NOT have `hto_enrolled` OR `starter_pack_2k`
1. **Wait until** July 11, 2 PM EST
2. **Send** "Missed Any Sessions?" email — offer: $97 lifetime access (→ `replay.html`)
3. **Wait** 48 hours
4. **Send** "Recordings Close Tomorrow" email
5. **If PURCHASED:**
   - Add tag: `replay_purchased`
   - Send "Replay Access" email

---

## TAG STRUCTURE

**Registration**
`summit_registered` · `ticket_ga` ($27) · `ticket_vip` ($97) · `ticket_platinum` ($297)

**Payment**
`paid_27` · `paid_97` · `paid_297` · `paid_deposit` (HTO $2K/$5K) · `paid_2k` (Starter Pack) · `paid_2500_plan` (Starter Pack plan) · `replay_purchased` ($97)

**Access**
`vip_qa_access` (VIP + Platinum) · `platinum_priority` (Platinum) · `houston_meetup` (Platinum) · `site_tour_aug7` (HTO + $2K buyers)

**Engagement**
`hto_application_submitted` · `hto_application_approved` · `hto_enrolled` · `starter_pack_2k` · `attended_day1` · `attended_day2` · `attended_day3` · `no_show`

> Note: GHL tag names should avoid `&`/special chars — `vip_q&a_access` from the source doc is written here as **`vip_qa_access`**.

---

## CONDITIONAL LOGIC RULES

| # | Condition | Action |
|---|-----------|--------|
| 1 | Has `vip_qa_access` | Send VIP Q&A reminders at 6 PM EST on July 7, 8, 9 (for 7 PM session) |
| 2 | Has `platinum_priority` | Send Platinum-specific reminders mentioning "first priority" |
| 3 | Has `site_tour_aug7` | Send site-tour details July 22 + reminder August 5 |
| 4 | Does NOT have `hto_enrolled` OR `starter_pack_2k` OR `replay_purchased` | Enter post-event non-buyer sequence |

---

## PRICING REFERENCE (confirm before launch)
- GA: **$27** · VIP: **$97 total**
- Platinum from VIP: **$297 total** ($200 upgrade) · Platinum from GA: **$297 total** ($270 upgrade) — *source top-block showed $497 from GA; confirm with Kelli*
- HTO: **$6,500** ($2,000 deposit + $812/mo × 8) **OR $5,000 PIF**
- Downsell: **$2,000 PIF OR $2,500 plan** ($500 deposit + $500 biweekly × 4)
- Replay: **$97**
