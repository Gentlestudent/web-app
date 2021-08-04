import { getAuthenticatedKy } from '../utils/getKy';

export const getProfile = async (id) => {
  const ky = await getAuthenticatedKy();
  return ky.get(`/api/auth/getProfile?id=${id}`);
};

export const updateProfile = async (values) => {
  const ky = await getAuthenticatedKy();
  return ky.patch('/api/auth/updateProfile', {
    json: values
  });
};

export const getUsers = async ({ searchParams } = {}) => {
  const ky = await getAuthenticatedKy();
  if (searchParams) {
    searchParams =
      searchParams instanceof window.URLSearchParams
        ? searchParams
        : new window.URLSearchParams(searchParams);
    return ky.get(`/api/user?${searchParams.toString()}`);
  }
  return ky.get('/api/user');
};
