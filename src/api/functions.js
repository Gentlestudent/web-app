import { functions } from './firebase';

export const createParticipant = functions.httpsCallable('createParticipant');
export const createAssertion = functions.httpsCallable('createParticipant');
export const getAssertion = functions.httpsCallable('createParticipant');
export const createBadgeClass = functions.httpsCallable('createParticipant');
export const getBadge = functions.httpsCallable('createParticipant');
export const getIssuer = functions.httpsCallable('createParticipant');
