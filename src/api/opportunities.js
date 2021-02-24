import { firestore } from './firebase';

// const addOpportunity = async (opportunity) => {
//   try {
//     const { id } = await firestore.collection('Opportunities').add(opportunity);
//     return id;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

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

export { getOpportunities, getOpportunityById };
