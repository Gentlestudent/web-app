// This is where all the configuration goes for Firebase.
// In addition, Firebase itself will be instantiated in this file.
import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/functions'
import 'firebase/auth'
import 'firebase/firestore/dist/index.cjs'

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
  };

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const Timestamp = firebase.firestore.Timestamp;
const settings = {/* your settings... */ /*timestampsInSnapshots: true*/};
firestore.settings(settings);
const storage = firebase.storage();
const functions = firebase.functions();


export {
  auth,
  firebase,
  firestore,
  storage,
  functions,
  Timestamp
};