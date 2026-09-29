# Barber Bros

Brand and website for Barber Bros, a barbershop in Fier, Albania. Albanian at `/`, English at `/en/`.

- **The chair scene:** a black leather barber chair drawn in three.js. Scrolling takes the camera once round it, while captions tell the cut, the shave and "Karrigia jote të pret". On a computer the chair can be grabbed and turned; it settles back on its angle.
- **Booking in one tap:** every "Rezervo" button opens WhatsApp with the message typed; "Telefono" calls the shop. The "Merr termin" helper writes the message from a service, a day and a time; the barber confirms in the chat.
- **Open now:** the top strip says whether the shop is open, on Albanian time, and switches SQ / EN.
- **Map:** the streets around the shop, drawn from OpenStreetMap in the brand colours.
- **Link previews and Google:** a share image per language, and the shop as a `HairSalon` in schema.org data.
- **Brand:** two colours (blu berberi `#1F9AD6`, e zezë `#0C0F12`), a double-B mark, Big Shoulders Display and Schibsted Grotesk. The guidelines live at `/brand/`.

Status: preview. Photos, the barbers' names and the other prices are still to come from the shop, see [NEEDS_CONTENT.md](NEEDS_CONTENT.md). Not deployed; pages carry `noindex`.

## Run it

```bash
npm install
npm run dev       # http://127.0.0.1:3690
npm run build     # static site in dist/ (set SITE_URL to the real domain at launch)
npm run preview   # the built site on http://127.0.0.1:3691
```

## Where things live

| What | Where |
| --- | --- |
| Shop facts: address, phone, WhatsApp, hours, services, prices | `src/data/shop.ts` |
| Every word, Albanian and English | `src/i18n/copy.ts` |
| The pages (one component per page, both languages) | `src/components/HomePage.astro`, `src/components/BrandPage.astro` |
| Colours and the mark's geometry | `src/data/brand.ts` |
| The chair, its scroll camera and the drag | `src/scripts/chair.ts` |
| Open now, the booking helper | `src/scripts/open.ts`, `src/scripts/book.ts` |
| Scroll, reduced motion and the "Ndalo animacionet" switch | `src/scripts/motion.ts`, `src/scripts/app.ts` |
| The map and its data | `src/components/StreetMap.astro`, `src/data/map-fier.json` |
| Name and wordmark as font outlines, never live type | `src/lib/outline.ts` |
| Downloadable logo, built from the same outlines | `src/pages/brand/barber-bros-logo.svg.ts` |

## Tools

- `node tools/render-stills.mjs`: renders the chair's still images in `public/img/`. Needs the dev server running.
- `node tools/og.mjs`: makes the link-preview images `public/og/sq.jpg` and `public/og/en.jpg`.
- `node tools/fetch-map.mjs`: refreshes the map data from OpenStreetMap (Overpass API).
- `py tools/instance-font.py`: cuts the static weight-900 font `src/lib/outline.ts` reads. Rerun only if the display font changes.
- `node tools/shot.mjs <url> <out.png>`: screenshots in headless Chrome.

## Stack

Astro (static), three.js, GSAP with ScrollTrigger, Lenis. One animation loop: the GSAP ticker drives the scroll, the chair and its drag.

Fonts: Big Shoulders Display and Schibsted Grotesk, both SIL Open Font License. Icons: Phosphor (MIT). Map data © OpenStreetMap contributors (ODbL).
