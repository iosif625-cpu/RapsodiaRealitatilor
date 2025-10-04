const CACHE = "pdf-cache-v5";
const ASSETS = [
  "index.html",
  "viewer.html",
  "manifest.json",
  "rapsodia-realitatilor-2025-octombrie.pdf",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.origin === self.location.origin) {
    // PDF: cache-first (și offline)
    if (url.pathname.endsWith(".pdf")) {
      event.respondWith(
        caches.match(event.request).then((res) => res || fetch(event.request))
      );
      return;
    }
    // Restul: cache-first simplu
    event.respondWith(
      caches.match(event.request).then((res) => res || fetch(event.request))
    );
  }
});
