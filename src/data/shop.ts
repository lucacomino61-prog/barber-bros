// Every fact about the shop lives here. Barber Bros is a real client: nothing here may be invented and shipped.
// Confirmed 2026-09-29: the name "Barber Bros", the Google Maps listing (address, phone, hours), WhatsApp on the
// same number, and the haircut price, 500 lekë, which is where prices start. Still to come: the other prices and
// the barbers (see NEEDS_CONTENT.md).

export const shop = {
  name: 'Barber Bros',
  /** digits only, international format without +. The shop phone, confirmed to be on WhatsApp */
  whatsapp: '355692991511' as string | null,
  /** display format */
  phone: '+355 69 299 1511',
  address: {
    line: 'Rruga Jakov Xoxa',
    area: 'Fier, Shqipëri',
    mapUrl: 'https://www.google.com/maps/place/Barber+Bro%E2%80%99s/@40.7279538,19.5623415,17z/data=!4m6!3m5!1s0x1345530041b40f9b:0xe63bba63239c061d!8m2!3d40.7279538!4d19.5623415!16s%2Fg%2F11vyp9k2d3',
  },
  hours: [{ days: 'Çdo ditë', time: '09:00-22:00' }],
  prices: {
    /** confirmed prices, in lekë */
    rows: [{ name: 'Prerje flokësh', price: 500 }],
    /** the other services the site names; their prices are not known yet */
    others: 'fade, rregullim mjekre dhe rruajtje me peshqir të nxehtë',
  },
  team: { sample: true, count: 2 },
  instagram: null as string | null,
};

/** lek after the number, as on Albanian price boards */
export const lek = (n: number) => `${n} L`;

export const bookText = 'Përshëndetje Barber Bros, dua të rezervoj një termin.';
export const whatsappHref = () =>
  shop.whatsapp ? `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(bookText)}` : `https://wa.me/?text=${encodeURIComponent(bookText)}`;
export const callHref = () => (shop.phone ? `tel:${shop.phone.replace(/[^+\d]/g, '')}` : '#ku-jemi');
