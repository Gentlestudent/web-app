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

const createParticipation = async (opportunityId) => {
  const ky = await getAuthenticatedKy();
  const searchParams = new window.URLSearchParams({ opportunity: opportunityId });
  return ky.post(`/api/participation?${searchParams.toString()}`);
};

async function updateParticipationStatus({ id, status }) {
  const ky = await getAuthenticatedKy();
  const searchParams = new window.URLSearchParams({ id, status });
  return ky.get(`/api/participation/updateStatus?${searchParams.toString()}`);
}

export { getParticipations, createParticipation, updateParticipationStatus };
