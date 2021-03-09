import { firestore } from './firebase';
import { opportunityConverter } from '../utils';

const addOpportunity = async (opportunity) => {
  try {
    await firestore
      // TODO: empty doc and change set to 'add' in final stage
      .collection('Opportunities')
      .doc('dummy')
      .withConverter(opportunityConverter)
      .set(opportunity);
  } catch (err) {
    throw new Error(err);
  }
};

const getOpportunities = async () => {
  try {
    const opportunities = await firestore.collection('Opportunities').get();
    return opportunities.docs.map((opp) => {
      const opportunity = opp.data();
      opportunity.id = opp.id;
      return opportunity;
    });
  } catch (err) {
    throw new Error(err);
  }
};

const getOpportunityById = async (id) => {
  try {
    const opportunityFromDb = await firestore.collection('Opportunities').doc(id).get();
    const opportunity = opportunityFromDb.data();
    opportunity.id = opportunityFromDb.id;
    return opportunity;
  } catch (err) {
    throw new Error(err);
  }
};

export { getOpportunities, getOpportunityById, addOpportunity };
