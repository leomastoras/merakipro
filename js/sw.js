/* Το μεράκι της Γιωτάννας — Service Worker */
const CACHE_VERSION = 'meraki-v2';
const PRECACHE_URLS = [
  '../',
  '../index.html',
  '../css/styles.css',
  '../css/fonts.css',
  '../js/script.js',
  '../js/email.js',
  '../manifest.webmanifest',
  '../img/logo.svg',
  '../img/logo.png',
  '../img/icon-192.png',
  '../img/icon-512.png',
  '../img/icon-maskable-512.png',
  '../img/1.jpg',
  '../img/2.jpg',
  '../img/3.jpg',
  '../img/4.jpg',
  '../img/5.jpg',
  '../img/6.jpg',
  '../img/7.jpg',
  '../img/8.jpg',
  '../img/9.jpg',
  '../img/fb.png',
  '../img/ig.png',
  '../img/tt.png',
  '../img/ta.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;

  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (!res || res.status !== 200 || res.type !== 'basic') return res;
        const copy = res.clone();
        caches.open(CACHE_VERSION).then(c => c.put(req, copy));
        return res;
      }).catch(() => cached);
    })
  );
});
