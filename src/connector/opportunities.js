import { getAuthenticatedKy, getPublicKy } from '../utils/getKy';

const addOpportunity = async (opportunity) => {
  const ky = await getAuthenticatedKy();
  return ky.post('/api/opportunity', {
    json: opportunity
  });
};

const getOpportunities = async ({ searchParams } = {}) => {
  const ky = await getPublicKy();
  if (searchParams) {
    searchParams =
      searchParams instanceof window.URLSearchParams
        ? searchParams
        : new window.URLSearchParams(searchParams);
    return ky.get(`/api/opportunity?${searchParams.toString()}`);
  }
  return ky.get('/api/opportunity');
};

const getOpportunityById = async (id) => {
  const ky = await getAuthenticatedKy();
  return ky.get(`/api/opportunity/${id}`);
};

async function approveOpportunity(id) {
  const ky = await getAuthenticatedKy();
  const searchParams = new window.URLSearchParams({ id })
  return ky.get(`/api/opportunity/approve?${searchParams.toString()}`);
}

async function denyOpportunity(id) {
  const ky = await getAuthenticatedKy();
  const searchParams = new window.URLSearchParams({ id })
  return ky.get(`/api/opportunity/deny?${searchParams.toString()}`);
}

export { getOpportunities, getOpportunityById, addOpportunity, approveOpportunity, denyOpportunity };
