// if ( !( 'serviceWorker' ) in navigator ) {
//     console.error( "Service worker tidak didukung browser ini." );
// } else {
//     registerServiceWorker();
// }

// // Registrasi service worker
// async function registerServiceWorker() {
//     try {
//         const registration = await navigator.serviceWorker.register( './sw.js' );
//         console.log( 'Registrasi service worker berhasil.' );
//         return registration;
//     }
//     catch ( err ) {
//         console.error( 'Registrasi service worker gagal.', err );
//     }
// }