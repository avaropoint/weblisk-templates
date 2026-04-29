// Theme Toggle — light/dark mode with localStorage persistence.

import { signal, effect } from 'weblisk';

export default function themeToggle(el) {
  const stored = localStorage.getItem('wl-theme') || 'light';
  const [theme, setTheme] = signal(stored);
  const btn = el.querySelector('button');

  effect(() => {
    const current = theme();
    document.documentElement.dataset.theme = current;
    localStorage.setItem('wl-theme', current);
    btn.textContent = current === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label',
      `Switch to ${current === 'dark' ? 'light' : 'dark'} mode`);
  });

  btn.addEventListener('click', () =>
    setTheme(theme() === 'dark' ? 'light' : 'dark')
  );
}
