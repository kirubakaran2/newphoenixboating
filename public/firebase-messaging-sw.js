importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBhfTqykMUlZP4PcFDtfv9OjXbA6wW2isA",
  authDomain: "newphoenixboating.firebaseapp.com",
  projectId: "newphoenixboating",
  storageBucket: "newphoenixboating.firebasestorage.app",
  messagingSenderId: "810741899734",
  appId: "1:810741899734:web:9cec55f1c93bec76280477",
  measurementId: "G-5SL9QYPL0X",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  
  const options = {
    body,
    icon: '/icon.png',
    vibrate: [200, 100, 200],
    tag: title,
    renotify: true
  };

  self.registration.showNotification(title, options);
});