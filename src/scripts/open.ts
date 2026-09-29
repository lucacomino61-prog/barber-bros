// "Open now": the shop hours on Albanian time (Europe/Tirane), whatever the visitor's own clock says.

/** today's date and the minute of the day in Albania */
export function tiraneNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Tirane', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => +(parts.find((p) => p.type === type)?.value ?? 0);
  return { y: get('year'), m: get('month'), d: get('day'), min: get('hour') * 60 + get('minute') };
}

/** "09:30" -> 570 */
export const toMin = (hm: string) => +hm.slice(0, 2) * 60 + +hm.slice(3);

const els = [...document.querySelectorAll<HTMLElement>('[data-open-status]')];

function update() {
  const { min } = tiraneNow();
  for (const el of els) {
    const { open = '09:00', close = '22:00', tOpen = '', tBefore = '', tAfter = '' } = el.dataset;
    const isOpen = min >= toMin(open) && min < toMin(close);
    const line = isOpen ? tOpen : min < toMin(open) ? tBefore : tAfter;
    el.querySelector('[data-status-text]')!.textContent = line.replace('{open}', open).replace('{close}', close);
    el.classList.toggle('is-open', isOpen);
    el.hidden = false;
  }
}

if (els.length) {
  update();
  setInterval(update, 60_000);
}
