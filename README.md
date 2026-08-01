# Katie Nicolle — Mini Session Collection

A bright, editorial landing page for Katie Nicolle Photography's seasonal mini sessions.

**Production:** https://katie-nicolle-mini-sessions.vercel.app

## Preview locally

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Updating a gallery

Session content lives in the `sessions` array at the top of `app.js`. Each session points to a named folder and image count; `imageRange()` builds the gallery automatically. Add optimized photographs using the existing two-digit naming pattern (`01.jpg`, `02.jpg`, and so on), then update that session's `count`.

The page currently uses a curated, web-optimized collection of 77 original Katie Nicolle photographs from the supplied Google Drive: Flower Farm, Tree Farm, Beamers Falls, Dundurn Castle, Village Co Studio and Hamilton Beach. The source files remain untouched. No AI-generated imagery is included.

Each session gallery auto-advances every 1.5 seconds, supports pause/play, swipe, keyboard-aware controls and an enlarged lightbox with next/previous navigation. Autoplay runs only near the visible viewport to keep the richer galleries efficient, and motion is disabled when a visitor requests reduced motion.

The visual session compass, season filters, shareable deep links and context-aware booking concierge help visitors compare settings and reach the correct official Pixieset checkout quickly. Responsive 900px image variants keep mobile delivery lighter while preserving the 1200px originals for larger displays.

The page keeps the five mini-session experiences immediately after the hero, follows them with Katie's reassuring mom-to-mom note, and closes with a moving editorial gallery that intentionally mixes photographs from every featured location.
