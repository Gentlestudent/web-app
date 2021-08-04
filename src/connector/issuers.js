import { getAuthenticatedKy } from '../utils/getKy';

const getIssuers = async ({ searchParams } = {}) => {
  const ky = await getAuthenticatedKy();
  if (searchParams) {
    searchParams =
      searchParams instanceof window.URLSearchParams
        ? searchParams
        : new window.URLSearchParams(searchParams);
    return ky.get(`/api/issuer?${searchParams.toString()}`);
  }
  return ky.get('/api/issuer');
};

async function registerIssuer({ id, institute, longName, url, phonenumber }) {
  const ky = await getAuthenticatedKy();
  return ky.post('/api/issuer/register', {
    json: { id, institute, longName, url, phonenumber }
  });
}

async function approveIssuer(id) {
  const ky = await getAuthenticatedKy();
  const searchParams = new window.URLSearchParams({ id });
  return ky.get(`/api/issuer/approve?${searchParams.toString()}`);
}

async function denyIssuer(id) {
  const ky = await getAuthenticatedKy();
  const searchParams = new window.URLSearchParams({ id });
  return ky.get(`/api/issuer/deny?${searchParams.toString()}`);
}

export { getIssuers, registerIssuer, approveIssuer, denyIssuer };
