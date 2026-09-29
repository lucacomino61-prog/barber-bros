# Barber Bros: what the shop still has to give us

Barber Bros is a real shop in Fier, Albania, so nothing may be invented. Every fact lives in
`src/data/shop.ts`. The site is in Albanian (`lang="sq"`).

## Confirmed (2026-09-29)

- **Name:** Barber Bros. The Google Maps listing spells it "Barber Bro’s"; the brand does not.
- **Address:** Rruga Jakov Xoxa, Fier. The "Hap hartën" button opens the Google Maps listing.
- **Phone and WhatsApp:** +355 69 299 1511. Every "Telefono" button rings it, and every "Rezervo"
  button opens a WhatsApp chat to it with the booking message typed.
- **Hours:** every day, 09:00-22:00.
- **Prices:** a haircut (prerje flokësh) costs 500 lekë, the lowest price in the shop.

The address, phone and hours come from the shop's Google Maps listing, which Luca confirmed
is correct.

## Still needed

| # | What | Where it goes | What the site does until then |
| --- | --- | --- | --- |
| 1 | The other prices, in lekë: fade, beard trim, shave, anything else they offer | `shop.prices.rows` | Shows the haircut at 500 L and says the other prices are asked in the shop, by phone or on WhatsApp |
| 2 | Confirm the services the site names: fade, beard trim (rregullim mjekre), hot-towel shave (rruajtje me peshqir të nxehtë) | the scroll captions in `src/pages/index.astro`, `shop.prices.others` | Names them as offered |
| 3 | How many barbers, their names, one portrait each (4:5, at least 1200 x 1500 px) | `shop.team`, `src/pages/index.astro` #berberet | Two ink frames, "Foto nga dyqani" and "Emri së shpejti" |
| 4 | Instagram, TikTok or Facebook, if they want them linked | `shop.instagram` | No social links |
| 5 | Domain | `astro.config.mjs` `site` | Runs on localhost only |

## Photos we would like from the shop

The chair in the scroll scene is a 3D model drawn in code (black leather, chrome base), not
their chair. No photos were generated: the Higgsfield account had 0.1 credits on a free plan.
The section images are renders of the same 3D chair.

- A photo of their actual chair (front and side). If it is not black leather on chrome,
  the 3D chair gets repainted to match: `src/scripts/chair.ts`, then `node tools/render-stills.mjs`.
- Two or three shots of the room: the mirror wall, the counter, the sign outside.
- Work shots they are proud of (fades, beards), with the customer's permission.

## Brand sign-off

- The double-B mark, jar blue `#1F9AD6` ("blu berberi") and ink `#0C0F12` are a proposal. The owner
  approves them before anything is printed. Guidelines: `/brand/`.
- `/brand/barber-bros-logo.svg` is generated at build time from font outlines, so it prints
  without the font installed.

## Nothing invented

- No reviews, star ratings, "years of experience", awards or customer counts appear on the
  site. Google shows 5.0 from 5 reviews; quote them only if the owner wants that.

## At launch

1. Fill everything above; set `shop.team.sample` to `false`.
2. Delete the black "Parapamje" ribbon (`src/components/Header.astro`, first line) and the
   preview note in `src/components/Footer.astro`.
3. Remove `<meta name="robots" content="noindex, nofollow">` from `src/layouts/Base.astro`.
4. `npm run build`, check `dist/`, deploy only when asked.
