import getSqlClient from '../../../sql/sqlClient';
import { errorCodes } from '../../../constants';
import { createApiErrorMessage } from '../../../utils';
import { verifyToken } from '../../../utils/middleware';
import { getPostmarkClient } from '../../../utils/postmark';
import { participationAccepted, participationDenied, participationFinished } from '../../../emailTemplates';
import getEnvironmentVar from '../../../../environments';

const allowedPreviousStatus = {
  0: 2, // a 'denied(2)' participation can be set to 'new(0)'
  1: 0, // a 'new(0)' participation can be set to 'accepted(1)'
  2: 0, // a 'new(0)' participation can be set to 'denied(2)'
  3: 1 // an 'accepted(1)' participation can be set to 'finished(3)'
};

const emailTemplates = {
  1: participationAccepted,
  2: participationDenied,
  3: participationFinished,
  0: false
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { authenticated } = req.auth;

    if (!authenticated) {
      return res.status(401).end();
    }

    const { id, status } = req.query;

    const availableStatuses = new Set(['0', '1', '2', '3']); // we're using strings here because numbers in the query will always be strings, and this way we're validating the unmodified query value
    if (!availableStatuses.has(status)) {
      return res.status(400).json(createApiErrorMessage(errorCodes.INVALID_PARTICIPATION_STATUS));
    }

    const { Participation, Opportunity, User } = await getSqlClient();

    let participation;
    try {
      const [amountUpdated] = await Participation.update({
        status: Number(status)
      }, {
        where: {
          id,
          status: allowedPreviousStatus[Number(status)] // make sure the participation we're updating has a status that can be updated to what we're setting it to now
        }
      });
      if (amountUpdated !== 1) {
        return res.status(400).json(createApiErrorMessage(errorCodes.NO_AVAILABLE_PARTICIPATION));
      }
      participation = await Participation.findOne({
        where: { id },
        include: [{
          model: Opportunity,
          as: 'Opportunity',
          attributes: ['id', 'title']
        }, {
          model: User,
          as: 'User',
          attributes: ['email', 'firstName', 'lastName']
        }]
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    try {
      const postmarkClient = await getPostmarkClient();
      const emailTemplate = emailTemplates[Number(status)];
      if (emailTemplate) {
        const frontendUrl = await getEnvironmentVar('HOST_URL');
        const opportunityLink = `${frontendUrl}/opportunities/${participation.Opportunity.id}`;
        const { firstName, lastName, email } = participation.User;
        const displayName = `${firstName} ${lastName}`;

        await postmarkClient.sendEmail({
          From: 'noreply@appsaloon.be',
          To: email,
          Subject: emailTemplate.subject,
          HtmlBody: emailTemplate.htmlBody({
            displayName,
            opportunityTitle: participation.Opportunity.title,
            opportunityLink
          }),
          TextBody: emailTemplate.textBody({
            displayName,
            opportunityTitle: participation.Opportunity.title,
            opportunityLink
          }),
          MessageStream: 'outbound'
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.send('ok');
  }

  return res.status(404).end();
}
