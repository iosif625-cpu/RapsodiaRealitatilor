self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("pdf-cache").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/rapsodia-realitatilor-2025-octombrie.pdf",
        "/manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
