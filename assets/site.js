// ── CURSOR ──────────────────────────────────────────────────
(function () {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
})();

// ── NAVBAR SCROLL ───────────────────────────────────────────
// Hides the header the instant you scroll down (no tolerance -- any
// downward movement hides it immediately), and only reveals it again
// once you've scrolled back up by a real amount, so ordinary trackpad
// jitter during a downward scroll can't flash it back into view.
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  let lastY = window.scrollY;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 40);
      const navLinks = document.getElementById('navLinks');
      const menuOpen = navLinks && navLinks.classList.contains('open');
      if (!menuOpen) {
        if (y <= 20) navbar.classList.remove('nav-hidden');
        else if (y > lastY) navbar.classList.add('nav-hidden');
        else if (lastY - y > 40) navbar.classList.remove('nav-hidden');
      }
      lastY = y;
      ticking = false;
    });
  }, { passive: true });
})();

// ── MOBILE MENU ─────────────────────────────────────────────
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('open');
}

// ── SCROLL REVEAL ───────────────────────────────────────────
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
})();
