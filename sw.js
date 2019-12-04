importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log('Workbox berhasil dimuat.');
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '2' },
        { url: '/index.html', revision: '2' },
        { url: '/nav.html', revision: '1' },
        { url: '/team.html', revision: '2' },
        { url: '/404.html', revision: '1' },
        { url: '/favicon-196.png', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/pages/home.html', revision: '1' },
        { url: '/pages/favorites.html', revision: '1' },
        { url: '/pages/teams.html', revision: '1' },
        { url: '/assets/css/style.css', revision: '1' },
        { url: '/assets/css/materialize.min.css' },
        { url: '/assets/img/pl-logo-sprite-web-light.png', revision: '1' },
        { url: '/assets/img/pl-logo-sprite-mobile-light.png', revision: '1' },
        { url: '/assets/js/api.js', revision: '1' },
        { url: '/assets/js/content.js', revision: '1' },
        { url: '/assets/js/database.js', revision: '1' },
        { url: '/assets/js/idb.js' },
        { url: '/assets/js/materialize.min.js' },
        { url: '/assets/js/notification.js', revision: '1' },
        { url: '/assets/js/register.js', revision: '1' },
        { url: '/assets/js/script.js', revision: '1' },
        { url: '/vendor/colorlib-error-404-18/css/style.css' },
        { url: '/vendor/colorlib-error-404-18/img/emoji.png' },
    ]);

    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        new RegExp('/team.html'),
        workbox.strategies.cacheFirst({
            cacheName: 'team-cache'
        }),
    );

    workbox.routing.registerRoute(
        new RegExp('/assets/css/'),
        workbox.strategies.cacheFirst({
            cacheName: 'premiere-league-stylesheets'
        }),
    );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'api.football-data-v2',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-font-stylesheets'
        })
    );

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    );
} else {
    console.log('Workbox gagal dimuat.');
}

self.addEventListener("push", (event) => {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    const options = {
        body: body,
        icon: './assets/img/icons8_alarm_125px.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Codetarian Notification', options)
    );
});