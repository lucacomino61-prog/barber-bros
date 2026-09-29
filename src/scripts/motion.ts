/* ONE ANIMATION ENGINE: GSAP's ticker is the only requestAnimationFrame owner. Lenis steps from it, ScrollTrigger
   runs on it, and the chair scene renders from it. CSS transitions handle interface states.
   Reduced motion and the Stop-animations switch turn Lenis and the scroll scene off. */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);
export { gsap, ScrollTrigger };

const rq = matchMedia('(prefers-reduced-motion: reduce)');
export const motionAllowed = () => document.documentElement.dataset.motion !== 'off' && !rq.matches;

let lenis: Lenis | null = null;
const step = (t: number) => lenis?.raf(t * 1000);
export function startScroll() {
  if (lenis || !motionAllowed()) return;
  lenis = new Lenis({ autoRaf: false, lerp: 0.12, anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(step);
}
export function stopScroll() {
  if (!lenis) return;
  gsap.ticker.remove(step);
  lenis.destroy();
  lenis = null;
}
export const onMotionPreference = (fn: () => void) => rq.addEventListener('change', fn);
