const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const slider = document.getElementById('fashionSlider');

if (slider) {
  const slides = Array.from(slider.querySelectorAll('.fashion-slide'));
  const previous = document.getElementById('fashionPrev');
  const next = document.getElementById('fashionNext');
  const dotsContainer = document.getElementById('sliderDots');
  const counter = document.getElementById('slideCount');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let timer = null;

  const dots = slides.map((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'نمایش اسلاید ' + (index + 1));
    dot.setAttribute('aria-current', index === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => {
      showSlide(index);
      restartTimer();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === activeIndex);
      slide.setAttribute('aria-hidden', i === activeIndex ? 'false' : 'true');
    });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', i === activeIndex ? 'true' : 'false'));
    if (counter) counter.textContent = String(activeIndex + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
  }

  function stopTimer() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function startTimer() {
    stopTimer();
    if (!reduceMotion && slides.length > 1) {
      timer = window.setInterval(() => showSlide(activeIndex + 1), 6000);
    }
  }

  function restartTimer() { startTimer(); }

  if (previous) previous.addEventListener('click', () => { showSlide(activeIndex - 1); restartTimer(); });
  if (next) next.addEventListener('click', () => { showSlide(activeIndex + 1); restartTimer(); });

  slider.addEventListener('mouseenter', stopTimer);
  slider.addEventListener('mouseleave', startTimer);
  slider.addEventListener('focusin', stopTimer);
  slider.addEventListener('focusout', startTimer);

  showSlide(0);
  startTimer();
}
