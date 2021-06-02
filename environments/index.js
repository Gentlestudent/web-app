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
  USE_FUNCTIONS_EMULATOR: process.env.FIREBASE_USE_FUNCTIONS_EMULATOR,
  FIREBASE_ADMIN: {
    type: process.env.FIREBASE_ADMIN_TYPE,
    project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
    private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
    auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
    token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL
  },
  DATABASE_DATABASE: process.env.DATABASE_DATABASE,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_HOST: process.env.DATABASE_HOST,
  POSTMARK_TOKEN: process.env.POSTMARK_TOKEN
});
