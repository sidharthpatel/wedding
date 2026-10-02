(() => {
  const W = window.WEDDING;
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---- language
  let lang = "en";
  try { lang = localStorage.getItem("lang") || ((navigator.language || "").startsWith("gu") ? "gu" : "en"); } catch {}
  const GU = window.GU || {};
  const tr = (en) => (lang === "gu" && GU[en]) || en;
  const pick = (en, gu) => (lang === "gu" && gu) || en;
  const num = (n) => (lang === "gu" ? String(n).replace(/\d/g, (d) => "૦૧૨૩૪૫૬૭૮૯"[d]) : String(n));

  // ---- mandala
  const g = $("#mandala-g");
  let m = "";
  for (let i = 0; i < 16; i++) {
    m += `<g transform="rotate(${i * 22.5} 100 100)"><path d="M100 100 C 88 70, 88 40, 100 14 C 112 40, 112 70, 100 100Z"/><circle cx="100" cy="10" r="3"/></g>`;
  }
  m += `<circle cx="100" cy="100" r="30"/><circle cx="100" cy="100" r="22"/><circle cx="100" cy="100" r="6"/>`;
  g.innerHTML = m;

  // ---- nav
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("solid", scrollY > 60);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // ---- countdown
  const cd = $("#countdown");
  const tick = () => {
    const diff = new Date(W.weddingDate) - new Date();
    if (diff <= 0) { cd.innerHTML = `<b>${tr("Today is the day! 🎉")}</b>`; return; }
    const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, mi = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
    cd.innerHTML = [[d, "Days"], [h, "Hours"], [mi, "Mins"], [s, "Secs"]].map(([v, l]) => `<div><b>${num(String(v).padStart(2, "0"))}</b><span>${tr(l)}</span></div>`).join("");
  };
  setInterval(tick, 1000);

  // ---- events, faq, checkboxes (re-rendered when language changes)
  const fmtDate = (d) => new Date(d + "T12:00:00").toLocaleDateString(lang === "gu" ? "gu-IN" : "en-US", { weekday: "long", month: "long", day: "numeric" });
  const icsLink = (e) => {
    if (!e.date) return "";
    const day = e.date.replace(/-/g, "");
    const next = new Date(e.date + "T12:00:00"); next.setDate(next.getDate() + 1);
    const end = next.toISOString().slice(0, 10).replace(/-/g, "");
    const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", `DTSTART;VALUE=DATE:${day}`, `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:${e.name} — ${W.groom} & ${W.bride}`, `LOCATION:${e.venue || ""} ${e.address || ""}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    return `<a href="data:text/calendar;charset=utf8,${encodeURIComponent(body)}" download="${e.id}.ics">${tr("Add to calendar")}</a>`;
  };

  function renderDynamic() {
    document.documentElement.lang = lang === "gu" ? "gu" : "en";
    $("#lang").textContent = lang === "gu" ? "English" : "ગુજરાતી";
    // static strings
    document.querySelectorAll("[data-t]").forEach((el) => {
      el.dataset.en ??= el.textContent.trim();
      el.textContent = tr(el.dataset.en);
    });
    document.querySelectorAll("[data-tp]").forEach((el) => (el.placeholder = tr(el.dataset.tp)));
    // names + header
    const n1 = pick(W.groom, W.groomGu), n2 = pick(W.bride, W.brideGu);
    $("#n1").textContent = n1; $("#n2").textContent = n2;
    $("#f1").textContent = n1; $("#f2").textContent = n2;
    $("#city").textContent = pick(W.city, W.cityGu);
    $("#tagline").textContent = pick(W.tagline, W.taglineGu);
    document.title = `${n1} & ${n2} — ${tr("January 29, 2027")}`;
    $("#lead-pre").textContent = tr("Please reply by");
    $("#deadline").textContent = W.rsvpDeadline;
    $("#lead-post").textContent = lang === "gu" ? GU["lead-post"] : GU["lead-post-en"];
    $("#t-thanks").textContent = tr("Thank you,");
    $("#contact").href = `mailto:${W.contactEmail}`;
    tick();

    $("#events-list").innerHTML = W.events.map((e) => `
      <article class="event in">
        <div class="ic">${e.icon}</div>
        <h3>${esc(e.name)}</h3><div class="gu">${esc(e.gu)}</div>
        <p>${esc(pick(e.blurb, e.blurbGu))}</p>
        ${e.date ? `<div class="when">${fmtDate(e.date)}${e.time ? " · " + esc(e.time) : ""}</div>` : `<span class="soon">${tr("Date coming soon")}</span>`}
        ${e.venue ? `<p>${esc(e.venue)}<br><small>${esc(e.address || "")}</small></p>` : ""}
        <div class="swatches">${(e.colors || []).map((c) => `<i style="background:${c}"></i>`).join("")}</div>
        <p class="dress"><b>${tr("Dress code:")}</b> ${esc(pick(e.dress, e.dressGu))}</p>
        <div class="ev-links">${e.map ? `<a href="${esc(e.map)}" target="_blank" rel="noopener">${tr("Directions")}</a>` : ""}${icsLink(e)}</div>
      </article>`).join("");

    $("#faq-list").innerHTML = W.faq.map(([q, a, qg, ag]) => `<details><summary>${esc(pick(q, qg))}</summary><p>${esc(pick(a, ag))}</p></details>`).join("");

    const checked = new Set([...document.querySelectorAll('input[name="ev"]:checked')].map((c) => c.value));
    const hidden = new Set([...document.querySelectorAll('input[name="ev"]')].filter((c) => c.closest(".check").style.display === "none").map((c) => c.value));
    const first = !document.querySelector('input[name="ev"]');
    $("#event-checks").innerHTML = W.events.map((e) => `
      <label class="check" ${hidden.has(e.id) ? 'style="display:none"' : ""}><input type="checkbox" name="ev" value="${e.id}" ${first || checked.has(e.id) ? "checked" : ""}>
        <span>${esc(e.name)}<small>${e.date ? fmtDate(e.date) : tr("Date coming soon")}</small></span></label>`).join("");
  }

  const onLang = [];
  const party = $("#party");
  document.querySelectorAll(".stepper button").forEach((b) => b.addEventListener("click", () => {
    party.value = Math.min(+party.max, Math.max(1, (+party.value || 1) + +b.dataset.d));
  }));

  // personalised invite link: /?invite=CODE
  const code = new URLSearchParams(location.search).get("invite");
  if (code) {
    fetch(`/api/invite?code=${encodeURIComponent(code)}`).then((r) => (r.ok ? r.json() : null)).then((inv) => {
      if (!inv) return;
      $("#code").value = code;
      $("#name").value = inv.name;
      party.max = inv.seats; party.value = inv.existing?.party_size || inv.seats;
      $("#hello").hidden = false;
      const setHello = () => ($("#hello").textContent = lang === "gu"
          ? GU.hello.replace("{name}", inv.name).replace("{n}", num(inv.seats))
          : GU["hello-en"].replace("{name}", inv.name).replace("{n}", inv.seats).replace("{guests}", inv.seats > 1 ? "guests" : "guest"));
      setHello(); onLang.push(setHello);
      if (inv.events?.length) document.querySelectorAll('input[name="ev"]').forEach((c) => {
        const row = c.closest(".check");
        if (!inv.events.includes(c.value)) { row.style.display = "none"; c.checked = false; }
      });
      if (inv.existing) {
        const x = inv.existing, f = $("#rsvp-form");
        const evs = JSON.parse(x.events || "[]");
        document.querySelectorAll('input[name="ev"]').forEach((c) => (c.checked = evs.includes(c.value)));
        for (const k of ["email", "phone", "party_names", "meal", "dietary", "song", "message"]) if (f[k]) f[k].value = x[k] || "";
      }
    }).catch(() => {});
  }

  const form = $("#rsvp-form"), err = $("#err"), btn = $("#submit");
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault(); err.textContent = "";
    const fd = new FormData(form);
    const name = (fd.get("name") || "").trim();
    if (!name) { err.textContent = tr("Please enter your name."); return; }
    const events = fd.getAll("ev");
    const payload = Object.fromEntries(fd.entries()); delete payload.ev;
    payload.events = events; payload.party_size = events.length ? +payload.party_size || 1 : 0;
    btn.disabled = true; btn.textContent = tr("Sending…");
    try {
      const r = await fetch("/api/rsvp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Something went wrong. Please try again.");
      form.hidden = true; $("#thanks").hidden = false;
      $("#t-name").textContent = name.split(" ")[0];
      const yes = events.length > 0;
      const setMsg = () => ($("#t-msg").textContent = lang === "gu" ? GU[yes ? "yes-msg" : "no-msg"] : GU[yes ? "yes-msg-en" : "no-msg-en"]);
      setMsg(); onLang.push(setMsg);
      $("#rsvp").scrollIntoView({ behavior: "smooth" });
      if (events.length) burst();
    } catch (e) { err.textContent = e.message; }
    btn.disabled = false; btn.textContent = tr("Send RSVP");
  });
  $("#edit").addEventListener("click", () => { form.hidden = false; $("#thanks").hidden = true; });

  // ---- language toggle
  $("#lang").addEventListener("click", () => {
    lang = lang === "gu" ? "en" : "gu";
    try { localStorage.setItem("lang", lang); } catch {}
    renderDynamic(); onLang.forEach((f) => f());
  });
  renderDynamic();

  // ---- scroll reveal
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ---- falling marigold petals
  const cv = $("#petals"), cx = cv.getContext("2d");
  const colors = ["#F4A21B", "#E8871E", "#FFC94A", "#D9531E", "#C2185B"];
  let ps = [], boost = 0;
  const size = () => { cv.width = innerWidth; cv.height = innerHeight; };
  addEventListener("resize", size); size();
  const mk = (y) => ({ x: Math.random() * cv.width, y: y ?? -20, r: 4 + Math.random() * 6, s: 0.4 + Math.random() * 1, w: Math.random() * 6, a: Math.random() * 6, c: colors[(Math.random() * colors.length) | 0] });
  const N = innerWidth < 600 ? 14 : 28;
  for (let i = 0; i < N; i++) ps.push(mk(Math.random() * innerHeight));
  function burst() { for (let i = 0; i < 90; i++) ps.push({ ...mk(cv.height * 0.3), s: 1.5 + Math.random() * 2.5, burst: 1 }); }
  (function loop() {
    cx.clearRect(0, 0, cv.width, cv.height);
    ps = ps.filter((p) => !(p.burst && p.y > cv.height + 20));
    for (const p of ps) {
      p.y += p.s; p.w += 0.02; p.a += 0.03; p.x += Math.sin(p.w) * 0.8;
      if (p.y > cv.height + 20 && !p.burst) { p.y = -20; p.x = Math.random() * cv.width; }
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.a); cx.globalAlpha = 0.75; cx.fillStyle = p.c;
      cx.beginPath(); cx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 7); cx.fill(); cx.restore();
    }
    requestAnimationFrame(loop);
  })();
})();
