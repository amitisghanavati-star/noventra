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
  let libraryCatalog = null;
  fetch('knowledge/noventra-library.json')
    .then(response => { if (!response.ok) throw new Error('Library catalog unavailable'); return response.json(); })
    .then(data => { libraryCatalog = data; })
    .catch(() => { libraryCatalog = null; });
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
    const q = message.toLocaleLowerCase()
      .replace(/[؟?!.,،؛:]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const en = isEnglish();
    const t = copy[en ? 'en' : 'fa'];
    const has = (...terms) => terms.some(term => q.includes(term));
    const reply = (fa, english) => en ? english : fa;

    // Respond to the learner's actual intent before classifying the subject.
    // Answer catalog questions from the published, versioned NOVENTRA knowledge file.
    if (libraryCatalog && has('چه شاخه','چه دوره','چه فصل','کدام فصل','چه فایل','فایل های منتشر','فایل‌های منتشر','منتشر شده','منتشرشده','what courses','which courses','published files','available chapters')) {
      const lines = libraryCatalog.branches.map(branch => {
        const published = branch.published.map(item => en
          ? 'Chapter ' + item.chapter + ': ' + item.title_en
          : 'فصل ' + item.chapter + ': ' + item.title_fa).join('، ');
        const status = published || (en ? 'No chapter PDF published yet' : 'هنوز فایل فصل منتشر نشده');
        return (en ? branch.name + ': ' : branch.name_fa + ': ') + status;
      });
      return lines.join('\\n') + (en
        ? '\\nOnly listed files are confirmed as published.'
        : '\\nاین فهرست فقط فایل‌های ثبت‌شده و منتشرشده را تأیید می‌کند.');
    }

    if (has('سلام','درود','صبح بخیر','عصر بخیر','شب بخیر','hello','hi','hey','good morning')) {
      return reply(
        'سلام، خوش آمدی! 😊 بگو دنبال یادگیری چه چیزی هستی یا در کدام قسمت سایت به راهنمایی نیاز داری.',
        'Hello and welcome! 😊 Tell me what you want to learn or where you need help on the site.'
      );
    }
    if (has('تو کی هستی','اسمت چیه','نامت چیست','who are you','your name')) {
      return reply(
        'من NOVENTRA AI هستم؛ راهنمای یادگیری نوونترا. کارم کمک به پیدا کردن دوره‌ها، فایل‌ها و مسیر درست یادگیری است؛ مدرس دوره‌ها نیستم.',
        'I’m NOVENTRA AI, the learning guide for NOVENTRA. I help learners find courses, files, and the right learning path; I am not the course instructor.'
      );
    }
    if (has('چه کار','چیکار','چه کمکی','قابلیت','چه بلدی','can you','what can you','help me')) {
      return reply(
        'می‌توانم مسیرهای آموزشی نوونترا را معرفی کنم، محل فایل‌های منتشرشده را نشان بدهم و برای عضویت یا فروشگاه راهنمایی کنم. هنوز به هوش مصنوعی مولد متصل نیستم و برای پرسش‌های تخصصی باید به محتوای درس یا مدرس مراجعه کنی.',
        'I can introduce NOVENTRA’s learning paths, help locate published files, and guide you through membership and the shop. I am not yet connected to a generative AI model, so specialist questions should be checked against the lessons or with the instructor.'
      );
    }

    // Müller is a patternmaking system, not a website library or a programming term.
    // Handle it before broad sewing/library matches so the learner gets a relevant answer.
    if (has('مولر','muller','müller')) {
      if (has('کتابخانه','library')) return reply(
        'متد مولر را در کتابخانهٔ عمومی سایت جست‌وجو نکن؛ آن بخش فعلاً آرشیو عمومی منابع است. برای معرفی سیستم‌های الگوسازی، از منوی بالای سایت روی «روش‌های الگوسازی» بزن. اگر دنبال جزوه یا درس کامل مولر هستی، هنوز باید محتوای آن درس به کتابخانه اضافه شود.',
        'Do not look for the Müller method in the general Library; that area is currently a general resource archive. Use “Patternmaking Methods” in the top menu for the introduction to pattern systems. A full Müller lesson or handout must be added to the Library first.'
      );
      if (has('کجا','از کجا','پیدا','بخش','where','find','section')) return reply(
        'برای معرفی متد مولر، از منوی بالای سایت وارد «روش‌های الگوسازی» شو. کتابخانهٔ عمومی سایت فعلاً درس کامل مولر را در اختیار ندارد.',
        'For an introduction to Müller, open “Patternmaking Methods” from the top menu. The general Library does not currently contain a full Müller lesson.'
      );
      if (has('چیست','چیه','یعنی چه','توضیح','معرفی','what is','explain','meaning')) return reply(
        'متد مولر (Müller) یکی از سیستم‌های الگوسازی لباس است. در این روش، الگو بر پایهٔ اندازه‌های بدن و قواعد مخصوص همان سیستم رسم و تنظیم می‌شود. برای یادگیری درست، باید مراحل و فرمول‌های خودِ متد مولر را جدا از متد متریک دنبال کنی؛ من نباید جزئیات درس NOVENTRA را حدس بزنم.',
        'The Müller method is a clothing patternmaking system. Patterns are drafted and adjusted using body measurements and the rules specific to that system. Learn its steps and formulas separately from the Metric method; I should not guess the details of NOVENTRA’s lesson.'
      );
      return reply(
        'متد مولر مربوط به الگوسازی لباس است. برای معرفی سیستم‌ها، بخش «روش‌های الگوسازی» در صفحهٔ اصلی نوونترا را باز کن. اگر منظورت یک مرحله یا فرمول مشخص از متد مولر است، نام همان مرحله را بپرس تا راهنمایی‌ات کنم؛ اگر هنوز در درس‌های منتشرشده نیست، صریح می‌گویم.',
        'Müller is a clothing patternmaking system. Open “Patternmaking Methods” on the NOVENTRA home page for an introduction. If you mean a particular step or formula, ask about that step and I’ll guide you; if it is not covered in the published lessons yet, I’ll say so.'
      );
    }

    // Specific branch questions and useful follow-up directions.
    // Check Chapter Two explicitly before the broad cooking-file response.
    if (has('آشپز','غذا','آشپزی','kitchen','cooking') &&
        has('فصل','chapter') &&
        has('دوم','۲','2','second','two')) {
      const kitchen = libraryCatalog?.branches?.find(branch => branch.id === 'kitchen');
      const chapterTwo = kitchen?.published?.find(item => item.chapter === 2);
      if (chapterTwo) {
        const href = chapterTwo.url || chapterTwo.file;
        return reply(
          'فصل دوم آشپزی منتشر شده است. برای مطالعه، وارد NOVENTRA Kitchen شو و فایل فصل دوم را باز کن: ' + href,
          'Cooking Chapter Two is published. Open NOVENTRA Kitchen and select the Chapter Two file: ' + href
        );
      }
      return reply(
        'فصل دوم آشپزی هنوز در سایت منتشر نشده است. در حال حاضر فقط فصل اول منتشر شده؛ برای مطالعه آن وارد بخش NOVENTRA Kitchen شو و گزینه «مطالعه فصل اول» را انتخاب کن. به‌محض انتشار فصل دوم، وضعیت این راهنما هم به‌روزرسانی می‌شود.',
        'Cooking Chapter Two has not been published on the website yet. Only Chapter One is currently available. Visit NOVENTRA Kitchen and choose “Read Chapter One”. This guide will be updated when Chapter Two is published.'
      );
    }
    if (has('آشپز','غذا','آشپزی','دستور پخت','دستورپخت','kitchen','cooking','recipe','food')) {
      if (has('فصل','pdf','فایل','دانلود','chapter','file','download')) return reply(
        'برای دریافت محتوای آشپزی، به بخش NOVENTRA Kitchen در صفحه برو و لینک «مطالعه فصل اول آشپزی» را باز کن. فصل اول منتشر شده است؛ فصل دوم در برنامهٔ آموزشی بعدی قرار دارد.',
        'Open the NOVENTRA Kitchen section and select “Read Chapter One — Cooking (PDF)”. Chapter One is published; Chapter Two is part of the upcoming learning plan.'
      );
      if (has('کجا','از کجا','پیدا','where','find')) return reply(
        'بخش آشپزی در صفحهٔ اصلی با عنوان NOVENTRA Kitchen مشخص شده است. از منوی بالای سایت هم می‌توانی به آن بروی.',
        'Find NOVENTRA Kitchen on the main page, or use the top navigation to reach it.'
      );
      return reply(
        'شاخهٔ NOVENTRA Kitchen برای آموزش آشپزی طراحی شده است؛ هدف فقط ارائهٔ دستور نیست، بلکه شناخت مواد اولیه، طعم‌ها، دلیل هر مرحله و تکنیک اجرای درست است. برای شروع، فصل اول منتشرشده را بخوان.',
        'NOVENTRA Kitchen teaches more than recipes: it explains ingredients, flavor, the reason behind each step, and practical technique. Start with the published first chapter.'
      );
    }
    if (has('خیاط','دوخت','الگو','اندازه گیری','اندازه‌گیری','متریک','مولر','sewing','tailor','pattern','muller','metric')) {
      if (has('فصل','pdf','فایل','دانلود','chapter','file','download')) return reply(
        'فایل فصل اول خیاطی از لینک «مطالعهٔ فصل اول خیاطی NOVENTRA» در صفحه باز می‌شود. برای ادامهٔ آموزش، بخش خیاطی و کتابخانه را دنبال کن.',
        'Open “Read the first chapter of NOVENTRA Sewing” on the page to access the first chapter PDF. Follow the Sewing and Library sections for further lessons.'
      );
      if (has('متریک','مولر','muller','metric','روش')) return reply(
        'نوونترا روش‌های الگوسازی را جداگانه آموزش می‌دهد تا منطق هر سیستم روشن باشد؛ از جمله متریک و مولر، و در ادامه روش‌های دیگر و الگوهای تجاری. برای انتخاب روش، به درس مربوط به همان سیستم مراجعه کن.',
        'NOVENTRA presents patternmaking systems separately so learners can understand each system’s logic, including Metric and Müller, followed by other methods and commercial patterns. See the lesson for the method you are studying.'
      );
      return reply(
        'مسیر خیاطی نوونترا از شناخت ابزار و پارچه شروع می‌شود و به اندازه‌گیری، الگوسازی، برش، دوخت و پرداخت می‌رسد. اصل آموزش این است که دلیل هر خط و مرحله را بفهمی، نه اینکه فقط فرمول‌ها را حفظ کنی.',
        'The NOVENTRA Sewing path begins with tools and fabric, then moves through measurements, patternmaking, cutting, sewing, and finishing. The goal is to understand why each line and step matters, not just memorize formulas.'
      );
    }
    if (has('برنامه نویس','برنامه‌نویس','کدنویسی','کد','پایتون','جاوا','سی پلاس','سی‌پلاس','python','java','c++','programming','coding','algorithm')) {
      if (has('فصل','pdf','فایل','دانلود','chapter','file','download')) return reply(
        'برای مطالعهٔ فصل اول برنامه‌نویسی، وارد بخش NOVENTRA Programming شو و لینک PDF همان بخش را باز کن.',
        'Open the NOVENTRA Programming section and select its Chapter One PDF link.'
      );
      if (has('از کجا','شروع','اول','begin','start','where')) return reply(
        'مسیر برنامه‌نویسی نوونترا با مبانی برنامه‌نویسی و الگوریتم آغاز می‌شود و سپس به زبان C و مباحث پیشرفته‌تر می‌رسد. بهتر است مفاهیم پایه را محکم یاد بگیری و بعد سراغ زبان بعدی بروی.',
        'NOVENTRA Programming starts with programming fundamentals and algorithms, then moves to C and more advanced topics. Build a strong foundation before moving to the next language.'
      );
      return reply(
        'شاخهٔ Programming برای آموزش مبانی برنامه‌نویسی، الگوریتم‌ها و زبان‌های برنامه‌نویسی است. برنامهٔ توسعهٔ نوونترا می‌تواند در ادامه موضوعات گسترده‌تر علوم کامپیوتر را هم پوشش دهد.',
        'The Programming branch covers programming fundamentals, algorithms, and programming languages. NOVENTRA may expand this path to broader computer-science subjects as it develops.'
      );
    }
    if (has('زبان انسانی','زبان انگلیسی','زبان فرانسه','زبان آلمانی','مکالمه','گرامر','واژگان','languages','english','french','german','conversation','grammar')) {
      return reply(
        'شاخهٔ NOVENTRA Languages برای زبان‌های انسانی طراحی شده است؛ با مسیرهایی برای واژگان، دستور زبان، مکالمه، شنیدار، خواندن و نوشتن. زبان‌های برنامه‌نویسی در شاخهٔ جداگانهٔ Programming هستند.',
        'NOVENTRA Languages is for human languages, with learning paths for vocabulary, grammar, conversation, listening, reading, and writing. Programming languages belong to the separate Programming branch.'
      );
    }
    if (has('زبان','language')) return reply(
      'منظورت زبان انسانی مثل انگلیسی و آلمانی است یا زبان برنامه‌نویسی مثل Python و C؟ اولی در NOVENTRA Languages و دومی در NOVENTRA Programming قرار می‌گیرد.',
      'Do you mean a human language such as English or German, or a programming language such as Python or C? Human languages belong to NOVENTRA Languages; coding belongs to NOVENTRA Programming.'
    );
    if (has('فایل','pdf','فصل','کتابخانه','دانلود','file','chapter','library','download')) {
      return reply(
        'در حال حاضر فصل اول سه شاخه منتشر شده است: خیاطی، آشپزی و برنامه‌نویسی. برای هرکدام وارد بخش مربوط در صفحه شو و لینک PDF همان شاخه را انتخاب کن.',
        'Chapter One PDFs are currently published for Sewing, Cooking, and Programming. Open the relevant branch on the website and select its PDF link.'
      );
    }
    if (has('عضو','ثبت نام','ثبت‌نام','حساب','ورود','عضویت','join','sign up','membership','account','login')) {
      if (has('چطور','چگونه','how','روش')) return reply(
        'برای عضویت، دکمهٔ «عضویت رایگان» را در پایین صفحه یا گزینهٔ عضویت در منوی بالا انتخاب کن. سپس فرم ایجاد حساب را تکمیل کن.',
        'Select “Free Membership” near the bottom of the page or Join in the top menu, then complete the account creation form.'
      );
      return t.join;
    }
    if (has('خرید','فروشگاه','پرداخت','قیمت','shop','buy','purchase','payment','price')) {
      return reply(
        'اطلاعات فایل‌های آموزشی در بخش فروشگاه قرار دارد. برای محصولات پولی، مبلغ و راهنمای کارت‌به‌کارت در پنجرهٔ خرید نمایش داده می‌شود؛ تأیید پرداخت فعلاً دستی است.',
        'Product information is listed in the Shop. For paid products, the price and manual bank-transfer instructions appear in the purchase window; payment confirmation is currently handled manually.'
      );
    }
    if (has('ربات','دستیار','هوش مصنوعی','هوشمند','ai assistant','chatbot','artificial intelligence')) {
      return reply(
        'NOVENTRA AI در حال حاضر نمونهٔ اولیهٔ راهنمای سایت است و هنوز به مدل هوش مصنوعی واقعی متصل نشده. می‌تواند مسیرهای مشخص سایت را معرفی کند؛ برای پاسخ‌گویی آزاد و گفت‌وگوی هوشمند، اتصال امن به سرویس AI لازم است.',
        'NOVENTRA AI is currently an early website-guide prototype and is not connected to a real AI model yet. It can direct learners around the site; open-ended intelligent conversation requires a secure AI service connection.'
      );
    }
    return reply(
      'برای اینکه درست راهنمایی‌ات کنم، کمی بیشتر توضیح بده. می‌توانی نام دوره، موضوع درس، فایل موردنظر یا کاری را که می‌خواهی در سایت انجام بدهی بنویسی. اگر پرسشت تخصصی و خارج از راهنمای سایت باشد، صادقانه می‌گویم که هنوز پاسخ‌گوی آن نیستم.',
      'Please add a little context so I can guide you accurately. You can mention a course, lesson topic, file, or task you want to complete on the site. If your question is outside the website guide’s scope, I’ll say so rather than guess.'
    );
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
