/* =============================================================
   DYNASTY 8 — Logique du site
   ============================================================= */
(function () {
  "use strict";
  const D8 = window.D8 || {};
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const fmt = (n) => new Intl.NumberFormat("fr-FR").format(n) + " $";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const mk = (tag, props) => Object.assign(document.createElement(tag), props || {});

  /* ---------- FAVORIS (mémorisés dans le navigateur) ---------- */
  let favs = new Set();
  try { favs = new Set(JSON.parse(localStorage.getItem("d8_favs") || "[]")); } catch (e) {}
  const isFav = (id) => favs.has(id);
  function toggleFav(id) {
    favs.has(id) ? favs.delete(id) : favs.add(id);
    try { localStorage.setItem("d8_favs", JSON.stringify([...favs])); } catch (e) {}
  }
  function staggerGrid(grid) {
    if (!grid) return;
    Array.from(grid.children).forEach((c, i) => c.style.setProperty("--d", (i % 8) * 80 + "ms"));
  }

  /* ---------- RÉVÉLATION AU SCROLL (.is-visible) ---------- */
  const REVEAL_SEL = ".stat,.card,.mini-card,.tl,.org__row,.price-card,.split__media,.split__body,.service,.member,.parcel";
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); revealIO.unobserve(en.target); } });
  }, { threshold: 0.15 });
  function armReveal(scope) {
    (scope || document).querySelectorAll(REVEAL_SEL).forEach((el) => {
      if (el.__revealed) return;
      el.__revealed = true;
      el.classList.add("reveal");
      revealIO.observe(el);
    });
  }
  // Filet de sécurité : révèle ce qui est déjà visible dans l'onglet actif
  function flushReveal() {
    $$(".tab.is-active .reveal:not(.is-visible)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
        el.classList.add("is-visible");
        revealIO.unobserve(el);
      }
    });
  }

  /* ---------- PRELOADER (compteur %) ---------- */
  (function preloader() {
    const numEl = document.getElementById("pctNum");
    let pct = 0, loaded = false;
    window.addEventListener("load", () => { loaded = true; });
    const tick = () => {
      const cap = loaded ? 100 : 90;
      pct = Math.min(cap, pct + Math.random() * 6 + 1);
      if (numEl) numEl.textContent = Math.floor(pct);
      if (pct >= 100) { setTimeout(() => document.body.classList.add("loaded"), 250); return; }
      setTimeout(tick, 70);
    };
    tick();
  })();

  /* ---------- NAVIGATION PAR ONGLETS ---------- */
  const tabs = $$(".tab");
  const links = $$(".nav__link");

  function applyTab(id) {
    tabs.forEach((t) => t.classList.toggle("is-active", t.id === id));
    links.forEach((l) => l.classList.toggle("is-active", l.dataset.tab === id));
    window.scrollTo({ top: 0, behavior: "auto" });
    history.replaceState(null, "", "#" + id);
    closeMenu();
    requestAnimationFrame(flushReveal);
  }

  function showTab(id) {
    if (!document.getElementById(id)) id = "accueil";
    const cur = $(".tab.is-active");
    if (reduceMotion || !cur || cur.id === id) { applyTab(id); return; }
    // Sortie : la section actuelle s'estompe (200ms)
    cur.classList.add("tab--out");
    setTimeout(() => {
      cur.classList.remove("tab--out");
      applyTab(id);
      // Entrée : la nouvelle section apparaît (300ms)
      const next = document.getElementById(id);
      next.classList.add("tab--in");
      requestAnimationFrame(() => requestAnimationFrame(() => next.classList.remove("tab--in")));
    }, 200);
  }

  // Tout élément avec data-tab change d'onglet
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-tab]");
    if (!el) return;
    e.preventDefault();
    showTab(el.dataset.tab);
  });

  /* ---------- MENU MOBILE ---------- */
  const burger = $("#burger");
  const navLinks = $("#navLinks");
  function closeMenu() { navLinks.classList.remove("open"); burger.classList.remove("open"); }
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    burger.classList.toggle("open");
  });

  /* ---------- NAVBAR AU SCROLL ---------- */
  const nav = $("#nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("nav--scrolled", window.scrollY > 60);
  }, { passive: true });

  /* ---------- CARTE BIEN ---------- */
  function propCard(p) {
    return `
      <article class="card" data-id="${p.id}">
        <div class="card__media" style="background-image:url('${p.img}')">
          <span class="card__status ${p.status === "Exclusivité" ? "is-excl" : ""}">${p.status}</span>
          <button class="fav ${isFav(p.id) ? "is-active" : ""}" data-fav="${p.id}" aria-label="Favori" title="Ajouter aux favoris">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.2C.4 8.6 1.8 5 5.2 5c2 0 3.3 1.2 3.8 2.2C9.5 6.2 10.8 5 12.8 5 16.2 5 17.6 8.6 16 11.8 13.5 16.4 12 21 12 21z"/></svg>
          </button>
          <span class="card__type">${p.type}</span>
        </div>
        <div class="card__body">
          <p class="card__hood">${p.hood}</p>
          <h3 class="card__title">${p.title}</h3>
          <div class="card__specs">
            <span>${p.beds} ch.</span><span>${p.baths} sdb.</span><span>${p.surface} m²</span>
          </div>
          <div class="card__foot">
            <span class="card__price">${fmt(p.price)}</span>
            <button class="card__btn" data-detail="${p.id}">Détails</button>
          </div>
        </div>
      </article>`;
  }

  /* ---------- CARTE STOCKAGE / HANGAR ---------- */
  function storageCard(p) {
    return `
      <article class="parcel">
        <div class="parcel__media" style="background-image:url('${p.img}')"><span>${p.label}</span></div>
        <div class="parcel__body">
          <p class="card__hood">${p.hood}</p>
          <h3 class="card__title">${p.title}</h3>
          <p class="parcel__desc">${p.desc}</p>
          <div class="parcel__foot">
            <span><strong>${new Intl.NumberFormat("fr-FR").format(p.surface)}</strong> m²</span>
            <span class="card__price">${fmt(p.price)}</span>
          </div>
        </div>
      </article>`;
  }

  /* ---------- RENDU : À LA UNE ---------- */
  const featured = (D8.properties || []).filter((p) => p.featured);
  $("#featuredGrid").innerHTML = featured.map(propCard).join("");

  /* ---------- RENDU : QUARTIERS ---------- */
  $("#hoods").innerHTML = (D8.hoods || []).map((h) => `
    <button class="hood" data-tab="catalogue" style="background-image:url('${h.img}')">
      <span class="hood__veil"></span>
      <span class="hood__txt"><strong>${h.name}</strong><small>${h.tag}</small></span>
    </button>`).join("");

  /* ---------- RENDU : CATALOGUE + FILTRES ---------- */
  const allProps = D8.properties || [];
  const types = ["Tous", ...new Set(allProps.map((p) => p.type))];
  let activeType = "Tous";
  let activeSort = "featured";
  let query = "";
  let favOnly = false;

  $("#filterType").innerHTML = types.map((t, i) =>
    `<button class="chip ${i === 0 ? "is-active" : ""}" data-type="${t}">${t}</button>`).join("");

  function renderCatalogue() {
    const q = query.trim().toLowerCase();
    let list = allProps.filter((p) => {
      if (activeType !== "Tous" && p.type !== activeType) return false;
      if (favOnly && !isFav(p.id)) return false;
      if (q && !(`${p.title} ${p.hood} ${p.type} ${p.tags.join(" ")}`.toLowerCase().includes(q))) return false;
      return true;
    });
    if (activeSort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (activeSort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (activeSort === "surface-desc") list.sort((a, b) => b.surface - a.surface);
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    $("#catalogueGrid").innerHTML = list.map(propCard).join("");
    const empty = $("#catalogueEmpty");
    empty.hidden = list.length > 0;
    empty.textContent = favOnly && list.length === 0
      ? "Aucun favori pour l'instant — cliquez sur le ♥ d'un bien."
      : "Aucun bien ne correspond à votre recherche.";
    staggerGrid($("#catalogueGrid"));
    armReveal($("#catalogueGrid"));
  }
  renderCatalogue();

  $("#filterType").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    activeType = b.dataset.type;
    $$("#filterType .chip").forEach((c) => c.classList.toggle("is-active", c === b));
    renderCatalogue();
  });
  $("#sortSelect").addEventListener("change", (e) => { activeSort = e.target.value; renderCatalogue(); });

  const searchInput = $("#searchInput");
  if (searchInput) searchInput.addEventListener("input", (e) => { query = e.target.value; renderCatalogue(); });

  const favFilter = $("#favFilter");
  if (favFilter) favFilter.addEventListener("click", () => {
    favOnly = !favOnly;
    favFilter.classList.toggle("is-active", favOnly);
    renderCatalogue();
  });

  // Clic sur un cœur (n'importe où sur le site)
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-fav]");
    if (!b) return;
    e.stopPropagation();
    const id = b.dataset.fav;
    toggleFav(id);
    $$(`[data-fav="${id}"]`).forEach((el) => el.classList.toggle("is-active", isFav(id)));
    if (favFilter) favFilter.dataset.count = favs.size;
    if (favOnly) renderCatalogue();
  });
  if (favFilter) favFilter.dataset.count = favs.size;

  /* ---------- RENDU : STOCKAGE ---------- */
  $("#storageGrid").innerHTML = (D8.storage || []).map(storageCard).join("");

  /* ---------- RENDU : SERVICES ---------- */
  const icons = {
    key:'<path d="M21 2l-2 2m-7.6 7.6a5 5 0 11-7 7 5 5 0 017-7zm0 0L15 8m0 0l3 3m-3-3l2-2"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    chart:'<path d="M3 3v18h18"/><path d="M7 15l3-3 3 3 5-6"/>',
    home:'<path d="M3 10l9-7 9 7"/><path d="M5 9v11h14V9"/>',
    build:'<path d="M3 21h18M6 21V8l6-4 6 4v13M10 12h4M10 16h4"/>',
    crown:'<path d="M3 7l4 5 5-7 5 7 4-5v11H3z"/>'
  };
  $("#servicesGrid").innerHTML = (D8.services || []).map((s) => `
    <article class="service">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${icons[s.icon] || ""}</svg>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </article>`).join("");

  /* ---------- RENDU : ÉQUIPE ---------- */
  $("#teamGrid").innerHTML = (D8.team || []).map((m) => `
    <article class="member ${m.open ? "member--open" : ""}">
      <div class="member__avatar">${m.initials}</div>
      <h3>${m.name}</h3>
      <p class="member__role">${m.role}</p>
      <p class="member__note">${m.note}</p>
    </article>`).join("");

  /* ---------- RENDU : TÉMOIGNAGES (carrousel) ---------- */
  const tList = D8.testimonials || [];
  const tWrap = $("#testimonials");
  if (tWrap && tList.length) {
    tWrap.innerHTML = tList.map((t, i) => `
      <figure class="quote ${i === 0 ? "is-active" : ""}">
        <div class="quote__mark">”</div>
        <blockquote>${t.quote}</blockquote>
        <figcaption><span class="quote__av">${t.initials}</span><span><strong>${t.name}</strong><small>${t.role}</small></span></figcaption>
      </figure>`).join("") +
      `<div class="quote__dots">${tList.map((_, i) => `<button class="quote__dot ${i === 0 ? "is-active" : ""}" data-q="${i}"></button>`).join("")}</div>`;

    let qi = 0;
    const slides = $$(".quote", tWrap), dots = $$(".quote__dot", tWrap);
    function goQuote(n) {
      qi = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === qi));
      dots.forEach((d, i) => d.classList.toggle("is-active", i === qi));
    }
    let qTimer = setInterval(() => goQuote(qi + 1), 5000);
    tWrap.addEventListener("click", (e) => {
      const d = e.target.closest(".quote__dot");
      if (!d) return;
      goQuote(+d.dataset.q);
      clearInterval(qTimer); qTimer = setInterval(() => goQuote(qi + 1), 5000);
    });
  }

  /* ---------- MOT DÉFILANT DU HERO ---------- */
  const rotEl = $("#rotWord");
  const words = D8.rotatingWords || [];
  if (rotEl && words.length > 1 && !reduceMotion) {
    let wi = 0;
    setInterval(() => {
      wi = (wi + 1) % words.length;
      rotEl.classList.add("swap");
      setTimeout(() => { rotEl.textContent = words[wi]; rotEl.classList.remove("swap"); }, 320);
    }, 2800);
  }

  /* ---------- MODALE DÉTAIL BIEN ---------- */
  const modal = $("#modal");
  const modalBody = $("#modalBody");

  function openDetail(id) {
    const p = allProps.find((x) => x.id === id);
    if (!p) return;
    modalBody.innerHTML = `
      <div class="modal__media" style="background-image:url('${p.img}')">
        <span class="card__status ${p.status === "Exclusivité" ? "is-excl" : ""}">${p.status}</span>
        <button class="fav fav--lg ${isFav(p.id) ? "is-active" : ""}" data-fav="${p.id}" aria-label="Favori">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.2C.4 8.6 1.8 5 5.2 5c2 0 3.3 1.2 3.8 2.2C9.5 6.2 10.8 5 12.8 5 16.2 5 17.6 8.6 16 11.8 13.5 16.4 12 21 12 21z"/></svg>
        </button>
      </div>
      <div class="modal__info">
        <p class="card__hood">${p.hood} · réf. ${p.id}</p>
        <h2 class="h2">${p.title}</h2>
        <p class="modal__price">${fmt(p.price)}</p>
        <div class="modal__specs">
          <div><strong>${p.beds}</strong><span>chambres</span></div>
          <div><strong>${p.baths}</strong><span>salles de bain</span></div>
          <div><strong>${p.surface}</strong><span>m²</span></div>
          <div><strong>${p.type}</strong><span>type</span></div>
        </div>
        <p class="modal__desc">${p.desc}</p>
        <div class="modal__tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>

        <div class="sim">
          <div class="sim__head">
            <span>Simulateur de financement <small>(indicatif RP)</small></span>
            <span class="sim__rate">Apport 20% · 5%/an</span>
          </div>
          <label class="sim__row">Durée <strong><span id="simYears">15</span> ans</strong>
            <input type="range" id="simRange" min="5" max="25" step="5" value="15" />
          </label>
          <div class="sim__out">
            <div><span>Mensualité estimée</span><strong id="simMonthly">—</strong></div>
            <div><span>Apport conseillé</span><strong id="simDown">—</strong></div>
          </div>
        </div>

        <button class="btn btn--gold" data-tab="contact" data-close>Demander une visite</button>
      </div>`;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => modal.classList.add("modal--open"));
    setupSimulator(p.price);
  }

  /* ---------- SIMULATEUR DE FINANCEMENT ---------- */
  function setupSimulator(price) {
    const range = $("#simRange");
    if (!range) return;
    const rate = 0.05, downRate = 0.20;
    const compute = () => {
      const years = +range.value;
      const down = price * downRate;
      const principal = price - down;
      const r = rate / 12, n = years * 12;
      const monthly = principal * r / (1 - Math.pow(1 + r, -n));
      $("#simYears").textContent = years;
      $("#simMonthly").textContent = fmt(Math.round(monthly));
      $("#simDown").textContent = fmt(Math.round(down));
    };
    range.addEventListener("input", compute);
    compute();
  }
  function closeModal() { modal.classList.remove("modal--open"); modal.hidden = true; document.body.style.overflow = ""; }

  document.addEventListener("click", (e) => {
    const d = e.target.closest("[data-detail]");
    if (d) { openDetail(d.dataset.detail); return; }
    if (e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  /* ---------- COMPTEURS ANIMÉS ---------- */
  const counters = $$(".stat__num");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.count;
      let cur = 0; const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => { cur += step; if (cur >= target) cur = target; el.textContent = cur; if (cur < target) requestAnimationFrame(tick); };
      tick(); io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => io.observe(c));

  /* ---------- RÉVÉLATION AU SCROLL ---------- */
  // Délais en cascade pour les éléments d'une même grille
  $$(".grid, .services, .team, .cards3, .pricing, .stats, .org, .timeline, .split").forEach(staggerGrid);
  armReveal(document);

  /* ---------- INJECTIONS DOM (séparateurs, meta, lazy) ---------- */
  // Filets dorés avant chaque .section de l'accueil
  $$("#accueil .section").forEach((s) => {
    s.parentNode.insertBefore(mk("div", { className: "section-divider" }), s);
  });
  // Filets entre les blocs du dossier
  $$(".dossier-content .doc-block").forEach((b, i) => {
    if (i === 0) return;
    b.parentNode.insertBefore(mk("div", { className: "section-divider section-divider--doc" }), b);
  });
  // Meta theme-color
  document.head.appendChild(mk("meta", { name: "theme-color", content: "#0a0a0c" }));
  // Lazy-loading des images éventuelles
  $$("img").forEach((img) => { img.loading = "lazy"; img.decoding = "async"; });
  // Révèle immédiatement le contenu déjà visible de l'accueil
  requestAnimationFrame(flushReveal);
  window.addEventListener("scroll", flushReveal, { passive: true });

  /* ---------- FORMULAIRE CONTACT ---------- */
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!f.name.value.trim() || !f.message.value.trim()) { f.reportValidity(); return; }
    $("#formNote").hidden = false;
    f.reset();
    setTimeout(() => { $("#formNote").hidden = true; }, 6000);
  });

  /* ---------- ANNÉE FOOTER + DEEP LINK ---------- */
  $("#year").textContent = new Date().getFullYear();
  const initial = (location.hash || "").replace("#", "");
  if (initial) showTab(initial);

  /* =============================================================
     EFFETS VISUELS GLOBAUX
     ============================================================= */
  // -- Barre de progression de défilement --
  const progress = mk("div", { id: "scrollProgress" });
  document.body.appendChild(progress);
  // -- Grain de film --
  document.body.appendChild(mk("div", { id: "grain" }));
  // -- Bouton retour en haut --
  const toTop = mk("button", { id: "toTop", innerHTML: "↑", title: "Haut de page", ariaLabel: "Remonter" });
  document.body.appendChild(toTop);
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    toTop.classList.toggle("show", h.scrollTop > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // -- Halo lumineux qui suit la souris --
  if (fine && !reduceMotion) {
    const glow = mk("div", { id: "cursorGlow" });
    document.body.appendChild(glow);
    let gx = innerWidth / 2, gy = innerHeight / 2, cx = gx, cy = gy;
    document.addEventListener("mousemove", (e) => { gx = e.clientX; gy = e.clientY; document.body.classList.add("has-glow"); });
    (function loop() { cx += (gx - cx) * 0.12; cy += (gy - cy) * 0.12; glow.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
  }

  // -- Poussière d'or flottante dans le hero --
  if (!reduceMotion) {
    const hero = $(".hero");
    if (hero) {
      const layer = mk("div", { className: "particles" });
      for (let i = 0; i < 22; i++) {
        const p = document.createElement("i");
        const size = 1 + Math.random() * 3;
        p.style.left = Math.random() * 100 + "%";
        p.style.width = p.style.height = size + "px";
        p.style.animationDuration = 9 + Math.random() * 12 + "s";
        p.style.animationDelay = -Math.random() * 16 + "s";
        layer.appendChild(p);
      }
      hero.appendChild(layer);
    }
  }

  // -- Parallaxe sur l'image du hero --
  if (!reduceMotion) {
    const heroBg = $(".hero__bg");
    if (heroBg) window.addEventListener("scroll", () => {
      if (!$("#accueil").classList.contains("is-active")) return;
      heroBg.style.transform = `scale(1.12) translateY(${window.scrollY * 0.18}px)`;
    }, { passive: true });
  }

  // -- Fond ambiant : orbes dorés --
  if (!reduceMotion) {
    const aurora = mk("div", { id: "aurora" });
    aurora.innerHTML = '<span class="orb orb1"></span><span class="orb orb2"></span><span class="orb orb3"></span>';
    document.body.prepend(aurora);
  }

  // -- Curseur personnalisé --
  if (fine && !reduceMotion) {
    document.body.classList.add("cursor-on");
    const cur = mk("div", { id: "cursor" });
    document.body.appendChild(cur);
    document.addEventListener("mousemove", (e) => {
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
      cur.classList.toggle("is-hover", !!e.target.closest("a, button, .card"));
    });
    document.addEventListener("mouseleave", () => { cur.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { cur.style.opacity = ""; });
  }

  // -- Boutons magnétiques --
  if (fine && !reduceMotion) {
    $$(".btn, .nav__cta").forEach((btn) => {
      const strength = 0.35;
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        btn.style.transform = `translate(${x}px,${y}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; btn.style.transition = "transform .4s var(--ease)"; });
      btn.addEventListener("pointerenter", () => { btn.style.transition = "transform .1s ease-out"; });
    });
  }
})();
