import { sendEmailVerification } from '../../../utils/postmark';
import { getFirebaseAppForServer } from '../../../utils/firebaseServer';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(404).end();

  const { email } = req.query;

  let link;
  let user;
  try {
    const app = getFirebaseAppForServer();
    const auth = app.auth();
    user = await auth.getUserByEmail(email);
    link = await auth.generateEmailVerificationLink(email);
  } catch (error) {
    try {
      const originalString = error.message.slice(
        error.message.indexOf('Raw server response: ') + 22,
        error.message.length - 1
      );
      const originalError = JSON.parse(originalString);
      return res.status(originalError.error.code || 500).end(originalError.error.message);
    } catch {}
    return res.status(500).end(error.message);
  }

  try {
    await sendEmailVerification({
      to: email,
      displayName: user.displayName,
      verificationLink: link
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end('ERROR_SENDING_EMAIL');
  }

  return res.send('ok');
}
