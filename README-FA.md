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
