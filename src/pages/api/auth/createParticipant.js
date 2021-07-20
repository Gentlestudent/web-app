import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { sendEmailVerification } from '../../../utils/postmark';
import { User } from '../../../sql/sqlClient';
import { errorCodes, jwtSecret, frontendUrl } from '../../../constants';
import { createApiErrorMessage } from '../../../utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(404).end();

  const { email, password, firstName, lastName, institute } = req.body;

  try {
    const participantCount = await User.count({
      where: { email }
    });
    if (participantCount !== 0) {
      return res.status(400).json(createApiErrorMessage(errorCodes.PARTICIPANT_ALREADY_EXISTS));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
  }

  const emailVerificationId = nanoid();

  try {
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      firstName,
      lastName,
      institute,
      password: hash,
      emailVerificationId
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
  }

  try {
    const emailToken = jwt.sign(
      { email },
      jwtSecret,
      { expiresIn: '1 day', jwtid: emailVerificationId }
    );
    await sendEmailVerification({
      to: email,
      displayName: `${firstName} ${lastName}`,
      verificationLink: `${frontendUrl}/api/auth/verifyEmail?t=${emailToken}`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
  }

  return res.send('ok');
}
