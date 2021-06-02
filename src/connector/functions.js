import { functions } from './firebase';

export const createParticipant = functions.httpsCallable('createParticipant');
export const createAssertion = functions.httpsCallable('createAssertion');
export const getAssertion = functions.httpsCallable('getAssertion');
export const createBadgeClass = functions.httpsCallable('createBadgeClass');
export const getBadge = functions.httpsCallable('getBadge');
export const getIssuer = functions.httpsCallable('getIssuer');
export const sendAccountVerificationEmail = functions.httpsCallable('sendAccountVerificationEmail');
