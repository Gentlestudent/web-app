import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

const config = process.env.FIREBASE;

// if (process.browser) {
//   if (window.location.hostname === 'localhost' && process.env.USE_FUNCTIONS_EMULATOR) {
//     functions.useFunctionsEmulator('http://localhost:5001');
//   }
// }

// auth.useDeviceLanguage();

const getReadableDate = (timestamp) => {
  const months = [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december'
  ];

  const date = timestamp.toDate();
  const today = new Date();
  const seconds = Math.abs(today - date) / 1000;
  const days = Math.floor(seconds / 86400);

  if (days < 1) {
    return `${date.getHours()}:${date.getMinutes() < 10 ? 0 : ''}${date.getMinutes()}`;
  }
  if (days < 7) {
    return `${days} dag${days > 1 ? 'en' : ''} geleden`;
  }
  return `${date.getDate()} ${months[date.getMonth()]}`;
};

export { getReadableDate };

export const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const { Timestamp } = firebase.firestore;
