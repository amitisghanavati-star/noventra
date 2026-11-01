/* NOVENTRA bilingual interface: Persian (RTL) / English (LTR). */
const languageToggle = document.getElementById('languageToggle');
const translations = {
  '.main-nav a': ['Academy','Languages','Fashion gallery','Pattern systems','Shop','Library','About','Join'],
  '.hero-copy > .eyebrow': ['KNOWLEDGE, PRECISION, CREATIVITY <span class="eyebrow-en">EST. 2026</span>'],
  '.hero h1': ['Clothing is not just sewn;<br><em>it is constructed.</em>'],
  '.hero-intro': ['Welcome to NOVENTRA — a place to learn, practice, and create across sewing, cooking, technology, and human languages.'],
  '.hero-buttons .btn': ['Learning path <span>↙</span>'],
  '.hero-buttons .text-link': ['The NOVENTRA story <span>←</span>'],
  '.hero-note': ['Start with the basics; grow your skills step by step.'],
  '.hero-bottomline span': ['01 — LEARN THE CRAFT','SCROLL TO EXPLORE ↓'],
  '.fashion-slider-heading .eyebrow': ['NOVENTRA / FASHION STUDIO'],
  '.fashion-slider-heading h2': ['A world of fashion, <em>without limits</em>'],
  '.fashion-slider-heading p': ['From everyday wear to bridal couture — learn, design, and sew.'],
  '.fashion-slide-copy h3': ['The art of womenswear','Tailoring with distinction','A world of kidswear','The elegance of eveningwear','The art of bridal couture'],
  '.fashion-slide-copy p': ['Explore coats, jackets, trousers, dresses, and distinctive designs shaped around the body.','Suits, shirts, trousers, and the foundations of formal tailoring.','Age-appropriate patterns, thoughtful fabric choices, and comfortable children’s clothing.','Discover delicate fabrics, special cuts, lining, and professional finishing.','From the first pattern and fitting to skirts, bodices, embellishment, and couture details.'],
  '.fashion-slide-copy a': ['Start learning ↙','Start learning ↙','Start learning ↙','Start learning ↙','Start learning ↙'],
  '.trust-strip > div:not(.strip-message) span': ['Structured learning','Understand every step','Practical exercises'],
  '.strip-message': ['Real skills start with strong foundations.'],
  '.academy-section .section-kicker': ['THE LEARNING JOURNEY / 01'],
  '.academy-section .section-top h2': ['From the first measurement<br>to the <em>finished garment.</em>'],
  '.academy-section .section-description': ['Lessons follow a thoughtful sequence, so you understand the reasoning instead of memorizing formulas.'],
  '.journey-card h3': ['Tools and fabric knowledge','Measurements and patternmaking','Cutting, sewing, and finishing'],
  '.journey-card p': ['Essential tools, fabric types, grainline, and preparation before cutting.','From body measurements to pattern lines, markings, ease, and fit adjustments.','Accurate cutting, sewing order, pressing, and clean finishing for a professional result.'],
  '.journey-card .card-arrow': ['Explore section <b>↙</b>','Explore section <b>↙</b>','Explore section <b>↙</b>'],
  '.featured-mark': ['CORE SKILL'],
  '.systems-copy .section-kicker': ['A WORLD OF METHODS / 02'],
  '.systems-copy h2': ['One goal;<br><em>different methods.</em>'],
  '.systems-copy > p': ['Every patternmaking system has its own language and logic. We explore each one clearly and compare their approaches.'],
  '.method-pills li': ['<span>01</span> Metric','<span>02</span> Müller','<span>03</span> Italian','<span>04</span> French','<span>05</span> Burda & commercial patterns','<span>06</span> Draping & moulage'],
  '.systems-copy .btn': ['Explore the methods <span>↙</span>'],
  '.library-section .section-kicker': ['THE KNOWLEDGE ARCHIVE / 03'],
  '.library-section .section-top h2': ['Collect knowledge;<br><em>build your skills.</em>'],
  '.library-section .section-description': ['The NOVENTRA library is designed for notes, glossaries, guides, and lessons you can revisit whenever you need them.'],
  '.archive-list a strong': ['The sewing handbook','Technical glossary','Practice worksheets'],
  '.archive-list a small': ['Tools, measurements, patterns, cutting, and sewing','Persian and English sewing terminology','Step-by-step exercises and checklists'],
  '.archive-note': ['Educational content will be added progressively.'],
  '.branch-programming .branch-status': ['Read Chapter One — Programming (PDF) ↗'],
  '.branch-kitchen .branch-status': ['Read Chapter One — Cooking (PDF) ↗'],
  '.shop-section .section-kicker': ['THE DIGITAL ATELIER / 04'],
  '.shop-heading h2': ['Tools for<br><em>your journey.</em>'],
  '.shop-heading > p': ['Digital files, notes, and practical resources. Online sales will launch when the products and payment process are ready.'],
  '.shop-item-meta h3': ['Sewing starter guide','Measurement worksheets','Professional seam finishing'],
  '.shop-item-meta p': ['Digital learning product','Practice and measurement records','Finishing techniques'],
  '.shop-item-meta > span': ['Coming soon','Coming soon','Coming soon'],
  '.about-copy .section-kicker': ['A NOTE ABOUT NOVENTRA'],
  '.about-copy h2': ['Do more than draw a pattern;<br><em>understand every line.</em>'],
  '.about-copy p': ['NOVENTRA is built on the belief that good teaching explains not only what to do, but why it matters. Our goal is to create a clear, precise, and creative resource for learning sewing, cooking, programming, and human languages.'],
  '.about-copy .text-link': ['Join the journey <span>←</span>'],
  '.join-section .section-kicker': ['THE NEXT STITCH / 05'],
  '.join-section h2': ['Every expert<br>once started <em>at the beginning.</em>'],
  '.join-section p': ['This is the beginning of NOVENTRA. As lessons, files, and guides are completed, this space will grow into a learning library.'],
  '.join-section .btn': ['Start with the basics <span>↙</span>'],
  '.pdf-link-wrap a': ['Read the first chapter of NOVENTRA Sewing'],
  '.site-footer > p': ['Making, with knowledge and creativity.']
};
const originalMarkup = new Map();
Object.keys(translations).forEach(selector => {
  originalMarkup.set(selector, Array.from(document.querySelectorAll(selector)).map(el => el.innerHTML));
});
let currentLanguage = 'fa';
function setLanguage(language) {
  currentLanguage = language;
  const english = language === 'en';
  document.documentElement.lang = english ? 'en' : 'fa';
  document.documentElement.dir = english ? 'ltr' : 'rtl';
  document.body.classList.toggle('is-english', english);
  Object.entries(translations).forEach(([selector, values]) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      const value = english ? values[Math.min(index, values.length - 1)] : (originalMarkup.get(selector) || [])[index];
      if (value !== undefined) element.innerHTML = value;
    });
  });
  if (languageToggle) {
    languageToggle.textContent = english ? 'فا' : 'EN';
    languageToggle.setAttribute('aria-label', english ? 'تغییر زبان به فارسی' : 'Switch to English');
    languageToggle.setAttribute('lang', english ? 'fa' : 'en');
  }
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) menuToggle.setAttribute('aria-label', english ? 'Open menu' : 'باز کردن منو');
  const previous = document.getElementById('fashionPrev');
  const next = document.getElementById('fashionNext');
  if (previous) previous.setAttribute('aria-label', english ? 'Previous slide' : 'اسلاید قبلی');
  if (next) next.setAttribute('aria-label', english ? 'Next slide' : 'اسلاید بعدی');
  document.querySelectorAll('#sliderDots button').forEach((dot, i) => dot.setAttribute('aria-label', english ? `Show slide ${i + 1}` : `نمایش اسلاید ${i + 1}`));
  try { localStorage.setItem('noventra-language', language); } catch (_) {}
}
if (languageToggle) {
  languageToggle.addEventListener('click', () => setLanguage(currentLanguage === 'fa' ? 'en' : 'fa'));
  let savedLanguage = 'fa';
  try { savedLanguage = localStorage.getItem('noventra-language') === 'en' ? 'en' : 'fa'; } catch (_) {}
  if (savedLanguage !== 'fa') setLanguage(savedLanguage);
}

