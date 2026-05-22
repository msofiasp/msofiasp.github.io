/* ═══════════════════════════════════════════
   Ballot Blunders — script.js
═══════════════════════════════════════════ */

// ── SCROLL-TO HELPER ──
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── NAVBAR: scroll shadow + active link ──
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    highlightNav();
  }, { passive: true });

  function highlightNav() {
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    links.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--white)'
        : '';
    });
  }
})();

// ── MOBILE MENU TOGGLE ──
(function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navLinks');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
})();

// ── COUNTER ANIMATION ──
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const ease = t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const start    = performance.now();

    function tick(now) {
      const elapsed  = Math.min(now - start, duration);
      const progress = ease(elapsed / duration);
      el.textContent = Math.round(progress * target).toLocaleString();
      if (elapsed < duration) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => obs.observe(c));
})();

// ── SCROLL REVEAL ──
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const siblings = entry.target.parentElement
          ? [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')]
          : [];
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();

// ── SMOOTH ANCHOR LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
