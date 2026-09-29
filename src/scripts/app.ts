import { motionAllowed, startScroll, stopScroll, onMotionPreference, ScrollTrigger } from './motion';
import type { ChairScene } from './chair';
import './open';
import './book';

const d = document.documentElement;

// ---------- Stop animations ----------
const sync = () => document.querySelectorAll('[data-motion-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(d.dataset.motion === 'off')));
sync();
document.addEventListener('click', (e) => {
  if (!(e.target as Element).closest('[data-motion-toggle]')) return;
  const off = d.dataset.motion !== 'off';
  if (off) d.dataset.motion = 'off';
  else delete d.dataset.motion;
  try {
    if (off) localStorage.setItem('bb:motion', 'off');
    else localStorage.removeItem('bb:motion');
  } catch {}
  sync();
  applyMotion();
});

// ---------- header hairline once the page moves ----------
const sentinel = document.createElement('div');
sentinel.setAttribute('aria-hidden', 'true');
sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:40px;pointer-events:none';
document.body.prepend(sentinel);
new IntersectionObserver(([e]) => d.toggleAttribute('data-scrolled', !e.isIntersecting)).observe(sentinel);

// ---------- reveals ----------
function reveals() {
  if (!d.classList.contains('js-reveal')) return;
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}
reveals();

// ---------- the chair scene ----------
const sceneEl = document.querySelector<HTMLElement>('[data-scene]');
const host = document.querySelector<HTMLElement>('[data-canvas]');
let chair: ChairScene | null = null;
let loading = false;

async function mount() {
  if (!sceneEl || !host || chair || loading) return;
  loading = true;
  const { mountChair } = await import('./chair');
  loading = false;
  if (!motionAllowed()) return;
  chair = mountChair(sceneEl, host, () => sceneEl.classList.add('is-live'));
  if (!chair) {
    // no WebGL: fall back to the static hero instead of a tall scroll section with nothing turning
    sceneEl.classList.add('no-webgl');
    d.classList.remove('js-motion');
    ScrollTrigger.refresh();
  }
  (window as unknown as { __bb?: ChairScene | null }).__bb = chair;
}
function unmount() {
  chair?.destroy();
  chair = null;
  sceneEl?.classList.remove('is-live');
  ScrollTrigger.refresh();
}
function applyMotion() {
  const on = motionAllowed();
  d.classList.toggle('js-motion', on);
  if (on) {
    startScroll();
    mount();
  } else {
    stopScroll();
    unmount();
  }
}
onMotionPreference(applyMotion);
startScroll();
if (motionAllowed() && sceneEl) {
  // let the first paint (poster, fallback still, pills) land before three.js loads
  const go = () => mount();
  if ('requestIdleCallback' in window) (window as unknown as { requestIdleCallback: (f: () => void, o: { timeout: number }) => void }).requestIdleCallback(go, { timeout: 1200 });
  else setTimeout(go, 300);
}
