import * as admin from 'firebase-admin';

const getFirebaseAppForServer = (() => {
  let firebaseApp;

  return () => {
    if (!firebaseApp) {
      // check if default app was already initialized
      if (admin.apps.length) {
        firebaseApp = admin.app();
      } else {
        // initialize default app
        firebaseApp = admin.initializeApp({
          credential: admin.credential.cert(process.env.FIREBASE_ADMIN)
        });
      }
    }

    return firebaseApp;
  };
})();

export { getFirebaseAppForServer };
