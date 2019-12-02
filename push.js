const webPush = require('web-push');

const vapidKeys = {
    publicKey: "BGZqSqexFaIHRc2KJM3ZYRV7UJam6IhymbtEGnEpjzcbOOC7RUmfjPFj-jTS7k-EweVJoYRrfocnsbMNQiMP-ek",
    privateKey: "1UPr464oqhtvL2NTOoX8OXiRL3W-r8DyKubcn9bp7UE"
};

webPush.setVapidDetails(
    "mailto:rizkyardi.ilhami06@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

var pushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/dLSIOizE6R4:APA91bE3CLKDzDYuTGKHZiTr0xrYpDJtiOTTwzKa7IJL9NROxkZc5yI8zhCxz3vA86tPAmAXYuemR00Rtq3mr5XK2HI8zJTUxPtybUsHuXMYxPHnM2NYr5S9DY4FotaPF8m07kzcFTRK",
    keys: {
        p256dh: "BE/VsbsjPLt3YrYgOCSLPY8bPfjlRgYq/Ii6Kb7B2HQ4WSrEO+8mCssSrM7weVhLmUZnmyxupZmi/4r7yW66zKU=",
        auth: "mCg0F7tZvXTJ6Z0htSxe8Q=="
    }
};

var payload = "Selamat cota! Aplikasi Anda sudah dapat menerima push notification!";

var options = {
    gcmAPIKey: "1006671523619",
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)