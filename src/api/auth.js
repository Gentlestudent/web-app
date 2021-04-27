import { auth, functions, Auth } from './firebase';

export const createAuthSubscription = (fn) => auth.onAuthStateChanged(fn);

export const registerWithEmailPassword = async (
  email,
  password,
  firstName,
  lastName,
  institute
) => {
  const userCredential = await auth.createUserWithEmailAndPassword(email, password);
  const { user } = userCredential;
  await user.updateProfile({ displayName: `${firstName} ${lastName}` });
  await functions.httpsCallable('createParticipant')({ email, firstName, lastName, institute });
};

export const signInWithEmailPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const reauthenticate = (email, password) =>
  auth.currentUser.reauthenticateWithCredential(Auth.EmailAuthProvider.credential(email, password));

export const handleVerifyEmail = (actionCode) => auth.applyActionCode(actionCode);

export const signOut = () => auth.signOut();
