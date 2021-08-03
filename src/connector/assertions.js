import { getAuthenticatedKy } from '../utils/getKy';

const getAssertions = async ({ searchParams } = {}) => {
  const ky = await getAuthenticatedKy();
  if (searchParams) {
    searchParams =
      searchParams instanceof window.URLSearchParams
        ? searchParams
        : new window.URLSearchParams(searchParams);
    return ky.get(`/api/assertion?${searchParams.toString()}`);
  }
  return ky.get('/api/assertion');
};

const createAssertion = async ({ opportunity, participant } = {}) => {
  const ky = await getAuthenticatedKy();
  const searchParams = new window.URLSearchParams({ id: opportunity, participant });
  return ky.get(`/api/assertion/createByOpportunityId?${searchParams.toString()}`);
};

export { getAssertions, createAssertion };
