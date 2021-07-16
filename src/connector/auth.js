// import { auth, Auth } from './firebase';
// import { getFirebaseAppForClient } from '../utils/firebase';

async function getKy() {
  const { default: ky } = await import('ky'); // read here why this instead of importing on line 1 -> https://github.com/sindresorhus/ky/issues/322
  return ky;
}

export const registerWithEmailPassword = async ({
  email,
  password,
  firstName,
  lastName,
  institute
}) => {
  const ky = await getKy();
  return ky.post('/api/auth/createParticipant', {
    json: {
      email,
      password,
      firstName,
      lastName,
      institute
    }
  });
};

export const sendAccountVerificationEmail = async (email) => {
  const ky = await getKy();
  const searchParams = new window.URLSearchParams({ email });
  return ky.get(`/api/auth/requestEmailVerification?${searchParams.toString()}`);
};

export const reauthenticate = (email, password) => {
  console.warn('TODO update reauthenticate');
};
// export const reauthenticate = (email, password) =>
//   auth.currentUser.reauthenticateWithCredential(Auth.EmailAuthProvider.credential(email, password));

export const handleVerifyEmail = (actionCode) => {
  console.warn('TODO update handleVerifyEmail');
};
// export const handleVerifyEmail = (actionCode) => auth.applyActionCode(actionCode);

export const signOut = () => {
  console.warn('TODO delete signOut');
};
// export const signOut = () => auth.signOut();