// Robust navigation for the membership button and other in-page links.
document.querySelectorAll('a[href="#join"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.getElementById('join');
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.history && window.history.replaceState) window.history.replaceState(null, '', '#join');
  });
});

const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
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
    dot.addEventListener('click', () => { showSlide(index); restartTimer(); });
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
  function stopTimer() { if (timer) window.clearInterval(timer); timer = null; }
  function startTimer() { stopTimer(); if (!reduceMotion && slides.length > 1) timer = window.setInterval(() => showSlide(activeIndex + 1), 6000); }
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

// Immersive polish: scroll progress, subtle section reveals, and current-section navigation.
(() => {
  const progressBar = document.getElementById('scrollProgressBar');
  let scrollQueued = false;
  const updateProgress = () => {
    const root = document.documentElement;
    const max = root.scrollHeight - root.clientHeight;
    const progress = max > 0 ? (root.scrollTop / max) * 100 : 0;
    if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    scrollQueued = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      scrollQueued = true;
      window.requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  const revealTargets = document.querySelectorAll(
    '.fashion-slider-heading, .trust-strip, .section-top, .journey-card, .systems-art, .systems-copy, .archive-cover, .archive-list, .shop-item, .about-symbol, .about-copy, .join-section > div, .join-section > .btn'
  );
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reveal-ready');
    revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach(el => observer.observe(el));
  }

  const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }
})();


