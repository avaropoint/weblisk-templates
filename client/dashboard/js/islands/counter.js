// Counter — reactive counter island using Weblisk signals.

import { signal, effect } from 'weblisk';

export default function counter(el) {
  const [count, setCount] = signal(0);
  const display = el.querySelector('.counter-value');
  const btn = el.querySelector('.counter-btn');

  effect(() => { display.textContent = count(); });

  btn.addEventListener('click', () => setCount(count() + 1));
}
