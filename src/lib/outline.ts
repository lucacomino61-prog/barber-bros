// Build-time outlines of Big Shoulders Display at weight 900. The hero name and the wordmark are drawn as paths,
// so they never render in a fallback face while the web font loads (no layout shift when it lands, and the brand
// rule "never set the wordmark in another face" holds), and the downloadable logo prints without the font.
// fontkitten maps characters to glyphs one to one, without kerning: fine for these few capitals.
// It reads a static weight-900 cut of the web font (tools/instance-font.py): fontkitten's getVariation()
// breaks on WOFF2 files.
import fs from 'node:fs';
import path from 'node:path';
import { create } from 'fontkitten';

const font = create(fs.readFileSync(path.resolve(process.cwd(), 'src/assets/big-shoulders-black.ttf')));
export const upm = font.unitsPerEm;

type Path = ReturnType<typeof font.glyphForCodePoint>['path'];
const r = (n: number) => Math.round(n * 10) / 10;
const toD = (p: Path) =>
  p.commands
    .map(({ command, args }) => {
      const a = args.map(r).join(' ');
      if (command === 'moveTo') return `M${a}`;
      if (command === 'lineTo') return `L${a}`;
      if (command === 'quadraticCurveTo') return `Q${a}`;
      if (command === 'bezierCurveTo') return `C${a}`;
      return 'Z';
    })
    .join('');

function run(text: string, tracking: number) {
  const glyphs = font.glyphsForString(text.toUpperCase());
  let x = 0;
  let top = 0;
  let bottom = 0;
  const placed = glyphs.map((g, i) => {
    const at = x;
    const b = g.path.bbox;
    if (Number.isFinite(b.maxY)) {
      top = Math.min(top, -b.maxY);
      bottom = Math.max(bottom, -b.minY);
    }
    x += g.advanceWidth + (i < glyphs.length - 1 ? tracking * upm : 0);
    return { g, at };
  });
  return { placed, width: x, top, bottom };
}

export interface Outline { d: string; width: number; height: number }

/** words on one baseline, `gap` em apart; box from the tallest glyph top to the deepest overshoot, in font units */
export function row(words: string[], gap: number, tracking = 0): Outline {
  const runs = words.map((w) => run(w, tracking));
  const top = Math.min(...runs.map((u) => u.top));
  const bottom = Math.max(...runs.map((u) => u.bottom));
  let x = 0;
  const parts: string[] = [];
  runs.forEach((u) => {
    for (const { g, at } of u.placed) parts.push(toD(g.path.scale(1, -1).translate(x + at, -top)));
    x += u.width + gap * upm;
  });
  return { d: parts.join(''), width: x - gap * upm, height: bottom - top };
}

/** lines centred on each other, baselines `leading` em apart */
export function block(lines: string[], leading: number, tracking = 0): Outline {
  const runs = lines.map((l) => run(l, tracking));
  const width = Math.max(...runs.map((u) => u.width));
  const first = -runs[0].top;
  const parts: string[] = [];
  runs.forEach((u, i) => {
    const base = first + i * leading * upm;
    for (const { g, at } of u.placed) parts.push(toD(g.path.scale(1, -1).translate((width - u.width) / 2 + at, base)));
  });
  const last = runs[runs.length - 1];
  return { d: parts.join(''), width, height: first + (runs.length - 1) * leading * upm + last.bottom };
}
