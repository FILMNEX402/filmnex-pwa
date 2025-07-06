self.addEventListener('install', (e) => {
  console.log('FILMNEX Service Worker installed');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
