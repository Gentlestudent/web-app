import { sendEmailVerification } from '../../../utils/postmark';
import { getFirebaseAppForServer } from '../../../utils/firebaseServer';
import { User } from '../../../sql/sqlClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(404).end();

  const { email, password, firstName, lastName, institute } = req.body;

  try {
    const participantCount = await User.count({
      where: { email }
    });
    if (participantCount === 0) {
      await User.create({ email, firstName, lastName, institute });
    } else {
      return res.status(400).end('PARTICIPANT_ALREADY_EXISTS');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).end('ERROR_CREATING_PARTICIPANT');
  }

  let link;
  try {
    const app = await getFirebaseAppForServer();
    const auth = app.auth();

    await auth.createUser({
      email,
      emailVerified: false,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      institute,
      password,
      disabled: false
    });

    link = await auth.generateEmailVerificationLink(email);
  } catch (error) {
    try {
      const originalString = error.message.slice(
        error.message.indexOf('Raw server response: ') + 22,
        error.message.length - 1
      );
      const originalError = JSON.parse(originalString);
      return res.status(originalError.error.code || 500).end(originalError.error.message);
    } catch (error) {}
    return res.status(500).end(error.message);
  }

  try {
    await sendEmailVerification({
      to: email,
      displayName: `${firstName} ${lastName}`,
      verificationLink: link
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end('ERROR_SENDING_EMAIL');
  }

  return res.send('ok');
}
