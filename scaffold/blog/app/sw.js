// Service Worker — Offline Data Sync Engine
// Handles: Background Sync, Push Notifications, offline fallback.

const VERSION = 'app-sw-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// Offline fallback for navigation requests
self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith(
    fetch(event.request).catch(() =>
      new Response('<html><body style="font-family:system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh"><div style="text-align:center"><h1>Offline</h1><p>Your changes are saved locally.</p><button onclick="location.reload()">Retry</button></div></body></html>',
        { headers: { 'Content-Type': 'text/html' } })
    )
  );
});

// Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag.startsWith('wl-sync:')) {
    event.waitUntil(replayMutations(event.tag));
  }
});

// Push Notifications
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

self.addEventListener('message', (event) => {
  if (event.data?.type === 'relay') {
    self.clients.matchAll({ type: 'window' }).then(clients => {
      for (const c of clients) if (c.id !== event.source?.id) c.postMessage(event.data.payload);
    });
  }
});

async function replayMutations(tag) {
  // Placeholder: implement offline mutation replay
  console.log('[sw] replay mutations for', tag);
}
