import { readFile } from 'fs';
import { promisify } from 'util';
import path from 'path';
import getSqlClient from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { getPostmarkClient } from '../../../utils/postmark';
import { roles, errorCodes, categoryValues, categoryLabels } from '../../../constants';
import getEnvironmentVar from '../../../../environments';

const readFileAsync = promisify(readFile);

function getCategoryConstantName(category) {
  try {
    return Object.entries(categoryValues).find(([, value]) => value === category)[1];
  } catch {
    return category;
  }
}

function getBadgeName(category) {
  return categoryLabels[getCategoryConstantName(category)] || category;
}

function getImage(imageType, category, difficulty) {
  const imageName = `_${getCategoryConstantName(category).toLowerCase().replace('_', '-')}_${difficulty}.png`;
  const imagePath = path.join('./badgeIcons', imageType, `${imageType}${imageName}`);
  return readFileAsync(imagePath, 'base64');
}

function getBadgeImage(category, difficulty) {
  return getImage('badge', category, difficulty);
}

function getPinImage(category, difficulty) {
  return getImage('pin', category, difficulty);
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
      return res.status(400).json(createApiErrorMessage(errorCodes.MISSING_OPPORTUNITY_ID));
    }

    const { Opportunity, Badge, Issuer, User } = await getSqlClient();

    let opportunity;
    try {
      opportunity = await Opportunity.findOne({
        where: {
          id: opportunityId,
          authority: 0
        },
        include: [{
          model: Issuer,
          as: 'issuer',
          attributes: ['id'],
          include: [{
            model: User,
            as: 'user',
            attributes: ['email', 'firstName', 'lastName']
          }]
        }],
        attributes: ['category', 'difficulty', 'shortDescription', 'longDescription', 'title', 'issuerId']
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    if (!opportunity) {
      return res.status(400).json(createApiErrorMessage(errorCodes.NO_UNAPPROVED_OPPORTUNITY));
    }

    let badgeImage, pinImage;
    try {
      [badgeImage, pinImage] = await Promise.all([
        getBadgeImage(opportunity.category, opportunity.difficulty),
        getPinImage(opportunity.category, opportunity.difficulty)
      ]);
    } catch (error) {
      console.warn('one of the images was not found or could not be read');
      console.error(error);
    }

    let badgeClass;
    try {
      badgeClass = await Badge.create({
        criteria: `${opportunity.shortDescription} - ${getBadgeName(opportunity.category)}`,
        description: opportunity.longDescription,
        image: badgeImage,
        name: opportunity.title,
        type: 'BadgeClass',
        issuerId: opportunity.issuerId
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    try {
      await Opportunity.update({
        authority: 1,
        badgeId: badgeClass.id,
        pinImage
      }, {
        where: {
          id: opportunityId
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    try {
      const postmarkClient = await getPostmarkClient();

      const frontendUrl = await getEnvironmentVar('HOST_URL');
      const opportunityLink = `${frontendUrl}/opportunities/${opportunityId}`;
      const { firstName, lastName, email } = opportunity.issuer.user;
      const displayName = `${firstName} ${lastName}`;

      const HtmlBody = `
        <p>Hallo ${displayName},</p>

        <p>Je leerkans '${opportunity.title}' is goedgekeurd.</p>

        <p>Je kan je leerkans op de gentlestudent website <a href="${opportunityLink}">hier bekijken</a>.</p>

        <p>Met vriendelijke groet,</p>

        <p>Team Gentlestudent</p>
      `;

      const TextBody = `
        Hallo ${displayName},

        Je leerkans '${opportunity.title}' is goedgekeurd.

        Je kan je leerkans op de gentlestudent website bekijken via deze url: ${opportunityLink}.

        Met vriendelijke groet,

        Team Gentlestudent
      `;

      await postmarkClient.sendEmail({
        From: 'noreply@appsaloon.be',
        To: email,
        Subject: 'Leerkans goedgekeurd',
        HtmlBody,
        TextBody,
        MessageStream: 'outbound'
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.send('ok');
  }
  return res.status(404).end();
}
