// Screenshot helper for verification (headless Chrome via puppeteer-core).
// usage: node tools/shot.mjs <url> <out.png> [--w 1440] [--h 900] [--full] [--hover x,y] [--scroll y]
//        [--dark] [--reduce] [--eval "js"] [--wait ms] [--touch]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const args = process.argv.slice(2);
const url = args[0];
const out = args[1];
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const has = (k) => args.includes(k);
const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find((p) => fs.existsSync(p));

const browser = await puppeteer.launch({ headless: 'new', executablePath: chrome, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--hide-scrollbars'] });
const page = await browser.newPage();
const w = +opt('--w', 1440);
const h = +opt('--h', 900);
await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: has('--touch'), hasTouch: has('--touch') });
const feats = [];
if (has('--dark')) feats.push({ name: 'prefers-color-scheme', value: 'dark' });
if (has('--reduce')) feats.push({ name: 'prefers-reduced-motion', value: 'reduce' });
if (feats.length) await page.emulateMediaFeatures(feats);
const logs = [];
page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`${m.type()}: ${m.text()}`); });
page.on('pageerror', (e) => logs.push(`pageerror: ${e.message}`));
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
await new Promise((r) => setTimeout(r, +opt('--wait', 1200)));
if (opt('--scroll')) { await page.evaluate((y) => window.scrollTo(0, y), +opt('--scroll')); await new Promise((r) => setTimeout(r, 900)); }
if (opt('--eval')) { await page.evaluate(opt('--eval')); await new Promise((r) => setTimeout(r, 700)); }
if (opt('--hover')) {
  const [x, y] = opt('--hover').split(',').map(Number);
  await page.mouse.move(x - 60, y - 40);
  await page.mouse.move(x, y, { steps: 8 });
  await new Promise((r) => setTimeout(r, 700));
}
// full-page captures render beyond the viewport without resizing it, so vh-based layouts stay true
await page.screenshot({ path: out, fullPage: has('--full'), captureBeyondViewport: has('--full') });
console.log(`saved ${out}`);
if (logs.length) console.log(logs.join('\n'));
await browser.close();
