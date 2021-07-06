import { Issuer, User } from '../../../sql/sqlClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let issuerRequests;
    try {
      issuerRequests = await Issuer.findAll({
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
    return res.json(issuerRequests);
  }
  return res.status(404).end();
}
