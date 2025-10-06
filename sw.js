/**
 * Service Worker for Startup Nation
 * Modern PWA with offline support and caching strategies
 */

const CACHE_NAME = 'startup-nation-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/site.webmanifest',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Static assets cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Failed to cache static assets', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('Service Worker: Serving from cache', request.url);
                    return cachedResponse;
                }
                
                // Otherwise fetch from network
                return fetch(request)
                    .then((networkResponse) => {
                        // Check if response is valid
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }
                        
                        // Clone the response
                        const responseToCache = networkResponse.clone();
                        
                        // Cache dynamic content
                        if (shouldCache(request)) {
                            caches.open(DYNAMIC_CACHE)
                                .then((cache) => {
                                    cache.put(request, responseToCache);
                                });
                        }
                        
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.log('Service Worker: Network request failed', request.url, error);
                        
                        // Return offline page for navigation requests
                        if (request.mode === 'navigate') {
                            return caches.match('/offline.html') || new Response(
                                getOfflinePage(),
                                {
                                    headers: { 'Content-Type': 'text/html' }
                                }
                            );
                        }
                        
                        // Return cached version if available for other requests
                        return caches.match(request);
                    });
            })
    );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('Service Worker: Background sync triggered');
        event.waitUntil(doBackgroundSync());
    }
});

// Push notifications
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update from Startup Nation!',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/action-explore.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/action-close.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Startup Nation', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'close') {
        // Just close the notification
        return;
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Helper functions
function shouldCache(request) {
    const url = new URL(request.url);
    
    // Cache images, CSS, JS, and fonts
    if (request.destination === 'image' || 
        request.destination === 'style' || 
        request.destination === 'script' || 
        request.destination === 'font') {
        return true;
    }
    
    // Cache API responses from our domain
    if (url.origin === location.origin && url.pathname.startsWith('/api/')) {
        return true;
    }
    
    return false;
}

function doBackgroundSync() {
    // Implement background sync logic here
    // For example, sync form submissions when back online
    return Promise.resolve();
}

function getOfflinePage() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline - Startup Nation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 2rem;
            background: #1e3a8a;
            color: white;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .offline-container {
            max-width: 500px;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #f97316;
        }
        p {
            font-size: 1.2rem;
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        .retry-btn {
            background: #f97316;
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .retry-btn:hover {
            background: #ea580c;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="offline-container">
        <h1>🚀</h1>
        <h1>You're Offline</h1>
        <p>Don't worry! You can still explore Startup Nation when you're back online. Check your connection and try again.</p>
        <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
    </div>
</body>
</html>
    `;
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_CACHE_SIZE') {
        getCacheSize().then(size => {
            event.ports[0].postMessage({ cacheSize: size });
        });
    }
});

// Get cache size for analytics
async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        
        for (const request of keys) {
            const response = await cache.match(request);
            if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
            }
        }
    }
    
    return totalSize;
}

console.log('Service Worker: Script loaded');
