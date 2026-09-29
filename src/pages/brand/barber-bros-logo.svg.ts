// The horizontal logo as a file to download: jar blue board, ink mark and wordmark, all outlines, so it prints
// without the font. Proportions follow the Logo component (mark 1.02em, wordmark 0.86em, gap 0.32em).
import type { APIRoute } from 'astro';
import { markPath } from '../../data/brand';
import { row, upm } from '../../lib/outline';

export const GET: APIRoute = () => {
  const pad = 14;
  const markH = 100 - 2 * pad;
  const em = markH / 1.02;
  const markW = markH * (72 / 82);
  const word = row(['Barber', 'Bros'], 0.18, -0.005);
  const s = (0.86 * em) / upm;
  const wordX = pad + markW + 0.32 * em;
  const wordY = 50 - (word.height * s) / 2;
  const width = Math.ceil(wordX + word.width * s + pad);
  const f = (n: number) => +n.toFixed(3);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 100"><title>Barber Bros</title>` +
    `<rect width="${width}" height="100" fill="#1F9AD6"/>` +
    `<path fill="#0C0F12" fill-rule="evenodd" transform="translate(${pad} ${pad}) scale(${f(markH / 82)}) translate(-14 -9)" d="${markPath}"/>` +
    `<path fill="#0C0F12" transform="translate(${f(wordX)} ${f(wordY)}) scale(${f(s)})" d="${word.d}"/></svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
