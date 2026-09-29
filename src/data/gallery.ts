// Work from the shop's own Instagram (@barber.___.bros), public posts read 2026-09-29: cover frames of reels,
// cropped to 4:5 around the cut (public/img/ig/<post id>.webp). Left out on purpose: the photo with the actor
// Odise Roshi (it would read as an endorsement) and the one with a child.
import type { Lang } from '../i18n/copy';

export interface Shot { id: string; kind: 'p' | 'reel'; alt: Record<Lang, string> }

export const gallery: Shot[] = [
  { id: 'DQ7KrJzjOtJ', kind: 'reel', alt: { sq: 'Fade anash me flokë të teksturuara sipër', en: 'Side fade with a textured top' } },
  { id: 'DSNBNkejDcD', kind: 'reel', alt: { sq: 'Fade me vijë të prerë anash dhe gjatësi sipër', en: 'Fade with a cut-in line and length on top' } },
  { id: 'DHMs6DwoCmk', kind: 'reel', alt: { sq: 'Skin fade me mjekër të konturuar', en: 'Skin fade with a lined-up beard' } },
  { id: 'DOdnSIyAqBe', kind: 'reel', alt: { sq: 'Prerje e teksturuar me balluke dhe taper', en: 'Textured crop with a fringe and a taper' } },
  { id: 'DI6fyb4qWcv', kind: 'reel', alt: { sq: 'Fade me vijë dhe mjekër, gërshërët në dorë', en: 'Fade with a line and a beard, scissors in hand' } },
  { id: 'DJ4W_G4KA3A', kind: 'reel', alt: { sq: 'Skin fade i shkurtër, nga anash', en: 'Short skin fade, from the side' } },
  { id: 'DJmZYB6KGbb', kind: 'reel', alt: { sq: 'Taper me mjekër të rregulluar', en: 'Taper with a trimmed beard' } },
  { id: 'DJzRMUjKeQP', kind: 'reel', alt: { sq: 'Klient në karrigen e zezë me ar, ndërsa berberi punon me makinetë', en: 'A customer in the black and gold chair while the barber works with clippers' } },
];

export const postUrl = (s: Shot) => `https://www.instagram.com/${s.kind}/${s.id}/`;
