const CACHE_NAME = 'safe-con-bim-cache-v3';
const STATIC_CACHE = 'static-cache-v3';
const DYNAMIC_CACHE = 'dynamic-cache-v3';

const URLS_TO_CACHE = [
  './',
  './SafeCon-BIM_Mobile_App.html',
  './manifest.json',
  './icon-180x180.png',
  './icon-192x192.png',
  './icon-384x384.png',
  './icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// 1. Install Event: Cache the app shell
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(URLS_TO_CACHE);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting(); // Activate the new service worker immediately
      })
      .catch(error => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Clearing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim(); // Take control of all open clients
    })
  );
});

// 3. Fetch Event: Enhanced caching strategy for iOS PWA
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Handle different types of requests
  if (request.url.startsWith('chrome-extension://')) {
    return; // Ignore extension requests
  }

  // App shell - cache first
  if (URLS_TO_CACHE.includes(request.url) || request.url.includes('SafeCon-BIM_Mobile_App.html')) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          return response || fetch(request)
            .then(fetchResponse => {
              return caches.open(STATIC_CACHE)
                .then(cache => {
                  cache.put(request, fetchResponse.clone());
                  return fetchResponse;
                });
            });
        })
        .catch(() => {
          // Fallback to offline page if available
          if (request.destination === 'document') {
            return caches.match('./SafeCon-BIM_Mobile_App.html');
          }
        })
    );
  }
  // Dynamic content - network first
  else {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Only cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Fall back to cache
          return caches.match(request);
        })
    );
  }
});

// Handle iOS PWA specific events
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for offline data (when supported)
self.addEventListener('sync', event => {
  if (event.tag === 'background-checklist-sync') {
    event.waitUntil(syncChecklistData());
  }
});

// Sync checklist data when connection is restored
function syncChecklistData() {
  return new Promise((resolve) => {
    // Implement checklist data sync logic here
    console.log('Syncing checklist data...');
    resolve();
  });
}