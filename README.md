# Barber Bros

Brand and website for Barber Bros, a barbershop in Fier, Albania. The site is in Albanian.

- **The chair scene:** a black leather barber chair drawn in three.js. Scrolling takes the camera once round it, while captions tell the cut, the shave and "Karrigia jote të pret".
- **Booking in one tap:** every "Rezervo" button opens WhatsApp with the message typed; "Telefono" calls the shop.
- **Brand:** two colours (blu berberi `#1F9AD6`, e zezë `#0C0F12`), a double-B mark, Big Shoulders Display and Schibsted Grotesk. The guidelines live at `/brand/`.

Status: preview. Photos, the barbers' names and the other prices are still to come from the shop, see [NEEDS_CONTENT.md](NEEDS_CONTENT.md). Not deployed; pages carry `noindex`.

## Run it

```bash
npm install
npm run dev       # http://127.0.0.1:3690
npm run build     # static site in dist/
npm run preview   # the built site on http://127.0.0.1:3691
```

## Where things live

| What | Where |
| --- | --- |
| Shop facts: address, phone, WhatsApp, hours, prices | `src/data/shop.ts` |
| Colours and the mark's geometry | `src/data/brand.ts` |
| The chair and its scroll camera | `src/scripts/chair.ts` |
| Scroll, reduced motion and the "Ndalo animacionet" switch | `src/scripts/motion.ts`, `src/scripts/app.ts` |
| Name and wordmark as font outlines, never live type | `src/lib/outline.ts` |
| Downloadable logo, built from the same outlines | `src/pages/brand/barber-bros-logo.svg.ts` |

## Tools

- `node tools/render-stills.mjs`: renders the chair's still images in `public/img/` (the fallback when motion is off, and the section images). Needs the dev server running.
- `py tools/instance-font.py`: cuts the static weight-900 font `src/lib/outline.ts` reads. Rerun only if the display font changes.
- `node tools/shot.mjs <url> <out.png>`: screenshots in headless Chrome.

## Stack

Astro (static), three.js, GSAP with ScrollTrigger, Lenis. One animation loop: the GSAP ticker drives the scroll and the chair.

Fonts: Big Shoulders Display and Schibsted Grotesk, both SIL Open Font License. Icons: Phosphor (MIT).
