import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

const config = process.env.FIREBASE;

export const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const auth = firebase.auth();
export const Auth = firebase.auth;
export const storage = firebase.storage();
export const functions = firebase.functions();
export const { Timestamp } = firebase.firestore;

if (process.env.USE_FUNCTIONS_EMULATOR) {
  functions.useFunctionsEmulator('http://localhost:5001');
}

auth.useDeviceLanguage();

export const firestore = firebase.firestore();
