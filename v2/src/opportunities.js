import { firestore } from './firebase';

export const addOpportunity = async (opportunity) => {
  try {
    const { id } = await firestore.collection('Opportunities').add(opportunity);
    return id;
  } catch (err) {
    throw new Error(err);
  }
};
