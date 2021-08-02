import getEnvironmentVar from '../../environments';

async function buildIssuer(issuer) {
  const frontendUrl = await getEnvironmentVar('HOST_URL');
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
