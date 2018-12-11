// set the prefix and suffix of our sw's name
workbox.core.setCacheNameDetails({
    prefix: 'NewWords',
    suffix: 'v1.0.2',
  });
  // have our sw update and control a web page as soon as possible.
  workbox.skipWaiting();
  workbox.clientsClaim();
  
  // vue-cli3.0 supports pwa with the help of workbox-webpack-plugin, we need to get the precacheing list through this sentence.
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
  
  // cache our data, and use networkFirst strategy.
  
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );
  
  workbox.routing.registerRoute(
    new RegExp('https://m.hellomrbigbigshot.xyz*'), 
    workbox.strategies.networkFirst()
  );
  workbox.routing.registerRoute(
    new RegExp('https://m.hellomrbigbigshot.xyz/api'),
    workbox.strategies.networkFirst({
      cacheName: 'api',
    }),
  );
  
  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'googleapis',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
        }),
      ],
    }),
  );