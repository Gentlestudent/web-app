import { saltedHash } from '../utils';
// import { featTypes } from '../constants';
import { frontendUrl } from '../constants';

function buildAssertion(assertion) {
  const { hash: identity, salt } = saltedHash(assertion.recipient.email);
  return {
    '@context': 'https://w3id.org/openbadges/v2',
    id: `${frontendUrl}/api/assertion/${assertion.id}`,
    type: 'Assertion',
    recipient: {
      hashed: true,
      type: 'email',
      identity,
      salt
    },
    badge: `${frontendUrl}/api/badge/${assertion.badgeId}`,
    verification: { type: 'HostedBadge' },
    issuedOn: assertion.issuedOn
    // TODO add evidence object
    // evidence: {
    //   id: `${frontendUrl}/${
    //     assertion.feat.type === featTypes.LEARNING_OPPORTUNITY ? 'opportunities' : 'quests'
    //   }/${assertion.feat.evidence}`,
    //   narrative: `Awarded for completing a ${
    //     assertion.feat.type === featTypes.LEARNING_OPPORTUNITY
    //       ? `learning opportunity provided by ${institution}${url ? `. More on us: ${url}` : ''}`
    //       : 'quest'
    //   }.`
    // }
  };
}

export { buildAssertion };
