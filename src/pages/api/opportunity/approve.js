import { readFile } from 'fs';
import { promisify } from 'util';
import path from 'path';
import { Opportunity, Badge } from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes } from '../../../constants';

const readFileAsync = promisify(readFile);

function getBadgeName(category) {
  return ({
    0: 'Digitale Geletterdheid',
    1: 'Duurzaamheid',
    2: 'Ondernemingszin',
    3: 'Onderzoekende houding',
    4: 'Wereldburgerschap'
  })[category] || category;
}

function getBadgeImage(category, difficulty) {
  const imageName = ({
    0b0: 'badge_digital-literacy_1.png',
    0b1: 'badge_digital-literacy_2.png',
    0b10: 'badge_digital-literacy_3.png',
    0b100: 'badge_sustainability_1.png',
    0b101: 'badge_sustainability_2.png',
    0b110: 'badge_sustainability_3.png',
    0b1000: 'badge_entre-spirit_1.png',
    0b1001: 'badge_entre-spirit_2.png',
    0b1010: 'badge_entre-spirit_3.png',
    0b1100: 'badge_research_1.png',
    0b1101: 'badge_research_2.png',
    0b1110: 'badge_research_3.png',
    0b10000: 'badge_global-citizenship_1.png',
    0b10001: 'badge_global-citizenship_2.png',
    0b10010: 'badge_global-citizenship_3.png'
  })[(category << 2) + difficulty]

  if (!imageName) {
    return '';
  }

  const imagePath = path.join('./src/assets/img/badges', imageName);
  return readFileAsync(imagePath, 'base64');
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated || !hasRole(user, roles.ADMIN)) {
      return res.status(401).end();
    }

    const opportunityId = req.query.id;
    if (!opportunityId) {
      return req.status(400).json(createApiErrorMessage(errorCodes.MISSING_OPPORTUNITY_ID));
    }

    let opportunity
    try {
      opportunity = await Opportunity.findOne({
        where: {
          id: opportunityId
        }
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.ERROR_APPROVING_OPPORTUNITY));
    }

    let badgeClass
    try {
      badgeClass = await Badge.create({
        criteria: `${opportunity.shortDescription} - ${getBadgeName(opportunity.category)}`,
        description: opportunity.longDescription,
        image: await getBadgeImage(opportunity.category, opportunity.difficulty),
        name: opportunity.title,
        type: 'BadgeClass',
        issuerId: opportunity.issuerId
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.ERROR_APPROVING_OPPORTUNITY));
    }

    try {
      await Opportunity.update({
        authority: 1,
        badgeId: badgeClass.id
      }, {
        where: {
          id: opportunityId
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.ERROR_APPROVING_OPPORTUNITY));
    }
    return res.send('ok');
  }
  return res.status(404).end();
}
