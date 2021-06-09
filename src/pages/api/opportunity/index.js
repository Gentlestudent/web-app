import Opportunity from '../../../sql/models/opportunity';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let opportunities;
    try {
      opportunities = await Opportunity.findAll();
    } catch (error) {
      console.error(error);
      return res.status(500).end('ERROR_GETTING_OPPORTUNITIES_FROM_DB');
    }
    return res.json(opportunities);
  }
  if (req.method === 'POST') {
    try {
      await Opportunity.create({
        addressId: req.body.addressId,
        authority: req.body.authority,
        badgeId: req.body.badgeId,
        beginDate: req.body.beginDate,
        category: req.body.category,
        contact: req.body.contact,
        difficulty: req.body.difficulty,
        endDate: req.body.endDate,
        international: req.body.international,
        issuerId: req.body.issuerId,
        longDescription: req.body.longDescription,
        shortDescription: req.body.shortDescription,
        moreInfo: req.body.moreInfo,
        oppImageUrl: req.body.oppImageUrl,
        participations: req.body.participations,
        pinImageUrl: req.body.pinImageUrl,
        title: req.body.title,
        website: req.body.website
      });
    } catch (error) {
      console.error(error);
      return res.status(500).end('ERROR_CREATING_OPPORTUNITY');
    }
    return res.status(204).end();
  }
  return res.status(404).end();
}
