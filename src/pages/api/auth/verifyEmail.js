import jwt from 'jsonwebtoken';
import { User } from '../../../sql/sqlClient';
import { errorCodes, jwtSecret } from '../../../constants';
import { createApiErrorMessage } from '../../../utils';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.query.t;

    if (!token) {
      return res.status(204).end();
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, jwtSecret);
    } catch (error) {
      if (error.name !== 'TokenExpiredError' && error.name !== 'JsonWebTokenError') {
        console.log(error);
      }
      // return res.status(401).json(createApiErrorMessage(errorCodes.EMAIL_VERIFICATION_TOKEN_EXPIRED));
      return res.send('<p>This token has expired, please request a new one.</p>');
    }

    try {
      const [affectedRows] = await User.update(
        { emailVerified: true, emailVerificationId: null },
        { where: { email: decodedToken.email || '', emailVerificationId: decodedToken.jti || '' } }
      );
      if (affectedRows === 0) {
        // return res.status(401).json(createApiErrorMessage(errorCodes.EMAIL_VERIFICATION_TOKEN_EXPIRED));
        return res.send('<p>This token has expired, please request a new one.</p>');
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.ERROR_VERIFYING_EMAIL));
    }

    return res.send('<p>Your email was successfully verified, you can now <a href="/login">log in</a>.</p>');
  }

  return res.status(404).end();
}
