# NOVENTRA — Immersive bilingual redesign

## What changed in this pass
- Shifted the visual system to a premium midnight palette with restrained champagne and electric-blue accents.
- Added a cinematic grid treatment to the hero, richer surfaces, stronger contrast, and more consistent styling across cards, archive, shop, and footer.
- Added a top-of-page reading progress indicator.
- Added subtle reveal-on-scroll motion, with support for the visitor’s reduced-motion preference.
- Added current-section navigation indication and a keyboard-accessible skip link.
- Fixed a bilingual translation selector that could replace every eyebrow label with the hero label when switching to English.
- Updated cache-busting query strings for the stylesheet and script.
- Preserved the original project backup and supplied assets.

## Run locally
Open `index.html` in a browser. For a more representative test, serve the folder with a local static server. The fashion gallery loads its photos from Unsplash and therefore requires an internet connection.

## Known limitations
- The store, account/registration, and payment flow are still informational placeholders; they are not backed by a server.
- The language toggle translates the current static page; this is not a CMS or server-side localization system.
- No GitHub repository connection or deployment was performed from this workspace.
- Before publishing, verify the site on target mobile devices and confirm that external image sources are acceptable for production.


## فروش آزمایشی کارت‌به‌کارت
- در بخش فروش، دکمهٔ خرید فصل اول و پنجرهٔ اطلاعات کارت اضافه شده است.
- دکمهٔ کپی شماره کارت و توضیح مبلغ ۹۹٬۰۰۰ تومان فعال است.
- این نسخه پرداخت را پردازش نمی‌کند، رسید را به سرور نمی‌فرستد و پرداخت را خودکار تأیید نمی‌کند.
- چون فایل PDF در مخزن عمومی قرار دارد، این رابط به‌تنهایی از دانلود مستقیم فایل جلوگیری نمی‌کند. برای فروش واقعی با دانلود محافظت‌شده باید درگاه پرداخت و یک سرویس سمت سرور/میزبانی فایل خصوصی راه‌اندازی شود.
- برای انتشار تغییرات، فایل‌های پوشهٔ `noventra-final` را در مخزن سایت جایگزین کن و تغییرات را Commit کن. اگر GitHub احراز هویت دومرحله‌ای می‌خواهد، ابتدا باید از روش رسمی بازیابی حساب استفاده شود.


## فصل سوم با قیمت ۱۰۰٬۰۰۰ تومان

کارت فصل سوم در صفحه فروش اضافه شده است. فایل PDF فصل سوم عمداً داخل این مخزن قرار داده نشده؛ GitHub Pages عمومی است و هر فایلی که در آن قرار بگیرد با لینک مستقیم قابل دریافت خواهد بود. پس از تأیید کارت‌به‌کارت، فایل PDF را جداگانه برای خریدار ارسال کنید. این نسخه رسید را دریافت یا پرداخت را خودکار تأیید نمی‌کند.
