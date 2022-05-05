// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.0.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyBZbOC7ojRNcjm3uXsJGndinXqAA2cysEM",
    authDomain: "ionic-laesquina.firebaseapp.com",
    databaseURL: "https://ionic-laesquina-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ionic-laesquina",
    storageBucket: "ionic-laesquina.appspot.com",
    messagingSenderId: "615139456408",
    appId: "1:615139456408:web:b73d7160745f4159c827ed"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }