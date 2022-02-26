const staticCacheName = "site-static"
const assets = [
    "/",
    "/index.html",
    "/css/normalize.css",
    "/css/reset.css",
    "/css/styles.css",
    "/js/main.js",
    "/image/apple-touch-icon.png",
    "/image/favicon.ico",
    "/image/icon-192.png",
    "/image/icon-192-maskable.png",
    "/image/icon-512.png",
    "/image/icon-512-maskable.png"
]

// install event

self.addEventListener("install", evt => {
    // console.log("service worker installed")
    evt.waitUntill(
        caches.open(staticCacheName).then((cache) => {
            cache.addAll(assets)
            console.log("caching in progress")
        })
    )
})

// activate event

self.addEventListener("activate", evt => {
    evt.waitUntill(
        caches.keys().then(keys => {
            return Promise.all(keys.filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

// fetch event

self.addEventListener("fetch", evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    )
})