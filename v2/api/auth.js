import { auth } from './firebase';

export const createAuthSubscription = (fn) => auth.onAuthStateChanged(fn);

export const registerWithEmailPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signInWithEmailPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
