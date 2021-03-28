import { firestore } from './firebase';
import { opportunityConverter } from '../models/Opportunity';

const addOpportunity = (opportunity) => {
  return firestore.collection('Opportunities').withConverter(opportunityConverter).add(opportunity);
};

const getOpportunities = async () => {
  return (
    await firestore.collection('Opportunities').withConverter(opportunityConverter).get()
  ).docs.map((opp) => opp.data());
};

const getOpportunityById = async (id) => {
  return (
    await firestore.collection('Opportunities').doc(id).withConverter(opportunityConverter).get()
  ).data();
};

export { getOpportunities, getOpportunityById, addOpportunity };
