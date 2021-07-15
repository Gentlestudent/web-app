import { Assertion, User, Badge } from '../../../sql/sqlClient';
import { buildAssertion } from '../../../badges';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const assertion = await Assertion.findOne({
      where: { id },
      include: [{ model: User, as: 'recipient' }, { model: Badge, as: 'badge' }]
    });
    if (!assertion) {
      return res.status(404).end();
    }
    return res.json(buildAssertion(assertion));
  } catch (error) {
    console.error(error);
    return res.status(500).end('ERROR_GETTING_ASSERTION');
  }
}
