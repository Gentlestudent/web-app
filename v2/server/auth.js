const admin = require('firebase-admin');
const emails = require('./emails');

const env = { global };

export const createUser = async (user) => {
  const { email } = user;
  const link = await admin.auth().generateEmailVerificationLink(email, {
    url: env.FRONTEND_URL
  });
  emails.sendEmailVerification(email, link);
};

export const resetPassword = async () => {};

export const changeEmail = async () => {};
