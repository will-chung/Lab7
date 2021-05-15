// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

const CACHE_NAME = 'entries-cache';

self.addEventListener('install', function(event) {
    // Perform install steps
    console.log('install');
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
    console.log('activate')
});

self.addEventListener('fetch', function(event) {
    console.log('fetch');
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }

            return fetch(event.request).then(function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                var responseToCache = response.clone();

                caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});