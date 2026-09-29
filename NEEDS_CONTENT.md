# Barber Bros: what the shop still has to give us

Barber Bros is a real shop in Fier, Albania, so nothing may be invented. Every fact lives in
`src/data/shop.ts`; every word in `src/i18n/copy.ts`. The site is in Albanian at `/` and English at `/en/`.

## Confirmed (2026-09-29)

- **Name:** Barber Bros. The Google Maps listing spells it "Barber Bro’s"; the brand does not.
- **Address:** Rruga Jakov Xoxa, Fier. The "Hap hartën" button opens the Google Maps listing.
- **Phone and WhatsApp:** +355 69 299 1511. Every "Telefono" button rings it, and every "Rezervo"
  button opens a WhatsApp chat to it with the booking message typed.
- **Hours:** every day, 09:00-22:00.
- **Prices:** a haircut (prerje flokësh) costs 500 lekë, the lowest price in the shop.

The address, phone and hours come from the shop's Google Maps listing, which Luca confirmed
is correct.

## From the shop's own accounts (2026-09-29)

- **Instagram:** [@barber.___.bros](https://www.instagram.com/barber.___.bros/) ("Barber Bro’s", 1,050 followers).
  **TikTok:** [@barber.bros8](https://www.tiktok.com/@barber.bros8) ("Barber Bro’s"). Both linked in the address section,
  the footer and the Google data (`sameAs`).
- **The barbers**, from the Instagram bio: Edison (+355 69 473 7557, @edison_shametaj), Taulant
  (+355 69 299 1511, the shop number) and Danieli (+355 68 328 8053, @daniel.muratii). Each card calls its
  barber. Only the shop number is confirmed on WhatsApp.
- **"Punët tona":** 8 images from public Instagram posts (reel covers, 640 x 1136, cropped to 4:5),
  each linking to its post. Left out on purpose: the photo with the actor Odise Roshi (it would read as
  an endorsement) and a post with a child.
- **Their chairs are black and gold**: the 3D chair was repainted gold to match (2026-09-29).

## Still needed

| # | What | Where it goes | What the site does until then |
| --- | --- | --- | --- |
| 1 | The other prices, in lekë: fade, beard trim, shave, anything else they offer | `shop.prices.rows` | Shows the haircut at 500 L and says the other prices are asked in the shop, by phone or on WhatsApp |
| 2 | Confirm the services the site names: fade, beard trim (rregullim mjekre), hot-towel shave (rruajtje me peshqir të nxehtë) | the scroll captions in `src/pages/index.astro`, `shop.prices.others` | Names them as offered |
| 3 | One portrait of each barber (4:5, at least 1200 x 1500 px) | `src/components/HomePage.astro` #berberet | Three ink frames with the names and "Foto së shpejti" |
| 4 | OK from the owner to show the Instagram photos here (customers are recognisable), and the originals in full size | `public/img/ig/`, `src/data/gallery.ts` | Shows 8 reel covers at 640 px |
| 5 | Domain | `astro.config.mjs` `site` | Runs on localhost only |

## Photos we would like from the shop

The chair in the scroll scene is a 3D model drawn in code (black leather on gold, like theirs), not
their chair. No photos were generated: the Higgsfield account had 0.1 credits on a free plan.
The section images are renders of the same 3D chair.

- A photo of their actual chair (front and side), to match its shape and details more closely:
  `src/scripts/chair.ts`, then `node tools/render-stills.mjs` and `node tools/og.mjs`.
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

1. Fill everything above.
2. Delete the "Parapamje / Preview" tag in the top strip (`src/components/Header.astro`) and the
   preview note in the footer (`footer.note` in `src/i18n/copy.ts`).
3. Remove `<meta name="robots" content="noindex, nofollow">` from `src/layouts/Base.astro`.
4. Build with the real domain, so link previews, canonical and hreflang URLs point to it:
   `SITE_URL=https://the-domain npm run build`. Check `dist/`, deploy only when asked.
5. Keep "© OpenStreetMap contributors" under the map: the map data's licence (ODbL) requires it.
