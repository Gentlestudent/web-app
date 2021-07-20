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

export { getAssertions };
