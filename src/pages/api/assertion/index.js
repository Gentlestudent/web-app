import { Assertion, User, Badge } from '../../../sql/sqlClient';
// import { verifyToken } from '../../../utils/middleware';
import { buildAssertion } from '../../../badges';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // const { authenticated } = await verifyToken(req.headers.token);

    // if (!authenticated) {
    //   return res.status(401).end();
    // }

    let assertions;
    try {
      if (!req.query.recipient) {
        return res.status(400).end('ERROR_AT_LEAST_ONE_QUERY_PARAMETER_REQUIRED');
      }
      assertions = await Assertion.findAll({
        where: { recipientId: req.query.recipient },
        include: [{ model: User, as: 'recipient' }, { model: Badge, as: 'badge' }]
      });
      assertions = assertions.map(buildAssertion);
    } catch (error) {
      console.error(error);
      return res.status(500).end('ERROR_GETTING_ASSERTIONS_FROM_DB');
    }
    return res.json(assertions);
  }

  return res.status(404).end();
}
