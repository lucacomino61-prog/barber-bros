# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, static output. It is delegated to Claude, and matches Award Anatomy, which Luca approved. Other pieces:
- three.js for the one signature scene, loaded after first paint
- GSAP + ScrollTrigger + Lenis on one ticker
- fonts self-hosted
- no deploy target; nothing is deployed until Luca asks

## Users

People in and around Fier, Albania who want a haircut, a beard trim or a shave. They read Albanian, so the site is in Albanian (`lang="sq"`). They mostly look on a phone, and they need to know what the shop offers, what it costs, when it is open, where it is, and how to book: by WhatsApp or a call. Secondary user: Luca, who builds and hands the site to the shop owner.

## Product Purpose

This is the brand and website of Barber Bros, a real barbershop and Luca's client. It makes the shop look like the best chair in town and turns a visit into a WhatsApp message or a call within seconds.

## Positioning

To be confirmed with the shop. Until then the site claims nothing it cannot prove: no invented awards, reviews, founding year or team biographies.

## Operating Context

- Built by Luca for a client.
- Phone-first audience.
- Booking happens outside the site, in WhatsApp or by phone.

## Capabilities and Constraints

- Real client, so nothing may be invented. Confirmed on 2026-09-29: the name "Barber Bros"; address, phone and hours as on the shop's Google Maps listing (Rruga Jakov Xoxa, Fier; +355 69 299 1511; every day 09:00-22:00); the phone is also their WhatsApp; a haircut costs 500 lekë, the lowest price. Still unknown: the other prices, the barbers' names and photos, social links. The list lives in NEEDS_CONTENT.md.
- A preview ribbon on the site says photos, barbers' names and the other prices are still to come. Remove it at launch.
- Photos: Higgsfield generation was chosen but the account had 0.1 credits, so the photo slots are art-directed frames for the shop's real photos. The 3D chair renders carry the visuals.
- Must pass the awwwards-blueprints audit:
  - skip link, reduced motion plus a Stop-animations switch
  - one requestAnimationFrame owner
  - CLS under 0.1
  - no more than 3 MB before interaction
  - 44 px touch targets
  - a static fallback for the 3D scene

## Brand Commitments

- Name: Barber Bros (the Google listing's "Barber Bro’s" is not the brand spelling).
- The hero name and every wordmark are drawn as Big Shoulders outlines (src/lib/outline.ts), never live type, so they never show in a fallback face.
- Award-winner vocabulary (Luca's standing preference): two colours, a poster display face, and one signature moment borrowed as a technique. Here that is "The chair scene", from Shader's one-scene technique.
- The brand system (colours, logo, type) was made in this build. See DESIGN.md once written, and the /brand/ page.

## Evidence on Hand

The Google Maps listing (confirmed correct by Luca) and the haircut price. No photos, barbers' names or other prices yet; those slots are labelled.

## Product Principles

1. **Book in one tap:** the WhatsApp and call pills are visible on every screen.
2. **The chair is the brand:** one object, one scene, everything else quiet.
3. **Nothing invented:** samples are labelled, and facts come from the shop.
4. **Phone first:** fast, readable in daylight, thumb-reachable.

## Accessibility & Inclusion

WCAG 2.2 AA:
- body text contrast 4.5:1 on the blue ground
- a reduced-motion alternative to the scroll scene (a static render, no camera motion)
- keyboard and screen-reader access to all content, which lives in the DOM rather than in the canvas
