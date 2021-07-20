import { User } from '../../../sql/sqlClient';
import { errorCodes } from '../../../constants';
import { createApiErrorMessage } from '../../../utils';
import { verifyToken } from '../../../utils/middleware';

function ifObject(object) {
  if (Object.prototype.toString.apply(object).slice(8, -1) !== 'Object') throw new TypeError('argument `object` is not an object');
  return {
    has: name => Object.prototype.hasOwnProperty.call(object, name)
  }
}

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated) {
      return res.status(401).end();
    }

    const { email, firstName, lastName, institute, notifApp, notifEmail } = req.body;

    try {
      await User.update({
        ...(!!ifObject(req.body).has('email') && { email }),
        ...(!!ifObject(req.body).has('firstName') && { firstName }),
        ...(!!ifObject(req.body).has('lastName') && { lastName }),
        ...(!!ifObject(req.body).has('institute') && { institute }),
        ...(!!ifObject(req.body).has('notifApp') && { notifApp }),
        ...(!!ifObject(req.body).has('notifEmail') && { notifEmail })
      }, {
        where: { id: user.id }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.ERROR_UPDATING_USER));
    }
    return res.send('ok');
  }

  return res.status(404).end();
}
