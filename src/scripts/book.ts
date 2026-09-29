// The booking helper: the chosen service, day and time write the WhatsApp message; the barber confirms in the chat.
// No booking system: nothing is stored, the message is the booking request. Days are Albanian calendar days.
import { tiraneNow, toMin } from './open';

interface BookCopy {
  phone: string; close: string; services: Record<string, string>;
  template: string; today: string; tomorrow: string; todayPhrase: string; tomorrowPhrase: string;
  dayPhrase: string; weekdays: string[]; weekdayPhrases: string[]; months: string[];
}

const form = document.querySelector<HTMLFormElement>('[data-book]');
if (form) init(form);

function init(form: HTMLFormElement) {
  const c: BookCopy = JSON.parse(form.querySelector('[data-book-copy]')!.textContent || '{}');
  const daysEl = form.querySelector<HTMLElement>('[data-book-days]')!;
  const time = form.querySelector<HTMLSelectElement>('[data-book-time]')!;
  const text = form.querySelector<HTMLElement>('[data-book-text]')!;
  const send = form.querySelector<HTMLAnchorElement>('[data-book-send]')!;

  const now = tiraneNow();
  const earliestToday = now.min + 30; // no sooner than half an hour from now
  const todayOpen = earliestToday <= toMin(c.close) - 30;
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.UTC(now.y, now.m - 1, now.d + i));
    const wd = d.getUTCDay();
    const date = String(d.getUTCDate());
    return {
      value: d.toISOString().slice(0, 10),
      label: i === 0 ? c.today : i === 1 ? c.tomorrow : `${c.weekdays[wd]} ${date}`,
      phrase: i === 0 ? c.todayPhrase : i === 1 ? c.tomorrowPhrase : c.dayPhrase.replace('{weekday}', c.weekdayPhrases[wd]).replace('{date}', date).replace('{month}', c.months[d.getUTCMonth()]),
    };
  });
  const first = todayOpen ? 0 : 1;
  daysEl.replaceChildren(
    ...days.map((d, i) => {
      const label = document.createElement('label');
      label.className = 'chip';
      const input = Object.assign(document.createElement('input'), { type: 'radio', name: 'book-day', value: d.value, checked: i === first, disabled: i === 0 && !todayOpen });
      const span = document.createElement('span');
      span.textContent = d.label;
      label.append(input, span);
      return label;
    }),
  );

  const picked = (name: string) => (form.elements.namedItem(name) as RadioNodeList).value;
  const syncTimes = () => {
    const today = picked('book-day') === days[0].value;
    for (const o of time.options) o.disabled = today && toMin(o.value) < earliestToday;
    if (time.selectedOptions[0]?.disabled) time.value = [...time.options].find((o) => !o.disabled)?.value ?? time.value;
  };
  const render = () => {
    const day = days.find((d) => d.value === picked('book-day')) ?? days[first];
    const msg = c.template.replace('{service}', c.services[picked('book-service')]).replace('{day}', day.phrase).replace('{time}', time.value);
    text.textContent = msg;
    send.href = `https://wa.me/${c.phone}?text=${encodeURIComponent(msg)}`;
  };

  form.addEventListener('change', (e) => {
    if ((e.target as HTMLInputElement).name === 'book-day') syncTimes();
    render();
  });
  form.addEventListener('submit', (e) => e.preventDefault());
  syncTimes();
  render();
  form.hidden = false;
  document.querySelector('[data-book-fallback]')?.setAttribute('hidden', '');
}
