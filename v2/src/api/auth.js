import { auth, functions } from './firebase';

export const createAuthSubscription = (fn) => auth.onAuthStateChanged(fn);

export const registerWithEmailPassword = async (email, password, firstName, lastName) => {
  await auth.createUserWithEmailAndPassword(email, password);

  return functions.httpsCallable('createUser').call(firstName, lastName);
};

export const signInWithEmailPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signOut = () => auth.signOut();
