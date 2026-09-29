// Render the chair scene to transparent WebP stills: the hero fallback (wide and tall framings, each matching
// the live camera at full stage height) and the section images.
// usage: node tools/render-stills.mjs [url]   (dev server by default)
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'node:fs';

const url = process.argv[2] || 'http://127.0.0.1:3690/';
const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find((p) => fs.existsSync(p));
const browser = await puppeteer.launch({ headless: 'new', executablePath: chrome, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
await page.waitForFunction(() => window.__bb, { timeout: 30000 });
fs.mkdirSync('public/img', { recursive: true });

const stills = [
  // hero fallback, landscape screens: p = 0 at a square frame (vertical field of view is what the stage keeps)
  { file: 'chair-0', run: () => window.__bb.renderAt(0, 1400, 1400) },
  // hero fallback, portrait screens: p = 0 with the portrait camera, at a phone stage's aspect (390 x 744)
  { file: 'chair-0-tall', run: () => window.__bb.renderAt(0, 760, 1450, true) },
  // prices: the profile, as the scroll's first turn shows it
  { file: 'chair-1', run: () => window.__bb.renderAt(0.34, 1400, 1400) },
  // visit: from above, turned to face the address and hours beside it (head-on, the rolls mirror the room and read grey)
  { file: 'chair-above', run: () => window.__bb.renderPose({ rot: -0.75, cam: [0, 3.0, 3.4], look: [0, 0.62, 0] }, 1400, 1400) },
];
for (const s of stills) {
  const data = await page.evaluate(s.run);
  const buf = Buffer.from(data.split(',')[1], 'base64');
  await sharp(buf).webp({ quality: 82, alphaQuality: 90, effort: 5 }).toFile(`public/img/${s.file}.webp`);
  console.log(`${s.file}.webp`, fs.statSync(`public/img/${s.file}.webp`).size);
}
await browser.close();
