// The chair scene: a procedural barber chair (three.js) whose camera the scroll moves (Shader's one-scene technique).
// Renders from gsap.ticker only when something changed, and only while the stage is on screen (one rAF owner).
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { gsap, ScrollTrigger } from './motion';

type V3 = [number, number, number];
interface Key { p: number; rot: number; cam: V3; look: V3 }
export const KEYS: Key[] = [
  { p: 0, rot: -0.55, cam: [0, 1.0, 3.9], look: [0, 0.8, 0] },
  { p: 0.34, rot: -1.52, cam: [0.1, 0.95, 3.25], look: [0, 0.82, 0] },
  { p: 0.68, rot: -2.6, cam: [0.3, 1.52, 1.8], look: [0, 1.25, 0] },
  { p: 1, rot: -6.83, cam: [0, 1.12, 4.5], look: [0, 0.74, 0] },
];

const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function buildChair() {
  const g = new THREE.Group();
  const leather = new THREE.MeshPhysicalMaterial({ color: 0x0a0c0f, roughness: 0.52, metalness: 0, sheen: 0.55, sheenColor: new THREE.Color(0x1e2a34), sheenRoughness: 0.6, clearcoat: 0.12, clearcoatRoughness: 0.5 });
  // no per-material envMapIntensity: with scene.environment set, three.js uses scene.environmentIntensity instead
  const chrome = new THREE.MeshStandardMaterial({ color: 0xe6edf2, metalness: 1, roughness: 0.14 });
  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, parent: THREE.Object3D = g) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };
  const rod = (a: THREE.Vector3, b: THREE.Vector3, r: number, parent: THREE.Object3D = g) => {
    const len = a.distanceTo(b);
    const m = add(new THREE.CylinderGeometry(r, r, len, 20), chrome, (a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2, parent);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
    return m;
  };

  // hydraulic base
  const profile = [[0, 0], [0.33, 0], [0.35, 0.015], [0.34, 0.035], [0.16, 0.075], [0.11, 0.12], [0.085, 0.16], [0.075, 0.4], [0.095, 0.42], [0.095, 0.45], [0, 0.45]].map(([r, y]) => new THREE.Vector2(r, y));
  add(new THREE.LatheGeometry(profile, 72), chrome);
  // pump pedal
  const lever = add(new THREE.BoxGeometry(0.22, 0.018, 0.05), chrome, 0.24, 0.1, 0.1);
  lever.rotation.set(0, 0.5, -0.18);
  // seat frame and cushion
  add(new RoundedBoxGeometry(0.64, 0.05, 0.6, 3, 0.02), chrome, 0, 0.475, 0);
  add(new RoundedBoxGeometry(0.6, 0.12, 0.56, 4, 0.036), leather, 0, 0.565, 0.01);
  // backrest: channel-tufted rolls on a chrome back plate, leaning back
  const back = new THREE.Group();
  back.position.set(0, 0.62, -0.27);
  back.rotation.x = -0.2;
  g.add(back);
  for (let i = 0; i < 4; i++) add(new RoundedBoxGeometry(0.56, 0.13, 0.09, 4, 0.034), leather, 0, 0.08 + i * 0.138, 0, back);
  add(new RoundedBoxGeometry(0.58, 0.6, 0.03, 3, 0.012), chrome, 0, 0.29, -0.07, back);
  // headrest on a rod
  rod(new THREE.Vector3(0, 0.6, -0.04), new THREE.Vector3(0, 0.74, -0.04), 0.012, back);
  add(new RoundedBoxGeometry(0.32, 0.09, 0.1, 4, 0.034), leather, 0, 0.8, 0, back);
  // armrests
  for (const s of [-1, 1]) {
    add(new RoundedBoxGeometry(0.075, 0.055, 0.5, 4, 0.022), leather, s * 0.36, 0.8, 0.03);
    rod(new THREE.Vector3(s * 0.36, 0.5, 0.2), new THREE.Vector3(s * 0.36, 0.775, 0.2), 0.013);
    rod(new THREE.Vector3(s * 0.36, 0.5, -0.16), new THREE.Vector3(s * 0.36, 0.775, -0.16), 0.013);
    rod(new THREE.Vector3(s * 0.2, 0.47, 0.26), new THREE.Vector3(s * 0.2, 0.2, 0.5), 0.012);
  }
  // footrest
  add(new RoundedBoxGeometry(0.48, 0.02, 0.16, 3, 0.008), chrome, 0, 0.19, 0.52);
  rod(new THREE.Vector3(-0.24, 0.2, 0.6), new THREE.Vector3(0.24, 0.2, 0.6), 0.012);
  return g;
}

