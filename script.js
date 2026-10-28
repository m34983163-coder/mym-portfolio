// 1. Mobile menu: open/close with the hamburger, close when a link is tapped
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
function setMenu(open) {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// 2. Profile image fallback: if the photo fails to load, show the MYM placeholder
const img = document.getElementById('profileImg');
img.addEventListener('error', () => { img.style.display = 'none'; });

// 3. Sections fade in when scrolled into view
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));
} else { reveals.forEach(r => r.classList.add('show')); }

// 4. Back-to-top button
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => toTop.classList.toggle('visible', window.scrollY > 600), { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 5. Mouse glow (desktop only, skipped if reduced motion)
const glow = document.querySelector('.mouse-glow');
const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (canHover && !reduce) {
  window.addEventListener('mousemove', e => {
    glow.style.opacity = 1;
    glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
  }, { passive: true });
}
