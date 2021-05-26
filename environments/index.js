// const environments = { development: 'dev', production: 'production' };

// module.exports = (env) => {
//   let environment = {};

//   try {
//     // eslint-disable-next-line
//     environment = require(`./env.${environments[env]}`);
//   } catch (ex) {
//     if (ex instanceof Error && ex.code === 'MODULE_NOT_FOUND') {
//       console.log(
//         `Couldn't load environment file. Make sure an environment file for "${process.env.NODE_ENV}" exists under /environments`
//       );
//       process.exit(1);
//     } else throw ex;
//   }
//   return environment;
// };

module.exports = () => ({
  FIREBASE: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  },
  USE_FUNCTIONS_EMULATOR: process.env.FIREBASE_USE_FUNCTIONS_EMULATOR
});
