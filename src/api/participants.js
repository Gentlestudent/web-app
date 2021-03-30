import { firestore } from './firebase';

const createParticipant = (id, data) => firestore.collection('Participants').doc(id).set(data);

const updateParticipant = async (id, data) =>
  firestore.collection('Participants').doc(id).update(data);

export { createParticipant, updateParticipant };
