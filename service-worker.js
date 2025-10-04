const CACHE = "pdf-cache-v6";
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
    // cache-first pentru tot ce e în scope (inclusiv PDF + viewer)
    event.respondWith(
      caches.match(event.request).then((res) => res || fetch(event.request))
    );
  }
});
