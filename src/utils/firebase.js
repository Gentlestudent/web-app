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

export { getFirebaseAppForClient };
