import Opportunity from '../../../sql/models/opportunity';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let opportunity;
    try {
      opportunity = await Opportunity.findOne({
        where: { id: Number(req.query.id) }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).end('ERROR_GETTING_OPPORTUNITY_FROM_DB');
    }
    return res.json(opportunity);
  }
  return res.status(404).end();
}
