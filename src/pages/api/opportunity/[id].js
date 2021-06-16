import { Opportunity, User } from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { roles } from '../../../constants';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { decodedToken, user, authenticated } = await verifyToken(req.headers.token);

    if (!authenticated) {
      return res.status(401).end();
    }

    let opportunity;
    try {
      const include = [{ model: User, as: 'issuer' }];
      if (user.role === roles.ADMIN || user.role === roles.ISSUER) {
        include.push({ model: User, as: 'participants' });
      }
      opportunity = await Opportunity.findOne({
        where: { id: req.query.id },
        include
      });
      if (user.role === roles.ISSUER && opportunity.issuer?.id !== user.id) {
        opportunity.set('participants', []);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).end('ERROR_GETTING_OPPORTUNITY_FROM_DB');
    }
    return res.json(opportunity);
  }

  return res.status(404).end();
}
