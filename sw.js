const cahceName = 'static-cache';
const resourceToCache = [
  'index.html'
];

/// 「self」is Service_Worker
self.addEventListener('install', function (event) {
  console.log("SW install.")
  event.waitUntil(
    caches.open(cahceName)
      .then(function (cache) {
        return cache.addAll(resourceToCache);
      }));
});

self.addEventListener('activate', event => {
  console.log('SW activate');
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(cahceName).then(function (cache) {
      console.log('open Cache')
      return fetch(event.request).then(function (response) {
        console.log('Load Remote')
        cache.put(event.request, response.clone());
        return response;
      }).catch(() => {
        return cache.match(event.request).then(function (response) {
          console.log('Load Local')
          return response;
        });
      })
    })
  );
});


self.addEventListener('refreshOffline', function (response) {
  return caches.open('offline2').then(function (cache) {
    return cache.put(offlinePage, response);
  });
});


self.addEventListener('push', function (event) {
  var data = event.data.json(); var opts = {
    body: data.body,
    icon: data.icon,
    data: {
      url: data.url
    }
  };
  event.waitUntil(self.registration.showNotification(data.title, opts));
});


self.addEventListener('notificationclick', function (event) {
  var data = event.notification.data; event.notification.close(); event.waitUntil(
    clients.openWindow(data.url)
  );
});