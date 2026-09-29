# Barber Bros: build brief (for Claude; not shipped)

## Brand
- **Colours, two only:**
  - Jar Blue `#1F9AD6` (Barbicide jar blue) is the drenched page ground.
  - Ink `#0C0F12` is for type, the chair and controls.
  - Tones come from color-mix of the two. Gold and white appear only inside the 3D render and in photographs. Ink on blue gives about 6:1.
- **Type:**
  - Big Shoulders Display (variable 100-900, public/fonts/big-shoulders.woff2) for poster, headings, prices and labels: uppercase, weight 800-900, tracking -0.01em.
  - Schibsted Grotesk (public/fonts/schibsted.woff2) for text, 400-600.
- **Logo:**
  - Mark: two geometric B's mirrored on a shared vertical stem. Each bowl is a D-shape (rect + half-circle), two bowls per side, stacked, so the mark is symmetric and reads as "bros".
  - Wordmark: BARBER BROS in Big Shoulders Display 900.
  - Lockups: horizontal (mark + wordmark), stacked, mark alone.
  - Files: public/brand/*.svg, with paths only for the mark and text in the display face for the wordmark (note: convert to outlines for print).
- **Shape:** interactive = pills; price board = ruled rows with dot leaders (a barber menu board); photo frames = square corners.

## Site (single page + /brand/ + 404)
1. **Hero, "the chair scene":** the sticky canvas is pinned over about 300vh of scroll. BARBER BROS runs at poster size behind the chair (DOM text, not canvas). The pills are "Book on WhatsApp" (primary) and "Call", plus Stop animations. Chapters over the scroll (DOM captions): front view with the name, then a side orbit ("The cut"), then a close-up of the headrest ("The shave"), then a pull back with the booking pills ("Your chair is ready").
   - Camera keyframes are driven by ScrollTrigger scrub.
   - Reduced motion or Stop: no pin, static render image and captions as normal sections.
2. **Services and prices:** a menu board. Haircut, skin fade, beard trim, hot-towel shave, cut + beard, kids' cut. Durations and prices are SAMPLE, marked.
3. **The barbers:** photo frames (placeholders), "Names and photos from the shop".
4. **Visit:** address, hours, map link (placeholders), WhatsApp and call.
5. **Footer:** logo, links, /brand/, the preview note.

**Preview ribbon** at the top: "Preview. Prices, hours and address are samples until the shop confirms them."

## 3D chair (procedural three.js)
- **Parts:**
  - hydraulic base: a lathe profile in gold
  - pump pedal, footrest (gold bar + plate)
  - seat cushion and backrest: RoundedBoxGeometry in black leather, MeshPhysicalMaterial with sheen, roughness 0.45
  - headrest on a gold rod
  - armrests: leather on gold supports
  - piping/tufting: horizontal grooves as thin inset boxes
- **Lighting:** RoomEnvironment (PMREM) for the gold metal, a key light plus a blue-tinted rim; a soft contact shadow as a radial-gradient plane. Background is transparent, so the blue page shows through.
- **Performance:** pixel ratio capped at 1.75, antialias on, geometry under 60k triangles, and rendering only while in view. The renderer runs from gsap.ticker (one rAF owner).
- **Fallback:** public/img/chair-*.webp renders captured with headless Chrome.

## Files
- src/styles/global.css (tokens, reset, primitives from awwwards-blueprints base.css)
- src/data/shop.ts (all shop facts, with placeholder flags)
- src/components: Header, Footer, Logo (mark + wordmark), Icon, PriceBoard, PhotoFrame
- src/scripts: app.ts, motion.ts (one engine), chair.ts (three scene), prefs.ts (Stop switch)
- src/pages: index.astro, brand.astro, 404.astro
- tools/shot.mjs (copy from award-anatomy)
