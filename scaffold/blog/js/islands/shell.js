// Shell — bootstraps Weblisk client-side modules.
// Loaded on every page via <script type="module">.

import { hydrateIslands } from 'weblisk/core/hydrate.js';

// Hydrate any elements with data-island attributes
hydrateIslands();

// Register the service worker for offline support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
