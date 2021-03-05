import { auth } from './firebase';
import { createParticipant } from './participants';

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
  await createParticipant(userCredential.user.uid, { email, name, institute });
  user.sendEmailVerification();
  // return functions.httpsCallable('createUser').call(firstName, lastName);
};

export const signInWithEmailPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signOut = () => auth.signOut();
