// Every fact about the shop lives here. Barber Bros is a real client: nothing here may be invented and shipped.
// Confirmed 2026-09-29: the name "Barber Bros", the Google Maps listing (address, phone, hours), WhatsApp on the
// same number, and the haircut price, 500 lekë, which is where prices start. Still to come: the other prices and
// the barbers (see NEEDS_CONTENT.md).
import type { Lang } from '../i18n/copy';

type Words = Record<Lang, string>;
export interface Service { id: string; price?: number; name: Words; phrase: Words }

export const shop = {
  name: 'Barber Bros',
  /** digits only, international format without +. The shop phone, confirmed to be on WhatsApp */
  whatsapp: '355692991511',
  /** display format */
  phone: '+355 69 299 1511',
  address: {
    line: 'Rruga Jakov Xoxa',
    area: { sq: 'Fier, Shqipëri', en: 'Fier, Albania' } as Words,
    /** the shop's pin on its Google Maps listing */
    geo: { lat: 40.7279538, lon: 19.5623415 },
    mapUrl: 'https://www.google.com/maps/place/Barber+Bro%E2%80%99s/@40.7279538,19.5623415,17z/data=!4m6!3m5!1s0x1345530041b40f9b:0xe63bba63239c061d!8m2!3d40.7279538!4d19.5623415!16s%2Fg%2F11vyp9k2d3',
  },
  /** every day, Albanian time (Europe/Tirane) */
  hours: { open: '09:00', close: '22:00', days: { sq: 'Çdo ditë', en: 'Every day' } as Words },
  /** services the site names; `price` only where the shop gave one (lekë) */
  services: [
    { id: 'prerje', price: 500, name: { sq: 'Prerje flokësh', en: 'Haircut' }, phrase: { sq: 'një prerje flokësh', en: 'a haircut' } },
    { id: 'fade', name: { sq: 'Fade', en: 'Fade' }, phrase: { sq: 'një fade', en: 'a fade' } },
    { id: 'mjeker', name: { sq: 'Rregullim mjekre', en: 'Beard trim' }, phrase: { sq: 'një rregullim mjekre', en: 'a beard trim' } },
    { id: 'rruajtje', name: { sq: 'Rruajtje me peshqir të nxehtë', en: 'Hot-towel shave' }, phrase: { sq: 'një rruajtje me peshqir të nxehtë', en: 'a hot-towel shave' } },
  ] as Service[],
  /** the barbers and their booking numbers, as the shop lists them in its Instagram bio (read 2026-09-29);
   *  handles from the posts that tag them. No portraits yet. Only the shop number is confirmed on WhatsApp. */
  team: [
    { name: 'Edison', phone: '+355 69 473 7557', instagram: 'edison_shametaj' },
    { name: 'Taulant', phone: '+355 69 299 1511', instagram: null },
    { name: 'Danieli', phone: '+355 68 328 8053', instagram: 'daniel.muratii' },
  ] as { name: string; phone: string; instagram: string | null }[],
  /** the shop's accounts, linked from its Google results */
  instagram: 'barber.___.bros',
  tiktok: 'barber.bros8',
};

export const instagramUrl = (handle: string) => `https://www.instagram.com/${handle}/`;
export const tiktokUrl = (handle: string) => `https://www.tiktok.com/@${handle}`;
export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;

/** lek after the number, as on Albanian price boards */
export const lek = (n: number) => `${n} L`;

const bookText: Words = {
  sq: 'Përshëndetje Barber Bros, dua të rezervoj një termin.',
  en: 'Hi Barber Bros, I’d like to book an appointment.',
};
export const whatsappHref = (lang: Lang, text = bookText[lang]) => `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;
export const callHref = () => `tel:${shop.phone.replace(/[^+\d]/g, '')}`;
