const CACHE_NAME = 'van-workspace-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Proses Instalasi dan Caching File Utama
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Memberikan file dari Cache jika pengguna tidak ada sinyal internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Kembalikan file dari cache, jika tidak ada, ambil dari internet
        return response || fetch(event.request);
      })
  );
});
