/* Nav scroll state */
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Mobile hamburger toggle */
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  /* Close menu when a link is clicked */
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close menu on outside click */
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Intersection-based fade-in */
const observer = new IntersectionObserver(
  (entries) => entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('is-visible');
      observer.unobserve(el.target);
    }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
