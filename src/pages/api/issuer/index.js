import { Issuer, User } from '../../../sql/sqlClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let issuers;
    try {
      issuers = await Issuer.findAll({
        where: {
          ...(!!req.query.validated && { validated: req.query.validated }),
          ...(!!req.query.userId && { userId: req.query.userId })
        },
        include: [{ model: User, as: 'user' }]
      });
    } catch (error) {
      console.error(error);
      return res.status(500).end('ERROR_GETTING_ISSUER');
    }
    return res.json(issuers);
  }
  return res.status(404).end();
}
