/* Blueprint to Builder Summit — shared scripts */

// ---- Countdown to July 7, 2026 8 PM EST (EST = UTC-4 in July / EDT) ----
function startCountdown(targetISO, elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  // July 7 2026 8PM EDT = 00:00 UTC July 8
  const target = new Date(targetISO).getTime();

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const d = Math.floor(diff / 86400000); diff -= d * 86400000;
    const h = Math.floor(diff / 3600000); diff -= h * 3600000;
    const m = Math.floor(diff / 60000); diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    el.innerHTML = `
      <div class="cd-box"><div class="num">${pad(d)}</div><div class="lab">Days</div></div>
      <div class="cd-box"><div class="num">${pad(h)}</div><div class="lab">Hours</div></div>
      <div class="cd-box"><div class="num">${pad(m)}</div><div class="lab">Mins</div></div>
      <div class="cd-box"><div class="num">${pad(s)}</div><div class="lab">Secs</div></div>`;
  }
  tick();
  setInterval(tick, 1000);
}

// ---- Demo form handler (no real backend — wire to GHL on build) ----
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      if (btn) { btn.textContent = "Submitted ✓"; btn.disabled = true; }
      const msg = form.querySelector(".form-success");
      if (msg) msg.style.display = "block";
      const next = form.getAttribute("data-next");
      if (next) setTimeout(function () { window.location.href = next; }, 900);
    });
  });

  // Auto-init any countdown placeholders
  document.querySelectorAll("[data-countdown]").forEach(function (node) {
    startCountdown(node.getAttribute("data-countdown"), node.id);
  });
});
