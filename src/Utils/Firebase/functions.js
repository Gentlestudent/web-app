import  { functions } from './firebase'


export let functionTest = functions.httpsCallable('functionTest');
export let createBadgrIssuer = functions.httpsCallable('createIssuer');
export let createBadgrBadgeClass = functions.httpsCallable('createBadgeClass');
export let createBadgrAssertion = functions.httpsCallable('createAssertion');
export let refreshAccessToken = functions.httpsCallable('refreshToken');
export let notifyIssuer = functions.httpsCallable('notifyIssuer');
export const notifyParticipant = functions.httpsCallable('notifyParticipant');
