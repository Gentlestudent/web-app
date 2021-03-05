import { firestore } from './firebase';

const createParticipant = (id, data) => firestore.collection('Participants').doc(id).set(data);

export { createParticipant };
