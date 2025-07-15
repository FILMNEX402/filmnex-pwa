const CACHE_NAME = 'filmnex-cache-v1';
const urlsToCache = [
  '/',
  'https://fi1mnex.blogspot.com/'
];

// Install: cache core assets
self.addEventListener('install', (event) => {
  console.log('[FILMNEX SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch: serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((response) => response)
    )
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[FILMNEX SW] Activate');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
