// Shell — bootstraps Weblisk on every page.

import { hydrateIslands } from 'weblisk/core/hydrate.js';

hydrateIslands();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
