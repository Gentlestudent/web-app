import { frontendUrl } from '../constants';

function buildIssuer(issuer) {
  return {
    '@context': 'https://w3id.org/openbadges/v2',
    id: `${frontendUrl}/api/issuer/${issuer.id}`,
    type: 'Issuer',
    name: issuer.institute,
    url: issuer.url,
    telephone: issuer.phonenumber,
    email: issuer.user.email
  };
}

export { buildIssuer };
