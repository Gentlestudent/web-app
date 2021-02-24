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
    return opportunities.docs.map((opportunity) => opportunity.data());
  } catch (err) {
    throw new Error(err);
  }
};

export { getOpportunities };
