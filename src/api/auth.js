import { auth, functions, Auth } from './firebase';

export const createAuthSubscription = (fn) => auth.onAuthStateChanged(fn);

export const registerWithEmailPassword = async (
  email,
  password,
  firstName,
  lastName,
  institute
) => {
  const name = `${firstName} ${lastName}`;
  const userCredential = await auth.createUserWithEmailAndPassword(email, password);
  const { user } = userCredential;
  await user.updateProfile({ displayName: name });
  await functions.httpsCallable('createParticipant')({ email, name, institute });
};

export const signInWithEmailPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const reauthenticate = (email, password) =>
  auth.currentUser.reauthenticateWithCredential(Auth.EmailAuthProvider.credential(email, password));

export const signOut = () => auth.signOut();
