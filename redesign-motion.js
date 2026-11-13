/* NOVENTRA motion enhancement — progressive, accessible and dependency-free */
(() => {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = [
    '.worlds-heading', '.world-card', '.fashion-slider-heading',
    '.trust-strip > div', '.section-top', '.journey-card',
    '.systems-art', '.systems-copy', '.archive-cover', '.archive-list a',
    '.shop-item', '.branch-detail-section', '.about-copy',
    '.qna-heading', '.qna-form-wrap', '.qna-card', '.join-section'
  ];
  const elements = [...new Set(targets.flatMap(selector => [...document.querySelectorAll(selector)]))];
  if (!elements.length || reduceMotion || !('IntersectionObserver' in window)) return;
  document.body.classList.add('motion-ready');
  elements.forEach((element, index) => {
    element.setAttribute('data-reveal', '');
    const siblingIndex = [...(element.parentElement?.children || [])].indexOf(element);
    const delay = Math.min(Math.max(siblingIndex, 0), 4);
    if (delay) element.setAttribute('data-reveal-delay', String(delay));
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  elements.forEach(element => observer.observe(element));
})();
