import { Participation } from '../../../sql/sqlClient';
import { errorCodes } from '../../../constants';
import { createApiErrorMessage } from '../../../utils';
import { verifyToken } from '../../../utils/middleware';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { authenticated } = req.auth;

    if (!authenticated) {
      return res.status(401).end();
    }

    const id = req.query.id;
    try {
      const [amountUpdated] = await Participation.update({
        status: 3
      }, {
        where: {
          id,
          status: 0
        }
      });
      if (amountUpdated !== 1) {
        return res.status(400).json(createApiErrorMessage(errorCodes.NO_UNAPPROVED_PARTICIPATION));
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.send('ok');
  }

  return res.status(404).end();
}
