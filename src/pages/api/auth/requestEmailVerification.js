import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { sendEmailVerification } from '../../../utils/postmark';
import { verifyToken } from '../../../utils/middleware';
import { createApiErrorMessage, hasRole } from '../../../utils';
import getSqlClient from '../../../sql/sqlClient';
import { roles, errorCodes } from '../../../constants';
import getEnvironmentVar from '../../../../environments';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(404).end();

  await verifyToken(req, res);
  const { user: authenticatedUser, authenticated } = req.auth;

  if (!authenticated) {
    return res.status(401).end();
  }

  const { email } = req.query;
  const { User } = await getSqlClient();

  let user;
  try {
    user = await User.findOne({
      where: { email }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
  }

  if (user.emailVerified) {
    return res.status(400).json(createApiErrorMessage(errorCodes.EMAIL_ALREADY_VERIFIED));
  }

  if (!hasRole(authenticatedUser, roles.ADMIN) && user.id !== authenticatedUser.id) {
    return res.status(401).end();
  }

  try {
    const emailVerificationId = nanoid();
    const jwtSecret = await getEnvironmentVar('JWT_SECRET');
    const emailToken = jwt.sign(
      { email },
      jwtSecret,
      { expiresIn: '1 day', jwtid: emailVerificationId }
    );
    const frontendUrl = await getEnvironmentVar('HOST_URL');
    const link = `${frontendUrl}/api/auth/verifyEmail?t=${emailToken}`;
    await User.update({ emailVerificationId }, { where: { id: user.id } });
    await sendEmailVerification({
      to: email,
      displayName: `${user.firstName || ''} ${user.lastName || ''}`,
      verificationLink: link
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
  }

  return res.send('ok');
}
