# Katie Nicolle — Mini Session Collection

A bright, editorial landing page for Katie Nicolle Photography's seasonal mini sessions.

**Production:** https://katie-nicolle-mini-sessions.vercel.app

## Preview locally

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Updating a gallery

Session content lives in the `sessions` array at the top of `app.js`. Each session points to a named folder and image count; `imageRange()` builds the gallery automatically. Add optimized photographs using the existing three-digit naming pattern (`001.jpg`, `002.jpg`, and so on), then update that session's `count`.

Every photograph in the five supplied mini-session folders is included: 82 Flower Farm, 43 Tree Farm, 48 Beamers Falls, 42 Dundurn Castle and 35 Village Co Studio images, for 250 bookable-session frames total. Eight supporting Hamilton Beach photographs are used elsewhere in the editorial layout. The Drive source files remain untouched and no AI-generated imagery is included.

Tree Farm uses a revision-specific asset directory. When that Drive folder changes, publish a new asset directory instead of reusing the old URLs; image responses are intentionally cached as immutable for performance.

Each session gallery auto-advances every 1.5 seconds, supports pause/play, swipe, arrow-key controls and an enlarged lightbox with next/previous navigation. Progressive image hydration loads only the current and next frames, autoplay runs only near the visible viewport, and motion is disabled when a visitor requests reduced motion.

The visual session compass, season filters, shareable deep links and context-aware booking concierge help visitors compare settings and reach the correct official Pixieset checkout quickly. Responsive 600px-wide image variants keep mobile delivery lighter while preserving the larger originals for high-density and desktop displays.

The page keeps the five mini-session experiences immediately after the hero, follows them with Katie's reassuring mom-to-mom note, and closes with a moving editorial gallery that intentionally mixes photographs from every featured location.
