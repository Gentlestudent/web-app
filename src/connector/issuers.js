// import { firestore } from './firebase';
// import { issuerConverter } from '../models/Issuer';

async function getKy() {
  const { default: ky } = await import('ky'); // read here why this instead of importing on line 1 -> https://github.com/sindresorhus/ky/issues/322
  return ky;
}

async function getIssuerById(id) {
  return {};
  // return (
  //   await firestore.collection('Issuers').doc(id).withConverter(issuerConverter).get()
  // ).data();
}

const getIssuers = async ({ searchParams } = {}) => {
  const ky = await getKy();
  if (searchParams) {
    searchParams =
      searchParams instanceof window.URLSearchParams
        ? searchParams
        : new window.URLSearchParams(searchParams);
    return ky.get(`/api/issuers?${searchParams.toString()}`);
  }
  return ky.get('/api/issuers');
};

async function registerIssuer({ id, institute, longName, url, phonenumber }) {
  const ky = await getKy();
  return ky.post('/api/issuers/register', {
    json: { id, institute, longName, url, phonenumber }
  });
}

async function approveIssuer(id) {
  const ky = await getKy();
  const searchParams = new window.URLSearchParams({ id })
  return ky.get(`/api/issuers/approve?${searchParams.toString()}`);
}

async function denyIssuer(id) {
  const ky = await getKy();
  const searchParams = new window.URLSearchParams({ id })
  return ky.get(`/api/issuers/deny?${searchParams.toString()}`);
}

export { getIssuerById, getIssuers, registerIssuer, approveIssuer, denyIssuer };
