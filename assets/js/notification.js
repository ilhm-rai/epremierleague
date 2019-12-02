// Periksa fitur Notification API

if (!('Notification') in window) {
    console.error('Browser tidak mendukung notifikasi');
} else {
    requestPermision();
}

function requestPermision() {
    Notification.requestPermission().then(function (result) {
        if (result === "denied") {
            console.log('Fitur notifikasi tidak diijinkan.');
            return result;
        } else if (result === "default") {
            console.log('Pengguna menutup kotak dialog permintaan.');
            return result;
        } else {
            console.log('Fitur notifikasi diijinkan');
            showCodetarianNotification();
        }

        navigator.serviceWorker.getRegistration().then(function (registration) {
            if (registration.active) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(
                        "BGZqSqexFaIHRc2KJM3ZYRV7UJam6IhymbtEGnEpjzcbOOC7RUmfjPFj-jTS7k-EweVJoYRrfocnsbMNQiMP-ek"
                    )
                }).then(function (subscribe) {
                    console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe
                        .endpoint);
                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(
                        String.fromCharCode.apply(null, new Uint8Array(subscribe
                            .getKey('p256dh')))));
                    console.log('Berhasil melakukan subscribe dengan auth', btoa(String
                        .fromCharCode.apply(null, new Uint8Array(subscribe.getKey(
                            'auth')))));
                }).catch(function (err) {
                    console.error('Tidak dapat melakukan subscribe ', err.message);
                })
            }
        })
    });
};

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

function showNotification(title, options) {
    if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}

function showCodetarianNotification() {
    const title = 'Codetarian Subscribers'
    const options = {
        body: 'Hi Sahabat Cota, selamat bergabung bersama kami.',
        icon: './assets/img/codetarian-image-532px.jpg',
        badge: './assets/img/codetarian-badge-52px.png',
        requireInteraction: true
    }
    showNotification(title, options)
}