import { getAuthenticatedKy, getPublicKy } from '../utils/getKy';

export const registerWithEmailPassword = async ({
  email,
  password,
  firstName,
  lastName,
  institute
}) => {
  const ky = await getPublicKy();
  return ky.post('/api/auth/createParticipant', {
    json: {
      email,
      password,
      firstName,
      lastName,
      institute
    }
  });
};

export const sendAccountVerificationEmail = async (email) => {
  const ky = await getAuthenticatedKy();
  const searchParams = new window.URLSearchParams({ email });
  return ky.get(`/api/auth/requestEmailVerification?${searchParams.toString()}`);
};

export const reauthenticate = (email, password) => {
  console.warn('TODO update reauthenticate');
};

export const handleVerifyEmail = (actionCode) => {
  console.warn('TODO update handleVerifyEmail');
};

export const signIn = async ({ email, password } = {}) => {
  const ky = await getPublicKy();
  return ky.post('/api/auth/login', {
    json: {
      email,
      password
    }
  });
};

export const signOut = async () => {
  const ky = await getAuthenticatedKy();
  return ky.get('/api/auth/logout');
};
