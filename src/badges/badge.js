import getEnvironmentVar from '../../environments';

async function buildBadge(badge) {
  const frontendUrl = await getEnvironmentVar('HOST_URL');
  return {
    '@context': 'https://w3id.org/openbadges/v2',
    id: `${frontendUrl}/api/badge/${badge.id}`,
    type: 'BadgeClass',
    name: badge.name,
    description: badge.description,
    image: badge.image,
    criteria: {
      narrative: badge.criteria
    },
    issuer: `${frontendUrl}/api/issuer/${badge.issuerId}`
  };
}

export { buildBadge };