/* Manual purchase information dialog. No payment is processed by this static site. */
(() => {
  const dialog = document.getElementById('purchaseDialog');
  if (!dialog) return;
  document.querySelectorAll('[data-open-purchase]').forEach(button => {
    button.addEventListener('click', () => {
      const title = button.getAttribute('data-product-title') || 'فایل آموزشی NOVENTRA';
      const price = button.getAttribute('data-product-price') || '—';
      const titleNode = document.getElementById('purchaseTitle');
      const nameNode = document.getElementById('purchaseProductName');
      const priceNode = document.getElementById('purchaseProductPrice');
      if (titleNode) titleNode.textContent = 'خرید ' + title;
      if (nameNode) nameNode.textContent = title;
      if (priceNode) priceNode.textContent = price;
      const steps = dialog.querySelector('.purchase-steps');
      if (steps) steps.querySelector('li').textContent = 'مبلغ دقیق ' + price + ' را واریز کن.';
      const statusNode = document.getElementById('copyCardStatus');
      if (statusNode) statusNode.textContent = '';
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    });
  });
  document.querySelectorAll('[data-close-purchase]').forEach(button => {
    button.addEventListener('click', () => {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    });
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  const copyButton = document.getElementById('copyCardButton');
  const cardNumber = document.getElementById('purchaseCardNumber');
  const status = document.getElementById('copyCardStatus');
  if (copyButton && cardNumber) {
    copyButton.addEventListener('click', async () => {
      const number = cardNumber.textContent.replace(/\s+/g, '');
      try {
        await navigator.clipboard.writeText(number);
        if (status) status.textContent = 'شماره کارت کپی شد.';
      } catch (_) {
        const field = document.createElement('textarea');
        field.value = number;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        if (status) status.textContent = copied ? 'شماره کارت کپی شد.' : 'شماره کارت را دستی انتخاب و کپی کن.';
      }
    });
  }
})();


/* NOVENTRA AI Guide — guided FAQ prototype with optional browser voice */
(() => {
  const root = document.getElementById('noventraAI');
  if (!root) return;
  const launcher = document.getElementById('noventraAILauncher');
  const panel = document.getElementById('noventraAIPanel');
  const close = document.getElementById('noventraAIClose');
  const form = document.getElementById('noventraAIForm');
  const input = document.getElementById('noventraAIInput');
  const messages = document.getElementById('noventraAIMessages');
  const voice = document.getElementById('noventraAIVoice');
  const welcome = document.getElementById('noventraAIWelcome');
  const first = document.getElementById('noventraAIFirstMessage');
  const quick = document.getElementById('noventraAIQuick');
  let recognition = null;
  let lastReply = '';
  const isEnglish = () => document.documentElement.lang === 'en';
  const copy = {
    fa: {
      welcome:'سلام! من راهنمای هوشمند نوونترا هستم. برای پیدا کردن مسیر یادگیری یا بخش موردنظرت کمکت می‌کنم.',
      first:'از کدام بخش نوونترا می‌خواهی شروع کنی؟',
      placeholder:'پیامت را بنویس...',
      foot:'راهنمای نسخهٔ آغازین · پاسخ‌گویی صوتی در مرورگرهای پشتیبانی‌شده',
      branches:'نوونترا چهار مسیر آموزشی دارد: خیاطی، آشپزی، برنامه‌نویسی و زبان‌های انسانی. از بخش «شاخه‌های نوونترا» در صفحه می‌توانی وارد هر مسیر شوی.',
      sewing:'برای ورود به مسیر خیاطی، بخش خیاطی و کتابخانه را ببین. فایل فصل اول خیاطی از لینک «مطالعهٔ فصل اول خیاطی NOVENTRA» در صفحه در دسترس است.',
      cooking:'برای آشپزی به بخش NOVENTRA Kitchen برو. فایل PDF فصل اول آشپزی در همان بخش قرار دارد.',
      programming:'برای برنامه‌نویسی وارد بخش NOVENTRA Programming شو. فایل PDF فصل اول برنامه‌نویسی از لینک همان بخش باز می‌شود.',
      languages:'مسیر NOVENTRA Languages برای زبان‌های انسانی است؛ زبان‌های برنامه‌نویسی در شاخهٔ Programming قرار می‌گیرند.',
      files:'فایل‌های آموزشی در بخش مربوط به هر شاخه قرار دارند. در حال حاضر PDF فصل اول خیاطی، آشپزی و برنامه‌نویسی منتشر شده است.',
      join:'برای عضویت، دکمهٔ «عضویت» در منوی بالای سایت یا «عضویت رایگان» در پایین صفحه را انتخاب کن.',
      shop:'برای خرید فایل‌ها، بخش فروشگاه را ببین. روش پرداخت و دسترسی هر محصول در همان بخش توضیح داده می‌شود.',
      fallback:'می‌توانم دربارهٔ شاخه‌های آموزشی، خیاطی، آشپزی، برنامه‌نویسی، زبان‌ها، فایل‌ها و عضویت راهنمایی‌ات کنم. لطفاً سؤال را کمی دقیق‌تر بپرس.'
    },
    en: {
      welcome:'Hello! I’m the NOVENTRA learning guide. I can help you find a learning path or locate a section of the site.',
      first:'Which NOVENTRA learning path would you like to explore?',
      placeholder:'Write your message...',
      foot:'Early guide edition · Voice supported in compatible browsers',
      branches:'NOVENTRA offers four learning paths: Sewing, Cooking, Programming, and human Languages. Choose a path from the NOVENTRA branches section.',
      sewing:'Explore the Sewing section and Library. The first NOVENTRA Sewing chapter PDF is linked on the page.',
      cooking:'Visit NOVENTRA Kitchen. The first Cooking chapter PDF is available in that section.',
      programming:'Visit NOVENTRA Programming. The first Programming chapter PDF is linked in that section.',
      languages:'NOVENTRA Languages is for human languages. Programming languages belong in the Programming branch.',
      files:'Learning files are listed in their relevant branches. Chapter One PDFs for Sewing, Cooking, and Programming are currently published.',
      join:'Choose Join in the top navigation or Free Membership near the bottom of the page.',
      shop:'Visit the Shop section for available learning files and product information.',
      fallback:'I can help with the learning branches, Sewing, Cooking, Programming, Languages, learning files, and membership. Please make your question a little more specific.'
    }
  };
  function updateLanguage() {
    const t = copy[isEnglish() ? 'en' : 'fa'];
    welcome.textContent = t.welcome;
    first.textContent = t.first;
    input.placeholder = t.placeholder;
    document.getElementById('noventraAIFoot').textContent = t.foot;
    launcher.setAttribute('aria-label', isEnglish() ? 'Open NOVENTRA AI' : 'باز کردن دستیار نوونترا');
    close.setAttribute('aria-label', isEnglish() ? 'Close assistant' : 'بستن دستیار');
    voice.setAttribute('aria-label', isEnglish() ? 'Speak to NOVENTRA AI' : 'صحبت با دستیار');
  }
  function openPanel() {
    panel.hidden = false;
    launcher.setAttribute('aria-expanded','true');
    launcher.classList.add('is-open');
    input.focus();
  }
  function closePanel() {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded','false');
    launcher.focus();
    if (recognition) recognition.stop();
  }
  function addMessage(text, who, links) {
    const bubble = document.createElement('div');
    bubble.className = 'noventra-ai-message ' + who;
    bubble.textContent = text;
    if (links && links.length) {
      const line = document.createElement('div');
      line.style.marginTop = '7px';
      links.forEach(item => {
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.label;
        line.appendChild(a);
        line.appendChild(document.createTextNode('  ↗  '));
      });
      bubble.appendChild(line);
    }
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }
  function answerFor(message) {
    const q = message.toLocaleLowerCase().replace(/[؟?!.,،؛:]/g, ' ').replace(/\s+/g, ' ').trim();
    const t = copy[isEnglish() ? 'en' : 'fa'];
    const has = (...terms) => terms.some(term => q.includes(term));
    // Handle greetings and capability questions before broad topic matches.
    if (has('سلام','درود','hello','hi ','hey')) return isEnglish()
      ? 'Hello! I’m NOVENTRA’s learning guide. Ask me where to find a course, what each learning path covers, or how to use the learning files.'
      : 'سلام! خوش آمدی. من راهنمای مسیرهای آموزشی نوونترا هستم. می‌توانی دربارهٔ دوره‌ها، فایل‌ها و بخش‌های سایت از من بپرسی.';
    if (has('چه کار','چیکار','چه کمکی','کمک می','قابلیت','can you','what can you')) return isEnglish()
      ? 'I can currently guide you around the NOVENTRA website: its four learning paths, published chapter files, membership area, and shop. I do not yet teach lessons or answer open-ended questions like a full AI tutor.'
      : 'فعلاً می‌توانم در پیدا کردن مسیرهای آموزشی، فصل‌های منتشرشده، عضویت و فروشگاه نوونترا راهنمایی‌ات کنم. هنوز به یک مدل هوش مصنوعی کامل متصل نیستم و جای مدرس دوره را نمی‌گیرم.';
    if (has('شاخه','مسیر','چه آموزش','چه دوره','دوره ها','دوره‌ها','رشته','branches','learning paths','courses')) return t.branches;
    if (has('خیاط','دوخت','الگو','اندازه گیری','اندازه‌گیری','متریک','مولر','sewing','tailor','pattern','muller','metric')) return t.sewing;
    if (has('آشپز','غذا','آشپزی','دستور پخت','دستورپخت','kitchen','cooking','recipe','food')) return t.cooking;
    if (has('برنامه نویس','برنامه‌نویس','کدنویسی','کد','پایتون','جاوا','سی پلاس','سی‌پلاس','python','java','c++','programming','coding')) return t.programming;
    if (has('زبان انسانی','زبان انگلیسی','زبان فرانسه','زبان آلمانی','مکالمه','گرامر','واژگان','languages','english','french','german','conversation','grammar')) return t.languages;
    if (has('زبان','language')) return isEnglish()
      ? 'Do you mean a human language (such as English), or a programming language (such as Python)? Human languages belong to NOVENTRA Languages; coding belongs to NOVENTRA Programming.'
      : 'منظورت زبان انسانی مثل انگلیسی است یا زبان برنامه‌نویسی مثل پایتون؟ زبان‌های انسانی در NOVENTRA Languages و زبان‌های برنامه‌نویسی در شاخهٔ Programming قرار می‌گیرند.';
    if (has('فایل','pdf','فصل','کتابخانه','دانلود','file','chapter','library','download')) return t.files;
    if (has('عضو','ثبت نام','ثبت‌نام','حساب','ورود','عضویت','join','sign up','membership','account','login')) return t.join;
    if (has('خرید','فروشگاه','پرداخت','قیمت','shop','buy','purchase','payment','price')) return t.shop;
    if (has('ربات','دستیار','هوش مصنوعی','هوشمند','ai assistant','chatbot','artificial intelligence')) return isEnglish()
      ? 'NOVENTRA AI is the website guide. It can point learners to the right section, but it is still an early prototype and is not connected to a generative AI service yet.'
      : 'NOVENTRA AI راهنمای سایت است. فعلاً می‌تواند هنرجو را به بخش مناسب هدایت کند؛ اما هنوز نسخهٔ آزمایشی است و به سرویس هوش مصنوعی مولد وصل نشده است.';
    return isEnglish()
      ? 'I’m not certain what you mean yet. Are you asking about a NOVENTRA course, a chapter PDF, membership, or the shop? Tell me the topic and I’ll point you to the right place.'
      : 'هنوز دقیق متوجه منظورت نشدم. سؤالت دربارهٔ کدام موضوع است: دوره‌های نوونترا، فایل فصل‌ها، عضویت یا فروشگاه؟ موضوع را مشخص کن تا راهنمایی‌ات کنم.';
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isEnglish() ? 'en-US' : 'fa-IR';
    utterance.rate = .96;
    window.speechSynthesis.speak(utterance);
  }
  function respond(message) {
    const clean = message.trim();
    if (!clean) return;
    addMessage(clean,'user');
    const reply = answerFor(clean);
    lastReply = reply;
    window.setTimeout(() => addMessage(reply,'assistant'), 180);
  }
  launcher.addEventListener('click', () => panel.hidden ? openPanel() : closePanel());
  close.addEventListener('click',closePanel);
  form.addEventListener('submit',event => { event.preventDefault(); const value=input.value; input.value=''; respond(value); });
  quick.addEventListener('click',event => {
    const button=event.target.closest('button[data-ai-prompt]');
    if (!button) return;
    respond(button.getAttribute('data-ai-prompt'));
  });
  document.addEventListener('keydown',event => { if (event.key==='Escape' && !panel.hidden) closePanel(); });
  if (voice) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.interimResults = false;
      recognition.continuous = false;
      recognition.onstart = () => voice.classList.add('is-listening');
      recognition.onend = () => voice.classList.remove('is-listening');
      recognition.onerror = () => voice.classList.remove('is-listening');
      recognition.onresult = event => {
        const spoken = event.results[0][0].transcript;
        input.value = spoken;
        respond(spoken);
      };
      voice.addEventListener('click',() => {
        recognition.lang = isEnglish() ? 'en-US' : 'fa-IR';
        try { recognition.start(); } catch (_) {}
      });
    } else {
      voice.addEventListener('click',() => addMessage(isEnglish() ? 'Voice input is not available in this browser. You can still type your message.' : 'ورودی صوتی در این مرورگر پشتیبانی نمی‌شود؛ می‌توانی پیام را تایپ کنی.','assistant'));
    }
  }
  document.getElementById('languageToggle')?.addEventListener('click',() => window.setTimeout(updateLanguage,0));
  updateLanguage();
})();
