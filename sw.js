self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('erotic-pwa-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
                '/manifest.json'
            ]);
        })
    );
    console.log('Service Worker instalado');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
