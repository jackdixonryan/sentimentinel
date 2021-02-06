const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyBWDJBD8ghpR8_thWQz3RULWM6LtNW4NMs",
  authDomain: "sentimentinel.firebaseapp.com",
  projectId: "sentimentinel",
  storageBucket: "sentimentinel.appspot.com",
  messagingSenderId: "374584599265",
  appId: "1:374584599265:web:b210b184216c8f05038da0",
  measurementId: "G-287TTWC5N4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
module.exports = firebase.firestore();
