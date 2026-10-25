(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll(
    '.topbar, main > .eyebrow, .hero > .portrait-wrap, .hero > .kicker, .hero > h1, .hero > .intro, .release-card, .links .link-card, .social-row, footer'
  );

  if (reduceMotion || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('reveal-enabled');
  targets.forEach((element, index) => {
    element.classList.add('reveal');
    if (element.matches('.links .link-card')) {
      const siblings = Array.from(element.parentElement.children);
      element.style.setProperty('--reveal-delay', `${siblings.indexOf(element) * 85}ms`);
    } else {
      element.style.setProperty('--reveal-delay', `${Math.min(index * 35, 180)}ms`);
    }
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  targets.forEach(element => observer.observe(element));
})();