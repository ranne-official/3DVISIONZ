# Putting the Summit page into GoHighLevel

There is **no way to "send" raw HTML into the GHL page builder** automatically — GHL
stores pages as its own block format, and the builder URL is behind your login. So the
practical path is GHL's **Custom Code / HTML element**. The file `summit-embed.html` in
this folder is built for exactly that.

## Steps
1. In your funnel, **Add a new page** (or open the page-builder page you linked).
2. Add a **Section → 1-column Row**. Set the section/row/column **padding to 0** and width to **Full**.
3. Drop in a **Custom JS/HTML** (a.k.a. "Custom Code") element.
4. Open `ghl-embed/summit-embed.html`, **copy everything**, and paste it into that element.
5. Save / Preview. The page renders with images loading from your GitHub Pages assets.
6. In GHL page **Settings**, you may want to **hide the default GHL header/footer** so only this design shows.

## What's inside the bundle
- All CSS (`styles.css` + `summit.css`) inlined in one `<style>` block + Google Fonts `@import`.
- The full page markup (hero, VSL, curriculum, coach, tiers, guest, bottom CTA, FAQ, sticky CTA).
- The countdown script.
- Every image/background URL rewritten to `https://ranne-official.github.io/3DVISIONZ/assets/…`.

## Before you go live (important)
- **Ticket buttons** currently link to the GitHub-hosted checkout
  (`…/summit-checkout.html?tier=ga|vip|platinum`). For real payments, **replace each
  button's link with your GHL order-form URL** (one 2-step order form per tier, Square
  connected) — see `ghl-assets/05-summit-integrations-spec.md`.
- **Checkout & thank-you pages** should be **native GHL order forms / pages**, not this
  embed — that's how Square, the contact capture, abandon-cart tags, and the 2-step flow
  actually fire in GHL. The static `summit-checkout.html` is the visual reference for them.
- The `* { margin:0; padding:0 }` reset + `body { … }` styles are global; since the custom
  code is the only element on the page that's fine, but don't mix other GHL elements on the
  same page or they'll inherit these resets.

## Alternative
Prefer to keep it on GitHub Pages and just point a domain at it? You can add a custom
domain to the repo's Pages settings instead of rebuilding in GHL. Tell me and I'll set it up.
