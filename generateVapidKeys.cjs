const webPush = require('web-push');

// Generate VAPID keys
const vapidKeys = webPush.generateVAPIDKeys();

// Log the keys to the console
console.log('Public VAPID Key:', vapidKeys.publicKey);
console.log('Private VAPID Key:', vapidKeys.privateKey);