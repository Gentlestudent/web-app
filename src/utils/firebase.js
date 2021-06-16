import firebase from 'firebase/app';
import 'firebase/auth';

const getFirebaseAppForClient = (() => {
  let firebaseApp;

  return () => {
    if (!firebaseApp) {
      // check if default app was already initialized
      if (firebase.apps.length) {
        firebaseApp = firebase.app();
      } else {
        // initialize default app
        firebaseApp = firebase.initializeApp(process.env.FIREBASE);
      }
    }

    return firebaseApp;
  };
})();

async function getFirebaseToken() {
  try {
    const app = getFirebaseAppForClient();
    const auth = app.auth();
    const user = auth.currentUser;
    return user?.getIdToken();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { getFirebaseAppForClient, getFirebaseToken };
