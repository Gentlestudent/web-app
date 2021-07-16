import jwt from 'jsonwebtoken';
import { User } from '../sql/sqlClient';
import { jwtSecret } from '../constants';

async function verifyToken(req, res) {
  const initial = req.headers.authorization;
  const token = (initial || '').replace(/^Bearer /, '');

  const auth = {
    decodedToken: null,
    user: null,
    authenticated: false
  };
  req.auth = auth;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, jwtSecret);
      const user = await User.findOne({
        where: {
          email: decodedToken.email,
          sessionId: decodedToken.jti
        }
      });
      if (user) {
        auth.decodedToken = decodedToken;
        auth.user = user.toJSON();
        auth.authenticated = true;
      }
    } catch (error) {
      if (error.name !== 'TokenExpiredError' && error.name !== 'JsonWebTokenError') {
        console.log(error);
      }
    }
  }
}

export { verifyToken };
