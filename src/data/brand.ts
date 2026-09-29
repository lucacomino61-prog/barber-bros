// Brand constants shared by the site, the /brand/ page and the exported SVG files.
import type { Lang } from '../i18n/copy';

const right = [
  'M56 10 H66 A18.5 18.5 0 0 1 66 47 H56 Z',
  'M56 47 H64 A21.5 21.5 0 0 1 64 90 H56 Z',
  'M56 20 H66 A8.5 8.5 0 0 1 66 37 H56 Z',
  'M56 57 H64 A11.5 11.5 0 0 1 64 80 H56 Z',
];
const left = [
  'M44 10 H34 A18.5 18.5 0 0 0 34 47 H44 Z',
  'M44 47 H36 A21.5 21.5 0 0 0 36 90 H44 Z',
  'M44 20 H34 A8.5 8.5 0 0 0 34 37 H44 Z',
  'M44 57 H36 A11.5 11.5 0 0 0 36 80 H44 Z',
];
/** fill-rule evenodd: stem + four bowls, four counters cut out */
export const markPath = ['M44 10 H56 V90 H44 Z', ...right, ...left].join(' ');

export const colours: { key: 'blue' | 'ink'; hex: string; rgb: string; name: Record<Lang, string>; role: Record<Lang, string> }[] = [
  {
    key: 'blue',
    hex: '#1F9AD6',
    rgb: '31 154 214',
    name: { sq: 'Blu berberi', en: 'Barber blue' },
    role: {
      sq: 'Sfondi. Bluja e kavanozit dezinfektues që çdo berber mban në banak. Faqet, tabelat dhe kartat janë të gjitha blu.',
      en: 'The ground. After the disinfectant jar on every barber’s counter. Pages, signs and cards are drenched in it.',
    },
  },
  {
    key: 'ink',
    hex: '#0C0F12',
    rgb: '12 15 18',
    name: { sq: 'E zezë', en: 'Ink' },
    role: {
      sq: 'Shkrimi, shenja, çdo buton, karrigia. E zeza mbi blu lexohet me kontrast rreth 6:1.',
      en: 'Type, the mark, every control, the chair. Ink on barber blue reads at about 6:1.',
    },
  },
];
