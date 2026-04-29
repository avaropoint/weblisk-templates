// Service Worker — offline fallback, background sync, push notifications.

const VERSION = 'app-sw-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith(
    fetch(event.request).catch(() =>
      new Response('<html><body style="font-family:system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh"><div style="text-align:center"><h1>Offline</h1><p>You appear to be offline.</p><button onclick="location.reload()">Retry</button></div></body></html>',
        { headers: { 'Content-Type': 'text/html' } })
    )
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag.startsWith('wl-sync:')) {
    event.waitUntil(replayMutations(event.tag));
  }
});

self.addEventListener('push', (event) => {
  const data = event.data?.json() || { title: 'Notification', body: '' };
  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body, icon: data.icon, data: data.payload || {},
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data?.url || '/'));
});

async function replayMutations(tag) {
  // Implement offline mutation replay here.
  console.log('[sw] replay mutations for', tag);
}
