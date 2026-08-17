const CACHE_NAME = "cache-first-v1";
const ASSETS_TO_CACHE = [
	"/", // Often serves the main HTML
	"/index.html",
];

// 1. Install Event: Pre-cache core assets
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				console.log("Pre-caching core assets");
				return cache.addAll(ASSETS_TO_CACHE);
			})
			.then(() => self.skipWaiting()), // Force activation immediately
	);
});

// 2. Activate Event: Clean up old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cache) => {
						if (cache !== CACHE_NAME) {
							console.log("Deleting old cache:", cache);
							return caches.delete(cache);
						}
					}),
				);
			})
			.then(() => self.clients.claim()), // Take control of open pages immediately
	);
});

// 3. Fetch Event: Cache-First Strategy for HTML and Images
self.addEventListener("fetch", (event) => {
	const request = event.request;
	const url = new URL(request.url);

	// Check if the request is for HTML or an Image
	const isHTML =
		request.headers.get("accept")?.includes("text/html") ||
		url.pathname.endsWith(".html");
	const isImage =
		request.destination === "image" ||
		/\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(url.pathname);

	// Apply Cache-First only to HTML and Images
	if (isHTML || isImage) {
		event.respondWith(
			caches.match(request).then((cachedResponse) => {
				// Return cached asset if found
				if (cachedResponse) {
					return cachedResponse;
				}

				// Otherwise, fetch from network
				return fetch(request)
					.then((networkResponse) => {
						// Check valid response before caching
						if (
							!networkResponse ||
							networkResponse.status !== 200 ||
							networkResponse.type !== "basic"
						) {
							return networkResponse;
						}

						// Clone the response and store it in cache
						const responseToCache = networkResponse.clone();
						caches.open(CACHE_NAME).then((cache) => {
							cache.put(request, responseToCache);
						});

						return networkResponse;
					})
					.catch(() => {
						// Offline fallback for HTML if network fails and not in cache
					});
			}),
		);
	}
	// Let all other requests (CSS, JS, API calls) pass through normally to the network
});
