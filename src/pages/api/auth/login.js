import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { User } from '../../../sql/sqlClient';
import { errorCodes, jwtSecret } from '../../../constants';
import { createApiErrorMessage } from '../../../utils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    let user;
    try {
      if (!email || !password) {
        return res.status(400).json(createApiErrorMessage(errorCodes.LOGIN_INCORRECT_CREDENTIALS));
      }

      user = await User.findOne({
        where: { email },
        attributes: ['id', 'password']
      });
      // no need to check if the user exists (if (!user) return res.end()), an empty password won't match the provided password anyway
      const passwordIsCorrect = await bcrypt.compare(password, user?.password || '');
      if (!passwordIsCorrect) {
        return res.status(400).json(createApiErrorMessage(errorCodes.LOGIN_INCORRECT_CREDENTIALS));
      }
    } catch (error) {
      console.log(error);
    }

    const sessionId = nanoid();

    const newToken = jwt.sign(
      {
        email,
        id: user.id
      },
      jwtSecret,
      { expiresIn: '1 day', jwtid: sessionId }
    );

    try {
      await User.update({ sessionId }, { where: { id: user.id } })
    } catch (error) {
      console.log(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.ERROR_LOGGING_IN));
    }

    return res.status(200).end(newToken);
  }

  return res.status(404).end();
}
