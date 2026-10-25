(() => {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = document.querySelectorAll(
    '.topbar, main > .eyebrow, .hero > .portrait-wrap, .hero > .kicker, .hero > h1, .hero > .intro, .release-card, .youtube-feature-card, .links .link-card, .social-row, footer'
  );
  if (motionQuery.matches || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('reveal-enabled');
  targets.forEach((element, index) => {
    element.classList.add('reveal');
    const delay = element.matches('.links .link-card')
      ? Array.from(element.parentElement.children).indexOf(element) * 70
      : Math.min(index * 30, 150);
    element.style.setProperty('--reveal-delay', `${delay}ms`);
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(element => observer.observe(element));

  const onMotionChange = event => {
    if (!event.matches) return;
    document.documentElement.classList.remove('reveal-enabled');
    targets.forEach(element => element.classList.remove('reveal', 'is-visible'));
    observer.disconnect();
    motionQuery.removeEventListener('change', onMotionChange);
  };
  motionQuery.addEventListener('change', onMotionChange);
})();