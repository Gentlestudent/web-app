const fs = require('fs');

module.exports = (environment) => {
  if (environment === 'production') {
    try {
      return {
        FIREBASE: JSON.parse(fs.readFileSync('/run/secrets/FIREBASE', 'utf8')),
        USE_FUNCTIONS_EMULATOR: fs.readFileSync('/run/secrets/FIREBASE_USE_FUNCTIONS_EMULATOR', 'utf8'),
        FIREBASE_ADMIN: JSON.parse(fs.readFileSync('/run/secrets/FIREBASE_ADMIN', 'utf8')),
        DATABASE_DATABASE: fs.readFileSync('/run/secrets/DATABASE_DATABASE', 'utf8'),
        DATABASE_USERNAME: fs.readFileSync('/run/secrets/DATABASE_USERNAME', 'utf8'),
        DATABASE_PASSWORD: fs.readFileSync('/run/secrets/DATABASE_PASSWORD', 'utf8'),
        DATABASE_HOST: fs.readFileSync('/run/secrets/DATABASE_HOST', 'utf8'),
        POSTMARK_TOKEN: fs.readFileSync('/run/secrets/POSTMARK_TOKEN', 'utf8'),
        HOST_URL: fs.readFileSync('/run/secrets/HOST_URL', 'utf8'),
        JWT_SECRET: fs.readFileSync('/run/secrets/JWT_SECRET', 'utf8')
      };
    } catch {
      console.log('secrets not found, skipping');
    }
  }
  return {
    FIREBASE: JSON.parse(process.env.FIREBASE),
    USE_FUNCTIONS_EMULATOR: process.env.FIREBASE_USE_FUNCTIONS_EMULATOR,
    FIREBASE_ADMIN: JSON.parse(process.env.FIREBASE_ADMIN),
    DATABASE_DATABASE: process.env.DATABASE_DATABASE,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_HOST: process.env.DATABASE_HOST,
    POSTMARK_TOKEN: process.env.POSTMARK_TOKEN,
    HOST_URL: process.env.DATABASE_USERNAME,
    JWT_SECRET: process.env.JWT_SECRET
  };
};
