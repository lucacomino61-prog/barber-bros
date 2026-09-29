// Link-preview images (Open Graph, 1200 x 630), one per language: public/og/sq.jpg and public/og/en.jpg.
// What WhatsApp, Facebook and Instagram show when the link is shared. All text is Big Shoulders outlines (no font
// needed), the chair is its own render. Rerun after changing the name, the lines or the chair:
//   node tools/og.mjs
import fs from 'node:fs';
import sharp from 'sharp';
import { block, row, upm } from '../src/lib/outline.ts';

const W = 1200;
const H = 630;
const BLUE = '#1F9AD6';
const INK = '#0C0F12';
const lines = {
  sq: ['Berber në Fier', 'Prerja nga 500 lekë'],
  en: ['Barbershop in Fier', 'Haircuts from 500 lek'],
};

const name = block(['Barber', 'Bros'], 0.8, -0.01);
const nameH = 370;
const ns = nameH / name.height;
const chair = await sharp('public/img/chair-0.webp').resize(H, H).toBuffer();
fs.mkdirSync('public/og', { recursive: true });

for (const [lang, [l1, l2]] of Object.entries(lines)) {
  const a = row([l1], 0, 0.02);
  const b = row([l2], 0, 0.02);
  const lh = 40; // cap height of the two lines
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${BLUE}"/>
    <path fill="${INK}" transform="translate(64 64) scale(${(ns).toFixed(5)})" d="${name.d}"/>
    <path fill="${INK}" transform="translate(66 ${64 + nameH + 44}) scale(${(lh / a.height).toFixed(5)})" d="${a.d}"/>
    <path fill="${INK}" transform="translate(66 ${64 + nameH + 44 + lh + 18}) scale(${(lh / b.height).toFixed(5)})" d="${b.d}"/>
  </svg>`;
  await sharp(Buffer.from(svg))
    .composite([{ input: chair, left: 590, top: 0 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`public/og/${lang}.jpg`);
  console.log(`public/og/${lang}.jpg`, fs.statSync(`public/og/${lang}.jpg`).size);
}
