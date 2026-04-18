// Counter — reactive counter demonstrating signals and effects.

import { signal, effect } from 'weblisk';

export default function counter(el) {
  const [count, setCount] = signal(0);
  const btn = el.querySelector('button');

  btn.addEventListener('click', () => setCount(count() + 1));
  effect(() => { btn.textContent = `Count: ${count()}`; });
}
