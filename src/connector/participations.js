import { getAuthenticatedKy } from '../utils/getKy';

const getParticipations = async ({ searchParams } = {}) => {
  const ky = await getAuthenticatedKy();
  if (searchParams) {
    searchParams =
      searchParams instanceof window.URLSearchParams
        ? searchParams
        : new window.URLSearchParams(searchParams);
    return ky.get(`/api/participation?${searchParams.toString()}`);
  }
  return ky.get('/api/participation');
};

export { getParticipations };