function contactShadow() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const x = c.getContext('2d')!;
  const grd = x.createRadialGradient(128, 128, 8, 128, 128, 128);
  grd.addColorStop(0, 'rgba(12,15,18,0.75)');
  grd.addColorStop(0.55, 'rgba(12,15,18,0.28)');
  grd.addColorStop(1, 'rgba(12,15,18,0)');
  x.fillStyle = grd;
  x.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.7), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.002;
  return m;
}

export interface Pose { rot: number; cam: V3; look: V3 }
export interface ChairScene {
  destroy(): void;
  renderAt(p: number, w: number, h: number, portrait?: boolean): string;
  renderPose(pose: Pose, w: number, h: number): string;
}

export function mountChair(sceneEl: HTMLElement, host: HTMLElement, onFirstFrame: () => void): ChairScene | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: false });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.setClearColor(0x000000, 0);
  host.append(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(2.5, 4, 3);
  const rim = new THREE.DirectionalLight(0x8fdcff, 2.8);
  rim.position.set(-3, 2.5, -3);
  scene.add(key, rim, new THREE.HemisphereLight(0xdff3ff, 0x0c0f12, 0.55));
  const chair = buildChair();
  scene.add(chair, contactShadow());
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  const look = new THREE.Vector3();

  const state = { p: 0 };
  let dirty = true;
  let visible = true;
  let first = true;
  const chapters = [...sceneEl.querySelectorAll<HTMLElement>('[data-chapter]')];
  let active = -1;
  // same query as the CSS that moves the name to the top, so the name and the camera always agree
  const portraitMQ = window.matchMedia('(max-aspect-ratio: 4/5)');
  let forcePortrait: boolean | null = null;

  const apply = (p: number) => {
    let i = 0;
    while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
    const a = KEYS[i];
    const b = KEYS[i + 1];
    const t = smooth(Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p))));
    const far = (forcePortrait ?? portraitMQ.matches) ? 1.3 : 1;
    chair.rotation.y = lerp(a.rot, b.rot, t);
    camera.position.set(lerp(a.cam[0], b.cam[0], t), lerp(a.cam[1], b.cam[1], t), lerp(a.cam[2], b.cam[2], t) * far);
    look.set(lerp(a.look[0], b.look[0], t), lerp(a.look[1], b.look[1], t), lerp(a.look[2], b.look[2], t));
    camera.lookAt(look);
    const idx = KEYS.reduce((best, k, j) => (Math.abs(k.p - p) < Math.abs(KEYS[best].p - p) ? j : best), 0);
    if (idx !== active) {
      active = idx;
      chapters.forEach((c, j) => c.classList.toggle('is-active', j === idx));
    }
  };

  const size = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    dirty = true;
  };
  const ro = new ResizeObserver(size);
  ro.observe(host);
  size();

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) dirty = true;
  });
  io.observe(host);

  const tick = () => {
    if (!dirty || !visible) return;
    dirty = false;
    apply(state.p);
    renderer.render(scene, camera);
    if (first) {
      first = false;
      onFirstFrame();
    }
  };
  gsap.ticker.add(tick);

  const tween = gsap.to(state, {
    p: 1,
    ease: 'none',
    onUpdate: () => { dirty = true; },
    scrollTrigger: { trigger: sceneEl, start: 'top top', end: 'bottom bottom', scrub: 0.7, invalidateOnRefresh: true },
  });
  ScrollTrigger.refresh();

  // keyboard: tabbing into the first caption's buttons mid-scroll brings the scene back to its start, so focus is seen
  const onFocus = (e: FocusEvent) => {
    const st = tween.scrollTrigger;
    if (st && state.p > 0.02 && (e.target as Element).closest('[data-chapter="0"]')) window.scrollTo({ top: st.start, behavior: 'instant' });
  };
  sceneEl.addEventListener('focusin', onFocus);

  // one off-screen-sized render, read back as PNG, then the live size again (the next tick redraws the scroll state)
  const still = (w: number, h: number, set: () => void) => {
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    set();
    renderer.render(scene, camera);
    const url = renderer.domElement.toDataURL('image/png');
    size();
    return url;
  };

  return {
    destroy() {
      sceneEl.removeEventListener('focusin', onFocus);
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.ticker.remove(tick);
      ro.disconnect();
      io.disconnect();
      renderer.dispose();
      pmrem.dispose();
      renderer.domElement.remove();
    },
    // used by tools/render-stills.mjs to make the static fallback images
    renderAt(p: number, w: number, h: number, portrait?: boolean) {
      forcePortrait = portrait ?? null;
      const url = still(w, h, () => apply(p));
      forcePortrait = null;
      return url;
    },
    renderPose(pose: Pose, w: number, h: number) {
      return still(w, h, () => {
        chair.rotation.y = pose.rot;
        camera.position.set(...pose.cam);
        look.set(...pose.look);
        camera.lookAt(look);
      });
    },
  };
}
